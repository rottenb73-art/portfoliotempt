'use client';
import type { MediaItem, PlateGroup, PlateLayout } from '@/lib/projects';

/**
 * Figure plates, grouped by category.
 *
 * The ordering principle is borrowed from the 2026 report's index/catalog
 * trend: a consistent rhythm where each image is given its own ground rather
 * than cropped to fill a tile. Containing them also stops architectural
 * drawings from being sliced through their own title blocks and scale bars.
 *
 * Presentation sets are the exception — they run edge to edge and side by
 * side, read across as one piece the way the boards hang on a review wall.
 * They also sit outside the stage below: a wall set takes its height from its
 * own images rather than from the stage's 16:10 plate proportion.
 */
const WALL_CATEGORIES = new Set(['Showcase Panels', 'Large Drawings', 'Graphic']);

const PAGE_PAD = '0 clamp(1.5rem, 5vw, 3rem)';

// Marker rhythm carried over from the home-page index rail and the About and
// Contact sections.
const SYMBOLS = ['○', '□', '×'];

/**
 * Columns for a set of `n` plates.
 *
 * A set should read as one band, so the default is simply one row of `n`.
 * Past MAX a single row makes each plate too small to tell apart, so the set
 * breaks into the fewest rows that stay within MAX and then balances across
 * them — 7 plates go 4+3, not 6+1. MIN keeps a set of one or two from
 * inflating to a full-width figure, which would read as a lead plate.
 *
 * Every non-wall set in the portfolio is currently 6 or fewer, so today this
 * puts all of them on a single row; the balancing is for sets added later.
 */
const MIN_COLS = 2;
const MAX_COLS = 6;

// Inside a grouped row a cluster is one slot of a shared band, so it gets at
// most two columns of its own — past that the plates in a four-plate set come
// out half the size of the plates beside them.
const GROUP_MAX_COLS = 2;

function columnsFor(n: number) {
  if (n <= MAX_COLS) return Math.max(n, MIN_COLS);
  return Math.ceil(n / Math.ceil(n / MAX_COLS));
}

const CELL_RATIO = 16 / 10;
// Past this, a cover crop is throwing away so much of the sheet that whatever
// the plate was meant to show is likely outside the cell.
const MAX_CROP_LOSS = 0.4;

/**
 * Plates crop to fill their cell, which is what makes a set read as an even
 * row. A portrait sheet in a landscape cell loses too much to that crop, so
 * on load anything past the threshold is matted instead: contained, on a pale
 * ground, so the cell still reads as the same rectangle as its neighbours.
 *
 * Measured here rather than tagged in the data so it keeps holding as plates
 * are added. `fit: 'contain'` on the item is the manual override.
 */
function matteIfOvercropped(img: HTMLImageElement) {
  const ratio = img.naturalWidth / img.naturalHeight;
  if (!ratio) return;
  const loss = ratio > CELL_RATIO ? 1 - CELL_RATIO / ratio : 1 - ratio / CELL_RATIO;
  if (loss <= MAX_CROP_LOSS) return;

  img.style.width = 'auto';
  img.style.height = 'auto';
  img.style.maxWidth = '100%';
  img.style.maxHeight = '100%';
  img.style.objectFit = 'contain';
  if (img.parentElement) img.parentElement.style.background = 'var(--gray-50)';
}

/**
 * Trim `cropTop` (a fraction) off the top of a wall panel.
 *
 * The frame is widened to the proportion the sheet has once that band is gone,
 * and the image covers it anchored to the bottom — so the loss is all off the
 * top and the drawing keeps its full width. Measured off the loaded image
 * rather than written into the data, so it survives a re-export.
 */
function applyTopCrop(img: HTMLImageElement, cropTop: number) {
  const frame = img.parentElement;
  const ratio = img.naturalWidth / img.naturalHeight;
  if (!frame || !ratio || cropTop <= 0 || cropTop >= 1) return;

  frame.style.aspectRatio = String(ratio / (1 - cropTop));
  img.style.height = '100%';
  img.style.objectFit = 'cover';
  img.style.objectPosition = 'bottom';
}

