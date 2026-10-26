
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CarVisual from './CarVisual';
import Statistics from './Statistics';
import ScrollIndicator from './ScrollIndicator';

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_WORDS = [
  {
    text: 'WELCOME',
    letters: ['W', 'E', 'L', 'C', 'O', 'M', 'E'],
  },
  {
    text: 'ITZFIZZ',
    letters: ['I', 'T', 'Z', 'F', 'I', 'Z', 'Z'],
  },
];

export default function HeroSection() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const navRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const progressRef = useRef(null);
  const headlineRef = useRef(null);

  const lettersRef = useRef([]);
  const statRefs = useRef([]);

  const setStatRef = (index, element) => {
    statRefs.current[index] = element;
  };

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let resizeHandler;

    const ctx = gsap.context(() => {
      const stage = stageRef.current;
      const road = roadRef.current;
      const car = carRef.current;
      const trail = trailRef.current;
      const nav = navRef.current;
      const scrollIndicator = scrollIndicatorRef.current;
      const progressHUD = progressRef.current;

      const letters = lettersRef.current.filter(Boolean);

      // Preserve the original four-card order.
      const stats = statRefs.current.slice(0, 4);

      if (
        !stage ||
        !road ||
        !car ||
        !trail ||
        stats.length !== 4 ||
        stats.some((card) => !card)
      ) {
        return;
      }

      const percentText = document.getElementById(
        'hud-percent-text'
      );

      const barFill = document.getElementById('hud-bar-fill');

      /*
       * 1. INITIAL STATES
       *
       * ALL four milestones begin hidden.
       * None of the cards is revealed by the intro animation.
       */
      gsap.set(stats, {
        autoAlpha: 0,
        y: 24,
      });

      gsap.set(car, {
        x: 0,
        opacity: 0,
      });

      gsap.set(trail, {
        width: 0,
      });

      if (prefersReducedMotion) {
        gsap.set([nav, scrollIndicator, progressHUD], {
          autoAlpha: 1,
          y: 0,
        });

        gsap.set(letters, {
          autoAlpha: 0.65,
          y: 0,
        });

        gsap.set(car, {
          opacity: 1,
        });
      } else {
        /*
         * 2. PAGE-LOAD INTRO
         *
         * Only the navigation, headline, car and scroll
         * indicator animate on load. Milestones do not.
         */
        const introTl = gsap.timeline({
          defaults: {
            ease: 'power3.out',
          },
        });

        if (nav) {
          introTl.fromTo(
            nav,
            { autoAlpha: 0, y: -18 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
            }
          );
        }

        if (letters.length) {
          introTl.fromTo(
            letters,
            {
              autoAlpha: 0,
              y: 18,
            },
            {
              autoAlpha: 0.65,
              y: 0,
              duration: 0.6,
              stagger: 0.02,
            },
            '<0.1'
          );
        }

        introTl.to(
          car,
          {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          },
          '<0.1'
        );

        if (scrollIndicator) {
          introTl.fromTo(
            scrollIndicator,
            {
              autoAlpha: 0,
              y: 15,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
            },
            '<0.1'
          );
        }
      }

      /*
       * 3. MEASURE ROAD GEOMETRY
       */
      const computeMetrics = () => {
        const roadWidth = road.offsetWidth;
        const roadRect = road.getBoundingClientRect();
        const carRect = car.getBoundingClientRect();

        const carInitialFront = carRect.right - roadRect.left;

        // Distance the car travels across the road.
        const endX = Math.max(
          0,
          roadWidth - carInitialFront + 60
        );

        const trailEndWidth = roadWidth + 80;

        const letterPositions = letters.map((letter) => {
          const rect = letter.getBoundingClientRect();

          return rect.left - roadRect.left + rect.width * 0.3;
        });

        return {
          roadWidth,
          carInitialFront,
          endX,
          trailEndWidth,
          letterPositions,
        };
      };

      let metrics = computeMetrics();

      /*
       * 4. MASTER SCROLL TIMELINE
       *
       * The car, trail and all four milestones are controlled
       * by one timeline.
       *
       * Forward scrolling reveals cards 1 -> 2 -> 3 -> 4.
       * Reverse scrolling hides cards 4 -> 3 -> 2 -> 1.
       */
      const masterScroll = gsap.timeline({
        defaults: {
          ease: 'none',
        },

        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          pin: stage,
          scrub: prefersReducedMotion ? 0 : 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const progress = self.progress;

            // Illuminate headline letters as the car passes.
            const currentFront =
              metrics.carInitialFront +
              progress * metrics.endX;

            letters.forEach((letter, index) => {
              if (currentFront >= metrics.letterPositions[index]) {
                letter.classList.add('illuminated');
              } else {
                letter.classList.remove('illuminated');
              }
            });

            // Update progress HUD.
            const percentage = Math.round(progress * 100);

            if (percentText) {
              percentText.textContent =
                `${String(percentage).padStart(2, '0')}%`;
            }

            if (barFill) {
              barFill.style.width = `${percentage}%`;
            }
          },

          onRefresh: () => {
            metrics = computeMetrics();
          },
        },
      });

      /*
       * 5. CAR MOVEMENT
       */
      masterScroll.to(
        car,
        {
          x: () => computeMetrics().endX,
          duration: 1,
          ease: 'none',
        },
        0
      );

      /*
       * 6. GREEN TRAIL
       */
      masterScroll.to(
        trail,
        {
          width: () => computeMetrics().trailEndWidth,
          duration: 1,
          ease: 'none',
        },
        0
      );

      /*
       * 7. SEQUENTIAL MILESTONE REVEALS
       *
       * These are timeline positions, not separate scroll
       * triggers. The master timeline reverses them naturally.
       *
       * The card indexes correspond to:
       * stats[0] = Milestone 1
       * stats[1] = Milestone 2
       * stats[2] = Milestone 3
       * stats[3] = Milestone 4
       */

      const milestoneSchedule = [
        {
          label: 'milestone1',
          position: 0.08,
        },
        {
          label: 'milestone2',
          position: 0.30,
        },
        {
          label: 'milestone3',
          position: 0.53,
        },
        {
          label: 'milestone4',
          position: 0.76,
        },
      ];

      milestoneSchedule.forEach((milestone, index) => {
        const card = stats[index];

        masterScroll.addLabel(
          milestone.label,
          milestone.position
        );

        masterScroll.fromTo(
          card,
          {
            autoAlpha: 0,
            y: 24,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.10,
            ease: 'power2.out',
            immediateRender: false,
          },
          milestone.label
        );
      });

      /*
       * 8. RESPONSIVE REFRESH
       */
      resizeHandler = () => {
        metrics = computeMetrics();
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', resizeHandler);

      // Recalculate measurements once everything is initialized.
      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
      }

      // Reverts GSAP styles and kills associated animations/triggers.
      ctx.revert();
    };
  }, []);

  let globalLetterIdx = 0;

  return (
    <section
      ref={containerRef}
      className="hero-container"
      aria-label="ITZFIZZ Interactive Automotive Experience"
    >
      <div ref={stageRef} className="stage-wrapper">
        <div
          className="stage-backdrop"
          aria-hidden="true"
        />

        {/* Navigation and progress indicator */}
        <header
          ref={navRef}
          className="nav-header"
        >
          <div className="brand-wrapper">
            <span className="brand-dot" />
            <span className="brand-title">ITZFIZZ</span>
            <span className="brand-pill">
              MCLAREN 720S EDITION
            </span>
          </div>

          <ScrollIndicator
            scrollIndicatorRef={scrollIndicatorRef}
            progressRef={progressRef}
          />
        </header>

        {/* Road, trail, headline and car */}
        <div
          ref={roadRef}
          className="road-track"
          role="region"
          aria-label="Interactive Road Canvas"
        >
          <div
            className="road-lane-markings"
            aria-hidden="true"
          />

          <div
            ref={trailRef}
            className="green-trail"
            aria-hidden="true"
          />

          <div
            ref={headlineRef}
            className="headline-container"
            aria-label="WELCOME ITZFIZZ"
          >
            {HEADLINE_WORDS.map((wordGroup, groupIndex) => (
              <span
                key={groupIndex}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                {wordGroup.letters.map((letter) => {
                  const currentIndex = globalLetterIdx++;

                  return (
                    <span
                      key={currentIndex}
                      ref={(element) => {
                        lettersRef.current[currentIndex] =
                          element;
                      }}
                      className="headline-letter"
                      aria-hidden="true"
                    >
                      {letter}
                    </span>
                  );
                })}

                {groupIndex < HEADLINE_WORDS.length - 1 && (
                  <span
                    className="headline-space"
                    aria-hidden="true"
                  />
                )}
              </span>
            ))}
          </div>

          <CarVisual carRef={carRef} />
        </div>

        {/* All four milestone cards are scroll-controlled */}
        <Statistics setStatRef={setStatRef} />
      </div>
    </section>
  );
}
