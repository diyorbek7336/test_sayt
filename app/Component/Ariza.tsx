'use client'

import { useState } from "react"
import { useSelectedServices } from "../context/SelectedServicesContext"

export default function Ariza() {
  const [input1, setInput1] = useState("")
  const [input3, setInput3] = useState("")
  const [input4, setInput4] = useState("")
  const [input5, setInput5] = useState("")
  const [textarea, setTextarea] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const { selectedServices, clearServices } = useSelectedServices()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input1 || !input3 || !input4 || !input5 || !textarea) {
      alert("Iltimos, barcha maydonlarni to'ldiring!")
      return
    }

    const tanlangan = selectedServices.length
      ? selectedServices.map((s) => s.title).join(", ")
      : "—"

    const data = {
      Ism: input1,
      Email: input3,
      Kompaniya: input4,
      Telefon: input5,
      Xabar: textarea,
      "Tanlangan xizmatlar": tanlangan,
      Vaqt: new Date().toLocaleString("uz-UZ"),
    }

    setIsSubmitting(true)
    try {
      const res = await fetch("/API/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || "Server xatosi")
      }

      setSubmitted(true)
      setInput1(""); setInput3(""); setInput4(""); setInput5(""); setTextarea("")
      clearServices()
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      console.error(err)
      const msg = err instanceof Error ? err.message : "Ariza yuborilmadi."
      alert(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

        .ariza-section {
          padding: 100px 1.5rem;
          position: relative;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }

        .ariza-section::before {
          content: '';
          position: absolute;
          bottom: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .ariza-inner {
          max-width: 640px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* header */
        .ariza-label {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #38bdf8;
          text-align: center;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .ariza-title {
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 800;
          text-align: center;
          color: #f1f5f9;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
        }

        .ariza-title span {
          background: linear-gradient(135deg, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ariza-divider {
          width: 50px;
          height: 3px;
          background: linear-gradient(90deg, #38bdf8, #6366f1);
          border-radius: 10px;
          margin: 0 auto 1.25rem;
        }

        .ariza-sub {
          text-align: center;
          color: #94a3b8;
          font-size: 1rem;
          font-weight: 400;
          margin-bottom: 2.5rem;
          line-height: 1.75;
        }

        /* selected badge */
        .selected-badge {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: rgba(56,189,248,0.07);
          border: 1px solid rgba(56,189,248,0.2);
          border-radius: 14px;
          padding: 12px 16px;
          margin-bottom: 1.75rem;
          font-size: 0.9rem;
          color: #bae6fd;
          font-weight: 500;
          line-height: 1.6;
        }

        .selected-badge strong {
          color: #7dd3fc;
          font-weight: 700;
        }

        /* card */
        .ariza-card {
          background: rgba(10, 18, 35, 0.85);
          border: 1px solid rgba(56,189,248,0.12);
          border-radius: 28px;
          padding: 2.5rem;
          backdrop-filter: blur(18px);
          position: relative;
          overflow: hidden;
        }

        .ariza-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(56,189,248,0.4), transparent);
        }

        /* field label */
        .field-label {
          display: block;
          font-size: 0.82rem;
          font-weight: 700;
          color: #cbd5e1;
          margin-bottom: 6px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-family: 'Space Mono', monospace;
        }

        /* input group */
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          margin-bottom: 1.25rem;
        }

        .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        @media (max-width: 540px) {
          .input-row { grid-template-columns: 1fr; }
          .ariza-card { padding: 1.75rem 1.25rem; }
        }

        /* field wrapper */
        .field-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .field-icon {
          position: absolute;
          left: 14px;
          top: calc(100% - 42px);
          color: #475569;
          pointer-events: none;
          transition: color 0.2s;
        }

        .field-wrap:focus-within .field-icon {
          color: #38bdf8;
        }

        .field-wrap-textarea .field-icon {
          top: auto;
          bottom: calc(100% - 62px);
          top: 36px;
        }

        /* inputs */
        .ariza-input {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(100,116,139,0.25);
          border-radius: 12px;
          padding: 13px 14px 13px 42px;
          color: #f1f5f9;
          font-family: 'Outfit', sans-serif;
          font-size: 0.97rem;
          font-weight: 500;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
          width: 100%;
        }

        .ariza-input::placeholder {
          color: #475569;
          font-weight: 400;
        }

        .ariza-input:focus {
          border-color: rgba(56,189,248,0.45);
          box-shadow: 0 0 0 3px rgba(56,189,248,0.08);
          background: rgba(15, 23, 42, 1);
        }

        .ariza-input:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        /* textarea */
        .ariza-textarea {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(100,116,139,0.25);
          border-radius: 12px;
          padding: 13px 14px 13px 42px;
          color: #f1f5f9;
          font-family: 'Outfit', sans-serif;
          font-size: 0.97rem;
          font-weight: 500;
          outline: none;
          resize: vertical;
          min-height: 120px;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
          width: 100%;
        }

        .ariza-textarea::placeholder {
          color: #475569;
          font-weight: 400;
        }

        .ariza-textarea:focus {
          border-color: rgba(56,189,248,0.45);
          box-shadow: 0 0 0 3px rgba(56,189,248,0.08);
          background: rgba(15, 23, 42, 1);
        }

        .ariza-textarea:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        /* submit btn */
        .ariza-btn {
          width: 100%;
          margin-top: 0.25rem;
          padding: 15px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          color: #fff;
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          letter-spacing: 0.03em;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 0 30px rgba(14,165,233,0.25);
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
        }

        .ariza-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 0 50px rgba(14,165,233,0.4);
        }

        .ariza-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
          transform: none;
        }

        /* spinner */
        .spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* success */
        .success-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          padding: 3rem 2rem;
          text-align: center;
          animation: fadeUp 0.5s cubic-bezier(.16,1,.3,1) both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .success-icon {
          width: 72px; height: 72px;
          border-radius: 50%;
          background: rgba(52,211,153,0.1);
          border: 1px solid rgba(52,211,153,0.35);
          display: flex; align-items: center; justify-content: center;
          color: #34d399;
          box-shadow: 0 0 35px rgba(52,211,153,0.2);
        }

        .success-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #f1f5f9;
          letter-spacing: -0.01em;
        }

        .success-sub {
          color: #94a3b8;
          font-size: 0.97rem;
          font-weight: 400;
          line-height: 1.7;
        }
      `}</style>

      <section className="ariza-section" id="ariza">
        <div className="ariza-inner">
          <p className="ariza-label">// Bog'lanish</p>
          <h2 className="ariza-title">Ariza <span>qoldiring</span></h2>
          <div className="ariza-divider" />
          <p className="ariza-sub">
            Bepul konsultatsiya uchun ma'lumotlaringizni qoldiring —
            tez orada siz bilan bog'lanamiz.
          </p>

          {selectedServices.length > 0 && (
            <div className="selected-badge">
              <svg style={{ flexShrink: 0, marginTop: 2 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
              <span>
                <strong>Tanlangan xizmatlar:</strong>{" "}
                {selectedServices.map((s) => s.title).join(", ")}
              </span>
            </div>
          )}

          <div className="ariza-card">
            {submitted ? (
              <div className="success-box">
                <div className="success-icon">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <p className="success-title">Ariza yuborildi!</p>
                <p className="success-sub">
                  Tez orada siz bilan bog'lanamiz.<br/>
                  Vaqtingiz uchun rahmat!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="input-group">

                  <div className="input-row">
                  
                    <div className="field-wrap">
                      <label className="field-label">Ismingiz</label>
                      <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="ariza-input"
                        value={input1}
                        onChange={(e) => setInput1(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>

                    
                    <div className="field-wrap">
                      <label className="field-label">Telefon</label>
                      <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l1.06-1.06a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
                      </svg>
                      <input
                        type="tel"
                        placeholder="+998 90 000 00 00"
                        className="ariza-input"
                        value={input5}
                        onChange={(e) => setInput5(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                 
                  <div className="field-wrap">
                    <label className="field-label">Email</label>
                    <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <input
                      type="email"
                      placeholder="example@email.com"
                      className="ariza-input"
                      value={input3}
                      onChange={(e) => setInput3(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                
                  <div className="field-wrap">
                    <label className="field-label">Kompaniya</label>
                    <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>
                    </svg>
                    <input
                      type="text"
                      placeholder="Kompaniyangiz nomi"
                      className="ariza-input"
                      value={input4}
                      onChange={(e) => setInput4(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  
                  <div className="field-wrap field-wrap-textarea">
                    <label className="field-label">Xabar</label>
                    <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    </svg>
                    <textarea
                      placeholder="Qanday xizmat kerakligini yozing..."
                      className="ariza-textarea"
                      value={textarea}
                      onChange={(e) => setTextarea(e.target.value)}
                      disabled={isSubmitting}
                      rows={4}
                    />
                  </div>
                </div>

                <button type="submit" className="ariza-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner" />
                      Yuborilmoqda...
                    </>
                  ) : (
                    <>
                      Ariza yuborish
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}