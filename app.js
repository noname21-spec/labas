
{
const KEY='labas-erasmus-v2',OLD='labas-erasmus-v1';
const uid=()=>Math.random().toString(36).slice(2,10);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $=s=>document.querySelector(s);
const eur=n=>{const v=Math.round((+n||0)*100)/100;return v.toLocaleString('it-IT',{minimumFractionDigits:Number.isInteger(v)?0:2,maximumFractionDigits:2})+' €'};
const sum=a=>a.reduce((t,x)=>t+(+x.v||0),0);
const COLS=['#ff4f9a','#ff7a1a','#ffc21a','#46d394','#3fb6e8','#ffa8cf'];
const CHECK='<svg viewBox="-24 -24 48 48" aria-hidden="true">'+Array.from({length:10},(_,k)=>`<ellipse cx="0" cy="-12.5" rx="5" ry="10" style="fill:var(${k%2?'--orange':'--pink'})" stroke="#22140a" stroke-width="2" transform="rotate(${k*36})"/>`).join('')+'<circle r="8.5" style="fill:var(--yel)" stroke="#22140a" stroke-width="2"/><path d="M-4 0.5l2.8 2.8 5-5.6" fill="none" stroke="#22140a" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ICOPY='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="8" y="8" width="12" height="12" rx="3"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>';
const ISTAR='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z"/></svg>';
const PH=[['prima','Prima di partire'],['valigia',"Valigia per l'inverno"],['arrivo','Appena arrivato'],['durante','Durante il semestre'],['rientro','Prima di tornare']];
const DAYS=['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì'];
const ROLES=["Ufficio internazionale Bologna","Ufficio internazionale EHU","Coordinatore Erasmus","Buddy","Padrone di casa","Ambasciata d'Italia a Vilnius"];
const PLACES=[['oldtown','Città vecchia','Il Senamiestis barocco, patrimonio UNESCO, tutto a piedi.'],['uzupis','Užupis',"Il quartiere degli artisti che si è proclamato repubblica; festa il 1° aprile."],['gediminas','Torre di Gediminas','Sulla collina sopra il centro, la vista migliore sulla città.'],['aurora',"Porta dell'Aurora","L'unica porta rimasta delle mura, con la cappella dell'icona."],['trakai','Trakai',"Gita in giornata al castello sull'isola."]];
const LT=[['labas','Labas','Ciao','làbas'],['diena','Laba diena','Buongiorno','laba dièna'],['aciu','Ačiū','Grazie','àciu'],['prasau','Prašau','Per favore, prego','prashàu'],['atsiprasau','Atsiprašau','Scusa','atsiprashàu'],['taip','Taip / Ne','Sì / No','taip / ne'],['kiek','Kiek kainuoja?','Quanto costa?','kiek kainuòia'],['nesuprantu','Nesuprantu','Non capisco','nesuprantù'],['iki','Iki!','Ciao, a presto','ìki'],['sveikata','Į sveikatą!','Salute!','i sveikàta']];
const ENG=[
 ['lezione','A lezione',[["Sorry, could you repeat that, please?","Scusi, può ripetere?"],["Could you explain what you mean by that?","Può spiegare cosa intende?"],["If I understood correctly, you are saying that…","Se ho capito bene, sta dicendo che…"],["I'd like to add something to that point.","Vorrei aggiungere qualcosa su questo punto."],["Will the slides be available online?","Le slide saranno disponibili online?"]]],
 ['esami','Esami orali e presentazioni',[["Let me start by outlining the main points.","Inizio riassumendo i punti principali."],["That's a good question; let me think for a moment.","Bella domanda, mi lasci pensare un attimo."],["To put it another way, …","Detto in altre parole, …"],["I'm not entirely sure, but I believe that…","Non ne sono del tutto sicuro, ma credo che…"],["In conclusion, I would argue that…","In conclusione, direi che…"]]],
 ['email','Email e uffici',[["I am writing to ask about…","Le scrivo per chiedere informazioni su…"],["Could you please let me know whether…?","Potrebbe farmi sapere se…?"],["Please find attached my Learning Agreement.","In allegato trova il mio Learning Agreement."],["I look forward to hearing from you.","Resto in attesa di un suo riscontro."]]],
 ['gruppo','Lavori di gruppo',[["Shall we divide the tasks?","Ci dividiamo i compiti?"],["I can take care of the introduction.","Posso occuparmi io dell'introduzione."],["When shall we meet next?","Quando ci rivediamo?"],["What do you think about this idea?","Cosa ne pensate di questa idea?"]]]
];
const HOUSE='Miniappartamento: contratto, caparra e consegna delle chiavi';
const BAGT=[['valigia','Giaccone imbottito per temperature sotto zero','',0],['valigia','Berretto, sciarpa e guanti','',0],['valigia','Scarponcini impermeabili con suola antiscivolo','',0],['valigia','Intimo termico e calze di lana','',0],['valigia','Adattatore per prese tipo F (le spine italiane grandi non entrano)','',0],['valigia','Crema idratante e burrocacao','',0],['valigia','Documenti e Learning Agreement nel bagaglio a mano','',0],['valigia','Pesare la valigia prima di partire','2027-01-31',0]];
const VER='2.2.0';
const SETD=()=>({name:'Matteo',uni:'European Humanities University',goal:30,theme:'auto',text:'n',motion:true,intro:true,start:'oggi',leads:[3,1,0],en:true,lt:true,onb:false,pin:null,push:false,cal:null,style:'flower'});
const mkTask=([ph,t,due,d])=>({id:uid(),ph,t,due,done:!!d});
const DEF=()=>{
 const exp=[['Affitto',320],['Spesa',170],['Trasporti',15],['Telefono',10],['Uscite e gite',90],['Altro',40]].map(([n,v])=>({id:uid(),n,v}));
 const rec=[[0,'Affitto',320,1],[2,'Abbonamento trasporti',15,1],[3,'SIM',10,5]].map(([c,n,v,day])=>({id:uid(),c:exp[c].id,n,v,day,from:'2027-02'}));
 return {u:0,dep:'2027-02-01',ret:'2027-07-31',
 tasks:[['prima','Learning Agreement firmato da te, Bologna ed EHU','2026-12-15',0],['prima','Accordo finanziario della borsa firmato','2027-01-15',0],['prima','Test di lingua online, se richiesto dal bando','',1],['prima','Tessera sanitaria valida come TEAM fino a fine luglio','',1],['prima','Verificare assicurazione infortuni e responsabilità civile','2027-01-20',0],['prima',HOUSE,'2026-12-20',0],["prima","Carta d'identità valida per l'espatrio",'',1],['prima','Volo per Vilnius prenotato','2026-12-10',0],['prima','Account ed email istituzionale EHU attivati','2027-01-25',0],
 ...BAGT,
 ['arrivo',"Certificato di arrivo firmato dall'ufficio internazionale",'2027-02-05',0],['arrivo',"Registrazione del soggiorno oltre 3 mesi: chiedere all'ufficio internazionale",'',0],['arrivo','Biglietto o carta trasporti con sconto studenti','2027-02-03',0],['arrivo','SIM lituana o roaming UE','',0],
 ['durante','Modifiche al Learning Agreement, se cambiano i corsi','2027-03-01',0],['durante','Iscrizione agli esami','',0],
 ['rientro','Transcript of Records richiesto','2027-07-15',0],['rientro','Certificato di fine periodo firmato','2027-07-30',0],['rientro','Relazione finale online','2027-08-31',0]].map(mkTask),
 inc:[['Borsa Erasmus',350],['Risparmi e altre entrate',320]].map(([n,v])=>({id:uid(),n,v})),
 exp,
 rec,
 log:[[0,'2027-02-01','Affitto',320,0],[1,'2027-02-03','Spesa da Maxima',38.5],[2,'2027-02-01','Abbonamento trasporti',15,1],[4,'2027-02-07','Cena con il gruppo Erasmus',22],[1,'2027-02-09','Spesa da Iki',41.2],[3,'2027-02-05','SIM',10,2],[4,'2027-02-14','Gita a Trakai',18]].map(([c,d,n,v,ri])=>Object.assign({id:uid(),c:exp[c].id,d,n,v},ri!==undefined?{rid:rec[ri].id}:{})),
 courses:[['Media and Society',6],['Visual Culture',6],['Digital Media Practices',6],['Academic English',5]].map(([n,e])=>({id:uid(),n,e,s:false,g:''})),
 sched:[[0,'10:00','11:30','Media and Society','Aula 302'],[1,'14:00','15:30','Visual Culture','Aula 210'],[2,'10:00','11:30','Media and Society','Aula 302'],[2,'16:00','17:30','Academic English','Aula 105'],[3,'12:00','13:30','Digital Media Practices','Lab 2']].map(([d,a,b,c,r])=>({id:uid(),d,a,b,c,r})),
 diary:[],seen:[],learned:[],lt:[],contacts:[],docs:[],bag:{lim:20,kg:''},bagAdded:true,set:SETD(),writes:[],srs:{},home:null,campus:null,near:null};
};
function fill(o){
 const base=DEF();
 for(const k in base)if(o[k]===undefined||(Array.isArray(base[k])&&!Array.isArray(o[k])))o[k]=base[k];
 if(!o.bag||typeof o.bag!=='object')o.bag={lim:20,kg:''};
 o.set=Object.assign(SETD(),o.set&&typeof o.set==='object'?o.set:{});if(!Array.isArray(o.set.leads))o.set.leads=[3,1,0];
 o.tasks.forEach(t=>{if(t.due===undefined)t.due='';if(t.t==='Alloggio: residenza studentesca o stanza in affitto')t.t=HOUSE});
 if(!o.bagAdded){if(!o.tasks.some(t=>t.ph==='valigia'))o.tasks.push(...BAGT.map(mkTask));o.bagAdded=true}
 return o;
}
let S=null;
try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S||!Array.isArray(S.tasks)){let o=null;try{o=JSON.parse(localStorage.getItem(OLD))}catch(e){}S=o&&Array.isArray(o.tasks)?o:DEF()}
S=fill(S);
const SB_URL='https://nesozulkxioahnqfgqvt.supabase.co',SB_KEY='sb_publishable_YZne7hPWdSltL6C-Ffbusg_w5dZAISb',BUCKET='labas';
let mon='',SB=null,USER=null;
function toast(msg,undo){$('#tmsg').textContent=msg;const t=$('#toast'),u=$('#tundo');u.style.display=undo?'':'none';u.onclick=()=>{if(undo)undo();t.classList.remove('on')};t.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove('on'),5000)}
const setSync=(c,m)=>{const e=$('#sync');e.className='sync '+c;e.textContent=m};
const saveLocal=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));return true}catch(e){toast('Memoria del telefono piena: libera spazio e riprova');return false}};
/* IndexedDB: foto e documenti (files), scadenze per i promemoria (meta) */
const idb=(()=>{let p=null;const open=()=>p||(p=new Promise((ok,ko)=>{const r=indexedDB.open('labas',1);r.onupgradeneeded=()=>{const d=r.result;if(!d.objectStoreNames.contains('files'))d.createObjectStore('files');if(!d.objectStoreNames.contains('meta'))d.createObjectStore('meta')};r.onsuccess=()=>ok(r.result);r.onerror=()=>ko(r.error)}));
 const tx=(st,mode,fn)=>open().then(d=>new Promise((ok,ko)=>{const t=d.transaction(st,mode),q=fn(t.objectStore(st));t.oncomplete=()=>ok(q?q.result:undefined);t.onerror=()=>ko(t.error);t.onabort=()=>ko(t.error)}));
 return{get:(st,k)=>tx(st,'readonly',s=>s.get(k)),put:(st,k,v)=>tx(st,'readwrite',s=>s.put(v,k)),del:(st,k)=>tx(st,'readwrite',s=>s.delete(k))}})();
const UPQ='labas-upq';let upq=[];try{upq=JSON.parse(localStorage.getItem(UPQ))||[]}catch(e){}
const saveQ=()=>{try{localStorage.setItem(UPQ,JSON.stringify(upq))}catch(e){}};
const urls=new Map();
async function fileURL(f){if(!f)return null;if(urls.has(f))return urls.get(f);let b=null;try{b=await idb.get('files',f)}catch(e){}
 if(!b&&SB&&USER){try{const r=await SB.storage.from(BUCKET).download(USER.id+'/'+f);if(r&&!r.error&&r.data){b=r.data;idb.put('files',f,b).catch(()=>{})}}catch(e){}}
 if(!b)return null;const u=URL.createObjectURL(b);urls.set(f,u);return u}
function hydrate(root){(root||document).querySelectorAll('[data-f]').forEach(async el=>{const u=await fileURL(el.dataset.f);if(!u){el.classList.add('miss');return}if(el.tagName==='IMG')el.src=u;else el.href=u})}
let draining=false;
async function drain(){if(draining||!SB||!USER||!navigator.onLine)return;draining=true;
 try{while(upq.length){const f=upq[0];const b=await idb.get('files',f).catch(()=>null);if(b){const r=await SB.storage.from(BUCKET).upload(USER.id+'/'+f,b,{upsert:true,contentType:b.type||'application/octet-stream'});if(r.error)throw r.error}upq.shift();saveQ()}}
 catch(e){}finally{draining=false}}
async function addFile(blob){const f=uid()+uid();await idb.put('files',f,blob);upq.push(f);saveQ();drain();return f}
const pendingDrop=new Map();
const used=f=>[...S.diary,...S.docs].some(x=>x.f===f);
function dropFile(f){if(!f)return;pendingDrop.set(f,setTimeout(async()=>{pendingDrop.delete(f);if(used(f))return;upq=upq.filter(x=>x!==f);saveQ();idb.del('files',f).catch(()=>{});const u=urls.get(f);if(u){URL.revokeObjectURL(u);urls.delete(f)}if(SB&&USER)SB.storage.from(BUCKET).remove([USER.id+'/'+f]).catch(()=>{})},8000))}
/* Sincronizzazione con Supabase */
let wT=null,writing=false,dirty=false,pulling=false;
async function flush(){if(!SB||!USER||writing||!dirty)return;writing=true;dirty=false;let ok=false;
 try{S.acct=USER.id;const r=await SB.from('labas_data').upsert({user_id:USER.id,data:JSON.parse(JSON.stringify(S)),updated_at:new Date().toISOString()});if(r.error)throw r.error;ok=true;setSync('ok','Sincronizzato su tutti i tuoi dispositivi')}
 catch(e){dirty=true;setSync('err',navigator.onLine?'Sincronizzazione in attesa: riprovo tra poco':'Offline: salvo sul telefono e sincronizzo dopo');setTimeout(flush,10000)}
 finally{writing=false;if(ok&&dirty)setTimeout(flush,400)}}
const push=()=>{if(!SB||!USER)return;dirty=true;clearTimeout(wT);wT=setTimeout(flush,1000)};
function applyRemote(r){S=fill(JSON.parse(JSON.stringify(r)));S.acct=USER.id;mon='';saveLocal();all();remind()}
async function pull(){if(!SB||!USER||pulling)return;pulling=true;setSync('wait','Sincronizzo…');
 try{const q=await SB.from('labas_data').select('data').eq('user_id',USER.id).maybeSingle();if(q.error)throw q.error;const r=q.data&&q.data.data;
  if(r&&Array.isArray(r.tasks)){
   if(S.acct!==USER.id){const p=JSON.stringify(S);applyRemote(r);toast('Ho caricato i dati del tuo account',()=>{S=fill(JSON.parse(p));S.acct=USER.id;save();all()})}
   else if((+r.u||0)>(+S.u||0))applyRemote(r);
   else if((+r.u||0)<(+S.u||0))dirty=true;
  }else dirty=true;
  if(dirty)await flush();else setSync('ok','Sincronizzato su tutti i tuoi dispositivi');
  drain();migrateLegacy();
 }catch(e){setSync('err',navigator.onLine?'Sincronizzazione non riuscita: riprovo più tardi':'Offline: salvo sul telefono e sincronizzo dopo')}
 finally{pulling=false;pinResetCheck()}}
const save=()=>{S.u=Date.now();saveLocal();push();remind();cloudExtras();return true};

const today0=()=>{const t=new Date();t.setHours(0,0,0,0);return t};
const ddiff=s=>{const d=new Date(s+'T00:00:00');return isNaN(d)?null:Math.round((d-today0())/864e5)};
const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const fmt=(s,o)=>{const d=new Date(s+'T00:00:00');return isNaN(d)?'':d.toLocaleDateString('it-IT',o||{day:'numeric',month:'long',year:'numeric'})};
const rel=n=>n<0?`scaduta da ${-n} ${n===-1?'giorno':'giorni'}`:n===0?'oggi':n===1?'domani':`tra ${n} giorni`;
const imgSrc=()=>'';
const to30=g=>g>=5?Math.round(18+(g-5)*12/5):null;
function stay(){const a=ddiff(S.dep),b=ddiff(S.ret);if(a===null)return{st:'none'};const tot=b===null?180:b-a+1;if(a>0)return{st:'before',a,tot};if(b===null||b>=0)return{st:'during',k:1-a,tot};return{st:'after',tot}}

function hero(){
 const z=stay();let big='?',lab='imposta la data',line='';
 if(z.st==='before'){big=z.a;lab=z.a===1?'giorno al via':'giorni al via';line=`${z.a} ${lab}`;$('#lead').textContent=`Il tuo Erasmus alla ${S.set.uni||'tua università'} di Vilnius parte il ${fmt(S.dep)}.`}
 else if(z.st==='during'){big=z.k;lab=`giorno, su ${z.tot}`;line=`Giorno ${z.k} di ${z.tot} a Vilnius`;$('#lead').textContent=`Sei a Vilnius! Rientro previsto il ${fmt(S.ret)||'…'}.`}
 else if(z.st==='after'){big=z.tot;lab='giorni a Vilnius';line='Erasmus concluso';$('#lead').textContent='Il tuo Erasmus a Vilnius è concluso: diario e numeri restano qui.'}
 $('#cd').textContent=big;$('#cdl').textContent=lab;$('#cline').textContent=line;$('#daisy').setAttribute('aria-label',line||lab);
 const done=S.tasks.filter(x=>x.done).length,bal=sum(S.inc)-sum(S.exp),ects=S.courses.reduce((t,c)=>t+(+c.e||0),0);
 $('#chips').innerHTML=`<a class="chip" href="#oggi">Checklist ${done}/${S.tasks.length}</a><a class="chip" href="#soldi">${bal>=0?'+':'−'}${eur(Math.round(Math.abs(bal)))} al mese</a><a class="chip" href="#studio">${ects}/${G()} ECTS</a>`;
 nums();petalProg();if($('#tNext'))todayCard();
}
function upcoming(){
 const L=S.tasks.filter(t=>!t.done&&t.due&&ddiff(t.due)!==null).sort((x,y)=>x.due<y.due?-1:1).slice(0,4);
 $('#upcoming').innerHTML=L.map(t=>{const n=ddiff(t.due),c=n<0?'late':n<=7?'soon':'';return `<div class="up row ${c}"><b>${n<0?'!':n===0?'Oggi':n}</b><div><span>${esc(t.t)}</span><small>${rel(n)}, ${fmt(t.due,{day:'numeric',month:'long'})}</small></div></div>`}).join('')||'<p class="empty">Nessuna scadenza in arrivo: aggiungi una data alle voci della checklist.</p>';
}
function bagView(){const e=$('#bagv');if(!e)return;const lim=+S.bag.lim||0,kg=+S.bag.kg||0;
 if(!kg||!lim){e.textContent='Pesala e scopri quanto spazio ti resta.';e.className='bagv';return}
 const d=Math.round((lim-kg)*10)/10;e.textContent=d>=0?`Ti restano ${d.toLocaleString('it-IT')} kg`:`Sei sopra di ${(-d).toLocaleString('it-IT')} kg`;e.className='bagv '+(d>=0?'pos':'neg')}
