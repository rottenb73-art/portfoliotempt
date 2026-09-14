import type { ProjectMeta } from '@/lib/projects';

/**
 * The project's specification table, rendered inside the cover block directly
 * under the title so it is the first thing a reader gets. It carries no
 * padding or rule of its own — the cover positions it.
 *
 * The brief deliberately lives elsewhere: it is prose, and it has its own
 * section further down the page.
 */
export function ProjectInfo({ meta, semester }: { meta?: ProjectMeta; semester: string }) {
  if (!meta) return null;

  const rows = ([
    ['Studio', meta.studio ?? ''],
    ['Semester', semester],
    ['Faculty', meta.faculty ?? ''],
    ['Location', meta.location ?? ''],
    ['Project Type', meta.projectType ?? ''],
    ['Team', meta.team && meta.team.length ? meta.team.join(' · ') : ''],
    ['My Role', meta.myRole ?? ''],
    ['Tools', meta.tools && meta.tools.length ? meta.tools.join(' · ') : ''],
  ] as [string, string][]).filter(([, v]) => v);

  if (!rows.length) return null;

  return (
    <div style={{ maxWidth: '40rem' }}>
      <div className="label" style={{ marginBottom: 'clamp(0.4rem, 1vw, 0.6rem)' }}>
        <span style={{ color: 'var(--beige-dark)', marginRight: '0.5rem' }}>○</span>Project Information
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {rows.map(([k, v]) => (
          <div key={k} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderBottom: '1px solid var(--gray-100)',
            padding: 'clamp(0.26rem, 0.7vw, 0.36rem) 0',
            gap: '1rem',
            flexWrap: 'wrap',
          }}>
            <span className="label" style={{ color: 'var(--gray-400)', flexShrink: 0 }}>{k}</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.62rem, 1.3vw, 0.7rem)',
              textAlign: 'right',
            }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
