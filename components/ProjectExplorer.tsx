'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Search, Plus } from 'lucide-react';
import type { Project } from '@/data/projects';
import { site } from '@/config/site';
import { filterProjects, projectCategories } from '@/lib/project-utils';
import { ProjectDialog } from './ProjectDialog';
import { useMotion } from './MotionProvider';

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState('All work');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(6);
  const [selected, setSelected] = useState<Project | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const { enabled } = useMotion();
  const categories = projectCategories(projects);
  const filtered = filterProjects(projects, category, query);

  if (projects.length === 0) return (
    <div className="work-empty" data-build>
      <div className="empty-top micro"><span><span className="accent-dot" /> THE COLLECTION</span><span>COMING SOON</span></div>
      <div className="empty-content"><div><h3 className="display">{site.work.emptyTitle.split('\n').map((line) => <span key={line}>{line}</span>)}</h3><p>{site.work.emptyDescription}</p></div><div className="empty-symbol" aria-hidden="true"><Plus strokeWidth={0.55} /><span className="empty-orbit" /></div></div>
      <div className="empty-bottom"><span className="micro">BUILT ON CURIOSITY.</span><Link className="text-link" href="/#contact">Let’s connect <ArrowUpRight size={17} /></Link></div>
    </div>
  );

  return (
    <div className="project-explorer">
      <div className="project-toolbar"><div className="project-filters" aria-label="Project categories">{categories.map((item) => <button key={item} aria-pressed={category === item} onClick={() => { setCategory(item); setLimit(6); }}>{item}</button>)}</div><label className="project-search"><Search size={16} /><span className="sr-only">Search projects</span><input type="search" placeholder="Search projects" value={query} onChange={(event) => { setQuery(event.target.value); setLimit(6); }} /></label></div>
      <p role="status" className="sr-only">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'} found</p>
      <div className="project-grid">{filtered.slice(0, limit).map((project, index) => <motion.button layout={enabled} initial={false} whileHover={enabled ? { y: -4 } : undefined} className="project-card" key={project.id} onClick={(event) => { trigger.current = event.currentTarget; setSelected(project); }} aria-haspopup="dialog"><div className="project-cover">{project.coverImage ? <Image src={project.coverImage} alt={project.coverAlt || project.title} fill sizes="(max-width: 700px) 100vw, 50vw" /> : <div className="project-typographic-cover" aria-hidden="true"><span className="micro">{project.category}</span><span className="display">{project.title}</span></div>}<span className="project-open"><ArrowUpRight size={25} /></span></div><div className="project-meta micro"><span>0{index + 1} / {project.category}</span><span>{project.year}</span></div><h3>{project.title}<ArrowUpRight size={22} /></h3><p>{project.summary}</p></motion.button>)}</div>
      {filtered.length === 0 && <div className="search-empty"><h3>No projects match just yet.</h3><p>Try another search or explore all the work.</p><button className="button button-outline" onClick={() => { setQuery(''); setCategory('All work'); }}>Clear filters <ArrowRight size={16} /></button></div>}
      {filtered.length > limit && <button className="button button-outline load-more" onClick={() => setLimit((value) => value + 6)}>Load more projects <Plus size={16} /></button>}
      <ProjectDialog project={selected} onClose={() => { setSelected(null); trigger.current?.focus(); }} />
    </div>
  );
}
