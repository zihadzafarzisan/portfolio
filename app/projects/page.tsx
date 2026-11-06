import type { Metadata } from 'next';
import Link from 'next/link';
import { ProjectExplorer } from '@/components/ProjectExplorer';
import { projects } from '@/data/projects';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Work',
  description: site.work.description,
  ...(site.url ? { alternates: { canonical: '/projects/' } } : {}),
};

export default function ProjectsPage() {
  return (
    <main id="main" className="archive-page page-shell">
      <Link className="text-link" href="/">← Back to home</Link>
      <div className="section-label"><span className="accent-dot" /> THE WORK</div>
      <h1 className="display section-title">SELECTED<br /><span className="outlined">WORK.</span></h1>
      <p className="section-intro">{site.work.description}</p>
      <ProjectExplorer projects={projects} />
    </main>
  );
}
