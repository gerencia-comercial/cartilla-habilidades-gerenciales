/* Service worker: guarda la aplicación en la tablet para que
   funcione siempre, con o sin internet. */

var CACHE = 'variedades-naranjo-v2';

var ARCHIVOS = [
  './',
  './index.html',
  './css/estilos.css',
  './js/app.js',
  './manifest.json',
  './iconos/icono-192.png',
  './iconos/icono-512.png',
  './iconos/icono-maskable-512.png'
];

self.addEventListener('install', function (ev) {
  ev.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(ARCHIVOS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (ev) {
  ev.waitUntil(
    caches.keys().then(function (claves) {
      return Promise.all(claves.map(function (clave) {
        if (clave !== CACHE) return caches.delete(clave);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (ev) {
  if (ev.request.method !== 'GET') return;
  ev.respondWith(
    caches.match(ev.request, { ignoreSearch: true }).then(function (respuesta) {
      if (respuesta) return respuesta;
      return fetch(ev.request).then(function (red) {
        var copia = red.clone();
        caches.open(CACHE).then(function (cache) { cache.put(ev.request, copia); });
        return red;
      }).catch(function () {
        if (ev.request.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});
