'use client'
import { useEffect, useState, useRef, useCallback } from "react"
import Header from "./Component/Header";
import Card from "../app/Component/Card"
import Location from "./Component/Location";
import Ariza from "../app/Component/Ariza"
import Link from "next/link";
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

// ─── Terminal logic ───────────────────────────────────────────────────────────
const PAGES = [
  { name: "Bosh sahifa", path: "/",          scrollId: null         },
  { name: "Xizmatlar",   path: "/xizmatlar", scrollId: "cards"      },
  { name: "Loyihalar",   path: "/loyihalar", scrollId: "manzil"     },
  { name: "Haqimizda",   path: "/haqimizda", scrollId: "ariza"      },
  { name: "Bog\'lanish",  path: "/boglanish", scrollId: "ariza"      },
];

function runCmd(raw: string): string[] {
  const parts = raw.trim().split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1).join(" ");
  switch (cmd) {
    case "help": return [
      "Buyruqlar:",
      "  ls              — sahifalar ro'yxati",
      "  cd <nom|raqam>  — sahifaga o'tish",
      "  cat <nom|raqam> — sahifaga o'tish",
      "  pwd             — joriy yo'l",
      "  whoami          — foydalanuvchi",
      "  clear / exit    — yopish",
    ];
    case "ls": return [
      ...PAGES.map((p, i) => `  [${i + 1}] ${p.name}`),
      "",
      "  cd <nom yoki raqam> — o'tish",
    ];
    case "pwd": return ["/home/user/cyberqalqon"];
    case "cd":
    case "cat": {
      if (!args) return [`${cmd}: argument kerak. Masalan: ${cmd} xizmatlar`];
      const idx = PAGES.findIndex((x, i) =>
        x.path === args ||
        x.path === "/" + args ||
        x.path.slice(1) === args ||
        x.name.toLowerCase().includes(args.toLowerCase()) ||
        String(i + 1) === args
      );
      if (idx === -1) return [`'${args}' topilmadi. 'ls' orqali ro'yxatni ko'ring.`];
      const p = PAGES[idx];
      return [`__NAV__${p.scrollId || "top"}`, `→ ${p.name} ga o'tilmoqda...`];
    }
    case "whoami": return ["user"];
    case "clear":  return ["__EXIT__"];
    case "exit":   return ["__EXIT__"];
    case "":       return [];
    default:       return [`${cmd}: buyruq topilmadi. 'help' yozing.`];
  }
}

