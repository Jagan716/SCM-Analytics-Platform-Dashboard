"use client";

import { useMemo, useState } from "react";
import DataTable from "@/components/DataTable";
import StampBadge from "@/components/StampBadge";

const FILTERS = ["ALL", "SHORTAGE_RISK", "OVERSTOCK_RISK", "BALANCED"];

const columns = [
  { key: "sku_id", label: "SKU", mono: true },
  { key: "sku_name", label: "Item" },
  { key: "category", label: "Category" },
  { key: "location_name", label: "Location" },
  { key: "region", label: "Region" },
  { key: "total_demand_qty", label: "Demand", align: "right", render: (v) => v.toLocaleString() },
  { key: "total_supply_qty", label: "Supply", align: "right", render: (v) => v.toLocaleString() },
  { key: "supply_demand_gap", label: "Gap", align: "right", render: (v) => v.toLocaleString() },
  { key: "risk_flag", label: "Risk", render: (v) => <StampBadge status={v} small /> },
];

export default function PlanningTable({ data }) {
  const [filter, setFilter] = useState("SHORTAGE_RISK");

  const filtered = useMemo(
    () => (filter === "ALL" ? data : data.filter((r) => r.risk_flag === filter)),
    [data, filter]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-sm border transition-colors ${
              filter === f ? "bg-navy text-cream border-navy" : "border-line text-steel hover:border-steel"
            }`}
          >
            {f.replace(/_/g, " ")}
          </button>
        ))}
      </div>
      <DataTable
        columns={columns}
        data={filtered}
        searchKeys={["sku_id", "sku_name", "location_name", "category"]}
        defaultSort={{ key: "supply_demand_gap", dir: "asc" }}
      />
    </div>
  );
}
