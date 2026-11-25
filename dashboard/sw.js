// Caches the app shell only. Live monitor calls always go to the network.
const CACHE='bm-dashboard-v1';
const ASSETS=['./','index.html','manifest.webmanifest','app-icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==CACHE).map(n=>caches.delete(n))))));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin!==location.origin)return; // never cache the CMS
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
