'use client'
import { useEffect, useState } from "react"
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

  useEffect(() => {
    let frameId: number;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      // ozgina yumshatilgan (ease-out) animatsiya
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = to * eased;
      setValue(current);
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [to, durationMs]);

  return <span>{value.toFixed(decimals)}{suffix}</span>;
}

export default function Home() {
  return (
    <>
      <Header/>
      <main className="relative h-[85vh] min-h-[480px] flex items-center justify-center overflow-hidden bg-gray-900 text-white">
        <Bagroundvideo />
        <div className="relative z-10 text-center px-4 py-8 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-mono drop-shadow-lg">Professional IT yechimlar bizda!</h1>
          <p className="text-base sm:text-lg text-gray-200 mb-6 font-mono max-w-2xl mx-auto">Web development, network security, automation, CCTV services.</p>
          <Link href="/Consultation">
            <button className="bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 px-6 py-3 rounded-full shadow-lg transition-all duration-300 font-medium">
              Bepul konsultatsiya
            </button>
          </Link>
        </div>
      </main>

      <div id="cards" className="scroll-mt-4"><Card/></div>
      <div id="manzil"><Location/></div>







       <h2 className="text-4xl font-bold text-white mb-6 text-center mt-20">
  Nima uchun bizni tanlashadi?
</h2>
<p className="text-gray-300 text-center mb-12">
  Biz mijozlarga eng samarali IT yechimlarni taqdim qilamiz, ish jarayonini soddalashtiramiz va xavfsizligini ta’minlaymiz.
</p>

<div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-15">
  <div className="bg-slate-900/80 border border-slate-700/60 p-6 rounded-2xl shadow-lg hover:scale-98 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
    <h3 className="text-5xl font-bold text-sky-400">
      <Counter to={1.5} decimals={1} suffix="+" />
    </h3>
    <p className="text-slate-200 mt-2">Yillik tajriba</p>
  </div>
  <div className="bg-slate-900/80 border border-slate-700/60 p-6 rounded-2xl shadow-lg hover:scale-98 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
    <h3 className="text-5xl font-bold text-emerald-400">
      <Counter to={20} decimals={0} suffix="+" />
    </h3>
    <p className="text-slate-200 mt-2">Tugatgan loyiha</p>
  </div>
  <div className="bg-slate-900/80 border border-slate-700/60 p-6 rounded-2xl shadow-lg hover:scale-98 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
    <h3 className="text-5xl font-bold text-amber-300">
      <Counter to={99} decimals={0} suffix="%" />
    </h3>
    <p className="text-slate-200 mt-2">Mijozlar qoniqishi</p>
  </div>
  
</div>


<div className="text">
    <p className="text-center text-xl">Siz ham hoziroq IT yechimlarimizdan foydalaning va ishlaringizni osonlashtiring!</p>
  <br />
  <p className="text-center text-lg">Hoziroq bizga ariza qoldiring!</p>
</div>
<div className="flex justify-center items-center mt-20 mb-20">
<a href="#ariza"><button className="flex justify-center items-center bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-full shadow-lg transition-all duration-300 text-white">Ariza qoldirish!</button></a>
</div>
















<Ariza/>










     






















     <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">

      
        <div>
          <h3 className="text-xl font-bold text-white mb-3">
            IT Solutions
          </h3>
          <p className="text-sm">
            We provide modern IT services and digital solutions.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Xizmatlar
          </h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/#cards" className="hover:text-white transition">Web Development</a></li>
            <li><a href="/#cards" className="hover:text-white transition">Cyber Security</a></li>
            <li><a href="/#cards" className="hover:text-white transition">AI yechimlar</a></li>
            <li><a href="/#cards" className="hover:text-white transition">IT qoʻllab-quvvatlash</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Sahifalar
          </h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition">Bosh sahifa</a></li>
            <li><a href="/#cards" className="hover:text-white transition">Xizmatlar</a></li>
            <li><a href="/about" className="hover:text-white transition">Biz haqimizda</a></li>
            <li><a href="/contact" className="hover:text-white transition">Aloqa</a></li>
          </ul>
        </div>

        
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Contact
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="mailto:info@itsolutions.com">
                info@itsolutions.com
              </a>
            </li>
            <li>
              <a href="tel:+998900000000">
                +998 94 204 91 07
                <br />
                +998 95 011 99 53
              </a>
            </li>
            <li>Tashkent, Uzbekistan</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} IT Solutions. All rights reserved.
      </div>
    </footer>
    </>
  );
}
