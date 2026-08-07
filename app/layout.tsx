import type { Metadata } from 'next';
import { Sora, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { ThemeScript } from '@/components/layout/ThemeScript';
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import { SiteConfigProvider } from '@/context/SiteConfigContext';
import { PublicLayout } from '@/components/layout/PublicLayout';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Zisan — Web Designer & Developer',
    template: '%s | Zisan',
  },
  description: 'I design high-converting websites that help businesses look premium and get more customers.',
  keywords: ['web designer', 'web developer', 'freelance', 'Next.js', 'React', 'portfolio'],
  authors: [{ name: 'Zisan' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zisan.dev',
    siteName: 'Zisan',
    title: 'Zisan — Web Designer & Developer',
    description: 'I design high-converting websites that help businesses look premium and get more customers.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zisan — Web Designer & Developer',
    description: 'I design high-converting websites that help businesses look premium and get more customers.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sora.variable} ${inter.variable}`}>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased font-sans flex flex-col">
        <AdminAuthProvider>
          <SiteConfigProvider>
            <ThemeProvider>
              <PublicLayout>{children}</PublicLayout>
            </ThemeProvider>
          </SiteConfigProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
