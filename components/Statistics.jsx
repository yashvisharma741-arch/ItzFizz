'use client';

/**
 * Statistics Component
 * Displays the 4 impact statistics positioned around the road canvas.
 * Exactly matches the reference data and layout geometry.
 */
export const STATS_DATA = [
  {
    id: 'box1',
    num: '58%',
    label: 'Increase in pick up point use',
    bg: '#def54f',
    textColor: '#0f1115',
    subLabel: 'MILESTONE 01',
  },
  {
    id: 'box2',
    num: '23%',
    label: 'Decreased in customer phone calls',
    bg: '#6ac9ff',
    textColor: '#0f1115',
    subLabel: 'MILESTONE 02',
  },
  {
    id: 'box3',
    num: '27%',
    label: 'Increase in pick up point use',
    bg: '#22232a',
    textColor: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    subLabel: 'MILESTONE 03',
  },
  {
    id: 'box4',
    num: '40%',
    label: 'Decreased in customer phone calls',
    bg: '#fa7328',
    textColor: '#0f1115',
    subLabel: 'MILESTONE 04',
  },
];

export default function Statistics({ setStatRef }) {
  return (
    <div className="stats-layer" aria-label="Key Performance Statistics">
      {STATS_DATA.map((stat, i) => (
        <div
          key={stat.id}
          id={stat.id}
          ref={(el) => setStatRef(i, el)}
          className={`stat-card stat-${stat.id}`}
          style={{
            backgroundColor: stat.bg,
            color: stat.textColor,
            border: stat.border || 'none',
          }}
          aria-label={`${stat.num} ${stat.label}`}
        >
          <div className="stat-meta">
            <span className="stat-sublabel">{stat.subLabel}</span>
            <span className="stat-indicator-dot" />
          </div>
          <div className="stat-num">{stat.num}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
