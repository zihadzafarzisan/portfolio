import type { Metadata } from 'next';
import Link from 'next/link';
import { Newspaper, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Blog | Coming Soon',
  description: 'Articles, tutorials, and thoughts on frontend engineering and web development.',
};

export default function BlogPage() {
  return (
    <main className="pt-24 pb-16 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse"></div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-full border border-gray-200 dark:border-gray-800 relative z-10">
              <Newspaper className="w-16 h-16 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold font-sora text-gray-900 dark:text-white mb-6">
          Blog
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
          I&apos;m working on some great content about frontend architecture, UI/UX patterns, and web performance. Check back soon!
        </p>
        
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 mb-10">
          <h2 className="text-xl font-bold font-sora text-gray-900 dark:text-white mb-4">
            Get notified when I publish
          </h2>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              required
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="button" className="py-3 px-6 h-auto">
              Subscribe
            </Button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            No spam, ever. Unsubscribe at any time.
          </p>
        </div>
        
        <Button asChild variant="ghost">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
    </main>
  );
}
