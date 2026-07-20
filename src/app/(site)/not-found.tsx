import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-px flex min-h-[70vh] flex-col items-center justify-center py-28 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-heading text-4xl font-semibold text-primary sm:text-5xl">
        We couldn&rsquo;t find that page.
      </h1>
      <p className="mt-4 max-w-md text-primary-600">
        The home you&rsquo;re looking for may have been sold, or the link may be
        out of date. Let&rsquo;s get you back on track.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-secondary px-8 font-medium text-white hover:bg-secondary-700"
        >
          Back to Home
        </Link>
        <Link
          href="/properties"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-line-strong px-8 font-medium text-primary hover:bg-cream"
        >
          Browse Properties
        </Link>
      </div>
    </div>
  );
}
