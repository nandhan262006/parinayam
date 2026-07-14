"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

interface ImageItem {
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}

export default function GalleryClient({ images }: { images: ImageItem[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", ...new Set(images.map((i) => i.category))];
  const filtered = activeCategory === "All" ? images : images.filter((i) => i.category === activeCategory);

  const open = (index: number) => setLightboxIndex(index);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((p) => (p !== null ? (p - 1 + filtered.length) % filtered.length : null)), [filtered.length]);
  const next = useCallback(() => setLightboxIndex((p) => (p !== null ? (p + 1) % filtered.length : null)), [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, close, prev, next]);

  return (
    <>
      {/* Filters */}
      <section className="container-max section-gap !py-10">
        <div className="flex gap-3 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-5 py-2 text-xs uppercase tracking-[0.1em] font-semibold rounded-full border transition-colors ${
                activeCategory === c ? "bg-primary text-surface border-primary" : "text-muted border-border hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="container-max section-gap !pt-0">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-0 space-y-0">
          {filtered.map((img, i) => (
            <div
              key={i}
              onClick={() => open(i)}
              className="group relative break-inside-avoid overflow-hidden cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-xs uppercase tracking-[0.1em] text-gold font-semibold">{img.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={close}>
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            className="absolute top-6 right-6 text-white/60 hover:text-white z-10"
            aria-label="Close"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white z-10"
            aria-label="Previous"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white z-10"
            aria-label="Next"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="relative w-full max-w-5xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              width={filtered[lightboxIndex].width}
              height={filtered[lightboxIndex].height}
              className="w-full h-full object-contain"
              sizes="90vw"
            />
            <p className="absolute bottom-0 left-0 right-0 text-center text-white/60 text-sm py-4">
              {filtered[lightboxIndex].category} — {lightboxIndex + 1} / {filtered.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
