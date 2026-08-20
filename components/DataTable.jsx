"use client";

import { useMemo, useState } from "react";
import { ArrowUp, ArrowDown, Search } from "lucide-react";

const PAGE_SIZE = 12;

export default function DataTable({ columns, data, searchKeys = [], defaultSort }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(defaultSort || { key: columns[0].key, dir: "asc" });
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter((row) => searchKeys.some((k) => String(row[k] ?? "").toLowerCase().includes(q)));
  }, [data, query, searchKeys]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (typeof av === "number" && typeof bv === "number") {
        return sort.dir === "asc" ? av - bv : bv - av;
      }
      return sort.dir === "asc"
        ? String(av ?? "").localeCompare(String(bv ?? ""))
        : String(bv ?? "").localeCompare(String(av ?? ""));
    });
    return copy;
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageRows = sorted.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  function toggleSort(key) {
    setPage(0);
    setSort((prev) => (prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
  }

  return (
    <div className="bg-paper border border-line rounded-sm">
      {searchKeys.length > 0 && (
        <div className="flex items-center gap-2 px-4 py-3 border-b border-line">
          <Search size={15} className="text-steel shrink-0" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder="Search this table…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-steel/60"
          />
          <span className="font-mono text-[11px] text-steel whitespace-nowrap">{sorted.length} rows</span>
        </div>
      )}

      <div className="table-scroll overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-line">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  className={`font-mono text-[11px] uppercase tracking-wider text-steel px-4 py-3 cursor-pointer select-none whitespace-nowrap ${
                    col.align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {sort.key === col.key &&
                      (sort.dir === "asc" ? <ArrowUp size={11} aria-hidden="true" /> : <ArrowDown size={11} aria-hidden="true" />)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row, i) => (
              <tr key={i} className="border-b border-line last:border-0 hover:bg-cream/60">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-2.5 ${col.mono ? "font-mono text-[13px]" : ""} ${
                      col.align === "right" ? "text-right" : "text-left"
                    }`}
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-steel text-sm">
                  No rows match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-line font-mono text-[11px] text-steel">
          <span>
            Page {page + 1} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-2.5 py-1 border border-line rounded-sm disabled:opacity-40 hover:bg-cream"
            >
              Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="px-2.5 py-1 border border-line rounded-sm disabled:opacity-40 hover:bg-cream"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
