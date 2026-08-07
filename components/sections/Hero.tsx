'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { useSiteConfig } from '@/context/SiteConfigContext';

export default function Hero() {
  const { settings } = useSiteConfig();
  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice] = useState(() => typeof window !== 'undefined' && 'maxTouchPoints' in navigator && navigator.maxTouchPoints > 0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (!isTouchDevice) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTouchDevice]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <SectionWrapper id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob will-change-transform" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob animation-delay-2000 will-change-transform" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-muted/30 rounded-full blur-3xl animate-blob animation-delay-4000 will-change-transform" />
      </div>

      {/* Cursor gradient */}
      {!isTouchDevice && (
        <div
          className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--primary-rgb), 0.05), transparent 40%)`,
          }}
        />
      )}

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-6"
        >
          {settings.availableForFreelance && (
            <motion.div variants={itemVariants}>
              <Badge variant="success" className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {settings.freelanceStatusText}
              </Badge>
            </motion.div>
          )}
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold font-heading leading-tight">
            {settings.heroHeadline}
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-lg">
            {settings.heroSubhead}
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-4">
            <Button asChild>
              <Link href="#projects">View My Work</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={settings.calendlyUrl} target="_blank" rel="noopener noreferrer">Book a Call</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="#contact">Contact Me</Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative aspect-square max-w-md mx-auto lg:mx-0 lg:ml-auto w-full"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-accent/20 animate-pulse" />
          <Image
            src="/images/hero-avatar.png"
            alt="Zihad"
            fill
            className="object-cover rounded-full p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
