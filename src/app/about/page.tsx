import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Hareesh Mulluri, Ongole's Finest Wedding Photographer",
  description:
    "Meet Hareesh Mulluri, CEO & Lead Photographer at Parinayam Photography. 10+ years, 500+ weddings, 2000+ happy clients across Ongole, Andhra Pradesh & worldwide.",
};

export default function About() {
  return (
    <section className="pt-[72px]">
      <div className="container-max section-gap !pb-0">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.15em] font-semibold text-gold mb-3">About</p>
          <h1 className="font-[family-name:var(--font-serif)] text-[64px] leading-[72px] tracking-[-0.02em] font-bold text-primary mb-6">
            The Story Behind the Lens
          </h1>
        </div>
      </div>

      <div className="container-max section-gap !pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-[family-name:var(--font-serif)] text-[40px] leading-[48px] font-semibold text-primary mb-6">
              We Are Parinayam
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Parinayam means &ldquo;union&rdquo; in Sanskrit — a name that reflects our philosophy:
                the perfect union of light, emotion, and moment. We believe photography is not just
                about taking pictures; it&apos;s about preserving feelings.
              </p>
              <p>
                With over a decade of experience capturing weddings, portraits, and events across
                India, we bring a refined eye and an editorial approach to every frame. Our work is
                characterized by rich tones, natural light, and a deep respect for tradition.
              </p>
              <p>
                When you work with Parinayam, you&apos;re not just hiring a photographer — you&apos;re
                inviting us to become part of your story. We invest ourselves in every celebration,
                every portrait, every fleeting glance that deserves to be remembered.
              </p>
            </div>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded">
            <Image
              src="/hero1.png"
              alt="Photographer at work"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      <div className="container-max">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-y border-border/30">
          {[
            { value: "10+", label: "Years Experience" },
            { value: "500+", label: "Weddings Captured" },
            { value: "2000+", label: "Happy Clients" },
            { value: "15", label: "Awards Won" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center py-10 border-r border-border/30 last:border-r-0"
            >
              <div className="font-[family-name:var(--font-serif)] text-4xl text-gold mb-2">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-[0.05em] font-semibold text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-max section-gap !pt-14 text-center max-w-3xl">
        <h2 className="font-[family-name:var(--font-serif)] text-[40px] leading-[48px] font-semibold text-primary mb-6">
          Our Philosophy
        </h2>
        <p className="text-muted leading-relaxed mb-6">
          We don&apos;t chase trends. We chase light. We look for the unscripted laughter, the
          tearful embraces, the quiet moments between the chaos. Every photograph we deliver is
          a piece of art — carefully composed, meticulously edited, and deeply felt.
        </p>
        <p className="text-muted leading-relaxed">
          Our style blends editorial sophistication with documentary authenticity. The result?
          Images that feel as real as the moments themselves — timeless, elegant, and true.
        </p>
      </div>
    </section>
  );
}
