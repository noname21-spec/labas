
{
const KEY='labas-erasmus-v2',OLD='labas-erasmus-v1';
const uid=()=>Math.random().toString(36).slice(2,10);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $=s=>document.querySelector(s);
const eur=n=>{const v=Math.round((+n||0)*100)/100;return v.toLocaleString('it-IT',{minimumFractionDigits:Number.isInteger(v)?0:2,maximumFractionDigits:2})+' €'};
const sum=a=>a.reduce((t,x)=>t+(+x.v||0),0);
const COLS=['#ff4f9a','#ff7a1a','#ffc21a','#46d394','#3fb6e8','#ffa8cf'];
const CHECK='<svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#22140a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
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
const VER='1.2.3';
const SETD=()=>({name:'Matteo',uni:'European Humanities University',goal:30,theme:'auto',text:'n',motion:true,intro:true,start:'oggi',leads:[3,1,0],en:true,lt:true,onb:false});
const mkTask=([ph,t,due,d])=>({id:uid(),ph,t,due,done:!!d});
const DEF=()=>{
 const exp=[['Affitto',320],['Spesa',170],['Trasporti',15],['Telefono',10],['Uscite e gite',90],['Altro',40]].map(([n,v])=>({id:uid(),n,v}));
 return {u:0,dep:'2027-02-01',ret:'2027-07-31',
 tasks:[['prima','Learning Agreement firmato da te, Bologna ed EHU','2026-12-15',0],['prima','Accordo finanziario della borsa firmato','2027-01-15',0],['prima','Test di lingua online, se richiesto dal bando','',1],['prima','Tessera sanitaria valida come TEAM fino a fine luglio','',1],['prima','Verificare assicurazione infortuni e responsabilità civile','2027-01-20',0],['prima',HOUSE,'2026-12-20',0],["prima","Carta d'identità valida per l'espatrio",'',1],['prima','Volo per Vilnius prenotato','2026-12-10',0],['prima','Account ed email istituzionale EHU attivati','2027-01-25',0],
 ...BAGT,
 ['arrivo',"Certificato di arrivo firmato dall'ufficio internazionale",'2027-02-05',0],['arrivo',"Registrazione del soggiorno oltre 3 mesi: chiedere all'ufficio internazionale",'',0],['arrivo','Biglietto o carta trasporti con sconto studenti','2027-02-03',0],['arrivo','SIM lituana o roaming UE','',0],
 ['durante','Modifiche al Learning Agreement, se cambiano i corsi','2027-03-01',0],['durante','Iscrizione agli esami','',0],
 ['rientro','Transcript of Records richiesto','2027-07-15',0],['rientro','Certificato di fine periodo firmato','2027-07-30',0],['rientro','Relazione finale online','2027-08-31',0]].map(mkTask),
 inc:[['Borsa Erasmus',350],['Risparmi e altre entrate',320]].map(([n,v])=>({id:uid(),n,v})),
 exp,
 log:[[0,'2027-02-02','Affitto di febbraio',320],[1,'2027-02-03','Spesa da Maxima',38.5],[2,'2027-02-03','Abbonamento mensile',15],[4,'2027-02-07','Cena con il gruppo Erasmus',22],[1,'2027-02-09','Spesa da Iki',41.2],[3,'2027-02-10','Ricarica SIM',10],[4,'2027-02-14','Gita a Trakai',18]].map(([c,d,n,v])=>({id:uid(),c:exp[c].id,d,n,v})),
 courses:[['Media and Society',6],['Visual Culture',6],['Digital Media Practices',6],['Academic English',5]].map(([n,e])=>({id:uid(),n,e,s:false,g:''})),
 sched:[[0,'10:00','11:30','Media and Society','Aula 302'],[1,'14:00','15:30','Visual Culture','Aula 210'],[2,'10:00','11:30','Media and Society','Aula 302'],[2,'16:00','17:30','Academic English','Aula 105'],[3,'12:00','13:30','Digital Media Practices','Lab 2']].map(([d,a,b,c,r])=>({id:uid(),d,a,b,c,r})),
 diary:[],seen:[],learned:[],lt:[],contacts:[],docs:[],bag:{lim:20,kg:''},bagAdded:true,set:SETD()};
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
 finally{pulling=false}}
const save=()=>{S.u=Date.now();saveLocal();push();remind();return true};

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
 nums();
}
function upcoming(){
 const L=S.tasks.filter(t=>!t.done&&t.due&&ddiff(t.due)!==null).sort((x,y)=>x.due<y.due?-1:1).slice(0,4);
 $('#upcoming').innerHTML=L.map(t=>{const n=ddiff(t.due),c=n<0?'late':n<=7?'soon':'';return `<div class="up row ${c}"><b>${n<0?'!':n===0?'Oggi':n}</b><div><span>${esc(t.t)}</span><small>${rel(n)}, ${fmt(t.due,{day:'numeric',month:'long'})}</small></div></div>`}).join('')||'<p class="empty">Nessuna scadenza in arrivo: aggiungi una data alle voci della checklist.</p>';
}
function bagView(){const e=$('#bagv');if(!e)return;const lim=+S.bag.lim||0,kg=+S.bag.kg||0;
 if(!kg||!lim){e.textContent='Pesala e scopri quanto spazio ti resta.';e.className='bagv';return}
 const d=Math.round((lim-kg)*10)/10;e.textContent=d>=0?`Ti restano ${d.toLocaleString('it-IT')} kg`:`Sei sopra di ${(-d).toLocaleString('it-IT')} kg`;e.className='bagv '+(d>=0?'pos':'neg')}