function tasks(){
 $('#phases').innerHTML='<section class="card hi"><h3>Prossime scadenze</h3><div id="upcoming"></div></section>'+PH.map(([k,lab])=>{const L=S.tasks.filter(x=>x.ph===k),d=L.filter(x=>x.done).length;
  const full=L.length>0&&d===L.length;return (full?`<details class="card phdone"><summary><span class="okb">✓</span><span><b>${lab}</b><small>Completata: ${d} di ${L.length}. Tocca per rivederla</small></span></summary>`:'<section class="card">')+`<div class="ph-h"><h3>${lab}</h3><span class="cnt">${d}/${L.length}</span></div><div class="mini"><i style="width:${L.length?d/L.length*100:0}%"></i></div>${L.map(x=>{const n=x.due?ddiff(x.due):null,c=!x.due?'none':x.done?'':n<0?'late':n<=7?'soon':'';return `<div class="task row${x.done?' done':''}"><button class="tick" type="button" data-tog="${x.id}" aria-pressed="${x.done}" aria-label="Fatto: ${esc(x.t)}"><span>${x.done?CHECK:''}</span></button><div><span class="tt">${esc(x.t)}</span>${x.due?`<label class="due ${c}"><input type="date" id="due-${x.id}" value="${esc(x.due)}" data-due="${x.id}" aria-label="Scadenza"></label>`:x.done?'':`<button class="addd" type="button" data-adddue="${x.id}">+ data</button>`}</div><button class="x" type="button" data-del="${x.id}" aria-label="Elimina">×</button></div>`}).join('')}${L.length?'':'<p class="sub">Nessuna voce per ora.</p>'}${k==='valigia'?`<div class="bag"><label for="bag-l">Limite kg<input id="bag-l" type="number" min="0" step="0.5" inputmode="decimal" value="${esc(S.bag.lim)}" data-bag="lim"></label><label for="bag-k">Peso attuale kg<input id="bag-k" type="number" min="0" step="0.1" inputmode="decimal" value="${esc(S.bag.kg)}" data-bag="kg"></label><span class="bagv" id="bagv"></span></div><p class="sub">Il limite cambia da compagnia a compagnia: controlla il tuo biglietto.</p>`:''}<form class="addrow" data-ph="${k}"><input id="add-${k}" placeholder="Aggiungi voce" aria-label="Nuova voce: ${lab}"><button class="btn">Aggiungi</button></form>`+(full?'</details>':'</section>')}).join('');
 upcoming();bagView();
}
function contacts(){
 $('#contacts').innerHTML=S.contacts.map(c=>`<div class="ct row"><div><b>${esc(c.n||c.r)}</b>${c.n&&c.r?`<small>${esc(c.r)}</small>`:''}<div>${c.e?`<a href="mailto:${esc(c.e)}">${esc(c.e)}</a>`:''}${c.p?`<a href="tel:${esc(c.p.replace(/[^\d+]/g,''))}">${esc(c.p)}</a>`:''}</div></div><button class="x" type="button" data-ctdel="${c.id}" aria-label="Elimina contatto">×</button></div>`).join('')||'<p class="empty">Nessun contatto ancora. Parti da un ruolo qui sotto.</p>';
 const used=new Set(S.contacts.map(c=>c.r));
 $('#presets').innerHTML=ROLES.filter(r=>!used.has(r)).map(r=>`<button type="button" data-role="${esc(r)}">+ ${esc(r)}</button>`).join('');
 $('#rlist').innerHTML=ROLES.map(r=>`<option value="${esc(r)}">`).join('');
}
function docs(){
 if(locked()){$('#docs').innerHTML='';pinView();return}
 $('#docs').innerHTML=S.docs.length?`<div class="docs">${S.docs.map(d=>{const tile=!d.f?'<span class="pdf">?</span>':d.k==='pdf'?`<a class="pdf" data-f="${esc(d.f)}" target="_blank" rel="noopener">PDF</a>`:`<button class="open" type="button" data-zoom="${d.id}" aria-label="Apri ${esc(d.n)}"><img data-f="${esc(d.f)}" alt=""></button>`;return `<div class="doc">${tile}<div class="dn"><span>${esc(d.n)}</span><button class="x" type="button" data-docdel="${d.id}" aria-label="Elimina ${esc(d.n)}">×</button></div></div>`}).join('')}</div>`:'<p class="empty">Carica foto o PDF di Learning Agreement, assicurazione, contratto di affitto e biglietti.</p>';
 $('#docHint').textContent=USER?'Restano sul telefono anche offline e sono salvati nel tuo account privato.':'Restano sul telefono anche offline. Accedi per averli anche sugli altri dispositivi.';
 hydrate($('#docs'));
}
function budgetSum(){
 const I=sum(S.inc),E=sum(S.exp),B=I-E,b=$('#bal');
 b.textContent=(B>=0?'+':'−')+eur(Math.round(Math.abs(B)));b.className='big '+(B>=0?'pos':'neg');
 $('#balTxt').textContent=B>=0?`ti restano ogni mese, ${eur(Math.round(B*6))} in sei mesi`:`ti mancano ogni mese, ${eur(Math.round(-B*6))} in sei mesi`;
 $('#ie').innerHTML=`<span>Entrate <b>${eur(I)}</b></span><span>Uscite <b>${eur(E)}</b></span>`;
 $('#bar').innerHTML=S.exp.map((x,i)=>+x.v>0?`<i style="flex:${+x.v};background:${COLS[i%COLS.length]}"></i>`:'').join('');
}
const brow=(x,c)=>`<div class="brow"><span class="dot" style="background:${c}"></span><span>${esc(x.n)}</span><label class="money"><input id="m-${x.id}" type="number" min="0" step="5" inputmode="decimal" value="${+x.v||0}" data-money="${x.id}" aria-label="${esc(x.n)}"></label><button class="x" type="button" data-bdel="${x.id}" aria-label="Elimina ${esc(x.n)}">×</button></div>`;
function budget(){
 $('#incRows').innerHTML=S.inc.map(x=>brow(x,'var(--card)')).join('')||'<p class="sub">Nessuna entrata.</p>';
 $('#expRows').innerHTML=S.exp.map((x,i)=>brow(x,COLS[i%COLS.length])).join('')||'<p class="sub">Nessuna categoria.</p>';
 $('#l-c').innerHTML=S.exp.map(x=>`<option value="${x.id}">${esc(x.n)}</option>`).join('');
 budgetSum();logView();
}
function logView(){
 if(!mon){const last=S.log.map(l=>l.d).sort().pop();mon=(last||iso(new Date())).slice(0,7)}
 $('#month').value=mon;
 const L=S.log.filter(l=>(l.d||'').slice(0,7)===mon).sort((a,b)=>a.d<b.d?1:-1),tot=sum(L),plan=sum(S.exp);
 $('#spentTxt').textContent=`Speso ${eur(tot)} su ${eur(plan)} previsti`+(tot>plan?`: sei sopra di ${eur(tot-plan)}.`:`: restano ${eur(plan-tot)}.`);
 $('#cmp').innerHTML=S.exp.map((x,i)=>{const sp=sum(L.filter(l=>l.c===x.id)),p=+x.v||0,over=sp>p,w=p?Math.min(sp/p,1)*100:(sp?100:0);
  return `<div class="cmp${over?' over':''}"><span>${esc(x.n)}</span><div class="trk"><i style="width:${w}%;background:${over?'var(--red)':COLS[i%COLS.length]}"></i></div><b>${eur(sp)} / ${eur(p)}</b></div>`}).join('');
 setTimeout(chart,0);
 $('#logRows').innerHTML=L.map(l=>{const c=S.exp.find(x=>x.id===l.c);return `<div class="lrow row"><span>${fmt(l.d,{day:'numeric',month:'short'})}</span><div>${esc(l.n)}<small>${esc(c?c.n:'Senza categoria')}${l.rid?', spesa fissa':''}</small></div><b>${eur(l.v)}</b><button class="x" type="button" data-ldel="${l.id}" aria-label="Elimina spesa">×</button></div>`}).join('')||`<p class="empty">Nessuna spesa registrata a ${esc(fmt(mon+'-01',{month:'long',year:'numeric'}))}.</p>`;
}
const G=()=>Math.max(1,+S.set.goal||30);
function ring(){const GL=G();
 const P=S.courses.reduce((t,c)=>t+(+c.e||0),0),D=S.courses.filter(c=>c.s).reduce((t,c)=>t+(+c.e||0),0),C=2*Math.PI*70;
 const arc=(v,col)=>v>0?`<circle cx="90" cy="90" r="70" fill="none" stroke="${col}" stroke-width="22" stroke-linecap="round" class="arc" stroke-dasharray="${(Math.min(v/GL,1)*C).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 90 90)"/>`:'';
 $('#ring').innerHTML=`<circle cx="90" cy="90" r="70" fill="none" stroke="var(--soft)" stroke-width="22"/>${arc(P,'#ff4f9a')}${arc(D,'var(--green)')}<circle cx="90" cy="90" r="83" fill="none" stroke="var(--ink)" stroke-width="2.5"/><circle cx="90" cy="90" r="57" fill="none" stroke="var(--ink)" stroke-width="2.5"/>`;
 $('#ectsN').textContent=P;
 $('#ectsH').textContent=P<GL?`Mancano ${GL-P} ECTS`:P>GL?`${P-GL} ECTS in più`:`${GL} ECTS in piano`;$('#ectsGoal').textContent=`di ${GL} ECTS`;
 const g=S.courses.filter(c=>c.s&&+c.g>=5&&+c.g<=10),ge=g.reduce((t,c)=>t+(+c.e||0),0);
 const av=ge?g.reduce((t,c)=>t+c.g*(+c.e||0),0)/ge:0,av30=ge?g.reduce((t,c)=>t+to30(+c.g)*(+c.e||0),0)/ge:0;
 $('#ectsT').textContent=`Obiettivo del semestre: ${GL}. Superati ${D} ECTS su ${P}`+(ge?`, media ponderata ${av.toLocaleString('it-IT',{maximumFractionDigits:1})}, circa ${av30.toLocaleString('it-IT',{maximumFractionDigits:1})}/30.`:'.');
 S.courses.forEach(c=>{const e=document.getElementById('cv-'+c.id);if(e){const v=c.s&&+c.g>=1&&+c.g<=10?+c.g:null;e.textContent=v===null?'':v>=5?`≈ ${to30(v)}/30`:'non sufficiente'}});
}
function courseSelect(){const sel=$('#s-c');if(!sel)return;const prev=sel.value,names=[...new Set(S.courses.map(c=>(c.n||'').trim()).filter(Boolean))];
 sel.innerHTML=(names.length?names.map(n=>`<option value="${esc(n)}">${esc(n)}</option>`).join(''):'<option value="" disabled>Aggiungi prima i corsi qui sopra</option>')+'<option value="__new">Altro corso…</option>';
 sel.value=names.includes(prev)||prev==='__new'?prev:(names[0]||'__new');$('#s-xl').hidden=sel.value!=='__new'}
function courses(){
 $('#cRows').innerHTML=S.courses.map(c=>`<div class="crow row"><input class="cn" id="cn-${c.id}" value="${esc(c.n)}" data-cname="${c.id}" aria-label="Nome del corso"><button class="x" type="button" data-cdel="${c.id}" aria-label="Elimina ${esc(c.n)}">×</button><label class="ects"><input id="ce-${c.id}" type="number" min="0" max="30" inputmode="numeric" value="${+c.e||0}" data-cects="${c.id}" aria-label="ECTS">ECTS</label><button class="st${c.s?' ok':''}" type="button" data-cst="${c.id}" aria-pressed="${c.s}">${c.s?'Superato':'Da sostenere'}</button><span class="gw"><input class="gr" id="cg-${c.id}" type="number" min="1" max="10" inputmode="numeric" placeholder="Voto" value="${esc(c.g)}" data-cgr="${c.id}" aria-label="Voto"${c.s?'':' disabled'}><span class="conv" id="cv-${c.id}"></span></span><label class="exd" for="ex-${c.id}">Esame<input type="date" id="ex-${c.id}" value="${esc(c.ex||'')}" data-cex="${c.id}"></label></div>`).join('')||'<p class="empty">Nessun corso: aggiungi quelli del Learning Agreement.</p>';
 courseSelect();examsView();
 ring();
}
function sched(){
 const td=(new Date().getDay()+6)%7;
 $('#week').innerHTML=DAYS.map((n,i)=>{const L=S.sched.filter(s=>+s.d===i).sort((a,b)=>a.a<b.a?-1:1);
  return `<div class="day${i===td?' today':''}"><h4>${n}</h4>${L.map(s=>`<div class="les row"><time>${esc(s.a)}</time><div>${esc(s.c)}<small>fino alle ${esc(s.b)}${s.r?', '+esc(s.r):''}</small><small class="tv" id="tv-${s.id}"></small></div><button class="x" type="button" data-sdel="${s.id}" aria-label="Elimina lezione">×</button></div>`).join('')||'<p class="sub">Libero</p>'}</div>`}).join('');
 setTimeout(lessonTravel,0);
}
let deck=[],fi=0,flip=false;
function pool(){const today=iso(new Date()),all=[];if(S.set.en!==false)ENG.forEach(([k,,L])=>L.forEach(([en,it],i)=>all.push({t:'en',id:k+'-'+i,f:en,b:it})));if(S.set.lt!==false){LT.forEach(([id,lt,it,pr])=>all.push({t:'lt',id,f:lt,b:it,p:pr}));LTS.forEach(([k,,L])=>L.forEach(([lt,it,pr],i)=>all.push({t:'lt',id:`ls-${k}-${i}`,f:lt,b:it,p:pr})))}
 const learned=new Set([...S.learned,...S.lt]),due=[],fresh=[];for(const c of all){const r=S.srs[c.id];if(r){if(r.n<=today&&r.b<5)due.push(c)}else if(!learned.has(c.id))fresh.push(c)}
 for(let i=fresh.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[fresh[i],fresh[j]]=[fresh[j],fresh[i]]}due.sort((a,b)=>S.srs[a.id].n<S.srs[b.id].n?-1:1);return[...due,...fresh.slice(0,10)]}
function buildDeck(){deck=pool();fi=0;flip=false;flash()}
function flash(){
 const tot=ENG.reduce((t,g)=>t+g[2].length,0)+LT.length+LTS.reduce((t,g)=>t+g[2].length,0),kn=S.learned.length+S.lt.length;
 $('#learnTxt').textContent=`Ripasso intelligente: quello che sbagli torna prima, quello che sai si dirada. Ne sai ${kn} su ${tot}.`;
 const fc=$('#fc');
 if(!deck.length){fc.classList.add('back');fc.innerHTML='<b>Per oggi hai finito!</b><span>Le prossime carte tornano domani. Se vuoi ripassare ancora, togli una stella nelle liste.</span>';$('#fcCount').textContent='';$('#fcKnow').disabled=$('#fcAgain').disabled=true;return}
 $('#fcKnow').disabled=$('#fcAgain').disabled=false;
 const c=deck[fi%deck.length];fc.classList.toggle('back',flip);
 fc.innerHTML=flip?`<b>${esc(c.b)}</b>${c.p?`<small>si dice: ${esc(c.p)}</small>`:''}<small>Tocca per tornare</small>`:`<span>${c.t==='lt'?'Lituano':'Inglese'}</span><b>${esc(c.f)}</b><small>Tocca per girare</small>`;
 $('#fcCount').textContent=`${deck.length} ${deck.length===1?'carta':'carte'} per oggi`;
}
function english(){
 $('#engGroups').innerHTML=ENG.map(([k,lab,L])=>`<section class="card"><h3>${lab}</h3>${L.map(([en,it],i)=>{const id=k+'-'+i,on=S.learned.includes(id);return `<div class="phrow row"><div><b>${esc(en)}</b><small>${esc(it)}</small></div><button class="ib" type="button" data-copy="${esc(en)}" aria-label="Copia la frase">${ICOPY}</button><button class="ib${on?' on':''}" type="button" data-learn="${id}" aria-pressed="${on}" aria-label="Segna come imparata">${ISTAR}</button></div>`}).join('')}</section>`).join('');
 setTimeout(engSpeak,0);
 $('#ltCards').innerHTML=LT.map(([id,lt,it,pr])=>`<div class="pc"><b>${lt}</b><span>${it}</span><small>${pr}</small></div>`).join('');
 flash();
}
function albumSet(){return new Set([...PLACES.filter(p=>S.seen.includes(p[0])).map(p=>p[1]),...S.diary.map(d=>(d.p||'').trim()).filter(Boolean)])}
function places(){
 $('#places').innerHTML=PLACES.map(([id,n,t])=>{const on=S.seen.includes(id);return `<div class="prow row"><div><b>${n}</b>${t}</div><button class="st${on?' ok':''}" type="button" data-seen="${id}" aria-pressed="${on}">${on?'Visto':'Da vedere'}</button></div>`}).join('');
 $('#album').innerHTML=[...albumSet()].map(p=>`<span>${esc(p)}</span>`).join('')||'<p class="sub">Segna i posti visti o scrivi dove sei nel diario: compariranno qui.</p>';
 $('#plist').innerHTML=PLACES.map(p=>`<option value="${esc(p[1])}">`).join('');
 setTimeout(placeGoButtons,0);
}
function diary(){
 const L=[...S.diary].sort((a,b)=>a.d<b.d?1:-1);
 $('#diary').innerHTML=L.map(e=>`<article class="entry row">${e.f?`<figure class="pola" style="--r:${(e.id.charCodeAt(0)%2?1:-1)*(1+(e.id.charCodeAt(1)%3)*.6)}deg"><img data-f="${esc(e.f)}" alt="Foto del ${esc(fmt(e.d))}" loading="lazy"><figcaption>${esc(e.p||fmt(e.d,{day:'numeric',month:'long'}))}</figcaption></figure>`:e.a?'<p class="sub">Foto rimasta nella versione precedente di Labas.</p>':''}<div class="eh"><b>${esc(fmt(e.d))}${e.p?', '+esc(e.p):''}${e.lat?' <small class="sub">· sulla mappa</small>':''}</b><span class="etools"><button class="btn alt" type="button" data-card="${e.id}">Cartolina</button><button class="x" type="button" data-ddel="${e.id}" aria-label="Elimina pagina">×</button></span></div>${e.t?`<p>${esc(e.t)}</p>`:''}</article>`).join('')||'<p class="empty">Il diario è ancora vuoto: la prima pagina può essere anche prima di partire.</p>';
 hydrate($('#diary'));places();nums();if(MAP)mapMarkers();
}
let numTxt='';
function nums(){
 const z=stay(),days=z.st==='during'?z.k:z.st==='after'?z.tot:0,pl=albumSet().size,ects=S.courses.filter(c=>c.s).reduce((t,c)=>t+(+c.e||0),0),ph=S.learned.length+S.lt.length;
 const N=[[z.st==='before'?z.a:days,z.st==='before'?'giorni alla partenza':'giorni a Vilnius'],[S.diary.length,'pagine di diario'],[pl,'posti nell\'album'],[ects,'ECTS superati'],[ph,'frasi imparate'],[Math.round(sum(S.log)),'spese registrate','eur']];
 $('#nums').innerHTML=N.map(([v,l,f])=>`<div class="num"><b data-n="${+v||0}" data-f="${f||''}">${esc(f==='eur'?eur(v):v)}</b>${l}</div>`).join('');
 numTxt=`Il mio Erasmus a Vilnius in numeri: ${days} giorni a Vilnius, ${S.diary.length} pagine di diario, ${pl} posti visitati, ${ects} ECTS superati, ${ph} frasi imparate tra inglese e lituano.`;
}
function all(){$('#dep').value=S.dep;$('#ret').value=S.ret;settingsUI();$('#d-d').value=iso(new Date());$('#l-d').value=iso(new Date());tasks();budget();courses();sched();english();buildDeck();diary();contacts();docs();hero();extrasAll()}
const commit=(...fns)=>{save();fns.forEach(f=>f());hero()};
const snapDel=(fn,f)=>{const p=JSON.stringify(S);fn();if(f)dropFile(f);toast('Eliminato',()=>{if(f&&pendingDrop.has(f)){clearTimeout(pendingDrop.get(f));pendingDrop.delete(f)}S=fill(JSON.parse(p));save();all()})};
const VIEWS=['oggi','soldi','studio','inglese','vilnius','impostazioni'];let curV='';
function route(){const h=location.hash.slice(1),v=VIEWS.includes(h)?h:(VIEWS.includes(S.set.start)?S.set.start:'oggi');
 VIEWS.forEach(x=>{$('#v-'+x).classList.toggle('on',x===v);const n=document.getElementById('n-'+x);if(n)n.classList.toggle('on',x===v)});$('#gear').classList.toggle('on',v==='impostazioni');document.body.dataset.view=v;
 if(v!==curV){const prevV=curV;curV=v;const vw0=$('#v-'+v);vw0.classList.remove('sl','sr');if(swDir){void vw0.offsetWidth;vw0.classList.add(swDir>0?'sl':'sr');setTimeout(()=>vw0.classList.remove('sl','sr'),400);swDir=0}setTimeout(themeMeta,0);if(prevV){const dz=$('#daisy');if(dz){dz.classList.remove('whirl');void dz.offsetWidth;dz.classList.add('whirl');setTimeout(()=>dz.classList.remove('whirl'),750)}}
 if(v==='soldi'){const B=sum(S.inc)-sum(S.exp);countTo($('#bal'),B,x=>(x>=0?'+':'−')+eur(Math.round(Math.abs(x))))}
 if(v==='studio'){const P=S.courses.reduce((t,c)=>t+(+c.e||0),0);countTo($('#ectsN'),P,x=>String(Math.round(x)))}
 if(v==='vilnius')setTimeout(()=>document.querySelectorAll('#nums b[data-n]').forEach(b=>{const n=+b.dataset.n;countTo(b,n,x=>b.dataset.f==='eur'?eur(Math.round(x)):String(Math.round(x)),900)}),120);const vw=$('#v-'+v);vw.classList.add('enter');setTimeout(()=>vw.classList.remove('enter'),1100);let i=0;$('#v-'+v).querySelectorAll('.card,.day,.wk article,.pc,.num').forEach(el=>el.style.setProperty('--i',Math.min(i++,12)));if(v==='studio'){const rg=$('#ring');rg.classList.add('anim');setTimeout(()=>rg.classList.remove('anim'),1100)}if(v==='impostazioni')storageInfo();if(v==='vilnius'){setTimeout(initMap,80);commuteView()}if(v==='studio')lessonTravel();if(v==='oggi'){weather();todayCard()}}
 $('#hero').classList.toggle('compact',v!=='oggi');
 const top=$('#main').offsetTop-12;if(window.scrollY>top)window.scrollTo(0,0);}
