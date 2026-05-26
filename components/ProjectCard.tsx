'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { Project, MediaItem } from '@/lib/projects';

const SYM: Record<string, string> = {
  Drawings: '□', 'Model Pics': '○', 'House Model': '○', 'Chunk Model': '○', 'Site Model': '○',
  'Model Views': '○', 'Art Progression': '×', 'Abstract Drawing Progression': '×',
  'Abstract Drawings': '×', 'Extra Images': '×', 'Showcase Panels': '□', Diagrams: '□',
  LargeDrawings: '□', 'Massing Model': '○', 'Chunk Model images': '○', 'Massing Model images': '○',
  'Site Analysis': '□', Precedents: '×', 'Section & Graphic': '□',
};

const FRAME_INTERVALS = [5200, 6800, 4600, 7200, 5600, 8200, 4100, 6200];
const CONTAIN_CATS = new Set(['Drawings', 'Model Views', 'Abstract Drawings', 'Art Progression', 'Showcase Panels', 'Diagrams', 'Site Analysis', 'Precedents', 'Abstract Drawing Progression']);

// Categories with >= this many items get a carousel instead of a static grid
const CAROUSEL_THRESHOLD = 5;

function colsFor(cat: string, count: number): number {
  if (count === 1) return 1;
  if (cat === 'Precedents') return 3;
  return 2;
}

// Drawing sheets get taller carousels; model photos shorter; site/precedents smallest
function carouselHeight(cat: string): number {
  if (cat === 'Precedents' || cat === 'Site Analysis') return 180;
  return CONTAIN_CATS.has(cat) ? 310 : 240;
}

// Mid Rise: Site Analysis and Precedents always last
const MID_RISE_LAST = new Set(['Site Analysis', 'Precedents']);
function sortMidRise(cats: string[]): string[] {
  return [...cats].sort((a, b) => {
    const aLast = MID_RISE_LAST.has(a) ? 1 : 0;
    const bLast = MID_RISE_LAST.has(b) ? 1 : 0;
    return aLast - bLast;
  });
}

function groupByCategory(items: MediaItem[]) {
  const groups: Record<string, MediaItem[]> = {};
  for (const item of items) {
    const cat = item.category || 'Other';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(item);
  }
  return groups;
}

// ── Scroll-proximity grayscale hook ──────────────────────────────────────────
function useScrollGray(ref: React.RefObject<HTMLDivElement | null>, disabled: boolean): number {
  const [gray, setGray] = useState(80);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (disabled) { setGray(0); return; }

    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const elCenter = rect.top + rect.height / 2;
      const vCenter = viewH / 2;
      const dist = Math.abs(elCenter - vCenter);
      // Full color within ~35% of viewport height from center; max 80% gray
      const ratio = Math.max(0, Math.min(1, 1 - dist / (viewH * 0.55)));
      setGray(Math.round((1 - ratio) * 80));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [ref, disabled]);

  return gray;
}

