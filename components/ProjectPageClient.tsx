'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { Project } from '@/lib/projects';
import { ScrollReveal } from './ScrollReveal';
import { ProjectInfo } from './ProjectInfo';
import { CatalogPlates } from './CatalogPlates';
import { ImageLightbox } from './ImageLightbox';

function SectionHead({ title, meta }: { title: string; meta?: string }) {
  return (
    <div style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem) clamp(1.5rem, 5vw, 3rem) 0' }}>
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap',
        marginBottom: '0.75rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(0.6rem, 1.6vw, 1rem)' }}>
          <h2 style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: 'clamp(1.1rem, 2.4vw, 1.6rem)',
            letterSpacing: '-0.025em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}>
            {title}
          </h2>
        </div>
        {meta && <span className="label">{meta}</span>}
      </div>
    </div>
  );
}

export function ProjectPageClient({
  project,
  prev,
  next,
  total,
}: {
  project: Project;
  prev: Project | null;
  next: Project | null;
  total: number;
}) {
  const images = project.media.filter((m) => m.type === 'image');
  const coverImage = project.titleImage || project.coverOverride || images[0]?.src;
  const reviewNotes = project.finalReviewNotes ?? [];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="page-wrapper" style={{ paddingTop: '52px' }}>

      {/* ── COVER PLATE ────────────────────────────────────────────── */}
      <header>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
          padding: 'clamp(0.75rem, 2vw, 1.1rem) clamp(1.5rem, 5vw, 3rem) clamp(0.6rem, 1.5vw, 0.9rem)',
        }}>
          <Link href="/" data-hover className="label catalog-back" style={{ textDecoration: 'none' }}>
            ← all projects
          </Link>
          <span className="label">{project.semester}</span>
        </div>

        <div className="catalog-cover" style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 'clamp(1.5rem, 4vw, 3rem)',
          padding: '0 clamp(1.5rem, 5vw, 3rem) clamp(1.25rem, 3vw, 1.75rem)',
          alignItems: 'start',
        }}>
          <div>
            {/* One line, sized to fit the longest title in the set. The
                stacked one-word-per-line treatment cost too much height at
                the top of every page. */}
            <h1 className="sheet-title">{project.title}</h1>

            {/* One line. The longest subtitle in the set is 61 characters
                ("Repetition, Difference, and Juxtaposition in Spatial
                Hierarchy"); at Consolas's 0.55em advance that is ~34em, and
                the 2.15vw step keeps it inside the column at every width.
                The old 46ch cap is what was folding it onto three lines. */}
            {project.meta?.subtitle && (
              <p className="sheet-subtitle">{project.meta.subtitle}</p>
            )}

            {/* Specification first: a reader gets the facts of the project
                before the prose. */}
            <div style={{ marginTop: 'clamp(0.9rem, 2vw, 1.25rem)' }}>
              <ProjectInfo meta={project.meta} semester={project.semester} />
            </div>

            {/* The brief used to be its own headed section below the cover.
                Folded in here it needs no title — it reads as the rest of the
                specification, and the page opens with everything at once. */}
            {(project.meta?.brief || reviewNotes.length > 0) && (
              <div className="brief-row" style={{ marginTop: 'clamp(0.9rem, 2vw, 1.25rem)' }}>
                {project.meta?.brief && (
                  <p style={{
                    fontFamily: 'var(--font-prose)',
                    fontWeight: 400,
                    fontSize: 'clamp(0.72rem, 1.35vw, 0.82rem)',
                    lineHeight: 1.6,
                    color: 'var(--gray-700)',
                    maxWidth: '68ch',
                  }}>
                    {project.meta.brief}
                  </p>
                )}

                {reviewNotes.length > 0 && (
                  <aside className="review-notes">
                    <div className="label review-notes-head">
                      <span style={{ color: 'var(--beige-dark)', marginRight: '0.5rem' }}>×</span>Final Review
                    </div>
                    <ul className="review-notes-list">
                      {reviewNotes.map(({ note, by }, i) => (
                        <li key={i} className="review-note">
                          {note}
                          {by && <span className="review-note-by">— {by}</span>}
                        </li>
                      ))}
                    </ul>
                  </aside>
                )}
              </div>
            )}
          </div>

          {/* Cover figure — sits on a pale band that runs out past it on both
              sides. The band is the only thing holding it now: the drop line
              that used to tie it down had no rule left to meet. */}
          {coverImage && (
            <div className="sheet-hero">
              {/* The band is centred on the photo, so it is measured against
                  the photo: this figure shrink-wraps the image and the band's
                  insets resolve against that box rather than the column. */}
              <span className="sheet-hero-figure">
                <span className="sheet-hero-band" aria-hidden="true" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImage}
                  alt={`${project.title} — cover figure`}
                  className="sheet-hero-img"
                  onError={(e) => (((e.currentTarget as HTMLImageElement).style.opacity = '0'))}
                />
              </span>
            </div>
          )}
        </div>
      </header>

      {/* ── LEGEND ─────────────────────────────────────────────────
          Placed ahead of the plates deliberately: a reader meets the codes
          before the drawings that carry them, which is the whole point of
          the review note asking for one. */}
      {project.programLegend && project.programLegend.length > 0 && (
        <ScrollReveal>
          <SectionHead title="Legend" meta={`${project.programLegend.length} keyed`} />
          <div style={{ padding: 'clamp(1.25rem, 3vw, 2rem) clamp(1.5rem, 5vw, 3rem) clamp(2rem, 5vw, 3rem)' }}>
            <dl className="legend-list">
              {project.programLegend.map(({ code, label }) => (
                <div key={code} className="legend-row">
                  <dt className="legend-code">{code}</dt>
                  <dd className="legend-label">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </ScrollReveal>
      )}

      {/* ── PLATES ─────────────────────────────────────────────────── */}
      {images.length > 0 && (
        <CatalogPlates
          images={images}
          onOpen={setLightboxIndex}
          plateLayouts={project.plateLayouts}
          plateGroups={project.plateGroups}
        />
      )}

      {/* ── CREDITS ────────────────────────────────────────────────
          Review note: photography and build help get named. Set small and
          last — it is attribution, not a section of the project. */}
      {project.credits && project.credits.length > 0 && (
        <div style={{
          padding: 'clamp(2.5rem, 5vw, 3.75rem) clamp(1.5rem, 5vw, 3rem) clamp(1.5rem, 3.5vw, 2.25rem)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(1.25rem, 4vw, 3rem)',
        }}>
          {project.credits.map(({ role, names }) => (
            <div key={role} style={{ minWidth: 0 }}>
              <div className="label" style={{ color: 'var(--gray-400)', marginBottom: '0.3rem' }}>{role}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.78rem, 1.5vw, 0.88rem)',
                color: 'var(--gray-700)',
              }}>
                {names.join(' · ')}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── CONTINUE ───────────────────────────────────────────────── */}
      <nav className="catalog-nav" style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        marginTop: 'clamp(2.5rem, 5vw, 3.75rem)',
      }}>
        {prev ? (
          <Link href={`/project/${prev.id}`} data-hover className="catalog-nav-link" style={{ textAlign: 'left' }}>
            <span className="label">← previous</span>
            <span className="catalog-nav-title">{prev.title}</span>
            <span className="label">{prev.semester}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/project/${next.id}`} data-hover className="catalog-nav-link catalog-nav-next">
            <span className="label">next →</span>
            <span className="catalog-nav-title">{next.title}</span>
            <span className="label">{next.semester}</span>
          </Link>
        ) : <span />}
      </nav>

      {lightboxIndex !== null && (
        <ImageLightbox
          items={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}

      <style>{`
        /* Title — a single line. The size is bounded by the longest title in
           the set ("Riverside Residential", 21 characters): IBM Plex Mono
           advances 0.6em per character, so the line runs ~12.4em and the
           3.2vw step keeps it inside the 0.61-of-content-width left column at
           every viewport. Raising the cap past 3rem wraps that title. */
        .sheet-subtitle {
          font-family: var(--font-mono);
          font-weight: 400;
          font-size: clamp(0.5rem, 2.15vw, 0.78rem);
          letter-spacing: 0.01em;
          color: var(--gray-500);
          margin-top: clamp(0.5rem, 1.2vw, 0.7rem);
          white-space: nowrap;
        }

        /* Title — a single line, bounded by the longest title in the set
           ("Riverside Residential", 21 characters). Consolas advances 0.55em
           per character, so in caps that line runs ~10.9em after tracking and
           the 3.2vw step keeps it inside the 0.61-of-content-width left
           column at every viewport. */
        .sheet-title {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: clamp(1.05rem, 3.2vw, 3rem);
          letter-spacing: -0.03em;
          line-height: 1.05;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* Grid items default to min-width:auto, so the cover's intrinsic width
           becomes the column's minimum and widens the track past the viewport
           on narrow screens. */
        .catalog-cover > * { min-width: 0; }

        /* Pale band, wider than the figure and running out past it on both
           sides — the offset that keeps the cover from reading as a card. */
        /* The figure still hangs to the right edge of the column; it is the
           band inside it that is centred. */
        .sheet-hero { display: flex; justify-content: flex-end; }
        .sheet-hero-figure {
          position: relative;
          max-width: 100%;
        }
        /* Equal overhang on all four sides of the photo. The total width is
           what it always was — 22% of the figure beyond its edges — but split
           evenly instead of 16% left against 6% right. */
        .sheet-hero-band {
          position: absolute;
          inset: 19% -11%;
          background: var(--gray-50);
        }
        /* Capped: a portrait cover would otherwise run the header two screens
           tall and strand the text beside it. */
        .sheet-hero-img {
          position: relative;
          display: block;
          width: auto;
          max-width: 100%;
          max-height: min(40vh, 400px);
        }

        /* Brief and its margin notes. The notes column is capped rather than
           given a fraction of the row, so the brief keeps a readable measure
           on a wide screen instead of the two splitting it in half. */
        .brief-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(1.25rem, 2.5vw, 2rem);
          align-items: start;
        }
        /* Tag sits above its own rule, so the column opens with the label
           rather than with a line. */
        .review-notes-head {
          font-weight: 700;
          color: var(--black);
          border-bottom: 1px solid var(--black);
          padding-bottom: clamp(0.4rem, 1.1vw, 0.55rem);
          margin-bottom: clamp(0.6rem, 1.6vw, 0.9rem);
        }
        .review-notes-list { list-style: none; }
        /* Hanging tick in place of a bullet: the note text stays flush as a
           block, the marker sits out in the margin. */
        /* Reported speech: italic and set back from the brief beside it, so
           a quotation doesn't compete with the project's own claim. */
        .review-note {
          position: relative;
          padding-left: 1.1rem;
          font-family: var(--font-prose);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(0.76rem, 1.45vw, 0.86rem);
          line-height: 1.55;
          color: var(--gray-500);
        }
        .review-note + .review-note { margin-top: clamp(0.5rem, 1.3vw, 0.7rem); }
        .review-note::before {
          content: '×';
          position: absolute;
          left: 0;
          top: 0;
          font-family: var(--font-mono);
          font-size: 0.8em;
          color: var(--gray-300);
        }
        /* The attribution is not part of the quotation, so it stays upright
           while the note above it is italic. */
        .review-note-by {
          display: block;
          font-style: normal;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--gray-400);
          margin-top: 0.2rem;
        }

        /* Two columns of keyed codes on a wide sheet, one when narrow.
           Hairline under each row so a long label still reads back to its
           code across the gap. */
        .legend-list {
          display: grid;
          grid-template-columns: 1fr;
          column-gap: clamp(2rem, 5vw, 4rem);
          max-width: 68rem;
        }
        .legend-row {
          display: flex;
          align-items: baseline;
          gap: clamp(0.75rem, 2vw, 1.25rem);
          border-bottom: 1px solid var(--gray-100);
          padding: clamp(0.4rem, 1.1vw, 0.55rem) 0;
        }
        .legend-code {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: clamp(0.62rem, 1.3vw, 0.72rem);
          letter-spacing: 0.08em;
          color: var(--black);
          flex-shrink: 0;
          min-width: 2.5ch;
        }
        .legend-label {
          font-family: var(--font-mono);
          font-size: clamp(0.78rem, 1.5vw, 0.88rem);
          color: var(--gray-700);
        }
        @media (min-width: 861px) {
          .legend-list { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1200px) {
          .brief-row { grid-template-columns: minmax(0, 1fr) minmax(0, 15rem); }
        }

        .catalog-back {
          color: var(--gray-500);
          transition: color 0.2s ease;
        }
        .catalog-back:hover { color: var(--black); }

        .catalog-nav-link {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          padding: clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 5vw, 3rem);
          text-decoration: none;
          color: var(--black);
          transition: background 0.25s ease;
        }
        .catalog-nav-link:hover { background: var(--gray-50); }
        .catalog-nav-next { text-align: right; }
        .catalog-nav-title {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: clamp(0.9rem, 2vw, 1.15rem);
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        @media (min-width: 861px) {
          .catalog-cover { grid-template-columns: 1.35fr 0.65fr !important; }
          .catalog-nav { grid-template-columns: 1fr 1fr !important; }
          .catalog-nav-link + .catalog-nav-link { border-left: 1px solid var(--black); }
        }
        @media (max-width: 860px) {
          .catalog-nav-link + .catalog-nav-link { border-top: 1px solid var(--gray-100); }
          .catalog-nav-next { text-align: left; }
        }
      `}</style>
    </div>
  );
}
