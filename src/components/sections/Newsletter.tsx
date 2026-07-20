"use client";

import { useState } from "react";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // Demo build: no backend.
    setDone(true);
  }

  return (
    <section className="bg-cream py-[60px] sm:py-[100px]">
      <div className="container-px">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">The Quiet List</p>
          <h3 className="mt-4 font-heading text-2xl font-semibold text-primary sm:text-3xl">
            New launches, before they are launched.
          </h3>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-primary-600">
            We send one email a month. It contains inventory that has not been
            advertised yet — and nothing else.
          </p>

          {done ? (
            <p className="mt-8 font-medium text-secondary">
              You&rsquo;re on the list. Watch your inbox.
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:items-end"
            >
              <label className="flex-1 text-left">
                <span className="sr-only">Email address</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border-0 border-b border-line-strong bg-transparent px-1 py-3 text-base text-ink placeholder:text-primary-600/50 focus:border-secondary focus:outline-none focus:ring-0"
                />
              </label>
              <button
                type="submit"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-secondary px-7 font-medium text-white transition-colors hover:bg-secondary-700"
              >
                Join
              </button>
            </form>
          )}
        </RevealOnScroll>
      </div>
    </section>
  );
}
