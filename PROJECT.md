# justack.ai — Website

**Owner:** Humilitas Group Limited
**URL:** https://justack.ai
**Repo:** https://github.com/justack-ai/website
**License:** Apache 2.0

## Tech Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Sanity CMS v5 (project `b0kmw4n5`, dataset `production`)
- Deployed on Vercel

## Site Structure

| Route | Purpose |
|-------|---------|
| `/` | Homepage |
| `/about` | About Humilitas Group / Justack |
| `/blog` | Blog index (Sanity-powered) |
| `/blog/[slug]` | Individual blog posts |
| `/build` | Open-source / build with us |
| `/faq` | Frequently asked questions |
| `/help` | Help / support |
| `/invest` | Investor / partnership info |
| `/tools` | Lawyer network / tools |
| `/a2jai` | A2J AI product page |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/studio` | Embedded Sanity Studio (CMS) |
| `/api/subscribe` | Email subscription API |

## Environment Variables

Copy `.env.local.example` to `.env.local`:

| Variable | Required | Notes |
|----------|----------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | `b0kmw4n5` |
| `NEXT_PUBLIC_SANITY_DATASET` | No | Defaults to `production` |
| `SANITY_API_TOKEN` | No | For authenticated Sanity requests |

## Local Development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploy

Push to `main` — Vercel auto-deploys.

## Content

- **Blog posts:** Managed in Sanity CMS at `/studio`. Only posts with `status: published` appear on the site.
- **MDX drafts:** `content/blog/` contains unpublished drafts. Migrated posts are in `content/blog/_archived/`.

## Current Status

- Site live at justack.ai
- Flat-fee services content archived (Mar 2026)
- Sanity CMS active for blog content
- A2J Navigator product in development
