import Image from "next/image";
import Link from "next/link";
import ReviewCarousel from "@/components/ReviewCarousel";
import HomeGallery from "@/components/HomeGallery";
import ServiceCards3D from "@/components/ServiceCards3D";

const gallery = [
  { src: "/gallery1.png", alt: "Gallery 1", category: "Wedding Rituals", title: "Ananya & Rohit", width: 1122, height: 1402 },
  { src: "/gallery2.png", alt: "Gallery 2", category: "Macro Details", title: "The Vow", width: 1402, height: 1122 },
  { src: "/gallery3.png", alt: "Gallery 3", category: "Portrait Session", title: "Heritage Love", width: 1136, height: 1385 },
  { src: "/gallery4.png", alt: "Gallery 4", category: "Candid Moments", title: "Sangeet Night", width: 1402, height: 1122 },
  { src: "/gallery5.png", alt: "Gallery 5", category: "Outdoor Session", title: "Golden Hour", width: 1536, height: 1024 },
  { src: "/gallery6.png", alt: "Gallery 6", category: "Bridal Portraits", title: "Anticipation", width: 1536, height: 1024 },
  { src: "/gallery7.png", alt: "Gallery 7", category: "Wedding", title: "Sacred Vows", width: 1023, height: 1537 },
  { src: "/gallery8.png", alt: "Gallery 8", category: "Portrait", title: "Grace", width: 891, height: 885 },
  { src: "/gallery9.png", alt: "Gallery 9", category: "Bridal", title: "Radiance", width: 1023, height: 1537 },
];

