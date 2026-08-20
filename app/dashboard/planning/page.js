import KpiCard from "@/components/KpiCard";
import DonutCard from "@/components/charts/DonutCard";
import PlanningTable from "@/components/PlanningTable";
import RouteDivider from "@/components/RouteDivider";
import StampBadge from "@/components/StampBadge";
import summary from "@/data/summary.json";
import planning from "@/data/planning.json";

export default function PlanningPage() {
  const balanced = planning.length - summary.shortage_risk_skus - summary.overstock_risk_skus;
  const riskData = [
    { name: "Shortage risk", value: summary.shortage_risk_skus, color: "#E3573D" },
    { name: "Overstock risk", value: summary.overstock_risk_skus, color: "#F2A93B" },
    { name: "Balanced", value: balanced, color: "#1F9E89" },
  ];

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-wider text-steel mb-2">Domain</p>
      <h1 className="font-display font-semibold text-navy text-3xl sm:text-4xl">Planning</h1>
      <p className="text-steel text-sm mt-2 max-w-xl">
        Demand vs. available supply (on-hand + in-transit), by SKU and location — the planner&rsquo;s action list.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8">
        <KpiCard label="Shortage risk" value={summary.shortage_risk_skus} tone="coral" delay={0} />
        <KpiCard label="Overstock risk" value={summary.overstock_risk_skus} tone="amber" delay={60} />
        <KpiCard label="Balanced" value={balanced} tone="teal" delay={120} />
        <KpiCard label="SKU-locations" value={planning.length.toLocaleString()} tone="navy" delay={180} />
      </div>

      <RouteDivider label="Risk mix" />

      <div className="grid lg:grid-cols-3 gap-4">
        <DonutCard title="Risk distribution" data={riskData} />
        <div className="lg:col-span-2 flex items-center">
          <p className="text-sm text-steel leading-relaxed">
            <StampBadge status="SHORTAGE_RISK" small /> means available supply won&rsquo;t cover recorded demand —
            these are the rows worth acting on first. <StampBadge status="OVERSTOCK_RISK" small /> flags the
            opposite: supply running more than double demand, tying up working capital.
          </p>
        </div>
      </div>

      <RouteDivider label="Worklist" />

      <PlanningTable data={planning} />
    </div>
  );
}
