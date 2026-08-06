"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SELL_STATS, ANIMATION } from "@/lib/constants";

export function SellingSection() {
  return (
    <section className="section-pad">
      <div className="container-px grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: ANIMATION.slow, ease: ANIMATION.easeOut }}
          className="relative order-1 aspect-[4/3] overflow-hidden rounded-2xl lg:order-none"
        >
          <Image
            src="https://images.unsplash.com/photo-1745429523615-2a82c60bfc02?auto=format&fit=crop&w=1400&q=80"
            alt="A spacious and modern Indian flat living room"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        {/* Content */}
        <div>
          <p className="eyebrow">Selling Instead?</p>
          <h2 className="mt-4 font-heading text-[28px] font-semibold leading-tight text-primary sm:text-4xl lg:text-[44px]">
            Your flat, valued honestly.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-primary-600">
            No listing fee. A valuation based on what actually closed in your
            building this year, professional photography paid for by us, and only
            buyers whose budget and loan approval we have already checked.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/sell"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-secondary px-8 font-medium text-white transition-colors hover:bg-secondary-700"
            >
              Sell Your Flat
            </Link>
            <Link
              href="/properties?kind=resale"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-line-strong px-8 font-medium text-primary transition-colors hover:bg-cream"
            >
              See Resale Flats
            </Link>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
            {SELL_STATS.map((s) => (
              <div key={s.label}>
                <dt className="font-heading text-2xl font-semibold text-primary">
                  {s.value}
                </dt>
                <dd className="mt-1 text-sm leading-snug text-primary-600">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
