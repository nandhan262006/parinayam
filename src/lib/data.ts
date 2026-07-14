import { unstable_cache as nextCache } from "next/cache";
import { db } from "./db";

export const getServices = nextCache(
  async () => {
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
  },
  ["services"],
  { revalidate: 60, tags: ["services"] }
);

export const getGalleryFeatured = nextCache(
  async () => {
    try {
      const items = await db.gallery.findMany({
        where: { featured: true },
        orderBy: { order: "asc" },
        take: 9,
      });
      if (items.length > 0) {
        return items.map((item) => ({
          src: item.imageUrl,
          alt: item.title,
          category: item.category,
          title: item.title,
          width: 1122,
          height: 1402,
        }));
      }
    } catch {}
    return [
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
  },
  ["homepage-gallery"],
  { revalidate: 60, tags: ["galleries"] }
);

export const getGalleryAll = nextCache(
  async () => {
    try {
      const items = await db.gallery.findMany({ orderBy: { order: "asc" } });
      if (items.length > 0) return items;
    } catch {}
    return getGalleryFeatured();
  },
  ["all-galleries"],
  { revalidate: 60, tags: ["galleries"] }
);

export const getReviews = nextCache(
  async () => {
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
  },
  ["reviews"],
  { revalidate: 60, tags: ["reviews"] }
);

export const getSettings = nextCache(
  async () => {
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
  },
  ["settings"],
  { revalidate: 60, tags: ["settings"] }
);