function petals(){const st=document.documentElement.dataset.style;let o='';for(let i=0;i<14;i++){const t=`transform="rotate(${(i*360/14).toFixed(2)} 100 100)"`;
 if(st==='inverno'){const d='M100 8V56M100 21L90 11M100 21L110 11M100 35L92 28M100 35L108 28';o+=`<g class="pt" ${t} style="color:var(--poff)"><path d="${d}" fill="none" stroke="#22140a" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g>`}
 else if(st==='disco')o+=`<polygon class="pt" points="100,0 113,40 100,64 87,40" style="fill:var(--poff)" stroke="#22140a" stroke-width="3.5" stroke-linejoin="round" ${t}/>`;
 else if(st==='pop')o+=`<polygon class="pt" points="100,-2 118,60 82,60" style="fill:var(--poff)" stroke="#22140a" stroke-width="3.5" stroke-linejoin="round" ${t}/>`;
 else if(st==='ambra')o+=`<path class="pt" d="M100 6C119 24 121 49 100 64C79 49 81 24 100 6Z" style="fill:var(--poff)" stroke="#22140a" stroke-width="3.5" ${t}/>`;
 else o+=`<ellipse class="pt" cx="100" cy="40" rx="17" ry="38" style="fill:var(--poff)" stroke="#22140a" stroke-width="3.5" ${t}/>`}
 $('#petals').innerHTML=o}
function petalProg(){const L=S.tasks,dn=L.filter(x=>x.done).length,k=stay().st==='after'?14:Math.round(14*(L.length?dn/L.length:0));
 document.querySelectorAll('#petals .pt').forEach((e,i)=>{const c=i<k?(document.documentElement.dataset.style==='tiedye'?['var(--pink)','var(--orange)','var(--yel)','var(--mint)'][i%4]:(i%2?'var(--orange)':'var(--pink)')):'var(--poff)';e.style.fill=c;e.style.color=c});const d=$('#daisy');if(d)d.title=`La margherita sboccia con la checklist: ${k} petali su 14`}
const isDark=()=>S.set.theme==='dark'||(S.set.theme!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);
function themeMeta(){const m=document.querySelector('meta[name=theme-color]');if(!m)return;m.setAttribute('content',isDark()?'#000000':(getComputedStyle(document.body).getPropertyValue('--sec').trim()||'#ffc21a'))}
function countTo(el,to,f,dur){if(!el||calm()||!isFinite(to))return;const t0=performance.now(),D=dur||750;const step=n=>{const k=Math.min(1,(n-t0)/D),e=1-(1-k)**3;el.textContent=f(to*e);if(k<1)requestAnimationFrame(step);else el.textContent=f(to)};requestAnimationFrame(step)}
const bg=$('#bgfl');
const pal=()=>{const c=getComputedStyle(document.documentElement);return['--pink','--orange','--mint','--yel'].map(v=>c.getPropertyValue(v).trim()||'#ff4f9a')};
function flowers(){const W=bg.clientWidth,H=bg.clientHeight;if(!W)return;let r=11;const rnd=()=>(r=r*16807%2147483647)/2147483647;let o='';
 if(isDark()||($('#hero')&&$('#hero').classList.contains('tod-night')))for(let i=0;i<30;i++){const sx=W*rnd(),sy=H*rnd()*.9,sr=.6+rnd()*1.7;o+=`<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${sr.toFixed(1)}" fill="#fff2dc" opacity="${(.35+rnd()*.6).toFixed(2)}"/>`}
 bg.innerHTML=o}
const ro=new ResizeObserver(flowers);ro.observe(bg);
async function copyText(t){try{await navigator.clipboard.writeText(t);toast('Copiato')}catch(e){toast('Copia non riuscita: tieni premuto sul testo per selezionarlo')}}
async function shrink(file,max,q){const url=URL.createObjectURL(file);try{const img=new Image();await new Promise((ok,ko)=>{img.onload=ok;img.onerror=ko;img.src=url});const k=Math.min(1,max/Math.max(img.width,img.height)),c=document.createElement('canvas');c.width=Math.round(img.width*k);c.height=Math.round(img.height*k);c.getContext('2d').drawImage(img,0,0,c.width,c.height);return await new Promise((ok,ko)=>c.toBlob(b=>b?ok(b):ko(new Error('blob')),'image/jpeg',q))}finally{URL.revokeObjectURL(url)}}
const blobToData=b=>new Promise((ok,ko)=>{const r=new FileReader();r.onload=()=>ok(r.result);r.onerror=ko;r.readAsDataURL(b)});
function dataToBlob(d){const [h,b]=d.split(',');const bin=atob(b),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return new Blob([u],{type:h.slice(5).split(';')[0]})}
async function storeImage(file,max){return{f:await addFile(await shrink(file,max,.8))}}

document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
 if(d.tog){const t=S.tasks.find(x=>x.id===d.tog);if(t){t.done=!t.done;const r=b.getBoundingClientRect();commit(tasks);if(t.done){burst(r.left+r.width/2,r.top+r.height/2,8);const nb=document.querySelector(`[data-tog="${t.id}"]`);if(nb)anim(nb.closest('.task'),'just',600);const L=S.tasks.filter(x=>x.ph===t.ph);if(L.every(x=>x.done)){setTimeout(()=>burst(innerWidth/2,innerHeight/2,26),250);toast('Sezione completata!')}}}}
 else if(d.del)snapDel(()=>{S.tasks=S.tasks.filter(x=>x.id!==d.del);commit(tasks)});
 else if(d.bdel)snapDel(()=>{S.inc=S.inc.filter(x=>x.id!==d.bdel);S.exp=S.exp.filter(x=>x.id!==d.bdel);commit(budget)});
 else if(d.ldel)snapDel(()=>{S.log=S.log.filter(x=>x.id!==d.ldel);commit(logView)});
 else if(d.cst){const c=S.courses.find(x=>x.id===d.cst);if(c){c.s=!c.s;commit(courses)}}
 else if(d.cdel)snapDel(()=>{S.courses=S.courses.filter(x=>x.id!==d.cdel);commit(courses)});
 else if(d.sdel)snapDel(()=>{S.sched=S.sched.filter(x=>x.id!==d.sdel);commit(sched)});
 else if(d.ddel){const x=S.diary.find(y=>y.id===d.ddel);snapDel(()=>{S.diary=S.diary.filter(y=>y.id!==d.ddel);commit(diary)},x&&x.f)}
 else if(d.docdel){const x=S.docs.find(y=>y.id===d.docdel);snapDel(()=>{S.docs=S.docs.filter(y=>y.id!==d.docdel);commit(docs)},x&&x.f)}
 else if(d.ctdel)snapDel(()=>{S.contacts=S.contacts.filter(x=>x.id!==d.ctdel);commit(contacts)});
 else if(d.role!==undefined){$('#ct-r').value=d.role;$('#ct-n').focus()}
 else if(d.zoom){const x=S.docs.find(y=>y.id===d.zoom);if(x&&x.f)fileURL(x.f).then(s=>{if(s){$('#lbImg').src=s;$('#lb').classList.add('on')}})}
 else if(b.id==='lb')b.classList.remove('on');
 else if(d.seen){S.seen=S.seen.includes(d.seen)?S.seen.filter(x=>x!==d.seen):[...S.seen,d.seen];commit(places)}
 else if(d.learn){S.learned=S.learned.includes(d.learn)?S.learned.filter(x=>x!==d.learn):[...S.learned,d.learn];commit(english,buildDeck)}
 else if(d.copy!==undefined)copyText(d.copy);
 else if(b.id==='copyTpl')copyText($('#tpl').textContent);
 else if(b.id==='copyNums')copyText(numTxt);
 else if(b.id==='fc'){anim(b,'flipping',420,()=>{flip=!flip;flash()},200)}
 else if(b.id==='fcKnow'){const c=deck[fi%deck.length];if(!c)return;srsKnow(c);const r=$('#fc').getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,10);anim($('#fc'),'outR',480,()=>{deck.splice(fi%deck.length,1);if(fi>=deck.length)fi=0;flip=false;save();english();hero()},260)}
 else if(b.id==='fcAgain'){anim($('#fc'),'outL',480,()=>{const i=fi%deck.length,c=deck.splice(i,1)[0];if(c){srsAgain(c);deck.push(c);save()}flip=false;flash()},260)}
 else if(b.id==='dlBtn')backup().catch(()=>toast('Backup non riuscito, riprova'));
 else if(b.id==='login')doLogin();
 else if(b.id==='logout'){SB.auth.signOut().catch(()=>{});USER=null;acctUI();docs();toast('Sei uscito: i dati restano su questo telefono')}
 else if(b.id==='notif')enableNotif();
 else if(b.id==='install'&&installEv){installEv.prompt();installEv.userChoice.finally(()=>{installEv=null;$('#installRow').hidden=true})}
 else if(b.id==='clear'){if(d.arm){const p=JSON.stringify(S);S.tasks.forEach(t=>{t.due='';t.done=false});S.inc.forEach(x=>x.v=0);S.exp.forEach(x=>x.v=0);S.log=[];S.courses=[];S.sched=[];S.rec=[];mon='';save();all();delete d.arm;b.textContent='Svuota esempi';toast('Esempi tolti',()=>{S=fill(JSON.parse(p));save();all()})}else{d.arm='1';b.textContent='Tocca ancora per svuotare'}}
 else if(b.id==='reset'){if(d.arm){const p=JSON.stringify(S),keep={diary:S.diary,docs:S.docs,contacts:S.contacts,seen:S.seen,learned:S.learned,lt:S.lt};S=Object.assign(DEF(),keep);mon='';save();all();delete d.arm;b.textContent='Ripristina esempi';toast('Esempi ripristinati',()=>{S=fill(JSON.parse(p));save();all()})}else{d.arm='1';b.textContent='Tocca ancora per confermare'}}
});
document.addEventListener('submit',async e=>{e.preventDefault();const f=e.target;
 if(f.dataset.ph){const i=f.querySelector('input'),v=i.value.trim();if(!v)return;const k=f.dataset.ph;S.tasks.push({id:uid(),ph:k,t:v,due:'',done:false});commit(tasks);$('#add-'+k).focus()}
 else if(f.dataset.add){const [n,a]=f.querySelectorAll('input'),k=f.dataset.add;if(!n.value.trim())return;S[k].push({id:uid(),n:n.value.trim(),v:Math.max(0,+a.value||0)});commit(budget);$(k==='inc'?'#ai-n':'#ae-n').focus()}
 else if(f.id==='lform'){const v=+$('#l-v').value,d=$('#l-d').value;if(!(v>0)||!d){toast('Inserisci data e importo');return}S.log.push({id:uid(),c:$('#l-c').value,d,n:$('#l-n').value.trim()||'Spesa',v});mon=d.slice(0,7);$('#l-n').value='';$('#l-v').value='';commit(logView);toast('Spesa registrata')}
 else if(f.id==='cform'){const n=$('#ac-n').value.trim();if(!n)return;S.courses.push({id:uid(),n,e:Math.max(0,+$('#ac-e').value||0),s:false,g:''});commit(courses);$('#ac-n').value='';$('#ac-e').value='';$('#ac-n').focus()}
 else if(f.id==='sform'){const sv=$('#s-c').value,c=(sv==='__new'?$('#s-x').value:sv).trim(),a=$('#s-a').value,b=$('#s-b').value;if(!c||!a){toast('Inserisci corso e orario');return}S.sched.push({id:uid(),d:+$('#s-d').value,a,b,c,r:$('#s-r').value.trim()});$('#s-x').value='';$('#s-r').value='';commit(sched);toast('Lezione aggiunta')}
 else if(f.id==='ctform'){const n=$('#ct-n').value.trim(),r=$('#ct-r').value.trim();if(!n&&!r){toast('Scrivi almeno nome o ruolo');return}S.contacts.push({id:uid(),n,r,e:$('#ct-e').value.trim(),p:$('#ct-p').value.trim()});['#ct-n','#ct-r','#ct-e','#ct-p'].forEach(s=>$(s).value='');commit(contacts);toast('Contatto salvato')}
 else if(f.id==='docform'){const file=$('#doc-f').files[0],n=$('#doc-n').value.trim()||(file&&file.name)||'Documento';if(!file){toast('Scegli una foto o un PDF');return}
  const btn=f.querySelector('.btn:not(.fileb)');btn.disabled=true;btn.textContent='Salvo…';
  try{let x;if(file.type==='application/pdf'){if(file.size>20971520){toast('Il PDF supera i 20 MB');return}x={f:await addFile(file),k:'pdf'}}else{x=Object.assign(await storeImage(file,1600),{k:'img'})}
   S.docs.push(Object.assign({id:uid(),n},x));$('#doc-n').value='';$('#doc-f').value='';$('#doc-fl').textContent='Scegli file';commit(docs);toast('Documento salvato')}
  catch(err){toast('Caricamento non riuscito, riprova')}finally{btn.disabled=false;btn.textContent='Salva'}}
 else if(f.id==='dform'){const t=$('#d-t').value.trim(),p=$('#d-p').value.trim(),file=$('#d-f').files[0];if(!t&&!file){toast('Scrivi qualcosa o aggiungi una foto');return}
  let x={};if(file){try{x=await storeImage(file,1200)}catch(err){toast('Non riesco a salvare questa foto')}}
  S.diary.push(Object.assign({id:uid(),d:$('#d-d').value||iso(new Date()),p,t},x,geo?{lat:geo[0],lon:geo[1]}:{}));geo=null;$('#geoBtn').textContent='Aggiungi la mia posizione';
  $('#d-t').value='';$('#d-p').value='';$('#d-f').value='';commit(diary);toast('Pagina salvata')}
});
document.addEventListener('input',e=>{const t=e.target,d=t.dataset;
 if(d.money){const x=[...S.inc,...S.exp].find(x=>x.id===d.money);if(x){x.v=Math.max(0,+t.value||0);save();budgetSum();logView();hero()}}
 else if(d.cname){const c=S.courses.find(x=>x.id===d.cname);if(c){const old=c.n;c.n=t.value;let ch=false;S.sched.forEach(l=>{if(l.c===old&&old){l.c=t.value;ch=true}});save();courseSelect();if(ch)sched()}}
 else if(d.cects){const c=S.courses.find(x=>x.id===d.cects);if(c){c.e=Math.max(0,+t.value||0);save();ring();hero()}}
 else if(d.cgr){const c=S.courses.find(x=>x.id===d.cgr);if(c){c.g=t.value;save();ring();nums()}}
 else if(d.bag){S.bag[d.bag]=t.value;save();bagView()}
 else if(d.set&&d.set!=='start'){S.set[d.set]=d.set==='goal'?Math.max(1,Math.min(60,+t.value||30)):t.value;save();applySettings();hero();if(d.set==='goal')ring()}
});
document.addEventListener('change',async e=>{const t=e.target,d=t.dataset;
 if(d.due){const x=S.tasks.find(y=>y.id===d.due);if(x){x.due=t.value;commit(tasks)}}
 else if((t.id==='dep'||t.dataset.date==='dep')&&t.value){S.dep=t.value;commit(settingsUI)}
 else if((t.id==='ret'||t.dataset.date==='ret')&&t.value){S.ret=t.value;commit(settingsUI)}
 else if(d.set==='start'){S.set.start=t.value;save()}
 else if(d.flag){S.set[d.flag]=t.checked;save();applySettings();if(d.flag==='en'||d.flag==='lt')buildDeck()}
 else if(d.lead!==undefined){const n=+d.lead;S.set.leads=t.checked?[...new Set([...S.set.leads,n])].sort((a,b)=>b-a):S.set.leads.filter(x=>x!==n);save();notifUI()}
 else if(t.id==='month'&&t.value){mon=t.value;logView()}
 else if(t.id==='s-c'){$('#s-xl').hidden=t.value!=='__new';if(t.value==='__new')$('#s-x').focus()}
 else if(t.id==='doc-f'){$('#doc-fl').textContent=t.files[0]?t.files[0].name.slice(0,24):'Scegli file'}
 else if(t.id==='imp'&&t.files[0]){try{await restore(t.files[0])}catch(err){toast('Questo file non è un backup di Labas')}t.value=''}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('#lb').classList.remove('on')});
window.addEventListener('hashchange',route);

function acctUI(){
 setTimeout(()=>{pushUI();calUI();cloudExtras()},0);
 const on=!!USER;$('#login').hidden=on||!SB;$('#logout').hidden=!on;$('#syncNow').hidden=!on;$('#wipeCloud').hidden=!on;
 $('#acct').textContent=!SB?'Sincronizzazione non disponibile ora: i dati restano su questo telefono.':on?`Accesso con ${USER.email||'Google'}: diario, spese e documenti si sincronizzano da soli.`:'Accedi con Google per ritrovare diario, spese e documenti su tutti i tuoi dispositivi.';
 if(!on)setSync('local','Salvato su questo telefono');
}
/* Promemoria: le scadenze vanno in IndexedDB, il service worker manda le notifiche */
let remT=null;
function remind(){clearTimeout(remT);remT=setTimeout(async()=>{try{await idb.put('meta','cfg',{leads:S.set.leads,push:!!(S.set.push&&USER)});await idb.put('meta','due',[...S.tasks.filter(t=>!t.done&&t.due).map(t=>({id:t.id,t:t.t,d:t.due})),...S.courses.filter(c=>c.ex&&!c.s).map(c=>({id:'ex-'+c.id,t:'Esame di '+c.n,d:c.ex}))])}catch(e){return}
 if('Notification' in window&&Notification.permission==='granted'&&navigator.serviceWorker&&navigator.serviceWorker.controller)navigator.serviceWorker.controller.postMessage({type:'check'})},600)}
function notifUI(){const b=$('#notif');if(!('Notification' in window)||!('serviceWorker' in navigator)){b.hidden=true;$('#notifHint').textContent=/iPhone|iPad/.test(navigator.userAgent)?"Su iPhone i promemoria funzionano dopo aver aggiunto l'app alla schermata Home.":'Questo browser non supporta i promemoria.';return}
 const g=Notification.permission;b.textContent=g==='granted'?'Promemoria attivi':g==='denied'?'Promemoria bloccati':'Attiva promemoria';b.disabled=g!=='default';$('#testNotif').hidden=g!=='granted';$('#notifHint').textContent=leadsText();
 if(g==='denied')$('#notifHint').textContent='Hai bloccato le notifiche: riattivale dalle impostazioni del browser per questo sito.'}
async function enableNotif(){try{const g=await Notification.requestPermission();notifUI();if(g!=='granted')return;const reg=await navigator.serviceWorker.ready;
 try{if(reg.periodicSync)await reg.periodicSync.register('labas-scadenze',{minInterval:12*3600*1000})}catch(e){}
 remind();toast('Promemoria attivi');if(USER&&!S.set.push)pushOn()}catch(e){toast('Non riesco ad attivare i promemoria')}}
let installEv=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEv=e;$('#installRow').hidden=false});
window.addEventListener('appinstalled',()=>{$('#installRow').hidden=true;installEv=null;toast('Labas è installata')});
async function backup(){toast('Preparo il backup…');const files={};
 for(const x of [...S.diary,...S.docs]){if(!x.f)continue;let b=await idb.get('files',x.f).catch(()=>null);if(!b&&USER){await fileURL(x.f);b=await idb.get('files',x.f).catch(()=>null)}if(b)files[x.f]=await blobToData(b)}
 const blob=new Blob([JSON.stringify({labas:2,state:S,files})],{type:'application/json'}),a=document.createElement('a');
 a.href=URL.createObjectURL(blob);a.download=`labas-backup-${iso(new Date())}.json`;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},3000);toast('Backup scaricato')}
async function restore(file){const o=JSON.parse(await file.text());const st=o&&o.state?o.state:o;if(!st||!Array.isArray(st.tasks))throw new Error('formato');
 for(const [f,d] of Object.entries(o.files||{})){if(/^[a-z0-9]+$/.test(f)&&/^data:/.test(d)){await idb.put('files',f,dataToBlob(d));if(!upq.includes(f))upq.push(f)}}saveQ();
 const p=JSON.stringify(S),acct=S.acct;S=fill(st);S.acct=acct;mon='';save();all();await migrateLegacy();drain();
 toast('Backup ripristinato',()=>{S=fill(JSON.parse(p));save();all()})}
