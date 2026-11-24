/* nx-committee-modal.js — pantalla de grupo committee: código, copiar, compartir, estado */
(function(){
"use strict";
if(window.__nxCommModal)return;window.__nxCommModal=true;
var css=document.createElement("style");css.textContent=
"#nxGroup{position:fixed;inset:0;background:rgba(38,34,27,.55);z-index:160;display:flex;align-items:center;justify-content:center;padding:16px;animation:fi .2s}"+
"#nxGroup .gb{background:var(--sf);border-radius:22px;padding:22px;max-width:380px;width:100%;box-shadow:var(--sh);text-align:center;animation:rise .25s}"+
"#nxGroup .gcode{font-family:Georgia,serif;font-size:34px;letter-spacing:3px;font-weight:800;color:var(--grn);background:var(--mint);border:1.5px dashed var(--grn3);border-radius:16px;padding:16px 8px;margin:14px 0}"+
"#nxGroup .gbar{display:flex;gap:8px;justify-content:center;margin:12px 0}"+
"#nxGroup .gdot{width:34px;height:34px;border-radius:50%;border:2px solid var(--ln2);display:flex;align-items:center;justify-content:center;font-size:15px;background:var(--sf2)}"+
"#nxGroup .gdot.on{border-color:var(--grn);background:var(--grn);color:#fff}"+
"#nxGroup .grow{display:flex;gap:8px;margin-top:12px}#nxGroup .grow button{flex:1}";
document.head.appendChild(css);
window.nxShowGroup=function(g){
 if(!g)return;
 var old=document.getElementById("nxGroup");if(old)old.remove();
 var p=g.pid?prod(g.pid):null;
 var full=g.members>=3;
 var d=document.createElement("div");d.id="nxGroup";
 d.innerHTML='<div class="gb"><b>👥 '+esc(t("commT"))+'</b><p class="mut">'+esc(t("commS"))+"</p>"+
  '<div class="gcode">'+esc(g.code)+"</div>"+
  '<div class="gbar">'+[1,2,3].map(function(i){return '<div class="gdot'+(i<=g.members?" on":"")+'">'+(i<=g.members?"👤":"")+"</div>";}).join("")+"</div>"+
  '<p class="fnt">'+g.members+"/3 "+esc(t("members"))+(full?" · "+esc(t("locked")):"")+"</p>"+
  (p?'<p class="mut" style="font-size:12px">'+esc(pn(p))+" · "+money(Math.round(p.price*0.85))+"</p>":"")+
  '<div class="grow"><button class="btn gh sm" data-nxg="copy">📋 '+esc(t("copy"))+"</button>"+
  '<button class="btn wa sm" data-nxg="share">💬 '+esc(t("share"))+"</button></div>"+
  '<div class="grow"><button class="btn grn" data-nxg="close">'+(full?"✓ "+esc(t("groupFull")):"✕ "+esc(t("back")))+"</button></div></div>";
 document.body.appendChild(d);
 d.addEventListener("click",function(e){var b=e.target.closest("[data-nxg]");
  if(e.target===d){d.remove();return;}
  if(!b)return;var a=b.dataset.nxg;
  if(a==="copy"){if(navigator.clipboard)navigator.clipboard.writeText(g.code).then(function(){toast(t("copied"));});else toast(g.code);}
  if(a==="share")wa("","Join my NexusShop committee "+g.code+" — everyone saves 15% (COD). "+location.origin+location.pathname);
  if(a==="close")d.remove();});
};
/* al volver de WhatsApp con un grupo reciente, re-abrir la pantalla */
document.addEventListener("visibilitychange",function(){if(document.visibilityState!=="visible"||!S.lastGroup)return;
 var g=(S.groups||[]).find(function(x){return x.code===S.lastGroup;});
 if(g&&Date.now()-(g.ts||0)<5*60*1000&&!document.getElementById("nxGroup"))nxShowGroup(g);});
})();
