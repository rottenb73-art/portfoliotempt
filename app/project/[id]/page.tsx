import { projects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import { ProjectPageClient } from '@/components/ProjectPageClient';

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.id === id);
  const prev = projects[index - 1] ?? null;
  const next = projects[index + 1] ?? null;

  return <ProjectPageClient project={project} prev={prev} next={next} total={projects.length} />;
}
