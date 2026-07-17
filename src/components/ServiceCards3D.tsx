"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function ServiceCards3D({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(active);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const total = services.length;

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % total) + total) % total;
      activeRef.current = next;
      setActive(next);
    },
    [total]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el || total === 0) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaX > 30 || e.deltaY > 30) goTo(activeRef.current + 1);
      else if (e.deltaX < -30 || e.deltaY < -30) goTo(activeRef.current - 1);
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      startX.current = e.clientX;
      el.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const diff = e.clientX - startX.current;
      if (Math.abs(diff) > 40) {
        goTo(activeRef.current + (diff > 0 ? -1 : 1));
        startX.current = e.clientX;
      }
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("pointerdown", handlePointerDown);
    el.addEventListener("pointermove", handlePointerMove);
    el.addEventListener("pointerup", handlePointerUp);

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("pointerdown", handlePointerDown);
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerup", handlePointerUp);
    };
  }, [goTo, total]);

  if (total === 0) return null;

  return (
    <div ref={containerRef} className="relative" style={{ perspective: "1200px" }}>
      <div
        className="flex items-center justify-center h-[500px] md:h-[600px] relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {services.map((service, i) => {
          const diff = i - active;
          const absDiff = Math.abs(diff);
          const isActive = diff === 0;
          const zIndex = total - absDiff;

          const translateX = diff * 120;
          const translateZ = diff === 0 ? 200 : diff === 1 || diff === -1 ? 50 : -200;
          const rotateY = diff * 25;
          const scale = isActive ? 1 : 1 - absDiff * 0.12;
          const opacity = isActive ? 1 : 1 - absDiff * 0.3;

          return (
            <div
              key={service.id}
              className="absolute w-[280px] md:w-[340px] aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-500 ease-out cursor-pointer"
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
              }}
              onClick={() => goTo(i)}
            >
              {service.imageUrl && (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${service.imageUrl})` }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-[family-name:var(--font-serif)] text-2xl mb-2">{service.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{service.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === active ? "bg-gold scale-125" : "bg-border hover:bg-muted"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
