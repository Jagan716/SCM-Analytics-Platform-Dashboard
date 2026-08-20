// Central mapping so every status flag in the app (inventory stock_status,
// planning risk_flag, supplier tier, etc.) reads with the same semantics:
// teal = healthy/on-track, amber = warning, coral = at-risk, steel = neutral.

export const STATUS_STYLES = {
  HEALTHY: { text: "text-teal-dark", border: "border-teal", bg: "bg-teal/10" },
  BALANCED: { text: "text-teal-dark", border: "border-teal", bg: "bg-teal/10" },
  LOW_STOCK: { text: "text-amber-dark", border: "border-amber", bg: "bg-amber/10" },
  OVERSTOCK_RISK: { text: "text-amber-dark", border: "border-amber", bg: "bg-amber/10" },
  STOCK_OUT: { text: "text-coral-dark", border: "border-coral", bg: "bg-coral/10" },
  SHORTAGE_RISK: { text: "text-coral-dark", border: "border-coral", bg: "bg-coral/10" },
  EXCESS_STOCK: { text: "text-amber-dark", border: "border-amber", bg: "bg-amber/10" },
};

export function statusStyle(status) {
  return STATUS_STYLES[status] || { text: "text-steel-dark", border: "border-steel", bg: "bg-steel/10" };
}

export const TIER_LABEL = { A: "Tier A", B: "Tier B", C: "Tier C" };
