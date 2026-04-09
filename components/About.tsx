'use client';
import { ScrollReveal } from './ScrollReveal';

export function About() {
  return (
    <section id="about" style={{ 
      background: 'var(--black)', 
      color: 'var(--white)', 
      padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)', 
      borderTop: '1px solid var(--black)' 
    }}>
      <ScrollReveal>
        <div style={{ 
          borderBottom: '1px solid var(--gray-700)', 
          paddingBottom: 'clamp(2rem, 4vw, 3rem)', 
          marginBottom: 'clamp(2rem, 4vw, 3rem)', 
          display: 'flex', 
          alignItems: 'flex-start', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', 
              color: 'var(--gray-700)', 
              fontWeight: 300 
            }}>×</span>
            <div>
              <div className="label" style={{ color: 'var(--gray-500)', marginBottom: '0.4rem' }}>About</div>
              <h2 style={{ 
                fontFamily: 'var(--font-mono)', 
                fontWeight: 700, 
                fontSize: 'clamp(1.5rem, 4vw, 3.5rem)', 
                letterSpacing: '-0.03em', 
                lineHeight: 1, 
                color: 'var(--white)' 
              }}>
                ABOUT ME
              </h2>
            </div>
          </div>
          <div style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            color: 'var(--gray-800)', 
            userSelect: 'none', 
            lineHeight: 1 
          }}>○</div>
        </div>
      </ScrollReveal>

      <div className="about-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr', 
        gap: 'clamp(2rem, 5vw, 4rem)' 
      }}>
        <ScrollReveal direction="left" delay={100}>
          <p style={{ 
            fontFamily: 'var(--font-mono)', 
            fontWeight: 300, 
            fontSize: 'clamp(0.7rem, 1.6vw, 0.8rem)', 
            lineHeight: 1.9, 
            color: 'var(--gray-300)' 
          }}>
            I am an architectural design student exploring the intersection of spatial theory and built form.
            My work engages questions of threshold, material honesty, and the social dimensions of architecture
            — from intimate residential scales to civic programs.
          </p>
          <p style={{ 
            fontFamily: 'var(--font-mono)', 
            fontWeight: 300, 
            fontSize: 'clamp(0.7rem, 1.6vw, 0.8rem)', 
            lineHeight: 1.9, 
            color: 'var(--gray-500)', 
            marginTop: '1rem' 
          }}>
            // currently enrolled at Texas A&M University<br />
            // Bachelor of Architecture candidate
          </p>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={150}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              ['INSTITUTION', 'Texas A&M University'],
              ['PROGRAM', 'Bachelor of Architecture'],
              ['SOFTWARE', 'Rhino · AutoCAD · Adobe'],
              ['MEDIA', 'Drawing · Model · Render'],
            ].map(([k, v]) => (
              <div key={k} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'baseline', 
                borderBottom: '1px solid var(--gray-800)', 
                padding: 'clamp(0.6rem, 1.5vw, 0.8rem) 0', 
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <span className="label" style={{ color: 'var(--gray-600)', flexShrink: 0 }}>
                  <span style={{ color: 'var(--beige-dark)', marginRight: '0.5rem' }}>○</span>{k}
                </span>
                <span style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: 'clamp(0.65rem, 1.4vw, 0.7rem)', 
                  color: 'var(--white)', 
                  textAlign: 'right' 
                }}>{v}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
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
