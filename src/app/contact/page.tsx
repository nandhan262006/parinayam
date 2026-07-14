import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Now — WhatsApp +91 89789 36785",
  description:
    "Book Ongole's finest wedding photographer via WhatsApp. Contact Hareesh Mulluri for weddings, pre-wedding shoots, cinematic films & event coverage. Studio in Ongole, AP.",
};

export default function Contact() {
  return (
    <>
      {/* Header */}
      <section className="relative pt-[72px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600&q=80"
            alt=""
            fill
            className="object-cover opacity-25"
            sizes="100vw"
          />
        </div>
        <div className="container-max section-gap !pb-0 relative">
        <div className="max-w-3xl mb-16">
          <p className="text-xs uppercase tracking-[0.15em] font-semibold text-gold mb-3">
            Capture Your Story
          </p>
          <h1 className="font-[family-name:var(--font-serif)] text-[64px] leading-[72px] tracking-[-0.02em] font-bold text-primary mb-6">
            Contact & Booking
          </h1>
          <p className="text-lg leading-relaxed text-muted">
            Timeless moments deserve an editorial eye. Reach out to us for your upcoming celebration.
          </p>
        </div>
      </div>
      </section>

      <div className="container-max section-gap !pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.1em] font-semibold text-gold mb-5">
                Contact Details
              </p>
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
                    <p className="text-sm text-primary font-medium">
                      Shop no 208, Vijaya Complex, Ongole, AP
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.1em] font-semibold text-gold mb-4">
                Follow Our Work
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/parinayamphoto/" target="_blank" rel="noopener noreferrer" className="text-primary/60 hover:text-gold transition-colors text-2xl">camera</a>
                <span className="text-primary/60 cursor-default text-2xl">videocam</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <p className="text-xs uppercase tracking-[0.1em] font-semibold text-gold mb-5">
              Inquire About Your Date
            </p>
            <form className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-[0.05em] font-semibold text-muted mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full bg-surface border-b border-border/50 px-0 py-3 text-sm text-primary placeholder:text-muted/40 outline-none focus:border-gold transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-[0.05em] font-semibold text-muted mb-2">
                    Event Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-surface border-b border-border/50 px-0 py-3 text-sm text-primary outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.05em] font-semibold text-muted mb-2">
                    Event Type
                  </label>
                  <select
                    defaultValue=""
                    className="w-full bg-surface border-b border-border/50 px-0 py-3 text-sm text-primary outline-none focus:border-gold transition-colors"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="wedding">Wedding Celebration</option>
                    <option value="engagement">Engagement Session</option>
                    <option value="pre-wedding">Pre-Wedding Shoot</option>
                    <option value="editorial">Editorial & Fashion</option>
                    <option value="other">Other Event</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.05em] font-semibold text-muted mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-surface border-b border-border/50 px-0 py-3 text-sm text-primary placeholder:text-muted/40 outline-none focus:border-gold transition-colors resize-none"
                  placeholder="Tell us about your event..."
                />
              </div>
              <button type="submit" className="btn-primary !text-xs">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="section-gap bg-primary text-center">
        <div className="container-max">
          <p className="font-[family-name:var(--font-serif)] text-3xl text-surface mb-2">
            Parinayam Photography
          </p>
          <p className="text-surface/60 text-sm">
            &copy; 2024 Parinayam Photography. Timeless Celebration. Dedicated to documenting the elegance of traditional stories through a modern editorial lens.
          </p>
        </div>
      </div>
    </>
  );
}
