'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ArrowRight } from 'lucide-react';

const categories = ['All', 'Website Design', 'Ecommerce', 'Landing Page'];

export default function ProjectsGrid() {
  const { projects } = useSiteConfig();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = projects.filter((project) => 
    activeCategory === 'All' ? true : project.category === activeCategory
  );

  return (
    <div className="space-y-12">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? 'text-white'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {activeCategory === category && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-blue-600 rounded-full"
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={project.slug}
            >
              <Card className="overflow-hidden group h-full flex flex-col hover:border-blue-500/50 transition-colors border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 backdrop-blur-sm">
                <Link href={`/projects/${project.slug}`} className="flex-1 flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full font-medium flex items-center gap-2">
                        View Project <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <Badge className="mb-3 font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        {project.category}
                      </Badge>
                      <h3 className="text-xl font-bold font-sora mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                    <div className="mt-auto pt-4 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400">No projects found in this category.</p>
        </div>
      )}
    </div>
  );
}