function tasks(){
 $('#phases').innerHTML='<section class="card"><h3>Prossime scadenze</h3><div id="upcoming"></div></section>'+PH.map(([k,lab])=>{const L=S.tasks.filter(x=>x.ph===k),d=L.filter(x=>x.done).length;
  return `<section class="card"><div class="ph-h"><h3>${lab}</h3><span class="cnt">${d}/${L.length}</span></div><div class="mini"><i style="width:${L.length?d/L.length*100:0}%"></i></div>${L.map(x=>{const n=x.due?ddiff(x.due):null,c=!x.due?'none':x.done?'':n<0?'late':n<=7?'soon':'';return `<div class="task row${x.done?' done':''}"><button class="tick" type="button" data-tog="${x.id}" aria-pressed="${x.done}" aria-label="Fatto: ${esc(x.t)}"><span>${x.done?CHECK:''}</span></button><div><span class="tt">${esc(x.t)}</span><label class="due ${c}"><input type="date" id="due-${x.id}" value="${esc(x.due)}" data-due="${x.id}" aria-label="Scadenza"></label></div><button class="x" type="button" data-del="${x.id}" aria-label="Elimina">×</button></div>`}).join('')}${L.length?'':'<p class="sub">Nessuna voce per ora.</p>'}${k==='valigia'?`<div class="bag"><label for="bag-l">Limite kg<input id="bag-l" type="number" min="0" step="0.5" inputmode="decimal" value="${esc(S.bag.lim)}" data-bag="lim"></label><label for="bag-k">Peso attuale kg<input id="bag-k" type="number" min="0" step="0.1" inputmode="decimal" value="${esc(S.bag.kg)}" data-bag="kg"></label><span class="bagv" id="bagv"></span></div><p class="sub">Il limite cambia da compagnia a compagnia: controlla il tuo biglietto.</p>`:''}<form class="addrow" data-ph="${k}"><input id="add-${k}" placeholder="Aggiungi voce" aria-label="Nuova voce: ${lab}"><button class="btn">Aggiungi</button></form></section>`}).join('');
 upcoming();bagView();
}
function contacts(){
 $('#contacts').innerHTML=S.contacts.map(c=>`<div class="ct row"><div><b>${esc(c.n||c.r)}</b>${c.n&&c.r?`<small>${esc(c.r)}</small>`:''}<div>${c.e?`<a href="mailto:${esc(c.e)}">${esc(c.e)}</a>`:''}${c.p?`<a href="tel:${esc(c.p.replace(/[^\d+]/g,''))}">${esc(c.p)}</a>`:''}</div></div><button class="x" type="button" data-ctdel="${c.id}" aria-label="Elimina contatto">×</button></div>`).join('')||'<p class="empty">Nessun contatto ancora. Parti da un ruolo qui sotto.</p>';
 const used=new Set(S.contacts.map(c=>c.r));
 $('#presets').innerHTML=ROLES.filter(r=>!used.has(r)).map(r=>`<button type="button" data-role="${esc(r)}">+ ${esc(r)}</button>`).join('');
 $('#rlist').innerHTML=ROLES.map(r=>`<option value="${esc(r)}">`).join('');
}
function docs(){
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
 $('#logRows').innerHTML=L.map(l=>{const c=S.exp.find(x=>x.id===l.c);return `<div class="lrow row"><span>${fmt(l.d,{day:'numeric',month:'short'})}</span><div>${esc(l.n)}<small>${esc(c?c.n:'Senza categoria')}</small></div><b>${eur(l.v)}</b><button class="x" type="button" data-ldel="${l.id}" aria-label="Elimina spesa">×</button></div>`}).join('')||`<p class="empty">Nessuna spesa registrata a ${esc(fmt(mon+'-01',{month:'long',year:'numeric'}))}.</p>`;
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
 $('#cRows').innerHTML=S.courses.map(c=>`<div class="crow row"><input class="cn" id="cn-${c.id}" value="${esc(c.n)}" data-cname="${c.id}" aria-label="Nome del corso"><button class="x" type="button" data-cdel="${c.id}" aria-label="Elimina ${esc(c.n)}">×</button><label class="ects"><input id="ce-${c.id}" type="number" min="0" max="30" inputmode="numeric" value="${+c.e||0}" data-cects="${c.id}" aria-label="ECTS">ECTS</label><button class="st${c.s?' ok':''}" type="button" data-cst="${c.id}" aria-pressed="${c.s}">${c.s?'Superato':'Da sostenere'}</button><span class="gw"><input class="gr" id="cg-${c.id}" type="number" min="1" max="10" inputmode="numeric" placeholder="Voto" value="${esc(c.g)}" data-cgr="${c.id}" aria-label="Voto"${c.s?'':' disabled'}><span class="conv" id="cv-${c.id}"></span></span></div>`).join('')||'<p class="empty">Nessun corso: aggiungi quelli del Learning Agreement.</p>';
 courseSelect();
 ring();
}
function sched(){
 const td=(new Date().getDay()+6)%7;
 $('#week').innerHTML=DAYS.map((n,i)=>{const L=S.sched.filter(s=>+s.d===i).sort((a,b)=>a.a<b.a?-1:1);
  return `<div class="day${i===td?' today':''}"><h4>${n}</h4>${L.map(s=>`<div class="les row"><time>${esc(s.a)}</time><div>${esc(s.c)}<small>fino alle ${esc(s.b)}${s.r?', '+esc(s.r):''}</small></div><button class="x" type="button" data-sdel="${s.id}" aria-label="Elimina lezione">×</button></div>`).join('')||'<p class="sub">Libero</p>'}</div>`}).join('');
}
let deck=[],fi=0,flip=false;
function pool(){const p=[];if(S.set.en!==false)ENG.forEach(([k,,L])=>L.forEach(([en,it],i)=>{const id=k+'-'+i;if(!S.learned.includes(id))p.push({t:'en',id,f:en,b:it})}));if(S.set.lt!==false)LT.forEach(([id,lt,it,pr])=>{if(!S.lt.includes(id))p.push({t:'lt',id,f:lt,b:it,p:pr})});return p}
function buildDeck(){deck=pool();for(let i=deck.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]]}fi=0;flip=false;flash()}
function flash(){
 const tot=ENG.reduce((t,g)=>t+g[2].length,0)+LT.length,kn=S.learned.length+S.lt.length;
 $('#learnTxt').textContent=`Inglese e lituano mescolati: ne sai ${kn} su ${tot}.`;
 const fc=$('#fc');
 if(!deck.length){fc.classList.add('back');fc.innerHTML='<b>Tutto imparato!</b><span>Togli una stella nelle liste per ripassare di nuovo.</span>';$('#fcCount').textContent='';$('#fcKnow').disabled=$('#fcAgain').disabled=true;return}
 $('#fcKnow').disabled=$('#fcAgain').disabled=false;
 const c=deck[fi%deck.length];fc.classList.toggle('back',flip);
 fc.innerHTML=flip?`<b>${esc(c.b)}</b>${c.p?`<small>si dice: ${esc(c.p)}</small>`:''}<small>Tocca per tornare</small>`:`<span>${c.t==='lt'?'Lituano':'Inglese'}</span><b>${esc(c.f)}</b><small>Tocca per girare</small>`;
 $('#fcCount').textContent=`${deck.length} da ripassare`;
}
function english(){
 $('#engGroups').innerHTML=ENG.map(([k,lab,L])=>`<section class="card"><h3>${lab}</h3>${L.map(([en,it],i)=>{const id=k+'-'+i,on=S.learned.includes(id);return `<div class="phrow row"><div><b>${esc(en)}</b><small>${esc(it)}</small></div><button class="ib" type="button" data-copy="${esc(en)}" aria-label="Copia la frase">${ICOPY}</button><button class="ib${on?' on':''}" type="button" data-learn="${id}" aria-pressed="${on}" aria-label="Segna come imparata">${ISTAR}</button></div>`}).join('')}</section>`).join('');
 $('#ltCards').innerHTML=LT.map(([id,lt,it,pr])=>`<div class="pc"><b>${lt}</b><span>${it}</span><small>${pr}</small></div>`).join('');
 flash();
}
function albumSet(){return new Set([...PLACES.filter(p=>S.seen.includes(p[0])).map(p=>p[1]),...S.diary.map(d=>(d.p||'').trim()).filter(Boolean)])}
function places(){
 $('#places').innerHTML=PLACES.map(([id,n,t])=>{const on=S.seen.includes(id);return `<div class="prow row"><div><b>${n}</b>${t}</div><button class="st${on?' ok':''}" type="button" data-seen="${id}" aria-pressed="${on}">${on?'Visto':'Da vedere'}</button></div>`}).join('');
 $('#album').innerHTML=[...albumSet()].map(p=>`<span>${esc(p)}</span>`).join('')||'<p class="sub">Segna i posti visti o scrivi dove sei nel diario: compariranno qui.</p>';
 $('#plist').innerHTML=PLACES.map(p=>`<option value="${esc(p[1])}">`).join('');
}
function diary(){
 const L=[...S.diary].sort((a,b)=>a.d<b.d?1:-1);
 $('#diary').innerHTML=L.map(e=>`<article class="entry row">${e.f?`<img data-f="${esc(e.f)}" alt="Foto del ${esc(fmt(e.d))}" loading="lazy">`:e.a?'<p class="sub">Foto rimasta nella versione precedente di Labas.</p>':''}<div class="eh"><b>${esc(fmt(e.d))}${e.p?', '+esc(e.p):''}</b><button class="x" type="button" data-ddel="${e.id}" aria-label="Elimina pagina">×</button></div>${e.t?`<p>${esc(e.t)}</p>`:''}</article>`).join('')||'<p class="empty">Il diario è ancora vuoto: la prima pagina può essere anche prima di partire.</p>';
 hydrate($('#diary'));places();nums();
}
let numTxt='';
function nums(){
 const z=stay(),days=z.st==='during'?z.k:z.st==='after'?z.tot:0,pl=albumSet().size,ects=S.courses.filter(c=>c.s).reduce((t,c)=>t+(+c.e||0),0),ph=S.learned.length+S.lt.length;
 const N=[[z.st==='before'?z.a:days,z.st==='before'?'giorni alla partenza':'giorni a Vilnius'],[S.diary.length,'pagine di diario'],[pl,'posti nell\'album'],[ects,'ECTS superati'],[ph,'frasi imparate'],[eur(Math.round(sum(S.log))),'spese registrate']];
 $('#nums').innerHTML=N.map(([v,l])=>`<div class="num"><b>${esc(v)}</b>${l}</div>`).join('');
 numTxt=`Il mio Erasmus a Vilnius in numeri: ${days} giorni a Vilnius, ${S.diary.length} pagine di diario, ${pl} posti visitati, ${ects} ECTS superati, ${ph} frasi imparate tra inglese e lituano.`;
}
function all(){$('#dep').value=S.dep;$('#ret').value=S.ret;settingsUI();$('#d-d').value=iso(new Date());$('#l-d').value=iso(new Date());tasks();budget();courses();sched();english();buildDeck();diary();contacts();docs();hero()}
const commit=(...fns)=>{save();fns.forEach(f=>f());hero()};
const snapDel=(fn,f)=>{const p=JSON.stringify(S);fn();if(f)dropFile(f);toast('Eliminato',()=>{if(f&&pendingDrop.has(f)){clearTimeout(pendingDrop.get(f));pendingDrop.delete(f)}S=fill(JSON.parse(p));save();all()})};
const VIEWS=['oggi','soldi','studio','inglese','vilnius','impostazioni'];let curV='';
function route(){const h=location.hash.slice(1),v=VIEWS.includes(h)?h:(VIEWS.includes(S.set.start)?S.set.start:'oggi');
 VIEWS.forEach(x=>{$('#v-'+x).classList.toggle('on',x===v);const n=document.getElementById('n-'+x);if(n)n.classList.toggle('on',x===v)});$('#gear').classList.toggle('on',v==='impostazioni');
 if(v!==curV){curV=v;const vw=$('#v-'+v);vw.classList.add('enter');setTimeout(()=>vw.classList.remove('enter'),1100);let i=0;$('#v-'+v).querySelectorAll('.card,.day,.wk article,.pc,.num').forEach(el=>el.style.setProperty('--i',Math.min(i++,12)));if(v==='studio'){const rg=$('#ring');rg.classList.add('anim');setTimeout(()=>rg.classList.remove('anim'),1100)}if(v==='impostazioni')storageInfo()}
 $('#hero').classList.toggle('compact',v!=='oggi');
 const top=$('#main').offsetTop-12;if(window.scrollY>top)window.scrollTo(0,0);}
