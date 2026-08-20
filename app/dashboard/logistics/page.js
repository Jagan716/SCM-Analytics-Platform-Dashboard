"use client";

import KpiCard from "@/components/KpiCard";
import BarCard from "@/components/charts/BarCard";
import DataTable from "@/components/DataTable";
import RouteDivider from "@/components/RouteDivider";
import summary from "@/data/summary.json";
import logistics from "@/data/logistics.json";
import carrierPerf from "@/data/carrier_perf.json";

const columns = [
  { key: "carrier", label: "Carrier" },
  { key: "origin_location_id", label: "Origin", mono: true },
  { key: "dest_location_id", label: "Destination", mono: true },
  { key: "total_shipments", label: "Shipments", align: "right" },
  { key: "on_time_pct", label: "On-time", align: "right", render: (v) => `${v}%` },
  { key: "avg_transit_days", label: "Avg transit", align: "right", render: (v) => `${v}d` },
  { key: "transit_days_stddev", label: "Variability", align: "right", render: (v) => (v == null ? "—" : v) },
];

export default function LogisticsPage() {
  const carrierData = carrierPerf
    .slice()
    .sort((a, b) => a.on_time_pct - b.on_time_pct)
    .map((c) => ({ name: c.carrier, value: c.on_time_pct }));

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-wider text-steel mb-2">Domain</p>
      <h1 className="font-display font-semibold text-navy text-3xl sm:text-4xl">Logistics</h1>
      <p className="text-steel text-sm mt-2 max-w-xl">
        On-time delivery and transit-time consistency, by carrier and by lane.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8">
        <KpiCard label="Carrier on-time" value={summary.avg_carrier_on_time_pct} suffix="%" tone="teal" delay={0} />
        <KpiCard label="Avg transit" value={summary.avg_transit_days} suffix="d" tone="navy" delay={60} />
        <KpiCard label="Shipments" value={summary.total_shipments.toLocaleString()} tone="navy" delay={120} />
        <KpiCard label="Carriers" value={carrierPerf.length} tone="navy" delay={180} />
      </div>

      <RouteDivider label="By carrier" />

      <BarCard title="On-time % by carrier" data={carrierData} color="#1F9E89" suffix="%" height={240} />

      <RouteDivider label="Full lane manifest" />

      <p className="text-xs text-steel mb-3">
        High <span className="font-mono">variability</span> means a route's transit time is unpredictable even if its
        average looks fine — worth flagging separately from a simply-slow lane.
      </p>

      <DataTable
        columns={columns}
        data={logistics}
        searchKeys={["carrier", "origin_location_id", "dest_location_id"]}
        defaultSort={{ key: "total_shipments", dir: "desc" }}
      />
    </div>
  );
}
