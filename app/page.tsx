'use client'
import { useEffect, useState, useRef } from "react"
import Header from "./Component/Header";
import Card from "../app/Component/Card"
import Location from "./Component/Location";
import Ariza from "../app/Component/Ariza"
import Link from "next/link";
import { useRouter } from "next/navigation";
import AI from "../app/Component/Ai"
import FloatingParticles from "./Component/FloatingParticles";

// ─── Counter ──────────────────────────────────────────────────────────────────
type CounterProps = { to: number; durationMs?: number; decimals?: number; suffix?: string };
function Counter({ to, durationMs = 1500, decimals = 0, suffix = "" }: CounterProps) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    let id: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / durationMs, 1);
      setValue(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [started, to, durationMs]);
  return <span ref={ref}>{value.toFixed(decimals)}{suffix}</span>;
}

// ─── Typewriter ───────────────────────────────────────────────────────────────
const INFO_LINES = [
  "  Kompaniya : IT Solutions",
  "  Yo'nalish : Web Dev · Cyber Security · AI · CCTV",
  "  Manzil    : Toshkent, O'zbekiston",
  "  Tajriba   : 1.5+ yil · 20+ loyiha",
  "  Missiya   : Biznesingiz uchun aqlli IT yechimlar",
];

function useTypewriter(lines: string[], charDelay = 22, lineDelay = 90) {
  const [typed, setTyped] = useState<string[]>([]);
  const [done, setDone]   = useState(false);

  useEffect(() => {
    setTyped([]); setDone(false);
    let li = 0, ci = 0;
    let tid: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (li >= lines.length) { setDone(true); return; }
      const line = lines[li];
      if (ci <= line.length) {
        setTyped(prev => { const n = [...prev]; n[li] = line.slice(0, ci); return n; });
        ci++;
        tid = setTimeout(tick, charDelay);
      } else {
        li++; ci = 0;
        tid = setTimeout(tick, lineDelay);
      }
    };
    tid = setTimeout(tick, 400);
    return () => clearTimeout(tid);
  }, []);

  return { typed, done };
}

