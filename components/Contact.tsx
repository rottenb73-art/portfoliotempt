'use client';
import { ScrollReveal } from './ScrollReveal';

export function Contact() {
  return (
    <section id="contact" style={{ background: 'var(--white)', borderTop: '1px solid var(--black)' }}>
      <ScrollReveal>
        <div className="contact-grid" style={{ 
          padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)', 
          borderBottom: '1px solid var(--black)', 
          display: 'grid', 
          gridTemplateColumns: '1fr', 
          gap: 'clamp(3rem, 6vw, 6rem)', 
          alignItems: 'end' 
        }}>
          <div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'baseline', 
              gap: '1rem', 
              marginBottom: 'clamp(1.5rem, 3vw, 2rem)' 
            }}>
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', 
                color: 'var(--gray-200)', 
                fontWeight: 300 
              }}>□</span>
              <div>
                <div className="label" style={{ marginBottom: '0.4rem' }}>Contact</div>
                <h2 style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontWeight: 700, 
                  fontSize: 'clamp(1.5rem, 4vw, 3.5rem)', 
                  letterSpacing: '-0.03em', 
                  lineHeight: 1 
                }}>
                  GET_IN_TOUCH
                </h2>
              </div>
            </div>
            <p style={{ 
              fontFamily: 'var(--font-mono)', 
              fontWeight: 300, 
              fontSize: 'clamp(0.7rem, 1.5vw, 0.75rem)', 
              lineHeight: 1.9, 
              color: 'var(--gray-500)', 
              maxWidth: '320px' 
            }}>
              // open to internships, collaborations,<br />
              // and design conversations.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2rem)' }}>
            {[
              { label: '○ EMAIL', value: 'ayden.pettiette@gmail.com', href: 'mailto:ayden.pettiette@gmail.com' },
              { label: '□ TAMU', value: 'ayden9606@tamu.edu', href: 'mailto:ayden9606@tamu.edu' },
              { label: '× PHONE', value: '(210) 303-3729', href: 'tel:2103033729' },
              { label: '○ LINKEDIN', value: 'linkedin.com/in/ayden-pettiette', href: 'https://www.linkedin.com/in/ayden-pettiette-0b893a223/' },
            ].map(({ label, value, href }) => (
              <div key={label} style={{ 
                borderBottom: '1px solid var(--gray-100)', 
                paddingBottom: 'clamp(0.75rem, 2vw, 1rem)' 
              }}>
                <div className="label" style={{ marginBottom: '0.3rem' }}>{label}</div>
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
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Footer */}
      <div style={{ 
        padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1.5rem, 5vw, 3rem)', 
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
          color: 'var(--gray-300)' 
        }}>○ □ ×</span>
        <span className="label" style={{ color: 'var(--gray-400)' }}>© 2026</span>
      </div>

      <style>{`
        @media(min-width: 769px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
