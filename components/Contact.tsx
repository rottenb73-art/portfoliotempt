'use client';
import { ScrollReveal } from './ScrollReveal';

const CHANNELS = [
  { symbol: '○', label: 'EMAIL', value: 'ayden.pettiette@gmail.com', href: 'mailto:ayden.pettiette@gmail.com' },
  { symbol: '□', label: 'TAMU', value: 'ayden9606@tamu.edu', href: 'mailto:ayden9606@tamu.edu' },
  { symbol: '×', label: 'PHONE', value: '(210) 303-3729', href: 'tel:2103033729' },
  { symbol: '○', label: 'LINKEDIN', value: 'linkedin.com/in/ayden-pettiette', href: 'https://www.linkedin.com/in/ayden-pettiette-0b893a223/' },
  { symbol: '□', label: 'BASED IN', value: 'College Station, TX', href: null },
];

export function Contact({ coverPhoto }: { coverPhoto: string }) {
  return (
    <section id="contact" style={{ background: 'var(--white)', borderTop: '1px solid var(--black)' }}>
      <div className="contact-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        borderBottom: '1px solid var(--black)',
        alignItems: 'stretch'
      }}>
        {/* Statement */}
        <ScrollReveal>
          <div style={{
            padding: 'clamp(2.25rem, 5vw, 3.75rem) clamp(1.5rem, 5vw, 3.5rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%'
          }}>
            <div className="label" style={{ marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--gray-200)', marginRight: '0.6rem' }}>□</span>Contact
            </div>
            <h2 style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: 'clamp(1.4rem, 3.2vw, 2.7rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              marginBottom: 'clamp(1.1rem, 2.2vw, 1.6rem)'
            }}>
              GET IN TOUCH
            </h2>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 300,
              fontSize: 'clamp(0.7rem, 1.5vw, 0.78rem)',
              lineHeight: 1.85,
              color: 'var(--gray-500)',
              maxWidth: '42ch'
            }}>
              // seeking internships · open for commissions<br />
              // — drawing, rendering, and CAD modeling
            </p>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 300,
              fontSize: 'clamp(0.65rem, 1.4vw, 0.72rem)',
              lineHeight: 1.85,
              color: 'var(--gray-400)',
              marginTop: 'clamp(0.9rem, 2vw, 1.25rem)'
            }}>
              // Rhino · AutoCAD · Revit · Adobe CS
            </p>
          </div>
        </ScrollReveal>

        {/* Channels */}
        <ScrollReveal delay={80}>
          <div style={{
            padding: 'clamp(1.75rem, 3.5vw, 2.5rem) clamp(1.5rem, 5vw, 3.5rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%'
          }}>
            {CHANNELS.map(({ symbol, label, value, href }) => (
              <div key={label} style={{
                borderBottom: '1px solid var(--gray-100)',
                padding: 'clamp(0.65rem, 1.5vw, 0.9rem) 0'
              }}>
                <div className="label" style={{ marginBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--gray-200)', marginRight: '0.6rem' }}>{symbol}</span>{label}
                </div>
                {href ? (
                  <a href={href} data-hover style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 400,
                    fontSize: 'clamp(0.7rem, 1.6vw, 0.8rem)',
                    color: 'var(--black)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    wordBreak: 'break-word'
                  }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--beige-dark)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--black)')}
                  >{value}</a>
                ) : (
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 400,
                    fontSize: 'clamp(0.7rem, 1.6vw, 0.8rem)',
                    color: 'var(--black)',
                    wordBreak: 'break-word'
                  }}>{value}</span>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Cover drawing — bleeds to the right edge */}
        <div className="contact-figure" style={{ background: 'var(--black)', overflow: 'hidden', minHeight: 'clamp(190px, 20vw, 300px)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverPhoto}
            alt="Sectional perspective drawing by Ayden Pettiette"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={(e) => (((e.currentTarget as HTMLImageElement).style.opacity = '0'))}
          />
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: 'clamp(0.8rem, 2vw, 1.1rem) clamp(1.5rem, 5vw, 3.5rem)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.6rem, 1.3vw, 0.65rem)',
          fontWeight: 700,
          letterSpacing: '0.08em'
        }}>AP</span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.65rem, 1.4vw, 0.7rem)',
          color: 'var(--gray-400)'
        }}>○ □ ×</span>
        <span className="label" style={{ color: 'var(--gray-400)' }}>© 2026</span>
      </div>

      <style>{`
        @media(min-width: 769px) {
          .contact-grid {
            grid-template-columns: 1.1fr 1fr 0.85fr !important;
          }
        }
        @media(max-width: 768px) {
          /* The drawing is portrait. Beside the contact columns it is a band
             cropped to fit, but stacked on a phone that band cuts the house
             down to a sliver — so here the figure shows the whole drawing.
             Held to 60vh, because at full width a portrait drawing runs taller
             than the screen it is meant to sit on. The black ground matches the
             paper, so the letterboxing contain leaves is invisible. */
          .contact-figure {
            min-height: 0 !important;
          }
          .contact-figure img {
            height: auto !important;
            max-height: 60vh;
            object-fit: contain !important;
          }
        }
      `}</style>
    </section>
  );
}
