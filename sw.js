// Service worker ini minimalis, hanya untuk memenuhi syarat PWA.
// Ini akan menyimpan file 'index.html' ke cache.

const CACHE_NAME = 'app-shell-v1';
const urlsToCache = [
  '/' // Ini akan merujuk ke index.html
];

// Event install: simpan file ke cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event fetch: sajikan dari cache jika ada, jika tidak, ambil dari jaringan
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika ada di cache, kembalikan dari cache
        if (response) {
          return response;
        }
        // Jika tidak, ambil dari jaringan
        return fetch(event.request);
      }
    )
  );
});
