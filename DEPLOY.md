# Deploying to Vercel

Roughly 20 minutes. Order matters — the database has to exist before the first
deploy or the blog will build with no posts.

## 1. Create the database

Vercel Dashboard → **Storage** → **Create Database** → **Neon** (Postgres).
Supabase or Railway work identically; the rest of these steps are unchanged.

Pick a region close to your visitors *and* to your functions — `Frankfurt` or
`Paris` for a Moroccan/European audience. A database in Virginia adds ~120ms to
every page render.

Creating it through the Vercel dashboard sets `DATABASE_URL` on the project
automatically. If you create it elsewhere, copy the connection string yourself.

> Use the **pooled** connection string (Neon calls it "Pooled connection", the
> host contains `-pooler`). Serverless opens a new pool per function instance,
> and the unpooled endpoint will run out of connections under load.

## 2. Create the table

Neon and Supabase both have an SQL editor in their dashboard — paste the
contents of [`db/schema.sql`](db/schema.sql) and run it.

With `psql` installed you can instead run:

```bash
psql "<your DATABASE_URL>" -f db/schema.sql
```

## 3. Push the repo to GitHub

```bash
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

`.env*` is gitignored, so no secrets travel with it.

## 4. Import the project

Vercel → **Add New** → **Project** → pick the repo. Framework detection (Next.js)
and the build command are correct by default; change nothing.

## 5. Set the environment variables

Project → **Settings** → **Environment Variables**. Set these for **Production**
(and Preview, if you want previews to work):

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | Pooled Postgres connection string (already set if you used step 1) |
| `ADMIN_PASSWORD` | The password you will type at `/admin`. Long and random. |
| `AUTH_SECRET` | Signs the session cookie — see below |
| `NEXT_PUBLIC_SITE_URL` | Your final URL, no trailing slash, e.g. `https://kitsudigital.com` |
| `CONTACT_WEBHOOK_URL` | *Optional.* Anything accepting a JSON POST (Slack, Make, n8n). Without it the contact form falls back to a prefilled mailto link. |

Generate the secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

`NEXT_PUBLIC_SITE_URL` is baked in at build time and drives canonical URLs, the
sitemap and OG tags. **Set it before the first deploy**, and redeploy whenever it
changes — pointing a custom domain at the project does not update it on its own.

## 6. Deploy

Push, or hit **Deploy**. The first build prerenders whatever posts exist and
enables ISR, so anything published later appears within a minute without a
rebuild.

## 7. Move your existing posts across

The three markdown posts in `content/blog/` are not migrated automatically. From
your machine, pointing at the production database:

```bash
DATABASE_URL="<production connection string>" node scripts/seed-posts.mjs
```

Idempotent — safe to re-run.

## 8. Add your domain

Project → **Settings** → **Domains**. Then update `NEXT_PUBLIC_SITE_URL` to match
and redeploy, or your canonical tags will keep pointing at the `.vercel.app` URL.

---

## After it is live

- **Sign in** at `https://yourdomain.com/admin`.
- **Preview deployments are excluded from search engines** automatically
  (`robots.ts` checks `VERCEL_ENV`), so per-commit URLs will not compete with
  your real domain.
- **Publishing a post** revalidates the homepage, `/blog`, the post itself and
  the sitemap. No redeploy needed.
- **If the database goes down**, public pages still render — the blog degrades to
  "no posts" rather than returning a 500. The admin will show the error.

## Before you call it launched

These are still template placeholders and are visible to customers:

- **Prices** in `src/components/sections/Pricing.tsx` — currently `$2,499` /
  `$4,999`, inherited from the template. The page's whole promise is published,
  fixed pricing, so these being wrong undermines it.
- **Contact email, founding year, address, social handles** in
  `src/config/site.ts` — these are emitted into JSON-LD structured data.
- `Portfolio.tsx` and `Testimonials.tsx` are not rendered on the homepage. They
  still contain invented clients and outcomes. Put them back only once you have
  real work and real quotes.
