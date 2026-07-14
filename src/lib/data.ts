import { db } from "./db";

export async function getServices() {
  try {
    const items = await db.service.findMany({ orderBy: { order: "asc" } });
    if (items.length > 0) return items;
  } catch {}
  return [
    { id: "1", title: "Bridal Photography", description: "Elegant bridal portraits that capture every detail of your special day, from the intricate jewellery to the joyous tears.", imageUrl: "/gallery1.png", order: 0 },
    { id: "2", title: "Engagement Photography", description: "Beautiful engagement shoots that tell your love story against stunning backdrops.", imageUrl: "/gallery3.png", order: 1 },
    { id: "3", title: "Candid Photography", description: "Natural, unposed moments that reflect genuine emotions — the laughter, the tears, the pure joy.", imageUrl: "/gallery2.png", order: 2 },
    { id: "4", title: "Wedding Cinematography", description: "Cinematic wedding films that bring your most cherished memories to life with stunning visuals.", imageUrl: "/gallery5.png", order: 3 },
    { id: "5", title: "Pre-Wedding Shoot", description: "Creative pre-wedding sessions at handpicked locations that capture your unique bond.", imageUrl: "/gallery7.png", order: 4 },
    { id: "6", title: "Event Photography", description: "Professional coverage for engagements, receptions, and all your special celebrations.", imageUrl: "/gallery4.png", order: 5 },
  ];
}

export async function getGalleryFeatured() {
  try {
    const items = await db.gallery.findMany({ where: { featured: true }, orderBy: { order: "asc" }, take: 9 });
    if (items.length > 0) return items;
  } catch {}
  return [
    { id: "1", title: "Gallery 1", category: "Wedding Rituals", imageUrl: "/gallery1.png", featured: true, order: 0 },
    { id: "2", title: "Gallery 2", category: "Macro Details", imageUrl: "/gallery2.png", featured: true, order: 1 },
    { id: "3", title: "Gallery 3", category: "Portrait Session", imageUrl: "/gallery3.png", featured: true, order: 2 },
    { id: "4", title: "Gallery 4", category: "Candid Moments", imageUrl: "/gallery4.png", featured: true, order: 3 },
    { id: "5", title: "Gallery 5", category: "Outdoor Session", imageUrl: "/gallery5.png", featured: true, order: 4 },
    { id: "6", title: "Gallery 6", category: "Bridal Portraits", imageUrl: "/gallery6.png", featured: true, order: 5 },
    { id: "7", title: "Gallery 7", category: "Wedding", imageUrl: "/gallery7.png", featured: true, order: 6 },
    { id: "8", title: "Gallery 8", category: "Portrait", imageUrl: "/gallery8.png", featured: true, order: 7 },
    { id: "9", title: "Gallery 9", category: "Bridal", imageUrl: "/gallery9.png", featured: true, order: 8 },
  ];
}

export async function getGalleryAll() {
  try {
    const items = await db.gallery.findMany({ orderBy: { order: "asc" } });
    if (items.length > 0) return items;
  } catch {}
  return getGalleryFeatured();
}

export async function getReviews() {
  try {
    const items = await db.review.findMany({ orderBy: { createdAt: "desc" } });
    if (items.length > 0) return items;
  } catch {}
  return [
    { id: "1", name: "Sowmya & Karthik", text: "The best wedding photography team we could have asked for. Hareesh captured every emotion perfectly.", rating: 5, date: "2 months ago" },
    { id: "2", name: "Priya & Vikram", text: "Extremely professional and easy to work with. They made us feel so comfortable, and the results exceeded expectations.", rating: 5, date: "3 months ago" },
    { id: "3", name: "Deepika & Sandeep", text: "Their eye for detail is incredible. Timeless photos we will cherish for a lifetime. Highly recommended!", rating: 5, date: "1 month ago" },
    { id: "4", name: "Ananya & Rohit", text: "Booked them for our destination wedding in Goa. They captured the beach vibes so beautifully.", rating: 5, date: "5 months ago" },
    { id: "5", name: "Meera & Sravan", text: "From the pre-wedding shoot to the reception, every photo tells a story. Pure magic!", rating: 5, date: "4 months ago" },
  ];
}

export async function getSettings() {
  try {
    const items = await db.setting.findMany();
    if (items.length > 0) {
      const map: Record<string, string> = {};
      items.forEach((s) => (map[s.key] = s.value));
      return map;
    }
  } catch {}
  return {
    heroDesktop: "/homepage.png",
    heroMobile: "/homepagemobile.png",
    phone: "089789 36785",
    whatsapp: "918978936785",
    email: "hello@parinayam.com",
    address: "Shop no 208, Vijaya Complex, Ongole, AP",
    mapsUrl: "https://maps.app.goo.gl/tpCAkGsJYLv8acEN8",
    instagram: "https://www.instagram.com/parinayamphoto/",
  };
}
