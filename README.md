# B.N. Associates — Property Dealer Web App

A production-ready web app for **B.N. Associates**, a property dealing firm in New Delhi run by
**Preetpal Singh**. It covers the four services the firm offers — **Sale, Purchase, Renting and
Collaboration** — and gives the dealer a private dashboard to manage listings, enquiries, callback
requests and client reviews.

---

## Business details baked into the app

| | |
|---|---|
| Company | B.N. Associates |
| Principal | Preetpal Singh |
| Phones | 9599643948 · 8860800791 |
| Office | Plot No. C-2, Teacher Vihar, Shop No. 4, Near Medicine Factory, Nilothi Extension, New Delhi – 110041 |
| Services | Sale · Purchase · Renting · Collaboration |

Business details live in one place: [`src/lib/siteConfig.ts`](src/lib/siteConfig.ts). Edit that file
and the header, footer, contact page, schema.org markup and WhatsApp links all update together.

---

## Stack

- **Next.js 15** (App Router, React 19, Server Components) on **TypeScript**
- **Tailwind CSS** for styling, `lucide-react` for icons
- **Prisma 5 + SQLite** — zero-config local database, swappable for Postgres in one line
- **NextAuth v4** with credentials login for the dealer dashboard
- **Zod** validation on every public and admin form and API route

## Getting started

```bash
npm install          # install dependencies
npm run setup        # generate Prisma client, create the database, seed demo data
npm run dev          # http://localhost:3000
```

The admin account is created from `.env`:

```
ADMIN_EMAIL=preetpal@bnassociates.in
ADMIN_PASSWORD=ChangeMe@123
```

**Change both before putting this anywhere public.** Also replace `NEXTAUTH_SECRET` with a long random
string — generate one with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Dashboard: **[/admin](http://localhost:3000/admin)**

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (regenerates Prisma client first) |
| `npm start` | Run the production build |
| `npm run setup` | `prisma generate` + `db push` + seed — run this on a fresh clone |
| `npm run db:reset` | Wipe the database and re-seed |
| `npm run db:studio` | Browse the database in Prisma Studio |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |

---

## Public website

| Route | Purpose |
|---|---|
| `/` | Hero, quick search, services, featured and latest listings, process, reviews, localities, callback form |
| `/properties` | Searchable, filterable listing grid with pagination and sorting |
| `/properties/[slug]` | Gallery, key details, amenities, embedded map, per-property enquiry form, similar properties |
| `/services` | The four services in detail, paperwork explainer, FAQ |
| `/about` | Founder story, values, process, office details |
| `/contact` | Enquiry form, time-slot callback form, office details and map |

**Filters** on `/properties` cover purpose (sale / rent / collaboration), property type, locality,
budget band and bedrooms, plus a free-text search and sorting by price, area, recency or popularity.
All filter state is in the URL, so any filtered view is shareable and back/forward works.

**SEO**: per-page metadata with canonical URLs, Open Graph tags, a `RealEstateAgent` JSON-LD block on
every page, a `RealEstateListing` block on each property, `sitemap.xml` generated from the database,
and `robots.txt` that keeps `/admin` and `/api` out of the index.

## Dealer dashboard

| Route | Purpose |
|---|---|
| `/admin` | Counts, recent enquiries, callbacks, most-viewed listings |
| `/admin/properties` | Filterable list with inline edit, delete and view links |
| `/admin/properties/new` · `/admin/properties/[id]` | Create and edit listings |
| `/admin/enquiries` | Expandable enquiry rows, status pipeline, internal notes, one-tap call and WhatsApp |
| `/admin/callbacks` | Callback requests with done / reopen |
| `/admin/testimonials` | Add, approve, feature and delete client reviews |

The dashboard is protected at two layers: `src/middleware.ts` blocks unauthenticated requests before
render, and the route-group layout re-checks the session server-side. Every `/api/admin/*` route
independently verifies the session and returns `401` otherwise.

### Adding a listing

`Add property` → fill the form → **Create property**. The listing appears on the website immediately
when saved as *Published*. Photos are pasted as image URLs (the first one becomes the cover). A
property page URL is generated from the title, e.g.
`/properties/3-bhk-apartment-nilothi-extension-covered-parking`.

---

## Data model

`prisma/schema.prisma`

- **Property** — listing details, location and coordinates, specs, amenities and images (JSON text),
  pricing, status (`DRAFT` / `PUBLISHED` / `SOLD` / `RENTED` / `CLOSED`), featured flag, view counter
- **Enquiry** — website enquiries with interest type, budget, locality, status pipeline and internal notes
- **CallbackRequest** — time-slot callback requests from the home and contact pages
- **Testimonial** — client reviews with approval and featured flags
- **User** — dealer login

`npm run db:seed` loads 12 realistic sample listings across Delhi localities, 6 reviews, sample
enquiries and callback requests so every screen has content on first run.

---

## Project layout

```
prisma/
  schema.prisma        database schema
  seed.ts              sample listings, reviews, enquiries
src/
  app/
    page.tsx           home
    properties/        listing grid + [slug] detail page
    services/  about/  contact/
    admin/
      login/           dealer login
      (dashboard)/     protected dashboard routes
    api/
      enquiries/       public enquiry POST
      callback/        public callback POST
      admin/           guarded property, enquiry, callback, review endpoints
      auth/            NextAuth
  components/
    layout/  property/  forms/  sections/  admin/  ui/
  lib/
    siteConfig.ts      business details — edit this first
    constants.ts       services, labels, filter options
    queries.ts         cached server-side data access
    validation.ts      Zod schemas and rate limiting
  middleware.ts        dashboard auth guard
```

---

## Production notes

- Change `ADMIN_PASSWORD` and `NEXTAUTH_SECRET` in `.env` before deploying.
- Set `NEXTAUTH_URL` to the real domain.
- The canonical URL, sitemap and Open Graph base are hardcoded to `https://bnassociates.in` in
  `src/app/layout.tsx` and `src/app/sitemap.ts` — update these when the domain is confirmed.
- For real image uploads, add a storage provider (Cloudinary or S3) and swap the URL-paste field in
  `src/components/admin/PropertyForm.tsx` for an upload widget.
- SQLite is fine for a single-office business. Move to Postgres by changing the datasource provider in
  `schema.prisma` and the `DATABASE_URL`.
- Public forms are rate limited per IP (6 enquiries and 8 callbacks per 10 minutes).

## Tech notes

- Next.js 15.5 and React 19 are used deliberately: earlier 14.x releases carry a critical
  unauthenticated RCE advisory on Windows-hosted servers. `npm audit` reports zero vulnerabilities.
- `next/image` is restricted to `images.unsplash.com` and `res.cloudinary.com`. Add your own host to
  `remotePatterns` in `next.config.js` if you host images elsewhere.
- Listing pages are statically generated from the database; the home page, search and enquiry pages are
  dynamic so new listings appear immediately.
