import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Users,
  Award,
  ShieldCheck,
  TrendingUp,
  Compass,
  Clock,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About SasteGhar"
        title="A property business built on trust."
        subtitle="We started in one room above a bank in Sector 68, Mohali, convinced the property business was broken in a fixable way. Today, that conviction remains unchanged."
        crumbs={[{ label: "About" }]}
      />

      {/* Who We Are */}
      <section className="section-pad bg-cream">
        <div className="container-px">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow text-secondary">Who We Are</span>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-primary sm:text-4xl">
              An Established Real-Estate Advisory House since 2011
            </h2>
            <p className="mt-4 text-base leading-relaxed text-primary-600">
              We work as a bridge between customer and builder, ensuring transparency,
              safety, and mutual trust at every step of your property journey.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="card-surface p-6 text-center hover:shadow-soft transition-shadow">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-secondary/10 text-secondary">
                <Users className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-heading text-xl font-semibold text-primary">50+ Professionals</h3>
              <p className="mt-2 text-sm text-primary-600">
                A strong team of trained professionals dedicated to your needs.
              </p>
            </div>

            <div className="card-surface p-6 text-center hover:shadow-soft transition-shadow">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-secondary/10 text-secondary">
                <Clock className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-heading text-xl font-semibold text-primary">200+ Hours</h3>
              <p className="mt-2 text-sm text-primary-600">
                Every team member undergoes extensive professional training.
              </p>
            </div>

            <div className="card-surface p-6 text-center hover:shadow-soft transition-shadow">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-secondary/10 text-secondary">
                <HeartHandshake className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-heading text-xl font-semibold text-primary">2000+ Clients</h3>
              <p className="mt-2 text-sm text-primary-600">
                A family of 2000+ happy clients and 500+ active investors.
              </p>
            </div>

            <div className="card-surface p-6 text-center hover:shadow-soft transition-shadow">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-secondary/10 text-secondary">
                <Award className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-heading text-xl font-semibold text-primary">4.7 Rating</h3>
              <p className="mt-2 text-sm text-primary-600">
                Highly trusted advisory house with 250+ Google reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section-pad">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow text-secondary">What We Do</span>
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

      {/* How We Do It */}
      <section className="section-pad bg-primary text-white">
        <div className="container-px">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow text-accent">How We Do It</span>
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
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
