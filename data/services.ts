// We define the type and export the data, 
// lucide icons can be imported dynamically or mapped in the component
export interface Service {
  icon: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    icon: 'Palette',
    title: 'Website Design',
    description: 'Crafting visually stunning, modern, and user-centric interfaces tailored to your brand.',
  },
  {
    icon: 'Code',
    title: 'Frontend Development',
    description: 'Building fast, accessible, and scalable web applications using the latest technologies.',
  },
  {
    icon: 'ShoppingCart',
    title: 'Ecommerce',
    description: 'Developing high-converting online stores that provide seamless shopping experiences.',
  },
  {
    icon: 'Smartphone',
    title: 'Responsive Design',
    description: 'Ensuring your website looks and functions perfectly across all devices and screen sizes.',
  },
  {
    icon: 'Zap',
    title: 'Website Speed Optimization',
    description: 'Optimizing performance for blazing-fast load times and improved user retention.',
  },
  {
    icon: 'Search',
    title: 'SEO Basics',
    description: 'Implementing technical SEO best practices to improve your visibility on search engines.',
  }
];
