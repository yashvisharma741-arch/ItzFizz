'use client';

/**
 * ScrollIndicator Component
 * Renders the bottom scroll prompt and a top/corner HUD progress indicator.
 */
export default function ScrollIndicator({ scrollIndicatorRef, progressRef }) {
  return (
    <>
      {/* Top-Right HUD Progress Indicator */}
      <div
        ref={progressRef}
        className="hud-progress"
        aria-live="polite"
        aria-label="Scroll Progress"
      >
        <div className="hud-metric">
          <span className="hud-label">TRACK PROGRESS</span>
          <span className="hud-value" id="hud-percent-text">00%</span>
        </div>
        <div className="hud-bar-container">
          <div className="hud-bar-fill" id="hud-bar-fill" />
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div
        ref={scrollIndicatorRef}
        className="scroll-indicator"
        aria-label="Scroll down indicator"
      >
        <span className="scroll-text">SCROLL TO DRIVE</span>
        <div className="scroll-pill-wrapper">
          <div className="scroll-pill-dot" />
        </div>
      </div>
    </>
  );
}
