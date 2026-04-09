'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Project } from '@/lib/projects';
import { Carousel } from './Carousel';
import { ScrollReveal } from './ScrollReveal';

export function ProjectPageClient({ project, prev, next }: { project: Project; prev: Project | null; next: Project | null }) {
  const imageItems = project.media.filter((m) => m.type === 'image');

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
      <div className="project-hero-grid" style={{ 
        borderBottom: '1px solid var(--black)', 
        display: 'grid', 
        gridTemplateColumns: '1fr', 
        minHeight: '50vh' 
      }}>
        <div style={{ 
          padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 3rem)', 
          borderRight: '1px solid var(--black)', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between' 
        }}>
          <div>
            <Link href="/" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              fontFamily: 'var(--font-mono)', 
              fontSize: 'clamp(0.55rem, 1.2vw, 0.6rem)', 
              letterSpacing: '0.12em', 
              textTransform: 'uppercase', 
              color: 'var(--gray-500)', 
              textDecoration: 'none', 
              marginBottom: 'clamp(2rem, 4vw, 3rem)', 
              borderBottom: '1px solid var(--gray-100)', 
              paddingBottom: '0.25rem' 
            }}>
              ← all projects
            </Link>
            <div className="label" style={{ marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--beige-dark)', marginRight: '0.5rem' }}>○</span>{project.semester}
            </div>
            <h1 style={{ 
              fontFamily: 'var(--font-mono)', 
              fontWeight: 700, 
              fontSize: 'clamp(1.8rem, 5vw, 4.5rem)', 
              letterSpacing: '-0.04em', 
              lineHeight: 1, 
              textTransform: 'uppercase', 
              marginBottom: 'clamp(1.5rem, 3vw, 2rem)' 
            }}>
              {project.title}
            </h1>
            <p style={{ 
              fontFamily: 'var(--font-mono)', 
              fontWeight: 300, 
              fontSize: 'clamp(0.7rem, 1.6vw, 0.8rem)', 
              lineHeight: 1.9, 
              color: 'var(--gray-700)', 
              maxWidth: '380px' 
            }}>
              {project.shortDescription}
            </p>
          </div>
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            flexWrap: 'wrap', 
            marginTop: 'clamp(1.5rem, 3vw, 2rem)' 
          }}>
            {project.tags.map((t) => (
              <span key={t} style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: 'clamp(0.5rem, 1.1vw, 0.55rem)', 
                letterSpacing: '0.1em', 
                textTransform: 'uppercase', 
                border: '1px solid var(--black)', 
                padding: '0.15rem 0.5rem' 
              }}>{t}</span>
            ))}
          </div>
        </div>
        <div className="project-meta-grid" style={{ 
          padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 3rem)', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
          alignContent: 'start', 
          gap: '0' 
        }}>
          <div style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: 'clamp(3rem, 8vw, 5rem)', 
            fontWeight: 700, 
            color: 'var(--gray-50)', 
            lineHeight: 1, 
            letterSpacing: '-0.05em', 
            gridColumn: '1/-1', 
            marginBottom: 'clamp(1.5rem, 3vw, 2rem)', 
            userSelect: 'none' 
          }}>
            {String(project.order).padStart(2, '0')}
          </div>
          {[
            ['□ Images', `${imageItems.length} files`],
            ['× Year', String(project.year)],
            ['○ Season', project.season],
            ['□ Semester', project.semester],
          ].map(([k, v]) => (
            <div key={k} style={{ 
              borderTop: '1px solid var(--gray-100)', 
              padding: 'clamp(0.75rem, 2vw, 1rem) 0', 
              paddingRight: '1rem' 
            }}>
              <div className="label" style={{ marginBottom: '0.3rem' }}>{k}</div>
              <div style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: 'clamp(0.7rem, 1.6vw, 0.8rem)', 
                fontWeight: 500 
              }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CAROUSEL ── */}
      <div style={{ 
        padding: 'clamp(2rem, 5vw, 3rem)', 
        borderBottom: '1px solid var(--black)' 
      }}>
        <div className="label" style={{ marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
          <span style={{ color: 'var(--beige-dark)', marginRight: '0.5rem' }}>□</span>Documentation — {imageItems.length} files
        </div>
        <Carousel items={project.media} projectTitle={project.title} />
      </div>

      {/* ── HORIZONTAL IMAGE STRIP ── */}
      {imageItems.length > 3 && (
        <ScrollReveal>
          <div style={{ borderBottom: '1px solid var(--black)' }}>
            <div style={{ 
              padding: 'clamp(1rem, 2.5vw, 1.5rem) clamp(1.5rem, 5vw, 3rem) clamp(0.5rem, 1.5vw, 0.75rem)', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'baseline',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <span className="label"><span style={{ color: 'var(--beige-dark)', marginRight: '0.5rem' }}>×</span>All images — drag to scan</span>
              <span className="label" style={{ color: 'var(--gray-300)' }}>{imageItems.length} files</span>
            </div>
            <div ref={hScrollRef} className="horizontal-scroll-container" style={{ 
              display: 'flex', 
              gap: '1px', 
              padding: '0 clamp(1.5rem, 5vw, 3rem) clamp(2rem, 5vw, 3rem)', 
              cursor: 'grab' 
            }}>
              {imageItems.map((img, i) => (
                <div key={i} style={{ 
                  flexShrink: 0, 
                  width: 'clamp(240px, 40vw, 320px)', 
                  height: 'clamp(160px, 27vw, 220px)', 
                  overflow: 'hidden', 
                  position: 'relative', 
                  background: 'var(--gray-50)', 
                  border: '1px solid var(--gray-100)' 
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt} style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    display: 'block', 
                    pointerEvents: 'none', 
                    filter: 'grayscale(100%)', 
                    transition: 'filter 0.3s' 
                  }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.filter = 'grayscale(0%)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.filter = 'grayscale(100%)')}
                  />
                  <div style={{ 
                    position: 'absolute', 
                    bottom: 'clamp(0.3rem, 1vw, 0.5rem)', 
                    left: 'clamp(0.5rem, 1.5vw, 0.75rem)', 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: 'clamp(0.4rem, 0.9vw, 0.45rem)', 
                    letterSpacing: '0.12em', 
                    color: 'rgba(255,255,255,0.6)', 
                    pointerEvents: 'none', 
                    textTransform: 'uppercase' 
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* ── NAV ── */}
      <div className="project-nav-grid" style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
        {prev ? (
          <Link href={`/project/${prev.id}`} data-hover style={{ 
            padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 5vw, 3rem)', 
            textDecoration: 'none', 
            borderRight: '1px solid var(--black)', 
            borderTop: '1px solid var(--black)', 
            display: 'block', 
            transition: 'background 0.2s' 
          }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--gray-50)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = 'transparent')}
          >
            <div className="label" style={{ marginBottom: '0.4rem' }}>← previous</div>
            <div style={{ 
              fontFamily: 'var(--font-mono)', 
              fontWeight: 700, 
              fontSize: 'clamp(0.85rem, 2vw, 1rem)', 
              textTransform: 'uppercase', 
              color: 'var(--black)', 
              letterSpacing: '-0.02em' 
            }}>{prev.title}</div>
            <div className="label" style={{ color: 'var(--gray-400)', marginTop: '0.2rem' }}>{prev.semester}</div>
          </Link>
        ) : <div style={{ borderRight: '1px solid var(--black)', borderTop: '1px solid var(--black)' }} />}
        {next ? (
          <Link href={`/project/${next.id}`} data-hover style={{ 
            padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 5vw, 3rem)', 
            textDecoration: 'none', 
            borderTop: '1px solid var(--black)', 
            textAlign: 'right', 
            display: 'block', 
            transition: 'background 0.2s' 
          }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--gray-50)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = 'transparent')}
          >
            <div className="label" style={{ marginBottom: '0.4rem' }}>next →</div>
            <div style={{ 
              fontFamily: 'var(--font-mono)', 
              fontWeight: 700, 
              fontSize: 'clamp(0.85rem, 2vw, 1rem)', 
              textTransform: 'uppercase', 
              color: 'var(--black)', 
              letterSpacing: '-0.02em' 
            }}>{next.title}</div>
            <div className="label" style={{ color: 'var(--gray-400)', marginTop: '0.2rem' }}>{next.semester}</div>
          </Link>
        ) : <div style={{ borderTop: '1px solid var(--black)' }} />}
      </div>

      <style>{`
        @media(min-width: 769px) {
          .project-hero-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .project-nav-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
