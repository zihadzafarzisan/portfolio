'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Palette, Code, ShoppingCart, Smartphone, Zap, Search, Globe, Layout, Shield } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { useSiteConfig } from '@/context/SiteConfigContext';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette,
  Code,
  ShoppingCart,
  Smartphone,
  Zap,
  Search,
  Globe,
  Layout,
  Shield,
};

export default function Services() {
  const { services } = useSiteConfig();
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionWrapper id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">What I Can Do</h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive solutions to help your business thrive in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Code;
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full flex flex-col items-start hover:-translate-y-2 transition-transform duration-300">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary mb-6">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
