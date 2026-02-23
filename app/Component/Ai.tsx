"use client"

import { useState, useRef, useEffect } from "react"

interface Message {
  role: "user" | "bot"
  content: string
}

interface FAQ {
  category: string
  emoji: string
  questions: { q: string; a: string }[]
}

const FAQS: FAQ[] = [
  {
    category: "Xizmatlar haqida",
    emoji: "🛠️",
    questions: [
      {
        q: "IT Security xizmati nima?",
        a: "IT Security xizmatimiz orqali sizning tarmoq va tizimlaringizni himoya qilamiz:\n\n• Firewall o'rnatish va sozlash\n• Penetration testing (zaifliklarni aniqlash)\n• 24/7 monitoring va hujumlarni oldini olish\n• Xavfsizlik siyosatini ishlab chiqish\n\nBatafsil ma'lumot uchun: +998 95 011 99 53",
      },
      {
        q: "AD DS / Active Directory nima?",
        a: "Active Directory Domain Services — bu barcha xodimlar va qurilmalarni markazdan boshqarish tizimi:\n\n• Xodimlar hisoblarini yaratish va boshqarish\n• GPO orqali kompyuterlarga qoidalar qo'llash\n• DNS va DHCP integratsiyasi\n• Xavfsiz kirish huquqlarini boshqarish\n\nKichik biznesdan tortib yirik korporatsiyalargacha mos keladi.",
      },
      {
        q: "Face ID davomat tizimi qanday ishlaydi?",
        a: "Face ID davomat tizimi xodimlarning keldi-ketdisini yuz tanish orqali avtomatik qayd etadi:\n\n• Kamera o'rnatiladi — xodim yuzini ko'rsatadi\n• Tizim avtomatik vaqtni belgilaydi\n• Real-vaqt hisobotlar — kim keldi, kim kelmadi\n• HR tizimi bilan integratsiya\n• Oylik davomat hisobotlari\n\nQog'oz jurnal va qo'lda belgilash tamom!",
      },
      {
        q: "IP Telefoniya xizmati",
        a: "IP Telefoniya orqali ofis ichidagi va tashqi chaqiruvlarni internet orqali amalga oshirasiz:\n\n• Cisco, Asterisk, FreePBX tizimlari\n• Ichki raqamlar (1001, 1002...)\n• Tashqi xalqaro qo'ng'iroqlar arzon narxda\n• Qo'ng'iroqlar tarixi va yozib olish\n• Mobil ilova orqali istalgan joydan\n\nAn'anaviy telefon xarajatlarini 60-70% kamaytiradi.",
      },
      {
        q: "CCTV kamera o'rnatish",
        a: "CCTV & Security xizmatimiz:\n\n• Ofis, ombor, do'kon uchun kameralar\n• HD va 4K sifatida yozib olish\n• Masofadan smartfon orqali kuzatish\n• Harakat sezgichi va signal tizimi\n• 24/7 monitoring xizmati\n• Kameralar o'rnatilgandan keyin texnik xizmat\n\nBepul ko'rikdan o'tkazish uchun bog'laning!",
      },
      {
        q: "Cloud Services nima?",
        a: "Cloud Services — bulutli infratuzilma xizmatlari:\n\n• Virtual serverlar (VPS/VDS)\n• Ma'lumotlarni bulutda saqlash\n• Avtomatik backup (zaxira nusxa)\n• Server monitoring\n• Offsite disaster recovery\n\nServer sotib olmasdan, oylik to'lov bilan professional infratuzilmaga ega bo'lasiz.",
      },
    ],
  },
  {
    category: "Narx va hamkorlik",
    emoji: "💼",
    questions: [
      {
        q: "Narxlar qancha?",
        a: "Narxlar har bir loyiha va xizmat hajmiga qarab belgilanadi.\n\nBepul konsultatsiya uchun bog'laning:\n📞 +998 95 011 99 53\n\nBiz kelib ko'rib chiqamiz, keyin aniq narx va vaqt aytamiz. Hech qanday yashirin to'lov yo'q!",
      },
      {
        q: "Qanday bog'lanaman?",
        a: "Biz bilan quyidagi usullarda bog'lanishingiz mumkin:\n\n📞 Telefon: +998 95 011 99 53\n📍 Manzil: Uzbekistan, Tashkent\n🌐 Sayt: serverituz.uz\n\nIsh vaqti: Dushanba–Shanba, 09:00–18:00\nYoki saytdagi 'Ariza qoldirish' formasini to'ldiring!",
      },
      {
        q: "Texnik yordam boresizmi?",
        a: "Ha, albatta! O'rnatishdan keyin texnik yordam beramiz:\n\n• Telefon orqali maslahat\n• Masofadan (remote) muammoni hal qilish\n• Kerak bo'lsa joyiga borib xizmat\n• Doimiy mijozlar uchun shartnoma asosida xizmat\n\n+998 95 011 99 53 ga qo'ng'iroq qiling!",
      },
    ],
  },
  {
    category: "Texnik savollar",
    emoji: "⚙️",
    questions: [
      {
        q: "Networking — tarmoq qurish",
        a: "Networking xizmatimiz:\n\n• Ofis tarmog'ini loyihalash va o'rnatish\n• Switch va router konfiguratsiyasi\n• VLAN — bo'limlar o'rtasida tarmoqni ajratish\n• Wi-Fi kengaytirish va optimallashtirish\n• VPN — masofadan xavfsiz ulanish\n• Tarmoq tezligi va ishonchliligini oshirish\n\nTarmoq muammolaringiz bormi? Darhol bog'laning!",
      },
      {
        q: "Automation — avtomatlashtirish",
        a: "Automation xizmatimiz IT jarayonlarni avtomatlashtirib vaqt va pulni tejaydi:\n\n• Server va tizimlar monitoringi\n• Avtomatik backup va yangilashlar\n• Script va bot yordamida takroriy ishlarni avtomatlashtirish\n• Alert tizimi — muammo bo'lsa darhol xabar\n• IT ops jarayonlarini soddalashtirish\n\nQo'lda bajarayotgan ishlaringizni avtomatlashtirish vaqti keldi!",
      },
      {
        q: "Web Development xizmati",
        a: "Web Development xizmatimiz:\n\n• Korporativ saytlar\n• E-commerce (onlayn do'kon)\n• Admin panel va dashboardlar\n• REST API va backend tizimlar\n• Tizimlar o'rtasida integratsiya\n• Mobile-friendly dizayn\n\nTexnologiyalar: Next.js, React, Node.js, PostgreSQL va boshqalar.\n\nSizning g'oyangizni hayotga tatbiq etamiz!",
      },
    ],
  },
]

