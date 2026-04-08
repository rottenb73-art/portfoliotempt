'use client';
import { useEffect, useRef, useState } from 'react';

interface HeroProps {
  coverPhoto: string;
}

const SYMBOLS = ['○', '□', '×'];

export function Hero({ coverPhoto }: HeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typedIndex, setTypedIndex] = useState(0);
  const subtitleText = '// architecture';

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 14,
        y: (e.clientY / window.innerHeight - 0.5) * 8,
      });
    };
    window.addEventListener('mousemove', onMouse);
    return () => window.removeEventListener('mousemove', onMouse);
  }, []);

  useEffect(() => {
    if (typedIndex >= subtitleText.length) return;
    const t = setTimeout(() => setTypedIndex((i) => i + 1), 38);
    return () => clearTimeout(t);
  }, [typedIndex, subtitleText.length]);

  return (
    <>
      <section
        style={{
          minHeight: '100vh',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid var(--black)',
          position: 'relative',
        }}
      >
        {/* LEFT PANEL */}
        <div
          style={{
            borderRight: '1px solid var(--black)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '6rem 3rem 3rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top labels */}
          <div style={{ position: 'absolute', top: '1.5rem', left: '3rem', display: 'flex', gap: '2rem' }}>
            <span className="label">ARCH_PORTFOLIO</span>
            <span className="label" style={{ color: 'var(--gray-300)' }}>v2024–2026</span>
          </div>

          {/* Symbol grid top right */}
          <div style={{ position: 'absolute', top: '1.25rem', right: '3rem', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.5rem', opacity: 0.15 }}>
            {[...Array(9)].map((_, i) => (
              <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>{SYMBOLS[i % 3]}</span>
            ))}
          </div>

          {/* Title */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="hero-title-clip" style={{ marginBottom: '0.1rem' }}>
              <h1 className="hero-title-inner" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(2.8rem,5.5vw,6rem)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                AYDEN
              </h1>
            </div>
            <div className="hero-title-clip">
              <h1 className="hero-title-inner" style={{ fontFamily: 'var(--font-mono)', fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(2.8rem,5.5vw,6rem)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                PETTIETTE
              </h1>
            </div>

            {/* Typewriter */}
            <div style={{ marginTop: '2rem', height: '1.4rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--gray-500)', letterSpacing: '0.04em' }}>
                {subtitleText.slice(0, typedIndex)}
                <span className="blink" style={{ borderLeft: '2px solid var(--gray-500)', marginLeft: '1px' }} />
              </span>
            </div>
          </div>

          {/* Bottom meta */}
          <div style={{ borderTop: '1px solid var(--black)', paddingTop: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              {[['INSTITUTION','Texas A&M'],['DEGREE','B.Arch'],['PERIOD','2024 — 2026'],['PROJECTS','04']].map(([k,v]) => (
                <div key={k}>
                  <div className="label" style={{ marginBottom: '0.2rem' }}>{k}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
            <a
              href="#work"
              data-hover
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white)', background: 'var(--black)', textDecoration: 'none', padding: '0.6rem 1.25rem', border: '1px solid var(--black)', transition: 'background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s' }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background='var(--white)'; el.style.color='var(--black)'; el.style.boxShadow='4px 4px 0 var(--beige-dark)'; el.style.transform='translate(-2px,-2px)'; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background='var(--black)'; el.style.color='var(--white)'; el.style.boxShadow='none'; el.style.transform='none'; }}
            >
              <span>□</span> VIEW_PROJECTS
            </a>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--gray-50)' }}>
          <div style={{ position: 'absolute', inset: '-4%', transform: `translate(${mousePos.x * 0.25}px,${mousePos.y * 0.25}px)`, transition: 'transform 0.5s ease' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverPhoto} alt="Ayden Pettiette" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(100%) contrast(1.05)' }} onError={(e) => ((e.currentTarget as HTMLImageElement).style.opacity = '0')} />
          </div>
          <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', display: 'flex', gap: '0.75rem', zIndex: 2, mixBlendMode: 'difference' }}>
            {SYMBOLS.map((s) => (
              <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', color: 'var(--white)', fontWeight: 300 }}>{s}</span>
            ))}
          </div>
          {/* Top-right — removed coordinates */}
        </div>

        {/* Vertical label */}
        <div style={{ position: 'absolute', bottom: '3rem', right: '-3.5rem', transform: 'rotate(90deg)', transformOrigin: 'left center', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.3em', color: 'var(--gray-300)', textTransform: 'uppercase', pointerEvents: 'none' }}>
          ARCHITECTURAL_PORTFOLIO ×
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ borderBottom: '1px solid var(--black)', padding: '0.6rem 0', overflow: 'hidden', background: 'var(--black)' }}>
        <div className="marquee-track">
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '2rem', paddingRight: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-300)', whiteSpace: 'nowrap' }}>
              <span style={{ color: 'var(--beige-dark)' }}>○</span><span>Architectural Design</span>
              <span style={{ color: 'var(--beige-dark)' }}>□</span><span>Translation of Space — Fall 2024</span>
              <span style={{ color: 'var(--beige-dark)' }}>×</span><span>Riverside Residential — Spring 2025</span>
              <span style={{ color: 'var(--beige-dark)' }}>○</span><span>Bath House — Fall 2025</span>
              <span style={{ color: 'var(--beige-dark)' }}>□</span><span>Mid Rise Complex — Spring 2026</span>
              <span style={{ color: 'var(--beige-dark)' }}>×</span><span>Texas A&amp;M University</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:768px){section{grid-template-columns:1fr !important;}}`}</style>
    </>
  );
}