async function migrateLegacy(){let ch=false;for(const x of [...S.diary,...S.docs]){if(x.img&&!x.f&&/^data:image\//.test(x.img)){try{x.f=await addFile(dataToBlob(x.img));delete x.img;ch=true}catch(e){break}}}if(ch){save();diary();docs()}}
/* Impostazioni, intro e animazioni */
const calm=()=>S.set.motion===false||matchMedia('(prefers-reduced-motion: reduce)').matches;
function anim(el,cls,dur,mid,midDelay){if(!el){if(mid)mid();return}if(calm()){if(mid)mid();return}el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls);if(mid)setTimeout(mid,midDelay||0);setTimeout(()=>el.classList.remove(cls),dur)}
const FLW=c=>`<svg viewBox="-40 -40 80 80" width="22" height="22">${[0,72,144,216,288].map(a=>`<circle cx="0" cy="-20" r="14" fill="${c}" stroke="#22140a" stroke-width="4" transform="rotate(${a})"/>`).join('')}<circle r="11" fill="#ffc21a" stroke="#22140a" stroke-width="4"/></svg>`;
function burst(x,y,n){try{navigator.vibrate&&navigator.vibrate(n>15?[12,40,18]:14)}catch(e){}if(calm())return;const cs=pal();for(let i=0;i<n;i++){const a=Math.PI*2*i/n+Math.random()*.6,d=50+Math.random()*70,e=document.createElement('span');e.className='bst';e.innerHTML=FLW(cs[i%4]);e.style.setProperty('--x0',x+'px');e.style.setProperty('--y0',y+'px');e.style.setProperty('--x1',(x+Math.cos(a)*d).toFixed(0)+'px');e.style.setProperty('--y1',(y+Math.sin(a)*d-20).toFixed(0)+'px');e.style.setProperty('--r',(Math.random()*360-180).toFixed(0)+'deg');document.body.appendChild(e);setTimeout(()=>e.remove(),850)}}
const LEADS=[[7,'7 giorni prima'],[3,'3 giorni prima'],[1,'il giorno prima'],[0,'il giorno stesso']];
function leadsText(){const L=LEADS.filter(([n])=>S.set.leads.includes(n)).map(x=>x[1]);if(!L.length)return'Nessun momento scelto: seleziona almeno un avviso qui sotto.';return`Ti avviso ${L.length>1?L.slice(0,-1).join(', ')+' e '+L[L.length-1]:L[0]} di ogni scadenza della checklist.`}
const STYLES={flower:'Flower power',sunset:"Tramonto '70",psy:'Psichedelico',disco:'Disco',avocado:'Avocado e senape',trispalve:'Trispalvė',ambra:'Ambra baltica',inverno:'Inverno a Vilnius',pop:'Pop art',sorbetto:'Sorbetto',tiedye:'Tie-dye'};
function effStyle(){const s=S.set.style||'flower';if(s!=='auto')return STYLES[s]?s:'flower';let w=null;try{w=(JSON.parse(localStorage.getItem('labas-wx'))||{}).w}catch(e){}
 const code=w&&w.current?+w.current.weather_code:null,t=w&&w.current?+w.current.temperature_2m:null;
 if(code!==null&&([71,73,75,77,85,86].includes(code)||t<=-3))return 'inverno';if(code!==null&&code<=1&&t>=18)return 'ambra';
 const m=+new Intl.DateTimeFormat('en',{timeZone:'Europe/Vilnius',month:'numeric'}).format(new Date())-1;return m===11||m<=1?'inverno':m<=4?'flower':m<=7?'ambra':'avocado'}
function styleSync(){const e=effStyle(),r=document.documentElement;if(r.dataset.style===e)return;applySettings();petals();petalProg();themeMeta();flowers();if(typeof MAP!=='undefined'&&MAP)mapMarkers()}
function applySettings(){const r=document.documentElement,st=S.set;if(st.theme==='auto')delete r.dataset.theme;else r.dataset.theme=st.theme;r.classList.toggle('big',st.text==='l');r.classList.toggle('calm',st.motion===false);r.dataset.style=effStyle();try{localStorage.setItem('labas-style-eff',r.dataset.style)}catch(e){}const an=$('#autoNow');if(an)an.textContent=st.style==='auto'?'ora: '+STYLES[r.dataset.style]:'segue meteo e stagione';r.classList.toggle('dk',S.set.theme==='dark'||(S.set.theme!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches));
 $('#hello').textContent=st.name&&st.name.trim()?`Labas, ${st.name.trim()}!`:'Labas!';
 const dark=st.theme==='dark'||(st.theme==='auto'&&matchMedia('(prefers-color-scheme: dark)').matches);themeMeta();flowers()}
function settingsUI(){const st=S.set;
 $('#set-name').value=st.name||'';$('#set-uni').value=st.uni||'';$('#dep2').value=S.dep;$('#ret2').value=S.ret;$('#set-goal').value=st.goal;$('#set-start').value=st.start;
 $('#set-motion').checked=st.motion!==false;$('#set-intro').checked=st.intro!==false;$('#set-en').checked=st.en!==false;$('#set-lt').checked=st.lt!==false;
 document.querySelectorAll('.seg').forEach(g=>g.querySelectorAll('button').forEach(b=>{const on=b.dataset.v===st[g.dataset.seg];b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)}));
 $('#leads').innerHTML=LEADS.map(([n,l])=>`<label for="ld-${n}"><input type="checkbox" id="ld-${n}" data-lead="${n}"${st.leads.includes(n)?' checked':''}>${l[0].toUpperCase()+l.slice(1)}</label>`).join('');
 $('#learnN').textContent=`${S.learned.length+S.lt.length} frasi e parole segnate come imparate`;
 $('#verTxt').textContent=`Labas ${VER}`;document.querySelectorAll('[data-stylev]').forEach(b=>b.classList.toggle('on',b.dataset.stylev===(S.set.style||'flower')));pushUI();calUI();notifUI();applySettings()}
async function storageInfo(){const e=$('#storage');try{const est=navigator.storage&&navigator.storage.estimate?await navigator.storage.estimate():null,p=navigator.storage&&navigator.storage.persisted?await navigator.storage.persisted():false;
 e.textContent=(est?`Labas usa circa ${((est.usage||0)/1048576).toLocaleString('it-IT',{maximumFractionDigits:1})} MB su questo dispositivo.`:'')+(p?' I dati sono protetti dalla pulizia automatica del browser.':'')}catch(x){e.textContent=''}}
function armed(b,label){if(b.dataset.arm){delete b.dataset.arm;b.textContent=label;b.classList.remove('danger');return true}b.dataset.arm='1';b.textContent='Tocca ancora per confermare';b.classList.add('danger');setTimeout(()=>{if(b.dataset.arm){delete b.dataset.arm;b.textContent=label;b.classList.remove('danger')}},4000);return false}
function doLogin(){if(!SB){toast('Accesso non disponibile ora');return}if(!navigator.onLine){toast('Per accedere serve internet');return}SB.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+location.pathname}}).then(r=>{if(r&&r.error)throw r.error}).catch(()=>toast("Non riesco ad aprire l'accesso, riprova"))}
async function wipeLocal(){try{if(SB&&USER)await SB.auth.signOut()}catch(e){}[KEY,OLD,UPQ].forEach(k=>{try{localStorage.removeItem(k)}catch(e){}});try{indexedDB.deleteDatabase('labas')}catch(e){}location.replace(location.pathname)}
async function wipeCloud(){if(!SB||!USER)return;try{const l=await SB.storage.from(BUCKET).list(USER.id,{limit:1000});if(l.data&&l.data.length){const rr=await SB.storage.from(BUCKET).remove(l.data.map(f=>USER.id+'/'+f.name));if(rr.error)throw rr.error}const d=await SB.from('labas_data').delete().eq('user_id',USER.id);if(d.error)throw d.error;
 clearTimeout(wT);dirty=false;await SB.auth.signOut().catch(()=>{});USER=null;S.acct=null;saveLocal();acctUI();docs();toast("Dati dell'account eliminati: restano su questo telefono")}catch(e){toast('Non riesco a eliminarli ora, riprova')}}
async function checkUpdate(){toast('Cerco aggiornamenti…');try{const r=navigator.serviceWorker&&await navigator.serviceWorker.getRegistration();if(r)await r.update()}catch(e){}setTimeout(()=>location.reload(),700)}
function countUp(){const el=$('#cd'),t=+el.textContent;if(!(t>1)||calm())return;const t0=performance.now(),D=900;const f=n=>{const k=Math.min(1,(n-t0)/D);el.textContent=Math.round(t*(1-(1-k)**3));if(k<1)requestAnimationFrame(f)};el.textContent='0';requestAnimationFrame(f)}
const petalSVG=(cls)=>Array.from({length:14},(_,i)=>`<g transform="rotate(${(i*360/14).toFixed(2)} 100 100)"><ellipse class="${cls}" cx="100" cy="40" rx="17" ry="38" style="--d:${(i*32)}ms;fill:var(${i%2?'--orange':'--pink'})" stroke="#22140a" stroke-width="3.5"/></g>`).join('');
let ob=0;const OBN=4;
function obShow(){document.querySelectorAll('#onb .step').forEach((s,i)=>s.classList.toggle('on',i===ob));$('#obDots').innerHTML=Array.from({length:OBN},(_,i)=>`<i class="${i===ob?'on':''}"></i>`).join('');$('#obBack').hidden=ob===0;$('#obNext').textContent=ob===OBN-1?'Inizia':'Avanti';$('#onbDaisy').style.transform=`rotate(${ob*26}deg)`}
function obOpen(){ob=0;$('#onbPetals').innerHTML=petalSVG('');$('#o-name').value=S.set.name||'';$('#o-uni').value=S.set.uni||'';$('#o-dep').value=S.dep;$('#o-ret').value=S.ret;$('#onb').hidden=false;obShow();setTimeout(()=>$('#obNext').focus(),50)}
function obSave(){S.set.name=$('#o-name').value.trim();S.set.uni=$('#o-uni').value.trim()||SETD().uni;if($('#o-dep').value)S.dep=$('#o-dep').value;if($('#o-ret').value)S.ret=$('#o-ret').value}
function obClose(){obSave();S.set.onb=true;save();all();$('#onb').hidden=true;setTimeout(()=>{const r=$('#daisy').getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,18);countUp()},120)}
function intro(){const sp=$('#splash'),need=!S.set.onb;let done=false;const after=()=>{if(done)return;done=true;if(sp){sp.classList.add('out');setTimeout(()=>sp.remove(),450)}if(need)obOpen();else countUp()};
 if(!sp)return after();
 if(S.set.intro===false||calm()||/[?&]code=/.test(location.search)){sp.remove();done=true;if(need)obOpen();return}
 $('#spPetals').innerHTML=petalSVG('sp-p');sp.addEventListener('click',after);setTimeout(after,1450)}
document.addEventListener('click',e=>{const a=e.target.closest('a[data-jump]');if(a){e.preventDefault();const t=document.getElementById(a.dataset.jump);if(t)t.scrollIntoView({behavior:calm()?'auto':'smooth',block:'start'});return}
 const b=e.target.closest('button');if(!b)return;const seg=b.closest('.seg');
 if(seg&&b.dataset.v){S.set[seg.dataset.seg]=b.dataset.v;save();settingsUI();return}
 switch(b.id){
  case 'syncNow':pull();break;
  case 'testNotif':navigator.serviceWorker.ready.then(r=>r.showNotification('Labas',{body:'I promemoria funzionano: così ti avviso prima di ogni scadenza.',icon:'icon-192.png',badge:'icon-96.png'})).catch(()=>toast('Non riesco a mostrare la notifica'));break;
  case 'resetDeck':if(armed(b,'Azzera')){S.learned=[];S.lt=[];save();english();buildDeck();settingsUI();toast('Progressi azzerati')}break;
  case 'wipeLocal':if(armed(b,'Cancella da questo telefono'))wipeLocal();break;
  case 'wipeCloud':if(armed(b,"Elimina i dati dell'account"))wipeCloud();break;
  case 'checkUpd':checkUpdate();break;
  case 'replayIntro':obOpen();break;
  case 'obNext':if(ob===OBN-1)obClose();else{if(ob===1)obSave();ob++;obShow()}break;
  case 'obBack':if(ob>0){ob--;obShow()}break;
  case 'obSkip':obClose();break;
  case 'o-login':obSave();S.set.onb=true;save();doLogin();break;
  case 'o-notif':enableNotif();break;
 }});
try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persist().catch(()=>{})}catch(e){}
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',applySettings);
/* ===== Novità 1.3: Oggi a Vilnius, esami, calendario, mappa, spese fisse, lingue, scrittura, cartolina, PDF, PIN ===== */
const VTZ='Europe/Vilnius';
const vNow=()=>{const p=new Intl.DateTimeFormat('en-GB',{timeZone:VTZ,weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date()),g=t=>(p.find(x=>x.type===t)||{}).value;return{wd:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].indexOf(g('weekday')),min:(+g('hour'))*60+(+g('minute'))}};
const WX=[[[0],'Sereno','sun'],[[1,2],'Poco nuvoloso','partly'],[[3],'Nuvoloso','cloud'],[[45,48],'Nebbia','fog'],[[51,53,55,56,57],'Pioviggine','rain'],[[61,63,65,66,67,80,81,82],'Pioggia','rain'],[[71,73,75,77,85,86],'Neve','snow'],[[95,96,99],'Temporale','storm']];
const SUNF='<circle cx="24" cy="24" r="11" style="fill:var(--yel)" stroke="#22140a" stroke-width="3"/><circle cx="20.5" cy="22.5" r="1.6" fill="#22140a"/><circle cx="27.5" cy="22.5" r="1.6" fill="#22140a"/><path d="M20 27q4 3.5 8 0" fill="none" stroke="#22140a" stroke-width="2" stroke-linecap="round"/>';
const RAYS=[0,45,90,135,180,225,270,315].map(a=>`<path d="M24 3.5v6" stroke="#22140a" stroke-width="3" stroke-linecap="round" transform="rotate(${a} 24 24)"/><path d="M24 4.5v4" style="stroke:var(--orange)" stroke-width="1.4" stroke-linecap="round" transform="rotate(${a} 24 24)"/>`).join('');
const CLOUD=(y)=>`<path d="M13 ${y}h21a8.5 8.5 0 0 0 0-17 11.5 11.5 0 0 0-22 3.2A7 7 0 0 0 13 ${y}z" fill="#fffaf0" stroke="#22140a" stroke-width="3" stroke-linejoin="round"/><path d="M17 ${y-6}q3-3 6 0" fill="none" style="stroke:var(--pink)" stroke-width="2" stroke-linecap="round"/>`;
const WICO={sun:RAYS+SUNF,cloud:CLOUD(37),fog:CLOUD(28)+'<path d="M7 35h34M11 41h26" style="stroke:var(--mint)" stroke-width="3.2" stroke-linecap="round"/>'};
WICO.partly='<g transform="translate(-6 -6) scale(.8)">'+RAYS+SUNF+'</g>'+CLOUD(39);
WICO.rain=CLOUD(31)+'<path d="M17 36l-2.5 7M25 36l-2.5 7M33 36l-2.5 7" stroke="#2f8fd8" stroke-width="3.2" stroke-linecap="round"/>';
WICO.snow=CLOUD(31)+'<g fill="#fff" stroke="#22140a" stroke-width="1.6"><circle cx="16" cy="40" r="3"/><circle cx="24.5" cy="43" r="3"/><circle cx="33" cy="40" r="3"/></g>';
WICO.storm=CLOUD(31)+'<path d="M25 30l-6 9h5.5l-3 8 9-11h-5.5l3.5-6z" style="fill:var(--yel)" stroke="#22140a" stroke-width="2" stroke-linejoin="round"/>';
const wxInfo=c=>{for(const [codes,l,i] of WX)if(codes.includes(c))return[l,i];return['','cloud']};
function clockTick(){const e=$('#vClock');if(!e)return;e.textContent=new Intl.DateTimeFormat('it-IT',{timeZone:VTZ,hour:'2-digit',minute:'2-digit'}).format(new Date());
 const ds=new Intl.DateTimeFormat('it-IT',{timeZone:VTZ,weekday:'long',day:'numeric',month:'long'}).format(new Date());$('#vDate').textContent=ds+', un\'ora avanti';}
function wxRender(w){if(!w||!w.current)return;const [l,i]=wxInfo(+w.current.weather_code);$('#wIcon').innerHTML=`<svg viewBox="0 0 48 48" aria-hidden="true">${WICO[i]}</svg>`;
 $('#wTemp').textContent=Math.round(w.current.temperature_2m)+'°';$('#wDesc').textContent=`${l}, min ${Math.round(w.daily.temperature_2m_min[0])}° max ${Math.round(w.daily.temperature_2m_max[0])}°`;
 const ss=(w.daily.sunset&&w.daily.sunset[0]||'').slice(11,16),sr=(w.daily.sunrise&&w.daily.sunrise[0]||'').slice(11,16);$('#wSun').textContent=ss||'--:--';$('#wDay').textContent=sr?`alba alle ${sr}`:'';if(typeof heroSky==='function')setTimeout(heroSky,0);if(S.set.style==='auto')setTimeout(styleSync,0)}
async function weather(force){let c=null;try{c=JSON.parse(localStorage.getItem('labas-wx'))}catch(e){}if(c&&c.w)wxRender(c.w);
 if(!force&&c&&Date.now()-c.t<30*60e3)return;if(!navigator.onLine){if(!c){$('#wDesc').textContent='Meteo non disponibile offline';$('#wTemp').textContent='--°';$('#wSun').textContent='--:--'}return}
 try{const r=await fetch('https://api.open-meteo.com/v1/forecast?latitude=54.6872&longitude=25.2797&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Europe%2FVilnius&forecast_days=1');if(!r.ok)throw 0;const w=await r.json();wxRender(w);try{localStorage.setItem('labas-wx',JSON.stringify({t:Date.now(),w}))}catch(e){}}
 catch(e){if(!c){$('#wDesc').textContent='Meteo non disponibile ora';$('#wTemp').textContent='--°';$('#wSun').textContent='--:--'}}}
function nextLesson(){if(!S.sched.length)return null;const n=vNow(),toMin=t=>{const [h,m]=String(t).split(':');return(+h)*60+(+m||0)};let best=null;
 for(const l of S.sched){let dd=(+l.d)-n.wd;if(dd<0||(dd===0&&toMin(l.a)<=n.min))dd+=7;const k=dd*1440+toMin(l.a);if(!best||k<best.k)best={k,l,dd}}return best}
function upcomingExam(){return S.courses.filter(c=>c.ex&&!c.s&&ddiff(c.ex)!==null&&ddiff(c.ex)>=0).sort((a,b)=>a.ex<b.ex?-1:1)[0]}
function todayCard(){clockTick();const rows=[];const nl=nextLesson();
 const z0=stay();let first=null;if(z0.st==='before'&&S.sched.length){const wd=(new Date(S.dep+'T12:00:00').getDay()+6)%7;first=S.sched.map(l=>({l,d:addDays(S.dep,((+l.d)-wd+7)%7)})).sort((a,b)=>(a.d+a.l.a)<(b.d+b.l.a)?-1:1)[0]}
 if(first)rows.push(['Lezione',`Prima lezione ${fmt(first.d,{weekday:'long',day:'numeric',month:'long'})} alle ${esc(first.l.a)}<small>${esc(first.l.c)}${first.l.r?', '+esc(first.l.r):''}</small>`]);else rows.push(['Lezione',nl?`${nl.dd===0?'Oggi':nl.dd===1?'Domani':DAYS[nl.l.d]} alle ${esc(nl.l.a)}<small>${esc(nl.l.c)}${nl.l.r?', '+esc(nl.l.r):''}</small>`:'Nessuna lezione<small>Aggiungi l\'orario in Studio</small>'])
 const t=S.tasks.filter(x=>!x.done&&x.due&&ddiff(x.due)!==null).sort((a,b)=>a.due<b.due?-1:1)[0];
 rows.push(['Scadenza',t?`${esc(t.t)}<small>${rel(ddiff(t.due))}, ${fmt(t.due,{day:'numeric',month:'long'})}</small>`:'Nessuna in arrivo<small>Tutto in ordine</small>']);
 const ex=upcomingExam();rows.push(['Esame',ex?`${esc(ex.n)}<small>${rel(ddiff(ex.ex)).replace('scaduta','passato')}, ${fmt(ex.ex,{day:'numeric',month:'long'})}</small>`:'Nessuna data<small>Aggiungila nei corsi</small>']);
 if(todayCommute&&S.home&&S.home.lat)rows[0][1]+=`<small>Esci alle ${todayCommute.leaveT} con ${esc(todayCommute.rides)}, oppure a piedi alle ${todayCommute.leaveW} (${todayCommute.walk}′)</small>`;
 $('#tNext').innerHTML=rows.map(([k,v])=>`<div class="tn"><small>${k}</small><span>${v}</span></div>`).join('')}
/* Esami */
function examsView(){const L=S.courses.filter(c=>c.ex).sort((a,b)=>a.ex<b.ex?-1:1);
 $('#exams').innerHTML=L.map(c=>{const n=ddiff(c.ex);return `<div class="exr${c.s?' done':''}"><b class="n">${c.s?'✓':n<0?'?':n===0?'Oggi':n}</b><div>${esc(c.n)}<small>${fmt(c.ex)}${c.s?`, superato${+c.g?` con ${esc(c.g)}`:''}`:n<0?': com\'è andato? Segna il voto nel corso':', '+rel(n)}</small></div></div>`}).join('')||'<p class="empty">Nessuna data d\'esame: aggiungila nei corsi qui sopra.</p>'}
