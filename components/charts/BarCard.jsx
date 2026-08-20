"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function ChartTooltip({ active, payload, label, suffix }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-navy text-cream px-3 py-2 rounded-sm text-xs font-mono">
      <p className="text-cream/60 mb-0.5">{label}</p>
      <p className="font-medium">
        {payload[0].value}
        {suffix}
      </p>
    </div>
  );
}

export default function BarCard({ title, data, color = "#1F9E89", horizontal = true, suffix = "", height = 260 }) {
  return (
    <div className="bg-paper border border-line rounded-sm p-4 sm:p-5">
      <p className="font-mono text-[11px] uppercase tracking-wider text-steel mb-4">{title}</p>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout={horizontal ? "vertical" : "horizontal"}
            margin={{ top: 0, right: 12, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="var(--color-line)" horizontal={!horizontal} vertical={horizontal} />
            {horizontal ? (
              <>
                <XAxis type="number" tick={{ fontSize: 11, fill: "var(--color-steel)" }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "var(--color-steel-dark)" }}
                  axisLine={false}
                  tickLine={false}
                  width={110}
                />
              </>
            ) : (
              <>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--color-steel-dark)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-steel)" }} axisLine={false} tickLine={false} />
              </>
            )}
            <Tooltip content={<ChartTooltip suffix={suffix} />} cursor={{ fill: "var(--color-line)", opacity: 0.3 }} />
            <Bar dataKey="value" fill={color} radius={horizontal ? [0, 3, 3, 0] : [3, 3, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
