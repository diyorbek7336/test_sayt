'use client'
import { useEffect, useRef, useState } from "react";

export default function Location() {
  const clients = [
    {
      name: "Mars IT school",
      image: "https://i.ibb.co/jPjg8HDx/5922378.jpg",
      imageClass: "object-cover",
      tag: "IT Ta'lim"
    },
    {
      name: "Hotel Inspera-S Tashkent",
      image: "https://i.ibb.co/RGgMB1St/381738538.jpg",
      imageClass: "object-cover",
      tag: "Mehmonxona"
    },
    {
      name: "Cambridge Learning Center",
      image: "https://i.ibb.co/0kRNWsd/download.png",
      imageClass: "object-contain",
      tag: "Ta'lim markazi"
    },
    {
      name: "Colba ta'lim markazi",
      image: "https://i.ibb.co/7xHGHcNJ/logo.png",
      imageClass: "object-contain p-2",
      tag: "Ta'lim markazi"
    },
    {
      name: "DataLab company",
      image: "https://i.ibb.co/xt5ZBQ3Q/download.png",
      imageClass: "object-contain",
      tag: "Texnologiya"
    },
    {
      name: "Gigu Fashion School",
      image: "https://i.ibb.co/vyp8yk5/download.jpg",
      imageClass: "object-cover",
      tag: "Fashion"
    }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

        .clients-section {
          padding: 100px 1.5rem;
          position: relative;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }

        .clients-section::before {
          content: '';
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(56,189,248,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .clients-label {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #38bdf8;
          text-align: center;
          margin-bottom: 1rem;
        }

        .clients-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          text-align: center;
          color: #e8f0fe;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }

        .clients-title span {
          background: linear-gradient(135deg, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .clients-divider {
          width: 50px;
          height: 3px;
          background: linear-gradient(90deg, #38bdf8, #6366f1);
          border-radius: 10px;
          margin: 0 auto 1.25rem;
        }

        .clients-sub {
          text-align: center;
          color: #64748b;
          font-size: 1rem;
          max-width: 500px;
          margin: 0 auto 4rem;
          line-height: 1.75;
        }

        /* grid */
        .clients-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          max-width: 1050px;
          margin: 0 auto;
        }

        /* card */
        .client-card {
          position: relative;
          background: rgba(10, 18, 35, 0.75);
          border: 1px solid rgba(56,189,248,0.08);
          border-radius: 24px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          overflow: hidden;
          backdrop-filter: blur(14px);
          cursor: default;
          transition: transform 0.4s cubic-bezier(.16,1,.3,1),
                      border-color 0.3s,
                      box-shadow 0.4s;

          /* entrance animation */
          opacity: 0;
          transform: translateY(36px);
        }

        .client-card.visible {
          opacity: 1;
          transform: translateY(0);
          transition:
            opacity 0.6s cubic-bezier(.16,1,.3,1),
            transform 0.6s cubic-bezier(.16,1,.3,1),
            border-color 0.3s,
            box-shadow 0.4s;
        }

        .client-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(56,189,248,0.06), transparent 70%);
          pointer-events: none;
          transition: opacity 0.3s;
          opacity: 0;
        }

        .client-card:hover::before { opacity: 1; }

        .client-card:hover {
          transform: translateY(-8px) scale(1.01);
          border-color: rgba(56,189,248,0.25);
          box-shadow:
            0 24px 60px rgba(0,0,0,0.5),
            0 0 0 1px rgba(56,189,248,0.1),
            0 0 40px rgba(56,189,248,0.06);
        }

        /* shine sweep on hover */
        .client-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -75%;
          width: 50%;
          height: 200%;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255,255,255,0.04) 50%,
            transparent 60%
          );
          transform: skewX(-15deg);
          transition: left 0.6s ease;
          pointer-events: none;
        }

        .client-card:hover::after {
          left: 125%;
        }

        /* image wrapper */
        .client-img-wrap {
          width: 110px;
          height: 110px;
          border-radius: 18px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(56,189,248,0.1);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.3s, box-shadow 0.3s;
          flex-shrink: 0;
        }

        .client-card:hover .client-img-wrap {
          border-color: rgba(56,189,248,0.3);
          box-shadow: 0 0 20px rgba(56,189,248,0.1);
        }

        .client-img-wrap img {
          width: 100%;
          height: 100%;
          transition: transform 0.4s ease;
        }

        .client-card:hover .client-img-wrap img {
          transform: scale(1.06);
        }

        /* tag */
        .client-tag {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #38bdf8;
          background: rgba(56,189,248,0.08);
          border: 1px solid rgba(56,189,248,0.15);
          border-radius: 100px;
          padding: 4px 12px;
        }

        .client-name {
          font-size: 1.05rem;
          font-weight: 600;
          color: #cbd5e1;
          text-align: center;
          line-height: 1.4;
          transition: color 0.3s;
        }

        .client-card:hover .client-name {
          color: #e8f0fe;
        }

        /* bottom trusted bar */
        .trusted-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 3.5rem;
          color: #334155;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
        }

        .trusted-bar-line {
          height: 1px;
          width: 60px;
          background: linear-gradient(90deg, transparent, rgba(56,189,248,0.2));
        }

        .trusted-bar-line.right {
          background: linear-gradient(90deg, rgba(56,189,248,0.2), transparent);
        }
      `}</style>

      <section className="clients-section">
        <p className="clients-label">// Bizning mijozlar</p>
        <h2 className="clients-title">Bizga <span>ishonishadi!</span></h2>
        <div className="clients-divider" />
        <p className="clients-sub">
          Kiber hujumlar ko'paygan bir paytda tizimlaringizni himoyalang
          va biznesingizni avtomatlashtiring.
        </p>

        <div className="clients-grid">
          {clients.map((client, index) => (
            <ClientCard key={index} client={client} index={index} />
          ))}
        </div>

        <div className="trusted-bar">
          <span className="trusted-bar-line" />
          6+ ishonchli hamkor kompaniyalar
          <span className="trusted-bar-line right" />
        </div>
      </section>
    </>
  );
}

function ClientCard({
  client,
  index,
}: {
  client: { name: string; image: string; imageClass: string; tag: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 100);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`client-card ${visible ? "visible" : ""}`}
      style={{ transitionDelay: visible ? `${index * 0.08}s` : "0s" }}
    >
      <div className="client-img-wrap">
        <img
          src={client.image}
          alt={client.name}
          className={client.imageClass}
        />
      </div>
      <span className="client-tag">{client.tag}</span>
      <p className="client-name">{client.name}</p>
    </div>
  );
}