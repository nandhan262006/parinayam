import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://parinayam-git-main-nandhan262006s-projects.vercel.app"),
  title: {
    default: "Parinayam Photography — Ongole's Finest Wedding Photographer | Timeless Celebrations",
    template: "%s | Parinayam Photography",
  },
  description:
    "Parinayam Photography by Hareesh Mulluri — Ongole's finest wedding & event photographer. 4.9-star rated, 10+ years capturing timeless Telugu weddings, pre-wedding shoots, candid moments & cinematic films across Andhra Pradesh.",
  keywords: [
    "Ongole photographer",
    "wedding photographer Ongole",
    "best photographer in Ongole",
    "candid wedding photography",
    "Telugu wedding photographer",
    "pre-wedding shoot Ongole",
    "cinematic wedding film",
    "Hareesh Mulluri photography",
    "Parinayam Photography",
    "Andhra wedding photographer",
    "luxury wedding photography",
    "Indian wedding photographer",
  ],
  openGraph: {
    title: "Parinayam Photography — Ongole's Finest Wedding Photographer",
    description:
      "Award-winning wedding photography by Hareesh Mulluri. Capturing timeless Telugu celebrations with elegance across Ongole, Andhra Pradesh & worldwide.",
    siteName: "Parinayam Photography",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Parinayam Photography — Timeless Celebrations",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parinayam Photography — Ongole's Finest Wedding Photographer",
    description:
      "Capturing timeless Telugu weddings with elegance. 10+ years, 430+ happy couples, 4.9-star rated.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
