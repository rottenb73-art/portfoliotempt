'use client';
import { useState, useRef, useCallback } from 'react';
import type { MediaItem } from '@/lib/projects';
import { GlbViewer } from './GlbViewer';

const CATEGORY_SYMBOL: Record<string, string> = {
  Drawing: '□',
  Model: '○',
  Process: '×',
  Panel: '□',
};

export function Carousel({ items, projectTitle }: { items: MediaItem[]; projectTitle: string }) {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);

  const imageItems = items.filter((m) => m.type === 'image');
  const glbItems = items.filter((m) => m.type === 'glb');
  // Show images first, glb at end
  const ordered = [...imageItems, ...glbItems];

  const prev = useCallback(() => setCurrent((c) => (c === 0 ? ordered.length - 1 : c - 1)), [ordered.length]);
  const next = useCallback(() => setCurrent((c) => (c === ordered.length - 1 ? 0 : c + 1)), [ordered.length]);

  const onMouseDown = (e: React.MouseEvent) => { dragStart.current = e.clientX; setIsDragging(true); };
  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStart.current;
    if (diff > 40) prev(); else if (diff < -40) next();
    setIsDragging(false);
  };

  const item = ordered[current];
  if (!item) return null;

  // Group thumbnails by category
  const categories = Array.from(new Set(ordered.map((i) => i.category || 'Other')));

  return (
    <div style={{ width: '100%' }}>
      {/* Main view */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: item.type === 'glb' ? '4/3' : '3/2',
          overflow: 'hidden',
          background: item.type === 'glb' ? 'var(--black)' : 'var(--gray-50)',
          border: '1px solid var(--black)',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
        }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={() => setIsDragging(false)}
      >
        {item.type === 'image' ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.src}
            alt={item.alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.display = 'none';
              if (el.parentElement) {
                el.parentElement.style.background = 'var(--gray-50)';
              }
            }}
          />
        ) : (
          <GlbViewer src={item.src} height={400} />
        )}

        {/* Overlay info */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.75rem 1rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.5))', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', pointerEvents: 'none' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>
            {CATEGORY_SYMBOL[item.category || ''] || '×'} {item.category || ''} — {item.alt}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)' }}>
            {String(current + 1).padStart(2, '0')}/{String(ordered.length).padStart(2, '0')}
          </span>
        </div>

        {/* Arrow buttons */}
        <button onClick={(e) => { e.stopPropagation(); prev(); }} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '20%', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', paddingLeft: '0.75rem', opacity: 0, transition: 'opacity 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--white)', background: 'var(--black)', padding: '0.3rem 0.5rem', lineHeight: 1 }}>←</span>
        </button>
        <button onClick={(e) => { e.stopPropagation(); next(); }} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '20%', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '0.75rem', opacity: 0, transition: 'opacity 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--white)', background: 'var(--black)', padding: '0.3rem 0.5rem', lineHeight: 1 }}>→</span>
        </button>
      </div>

      {/* Category tabs + thumbnails */}
      <div style={{ borderLeft: '1px solid var(--black)', borderRight: '1px solid var(--black)', borderBottom: '1px solid var(--black)' }}>
        {/* Category row */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--gray-100)' }}>
          {categories.map((cat) => {
            const catItems = ordered.filter((i) => (i.category || 'Other') === cat);
            const isActive = (item.category || 'Other') === cat;
            return (
              <button key={cat} onClick={() => { const first = ordered.findIndex((i) => (i.category || 'Other') === cat); if (first >= 0) setCurrent(first); }}
                style={{ flex: 1, padding: '0.4rem 0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', borderRight: '1px solid var(--gray-100)', background: isActive ? 'var(--black)' : 'var(--white)', color: isActive ? 'var(--white)' : 'var(--gray-500)', cursor: 'pointer', transition: 'background 0.2s' }}>
                {CATEGORY_SYMBOL[cat] || '×'} {cat} ({catItems.length})
              </button>
            );
          })}
        </div>

        {/* Thumbnail strip */}
        <div style={{ display: 'flex', gap: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {ordered.map((it, i) => (
            <button key={i} onClick={() => setCurrent(i)} data-hover
              style={{ flexShrink: 0, width: 56, height: 40, border: 'none', borderRight: '1px solid var(--gray-100)', background: it.type === 'glb' ? 'var(--black)' : 'var(--gray-50)', cursor: 'pointer', padding: 0, overflow: 'hidden', position: 'relative', outline: i === current ? '2px solid var(--black)' : 'none', outlineOffset: '-2px' }}>
              {it.type === 'image' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: i === current ? 'none' : 'grayscale(60%)' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--beige-dark)' }}>○</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
