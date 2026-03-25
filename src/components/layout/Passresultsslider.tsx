'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Pilot {
    id: number;
    imageSrc: string;
    airline: string;
}

interface AirlineColor {
    bg: string;
    border: string;
    dot: string;
    text: string;
}

const reviewsData: Pilot[] = [
    { id: 1, imageSrc: '/assets/pilot-1 (1).webp', airline: 'Air India' },
    { id: 2, imageSrc: '/assets/pilot-1 (2).webp', airline: 'IndiGo' },
    { id: 3, imageSrc: '/assets/pilot-1 (3).webp', airline: 'Air India Express' },
    { id: 4, imageSrc: '/assets/pilot-1 (4).webp', airline: 'Air India Express' },
    { id: 5, imageSrc: '/assets/pilot-1 (5).webp', airline: 'IndiGo' },
    { id: 6, imageSrc: '/assets/pilot-1 (6).webp', airline: 'Air India Express' },
    { id: 7, imageSrc: '/assets/pilot-1 (7).webp', airline: 'Air India' },
    { id: 8, imageSrc: '/assets/pilot-1 (8).webp', airline: 'Air India Express' },
    { id: 9, imageSrc: '/assets/pilot-1 (9).webp', airline: 'SpiceJet' },
    { id: 10, imageSrc: '/assets/pilot-1 (10).webp', airline: 'Air India' },
    { id: 11, imageSrc: '/assets/pilot-1 (11).webp', airline: 'SpiceJet' },
    { id: 12, imageSrc: '/assets/pilot-1 (12).webp', airline: 'IndiGo' },
    { id: 13, imageSrc: '/assets/pilot-1 (13).webp', airline: 'IndiGo' },
    { id: 14, imageSrc: '/assets/pilot-1 (14).webp', airline: 'SpiceJet' },
    { id: 15, imageSrc: '/assets/pilot-1 (15).webp', airline: 'SpiceJet' },
    { id: 16, imageSrc: '/assets/pilot-1 (16).webp', airline: 'Air India Express' },
];

const AIRLINE_COLORS: Record<string, AirlineColor> = {
    'Air India': { bg: 'rgba(180,0,50,0.09)', border: 'rgba(180,0,50,0.22)', dot: '#b40032', text: '#8b0028' },
    'IndiGo': { bg: 'rgba(6,54,190,0.09)', border: 'rgba(6,54,190,0.22)', dot: '#0636be', text: '#0636be' },
    'Air India Express': { bg: 'rgba(212,130,0,0.10)', border: 'rgba(212,130,0,0.25)', dot: '#d4a017', text: '#7a5500' },
    'SpiceJet': { bg: 'rgba(220,53,30,0.09)', border: 'rgba(220,53,30,0.22)', dot: '#dc351e', text: '#9a2010' },
};

