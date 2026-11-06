'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import Link from 'next/link';
import type { ChatMessage } from '@/lib/friday';

export function FridayChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const field = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const transcript = useRef<HTMLDivElement>(null);
  const controller = useRef<AbortController | null>(null);
  const widget = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const footerLinks = document.querySelector('.footer-links');
    const element = widget.current;
    if (!footerLinks || !element) return;
    let frame = 0;
    function reposition() {
      frame = 0;
      if (!footerLinks || !element) return;
      const bounds = footerLinks.getBoundingClientRect();
      const currentLift = parseFloat(element.style.getPropertyValue('--friday-lift')) || 0;
      const base = parseFloat(getComputedStyle(element).bottom) - currentLift;
      const lift = bounds.bottom > 0 && bounds.top < window.innerHeight
        ? Math.max(0, window.innerHeight - bounds.top + 16 - base) : 0;
      element.style.setProperty('--friday-lift', `${lift}px`);
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(reposition); }
    const observer = new ResizeObserver(schedule);
    observer.observe(footerLinks);
    observer.observe(document.body);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reposition();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => { if (open) field.current?.focus(); }, [open]);
  useEffect(() => { if (open && transcript.current) transcript.current.scrollTop = transcript.current.scrollHeight; }, [messages, busy, error, open]);
  function close() { setOpen(false); trigger.current?.focus(); }

  async function send(text: string) {
    if (!text.trim() || busy) return;
    const message: ChatMessage = { role: 'user', text: text.trim() };
    const history = [...messages.slice(-4), message];
    setInput(''); setError(''); setBusy(true); setMessages(history);
    controller.current = new AbortController();
    try {
      const response = await fetch('/api/chat/', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }), signal: controller.current.signal,
      });
      const data = await response.json();
      if (!response.ok || typeof data.text !== 'string') throw new Error(data.error || 'Friday is unavailable. Please try again.');
      setMessages([...history, { role: 'model', text: data.text }]);
    } catch (failure) {
      setMessages(history.slice(0, -1));
      setInput(message.text);
      setError(failure instanceof Error ? failure.message : 'Connection lost. Please try again.');
    } finally { setBusy(false); field.current?.focus(); }
  }

  return (
    <div ref={widget} className="friday-widget">
      {open && <section id="friday-chat" className="friday-panel" role="dialog" aria-modal="false" aria-labelledby="friday-title" onKeyDown={(event) => { if (event.key === 'Escape') { event.stopPropagation(); close(); } }}>
        <div className="friday-heading"><div><h2 id="friday-title">Friday<span className="accent-dot" /></h2><p>Zisan’s portfolio assistant</p></div><button type="button" className="icon-button" onClick={close} aria-label="Close Friday chat"><X size={18} /></button></div>
        <div ref={transcript} className="friday-transcript" role="log" aria-label="Conversation with Friday" aria-live="polite" aria-relevant="additions text">
          <p className="friday-message friday-model">Hello! I am Friday, the AI assistant of ZISAN. How can I help you today?</p>
          {messages.map((message, index) => <div className={`friday-message friday-${message.role}`} key={index}><span className="sr-only">{message.role === 'user' ? 'You' : 'Friday'}: </span>{message.text}</div>)}
          {busy && <p className="friday-status" role="status">Friday is thinking…</p>}
          {error && <p className="friday-error" role="alert">{error} <Link href="/contact/" onClick={close}>Contact Zisan</Link></p>}
        </div>
        {!messages.length && !busy && <div className="friday-suggestions">{['What are Zisan’s skills?', 'Tell me about FRIDAY projects.'].map((question) => <button type="button" key={question} onClick={() => void send(question)}>{question}</button>)}</div>}
        <form className="friday-form" onSubmit={(event) => { event.preventDefault(); void send(input); }}>
          <label className="sr-only" htmlFor="friday-question">Ask Friday a question</label><input ref={field} id="friday-question" placeholder="Ask about Zisan…" value={input} maxLength={1000} onChange={(event) => setInput(event.target.value)} required autoComplete="off" /><button type="submit" disabled={busy || !input.trim()} aria-label="Send message"><Send size={18} /></button>
        </form>
        <div className="friday-footnote"><span>Messages go to Google Gemini. AI can make mistakes.</span><button type="button" disabled={busy} onClick={() => { setMessages([]); setError(''); setInput(''); field.current?.focus(); }}>New chat</button></div>
      </section>}
      <button ref={trigger} type="button" className="friday-trigger" aria-label={open ? 'Close Friday chat' : 'Chat with Friday'} aria-expanded={open} aria-controls={open ? 'friday-chat' : undefined} onClick={() => open ? close() : setOpen(true)}><MessageCircle size={20} /><span>Ask Friday</span></button>
    </div>
  );
}
