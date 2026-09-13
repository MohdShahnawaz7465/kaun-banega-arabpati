// Service worker for Kaun Banega Arabpati.
// Caches the app shell on install so it works fully offline once installed.
// NOTE: this only caches local files. External resources (like the Google
// Fonts import in style.css) will simply fall back to system fonts when
// offline - that's expected and not a bug.

const CACHE_NAME = "kbap-cache-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Network-first for navigation requests, falling back to cache when offline.
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Stale-while-revalidate for everything else: serve the cached copy
  // immediately for speed, but always fetch a fresh copy in the background
  // and update the cache for next time. This means updates to style.css/
  // script.js show up on the NEXT reload instead of staying stuck forever.
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(event.request).then((cached) => {
        const networkFetch = fetch(event.request)
          .then((response) => {
            if (response.ok && event.request.url.startsWith(self.location.origin)) {
              cache.put(event.request, response.clone());
            }
            return response;
          })
          .catch(() => cached); // offline and not cached - nothing we can do

        return cached || networkFetch;
      })
    )
  );
});