const CARD_GAP = 18;
const CARD_WIDTH = 220 + CARD_GAP;
const VISIBLE = 4;
const AUTO_SLIDE = 3200;

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

  .prs-section {
    font-family: 'DM Sans', 'Poppins', sans-serif;
    background: #f5f8f5;
    padding: 96px 0 108px;
    overflow: hidden;
    position: relative;
    width: 100%;
    isolation: isolate;
  }
  .prs-section::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(10,45,26,0.032) 1px, transparent 1px),
      linear-gradient(90deg, rgba(10,45,26,0.032) 1px, transparent 1px);
    background-size: 60px 60px;
    z-index: 0; pointer-events: none;
  }
  .prs-section::after {
    content: '';
    position: absolute; top: -120px; right: -80px;
    width: 520px; height: 520px;
    background: radial-gradient(circle, rgba(212,160,23,0.09) 0%, transparent 70%);
    z-index: 0; pointer-events: none;
  }
  .prs-inner { position: relative; z-index: 1; }

  /* ── Header ── */
  .prs-header {
    padding: 0 5%;
    margin-bottom: 48px;
    display: flex; align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap; gap: 20px;
  }
  .prs-tag {
    display: inline-flex; align-items: center; gap: 7px;
    background: #0a2d1a;
    color: #fff;
    padding: 5px 14px 5px 10px;
    border-radius: 999px;
    font-size: 0.68rem; font-weight: 600;
    letter-spacing: 1.8px; text-transform: uppercase;
    margin-bottom: 16px;
  }
  .prs-tag-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #d4a017;
    animation: prs-pulse 2s ease-in-out infinite;
  }
  @keyframes prs-pulse {
    0%, 100% { transform: scale(1);   opacity: 1;   }
    50%       { transform: scale(1.5); opacity: 0.65; }
  }
  .prs-header h2 {
    font-family: 'Syne', 'Montserrat', sans-serif;
    font-size: clamp(1.9rem, 4.2vw, 3.2rem);
    font-weight: 800;
    color: #0a2d1a;
    line-height: 1.1; margin: 0;
    letter-spacing: -0.02em;
  }
  .prs-header h2 em {
    font-style: normal;
    color: #1a6b3a;
  }

  /* ── Counter ── */
  .prs-counter { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
  .prs-counter-num {
    font-family: 'Syne', sans-serif;
    font-size: 3rem; font-weight: 800;
    color: #0a2d1a; line-height: 1; letter-spacing: -0.04em;
  }
  .prs-counter-num span { color: #d4a017; }
  .prs-counter-label {
    font-size: 0.7rem; font-weight: 600;
    letter-spacing: 1.5px; text-transform: uppercase;
    color: rgba(10,45,26,0.42);
  }

  /* ── Viewport ── */
  .prs-viewport {
    width: 90%; margin: 0 auto;
    overflow: hidden; position: relative; border-radius: 20px;
  }
  .prs-viewport::before,
  .prs-viewport::after {
    content: '';
    position: absolute; top: 0; bottom: 0;
    width: 72px; z-index: 3; pointer-events: none;
  }
  .prs-viewport::before { left: 0;  background: linear-gradient(to right, #f5f8f5 0%, transparent 100%); }
  .prs-viewport::after  { right: 0; background: linear-gradient(to left,  #f5f8f5 0%, transparent 100%); }

  .prs-track {
    display: flex;
    gap: 18px;
    transition: transform 0.52s cubic-bezier(0.33, 1, 0.68, 1);
    will-change: transform;
    padding: 28px 6px 36px;
    cursor: grab;
    user-select: none;
  }
  .prs-track:active { cursor: grabbing; }

  /* ── Card ── */
  .prs-card {
    min-width: 220px; border-radius: 20px;
    border: 1.5px solid rgba(10,45,26,0.08);
    background: #ffffff;
    display: flex; flex-direction: column; align-items: center; text-align: center;
    position: relative; overflow: hidden; cursor: default;
    transition:
      transform   0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
      box-shadow  0.35s ease,
      border-color 0.35s ease;
    box-shadow: 0 2px 6px rgba(10,45,26,0.04), 0 8px 24px rgba(10,45,26,0.07);
  }
  .prs-card:hover {
    transform: translateY(-10px) scale(1.012);
    box-shadow:
      0 4px 12px rgba(10,45,26,0.06),
      0 20px 48px rgba(10,45,26,0.14),
      0 0 0 2px rgba(212,160,23,0.22);
    border-color: rgba(212,160,23,0.28);
  }

  /* ── Card header band ── */
  .prs-card-head {
    width: 100%; height: 96px;
    background: linear-gradient(135deg, #0a2d1a 0%, #14582c 100%);
    position: relative; flex-shrink: 0; overflow: hidden;
  }
  .prs-card-head::before {
    content: '';
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      -45deg,
      rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px,
      transparent 1px, transparent 14px
    );
  }
  .prs-card-head::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #d4a017 0%, #1a9e58 100%);
    opacity: 0; transition: opacity 0.35s ease;
  }
  .prs-card:hover .prs-card-head::after { opacity: 1; }

  .prs-plane-mark {
    position: absolute; right: 14px; top: 50%;
    transform: translateY(-50%);
    font-size: 2rem; color: rgba(255,255,255,0.08);
    transition: color 0.35s ease, transform 0.4s ease;
    line-height: 1;
  }
  .prs-card:hover .prs-plane-mark {
    color: rgba(212,160,23,0.22);
    transform: translateY(-58%) rotate(-12deg) scale(1.15);
  }
  .prs-card-id {
    position: absolute; left: 14px; bottom: 12px;
    font-family: 'Syne', monospace;
    font-size: 0.6rem; font-weight: 700;
    letter-spacing: 2px; color: rgba(255,255,255,0.28);
  }

  /* ── Avatar ── */
  .prs-avatar-wrap {
    position: relative; z-index: 2;
    width: 86px; height: 86px;
    margin-top: -43px; margin-bottom: 14px;
    flex-shrink: 0; border-radius: 50%; padding: 3px;
    background: linear-gradient(135deg, #d4a017 0%, #1a9e58 100%);
    box-shadow: 0 4px 14px rgba(212,160,23,0.3), 0 0 0 4px #fff;
    transition: box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .prs-card:hover .prs-avatar-wrap {
    box-shadow: 0 8px 24px rgba(212,160,23,0.42), 0 0 0 4px #fff;
    transform: scale(1.07);
  }
  .prs-avatar-inner {
    width: 100%; height: 100%;
    border-radius: 50%; overflow: hidden;
    background: #cde3d3; border: 3px solid #fff;
  }
  .prs-avatar-inner img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: center top;
    display: block; transition: transform 0.45s ease;
  }
  .prs-card:hover .prs-avatar-inner img { transform: scale(1.1); }

  /* ── Card body ── */
  .prs-card-body {
    padding: 0 16px 20px;
    display: flex; flex-direction: column; align-items: center;
    gap: 0; width: 100%; box-sizing: border-box;
  }

  /* ── Passed badge ── */
  .prs-passed {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(26,107,58,0.1);
    border: 1.5px solid rgba(26,107,58,0.22);
    color: #0d4a1e;
    padding: 5px 14px;
    border-radius: 999px;
    font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.04em;
    margin-bottom: 10px;
    transition: background 0.3s, border-color 0.3s;
  }
  .prs-card:hover .prs-passed {
    background: rgba(26,107,58,0.15);
    border-color: rgba(26,107,58,0.35);
  }

  .prs-divider {
    width: 36px; height: 1px;
    background: rgba(10,45,26,0.1); margin: 10px auto;
    transition: width 0.3s ease, background 0.3s ease;
  }
  .prs-card:hover .prs-divider { width: 54px; background: rgba(212,160,23,0.45); }

  /* ── Airline badge ── */
  .prs-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 12px; border-radius: 999px;
    font-size: 0.65rem; font-weight: 600; letter-spacing: 0.03em;
    border: 1.5px solid; transition: all 0.3s ease;
  }
  .prs-badge-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

  /* ── Controls ── */
  .prs-controls {
    display: flex; align-items: center; justify-content: space-between;
    width: 90%; margin: 34px auto 0; padding: 0 4px;
  }
  .prs-dots { display: flex; align-items: center; gap: 5px; }
  .prs-dot {
    height: 4px; border-radius: 999px;
    background: rgba(10,45,26,0.14);
    cursor: pointer; border: none; padding: 0;
    transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease;
    width: 18px;
  }
  .prs-dot.active { width: 42px; background: #d4a017; }
  .prs-dot:hover:not(.active) { background: rgba(10,45,26,0.3); }

  .prs-arrows { display: flex; gap: 10px; }
  .prs-arrow {
    width: 44px; height: 44px; border-radius: 50%;
    border: 1.5px solid rgba(10,45,26,0.14);
    background: #fff; color: #0a2d1a;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition:
      background    0.28s ease,
      border-color  0.28s ease,
      color         0.28s ease,
      transform     0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
      box-shadow    0.28s ease;
    box-shadow: 0 2px 8px rgba(10,45,26,0.07);
    outline: none;
  }
  .prs-arrow:hover {
    background: #0a2d1a; border-color: #0a2d1a; color: #fff;
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(10,45,26,0.24);
  }
  .prs-arrow:active { transform: scale(0.95); }
  .prs-arrow svg { pointer-events: none; }

  .prs-slide-count {
    font-family: 'Syne', sans-serif;
    font-size: 0.73rem; font-weight: 700;
    color: rgba(10,45,26,0.35); letter-spacing: 1px;
    min-width: 58px; text-align: center;
  }
  .prs-slide-count strong { color: #0a2d1a; font-size: 0.88rem; }

  @media (max-width: 900px) { .prs-counter { display: none; } }
  @media (max-width: 768px) {
    .prs-section { padding: 64px 0 80px; }
    .prs-card { min-width: 190px; }
    .prs-card-head { height: 78px; }
    .prs-avatar-wrap { width: 74px; height: 74px; margin-top: -37px; }
    .prs-header h2 { font-size: 1.75rem; }
  }
  @media (max-width: 480px) {
    .prs-card { min-width: 172px; }
    .prs-avatar-wrap { width: 66px; height: 66px; margin-top: -33px; }
    .prs-header h2 { font-size: 1.5rem; }
  }
`;

export default function PassResultsSlider() {
    const [current, setCurrent] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [isAnim, setIsAnim] = useState<boolean>(false);
    const [dragStart, setDragStart] = useState<number | null>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const total = reviewsData.length;
    const maxIndex = total - VISIBLE;

    const goTo = useCallback((idx: number): void => {
        if (isAnim) return;
        setIsAnim(true);
        setCurrent(Math.max(0, Math.min(idx, maxIndex)));
        setTimeout(() => setIsAnim(false), 520);
    }, [isAnim, maxIndex]);

    const next = useCallback(() => goTo(current >= maxIndex ? 0 : current + 1), [current, maxIndex, goTo]);
    const prev = useCallback(() => goTo(current <= 0 ? maxIndex : current - 1), [current, maxIndex, goTo]);

    useEffect(() => {
        if (isPaused) return;
        const t = setInterval(next, AUTO_SLIDE);
        return () => clearInterval(t);
    }, [isPaused, next]);

    useEffect(() => {
        if (trackRef.current) {
            trackRef.current.style.transform = `translateX(-${current * CARD_WIDTH}px)`;
        }
    }, [current]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent): void => {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [prev, next]);

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>): void => setDragStart(e.clientX);
    const onPointerUp = (e: React.PointerEvent<HTMLDivElement>): void => {
        if (dragStart === null) return;
        const delta = dragStart - e.clientX;
        if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
        setDragStart(null);
    };

    const DOT_COUNT = Math.min(total, 8);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: CSS }} />

            <section
                className="prs-section"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className="prs-inner">

                    {/* ── Header ── */}
                    <div className="prs-header">
                        <div className="prs-header-left">
                            <div className="prs-tag">
                                <span className="prs-tag-dot" />
                                Our Alumni
                            </div>
                            <h2>
                                Boasting <em>Outstanding</em><br />Pass Results
                            </h2>
                        </div>
                        <div className="prs-counter">
                            <div className="prs-counter-num">
                                <span>10,000</span>+
                            </div>
                            <div className="prs-counter-label">Certified Pilots</div>
                        </div>
                    </div>

                    {/* ── Slider ── */}
                    <div
                        className="prs-viewport"
                        onPointerDown={onPointerDown}
                        onPointerUp={onPointerUp}
                        onPointerLeave={() => setDragStart(null)}
                    >
                        <div className="prs-track" ref={trackRef}>
                            {reviewsData.map((pilot) => {
                                const colors = AIRLINE_COLORS[pilot.airline] ?? {
                                    bg: 'rgba(10,45,26,0.07)', border: 'rgba(10,45,26,0.18)',
                                    dot: '#1a6b3a', text: '#0a2d1a',
                                };
                                return (
                                    <div key={pilot.id} className="prs-card">

                                        {/* top band */}
                                        <div className="prs-card-head">
                                            <span className="prs-plane-mark">✈</span>
                                            <span className="prs-card-id">#{String(pilot.id).padStart(3, '0')}</span>
                                        </div>

                                        {/* avatar */}
                                        <div className="prs-avatar-wrap">
                                            <div className="prs-avatar-inner">
                                                <img src={pilot.imageSrc} alt={`Pilot ${pilot.id}`} loading="lazy" />
                                            </div>
                                        </div>

                                        <div className="prs-card-body">

                                            {/* Passed badge — replaces name */}
                                            <div className="prs-passed">
                                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                                    <path
                                                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                                        stroke="#1a9e58" strokeWidth="2"
                                                        strokeLinecap="round" strokeLinejoin="round"
                                                    />
                                                </svg>
                                                Passed
                                            </div>

                                            <div className="prs-divider" />

                                            {/* Airline badge */}
                                            <span
                                                className="prs-badge"
                                                style={{
                                                    background: colors.bg,
                                                    borderColor: colors.border,
                                                    color: colors.text,
                                                }}
                                            >
                                                <span className="prs-badge-dot" style={{ background: colors.dot }} />
                                                {pilot.airline}
                                            </span>

                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── Controls ── */}
                    <div className="prs-controls">
                        <div className="prs-dots">
                            {Array.from({ length: DOT_COUNT }).map((_, i) => {
                                const step = Math.max(1, Math.floor(maxIndex / (DOT_COUNT - 1)));
                                const target = i === DOT_COUNT - 1 ? maxIndex : i * step;
                                const isActive =
                                    i === DOT_COUNT - 1
                                        ? current === maxIndex
                                        : current >= target && current < target + step;
                                return (
                                    <button
                                        key={i}
                                        className={`prs-dot${isActive ? ' active' : ''}`}
                                        onClick={() => goTo(target)}
                                        aria-label={`Go to slide group ${i + 1}`}
                                    />
                                );
                            })}
                        </div>

                        <div className="prs-slide-count">
                            <strong>{String(current + 1).padStart(2, '0')}</strong>
                            {' / '}
                            {String(maxIndex + 1).padStart(2, '0')}
                        </div>

                        <div className="prs-arrows">
                            <button className="prs-arrow" onClick={prev} aria-label="Previous">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2"
                                        strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button className="prs-arrow" onClick={next} aria-label="Next">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2"
                                        strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}