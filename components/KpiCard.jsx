const TONE_CLASSES = {
  teal: "text-teal-dark",
  amber: "text-amber-dark",
  coral: "text-coral-dark",
  navy: "text-navy",
};

export default function KpiCard({ label, value, suffix = "", tone = "navy", caption, delay = 0 }) {
  return (
    <div className="bg-paper border border-line rounded-sm p-4 sm:p-5">
      <p className="font-mono text-[11px] uppercase tracking-wider text-steel">{label}</p>
      <p
        className={`kpi-value font-display font-semibold ${TONE_CLASSES[tone]} text-4xl sm:text-5xl leading-none mt-2`}
        style={{ animationDelay: `${delay}ms` }}
      >
        {value}
        {suffix && <span className="text-2xl sm:text-3xl align-top ml-0.5">{suffix}</span>}
      </p>
      {caption && <p className="text-xs text-steel mt-2">{caption}</p>}
    </div>
  );
}