// ─── Modal Terminal ───────────────────────────────────────────────────────────
function ModalTerminal({ onClose }: { onClose: () => void }) {
  const [isRoot,  setIsRoot]  = useState(false);
  const [lines,   setLines]   = useState<{ type?: string; text: string; prompt?: string }[]>([
    { text: "CyberQalqon v2.0  —  'help' yozing, 'exit' yoki ESC — yopish" },
    { text: "" },
  ]);
  const [current, setCurrent] = useState("");
  const [hist,    setHist]    = useState<string[]>([]);
  const [hIdx,    setHIdx]    = useState(-1);
  const [blink,   setBlink]   = useState(true);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, current]);

  // body scroll o'chirish
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const promptStr = useCallback(() =>
    isRoot ? "root@cyberqalqon:~#" : "user@cyberqalqon:~$"
  , [isRoot]);

  const submit = useCallback(() => {
    const raw = current.trim();

    if (raw === "root") {
      setIsRoot(true);
      setLines(l => [...l, { type: "input", text: raw, prompt: promptStr() }, { text: "root@cyberqalqon:~#  — xush kelibsiz!" }]);
      if (raw) setHist(h => [raw, ...h]);
      setHIdx(-1); setCurrent(""); return;
    }

    const result  = runCmd(raw);
    const navCmd  = result.find(r => r.startsWith("__NAV__"));
    const isExit  = result.includes("__EXIT__");
    const visible = result.filter(r => !r.startsWith("__NAV__") && r !== "__EXIT__");

    if (isExit) { onClose(); return; }

    setLines(l => [...l,
      { type: "input", text: raw, prompt: promptStr() },
      ...visible.map(t => ({ text: t })),
    ]);

    if (navCmd) {
      const scrollId = navCmd.replace("__NAV__", "");
      setTimeout(() => {
        onClose();
        if (scrollId === "top" || scrollId === "") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const el = document.getElementById(scrollId);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 350);
    }

    if (raw) setHist(h => [raw, ...h]);
    setHIdx(-1); setCurrent("");
  }, [current, promptStr, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // barcha default scrolllarni bloklash
      e.stopPropagation();
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," ","PageUp","PageDown","Tab"].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === "Escape") { onClose(); return; }

      if (e.ctrlKey) {
        if (e.key === "l") { e.preventDefault(); setLines([]); return; }
        if (e.key === "c") {
          setLines(l => [...l, { type: "input", text: current, prompt: promptStr() }, { text: "^C" }]);
          setCurrent(""); return;
        }
        return;
      }

      if (e.key === "Enter")     { submit(); return; }
      if (e.key === "Backspace") { e.preventDefault(); setCurrent(c => c.slice(0, -1)); return; }
      if (e.key === "ArrowUp")   { const i = Math.min(hIdx + 1, hist.length - 1); setHIdx(i); setCurrent(hist[i] || ""); return; }
      if (e.key === "ArrowDown") { const i = Math.max(hIdx - 1, -1); setHIdx(i); setCurrent(i === -1 ? "" : hist[i]); return; }
      if (e.key.length === 1)    { setCurrent(c => c + e.key); }
    };

    // capture: true — boshqa listenerlardan oldin ushlaydi
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, [current, hist, hIdx, submit, promptStr, onClose]);

  const accent = isRoot ? "#ef4444" : "#4ade80";

  return (
    // overlay
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", animation: "fadeIn .2s ease" }}
      onClick={onClose}
    >
      {/* terminal oynasi */}
      <div
        className="w-full max-w-[680px] rounded-xl overflow-hidden font-mono text-[13px] leading-[1.7] select-none"
        style={{
          background: "rgba(10,10,14,0.92)",
          border: `1px solid ${isRoot ? "rgba(239,68,68,0.4)" : "rgba(74,222,128,0.3)"}`,
          boxShadow: `0 0 0 1px rgba(0,0,0,0.5), 0 32px 80px rgba(0,0,0,0.9), 0 0 60px ${isRoot ? "rgba(239,68,68,0.1)" : "rgba(74,222,128,0.08)"}`,
          animation: "slideUp .25s cubic-bezier(.16,1,.3,1)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* titlebar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]"
          style={{ background: "rgba(0,0,0,0.4)" }}>
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 cursor-pointer border-none" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="flex-1 text-center text-[10px] tracking-[0.2em] uppercase select-none"
            style={{ color: "rgba(255,255,255,0.18)", fontFamily: "inherit" }}>
            {isRoot ? "root@cyberqalqon — bash" : "user@cyberqalqon — bash"}
          </span>
          <span className="text-[9px] tracking-wider" style={{ color: "rgba(255,255,255,0.15)" }}>
            ESC — yopish
          </span>
        </div>

        {/* output */}
        <div className="h-[420px] overflow-y-auto px-5 py-4 text-[#a3a3a3]"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent" }}>
          {lines.map((ln, i) => (
            <div key={i} className="whitespace-pre-wrap break-all min-h-[1em]">
              {ln.type === "input" ? (
                <>
                  <span style={{ color: accent }} className="font-semibold">{ln.prompt}&nbsp;</span>
                  <span className="text-[#e5e5e5]">{ln.text}</span>
                </>
              ) : (
                <span style={{ color: "#a3a3a3" }}>{ln.text}</span>
              )}
            </div>
          ))}

          {/* joriy satr */}
          <div className="whitespace-pre-wrap break-all min-h-[1em]">
            <span style={{ color: accent }} className="font-semibold">{promptStr()}&nbsp;</span>
            <span className="text-[#e5e5e5]">{current}</span>
            <span
              className="inline-block w-[8px] h-[14px] rounded-[1.5px] align-middle ml-[2px]"
              style={{
                background: blink ? accent : "transparent",
                boxShadow: blink ? `0 0 10px ${accent}` : "none",
              }}
            />
          </div>
          <div ref={endRef} />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
      `}</style>
    </div>
  );
}

// ─── Preview (mini ko'rinish — sahifada turadi) ───────────────────────────────
function TerminalPreview({ onClick }: { onClick: () => void }) {
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <button
      onClick={onClick}
      className="w-full max-w-[520px] rounded-[9px] overflow-hidden font-mono text-[12px] leading-[1.7] cursor-pointer select-none text-left transition-all duration-300 hover:-translate-y-1 group"
      style={{
        background: "rgba(10,10,14,0.7)",
        border: "1px solid rgba(74,222,128,0.15)",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.4), 0 16px 40px rgba(0,0,0,0.6), 0 0 40px rgba(74,222,128,0.05)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* titlebar */}
      <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-white/[0.05]"
        style={{ background: "rgba(0,0,0,0.3)" }}>
        <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
        <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
        <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
        <span className="flex-1 text-center text-[10px] tracking-[0.18em] uppercase select-none"
          style={{ color: "rgba(255,255,255,0.14)" }}>
          user@cyberqalqon — bash
        </span>
        <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ color: "rgba(74,222,128,0.5)" }}>
          bosing ↗
        </span>
      </div>

      {/* preview lines */}
      <div className="px-4 py-3 text-[#5a5a5a]">
        <div><span className="text-[#2d6a3f]">user@cyberqalqon:~$&nbsp;</span><span className="text-[#3a3a3a]">help</span></div>
        <div className="text-[#3a3a3a] mt-0.5">  ls &nbsp; cd &nbsp; cat &nbsp; pwd &nbsp; whoami &nbsp; clear</div>
        <div className="mt-2">
          <span className="text-[#4ade80] font-semibold">user@cyberqalqon:~$&nbsp;</span>
          <span className="text-[#e5e5e5]"></span>
          <span
            className="inline-block w-[7px] h-[12px] rounded-[1.5px] align-middle ml-[1px]"
            style={{ background: blink ? "#4ade80" : "transparent", boxShadow: blink ? "0 0 8px #4ade80" : "none" }}
          />
        </div>
      </div>

      {/* click hint */}
      <div className="px-4 pb-3 flex items-center gap-2">
        <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg,rgba(74,222,128,0.15),transparent)" }} />
        <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "rgba(74,222,128,0.35)" }}>
          terminalga kirish uchun bosing
        </span>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(270deg,rgba(74,222,128,0.15),transparent)" }} />
      </div>
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [termOpen, setTermOpen] = useState(false);

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

      {/* Modal terminal */}
      {termOpen && <ModalTerminal onClose={() => setTermOpen(false)} />}

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
        <div className="relative z-10 flex flex-col items-center gap-5 w-full max-w-[560px]">
          <p className="text-[11px] tracking-[0.2em] uppercase text-sky-400"
            style={{ fontFamily: "'Space Mono',monospace" }}>
            // interaktiv terminal
          </p>
          <TerminalPreview onClick={() => setTermOpen(true)} />
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