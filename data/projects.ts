export interface Project {
  id: string;
  title: string;
  category: string;
  year?: string;
  summary: string;
  description: string;
  role?: string;
  tools: string[];
  coverImage?: string;
  coverAlt?: string;
  gallery?: { src: string; alt: string }[];
  videoUrl?: string;
  liveUrl?: string;
  sourceUrl?: string;
  featured?: boolean;
}

// Add your real projects here. Empty by the owner's request; no sample work is public.
// {
//   id: 'your-project', title: 'Your project title', category: 'Web application',
//   year: '2026', summary: 'What you built.', description: 'The problem and your solution.',
//   role: 'Your actual role', tools: ['Tools you used'],
//   coverImage: '/assets/projects/your-project.webp', coverAlt: 'Describe the screenshot',
//   gallery: [], liveUrl: '', sourceUrl: '', featured: true,
// }
export const projects: Project[] = [];
