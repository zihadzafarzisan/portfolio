import Contact from '@/components/sections/Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Zisan',
  description: 'Get in touch with Zisan for your next web project.',
};

export default function ContactPage() {
  return (
    <main className="pt-24 pb-16 min-h-screen">
      <Contact />
    </main>
  );
}
