'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, MessageCircle, Link as Linkedin, Globe as Github, Camera as Instagram, Loader2 } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { contactSchema, type ContactFormData } from '@/lib/validation';
import { useSiteConfig } from '@/context/SiteConfigContext';

const faqs = [
  {
    question: "What is your pricing?",
    answer: "My pricing varies based on project scope and complexity. I offer competitive rates for freelance work. Let's discuss your project and I'll provide a custom quote."
  },
  {
    question: "How long does a project take?",
    answer: "Most websites take 2-4 weeks from start to finish. Complex projects may take longer. I'll give you a timeline during our discovery call."
  },
  {
    question: "How many revisions do I get?",
    answer: "I include up to 3 rounds of revisions in every project. Additional revisions can be arranged at an hourly rate."
  },
  {
    question: "What technologies do you use?",
    answer: "I primarily work with React, Next.js, TypeScript, and Tailwind CSS. I choose the best tools for each project's needs."
  },
  {
    question: "Are you available for freelance work?",
    answer: "Yes! I'm currently taking on new projects. Book a call or send me a message to discuss your project."
  }
];

export default function Contact() {
  const { settings, addMessage } = useSiteConfig();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const socialLinks = [
    { icon: Mail, href: `mailto:${settings.email}`, label: "Email" },
    { icon: MessageCircle, href: settings.whatsapp, label: "WhatsApp" },
    { icon: Linkedin, href: settings.linkedin, label: "LinkedIn" },
    { icon: Github, href: settings.github, label: "GitHub" },
    { icon: Instagram, href: settings.instagram, label: "Instagram" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Add message to Admin store
      addMessage({
        name: data.name,
        email: data.email,
        message: data.message,
      });

      // Send to API route
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <SectionWrapper id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Get In Touch</h2>
          <p className="text-muted-foreground text-lg">
            Have a project in mind or just want to say hi? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Form Side */}
          <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
            <h3 className="text-2xl font-bold mb-6">Send me a message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>
              
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending...</>
                ) : 'Send Message'}
              </Button>

              {submitStatus === 'success' && (
                <div className="p-4 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 text-sm mt-4">
                  Message sent successfully! I&apos;ll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-sm mt-4">
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>

          {/* Info & FAQ Side */}
          <div className="flex flex-col gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Connect with me</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
              <Accordion items={faqs} />
            </div>

            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
              <h4 className="font-bold mb-2">Join my newsletter</h4>
              <p className="text-sm text-muted-foreground mb-4">Get occasional updates about web development and design.</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary"
                />
                <Button type="submit" variant="secondary">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
