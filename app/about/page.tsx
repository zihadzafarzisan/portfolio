import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Code2, Database, Layers3, Plus, Sparkles } from 'lucide-react';
import { site } from '@/config/site';

const skillIcons = { code: Code2, database: Database, layers: Layers3, spark: Sparkles };

export const metadata: Metadata = {
  title: 'About',
  description: site.about.paragraphs[0],
  ...(site.url ? { alternates: { canonical: '/about/' } } : {}),
};

export default function AboutPage() {
  return (
    <main id="main" className="about-section standalone-page" aria-labelledby="about-title">
      <div className="page-shell">
        <Link className="text-link page-return" href="/">← Back to home</Link>
        <div className="section-label"><span className="accent-dot" /> THE PERSON BEHIND THE CODE</div>
        <div className="about-grid">
          <div>
            <h1 id="about-title" className="display section-title about-title">
              {site.about.heading.map((line, index) => <span key={index} className={index === 3 ? 'accent-text' : ''}>{line}</span>)}
            </h1>
            <span className="handwritten about-note">the journey is the good part.</span>
          </div>
          <div className="about-copy">
            <p className="about-lead">{site.about.paragraphs[0]}</p>
            {site.about.paragraphs.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="about-signature">
              <span className="signature-name handwritten">{site.name.charAt(0)}{site.name.slice(1).toLowerCase()}</span>
              <span className="micro">STUDENT. EXPLORER. BUILDER.</span>
            </div>
            {site.resume && <a className="text-link" href={site.resume} target="_blank" rel="noopener noreferrer">Download my résumé <ArrowUpRight size={16} /></a>}
          </div>
        </div>
        <section className="skills-section" aria-labelledby="skills-title">
          <div className="skills-header"><h2 id="skills-title" className="micro">TECHNICAL SKILLS</h2><Plus size={15} aria-hidden="true" /></div>
          <div className="skills-list">
            {site.skills.map((group) => {
              const Icon = skillIcons[group.icon];
              return (
                <div className="skill-group" key={group.title}>
                  <h3><Icon size={20} strokeWidth={1.3} aria-hidden="true" />{group.title}</h3>
                  <ul className="skill-tags">{group.items.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
