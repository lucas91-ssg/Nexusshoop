/* nx-pro.js v1 — UX nivel Daraz (y mejor): descubrimiento, prueba social, profundidad y conversión */
(function(){
"use strict";
if(window.__nxPro)return;window.__nxPro=true;

/* ===== Campaña configurable (poné nombre y fecha real; si pasó, no se muestra) ===== */
var CAMPAIGN={name:"Blessed Friday Sale",days:3}; /* days = duración desde primera vista */

var TREND={en:["wireless earbuds","lawn suit","attar oud","smart watch","basmati rice","running shoes"],
ur:["وائرلیس ایئربڈز","لان سوٹ","عطر عود","اسمارٹ واچ","باسمتی چاول","رننگ شوز"],
sk:["bezdrôtové slúchadlá","lawn oblek","oud parfum","smart hodinky","basmati ryža"],
de:["kabellose ohrhörer","lawn set","oud parfüm","smartwatch","basmati reis","laufschuhe"],
hi:["वायरलेस ईयरबड्स","लॉन सूट","इत्र","स्मार्ट वॉच","बासमती चावल","रनिंग शूज़"]};

var css=document.createElement("style");css.textContent=
/* sugerencias de búsqueda */
"#nxSug{position:fixed;top:104px;left:0;right:0;z-index:70;max-width:1100px;margin:0 auto;padding:0 14px;display:none}"+
"#nxSug.on{display:block}"+
"#nxSug .box{background:var(--sf);border:1px solid var(--ln);border-radius:14px;box-shadow:var(--sh);overflow:hidden;max-height:300px;overflow-y:auto}"+
"#nxSug .it{display:flex;gap:10px;align-items:center;padding:10px 12px;border-bottom:1px solid var(--ln);cursor:pointer}"+
"#nxSug .it:last-child{border-bottom:none}"+
"#nxSug .it img{width:36px;height:36px;border-radius:8px;object-fit:cover;background:var(--bg2)}"+
"#nxSug .it b{font-size:13px;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"+
"#nxSug .it .pr{font-size:12px}"+
"#nxSug .hd{padding:8px 12px;font-size:11px;color:var(--mut);background:var(--sf2);font-weight:700}"+
/* flash sale rail */
".nxFlash{border:1px solid var(--red);border-radius:18px;padding:12px;margin:14px 0;background:linear-gradient(135deg,#fff5f5,#fff)}"+
".nxFlash .fh{display:flex;align-items:center;gap:8px;margin-bottom:10px}"+
".nxFlash .fh b{font-size:16px;color:var(--red);font-family:Georgia,serif}"+
".nxFlash .cd{margin-inline-start:auto;background:var(--red);color:#fff;border-radius:8px;padding:3px 8px;font-size:12px;font-weight:800;font-variant-numeric:tabular-nums}"+
".nxFS{display:flex;gap:10px;overflow-x:auto;padding-bottom:6px}"+
".nxFS .fc{flex:0 0 140px;background:var(--sf);border:1px solid var(--ln);border-radius:14px;overflow:hidden;cursor:pointer}"+
".nxFS .fc img{height:100px;width:100%;object-fit:cover;background:var(--bg2)}"+
".nxFS .fc .b{padding:8px}"+
".nxFS .save{position:absolute;top:6px;inset-inline-start:6px;background:var(--red);color:#fff;font-size:10px;font-weight:800;border-radius:6px;padding:2px 6px}"+
".nxSold{height:14px;background:#ffd6d6;border-radius:99px;overflow:hidden;position:relative;margin-top:6px}"+
".nxSold i{display:block;height:100%;background:linear-gradient(90deg,#f43f5e,var(--red));border-radius:99px}"+
".nxSold span{position:absolute;inset:0;font-size:9px;font-weight:800;color:#7f1d1d;display:flex;align-items:center;justify-content:center}"+
/* campaña */
".nxCamp{position:relative;border-radius:18px;overflow:hidden;margin:14px 0;padding:20px;color:#fff;background:linear-gradient(120deg,#7c2d12,#be123c 50%,#7c2d12);box-shadow:0 10px 30px rgba(190,18,60,.3);text-align:center}"+
".nxCamp b{font-family:Georgia,serif;font-size:20px;display:block}"+
".nxCamp .cd{display:inline-flex;gap:6px;margin-top:10px}"+
".nxCamp .cd span{background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.3);border-radius:8px;padding:5px 9px;font-weight:800;font-variant-numeric:tabular-nums}"+
/* tabs detalle */
"#nxTabs{position:sticky;top:96px;z-index:45;display:flex;gap:6px;overflow-x:auto;background:linear-gradient(var(--bg) 82%,transparent);padding:8px 0;margin-bottom:8px}"+
"#nxTabs button{flex:none;border:1px solid var(--ln);background:var(--sf);border-radius:999px;padding:7px 14px;font-size:12.5px;font-weight:700;color:var(--ink2)}"+
"#nxTabs button.on{background:var(--grn);color:#fff;border-color:var(--grn)}"+
/* seller metrics */
".nxSeller{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:10px 0}"+
".nxSeller .m{background:var(--sf2);border:1px solid var(--ln);border-radius:12px;padding:8px;text-align:center}"+
".nxSeller .m b{display:block;font-family:Georgia,serif;font-size:16px;color:var(--grn)}"+
".nxSeller .m span{font-size:10px;color:var(--mut)}"+
/* action bar */
"#nxBar{position:fixed;left:0;right:0;bottom:0;z-index:65;display:none;background:var(--sf);border-top:1px solid var(--ln);padding:8px 10px calc(8px + env(safe-area-inset-bottom));gap:8px}"+
"body[data-view=detail] #nxBar{display:flex}"+
"body[data-view=detail] nav{display:none}"+
"body[data-view=detail] #nxInstallPill{display:none}"+
"body[data-view=detail] #raahFab{bottom:74px}"+
"#nxBar button{border-radius:12px;padding:13px 10px;font-weight:800;font-size:13px;flex:1}"+
"#nxBar .ask{background:var(--sf2);border:1px solid var(--ln);color:var(--ink2);flex:0 0 64px}"+
"#nxBar .add{background:var(--grn);color:#fff}"+
"#nxBar .buy{background:var(--ink);color:var(--sf)}";
document.head.appendChild(css);

/* ===== helpers ===== */
function soldOf(id){var h=0;for(var i=0;i<id.length;i++){h=(h*31+id.charCodeAt(i))>>>0;}return 20+(h%180);}
function pad(n){return (n<10?"0":"")+n;}
function cdTo(ts){var d=Math.max(0,ts-Date.now());var s=Math.floor(d/1000);return pad(Math.floor(s/3600))+":"+pad(Math.floor(s%3600/60))+":"+pad(s%60);}
function endOfDay(){var n=new Date();n.setHours(23,59,59,999);return n.getTime();}
function campEnd(){var e=+localStorage.getItem("nx_camp_end");if(!e||e<Date.now()){e=Date.now()+CAMPAIGN.days*86400000;localStorage.setItem("nx_camp_end",String(e));}return e;}
function L(){return S.lang;}

/* ===== barra de acción fija (detalle) ===== */
var bar=document.createElement("div");bar.id="nxBar";
bar.innerHTML='<button class="ask" data-nxp="ask">💬</button><button class="add" data-nxp="add">🛍 Add</button><button class="buy" data-nxp="buy">⚡ Buy Now</button>';
document.body.appendChild(bar);
bar.addEventListener("click",function(e){var b=e.target.closest("[data-nxp]");if(!b)return;var p=prod(S.pid);if(!p)return;
 if(b.dataset.nxp==="ask")wa(p.swa,t("waHello")+" "+pn(p));
 if(b.dataset.nxp==="add")addCart(S.pid,1);
 if(b.dataset.nxp==="buy"){addCart(S.pid,S.qty||1);S.view="cart";save();render();}});

/* ===== sugerencias de búsqueda ===== */
var sug=document.createElement("div");sug.id="nxSug";document.body.appendChild(sug);
function histGet(){try{return JSON.parse(localStorage.getItem("nx_search_hist")||"[]");}catch(e){return[];}}
function histPush(q){if(!q)return;var h=histGet().filter(function(x){return x!==q;});h.unshift(q);localStorage.setItem("nx_search_hist",JSON.stringify(h.slice(0,6)));}
function showSug(list,title){if(!list.length){sug.classList.remove("on");return;}
 sug.innerHTML='<div class="box"><div class="hd">'+title+"</div>"+list.map(function(p){return '<div class="it" data-nxopen="'+p.id+'"><img src="'+p.img+'" onerror="this.style.visibility=\'hidden\'"><b>'+esc(pn(p))+'</b><span class="pr">'+money(p.price)+"</span></div>";}).join("")+"</div>";
 sug.classList.add("on");}
function showHist(){var h=histGet();var tr=(TREND[L()]||TREND.en);
 if(!h.length&&!tr.length){sug.classList.remove("on");return;}
 var html='<div class="box">';
 if(h.length)html+='<div class="hd">🕘 History</div>'+h.map(function(q){return '<div class="it" data-nxq="'+esc(q)+'"><b>🔎 '+esc(q)+"</b></div>";}).join("");
 html+='<div class="hd">🔥 Trending</div>'+tr.slice(0,4).map(function(q){return '<div class="it" data-nxq="'+esc(q)+'"><b>↗ '+esc(q)+"</b></div>";}).join("")+"</div>";
 sug.innerHTML=html;sug.classList.add("on");}
document.addEventListener("input",function(e){if(e.target.id!=="search")return;var q=e.target.value.trim();
 if(q.length<2){showHist();return;}
 var m=prods().filter(function(p){return (pn(p)+" "+p.seller+" "+pd(p)).toLowerCase().indexOf(q.toLowerCase())>=0;}).slice(0,6);
 showSug(m,"Results");});
document.addEventListener("focusin",function(e){if(e.target.id==="search"&&!e.target.value.trim())showHist();});
document.addEventListener("focusout",function(){setTimeout(function(){sug.classList.remove("on");},180);});
document.addEventListener("keydown",function(e){if(e.target.id==="search"&&e.key==="Enter")histPush(e.target.value.trim());});
sug.addEventListener("click",function(e){
 var o=e.target.closest("[data-nxopen]");if(o){histPush(pn(prod(o.dataset.nxopen))||"");S.pid=o.dataset.nxopen;S.view="detail";save();render();sug.classList.remove("on");return;}
 var q=e.target.closest("[data-nxq]");if(q){var inp=document.getElementById("search");if(inp){inp.value=q.dataset.nxq;S.search=q.dataset.nxq;histPush(q.dataset.nxq);save();render();}sug.classList.remove("on");}});
/* placeholder rotativo */
setInterval(function(){var inp=document.getElementById("search");if(!inp||document.activeElement===inp||inp.value)return;var tr=TREND[L()]||TREND.en;inp.placeholder="🔍 "+tr[Math.floor(Math.random()*tr.length)];},3000);

/* ===== inyecciones por vista ===== */
function inject(){
 document.body.dataset.view=S.view;
 var v=document.querySelector("main .view");if(!v)return;
 if(S.view==="home"){
  if(!v.querySelector(".nxFlash")){
   var deals=prods().filter(function(p){return p.old;}).sort(function(a,b){return (1-b.price/b.old)-(1-a.price/a.old);}).slice(0,6);
   if(deals.length){
    var rail=document.createElement("div");rail.className="nxFlash";
    rail.innerHTML='<div class="fh">⚡ <b>Flash Sale</b><span class="cd" data-nxcd="'+endOfDay()+'">'+cdTo(endOfDay())+"</span></div>"+
     '<div class="nxFS">'+deals.map(function(p){var off=Math.round((1-p.price/p.old)*100);var sold=soldOf(p.id);var tot=sold+p.stock;
      return '<div class="fc" data-nxopen="'+p.id+'" style="position:relative"><span class="save">-'+off+'%</span><img src="'+p.img+'" onerror="this.style.visibility=\'hidden\'"><div class="b"><div style="font-size:11px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+esc(pn(p))+'</div><div class="pr" style="font-size:12px">'+money(p.price)+'</div><div class="nxSold"><i style="width:'+Math.round(sold/tot*100)+'%"></i><span>🔥 '+sold+" sold</span></div></div></div>";}).join("")+"</div>";
    var live=v.querySelector(".live");if(live)live.insertAdjacentElement("afterend",rail);else v.prepend(rail);
   }
  }
  if(!v.querySelector(".nxCamp")&&campEnd()>Date.now()){
   var c=document.createElement("div");c.className="nxCamp";
   c.innerHTML="<b>🎉 "+esc(CAMPAIGN.name)+"</b><span style=\"font-size:12px;opacity:.9\">Up to 70% off · limited time</span>"+
    '<div class="cd"><span data-nxcd="'+campEnd()+'">'+cdTo(campEnd())+"</span></div>";
   var fs=v.querySelector(".nxFlash");if(fs)fs.insertAdjacentElement("afterend",c);else v.prepend(c);
  }
 }
 if(S.view==="detail"){
  var p=prod(S.pid);if(!p)return;
  /* tabs */
  if(!v.querySelector("#nxTabs")){
   var tabs=document.createElement("div");tabs.id="nxTabs";
   tabs.innerHTML=["Overview","Reviews","Details","Similar"].map(function(x,i){return '<button data-nxtab="'+i+'" class="'+(i===0?"on":"")+'">'+x+"</button>";}).join("");
   v.prepend(tabs);
  }
  /* seller metrics + follow + similar al final */
  if(!v.querySelector("[data-nxseller]")){
   var same=prods().filter(function(x){return x.seller===p.seller;});
   var rr=same.map(function(x){return rating(x);}).filter(Boolean);
   var avg=rr.length?(rr.reduce(function(a,b){return a+Number(b);},0)/rr.length).toFixed(1):"—";
   var revCount=same.reduce(function(a,x){return a+revs(x).length;},0);
   var fol=(S.follows||[]).indexOf(p.seller)>=0;
   var box=document.createElement("div");box.className="card";box.setAttribute("data-nxseller","1");
   box.innerHTML='<div class="sl"><b>🏪 '+esc(p.seller)+'</b><button class="btn '+(fol?"gh":"grn")+' sm" data-nxfollow="'+esc(p.seller)+'">'+(fol?"✓ Following":"+ Follow")+'</button></div>'+
    '<div class="nxSeller"><div class="m"><b>'+avg+'</b><span>★ rating</span></div><div class="m"><b>'+same.length+'</b><span>products</span></div><div class="m"><b>'+revCount+'</b><span>reviews</span></div></div>'+
    '<div class="mut" style="font-size:12px">'+esc(p.city)+" · "+esc(MK[S.market].flag)+"</div>";
   v.appendChild(box);
   /* similar */
   var sim=prods().filter(function(x){return x.cat===p.cat&&x.id!==p.id;}).slice(0,6);
   if(sim.length){var s2=document.createElement("div");s2.id="nxSim";
    s2.innerHTML='<h2 class="sec">💡 You may also like</h2><div class="nxFS">'+sim.map(function(x){return '<div class="fc" data-nxopen="'+x.id+'"><img src="'+x.img+'" onerror="this.style.visibility=\'hidden\'"><div class="b"><div style="font-size:11px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+esc(pn(x))+'</div><div class="pr" style="font-size:12px">'+money(x.price)+"</div></div></div>";}).join("")+"</div>";
    v.appendChild(s2);}
  }
 }
 if(S.view==="account"&&(S.follows||[]).length&&!v.querySelector("[data-nxfollowcard]")){
  var fc=document.createElement("div");fc.className="card";fc.setAttribute("data-nxfollowcard","1");
  fc.innerHTML="<b>🏪 Followed stores</b>"+S.follows.map(function(s){return '<div class="sl" style="padding:8px 0;border-bottom:1px solid var(--ln)"><span>'+esc(s)+'</span><button class="btn gh sm" data-nxstore="'+esc(s)+'">View</button></div>';}).join("");
  v.appendChild(fc);
 }
}
/* tabs scroll */
document.addEventListener("click",function(e){
 var tb=e.target.closest("[data-nxtab]");if(tb){var i=+tb.dataset.nxtab;var v=document.querySelector("main .view");
  document.querySelectorAll("#nxTabs button").forEach(function(b){b.classList.remove("on");});tb.classList.add("on");
  var target=null;
  if(i===0)target=v.querySelector(".det")||v;
  if(i===1){var hs=v.querySelectorAll("h2.sec");hs.forEach(function(h){if(h.textContent.indexOf(t("reviews"))>=0)target=h;});}
  if(i===2){var hs2=v.querySelectorAll("h2.sec");hs2.forEach(function(h){if(h.textContent.indexOf(t("description"))>=0)target=h;});}
  if(i===3)target=document.getElementById("nxSim");
  if(target)target.scrollIntoView({behavior:"smooth",block:"start"});return;}
 var fo=e.target.closest("[data-nxfollow]");if(fo){var s=fo.dataset.nxfollow;S.follows=S.follows||[];var ix=S.follows.indexOf(s);if(ix>=0)S.follows.splice(ix,1);else S.follows.push(s);save();render();return;}
 var st=e.target.closest("[data-nxstore]");if(st){S.search=st.dataset.nxstore;S.view="home";save();render();return;}
 var op=e.target.closest("[data-nxopen]");if(op){S.pid=op.dataset.nxopen;S.qty=1;S.view="detail";var pp=prod(S.pid);if(pp){S.hist.unshift({id:pp.id,cat:pp.cat});S.hist=S.hist.slice(0,60);}save();render();window.scrollTo(0,0);return;}
});
/* countdown tick */
setInterval(function(){document.querySelectorAll("[data-nxcd]").forEach(function(el){el.textContent=cdTo(+el.dataset.nxcd);});},1000);
var _r=window.render;window.render=function(){var o=_r.apply(this,arguments);setTimeout(inject,150);return o;};
setTimeout(inject,350);
})();
