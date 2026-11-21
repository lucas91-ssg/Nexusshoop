/* NexusShop service worker — network-first for pages, stale-while-revalidate for assets, never caches errors. */
const CACHE = "nexusshop-v21";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === "navigate") {
    e.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) { const c = await caches.open(CACHE); c.put(req, fresh.clone()); }
        return fresh;
      } catch (err) {
        const c = await caches.open(CACHE);
        const hit = await c.match(req) || await c.match("/index.html") || await c.match("/");
        if (hit) return hit;
        return new Response("Offline", { status: 503, headers: { "Content-Type": "text/plain" } });
      }
    })());
    return;
  }
  if (/\.(js|css|svg|png|jpe?g|webp|woff2?|webmanifest)$/i.test(url.pathname)) {
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
