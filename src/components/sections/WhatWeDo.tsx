"use client";

import { CheckCircle2 } from "lucide-react";

export function WhatWeDo() {
  return (
    <section className="section-pad bg-white">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-secondary">What We Do</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-primary sm:text-4xl">
              Catering to Both End Users & Investors
            </h2>
            <p className="mt-4 text-base leading-relaxed text-primary-600">
              Our motto is simple: to save our investor's and buyer's time, money, and energy. 
              We advise and guide you to find products that deliver the best returns on investment.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-secondary" />
                <div>
                  <h4 className="font-semibold text-primary">Diverse Product Basket</h4>
                  <p className="text-sm text-primary-600">Residential, commercial, and industrial property options.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-secondary" />
                <div>
                  <h4 className="font-semibold text-primary">End-to-End Expertise</h4>
                  <p className="text-sm text-primary-600">Advising on selections ranging from Micro Investments to Pre-Leased properties.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cream rounded-3xl p-8 lg:p-12">
            <h3 className="font-heading text-2xl font-semibold text-primary mb-6">Our Motto</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="font-heading text-4xl font-bold text-secondary/35">01</span>
                <div>
                  <h4 className="font-semibold text-primary">Save Your Time</h4>
                  <p className="text-sm text-primary-600">We do the legwork so you don't have to search endlessly.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-heading text-4xl font-bold text-secondary/35">02</span>
                <div>
                  <h4 className="font-semibold text-primary">Save Your Money</h4>
                  <p className="text-sm text-primary-600">Expert advisory ensures you buy at correct and fair valuations.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-heading text-4xl font-bold text-secondary/35">03</span>
                <div>
                  <h4 className="font-semibold text-primary">Save Your Energy</h4>
                  <p className="text-sm text-primary-600">Smooth handling from documentation verification to final possession.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
