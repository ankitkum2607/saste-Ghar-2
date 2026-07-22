import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "About Us" };

const values = [
  {
    title: "Tell them the truth",
    body: "If a flat is overpriced, we say so. We would rather lose a sale than a client's trust, and the arithmetic works out over ten years.",
  },
  {
    title: "Walk it before you list it",
    body: "Nobody puts a flat on this site from a spreadsheet. We measure it, photograph it, and read its paperwork first.",
  },
  {
    title: "Fewer, better",
    body: "We turn down more listings than we take. A shortlist you can trust is worth more than a catalogue you cannot.",
  },
  {
    title: "Own the outcome",
    body: "Bank rejected the loan? Registry stuck? That is our problem until it is solved, whether or not it is technically our job.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About SasteGhar"
        title="A property business built on trust."
        subtitle="We started in one room above a bank in Sector 68, Mohali, convinced the property business was broken in a fixable way. Twelve cities later, that conviction hasn't changed."
        crumbs={[{ label: "About" }]}
      />
      <section className="section-pad">
        <div className="container-px max-w-3xl">
          <p className="text-lg leading-relaxed text-primary-600">
            SasteGhar curates residential flats across twelve Indian cities —
            both Fresh Buy launches and resale properties. Every home is walked,
            measured, and checked against its paperwork before it reaches this
            site. It is a narrower business than most portals run, and it is the
            reason we can genuinely claim to know every building we list.
          </p>
        </div>
        <div className="container-px mt-12 grid gap-8 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-line bg-white p-8">
              <h3 className="font-heading text-xl font-semibold text-primary">
                {v.title}
              </h3>
              <p className="mt-3 leading-relaxed text-primary-600">{v.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
