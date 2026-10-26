'use client';

/**
 * NextSection Component
 * Demonstrates natural scroll release and continuation of the ITZFIZZ design system.
 */
export default function NextSection() {
  return (
    <section className="next-section" id="next-section" aria-label="Project Overview">
      <div className="next-container">
        {/* Eyebrow Label */}
        <div className="next-eyebrow">
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--green-glow)',
            }}
          />
          CONTINUATION & OVERVIEW
        </div>

        {/* Heading */}
        <h2 className="next-heading">
          ENGINEERED FOR PRECISION
        </h2>

        {/* Minimal Divider Accent */}
        <div className="next-divider" aria-hidden="true" />

        {/* Narrative Description */}
        <p className="next-body">
          The ITZFIZZ hero stage showcases a pinned, scroll-driven interactive track
          powered by GSAP ScrollTrigger. As users scroll vertically, the McLaren 720S
          traverses the horizontal roadway, leaving a dynamic glowing green trail in its wake.
          The typography illuminates on vehicle contact, and key metrics are unveiled at
          precise coordinate intervals. The timeline seamlessly reverses on upward navigation.
        </p>

        {/* Summary Grid of Key Performance Indicators */}
        <div className="next-stats-grid">
          {[
            {
              num: '58%',
              label: 'Increase in pick up point use',
              accent: '#def54f',
            },
            {
              num: '23%',
              label: 'Decreased in customer phone calls',
              accent: '#6ac9ff',
            },
            {
              num: '27%',
              label: 'Increase in pick up point use',
              accent: '#ffffff',
            },
            {
              num: '40%',
              label: 'Decreased in customer phone calls',
              accent: '#fa7328',
            },
          ].map((stat, i) => (
            <div key={i} className="next-stat-card">
              <div
                className="next-stat-num"
                style={{ color: stat.accent }}
              >
                {stat.num}
              </div>
              <div className="next-stat-label">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div
          style={{
            marginTop: '4.5rem',
            fontSize: '0.75rem',
            color: '#555964',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          ITZFIZZ Interactive Automotive UI · GSAP & Next.js App Router
        </div>
      </div>
    </section>
  );
}
