import type { Metadata } from 'next';
import localFont from 'next/font/local';
import type { CSSProperties } from 'react';
import { site } from '@/config/site';
import { MotionProvider } from '@/components/MotionProvider';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { FridayChat } from '@/components/FridayChat';
import './globals.css';

const display = localFont({ src: '../public/fonts/Anton-Regular.ttf', variable: '--font-display', display: 'swap', weight: '400' });
const body = localFont({ src: '../public/fonts/Manrope-Variable.ttf', variable: '--font-body', display: 'swap', weight: '200 800' });
const handwriting = localFont({ src: '../public/fonts/Caveat-Variable.ttf', variable: '--font-handwriting', display: 'swap', weight: '400 700', preload: false });

export const metadata: Metadata = {
  title: { default: `${site.fullName} — ${site.profession}`, template: `%s | ${site.name}` },
  description: site.description,
  authors: [{ name: site.fullName }],
  ...(site.url ? { metadataBase: new URL(site.url), alternates: { canonical: '/' } } : {}),
  openGraph: {
    title: `${site.name} — Curious mind. Builder at heart.`,
    description: site.description,
    siteName: site.name,
    type: 'website',
    ...(site.url ? { url: site.url, images: [{ url: '/social-card.png', width: 1200, height: 630 }] } : {}),
  },
  twitter: { card: 'summary_large_image', title: site.fullName, description: site.description },
  icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const tokens = {
    '--background': site.appearance.background,
    '--foreground': site.appearance.text,
    '--accent': site.appearance.accent,
    '--muted': site.appearance.muted,
  } as CSSProperties;
  return (
    <html lang={site.language} className={`${display.variable} ${body.variable} ${handwriting.variable}`} style={tokens}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <MotionProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <FridayChat />
        </MotionProvider>
      </body>
    </html>
  );
}
