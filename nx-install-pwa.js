/* nx-install-pwa.js — Install app pill: flotante, futurista, no-intrusivo */
(function(){
"use strict";
if(window.__nxInstall)return;window.__nxInstall=true;

var LS_KEY="nx_pwa_dismissed";
var hasPrompt=false;

/* CSS del pill flotante */
var css=document.createElement("style");
css.textContent=
"#nxInstallPill{position:fixed;left:50%;bottom:calc(72px + env(safe-area-inset-bottom));transform:translate(-50%,120%);z-index:105;display:none;align-items:center;gap:10px;padding:10px 14px 10px 18px;border-radius:999px;background:rgba(29,92,63,.88);backdrop-filter:blur(14px) saturate(1.4);-webkit-backdrop-filter:blur(14px) saturate(1.4);color:#fff;box-shadow:0 10px 30px rgba(29,92,63,.35),0 0 0 1px rgba(220,234,217,.4),inset 0 1px 0 rgba(255,255,255,.15);cursor:pointer;font-family:Georgia,'Times New Roman',serif;font-size:13.5px;font-weight:600;letter-spacing:.2px;white-space:nowrap;opacity:0;transition:transform .55s cubic-bezier(.2,.9,.25,1.1),opacity .45s ease}"+
"#nxInstallPill.on{display:flex;transform:translate(-50%,0);opacity:1}"+
"#nxInstallPill:before{content:'';position:absolute;inset:-2px;border-radius:999px;background:linear-gradient(120deg,rgba(220,234,217,.55),transparent 40%,rgba(243,232,200,.45));z-index:-1;filter:blur(6px);opacity:.7;animation:nxpillGlow 3s ease-in-out infinite}"+
"@keyframes nxpillGlow{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:.85;transform:scale(1.04)}}"+
"#nxInstallPill .nxpIcon{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#dcead9,#8fd6a8);display:flex;align-items:center;justify-content:center;color:#1d5c3f;font-size:13px;font-weight:800;box-shadow:inset 0 1px 2px rgba(255,255,255,.6),0 2px 6px rgba(0,0,0,.2);flex:none}"+
"#nxInstallPill .nxpText{display:flex;flex-direction:column;line-height:1.15}"+
"#nxInstallPill .nxpText b{font-size:13px;font-weight:700;color:#fff}"+
"#nxInstallPill .nxpText span{font-size:10px;color:#dcead9;font-family:'Segoe UI',system-ui,sans-serif;font-weight:500;letter-spacing:.3px;text-transform:uppercase;margin-top:1px}"+
"#nxInstallPill .nxpClose{margin-inline-start:6px;width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;cursor:pointer;transition:all .15s}"+
"#nxInstallPill .nxpClose:hover{background:rgba(255,255,255,.25)}"+
"#nxInstallPill.success{background:linear-gradient(135deg,#1d5c3f,#2f6b4f);animation:nxpillPop .5s ease}"+
"@keyframes nxpillPop{0%{transform:translate(-50%,0) scale(1)}40%{transform:translate(-50%,0) scale(1.08)}100%{transform:translate(-50%,0) scale(1)}}"+
"#nxInstallPill.out{transform:translate(-50%,120%);opacity:0}";
document.head.appendChild(css);

/* Crear el pill */
var pill=document.createElement("button");
pill.id="nxInstallPill";
pill.innerHTML='<span class="nxpIcon">⬇</span><span class="nxpText"><b>'+label("title")+'</b><span>'+label("sub")+'</span></span><span class="nxpClose" title="Dismiss">✕</span>';
document.body.appendChild(pill);

function label(k){
 var L={
  en:{title:"Install NexusShop",sub:"Use like a real app"},
  ur:{title:"NexusShop انسٹال کریں",sub:"اصل ایپ کی طرح استعمال کریں"},
  sk:{title:"Inštalovať NexusShop",sub:"Používajte ako skutočnú aplikáciu"},
  de:{title:"NexusShop installieren",sub:"Wie eine echte App nutzen"},
  hi:{title:"NexusShop इंस्टॉल करें",sub:"असली ऐप की तरह इस्तेमाल करें"}
 };
 return (L[S.lang]&&L[S.lang][k])||L.en[k];
}

function show(){
 if(localStorage.getItem(LS_KEY)==="1")return;
 if(!hasPrompt)return;
 pill.querySelector(".nxpText b").textContent=label("title");
 pill.querySelector(".nxpText span").textContent=label("sub");
 setTimeout(function(){pill.classList.add("on");},3000);
}

function hide(success){
 pill.classList.add("out");
 setTimeout(function(){
  pill.classList.remove("on","out");
  if(success){pill.classList.add("success");setTimeout(function(){pill.classList.remove("success");},1800);}
 },450);
}

/* Eventos globales */
window.addEventListener("nx-pwa-ready",function(){hasPrompt=true;show();});
window.addEventListener("nx-pwa-installed",function(){
 hasPrompt=false;
 hide(true);
 toast(S.lang==="ur"?"NexusShop انسٹال ہو گیا! 🎉":S.lang==="sk"?"NexusShop nainštalovaný! 🎉":S.lang==="de"?"NexusShop installiert! 🎉":S.lang==="hi"?"NexusShop इंस्टॉल हो गया! 🎉":"NexusShop installed! 🎉");
});

/* Click en pill: instala */
pill.addEventListener("click",function(e){
 if(e.target.closest(".nxpClose")){
  e.stopPropagation();
  localStorage.setItem(LS_KEY,"1");
  hide(false);
  return;
 }
 if(typeof window.doInstall==="function"){
  window.doInstall();
 }
});

/* Re-mostrar si cambia el idioma y no fue descartado */
var _r=window.render;window.render=function(){
 var out=_r.apply(this,arguments);
 if(pill.classList.contains("on")&&localStorage.getItem(LS_KEY)!=="1"){
  pill.querySelector(".nxpText b").textContent=label("title");
  pill.querySelector(".nxpText span").textContent=label("sub");
 }
 return out;
};

/* Ocultar en welcome screen para no competir */
var mo=new MutationObserver(function(){
 var welcome=document.getElementById("welcome");
 if(welcome&&pill.classList.contains("on")){pill.classList.add("out");setTimeout(function(){pill.classList.remove("on","out");},350);}
});
mo.observe(document.body,{childList:true,subtree:true});
})();
