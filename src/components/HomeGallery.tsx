"use client";

import Image from "next/image";
import { useLightbox } from "./useLightbox";

interface GalleryItem {
  src: string;
  alt: string;
  category: string;
  title: string;
  width: number;
  height: number;
}

export default function HomeGallery({ items }: { items: GalleryItem[] }) {
  const { open, lightbox } = useLightbox(items);

  return (
    <>
      <div className="columns-2 lg:columns-3 gap-0 space-y-0">
        {items.map((item, i) => (
          <div key={i} className="group break-inside-avoid relative overflow-hidden cursor-pointer" onClick={() => open(i)}>
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <p className="text-xs uppercase tracking-[0.1em] text-gold font-semibold">{item.category}</p>
              <p className="font-[family-name:var(--font-serif)] text-lg text-surface mt-1">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
      {lightbox}
    </>
  );
}
