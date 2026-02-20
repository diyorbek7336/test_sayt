"use client"

import { useState } from "react"
import { useSelectedServices, type Service } from "../context/SelectedServicesContext"

const services: Service[] = [
  {
    id: 1,
    title: "IT Security",
    icon: "https://img.icons8.com/ios-filled/100/ffffff/security-checked.png",
    description: "Tarmoq va tizim xavfsizligini ta'minlaymiz: firewall, penetration testing, monitoring.",
  },
  {
    id: 2,
    title: "Automation",
    icon: "https://img.freepik.com/premium-vector/programmable-automation-icon-vector-image-can-be-used-cyberpunk_120816-305414.jpg",
    description: "Tizimlarni avtomatlashtirish va monitoring xizmatlari, IT ops jarayonlarini soddalashtirish.",
  },
  {
    id: 3,
    title: "Networking",
    icon: "https://img.icons8.com/ios-filled/100/ffffff/network.png",
    description: "Tarmoqlarni loyihalash va xavfsiz ishlashini ta'minlash: switch, router, VLAN konfiguratsiya.",
  },
  {
    id: 4,
    title: "Web Development",
    icon: "https://img.icons8.com/ios-filled/100/ffffff/code.png",
    description: "Frontend va backend tizimlar yaratish: saytlar, API, dashboardlar va integratsiyalar.",
  },
  {
    id: 5,
    title: "CCTV & Security",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUNnYEY1lD-_EWdYKxbzRkWlksiZOQg4aUmw&s",
    description: "Kameralar va xavfsizlik tizimlarini o'rnatish, monitoring va qo'llab-quvvatlash.",
  },
  {
    id: 6,
    title: "Cloud Services",
    icon: "https://img.icons8.com/ios-filled/100/ffffff/cloud.png",
    description: "Bulutli serverlar, saqlash va backup yechimlari, virtual infratuzilma boshqaruvi.",
  },
]

