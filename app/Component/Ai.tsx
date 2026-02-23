"use client"

import { useState, useRef, useEffect } from "react"

interface Message {
  role: "user" | "assistant"
  content: string
}

const SUGGESTED_QUESTIONS = [
  "IT Security xizmati haqida",
  "Face ID davomat tizimi",
  "Narxlar qancha?",
  "Bog'lanish ma'lumotlari",
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Salom! Men ServerITuz AI yordamchisiman 👋\n\nXizmatlarimiz, texnik savollar yoki hamkorlik bo'yicha yordam bera olaman. Nima so'raysiz?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open, messages])

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    setShowSuggestions(false)
    const userMsg: Message = { role: "user", content: trimmed }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/apply", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await res.json()
      const reply = data.reply || "Xatolik yuz berdi, qayta urinib ko'ring."
      setMessages((prev) => [...prev, { role: "assistant", content: reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Internet bilan bog'liq xato. Iltimos, qayta urinib ko'ring.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const formatText = (text: string) => {
    return text.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    ))
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

        .chat-widget * { box-sizing: border-box; }

        /* ── Toggle Button ── */
        .chat-toggle {
          position: fixed;
          bottom: 28px;
          right: 28px;
          width: 58px;
          height: 58px;
          border-radius: 18px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          box-shadow: 0 8px 32px rgba(14,165,233,0.45), 0 0 0 1px rgba(255,255,255,0.08);
          transition: transform 0.25s cubic-bezier(.16,1,.3,1), box-shadow 0.25s;
        }

        .chat-toggle:hover {
          transform: scale(1.08) translateY(-2px);
          box-shadow: 0 12px 40px rgba(14,165,233,0.55), 0 0 0 1px rgba(255,255,255,0.12);
        }

        .chat-toggle-icon {
          transition: transform 0.3s cubic-bezier(.16,1,.3,1), opacity 0.2s;
          color: #fff;
        }

        .chat-toggle-icon.hidden {
          position: absolute;
          opacity: 0;
          transform: scale(0.6) rotate(90deg);
        }

        .chat-toggle-icon.visible {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }

        .chat-pulse {
          position: absolute;
          top: -3px; right: -3px;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: #22d3ee;
          border: 2px solid #060912;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }

        /* ── Chat Window ── */
        .chat-window {
          position: fixed;
          bottom: 100px;
          right: 28px;
          width: 360px;
          height: 520px;
          background: rgba(6, 9, 18, 0.97);
          border: 1px solid rgba(56,189,248,0.15);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 998;
          box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(56,189,248,0.06);
          font-family: 'Outfit', sans-serif;
          transform-origin: bottom right;
          animation: chatOpen 0.35s cubic-bezier(.16,1,.3,1);
        }

        .chat-window.closing {
          animation: chatClose 0.25s cubic-bezier(.4,0,1,1) forwards;
        }

        @keyframes chatOpen {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes chatClose {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to   { opacity: 0; transform: scale(0.85) translateY(20px); }
        }

        .chat-window::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent);
        }

        /* ── Header ── */
        .chat-header {
          padding: 16px 18px;
          background: rgba(10,18,35,0.9);
          border-bottom: 1px solid rgba(56,189,248,0.08);
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .chat-avatar {
          width: 38px; height: 38px;
          border-radius: 12px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-size: 18px;
        }

        .chat-header-info { flex: 1; min-width: 0; }

        .chat-header-name {
          font-family: 'Space Mono', monospace;
          font-size: 0.82rem;
          font-weight: 700;
          color: #f1f5f9;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .chat-header-status {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 2px;
        }

        .chat-status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22d3ee;
          flex-shrink: 0;
        }

        .chat-status-text {
          font-size: 0.72rem;
          color: #64748b;
        }

        .chat-close {
          width: 30px; height: 30px;
          border-radius: 9px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.15);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #f87171;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .chat-close:hover {
          background: rgba(239,68,68,0.2);
          border-color: rgba(239,68,68,0.4);
          transform: scale(1.08);
        }

        /* ── Messages ── */
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          scrollbar-width: thin;
          scrollbar-color: rgba(56,189,248,0.15) transparent;
        }

        .chat-msg {
          display: flex;
          gap: 8px;
          animation: msgIn 0.3s cubic-bezier(.16,1,.3,1);
        }

        @keyframes msgIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .chat-msg.user { flex-direction: row-reverse; }

        .chat-msg-avatar {
          width: 28px; height: 28px;
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .chat-msg.assistant .chat-msg-avatar {
          background: linear-gradient(135deg, rgba(14,165,233,0.2), rgba(99,102,241,0.2));
          border: 1px solid rgba(56,189,248,0.2);
        }

        .chat-msg.user .chat-msg-avatar {
          background: rgba(56,189,248,0.1);
          border: 1px solid rgba(56,189,248,0.15);
          color: #38bdf8;
          font-size: 11px;
          font-family: 'Space Mono', monospace;
          font-weight: 700;
        }

        .chat-msg-bubble {
          max-width: 78%;
          padding: 10px 13px;
          border-radius: 14px;
          font-size: 0.87rem;
          line-height: 1.6;
        }

        .chat-msg.assistant .chat-msg-bubble {
          background: rgba(15,23,42,0.9);
          border: 1px solid rgba(56,189,248,0.1);
          color: #cbd5e1;
          border-top-left-radius: 4px;
        }

        .chat-msg.user .chat-msg-bubble {
          background: linear-gradient(135deg, rgba(14,165,233,0.2), rgba(99,102,241,0.2));
          border: 1px solid rgba(56,189,248,0.25);
          color: #e0f2fe;
          border-top-right-radius: 4px;
        }

        /* ── Typing indicator ── */
        .chat-typing {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 10px 13px;
          background: rgba(15,23,42,0.9);
          border: 1px solid rgba(56,189,248,0.1);
          border-radius: 14px;
          border-top-left-radius: 4px;
          width: fit-content;
        }

        .chat-typing span {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #38bdf8;
          animation: typingDot 1.2s infinite;
        }

        .chat-typing span:nth-child(2) { animation-delay: 0.2s; }
        .chat-typing span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typingDot {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }

        /* ── Suggestions ── */
        .chat-suggestions {
          padding: 0 14px 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .chat-suggestion {
          padding: 6px 12px;
          border-radius: 100px;
          background: rgba(56,189,248,0.06);
          border: 1px solid rgba(56,189,248,0.15);
          color: #7dd3fc;
          font-size: 0.78rem;
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .chat-suggestion:hover {
          background: rgba(56,189,248,0.14);
          border-color: rgba(56,189,248,0.4);
          color: #e0f2fe;
          transform: scale(1.03);
        }

        /* ── Input ── */
        .chat-input-wrap {
          padding: 12px 14px;
          border-top: 1px solid rgba(56,189,248,0.08);
          display: flex;
          gap: 8px;
          align-items: center;
          background: rgba(8,15,30,0.95);
          flex-shrink: 0;
        }

        .chat-input {
          flex: 1;
          background: rgba(15,23,42,0.8);
          border: 1px solid rgba(56,189,248,0.12);
          border-radius: 12px;
          padding: 10px 14px;
          color: #f1f5f9;
          font-family: 'Outfit', sans-serif;
          font-size: 0.88rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .chat-input::placeholder { color: #475569; }

        .chat-input:focus {
          border-color: rgba(56,189,248,0.35);
          box-shadow: 0 0 0 3px rgba(56,189,248,0.06);
        }

        .chat-send {
          width: 40px; height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #fff;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .chat-send:hover:not(:disabled) {
          transform: scale(1.08);
          box-shadow: 0 0 20px rgba(14,165,233,0.4);
        }

        .chat-send:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* ── Mobile ── */
        @media (max-width: 420px) {
          .chat-window {
            right: 12px;
            width: auto;
            bottom: 90px;
          }
          .chat-toggle { bottom: 20px; right: 20px; }
        }
      `}</style>

      <div className="chat-widget">
        {/* Toggle Button */}
        <button className="chat-toggle" onClick={() => setOpen((o) => !o)} aria-label="Chat">
          {!open && <div className="chat-pulse" />}
          <span className={`chat-toggle-icon ${open ? "visible" : "visible"}`}>
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            )}
          </span>
        </button>

   
        {open && (
          <div className="chat-window">
          
            <div className="chat-header">
              <div className="chat-avatar">🤖</div>
              <div className="chat-header-info">
                <div className="chat-header-name">ServerITuz AI Yordamchi</div>
                <div className="chat-header-status">
                  <div className="chat-status-dot" />
                  <span className="chat-status-text">Onlayn • Har doim tayyor</span>
                </div>
              </div>
              <button className="chat-close" onClick={() => setOpen(false)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

         
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`chat-msg ${msg.role}`}>
                  <div className="chat-msg-avatar">
                    {msg.role === "assistant" ? "🤖" : "U"}
                  </div>
                  <div className="chat-msg-bubble">{formatText(msg.content)}</div>
                </div>
              ))}

              {loading && (
                <div className="chat-msg assistant">
                  <div className="chat-msg-avatar">🤖</div>
                  <div className="chat-typing">
                    <span /><span /><span />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

 
            {showSuggestions && (
              <div className="chat-suggestions">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    className="chat-suggestion"
                    onClick={() => sendMessage(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

          
            <div className="chat-input-wrap">
              <input
                ref={inputRef}
                className="chat-input"
                placeholder="Savol yozing..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                disabled={loading}
              />
              <button
                className="chat-send"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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