"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

interface LightboxImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  label?: string;
}

export function useLightbox(images: LightboxImage[]) {
  const [index, setIndex] = useState<number | null>(null);
  const open = (i: number) => setIndex(i);
  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(() => setIndex((p) => (p !== null ? (p - 1 + images.length) % images.length : null)), [images.length]);
  const next = useCallback(() => setIndex((p) => (p !== null ? (p + 1) % images.length : null)), [images.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, prev, next]);

  const lightbox = index !== null && (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={close}>
      <button onClick={(e) => { e.stopPropagation(); close(); }} className="absolute top-6 right-6 text-white/60 hover:text-white z-10" aria-label="Close">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>
      <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white z-10" aria-label="Previous">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white z-10" aria-label="Next">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg>
      </button>
      <div className="relative w-full max-w-5xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
        <Image src={images[index].src} alt={images[index].alt} width={images[index].width} height={images[index].height} className="w-full h-full object-contain" sizes="90vw" />
        {images[index].label && <p className="absolute bottom-0 left-0 right-0 text-center text-white/60 text-sm py-4">{images[index].label} — {index + 1} / {images.length}</p>}
      </div>
    </div>
  );

  return { open, lightbox };
}
