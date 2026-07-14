"use client";

import Image from "next/image";
import Link from "next/link";
import { useLightbox } from "@/components/useLightbox";

const allImages = [
  { src: "/gallery1.png", alt: "Anjali's Grand Entrance", label: "Traditional Wedding", width: 1122, height: 1402 },
  { src: "/gallery2.png", alt: "Sravan & Meera", label: "The Talambralu Moment", width: 1402, height: 1122 },
  { src: "/gallery3.png", alt: "Promises Made", label: "Engagement Session", width: 1136, height: 1385 },
  { src: "/gallery4.png", alt: "Vikas", label: "Cinematic Portrait", width: 1402, height: 1122 },
  { src: "/gallery5.png", alt: "Into Forever", label: "Fine Art Photography", width: 1536, height: 1024 },
  { src: "/gallery6.png", alt: "Celebration", label: "Candid Moments", width: 1536, height: 1024 },
  { src: "/gallery7.png", alt: "Sacred", label: "Traditional Ceremony", width: 1023, height: 1537 },
  { src: "/gallery8.png", alt: "Grace", label: "Editorial Portrait", width: 891, height: 885 },
  { src: "/gallery9.png", alt: "Radiance", label: "Bridal Session", width: 1023, height: 1537 },
];

const filters = ["All", "Weddings", "Engagement", "Portraits", "Cinematic"];

const stories = [
  { city: "Hyderabad", year: "2023", title: "The Palace Affair: Karthik & Swathi", desc: "A three-day celebration of heritage and modern luxury at the Taj Falaknuma Palace, capturing the essence of royal Nizami charm.", src: "/gallery2.png" },
  { city: "Vizag", year: "2024", title: "Sun-Kissed Rituals: Rahul & Divya", desc: "A vibrant seaside wedding focusing on the intimate rituals and the raw emotional energy of two families coming together.", src: "/gallery4.png" },
  { city: "Bangalore", year: "2023", title: "Urban Enchantment: Arjun & Priya", desc: "Modern silhouettes meet traditional roots in this sophisticated city wedding that pushed the boundaries of light and shadow.", src: "/gallery5.png" },
];

export default function Portfolio() {
  const { open, lightbox } = useLightbox(allImages);

  return (
    <>
      <section className="relative pt-[72px] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/gallery5.png" alt="" fill className="object-cover opacity-30" sizes="100vw" />
        </div>
        <div className="container-max section-gap !pb-0 relative">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.15em] font-semibold text-gold mb-3">Our Portfolio</p>
            <h1 className="font-[family-name:var(--font-serif)] text-[64px] leading-[72px] tracking-[-0.02em] font-bold text-primary mb-6">
              A Legacy of Love
            </h1>
            <p className="text-lg leading-relaxed text-muted max-w-2xl">
              We document the poetry of human connection. From the quiet shared glances to the grand festive rhythms of traditional Telugu ceremonies, our lens preserves the timelessness of your most precious celebrations.
            </p>
          </div>
        </div>
      </section>

      <section className="container-max section-gap !py-10">
        <div className="flex gap-3 flex-wrap">
          {filters.map((f) => (
            <button key={f} className={`px-5 py-2 text-xs uppercase tracking-[0.1em] font-semibold rounded-full border transition-colors ${f === "All" ? "bg-primary text-surface border-primary" : "text-muted border-border hover:border-primary hover:text-primary"}`}>
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="container-max !pt-0">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-0 space-y-0">
          {allImages.map((img, i) => (
            <div key={i} onClick={() => open(i)} className="group relative break-inside-avoid overflow-hidden cursor-pointer">
              <Image src={img.src} alt={img.alt} width={img.width} height={img.height} className="w-full h-auto transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-xs uppercase tracking-[0.1em] text-gold font-semibold">{img.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-gap">
        <div className="container-max">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] font-semibold text-gold mb-2">Narratives</p>
              <h2 className="font-[family-name:var(--font-serif)] text-[40px] leading-[48px] font-semibold text-primary">Featured Stories</h2>
            </div>
            <span className="hidden md:inline-flex items-center gap-2 text-sm uppercase tracking-[0.05em] font-semibold text-primary">View All Stories</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {stories.map((s) => (
              <div key={s.title} className="group cursor-pointer">
                <div className="relative aspect-[16/10] overflow-hidden rounded mb-5">
                  <Image src={s.src} alt={s.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 33vw" />
                </div>
                <p className="text-xs uppercase tracking-[0.1em] text-gold font-semibold mb-2">{s.city} &bull; {s.year}</p>
                <h3 className="font-[family-name:var(--font-serif)] text-xl leading-relaxed text-primary mb-2 group-hover:text-gold transition-colors">{s.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-gap bg-primary">
        <div className="container-max text-center max-w-2xl">
          <h2 className="font-[family-name:var(--font-serif)] text-[40px] leading-[48px] font-semibold text-surface mb-6">Start Your Story</h2>
          <p className="text-surface/60 text-lg leading-relaxed mb-10">Your wedding is a once-in-a-lifetime masterpiece. Let us help you preserve it for generations to come with our signature editorial style.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="https://wa.me/918978936785" target="_blank" rel="noopener noreferrer" className="btn-gold-outline !text-gold !border-gold hover:!bg-gold hover:!text-primary">Book on WhatsApp</a>
            <Link href="/portfolio" className="btn-outline !text-surface !border-surface/30 hover:!border-surface">Download Brochure</Link>
          </div>
        </div>
      </section>

      {lightbox}
    </>
  );
}
