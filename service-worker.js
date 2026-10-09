const cacheName = "unmuted-v1";

const appFiles = [
  "./",
  "index.html",
  "manifest.json",
  "css/style.css",
  "js/data.js",
  "js/app.js",
  "js/player.js",
  "images/logo.svg",
  "images/icon-192.png",
  "images/icon-512.png",
  "images/apple-touch-icon.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(appFiles);
    })
  );
  self.skipWaiting();
});

// remove caches from older versions of the app
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      const oldNames = names.filter(function (name) {
        return name !== cacheName;
      });
      return Promise.all(oldNames.map(function (name) {
        return caches.delete(name);
      }));
    })
  );
  self.clients.claim();
});

// try the network first so new episodes show up, and use the cache when offline
self.addEventListener("fetch", function (event) {
  const request = event.request;

  if (request.method !== "GET" || request.url.includes("/audio/")) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then(function (response) {
        if (response.status === 200) {
          const copy = response.clone();
          caches.open(cacheName).then(function (cache) {
            cache.put(request, copy);
          });
        }
        return response;
      })
      .catch(function () {
        return caches.match(request).then(function (cached) {
          if (cached) {
            return cached;
          }
          if (request.mode === "navigate") {
            return caches.match("index.html");
          }
          return Response.error();
        });
      })
  );
});
