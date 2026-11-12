const C='varam-v8';
const F=['./','index.html','manifest.webmanifest','icon.svg','icon-180.png','icon-192.png','icon-512.png','img/tren-3d.jpg','img/comida-antes.jpg','img/comida-despues.jpg','img/videoclip-1.jpg','img/videoclip-2.jpg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
/* siempre pide la versión nueva a internet (sin caché del navegador); si no hay red, usa la copia guardada */
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET'||new URL(q.url).origin!==location.origin)return;
  e.respondWith(fetch(q,{cache:'no-store'}).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(q,cp));return r}).catch(()=>caches.match(q,{ignoreSearch:true})))});
