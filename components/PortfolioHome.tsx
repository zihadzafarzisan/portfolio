import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/config/site';


function OrbitalMark({ backgroundOnly = false }: { backgroundOnly?: boolean }) {
  return (
    <div className="orbital-art" aria-hidden="true" data-build={backgroundOnly ? undefined : true}>
      <div className="art-cross art-cross-one">+</div><div className="art-cross art-cross-two">+</div>
      <div className="art-coordinates micro">FIG. 01 / THE EXPLORER</div>
      <svg viewBox="0 0 460 460" className="orbit-svg" fill="none">
        <defs><radialGradient id="orb-gradient"><stop stopColor={site.appearance.accent} stopOpacity="0.13" /><stop offset="1" stopColor={site.appearance.accent} stopOpacity="0" /></radialGradient></defs>
        <circle cx="230" cy="230" r="215" fill="url(#orb-gradient)" />
        <circle cx="230" cy="230" r="171" stroke="currentColor" strokeOpacity="0.13" />
        <circle cx="230" cy="230" r="126" stroke="currentColor" strokeOpacity="0.07" />
        <g className="orbital-rings">
          <ellipse cx="230" cy="230" rx="198" ry="69" transform="rotate(-35 230 230)" stroke="var(--accent)" strokeWidth="1.2" />
          <ellipse cx="230" cy="230" rx="198" ry="69" transform="rotate(35 230 230)" stroke="currentColor" strokeOpacity="0.28" />
          <ellipse cx="230" cy="230" rx="198" ry="69" transform="rotate(90 230 230)" stroke="currentColor" strokeOpacity="0.14" />
          <circle cx="392" cy="116" r="5" fill="var(--accent)" /><circle cx="68" cy="116" r="3" fill="currentColor" />
        </g>
        {!backgroundOnly && <><path d="M178 162h109v23l-75 91h77v26H176v-23l75-91h-73z" fill="currentColor" /><path d="M171 319h121" stroke="var(--accent)" strokeWidth="3" /></>}
      </svg>
      {!backgroundOnly && <><span className="orb-label orb-label-one micro"><span className="accent-dot" /> SOFTWARE</span>
      <span className="orb-label orb-label-two micro">IDEAS → SYSTEMS</span>
      <div className="art-caption"><span className="handwritten">a little curiosity<br />goes a long way.</span><svg viewBox="0 0 70 55" fill="none"><path d="M5 5c-3 28 34 41 57 29m-12-5 14 4-6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div></>}
    </div>
  );
}

function HeroAvatar() {
  return (
    <figure className="hero-avatar" data-build>
      <div className="hero-avatar-frame">
        <OrbitalMark backgroundOnly />
        <div className="hero-avatar-portrait">
        <Image
          src={site.avatar.src}
          alt={site.avatar.alt}
          fill
          preload
          sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 800px) 40vw, 430px"
          className="hero-avatar-image"
        />
        </div>
      </div>
      <figcaption className="avatar-caption"><span className="avatar-name">{site.fullName.toUpperCase()}</span><span className="micro">ME, ILLUSTRATED.</span></figcaption>
    </figure>
  );
}

export function PortfolioHome() {
  return (
    <main id="main">
      <section className="hero page-shell" aria-labelledby="hero-title">
        <div className="hero-topline"><span className="micro">PERSONAL PORTFOLIO / {site.name}</span><span className="micro hero-student">{site.profession}<span className="accent-dot" />{site.university}</span></div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-greeting"><span className="greeting-line" /> HI, I’M {site.name}</p>
            <h1 id="hero-title" className="display hero-title" data-build>{site.hero.lines.map((line, index) => <span key={line} className={index === 2 ? 'accent-text' : ''}>{line}{index === 2 && <span className="hero-period">.</span>}</span>)}</h1>
            <p className="hero-intro" data-build>{site.hero.introduction}</p>
            <div className="hero-buttons" data-build><Link className="button button-primary" href="/projects/">Explore my work <ArrowUpRight size={18} /></Link><Link className="button button-text" href="/contact/">Get in touch <ArrowUpRight size={17} /></Link></div>
          </div>
          {site.avatar.src ? <HeroAvatar /> : <OrbitalMark />}
        </div>
        <div className="hero-bottom"><Link href="/about/" className="scroll-link micro"><ArrowUpRight size={14} /> MORE ABOUT ME</Link><span className="micro">LEARN. BUILD. ITERATE.<span className="tiny-cross">+</span></span></div>
      </section>

    </main>
  );
}
