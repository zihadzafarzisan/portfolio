'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Code2, Mail, MessageCircle, Phone } from 'lucide-react';
import { site } from '@/config/site';

export function ContactPanel() {
  const [notice, setNotice] = useState('');
  const [copied, setCopied] = useState(false);
  function createDraft(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `A hello from ${String(data.get('name')).trim()}`;
    const body = `${String(data.get('message')).trim()}\n\nFrom: ${String(data.get('name')).trim()}\nReply to: ${String(data.get('email')).trim()}`;
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNotice('Email draft requested. Complete and send it in your email app. If it doesn’t open, use the email link above or WhatsApp.');
  }
  async function copyEmail() {
    try { await navigator.clipboard.writeText(site.contact.email); setCopied(true); setNotice('Email address copied.'); }
    catch { setNotice(`Copy this address: ${site.contact.email}`); }
  }
  return (
    <div className="contact-panel">
      <div className="contact-email-row"><a className="contact-email" href={`mailto:${site.contact.email}`}>{site.contact.email}<ArrowUpRight size={19} /></a><button className="icon-button copy-button" aria-label="Copy email address" onClick={copyEmail}>{copied ? <Check size={16} /> : <Copy size={16} />}</button></div>
      <div className="contact-direct"><a href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(`Hi ${site.name}, I’d like to connect!`)}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> WhatsApp <ArrowUpRight size={13} /></a><a href={`tel:${site.contact.phone}`}><Phone size={15} /> {site.contact.phoneDisplay}</a><a href={site.contact.github} target="_blank" rel="noopener noreferrer"><Code2 size={16} /> GitHub <ArrowUpRight size={13} /></a></div>
      <div className="contact-form-divider"><span className="micro">OR PUT YOUR THOUGHTS INTO WORDS</span></div>
      <form className="contact-form" onSubmit={createDraft}>
        <div className="form-row"><label>Your name<input name="name" autoComplete="name" placeholder="What should I call you?" required minLength={2} maxLength={100} /></label><label>Your email<input type="email" name="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label></div>
        <label>What’s on your mind?<textarea name="message" placeholder="An idea, a question, or just a hello…" required minLength={10} maxLength={2000} rows={3} /></label>
        <div className="form-bottom"><p><Mail size={13} /> Opens your email app.<br />Nothing is sent automatically.</p><button type="submit" className="button button-primary">Open email draft <ArrowUpRight size={17} /></button></div>
      </form>
      <p className="contact-notice" role="status" aria-live="polite">{notice}</p>
    </div>
  );
}
