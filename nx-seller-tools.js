/* nx-seller-tools.js v2 — upload fotos/videos, analytics, moderación, offline, multi-dispositivo */
(function(){
"use strict";
if(window.__nxSeller)return;window.__nxSeller=true;
var URL="https://jtbxqwiyktzjdjohcyli.supabase.co";
var ANON="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0Ynhxd2l5a3R6amRqb2hjeWxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ5MzY5NzIsImV4cCI6MjExMDUxMjk3Mn0.lTQDVQgJqY65_daClS0V7LvO6Kl1Pi7pyGrL5F5j-1U";
var sb=null,me=null,shop=null,queue=[],evTimer=null;

var css=document.createElement("style");css.textContent=
".nxrUp{display:flex;gap:8px;align-items:center;margin:10px 0;flex-wrap:wrap}"+
".nxrUp input[type=file]{display:none}"+
".nxrUp .btn{flex:1;min-width:120px}"+
".nxrUp .prev{width:80px;height:80px;border-radius:12px;object-fit:cover;background:var(--bg2);border:1px solid var(--ln)}"+
".nxrUp .prev.vid{width:100%;height:140px;margin-top:8px}"+
".nxrUp .prog{flex:1;height:6px;background:var(--ln);border-radius:99px;overflow:hidden;min-width:100px}"+
".nxrUp .prog i{display:block;height:100%;background:var(--grn);width:0;transition:width .3s}"+
"#nxOff{position:fixed;top:60px;left:50%;transform:translateX(-50%);background:var(--red);color:#fff;padding:6px 14px;border-radius:999px;font-size:11px;font-weight:700;z-index:90;display:none;box-shadow:0 4px 12px rgba(163,58,42,.3)}"+
"#nxOff.on{display:block;animation:nxOffIn .3s}"+
"@keyframes nxOffIn{from{opacity:0;transform:translateX(-50%) translateY(-10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}"+
".nxrMod{border-color:var(--gold)}"+
".nxrMod .row2{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap}"+
".nxrMod .row2 button{flex:1;min-width:100px}";
document.head.appendChild(css);

var off=document.createElement("div");off.id="nxOff";off.textContent="📡 Offline mode";document.body.appendChild(off);
function updOff(){off.classList.toggle("on",!navigator.onLine);}
window.addEventListener("online",updOff);window.addEventListener("offline",updOff);updOff();

function load(cb){if(window.supabase){cb();return;}var s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";s.onload=cb;document.head.appendChild(s);}
load(function(){sb=window.supabase.createClient(URL,ANON,{auth:{persistSession:true}});refresh();});
async function refresh(){if(!sb)return;var ses=(await sb.auth.getSession()).data.session;me=ses?ses.user.id:null;shop=null;
 if(me){var sh=await sb.from("nx_shops").select("*").eq("owner_id",me).limit(1);shop=(sh.data||[])[0]||null;}}
window.nxSellerRefresh=refresh;

/* ---------- Compresión de imagen (~150KB) ---------- */
function compressImage(file,cb){
 var img=new Image();img.onload=function(){
  var max=1024;var w=img.width,h=img.height;
  if(w>h){if(w>max){h=h*max/w;w=max;}}else{if(h>max){w=w*max/h;h=max;}}
  var c=document.createElement("canvas");c.width=w;c.height=h;
  c.getContext("2d").drawImage(img,0,0,w,h);
  cb(c.toDataURL("image/jpeg",0.7));
 };img.src=URL.createObjectURL(file);
}

/* ---------- Upload (foto o video) ---------- */
function uploadFile(file,cb){
 var isVideo=file.type.startsWith("video/");
 if(isVideo){
  /* Video: subir directo, sin compresión (los videos ya están comprimidos) */
  var name=Date.now()+"_"+Math.random().toString(36).slice(2,8)+".mp4";
  sb.storage.from("listings").upload(name,file,{contentType:file.type,upsert:false}).then(function(r){
   if(r.error){cb(null,r.error.message,"video");return;}
   var url=sb.storage.from("listings").getPublicUrl(r.data.path).data.publicUrl;
   cb(url,null,"video");
  });
 }else{
  /* Imagen: comprimir primero */
  compressImage(file,function(data){
   var blob=dataURLtoBlob(data);var name=Date.now()+"_"+Math.random().toString(36).slice(2,8)+".jpg";
   sb.storage.from("listings").upload(name,blob,{contentType:"image/jpeg",upsert:false}).then(function(r){
    if(r.error){cb(null,r.error.message,"image");return;}
    var url=sb.storage.from("listings").getPublicUrl(r.data.path).data.publicUrl;
    cb(url,null,"image");
   });
  });
 }
}
function dataURLtoBlob(d){var p=d.split(",");var mime=p[0].match(/:(.*?);/)[1];var b=atob(p[1]);var a=new Uint8Array(b.length);for(var i=0;i<b.length;i++)a[i]=b.charCodeAt(i);return new Blob([a],{type:mime});}

/* ---------- Analytics ---------- */
function track(ev,meta){if(!me)return;queue.push({ts:new Date().toISOString(),buyer_id:me,event:ev,meta:meta||{}});if(evTimer)return;evTimer=setTimeout(flush,5000);}
function flush(){if(!queue.length||!sb)return;var batch=queue.splice(0,queue.length);clearTimeout(evTimer);evTimer=null;sb.from("nx_events").insert(batch).then(function(){}).catch(function(){});}

/* ---------- Reportar ---------- */
function report(listingId,reason){if(!me)return;sb.from("nx_reports").insert({listing_id:listingId,reason:reason}).then(function(r){if(!r.error)toast("Report sent. Thanks.");});}

/* ---------- Inyección en Seller Center ---------- */
function injectSeller(){
 if(S.view!=="seller"||!shop)return;
 var v=document.querySelector("main .view");if(!v)return;
 if(v.querySelector("[data-nxup]"))return;
 var card=document.createElement("div");card.className="card nxrMod";card.setAttribute("data-nxup","1");
 card.innerHTML='<b>📷 Upload media</b><p class="mut" style="font-size:12px;margin:4px 0 10px">Photos auto-compress to ~150KB. Videos upload directly. Works on slow networks.</p>'+
  '<div class="nxrUp"><input type="file" id="nxFile" accept="image/*,video/*" capture="environment">'+
  '<button class="btn gh" id="nxCam">📷 Photo</button>'+
  '<button class="btn gh" id="nxVid">🎥 Video</button>'+
  '<img class="prev" id="nxPrev" style="display:none">'+
  '<video class="prev vid" id="nxVidPrev" style="display:none" controls></video>'+
  '<div class="prog" id="nxProg" style="display:none"><i></i></div></div>'+
  '<input id="nxImgUrl" placeholder="Image URL (auto-filled)" style="margin-top:8px">'+
  '<input id="nxVidUrl" placeholder="Video URL (auto-filled)" style="margin-top:8px;display:none">';
 var mpName=v.querySelector("#mpName");if(mpName)mpName.insertAdjacentElement("beforebegin",card);
 card.querySelector("#nxCam").onclick=function(){card.querySelector("#nxFile").setAttribute("accept","image/*");card.querySelector("#nxFile").click();};
 card.querySelector("#nxVid").onclick=function(){card.querySelector("#nxFile").setAttribute("accept","video/*");card.querySelector("#nxFile").click();};
 card.querySelector("#nxFile").onchange=function(e){var f=e.target.files[0];if(!f)return;
  var prev=card.querySelector("#nxPrev");var vidPrev=card.querySelector("#nxVidPrev");var prog=card.querySelector("#nxProg");
  prev.style.display="none";vidPrev.style.display="none";prog.style.display="block";
  if(f.type.startsWith("video/")){
   vidPrev.src=URL.createObjectURL(f);vidPrev.style.display="block";
  }else{
   prev.src=URL.createObjectURL(f);prev.style.display="block";
  }
  uploadFile(f,function(url,err,type){
   prog.style.display="none";
   if(err){toast("Upload failed: "+err);return;}
   if(type==="video"){card.querySelector("#nxVidUrl").value=url;card.querySelector("#nxVidUrl").style.display="block";}
   else{card.querySelector("#nxImgUrl").value=url;}
   toast("✓ "+(type==="video"?"Video":"Photo")+" uploaded");
  });
 };
}

/* ---------- Inyección en Admin ---------- */
function injectAdmin(){
 if(S.view!=="settings"||!S.admin)return;
 var v=document.querySelector("main .view");if(!v)return;
 if(v.querySelector("[data-nxmod]"))return;
 var c=document.createElement("div");c.className="card nxrMod";c.setAttribute("data-nxmod","1");
 c.innerHTML='<b>🛡 Moderation & Analytics</b>'+
  '<div class="row2"><button class="btn gh sm" data-nxmod="listings">Pending listings</button>'+
  '<button class="btn gh sm" data-nxmod="shops">Pending shops</button>'+
  '<button class="btn gh sm" data-nxmod="reports">Reports</button>'+
  '<button class="btn gh sm" data-nxmod="events">Events</button></div>'+
  '<div id="nxModOut" style="margin-top:10px"></div>';
 var ready=document.getElementById("nxReadyCard");if(ready)ready.insertAdjacentElement("beforebegin",c);else v.appendChild(c);
 c.addEventListener("click",function(e){var b=e.target.closest("[data-nxmod]");if(!b)return;var t=b.dataset.nxmod;
  var out=c.querySelector("#nxModOut");out.innerHTML="Loading…";
  if(t==="listings")sb.from("nx_listings").select("*").eq("approved",false).then(function(r){
   out.innerHTML=(r.data||[]).map(function(l){return '<div class="nxhRow"><b>'+esc(l.seller)+'</b><span>'+esc(l.name_en||"")+'</span>'+
    '<button class="btn grn sm" data-approve="listing" data-id="'+l.id+'">✓</button></div>';}).join("")||"None";});
  if(t==="shops")sb.from("nx_shops").select("*").eq("approved",false).then(function(r){
   out.innerHTML=(r.data||[]).map(function(s){return '<div class="nxhRow"><b>'+esc(s.name)+'</b><span>'+esc(s.city)+'</span>'+
    '<button class="btn grn sm" data-approve="shop" data-id="'+s.id+'">✓</button></div>';}).join("")||"None";});
  if(t==="reports")sb.from("nx_reports").select("*").eq("status","open").then(function(r){
   out.innerHTML=(r.data||[]).map(function(rp){return '<div class="nxhRow"><b>'+esc(rp.listing_id)+'</b><span>'+esc(rp.reason)+'</span>'+
    '<button class="btn red sm" data-dismiss="'+rp.id+'">✕</button></div>';}).join("")||"None";});
  if(t==="events")sb.from("nx_events").select("event,count(*)").group("event").order("count",{ascending:false}).limit(10).then(function(r){
   out.innerHTML=(r.data||[]).map(function(e){return '<div class="nxhRow"><b>'+esc(e.event)+'</b><span>'+e.count+'</span></div>';}).join("")||"None";});
 });
}

/* ---------- Hooks ---------- */
document.addEventListener("click",function(e){
 var ap=e.target.closest("[data-approve]");if(ap){var t=ap.dataset.approve,id=ap.dataset.id;
  sb.from(t==="listing"?"nx_listings":"nx_shops").update({approved:true}).eq("id",id).then(function(){toast("✓ Approved");refresh();});return;}
 var dm=e.target.closest("[data-dismiss]");if(dm){sb.from("nx_reports").update({status:"dismissed"}).eq("id",dm.dataset.dismiss).then(function(){toast("Dismissed");});return;}
 var rp=e.target.closest("[data-report]");if(rp){var reason=prompt("Reason:");if(reason)report(rp.dataset.report,reason);return;}
},true);

/* ---------- Track eventos ---------- */
document.addEventListener("click",function(e){
 var o=e.target.closest("[data-a]");if(!o)return;var a=o.dataset.a;
 if(a==="open")track("product_view",{pid:o.dataset.id});
 if(a==="add"||a==="addq")track("add_to_cart",{pid:o.dataset.id});
 if(a==="checkout")track("checkout_start",{});
 if(a==="bulkQuote")track("haggle_start",{pid:o.dataset.id});
 if(a==="gStart"||a==="gStartPid")track("haggle_start",{pid:o.dataset.id});
},true);

var _r=window.render;window.render=function(){var o=_r.apply(this,arguments);setTimeout(function(){injectSeller();injectAdmin();},200);return o;};
setTimeout(function(){refresh();injectSeller();injectAdmin();},1000);
})();
