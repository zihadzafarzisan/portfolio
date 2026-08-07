'use client';

import Link from 'next/link';
import { Globe as Github, Link as Linkedin, Mail, MessageCircle, Camera as Instagram } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Services', href: '/#services' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/#contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tight mb-4 inline-block">
              Zisan.
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              I design high-converting websites that help businesses look premium and get more customers.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/zisan" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2 rounded-full hover:bg-muted">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/zisan" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:hello@zisan.dev" aria-label="Email" className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/zisan" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to my newsletter for the latest design and development tips.
            </p>
            {/* Newsletter signup stub */}
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="hello@example.com"
                required
                aria-label="Email address"
                className="bg-muted px-4 py-2 rounded-lg border border-border/10 focus:outline-none focus:ring-2 focus:ring-primary w-full text-sm"
              />
              <button
                type="submit"
                className="bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors w-full"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © {/* TODO: update year */}{currentYear} Zisan. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
