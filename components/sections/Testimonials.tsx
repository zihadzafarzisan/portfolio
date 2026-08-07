'use client';

import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Card } from '@/components/ui/Card';
import { useSiteConfig } from '@/context/SiteConfigContext';

export default function Testimonials() {
  const { testimonials } = useSiteConfig();
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <SectionWrapper className="py-24 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">What Clients Say</h2>
          <p className="text-muted-foreground text-lg">
            Don&apos;t just take my word for it. Here&apos;s what others have to say about working with me.
          </p>
        </div>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap gap-6 py-4 px-4">
          {duplicatedTestimonials.map((testimonial, index) => (
            <Card key={`${testimonial.name}-${index}`} className="w-[350px] md:w-[450px] shrink-0 p-8 whitespace-normal flex flex-col justify-between">
              <blockquote className="text-lg italic mb-6">&ldquo;{testimonial.quote}&rdquo;</blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role} {testimonial.company ? `at ${testimonial.company}` : ''}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
