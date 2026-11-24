/* Labas: app offline e promemoria delle scadenze */
const C='labas-v12';
const F=['./','index.html','app.js','manifest.webmanifest','icon-96.png','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png','lib/supabase.js','lib/shrikhand-latin.woff2','lib/shrikhand-latin-ext.woff2','lib/dmsans-latin.woff2','lib/dmsans-latin-ext.woff2','lib/leaflet.js','lib/leaflet.css','lib/jspdf.umd.min.js','lib/images/marker-icon.png','lib/images/layers.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>/^labas-/.test(n)&&n!==C).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const u=new URL(e.request.url);if(u.origin!==location.origin)return;
 /* subito la copia salvata (apertura istantanea anche con poca rete), intanto scarica la versione nuova per la prossima volta */
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(m=>{
  const net=fetch(new Request(e.request,{cache:'no-cache'})).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp)).catch(()=>{})}return r});
  if(m){e.waitUntil(net.catch(()=>{}));return m}
  return net.catch(()=>caches.match('./'));
 }));
});
function db(){return new Promise((ok,ko)=>{const r=indexedDB.open('labas',1);r.onupgradeneeded=()=>{const d=r.result;if(!d.objectStoreNames.contains('files'))d.createObjectStore('files');if(!d.objectStoreNames.contains('meta'))d.createObjectStore('meta')};r.onsuccess=()=>ok(r.result);r.onerror=()=>ko(r.error)})}
function op(d,mode,fn){return new Promise((ok,ko)=>{const t=d.transaction('meta',mode),q=fn(t.objectStore('meta'));t.oncomplete=()=>ok(q?q.result:undefined);t.onerror=()=>ko(t.error)})}
async function check(){
 if(self.Notification&&Notification.permission!=='granted')return;
 const d=await db(),due=(await op(d,'readonly',s=>s.get('due')))||[],sent=(await op(d,'readonly',s=>s.get('sent')))||[];
 const cfg=(await op(d,'readonly',s=>s.get('cfg')))||{};if(cfg.push)return;const leads=(Array.isArray(cfg.leads)?cfg.leads:[3,1,0]).map(Number).sort((x,y)=>x-y);
 const t=new Date();t.setHours(0,0,0,0);const out=[];
 for(const x of due){const dd=new Date(x.d+'T00:00:00');if(isNaN(dd))continue;const n=Math.round((dd-t)/864e5);
  const bk=leads.find(L=>L>=n),lvl=n<0?(leads.length?'late':null):bk===undefined?null:String(bk);if(!lvl)continue;
  const key=x.id+'|'+x.d+'|'+lvl;if(sent.includes(key))continue;
  const title=n<0?'Scadenza passata':n===0?'Scade oggi':n===1?'Scade domani':`Scade tra ${n} giorni`;
  await self.registration.showNotification(title,{body:x.t,tag:'labas-'+x.id,icon:'icon-192.png',badge:'icon-96.png',data:{url:'./#oggi'}});
  out.push(key)}
 if(out.length)await op(d,'readwrite',s=>s.put(sent.concat(out).slice(-400),'sent'));
}
self.addEventListener('message',e=>{if(e.data&&e.data.type==='check')e.waitUntil(check().catch(()=>{}))});
self.addEventListener('periodicsync',e=>{if(e.tag==='labas-scadenze')e.waitUntil(check().catch(()=>{}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c){c.navigate&&c.navigate((e.notification.data&&e.notification.data.url)||'./').catch(()=>{});return c.focus()}}return self.clients.openWindow((e.notification.data&&e.notification.data.url)||'./')}))});
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{}}catch(x){d={body:e.data&&e.data.text()}}e.waitUntil(self.registration.showNotification(d.title||'Labas',{body:d.body||'',tag:d.tag||'labas',icon:'icon-192.png',badge:'icon-96.png',data:{url:d.url||'./#oggi'}}))});
