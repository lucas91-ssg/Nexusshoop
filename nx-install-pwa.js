/* nx-install-pwa.js v3 — pill flotante + guía de instalación real (funciona aunque Chrome no dispare el prompt) */
(function(){
"use strict";
if(window.__nxInstall)return;window.__nxInstall=true;
var LS="nx_pwa_dismissed_ts";var deferred=null;
var css=document.createElement("style");css.textContent=
"#nxInstallPill{position:fixed;left:50%;bottom:calc(74px + env(safe-area-inset-bottom));transform:translate(-50%,140%);z-index:106;display:none;align-items:center;gap:10px;padding:10px 12px 10px 16px;border-radius:999px;background:rgba(29,92,63,.9);backdrop-filter:blur(14px);color:#fff;box-shadow:0 10px 30px rgba(29,92,63,.35),0 0 0 1px rgba(220,234,217,.4);cursor:pointer;font-size:13px;font-weight:700;white-space:nowrap;opacity:0;transition:transform .5s cubic-bezier(.2,.9,.25,1.1),opacity .4s}"+
"#nxInstallPill.on{display:flex;transform:translate(-50%,0);opacity:1}"+
"#nxInstallPill .i{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#dcead9,#8fd6a8);color:#1d5c3f;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;flex:none}"+
"#nxInstallPill .x{width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;font-size:11px}"+
"#nxInstallPill.out{transform:translate(-50%,140%);opacity:0}"+
"#nxGuide{position:fixed;inset:0;background:rgba(38,34,27,.55);z-index:160;display:flex;align-items:center;justify-content:center;padding:16px;animation:fi .2s}"+
"#nxGuide .gb{background:var(--sf);border-radius:22px;padding:22px;max-width:420px;width:100%;box-shadow:var(--sh);animation:rise .25s}"+
"#nxGuide .step{display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-bottom:1px solid var(--ln)}"+
"#nxGuide .step:last-of-type{border-bottom:none}"+
"#nxGuide .sn{width:26px;height:26px;border-radius:50%;background:var(--grn);color:#fff;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;flex:none}"+
"#nxGuide .st{font-size:13px;color:var(--ink2)}#nxGuide .st b{color:var(--ink)}";
document.head.appendChild(css);
var pill=document.createElement("button");pill.id="nxInstallPill";
pill.innerHTML='<span class="i">⬇</span><span class="tx"></span><span class="x">✕</span>';
document.body.appendChild(pill);
function label(){return S.lang==="ur"?"NexusShop انسٹال کریں":S.lang==="sk"?"Inštalovať NexusShop":S.lang==="de"?"NexusShop installieren":S.lang==="hi"?"NexusShop इंस्टॉल करें":"Install NexusShop";}
function dismissed(){return Date.now()-(+localStorage.getItem(LS)||0)<24*3600*1000;}
function standalone(){return window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches;}
function show(){if(standalone()||dismissed())return;pill.querySelector(".tx").textContent=label();setTimeout(function(){pill.classList.add("on");},2500);}
function hide(){pill.classList.add("out");setTimeout(function(){pill.classList.remove("on","out");},420);}
window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();deferred=e;show();});
window.addEventListener("appinstalled",function(){deferred=null;hide();toast("✓ "+label());});
pill.addEventListener("click",function(e){
 if(e.target.closest(".x")){localStorage.setItem(LS,String(Date.now()));hide();return;}
 window.nxInstallGuide();});
window.nxInstallGuide=function(){
 var old=document.getElementById("nxGuide");if(old)old.remove();
 var ua=navigator.userAgent;var ios=/iphone|ipad|ipod/i.test(ua)&&!window.MSStream;
 var steps=deferred?[{n:"1",t:"Chrome te ofrece instalar — tocá <b>Install</b>."}]:ios?
  [{n:"1",t:"Abrí esta página en <b>Safari</b>."},{n:"2",t:"Tocá el botón <b>Compartir</b> ⎋."},{n:"3",t:"Elegí <b>Add to Home Screen</b>."}]:
  [{n:"1",t:"Tocá el menú <b>⋮</b> de Chrome (arriba a la derecha)."},
   {n:"2",t:'Elegí <b>"Add to Home screen"</b> o <b>"Install app"</b>.'},
   {n:"3",t:"Confirmá — NexusShop queda como app con ícono propio."}];
 var d=document.createElement("div");d.id="nxGuide";
 d.innerHTML='<div class="gb"><b>📲 '+label()+'</b><p class="mut" style="font-size:12px;margin:6px 0 10px">'+
  (deferred?"Chrome está listo para instalar:":"")+' '+esc(t("installHint"))+"</p>"+
  steps.map(function(s){return '<div class="step"><div class="sn">'+s.n+'</div><div class="st">'+s.t+"</div></div>";}).join("")+
  (deferred?'<button class="btn grn" style="width:100%;margin-top:12px" data-ngx="prompt">⬇ '+label()+"</button>":"")+
  '<button class="btn gh" style="width:100%;margin-top:10px" data-ngx="close">✕ '+esc(t("back"))+"</button></div>";
 document.body.appendChild(d);
 d.addEventListener("click",function(e){if(e.target===d){d.remove();return;}
  var b=e.target.closest("[data-ngx]");if(!b)return;
  if(b.dataset.ngx==="close")d.remove();
  if(b.dataset.ngx==="prompt"&&deferred){deferred.prompt();deferred.userChoice.then(function(){deferred=null;d.remove();hide();});}});
};
var _r=window.render;window.render=function(){var out=_r.apply(this,arguments);setTimeout(function(){
 var m=document.querySelector(".menu");if(m&&S.view==="account"&&!m.querySelector("[data-nxinst]"))m.insertAdjacentHTML("afterbegin",'<div class="menu" style="margin:0 0 8px"><button data-nxinst="1">⬇ '+label()+'<span>›</span></button></div>');
 if(pill.classList.contains("on"))pill.querySelector(".tx").textContent=label();
},180);return out;};
document.addEventListener("click",function(e){if(e.target.closest("[data-nxinst]"))window.nxInstallGuide();});
show();
})();
