import type { Project } from '../data/projects';

export function projectCategories(items: Project[]) {
  return ['All work', ...new Set(items.map((project) => project.category).filter(Boolean))];
}

export function filterProjects(items: Project[], category: string, query: string) {
  const normalized = query.trim().toLocaleLowerCase();
  return items.filter((project) =>
    (category === 'All work' || project.category === category) &&
    (!normalized || [project.title, project.summary, project.description, ...project.tools]
      .join(' ').toLocaleLowerCase().includes(normalized)),
  ).sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
}

export function youtubeEmbed(url?: string) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return null;
    const host = parsed.hostname.replace(/^www\./, '');
    const id = host === 'youtu.be' ? parsed.pathname.slice(1)
      : host === 'youtube.com' ? parsed.searchParams.get('v')
      : null;
    return id && /^[A-Za-z0-9_-]{11}$/.test(id)
      ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1` : null;
  } catch { return null; }
}
