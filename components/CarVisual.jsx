'use client';

import Image from 'next/image';

/**
 * CarVisual Component
 * Renders the top-down McLaren 720S sports car
 * with chassis drop-shadow and forward headlight beam projection.
 */
export default function CarVisual({ carRef }) {
  return (
    <div
      ref={carRef}
      className="car-wrapper"
    >
      {/* Forward headlight projection beam */}
      <div
        className="headlight-beam"
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '88%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '260px',
          height: '150px',
          background: 'radial-gradient(ellipse at left center, rgba(69, 219, 125, 0.28) 0%, rgba(69, 219, 125, 0.09) 45%, transparent 75%)',
          pointerEvents: 'none',
          filter: 'blur(10px)',
        }}
      />

      {/* Main Car Asset container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '85%',
          display: 'flex',
          alignItems: 'center',
          filter: 'drop-shadow(0 16px 28px rgba(0, 0, 0, 0.75))',
        }}
      >
        <Image
          src="/assets/mclaren.png"
          alt="Top-down view of McLaren 720S sports car"
          width={360}
          height={170}
          priority
          unoptimized
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
}
