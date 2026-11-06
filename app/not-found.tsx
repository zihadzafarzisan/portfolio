import { site } from '@/config/site';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main" className="page-shell not-found">
      <p className="section-label">404 / A SMALL DETOUR</p>
      <h1 className="display">LOST IN<br /><span className="accent-text">THE CODE?</span></h1>
      <p>Let’s get you back to {site.name}’s portfolio.</p>
      <Link className="button button-primary" href="/">Back to the good stuff ↗</Link>
    </main>
  );
}
