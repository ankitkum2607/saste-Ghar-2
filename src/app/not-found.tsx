import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-secondary">
        404
      </p>
      <h1 className="mt-4 font-heading text-4xl font-semibold text-primary">
        Page not found.
      </h1>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-full bg-secondary px-8 font-medium text-white hover:bg-secondary-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