/* Calendario .ics */
const icsEsc=t=>String(t||'').replace(/\\/g,'\\\\').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/\r?\n/g,'\\n');
const icsFold=l=>{const out=[];let s=l;while(s.length>72){out.push(s.slice(0,72));s=' '+s.slice(72)}out.push(s);return out.join('\r\n')};
const ymd=s=>String(s).replace(/-/g,'');
function addDays(s,n){const d=new Date(s+'T12:00:00');d.setDate(d.getDate()+n);return iso(d)}
function makeIcs(o){const st=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d+/,''),L=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Labas//IT','CALSCALE:GREGORIAN','METHOD:PUBLISH','X-WR-CALNAME:Labas Erasmus','X-WR-TIMEZONE:Europe/Vilnius',
 'BEGIN:VTIMEZONE','TZID:Europe/Vilnius','BEGIN:DAYLIGHT','TZOFFSETFROM:+0200','TZOFFSETTO:+0300','TZNAME:EEST','DTSTART:19700329T030000','RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU','END:DAYLIGHT','BEGIN:STANDARD','TZOFFSETFROM:+0300','TZOFFSETTO:+0200','TZNAME:EET','DTSTART:19701025T040000','RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU','END:STANDARD','END:VTIMEZONE'];
 const alarms=(list)=>list.flatMap(tr=>['BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:Promemoria','TRIGGER:'+tr,'END:VALARM']);
 const dayAlarms=()=>S.set.leads.map(n=>n===0?'PT9H':`-PT${n*24-9}H`);
 const allDay=(id,d,title,desc,al)=>{L.push('BEGIN:VEVENT','UID:'+id+'@labas','DTSTAMP:'+st,'DTSTART;VALUE=DATE:'+ymd(d),'DTEND;VALUE=DATE:'+ymd(addDays(d,1)),'SUMMARY:'+icsEsc(title));if(desc)L.push('DESCRIPTION:'+icsEsc(desc));L.push('TRANSP:TRANSPARENT',...alarms(al),'END:VEVENT')};
 let n=0;
 if(o.l&&S.sched.length){const start=[S.dep,iso(new Date())].filter(x=>ddiff(x)!==null).sort().pop()||iso(new Date()),until=ddiff(S.ret)!==null?ymd(S.ret)+'T215959Z':null;
  for(const l of S.sched){const sd=new Date(start+'T12:00:00');const wd=(sd.getDay()+6)%7;let first=addDays(start,((+l.d)-wd+7)%7);const hm=x=>String(x||'00:00').replace(':','')+'00';
   L.push('BEGIN:VEVENT','UID:lez-'+l.id+'@labas','DTSTAMP:'+st,'DTSTART;TZID=Europe/Vilnius:'+ymd(first)+'T'+hm(l.a),'DTEND;TZID=Europe/Vilnius:'+ymd(first)+'T'+hm(l.b||l.a));
   if(until)L.push('RRULE:FREQ=WEEKLY;UNTIL='+until);else L.push('RRULE:FREQ=WEEKLY;COUNT=20');
   L.push('SUMMARY:'+icsEsc(l.c));if(l.r)L.push('LOCATION:'+icsEsc(l.r));L.push(...alarms(['-PT15M']),'END:VEVENT');n++}}
 if(o.d)S.tasks.filter(t=>!t.done&&t.due&&ddiff(t.due)!==null).forEach(t=>{allDay('sc-'+t.id,t.due,t.t,'Scadenza della checklist di Labas',dayAlarms());n++});
 if(o.e)S.courses.filter(c=>c.ex&&!c.s).forEach(c=>{allDay('ex-'+c.id,c.ex,'Esame: '+c.n,'Esame Erasmus all\'EHU',[...new Set(['-PT159H',...dayAlarms()])]);n++});
 L.push('END:VCALENDAR');return{txt:L.map(icsFold).join('\r\n')+'\r\n',n}}
const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
function giveFile(blob,name,type,title){let file=null;try{file=new File([blob],name,{type})}catch(e){}
 if(file&&navigator.canShare&&navigator.canShare({files:[file]})&&(isIOS||/Android/.test(navigator.userAgent))){return navigator.share({files:[file],title}).then(()=>true).catch(e=>{if(e&&e.name==='AbortError')return false;dl();return true})}
 dl();return Promise.resolve(true);function dl(){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},4000)}}
function exportIcs(){const o={l:$('#ics-l').checked,d:$('#ics-d').checked,e:$('#ics-e').checked},r=makeIcs(o);if(!r.n){toast('Niente da esportare: aggiungi lezioni, scadenze o esami');return}
 giveFile(new Blob([r.txt],{type:'text/calendar;charset=utf-8'}),'Labas-Erasmus.ics','text/calendar','Labas Erasmus').then(ok=>{if(ok)toast(`${r.n} eventi pronti: aprili con il Calendario`)})}
/* Spese fisse */
const ym=d=>iso(d).slice(0,7);
function stayMonths(){const a=ddiff(S.dep)!==null?S.dep.slice(0,7):null,b=ddiff(S.ret)!==null?S.ret.slice(0,7):null;const out=[];
 if(!a||!b||a>b){const d=new Date();for(let i=5;i>=0;i--){const x=new Date(d.getFullYear(),d.getMonth()-i,1);out.push(ym(x))}return out}
 let [y,m]=a.split('-').map(Number);while(out.length<24){const k=`${y}-${String(m).padStart(2,'0')}`;out.push(k);if(k===b)break;m++;if(m>12){m=1;y++}}return out}
function runRec(){const today=iso(new Date()),cur=today.slice(0,7);let added=0;
 for(const r of S.rec){for(const k of stayMonths()){if(k>cur||k<(r.from||'0000'))continue;const [y,m]=k.split('-').map(Number),dim=new Date(y,m,0).getDate(),d=`${k}-${String(Math.min(+r.day||1,dim)).padStart(2,'0')}`;
  if(d>today||ddiff(S.dep)===null||d<S.dep||(ddiff(S.ret)!==null&&d>S.ret))continue;if(S.log.some(l=>l.rid===r.id&&(l.d||'').slice(0,7)===k))continue;S.log.push({id:uid(),c:r.c,d,n:r.n,v:+r.v||0,rid:r.id});added++}}
 if(added){save();logView();chart();toast(added===1?'Registrata una spesa fissa':`Registrate ${added} spese fisse`)}}
function recView(){$('#r-c').innerHTML=S.exp.map(x=>`<option value="${x.id}">${esc(x.n)}</option>`).join('');
 $('#recRows').innerHTML=S.rec.map(r=>{const c=S.exp.find(x=>x.id===r.c),i=S.exp.indexOf(c);return `<div class="rrow"><span class="dot" style="background:${i>=0?COLS[i%COLS.length]:'var(--soft)'}"></span><div>${esc(r.n)}<small>ogni mese il giorno ${+r.day||1}${c?', '+esc(c.n):''}</small></div><b>${eur(r.v)}</b><button class="x" type="button" data-rdel="${r.id}" aria-label="Elimina ${esc(r.n)}">×</button></div>`}).join('')||'<p class="empty">Nessuna spesa fissa: aggiungi affitto, abbonamento o telefono.</p>'}
function chart(){const M=stayMonths(),plan=sum(S.exp),vals=M.map(k=>sum(S.log.filter(l=>(l.d||'').slice(0,7)===k))),mx=Math.max(plan,...vals,1)*1.1;
 const lab=k=>new Date(k+'-01T12:00:00').toLocaleDateString('it-IT',{month:'short'}).replace('.','');
 $('#mchart').innerHTML=`<div class="mline" style="bottom:calc(${(plan/mx*100).toFixed(1)}% * (100% - 58px) / 100% + 40px)"><span>${eur(Math.round(plan))}</span></div>`+M.map((k,i)=>`<button class="mcol${vals[i]>plan?' over':''}${k===mon?' sel':''}" type="button" data-month="${k}" aria-label="${lab(k)}: ${eur(vals[i])}"><em>${vals[i]?eur(Math.round(vals[i])):''}</em><i style="height:calc((100% - 58px) * ${(vals[i]/mx).toFixed(3)})"></i><span>${lab(k)}</span></button>`).join('');
 const tot=sum(vals.map(v=>({v}))),act=vals.filter(v=>v>0).length;$('#chartTxt').textContent=act?`In media ${eur(Math.round(tot/act))} al mese contro ${eur(Math.round(plan))} previsti. Tocca un mese per vederne le spese.`:`La linea verde è il budget previsto: ${eur(Math.round(plan))} al mese.`}
/* Lituano per situazioni e voce */
const LTS=[['market','Supermercato',[['Kur yra…?','Dov\'è…?','kur ìra'],['Ar galiu mokėti kortele?','Posso pagare con la carta?','ar galiù mokéti kortelè'],['Maišelio nereikia','Non serve la busta','maiscèlio nerèikia'],['Grynaisiais','In contanti','grìnaisiais']]],
 ['bus','Trasporti',[['Kur yra autobusų stotelė?','Dov\'è la fermata dell\'autobus?','kur ìra autobusù stotelé'],['Vieną bilietą, prašau','Un biglietto, per favore','vièna bìlieta, prashàu'],['Kaip nuvykti į senamiestį?','Come arrivo alla città vecchia?','kaip nuvìkti i senàmiesti'],['Kur yra traukinių stotis?','Dov\'è la stazione dei treni?','kur ìra traukiniù stotìs']]],
 ['bar','Bar e ristorante',[['Vieną kavą, prašau','Un caffè, per favore','vièna kàva, prashàu'],['Vandens, prašau','Acqua, per favore','vandèns, prashàu'],['Ar turite vegetariškų patiekalų?','Avete piatti vegetariani?','ar tùrite vegetàrishku patiekalù'],['Sąskaitą, prašau','Il conto, per favore','sàskaita, prashàu'],['Labai skanu!','Buonissimo!','labài skanù']]],
 ['pharma','Farmacia',[['Kur yra vaistinė?','Dov\'è la farmacia?','kur ìra vàistiné'],['Man skauda galvą','Ho mal di testa','man skàuda gàlva'],['Man skauda gerklę','Ho mal di gola','man skàuda gèrkle'],['Ar reikia recepto?','Serve la ricetta?','ar rèikia recèpto']]],
 ['help','Aiuto',[['Padėkite!','Aiuto!','padékite'],['Aš nekalbu lietuviškai','Non parlo lituano','ash nekalbù lietùvishkai'],['Ar kalbate angliškai?','Parla inglese?','ar kàlbate ànglishkai'],['Aš pasiklydau','Mi sono perso','ash pasiklìdau'],['Iškvieskite greitąją pagalbą','Chiamate un\'ambulanza','ishkvièskite grèitaja pagàlba']]]];
