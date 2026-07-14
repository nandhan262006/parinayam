import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import "dotenv/config";

const adapter = new PrismaLibSQL({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...\n");

  // Services
  const services = [
    { title: "Bridal Photography", description: "Elegant bridal portraits that capture every detail of your special day, from the intricate jewellery to the joyous tears.", imageUrl: "/gallery1.png", order: 0 },
    { title: "Engagement Photography", description: "Beautiful engagement shoots that tell your love story against stunning backdrops.", imageUrl: "/gallery3.png", order: 1 },
    { title: "Candid Photography", description: "Natural, unposed moments that reflect genuine emotions — the laughter, the tears, the pure joy.", imageUrl: "/gallery2.png", order: 2 },
    { title: "Wedding Cinematography", description: "Cinematic wedding films that bring your most cherished memories to life with stunning visuals.", imageUrl: "/gallery5.png", order: 3 },
    { title: "Pre-Wedding Shoot", description: "Creative pre-wedding sessions at handpicked locations that capture your unique bond.", imageUrl: "/gallery7.png", order: 4 },
    { title: "Event Photography", description: "Professional coverage for engagements, receptions, and all your special celebrations.", imageUrl: "/gallery4.png", order: 5 },
  ];

  for (const s of services) {
    await db.service.create({ data: s });
    console.log(`  ✓ Service: ${s.title}`);
  }

  // Gallery
  const gallery = [
    { title: "Ananya & Rohit", category: "Wedding Rituals", imageUrl: "/gallery1.png", featured: true, order: 0 },
    { title: "The Vow", category: "Macro Details", imageUrl: "/gallery2.png", featured: true, order: 1 },
    { title: "Heritage Love", category: "Portrait Session", imageUrl: "/gallery3.png", featured: true, order: 2 },
    { title: "Sangeet Night", category: "Candid Moments", imageUrl: "/gallery4.png", featured: true, order: 3 },
    { title: "Golden Hour", category: "Outdoor Session", imageUrl: "/gallery5.png", featured: true, order: 4 },
    { title: "Anticipation", category: "Bridal Portraits", imageUrl: "/gallery6.png", featured: true, order: 5 },
    { title: "Sacred Vows", category: "Wedding", imageUrl: "/gallery7.png", featured: true, order: 6 },
    { title: "Grace", category: "Portrait", imageUrl: "/gallery8.png", featured: true, order: 7 },
    { title: "Radiance", category: "Bridal", imageUrl: "/gallery9.png", featured: true, order: 8 },
  ];

  for (const g of gallery) {
    await db.gallery.create({ data: g });
    console.log(`  ✓ Gallery: ${g.title} ${g.featured ? "⭐" : ""}`);
  }

  // Reviews
  const reviews = [
    { name: "Sowmya & Karthik", text: "The best wedding photography team we could have asked for. Hareesh captured every emotion perfectly.", rating: 5, date: "2 months ago" },
    { name: "Priya & Vikram", text: "Extremely professional and easy to work with. They made us feel so comfortable, and the results exceeded expectations.", rating: 5, date: "3 months ago" },
    { name: "Deepika & Sandeep", text: "Their eye for detail is incredible. Timeless photos we will cherish for a lifetime. Highly recommended!", rating: 5, date: "1 month ago" },
    { name: "Ananya & Rohit", text: "Booked them for our destination wedding in Goa. They captured the beach vibes so beautifully.", rating: 5, date: "5 months ago" },
    { name: "Meera & Sravan", text: "From the pre-wedding shoot to the reception, every photo tells a story. Pure magic!", rating: 5, date: "4 months ago" },
  ];

  for (const r of reviews) {
    await db.review.create({ data: r });
    console.log(`  ✓ Review: ${r.name}`);
  }

  // Settings
  const settings = [
    { key: "heroDesktop", value: "/homepage.png" },
    { key: "heroMobile", value: "/homepagemobile.png" },
    { key: "phone", value: "089789 36785" },
    { key: "whatsapp", value: "918978936785" },
    { key: "email", value: "hello@parinayam.com" },
    { key: "address", value: "Shop no 208, Vijaya Complex, Ongole, AP" },
    { key: "mapsUrl", value: "https://maps.app.goo.gl/tpCAkGsJYLv8acEN8" },
    { key: "instagram", value: "https://www.instagram.com/parinayamphoto/" },
  ];

  for (const s of settings) {
    await db.setting.upsert({ where: { key: s.key }, update: { value: s.value }, create: s });
    console.log(`  ✓ Setting: ${s.key}`);
  }

  // Stats
  const [svc, gal, rev, set] = await Promise.all([
    db.service.count(), db.gallery.count(), db.review.count(), db.setting.count(),
  ]);

  console.log(`\n✅ Seeded: ${svc} services, ${gal} gallery, ${rev} reviews, ${set} settings`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
