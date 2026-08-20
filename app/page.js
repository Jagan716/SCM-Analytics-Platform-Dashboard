import Link from "next/link";
import { Boxes, ClipboardList, Users, Truck, Target, ArrowUpRight, Database, GitBranch, LayoutGrid } from "lucide-react";
import summary from "@/data/summary.json";
import RouteDivider from "@/components/RouteDivider";

const DOMAINS = [
  {
    href: "/dashboard/inventory",
    icon: Boxes,
    label: "Inventory",
    desc: "Stock position by SKU and location, with stock-out and excess flags.",
  },
  {
    href: "/dashboard/procurement",
    icon: ClipboardList,
    label: "Procurement",
    desc: "Fulfillment rate and open quantity across every purchase order.",
  },
  {
    href: "/dashboard/suppliers",
    icon: Users,
    label: "Suppliers",
    desc: "OTIF scorecards ranking who delivers on time and in full.",
  },
  {
    href: "/dashboard/logistics",
    icon: Truck,
    label: "Logistics",
    desc: "Carrier and route on-time performance, lane by lane.",
  },
  {
    href: "/dashboard/planning",
    icon: Target,
    label: "Planning",
    desc: "Demand vs. supply gaps, flagged before they become stock-outs.",
  },
];

const PIPELINE = [
  { icon: Database, label: "Source systems", desc: "ERP · WMS · TMS" },
  { icon: GitBranch, label: "Bronze → Silver → Gold", desc: "Databricks medallion pipeline" },
  { icon: LayoutGrid, label: "This platform", desc: "Five live KPI views" },
];

function RouteNetworkBackground() {
  const nodes = [
    [60, 90], [160, 40], [260, 130], [340, 60], [420, 150],
    [500, 70], [200, 190], [380, 210], [120, 210], [460, 190],
  ];
  const edges = [
    [0, 1], [1, 3], [3, 5], [5, 9], [9, 7], [7, 6], [6, 8], [8, 0], [1, 2], [2, 4], [4, 7], [2, 6],
  ];
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.16]"
      viewBox="0 0 560 260"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="#F6F3EC"
          strokeWidth="1"
          className="route-line"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 3 ? 4 : 2.5} fill="#F2A93B" />
      ))}
    </svg>
  );
}

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero */}
      <section className="relative bg-navy overflow-hidden">
        <RouteNetworkBackground />
        <div className="relative max-w-5xl mx-auto px-6 sm:px-10 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <p className="font-mono text-[11px] uppercase tracking-wider text-amber mb-5">
            Supply chain control tower
          </p>
          <h1 className="font-display font-semibold text-cream text-5xl sm:text-6xl lg:text-7xl leading-[0.95] max-w-3xl">
            See the whole chain.
            <br />
            Act before it breaks.
          </h1>
          <p className="text-cream/70 text-base sm:text-lg max-w-xl mt-6 leading-relaxed">
            Every purchase order, shipment, and stock count reconciled nightly through a
            Bronze → Silver → Gold pipeline, surfaced here as five live KPI views —
            inventory, procurement, suppliers, logistics, and demand-supply planning.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-9">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-amber text-navy-deep font-medium text-sm px-5 py-3 rounded-sm hover:bg-amber/90 transition-colors"
            >
              Open the dashboard <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <span className="font-mono text-xs text-cream/50">
              {summary.total_skus_tracked} SKUs · {summary.total_locations} locations · updated nightly
            </span>
          </div>
        </div>

        {/* Manifest ledger strip */}
        <div className="relative border-t border-cream/10 bg-navy-deep/40">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              ["Fulfillment rate", `${summary.overall_fulfillment_rate_pct}%`],
              ["Carrier on-time", `${summary.avg_carrier_on_time_pct}%`],
              ["Shortage-risk SKUs", summary.shortage_risk_skus],
              ["POs tracked", summary.total_pos.toLocaleString()],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="font-mono text-[10px] uppercase tracking-wider text-cream/40">{label}</p>
                <p className="font-display font-semibold text-cream text-2xl mt-1">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domains */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 w-full py-16 sm:py-20">
        <p className="font-mono text-[11px] uppercase tracking-wider text-steel mb-2">Coverage</p>
        <h2 className="font-display font-semibold text-navy text-3xl sm:text-4xl mb-10">Five domains, one manifest</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DOMAINS.map(({ href, icon: Icon, label, desc }) => (
            <Link
              key={href}
              href={href}
              className="group bg-paper border border-line rounded-sm p-5 hover:border-navy transition-colors"
            >
              <Icon size={20} strokeWidth={1.75} className="text-teal-dark mb-3" aria-hidden="true" />
              <p className="font-display font-semibold text-navy text-lg flex items-center gap-1.5">
                {label}
                <ArrowUpRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              </p>
              <p className="text-sm text-steel mt-1.5 leading-relaxed">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <RouteDivider label="Pipeline" />

      {/* Pipeline strip */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 w-full pb-20 sm:pb-24 -mt-4">
        <div className="grid sm:grid-cols-3 gap-4">
          {PIPELINE.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="border border-line rounded-sm p-5 bg-paper">
              <Icon size={18} strokeWidth={1.75} className="text-navy mb-3" aria-hidden="true" />
              <p className="font-medium text-navy text-sm">{label}</p>
              <p className="font-mono text-xs text-steel mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-line px-6 sm:px-10 py-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-steel">SCM Analytics Platform — built on Databricks Lakehouse</p>
          <Link href="/dashboard" className="font-mono text-[11px] text-navy hover:text-teal-dark transition-colors">
            Dashboard →
          </Link>
        </div>
      </footer>
    </div>
  );
}
