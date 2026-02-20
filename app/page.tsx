'use client'
import { useEffect, useState, useRef } from "react"
import Header from "./Component/Header";
import Card from "../app/Component/Card"
import Location from "./Component/Location";
import Ariza from "../app/Component/Ariza"
import Bagroundvideo from "./Component/Bagroundvideo";
import Link from "next/link";

type CounterProps = {
  to: number;
  durationMs?: number;
  decimals?: number;
  suffix?: string;
};

function Counter({ to, durationMs = 1500, decimals = 0, suffix = "" }: CounterProps) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frameId: number;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(to * eased);
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [started, to, durationMs]);

  return <span ref={ref}>{value.toFixed(decimals)}{suffix}</span>;
}

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

        * { box-sizing: border-box; }

        body {
          background: #060912;
          font-family: 'Outfit', sans-serif;
        }

        /* ---- HERO ---- */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #060912;
        }

        .hero-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 50% 0%, rgba(56,189,248,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(99,102,241,0.10) 0%, transparent 60%);
          pointer-events: none;
          z-index: 1;
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          z-index: 1;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 2rem 1.5rem;
          animation: fadeUp 0.9s cubic-bezier(.16,1,.3,1) both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(56,189,248,0.08);
          border: 1px solid rgba(56,189,248,0.2);
          border-radius: 100px;
          padding: 6px 18px;
          font-size: 13px;
          color: #7dd3fc;
          letter-spacing: 0.05em;
          font-family: 'Space Mono', monospace;
          margin-bottom: 2rem;
        }

        .hero-badge-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 8px #38bdf8;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(1.3); }
        }

        .hero-title {
          font-size: clamp(2.2rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.1;
          color: #f0f6ff;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .hero-title span {
          background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: #94a3b8;
          max-width: 560px;
          margin: 0 auto 2.5rem;
          font-weight: 300;
          line-height: 1.7;
        }

        .hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          color: #fff;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          padding: 14px 32px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          box-shadow: 0 0 32px rgba(14,165,233,0.3);
          transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
        }

        .hero-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 0 48px rgba(14,165,233,0.45);
        }

        /* ---- SECTION WRAPPER ---- */
        .section-wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* ---- WHY US ---- */
        .why-section {
          padding: 100px 1.5rem 60px;
          text-align: center;
        }

        .section-label {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #38bdf8;
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 700;
          color: #e8f0fe;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .section-sub {
          color: #64748b;
          font-size: 1.05rem;
          max-width: 520px;
          margin: 0 auto 3.5rem;
          line-height: 1.7;
        }

        /* ---- COUNTER CARDS ---- */
        .counter-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          max-width: 900px;
          margin: 0 auto 4rem;
        }

        .counter-card {
          position: relative;
          background: rgba(15,23,42,0.7);
          border: 1px solid rgba(56,189,248,0.1);
          border-radius: 24px;
          padding: 2.5rem 2rem;
          text-align: center;
          overflow: hidden;
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
          backdrop-filter: blur(12px);
          animation: fadeUp 0.7s cubic-bezier(.16,1,.3,1) both;
        }

        .counter-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56,189,248,0.07), transparent);
          pointer-events: none;
        }

        .counter-card:hover {
          transform: translateY(-6px);
          border-color: rgba(56,189,248,0.3);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(56,189,248,0.08);
        }

        .counter-num {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 0.75rem;
          letter-spacing: -0.03em;
        }

        .counter-num.sky   { color: #38bdf8; text-shadow: 0 0 30px rgba(56,189,248,0.4); }
        .counter-num.green { color: #34d399; text-shadow: 0 0 30px rgba(52,211,153,0.4); }
        .counter-num.amber { color: #fbbf24; text-shadow: 0 0 30px rgba(251,191,36,0.4); }

        .counter-label {
          color: #94a3b8;
          font-size: 0.95rem;
          font-weight: 400;
        }

        /* ---- CTA STRIP ---- */
        .cta-strip {
          text-align: center;
          padding: 0 1.5rem 80px;
        }

        .cta-strip p {
          color: #cbd5e1;
          font-size: 1.15rem;
          margin-bottom: 0.75rem;
        }

        .cta-strip p.small {
          color: #64748b;
          font-size: 0.95rem;
          margin-bottom: 2rem;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1.5px solid rgba(56,189,248,0.35);
          color: #7dd3fc;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          padding: 14px 36px;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.25s;
          text-decoration: none;
        }

        .cta-btn:hover {
          background: rgba(56,189,248,0.1);
          border-color: rgba(56,189,248,0.6);
          color: #e0f2fe;
          box-shadow: 0 0 24px rgba(56,189,248,0.15);
          transform: translateY(-2px);
        }

        /* ---- FOOTER ---- */
        .footer {
          background: #04070f;
          border-top: 1px solid rgba(56,189,248,0.07);
          color: #475569;
          padding: 64px 1.5rem 0;
        }

        .footer-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2.5rem;
          padding-bottom: 3rem;
        }

        .footer-brand {
          font-size: 1.3rem;
          font-weight: 700;
          color: #e2e8f0;
          margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
        }

        .footer-brand span {
          color: #38bdf8;
        }

        .footer-desc {
          font-size: 0.88rem;
          line-height: 1.7;
          color: #475569;
        }

        .footer-heading {
          font-size: 0.85rem;
          font-weight: 600;
          color: #94a3b8;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 1.2rem;
          font-family: 'Space Mono', monospace;
        }

        .footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .footer-list a {
          font-size: 0.9rem;
          color: #475569;
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-list a:hover {
          color: #7dd3fc;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.05);
          text-align: center;
          padding: 1.5rem;
          font-size: 0.82rem;
          color: #334155;
          font-family: 'Space Mono', monospace;
        }

        /* ---- DIVIDER ---- */
        .divider {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #38bdf8, #6366f1);
          border-radius: 10px;
          margin: 0 auto 1.5rem;
        }
      `}</style>

      <Header/>

      {/* HERO */}
      <main className="hero-section">
        <Bagroundvideo />
        <div className="hero-glow" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Professional IT Xizmatlari
          </div>
          <h1 className="hero-title">
            Biznesingiz uchun<br/>
            <span>aqlli IT yechimlar</span>
          </h1>
          <p className="hero-sub">
            Web development, network security, automation va CCTV xizmatlarida ishonchli hamkoringiz.
          </p>
          <Link href="/Consultation" className="hero-btn">
            Bepul konsultatsiya
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </main>

      {/* CARDS & LOCATION */}
      <div id="cards" className="scroll-mt-4"><Card/></div>
      <div id="manzil"><Location/></div>

      {/* WHY US */}
      <section className="why-section">
        <p className="section-label">// Nima uchun biz?</p>
        <h2 className="section-title">Raqamlar orqali ishonch</h2>
        <div className="divider" />
        <p className="section-sub">
          Biz mijozlarga eng samarali IT yechimlarni taqdim qilamiz, ish jarayonini soddalashtiramiz va xavfsizligini ta'minlaymiz.
        </p>

        <div className="counter-grid">
          <div className="counter-card" style={{ animationDelay: "0.05s" }}>
            <div className="counter-num sky">
              <Counter to={1.5} decimals={1} suffix="+" durationMs={1500} />
            </div>
            <p className="counter-label">Yillik tajriba</p>
          </div>
          <div className="counter-card" style={{ animationDelay: "0.15s" }}>
            <div className="counter-num green">
              <Counter to={20} decimals={0} suffix="+" durationMs={1800} />
            </div>
            <p className="counter-label">Tugatgan loyiha</p>
          </div>
          <div className="counter-card" style={{ animationDelay: "0.25s" }}>
            <div className="counter-num amber">
              <Counter to={99} decimals={0} suffix="%" durationMs={2000} />
            </div>
            <p className="counter-label">Mijozlar qoniqishi</p>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <div className="cta-strip">
        <p>Siz ham hoziroq IT yechimlarimizdan foydalaning!</p>
        <p className="small">Hoziroq bizga ariza qoldiring va bepul maslahat oling.</p>
        <a href="#ariza" className="cta-btn">
          Ariza qoldirish
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      <Ariza/>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">IT <span>Solutions</span></div>
            <p className="footer-desc">
              Zamonaviy IT xizmatlari va raqamli yechimlar bilan biznesingizni yangi bosqichga olib chiqamiz.
            </p>
          </div>

          <div>
            <p className="footer-heading">Xizmatlar</p>
            <ul className="footer-list">
              <li><a href="/#cards">Web Development</a></li>
              <li><a href="/#cards">Cyber Security</a></li>
              <li><a href="/#cards">AI yechimlar</a></li>
              <li><a href="/#cards">IT qoʻllab-quvvatlash</a></li>
            </ul>
          </div>

          <div>
            <p className="footer-heading">Sahifalar</p>
            <ul className="footer-list">
              <li><a href="/">Bosh sahifa</a></li>
              <li><a href="/#cards">Xizmatlar</a></li>
              <li><a href="/about">Biz haqimizda</a></li>
              <li><a href="/contact">Aloqa</a></li>
            </ul>
          </div>

          <div>
            <p className="footer-heading">Aloqa</p>
            <ul className="footer-list">
              <li><a href="mailto:info@itsolutions.com">info@itsolutions.com</a></li>
              <li>
                <a href="tel:+998942049107">+998 94 204 91 07</a>
              </li>
              <li>
                <a href="tel:+998950119953">+998 95 011 99 53</a>
              </li>
              <li>Tashkent, Uzbekistan</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} IT Solutions — All rights reserved.
        </div>
      </footer>
    </>
  );
}