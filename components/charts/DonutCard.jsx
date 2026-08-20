"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function DonutTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="bg-navy text-cream px-3 py-2 rounded-sm text-xs font-mono">
      <p className="text-cream/60 mb-0.5">{p.name}</p>
      <p className="font-medium">{p.value}</p>
    </div>
  );
}

export default function DonutCard({ title, data, height = 220 }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  return (
    <div className="bg-paper border border-line rounded-sm p-4 sm:p-5">
      <p className="font-mono text-[11px] uppercase tracking-wider text-steel mb-4">{title}</p>
      <div className="relative" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius="62%" outerRadius="90%" paddingAngle={2} stroke="none">
              {data.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
            <Tooltip content={<DonutTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-display font-semibold text-2xl text-navy">{total}</span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-steel">total</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4">
        {data.map((d, i) => (
          <span key={i} className="flex items-center gap-1.5 text-xs text-steel-dark">
            <span className="w-2.5 h-2.5 rounded-xs" style={{ background: d.color }} />
            {d.name}
          </span>
        ))}
      </div>
    </div>
  );
}
