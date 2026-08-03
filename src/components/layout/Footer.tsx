import Link from "next/link";
import { Instagram, Linkedin, Twitter, Youtube, Phone } from "lucide-react";
import { OFFICES, SITE } from "@/lib/constants";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Flats",
    links: [
      { label: "All Flats", href: "/properties" },
      { label: "Fresh Buy", href: "/properties?kind=fresh-buy" },
      { label: "Resale", href: "/properties?kind=resale" },
      { label: "Sell Your Flat", href: "/sell" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Search Flats", href: "/properties" },
      { label: "Find the right property", href: "/find" },
      { label: "Book a Site Visit", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Our Journey", href: "/about" },
      { label: "Leadership", href: "/about" },
    ],
  },
];

const socials = [
  { Icon: Instagram, href: SITE.socials.instagram, label: "Instagram" },
  { Icon: Linkedin, href: SITE.socials.linkedin, label: "LinkedIn" },
  { Icon: Twitter, href: SITE.socials.twitter, label: "Twitter" },
  { Icon: Youtube, href: SITE.socials.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-px py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo inverse />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              A property business built on the idea that the person who sells you
              a home should still be there when you sell it.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-white/50">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Offices */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-white/50">
              Visit Us
            </h3>
            <ul className="mt-4 space-y-5">
              {OFFICES.map((o) => (
                <li key={o.city} className="text-sm">
                  <p className="font-medium text-white">
                    {o.city} · {o.label}
                  </p>
                  <p className="mt-1 text-white/60">{o.address}</p>
                  <a
                    href={`tel:${o.phoneHref}`}
                    className="mt-1 inline-flex items-center gap-1.5 text-white/80 hover:text-white"
                  >
                    <Phone className="h-3.5 w-3.5" /> {o.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-px flex flex-col gap-3 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SasteGhar Realty Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Use
            </Link>
            <Link href="/rera" className="hover:text-white">
              RERA Disclosures
            </Link>
            <Link href="/careers" className="hover:text-white">
              Careers
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
