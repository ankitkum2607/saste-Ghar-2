import type { Metadata } from "next";
import { Phone, Mail } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/layout/ContactForm";
import { OFFICES, SITE } from "@/lib/constants";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to us."
        subtitle="Tell us what you need — a home, a valuation, or just a straight answer. A SasteGhar advisor will get back to you."
        crumbs={[{ label: "Contact" }]}
      />
      <section className="section-pad">
        <div className="container-px grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-primary">
              Send a message
            </h2>
            <p className="mt-2 text-primary-600">
              We usually reply within one working day.
            </p>
            <div className="mt-6 max-w-xl">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card-surface p-6">
              <h3 className="font-heading font-semibold text-primary">
                Reach us directly
              </h3>
              <div className="mt-4 space-y-3 text-sm">
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="flex items-center gap-2 text-primary hover:text-secondary"
                >
                  <Phone className="h-4 w-4 text-secondary" /> {SITE.phone}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2 text-primary hover:text-secondary"
                >
                  <Mail className="h-4 w-4 text-secondary" /> {SITE.email}
                </a>
              </div>
            </div>

            {OFFICES.map((o) => (
              <div key={o.city} className="card-surface p-6">
                <p className="font-medium text-primary">
                  {o.city} · {o.label}
                </p>
                <p className="mt-1 text-sm text-primary-600">{o.address}</p>
                <a
                  href={`tel:${o.phoneHref}`}
                  className="mt-2 inline-flex items-center gap-1.5 text-sm text-secondary"
                >
                  <Phone className="h-3.5 w-3.5" /> {o.phone}
                </a>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </>
  );
}
