# SCM Analytics Platform — Website
https://scm-analytics-platform-dashboard.vercel.app/


Next.js 16 + Tailwind v4 dashboard built on the Gold-layer output of the Databricks
SCM Analytics Platform pipeline. Verified with a clean production build
(`npm run build` — 0 errors, all 8 routes prerendered as static).

## Run locally
```bash
npm install
npm run dev       # http://localhost:3000
```

## Production build
```bash
npm run build
npm start
```

## Deploy to Vercel (2 minutes, no CLI needed)
1. Push this folder to a GitHub repo.
2. Go to vercel.com → **Add New Project** → import that repo.
3. Vercel auto-detects Next.js — leave all settings default → **Deploy**.
That's it; no environment variables or extra config required.

## What's inside
- `app/page.js` — landing page (route-network hero, live summary stats)
- `app/dashboard/` — Overview + 5 domain pages (Inventory, Procurement, Suppliers,
  Logistics, Planning), each with KPI cards, charts, and a searchable/sortable table
- `data/*.json` — static export of the validated Gold-layer pipeline run
- `components/` — shared UI (nav, KPI cards, charts, data table, status badges)
- `public/fonts/` — self-hosted font files (Big Shoulders Display, IBM Plex Sans/Mono)

## Swapping in live data later
Right now the dashboard reads static JSON in `data/`. To make it live, replace those
imports with fetch calls to a Next.js API route that queries your Databricks SQL
warehouse (see the main project's `PowerBI_Dashboard_Guide.md` for the same
connection details — server hostname + HTTP path from the warehouse's Connection
Details tab).