// ─── Terminal Widget ──────────────────────────────────────────────────────────
function TerminalWidget() {
  const router = useRouter();
  const { typed, done } = useTypewriter(INFO_LINES);
  const [blink, setBlink] = useState(true);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setShowBtn(true), 300);
      return () => clearTimeout(t);
    }
  }, [done]);

  const activeLine = done ? -1 : typed.length - 1;

  return (
    <div
      className="w-full max-w-[540px] rounded-[14px] overflow-hidden font-mono text-[13px] leading-[1.75] select-none"
      style={{
        background: "rgba(10,10,14,0.85)",
        border: "1px solid rgba(74,222,128,0.22)",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.5), 0 24px 60px rgba(0,0,0,0.7), 0 0 50px rgba(74,222,128,0.07)",
        backdropFilter: "blur(14px)",
      }}
    >
      {/* titlebar */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05]"
        style={{ background: "rgba(0,0,0,0.35)" }}
      >
        <div className="w-[11px] h-[11px] rounded-full bg-[#ff5f57]" />
        <div className="w-[11px] h-[11px] rounded-full bg-[#febc2e]" />
        <div className="w-[11px] h-[11px] rounded-full bg-[#28c840]" />
        <span
          className="flex-1 text-center text-[10px] tracking-[0.18em] uppercase"
          style={{ color: "rgba(255,255,255,0.15)", fontFamily: "inherit" }}
        >
          user@itsolutions — bash
        </span>
      </div>

      {/* body */}
      <div className="px-5 py-5">

        {/* whoami prompt */}
        <div className="mb-3">
          <span style={{ color: "#4ade80" }} className="font-semibold">user@itsolutions:~$&nbsp;</span>
          <span className="text-[#e5e5e5]">whoami</span>
        </div>

        {/* typed output lines */}
        <div className="space-y-[3px] mb-4">
          {INFO_LINES.map((_, i) => (
            <div key={i} className="whitespace-pre text-[#a3e8bb] min-h-[1.75em]">
              {typed[i] ?? ""}
              {i === activeLine && (
                <span
                  className="inline-block w-[7px] h-[13px] rounded-[1.5px] align-middle ml-[2px]"
                  style={{
                    background: blink ? "#4ade80" : "transparent",
                    boxShadow: blink ? "0 0 8px #4ade80" : "none",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* idle prompt after done */}
        {done && (
          <div className="mb-5">
            <span style={{ color: "#4ade80" }} className="font-semibold">user@itsolutions:~$&nbsp;</span>
            <span
              className="inline-block w-[7px] h-[13px] rounded-[1.5px] align-middle ml-[1px]"
              style={{
                background: blink ? "#4ade80" : "transparent",
                boxShadow: blink ? "0 0 8px #4ade80" : "none",
              }}
            />
          </div>
        )}

        {/* divider */}
        <div
          className="h-px mb-5"
          style={{ background: "linear-gradient(90deg,rgba(74,222,128,0.2),rgba(74,222,128,0.05),transparent)" }}
        />

        {/* about button */}
        <div
          style={{
            opacity: showBtn ? 1 : 0,
            transform: showBtn ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.45s ease, transform 0.45s ease",
            pointerEvents: showBtn ? "auto" : "none",
          }}
        >
          <button
            onClick={() => router.push("/about")}
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[13px] font-semibold tracking-wide cursor-pointer border-none transition-all duration-200 hover:scale-[1.04] hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg,rgba(74,222,128,0.15) 0%,rgba(56,189,248,0.10) 100%)",
              border: "1px solid rgba(74,222,128,0.35)",
              color: "#4ade80",
              boxShadow: "0 0 18px rgba(74,222,128,0.10)",
            }}
          >
            Biz haqimizda to'liq bilish
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        body { font-family: 'Outfit', sans-serif; }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeUp2 { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse2  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
        .anim-fadeup  { animation: fadeUp  0.9s cubic-bezier(.16,1,.3,1) both; }
        .anim-fadeup2 { animation: fadeUp2 0.7s cubic-bezier(.16,1,.3,1) both; }
        .anim-pulse   { animation: pulse2 2s infinite; }
        .gradient-text {
          background: linear-gradient(135deg,#38bdf8 0%,#818cf8 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .glow-sky   { text-shadow: 0 0 30px rgba(56,189,248,0.4); }
        .glow-green { text-shadow: 0 0 30px rgba(52,211,153,0.4); }
        .glow-amber { text-shadow: 0 0 30px rgba(251,191,36,0.4); }
      `}</style>

      <Header/>

      {/* ── HERO ── */}
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060912]">
        <div className="absolute inset-0 pointer-events-none z-[1]"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%,rgba(56,189,248,0.10) 0%,transparent 70%),radial-gradient(ellipse 40% 40% at 20% 80%,rgba(99,102,241,0.08) 0%,transparent 60%)" }} />
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(56,189,248,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <FloatingParticles color="56,189,248" count={85} />
        <div className="relative z-10 text-center px-6 py-8 anim-fadeup pointer-events-none">
          <div className="inline-flex items-center gap-2 bg-sky-400/[0.08] border border-sky-400/20 rounded-full px-[18px] py-1.5 text-[13px] text-sky-300 tracking-[0.05em] mb-8"
            style={{ fontFamily: "'Space Mono',monospace" }}>
            <span className="w-[7px] h-[7px] rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] anim-pulse" />
            Professional IT Xizmatlari
          </div>
          <h1 className="text-[clamp(2.2rem,6vw,4.5rem)] font-extrabold leading-[1.1] text-[#f0f6ff] mb-6 tracking-tight">
            Biznesingiz uchun<br/>
            <span className="gradient-text">aqlli IT yechimlar</span>
          </h1>
          <p className="text-[clamp(1rem,2vw,1.2rem)] text-slate-400 max-w-[560px] mx-auto mb-10 font-light leading-[1.7]">
            Web development, network security, automation va CCTV xizmatlarida ishonchli hamkoringiz.
          </p>
          <Link href="/Consultation"
            className="pointer-events-auto inline-flex items-center gap-2.5 bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold text-base px-8 py-3.5 rounded-full border-none cursor-pointer transition-all duration-200 no-underline hover:-translate-y-0.5 hover:scale-[1.03]"
            style={{ boxShadow: "0 0 32px rgba(14,165,233,0.3)" }}>
            Bepul konsultatsiya
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </main>

      <div id="cards" className="scroll-mt-4"><Card/></div>
      <div id="manzil"><Location/></div>

      {/* ── TERMINAL SECTION ── */}
      <section className="relative overflow-hidden bg-[#060912] py-20 px-6 flex items-center justify-center min-h-[420px]">
        <FloatingParticles color="56,189,248" count={55} />
        <div className="absolute inset-0 z-[3] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 70% at 50% 50%,rgba(56,189,248,0.05) 0%,transparent 70%)" }} />
        <div className="relative z-10 flex flex-col items-center gap-5 w-full max-w-[580px]">
          <p className="text-[11px] tracking-[0.2em] uppercase text-sky-400"
            style={{ fontFamily: "'Space Mono',monospace" }}>
            // biz haqimizda
          </p>
          <TerminalWidget />
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-24 px-6 text-center">
        <p className="text-[11px] tracking-[0.2em] uppercase text-sky-400 mb-4"
          style={{ fontFamily: "'Space Mono',monospace" }}>// Nima uchun biz?</p>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-[#e8f0fe] mb-4 tracking-tight">Raqamlar orqali ishonch</h2>
        <div className="w-[60px] h-[3px] bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full mx-auto mb-6" />
        <p className="text-slate-500 text-[1.05rem] max-w-[520px] mx-auto mb-14 leading-[1.7]">
          Biz mijozlarga eng samarali IT yechimlarni taqdim qilamiz, ish jarayonini soddalashtiramiz va xavfsizligini ta'minlaymiz.
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 max-w-[900px] mx-auto mb-16">
          {[
            { cls: "text-sky-400 glow-sky",      delay: "0.05s", node: <Counter to={1.5} decimals={1} suffix="+" durationMs={1500}/>, label: "Yillik tajriba" },
            { cls: "text-emerald-400 glow-green", delay: "0.15s", node: <Counter to={20}  decimals={0} suffix="+" durationMs={1800}/>, label: "Tugatgan loyiha" },
            { cls: "text-amber-400 glow-amber",   delay: "0.25s", node: <Counter to={99}  decimals={0} suffix="%" durationMs={2000}/>, label: "Mijozlar qoniqishi" },
          ].map((item, i) => (
            <div key={i} style={{ animationDelay: item.delay }}
              className="relative bg-slate-900/70 border border-sky-400/10 rounded-3xl px-8 py-10 text-center overflow-hidden backdrop-blur-xl anim-fadeup2 transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-400/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <div className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%,rgba(56,189,248,0.07),transparent)" }} />
              <div className={`text-[3.5rem] font-extrabold leading-none mb-3 tracking-tight ${item.cls}`}>{item.node}</div>
              <p className="text-slate-400 text-[0.95rem]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="text-center px-6 pb-20">
        <p className="text-slate-300 text-[1.15rem] mb-3">Siz ham hoziroq IT yechimlarimizdan foydalaning!</p>
        <p className="text-slate-500 text-[0.95rem] mb-8">Hoziroq bizga ariza qoldiring va bepul maslahat oling.</p>
        <a href="#ariza"
          className="inline-flex items-center gap-2 bg-transparent border border-sky-400/35 text-sky-300 font-semibold text-base px-9 py-3.5 rounded-full cursor-pointer transition-all duration-200 no-underline hover:bg-sky-400/10 hover:border-sky-400/60 hover:text-sky-100 hover:-translate-y-0.5">
          Ariza qoldirish
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>

      <div id="ariza"><Ariza/></div>
      <AI/>

      {/* ── FOOTER ── */}
      <footer className="bg-[#04070f] border-t border-sky-400/[0.07] text-slate-600 pt-16">
        <div className="max-w-[1100px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 px-6 pb-12">
          <div>
            <div className="text-[1.3rem] font-bold text-slate-200 mb-3">IT <span className="text-sky-400">Solutions</span></div>
            <p className="text-[0.88rem] leading-[1.7] text-slate-600">Zamonaviy IT xizmatlari va raqamli yechimlar bilan biznesingizni yangi bosqichga olib chiqamiz.</p>
          </div>
          {[
            { title: "Xizmatlar", links: [["Web Development","/#cards"],["Cyber Security","/#cards"],["AI yechimlar","/#cards"],["IT qo'llab-quvvatlash","/#cards"]] },
            { title: "Sahifalar", links: [["Bosh sahifa","/"],["Xizmatlar","/#cards"],["Biz haqimizda","/about"],["Aloqa","/contact"]] },
            { title: "Aloqa",     links: [["info@itsolutions.com","mailto:info@itsolutions.com"],["+998 94 204 91 07","tel:+998942049107"],["+998 95 011 99 53","tel:+998950119953"],["Tashkent, Uzbekistan","#"]] },
          ].map((col, i) => (
            <div key={i}>
              <p className="text-[0.85rem] font-semibold text-slate-400 tracking-[0.1em] uppercase mb-5" style={{ fontFamily: "'Space Mono',monospace" }}>{col.title}</p>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {col.links.map(([label, href], j) => (
                  <li key={j}><a href={href} className="text-[0.9rem] text-slate-600 no-underline transition-colors duration-200 hover:text-sky-300">{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 text-center py-6 text-[0.82rem] text-slate-700" style={{ fontFamily: "'Space Mono',monospace" }}>
          © {new Date().getFullYear()} IT Solutions — All rights reserved.
        </div>
      </footer>
    </>
  );
}