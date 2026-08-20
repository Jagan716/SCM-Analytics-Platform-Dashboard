"use client";

import KpiCard from "@/components/KpiCard";
import BarCard from "@/components/charts/BarCard";
import DataTable from "@/components/DataTable";
import RouteDivider from "@/components/RouteDivider";
import summary from "@/data/summary.json";
import suppliers from "@/data/suppliers.json";

const TIER_TONE = { A: "text-teal-dark bg-teal/10", B: "text-amber-dark bg-amber/10", C: "text-coral-dark bg-coral/10" };

const columns = [
  { key: "supplier_id", label: "ID", mono: true },
  { key: "supplier_name", label: "Supplier" },
  {
    key: "reliability_tier",
    label: "Tier",
    render: (v) => (
      <span className={`font-mono text-[11px] px-1.5 py-0.5 rounded-sm ${TIER_TONE[v] || "text-steel bg-steel/10"}`}>
        {v}
      </span>
    ),
  },
  { key: "total_pos", label: "POs", align: "right" },
  { key: "otif_pct", label: "OTIF", align: "right", render: (v) => `${v}%` },
  { key: "on_time_pct", label: "On-time", align: "right", render: (v) => `${v}%` },
  { key: "in_full_pct", label: "In-full", align: "right", render: (v) => `${v}%` },
  { key: "avg_lead_time_days", label: "Lead time", align: "right", render: (v) => `${v}d` },
];

export default function SuppliersPage() {
  const otifData = suppliers
    .slice()
    .sort((a, b) => b.otif_pct - a.otif_pct)
    .map((s) => ({ name: s.supplier_name, value: s.otif_pct }))
    .reverse();

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-wider text-steel mb-2">Domain</p>
      <h1 className="font-display font-semibold text-navy text-3xl sm:text-4xl">Suppliers</h1>
      <p className="text-steel text-sm mt-2 max-w-xl">
        OTIF — on-time <span className="font-mono">and</span> in-full — is the single number that tells you whether
        a supplier can be relied on.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8">
        <KpiCard label="Avg OTIF" value={summary.avg_supplier_otif_pct} suffix="%" tone="teal" delay={0} />
        <KpiCard label="Below 80% OTIF" value={summary.suppliers_below_80_otif} tone="coral" delay={60} />
        <KpiCard label="Suppliers" value={suppliers.length} tone="navy" delay={120} />
        <KpiCard
          label="Avg lead time"
          value={(suppliers.reduce((s, r) => s + r.avg_lead_time_days, 0) / suppliers.length).toFixed(1)}
          suffix="d"
          tone="navy"
          delay={180}
        />
      </div>

      <RouteDivider label="OTIF ranking" />

      <BarCard title="OTIF % by supplier — all suppliers" data={otifData} color="#1F9E89" suffix="%" height={420} />

      <RouteDivider label="Full scorecard" />

      <DataTable
        columns={columns}
        data={suppliers}
        searchKeys={["supplier_id", "supplier_name"]}
        defaultSort={{ key: "otif_pct", dir: "asc" }}
      />
    </div>
  );
}
