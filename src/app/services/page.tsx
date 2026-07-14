import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Wedding Photography, Cinematography & More",
  description:
    "Ongole's finest wedding photography, cinematic films, aerial drone coverage & pre-wedding shoots. Transparent pricing starting at $650. Book via WhatsApp.",
};

const services = [
  {
    icon: "camera",
    title: "Wedding & Engagement",
    desc: "Comprehensive documentation of your union, capturing the shared glances and monumental vows in high-definition emotion.",
    link: "Learn More",
  },
  {
    icon: "flight",
    title: "Aerial Photography",
    desc: "A cinematic bird's-eye perspective of your venue and grand entrance using high-precision drone technology.",
    link: "Learn More",
  },
  {
    icon: "beach_access",
    title: "Beach Weddings",
    desc: "Expertly lit coastal celebrations where we manage challenging seaside lighting to deliver pristine, airy memories.",
    link: "Learn More",
  },
  {
    icon: "photo_camera",
    title: "Pre-wedding Shoots",
    desc: "Your story before the 'I Do', told through curated lifestyle portraits in meaningful locations.",
    link: "Learn More",
  },
  {
    icon: "business_center",
    title: "Corporate Excellence",
    desc: "Gala dinners, award ceremonies, and high-stakes networking events captured with professional discretion and brand-aligned clarity.",
    link: "Learn More",
  },
];

const plans = [
  {
    icon: "favorite",
    title: "Wedding Collections",
    desc: "From intimate 6-hour elopements to full multi-day destination wedding coverage.",
    features: [
      "2 Lead Photographers",
      "High-Res Digital Gallery",
      "Heirloom Wedding Album",
      "Online Print Store Access",
    ],
    price: "Starting at $3,500",
    action: "View Full Guide",
  },
  {
    icon: "camera",
    title: "Portrait Sessions",
    desc: "Dedicated sessions for engagements, anniversaries, or high-end personal branding.",
    features: [
      "90 Minute Session",
      "Location Consultation",
      "30 Edited Digital Images",
      "Style Guide Access",
    ],
    price: "Starting at $650",
    action: "Book a Session",
  },
];

export default function Services() {
  return (
    <>
      {/* Header */}
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
            <p className="text-xs uppercase tracking-[0.15em] font-semibold text-gold mb-3">
              Crafting Visual Legacies
            </p>
            <h1 className="font-[family-name:var(--font-serif)] text-[64px] leading-[72px] tracking-[-0.02em] font-bold text-primary mb-6">
              Our Specialized Services
            </h1>
            <p className="text-lg leading-relaxed text-muted">
              From the quiet intimacy of pre-wedding moments to the grand spectacle of the main event, we document every heartbeat of your celebration with an editorial eye.
            </p>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="container-max section-gap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30 overflow-hidden rounded">
          {services.map((s) => (
            <div key={s.title} className="bg-surface p-8 flex flex-col">
              <span className="text-gold text-4xl mb-6">{s.icon}</span>
              <h3 className="font-[family-name:var(--font-serif)] text-xl text-primary mb-3">{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed mb-6 flex-1">{s.desc}</p>
              <Link
                href="https://wa.me/918978936785" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.05em] font-semibold text-primary hover:text-gold transition-colors"
              >
                {s.link}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="section-gap bg-surface-dim">
        <div className="container-max">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.15em] font-semibold text-gold mb-2">
              Investment Collections
            </p>
            <h2 className="font-[family-name:var(--font-serif)] text-[40px] leading-[48px] font-semibold text-primary">
              Transparent pricing for timeless art
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div key={plan.title} className="bg-surface border border-border/20 rounded p-8">
                <span className="text-gold text-3xl mb-4 block">{plan.icon}</span>
                <h3 className="font-[family-name:var(--font-serif)] text-2xl text-primary mb-3">{plan.title}</h3>
                <p className="text-sm text-muted mb-6">{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-primary">
                      <span className="text-gold text-base">check</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="font-[family-name:var(--font-serif)] text-xl text-gold mb-6">{plan.price}</div>
                <Link
                  href="https://wa.me/918978936785" target="_blank" rel="noopener noreferrer"
                  className="btn-primary w-full justify-center !text-xs"
                >
                  {plan.action}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap">
        <div className="container-max text-center max-w-2xl">
          <h2 className="font-[family-name:var(--font-serif)] text-[40px] leading-[48px] font-semibold text-primary mb-6">
            Ready to capture your story?
          </h2>
          <p className="text-muted text-lg leading-relaxed mb-10">
            We are currently accepting bookings for the 2024 & 2025 wedding seasons. Let&apos;s create something timeless together.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="https://wa.me/918978936785" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Contact Us
            </Link>
            <Link href="https://wa.me/918978936785" target="_blank" rel="noopener noreferrer" className="btn-gold-outline">
              Check Availability
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
