'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Project } from '@/lib/projects';
import { Carousel } from './Carousel';
import { ScrollReveal } from './ScrollReveal';
import { GlbViewer } from './GlbViewer';

export function ProjectPageClient({ project, prev, next }: { project: Project; prev: Project | null; next: Project | null }) {
  const imageItems = project.media.filter((m) => m.type === 'image');
  const glbItems = project.media.filter((m) => m.type === 'glb');

  // Drag-scroll for horizontal strip
  const hScrollRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const el = hScrollRef.current;
    if (!el) return;
    const down = (e: MouseEvent) => { dragging.current = true; startX.current = e.pageX - el.offsetLeft; scrollLeft.current = el.scrollLeft; el.style.cursor = 'grabbing'; };
    const up = () => { dragging.current = false; el.style.cursor = 'grab'; };
    const move = (e: MouseEvent) => { if (!dragging.current) return; e.preventDefault(); el.scrollLeft = scrollLeft.current - (e.pageX - el.offsetLeft - startX.current) * 1.4; };
    el.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    el.addEventListener('mousemove', move);
    return () => { el.removeEventListener('mousedown', down); window.removeEventListener('mouseup', up); el.removeEventListener('mousemove', move); };
  }, []);

  return (
    <div className="page-wrapper" style={{ paddingTop: '52px' }}>

      {/* ── HERO ── */}
      <div style={{ borderBottom: '1px solid var(--black)', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '50vh' }}>
        {/* Left: title block */}
        <div style={{ padding: '4rem 3rem', borderRight: '1px solid var(--black)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray-500)', textDecoration: 'none', marginBottom: '3rem', borderBottom: '1px solid var(--gray-100)', paddingBottom: '0.25rem' }}>
              ← all projects
            </Link>
            <div className="label" style={{ marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--beige-dark)', marginRight: '0.5rem' }}>○</span>{project.semester}
            </div>
            <h1 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(2rem,4vw,4.5rem)', letterSpacing: '-0.04em', lineHeight: 1, textTransform: 'uppercase', marginBottom: '2rem' }}>
              {project.title}
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 300, fontSize: '0.8rem', lineHeight: 1.9, color: 'var(--gray-700)', maxWidth: '380px' }}>
              {project.description}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            {project.tags.map((t) => (
              <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid var(--black)', padding: '0.15rem 0.5rem' }}>{t}</span>
            ))}
            {glbItems.length > 0 && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--black)', color: 'var(--white)', padding: '0.15rem 0.5rem' }}>○ 3D</span>
            )}
          </div>
        </div>

        {/* Right: stats grid */}
        <div style={{ padding: '4rem 3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', alignContent: 'start', gap: '0' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '5rem', fontWeight: 700, color: 'var(--gray-50)', lineHeight: 1, letterSpacing: '-0.05em', gridColumn: '1/-1', marginBottom: '2rem', userSelect: 'none' }}>
            {String(project.order).padStart(2, '0')}
          </div>
          {[
            ['□ Images', `${imageItems.length} files`],
            ['○ Models', `${glbItems.length} glb`],
            ['× Year', String(project.year)],
            ['□ Season', project.season],
          ].map(([k, v]) => (
            <div key={k} style={{ borderTop: '1px solid var(--gray-100)', padding: '1rem 0', paddingRight: '1rem' }}>
              <div className="label" style={{ marginBottom: '0.3rem' }}>{k}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 500 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CAROUSEL ── */}
      <div style={{ padding: '3rem', borderBottom: '1px solid var(--black)' }}>
        <div className="label" style={{ marginBottom: '1.5rem' }}>
          <span style={{ color: 'var(--beige-dark)', marginRight: '0.5rem' }}>□</span>Documentation — {project.media.length} files
        </div>
        <Carousel items={project.media} projectTitle={project.title} />
      </div>

      {/* ── HORIZONTAL IMAGE STRIP ── */}
      {imageItems.length > 3 && (
        <ScrollReveal>
          <div style={{ borderBottom: '1px solid var(--black)' }}>
            <div style={{ padding: '1.5rem 3rem 0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="label"><span style={{ color: 'var(--beige-dark)', marginRight: '0.5rem' }}>×</span>All images — drag to scan</span>
              <span className="label" style={{ color: 'var(--gray-300)' }}>{imageItems.length} files</span>
            </div>
            <div ref={hScrollRef} className="horizontal-scroll-container" style={{ display: 'flex', gap: '1px', padding: '0 3rem 3rem', cursor: 'grab' }}>
              {imageItems.map((img, i) => (
                <div key={i} style={{ flexShrink: 0, width: 320, height: 220, overflow: 'hidden', position: 'relative', background: 'var(--gray-50)', border: '1px solid var(--gray-100)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none', filter: 'grayscale(100%)', transition: 'filter 0.3s' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.filter = 'grayscale(0%)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.filter = 'grayscale(100%)')}
                  />
                  <div style={{ position: 'absolute', bottom: '0.5rem', left: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.45rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', pointerEvents: 'none', textTransform: 'uppercase' }}>
                    {CATEGORY_SYMBOL[img.category || ''] || '×'} {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* ── 3D MODELS ── */}
      {glbItems.length > 0 && (
        <ScrollReveal>
          <div style={{ background: 'var(--black)', borderBottom: '1px solid var(--gray-800)', padding: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '2rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', color: 'var(--gray-800)' }}>○</span>
              <div>
                <div className="label" style={{ color: 'var(--gray-600)', marginBottom: '0.3rem' }}>3D Model</div>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 300, fontSize: '0.8rem', color: 'var(--gray-400)', fontStyle: 'italic' }}>// slowly rotating — interactive</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${glbItems.length}, 1fr)`, gap: '1px' }}>
              {glbItems.map((glb, i) => <GlbViewer key={i} src={glb.src} height={520} />)}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* ── NAV ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {prev ? (
          <Link href={`/project/${prev.id}`} data-hover style={{ padding: '2.5rem 3rem', textDecoration: 'none', borderRight: '1px solid var(--black)', borderTop: '1px solid var(--black)', display: 'block', transition: 'background 0.2s' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--gray-50)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = 'transparent')}
          >
            <div className="label" style={{ marginBottom: '0.4rem' }}>← previous</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1rem', textTransform: 'uppercase', color: 'var(--black)', letterSpacing: '-0.02em' }}>{prev.title}</div>
            <div className="label" style={{ color: 'var(--gray-400)', marginTop: '0.2rem' }}>{prev.semester}</div>
          </Link>
        ) : <div style={{ borderRight: '1px solid var(--black)', borderTop: '1px solid var(--black)' }} />}

        {next ? (
          <Link href={`/project/${next.id}`} data-hover style={{ padding: '2.5rem 3rem', textDecoration: 'none', borderTop: '1px solid var(--black)', textAlign: 'right', display: 'block', transition: 'background 0.2s' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--gray-50)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = 'transparent')}
          >
            <div className="label" style={{ marginBottom: '0.4rem' }}>next →</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1rem', textTransform: 'uppercase', color: 'var(--black)', letterSpacing: '-0.02em' }}>{next.title}</div>
            <div className="label" style={{ color: 'var(--gray-400)', marginTop: '0.2rem' }}>{next.semester}</div>
          </Link>
        ) : <div style={{ borderTop: '1px solid var(--black)' }} />}
      </div>

    </div>
  );
}

const CATEGORY_SYMBOL: Record<string, string> = { Drawing: '□', Model: '○', Process: '×', Panel: '□' };
