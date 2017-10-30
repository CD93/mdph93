var cacheName = 'place-handicap';
var filesToCache = [
  '/',
  'spip.php?page=sommaire',
  'spip.php?page=article&id_article=1',
  'spip.php?page=rubrique&id_rubrique=1',
  'spip.php?page=recherche',
  '/squelettes/js/require.js',
  '/squelettes/css/styles.css',
  '/squelettes/images/icon-message.png',
  '/squelettes/images/logo.png',
  '/squelettes/images/fbas.png',
  '/squelettes/images/fhaut.png',
  '/squelettes/images/menu_mobile.png'
  
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});
self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
