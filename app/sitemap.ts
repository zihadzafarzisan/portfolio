import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return site.url ? ['', '/projects/', '/journey/', '/about/', '/contact/'].map((path) => ({ url: `${site.url.replace(/\/$/, '')}${path || '/'}`, changeFrequency: 'monthly', priority: path ? 0.7 : 1 })) : [];
}
