import About from '@/components/sections/About';
import { Button } from '@/components/ui/Button';
import { Download, Globe as Github, Star, GitFork } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About | Zisan',
  description: 'Learn more about Zisan, a senior frontend engineer specialized in Next.js and React.',
};

export default function AboutPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Reusing the About section for consistency */}
        <About />

        {/* Extended Bio */}
        <section className="max-w-4xl mx-auto mt-16 space-y-8">
          <div>
            <h2 className="text-3xl font-bold font-sora text-gray-900 dark:text-white mb-6">More About My Journey</h2>
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-4">
              <p>
                With over a decade of experience in software development, I have navigated through the evolution of web technologies, starting from vanilla JavaScript and jQuery to modern frameworks like React and Next.js. My passion lies in bridging the gap between design and engineering, ensuring that applications not only look beautiful but are also highly performant and accessible.
              </p>
              <p>
                I thrive in collaborative environments and enjoy mentoring junior developers, helping them level up their skills and confidence. Beyond coding, I am an active open-source contributor and regularly write about frontend architecture, UI/UX patterns, and web performance optimization.
              </p>
            </div>
          </div>

          {/* Skills and Expertise */}
          <div>
            <h3 className="text-2xl font-bold font-sora text-gray-900 dark:text-white mb-4">Core Competencies</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Frontend Architecture',
                'UI/UX Design Implementation',
                'Performance Optimization',
                'Accessibility (a11y)',
                'Design Systems',
                'State Management',
                'API Integration',
                'Agile Methodologies',
              ].map((skill) => (
                <div key={skill} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-center">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Stats Embed (Simulated) */}
          <div>
            <h3 className="text-2xl font-bold font-sora text-gray-900 dark:text-white mb-4">Open Source Activity</h3>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-white dark:bg-gray-900 p-3 rounded-full border border-gray-200 dark:border-gray-700">
                  <Github className="w-8 h-8 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg">@zisandev</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">1.2k+ Contributions in the last year</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-gray-900 dark:text-white">450</span>
                  </div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Stars</span>
                </div>
                <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 text-blue-500">
                    <GitFork className="w-4 h-4" />
                    <span className="font-bold text-gray-900 dark:text-white">120</span>
                  </div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Forks</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
