'use client';

import { useEffect, useRef, useState } from 'react';

// Original, self-contained drawing effect. It never clones, replaces, or blocks page content.
export function BuildAnimation({ enabled, sequence }: { enabled: boolean; sequence: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [completedSequence, setCompletedSequence] = useState(0);
  const playing = enabled && sequence !== completedSequence;
  useEffect(() => {
    if (!playing || !canvas.current) return;
    const element = canvas.current;
    const context = element.getContext('2d');
    if (!context) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    element.width = window.innerWidth * ratio;
    element.height = window.innerHeight * ratio;
    context.scale(ratio, ratio);
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    const headerBottom = document.querySelector('header')?.getBoundingClientRect().bottom ?? 0;
    function collectTargets() {
      const visible = [...document.querySelectorAll('main [data-build], main h1, main h2, main h3, main p, main .button, main .contact-panel, main .timeline-item')]
      .map((target) => target.getBoundingClientRect())
      .filter((rect) => rect.bottom > headerBottom + 12 && rect.top < window.innerHeight - 12 && rect.width > 20 && rect.height > 10)
      .slice(0, 14)
      .map((rect) => ({
        left: Math.max(8, rect.left - 5),
        top: Math.max(headerBottom + 8, rect.top - 5),
        right: Math.min(window.innerWidth - 8, rect.right + 5),
        bottom: Math.min(window.innerHeight - 8, rect.bottom + 5),
      }));
      // Every route has a main landmark, even when its project collection is empty.
      return visible.length ? visible : [{ left: 24, top: headerBottom + 24, right: window.innerWidth - 24, bottom: window.innerHeight - 24 }];
    }
    let targets = collectTargets();
    let refreshTargets = false;
    const onScroll = () => { refreshTargets = true; };
    const start = performance.now();
    let frame = 0;
    const duration = 3000;
    const clear = () => context.clearRect(0, 0, element.width / ratio, element.height / ratio);
    const stop = () => { cancelAnimationFrame(frame); clear(); setCompletedSequence(sequence); };
    function draw(now: number) {
      if (!context) return;
      const elapsed = now - start;
      clear();
      if (elapsed >= duration) { stop(); return; }
      if (refreshTargets) { targets = collectTargets(); refreshTargets = false; }
      context.globalAlpha = Math.min(1, (duration - elapsed) / 500);
      targets.forEach((rect, index) => {
        const progress = Math.max(0, Math.min(1, (elapsed - index * 65) / 1500));
        if (!progress) return;
        const eased = 1 - (1 - progress) ** 3;
        const width = rect.right - rect.left;
        const height = rect.bottom - rect.top;
        context.strokeStyle = accent;
        context.lineWidth = 1.2;
        context.setLineDash([4, 5]);
        context.strokeRect(rect.left, rect.top, width * eased, height);
        context.setLineDash([]);
        const x = Math.min(window.innerWidth - 85, rect.left + width * eased);
        const y = Math.max(headerBottom + 10, rect.top + Math.sin(progress * Math.PI * 2) * 14);
        context.fillStyle = index % 2 ? '#f2efeb' : accent;
        context.beginPath();
        context.moveTo(x, y); context.lineTo(x + 3, y + 20); context.lineTo(x + 8, y + 14); context.lineTo(x + 17, y + 13); context.closePath(); context.fill();
        context.font = '10px monospace';
        context.fillText(index % 2 ? 'building' : 'creating', x + 22, y + 26);
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') stop(); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', stop);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      clear();
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', stop);
      window.removeEventListener('scroll', onScroll);
    };
  }, [playing, sequence]);
  return playing ? <canvas className="build-canvas" aria-hidden="true" ref={canvas} /> : null;
}
