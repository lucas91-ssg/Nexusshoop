/* nx-haggle.js v1 — Mol-Bhav AI: el primer regateo asistido por IA del mundo */
(function(){
"use strict";
if(window.__nxHaggle)return;window.__nxHaggle=true;
var URL="https://jtbxqwiyktzjdjohcyli.supabase.co";
var ANON="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0Ynhxd2l5a3R6amRqb2hjeWxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ5MzY5NzIsImV4cCI6MjExMDUxMjk3Mn0.lTQDVQgJqY65_daClS0V7LvO6Kl1Pi7pyGrL5F5j-1U";
var sb=null,me=null,shop=null,inbox=[],mine=[];

var HG={
en:{title:"Mol-Bhav AI",sub:"Haggle with AI — the bazaar comes to you",power:"Your haggling power",offer:"Your offer",send:"Send offer on WhatsApp",inbox:"Haggle inbox",myh:"My haggles",accept:"Accept",counter:"Counter",decline:"Decline",activate:"Activate price",saved:"Total saved haggling",agreed:"Agreed price",valid:"valid until",nooff:"No offers yet",ai:"AI suggests",start:"🤝 Haggle with AI",expired:"expired",pending:"pending",accepted:"accepted",countered:"countered",declined:"declined"},
ur:{title:"مول بھاو AI",sub:"AI کے ساتھ مول بھاو — بازار آپ کے پاس",power:"آپ کی سودے بازی کی طاقت",offer:"آپ کی پیشکش",send:"واٹس ایپ پر پیشکش بھیجیں",inbox:"مول بھاو ان باکس",myh:"میرے سودے",accept:"قبول",counter:"جوابی",decline:"مسترد",activate:"قیمت فعال کریں",saved:"کل بچت",agreed:"طے شدہ قیمت",valid:"قابلِ قبول تا",nooff:"ابھی کوئی پیشکش نہیں",ai:"AI مشورہ",start:"🤝 AI سے مول بھاو",expired:"میعاد ختم",pending:"زیر التوا",accepted:"قبول شدہ",countered:"جوابی",declined:"مسترد"},
sk:{title:"Mol-Bhav AI",sub:"Zjednávajte s AI — bazár prichádza k vám",power:"Vaša sila zjednávania",offer:"Vaša ponuka",send:"Odoslať ponuku cez WhatsApp",inbox:"Ponuky",myh:"Moje ponuky",accept:"Prijať",counter:"Protiponuka",decline:"Odmietnuť",activate:"Aktivovať cenu",saved:"Ušetrené",agreed:"Dohodnutá cena",valid:"platí do",nooff:"Zatiaľ žiadne ponuky",ai:"AI navrhuje",start:"🤝 Zjednávať s AI",expired:"expirované",pending:"čaká",accepted:"prijaté",countered:"protiponuka",declined:"odmietnuté"},
de:{title:"Mol-Bhav AI",sub:"Feilschen mit KI — der Basar kommt zu dir",power:"Deine Verhandlungsstärke",offer:"Dein Angebot",send:"Angebot per WhatsApp",inbox:"Angebote",myh:"Meine Angebote",accept:"Annehmen",counter:"Gegenangebot",decline:"Ablehnen",activate:"Preis aktivieren",saved:"Gespart",agreed:"Vereinbarter Preis",valid:"gültig bis",nooff:"Noch keine Angebote",ai:"KI empfiehlt",start:"🤝 Mit KI feilschen",expired:"abgelaufen",pending:"offen",accepted:"angenommen",countered:"Gegenangebot",declined:"abgelehnt"},
hi:{title:"मोल-भाव AI",sub:"AI से मोल-भाव — बाज़ार आपके पास",power:"आपकी सौदेबाज़ी ताक़त",offer:"आपका प्रस्ताव",send:"WhatsApp पर प्रस्ताव भेजें",inbox:"मोल-भाव इनबॉक्स",myh:"मेरे सौदे",accept:"स्वीकार",counter:"जवाबी",decline:"अस्वीकार",activate:"कीमत सक्रिय करें",saved:"कुल बचत",agreed:"तय कीमत",valid:"मान्य तक",nooff:"अभी कोई प्रस्ताव नहीं",ai:"AI सुझाव",start:"🤝 AI से मोल-भाव",expired:"समाप्त",pending:"लंबित",accepted:"स्वीकृत",countered:"जवाबी",declined:"अस्वीकृत"}
};
function HT(k){return (HG[S.lang]&&HG[S.lang][k])||HG.en[k];}

/* idioma del vendedor por prefijo de WhatsApp */
function langOf(swa){var n=String(swa||"").replace(/\D/g,"");
 if(n.indexOf("92")===0)return "ur";if(n.indexOf("91")===0)return "hi";if(n.indexOf("49")===0)return "de";if(n.indexOf("421")===0)return "sk";return "en";}
var MSG={
ur:function(n,o,c){return "السلام علیکم! میں "+n+" کے لیے Rs "+o+" دینا چاہتا/چاہتی ہوں۔ کوڈ: "+c+" (24 گھنٹے)۔";},
hi:function(n,o,c){return "नमस्ते! मैं "+n+" के लिए Rs "+o+" देना चाहता/चाहती हूँ। कोड: "+c+" (24 घंटे)।";},
de:function(n,o,c){return "Guten Tag! Ich biete Rs "+o+" für "+n+". Code: "+c+" (24h gültig).";},
sk:function(n,o,c){return "Dobrý deň! Ponúkam Rs "+o+" za "+n+". Kód: "+c+" (24h).";},
en:function(n,o,c){return "Salam! I'd like to offer Rs "+o+" for "+n+". Haggle code: "+c+" (valid 24h).";}};

/* poder de regateo: margen + stock + categoría */
function power(p){var base=p.old?Math.round((1-p.price/p.old)*100)*0.5:8;
 base+= (p.stock>15?5:p.stock>8?3:1);
 if(p.cat==="fashion"||p.cat==="electronics")base+=3;
 return Math.max(5,Math.min(28,Math.round(base)));}

/* precio acordado activo → wrap prod() para que cart/checkout lo respeten */
var _prod=window.prod;
window.prod=function(id){var p=_prod(id);if(!p)return p;
 var h=(S.haggles||{})[id];
 if(h&&h.status==="active"&&h.exp>Date.now()){var c=Object.assign({},p);c.price=h.price;c.haggle=h;return c;}
 return p;};

function load(cb){if(window.supabase){cb();return;}var s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";s.onload=cb;document.head.appendChild(s);}
load(function(){sb=window.supabase.createClient(URL,ANON,{auth:{persistSession:true}});refresh();});
async function refresh(){if(!sb)return;
 var ses=(await sb.auth.getSession()).data.session;me=ses?ses.user.id:null;shop=null;inbox=[];mine=[];
 if(me){var sh=await sb.from("nx_shops").select("*").eq("owner_id",me).limit(1);shop=(sh.data||[])[0]||null;
  if(shop){var i=await sb.from("nx_haggles").select("*").eq("seller_wa",shop.wa).order("created_at",{ascending:false}).limit(30);inbox=i.data||[];}
  var m=await sb.from("nx_haggles").select("*").eq("buyer_id",me).order("created_at",{ascending:false}).limit(30);mine=m.data||[];}
 inject();}
window.nxHaggleRefresh=refresh;

/* CSS */
var css=document.createElement("style");css.textContent=
".nxhCard{border-color:var(--grn3);background:linear-gradient(135deg,var(--sf),var(--mint) 160%)}"+
".nxhPow{height:10px;background:var(--ln);border-radius:99px;overflow:hidden;margin:8px 0}"+
".nxhPow i{display:block;height:100%;background:linear-gradient(90deg,var(--grn3),var(--gold));border-radius:99px}"+
"#nxhModal{position:fixed;inset:0;background:rgba(38,34,27,.55);z-index:170;display:flex;align-items:center;justify-content:center;padding:16px}"+
"#nxhModal .box{background:var(--sf);border-radius:22px;padding:20px;max-width:420px;width:100%;box-shadow:var(--sh)}"+
"#nxhModal input[type=range]{width:100%;accent-color:var(--grn)}"+
"#nxhModal .prev{background:var(--sf2);border:1px dashed var(--ln);border-radius:12px;padding:10px;font-size:12px;color:var(--ink2);white-space:pre-line;margin:10px 0}"+
".nxhRow{display:flex;gap:8px;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--ln)}"+
".nxhRow:last-child{border-bottom:none}"+
".nxhBadge{display:inline-block;border-radius:999px;padding:3px 10px;font-size:11px;font-weight:800;background:var(--goldbg);color:var(--gold);border:1px solid var(--gold)}"+
".nxhBadge.on{background:var(--mint);color:var(--grn);border-color:var(--grn3)}";
document.head.appendChild(css);

/* modal de regateo */
function openHaggle(p){
 var pw=power(p);var min=Math.round(p.price*(1-pw/100)/10)*10;var offer=p.price;
 var code="HB-"+Math.random().toString(36).slice(2,7).toUpperCase();
 var sl=langOf(p.swa);
 var old=document.getElementById("nxhModal");if(old)old.remove();
 var m=document.createElement("div");m.id="nxhModal";
 m.innerHTML='<div class="box"><b>🤝 '+HT("title")+'</b><div class="mut" style="font-size:12px">'+HT("sub")+'</div>'+
  '<div style="margin:12px 0 4px;font-size:12px;color:var(--mut)">'+HT("power")+': <b style="color:var(--grn)">'+pw+'%</b></div>'+
  '<div class="nxhPow"><i style="width:'+pw*3.5+'%"></i></div>'+
  '<div style="margin:10px 0 4px;font-size:12px;color:var(--mut)">'+HT("offer")+': <b class="pr" id="nxhOff">'+money(offer)+'</b> <span class="fnt" id="nxhDisc"></span></div>'+
  '<input type="range" id="nxhRange" min="'+min+'" max="'+p.price+'" step="10" value="'+offer+'">'+
  '<div class="prev" id="nxhPrev"></div>'+
  '<button class="btn wa" style="width:100%" id="nxhSend">💬 '+HT("send")+'</button>'+
  '<button class="btn gh" style="width:100%;margin-top:8px" id="nxhClose">✕</button></div>';
 document.body.appendChild(m);
 function paint(){offer=+document.getElementById("nxhRange").value;
  document.getElementById("nxhOff").textContent=money(offer);
  var d=Math.round((1-offer/p.price)*100);document.getElementById("nxhDisc").textContent=d>0?("−"+d+"%"):"";
  document.getElementById("nxhPrev").textContent=(MSG[sl]||MSG.en)(pn(p),offer.toLocaleString("en-US"),code);}
 m.querySelector("#nxhRange").addEventListener("input",paint);paint();
 m.querySelector("#nxhClose").onclick=function(){m.remove();};
 m.addEventListener("click",function(e){if(e.target===m)m.remove();});
 m.querySelector("#nxhSend").onclick=function(){
  wa(p.swa,(MSG[sl]||MSG.en)(pn(p),offer.toLocaleString("en-US"),code));
  if(me){sb.from("nx_haggles").insert({product_id:p.id,product_name:pn(p),buyer_id:me,buyer_name:S.profile.name||"",buyer_wa:S.profile.wa||"",seller_wa:p.swa,seller_name:p.seller,list_price:p.price,offer:offer,power:pw,code:code,status:"pending"}).then(function(){refresh();});}
  S.hagPending=S.hagPending||{};S.hagPending[p.id]={offer:offer,code:code,pw:pw,list:p.price};save();
  m.remove();toast("🤝 "+HT("pending")+" · "+code);};
}

/* inyecciones */
function inject(){
 var v=document.querySelector("main .view");if(!v)return;
 if(S.view==="detail"){var p=_prod(S.pid);if(p&&!v.querySelector("[data-nxh]")){
  var h=(S.haggles||{})[p.id];var active=h&&h.status==="active"&&h.exp>Date.now();
  var card=document.createElement("div");card.className="card nxhCard";card.setAttribute("data-nxh","1");
  card.innerHTML='<div class="sl"><b>🤝 '+HT("title")+'</b>'+(active?'<span class="nxhBadge on">'+HT("agreed")+': '+money(h.price)+'</span>':'')+'</div>'+
   '<p class="mut" style="font-size:12px;margin:4px 0 10px">'+HT("sub")+'.</p>'+
   (active?'<div class="fnt">⏳ '+HT("valid")+' '+new Date(h.exp).toLocaleString()+'</div>':
   '<button class="btn grn" data-nxhopen="'+p.id+'">'+HT("start")+'</button>');
  var bulk=v.querySelector('[style*="border-color:var(--grn3)"]');if(bulk)bulk.insertAdjacentElement("beforebegin",card);else v.appendChild(card);
 }}
 if(S.view==="seller"&&shop&&!v.querySelector("[data-nxhinbox]")){
  var box=document.createElement("div");box.className="card";box.setAttribute("data-nxhinbox","1");
  var rows=inbox.filter(function(o){return o.status==="pending"||o.status==="countered";}).map(function(o){
   var sug=o.offer>=o.list_price*(1-(o.power*0.5)/100)?HT("accept"):HT("counter")+" "+money(Math.round(o.list_price*(1-(o.power*0.35)/100)/10)*10);
   return '<div class="nxhRow"><div><b>'+esc(o.product_name||o.product_id)+'</b><div class="pr">'+money(o.offer)+' <s class="old">'+money(o.list_price)+'</s></div><div class="fnt">'+esc(o.buyer_name||"")+' · '+o.code+'</div></div>'+
    '<div class="row"><span class="fnt">🤖 '+HT("ai")+': '+sug+'</span>'+
    '<button class="btn grn sm" data-nxhacc="'+o.id+'">✓</button><button class="btn gold sm" data-nxhcnt="'+o.id+'">↩</button><button class="btn red sm" data-nxhdec="'+o.id+'">✕</button></div></div>';}).join("");
  box.innerHTML='<b>🤝 '+HT("inbox")+'</b><div class="mut" style="margin:4px 0">'+inbox.length+'</div>'+(rows||'<div class="empty">'+HT("nooff")+'</div>');
  v.appendChild(box);}
 if(S.view==="account"&&!v.querySelector("[data-nxhmy]")){
  var saved=S.haggleSaved||0;
  var my=mine.map(function(o){var act=(S.haggles||{})[o.product_id];
   return '<div class="nxhRow"><div><b>'+esc(o.product_name||o.product_id)+'</b><div class="pr">'+money(o.offer)+' <s class="old">'+money(o.list_price)+'</s></div><span class="nxhBadge'+(o.status==="accepted"?" on":"")+'">'+HT(o.status)||o.status+'</span></div>'+
    (o.status==="accepted"&&!act?'<button class="btn grn sm" data-nxhact="'+o.id+'" data-pid="'+o.product_id+'" data-price="'+o.offer+'" data-code="'+o.code+'" data-list="'+o.list_price+'">'+HT("activate")+'</button>':'')+'</div>';}).join("");
  var c=document.createElement("div");c.className="card";c.setAttribute("data-nxhmy","1");
  c.innerHTML='<div class="sl"><b>🤝 '+HT("myh")+'</b><span class="nxhBadge on">'+HT("saved")+': '+money(saved)+'</span></div>'+(my||'<div class="empty">'+HT("nooff")+'</div>');
  v.appendChild(c);}
}

/* acciones */
document.addEventListener("click",function(e){
 var op=e.target.closest("[data-nxhopen]");if(op){var p=_prod(op.dataset.nxhopen);if(p)openHaggle(p);return;}
 var ac=e.target.closest("[data-nxhacc]");if(ac){var id=ac.dataset.nxhacc;var o=inbox.find(function(x){return x.id===id;});
  sb.from("nx_haggles").update({status:"accepted",code:o.code,exp:new Date(Date.now()+86400000).toISOString()}).eq("id",id).then(function(){toast("✓ "+HT("accepted"));refresh();});return;}
 var cn=e.target.closest("[data-nxhcnt]");if(cn){var cid=cn.dataset.nxhcnt;var co=inbox.find(function(x){return x.id===cid;});
  var val=prompt(HT("counter")+" ("+money(co.list_price)+" max):",Math.round(co.list_price*0.9/10)*10);if(val===null)return;
  sb.from("nx_haggles").update({status:"countered",counter:Number(val)}).eq("id",cid).then(function(){toast("↩ "+HT("countered"));refresh();});return;}
 var dc=e.target.closest("[data-nxhdec]");if(dc){sb.from("nx_haggles").update({status:"declined"}).eq("id",dc.dataset.nxhdec).then(function(){toast("✕");refresh();});return;}
 var act=e.target.closest("[data-nxhact]");if(act){var pid=act.dataset.pid,price=+act.dataset.price,list=+act.dataset.list,code=act.dataset.code;
  S.haggles=S.haggles||{};S.haggles[pid]={price:price,code:code,exp:Date.now()+86400000,status:"active",list:list};
  S.haggleSaved=(S.haggleSaved||0)+(list-price);save();sb.from("nx_haggles").update({status:"accepted"}).eq("id",act.dataset.nxhact);
  toast("🤝 "+HT("agreed")+": "+money(price));render();return;}
},true);

var _r=window.render;window.render=function(){var o=_r.apply(this,arguments);setTimeout(inject,160);return o;};
setTimeout(refresh,900);
})();
