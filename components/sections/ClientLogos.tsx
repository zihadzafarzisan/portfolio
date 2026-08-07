'use client';

import { SectionWrapper } from '@/components/ui/SectionWrapper';

const logos = [
  "Acme Corp",
  "Globex",
  "Soylent Corp",
  "Initech",
  "Umbrella Corp",
  "Stark Ind"
];

export default function ClientLogos() {
  const displayLogos = [...logos, ...logos]; // for marquee

  return (
    <SectionWrapper className="py-12 border-b border-border overflow-hidden">
      <div className="container mx-auto px-4 mb-6 text-center md:text-left">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Trusted By</p>
      </div>

      <div className="relative flex overflow-x-hidden">
        {/* Desktop display */}
        <div className="hidden md:flex justify-between items-center w-full container mx-auto px-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((logo, i) => (
            <div key={i} className="text-xl font-bold font-heading">
              {logo}
            </div>
          ))}
        </div>

        {/* Mobile marquee */}
        <div className="md:hidden flex animate-marquee whitespace-nowrap gap-12 py-2 px-4 opacity-50 grayscale">
          {displayLogos.map((logo, i) => (
            <div key={`${logo}-${i}`} className="text-xl font-bold font-heading shrink-0">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