export function CatalogPlates({
  images,
  onOpen,
  plateLayouts,
  wallLayouts,
  plateGroups,
  hideCaptions,
}: {
  images: MediaItem[];
  onOpen: (index: number) => void;
  /** Compositions by category name; a category without one keeps the even row. */
  plateLayouts?: Record<string, PlateLayout>;
  /** Grid tracks for a wall category; one without an entry keeps equal columns. */
  wallLayouts?: Record<string, string>;
  /** Categories to draw as one shared row; the rest keep a row each. */
  plateGroups?: PlateGroup[];
  /** Keep the figure captions hidden instead of fading them in on hover. */
  hideCaptions?: boolean;
}) {
  const categories: string[] = [];
  const byCategory: Record<string, { item: MediaItem; index: number }[]> = {};
  images.forEach((item, i) => {
    const cat = item.category || 'Documentation';
    if (!byCategory[cat]) {
      byCategory[cat] = [];
      categories.push(cat);
    }
    byCategory[cat].push({ item, index: i });
  });

  // Set numbers stay tied to document order so they read the same whether a
  // set ends up on the wall or in the stage.
  const numbered = categories.map((cat, ci) => ({ cat, ci, isWall: WALL_CATEGORIES.has(cat) }));
  const wallSets = numbered.filter((c) => c.isWall);
  const rowSets = numbered.filter((c) => !c.isWall);

  /**
   * The stage in render order, with grouped categories collapsed into a single
   * entry. A group takes the position of its first member, so moving a set
   * into a group does not move the supporting material up or down the page;
   * members named in a group but absent from this project are dropped, which
   * is what lets one group be written for every project that wants it.
   */
  type StageRow =
    | { kind: 'row'; key: string; cat: string; ci: number }
    | { kind: 'group'; key: string; group: PlateGroup; cats: string[]; ci: number };

  const groupOf = new Map<string, number>();
  plateGroups?.forEach((g, gi) => g.categories.forEach((cat) => groupOf.set(cat, gi)));

  const stageRows: StageRow[] = [];
  const seenGroups = new Set<number>();
  rowSets.forEach(({ cat, ci }) => {
    const gi = groupOf.get(cat);
    if (gi === undefined) {
      stageRows.push({ kind: 'row', key: cat, cat, ci });
      return;
    }
    if (seenGroups.has(gi)) return;
    seenGroups.add(gi);
    const group = plateGroups![gi];
    const cats = group.categories.filter((c) => byCategory[c]?.length);
    if (cats.length) stageRows.push({ kind: 'group', key: `group-${gi}`, group, cats, ci });
  });

  const buildPlates = (cat: string, isWall: boolean, layout?: PlateLayout) =>
    byCategory[cat].map(({ item, index }, i) => {
      const cell = (
        <button
          onClick={() => onOpen(index)}
          className={`plate${isWall ? ' is-wall' : ''}`}
          aria-label={`Maximize ${item.title || item.alt}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            textAlign: 'left',
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            color: 'var(--black)',
          }}
        >
          <div
            className="plate-frame"
            style={
              isWall
                ? {
                    // No fixed height: a height box would letterbox the board.
                    // Letting the image set the height means each panel fills
                    // its full column width, edge to edge.
                    display: 'block',
                    padding: 0,
                    border: 'none',
                  }
                : {
                    // No proportion set here — the stage's 16:10 plate box
                    // lives in CSS, on `.plate-stage .plate-frame`.
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    // No `overflow: hidden` needed — `object-fit: cover` crops
                    // the image to the box on its own.
                  }
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.title || item.alt}
              loading="lazy"
              className={`plate-img${item.rotate ? ' is-rotated' : ''}`}
              style={{
                display: 'block',
                ...(isWall
                  ? { width: '100%', height: 'auto' }
                  // A rotated scan is a full sheet turned on its side, and
                  // `fit: 'contain'` marks a drawing that must not lose its
                  // edges. Both float in the cell rather than cropping.
                  : item.rotate || item.fit === 'contain'
                    ? { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' as const }
                    : { width: '100%', height: '100%', objectFit: 'cover' as const }),
                ...(item.rotate
                  ? ({ '--rot': `${item.rotate}deg` } as React.CSSProperties)
                  : {}),
              }}
              // A cached image can finish before React attaches onLoad, so the
              // ref catches the already-complete case.
              ref={
                isWall && item.cropTop
                  ? (el) => {
                      if (el?.complete) applyTopCrop(el, item.cropTop!);
                    }
                  : undefined
              }
              onLoad={
                isWall
                  ? item.cropTop
                    ? (e) => applyTopCrop(e.currentTarget, item.cropTop!)
                    : undefined
                  : item.rotate || item.fit === 'contain'
                    ? undefined
                    : (e) => matteIfOvercropped(e.currentTarget)
              }
            />
          </div>

          {/* Wall sets read as one continuous piece, so they carry no
              per-panel captions — the set's head names it. */}
          {!isWall && (
            <div className="plate-caption">
              <span className="plate-label">{item.title || item.alt}</span>
              {item.technical && <span className="plate-tech">{item.technical}</span>}
            </div>
          )}
        </button>
      );

      // Every plate is drawn at once. Wall panels used to fade in on scroll;
      // the drawings are the page, so they are simply there when the page is.
      return (
        <div
          key={`${item.src}-${i}`}
          className="plate-cell"
          // Only the spanning plate is marked: it is the one whose frame has
          // to fill its area instead of holding the 16:10 the others keep.
          data-span={layout && item.area && item.area === layout.span ? '' : undefined}
          style={{
            ...(isWall && item.maxWidth
              ? { maxWidth: item.maxWidth, width: '100%', margin: '0 auto' }
              : {}),
            ...(layout && item.area ? { gridArea: item.area } : {}),
          }}
        >
          {cell}
        </div>
      );
    });

  // Just the marker and the name: numbering the sets made them read as an
  // ordered list, which is not what they are.
  const head = (cat: string, ci: number) => (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(0.6rem, 1.6vw, 1rem)' }}>
      <span aria-hidden="true" className="plate-row-symbol">
        {SYMBOLS[ci % SYMBOLS.length]}
      </span>
      <h2 style={{
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: 'clamp(0.95rem, 2vw, 1.35rem)',
        letterSpacing: '-0.02em',
        textTransform: 'uppercase',
        lineHeight: 1,
      }}>
        {cat}
      </h2>
    </div>
  );

  return (
    <div>
      {/* ── WALL SETS ──────────────────────────────────────────────
          Full-bleed, self-sizing, outside the stage, and unheaded: these are
          the sheets a reader opens the page on, and a label over them only
          names what the drawing already says. The stage sets below keep their
          heads — they are groups a reader needs told apart. */}
      {wallSets.map(({ cat }) => {
        // A weighted set is not a run of boards read across: it is sheets of
        // different proportion set beside each other, so it takes the page's
        // own margins and a gap, and centres each sheet against the tallest
        // rather than hanging them all from the top edge.
        const wall = wallLayouts?.[cat];
        return (
          <section
            key={cat}
            style={{
              paddingTop: 'clamp(2.75rem, 5.5vw, 4rem)',
              paddingBottom: 'clamp(2.75rem, 5.5vw, 4rem)',
            }}
          >
            <div
              className="plate-wall"
              style={{
                display: 'grid',
                gridTemplateColumns: wall ?? `repeat(${byCategory[cat].length}, minmax(0, 1fr))`,
                gap: wall ? 'clamp(1.5rem, 3vw, 2.5rem)' : 0,
                alignItems: wall ? 'center' : 'stretch',
                ...(wall ? { padding: PAGE_PAD } : {}),
              }}
            >
              {buildPlates(cat, true)}
            </div>
          </section>
        );
      })}

      {/* ── STAGE ─────────────────────────────────────────────────
          The documentation sets run down the page as rows, every set open
          and every plate visible. Hovering a row only lifts its plates and
          brings up their captions — nothing opens, nothing reflows. */}
      {rowSets.length > 0 && (
        <div className="plate-stage" data-captions={hideCaptions ? 'off' : undefined}>
          {stageRows.map((entry) => {
            // A grouped row: the member sets become labelled clusters sharing
            // one band. Each cluster is weighted by how many columns its own
            // plates need, so a four-plate set gets twice the width of a
            // single and every plate across the row lands the same size.
            if (entry.kind === 'group') {
              const { group, cats } = entry;
              const clusters = cats.map((cat) => ({
                cat,
                items: byCategory[cat],
                // `singleRow` takes the cap off: the set gets a column per
                // plate, so it runs as one row instead of wrapping.
                cols: group.singleRow
                  ? byCategory[cat].length
                  : Math.min(byCategory[cat].length, GROUP_MAX_COLS),
              }));
              return (
                <section key={entry.key} className="plate-row">
                  {group.title && (
                    <div className="plate-row-head" style={{ padding: PAGE_PAD }}>
                      {head(group.title, entry.ci)}
                    </div>
                  )}

                  <div className="plate-row-body" style={{ padding: PAGE_PAD }}>
                    <div
                      className="plate-group"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: clusters.map((c) => `${c.cols}fr`).join(' '),
                        columnGap: 'clamp(1.5rem, 3vw, 2.5rem)',
                        rowGap: 'clamp(1.5rem, 3vw, 2.25rem)',
                        alignItems: 'start',
                      }}
                    >
                      {clusters.map(({ cat, cols }) => (
                        <div key={cat} className="plate-cluster">
                          <div className="label plate-cluster-head">{cat}</div>
                          <div
                            className="plate-grid plate-cluster-grid"
                            style={{
                              display: 'grid',
                              columnGap: 'clamp(0.75rem, 1.6vw, 1.1rem)',
                              rowGap: 'clamp(1rem, 2vw, 1.4rem)',
                              ['--cols' as string]: cols,
                              // A capped cluster is already at two columns and
                              // stays there. A single-row one has as many as
                              // it has plates, which is past legibility on a
                              // narrow screen, so it steps down like any other
                              // set rather than holding the row.
                              ['--cols-md' as string]: group.singleRow ? Math.min(cols, 3) : cols,
                              ['--cols-sm' as string]: group.singleRow ? Math.min(cols, 2) : cols,
                            } as React.CSSProperties}
                          >
                            {buildPlates(cat, false)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            }

            const { cat, ci } = entry;
            const layout = plateLayouts?.[cat];
            const cols = columnsFor(byCategory[cat].length);
            return (
              <section key={entry.key} className="plate-row">
                <div className="plate-row-head" style={{ padding: PAGE_PAD }}>
                  {head(cat, ci)}
                </div>

                <div className="plate-row-body" style={{ padding: PAGE_PAD }}>
                  <div
                    className={`plate-grid${layout ? ' is-composed' : ''}`}
                    style={{
                      display: 'grid',
                      columnGap: 'clamp(1.25rem, 2.2vw, 1.75rem)',
                      rowGap: 'clamp(1.5rem, 3vw, 2.25rem)',
                      // A composed set states its own tracks and areas. The
                      // rows stay auto-sized: the single-row plates set the
                      // height from their 16:10 frames, and the spanning one
                      // takes whatever two of those rows come to.
                      ...(layout
                        ? {
                            gridTemplateColumns: layout.columns,
                            gridTemplateAreas: layout.areas,
                          }
                        : {
                            // An explicit count rather than auto-fill:
                            // auto-fill would add columns on a wide monitor
                            // and split the set across rows again. The
                            // narrower counts are capped against the set's
                            // own, so a two-plate set never gains columns as
                            // the screen shrinks.
                            ['--cols' as string]: cols,
                            ['--cols-md' as string]: Math.min(cols, 3),
                            ['--cols-sm' as string]: Math.min(cols, 2),
                          }),
                    } as React.CSSProperties}
                  >
                    {buildPlates(cat, false, layout)}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}

      <style>{`
        /* ── Stage ───────────────────────────────────────────────── */
        .plate-row {
          display: flex;
          flex-direction: column;
        }
        .plate-row-head {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          min-height: clamp(52px, 7vh, 76px);
        }
        .plate-row-symbol {
          font-family: var(--font-mono);
          font-size: clamp(0.5rem, 1.1vw, 0.6rem);
          color: var(--gray-300);
          line-height: 1;
        }

        /* ── Row behaviour ──────────────────────────
           Natural height, nothing hidden, nothing revealed on scroll: every
           set is drawn where it falls. The hover borrows only the home
           page's easing and ground change. Captions hold their space and
           fade, so nothing reflows under the cursor. */
        /* With the rules gone, the gap between one set and the next is the
           only thing separating them — so it has to be bigger than the gap
           between a head and its own plates. */
        .plate-row {
          padding-bottom: clamp(2.5rem, 5.5vw, 4rem);
          transition: background 0.3s ease;
        }
        .plate-row-body { padding-bottom: clamp(0.75rem, 2vw, 1.25rem); }
        /* Scoped to the stage: a wall panel takes its height from its own
           image, so a proportion box would letterbox the board. */
        .plate-stage .plate-frame { aspect-ratio: 16 / 10; }
        .plate-stage .plate-caption { opacity: 0; transition: opacity 0.3s ease; }
        .plate-stage .plate-cell {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (hover: hover) {
          .plate-row:hover { background: var(--gray-50); }
          .plate-row:hover .plate-caption { opacity: 1; }
          .plate-row:hover .plate-cell { transform: translateY(-4px); }
        }
        .plate-row:focus-within { background: var(--gray-50); }
        .plate-row:focus-within .plate-caption { opacity: 1; }

        /* Captions off: the caption keeps its space so the rows sit exactly
           where they did, but nothing brings it up — not hover, not focus,
           and not the touch breakpoint further down that otherwise leaves
           captions permanently on. Specificity does that last part, so these
           hold wherever they sit in the sheet. */
        .plate-stage[data-captions='off'] .plate-caption,
        .plate-stage[data-captions='off'] .plate-row:hover .plate-caption,
        .plate-stage[data-captions='off'] .plate-row:focus-within .plate-caption {
          opacity: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .plate-row,
          .plate-row-body,
          .plate-cell { transition: none; }
        }

        /* ── Plates ─────────────────────────────────────────────── */
        .plate-grid .plate-caption { margin-top: 0.55rem; gap: 0.45rem; }
        .plate-grid .plate-label { font-size: clamp(0.6rem, 1.15vw, 0.68rem); }
        .plate-grid .plate-tech { font-size: clamp(0.5rem, 0.95vw, 0.56rem); }

        /* Rotating an image doesn't rotate its box, so a portrait scan turned
           landscape would overflow. Centre it and swap the constraints: in a
           16:10 frame the pre-rotation width may be at most the frame's height
           (62.5%) and its height at most the frame's width (160%). */
        .plate-img.is-rotated {
          position: absolute;
          top: 50%;
          left: 50%;
          max-width: 62.5%;
          max-height: 160%;
          transform: translate(-50%, -50%) rotate(var(--rot, 0deg));
        }
        .plate-cell { height: 100%; }

        /* Caption as a title block: the name, and the technical note ranged
           right. No rule under the plate — the caption itself closes the
           bottom of the cell. */
        .plate-caption {
          display: flex;
          align-items: baseline;
          gap: clamp(0.5rem, 1.4vw, 0.9rem);
          margin-top: 0.85rem;
          font-family: var(--font-mono);
          flex-shrink: 0;
        }
        .plate-tech {
          font-size: clamp(0.55rem, 1.1vw, 0.62rem);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gray-400);
          margin-left: auto;
          flex-shrink: 0;
        }
        /* One line, always — a caption that wraps to two makes the row of
           plates sit unevenly against the one below it. */
        .plate-label {
          font-size: clamp(0.64rem, 1.35vw, 0.74rem);
          font-weight: 500;
          line-height: 1.5;
          color: var(--gray-700);
          transition: color 0.2s ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .plate:hover .plate-label,
        .plate:focus-visible .plate-label {
          color: var(--black);
        }
        .plate-grid {
          grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
        }

        /* ── Grouped rows ─────────────────────────────────────────
           Four sets sharing one band. What keeps them legible as four sets
           rather than one heap of plates is the cluster label plus a column
           gap wider than the gap between plates inside a cluster — the
           spacing does the separating, so no rule is needed. */
        .plate-cluster-head {
          color: var(--gray-400);
          margin-bottom: clamp(0.5rem, 1.2vw, 0.75rem);
          padding-bottom: 0.4rem;
          border-bottom: 1px solid var(--gray-100);
        }
        /* The cluster labels sit at one height across the row even when a
           name wraps and its neighbours do not. */
        .plate-cluster { display: flex; flex-direction: column; }

        /* ── Composed sets ────────────────────────────────────────
           The tracks and areas come from the data; what belongs here is the
           one rule the areas imply. A plate that spans two rows cannot also
           hold the 16:10 box every other plate keeps — it has to fill the
           area the span gives it, or it would sit at a third of the height
           of the pair beside it with a gap underneath. */
        .plate-grid.is-composed [data-span] .plate-frame {
          aspect-ratio: auto;
          flex: 1 1 auto;
          min-height: 0;
        }
        /* Drop toward fewer columns rather than letting the plates shrink
           past legibility. */
        @media (max-width: 1200px) {
          .plate-grid { grid-template-columns: repeat(var(--cols-md), minmax(0, 1fr)); }
        }
        @media (max-width: 900px) {
          .plate-grid { grid-template-columns: repeat(var(--cols-sm), minmax(0, 1fr)); }
        }
        @media (max-width: 620px) {
          .plate-grid { grid-template-columns: minmax(0, 1fr); }
        }

        /* Four clusters abreast stop being readable well before the plates
           do, so the band folds to two clusters and then to one. The plates
           inside a cluster keep their own columns throughout — that pairing
           is what the cluster is. */
        @media (max-width: 1100px) {
          .plate-group { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 620px) {
          .plate-group { grid-template-columns: 1fr !important; }
          .plate-cluster-grid { grid-template-columns: repeat(var(--cols), minmax(0, 1fr)); }
        }

        /* Below this a 2fr lead and two 1fr columns put the small plates at
           roughly a thumbnail, so the composition unwinds into the plain
           stack every other set falls back to. Dropping the areas releases
           the plates; the span goes back to a 16:10 box with them. */
        @media (max-width: 860px) {
          .plate-grid.is-composed {
            grid-template-columns: minmax(0, 1fr) !important;
            grid-template-areas: none !important;
          }
          .plate-grid.is-composed .plate-cell { grid-area: auto !important; }
          .plate-grid.is-composed [data-span] .plate-frame {
            aspect-ratio: 16 / 10;
            flex: none;
          }
        }

        /* No hover on touch, so the captions that fade in under the cursor
           on a desktop are simply always on, and the rows get the roomier
           stacked spacing. */
        @media (max-width: 768px) {
          .plate-row {
            display: block;
            overflow: visible;
            padding-bottom: clamp(2.75rem, 7vw, 4rem);
          }
          .plate-stage .plate-caption { opacity: 1; }
          .plate-stage .plate-frame { flex: none; }
          .plate-stage .plate-grid { height: auto; }
        }

        /* Side by side is the whole point — only stack when a column would
           be too narrow to read. */
        @media (max-width: 700px) {
          .plate-wall {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
