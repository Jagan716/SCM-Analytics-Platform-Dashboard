import KpiCard from "@/components/KpiCard";
import BarCard from "@/components/charts/BarCard";
import DonutCard from "@/components/charts/DonutCard";
import RouteDivider from "@/components/RouteDivider";
import summary from "@/data/summary.json";
import topSuppliers from "@/data/top_suppliers.json";
import stockStatusDist from "@/data/stock_status_dist.json";
import riskByRegion from "@/data/risk_by_region.json";

const STATUS_COLORS = {
  HEALTHY: "#1F9E89",
  LOW_STOCK: "#F2A93B",
  STOCK_OUT: "#E3573D",
  EXCESS_STOCK: "#6B7684",
};

export default function OverviewPage() {
  const otifData = topSuppliers
    .slice()
    .sort((a, b) => a.otif_pct - b.otif_pct)
    .reverse()
    .map((s) => ({ name: s.supplier_name, value: s.otif_pct }))
    .reverse();

  const stockData = Object.entries(stockStatusDist).map(([name, value]) => ({
    name: name.replace(/_/g, " "),
    value,
    color: STATUS_COLORS[name] || "#6B7684",
  }));

  const regionData = Object.entries(riskByRegion)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-wider text-steel mb-2">Control tower</p>
      <h1 className="font-display font-semibold text-navy text-3xl sm:text-4xl">Overview</h1>
      <p className="text-steel text-sm mt-2 max-w-xl">
        Headline health across every domain, refreshed from the latest Gold-layer pipeline run.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8">
        <KpiCard label="Supplier OTIF" value={summary.avg_supplier_otif_pct} suffix="%" tone="teal" delay={0} />
        <KpiCard label="Carrier on-time" value={summary.avg_carrier_on_time_pct} suffix="%" tone="teal" delay={60} />
        <KpiCard label="Active stock-outs" value={summary.active_stockouts} tone="coral" delay={120} />
        <KpiCard label="Shortage-risk SKUs" value={summary.shortage_risk_skus} tone="amber" delay={180} />
      </div>

      <RouteDivider label="Breakdown" />

      <div className="grid lg:grid-cols-2 gap-4">
        <BarCard title="OTIF % by supplier (top 8)" data={otifData} color="#1F9E89" suffix="%" />
        <DonutCard title="Inventory stock status" data={stockData} />
      </div>

      <div className="mt-4">
        <BarCard
          title="Shortage-risk SKU count by region"
          data={regionData}
          color="#F2A93B"
          horizontal={false}
          height={220}
        />
      </div>
    </div>
  );
}
