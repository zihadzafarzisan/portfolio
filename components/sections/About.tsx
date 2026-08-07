'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { useSiteConfig } from '@/context/SiteConfigContext';

export default function About() {
  const { settings } = useSiteConfig();
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionWrapper id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">About Me</h2>
            <div className="prose prose-lg dark:prose-invert mb-8 text-muted-foreground">
              <p>{settings.aboutBio1}</p>
              <p>{settings.aboutBio2}</p>
            </div>
            
            <Button asChild size="lg" className="gap-2">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="w-5 h-5" />
                Download Resume
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-border">
              <Image
                src="/images/about-photo.jpg"
                alt="Zihad working"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <h3 className="font-bold mb-4">GitHub Contributions</h3>
              <div className="overflow-hidden rounded-md bg-muted/30 p-2 flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={`https://ghchart.rshah.org/${settings.githubUsername || 'zisan'}`} 
                  alt={`${settings.githubUsername}'s GitHub chart`} 
                  className="w-full max-w-full h-auto filter dark:invert dark:hue-rotate-180"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
