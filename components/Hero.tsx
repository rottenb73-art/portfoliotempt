'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Project } from '@/lib/projects';

interface HeroProps {
  projects: Project[];
}

// Rail glyph cycles ○ □ × alongside each project row, matching the marker
// rhythm used in the About and Contact sections.
const SYMBOLS = ['○', '□', '×'];

export function Hero({ projects }: HeroProps) {
  const [typedIndex, setTypedIndex] = useState(0);
  const subtitleText = '// architecture';

  useEffect(() => {
    if (typedIndex >= subtitleText.length) return;
    const t = setTimeout(() => setTypedIndex((i) => i + 1), 38);
    return () => clearTimeout(t);
  }, [typedIndex, subtitleText.length]);

  return (
    <section
      className="hero-section"
      style={{
        minHeight: 'min(100vh, 820px)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderBottom: '1px solid var(--black)',
        position: 'relative',
      }}
    >
      {/* LEFT PANEL — identity */}
      <div
        className="hero-identity"
        style={{
          borderRight: '1px solid var(--black)',
          display: 'flex',
          flexDirection: 'column',
          padding: 'clamp(1.25rem, 3vw, 2rem) clamp(1.5rem, 5vw, 3.5rem) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Title */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: 0, lineHeight: 0 }}>
            <span className="hero-title-clip" style={{ display: 'block' }}>
              <span
                className="hero-title-inner"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: 'clamp(2.2rem, 7.6vw, 5.6rem)',
                  letterSpacing: '-0.045em',
                  lineHeight: 1,
                  animationDelay: '0.1s',
                }}
              >
                AYDEN
              </span>
            </span>
            <span className="hero-title-clip" style={{ display: 'block' }}>
              <span
                className="hero-title-inner"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  fontSize: 'clamp(2.2rem, 7.6vw, 5.6rem)',
                  letterSpacing: '-0.045em',
                  lineHeight: 1,
                  animationDelay: '0.22s',
                }}
              >
                PETTIETTE
              </span>
            </span>
          </h1>

          {/* Typewriter */}
          <div style={{ marginTop: 'clamp(1.5rem, 3.5vw, 2.25rem)', height: '1.4rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                color: 'var(--gray-500)',
                letterSpacing: '0.04em',
              }}
            >
              {subtitleText.slice(0, typedIndex)}
              <span className="blink" style={{ borderLeft: '2px solid var(--gray-500)', marginLeft: '1px' }} />
            </span>
          </div>
        </div>

        {/* Bottom meta strip */}
        <div
          className="hero-meta"
          style={{
            borderTop: '1px solid var(--black)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: 'clamp(1rem, 3vw, 2rem)',
            padding: 'clamp(1rem, 2.5vw, 1.5rem) 0 clamp(1.25rem, 3vw, 1.75rem)',
          }}
        >
          {[
            ['INSTITUTION', 'Texas A&M'],
            ['DEGREE', 'BS.Arch'],
            ['PERIOD', '2024 — 2028'],
          ].map(([key, value]) => (
            <div key={key}>
              <div className="label" style={{ marginBottom: '0.5rem' }}>{key}</div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.72rem, 1.4vw, 0.84rem)',
                  fontWeight: 400,
                  lineHeight: 1.5,
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL — project index */}
      <nav
        aria-label="Projects"
        className="hero-directory-panel"
        style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      >
        <div
          style={{
            padding: 'clamp(1.25rem, 3vw, 2rem) clamp(1.5rem, 4vw, 2.5rem) clamp(1rem, 2.5vw, 1.5rem)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: 'clamp(1.45rem, 3.2vw, 2.4rem)',
              letterSpacing: '-0.035em',
              lineHeight: 1,
            }}
          >
            PROJECTS
          </h2>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--black)' }}>
          {projects.map((p, i) => (
            <Link
              key={p.id}
              href={`/project/${p.id}`}
              data-hover
              className="hero-directory-row"
              style={{
                gridTemplateColumns: 'clamp(24px, 3vw, 34px) minmax(0, 0.9fr) minmax(0, 1.1fr)',
                borderBottom: i < projects.length - 1 ? '1px solid var(--gray-100)' : 'none',
                textDecoration: 'none',
                color: 'var(--black)',
              }}
            >
              {/* Symbol rail */}
              <span
                className="hero-directory-rail"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '0.75rem',
                  paddingTop: 'clamp(0.75rem, 2vw, 1.1rem)',
                  borderRight: '1px solid var(--gray-100)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.5rem, 1.1vw, 0.6rem)',
                    color: 'var(--gray-300)',
                    lineHeight: 1,
                  }}
                >
                  {SYMBOLS[i % SYMBOLS.length]}
                </span>
              </span>

              {/* Wide slice */}
              <span
                className="hero-directory-thumb"
                style={{
                  display: 'block',
                  overflow: 'hidden',
                  background: 'var(--gray-50)',
                  borderRight: '1px solid var(--gray-100)',
                }}
              >
                {p.coverOverride && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.coverOverride}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                )}
              </span>

              {/* Meta */}
              <span
                className="hero-directory-meta"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: 'clamp(0.5rem, 1.5vw, 0.8rem)',
                  padding: 'clamp(0.75rem, 2vw, 1.1rem) clamp(1rem, 2.5vw, 1.75rem)',
                  minWidth: 0,
                }}
              >
                <span className="label" style={{ color: 'var(--gray-400)' }}>{p.semester}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: 'clamp(0.82rem, 1.7vw, 1.22rem)',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    lineHeight: 1.1,
                  }}
                >
                  {p.title}
                </span>

                {/* Revealed on hover — collapsed to zero height otherwise */}
                <span className="hero-directory-detail">
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 300,
                      fontSize: 'clamp(0.62rem, 1.3vw, 0.72rem)',
                      lineHeight: 1.8,
                      color: 'var(--gray-500)',
                      maxWidth: '46ch',
                    }}
                  >
                    {p.shortDescription}
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      marginTop: 'clamp(0.5rem, 1.2vw, 0.75rem)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'clamp(0.45rem, 0.95vw, 0.55rem)',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--beige-dark)',
                    }}
                  >
                    View Project <span aria-hidden="true">→</span>
                  </span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <style>{`
        /* Rows share the panel height evenly; hovering one steals the space
           back from its siblings, so the index reads as a single accordion. */
        .hero-directory-row {
          display: grid;
          align-items: stretch;
          flex: 1 1 0;
          min-height: clamp(72px, 9vh, 108px);
          transition: flex-grow 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.3s ease;
        }
        .hero-directory-detail {
          display: block;
          opacity: 0;
          max-height: 0;
          overflow: hidden;
          transform: translateY(6px);
          transition: opacity 0.3s ease, max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-directory-thumb img {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (hover: hover) {
          .hero-directory-row:hover {
            flex-grow: 2.6;
            background: var(--gray-50);
          }
          .hero-directory-row:hover .hero-directory-detail {
            opacity: 1;
            max-height: 10rem;
            margin-top: clamp(0.4rem, 1vw, 0.6rem);
            transform: translateY(0);
          }
          .hero-directory-row:hover .hero-directory-thumb img {
            transform: scale(1.04);
          }
        }

        /* Keyboard parity — tabbing the index expands the focused row too. */
        .hero-directory-row:focus-visible {
          flex-grow: 2.6;
          background: var(--gray-50);
          outline: 1px solid var(--black);
          outline-offset: -1px;
        }
        .hero-directory-row:focus-visible .hero-directory-detail {
          opacity: 1;
          max-height: 10rem;
          margin-top: clamp(0.4rem, 1vw, 0.6rem);
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-directory-row,
          .hero-directory-detail,
          .hero-directory-thumb img {
            transition: none;
          }
        }

        @media(max-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr !important;
            min-height: 0 !important;
          }
          .hero-identity {
            border-right: none !important;
            border-bottom: 1px solid var(--black);
            min-height: 72vh;
          }

          /* ── Static cards ───────────────────────────────────────
             The accordion is a desktop device: rows share a fixed panel
             height and one steals it back on hover. On touch there is no
             hover to steal with, so the rows just sat at a capped height
             with the panel clipping whatever did not fit — which is what
             was cutting the description off. Here each row is simply as
             tall as its own content.

             The panel's overflow has to go with it: it exists to clip the
             accordion, and left on it clips the taller cards instead. */
          .hero-directory-panel { overflow: visible !important; }
          .hero-directory-row {
            flex: none !important;
            min-height: 0;
            transition: none;
            /* Image over text, with the rail running down the side of both,
               so the cover gets the full width of the screen rather than
               splitting it with the title. */
            grid-template-columns: clamp(24px, 6vw, 34px) minmax(0, 1fr) !important;
            grid-template-areas: 'rail thumb' 'rail meta';
          }
          .hero-directory-rail {
            grid-area: rail;
            justify-content: flex-start;
          }
          .hero-directory-thumb {
            grid-area: thumb;
            aspect-ratio: 16 / 10;
            border-right: none !important;
            border-bottom: 1px solid var(--gray-100);
          }
          .hero-directory-meta {
            grid-area: meta;
            justify-content: flex-start !important;
            padding: clamp(0.9rem, 3vw, 1.25rem) clamp(1rem, 4vw, 1.5rem) clamp(1.25rem, 4vw, 1.75rem) !important;
          }
          /* Nothing to reveal it on touch, so the detail is simply part of
             the card. No max-height cap either — the row grows to hold it. */
          .hero-directory-detail {
            opacity: 1;
            max-height: none;
            margin-top: 0.5rem;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
