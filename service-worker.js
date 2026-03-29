const CACHE_NAME = 'amenglish-cache-v2';
const APP_SHELL = [
  '/shry_english-pwa/',
  '/shry_english-pwa/index.html',
  '/shry_english-pwa/manifest.json',
  '/shry_english-pwa/icons/icon-192.png',
  '/shry_english-pwa/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
