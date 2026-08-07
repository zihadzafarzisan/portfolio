export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  technologies: string[];
  category: string;
  liveUrl: string;
  sourceUrl?: string;
  imageBefore: string;
  imageAfter: string;
  thumbnail: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: 'makario-coffee',
    title: 'Makario Coffee',
    description: 'Redesigned outdated ordering website, improved mobile experience, and modern premium branding.',
    longDescription: 'Makario Coffee needed a digital presence that matched their premium coffee offerings. The existing website was slow, difficult to navigate on mobile, and failed to capture the brand identity. I redesigned and rebuilt their e-commerce platform from the ground up.',
    problem: 'The client was losing potential online sales due to a clunky, non-responsive ordering system. Customers found it frustrating to customize their coffee orders on mobile devices. Additionally, the old design felt generic and didn\'t reflect the high quality of their artisanal coffee.',
    solution: 'I developed a modern, blazing-fast web application using Next.js and Tailwind CSS. The new ordering flow was optimized for mobile first, featuring intuitive customization options. I integrated Stripe for seamless payments and used Framer Motion to add delightful micro-interactions that elevate the premium feel of the brand.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Framer Motion'],
    category: 'Ecommerce',
    liveUrl: 'https://makariocoffee.com',
    imageBefore: '/images/projects/makario-coffee-before.jpg',
    imageAfter: '/images/projects/makario-coffee-after.jpg',
    thumbnail: '/images/projects/makario-coffee-thumb.jpg',
    featured: true,
  },
  {
    /* TODO: replace */
    slug: 'pulse-fitness',
    title: 'Pulse Fitness',
    description: 'Modern gym and fitness studio website with class scheduling and membership management.',
    longDescription: 'A comprehensive digital solution for a growing fitness studio, featuring a modern aesthetic and robust functionality.',
    problem: 'The fitness studio relied on manual class bookings and paper waivers, leading to administrative overhead and poor member experience.',
    solution: 'Built a sleek web application that automates class scheduling, membership sign-ups, and integrates digital waivers.',
    technologies: ['React', 'Tailwind CSS', 'Firebase', 'Node.js'],
    category: 'Website Design',
    liveUrl: 'https://pulsefitness.placeholder',
    imageBefore: '/images/projects/pulse-fitness-before.jpg',
    imageAfter: '/images/projects/pulse-fitness-after.jpg',
    thumbnail: '/images/projects/pulse-fitness-thumb.jpg',
    featured: true,
  },
  {
    /* TODO: replace */
    slug: 'zenith-finance',
    title: 'Zenith Finance',
    description: 'High-conversion landing page for an innovative fintech startup.',
    longDescription: 'A visually striking and highly optimized landing page designed to attract early adopters and investors for a new fintech product.',
    problem: 'The startup needed to quickly validate their product idea and build a waitlist before launching their main application.',
    solution: 'Designed and developed a fast, engaging landing page with clear calls-to-action and trust-building elements.',
    technologies: ['Next.js', 'TypeScript', 'Framer Motion', 'Figma'],
    category: 'Landing Page',
    liveUrl: 'https://zenithfinance.placeholder',
    imageBefore: '/images/projects/zenith-finance-before.jpg',
    imageAfter: '/images/projects/zenith-finance-after.jpg',
    thumbnail: '/images/projects/zenith-finance-thumb.jpg',
    featured: true,
  }
];
