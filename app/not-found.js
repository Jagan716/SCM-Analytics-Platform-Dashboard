import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center bg-cream">
      <p className="font-mono text-[11px] uppercase tracking-wider text-amber-dark mb-3">Manifest not found</p>
      <h1 className="font-display font-semibold text-navy text-5xl">404</h1>
      <p className="text-steel text-sm mt-3 max-w-sm">
        This route isn&rsquo;t on the manifest. It may have moved, or never existed.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-navy text-cream font-medium text-sm px-5 py-3 rounded-sm mt-8 hover:bg-navy-mid transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}