function petals(){let o='';for(let i=0;i<14;i++)o+=`<ellipse cx="100" cy="40" rx="17" ry="38" fill="${i%2?'#ff7a1a':'#ff4f9a'}" stroke="#22140a" stroke-width="3.5" transform="rotate(${(i*360/14).toFixed(2)} 100 100)"/>`;$('#petals').innerHTML=o}
const bg=$('#bgfl');
function flowers(){const W=bg.clientWidth,H=bg.clientHeight;if(!W)return;let r=11;const rnd=()=>(r=r*16807%2147483647)/2147483647;const hb=bg.getBoundingClientRect(),tr=Math.max(...['#hello','#lead','#chips'].map(q=>{const e=$(q);return e&&e.offsetParent?e.getBoundingClientRect().right-hb.left:0}))+14,x0=Math.min(Math.max(tr,W*.5),W-60)/W;
 const cols=['#ff4f9a','#ff7a1a','#fff3d1','#46d394'];let o='';
 for(let i=0;i<12;i++){const x=W*(x0+rnd()*(1.04-x0)),y=H*(.12+rnd()*.85),k=.4+rnd()*.6;o+=`<use href="#fl" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${k.toFixed(2)}) rotate(${Math.round(rnd()*72)})" style="color:${cols[i%4]}"/>`}
 bg.innerHTML=`<defs><g id="fl">${[0,72,144,216,288].map(a=>`<circle cx="0" cy="-22" r="16" fill="currentColor" stroke="#22140a" stroke-width="3" transform="rotate(${a})"/>`).join('')}<circle r="12" fill="#ffc21a" stroke="#22140a" stroke-width="3"/></g></defs>${o}`}
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
 else if(b.id==='fcKnow'){const c=deck[fi%deck.length];if(!c)return;(c.t==='lt'?S.lt:S.learned).push(c.id);const r=$('#fc').getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,10);anim($('#fc'),'outR',480,()=>{deck.splice(fi%deck.length,1);if(fi>=deck.length)fi=0;flip=false;save();english();hero()},260)}
 else if(b.id==='fcAgain'){anim($('#fc'),'outL',480,()=>{const i=fi%deck.length,c=deck.splice(i,1)[0];if(c)deck.push(c);flip=false;flash()},260)}
 else if(b.id==='dlBtn')backup().catch(()=>toast('Backup non riuscito, riprova'));
 else if(b.id==='login')doLogin();
 else if(b.id==='logout'){SB.auth.signOut().catch(()=>{});USER=null;acctUI();docs();toast('Sei uscito: i dati restano su questo telefono')}
 else if(b.id==='notif')enableNotif();
 else if(b.id==='install'&&installEv){installEv.prompt();installEv.userChoice.finally(()=>{installEv=null;$('#installRow').hidden=true})}
 else if(b.id==='clear'){if(d.arm){const p=JSON.stringify(S);S.tasks.forEach(t=>{t.due='';t.done=false});S.inc.forEach(x=>x.v=0);S.exp.forEach(x=>x.v=0);S.log=[];S.courses=[];S.sched=[];mon='';save();all();delete d.arm;b.textContent='Svuota esempi';toast('Esempi tolti',()=>{S=fill(JSON.parse(p));save();all()})}else{d.arm='1';b.textContent='Tocca ancora per svuotare'}}
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
  S.diary.push(Object.assign({id:uid(),d:$('#d-d').value||iso(new Date()),p,t},x));
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
 const on=!!USER;$('#login').hidden=on||!SB;$('#logout').hidden=!on;$('#syncNow').hidden=!on;$('#wipeCloud').hidden=!on;
 $('#acct').textContent=!SB?'Sincronizzazione non disponibile ora: i dati restano su questo telefono.':on?`Accesso con ${USER.email||'Google'}: diario, spese e documenti si sincronizzano da soli.`:'Accedi con Google per ritrovare diario, spese e documenti su tutti i tuoi dispositivi.';
 if(!on)setSync('local','Salvato su questo telefono');
}
/* Promemoria: le scadenze vanno in IndexedDB, il service worker manda le notifiche */
let remT=null;
function remind(){clearTimeout(remT);remT=setTimeout(async()=>{try{await idb.put('meta','cfg',{leads:S.set.leads});await idb.put('meta','due',S.tasks.filter(t=>!t.done&&t.due).map(t=>({id:t.id,t:t.t,d:t.due})))}catch(e){return}
 if('Notification' in window&&Notification.permission==='granted'&&navigator.serviceWorker&&navigator.serviceWorker.controller)navigator.serviceWorker.controller.postMessage({type:'check'})},600)}