const process = [
  { step: "01", title: "Connect", desc: "Share your vision with us over a call. We discuss dates, venues, and the moments that matter most to you." },
  { step: "02", title: "Plan", desc: "We curate a custom shot list, scout locations, and coordinate every detail for a seamless experience." },
  { step: "03", title: "Capture", desc: "On your day, we blend in and document. Unscripted, unobtrusive, focused entirely on the real moments." },
  { step: "04", title: "Deliver", desc: "Within weeks, you receive a hand-edited digital gallery and a bespoke heirloom album." },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Parinayam Photography",
            image: "https://parinayam-rose.vercel.app/og-image.jpg",
            "@id": "https://parinayam-rose.vercel.app",
            url: "https://parinayam-rose.vercel.app",
            telephone: "+918978936785",
            description:
              "Ongole's finest wedding photographer. 4.9-star rated, 10+ years capturing timeless Telugu celebrations.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Shop no 208, Vijaya Complex",
              addressLocality: "Ongole",
              addressRegion: "Andhra Pradesh",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 15.5057,
              longitude: 80.0499,
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "09:00",
              closes: "18:00",
            },
            sameAs: [
              "https://www.instagram.com/parinayamphoto/",
              "https://maps.app.goo.gl/tpCAkGsJYLv8acEN8",
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "430",
              bestRating: "5",
            },
            priceRange: "$$",
            founder: {
              "@type": "Person",
              name: "Hareesh Mulluri",
              jobTitle: "CEO & Lead Photographer",
            },
          }),
        }}
      />
      {/* Hero */}
      <section className="relative pt-[72px] min-h-screen overflow-hidden">
        <Image
          src="/homepage.png"
          alt="Wedding celebration"
          fill
          priority
          className="hidden md:block object-cover"
          sizes="100vw"
        />
        <Image
          src="/homepagemobile.png"
          alt="Wedding celebration"
          fill
          priority
          className="block md:hidden object-cover"
          sizes="100vw"
        />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-gold text-xs uppercase tracking-[0.2em]">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </section>

      {/* About Photographer */}
      <section className="section-gap bg-surface-dim">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative overflow-hidden rounded">
                <Image
                  src="/hero1.png"
                  alt="Photographer Hareesh"
                  width={1254}
                  height={1254}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-primary/80 text-center py-4">
                  <p className="text-surface text-sm font-semibold">Hareesh Mulluri</p>
                  <p className="text-gold text-xs uppercase tracking-[0.1em]">CEO & Lead Photographer</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] font-semibold text-gold mb-3">
                Meet Your Photographer
              </p>
              <h2 className="font-[family-name:var(--font-serif)] text-[40px] leading-[48px] font-semibold text-primary mb-6">
                Crafting visual legacies through the lens of Hareesh.
              </h2>
              <div className="flex gap-6 mb-6">
                <div className="text-center">
                  <div className="font-[family-name:var(--font-serif)] text-3xl text-gold">10+</div>
                  <div className="text-xs text-muted mt-1 uppercase tracking-widest">Years</div>
                </div>
                <div className="w-px bg-border/50" />
                <div className="text-center">
                  <div className="font-[family-name:var(--font-serif)] text-3xl text-gold">430+</div>
                  <div className="text-xs text-muted mt-1 uppercase tracking-widest">Couples</div>
                </div>
                <div className="w-px bg-border/50" />
                <div className="text-center">
                  <div className="font-[family-name:var(--font-serif)] text-3xl text-gold">4.9</div>
                  <div className="text-xs text-muted mt-1 uppercase tracking-widest">Rating</div>
                </div>
              </div>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  At Parinayam Photography, we believe every wedding is a unique symphony of emotions. Led by Hareesh, our team brings over a decade of expertise in capturing the authentic, unscripted moments that define your celebration.
                </p>
                <p>
                  Based in Ongole, we specialize in luxury wedding documentation that blends traditional reverence with contemporary editorial finesse. Our approach is unobtrusive yet intentional — ensuring that every fleeting glance and heartfelt laugh is preserved forever.
                </p>
              </div>
              <Link href="/about" className="inline-flex items-center gap-2 mt-8 text-sm uppercase tracking-[0.05em] font-semibold text-primary hover:text-gold transition-colors">
                Discover Our Story arrow_forward
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="section-gap">
        <div className="container-max">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] font-semibold text-gold mb-2">Our Portfolio</p>
              <h2 className="font-[family-name:var(--font-serif)] text-[40px] leading-[48px] font-semibold text-primary">
                A Gallery of Celebrations
              </h2>
            </div>
            <Link href="/portfolio" className="hidden md:inline-flex items-center gap-2 text-sm uppercase tracking-[0.05em] font-semibold text-primary hover:text-gold transition-colors">
              See All Stories
            </Link>
          </div>
          <HomeGallery items={gallery} />
          <div className="text-center mt-12">
            <Link href="/gallery" className="btn-primary">
              View My Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-gap bg-surface-dim">
        <div className="container-max">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.15em] font-semibold text-gold mb-2">What We Offer</p>
            <h2 className="font-[family-name:var(--font-serif)] text-[40px] leading-[48px] font-semibold text-primary">
              Our Services
            </h2>
          </div>
          <ServiceCards3D
            cards={[
              { title: "Bridal Photography", description: "Elegant bridal portraits that capture every detail of your special day, from the intricate jewellery to the joyous tears.", img: "/gallery1.png" },
              { title: "Engagement Photography", description: "Beautiful engagement shoots that tell your love story against stunning backdrops.", img: "/gallery3.png" },
              { title: "Candid Photography", description: "Natural, unposed moments that reflect genuine emotions — the laughter, the tears, the pure joy.", img: "/gallery2.png" },
              { title: "Wedding Cinematography", description: "Cinematic wedding films that bring your most cherished memories to life with stunning visuals.", img: "/gallery5.png" },
              { title: "Pre-Wedding Shoot", description: "Creative pre-wedding sessions at handpicked locations that capture your unique bond.", img: "/gallery7.png" },
              { title: "Event Photography", description: "Professional coverage for engagements, receptions, and all your special celebrations.", img: "/gallery4.png" },
            ]}
          />
        </div>
      </section>

      {/* Process */}
      <section className="section-gap bg-surface-dim">
        <div className="container-max">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.15em] font-semibold text-gold mb-2">How We Work</p>
            <h2 className="font-[family-name:var(--font-serif)] text-[40px] leading-[48px] font-semibold text-primary">
              From first hello to final delivery.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((p, i) => (
              <div key={p.step} className="relative text-center">
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-border/50" />
                )}
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gold flex items-center justify-center">
                  <span className="font-[family-name:var(--font-serif)] text-xl text-surface">{p.step}</span>
                </div>
                <h3 className="font-[family-name:var(--font-serif)] text-lg text-primary mb-3">{p.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews Carousel */}
      <section className="section-gap">
        <div className="container-max">
          <div className="flex items-center gap-3 mb-8">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            <div>
              <h2 className="font-[family-name:var(--font-serif)] text-2xl text-primary">Google Reviews</h2>
              <div className="flex items-center gap-2 text-sm text-muted">
                <span className="text-gold font-semibold">4.9</span>
                <span className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FBBC04"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </span>
              </div>
            </div>
          </div>
          <ReviewCarousel
            reviews={[
              { text: "The best wedding photography team we could have asked for. Hareesh captured every emotion perfectly.", name: "Sowmya & Karthik", date: "2 months ago", rating: 5 },
              { text: "Extremely professional and easy to work with. They made us feel so comfortable, and the results exceeded expectations.", name: "Priya & Vikram", date: "3 months ago", rating: 5 },
              { text: "Their eye for detail is incredible. Timeless photos we will cherish for a lifetime. Highly recommended!", name: "Deepika & Sandeep", date: "1 month ago", rating: 5 },
              { text: "Booked them for our destination wedding in Goa. They captured the beach vibes so beautifully.", name: "Ananya & Rohit", date: "5 months ago", rating: 5 },
              { text: "From the pre-wedding shoot to the reception, every photo tells a story. Pure magic!", name: "Meera & Sravan", date: "4 months ago", rating: 5 },
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap bg-primary">
        <div className="container-max text-center max-w-2xl">
          <h2 className="font-[family-name:var(--font-serif)] text-[40px] leading-[48px] font-semibold text-surface mb-6">
            Let&rsquo;s Tell Your Story Together.
          </h2>
          <p className="text-surface/60 text-lg leading-relaxed mb-10">
            Our calendar fills up quickly, especially during the wedding season. Get in touch today to check availability for your special date.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="https://wa.me/918978936785" target="_blank" rel="noopener noreferrer" className="btn-gold-outline !text-gold !border-gold hover:!bg-gold hover:!text-primary">
              Inquire via WhatsApp
            </a>
            <Link href="/portfolio" className="btn-outline !text-surface !border-surface/30 hover:!border-surface">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
