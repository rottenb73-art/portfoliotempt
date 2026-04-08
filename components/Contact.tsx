'use client';
import { ScrollReveal } from './ScrollReveal';

export function Contact() {
  return (
    <section id="contact" style={{ background: 'var(--white)', borderTop: '1px solid var(--black)' }}>
      <ScrollReveal>
        <div style={{ padding: '6rem 3rem', borderBottom: '1px solid var(--black)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'end' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '2rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', color: 'var(--gray-200)', fontWeight: 300 }}>□</span>
              <div>
                <div className="label" style={{ marginBottom: '0.4rem' }}>Contact</div>
                <h2 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(1.8rem,3vw,3.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  GET_IN_TOUCH
                </h2>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 300, fontSize: '0.75rem', lineHeight: 1.9, color: 'var(--gray-500)', maxWidth: '320px' }}>
              // open to internships, collaborations,<br />
              // and design conversations.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {[
              { label: '○ EMAIL', value: 'ayden.pettiette@gmail.com', href: 'mailto:ayden.pettiette@gmail.com' },
              { label: '□ TAMU', value: 'ayden9606@tamu.edu', href: 'mailto:ayden9606@tamu.edu' },
              { label: '× PHONE', value: '(210) 303-3729', href: 'tel:2103033729' },
              { label: '○ LINKEDIN', value: 'linkedin.com/in/ayden-pettiette', href: 'https://www.linkedin.com/in/ayden-pettiette-0b893a223/' },
            ].map(({ label, value, href }) => (
              <div key={label} style={{ borderBottom: '1px solid var(--gray-100)', paddingBottom: '1rem' }}>
                <div className="label" style={{ marginBottom: '0.3rem' }}>{label}</div>
                <a href={href} data-hover style={{
                  fontFamily: 'var(--font-mono)', fontWeight: 400, fontSize: '0.8rem',
                  color: 'var(--black)', textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--beige-dark)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--black)')}
                >{value}</a>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Footer */}
      <div style={{ padding: '1.5rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em' }}>AP</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gray-300)' }}>○ □ ×</span>
        <span className="label" style={{ color: 'var(--gray-400)' }}>© 2026</span>
      </div>
    </section>
  );
}