function notifUI(){const b=$('#notif');if(!('Notification' in window)||!('serviceWorker' in navigator)){b.hidden=true;$('#notifHint').textContent=/iPhone|iPad/.test(navigator.userAgent)?"Su iPhone i promemoria funzionano dopo aver aggiunto l'app alla schermata Home.":'Questo browser non supporta i promemoria.';return}
 const g=Notification.permission;b.textContent=g==='granted'?'Promemoria attivi':g==='denied'?'Promemoria bloccati':'Attiva promemoria';b.disabled=g!=='default';$('#testNotif').hidden=g!=='granted';$('#notifHint').textContent=leadsText();
 if(g==='denied')$('#notifHint').textContent='Hai bloccato le notifiche: riattivale dalle impostazioni del browser per questo sito.'}
async function enableNotif(){try{const g=await Notification.requestPermission();notifUI();if(g!=='granted')return;const reg=await navigator.serviceWorker.ready;
 try{if(reg.periodicSync)await reg.periodicSync.register('labas-scadenze',{minInterval:12*3600*1000})}catch(e){}
 remind();toast('Promemoria attivi')}catch(e){toast('Non riesco ad attivare i promemoria')}}
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
function burst(x,y,n){if(calm())return;const cs=['#ff4f9a','#ff7a1a','#46d394','#fff3d1'];for(let i=0;i<n;i++){const a=Math.PI*2*i/n+Math.random()*.6,d=50+Math.random()*70,e=document.createElement('span');e.className='bst';e.innerHTML=FLW(cs[i%4]);e.style.setProperty('--x0',x+'px');e.style.setProperty('--y0',y+'px');e.style.setProperty('--x1',(x+Math.cos(a)*d).toFixed(0)+'px');e.style.setProperty('--y1',(y+Math.sin(a)*d-20).toFixed(0)+'px');e.style.setProperty('--r',(Math.random()*360-180).toFixed(0)+'deg');document.body.appendChild(e);setTimeout(()=>e.remove(),850)}}
const LEADS=[[7,'7 giorni prima'],[3,'3 giorni prima'],[1,'il giorno prima'],[0,'il giorno stesso']];
function leadsText(){const L=LEADS.filter(([n])=>S.set.leads.includes(n)).map(x=>x[1]);if(!L.length)return'Nessun momento scelto: seleziona almeno un avviso qui sotto.';return`Ti avviso ${L.length>1?L.slice(0,-1).join(', ')+' e '+L[L.length-1]:L[0]} di ogni scadenza della checklist.`}
function applySettings(){const r=document.documentElement,st=S.set;if(st.theme==='auto')delete r.dataset.theme;else r.dataset.theme=st.theme;r.classList.toggle('big',st.text==='l');r.classList.toggle('calm',st.motion===false);
 $('#hello').textContent=st.name&&st.name.trim()?`Labas, ${st.name.trim()}!`:'Labas!';
 const dark=st.theme==='dark'||(st.theme==='auto'&&matchMedia('(prefers-color-scheme: dark)').matches),m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content',dark?'#142b4a':'#ffc21a')}
function settingsUI(){const st=S.set;
 $('#set-name').value=st.name||'';$('#set-uni').value=st.uni||'';$('#dep2').value=S.dep;$('#ret2').value=S.ret;$('#set-goal').value=st.goal;$('#set-start').value=st.start;
 $('#set-motion').checked=st.motion!==false;$('#set-intro').checked=st.intro!==false;$('#set-en').checked=st.en!==false;$('#set-lt').checked=st.lt!==false;
 document.querySelectorAll('.seg').forEach(g=>g.querySelectorAll('button').forEach(b=>{const on=b.dataset.v===st[g.dataset.seg];b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)}));
 $('#leads').innerHTML=LEADS.map(([n,l])=>`<label for="ld-${n}"><input type="checkbox" id="ld-${n}" data-lead="${n}"${st.leads.includes(n)?' checked':''}>${l[0].toUpperCase()+l.slice(1)}</label>`).join('');
 $('#learnN').textContent=`${S.learned.length+S.lt.length} frasi e parole segnate come imparate`;
 $('#verTxt').textContent=`Labas ${VER}`;notifUI();applySettings()}
