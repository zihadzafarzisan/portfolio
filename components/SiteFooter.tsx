import { ArrowUpRight, ArrowUp, Code2 } from 'lucide-react';
import { site } from '@/config/site';
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer page-shell">
      <Link href="/" className="footer-wordmark display">{site.name}<span className="accent-text">.</span></Link>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {site.fullName}.<br /><span>Built with curiosity. Always evolving.</span></p>
        <div className="footer-links">
          <a href={site.contact.github} target="_blank" rel="noopener noreferrer"><Code2 size={15} /> GitHub <ArrowUpRight size={13} /></a>
          <a href={`mailto:${site.contact.email}`}>Email <ArrowUpRight size={13} /></a>
          <a href="#main" className="back-top">Back to top <ArrowUp size={14} /></a>
        </div>
      </div>
    </footer>
  );
}
