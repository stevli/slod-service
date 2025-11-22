addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  // Simple router for a couple of example paths
  if (url.pathname === '/api/now') {
    return new Response(JSON.stringify({ now: new Date().toISOString() }), {
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    })
  }

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Sample Cloudflare Worker Page</title>
    <style>
      body { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Arial; margin: 0; padding: 24px; color: #0b1220; background: linear-gradient(180deg,#f8fafc,#ffffff); }
      header { display:flex; align-items:center; gap:12px }
      h1 { margin: 0; font-size: 24px }
      .card { margin-top:18px; padding:16px; border-radius:8px; background:#fff; box-shadow:0 6px 18px rgba(11,18,32,0.06); }
      button { background:#0066ff; color:#fff; border:0; padding:8px 12px; border-radius:6px; cursor:pointer }
      pre { background:#0b1220; color:#e6eef8; padding:12px; border-radius:6px; overflow:auto }
    </style>
  </head>
  <body>
    <header>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#0066ff"/><path d="M7 12h10M7 8h6M7 16h4" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <div>
        <h1>Sample Cloudflare Worker Page</h1>
        <div style="color:#536070;font-size:13px">Served from a Worker — try the button below</div>
      </div>
    </header>

    <div class="card">
      <p>This is a tiny example page you can deploy to Cloudflare Workers. It includes a small API at <code>/api/now</code>.</p>
      <p>
        <button id="nowBtn">Get server time (from /api/now)</button>
      </p>
      <div style="margin-top:12px">
        <pre id="output">Ready.</pre>
      </div>
    </div>

    <script>
      document.getElementById('nowBtn').addEventListener('click', async function() {
        const out = document.getElementById('output')
        out.textContent = 'Fetching...'
        try {
          const res = await fetch('/api/now')
          const data = await res.json()
          out.textContent = JSON.stringify(data, null, 2)
        } catch (err) {
          out.textContent = 'Error: ' + err.messageF
        }
      })
    </script>
  </body>
</html>`

  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } })
}

// Optionally export for module workers / testing
export { handleRequest }