async function storageInfo(){const e=$('#storage');try{const est=navigator.storage&&navigator.storage.estimate?await navigator.storage.estimate():null,p=navigator.storage&&navigator.storage.persisted?await navigator.storage.persisted():false;
 e.textContent=(est?`Labas usa circa ${((est.usage||0)/1048576).toLocaleString('it-IT',{maximumFractionDigits:1})} MB su questo dispositivo.`:'')+(p?' I dati sono protetti dalla pulizia automatica del browser.':'')}catch(x){e.textContent=''}}
function armed(b,label){if(b.dataset.arm){delete b.dataset.arm;b.textContent=label;b.classList.remove('danger');return true}b.dataset.arm='1';b.textContent='Tocca ancora per confermare';b.classList.add('danger');setTimeout(()=>{if(b.dataset.arm){delete b.dataset.arm;b.textContent=label;b.classList.remove('danger')}},4000);return false}
function doLogin(){if(!SB){toast('Accesso non disponibile ora');return}if(!navigator.onLine){toast('Per accedere serve internet');return}SB.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+location.pathname}}).then(r=>{if(r&&r.error)throw r.error}).catch(()=>toast("Non riesco ad aprire l'accesso, riprova"))}
async function wipeLocal(){try{if(SB&&USER)await SB.auth.signOut()}catch(e){}[KEY,OLD,UPQ].forEach(k=>{try{localStorage.removeItem(k)}catch(e){}});try{indexedDB.deleteDatabase('labas')}catch(e){}location.replace(location.pathname)}
async function wipeCloud(){if(!SB||!USER)return;try{const l=await SB.storage.from(BUCKET).list(USER.id,{limit:1000});if(l.data&&l.data.length){const rr=await SB.storage.from(BUCKET).remove(l.data.map(f=>USER.id+'/'+f.name));if(rr.error)throw rr.error}const d=await SB.from('labas_data').delete().eq('user_id',USER.id);if(d.error)throw d.error;
 clearTimeout(wT);dirty=false;await SB.auth.signOut().catch(()=>{});USER=null;S.acct=null;saveLocal();acctUI();docs();toast("Dati dell'account eliminati: restano su questo telefono")}catch(e){toast('Non riesco a eliminarli ora, riprova')}}
