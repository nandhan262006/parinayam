"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

interface ServiceCard {
  title: string;
  description: string;
  img: string;
}

export default function ServiceCards3D({ cards }: { cards: ServiceCard[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const stateRef = useRef({ startX: 0, lastX: 0, velocity: 0, idx: 0, dragging: false, width: 0 });

  const snap = useCallback((idx: number) => {
    const s = stateRef.current;
    s.idx = Math.max(0, Math.min(cards.length - 1, idx));
    setActiveIdx(s.idx);
  }, [cards.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || cards.length === 0) return;
    const s = stateRef.current;
    s.width = el.clientWidth;
    s.idx = 0;

    const ro = new ResizeObserver(() => { s.width = el.clientWidth; });
    ro.observe(el);

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      snap(s.idx + (e.deltaY > 0 ? 1 : -1));
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      ro.disconnect();
      el.removeEventListener("wheel", onWheel);
    };
  }, [cards.length, snap]);

  const onPointerDown = (e: React.PointerEvent) => {
    const s = stateRef.current;
    s.startX = e.clientX;
    s.lastX = e.clientX;
    s.velocity = 0;
    s.dragging = true;
    containerRef.current!.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = stateRef.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    s.lastX = e.clientX;
    s.velocity = dx * 0.4 + s.velocity * 0.6;
    if (Math.abs(dx) > s.width * 0.2) {
      s.dragging = false;
      e.currentTarget.releasePointerCapture(e.pointerId);
      snap(s.idx + (dx > 0 ? -1 : 1));
    }
  };

  const onPointerUp = () => {
    const s = stateRef.current;
    if (!s.dragging) return;
    s.dragging = false;
    if (Math.abs(s.velocity) > 0.3) {
      snap(s.idx + (s.velocity > 0 ? -1 : 1));
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="text-center pt-8 pb-4 px-4 max-w-7xl mx-auto">
        <span className="text-gold font-semibold text-sm uppercase tracking-widest">What We Offer</span>
        <h2 className="font-[family-name:var(--font-serif)] text-4xl font-bold mt-3 mb-4 text-primary">Our Services</h2>
        <p className="text-muted max-w-2xl mx-auto">
          Comprehensive wedding photography and cinematography services tailored to make your special day unforgettable.
        </p>
      </div>

      <div
        ref={containerRef}
        className="select-none pb-8"
        style={{ perspective: "1200px", touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="flex items-center justify-center min-h-[400px] sm:h-[500px] md:h-[600px] relative">
          {cards.map((card, i) => {
            const diff = i - activeIdx;
            const abs = Math.abs(diff);
            const isActive = diff === 0;

            const rotateY = diff * -25;
            const translateZ = isActive ? 200 : abs === 1 ? 50 : -200;
            const translateX = diff * 120;
            const scale = 1 - abs * 0.12;
            const opacity = 1 - abs * 0.25;
            const zIndex = cards.length - abs;

            return (
              <div
                key={card.title}
                className="absolute w-[85%] md:w-[450px] transition-all duration-500 ease-out cursor-grab active:cursor-grabbing"
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity: opacity < 0 ? 0 : opacity,
                  zIndex,
                  transformStyle: "preserve-3d",
                  pointerEvents: isActive ? "auto" : "none",
                }}
                onClick={() => !isActive && snap(i)}
              >
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="90vw"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-surface">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{card.title}</h3>
                    <p className="text-surface/80 text-sm md:text-base leading-relaxed line-clamp-2">
                      {card.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-gold text-sm font-medium">
                      <span className="w-6 h-px bg-gold" />
                      Learn More
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-2 pb-12">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => snap(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIdx ? "bg-gold w-6" : "bg-border hover:bg-muted"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
