import Image from "next/image";
import type { Metadata } from "next";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "About — Hareesh Mulluri, Ongole's Finest Wedding Photographer",
  description:
    "Meet Hareesh Mulluri, CEO & Lead Photographer at Parinayam Photography. 10+ years, 500+ weddings, 2000+ happy clients across Ongole, Andhra Pradesh & worldwide.",
};

export default async function About() {
  const s = await getSettings();

  const heading = s.aboutHeading || "The Story Behind the Lens";
  const subheading = s.aboutSubheading || "We Are Parinayam";
  const body = s.aboutBody || "";
  const bodyParagraphs = body ? body.split("\n").filter(Boolean) : [
    "Parinayam means \u201Cunion\u201D in Sanskrit \u2014 a name that reflects our philosophy: the perfect union of light, emotion, and moment. We believe photography is not just about taking pictures; it\u2019s about preserving feelings.",
    "With over a decade of experience capturing weddings, portraits, and events across India, we bring a refined eye and an editorial approach to every frame. Our work is characterized by rich tones, natural light, and a deep respect for tradition.",
    "When you work with Parinayam, you\u2019re not just hiring a photographer \u2014 you\u2019re inviting us to become part of your story. We invest ourselves in every celebration, every portrait, every fleeting glance that deserves to be remembered.",
  ];
  const aboutImage = s.aboutImage || "/hero1.png";
  const philosophy = s.aboutPhilosophy || "Our Philosophy";
  const philText = s.aboutPhilText || "";
  const philParagraphs = philText ? philText.split("\n").filter(Boolean) : [
    "We don\u2019t chase trends. We chase light. We look for the unscripted laughter, the tearful embraces, the quiet moments between the chaos. Every photograph we deliver is a piece of art \u2014 carefully composed, meticulously edited, and deeply felt.",
    "Our style blends editorial sophistication with documentary authenticity. The result? Images that feel as real as the moments themselves \u2014 timeless, elegant, and true.",
  ];

  const stats = [
    { value: s.aboutStat1Value || "10+", label: s.aboutStat1Label || "Years Experience" },
    { value: s.aboutStat2Value || "500+", label: s.aboutStat2Label || "Weddings Captured" },
    { value: s.aboutStat3Value || "2000+", label: s.aboutStat3Label || "Happy Clients" },
    { value: s.aboutStat4Value || "15", label: s.aboutStat4Label || "Awards Won" },
  ];

  return (
    <section className="pt-[72px]">
      <div className="container-max section-gap !pb-0">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.15em] font-semibold text-gold mb-3">About</p>
          <h1 className="font-[family-name:var(--font-serif)] text-[64px] leading-[72px] tracking-[-0.02em] font-bold text-primary mb-6">
            {heading}
          </h1>
        </div>
      </div>

      <div className="container-max section-gap !pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-[family-name:var(--font-serif)] text-[40px] leading-[48px] font-semibold text-primary mb-6">
              {subheading}
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              {bodyParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded">
            <Image
              src={aboutImage}
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
          {stats.map((stat) => (
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
          {philosophy}
        </h2>
        {philParagraphs.map((p, i) => (
          <p key={i} className="text-muted leading-relaxed mb-6">{p}</p>
        ))}
      </div>
    </section>
  );
}