export function ProjectCard({ project, isExpanded, onToggle }: {
  project: Project; isExpanded: boolean; onToggle: () => void;
}) {
  const imageItems = project.media.filter((m) => m.type === 'image');
  const groups = groupByCategory(imageItems);
  const categoryNames = Object.keys(groups);
  const coverSrc = project.coverOverride ?? imageItems[0]?.src ?? null;

  const cardRef = useRef<HTMLDivElement>(null);
  // Disable scroll-gray (force full color) when project is expanded
  const gray = useScrollGray(cardRef, isExpanded);

  const isBathHouse = project.id === 'bath-house';
  const isMidRise = project.id === 'mid-rise-complex';
  const isRiverside = project.id === 'riverside-residential';
  const panelItems = isBathHouse ? (groups['Showcase Panels'] ?? []) : [];
  const sectionGraphicItems = isRiverside ? (groups['Section & Graphic'] ?? []) : [];
  const subFrameCategories = isBathHouse
    ? categoryNames.filter((c) => c !== 'Showcase Panels' && c !== 'Diagrams')
    : isMidRise
    ? sortMidRise(categoryNames.filter((c) => c !== 'LargeDrawings' && c !== 'Chunk Model'))
    : isRiverside
    ? categoryNames.filter((c) => c !== 'Section & Graphic')
    : categoryNames;

  return (
    <div ref={cardRef} style={{ background: 'var(--white)', position: 'relative', zIndex: 1 }}>

      {/* ── HEADER ── */}
      <div
        onClick={onToggle} data-hover
        style={{ display: 'grid', gridTemplateColumns: '260px 1fr auto', alignItems: 'stretch', cursor: 'pointer', height: '260px', transition: 'box-shadow 0.2s ease, transform 0.2s ease' }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow = '4px 4px 0 var(--beige-dark)';
          el.style.transform = 'translate(-2px, -2px)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow = 'none';
          el.style.transform = 'none';
        }}
      >
        {/* Cover — scroll-based color */}
        <div style={{ height: '260px', width: '260px', overflow: 'hidden', position: 'relative', background: 'var(--gray-50)', flexShrink: 0 }}>
          {coverSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coverSrc} alt={project.title}
              style={{
                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                filter: `grayscale(${gray}%)`,
                transition: 'filter 0.5s ease',
              }}
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.opacity = '0')}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', color: 'var(--gray-200)' }}>□</span>
            </div>
          )}
          {project.wip && (
            <div style={{ position: 'absolute', top: '0.6rem', left: '0.6rem', background: 'var(--black)', border: '1px solid var(--beige-dark)', padding: '0.15rem 0.45rem', zIndex: 3 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--beige-dark)' }}>× WIP</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '1.75rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '1px solid var(--black)', overflow: 'hidden' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span className="label">{project.semester}</span>
              {project.wip && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--beige-dark)', border: '1px solid var(--beige-dark)', padding: '0.1rem 0.35rem' }}>WIP</span>}
              {project.tags.filter(t => t !== 'In Progress').map((t) => (
                <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-500)', border: '1px solid var(--gray-300)', padding: '0.1rem 0.35rem' }}>{t}</span>
              ))}
            </div>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(1.2rem,2vw,2rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              {project.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 300, fontSize: '0.72rem', lineHeight: 1.6, color: 'var(--gray-700)', maxWidth: '380px' }}>
              {project.shortDescription}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {categoryNames.map((cat) => (
              <span key={cat} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--gray-400)' }}>
                {SYM[cat] || '×'} {cat} ({groups[cat].length})
              </span>
            ))}
          </div>
        </div>

        {/* Toggle */}
        <div style={{ width: '52px', borderLeft: '1px solid var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isExpanded ? 'var(--black)' : 'transparent', transition: 'background 0.2s', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: isExpanded ? 'var(--white)' : 'var(--black)', transform: isExpanded ? 'rotate(45deg)' : 'none', transition: 'transform 0.35s, color 0.2s', display: 'block', lineHeight: 1 }}>×</span>
        </div>
      </div>

      {/* ── EXPANDED ── */}
      <div style={{ overflow: 'hidden', maxHeight: isExpanded ? '9999px' : '0', transition: 'max-height 0.8s cubic-bezier(0.16,1,0.3,1)', borderTop: isExpanded ? '1px solid var(--black)' : 'none' }}>
        <div style={{ background: 'var(--off-white)', padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5px' }}>

          {/* Bath House: 3 panels side by side */}
          {isBathHouse && panelItems.length > 0 && (
            <FolderWindow title="Showcase Panels" symbol="□" count={panelItems.length} large>
              <ThreePanelsSideBySide items={panelItems} />
            </FolderWindow>
          )}

          {/* Mid Rise: large drawings side by side */}
          {isMidRise && (groups['LargeDrawings'] ?? []).length > 0 && (
            <FolderWindow title="Comprehensive Plan + Bird's Eye View + Axonometric Section" symbol="□" count={(groups['LargeDrawings'] ?? []).length} large>
              <ThreePanelsSideBySide items={groups['LargeDrawings'] ?? []} />
            </FolderWindow>
          )}

          {/* Mid Rise: Chunk Model — full-width featured layout */}
          {isMidRise && (groups['Chunk Model'] ?? []).length > 0 && (
            <FolderWindow title="Chunk Model" symbol="○" count={(groups['Chunk Model'] ?? []).length} large>
              <PortfolioGrid items={groups['Chunk Model'] ?? []} cat="Chunk Model" featuredLeft />
            </FolderWindow>
          )}

          {/* Riverside: Section 02 + House Graphic side by side */}
          {isRiverside && sectionGraphicItems.length > 0 && (
            <FolderWindow title="Section & Graphic" symbol="□" count={sectionGraphicItems.length} large>
              <ThreePanelsSideBySide items={sectionGraphicItems} />
            </FolderWindow>
          )}

          {/* Sub-frame categories: carousel for large sets, grid for small */}
          {subFrameCategories.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5px', alignItems: 'start' }}>
              {subFrameCategories.map((cat, idx) => (
                <FolderWindow key={cat} title={cat} symbol={SYM[cat] || '×'} count={groups[cat].length}>
                  {groups[cat].length >= CAROUSEL_THRESHOLD ? (
                    <AutoImageGrid
                      items={groups[cat]}
                      interval={FRAME_INTERVALS[idx % FRAME_INTERVALS.length]}
                      useContain={CONTAIN_CATS.has(cat)}
                      height={carouselHeight(cat)}
                    />
                  ) : (
                    <PortfolioGrid
                      items={groups[cat]}
                      cat={cat}
                      featuredFirst={isMidRise && cat === 'Diagrams'}
                      featuredLeft={isMidRise && cat === 'Chunk Model'}
                    />
                  )}
                </FolderWindow>
              ))}
            </div>
          )}

          {/* Long description */}
          {project.longDescription && (
            <div style={{ padding: '1.25rem 1.25rem', borderTop: '1px solid var(--gray-100)', marginTop: '0.5rem', display: 'grid', gridTemplateColumns: project.titleImage ? '1fr auto' : '1fr', gap: '2rem', alignItems: 'start' }}>
              <div>
                {project.longDescription.split('\n\n').map((para, i, arr) => (
                  <p key={i} style={{ fontFamily: 'var(--font-mono)', fontWeight: 300, fontSize: '0.72rem', lineHeight: 1.85, color: 'var(--gray-700)', maxWidth: '760px', marginBottom: i < arr.length - 1 ? '0.9rem' : 0 }}>
                    {para.trim()}
                  </p>
                ))}
              </div>
              {project.titleImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.titleImage}
                  alt="Project title"
                  style={{ width: '280px', flexShrink: 0, display: 'block', border: '1px solid var(--gray-100)' }}
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />
              )}
            </div>
          )}

          {/* Close button */}
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '1.5rem', paddingBottom: '0.5rem' }}>
            <button
              onClick={(e) => { e.stopPropagation(); cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); onToggle(); }}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase', background: 'var(--black)', color: 'var(--white)', border: 'none', padding: '0.55rem 2.5rem', cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--gray-700)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--black)')}
            >
              × close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Folder window chrome ──────────────────────────────────────────────────────
