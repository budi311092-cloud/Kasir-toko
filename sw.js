const CACHE_NAME = 'mahakarya-pos-v1';
const urlsToCache = [
  './',
  './index.html'
];

// 1. Install Service Worker dan Simpan Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Ambil Data dari Cache saat Offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika ada di cache, ambil dari cache. Jika tidak, ambil dari internet.
        return response || fetch(event.request);
      })
  );
});

// 3. Hapus Cache Lama jika ada pembaruan sistem
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
