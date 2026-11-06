import type { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, Plus } from 'lucide-react';
import { experience } from '@/data/experience';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Journey',
  description: `Education and experience from ${site.fullName}’s journey in computer science and software development.`,
  ...(site.url ? { alternates: { canonical: '/journey/' } } : {}),
};

export default function JourneyPage() {
  return (
    <main id="main" className="archive-page journey-section page-shell">
      <Link className="text-link" href="/">← Back to home</Link>
      <div className="section-label"><span className="accent-dot" /> THE JOURNEY</div>
      <h1 className="display section-title">BUILDING<br /><span className="outlined">MY FOUNDATION.</span></h1>
      <p className="section-intro">One idea, one challenge, and one lesson at a time.</p>
      <section className="timeline" aria-labelledby="timeline-title">
        <h2 id="timeline-title" className="sr-only">Education and experience</h2>
        {experience.map((item) => (
          <details key={item.id} className="timeline-item">
            <summary>
              <div className="timeline-icon"><GraduationCap size={23} strokeWidth={1.3} /></div>
              <div className="timeline-heading">
                <span className="micro">{item.type === 'education' ? 'EDUCATION' : 'EXPERIENCE'}</span>
                <h3>{item.organization}</h3>
                <p>{item.role}</p>
              </div>
              <span className="timeline-period micro">{item.period}</span>
              <Plus className="timeline-expand" size={20} />
            </summary>
            <div className="timeline-content"><p>{item.description}</p></div>
          </details>
        ))}
      </section>
    </main>
  );
}
