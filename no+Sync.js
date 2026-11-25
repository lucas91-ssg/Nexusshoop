/* nx-sync.js v2 — sincroniza catálogo + pedidos con Supabase (comprador ↔ vendedor) */
(function(){
"use strict";
if(window.__nxSync)return;window.__nxSync=true;
var URL="https://jtbxqwiyktzjdjohcyli.supabase.co";
var ANON="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0Ynhxd2l5a3R6amRqb2hjeWxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ5MzY5NzIsImV4cCI6MjExMDUxMjk3Mn0.lTQDVQgJqY65_daClS0V7LvO6Kl1Pi7pyGrL5F5j-1U";
var sb=null,me=null,shop=null,remote=[],myOrders=[];

var TR={
 en:{panel:"Orders received",empty:"No orders yet",stUpd:"Order status updated",waHi:"Hello! About my order",syncOn:"Synced with server"},
 ur:{panel:"موصولہ آرڈرز",empty:"ابھی کوئی آرڈر نہیں",stUpd:"آرڈر کی حالت اپ ڈیٹ ہو گئی",waHi:"السلام علیکم! میرے آرڈر کے بارے میں",syncOn:"سرور سے مطابقت"},
 sk:{panel:"Prijaté objednávky",empty:"Zatiaľ žiadne objednávky",stUpd:"Stav objednávky aktualizovaný",waHi:"Dobrý deň! Ohľadom objednávky",syncOn:"Synchronizované"},
 de:{panel:"Erhaltene Bestellungen",empty:"Noch keine Bestellungen",stUpd:"Bestellstatus aktualisiert",waHi:"Hallo! Wegen meiner Bestellung",syncOn:"Synchronisiert"},
 hi:{panel:"प्राप्त ऑर्डर",empty:"अभी कोई ऑर्डर नहीं",stUpd:"ऑर्डर स्थिति अपडेट",waHi:"नमस्ते! मेरे ऑर्डर के बारे में",syncOn:"सिंक हो गया"}
};
function T(k){return (TR[S.lang]&&TR[S.lang][k])||TR.en[k];}

function load(cb){if(window.supabase){cb();return;}var s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";s.onload=cb;document.head.appendChild(s);}
load(function(){sb=window.supabase.createClient(URL,ANON,{auth:{persistSession:true}});refresh();});

/* ---- catálogo remoto mezclado al catálogo público ---- */
var _prods=window.prods;
window.prods=function(){
 var base=_prods.apply(this,arguments);
 var rids={};(S.listings||[]).forEach(function(l){if(l.rid)rids[l.rid]=1;});
 var extra=remote.filter(function(r){return !rids[r.id];}).map(function(r){
  return {id:"r"+r.id,seller:r.seller,swa:r.swa,city:r.city||"",cat:r.cat||"fashion",
   price:r.price,old:r.old_price||0,stock:r.stock||0,img:r.img||"",
   name:r.name,desc:r.descr||{},rev:[],remote:true};});
 return base.concat(extra);
};

/* ---- refresh general ---- */
async function refresh(){
 if(!sb)return;
 var ses=(await sb.auth.getSession()).data.session;
 me=ses?ses.user.id:null;shop=null;myOrders=[];remote=[];
 var rl=await sb.from("nx_listings").select("*").eq("active",true).order("created_at",{ascending:false}).limit(200);
 remote=rl.data||[];
 var changed=false;
 if(me){
  var sh=await sb.from("nx_shops").select("*").eq("owner_id",me).limit(1);
  shop=(sh.data||[])[0]||null;
  if(shop){
   var mo=await sb.from("nx_orders").select("*").eq("seller_wa",shop.wa).order("created_at",{ascending:false}).limit(50);
   myOrders=mo.data||[];
   var bo=await sb.from("nx_orders").select("code,status,trk").eq("buyer_id",me).limit(100);
   var map={};(bo.data||[]).forEach(function(o){map[o.code]=o;});
   (S.orders||[]).forEach(function(o){var r=map[o.code];
    if(r&&(r.status!==o.status||(r.trk||null)!==(o.trk||null))){o.status=r.status;if(r.trk)o.trk=r.trk;changed=true;}});
   if(changed)save();
  }
 }
 inject();
 if(changed)render();
}
window.nxSyncRefresh=refresh;

/* ---- escritura: catálogo ---- */
function upsertListing(l){
 if(!me||!shop)return Promise.resolve();
 var row={shop_id:shop.id,owner_id:me,seller:shop.name,swa:shop.wa,city:shop.city,
  cat:l.cat,price:l.price,old_price:l.old||null,stock:l.stock,img:l.img||null,
  name:l.name,descr:l.desc,active:l.active!==false};
 if(l.rid)return sb.from("nx_listings").update(row).eq("id",l.rid);
 return sb.from("nx_listings").insert(row).select().then(function(r){
  if(r.data&&r.data[0]){l.rid=r.data[0].id;save();}});
}
function syncAllListings(){if(!me||!shop)return;(S.listings||[]).forEach(function(l){upsertListing(l);});}
function deleteListing(rid){if(!rid||!me)return;sb.from("nx_listings").delete().eq("id",rid);}

/* ---- escritura: pedidos ---- */
function pushOrder(o){
 if(!me||!o||o.rid)return;
 sb.from("nx_orders").insert({code:o.code,buyer_id:me,buyer_name:S.profile.name||"",buyer_wa:S.profile.wa||"",
  seller_name:o.seller,seller_wa:o.swa,items:o.items,total:o.total,status:o.status,courier:o.courier||null})
 .then(function(r){if(!r.error){o.rid=true;save();}});
}
function setStatus(code,status){return sb.from("nx_orders").update({status:status}).eq("code",code);}

/* ---- hooks de clicks (capture, sin tocar index.html) ---- */
document.addEventListener("click",function(e){
 var sx=e.target.closest("[data-nxs]");
 if(sx){setStatus(sx.dataset.nxsCode,sx.dataset.nxs).then(function(){toast(T("stUpd"));refresh();});return;}
 var wab=e.target.closest("[data-nxswa]");
 if(wab){wa(wab.dataset.nxswa,T("waHi")+" "+wab.dataset.nxscode);return;}
 var a=e.target.closest("[data-a]");if(!a)return;var act=a.dataset.a;
 if(act==="mpSave"){setTimeout(function(){syncAllListings();refresh();},80);}
 if(act==="lsDel"){var id=a.dataset.id;var l=(S.listings||[]).find(function(x){return x.id===id;});var rid=l&&l.rid;if(rid)deleteListing(rid);}
 if(act==="lsPause"||act==="lsStock"){setTimeout(function(){syncAllListings();refresh();},80);}
 if(act==="checkout"||act==="waSeller"){setTimeout(function(){
   var list=(S.lastOrders&&S.lastOrders.length)?S.lastOrders:[S.orders[0]];
   (list||[]).forEach(function(o){pushOrder(o);});refresh();},100);}
 if(act==="receipt"){setStatus(a.dataset.id,"delivered");}
},true);

/* ---- panel de pedidos del vendedor ---- */
function panelHTML(){
 var rows=myOrders.map(function(o){
  var btns="";
  if(o.status==="placed")btns+='<button class="btn gh sm" data-nxs="confirmed" data-nxs-code="'+o.code+'">✓</button>';
  if(o.status==="confirmed")btns+='<button class="btn gh sm" data-nxs="shipped" data-nxs-code="'+o.code+'">🚚</button>';
  if(o.status==="shipped")btns+='<button class="btn grn sm" data-nxs="delivered" data-nxs-code="'+o.code+'">✅</button>';
  if(o.buyer_wa)btns+='<button class="btn wa sm" data-nxswa="'+o.buyer_wa+'" data-nxscode="'+o.code+'">💬</button>';
  return '<div class="lrow"><div class="gw"><b>'+esc(o.code)+'</b> · '+esc(o.buyer_name||"Buyer")+
   '<div class="pr">'+money(o.total)+'</div><span class="st '+o.status+'">'+o.status+'</span></div>'+
   '<div class="row">'+btns+'</div></div>';}).join("");
 return '<div class="card" style="border-color:var(--grn3)"><div class="sl"><b>📥 '+T("panel")+
  '</b><span class="st delivered">'+T("syncOn")+'</span></div><div class="mut" style="margin:4px 0">'+myOrders.length+'</div>'+
  (rows||'<div class="empty">'+T("empty")+'</div>')+'</div>';
}
function inject(){
 var old=document.querySelector("[data-nxsync]");
 if(S.view!=="seller"||!shop){if(old)old.remove();return;}
 var v=document.querySelector("main .view");if(!v)return;
 var box=v.querySelector("[data-nxsync]");
 if(!box){box=document.createElement("div");box.setAttribute("data-nxsync","1");v.appendChild(box);}
 box.innerHTML=panelHTML();
}
var _r=window.render;window.render=function(){var o=_r.apply(this,arguments);setTimeout(inject,150);return o;};
setTimeout(refresh,900);
})();
