"use client";

import { ShieldCheck, Compass } from "lucide-react";

export function HowWeDo() {
  return (
    <section className="section-pad bg-primary text-white">
      <div className="container-px">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-accent">How We Do It</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
            Safety, Security & Researched Selection
          </h2>
          <p className="mt-4 text-base text-white/70">
            We work with selective builders and pre-screened projects to guarantee safety and compliance.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-colors">
            <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-accent/20 text-accent">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-heading text-2xl font-semibold">Safety & Security</h3>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              Every project is verified by our <strong>18 points checklist system</strong>. 
              We have a dedicated legal & technical team that reads the filings and approves properties before listing.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-colors">
            <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-accent/20 text-accent">
              <Compass className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-heading text-2xl font-semibold">Well Researched Selection</h3>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              We work strictly with selective builders. Because of our deep research and curated listings, 
              <strong>67% of our business</strong> comes directly from repeat clients and referrals.
              And our locations focus is Mohali, Chandigarh, and adjacent key Tricity nodes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
