"use client";

import KpiCard from "@/components/KpiCard";
import BarCard from "@/components/charts/BarCard";
import DataTable from "@/components/DataTable";
import RouteDivider from "@/components/RouteDivider";
import summary from "@/data/summary.json";
import procurement from "@/data/procurement.json";
import categoryFulfillment from "@/data/category_fulfillment.json";

const columns = [
  { key: "supplier_id", label: "Supplier ID", mono: true },
  { key: "supplier_name", label: "Supplier" },
  { key: "category", label: "Category" },
  { key: "total_pos", label: "POs", align: "right" },
  { key: "total_ordered_qty", label: "Ordered", align: "right", render: (v) => v.toLocaleString() },
  { key: "total_received_qty", label: "Received", align: "right", render: (v) => v.toLocaleString() },
  { key: "total_open_qty", label: "Open", align: "right", render: (v) => v.toLocaleString() },
  { key: "fulfillment_rate_pct", label: "Fulfillment", align: "right", render: (v) => `${v}%` },
];

export default function ProcurementPage() {
  const catData = categoryFulfillment.map((c) => ({ name: c.category, value: c.fulfillment_rate_pct }));

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-wider text-steel mb-2">Domain</p>
      <h1 className="font-display font-semibold text-navy text-3xl sm:text-4xl">Procurement</h1>
      <p className="text-steel text-sm mt-2 max-w-xl">
        Purchase order fulfillment by supplier and category — ordered vs. received quantity.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8">
        <KpiCard label="Fulfillment rate" value={summary.overall_fulfillment_rate_pct} suffix="%" tone="teal" delay={0} />
        <KpiCard label="Open qty" value={(summary.total_open_qty / 1000).toFixed(0)} suffix="k" tone="amber" delay={60} />
        <KpiCard label="POs tracked" value={summary.total_pos.toLocaleString()} tone="navy" delay={120} />
        <KpiCard
          label="Ordered qty"
          value={(summary.total_ordered_qty / 1_000_000).toFixed(1)}
          suffix="M"
          tone="navy"
          delay={180}
        />
      </div>

      <RouteDivider label="By category" />

      <BarCard title="Fulfillment rate % by category" data={catData} color="#1F9E89" suffix="%" height={Math.max(220, catData.length * 40)} />

      <RouteDivider label="Full manifest" />

      <DataTable
        columns={columns}
        data={procurement}
        searchKeys={["supplier_id", "supplier_name", "category"]}
        defaultSort={{ key: "fulfillment_rate_pct", dir: "asc" }}
      />
    </div>
  );
}
