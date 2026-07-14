import type { Metadata } from "next";
import GalleryClient from "@/components/GalleryClient";
import { getGalleryAll } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery — Timeless Wedding Photography by Parinayam",
  description:
    "Explore our gallery of timeless Telugu weddings, candid portraits, bridal moments & celebrations captured by Ongole's finest photographer, Hareesh Mulluri.",
};

export default async function Gallery() {
  const items = await getGalleryAll();
  const images = items.map((item) => ({
    src: "src" in item ? (item as { src: string }).src : (item as { imageUrl: string }).imageUrl,
    alt: item.title,
    category: item.category,
    width: "width" in item ? (item as { width: number }).width : 1122,
    height: "height" in item ? (item as { height: number }).height : 1402,
  }));

  return (
    <>
      <section className="relative pt-[72px] overflow-hidden">
        <div className="absolute inset-0">
          <img src="/gallery5.png" alt="" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="container-max section-gap !pb-0 relative">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.15em] font-semibold text-gold mb-3">Gallery</p>
            <h1 className="font-[family-name:var(--font-serif)] text-[64px] leading-[72px] tracking-[-0.02em] font-bold text-primary mb-6">
              Our Work
            </h1>
            <p className="text-lg leading-relaxed text-muted max-w-2xl">
              Every frame tells a story. Browse through our collection of timeless moments.
            </p>
          </div>
        </div>
      </section>

      <GalleryClient images={images} />

      <section className="section-gap bg-primary text-center">
        <div className="container-max max-w-2xl">
          <h2 className="font-[family-name:var(--font-serif)] text-[40px] leading-[48px] font-semibold text-surface mb-6">
            Like what you see?
          </h2>
          <p className="text-surface/60 text-lg leading-relaxed mb-10">
            Let&apos;s create something beautiful together. Reach out to discuss your vision.
          </p>
          <a href="https://wa.me/918978936785" target="_blank" rel="noopener noreferrer" className="btn-gold-outline !text-gold !border-gold hover:!bg-gold hover:!text-primary">
            Book on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
