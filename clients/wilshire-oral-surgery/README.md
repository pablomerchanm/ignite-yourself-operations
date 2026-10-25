# Wilshire Oral Surgery — Authority Platform Previews

Two **private sales previews** (concepts, not final sites) for the two surgeons at
Wilshire Oral Surgery and Implant Center. Each is a self-contained static site,
deployed as its **own** Vercel project.

| Preview | Doctor | Template | Angle |
|---|---|---|---|
| `preview-vahedi/` | Dr. Saman Vahedi, DDS, MD | v2 "Monograph" (Credential Authority) | The dual DDS + MD training as a practice philosophy |
| `preview-shadi/` | Dr. Jonathan R. Shadi, DDS | v9 "Holistic" (Human Trust) | The West LA surgeon who came home to operate |

Both carry a visible **"Private preview — concept"** flag, a **"Prepared by Ignite
Yourself"** footer, `noindex, nofollow`, and a **disabled** referral form (visual only —
never submits, no data collected). Every factual claim traces to the research file
(PIF); institutions are set as typographic wordmarks, not trademarked logos.

## Stack

Vanilla HTML/CSS/JS — **no build step**. Content lives in `content.json`; the page shell
in `index.html` renders it and adds motion via vendored GSAP + Lenis (`vendor/`). Assets
resolve from the site root: `/content.json`, `/img/*`, `/vendor/*`.

## Run locally

`fetch()` needs HTTP (not `file://`). From either preview folder:

```bash
cd preview-vahedi     # or preview-shadi
python3 -m http.server 8080
# open http://127.0.0.1:8080
```

## Deploy to Vercel — one project per preview

Each folder is an independent, static Vercel project. Use a **neutral** project name
(e.g. `sv-preview`, `js-preview`) — nothing with "ignite", "test", or "demo" in the
subdomain.

**Vercel dashboard → Add New → Project → import this repo, then for each preview:**

1. **Project Name:** `sv-preview` (Vahedi) / `js-preview` (Shadi)
2. **Root Directory:** `clients/wilshire-oral-surgery/preview-vahedi`
   (or `.../preview-shadi`) — click *Edit* and select the subfolder
3. **Framework Preset:** Other · **Build Command:** none · **Output Directory:** leave empty
4. Deploy. `vercel.json` in each folder sets `cleanUrls` + `trailingSlash:false`.

**Or via CLI** (run inside the preview folder):

```bash
cd clients/wilshire-oral-surgery/preview-vahedi
npx vercel deploy --prod --yes --name sv-preview
```

Repeat for `preview-shadi` with `--name js-preview`.

> These use the doctors' official photos for a private concept only. A shipped platform
> needs client-provided/authorized imagery. Keep previews `noindex` and unlisted.
