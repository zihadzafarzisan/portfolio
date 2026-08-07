'use client';

import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const stats = [
  { value: 50, suffix: '+', label: 'Projects Shipped' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 99, suffix: '%', label: 'Client Satisfaction' },
];

export default function Stats() {
  return (
    <SectionWrapper id="stats" className="py-12 border-y border-border bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center">
              <div className="text-4xl md:text-5xl font-bold font-heading mb-2 flex items-center">
                <AnimatedCounter end={stat.value} />
                <span>{stat.suffix}</span>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
