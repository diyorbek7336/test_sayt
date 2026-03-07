"use client";
import { useEffect, useRef } from "react";

interface Props {
  color?: string;
  count?: number;
}

export default function FloatingParticles({ color = "56,189,248", count = 80 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

   
    const particles = Array.from({ length: count }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r:  Math.random() * 1.8 + 0.8,
    }));

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const CONNECT_DIST = 130;
    const MOUSE_DIST   = 160;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

    
      particles.forEach(p => {

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_DIST) {
          const force = (MOUSE_DIST - d) / MOUSE_DIST * 0.6;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }

       
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 2) { p.vx = p.vx / speed * 2; p.vy = p.vy / speed * 2; }

       
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

      
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > canvas.width)  { p.x = canvas.width;  p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1; }
      });


      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.35;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${color}, ${alpha})`;
            ctx.lineWidth   = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

    
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.7)`;
        ctx.shadowBlur  = 6;
        ctx.shadowColor = `rgba(${color}, 0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

    
      particles.forEach(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_DIST) {
          const alpha = (1 - d / MOUSE_DIST) * 0.5;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${color}, ${alpha})`;
          ctx.lineWidth   = 0.8;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [color, count]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "auto",
        zIndex: 2,
      }}
    />
  );
}