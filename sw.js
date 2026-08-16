/* GasCurve — service worker
   Estratégia: cache-first para o casco do app, com atualização em segundo plano.
   Trocar CACHE ao publicar versão nova: é o que faz o aparelho baixar de novo.  */
const CACHE = "gascurve-v3.8";
const ASSETS = ["./","./index.html","./manifest.json",
                "./icon-180.png","./icon-192.png","./icon-512.png","./icon-maskable-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(hit => {
      // devolve o cache na hora e busca a versão nova por trás
      const net = fetch(e.request).then(res => {
        if (res && res.status === 200 && res.type === "basic")
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
