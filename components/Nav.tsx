'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 3rem', height: '52px',
      background: scrolled ? 'var(--white)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--black)' : '1px solid transparent',
      transition: 'background 0.3s ease, border-color 0.3s ease',
    }}>
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--black)', fontWeight: 700 }}>
          AP
        </span>
        <span style={{ width: 1, height: 12, background: 'var(--gray-300)', display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--gray-500)', textTransform: 'uppercase' }}>
          Portfolio
        </span>
      </Link>

      <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
        

      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        <a href="#work" className="nav-link">Work</a>
        <a href="#about" className="nav-link">About</a>
        <a href="#contact" className="nav-link">Contact</a>
      </div>
    </div>
    </nav>
  );
}
