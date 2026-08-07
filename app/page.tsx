import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import Services from '@/components/sections/Services';
import WhyMe from '@/components/sections/WhyMe';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import TechStack from '@/components/sections/TechStack';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import ClientLogos from '@/components/sections/ClientLogos';

export default function Home() {
  return (
    <main>
      <Hero />
      <ClientLogos />
      <Stats />
      <FeaturedProjects />
      <Services />
      <WhyMe />
      <Process />
      <Testimonials />
      <TechStack />
      <About />
      <Contact />
    </main>
  );
}
