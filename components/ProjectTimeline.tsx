'use client';
import { useState } from 'react';
import type { Project } from '@/lib/projects';
import { ScrollReveal } from './ScrollReveal';
import { ProjectCard } from './ProjectCard';

const SYMBOLS = ['○', '□', '×', '○'];

export function ProjectTimeline({ projects }: { projects: Project[] }) {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  return (
    <section id="work" style={{ background: 'var(--white)', paddingBottom: '6rem' }}>
      {/* Section header */}
      <div style={{ borderBottom: '1px solid var(--black)', padding: '3rem 3rem 2rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', color: 'var(--gray-100)', fontWeight: 700, userSelect: 'none' }}>□</span>
          <div>
            <div className="label" style={{ marginBottom: '0.4rem' }}>Selected Work</div>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(1.8rem,3vw,3rem)', letterSpacing: '-0.03em', lineHeight: 1 }}>
              PROJECTS
            </h2>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="label">{projects.length}x projects</div>
          <div className="label" style={{ color: 'var(--gray-300)', marginTop: '0.2rem' }}>2024 — 2026</div>
        </div>
      </div>

      {/* Project list */}
      <div>
        {projects.map((project, i) => (
          <ScrollReveal key={project.id} delay={i * 60}>
            <div style={{ borderBottom: '1px solid var(--black)', position: 'relative' }}>
              {/* Row index + symbol */}
              <div style={{
                position: 'absolute', top: '2rem', left: '3rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                zIndex: 2,
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--gray-200)', fontWeight: 300 }}>
                  {SYMBOLS[i]}
                </span>
                <span className="label" style={{ color: 'var(--gray-300)', writingMode: 'vertical-rl', fontSize: '0.55rem', letterSpacing: '0.2em' }}>
                  {project.semester}
                </span>
              </div>

              {/* Large background number */}
              <div style={{
                position: 'absolute', right: '3rem', top: '50%', transform: 'translateY(-50%)',
                fontFamily: 'var(--font-mono)', fontWeight: 700,
                fontSize: 'clamp(5rem,10vw,10rem)',
                lineHeight: 1, color: 'var(--gray-50)',
                userSelect: 'none', pointerEvents: 'none', zIndex: 0,
                letterSpacing: '-0.05em',
              }}>
                {String(projects.length - i).padStart(2, '0')}
              </div>

              <div style={{ paddingLeft: '7rem' }}>
                <ProjectCard
                  project={project}
                  isExpanded={activeProject === project.id}
                  onToggle={() => setActiveProject(activeProject === project.id ? null : project.id)}
                />
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
