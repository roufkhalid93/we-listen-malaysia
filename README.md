# We Listen Malaysia — Public Website

This is the **public-facing fundraising site** for We Listen Malaysia
Organisation: Home, Causes, About Us, Contact Us, and Donate. It has no
backend of its own — all data (causes, org stats) is fetched from, and all
public submissions (donations, contact messages) are sent to, the separate
**admin repo**, which owns the JSON-file backend.

> Looking for the admin panel and login system?
> That lives in a separate repo, `we-listen-malaysia-admin`. This site talks
> to it over HTTP.

## Tech stack

- Next.js 14 (App Router), TypeScript, Tailwind CSS
- No local data storage or API routes — everything goes through
  `lib/api.ts`, a small fetch client pointed at the admin repo

## Getting started

**The admin repo must be running first** (or at least reachable), since this
site fetches its causes and stats from it.

```bash
npm install
cp .env.example .env.local   # point NEXT_PUBLIC_API_URL at the admin repo
npm run dev
```

This app runs on **http://localhost:3000** by default. The admin repo runs
on **http://localhost:4001** by default — if you haven't changed either, the
defaults in `.env.example` already match and you can skip the `.env.local`
step for local development.

For production:

```bash
npm run build
npm run start
```

## Environment variables

| Variable                | Purpose                                                      |
|---------------------------|----------------------------------------------------------------|
| `NEXT_PUBLIC_API_URL`     | Base URL of the admin repo's backend (e.g. `https://api.welisten.org.my`) |
| `NEXT_PUBLIC_ADMIN_URL`   | Base URL used for the "Admin Login" link in the footer          |

Both are public (`NEXT_PUBLIC_*`) since they're only used to build fetch URLs
and a link — no secrets live in this repo.

## What's in here

- `app/page.tsx` — Homepage (hero, live stats, top-priority causes, contact section)
- `app/causes/` — Causes listing (filterable) + `[slug]` detail page
- `app/about/` — About Us
- `app/contact/` — Contact Us (2 person-in-charge cards, form, address)
- `app/donate/` — Donate page (click a cause card → donation modal)
- `lib/api.ts` — fetch client for the admin repo's public endpoints:
  - `getCauses()` → `GET /api/causes`
  - `getOrgStats()` → `GET /api/org-stats`
  - `submitDonation()` → `POST /api/donations`
  - `submitContactMessage()` → `POST /api/contact`
- `lib/types.ts` — shared `Cause` / `OrgStats` types (mirrors the shape
  returned by the admin repo's API)

## Notes

- Causes and stats are fetched fresh on every request (`cache: "no-store"`)
  so admin edits show up on the public site without redeploying.
- The donation and contact forms call the admin repo's API **directly from
  the browser**, so the admin repo must have this site's origin listed in
  its `FRONTEND_ORIGIN` env variable, or those requests will be blocked by
  CORS. See the admin repo's README for details.
- The donation flow is a **demo checkout** — no real payment gateway is
  wired up.
