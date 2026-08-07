export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    /* TODO: replace with real testimonials */
    name: 'Sarah Jenkins',
    role: 'CEO',
    company: 'Makario Coffee',
    quote: 'Working with Zisan was a game changer for our business. The new website not only looks incredible but has directly led to a 40% increase in online orders within the first month. Their attention to detail and understanding of our brand was exceptional.',
    avatar: '/images/testimonials/sarah.jpg',
  },
  {
    /* TODO: replace with real testimonials */
    name: 'David Chen',
    role: 'Founder',
    company: 'Pulse Fitness',
    quote: 'Zisan delivered a website that exceeded all our expectations. It is fast, intuitive, and the membership integration works flawlessly. Our clients constantly compliment the new digital experience.',
    avatar: '/images/testimonials/david.jpg',
  },
  {
    /* TODO: replace with real testimonials */
    name: 'Elena Rodriguez',
    role: 'Marketing Director',
    company: 'Zenith Finance',
    quote: 'We needed a high-converting landing page built quickly, and Zisan absolutely delivered. The modern design and smooth animations helped us build a waitlist of over 5,000 users before we even launched the product.',
    avatar: '/images/testimonials/elena.jpg',
  },
  {
    /* TODO: replace with real testimonials */
    name: 'Michael Chang',
    role: 'Product Manager',
    company: 'TechFlow Solutions',
    quote: 'Zisan has an incredible eye for design combined with deep technical expertise. They don\'t just write code; they solve real business problems through elegant digital solutions.',
    avatar: '/images/testimonials/michael.jpg',
  },
  {
    /* TODO: replace with real testimonials */
    name: 'Jessica Williams',
    role: 'Creative Director',
    company: 'Studio Arca',
    quote: 'Finding a frontend developer who truly understands design is rare, but Zisan bridges that gap perfectly. Their implementations are pixel-perfect and the attention to accessibility is commendable.',
    avatar: '/images/testimonials/jessica.jpg',
  }
];
