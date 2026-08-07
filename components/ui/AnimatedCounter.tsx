'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(() => (prefersReducedMotion ? end : 0));
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number;
          const durationMs = duration * 1000;

          const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

          const step = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / durationMs, 1);
            
            setCount(Math.floor(easeOut(progress) * end));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [end, duration, prefersReducedMotion, hasAnimated]);

  return (
    <span ref={countRef} className={cn('inline-block tabular-nums', className)}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};