async function checkUpdate(){toast('Cerco aggiornamenti…');try{const r=navigator.serviceWorker&&await navigator.serviceWorker.getRegistration();if(r)await r.update()}catch(e){}setTimeout(()=>location.reload(),700)}
function countUp(){const el=$('#cd'),t=+el.textContent;if(!(t>1)||calm())return;const t0=performance.now(),D=900;const f=n=>{const k=Math.min(1,(n-t0)/D);el.textContent=Math.round(t*(1-(1-k)**3));if(k<1)requestAnimationFrame(f)};el.textContent='0';requestAnimationFrame(f)}
const petalSVG=(cls)=>Array.from({length:14},(_,i)=>`<g transform="rotate(${(i*360/14).toFixed(2)} 100 100)"><ellipse class="${cls}" style="--d:${(i*32)}ms" cx="100" cy="40" rx="17" ry="38" fill="${i%2?'#ff7a1a':'#ff4f9a'}" stroke="#22140a" stroke-width="3.5"/></g>`).join('');
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
window.addEventListener('online',()=>{if(USER){pull();drain()}});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&USER)pull()});
try{if(window.supabase&&window.supabase.createClient)SB=window.supabase.createClient(SB_URL,SB_KEY,{auth:{flowType:'pkce',detectSessionInUrl:true,persistSession:true,autoRefreshToken:true,storageKey:'labas-auth'}})}catch(e){SB=null}
if(SB){SB.auth.onAuthStateChange((ev,session)=>{const u=session&&session.user||null;if((u&&u.id)!==(USER&&USER.id)){USER=u;setTimeout(()=>{acctUI();docs();if(USER){pull();drain()}},0)}else if(u)USER=u;
 if(/[?&]code=/.test(location.search))history.replaceState(null,'',location.pathname+location.hash)})}
if('serviceWorker' in navigator){const had=!!navigator.serviceWorker.controller;let reloaded=false;
 navigator.serviceWorker.addEventListener('controllerchange',()=>{if(had&&!reloaded){reloaded=true;location.reload()}});
 navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).then(r=>{remind();r.update().catch(()=>{});document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')r.update().catch(()=>{})})}).catch(()=>{})}
petals();all();route();acctUI();notifUI();migrateLegacy();remind();intro();
}