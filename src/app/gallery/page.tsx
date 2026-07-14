import Image from "next/image";
import type { Metadata } from "next";
import GalleryClient from "@/components/GalleryClient";

export const metadata: Metadata = {
  title: "Gallery — Timeless Wedding Photography by Parinayam",
  description:
    "Explore our gallery of timeless Telugu weddings, candid portraits, bridal moments & celebrations captured by Ongole's finest photographer, Hareesh Mulluri.",
};

const images = [
  { src: "/gallery1.png", alt: "Gallery 1", category: "Weddings", width: 1122, height: 1402 },
  { src: "/gallery2.png", alt: "Gallery 2", category: "Weddings", width: 1402, height: 1122 },
  { src: "/gallery3.png", alt: "Gallery 3", category: "Portraits", width: 1136, height: 1385 },
  { src: "/gallery4.png", alt: "Gallery 4", category: "Events", width: 1402, height: 1122 },
  { src: "/gallery5.png", alt: "Gallery 5", category: "Details", width: 1536, height: 1024 },
  { src: "/gallery6.png", alt: "Gallery 6", category: "Weddings", width: 1536, height: 1024 },
  { src: "/gallery7.png", alt: "Gallery 7", category: "Portraits", width: 1023, height: 1537 },
  { src: "/gallery8.png", alt: "Gallery 8", category: "Details", width: 891, height: 885 },
  { src: "/gallery9.png", alt: "Gallery 9", category: "Weddings", width: 1023, height: 1537 },
];

export default function Gallery() {
  return (
    <>
      <section className="relative pt-[72px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/gallery5.png"
            alt=""
            fill
            className="object-cover opacity-30"
            sizes="100vw"
          />
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
