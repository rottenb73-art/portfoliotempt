import { Hero } from '@/components/Hero';
import { ProjectTimeline } from '@/components/ProjectTimeline';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { projectsSorted, COVER_PHOTO } from '@/lib/projects';

export default function Home() {
  return (
    <div className="page-wrapper">
      <Hero coverPhoto={COVER_PHOTO} />
      <ProjectTimeline projects={projectsSorted} />
      <About />
      <Contact />
    </div>
  );
}
