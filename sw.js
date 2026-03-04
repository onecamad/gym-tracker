const CACHE_NAME = "gym-tracker-offline-v4";
const ASSETS = ["./","./index.html","./manifest.json","./sw.js","./icon-192.png","./icon-512.png"];
self.addEventListener("install",(e)=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",(e)=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME?caches.delete(k):null))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",(e)=>{e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).catch(()=>caches.match("./index.html"))))});