export default function Card() {
  const [show, setShow] = useState(false)
  const { selectedServices, addService, removeService } = useSelectedServices()

  const isSelected = (id: number) => selectedServices.some((s) => s.id === id)

  const handleToggle = (service: Service) => {
    if (isSelected(service.id)) removeService(service.id)
    else addService(service)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

        .cards-section {
          padding: 100px 1.5rem;
          position: relative;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
          background: #060912;
        }

        .cards-section::before {
          content: '';
          position: absolute;
          top: -150px; left: 50%;
          transform: translateX(-50%);
          width: 900px; height: 500px;
          background: radial-gradient(ellipse, rgba(56,189,248,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .cards-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }

        /* header */
        .cards-label {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #38bdf8;
          text-align: center;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .cards-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          text-align: center;
          color: #f1f5f9;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
        }

        .cards-title span {
          background: linear-gradient(135deg, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cards-divider {
          width: 50px; height: 3px;
          background: linear-gradient(90deg, #38bdf8, #6366f1);
          border-radius: 10px;
          margin: 0 auto 1.25rem;
        }

        .cards-sub {
          text-align: center;
          color: #94a3b8;
          font-size: 1rem;
          max-width: 500px;
          margin: 0 auto 3.5rem;
          line-height: 1.75;
        }

        /* grid */
        .service-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        /* service card */
        .service-card {
          position: relative;
          background: rgba(10, 18, 35, 0.8);
          border: 1px solid rgba(56,189,248,0.09);
          border-radius: 24px;
          padding: 2rem;
          overflow: hidden;
          backdrop-filter: blur(14px);
          transition: transform 0.35s cubic-bezier(.16,1,.3,1),
                      border-color 0.3s, box-shadow 0.35s;
          cursor: default;
        }

        .service-card::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: 24px;
          background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(56,189,248,0.07), transparent 70%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }

        .service-card:hover::before { opacity: 1; }

        .service-card:hover {
          transform: translateY(-7px);
          border-color: rgba(56,189,248,0.22);
          box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(56,189,248,0.07);
        }

        /* selected state */
        .service-card.is-selected {
          border-color: rgba(56,189,248,0.4);
          background: rgba(14, 30, 55, 0.9);
          box-shadow: 0 0 0 1px rgba(56,189,248,0.15), 0 0 40px rgba(56,189,248,0.08);
        }

        .service-card.is-selected::after {
          content: '';
          position: absolute; inset: 0;
          border-radius: 24px;
          background: radial-gradient(ellipse 70% 40% at 50% 0%, rgba(56,189,248,0.1), transparent 60%);
          pointer-events: none;
        }

        /* glow dot */
        .card-glow {
          position: absolute;
          top: -20px; right: -20px;
          width: 90px; height: 90px;
          border-radius: 50%;
          background: rgba(56,189,248,0.12);
          filter: blur(24px);
          pointer-events: none;
        }

        .is-selected .card-glow {
          background: rgba(56,189,248,0.22);
        }

        /* icon */
        .card-icon-wrap {
          width: 56px; height: 56px;
          border-radius: 16px;
          background: rgba(56,189,248,0.08);
          border: 1px solid rgba(56,189,248,0.15);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.25rem;
          transition: border-color 0.3s, box-shadow 0.3s;
          overflow: hidden;
        }

        .service-card:hover .card-icon-wrap,
        .is-selected .card-icon-wrap {
          border-color: rgba(56,189,248,0.35);
          box-shadow: 0 0 18px rgba(56,189,248,0.15);
        }

        .card-icon-wrap img {
          width: 32px; height: 32px;
          object-fit: contain;
        }

        /* text */
        .card-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 0.6rem;
          font-family: 'Space Mono', monospace;
        }

        .card-desc {
          font-size: 0.9rem;
          color: #94a3b8;
          line-height: 1.7;
          font-weight: 400;
          margin-bottom: 1.5rem;
        }

        .is-selected .card-desc { color: #bae6fd; }

        /* bottom row */
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          position: relative;
          z-index: 2;
        }

        /* SELECT BUTTON */
        .select-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 20px;
          border-radius: 100px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          border: 1.5px solid rgba(56,189,248,0.25);
          background: transparent;
          color: #7dd3fc;
          transition: all 0.25s;
          letter-spacing: 0.02em;
        }

        .select-btn:hover {
          background: rgba(56,189,248,0.1);
          border-color: rgba(56,189,248,0.5);
          color: #e0f2fe;
          box-shadow: 0 0 20px rgba(56,189,248,0.15);
          transform: scale(1.03);
        }

        .select-btn.selected {
          background: linear-gradient(135deg, rgba(14,165,233,0.25), rgba(99,102,241,0.25));
          border-color: rgba(56,189,248,0.55);
          color: #bae6fd;
          box-shadow: 0 0 18px rgba(56,189,248,0.15);
        }

        .select-btn.selected:hover {
          background: rgba(239,68,68,0.12);
          border-color: rgba(239,68,68,0.4);
          color: #fca5a5;
          box-shadow: 0 0 20px rgba(239,68,68,0.1);
        }

        .check-icon { flex-shrink: 0; }

        /* CART BUTTON */
        .cart-btn {
          position: relative;
          width: 42px; height: 42px;
          border-radius: 12px;
          background: rgba(56,189,248,0.07);
          border: 1px solid rgba(56,189,248,0.15);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #64748b;
          transition: all 0.25s;
          flex-shrink: 0;
        }

        .cart-btn:hover {
          background: rgba(56,189,248,0.14);
          border-color: rgba(56,189,248,0.4);
          color: #38bdf8;
          box-shadow: 0 0 18px rgba(56,189,248,0.15);
          transform: scale(1.08);
        }

        .cart-btn.has-items {
          border-color: rgba(56,189,248,0.35);
          color: #38bdf8;
          background: rgba(56,189,248,0.1);
        }

        .cart-badge {
          position: absolute;
          top: -7px; right: -7px;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          color: #fff;
          font-size: 11px;
          font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Space Mono', monospace;
          box-shadow: 0 0 12px rgba(14,165,233,0.5);
          border: 2px solid #060912;
        }

        /* ===== MODAL ===== */
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(8px);
          z-index: 40;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .modal-box {
          position: fixed;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: min(420px, 92vw);
          max-height: 80vh;
          background: rgba(8, 15, 30, 0.97);
          border: 1px solid rgba(56,189,248,0.15);
          border-radius: 24px;
          overflow: hidden;
          z-index: 50;
          display: flex;
          flex-direction: column;
          animation: slideUp 0.3s cubic-bezier(.16,1,.3,1);
          box-shadow: 0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(56,189,248,0.08);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 20px)); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }

        .modal-box::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(56,189,248,0.4), transparent);
        }

        /* modal header */
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 1.5rem 1rem;
          border-bottom: 1px solid rgba(56,189,248,0.08);
          flex-shrink: 0;
        }

        .modal-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #f1f5f9;
          font-family: 'Space Mono', monospace;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .modal-title-count {
          font-size: 0.78rem;
          background: rgba(56,189,248,0.12);
          border: 1px solid rgba(56,189,248,0.2);
          color: #38bdf8;
          border-radius: 100px;
          padding: 2px 10px;
          font-family: 'Space Mono', monospace;
        }

        .modal-close {
          width: 34px; height: 34px;
          border-radius: 10px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.15);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #f87171;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .modal-close:hover {
          background: rgba(239,68,68,0.18);
          border-color: rgba(239,68,68,0.4);
          transform: scale(1.08);
        }

        /* modal body */
        .modal-body {
          overflow-y: auto;
          padding: 1.25rem 1.5rem;
          flex: 1;
          scrollbar-width: thin;
          scrollbar-color: rgba(56,189,248,0.2) transparent;
        }

        .modal-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 2.5rem 1rem;
          color: #334155;
          font-size: 0.9rem;
          font-family: 'Space Mono', monospace;
          text-align: center;
        }

        /* modal item */
        .modal-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(15,23,42,0.7);
          border: 1px solid rgba(56,189,248,0.08);
          border-radius: 14px;
          padding: 12px 14px;
          margin-bottom: 0.75rem;
          transition: border-color 0.2s;
        }

        .modal-item:hover { border-color: rgba(56,189,248,0.2); }

        .modal-item-icon {
          width: 42px; height: 42px;
          border-radius: 12px;
          background: rgba(56,189,248,0.08);
          border: 1px solid rgba(56,189,248,0.12);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }

        .modal-item-icon img {
          width: 26px; height: 26px;
          object-fit: contain;
        }

        .modal-item-name {
          flex: 1;
          font-weight: 700;
          color: #e2e8f0;
          font-size: 0.95rem;
          min-width: 0;
        }

        .modal-remove {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.12);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #f87171;
          flex-shrink: 0;
          transition: all 0.2s;
        }

        .modal-remove:hover {
          background: rgba(239,68,68,0.18);
          border-color: rgba(239,68,68,0.35);
          transform: scale(1.1);
        }

        /* modal footer */
        .modal-footer {
          padding: 1rem 1.5rem 1.5rem;
          border-top: 1px solid rgba(56,189,248,0.08);
          flex-shrink: 0;
        }

        .modal-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          color: #fff;
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 0.97rem;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 0 28px rgba(14,165,233,0.25);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .modal-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 44px rgba(14,165,233,0.4);
        }
      `}</style>

      <section className="cards-section" id="cards">
        <div className="cards-inner">
          <p className="cards-label">// Xizmatlar</p>
          <h2 className="cards-title">Bizning <span>xizmatlar</span></h2>
          <div className="cards-divider" />
          <p className="cards-sub">
            Zamonaviy IT yechimlar bilan biznesingizni yangi bosqichga olib chiqamiz.
          </p>

          <div className="service-grid">
            {services.map((service) => {
              const selected = isSelected(service.id)
              return (
                <div key={service.id} className={`service-card ${selected ? "is-selected" : ""}`}>
                  <div className="card-glow" />

                  <div className="card-icon-wrap">
                    <img src={service.icon} alt={service.title} />
                  </div>

                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-desc">{service.description}</p>

                  <div className="card-footer">
                    <button
                      className={`select-btn ${selected ? "selected" : ""}`}
                      onClick={() => handleToggle(service)}
                    >
                      {selected ? (
                        <>
                          <svg className="check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5"/>
                          </svg>
                          Tanlangan
                        </>
                      ) : (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                          </svg>
                          Tanlash
                        </>
                      )}
                    </button>

                    <button
                      className={`cart-btn ${selectedServices.length > 0 ? "has-items" : ""}`}
                      onClick={() => setShow(true)}
                      title="Tanlangan xizmatlar"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.98-1.61L23 6H6"/>
                      </svg>
                      {selectedServices.length > 0 && (
                        <span className="cart-badge">{selectedServices.length}</span>
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {show && (
        <>
          <div className="modal-overlay" onClick={() => setShow(false)} />
          <div className="modal-box">
            <div className="modal-header">
              <span className="modal-title">
                Savatcha
                {selectedServices.length > 0 && (
                  <span className="modal-title-count">{selectedServices.length} ta</span>
                )}
              </span>
              <button className="modal-close" onClick={() => setShow(false)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="modal-body">
              {selectedServices.length === 0 ? (
                <div className="modal-empty">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.98-1.61L23 6H6"/>
                  </svg>
                  Hozircha hech narsa tanlanmagan
                </div>
              ) : (
                selectedServices.map((item) => (
                  <div key={item.id} className="modal-item">
                    <div className="modal-item-icon">
                      <img src={item.icon} alt={item.title} />
                    </div>
                    <span className="modal-item-name">{item.title}</span>
                    <button className="modal-remove" onClick={() => removeService(item.id)} title="O'chirish">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {selectedServices.length > 0 && (
              <div className="modal-footer">
                <a href="#ariza" className="modal-cta" onClick={() => setShow(false)}>
                  Ariza qoldirish
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}