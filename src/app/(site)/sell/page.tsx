import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SELL_STATS } from "@/lib/constants";

export const metadata: Metadata = { title: "Sell Your Flat" };

export default function SellPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selling Instead?"
        title="Your flat, valued honestly."
        subtitle="No listing fee. A valuation based on what actually closed in your building this year, professional photography paid for by us, and only buyers whose budget and loan approval we have already checked."
        crumbs={[{ label: "Sell" }]}
      />
      <section className="section-pad">
        <div className="container-px">
          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {SELL_STATS.map((s) => (
              <div key={s.label}>
                <dt className="font-heading text-3xl font-semibold text-primary">
                  {s.value}
                </dt>
                <dd className="mt-1 text-sm leading-snug text-primary-600">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 max-w-2xl">
            <p className="text-lg leading-relaxed text-primary-600">
              If you bought through us, we still hold the floor plan, the
              photography, and the paperwork from that sale — so relisting takes
              days rather than weeks. If you bought elsewhere, that is fine too.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-full bg-secondary px-8 font-medium text-white transition-colors hover:bg-secondary-700"
            >
              Request a Valuation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
