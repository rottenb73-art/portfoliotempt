import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { projectsSorted, COVER_PHOTO } from '@/lib/projects';

export default function Home() {
  return (
    <div className="page-wrapper">
      <Hero projects={projectsSorted} />
      <About />
      <Contact coverPhoto={COVER_PHOTO} />
    </div>
  );
}
