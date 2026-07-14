"use client";

import { useState } from "react";
import Image from "next/image";

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
      <section className="relative pt-[72px] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/gallery4.png" alt="" fill className="object-cover opacity-25" sizes="100vw" />
        </div>
        <div className="container-max section-gap !pb-0 relative">
          <div className="max-w-3xl mb-16">
            <p className="text-xs uppercase tracking-[0.15em] font-semibold text-gold mb-3">Capture Your Story</p>
            <h1 className="font-[family-name:var(--font-serif)] text-[64px] leading-[72px] tracking-[-0.02em] font-bold text-primary mb-6">Contact & Booking</h1>
            <p className="text-lg leading-relaxed text-muted">Timeless moments deserve an editorial eye. Reach out to us for your upcoming celebration.</p>
          </div>
        </div>
      </section>

      <div className="container-max section-gap !pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.1em] font-semibold text-gold mb-5">Contact Details</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-gold text-2xl">call</span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.05em] text-muted">Phone</p>
                    <a href="https://wa.me/918978936785" target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-medium hover:text-gold transition-colors">089789 36785</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gold text-2xl">location_on</span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.05em] text-muted">Studio</p>
                    <a href="https://maps.app.goo.gl/tpCAkGsJYLv8acEN8" target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-medium hover:text-gold transition-colors">Shop no 208, Vijaya Complex, Ongole, AP</a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.1em] font-semibold text-gold mb-4">Follow Our Work</p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/parinayamphoto/" target="_blank" rel="noopener noreferrer" className="text-primary/60 hover:text-gold transition-colors text-2xl">camera</a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs uppercase tracking-[0.1em] font-semibold text-gold mb-5">Inquire About Your Date</p>

            {status === "sent" ? (
              <div className="bg-green-50 border border-green-200 rounded p-6 text-center">
                <p className="text-green-700 font-semibold text-lg mb-1">Thank you!</p>
                <p className="text-green-600 text-sm">We&apos;ll get back to you soon.</p>
                <button onClick={() => setStatus("idle")} className="mt-4 text-sm text-gold hover:underline">Send another inquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-[0.05em] font-semibold text-muted mb-2">Full Name</label>
                  <input name="name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full bg-surface border-b border-border/50 px-0 py-3 text-sm text-primary placeholder:text-muted/40 outline-none focus:border-gold transition-colors" placeholder="Your full name" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.05em] font-semibold text-muted mb-2">Email</label>
                    <input name="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-surface border-b border-border/50 px-0 py-3 text-sm text-primary outline-none focus:border-gold transition-colors" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.05em] font-semibold text-muted mb-2">Phone</label>
                    <input name="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-surface border-b border-border/50 px-0 py-3 text-sm text-primary outline-none focus:border-gold transition-colors" placeholder="Your phone number" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.05em] font-semibold text-muted mb-2">Event Date</label>
                    <input name="eventDate" type="date" value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })} className="w-full bg-surface border-b border-border/50 px-0 py-3 text-sm text-primary outline-none focus:border-gold transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.05em] font-semibold text-muted mb-2">Event Type</label>
                    <select name="eventType" value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })} className="w-full bg-surface border-b border-border/50 px-0 py-3 text-sm text-primary outline-none focus:border-gold transition-colors">
                      <option value="">Select an option</option>
                      <option value="wedding">Wedding Celebration</option>
                      <option value="engagement">Engagement Session</option>
                      <option value="pre-wedding">Pre-Wedding Shoot</option>
                      <option value="editorial">Editorial & Fashion</option>
                      <option value="other">Other Event</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.05em] font-semibold text-muted mb-2">Message</label>
                  <textarea name="message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full bg-surface border-b border-border/50 px-0 py-3 text-sm text-primary placeholder:text-muted/40 outline-none focus:border-gold transition-colors resize-none" placeholder="Tell us about your event..." />
                </div>
                {status === "error" && <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>}
                <button type="submit" disabled={status === "sending"} className="btn-primary !text-xs disabled:opacity-50">{status === "sending" ? "Sending..." : "Send Inquiry"}</button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="section-gap bg-primary text-center">
        <div className="container-max">
          <p className="font-[family-name:var(--font-serif)] text-3xl text-surface mb-2">Parinayam Photography</p>
          <p className="text-surface/60 text-sm">&copy; {new Date().getFullYear()} Parinayam Photography. Timeless Celebration.</p>
        </div>
      </div>
    </>
  );
}
