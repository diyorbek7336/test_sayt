'use client'
import { useEffect, useState } from "react"

export default function Loader() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'done' | 'exit'>('loading')

  useEffect(() => {
    // Progress animatsiyasi
    const duration = 2200
    const interval = 30
    const steps = duration / interval
    let current = 0

    const timer = setInterval(() => {
      current++
      // Tezlik: boshida tez, oxirida sekin (realistic)
      const raw = current / steps
      const eased = raw < 0.8
        ? raw * 1.1
        : 0.88 + (raw - 0.8) * 0.6
      setProgress(Math.min(Math.round(eased * 100), 99))

      if (current >= steps) {
        clearInterval(timer)
        setProgress(100)
        setPhase('done')

        setTimeout(() => {
          setPhase('exit')
          setTimeout(() => setVisible(false), 700)
        }, 400)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  if (!visible) return null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Outfit:wght@400;600;800&display=swap');

        .loader-root {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #04070f;
          flex-direction: column;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .loader-root.exit {
          opacity: 0;
          transform: scale(1.04);
          pointer-events: none;
        }

        /* ── Fon effektlari ── */
        .loader-bg-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 50% 0%,   rgba(56,189,248,0.10) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 80% 100%, rgba(99,102,241,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 35% 35% at 10% 60%,  rgba(16,185,129,0.06) 0%, transparent 60%);
          pointer-events: none;
        }

        .loader-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(56,189,248,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.035) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
          animation: gridFade 2.5s ease infinite alternate;
        }
        @keyframes gridFade {
          from { opacity: 0.5; }
          to   { opacity: 1; }
        }

        /* ── Scanner chizig'i ── */
        .loader-scanner {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(56,189,248,0.6), transparent);
          box-shadow: 0 0 12px rgba(56,189,248,0.4);
          animation: scan 2.5s linear infinite;
          pointer-events: none;
        }
        @keyframes scan {
          from { top: 0%; }
          to   { top: 100%; }
        }

        /* ── Corner decorlar ── */
        .loader-corner {
          position: absolute;
          width: 28px; height: 28px;
          border-color: rgba(56,189,248,0.35);
          border-style: solid;
          pointer-events: none;
        }
        .loader-corner.tl { top: 24px; left: 24px; border-width: 2px 0 0 2px; }
        .loader-corner.tr { top: 24px; right: 24px; border-width: 2px 2px 0 0; }
        .loader-corner.bl { bottom: 24px; left: 24px; border-width: 0 0 2px 2px; }
        .loader-corner.br { bottom: 24px; right: 24px; border-width: 0 2px 2px 0; }

        /* ── Markaziy kontent ── */
        .loader-center {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        /* ── Shield SVG ── */
        .loader-shield-wrap {
          position: relative;
          width: 90px;
          height: 90px;
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loader-shield-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1.5px solid rgba(56,189,248,0.2);
          animation: ringPulse 2s ease-in-out infinite;
        }
        .loader-shield-ring:nth-child(2) {
          inset: -12px;
          border-color: rgba(56,189,248,0.1);
          animation-delay: 0.4s;
        }
        .loader-shield-ring:nth-child(3) {
          inset: -24px;
          border-color: rgba(56,189,248,0.05);
          animation-delay: 0.8s;
        }
        @keyframes ringPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.05); }
        }

        .loader-shield-svg {
          width: 52px;
          height: 52px;
          filter: drop-shadow(0 0 14px rgba(56,189,248,0.55));
          animation: shieldFloat 3s ease-in-out infinite;
          position: relative;
          z-index: 1;
        }
        @keyframes shieldFloat {
          0%, 100% { transform: translateY(0);   }
          50%       { transform: translateY(-6px); }
        }

        /* ── Nomi ── */
        .loader-name {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 2rem;
          letter-spacing: 0.06em;
          color: #f0f6ff;
          margin-bottom: 4px;
          animation: textGlow 2.5s ease-in-out infinite alternate;
        }
        .loader-name span {
          background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @keyframes textGlow {
          from { filter: brightness(1); }
          to   { filter: brightness(1.25); }
        }

        /* ── Tagline ── */
        .loader-tagline {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #38bdf8;
          margin-bottom: 36px;
          opacity: 0.75;
        }

        /* ── Progress bar ── */
        .loader-bar-wrap {
          width: 260px;
          margin-bottom: 14px;
        }

        .loader-bar-track {
          width: 100%;
          height: 3px;
          background: rgba(56,189,248,0.1);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }

        .loader-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #0ea5e9, #6366f1, #38bdf8);
          border-radius: 10px;
          transition: width 0.08s linear;
          position: relative;
          box-shadow: 0 0 10px rgba(56,189,248,0.5);
        }

        .loader-bar-fill::after {
          content: '';
          position: absolute;
          right: 0; top: 0;
          width: 20px; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6));
          border-radius: 10px;
          animation: shine 0.8s ease-in-out infinite;
        }
        @keyframes shine {
          from { opacity: 0.3; }
          to   { opacity: 1; }
        }

        /* ── Foiz va status ── */
        .loader-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 260px;
        }

        .loader-percent {
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          color: #38bdf8;
          font-weight: 700;
          min-width: 44px;
        }

        .loader-status {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: #475569;
          letter-spacing: 0.06em;
        }

        /* ── Pastki dots ── */
        .loader-dots {
          display: flex;
          gap: 8px;
          margin-top: 32px;
        }
        .loader-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(56,189,248,0.25);
          animation: dotBlink 1.2s ease-in-out infinite;
        }
        .loader-dot:nth-child(2) { animation-delay: 0.2s; }
        .loader-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dotBlink {
          0%, 80%, 100% { background: rgba(56,189,248,0.2); transform: scale(1); }
          40%            { background: #38bdf8;              transform: scale(1.5); box-shadow: 0 0 8px rgba(56,189,248,0.6); }
        }
      `}</style>

      <div className={`loader-root${phase === 'exit' ? ' exit' : ''}`}>
        {/* Fon */}
        <div className="loader-bg-glow" />
        <div className="loader-grid" />
        <div className="loader-scanner" />

        {/* Burchak decorlar */}
        <div className="loader-corner tl" />
        <div className="loader-corner tr" />
        <div className="loader-corner bl" />
        <div className="loader-corner br" />

        {/* Markaziy kontent */}
        <div className="loader-center">

          {/* Shield ikonka + ring effektlar */}
          <div className="loader-shield-wrap">
            <div className="loader-shield-ring" />
            <div className="loader-shield-ring" />
            <div className="loader-shield-ring" />
            <svg className="loader-shield-svg" viewBox="0 0 52 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="shieldGrad" x1="0" y1="0" x2="52" y2="60" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#38bdf8"/>
                  <stop offset="100%" stopColor="#6366f1"/>
                </linearGradient>
              </defs>
              <path
                d="M26 2L4 11v18c0 13 9.5 24.5 22 28 12.5-3.5 22-15 22-28V11L26 2z"
                fill="url(#shieldGrad)"
                fillOpacity="0.15"
                stroke="url(#shieldGrad)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M18 30l6 6 10-12"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="loader-name">
            Cyber<span>Qalqon</span>
          </div>
          <div className="loader-tagline">// Sayt ishga tushmoqda...</div>

         
          <div className="loader-bar-wrap">
            <div className="loader-bar-track">
              <div
                className="loader-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="loader-bottom-row">
            <span className="loader-percent">{progress}%</span>
            <span className="loader-status">
              {progress < 30
                ? 'INITIALIZING...'
                : progress < 60
                ? 'LOADING MODULES...'
                : progress < 90
                ? 'SECURING CONNECTION...'
                : progress < 100
                ? 'ALMOST READY...'
                : '✓ READY'}
            </span>
          </div>

          
          <div className="loader-dots">
            <div className="loader-dot" />
            <div className="loader-dot" />
            <div className="loader-dot" />
          </div>
        </div>
      </div>
    </>
  )
}