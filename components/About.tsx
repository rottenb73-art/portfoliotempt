'use client';
import { ScrollReveal } from './ScrollReveal';

export function About() {
  return (
    <section id="about" style={{ background: 'var(--black)', color: 'var(--white)', padding: '6rem 3rem', borderTop: '1px solid var(--black)' }}>
      <ScrollReveal>
        <div style={{ borderBottom: '1px solid var(--gray-700)', paddingBottom: '3rem', marginBottom: '3rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', color: 'var(--gray-700)', fontWeight: 300 }}>×</span>
            <div>
              <div className="label" style={{ color: 'var(--gray-500)', marginBottom: '0.4rem' }}>About</div>
              <h2 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(1.8rem,3vw,3.5rem)', letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--white)' }}>
                ABOUT ME
              </h2>
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '3rem', color: 'var(--gray-800)', userSelect: 'none', lineHeight: 1 }}>○</div>
        </div>
      </ScrollReveal>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
        <ScrollReveal direction="left" delay={100}>
          <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 300, fontSize: '0.8rem', lineHeight: 1.9, color: 'var(--gray-300)' }}>
            I am an architectural design student exploring the intersection of spatial theory and built form.
            My work engages questions of threshold, material honesty, and the social dimensions of architecture
            — from intimate residential scales to civic programs.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 300, fontSize: '0.8rem', lineHeight: 1.9, color: 'var(--gray-500)', marginTop: '1rem' }}>
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
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--gray-800)', padding: '0.8rem 0', gap: '1rem' }}>
                <span className="label" style={{ color: 'var(--gray-600)', flexShrink: 0 }}>
                  <span style={{ color: 'var(--beige-dark)', marginRight: '0.5rem' }}>○</span>{k}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--white)', textAlign: 'right' }}>{v}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