let ltsTab='market';
const voices=()=>('speechSynthesis' in window)?speechSynthesis.getVoices():[];
const hasVoice=l=>voices().some(v=>(v.lang||'').toLowerCase().replace('_','-').startsWith(l));
function speak(t,l){try{if(!('speechSynthesis' in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t),v=voices().find(v=>(v.lang||'').toLowerCase().replace('_','-').startsWith(l));u.lang=v?v.lang:(l==='lt'?'lt-LT':'en-GB');if(v)u.voice=v;u.rate=.9;speechSynthesis.speak(u)}catch(e){}}
const ISPK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>';
function ltsView(){const lv=hasVoice('lt');$('#ltsTabs').innerHTML=LTS.map(([k,l])=>`<button type="button" data-lts="${k}" class="${k===ltsTab?'on':''}">${l}</button>`).join('');
 const g=LTS.find(x=>x[0]===ltsTab)||LTS[0];$('#ltsList').innerHTML=g[2].map(([lt,it,pr],i)=>{const id=`ls-${g[0]}-${i}`,on=S.lt.includes(id);return `<div class="ltsrow"><div><b>${esc(lt)}</b><small>${esc(it)}, si dice: ${esc(pr)}</small></div>${lv?`<button class="ib" type="button" data-say="${esc(lt)}" data-lang="lt" aria-label="Ascolta">${ISPK}</button>`:'<span></span>'}<button class="ib${on?' on':''}" type="button" data-ltl="${id}" aria-pressed="${on}" aria-label="Segna come imparata">${ISTAR}</button></div>`}).join('');
 $('#ltsHint').textContent=lv?'Tocca l\'altoparlante per sentire la pronuncia.':'Pronuncia approssimativa, scritta all\'italiana: questo telefono non ha una voce lituana da far leggere.'}
function engSpeak(){if(!hasVoice('en'))return;document.querySelectorAll('#engGroups .phrow').forEach(r=>{if(r.querySelector('[data-say]'))return;const t=r.querySelector('b').textContent,b=document.createElement('button');b.className='ib';b.type='button';b.dataset.say=t;b.dataset.lang='en';b.setAttribute('aria-label','Ascolta');b.innerHTML=ISPK;r.style.gridTemplateColumns='minmax(0,1fr) auto auto auto';r.insertBefore(b,r.children[1])})}
if('speechSynthesis' in window)speechSynthesis.addEventListener?.('voiceschanged',()=>{ltsView();engSpeak()});
/* Scrittura B2 */
const PROMPTS=[['email','Email formale',"You are going to study at a university abroad next semester. Write an email to the accommodation office. Introduce yourself, ask about the facilities in your flat and explain when and how you will arrive."],
 ['friend','Email informale',"An English-speaking friend wants to visit you in Vilnius. Write an email describing the city, suggesting what you could do together and giving some travel advice."],
 ['essay','Saggio',"'Studying abroad is more useful than studying in your own country.' Do you agree? Write an essay giving reasons and examples."],
 ['article','Articolo',"A student magazine is looking for articles with the title 'A place that changed me'. Write an article describing the place and explaining why it was important to you."],
 ['review','Recensione',"Write a review of a course, book or film you have recently enjoyed for your university website. Say what it was about, what you liked and who you would recommend it to."],
 ['complaint','Reclamo',"You bought a product online but it arrived damaged. Write a formal email to the shop explaining what happened and saying what you expect them to do."]];
let wrMin=30,wrLeft=null,wrT=null;
const wcount=t=>(t.trim().match(/[A-Za-zÀ-ÿ0-9'’-]+/g)||[]).length;
function wrInit(){$('#wr-p').innerHTML=PROMPTS.map(([k,l])=>`<option value="${k}">${l}</option>`).join('');let dr={};try{dr=JSON.parse(localStorage.getItem('labas-wr'))||{}}catch(e){}
 if(dr.p)$('#wr-p').value=dr.p;$('#wr-t').value=dr.t||'';wrPrompt();wrCount();wrClock();wrList()}
function wrPrompt(){const p=PROMPTS.find(x=>x[0]===$('#wr-p').value)||PROMPTS[0];$('#wr-txt').textContent=p[2]}
function wrCount(){const n=wcount($('#wr-t').value),e=$('#wr-count');e.textContent=`${n} ${n===1?'parola':'parole'}`+(n?n<150?`, ne mancano ${150-n} per arrivare a 150`:n>200?', oltre 200: valuta se accorciare':', lunghezza giusta per molte tracce':'');e.className=n===0?'':n<150?'lo':n>200?'hi':'ok';try{localStorage.setItem('labas-wr',JSON.stringify({p:$('#wr-p').value,t:$('#wr-t').value}))}catch(x){}}
function wrClock(){const left=wrLeft===null?wrMin*60:wrLeft,e=$('#wr-clock');e.textContent=`${Math.floor(left/60)}:${String(left%60).padStart(2,'0')}`;e.classList.toggle('end',left===0);
 document.querySelectorAll('[data-wmin] button').forEach(b=>b.classList.toggle('on',+b.dataset.m===wrMin));$('#wr-go').textContent=wrT?'Pausa':wrLeft!==null&&wrLeft>0?'Riprendi':'Avvia'}
function wrToggle(){if(wrT){clearInterval(wrT);wrT=null;wrClock();return}if(wrLeft===null||wrLeft===0)wrLeft=wrMin*60;wrT=setInterval(()=>{wrLeft=Math.max(0,wrLeft-1);wrClock();if(!wrLeft){clearInterval(wrT);wrT=null;wrClock();toast('Tempo scaduto: rileggi e controlla i connettivi');try{navigator.vibrate&&navigator.vibrate(200)}catch(e){}}},1000);wrClock()}
function wrList(){$('#wr-list').innerHTML=S.writes.map(w=>{const p=PROMPTS.find(x=>x[0]===w.p);return `<details class="wrow"><summary>${esc(p?p[1]:'Scritto')}<small>${esc(fmt(w.d,{day:'numeric',month:'short'}))}, ${w.w} parole</small></summary><p>${esc(w.t)}</p><div class="etools"><button class="btn alt" type="button" data-wcopy="${w.id}">Copia</button><button class="btn alt" type="button" data-wdel="${w.id}">Elimina</button></div></details>`}).join('')||'<p class="sub">Gli scritti che salvi compaiono qui. Puoi copiarli e chiedere una correzione.</p>'}
/* Mappa */
const PLC={oldtown:[54.6812,25.2875],uzupis:[54.6801,25.2962],gediminas:[54.6867,25.2907],aurora:[54.6743,25.2896],trakai:[54.6526,24.9339]};
let MAP=null,MLAY=null,leafP=null;
function loadLeaflet(){if(window.L)return Promise.resolve();if(leafP)return leafP;leafP=new Promise((ok,ko)=>{const l=document.createElement('link');l.rel='stylesheet';l.href='lib/leaflet.css';document.head.appendChild(l);const s=document.createElement('script');s.src='lib/leaflet.js';s.onload=ok;s.onerror=()=>{leafP=null;ko()};document.head.appendChild(s)});return leafP}
const pinIcon=c=>window.L.divIcon({className:'',html:`<svg class="lpin" viewBox="-40 -40 80 80">${[0,72,144,216,288].map(a=>`<circle cx="0" cy="-20" r="15" fill="${c}" stroke="#22140a" stroke-width="5" transform="rotate(${a})"/>`).join('')}<circle r="12" fill="#ffc21a" stroke="#22140a" stroke-width="5"/></svg>`,iconSize:[30,30],iconAnchor:[15,15],popupAnchor:[0,-14]});
function popup(title,sub){const d=document.createElement('div'),b=document.createElement('b');b.textContent=title;d.appendChild(b);if(sub){const s=document.createElement('span');s.textContent=sub;d.appendChild(s)}return d}
function mapMarkers(){if(!MAP)return;MLAY.clearLayers();const pts=[];
 PLACES.forEach(([id,n,t])=>{const c=PLC[id];if(!c)return;const seen=S.seen.includes(id);window.L.marker(c,{icon:pinIcon(seen?'#46d394':'#ff4f9a')}).bindPopup(popup(n,seen?'Visto':'Da vedere')).addTo(MLAY);if(id!=='trakai')pts.push(c)});
 S.diary.forEach(e=>{let c=e.lat&&e.lon?[e.lat,e.lon]:null;if(!c&&e.p){const m=PLACES.find(p=>p[1].toLowerCase()===e.p.trim().toLowerCase());if(m)c=PLC[m[0]]}if(!c)return;window.L.marker(c,{icon:pinIcon('#ff7a1a')}).bindPopup(popup(fmt(e.d)+(e.p?', '+e.p:''),(e.t||'').slice(0,120))).addTo(MLAY);pts.push(c)});
 if(S.home&&S.home.lat){const hp=[S.home.lat,S.home.lon];window.L.marker(hp,{icon:window.L.divIcon({className:'',html:`<span class="mhome">${HOUSE_SVG}</span>`,iconSize:[34,34],iconAnchor:[17,17]}),zIndexOffset:500}).bindPopup(popup('Casa',S.home.a.split(',').slice(0,2).join(','))).addTo(MLAY);pts.push(hp);
  const cp=[camp().lat,camp().lon];window.L.marker(cp,{icon:window.L.divIcon({className:'',html:`<span class="mhome uni">${UNI_SVG}</span>`,iconSize:[34,34],iconAnchor:[17,17]})}).bindPopup(popup('Lezioni',camp().a)).addTo(MLAY);
  if(S.near&&S.near.items)S.near.items.forEach(x=>{const col=(NEAR.find(n=>n[0]===x.c)||[,,'#888'])[2];window.L.circleMarker([x.lat,x.lon],{radius:6,color:'#22140a',weight:2,fillColor:col,fillOpacity:1}).bindPopup(popup(x.n,`${(NEAR.find(n=>n[0]===x.c)||[,''])[1]}, ${mdist(x.d)}`)).addTo(MLAY)})}
 return pts}
async function initMap(){if(!navigator.onLine&&!window.L)return;try{await loadLeaflet()}catch(e){return}const box=$('#map');if(!MAP){box.innerHTML='';MAP=window.L.map(box,{zoomControl:true,attributionControl:true}).setView([54.6845,25.2895],14);
 window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(MAP);MLAY=window.L.layerGroup().addTo(MAP);const pts=mapMarkers();if(pts.length>1)MAP.fitBounds(pts,{padding:[30,30],maxZoom:15})}
 else{mapMarkers();setTimeout(()=>MAP.invalidateSize(),60)}}
let geo=null;
function geoAdd(){const b=$('#geoBtn');if(!navigator.geolocation){toast('Posizione non disponibile su questo dispositivo');return}b.textContent='Cerco la posizione…';
 navigator.geolocation.getCurrentPosition(p=>{geo=[+p.coords.latitude.toFixed(4),+p.coords.longitude.toFixed(4)];b.textContent='Posizione aggiunta ✓'},()=>{geo=null;b.textContent='Aggiungi la mia posizione';toast('Non riesco a leggere la posizione: controlla i permessi')},{enableHighAccuracy:false,timeout:12000,maximumAge:300000})}
/* Disegno per cartolina e PDF */
function cDaisy(ctx,x,y,r){ctx.save();ctx.translate(x,y);ctx.lineWidth=r*.035;ctx.strokeStyle='#22140a';for(let i=0;i<14;i++){ctx.save();ctx.rotate(i*Math.PI*2/14);ctx.beginPath();ctx.ellipse(0,-r*.6,r*.17,r*.38,0,0,Math.PI*2);ctx.fillStyle=i%2?'#ff7a1a':'#ff4f9a';ctx.fill();ctx.stroke();ctx.restore()}
 ctx.beginPath();ctx.arc(0,0,r*.58,0,Math.PI*2);ctx.fillStyle='#ffc21a';ctx.fill();ctx.stroke();ctx.restore()}
function cWaves(ctx,W,H,h){[['#ff4f9a',0],['#ff7a1a',h/3],['#0f6b45',h*2/3]].forEach(([c,o])=>{ctx.beginPath();ctx.moveTo(0,H-h+o);for(let x=0;x<=W;x+=W/6)ctx.quadraticCurveTo(x+W/24,H-h+o-h*.22,x+W/12,H-h+o),ctx.quadraticCurveTo(x+W/8,H-h+o+h*.22,x+W/6,H-h+o);ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fillStyle=c;ctx.fill()})}
function wrapLines(ctx,text,maxW){const out=[];String(text||'').split(/\n/).forEach(par=>{const w=par.split(/\s+/).filter(Boolean);let line='';if(!w.length){out.push('');return}for(const x of w){const t=line?line+' '+x:x;if(ctx.measureText(t).width>maxW&&line){out.push(line);line=x}else line=t}out.push(line)});return out}
function rrect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
async function imgOf(f){const u=await fileURL(f);if(!u)return null;const i=new Image();i.src=u;try{await i.decode()}catch(e){return null}return i}
function cover(ctx,img,x,y,w,h){const k=Math.max(w/img.width,h/img.height),sw=w/k,sh=h/k;ctx.drawImage(img,(img.width-sw)/2,(img.height-sh)/2,sw,sh,x,y,w,h)}
async function fontsReady(){try{await Promise.all([document.fonts.load('80px Shrikhand'),document.fonts.load('800 40px "DM Sans"'),document.fonts.load('400 34px "DM Sans"')])}catch(e){}}
async function postcard(id){const e=S.diary.find(x=>x.id===id);if(!e)return;toast('Preparo la cartolina…');await fontsReady();
 const W=1080,H=1350,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.fillStyle='#ffc21a';x.fillRect(0,0,W,H);cWaves(x,W,H,150);
 x.save();x.translate(12,12);x.fillStyle='#22140a';rrect(x,60,60,W-120,H-300,44);x.fill();x.restore();x.fillStyle='#fffaf0';rrect(x,60,60,W-120,H-300,44);x.fill();x.lineWidth=6;x.strokeStyle='#22140a';x.stroke();
 const img=e.f?await imgOf(e.f):null,px=100,py=100,pw=W-200,ph=img?640:420;x.save();rrect(x,px,py,pw,ph,30);x.clip();if(img)cover(x,img,px,py,pw,ph);else{x.fillStyle='#ff4f9a';x.fillRect(px,py,pw,ph);cDaisy(x,W/2,py+ph/2,170)}x.restore();rrect(x,px,py,pw,ph,30);x.lineWidth=5;x.stroke();
 cDaisy(x,W-150,py+ph-10,80);
 x.fillStyle='#22140a';x.font='76px Shrikhand';x.fillText('Labas da Vilnius!',px,py+ph+100);x.font='800 38px "DM Sans"';x.fillText((fmt(e.d)+(e.p?', '+e.p:'')).slice(0,48),px,py+ph+160);
 x.font='400 34px "DM Sans"';const lines=wrapLines(x,e.t,pw),max=img?4:8;lines.slice(0,max).forEach((l,i)=>x.fillText(i===max-1&&lines.length>max?l.replace(/.{0,2}$/,'…'):l,px,py+ph+222+i*48));
 c.toBlob(b=>{if(!b){toast('Cartolina non riuscita');return}giveFile(b,`Labas-${e.d}.png`,'image/png','Labas da Vilnius').then(ok=>{if(ok)toast('Cartolina pronta')})},'image/png')}
let pdfP=null;
const loadPdf=()=>window.jspdf?Promise.resolve():pdfP||(pdfP=new Promise((ok,ko)=>{const s=document.createElement('script');s.src='lib/jspdf.umd.min.js';s.onload=ok;s.onerror=()=>{pdfP=null;ko()};document.head.appendChild(s)}));
async function diaryPdf(){if(!S.diary.length){toast('Il diario è ancora vuoto');return}const b=$('#pdfBtn');b.disabled=true;b.textContent='Preparo il PDF…';
 try{await loadPdf();await fontsReady();const W=1240,H=1754,M=110,pages=[];let c,x,y;
  const page=()=>{c=document.createElement('canvas');c.width=W;c.height=H;x=c.getContext('2d');x.fillStyle='#fffaf0';x.fillRect(0,0,W,H);x.fillStyle='#ffc21a';x.fillRect(0,0,W,26);x.fillStyle='#22140a';x.font='400 22px "DM Sans"';x.fillText('Labas, il mio Erasmus a Vilnius',M,H-60);x.textAlign='right';x.fillText(String(pages.length+1),W-M,H-60);x.textAlign='left';pages.push(c);y=M};
  c=document.createElement('canvas');c.width=W;c.height=H;x=c.getContext('2d');x.fillStyle='#ffc21a';x.fillRect(0,0,W,H);cWaves(x,W,H,220);cDaisy(x,W/2,560,300);x.fillStyle='#22140a';x.textAlign='center';x.font='110px Shrikhand';x.fillText('Il mio Erasmus',W/2,1020);x.fillText('a Vilnius',W/2,1140);
  x.font='800 40px "DM Sans"';x.fillText((S.set.name||'')+(S.set.name?', ':'')+[fmt(S.dep),fmt(S.ret)].filter(Boolean).join(' – '),W/2,1230);x.font='400 34px "DM Sans"';x.fillText(`${S.diary.length} ${S.diary.length===1?'pagina':'pagine'} di diario, ${albumSet().size} ${albumSet().size===1?'posto':'posti'}`,W/2,1290);x.textAlign='left';pages.push(c);
  const L=[...S.diary].sort((a,b)=>a.d<b.d?-1:a.d>b.d?1:0);page();
  for(const e of L){const img=e.f?await imgOf(e.f):null;const need=110+(img?560:0)+60;if(y+need>H-M-60)page();
   x.fillStyle='#22140a';x.font='54px Shrikhand';x.fillText(fmt(e.d),M,y+50);if(e.p){x.font='800 32px "DM Sans"';x.fillStyle='#0f6b45';x.fillText(e.p,M,y+96);x.fillStyle='#22140a'}y+=e.p?126:80;
   if(img){const iw=W-2*M,ih=Math.min(560,iw*img.height/img.width);x.save();rrect(x,M,y,iw,ih,26);x.clip();cover(x,img,M,y,iw,ih);x.restore();y+=ih+36}
   x.font='400 32px "DM Sans"';for(const l of wrapLines(x,e.t,W-2*M)){if(y+44>H-M-60){page()}x.fillText(l,M,y+32);y+=46}y+=56}
  const {jsPDF}=window.jspdf,pdf=new jsPDF({unit:'mm',format:'a4',compress:true});pages.forEach((p,i)=>{if(i)pdf.addPage();pdf.addImage(p.toDataURL('image/jpeg',.82),'JPEG',0,0,210,297)});
  await giveFile(pdf.output('blob'),'Labas-diario.pdf','application/pdf','Il mio Erasmus a Vilnius');toast('Diario in PDF pronto')}
 catch(e){toast('Il PDF non si è creato: riprova online')}finally{b.disabled=false;b.textContent='Diario in PDF'}}
/* PIN dei documenti */
let pinOk=false,hiddenAt=0;try{pinOk=sessionStorage.getItem('labas-pin')==='1'}catch(e){}
async function sha(t){const d=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t));return[...new Uint8Array(d)].map(b=>b.toString(16).padStart(2,'0')).join('')}
const locked=()=>!!(S.set.pin&&S.set.pin.h)&&!pinOk;
function setPinOk(v){pinOk=v;try{v?sessionStorage.setItem('labas-pin','1'):sessionStorage.removeItem('labas-pin')}catch(e){}}
let pinMode='';
function pinView(){const box=$('#pinBox'),has=!!(S.set.pin&&S.set.pin.h);
 if(locked()){box.innerHTML=`<div class="pinlock"><b>Documenti protetti</b><span class="sub">Inserisci il PIN per vederli.</span><div class="pinrow"><input id="pin-in" type="password" inputmode="numeric" autocomplete="off" maxlength="8" aria-label="PIN"><button class="btn" type="button" id="pinGo">Sblocca</button></div><button class="linkb" type="button" id="pinForgot">PIN dimenticato?</button></div>`;$('#docs').hidden=true;$('#docform').hidden=true;return}
 $('#docs').hidden=false;$('#docform').hidden=false;
 if(pinMode){box.innerHTML=`<div class="pinset"><div class="sgrid" style="margin:0 0 10px"><label for="pin-a">${pinMode==='change'?'Nuovo PIN':'PIN (4-8 cifre)'}<input id="pin-a" type="password" inputmode="numeric" maxlength="8" autocomplete="off"></label><label for="pin-b">Ripeti il PIN<input id="pin-b" type="password" inputmode="numeric" maxlength="8" autocomplete="off"></label></div><div class="btns" style="margin:0"><button class="btn" type="button" id="pinSave">Salva PIN</button><button class="btn alt" type="button" id="pinCancel">Annulla</button></div></div>`;setTimeout(()=>{const a=$('#pin-a');if(a)a.focus()},50);return}
 box.innerHTML=`<div class="pinbox"><b>Protezione con PIN</b><small>${has?'Attiva: i documenti si nascondono quando chiudi l\'app per più di un minuto. Il PIN copre la vista, non cifra i file.':'Nasconde i documenti a chi prende in mano il telefono.'}</small><span class="btns" style="margin:8px 0 0">${has?'<button class="btn alt" type="button" id="pinChange">Cambia</button><button class="btn alt" type="button" id="pinOff">Togli</button><button class="btn alt" type="button" id="pinLock">Blocca ora</button>':'<button class="btn alt" type="button" id="pinSet">Imposta PIN</button>'}</span></div>`}
async function pinTry(){const i=$('#pin-in');if(!i)return;const v=i.value.trim();if(!v)return;const h=await sha(S.set.pin.s+v);if(h===S.set.pin.h){setPinOk(true);pinView();docs()}else{i.value='';const r=i.closest('.pinlock');anim(r,'shake',420);toast('PIN sbagliato')}}
async function pinSave(){const a=$('#pin-a').value.trim(),b=$('#pin-b').value.trim();if(!/^\d{4,8}$/.test(a)){toast('Il PIN deve avere da 4 a 8 cifre');return}if(a!==b){toast('I due PIN non coincidono');return}const s=uid()+uid();S.set.pin={s,h:await sha(s+a)};setPinOk(true);pinMode='';save();pinView();toast('PIN salvato')}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')hiddenAt=Date.now();else if(S.set.pin&&S.set.pin.h&&hiddenAt&&Date.now()-hiddenAt>60000){setPinOk(false);pinView();docs()}});
function pinResetCheck(){try{if(USER&&localStorage.getItem('labas-pinreset')==='1'){localStorage.removeItem('labas-pinreset');S.set.pin=null;setPinOk(true);save();pinView();docs();toast('PIN tolto: puoi impostarne uno nuovo')}}catch(e){}}
/* Eventi delle novità */
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
 if(d.month){mon=d.month;logView();chart();const t=$('#spentTxt');if(t)t.scrollIntoView({behavior:calm()?'auto':'smooth',block:'center'});return}
 if(d.rdel){snapDel(()=>{S.rec=S.rec.filter(x=>x.id!==d.rdel);commit(recView)});return}
 if(d.lts){ltsTab=d.lts;ltsView();return}
 if(d.ltl){S.lt=S.lt.includes(d.ltl)?S.lt.filter(x=>x!==d.ltl):[...S.lt,d.ltl];save();ltsView();buildDeck();return}
 if(d.say){speak(d.say,d.lang||'en');return}
 if(d.m&&b.closest('[data-wmin]')){if(!wrT){wrMin=+d.m;wrLeft=null}wrClock();return}
 if(d.wcopy){const w=S.writes.find(x=>x.id===d.wcopy);if(w)copyText(w.t);return}
 if(d.wdel){snapDel(()=>{S.writes=S.writes.filter(x=>x.id!==d.wdel);commit(wrList)});return}
 if(d.card){postcard(d.card);return}
 switch(b.id){
  case 'icsBtn':exportIcs();break;
  case 'geoBtn':geoAdd();break;
  case 'pdfBtn':diaryPdf();break;
  case 'wr-go':wrToggle();break;
  case 'wr-reset':if(wrT){clearInterval(wrT);wrT=null}wrLeft=null;wrClock();break;
  case 'wr-copy':copyText(($('#wr-txt').textContent?'Task: '+$('#wr-txt').textContent+'\n\n':'')+$('#wr-t').value);break;
  case 'wr-save':{const t=$('#wr-t').value.trim();if(!t){toast('Scrivi qualcosa prima di salvare');return}S.writes.unshift({id:uid(),p:$('#wr-p').value,t,w:wcount(t),d:iso(new Date())});$('#wr-t').value='';wrCount();if(wrT){clearInterval(wrT);wrT=null}wrLeft=null;wrClock();commit(wrList);toast('Scritto salvato');break}
  case 'pinGo':pinTry();break;
  case 'pinSet':pinMode='set';pinView();break;
  case 'pinChange':pinMode='change';pinView();break;
  case 'pinCancel':pinMode='';pinView();break;
  case 'pinSave':pinSave();break;
  case 'pinOff':if(armed(b,'Togli')){S.set.pin=null;save();pinView();toast('PIN tolto')}break;
  case 'pinLock':setPinOk(false);pinView();docs();break;
  case 'pinForgot':if(SB){try{localStorage.setItem('labas-pinreset','1')}catch(x){}toast('Accedi di nuovo con Google per togliere il PIN');setTimeout(()=>{(USER?SB.auth.signOut():Promise.resolve()).catch(()=>{}).then(()=>doLogin())},900)}else toast('Senza accesso Google il PIN si può togliere solo cancellando i dati da questo telefono');break;
 }});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='pin-in'){e.preventDefault();pinTry()}});
document.addEventListener('input',e=>{if(e.target.id==='wr-t')wrCount()});
document.addEventListener('change',e=>{const t=e.target,d=t.dataset;
 if(d.cex!==undefined){const c=S.courses.find(x=>x.id===d.cex);if(c){c.ex=t.value;commit(examsView,todayCard)}}
 else if(t.id==='wr-p'){wrPrompt();wrCount()}});
document.addEventListener('submit',e=>{const f=e.target;if(f.id!=='rform')return;e.preventDefault();const n=$('#r-n').value.trim(),v=+$('#r-v').value,day=Math.min(28,Math.max(1,+$('#r-d').value||1));if(!n||!(v>0)){toast('Inserisci nome e importo');return}
 const cur=iso(new Date()).slice(0,7),dm=ddiff(S.dep)!==null?S.dep.slice(0,7):cur;S.rec.push({id:uid(),c:$('#r-c').value,n,v,day,from:cur>dm?cur:dm});$('#r-n').value='';$('#r-v').value='';commit(recView);runRec();toast('Spesa fissa aggiunta')});
function extrasAll(){homeAll();todayCard();examsView();recView();chart();ltsView();wrList();pinView();if(MAP)mapMarkers()}
setInterval(()=>{if(document.visibilityState==='visible'){if(curV==='oggi')clockTick();heroSky()}},20000);

/* ===== 1.4: push ad app chiusa, calendario in abbonamento, «+» rapido, ripasso intelligente, ricerca ===== */
const FN=SB_URL+'/functions/v1/labas-avvisi';
async function fnCall(a,body){if(!SB)throw new Error('sb');const s=await SB.auth.getSession(),tok=s&&s.data&&s.data.session&&s.data.session.access_token;if(!tok)throw new Error('login');
 const r=await fetch(FN+'?a='+a,{method:'POST',headers:{'content-type':'application/json',authorization:'Bearer '+tok,apikey:SB_KEY},body:JSON.stringify(body||{})});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.errore||String(r.status));return j}
const b64u=s=>{const p='='.repeat((4-s.length%4)%4),b=atob((s+p).replace(/-/g,'+').replace(/_/g,'/'));return Uint8Array.from(b,c=>c.charCodeAt(0))};
const pushOK=()=>'serviceWorker' in navigator&&'PushManager' in window&&'Notification' in window;
function vTime(date,hm){const g=new Date(`${date}T${hm||'09:00'}:00Z`),p=new Intl.DateTimeFormat('en-US',{timeZone:VTZ,hourCycle:'h23',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'}).formatToParts(g),v=t=>+(p.find(x=>x.type===t)||{}).value;
 const asUTC=Date.UTC(v('year'),v('month')-1,v('day'),v('hour')%24,v('minute'));return new Date(g.getTime()-(asUTC-g.getTime()))}
function avvisiList(){const out=[],now=Date.now(),lim=now+68*864e5,at9=d=>{const [y,m,dd]=d.split('-').map(Number);return new Date(y,m-1,dd,9,0)};
 const add=(q,ti,te,url,tag)=>{if(q.getTime()>now&&q.getTime()<lim)out.push({quando:q.toISOString(),titolo:ti.slice(0,120),testo:te.slice(0,300),url,tag})};
 S.tasks.filter(t=>!t.done&&t.due&&ddiff(t.due)!==null).forEach(t=>S.set.leads.forEach(L=>{const q=at9(addDays(t.due,-L));add(q,L===0?'Scade oggi':L===1?'Scade domani':`Scade tra ${L} giorni`,t.t,'./#oggi','labas-'+t.id)}));
 S.courses.filter(c=>c.ex&&!c.s&&ddiff(c.ex)!==null).forEach(c=>[...new Set([7,...S.set.leads])].forEach(L=>{const q=at9(addDays(c.ex,-L));add(q,L===0?'Esame oggi':L===1?'Esame domani':`Esame tra ${L} giorni`,c.n,'./#studio','labas-ex-'+c.id)}));
 if(S.sched.length&&ddiff(S.dep)!==null)for(let k=0;k<14;k++){const d=addDays(iso(new Date()),k);if(d<S.dep||(ddiff(S.ret)!==null&&d>S.ret))continue;const wd=(new Date(d+'T12:00:00').getDay()+6)%7;
  S.sched.filter(l=>+l.d===wd).forEach(l=>{const q=new Date(vTime(d,l.a).getTime()-15*60e3);add(q,'Tra 15 minuti: '+l.c,l.r?`Lezione in ${l.r}`:'Lezione','./#studio','labas-lez-'+l.id)})}
 try{const tt=+localStorage.getItem('labas-pushtest');if(tt&&now<tt+10*60e3)out.push({quando:new Date(Math.max(now+30e3,tt)).toISOString(),titolo:'Labas',testo:'Prova riuscita: le notifiche arrivano anche con l\'app chiusa.',url:'./#impostazioni',tag:'labas-prova'})}catch(e){}
 return out.sort((a,b)=>a.quando<b.quando?-1:1).slice(0,120)}
let pushT=null,calT=null;
function cloudExtras(){clearTimeout(pushT);clearTimeout(calT);if(!USER||!navigator.onLine)return;
 if(S.set.push)pushT=setTimeout(async()=>{const L=avvisiList(),h=JSON.stringify(L);if(localStorage.getItem('labas-pushh')===h)return;try{await fnCall('programma',{avvisi:L});localStorage.setItem('labas-pushh',h)}catch(e){}},2500);
 if(S.set.cal&&S.set.cal.t)calT=setTimeout(async()=>{const r=makeIcs(calOpts()),h=r.txt.replace(/DTSTAMP:\d+T\d+Z/g,'');if(localStorage.getItem('labas-calh')===h)return;try{await fnCall('ics',{ics:r.txt});localStorage.setItem('labas-calh',h)}catch(e){}},3000)}
async function pushOn(){if(!pushOK()){toast('Questo browser non supporta le notifiche ad app chiusa');return false}if(!USER){toast('Accedi con Google per avere le notifiche ad app chiusa');return false}
 try{const reg=await navigator.serviceWorker.ready,{chiave}=await fnCall('chiave');let sub=await reg.pushManager.getSubscription();if(!sub)sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:b64u(chiave)});
  await fnCall('registra',{sub:sub.toJSON()});S.set.push=true;localStorage.removeItem('labas-pushh');save();pushUI();return true}
 catch(e){toast(isIOS&&!matchMedia('(display-mode: standalone)').matches?'Su iPhone aggiungi prima Labas alla schermata Home':'Non riesco ad attivare le notifiche ad app chiusa');pushUI();return false}}
