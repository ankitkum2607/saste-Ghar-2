import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHeader({
  title,
  subtitle,
  crumbs = [],
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <header className="bg-primary pt-28 pb-14 text-white sm:pt-32 sm:pb-20">
      <div className="container-px">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <li className="text-white">{c.label}</li>
                )}
              </span>
            ))}
          </ol>
        </nav>
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-eyebrow text-accent">
            {eyebrow}
          </p>
        )}
        <h1 className="font-heading text-3xl font-semibold sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
