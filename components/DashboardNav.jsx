"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Radar, Boxes, ClipboardList, Users, Truck, Target, Menu, X, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: Radar },
  { href: "/dashboard/inventory", label: "Inventory", icon: Boxes },
  { href: "/dashboard/procurement", label: "Procurement", icon: ClipboardList },
  { href: "/dashboard/suppliers", label: "Suppliers", icon: Users },
  { href: "/dashboard/logistics", label: "Logistics", icon: Truck },
  { href: "/dashboard/planning", label: "Planning", icon: Target },
];

function NavLinks({ pathname, onNavigate }) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors ${
              active
                ? "bg-navy-mid text-paper font-medium"
                : "text-cream/70 hover:bg-navy-mid/60 hover:text-cream"
            }`}
          >
            <Icon size={17} strokeWidth={1.75} aria-hidden="true" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function DashboardNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-60 shrink-0 bg-navy min-h-screen sticky top-0 px-4 py-6">
        <Link href="/" className="block mb-8 px-3">
          <p className="font-display font-semibold text-cream text-xl leading-none">SCM</p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-cream/50 mt-1">Analytics Platform</p>
        </Link>
        <NavLinks pathname={pathname} />
        <div className="mt-auto pt-6 px-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-cream/50 hover:text-cream transition-colors"
          >
            Back to home <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-40 bg-navy px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display font-semibold text-cream text-lg leading-none">SCM</span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-cream/50">Analytics</span>
        </Link>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          className="text-cream p-1.5"
        >
          <Menu size={22} aria-hidden="true" />
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-navy-deep/60" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-navy px-4 py-6 flex flex-col">
            <div className="flex items-center justify-between mb-8 px-3">
              <p className="font-display font-semibold text-cream text-lg">Menu</p>
              <button onClick={() => setOpen(false)} aria-label="Close navigation menu" className="text-cream p-1">
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
