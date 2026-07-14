import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://parinayam-git-main-nandhan262006s-projects.vercel.app/sitemap.xml",
  };
}
