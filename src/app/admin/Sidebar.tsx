"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", icon: "grid" },
  { href: "/admin/services", label: "Services", icon: "camera" },
  { href: "/admin/gallery", label: "Gallery", icon: "image" },
  { href: "/admin/reviews", label: "Reviews", icon: "star" },
  { href: "/admin/settings", label: "Settings", icon: "gear" },
  { href: "/admin/submissions", label: "Submissions", icon: "mail" },
];

function Icon({ name }: { name: string }) {
  switch (name) {
    case "grid":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "camera":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M2 7a2 2 0 012-2h1.5l1.2-1.6A1 1 0 017.5 3h5a1 1 0 01.8.4L14.5 5H16a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V7z" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="10.5" r="3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "image":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="7" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M2 14l4-4 3 3 3-3 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "star":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 1.5l2.25 5.27 5.75.64-4.3 3.87 1.18 5.72L10 14.25 5.12 17l1.18-5.72-4.3-3.87 5.75-.64L10 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "gear":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M3.4 3.4l1.4 1.4M15.2 15.2l1.4 1.4M3.4 16.6l1.4-1.4M15.2 4.8l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "mail":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M2 6l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "external":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M16 10.5V15a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h4.5M13 3h4v4M10 10l7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.href = "/admin/login";
  };

  return (
    <aside className="w-64 bg-[#111] text-white flex flex-col min-h-screen">
      <div className="py-6 px-6">
        <h1 className="font-[family-name:var(--font-serif)] text-gold text-lg">
          Parinayam
        </h1>
        <p className="text-gray-500 text-xs mt-0.5">Admin</p>
      </div>

      <nav className="flex flex-col gap-1 px-3 flex-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-lg px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${
              isActive(link.href)
                ? "text-gold bg-gold/10"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon name={link.icon} />
            {link.label}
          </Link>
        ))}

        <div className="mt-4 pt-4 border-t border-white/10">
          <a
            href="/"
            className="rounded-lg px-4 py-2.5 text-sm flex items-center gap-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Icon name="external" />
            Back to Site
          </a>
        </div>
      </nav>

      <div className="mt-auto border-t border-white/10 pt-4 px-3 pb-6">
        <button
          onClick={handleLogout}
          className="w-full rounded-lg px-4 py-2.5 text-sm flex items-center gap-3 text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors text-left"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 17H4a2 2 0 01-2-2V5a2 2 0 012-2h3M13 14l3-3-3-3M16 11H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}
