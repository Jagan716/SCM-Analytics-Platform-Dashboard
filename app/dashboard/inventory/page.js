"use client";

import KpiCard from "@/components/KpiCard";
import DonutCard from "@/components/charts/DonutCard";
import DataTable from "@/components/DataTable";
import StampBadge from "@/components/StampBadge";
import RouteDivider from "@/components/RouteDivider";
import summary from "@/data/summary.json";
import inventory from "@/data/inventory.json";
import stockStatusDist from "@/data/stock_status_dist.json";

const STATUS_COLORS = { HEALTHY: "#1F9E89", LOW_STOCK: "#F2A93B", STOCK_OUT: "#E3573D", EXCESS_STOCK: "#6B7684" };

const columns = [
  { key: "sku_id", label: "SKU", mono: true },
  { key: "sku_name", label: "Item" },
  { key: "category", label: "Category" },
  { key: "location_name", label: "Location" },
  { key: "region", label: "Region" },
  { key: "closing_qty", label: "On hand", align: "right" },
  { key: "in_transit_qty", label: "In transit", align: "right" },
  {
    key: "stock_status",
    label: "Status",
    render: (v) => <StampBadge status={v} small />,
  },
];

export default function InventoryPage() {
  const stockData = Object.entries(stockStatusDist).map(([name, value]) => ({
    name: name.replace(/_/g, " "),
    value,
    color: STATUS_COLORS[name] || "#6B7684",
  }));

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-wider text-steel mb-2">Domain</p>
      <h1 className="font-display font-semibold text-navy text-3xl sm:text-4xl">Inventory</h1>
      <p className="text-steel text-sm mt-2 max-w-xl">
        Current stock position by SKU and location, most recent snapshot per pair.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8">
        <KpiCard label="Stock-outs" value={summary.active_stockouts} tone="coral" delay={0} />
        <KpiCard label="Low stock" value={summary.low_stock_count} tone="amber" delay={60} />
        <KpiCard label="Healthy" value={summary.healthy_pct} suffix="%" tone="teal" delay={120} />
        <KpiCard label="SKUs tracked" value={summary.total_skus_tracked} tone="navy" delay={180} />
      </div>

      <RouteDivider label="Status mix" />

      <div className="grid lg:grid-cols-3 gap-4">
        <DonutCard title="Stock status distribution" data={stockData} />
        <div className="lg:col-span-2 flex items-center">
          <p className="text-sm text-steel leading-relaxed">
            Every SKU-location pair is flagged automatically: <StampBadge status="STOCK_OUT" small /> when on-hand
            stock hits zero, <StampBadge status="LOW_STOCK" small /> under the reorder point, and{" "}
            <StampBadge status="EXCESS_STOCK" small /> at more than 3× the 30-day rolling average. Search the table
            below by SKU, item name, or location.
          </p>
        </div>
      </div>

      <RouteDivider label="Full manifest" />

      <DataTable
        columns={columns}
        data={inventory}
        searchKeys={["sku_id", "sku_name", "location_name", "category"]}
        defaultSort={{ key: "closing_qty", dir: "asc" }}
      />
    </div>
  );
}
