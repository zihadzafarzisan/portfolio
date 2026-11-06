'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, Menu, Play, X } from 'lucide-react';
import { motion, useScroll } from 'framer-motion';
import { navigation, site } from '@/config/site';
import { useMotion } from './MotionProvider';
import { trapDialogFocus } from '@/lib/dialog-focus';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [motionNotice, setMotionNotice] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const { enabled, reducedMotion, replay, toggle } = useMotion();
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  function currentLocation(item: typeof navigation[number]): 'page' | undefined {
    return pathname.replace(/\/$/, '') === item.href.replace(/\/$/, '') ? 'page' : undefined;
  }

  useEffect(() => {
    if (menuOpen) { menu.current?.showModal(); const previous = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = previous; }; }
    menu.current?.close();
  }, [menuOpen]);

  function closeMenu() { setMenuOpen(false); trigger.current?.focus(); }

  function playMotion() {
    setMotionNotice(reducedMotion);
    if (!reducedMotion) replay();
  }

  function toggleMotion() {
    setMotionNotice(reducedMotion);
    if (!reducedMotion) toggle();
  }

  return (
    <>
      <header className="site-header">
        <motion.div className="scroll-progress" aria-hidden="true" style={{ scaleX: enabled ? scrollYProgress : 0 }} />
        <div className="header-inner page-shell">
          <Link href="/" className="wordmark" aria-label={`${site.name} — home`}><span className="brand-mark" aria-hidden="true">{site.name[0]}</span>{site.name}<span className="accent-text">.</span></Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => <Link key={item.id} href={item.href} aria-current={currentLocation(item)}>{item.label}<span className="nav-dot" /></Link>)}
          </nav>
          <div className="header-actions">
            <div className="motion-controls">
              <button className="motion-replay" onClick={playMotion} aria-label="Play build animation" title={reducedMotion ? 'Motion is paused by your device’s reduced-motion setting' : 'Play the build animation'}><Play size={11} fill="currentColor" /><span>Motion</span></button>
              <button className="motion-switch" role="switch" aria-checked={enabled} aria-disabled={reducedMotion} aria-label="Enable animations" onClick={toggleMotion} title="Animations respect your system’s reduced-motion preference"><span /></button>
              {motionNotice && reducedMotion && <div className="motion-notice"><p role="status">Your device’s reduced-motion setting is on. Turn it off in accessibility settings to play animations.</p><button className="icon-button" onClick={() => setMotionNotice(false)} aria-label="Dismiss motion message"><X size={14} /></button></div>}
            </div>
            <Link className="header-contact" href="/contact/">Let’s talk <ArrowUpRight size={16} /></Link>
            <button ref={trigger} className="menu-trigger icon-button" aria-label="Open navigation" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(true)}><Menu size={23} /></button>
          </div>
        </div>
      </header>
      <dialog id="mobile-navigation" ref={menu} tabIndex={-1} className="mobile-dialog" onKeyDown={trapDialogFocus} onCancel={closeMenu} onClick={(event) => { if (event.target === event.currentTarget) closeMenu(); }} onClose={() => setMenuOpen(false)} aria-label="Navigation">
        <div className="mobile-menu-inner">
          <div className="mobile-menu-heading"><span className="wordmark">{site.name}<span className="accent-text">.</span></span><button className="icon-button" onClick={closeMenu} aria-label="Close navigation"><X /></button></div>
          <nav aria-label="Mobile navigation">{navigation.map((item, index) => <Link href={item.href} key={item.id} onClick={closeMenu} aria-current={currentLocation(item)}><span className="micro">0{index + 1}</span>{item.label}<ArrowUpRight /></Link>)}</nav>
          <a className="mobile-email" href={`mailto:${site.contact.email}`}>{site.contact.email}<ArrowUpRight size={17} /></a>
        </div>
      </dialog>
    </>
  );
}
