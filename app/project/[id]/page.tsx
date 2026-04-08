import { projects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import { ProjectPageClient } from '@/components/ProjectPageClient';

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.id === params.id);
  const prev = projects[index - 1] ?? null;
  const next = projects[index + 1] ?? null;

  return <ProjectPageClient project={project} prev={prev} next={next} />;
}
