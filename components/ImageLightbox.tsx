'use client';
import { useEffect } from 'react';
import type { MediaItem } from '@/lib/projects';

interface ImageLightboxProps {
  items: MediaItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageLightbox({ items, index, onClose, onNavigate }: ImageLightboxProps) {
  const item = items[index];

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') onNavigate((index + 1) % items.length);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNavigate, index, items.length]);

  if (!item) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.92)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: 'clamp(1rem, 4vw, 3rem)',
      }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
        style={{
          position: 'absolute', top: 'clamp(1rem, 3vw, 1.5rem)', right: 'clamp(1rem, 3vw, 1.5rem)',
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--white)', background: 'transparent', border: '1px solid rgba(255,255,255,0.4)',
          padding: '0.4rem 0.75rem', cursor: 'pointer', zIndex: 2,
        }}
      >
        × close
      </button>

      {items.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate((index - 1 + items.length) % items.length); }}
            aria-label="Previous image"
            style={{
              position: 'absolute', left: 'clamp(0.5rem, 2vw, 1.5rem)', top: '50%', transform: 'translateY(-50%)',
              fontFamily: 'var(--font-mono)', fontSize: '1.5rem', color: 'var(--white)',
              background: 'transparent', border: 'none', cursor: 'pointer', padding: '1rem', zIndex: 2,
            }}
          >
            ←
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate((index + 1) % items.length); }}
            aria-label="Next image"
            style={{
              position: 'absolute', right: 'clamp(0.5rem, 2vw, 1.5rem)', top: '50%', transform: 'translateY(-50%)',
              fontFamily: 'var(--font-mono)', fontSize: '1.5rem', color: 'var(--white)',
              background: 'transparent', border: 'none', cursor: 'pointer', padding: '1rem', zIndex: 2,
            }}
          >
            →
          </button>
        </>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.title || item.alt}
        onClick={(e) => e.stopPropagation()}
        style={{
          objectFit: 'contain',
          // Rotation doesn't rotate the layout box, so swap the viewport
          // constraints for quarter-turned scans to keep them on screen.
          ...(item.rotate
            ? {
                maxWidth: '70vh',
                maxHeight: '90vw',
                transform: `rotate(${item.rotate}deg)`,
              }
            : { maxWidth: '90vw', maxHeight: '70vh' }),
        }}
      />

      <div
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '90vw', width: '640px', marginTop: 'clamp(1rem, 2.5vw, 1.5rem)', textAlign: 'center' }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.6rem', marginBottom: item.technical || item.description ? '0.4rem' : 0 }}>
          {item.category && (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
            }}>
              {item.category}
            </span>
          )}
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 'clamp(0.75rem, 1.7vw, 0.85rem)', color: 'var(--white)' }}>
            {item.title || item.alt}
          </span>
        </div>
        {item.technical && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: item.description ? '0.4rem' : 0 }}>
            {item.technical}
          </div>
        )}
        {item.description && (
          <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 300, fontSize: 'clamp(0.65rem, 1.4vw, 0.75rem)', lineHeight: 1.7, color: 'rgba(255,255,255,0.75)' }}>
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}
