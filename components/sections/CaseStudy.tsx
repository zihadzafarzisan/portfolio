'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/data/projects';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ExternalLink, Globe as Github, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

// Inline ImageSlider component since we're not sure if it exists in components/ui
function ImageSlider({ before, after, alt }: { before: string; after: string; alt: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 cursor-ew-resize select-none"
         onMouseMove={(e) => {
           const rect = e.currentTarget.getBoundingClientRect();
           const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
           setSliderPosition((x / rect.width) * 100);
         }}
         onTouchMove={(e) => {
           const rect = e.currentTarget.getBoundingClientRect();
           const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
           setSliderPosition((x / rect.width) * 100);
         }}>
      
      {/* After Image (Background) */}
      <Image src={after} alt={`After: ${alt}`} fill className="object-cover" />
      
      {/* Before Image (Foreground overlay) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <Image src={before} alt={`Before: ${alt}`} fill className="object-cover max-w-none" style={{ width: '100cqw' }} />
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10 flex items-center justify-center pointer-events-none"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-900 border border-gray-200">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18-6-6 6-6"/><path d="m15 18 6-6-6-6"/></svg>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 text-xs font-medium rounded-full z-20 pointer-events-none transition-opacity" style={{ opacity: sliderPosition > 10 ? 1 : 0 }}>
        Before
      </div>
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 text-xs font-medium rounded-full z-20 pointer-events-none transition-opacity" style={{ opacity: sliderPosition < 90 ? 1 : 0 }}>
        After
      </div>
    </div>
  );
}

interface CaseStudyProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

export default function CaseStudy({ project, prevProject, nextProject }: CaseStudyProps) {
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Back link */}
        <div className="mb-12">
          <Link href="/projects" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all projects
          </Link>
        </div>

        {/* Hero Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center space-y-6"
        >
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 py-1.5 px-4 text-sm hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors border-0">
            {project.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sora text-gray-900 dark:text-white tracking-tight">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-6">
            {project.liveUrl && (
              <Button asChild size="lg" className="rounded-full shadow-lg shadow-blue-500/20">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Live Site
                </a>
              </Button>
            )}
            {project.sourceUrl && (
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Source Code
                </a>
              </Button>
            )}
          </div>
        </motion.header>

        {/* Image Slider */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <ImageSlider 
            before={project.imageBefore} 
            after={project.imageAfter} 
            alt={project.title} 
          />
          <p className="text-center text-sm text-gray-500 mt-4 italic">Drag slider to compare before and after</p>
        </motion.section>

        {/* Content Details */}
        <div className="space-y-16">
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-12 gap-8"
          >
            <div className="md:col-span-4">
              <h2 className="text-2xl font-bold font-sora text-gray-900 dark:text-white sticky top-24">The Overview</h2>
            </div>
            <div className="md:col-span-8 prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300">
              <p>{project.longDescription}</p>
            </div>
          </motion.section>

          <hr className="border-gray-200 dark:border-gray-800" />

          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-12 gap-8"
          >
            <div className="md:col-span-4">
              <h2 className="text-2xl font-bold font-sora text-gray-900 dark:text-white sticky top-24">The Problem</h2>
            </div>
            <div className="md:col-span-8 prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300">
              <p>{project.problem}</p>
            </div>
          </motion.section>

          <hr className="border-gray-200 dark:border-gray-800" />

          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-12 gap-8"
          >
            <div className="md:col-span-4">
              <h2 className="text-2xl font-bold font-sora text-gray-900 dark:text-white sticky top-24">The Solution</h2>
            </div>
            <div className="md:col-span-8 prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300">
              <p>{project.solution}</p>
            </div>
          </motion.section>

          <hr className="border-gray-200 dark:border-gray-800" />

          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-12 gap-8"
          >
            <div className="md:col-span-4">
              <h2 className="text-2xl font-bold font-sora text-gray-900 dark:text-white sticky top-24">Technologies</h2>
            </div>
            <div className="md:col-span-8 flex flex-wrap gap-3">
              {project.technologies.map(tech => (
                <Badge key={tech} className="text-sm px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">
                  {tech}
                </Badge>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Navigation */}
        <nav className="mt-24 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          {prevProject ? (
            <Link href={`/projects/${prevProject.slug}`} className="group flex items-center w-full sm:w-auto text-left">
              <div className="mr-4 p-3 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Previous Project</span>
                <span className="block font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{prevProject.title}</span>
              </div>
            </Link>
          ) : <div className="hidden sm:block flex-1" />}

          <Link href="/projects" className="hidden sm:flex text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
          </Link>

          {nextProject ? (
            <Link href={`/projects/${nextProject.slug}`} className="group flex items-center w-full sm:w-auto text-right flex-row-reverse sm:flex-row justify-end">
              <div className="ml-4 p-3 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                <ArrowRight className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Next Project</span>
                <span className="block font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{nextProject.title}</span>
              </div>
            </Link>
          ) : <div className="hidden sm:block flex-1" />}
        </nav>
      </div>
    </div>
  );
}