const WELCOME =
  "Salom! Men ServerITuz yordamchisiman 👋\n\nQuyidagi mavzulardan birini tanlang yoki savol yozing:"

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: WELCOME },
  ])
  const [view, setView] = useState<"categories" | "questions" | "chat">("categories")
  const [activeCategory, setActiveCategory] = useState<FAQ | null>(null)
  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, open])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const selectCategory = (faq: FAQ) => {
    setActiveCategory(faq)
    setView("questions")
    setMessages((prev) => [
      ...prev,
      { role: "user", content: faq.emoji + " " + faq.category },
      {
        role: "bot",
        content: `${faq.category} bo'yicha quyidagi savollardan birini tanlang:`,
      },
    ])
  }

  const selectQuestion = (q: string, a: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: q },
      { role: "bot", content: a },
    ])
    setView("chat")
  }

  const handleInput = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      const text = input.trim()
      setInput("")

      // Search through FAQs for matching answer
      let found = false
      for (const faq of FAQS) {
        for (const item of faq.questions) {
          if (
            item.q.toLowerCase().includes(text.toLowerCase()) ||
            text.toLowerCase().includes(item.q.toLowerCase().split(" ")[0])
          ) {
            setMessages((prev) => [
              ...prev,
              { role: "user", content: text },
              { role: "bot", content: item.a },
            ])
            found = true
            break
          }
        }
        if (found) break
      }

      if (!found) {
        setMessages((prev) => [
          ...prev,
          { role: "user", content: text },
          {
            role: "bot",
            content:
              "Bu savol bo'yicha to'g'ridan-to'g'ri mutaxassisimiz bilan bog'laning:\n\n📞 +998 95 011 99 53\n\nYoki quyidagi mavzulardan birini tanlang 👇",
          },
        ])
        setView("categories")
        setActiveCategory(null)
      }
      setView("chat")
    }
  }

  const reset = () => {
    setView("categories")
    setActiveCategory(null)
    setMessages([{ role: "bot", content: WELCOME }])
  }

  const formatText = (text: string) =>
    text.split("\n").map((line, i, arr) => (
      <span key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </span>
    ))

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Space+Mono:wght@700&display=swap');

        .cw * { box-sizing: border-box; margin: 0; padding: 0; }

        /* Toggle */
        .cw-toggle {
          position: fixed;
          bottom: 28px; right: 28px;
          width: 58px; height: 58px;
          border-radius: 18px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          z-index: 999;
          box-shadow: 0 8px 32px rgba(14,165,233,0.45);
          transition: transform 0.25s cubic-bezier(.16,1,.3,1), box-shadow 0.25s;
          color: #fff;
        }
        .cw-toggle:hover {
          transform: scale(1.08) translateY(-2px);
          box-shadow: 0 12px 40px rgba(14,165,233,0.55);
        }
        .cw-pulse {
          position: absolute; top: -3px; right: -3px;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: #22d3ee;
          border: 2px solid #060912;
          animation: cwPulse 2s infinite;
        }
        @keyframes cwPulse {
          0%,100% { transform: scale(1); opacity:1; }
          50% { transform: scale(1.35); opacity:.6; }
        }

        /* Window */
        .cw-window {
          position: fixed;
          bottom: 100px; right: 28px;
          width: 360px; height: 540px;
          background: rgba(6,9,18,0.98);
          border: 1px solid rgba(56,189,248,0.15);
          border-radius: 24px;
          display: flex; flex-direction: column;
          overflow: hidden;
          z-index: 998;
          box-shadow: 0 32px 80px rgba(0,0,0,0.7);
          font-family: 'Outfit', sans-serif;
          transform-origin: bottom right;
          animation: cwOpen 0.35s cubic-bezier(.16,1,.3,1);
        }
        @keyframes cwOpen {
          from { opacity:0; transform: scale(0.85) translateY(20px); }
          to   { opacity:1; transform: scale(1) translateY(0); }
        }
        .cw-window::before {
          content:'';
          position:absolute; top:0; left:0; right:0; height:1px;
          background: linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent);
        }

        /* Header */
        .cw-header {
          padding: 14px 16px;
          background: rgba(10,18,35,0.95);
          border-bottom: 1px solid rgba(56,189,248,0.08);
          display: flex; align-items: center; gap: 10px;
          flex-shrink: 0;
        }
        .cw-avatar {
          width: 36px; height: 36px; border-radius: 11px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; flex-shrink: 0;
        }
        .cw-hname {
          font-family: 'Space Mono', monospace;
          font-size: 0.8rem; font-weight: 700; color: #f1f5f9;
        }
        .cw-hstatus {
          display: flex; align-items: center; gap: 5px; margin-top: 2px;
        }
        .cw-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #22d3ee;
        }
        .cw-htext { font-size: 0.7rem; color: #64748b; }
        .cw-hbtns { margin-left: auto; display: flex; gap: 6px; }
        .cw-hbtn {
          width: 28px; height: 28px; border-radius: 8px;
          border: 1px solid rgba(56,189,248,0.15);
          background: rgba(56,189,248,0.06);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #64748b;
          transition: all 0.2s;
        }
        .cw-hbtn:hover { background: rgba(56,189,248,0.15); color: #38bdf8; }
        .cw-close-btn {
          border-color: rgba(239,68,68,0.15);
          background: rgba(239,68,68,0.07);
          color: #f87171;
        }
        .cw-close-btn:hover { background: rgba(239,68,68,0.2); border-color: rgba(239,68,68,0.4); }

        /* Messages */
        .cw-msgs {
          flex: 1; overflow-y: auto;
          padding: 14px 12px;
          display: flex; flex-direction: column; gap: 10px;
          scrollbar-width: thin;
          scrollbar-color: rgba(56,189,248,0.15) transparent;
        }
        .cw-msg { display: flex; gap: 8px; animation: msgIn 0.3s cubic-bezier(.16,1,.3,1); }
        .cw-msg.user { flex-direction: row-reverse; }
        @keyframes msgIn {
          from { opacity:0; transform: translateY(8px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .cw-mavatar {
          width: 26px; height: 26px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; flex-shrink: 0; margin-top: 2px;
        }
        .cw-msg.bot .cw-mavatar {
          background: rgba(14,165,233,0.15);
          border: 1px solid rgba(56,189,248,0.2);
        }
        .cw-msg.user .cw-mavatar {
          background: rgba(56,189,248,0.1);
          border: 1px solid rgba(56,189,248,0.15);
          color: #38bdf8; font-size: 10px;
          font-family: 'Space Mono', monospace; font-weight: 700;
        }
        .cw-bubble {
          max-width: 80%; padding: 10px 13px;
          border-radius: 14px; font-size: 0.86rem; line-height: 1.65;
        }
        .cw-msg.bot .cw-bubble {
          background: rgba(15,23,42,0.9);
          border: 1px solid rgba(56,189,248,0.1);
          color: #cbd5e1; border-top-left-radius: 4px;
        }
        .cw-msg.user .cw-bubble {
          background: linear-gradient(135deg, rgba(14,165,233,0.2), rgba(99,102,241,0.2));
          border: 1px solid rgba(56,189,248,0.25);
          color: #e0f2fe; border-top-right-radius: 4px;
        }

        /* Category & Question buttons */
        .cw-options {
          padding: 4px 12px 12px;
          display: flex; flex-direction: column; gap: 6px;
          flex-shrink: 0;
        }
        .cw-opt-label {
          font-size: 0.7rem; color: #475569;
          font-family: 'Space Mono', monospace;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 0 2px 4px;
        }
        .cw-cat-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 13px;
          background: rgba(15,23,42,0.8);
          border: 1px solid rgba(56,189,248,0.1);
          border-radius: 12px; cursor: pointer;
          transition: all 0.2s; text-align: left;
          color: #cbd5e1; font-family: 'Outfit', sans-serif;
          font-size: 0.87rem; font-weight: 600;
        }
        .cw-cat-btn:hover {
          background: rgba(56,189,248,0.08);
          border-color: rgba(56,189,248,0.3);
          color: #e0f2fe; transform: translateX(3px);
        }
        .cw-cat-emoji { font-size: 18px; flex-shrink: 0; }
        .cw-cat-arrow { margin-left: auto; color: #38bdf8; opacity: 0.6; }

        .cw-q-btn {
          padding: 8px 12px;
          background: rgba(56,189,248,0.05);
          border: 1px solid rgba(56,189,248,0.12);
          border-radius: 10px; cursor: pointer;
          color: #7dd3fc; font-family: 'Outfit', sans-serif;
          font-size: 0.83rem; font-weight: 500;
          text-align: left; transition: all 0.2s;
        }
        .cw-q-btn:hover {
          background: rgba(56,189,248,0.12);
          border-color: rgba(56,189,248,0.35);
          color: #e0f2fe;
        }

        /* Back button */
        .cw-back {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 12px 2px;
          background: none; border: none;
          color: #475569; font-family: 'Outfit', sans-serif;
          font-size: 0.8rem; cursor: pointer;
          transition: color 0.2s; flex-shrink: 0;
        }
        .cw-back:hover { color: #38bdf8; }

        /* More questions button */
        .cw-more {
          margin: 4px 12px 10px;
          padding: 9px;
          background: rgba(56,189,248,0.05);
          border: 1px dashed rgba(56,189,248,0.2);
          border-radius: 10px; cursor: pointer;
          color: #38bdf8; font-family: 'Outfit', sans-serif;
          font-size: 0.82rem; font-weight: 600;
          transition: all 0.2s; flex-shrink: 0;
        }
        .cw-more:hover {
          background: rgba(56,189,248,0.1);
          border-color: rgba(56,189,248,0.4);
        }

        /* Input */
        .cw-input-wrap {
          padding: 10px 12px;
          border-top: 1px solid rgba(56,189,248,0.08);
          display: flex; gap: 7px; align-items: center;
          background: rgba(8,15,30,0.95); flex-shrink: 0;
        }
        .cw-input {
          flex: 1;
          background: rgba(15,23,42,0.8);
          border: 1px solid rgba(56,189,248,0.12);
          border-radius: 11px; padding: 9px 13px;
          color: #f1f5f9; font-family: 'Outfit', sans-serif;
          font-size: 0.86rem; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cw-input::placeholder { color: #475569; }
        .cw-input:focus {
          border-color: rgba(56,189,248,0.35);
          box-shadow: 0 0 0 3px rgba(56,189,248,0.06);
        }
        .cw-send {
          width: 38px; height: 38px; border-radius: 11px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          border: none; display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #fff; transition: all 0.2s; flex-shrink: 0;
        }
        .cw-send:hover { transform: scale(1.08); box-shadow: 0 0 18px rgba(14,165,233,0.4); }
        .cw-send:disabled { opacity: 0.4; cursor: not-allowed; }

        @media (max-width: 420px) {
          .cw-window { left: 12px; right: 12px; width: auto; bottom: 88px; }
          .cw-toggle { bottom: 20px; right: 20px; }
        }
      `}</style>

      <div className="cw">
        {/* Toggle */}
        <button className="cw-toggle" onClick={() => setOpen((o) => !o)}>
          {!open && <div className="cw-pulse" />}
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          )}
        </button>

        {/* Window */}
        {open && (
          <div className="cw-window">
            {/* Header */}
            <div className="cw-header">
              <div className="cw-avatar">🤖</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="cw-hname">ServerITuz Yordamchi</div>
                <div className="cw-hstatus">
                  <div className="cw-dot" />
                  <span className="cw-htext">Har doim tayyor</span>
                </div>
              </div>
              <div className="cw-hbtns">
                <button className="cw-hbtn" onClick={reset} title="Qaytadan boshlash">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4"/>
                  </svg>
                </button>
                <button className="cw-hbtn cw-close-btn" onClick={() => setOpen(false)}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="cw-msgs">
              {messages.map((msg, i) => (
                <div key={i} className={`cw-msg ${msg.role}`}>
                  <div className="cw-mavatar">
                    {msg.role === "bot" ? "🤖" : "U"}
                  </div>
                  <div className="cw-bubble">{formatText(msg.content)}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Category view */}
            {view === "categories" && (
              <div className="cw-options">
                <div className="cw-opt-label">Mavzu tanlang</div>
                {FAQS.map((faq) => (
                  <button key={faq.category} className="cw-cat-btn" onClick={() => selectCategory(faq)}>
                    <span className="cw-cat-emoji">{faq.emoji}</span>
                    <span>{faq.category}</span>
                    <svg className="cw-cat-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                ))}
              </div>
            )}

            {/* Questions view */}
            {view === "questions" && activeCategory && (
              <>
                <button className="cw-back" onClick={() => { setView("categories"); setActiveCategory(null); }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                  Orqaga
                </button>
                <div className="cw-options" style={{ paddingTop: 0 }}>
                  {activeCategory.questions.map((item) => (
                    <button key={item.q} className="cw-q-btn" onClick={() => selectQuestion(item.q, item.a)}>
                      {item.q}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* After answer — show more button */}
            {view === "chat" && (
              <button className="cw-more" onClick={() => { setView("categories"); setActiveCategory(null); }}>
                ＋ Boshqa savol berish
              </button>
            )}

            {/* Input */}
            <div className="cw-input-wrap">
              <input
                ref={inputRef}
                className="cw-input"
                placeholder="Savol yozing..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInput}
              />
              <button
                className="cw-send"
                disabled={!input.trim()}
                onClick={() => {
                  if (input.trim()) {
                    const e = { key: "Enter" } as React.KeyboardEvent
                    handleInput(e)
                  }
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}