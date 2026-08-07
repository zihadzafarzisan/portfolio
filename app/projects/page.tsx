import type { Metadata } from 'next';
import ProjectsGrid from '@/components/sections/ProjectsGrid';

export const metadata: Metadata = {
  title: 'All Projects | Zisan',
  description: 'A collection of my latest work in web design, ecommerce, and web applications.',
};

export default function ProjectsPage() {
  return (
    <main className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-sora text-gray-900 dark:text-white mb-4">
            All Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explore my portfolio of web applications, ecommerce platforms, and digital experiences built with modern technologies.
          </p>
        </header>
        
        <ProjectsGrid />
      </div>
    </main>
  );
}
