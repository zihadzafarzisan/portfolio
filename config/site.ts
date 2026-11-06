// Edit this file to update identity, contact details, copy, and appearance everywhere.
export const site = {
  name: 'ZISAN',
  fullName: 'Zihad Zafar Zisan',
  profession: 'CSE undergraduate student',
  university: 'BRAC University',
  language: 'en',
  avatar: {
    src: '/assets/avatar.png',
    alt: 'Illustrated avatar of Zihad Zafar Zisan',
  },
  // Add your own production URL before publishing. Leave empty for local development.
  url: '',
  description: 'Zihad Zafar Zisan — CSE student at BRAC University exploring software development, AI, automation, and practical, database-driven applications.',
  hero: {
    eyebrow: 'A curious mind. A work in progress.',
    lines: ['CURIOUS MIND.', 'BUILDER AT', 'HEART'],
    introduction: 'CSE student at BRAC University, exploring the space where software, AI, and real-world ideas come together.',
  },
  about: {
    heading: ['ALWAYS', 'LEARNING.', 'ALWAYS', 'BUILDING.'],
    paragraphs: [
      "I'm Zihad Zafar Zisan, a CSE student at BRAC University passionate about software development, AI, automation, and building practical, database-driven applications.",
      'I’m interested in interactive systems, backend logic, user-focused dashboards, and real-world software solutions. I enjoy experimenting with new technologies, solving complex problems, and turning ideas into functional projects.',
      'Always eager to learn, build, and grow as a software engineer.',
    ],
  },
  interests: [
    { title: 'Software development', text: 'Turning ideas into useful, functional applications.', icon: 'code' },
    { title: 'AI & automation', text: 'Exploring smarter ways to solve everyday problems.', icon: 'spark' },
    { title: 'Databases & backend', text: 'Getting curious about the logic behind the interface.', icon: 'database' },
    { title: 'Interactive systems', text: 'Connecting backend logic with user-focused experiences.', icon: 'layers' },
  ],
  contact: {
    email: 'zihad.zisann@gmail.com',
    phone: '+8801781205471',
    phoneDisplay: '+880 1781 205471',
    whatsapp: '8801781205471',
    github: 'https://github.com/zihadzafarzisan',
    // Add other verified social profile URLs here; empty values stay hidden.
    linkedin: '',
    instagram: '',
  },
  resume: '',
  appearance: {
    background: '#090909',
    text: '#f2efeb',
    accent: '#e32b3c',
    muted: '#a09c9a',
  },
  work: {
    title: 'SELECTED WORK',
    description: 'An evolving collection of things I build, explore, and learn along the way.',
    emptyTitle: 'A SPACE FOR\nWHAT’S NEXT.',
    emptyDescription: 'This is where I’ll share the things I build. More soon.',
  },
} as const;

export const motionStorageKey = `${site.name.toLowerCase()}-portfolio-motion`;

export const navigation = [
  { label: 'Home', href: '/', id: 'home' },
  { label: 'Work', href: '/projects/', id: 'work' },
  { label: 'Journey', href: '/journey/', id: 'journey' },
  { label: 'About', href: '/#about', id: 'about' },
  { label: 'Contact', href: '/#contact', id: 'contact' },
] as const;
