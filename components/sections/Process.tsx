'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Search, PenTool, Paintbrush, Code, CheckSquare, Rocket } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const steps = [
  { id: 1, title: 'Discovery', desc: 'Understanding your goals and requirements.', icon: Search },
  { id: 2, title: 'Wireframe', desc: 'Mapping out the structure and flow.', icon: PenTool },
  { id: 3, title: 'UI Design', desc: 'Creating the visual identity and mockups.', icon: Paintbrush },
  { id: 4, title: 'Development', desc: 'Building with modern technologies.', icon: Code },
  { id: 5, title: 'Testing', desc: 'Ensuring everything works perfectly.', icon: CheckSquare },
  { id: 6, title: 'Launch', desc: 'Deploying your new website to the world.', icon: Rocket },
];

export default function Process() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionWrapper className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">My Process</h2>
          <p className="text-muted-foreground text-lg">
            A proven methodology to ensure your project is delivered on time and exceeds expectations.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connecting Line - Desktop */}
          <div className="hidden md:block absolute top-[45px] left-[5%] right-[5%] h-[2px] bg-border z-0">
            {!shouldReduceMotion && (
              <motion.div
                className="h-full bg-primary origin-left"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            )}
            {shouldReduceMotion && <div className="h-full bg-primary" />}
          </div>

          {/* Connecting Line - Mobile */}
          <div className="block md:hidden absolute top-0 bottom-0 left-[39px] w-[2px] bg-border z-0">
             {!shouldReduceMotion && (
              <motion.div
                className="w-full bg-primary origin-top"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
             )}
             {shouldReduceMotion && <div className="w-full bg-primary" />}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="flex flex-row md:flex-col items-center md:text-center gap-6 md:gap-4"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-background border-4 border-muted flex items-center justify-center shadow-lg relative flex-shrink-0">
                    <Icon className="w-8 h-8 text-primary" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {step.id}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