async function pushOff(){try{const reg=await navigator.serviceWorker.ready,sub=reg.pushManager&&await reg.pushManager.getSubscription();if(USER)await fnCall('togli',{cosa:'push',endpoint:sub?sub.endpoint:''}).catch(()=>{});if(sub)await sub.unsubscribe().catch(()=>{})}catch(e){}S.set.push=false;save();pushUI();toast('Notifiche ad app chiusa disattivate')}
function pushUI(){const b=$('#pushBtn'),t=$('#pushTxt');if(!b)return;if(!pushOK()){b.hidden=true;t.textContent=isIOS?'Su iPhone servono iOS 16.4 o successivo e Labas aggiunta alla schermata Home.':'Questo browser non supporta le notifiche ad app chiusa.';return}
 b.hidden=false;const on=!!S.set.push;const pt=$('#pushTest');if(pt)pt.hidden=!(on&&USER);b.textContent=on?'Disattiva':'Attiva';b.classList.toggle('alt',on);
 t.textContent=on?(USER?'Attive: gli avvisi arrivano anche con l\'app chiusa, alle 9 del mattino, e 15 minuti prima di ogni lezione durante l\'Erasmus.':'Attive su questo account: accedi con Google per aggiornarle.'):USER?'Gli avvisi arrivano anche con l\'app chiusa, inviati dal tuo account.':'Serve l\'accesso con Google.'+(isIOS?' Su iPhone anche Labas aggiunta alla schermata Home.':'')}
/* Calendario in abbonamento */
const calOpts=()=>({l:$('#ics-l')?$('#ics-l').checked:true,d:$('#ics-d')?$('#ics-d').checked:true,e:$('#ics-e')?$('#ics-e').checked:true});
const calURL=t=>`${FN}?a=cal&t=${t}`;
async function calOn(){if(!USER){toast('Accedi con Google per collegare il Calendario');return}const b=$('#calSub');b.disabled=true;b.textContent='Collego…';
 try{const r=makeIcs(calOpts()),j=await fnCall('ics',{ics:r.txt});S.set.cal={t:j.token};localStorage.setItem('labas-calh',r.txt.replace(/DTSTAMP:\d+T\d+Z/g,''));save();calUI();toast('Calendario collegato: ora aprilo nel Calendario')}
 catch(e){toast('Non riesco a collegare il Calendario, riprova')}finally{b.disabled=false;calUI()}}
async function calOff(){try{if(USER)await fnCall('togli',{cosa:'cal'})}catch(e){}S.set.cal=null;save();calUI();toast('Calendario scollegato: togli l\'abbonamento anche dal Calendario')}
function calUI(){const box=$('#calBox');if(!box)return;const c=S.set.cal&&S.set.cal.t;
 if(!c){box.innerHTML=`<div class="btns"><button class="btn" type="button" id="calSub">Collega il Calendario</button></div><p class="sub">${USER?'Un indirizzo da aggiungere una volta: lezioni, scadenze ed esami si aggiornano da soli, senza doppioni.':'Serve l\'accesso con Google.'}</p>`;return}
 const https=calURL(c),web=https.replace(/^https:/,'webcal:');
 box.innerHTML=`<div class="btns"><a class="btn" id="calOpen" href="${esc(web)}">Apri nel Calendario</a><button class="btn alt" type="button" id="calCopy">Copia indirizzo</button><button class="btn alt" type="button" id="calOffB">Scollega</button></div><p class="sub">Collegato: si aggiorna da solo quando cambi orario, scadenze o esami. Su iPhone tocca «Apri nel Calendario» e conferma l'iscrizione; per Google Calendar incolla l'indirizzo in «Altri calendari, da URL».</p>`}
/* Ripasso intelligente (scatole di Leitner) */
const STEP=[1,2,4,8,16,32];
function srsKnow(c){const r=S.srs[c.id]||{b:0};r.b=Math.min((r.b||0)+1,5);r.n=addDays(iso(new Date()),STEP[r.b]);S.srs[c.id]=r;if(r.b>=4){const L=c.t==='lt'?S.lt:S.learned;if(!L.includes(c.id))L.push(c.id)}}
function srsAgain(c){S.srs[c.id]={b:0,n:iso(new Date())}}
/* Ricerca */
const norm=t=>String(t||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
function searchIndex(){const I=[],add=(g,title,sub,go)=>I.push({g,title,sub,k:norm(title+' '+sub),go});
 S.tasks.forEach(t=>add('Checklist',t.t,(PH.find(p=>p[0]===t.ph)||[,''])[1]+(t.due?', '+fmt(t.due,{day:'numeric',month:'short'}):''),{v:'oggi',q:`[data-tog="${t.id}"]`,up:'.task'}));
 S.contacts.forEach(c=>add('Contatti',c.n||c.r,[c.r,c.e,c.p].filter(Boolean).join(', '),{v:'impostazioni',q:`[data-ctdel="${c.id}"]`,up:'.ct'}));
 S.docs.forEach(d=>add('Documenti',d.n,d.k==='pdf'?'PDF':'Foto',{v:'impostazioni',q:`[data-docdel="${d.id}"]`,up:'.doc',alt:'#s-documenti'}));
 S.diary.forEach(e=>add('Diario',(e.t||'').slice(0,80)||'Foto',fmt(e.d)+(e.p?', '+e.p:''),{v:'vilnius',q:`[data-ddel="${e.id}"]`,up:'.entry'}));
 S.log.forEach(l=>{const c=S.exp.find(x=>x.id===l.c);add('Spese',l.n+', '+eur(l.v),fmt(l.d)+(c?', '+c.n:''),{v:'soldi',q:`[data-ldel="${l.id}"]`,up:'.lrow',mon:(l.d||'').slice(0,7)})});
 S.courses.forEach(c=>add('Corsi',c.n,`${+c.e||0} ECTS${c.ex?', esame '+fmt(c.ex,{day:'numeric',month:'short'}):''}`,{v:'studio',q:`#cn-${c.id}`,up:'.crow'}));
 S.sched.forEach(l=>add('Orario',l.c,`${DAYS[l.d]} ${l.a}${l.r?', '+l.r:''}`,{v:'studio',q:`[data-sdel="${l.id}"]`,up:'.les'}));
 ENG.forEach(([k,lab,L])=>L.forEach(([en,it],i)=>add('Inglese',en,it,{v:'inglese',q:`[data-learn="${k}-${i}"]`,up:'.phrow'})));
 LTS.forEach(([k,lab,L])=>L.forEach(([lt,it],i)=>add('Lituano',lt,it+', '+lab,{v:'inglese',q:`[data-ltl="ls-${k}-${i}"]`,up:'.ltsrow',lts:k})));
 LT.forEach(([id,lt,it])=>add('Lituano',lt,it,{v:'vilnius',q:'#ltCards'}));
 PLACES.forEach(([id,n,t])=>add('Posti',n,t,{v:'vilnius',q:`[data-seen="${id}"]`,up:'.prow'}));
 return I}
let SIDX=[];
function searchOpen(){SIDX=searchIndex();$('#srch').hidden=false;const i=$('#srch-q');i.value='';searchRun();setTimeout(()=>i.focus(),60)}
function searchClose(){$('#srch').hidden=true}
function searchRun(){const q=norm($('#srch-q').value.trim()),box=$('#srch-r');if(q.length<2){box.innerHTML='<p class="sub">Cerca tra checklist, spese, diario, corsi, orario, contatti, documenti e frasi.</p>';return}
 const words=q.split(/\s+/),R=SIDX.map((x,i)=>({x,i})).filter(({x})=>words.every(w=>x.k.includes(w))).slice(0,60);
 if(!R.length){box.innerHTML='<p class="empty">Nessun risultato.</p>';return}
 const groups=[...new Set(R.map(r=>r.x.g))];box.innerHTML=groups.map(g=>`<p class="lbl">${g}</p>`+R.filter(r=>r.x.g===g).map(r=>`<button type="button" class="sres" data-sr="${r.i}"><b>${esc(r.x.title)}</b><small>${esc(r.x.sub)}</small></button>`).join('')).join('')}
function searchGo(x){searchClose();const g=x.go;if(g.mon){mon=g.mon;logView()}if(g.lts){ltsTab=g.lts;ltsView()}location.hash='#'+g.v;
 setTimeout(()=>{let el=document.querySelector(g.q);if(el&&g.up)el=el.closest(g.up)||el;if(!el&&g.alt)el=document.querySelector(g.alt);if(!el)return;const det=el.closest('details');if(det)det.open=true;el.scrollIntoView({behavior:calm()?'auto':'smooth',block:'center'});el.classList.remove('hit');void el.offsetWidth;el.classList.add('hit');setTimeout(()=>el.classList.remove('hit'),1800)},420)}
/* «+» rapido */
let qTab='spesa';
function quickOpen(){const s=$('#quick');s.hidden=false;$('#q-c').innerHTML=S.exp.map(x=>`<option value="${x.id}">${esc(x.n)}</option>`).join('');{let lc='';try{lc=localStorage.getItem('labas-qcat')||''}catch(e){}const sp=S.exp.find(x=>x.id===lc)||S.exp.find(x=>/^spesa/i.test(x.n));if(sp)$('#q-c').value=sp.id}quickTab(qTab);requestAnimationFrame(()=>s.classList.add('on'))}
function quickClose(){const s=$('#quick');s.classList.remove('on');setTimeout(()=>{s.hidden=true},calm()?0:260)}
function quickTab(t){qTab=t;document.querySelectorAll('#quick [data-qt]').forEach(b=>b.classList.toggle('on',b.dataset.qt===t));$('#q-spesa').hidden=t!=='spesa';$('#q-diario').hidden=t!=='diario';setTimeout(()=>{const f=t==='spesa'?$('#q-v'):$('#q-t');if(f)f.focus()},80)}
document.addEventListener('click',e=>{const b=e.target.closest('button,a');if(!b)return;const d=b.dataset;
 if(d.sr!==undefined){const x=SIDX[+d.sr];if(x)searchGo(x);return}
 if(d.qt){quickTab(d.qt);return}
 switch(b.id){
  case 'srchBtn':searchOpen();break;
  case 'srchX':searchClose();break;
  case 'fab':quickOpen();break;
  case 'qX':quickClose();break;
  case 'pushBtn':S.set.push?pushOff():(Notification.permission==='granted'?pushOn():enableNotif());break;
  case 'pushTest':try{localStorage.setItem('labas-pushtest',String(Date.now()+60e3));localStorage.removeItem('labas-pushh')}catch(x){}cloudExtras();toast('Prova programmata: chiudi Labas, la notifica arriva entro 5 minuti');break;
  case 'calSub':calOn();break;
  case 'calOffB':if(armed(b,'Scollega'))calOff();break;
  case 'calCopy':copyText(calURL(S.set.cal.t));break;
 }});
document.addEventListener('input',e=>{if(e.target.id==='srch-q')searchRun()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!$('#srch').hidden)searchClose();if(!$('#quick').hidden)quickClose()}});
document.addEventListener('submit',async e=>{const f=e.target;if(f.id!=='q-spesa'&&f.id!=='q-diario')return;e.preventDefault();
 if(f.id==='q-spesa'){const v=+String($('#q-v').value).replace(',','.');if(!(v>0)){toast('Scrivi l\'importo');return}const d=iso(new Date());S.log.push({id:uid(),c:$('#q-c').value,d,n:$('#q-n').value.trim()||'Spesa',v});try{localStorage.setItem('labas-qcat',$('#q-c').value)}catch(e){}mon=d.slice(0,7);$('#q-v').value='';$('#q-n').value='';commit(logView);quickClose();const r=$('#fab').getBoundingClientRect();burst(r.left+r.width/2,r.top,10);toast(`Spesa di ${eur(v)} registrata`)}
 else{const t=$('#q-t').value.trim(),p=$('#q-p').value.trim(),file=$('#q-f').files[0];if(!t&&!file){toast('Scrivi qualcosa o aggiungi una foto');return}let x={};if(file){try{x=await storeImage(file,1200)}catch(err){toast('Non riesco a salvare questa foto')}}
  S.diary.push(Object.assign({id:uid(),d:iso(new Date()),p,t},x));$('#q-t').value='';$('#q-p').value='';$('#q-f').value='';commit(diary);quickClose();toast('Pagina di diario salvata')}});
document.addEventListener('click',e=>{if(e.target.id==='quick')quickClose();if(e.target.id==='srch')searchClose()});

/* ===== 1.6: casa, spostamenti e servizi attorno a casa ===== */
const CAMPUS0={a:'Savičiaus g. 17, Vilnius (EHU)',lat:54.6787,lon:25.2898};
const camp=()=>S.campus&&S.campus.lat?S.campus:CAMPUS0;
const fmtV=t=>new Intl.DateTimeFormat('it-IT',{timeZone:VTZ,hour:'2-digit',minute:'2-digit'}).format(new Date(t));
const hav=(a,b)=>{const R=6371e3,r=x=>x*Math.PI/180,dl=r(b[0]-a[0]),dn=r(b[1]-a[1]),h=Math.sin(dl/2)**2+Math.cos(r(a[0]))*Math.cos(r(b[0]))*Math.sin(dn/2)**2;return 2*R*Math.asin(Math.sqrt(h))};
const mdist=m=>m<1000?`${Math.round(m/10)*10} m`:`${(m/1000).toLocaleString('it-IT',{maximumFractionDigits:1})} km`;
const gmaps=(f,t,mode)=>`https://www.google.com/maps/dir/?api=1&origin=${f[0]},${f[1]}&destination=${t[0]},${t[1]}&travelmode=${mode||'transit'}`;
const amaps=(f,t,mode)=>`https://maps.apple.com/?saddr=${f[0]},${f[1]}&daddr=${t[0]},${t[1]}&dirflg=${mode==='walking'?'w':'r'}`;
const mapsLinks=(f,t,mode)=>`<a class="btn alt sm" href="${gmaps(f,t,mode)}" target="_blank" rel="noopener">Google Maps</a>${isIOS?`<a class="btn alt sm" href="${amaps(f,t,mode)}" target="_blank" rel="noopener">Mappe</a>`:''}`;
const cacheGet=k=>{try{const c=JSON.parse(localStorage.getItem('labas-c-'+k));if(c&&Date.now()<c.x)return c.v}catch(e){}return null};
const cacheSet=(k,v,ms)=>{try{localStorage.setItem('labas-c-'+k,JSON.stringify({v,x:Date.now()+ms}))}catch(e){}};
async function geocode(q){const r=await fetch('https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&countrycodes=lt&accept-language=it&q='+encodeURIComponent(q+(/vilni/i.test(q)?'':', Vilnius')));if(!r.ok)throw 0;return(await r.json()).map(x=>({a:x.display_name,lat:+(+x.lat).toFixed(5),lon:+(+x.lon).toFixed(5)}))}
async function walk(f,t){const k=`w-${f.join()}-${t.join()}`,c=cacheGet(k);if(c)return c;try{const r=await fetch(`https://routing.openstreetmap.de/routed-foot/route/v1/foot/${f[1]},${f[0]};${t[1]},${t[0]}?overview=false`);const j=await r.json();const ro=j.routes&&j.routes[0];if(!ro)throw 0;const v={min:Math.max(1,Math.round(ro.duration/60)),m:Math.round(ro.distance)};cacheSet(k,v,30*864e5);return v}catch(e){const m=hav(f,t)*1.3;return{min:Math.max(1,Math.round(m/80)),m:Math.round(m),est:1}}}
async function transit(f,t,timeISO,arrive,ttl){const k=`t-${f.join()}-${t.join()}-${timeISO||'now'}-${arrive?1:0}`,c=cacheGet(k);if(c)return c;
 const u=`${FN}?a=percorso&f=${f[0]},${f[1]}&t=${t[0]},${t[1]}${timeISO?'&time='+encodeURIComponent(timeISO):''}${arrive?'&ab=1':''}`;const r=await fetch(u);if(!r.ok)throw 0;const j=await r.json();const v=(j.it||[]).filter(x=>x.legs&&x.legs.some(l=>l.m!=='WALK'));cacheSet(k,v,ttl||5*60e3);return v}
const MODE={BUS:'bus',TROLLEYBUS:'filobus',TRAM:'tram',RAIL:'treno',REGIONAL_RAIL:'treno',COACH:'pullman',SUBWAY:'metro'};
function itinText(it){const v=it.legs.filter(l=>l.m!=='WALK'),first=v[0];const rides=v.map(l=>`${MODE[l.m]||'mezzo'} ${esc(l.r)}`).join(' + ');return{leave:fmtV(it.s),arrive:fmtV(it.e),min:Math.round(it.dur/60),rides,stop:first?esc(first.da):'',at:first?fmtV(first.s):'',rt:v.some(l=>l.rt),tr:it.tr}}
function routeLine(it){const tot=it.legs.reduce((t,l)=>t+(l.dur||0),0)||1;return `<div class="rline"><i class="rdot"></i>${it.legs.map((l,i)=>`<span class="rseg ${l.m==='WALK'?'w':'t'}" style="flex:${Math.max(.06,(l.dur||0)/tot).toFixed(3)}">${l.m==='WALK'?'':`<b>${esc(l.r||'')}</b>`}</span>${i<it.legs.length-1?'<i class="rdot"></i>':''}`).join('')}<i class="rdot end"></i></div><div class="rtimes"><span>${fmtV(it.s)} casa</span><span>${fmtV(it.e)} arrivo</span></div>`}
function itinHTML(it,label){const x=itinText(it),v=it.legs.filter(l=>l.m!=='WALK');return `<div class="itin"><div class="itop"><b>${x.min} min</b><span>${label||''}esci alle <b>${x.leave}</b>, arrivi alle <b>${x.arrive}</b></span></div>${routeLine(it)}<div class="rtxt">${v.map(l=>`${MODE[l.m]||'mezzo'} <b>${esc(l.r)}</b> da ${esc(l.da)} alle ${fmtV(l.s)}, scendi a ${esc(l.a)}${l.rt?' <i class="live">live</i>':''}`).join('<br>')}</div></div>`}
function lessonOcc(l){const z=stay(),toMin=t=>{const [h,m]=String(t).split(':');return(+h)*60+(+m||0)};let base=iso(new Date());if(z.st==='before'&&ddiff(S.dep)!==null)base=S.dep;
 const bw=(new Date(base+'T12:00:00').getDay()+6)%7;let dd=((+l.d)-bw+7)%7;if(dd===0&&base===iso(new Date())&&toMin(l.a)<=vNow().min)dd=7;return addDays(base,dd)}
function nextLessonAny(){if(!S.sched.length)return null;return S.sched.map(l=>({l,d:lessonOcc(l)})).sort((a,b)=>(a.d+a.l.a)<(b.d+b.l.a)?-1:1)[0]}
let homeQ=[];
function homeView(){const box=$('#homeBox');if(!box)return;const h=S.home;
 if(!h||!h.lat||homeQ.editing){box.innerHTML=`<p class="sub">Scrivi l'indirizzo del tuo miniappartamento: calcolo i tempi per andare a lezione e trovo i servizi vicini.</p><form class="addrow" id="homeForm"><input id="home-q" placeholder="Es. Žirmūnų g. 12" aria-label="Indirizzo di casa" value="${esc(h&&h.a||'')}"><button class="btn">Cerca</button></form><div class="btns"><button class="btn alt" type="button" id="homeGeo">Usa la mia posizione</button>${h&&h.lat?'<button class="btn alt" type="button" id="homeCancel">Annulla</button>':''}</div><div id="homeRes"></div>`;return}
 box.innerHTML=`<div class="hrow"><span class="hpin">${HOUSE_SVG}</span><div><b>${esc(h.a.split(',').slice(0,2).join(','))}</b><small>${esc(h.a.split(',').slice(2,4).join(',').trim())}</small></div><button class="btn alt sm" type="button" id="homeEdit">Cambia</button></div>
 <div class="hrow"><span class="hpin">${UNI_SVG}</span><div><b>Sede delle lezioni</b><small>${esc(camp().a)}</small></div><button class="btn alt sm" type="button" id="campEdit">Cambia</button></div><div id="campBox"></div>`}
const HOUSE_SVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-6h4v6"/></svg>';
const UNI_SVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M3 9l9-5 9 5-9 5z"/><path d="M7 11v5c3 2 7 2 10 0v-5"/></svg>';
async function commuteView(){const box=$('#commute');if(!box)return;const h=S.home;
 if(!h||!h.lat){box.innerHTML='<p class="empty">Aggiungi l\'indirizzo di casa qui sopra per vedere come andare a lezione.</p>';return}
 const nx=nextLessonAny(),f=[h.lat,h.lon],t=[camp().lat,camp().lon];const w=await walk(f,t);
 let head=nx?`<p class="bt" style="margin:0 0 8px">Prossima lezione: ${esc(DAYS[nx.l.d])} ${fmt(nx.d,{day:'numeric',month:'long'})} alle ${esc(nx.l.a)}, ${esc(nx.l.c)}</p>`:'<p class="sub">Aggiungi l\'orario in Studio per sapere quando uscire.</p>';
 const arr=nx?vTime(nx.d,nx.l.a).getTime()-5*60e3:null;
 const wl=arr?fmtV(arr-w.min*60e3):'';
 box.innerHTML=head+`<div class="ways"><div class="way"><b>A piedi</b><span>${w.min} min, ${mdist(w.m)}${w.est?' (stima)':''}</span>${arr?`<small>esci alle <b>${wl}</b></small>`:''}</div><div class="way" id="wayT"><b>Con i mezzi</b><i class="skel" style="width:80%;margin:4px 0"></i><i class="skel" style="width:55%"></i></div></div><div id="itins"><div class="skbox"><i class="skel" style="width:40%;height:1.4em"></i><i class="skel" style="width:90%"></i><i class="skel" style="width:70%"></i></div></div><div class="btns">${mapsLinks(f,t,'transit')}<button class="btn alt sm" type="button" id="comRef">Aggiorna</button></div><p class="sub attr">Mezzi con orari e ritardi in tempo reale: <a href="https://transitous.org/sources/" target="_blank" rel="noopener">Transitous</a>, dati di stops.lt.</p>`;
 try{const L=await transit(f,t,arr?new Date(arr).toISOString():null,!!arr,arr&&arr-Date.now()<3*3600e3?2*60e3:6*3600e3);
  if(!L.length)throw 0;const best=L[0],x=itinText(best);$('#wayT').innerHTML=`<b>Con i mezzi</b><span>${x.min} min, ${x.rides}</span><small>esci alle <b>${x.leave}</b>${x.rt?' <i class="live">live</i>':''}</small>`;
  $('#itins').innerHTML=L.slice(0,2).map((it,i)=>itinHTML(it,i?'oppure ':'')).join('');
  todayCommute={walk:w.min,leaveW:wl,leaveT:x.leave,rides:x.rides,lesson:nx&&nx.l.id};if($('#tNext'))todayCard()}
 catch(e){$('#itins').innerHTML='';$('#wayT').innerHTML=`<b>Con i mezzi</b><span>${navigator.onLine?'Non disponibile ora':'Serve internet'}</span><small>usa Google Maps qui sotto</small>`}}
