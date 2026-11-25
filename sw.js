/* NexusShop service worker v23 — invalida cachés viejas; manifest e íconos siempre frescos */
const CACHE = "nexusshop-v23";
const SHELL = ["/", "/index.html", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png", "/icon-maskable-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await Promise.all(SHELL.map((u) => c.add(u).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

const OFFLINE_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>NexusShop — offline</title><style>body{font-family:Georgia,serif;background:#e9e2d3;color:#26221b;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;text-align:center;padding:24px}b{color:#1d5c3f}</style></head><body><div><h1>Nexus<b>Shop</b></h1><p>Sin conexión / No connection.<br>Revisá tu WiFi o datos y reintentá.</p></div></body></html>`;

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  /* Navegaciones: network-first */
  if (req.mode === "navigate") {
    e.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) { const c = await caches.open(CACHE); c.put("/index.html", fresh.clone()); }
        return fresh;
      } catch (err) {
        const c = await caches.open(CACHE);
        const hit = await c.match(req) || await c.match("/index.html") || await c.match("/");
        if (hit) return hit;
        return new Response(OFFLINE_HTML, { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } });
      }
    })());
    return;
  }

  /* Manifest e íconos: SIEMPRE network-first (nunca stale) */
  if (/manifest\.webmanifest$|icon-.*\.png$/.test(url.pathname)) {
    e.respondWith((async () => {
      try {
        const fresh = await fetch(req, { cache: "no-store" });
        if (fresh && fresh.ok) { const c = await caches.open(CACHE); c.put(req, fresh.clone()); }
        return fresh;
      } catch (err) {
        const c = await caches.open(CACHE);
        const hit = await c.match(req);
        if (hit) return hit;
        return new Response("", { status: 504 });
      }
    })());
    return;
  }

  /* JS/CSS/imágenes: cache-first con revalidación */
  if (/\.(js|css|svg|png|jpe?g|webp|woff2?)$/i.test(url.pathname)) {
    e.respondWith((async () => {
      const c = await caches.open(CACHE);
      const hit = await c.match(req);
      const network = fetch(req).then((r) => { if (r && r.ok) c.put(req, r.clone()); return r; }).catch(() => null);
      if (hit) return hit;
      const r = await network;
      if (r) return r;
      return new Response("", { status: 504 });
    })());
  }
});
