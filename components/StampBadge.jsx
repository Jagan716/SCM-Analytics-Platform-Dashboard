import { statusStyle } from "@/lib/status";

export default function StampBadge({ status, small = false }) {
  const s = statusStyle(status);
  const label = status.replace(/_/g, " ");
  return (
    <span
      className={`stamp ${s.text} ${s.border} ${s.bg} rounded-sm ${
        small ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1 text-xs"
      } font-medium`}
    >
      {label}
    </span>
  );
}
