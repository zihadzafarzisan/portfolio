import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { projects } from '@/data/projects';
import CaseStudy from '@/components/sections/CaseStudy';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }
  
  return {
    title: `${project.title} | Case Study`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await params;
  const projectIndex = projects.findIndex((p) => p.slug === resolvedParams.slug);
  
  if (projectIndex === -1) {
    notFound();
  }
  
  const project = projects[projectIndex];
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <main className="pt-24 pb-16 min-h-screen">
      <CaseStudy 
        project={project} 
        prevProject={prevProject} 
        nextProject={nextProject} 
      />
    </main>
  );
}
