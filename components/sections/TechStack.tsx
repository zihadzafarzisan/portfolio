'use client';

import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { useSiteConfig } from '@/context/SiteConfigContext';

export default function TechStack() {
  const { techStack } = useSiteConfig();
  const allTech = [...techStack, ...techStack]; // for mobile marquee

  return (
    <SectionWrapper id="tech" className="py-20 border-y border-border">
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold font-heading">Technologies I Work With</h2>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-8 container mx-auto px-4">
        {techStack.map((tech) => (
          <div 
            key={tech.name} 
            className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl hover:bg-muted/50 transition-colors group cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center group-hover:border-primary transition-colors filter grayscale group-hover:grayscale-0 duration-300">
               <span className="font-bold text-xl" style={{ color: tech.color || 'var(--primary)' }}>
                 {tech.name.charAt(0)}
               </span>
            </div>
            <span className="font-medium text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {tech.name}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile Marquee */}
      <div className="md:hidden relative flex overflow-x-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-8 py-4 px-4">
          {allTech.map((tech, i) => (
            <div key={`${tech.name}-${i}`} className="flex flex-col items-center gap-2 shrink-0">
               <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center filter grayscale transition-all duration-300 hover:grayscale-0 hover:border-primary">
                 <span className="font-bold text-lg" style={{ color: tech.color || 'var(--primary)' }}>
                   {tech.name.charAt(0)}
                 </span>
               </div>
               <span className="text-xs text-muted-foreground">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
