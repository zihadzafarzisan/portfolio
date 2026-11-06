import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ContactPanel } from '@/components/ContactPanel';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${site.fullName} by email, WhatsApp, or phone.`,
  ...(site.url ? { alternates: { canonical: '/contact/' } } : {}),
};

export default function ContactPage() {
  return (
    <main id="main" className="contact-section standalone-page" aria-labelledby="contact-title">
      <div className="page-shell">
        <Link className="text-link page-return" href="/">← Back to home</Link>
        <div className="section-label"><span className="accent-dot" /> LET’S CONNECT</div>
        <div className="contact-grid">
          <div className="contact-copy">
            <p className="handwritten contact-note">good things start with a hello.</p>
            <h1 id="contact-title" className="display section-title">GOT AN IDEA?<br />LET’S <span className="accent-text">TALK.</span><ArrowUpRight className="contact-arrow" strokeWidth={0.8} /></h1>
            <p>I’m always happy to connect, exchange ideas, and explore something new.</p>
          </div>
          <ContactPanel />
        </div>
      </div>
    </main>
  );
}
