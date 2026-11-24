/* nx-install-pwa.js v2 — pill flotante de instalación: escucha el evento propio, re-aparece cada 24h, fallback manual */
(function(){
"use strict";
if(window.__nxInstall)return;window.__nxInstall=true;
var LS="nx_pwa_dismissed_ts";var deferred=null;
var css=document.createElement("style");css.textContent=
"#nxInstallPill{position:fixed;left:50%;bottom:calc(74px + env(safe-area-inset-bottom));transform:translate(-50%,140%);z-index:106;display:none;align-items:center;gap:10px;padding:10px 12px 10px 16px;border-radius:999px;background:rgba(29,92,63,.9);backdrop-filter:blur(14px) saturate(1.4);color:#fff;box-shadow:0 10px 30px rgba(29,92,63,.35),0 0 0 1px rgba(220,234,217,.4),inset 0 1px 0 rgba(255,255,255,.15);cursor:pointer;font-size:13px;font-weight:700;white-space:nowrap;opacity:0;transition:transform .5s cubic-bezier(.2,.9,.25,1.1),opacity .4s}"+
"#nxInstallPill.on{display:flex;transform:translate(-50%,0);opacity:1}"+
"#nxInstallPill:before{content:'';position:absolute;inset:-2px;border-radius:999px;background:linear-gradient(120deg,rgba(220,234,217,.5),transparent 40%,rgba(243,232,200,.4));z-index:-1;filter:blur(6px);animation:ngl 3s ease-in-out infinite}@keyframes ngl{0%,100%{opacity:.45}50%{opacity:.85}}"+
"#nxInstallPill .i{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#dcead9,#8fd6a8);color:#1d5c3f;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;flex:none}"+
"#nxInstallPill .x{width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;font-size:11px}"+
"#nxInstallPill.out{transform:translate(-50%,140%);opacity:0}";
document.head.appendChild(css);
var pill=document.createElement("button");pill.id="nxInstallPill";
pill.innerHTML='<span class="i">⬇</span><span class="tx"></span><span class="x">✕</span>';
document.body.appendChild(pill);
function label(){return S.lang==="ur"?"NexusShop انسٹال کریں":S.lang==="sk"?"Inštalovať NexusShop":S.lang==="de"?"NexusShop installieren":S.lang==="hi"?"NexusShop इंस्टॉल करें":"Install NexusShop";}
function dismissed(){var ts=+localStorage.getItem(LS)||0;return Date.now()-ts<24*3600*1000;}
function installed(){return window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches;}
function show(){if(installed()||dismissed())return;pill.querySelector(".tx").textContent=label();setTimeout(function(){pill.classList.add("on");},2500);}
function hide(){pill.classList.add("out");setTimeout(function(){pill.classList.remove("on","out");},420);}
window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();deferred=e;show();});
window.addEventListener("appinstalled",function(){deferred=null;hide();toast(S.lang==="ur"?"انسٹال ہو گیا! 🎉":"Installed! 🎉");});
pill.addEventListener("click",function(e){
 if(e.target.closest(".x")){localStorage.setItem(LS,String(Date.now()));hide();return;}
 if(deferred){deferred.prompt();deferred.userChoice.then(function(){deferred=null;hide();});}
 else{toast(S.lang==="ur"?"مینو → Add to Home screen":"Menu ⋮ → Add to Home screen / Install app");}
});
/* fila en Account para quien no vio el pill */
var _r=window.render;window.render=function(){var out=_r.apply(this,arguments);setTimeout(function(){
 var m=document.querySelector(".menu");if(m&&S.view==="account"&&!m.querySelector("[data-nxinst]"))m.insertAdjacentHTML("afterbegin",'<div class="menu" style="margin:0 0 8px"><button data-nxinst="1">⬇ '+label()+'<span>›</span></button></div>');
 if(pill.classList.contains("on"))pill.querySelector(".tx").textContent=label();
},180);return out;};
document.addEventListener("click",function(e){if(e.target.closest("[data-nxinst]")){if(deferred){deferred.prompt();deferred.userChoice.then(function(){deferred=null;});}else toast(S.lang==="ur"?"مینو → Add to Home screen":"Menu ⋮ → Add to Home screen / Install app");}});
show();
})();
