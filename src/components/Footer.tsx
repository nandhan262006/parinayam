import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-surface/60">
      <div className="container-max py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Image
              src="/navibar.png"
              alt="Parinayam"
              width={180}
              height={36}
              className="mb-4 brightness-200"
            />
            <p className="text-sm leading-relaxed">
              Capturing the soul of Indian celebrations with timeless elegance and modern sophistication.
            </p>
            <a href="https://maps.app.goo.gl/tpCAkGsJYLv8acEN8" target="_blank" rel="noopener noreferrer" className="text-xs text-surface/50 hover:text-gold transition-colors mt-3 block">
              Shop no 208, Vijaya Complex, Ongole, AP
            </a>
            <div className="flex gap-4 mt-5 text-surface/70">
              <a href="https://www.instagram.com/parinayamphoto/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Instagram</a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.1em] font-semibold text-surface mb-5">
              Discover
            </h4>
            <ul className="space-y-2.5">
              {["Gallery", "Wedding Stories", "Our Process", "FAQ"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Gallery" ? "/gallery" : "#"}
                    className="text-sm hover:text-gold transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.1em] font-semibold text-surface mb-5">
              Services
            </h4>
            <ul className="space-y-2.5">
              {["Weddings", "Engagements", "Cinematography", "Fine Art Portraits"].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-sm hover:text-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.1em] font-semibold text-surface mb-5">
              Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Instagram", href: "https://www.instagram.com/parinayamphoto/" },
                { label: "Facebook", href: "#" },
                { label: "Vimeo", href: "#" },
                { label: "Admin", href: "/admin" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-gold transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-surface/10 mt-12 pt-6 text-xs">
          <span>&copy; {new Date().getFullYear()} Parinayam Photography. Timeless Celebration.</span>
          <div className="flex gap-6 mt-3 md:mt-0">
            <Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
