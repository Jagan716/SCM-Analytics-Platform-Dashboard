export default function RouteDivider({ label }) {
  return (
    <div className="flex items-center gap-3 my-8 sm:my-10" role="separator">
      {label && (
        <span className="font-mono text-[11px] uppercase tracking-wider text-steel whitespace-nowrap">
          {label}
        </span>
      )}
      <svg className="flex-1 h-2" preserveAspectRatio="none" viewBox="0 0 100 8">
        <line
          x1="0"
          y1="4"
          x2="96"
          y2="4"
          stroke="var(--color-line)"
          strokeWidth="1.5"
          className="route-line"
          vectorEffect="non-scaling-stroke"
        />
        <rect x="96" y="1.5" width="3" height="3" fill="var(--color-amber)" />
      </svg>
    </div>
  );
}
