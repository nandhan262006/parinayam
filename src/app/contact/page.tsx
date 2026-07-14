"use client";

import { useState } from "react";
import Image from "next/image";

const contactInfo = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: "Phone",
    value: "089789 36785",
    href: "https://wa.me/918978936785",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "hello@parinayam.com",
    href: "mailto:hello@parinayam.com",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Studio",
    value: "Shop no 208, Vijaya Complex, Ongole, AP",
    href: "https://maps.app.goo.gl/tpCAkGsJYLv8acEN8",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", eventType: "", eventDate: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", phone: "", eventType: "", eventDate: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <section className="relative pt-[72px] min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/gallery4.png" alt="" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="container-max relative py-24 text-center">
          <p className="text-xs uppercase tracking-[0.15em] font-semibold text-gold mb-4">Get In Touch</p>
          <h1 className="font-[family-name:var(--font-serif)] text-[56px] md:text-[72px] leading-[1.1] tracking-[-0.02em] font-bold text-surface mb-6">
            Let&rsquo;s Create<br />Something Beautiful
          </h1>
          <p className="text-surface/60 text-lg max-w-xl mx-auto leading-relaxed">
            Your story deserves to be told. Reach out and let&rsquo;s begin the conversation about your upcoming celebration.
          </p>
        </div>
      </section>

      <section className="container-max section-gap !pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-16 relative z-10">
          {contactInfo.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface border border-border/30 rounded-xl p-6 hover:border-gold/50 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-surface transition-all">
                {item.icon}
              </div>
              <p className="text-xs uppercase tracking-[0.1em] font-semibold text-muted mb-1">{item.label}</p>
              <p className="text-sm text-primary font-medium leading-relaxed group-hover:text-gold transition-colors">{item.value}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="container-max section-gap !pt-6">
        <div className="bg-surface border border-border/30 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 lg:p-14">
              <p className="text-xs uppercase tracking-[0.15em] font-semibold text-gold mb-2">Inquire About Your Date</p>
              <h2 className="font-[family-name:var(--font-serif)] text-[32px] leading-[40px] font-semibold text-primary mb-8">
                Tell us about your event
              </h2>

              {status === "sent" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <p className="text-primary font-semibold text-xl mb-2">Thank You!</p>
                  <p className="text-muted text-sm mb-6">We&apos;ll get back to you within 24 hours.</p>
                  <button onClick={() => setStatus("idle")} className="text-gold text-sm font-medium hover:underline">Send another inquiry</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.05em] font-semibold text-muted mb-2">Full Name *</label>
                      <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full bg-background border border-border/50 rounded-lg px-4 py-3 text-sm text-primary placeholder:text-muted/40 outline-none focus:border-gold transition-colors" placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.05em] font-semibold text-muted mb-2">Phone</label>
                      <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-background border border-border/50 rounded-lg px-4 py-3 text-sm text-primary outline-none focus:border-gold transition-colors" placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.05em] font-semibold text-muted mb-2">Email</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-background border border-border/50 rounded-lg px-4 py-3 text-sm text-primary outline-none focus:border-gold transition-colors" placeholder="your@email.com" />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.05em] font-semibold text-muted mb-2">Event Date</label>
                      <input type="date" value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })} className="w-full bg-background border border-border/50 rounded-lg px-4 py-3 text-sm text-primary outline-none focus:border-gold transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.05em] font-semibold text-muted mb-2">Event Type</label>
                      <select value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })} className="w-full bg-background border border-border/50 rounded-lg px-4 py-3 text-sm text-primary outline-none focus:border-gold transition-colors">
                        <option value="">Select type</option>
                        <option value="wedding">Wedding</option>
                        <option value="engagement">Engagement</option>
                        <option value="pre-wedding">Pre-Wedding</option>
                        <option value="editorial">Editorial</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.05em] font-semibold text-muted mb-2">Message</label>
                    <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full bg-background border border-border/50 rounded-lg px-4 py-3 text-sm text-primary placeholder:text-muted/40 outline-none focus:border-gold transition-colors resize-none" placeholder="Tell us about your vision..." />
                  </div>
                  {status === "error" && <p className="text-red-500 text-xs">Something went wrong. Please try again.</p>}
                  <button type="submit" disabled={status === "sending"} className="btn-primary w-full !text-xs disabled:opacity-50">
                    {status === "sending" ? "Sending..." : "Send Inquiry"}
                  </button>
                </form>
              )}
            </div>

            <div className="relative hidden lg:block bg-primary">
              <Image src="/gallery3.png" alt="" fill className="object-cover opacity-40" sizes="50vw" />
              <div className="relative z-10 p-14 flex flex-col justify-end h-full">
                <div className="space-y-8">
                  <div>
                    <p className="text-gold text-sm uppercase tracking-[0.1em] font-semibold mb-2">Follow Along</p>
                    <div className="flex gap-3">
                      <a href="https://www.instagram.com/parinayamphoto?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-surface/20 flex items-center justify-center text-surface/70 hover:bg-gold hover:text-surface hover:border-gold transition-all">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" /></svg>
                      </a>
                      <a href="https://wa.me/918978936785" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-surface/20 flex items-center justify-center text-surface/70 hover:bg-gold hover:text-surface hover:border-gold transition-all">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-serif)] text-3xl text-surface mb-2">Follow on Instagram</p>
                    <a href="https://www.instagram.com/parinayamphoto?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-gold text-sm font-medium hover:underline">
                      @parinayamphoto &rarr;
                    </a>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-serif)] text-3xl text-surface mb-1">Prefer a call?</p>
                    <a href="https://wa.me/918978936785" className="text-surface/60 text-sm hover:text-gold transition-colors">
                      WhatsApp us directly for faster booking &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-gap bg-primary text-center">
        <div className="container-max">
          <p className="font-[family-name:var(--font-serif)] text-3xl text-surface mb-2">Parinayam Photography</p>
          <p className="text-surface/60 text-sm">&copy; {new Date().getFullYear()} Parinayam Photography. Timeless Celebration.</p>
        </div>
      </div>
    </>
  );
}