let todayCommute=null;
async function lessonTravel(){if(!S.home||!S.home.lat)return;const f=[S.home.lat,S.home.lon],t=[camp().lat,camp().lon],w=await walk(f,t);
 for(const l of S.sched){const el=document.getElementById('tv-'+l.id);if(!el)continue;const d=lessonOcc(l),arr=vTime(d,l.a).getTime()-5*60e3;el.innerHTML=`a piedi ${w.min}′, esci alle ${fmtV(arr-w.min*60e3)}<span class="tvt"></span>`;
  transit(f,t,new Date(arr).toISOString(),true,arr-Date.now()<3*3600e3?2*60e3:6*3600e3).then(L=>{if(!L.length)return;const x=itinText(L[0]),s=el.querySelector('.tvt');if(s)s.innerHTML=`<br>con i mezzi ${x.min}′ (${x.rides}), esci alle ${x.leave}`}).catch(()=>{})}}
/* In giro per la città */
async function goTo(id){const out=document.getElementById('go-'+id);if(!out||!S.home||!S.home.lat)return;const p=PLACES.find(x=>x[0]===id),c=PLC[id];if(!c)return;const f=[S.home.lat,S.home.lon];out.innerHTML='<div class="skbox"><i class="skel" style="width:50%"></i><i class="skel" style="width:85%"></i></div>';
 const w=await walk(f,c);let h=`<p class="sub">A piedi ${w.min} min (${mdist(w.m)})</p>`;
 try{const L=await transit(f,c,null,false,2*60e3);if(L.length)h+=itinHTML(L[0],'con i mezzi: ')}catch(e){}
 out.innerHTML=h+`<div class="btns" style="margin-top:6px">${mapsLinks(f,c,w.min<=20?'walking':'transit')}</div>`}
/* Attorno a casa (OpenStreetMap / Overpass) */
const NEAR=[['market','Supermercati','#ff4f9a'],['pharmacy','Farmacie','#46d394'],['health','Ospedali e cliniche','#d81e45'],['stop','Fermate','#3fb6e8'],['atm','Bancomat','#ffc21a'],['post','Posta e pacchi','#ff7a1a'],['laundry','Lavanderie','#a58bff']];
let nearTab='market';
async function nearLoad(){const h=S.home;if(!h||!h.lat)return;const b=$('#nearRef');if(b){b.disabled=true;b.textContent='Cerco…'}
 const L=h.lat,O=h.lon,q=`[out:json][timeout:25];(nwr["shop"~"^(supermarket|convenience)$"](around:1200,${L},${O});nwr["amenity"="pharmacy"](around:1500,${L},${O});nwr["amenity"~"^(hospital|clinic)$"](around:5000,${L},${O});nwr["highway"="bus_stop"](around:600,${L},${O});nwr["amenity"="atm"](around:1000,${L},${O});nwr["amenity"~"^(post_office|parcel_locker)$"](around:1500,${L},${O});nwr["shop"~"^(laundry|dry_cleaning)$"](around:2500,${L},${O}););out center tags 400;`;
 try{const r=await fetch('https://overpass-api.de/api/interpreter',{method:'POST',body:'data='+encodeURIComponent(q),headers:{'content-type':'application/x-www-form-urlencoded'}});if(!r.ok)throw 0;const j=await r.json();
  const items=[];for(const e of j.elements||[]){const t=e.tags||{},lat=e.lat||(e.center&&e.center.lat),lon=e.lon||(e.center&&e.center.lon);if(!lat)continue;
   const c=t.shop==='supermarket'||t.shop==='convenience'?'market':t.amenity==='pharmacy'?'pharmacy':/hospital|clinic/.test(t.amenity||'')?'health':t.highway==='bus_stop'?'stop':t.amenity==='atm'?'atm':/post_office|parcel_locker/.test(t.amenity||'')?'post':/laundry|dry_cleaning/.test(t.shop||'')?'laundry':null;if(!c)continue;
   const n=t.name||t.brand||t.operator||(c==='post'&&t.amenity==='parcel_locker'?'Armadietto pacchi':NEAR.find(x=>x[0]===c)[1].replace(/i$/,'o'));
   items.push({c,n:String(n).slice(0,60),lat:+(+lat).toFixed(5),lon:+(+lon).toFixed(5),d:Math.round(hav([L,O],[lat,lon])),oh:(t.opening_hours||'').slice(0,60),em:t.emergency==='yes'?1:0,big:t.shop==='supermarket'?1:0,k:t.amenity==='parcel_locker'?'locker':''})}
  const keep=[];NEAR.forEach(([c])=>{const L2=items.filter(x=>x.c===c).sort((a,b)=>c==='market'?(b.big-a.big)||a.d-b.d:c==='health'?(b.em-a.em)||a.d-b.d:a.d-b.d);const seen=new Set();for(const x of L2){const key=x.n+x.c;if(c!=='stop'&&seen.has(key))continue;seen.add(key);keep.push(x);if(keep.filter(y=>y.c===c).length>=(c==='stop'?6:5))break}});
  S.near={t:Date.now(),lat:L,lon:O,items:keep};save();nearView();if(MAP)mapMarkers();toast('Servizi attorno a casa aggiornati')}
 catch(e){toast(navigator.onLine?'Non riesco a cercare ora, riprova tra poco':'Serve internet per cercare i servizi')}finally{if(b){b.disabled=false;b.textContent='Aggiorna'}}}
function nearView(){const box=$('#near');if(!box)return;const h=S.home;
 if(!h||!h.lat){box.innerHTML='<p class="empty">Aggiungi l\'indirizzo di casa per trovare supermercati, farmacie, ospedali e fermate vicine.</p>';return}
 const N=S.near&&S.near.lat===h.lat&&S.near.lon===h.lon?S.near:null;
 if(!N){box.innerHTML='<div class="btns"><button class="btn" type="button" id="nearRef">Cerca attorno a casa</button></div>';return}
 const it=N.items.filter(x=>x.c===nearTab),f=[h.lat,h.lon];
 box.innerHTML=`<div class="scroll setnav" style="margin:0 0 6px">${NEAR.map(([c,l,col])=>{const n=N.items.filter(x=>x.c===c).length;return `<button type="button" data-near="${c}" class="${c===nearTab?'on':''}"><i class="dot" style="background:${col};width:12px;height:12px"></i> ${l} ${n?`(${n})`:''}</button>`}).join('')}</div>`
 +(it.length?it.map(x=>`<div class="nrow"><div><b>${esc(x.n)}${x.em?' <i class="live">pronto soccorso</i>':''}</b><small>${mdist(x.d)}, ${Math.max(1,Math.round(x.d*1.25/80))} min a piedi${x.oh?', '+esc(x.oh):''}</small></div><a class="btn alt sm" href="${gmaps(f,[x.lat,x.lon],x.d<1800?'walking':'transit')}" target="_blank" rel="noopener">Vai</a></div>`).join(''):'<p class="empty">Niente in questa categoria qui vicino.</p>')
 +`<div class="btns"><button class="btn alt sm" type="button" id="nearRef">Aggiorna</button></div><p class="sub">Dati © OpenStreetMap, aggiornati il ${new Date(N.t).toLocaleDateString('it-IT')}. In emergenza chiama il 112.</p>`}
function placeGoButtons(){if(!S.home||!S.home.lat)return;document.querySelectorAll('#places .prow').forEach(r=>{const b=r.querySelector('[data-seen]');if(!b||r.querySelector('[data-go]'))return;const id=b.dataset.seen,g=document.createElement('button');g.type='button';g.className='btn alt sm';g.dataset.go=id;g.textContent='Come arrivo';const wrap=document.createElement('div');wrap.className='gor';wrap.id='go-'+id;r.querySelector('div').appendChild(g);r.insertAdjacentElement('afterend',wrap)})}
async function setHome(x){S.home=x;homeQ={};save();homeView();commuteView();nearView();lessonTravel();placeGoButtons();if(MAP)mapMarkers();nearLoad()}
document.addEventListener('submit',async e=>{const f=e.target;if(f.id!=='homeForm'&&f.id!=='campForm')return;e.preventDefault();const inp=f.querySelector('input'),q=inp.value.trim();if(q.length<3)return;const out=f.id==='homeForm'?$('#homeRes'):$('#campRes');out.innerHTML='<p class="sub">Cerco…</p>';
 try{const R=await geocode(q);homeQ.res=R;homeQ.kind=f.id;out.innerHTML=R.length?R.map((x,i)=>`<button type="button" class="sres" data-pick="${i}"><b>${esc(x.a.split(',').slice(0,2).join(','))}</b><small>${esc(x.a.split(',').slice(2).join(',').trim())}</small></button>`).join(''):'<p class="empty">Nessun indirizzo trovato: prova a scriverlo in modo diverso.</p>'}
 catch(err){out.innerHTML=`<p class="sub">${navigator.onLine?'Ricerca non riuscita, riprova':'Serve internet per cercare l\'indirizzo'}</p>`}});
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
 if(d.pick!==undefined&&homeQ.res){const x=homeQ.res[+d.pick];if(!x)return;if(homeQ.kind==='campForm'){S.campus=x;homeQ={};save();homeView();commuteView();lessonTravel()}else setHome(x);return}
 if(d.near){nearTab=d.near;nearView();return}
 if(d.go){goTo(d.go);return}
 switch(b.id){
  case 'homeEdit':homeQ={editing:1};homeView();setTimeout(()=>{const i=$('#home-q');if(i)i.focus()},50);break;
  case 'homeCancel':homeQ={};homeView();break;
  case 'homeGeo':if(!navigator.geolocation){toast('Posizione non disponibile');break}b.textContent='Cerco la posizione…';navigator.geolocation.getCurrentPosition(async p=>{const lat=+p.coords.latitude.toFixed(5),lon=+p.coords.longitude.toFixed(5);let a=`Posizione ${lat}, ${lon}`;try{const r=await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&accept-language=it&lat=${lat}&lon=${lon}`);const j=await r.json();if(j.display_name)a=j.display_name}catch(x){}setHome({a,lat,lon})},()=>{b.textContent='Usa la mia posizione';toast('Non riesco a leggere la posizione')},{timeout:12000});break;
  case 'campEdit':$('#campBox').innerHTML=`<form class="addrow" id="campForm"><input id="camp-q" placeholder="Indirizzo della sede" value="${esc(camp().a)}"><button class="btn">Cerca</button></form><div id="campRes"></div>`;break;
  case 'comRef':['t-'].forEach(()=>{try{Object.keys(localStorage).filter(k=>k.startsWith('labas-c-t-')).forEach(k=>localStorage.removeItem(k))}catch(x){}});commuteView();lessonTravel();break;
  case 'nearRef':nearLoad();break;
 }});
function homeAll(){homeView();commuteView();nearView();placeGoButtons()}

document.addEventListener('click',e=>{const b=e.target.closest('[data-adddue]');if(!b)return;const id=b.dataset.adddue,l=document.createElement('label');l.className='due';l.innerHTML=`<input type="date" id="due-${id}" data-due="${id}" aria-label="Scadenza">`;b.replaceWith(l);const i=l.querySelector('input');try{i.showPicker?i.showPicker():i.focus()}catch(x){i.focus()}});
/* ===== 1.8: gesti ===== */
let swDir=0;const NAVV=['oggi','soldi','studio','inglese','vilnius'];
const SWROW='.task,.lrow,.brow,.les,.ct,.rrow';
const coarse=matchMedia('(hover:none) and (pointer:coarse)').matches;
function markRows(){if(!coarse)return;document.querySelectorAll(SWROW).forEach(r=>{if(r.querySelector('.x'))r.classList.add('sw-row')})}
new MutationObserver(()=>{clearTimeout(markRows.t);markRows.t=setTimeout(markRows,30)}).observe(document.getElementById('main'),{childList:true,subtree:true});
let tg=null;
document.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;const t=e.touches[0],el=e.target;
 if(el.closest('input,textarea,select,.setnav,.scroll,.mapbox,.leaflet-container,#quick,#srch,#onb,.fc,.mchart,nav,.dock'))return(tg=null);
 const row=el.closest('.sw-row');tg={x:t.clientX,y:t.clientY,t:Date.now(),row,dir:0,dx:0}},{passive:true});
document.addEventListener('touchmove',e=>{if(!tg)return;const t=e.touches[0],dx=t.clientX-tg.x,dy=t.clientY-tg.y;
 if(!tg.dir){if(Math.abs(dx)>12&&Math.abs(dx)>Math.abs(dy)*1.4)tg.dir='h';else if(Math.abs(dy)>12){tg.dir='v';return}}
 if(tg.dir!=='h')return;tg.dx=dx;
 if(tg.row&&dx<0){const d=Math.min(-dx,180);tg.row.classList.add('swiping');tg.row.style.transform=`translateX(${-d}px)`;tg.row.style.setProperty('--d',d+'px')}},{passive:true});
document.addEventListener('touchend',()=>{if(!tg)return;const g=tg;tg=null;
 if(g.row){const r=g.row;r.classList.remove('swiping');if(g.dir==='h'&&g.dx<-110){r.classList.add('gone');const x=r.querySelector('.x');setTimeout(()=>{if(x)x.click()},200);try{if(!localStorage.getItem('labas-swhint'))localStorage.setItem('labas-swhint','1')}catch(e){}}else{r.style.transform='';r.style.removeProperty('--d')}return}
 if(g.dir!=='h'||Date.now()-g.t>600||Math.abs(g.dx)<80)return;
 const i=NAVV.indexOf(curV);if(i<0){if(curV==='impostazioni'&&g.dx>0){swDir=-1;location.hash='#oggi'}return}
 const j=g.dx<0?i+1:i-1;if(j<0||j>=NAVV.length)return;swDir=g.dx<0?1:-1;location.hash='#'+NAVV[j]},{passive:true});
document.addEventListener('touchcancel',()=>{if(tg&&tg.row){tg.row.classList.remove('swiping');tg.row.style.transform=''}tg=null},{passive:true});
function swipeHint(){if(!coarse)return;try{if(localStorage.getItem('labas-swhint'))return;localStorage.setItem('labas-swhint','1')}catch(e){return}setTimeout(()=>toast('Suggerimento: scorri una riga verso sinistra per eliminarla, e lo schermo di lato per cambiare sezione'),4000)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-stylev]');if(!b)return;S.set.style=b.dataset.stylev;save();settingsUI();petals();petalProg();setTimeout(()=>{themeMeta();flowers();if(MAP)mapMarkers()},50);const r=b.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,12)});
/* ===== 2.0: testata che segue meteo e ora di Vilnius ===== */
let skyKey='';
function heroSky(){const hero=$('#hero');if(!hero)return;let w=null;try{w=(JSON.parse(localStorage.getItem('labas-wx'))||{}).w}catch(e){}
 const n=vNow(),toMin=s=>{const m=String(s||'').slice(11,16).split(':');return m.length===2?(+m[0])*60+(+m[1]):null};
 const sr=w&&w.daily?toMin(w.daily.sunrise&&w.daily.sunrise[0]):null,ss=w&&w.daily?toMin(w.daily.sunset&&w.daily.sunset[0]):null;
 const R=sr??480,T=ss??990,m=n.min;const tod=m<R-45||m>T+50?'night':m<R+60?'dawn':m>T-60?'dusk':'day';
 const code=w&&w.current?+w.current.weather_code:null,ic=code===null?'':wxInfo(code)[1];
 const wx=ic==='sun'||ic==='partly'?'sun':ic==='rain'||ic==='storm'?'rain':ic==='snow'?'snow':ic?'cloud':'';
 hero.classList.remove('tod-dawn','tod-dusk','tod-night','tod-day','wx-sun','wx-rain','wx-snow','wx-cloud');hero.classList.add('tod-'+tod);if(wx)hero.classList.add('wx-'+wx);
 const k=tod+'|'+wx;if(k===skyKey)return;skyKey=k;const fx=$('#wxfx');fx.className='wxfx'+(wx==='snow'||wx==='rain'?' '+wx:'');
 if((wx==='snow'||wx==='rain')&&!calm()){let r=7;const rnd=()=>(r=r*16807%2147483647)/2147483647,N=wx==='snow'?26:34,h=hero.clientHeight||320;fx.style.setProperty('--h',h+'px');
  fx.innerHTML=Array.from({length:N},()=>`<i style="--x:${(rnd()*100).toFixed(1)}%;--t:${(wx==='snow'?5+rnd()*6:0.7+rnd()*.6).toFixed(2)}s;--d:${(-rnd()*8).toFixed(2)}s;--s:${(3+rnd()*4).toFixed(1)}px;--dx:${((rnd()-.5)*50).toFixed(0)}px"></i>`).join('')}else fx.innerHTML='';
 flowers();const t=document.querySelector('meta[name=theme-color]');if(t&&tod==='night'&&!isDark())t.setAttribute('content',getComputedStyle(document.body).getPropertyValue('--sec').trim())}
/* barra delle parti: evidenzia dove sei */
const partObs=new IntersectionObserver(es=>{for(const e of es){if(!e.isIntersecting)continue;const id=e.target.id,a=document.querySelector(`.setnav a[data-jump="${id}"]`);if(!a)continue;const nav=a.parentElement;nav.querySelectorAll('a').forEach(x=>x.classList.toggle('on',x===a));const l=a.offsetLeft-nav.clientWidth/2+a.clientWidth/2;nav.scrollTo({left:l,behavior:calm()?'auto':'smooth'})}},{rootMargin:'-90px 0px -62% 0px'});
document.querySelectorAll('#v-vilnius .anc,#v-impostazioni .set').forEach(el=>partObs.observe(el));
/* etichette che restano sopra il campo */
function floatLabels(){document.querySelectorAll('.addrow>input[placeholder]:not([type=date]):not([type=time]):not([type=file]):not([type=month])').forEach(inp=>{const l=document.createElement('label');l.className='fl'+(inp.classList.contains('n')?' n':'');l.htmlFor=inp.id||'';const s=document.createElement('span');s.textContent=inp.placeholder;inp.replaceWith(l);l.appendChild(s);l.appendChild(inp);if(inp.value)l.classList.add('has')})}
document.addEventListener('input',e=>{const l=e.target.parentElement;if(l&&l.classList.contains('fl'))l.classList.toggle('has',!!e.target.value)});
new MutationObserver(()=>{clearTimeout(floatLabels.t);floatLabels.t=setTimeout(floatLabels,40)}).observe(document.body,{childList:true,subtree:true});
document.addEventListener('click',e=>{if(e.target.closest('#navPlus'))quickOpen()});
window.addEventListener('online',()=>{if(USER){pull();drain()}});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&USER)pull()});
try{if(window.supabase&&window.supabase.createClient)SB=window.supabase.createClient(SB_URL,SB_KEY,{auth:{flowType:'pkce',detectSessionInUrl:true,persistSession:true,autoRefreshToken:true,storageKey:'labas-auth'}})}catch(e){SB=null}
if(SB){SB.auth.onAuthStateChange((ev,session)=>{const u=session&&session.user||null;if((u&&u.id)!==(USER&&USER.id)){USER=u;setTimeout(()=>{acctUI();docs();if(USER){pull();drain()}},0)}else if(u)USER=u;
 if(/[?&]code=/.test(location.search))history.replaceState(null,'',location.pathname+location.hash)})}
if('serviceWorker' in navigator){const had=!!navigator.serviceWorker.controller;let reloaded=false;
 navigator.serviceWorker.addEventListener('controllerchange',()=>{if(had&&!reloaded){reloaded=true;location.reload()}});
 navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).then(r=>{remind();r.update().catch(()=>{});document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')r.update().catch(()=>{})})}).catch(()=>{})}
petals();wrInit();all();route();markRows();swipeHint();floatLabels();heroSky();acctUI();notifUI();migrateLegacy();remind();intro();weather();runRec();
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'){runRec();if(curV==='oggi'){weather();todayCard()}}});
}