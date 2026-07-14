"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export default function Navbar({ whatsapp = "918978936785" }: { whatsapp?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-[#d4ccbc]/30">
      <div className="container-max flex items-center justify-between h-[72px]">
        <Link
          href="/"
          className="font-[family-name:var(--font-serif)] text-xl tracking-wide text-primary flex items-center h-full"
        >
          <Image
            src="/navibar.png"
            alt="Parinayam"
            width={108}
            height={72}
            className="h-full w-auto brightness-125"
            style={{ width: 'auto', height: 'auto' }}
            priority
          />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs uppercase tracking-[0.05em] font-semibold transition-colors ${
                pathname === link.href ? "text-gold" : "text-muted hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs !py-2.5 !px-5">
            Book Now
          </a>
        </div>

        <button
          className="lg:hidden text-primary"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/20 bg-surface">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block px-5 py-3.5 text-xs uppercase tracking-[0.05em] font-semibold ${
                pathname === link.href ? "text-gold" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="px-5 py-3.5">
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs !py-2.5 !px-5 inline-block">
              Book Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
