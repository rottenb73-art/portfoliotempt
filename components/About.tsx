'use client';
import { ScrollReveal } from './ScrollReveal';

export function About() {
  return (
    <section id="about" style={{
      background: 'var(--black)',
      color: 'var(--white)',
      padding: 'clamp(2.25rem, 5vw, 3.75rem) clamp(1.5rem, 5vw, 3.5rem)',
      borderTop: '1px solid var(--black)'
    }}>
      <ScrollReveal>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div className="label" style={{ color: 'var(--gray-300)', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--gray-700)', marginRight: '0.6rem' }}>×</span>About
            </div>
            <h2 style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: 'clamp(1.4rem, 3.2vw, 2.7rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: 'var(--white)',
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.75rem, 2vw, 1.25rem)'
            }}>
              ABOUT ME
              <span style={{
                fontWeight: 300,
                fontSize: '0.45em',
                color: 'var(--gray-700)',
                lineHeight: 1
              }}>□</span>
            </h2>
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            color: 'var(--gray-800)',
            userSelect: 'none',
            lineHeight: 1
          }}>○</div>
        </div>
      </ScrollReveal>

      <div style={{
        borderTop: '1px solid var(--gray-700)',
        marginTop: 'clamp(1.25rem, 3vw, 1.75rem)',
        paddingTop: 'clamp(1.5rem, 3.5vw, 2.25rem)'
      }}>
        <div className="about-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 'clamp(2rem, 6vw, 5rem)',
          alignItems: 'start'
        }}>
          <ScrollReveal direction="left">
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 300,
              fontSize: 'clamp(0.7rem, 1.6vw, 0.8rem)',
              lineHeight: 1.85,
              color: 'var(--gray-300)',
              maxWidth: '52ch'
            }}>
              I am an architecture student at Texas A&amp;M University working across residential,
              civic, and mixed-use programs. My studio work engages threshold, material honesty,
              and the social dimensions of building — carried from abstract drawing studies through
              site analysis and sectional models into resolved technical drawings.
            </p>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 300,
              fontSize: 'clamp(0.7rem, 1.6vw, 0.8rem)',
              lineHeight: 1.85,
              color: 'var(--gray-300)',
              maxWidth: '52ch',
              marginTop: 'clamp(1rem, 2.5vw, 1.5rem)'
            }}>
              In 2025 I interned at Macro Design Studio in San Antonio, following projects from
              client meeting through construction. I developed techniques for hand-drawn diagrams,
              sections, plans, and perspectives, worked through studio critique, and visited active
              construction sites to understand how a drawing becomes structure.
            </p>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 300,
              fontSize: 'clamp(0.7rem, 1.6vw, 0.8rem)',
              lineHeight: 1.85,
              color: 'var(--gray-500)',
              marginTop: 'clamp(1rem, 2.5vw, 1.5rem)'
            }}>
              // Bachelor of Science in Architecture candidate<br />
              // graduating May 2028 · College Station, TX
            </p>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={100}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                ['○', 'INSTITUTION', 'Texas A&M University'],
                ['□', 'PROGRAM', 'Bachelor of Science in Architecture'],
                ['×', 'GRADUATING', 'May 2028'],
                ['○', 'SOFTWARE', 'Rhino · AutoCAD · Revit · Illustrator · Photoshop'],
                ['□', 'MEDIA', 'Hand Drawing · Physical Model · Render'],
                ['×', 'FOCUS', 'Site Analysis · Space Planning · Sustainable Design'],
              ].map(([symbol, k, v]) => (
                <div key={k} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  borderBottom: '1px solid var(--gray-800)',
                  padding: 'clamp(0.55rem, 1.4vw, 0.8rem) 0',
                  gap: '1.5rem',
                  flexWrap: 'wrap'
                }}>
                  <span className="label" style={{ color: 'var(--gray-300)', flexShrink: 0 }}>
                    <span style={{ color: 'var(--gray-700)', marginRight: '0.6rem' }}>{symbol}</span>{k}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.65rem, 1.4vw, 0.75rem)',
                    color: 'var(--white)',
                    textAlign: 'right'
                  }}>{v}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        @media(min-width: 769px) {
          .about-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
