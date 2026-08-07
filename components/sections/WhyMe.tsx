'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const reasons = [
  "Fast Communication",
  "Mobile-First Design",
  "Pixel-Perfect Development",
  "SEO-Friendly Code",
  "Modern UI/UX",
  "Clean Animations"
];

export default function WhyMe() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionWrapper className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Why Work With Me</h2>
          <p className="text-muted-foreground text-lg">
            I bring a combination of design aesthetics and technical expertise to every project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason}
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : (index % 2 === 0 ? -20 : 20) }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-4 p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
            >
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
              <span className="text-lg font-medium">{reason}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
