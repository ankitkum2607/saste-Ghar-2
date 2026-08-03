"use client";

import { motion } from "framer-motion";
import { Users, Clock, HeartHandshake, Award } from "lucide-react";
import { ANIMATION } from "@/lib/constants";

export function WhoWeAre() {
  return (
    <section className="section-pad bg-cream">
      <div className="container-px">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Who We Are</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-primary sm:text-4xl">
            An Established Real-Estate Advisory House since 2011
          </h2>
          <p className="mt-4 text-base leading-relaxed text-primary-600">
            We work as a bridge between customer and builder, ensuring transparency,
            safety, and mutual trust at every step of your property journey.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card-surface p-6 text-center hover:shadow-soft transition-shadow bg-white">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-secondary/10 text-secondary">
              <Users className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-heading text-xl font-semibold text-primary">50+ Professionals</h3>
            <p className="mt-2 text-sm text-primary-600">
              A strong team of trained professionals dedicated to your needs.
            </p>
          </div>

          <div className="card-surface p-6 text-center hover:shadow-soft transition-shadow bg-white">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-secondary/10 text-secondary">
              <Clock className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-heading text-xl font-semibold text-primary">200+ Hours</h3>
            <p className="mt-2 text-sm text-primary-600">
              Every team member undergoes extensive professional training.
            </p>
          </div>

          <div className="card-surface p-6 text-center hover:shadow-soft transition-shadow bg-white">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-secondary/10 text-secondary">
              <HeartHandshake className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-heading text-xl font-semibold text-primary">2000+ Clients</h3>
            <p className="mt-2 text-sm text-primary-600">
              A family of 2000+ happy clients and 500+ active investors.
            </p>
          </div>

          <div className="card-surface p-6 text-center hover:shadow-soft transition-shadow bg-white">
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
  );
}