function FolderWindow({ title, symbol, count, children, large }: {
  title: string; symbol: string; count: number; children: React.ReactNode; large?: boolean;
}) {
  return (
    <div style={{ border: '1px solid var(--black)', background: 'var(--white)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', padding: '0.4rem 0.65rem', borderBottom: '1px solid var(--black)', background: 'var(--black)' }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[0,1,2].map((i) => <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gray-700)', border: '1px solid #2a2a2a' }} />)}
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: large ? '0.58rem' : '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--beige-dark)', flex: 1, fontWeight: large ? 500 : 400 }}>
          {symbol} {title}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.44rem', color: 'var(--gray-600)', letterSpacing: '0.08em' }}>
          {count} file{count !== 1 ? 's' : ''}
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}

// ── 3 panels side by side ─────────────────────────────────────────────────────
function ThreePanelsSideBySide({ items, gridCols }: { items: MediaItem[]; gridCols?: string }) {
  const cols = gridCols ?? `repeat(${Math.min(items.length, 3)}, 1fr)`;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 0 }}>
      {items.map((item, i) => (
        <div key={i} style={{ position: 'relative', borderRight: i < items.length - 1 ? '1px solid var(--black)' : 'none', background: 'var(--white)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.src} alt={item.alt}
            style={{ width: '100%', display: 'block', objectFit: 'contain', background: 'var(--white)' }}
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.display = 'none';
              const p = el.parentElement;
              if (p) {
                p.style.minHeight = '300px';
                p.style.display = 'flex';
                p.style.alignItems = 'center';
                p.style.justifyContent = 'center';
                const span = document.createElement('span');
                span.style.cssText = 'font-family:var(--font-mono);font-size:0.5rem;color:var(--gray-400);letter-spacing:0.1em;text-transform:uppercase;padding:1rem;text-align:center;word-break:break-all';
                span.textContent = '404 — ' + el.src.split('/').pop();
                p.appendChild(span);
              }
            }}
          />
          <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', background: 'rgba(0,0,0,0.55)', padding: '0.15rem 0.4rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' }}>
              {String(i + 1).padStart(2,'0')}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Static portfolio grid (< CAROUSEL_THRESHOLD items) ───────────────────────
function PortfolioGrid({ items, cat, featuredFirst, featuredLeft }: {
  items: MediaItem[]; cat: string; featuredFirst?: boolean; featuredLeft?: boolean;
}) {
  // Featured-left: Front View at natural height drives row; siblings fill their cells via cover
  if (featuredLeft && items.length > 1) {
    const cols = `2fr ${items.slice(1).map(() => '1fr').join(' ')}`;
    return (
      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '1px', background: 'var(--gray-100)', alignItems: 'stretch' }}>
        {items.map((item, i) => (
          <div key={i} style={{ background: 'var(--white)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {i === 0 ? (
              // Front View: natural proportions — sets the row height
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.src} alt={item.alt}
                style={{ width: '100%', display: 'block', objectFit: 'contain', background: 'var(--white)', ...(item.rotate ? { transform: `rotate(${item.rotate}deg)` } : {}) }}
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.opacity = '0.1')}
              />
            ) : (
              // Siblings: fill their stretched cell — cover trims rather than leaving gaps
              <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...(item.rotate ? { transform: `rotate(${item.rotate}deg)` } : {}) }}
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.opacity = '0.1')}
                />
              </div>
            )}
            <div style={{ padding: '0 0.6rem', height: '28px', borderTop: '1px solid var(--gray-100)', background: 'var(--white)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-500)' }}>{item.alt}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', letterSpacing: '0.08em', color: 'var(--gray-300)' }}>{String(i + 1).padStart(2, '0')}/{String(items.length).padStart(2, '0')}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const cols = colsFor(cat, items.length);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '1px', background: 'var(--gray-100)' }}>
      {items.map((item, i) => {
        const rot = item.rotate ?? 0;
        const spanFull = featuredFirst && i === 0 && cols > 1;
        return (
          <div key={i} style={{ background: 'var(--white)', display: 'flex', flexDirection: 'column', gridColumn: spanFull ? '1 / -1' : undefined }}>
            <div style={{ background: 'var(--white)', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.alt}
                style={{ width: '100%', display: 'block', objectFit: 'contain', background: 'var(--white)', ...(rot !== 0 ? { transform: `rotate(${rot}deg)` } : {}) }}
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.opacity = '0.1')}
              />
            </div>
            <div style={{ padding: '0.3rem 0.6rem', borderTop: '1px solid var(--gray-100)', background: 'var(--white)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-500)' }}>{item.alt}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', letterSpacing: '0.08em', color: 'var(--gray-300)' }}>{String(i + 1).padStart(2, '0')}/{String(items.length).padStart(2, '0')}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Auto-carousel (≥ 5 items) ─────────────────────────────────────────────────
function AutoImageGrid({ items, interval, useContain, height = 220 }: {
  items: MediaItem[]; interval: number; useContain?: boolean; height?: number;
}) {
  const [current, setCurrent] = useState(0);
  const [pending, setPending] = useState<number | null>(null);
  const [sliding, setSliding] = useState(false);
  const [dir, setDir] = useState<'left' | 'right'>('left');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const doSlide = useCallback((to: number, direction: 'left' | 'right') => {
    if (sliding || to === current) return;
    setDir(direction);
    setPending(to);
    setSliding(true);
    setTimeout(() => { setCurrent(to); setPending(null); setSliding(false); }, 560);
  }, [sliding, current]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (items.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        const to = (c + 1) % items.length;
        setDir('left'); setPending(to); setSliding(true);
        setTimeout(() => { setCurrent(to); setPending(null); setSliding(false); }, 560);
        return c;
      });
    }, interval);
  }, [items.length, interval]);

  useEffect(() => { startTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [startTimer]);

  const go = (i: number, d: 'left' | 'right' = 'left') => { doSlide(i, d); startTimer(); };

  const exitX = dir === 'left' ? (sliding ? '-100%' : '0%') : (sliding ? '100%' : '0%');
  const enterX = dir === 'left' ? (sliding ? '0%' : '100%') : (sliding ? '0%' : '-100%');
  const rot = (items[current]?.rotate ?? 0);
  const pendRot = pending !== null ? (items[pending]?.rotate ?? 0) : 0;

  return (
    <div>
      <div style={{ position: 'relative', width: '100%', height: `${height}px`, overflow: 'hidden', background: useContain ? 'var(--white)' : 'var(--gray-50)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={items[current]?.src} alt={items[current]?.alt}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: useContain ? 'contain' : 'cover', background: useContain ? 'var(--white)' : 'transparent', transform: `translateX(${exitX}) rotate(${rot}deg)`, transition: sliding ? 'transform 0.56s cubic-bezier(0.4,0,0.2,1)' : 'none' }}
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.opacity = '0')}
        />
        {pending !== null && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={items[pending]?.src} alt={items[pending]?.alt}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: useContain ? 'contain' : 'cover', background: useContain ? 'var(--white)' : 'transparent', transform: `translateX(${enterX}) rotate(${pendRot}deg)`, transition: sliding ? 'transform 0.56s cubic-bezier(0.4,0,0.2,1)' : 'none' }}
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.opacity = '0')}
          />
        )}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.35rem 0.55rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.45))', pointerEvents: 'none', zIndex: 5 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}>
            {items[current]?.alt} · {String(current+1).padStart(2,'0')}/{String(items.length).padStart(2,'0')}
          </span>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, height: '2px', background: 'var(--beige-dark)', width: `${((current + 1) / items.length) * 100}%`, transition: `width ${interval * 0.85}ms linear`, zIndex: 6 }} />
        {items.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); go((current - 1 + items.length) % items.length, 'right'); }}
              style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '25%', background: 'linear-gradient(to right, rgba(0,0,0,0.2), transparent)', border: 'none', cursor: 'pointer', opacity: 0.6, transition: 'opacity 0.25s ease', display: 'flex', alignItems: 'center', paddingLeft: 'clamp(0.75rem, 3vw, 1.5rem)', zIndex: 7 }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--white)', fontWeight: 300, lineHeight: 1, textShadow: '0 0 8px rgba(0,0,0,0.8)', transition: 'transform 0.2s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(-4px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(0)'; }}>{'<'}</span>
            </button>
            <button onClick={(e) => { e.stopPropagation(); go((current + 1) % items.length, 'left'); }}
              style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '25%', background: 'linear-gradient(to left, rgba(0,0,0,0.2), transparent)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 'clamp(0.75rem, 3vw, 1.5rem)', opacity: 0.6, transition: 'opacity 0.25s ease', zIndex: 7 }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--white)', fontWeight: 300, lineHeight: 1, textShadow: '0 0 8px rgba(0,0,0,0.8)', transition: 'transform 0.2s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(4px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(0)'; }}>{'>'}</span>
            </button>
          </>
        )}
      </div>
      {items.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3px', padding: '0.3rem', borderTop: '1px solid var(--gray-100)' }}>
          {items.map((_, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); go(i, i > current ? 'left' : 'right'); }}
              style={{ width: i === current ? 16 : 4, height: 3, border: 'none', background: i === current ? 'var(--black)' : 'var(--gray-300)', cursor: 'pointer', padding: 0, transition: 'width 0.35s ease, background 0.25s' }} />
          ))}
        </div>
      )}
    </div>
  );
}
