# Sample Cloudflare Worker: slod-sample-page

This folder contains a minimal Cloudflare Worker that serves a small HTML page and a JSON endpoint at `/api/now`.

Files:
- `worker.js` — the Worker script that returns HTML and a tiny API.
- `wrangler.toml` — configuration for `wrangler`.

Quickstart (local development):

1. Install `wrangler` (Cloudflare CLI). If you use npm:

```bash
npm install -g wrangler
```

2. Run the Worker locally:

```bash
cd cloudflare-worker
wrangler dev
```

Open the printed local URL (usually `http://127.0.0.1:8787`) to view the page.

Deploy to Cloudflare Workers:

1. Login (if you haven't):

```bash
wrangler login
```

2. Publish:

```bash
wrangler publish
```

Notes:
- To publish under your account/route, set `account_id` in `wrangler.toml`.
- The `worker.js` uses the classic service-worker format and also exports `handleRequest` for optional unit testing.

If you want a module-style Worker (ES module entry), let me know and I can convert the script and `wrangler.toml` accordingly.
