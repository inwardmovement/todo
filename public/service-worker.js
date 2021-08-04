const CACHE_NAME = "inwardmovement-todo-v2";
const assetToCache = [
  '/',
  '/index.html',
  '/build/bundle.js',
  '/build/bundle.css'
]

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(assetToCache)
      })
      .catch(console.error)
  )
})

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response
      }
      return fetch(event.request)
    })
  )
})
