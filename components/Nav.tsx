'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Home-page path segments, in document order. `watch` is the element the
// scroll-spy tracks to decide which segment is "current"; `home` is the top of
// the document — which already contains the project index — so it watches
// nothing and acts as the fallback.
const SEGMENTS = [
  { key: 'home', label: 'home', href: '/', watch: null },
  { key: 'about', label: 'about', href: '/#about', watch: 'about' },
  { key: 'contact', label: 'contact', href: '/#contact', watch: 'contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const pathname = usePathname();

  const isHome = pathname === '/';
  const projectId = pathname.startsWith('/project/') ? pathname.split('/')[2] : undefined;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      if (!isHome) return;

      // Whichever watched section fills the most of the viewport is the one
      // being read. Measuring visible area rather than probing a fixed line
      // means a short last section still wins once it dominates the screen —
      // which a line-probe can't do, since the document runs out of scroll
      // before that section's top ever reaches the line.
      const vh = window.innerHeight;
      let current = 'home';
      let best = vh * 0.3; // must fill ~a third of the screen to claim the path
      for (const segment of SEGMENTS) {
        if (!segment.watch) continue;
        const el = document.getElementById(segment.watch);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
        if (visible > best) {
          best = visible;
          current = segment.key;
        }
      }

      // The last section is usually shorter than the viewport, so the document
      // runs out of scroll before it can ever reach the probe. Once we're at
      // the bottom, it's the one being looked at regardless.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = SEGMENTS[SEGMENTS.length - 1].key;

      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isHome]);

  const separator = (
    <span aria-hidden="true" style={{ color: 'var(--gray-200)', padding: '0 0.15rem', userSelect: 'none' }}>
      /
    </span>
  );

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        padding: '0 clamp(1rem, 5vw, 3.5rem)',
        height: '52px',
        background: scrolled ? 'var(--white)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--black)' : '1px solid transparent',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <Link href="/" data-hover style={{ textDecoration: 'none', flexShrink: 0 }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.1em',
          color: 'var(--black)',
          fontWeight: 700,
        }}>
          AP
        </span>
      </Link>

      {/* Path directory */}
      <div className="nav-path" style={{
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(0.58rem, 1.2vw, 0.68rem)',
        letterSpacing: '0.06em',
        minWidth: 0,
        overflow: 'hidden',
      }}>
        {separator}
        {SEGMENTS.map((segment, i) => {
          const isActive = isHome && active === segment.key;
          return (
            <span key={segment.key} style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
              {i > 0 && separator}
              <Link
                href={segment.href}
                data-hover
                className={`nav-segment${isActive ? ' is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {segment.label}
              </Link>
            </span>
          );
        })}

        {/* On a project page the path extends with the project itself. */}
        {projectId && (
          <span style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
            {separator}
            <span className="nav-segment is-active nav-segment-leaf" aria-current="page">
              {projectId}
            </span>
          </span>
        )}
      </div>

      <style>{`
        .nav-segment {
          display: inline-block;
          padding: 0.15rem 0.3rem;
          color: var(--gray-400);
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.2s ease, background 0.2s ease;
        }
        .nav-segment:hover {
          color: var(--black);
          background: var(--gray-50);
        }
        .nav-segment.is-active {
          color: var(--black);
          font-weight: 700;
          box-shadow: inset 0 -1px 0 var(--black);
        }
        .nav-segment-leaf {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .nav-segment:focus-visible {
          outline: 1px solid var(--black);
          outline-offset: 1px;
        }
        @media (max-width: 520px) {
          .nav-path {
            font-size: 0.55rem;
          }
          .nav-segment {
            padding: 0.15rem 0.18rem;
          }
        }
      `}</style>
    </nav>
  );
}
