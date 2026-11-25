/* =====================================================================
   nx-ads.js v3 — Publicidad nativa de marcas locales para NexusShop
   Diseño premium + futurista (orbes, glassmorphism, gradientes animados)
   ===================================================================== */
(function(){
"use strict";
if(window.__nxAds)return;window.__nxAds=true;

/* ⚠️ TU WhatsApp de contacto (editá este número si lo cambiás) */
var SALES_WA="542257550650";

/* ===== BASE DE DATOS DE ANUNCIANTES =====
   Cargar desde Settings > Admin mode cuando tengas anunciantes reales. */
var ADS=[];
try{var _c=JSON.parse(localStorage.getItem("nx_ads_custom")||"null");if(_c&&Array.isArray(_c))ADS=_c;}catch(e){}

/* ===== TRADUCCIONES (5 idiomas) ===== */
var AD_LABELS={
 en:{sponsored:"SPONSORED",cta:"Visit now →",advertiseHere:"Advertise with NexusShop",
     adTitle:"Your brand, in front of thousands of shoppers",
     adSub:"3 premium banner slots on home · Featured product placement · Mention in Raahnuma AI assistant",
     adCta:"💬 Request media kit on WhatsApp",adminTitle:"Ads admin",
     activeCount:"Active ads",saveBtn:"Save changes",
     preMsg:"Hello! I want to advertise my brand on NexusShop. Can you send me the media kit?",
     fromWA:"Hello from NexusShop: "},
 ur:{sponsored:"سپانسرڈ",cta:"ابھی دیکھیں →",advertiseHere:"NexusShop پر اشتہار دیں",
     adTitle:"آپ کا برانڈ، ہزاروں خریداروں کے سامنے",
     adSub:"ہوم پر 3 پریمیم بینر · فیچرڈ پراڈکٹ پلیسمنٹ · راہنما AI اسسٹنٹ میں تذکرہ",
     adCta:"💬 میڈیا کٹ واٹس ایپ پر مانگیں",adminTitle:"اشتہارات ایڈمن",
     activeCount:"فعال اشتہارات",saveBtn:"تبدیلیاں محفوظ کریں",
     preMsg:"السلام علیکم! میں NexusShop پر اپنا برانڈ کا اشتہار دینا چاہتا ہوں۔ میڈیا کٹ بھیجیں۔",
     fromWA:"السلام علیکم! NexusShop سے: "},
 sk:{sponsored:"SPONZOROVANÉ",cta:"Navštíviť →",advertiseHere:"Inzerujte na NexusShop",
     adTitle:"Vaša značka pred tisícmi nakupujúcich",
     adSub:"3 prémiové bannery · Odporúčané produkty · Zmienka v AI Raahnuma",
     adCta:"💬 Požiadať o cenník cez WhatsApp",adminTitle:"Správca reklám",
     activeCount:"Aktívne reklamy",saveBtn:"Uložiť zmeny",
     preMsg:"Dobrý deň! Chcem inzerovať svoju značku na NexusShop. Pošlite mi prosím cenník.",
     fromWA:"Dobrý deň z NexusShop: "},
 de:{sponsored:"GESPONSERT",cta:"Jetzt besuchen →",advertiseHere:"Auf NexusShop werben",
     adTitle:"Ihre Marke vor Tausenden Käufern",
     adSub:"3 Premium-Banner · Empfohlene Produkte · Erwähnung im Raahnuma KI-Assistenten",
     adCta:"💬 Medienkit per WhatsApp anfordern",adminTitle:"Ads-Verwaltung",
     activeCount:"Aktive Anzeigen",saveBtn:"Änderungen speichern",
     preMsg:"Hallo! Ich möchte meine Marke auf NexusShop bewerben. Bitte senden Sie mir das Medienkit.",
     fromWA:"Hallo von NexusShop: "},
 hi:{sponsored:"प्रायोजित",cta:"अभी देखें →",advertiseHere:"NexusShop पर विज्ञापन करें",
     adTitle:"आपका ब्रांड, हज़ारों खरीदारों के सामने",
     adSub:"होम पर 3 प्रीमियम बैनर · फ़ीचर्ड प्रोडक्ट · Raahnuma AI में ज़िक्र",
     adCta:"💬 WhatsApp पर मीडिया किट मांगें",adminTitle:"विज्ञापन एडमिन",
     activeCount:"सक्रिय विज्ञापन",saveBtn:"बदलाव सहेजें",
     preMsg:"नमस्ते! मैं NexusShop पर अपना ब्रांड का विज्ञापन करना चाहता हूँ। कृपया मीडिया किट भेजें।",
     fromWA:"नमस्ते! NexusShop से: "}
};
function AL(k){return (AD_LABELS[S.lang]&&AD_LABELS[S.lang][k])||AD_LABELS.en[k];}

/* ===== CSS FUTURISTA ===== */
var css=document.createElement("style");css.textContent=
/* ---------- Banner publicitario ---------- */
"#nxAdSlot{margin:14px 0;position:relative}"+
".nxAd{position:relative;border-radius:22px;overflow:hidden;box-shadow:0 14px 40px rgba(29,92,63,.25),0 0 0 1px rgba(255,255,255,.4) inset;cursor:pointer;animation:nxAIn .6s cubic-bezier(.2,.9,.25,1.1);isolation:isolate}"+
"@keyframes nxAIn{from{opacity:0;transform:translateY(14px) scale(.98)}to{opacity:1;transform:none}}"+
".nxAd:hover{transform:translateY(-2px);box-shadow:0 20px 50px rgba(29,92,63,.35),0 0 0 1px rgba(255,255,255,.5) inset}"+
".nxAd .bg{height:160px;background-size:cover;background-position:center;position:relative;overflow:hidden}"+
".nxAd .bg:before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(29,92,63,.72) 0%,rgba(138,109,31,.55) 100%);z-index:1}"+
".nxAd .bg:after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 80% 20%,rgba(255,255,255,.15),transparent 60%);z-index:2}"+
".nxAd .orb{position:absolute;border-radius:50%;filter:blur(40px);opacity:.5;z-index:3;pointer-events:none}"+
".nxAd .orb.o1{width:140px;height:140px;background:#dcead9;top:-30px;right:-20px;animation:nxOrb 8s ease-in-out infinite}"+
".nxAd .orb.o2{width:100px;height:100px;background:#f3e8c8;bottom:-20px;left:-20px;animation:nxOrb 11s ease-in-out infinite reverse}"+
"@keyframes nxOrb{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-15px,18px) scale(1.15)}}"+
".nxAd .cnt{position:absolute;inset:0;padding:18px;color:#fff;display:flex;flex-direction:column;justify-content:space-between;z-index:4}"+
".nxAd .sp{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.14);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:4px 12px;font-size:10px;font-weight:800;letter-spacing:1.2px;width:fit-content;box-shadow:0 4px 14px rgba(0,0,0,.15)}"+
".nxAd .sp:before{content:'';width:6px;height:6px;border-radius:50%;background:#dcead9;box-shadow:0 0 8px #dcead9;animation:nxPulse 1.6s ease-in-out infinite}"+
"@keyframes nxPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(1.3)}}"+
".nxAd b{font-family:Georgia,serif;font-size:22px;line-height:1.2;text-shadow:0 2px 14px rgba(0,0,0,.45)}"+
".nxAd .sl{font-size:12.5px;opacity:.92;margin-top:4px;text-shadow:0 1px 8px rgba(0,0,0,.35)}"+
".nxAd .cta{background:rgba(255,255,255,.95);color:#1d5c3f;border-radius:12px;padding:9px 16px;font-size:12px;font-weight:800;width:fit-content;margin-top:8px;box-shadow:0 4px 14px rgba(0,0,0,.25);transition:all .2s}"+
".nxAd:hover .cta{background:#fff;transform:translateX(4px)}"+

/* ---------- Pitch "Advertise here" (sin anunciantes) ---------- */
".nxAdPitch{position:relative;padding:22px;background:linear-gradient(135deg,rgba(243,232,200,.6),rgba(220,234,217,.6));backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1.5px solid rgba(138,109,31,.35);border-radius:22px;text-align:center;overflow:hidden;box-shadow:0 10px 30px rgba(138,109,31,.15);animation:nxAIn .6s cubic-bezier(.2,.9,.25,1.1)}"+
".nxAdPitch:before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 20% 20%,rgba(29,92,63,.12),transparent 50%),radial-gradient(circle at 80% 80%,rgba(138,109,31,.15),transparent 50%);pointer-events:none}"+
".nxAdPitch .orb{position:absolute;border-radius:50%;filter:blur(50px);opacity:.35;pointer-events:none}"+
".nxAdPitch .orb.a{width:180px;height:180px;background:#4c8b6a;top:-60px;right:-40px;animation:nxOrb 9s ease-in-out infinite}"+
".nxAdPitch .orb.b{width:140px;height:140px;background:#8a6d1f;bottom:-40px;left:-30px;animation:nxOrb 12s ease-in-out infinite reverse}"+
".nxAdPitch .ic{font-size:32px;margin-bottom:6px;position:relative;z-index:1;animation:nxFloat 4s ease-in-out infinite}"+
"@keyframes nxFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}"+
".nxAdPitch b{font-family:Georgia,serif;font-size:18px;color:#26221b;display:block;margin-bottom:6px;position:relative;z-index:1}"+
".nxAdPitch .sub{font-size:12px;color:#3a3428;margin-bottom:14px;line-height:1.55;position:relative;z-index:1}"+
".nxAdPitch a{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#1d5c3f,#2f6b4f);color:#fff;border-radius:14px;padding:11px 20px;font-weight:800;font-size:13px;text-decoration:none;box-shadow:0 8px 20px rgba(29,92,63,.3);transition:all .2s;position:relative;z-index:1}"+
".nxAdPitch a:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(29,92,63,.4)}"+
".nxAdPitch .shim{position:absolute;inset:0;background:linear-gradient(110deg,transparent 40%,rgba(255,255,255,.25) 50%,transparent 60%);animation:nxShim 4s ease-in-out infinite;pointer-events:none;border-radius:22px}"+
"@keyframes nxShim{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}"+

/* ---------- Panel admin ---------- */
"#nxAdsAdmin{position:relative;border-color:var(--gold);background:linear-gradient(135deg,var(--sf),var(--goldbg) 140%)}"+
"#nxAdsAdmin:before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--gold),var(--grn),var(--gold));border-radius:3px 3px 0 0}"+
"#nxAdsAdmin b{font-family:Georgia,serif;font-size:16px;color:var(--ink)}"+
"#nxAdsAdmin .stat{display:flex;justify-content:space-between;align-items:center;background:var(--sf2);border:1px solid var(--ln);border-radius:10px;padding:8px 12px;margin:8px 0}"+
"#nxAdsAdmin .stat b{color:var(--grn);font-family:Georgia,serif;font-size:16px}"+
"#nxAdsAdmin textarea{width:100%;border:1px solid var(--ln);border-radius:10px;background:var(--sf2);padding:10px;font-family:'Courier New',monospace;font-size:11px;resize:vertical;min-height:150px}"+
"#nxAdsAdmin textarea:focus{border-color:var(--grn);outline:none;box-shadow:0 0 0 3px rgba(29,92,63,.12)}"+
"#nxAdsAdmin .hlp{font-size:11px;color:var(--fnt);margin-top:6px;line-height:1.5}";
document.head.appendChild(css);

/* ===== LÓGICA DE ROTACIÓN ===== */
var lastAd=null;
function activeAds(){return ADS.filter(function(a){return a&&a.active&&(!a.markets||!a.markets.length||a.markets.indexOf(S.market)>=0);});}
function pickAd(){
 var list=activeAds();
 if(!list.length)return null;
 if(list.length===1)return list[0];
 var p,tries=0;
 do{p=list[Math.floor(Math.random()*list.length)];tries++;}while(p===lastAd&&list.length>1&&tries<10);
 lastAd=p;return p;
}

/* ===== RENDER ===== */
function bannerHTML(ad){
 var name=(ad["name_"+S.lang]||ad.name_en||ad.name||"");
 var slogan=(ad["slogan_"+S.lang]||ad.slogan_en||"");
 return '<div class="nxAd" onclick="window.nxAdClick(\''+ad.id+'\')">'+
  '<div class="bg" style="background-image:url(\''+(ad.img||"")+'\')">'+
   '<span class="orb o1"></span><span class="orb o2"></span>'+
   '<div class="cnt">'+
    '<span class="sp">★ '+AL("sponsored")+'</span>'+
    '<div><b>'+esc(name)+'</b>'+
    (slogan?'<div class="sl">'+esc(slogan)+'</div>':'')+
    '<span class="cta">'+AL("cta")+'</span></div>'+
   '</div>'+
  '</div></div>';
}

function pitchHTML(){
 var waURL="https://wa.me/"+SALES_WA+"?text="+encodeURIComponent(AL("preMsg"));
 return '<div class="nxAdPitch">'+
  '<span class="orb a"></span><span class="orb b"></span><span class="shim"></span>'+
  '<div class="ic">📢</div>'+
  '<b>'+esc(AL("advertiseHere"))+'</b>'+
  '<div class="sub">'+esc(AL("adTitle"))+'<br>'+esc(AL("adSub"))+'</div>'+
  '<a href="'+waURL+'" target="_blank" rel="noopener">'+AL("adCta")+'</a>'+
 '</div>';
}

function adminHTML(){
 var list=activeAds();
 var helpText='{ "id": "brand1", "name_en": "Brand", "name_ur": "برانڈ", '+
  '"slogan_en": "Slogan", "img": "https://...", "wa": "923001234567", '+
  '"markets": ["PK","SK","DE","IN","NG","GL"], "active": true }';
 return '<div class="card" id="nxAdsAdmin">'+
  '<b>📢 '+AL("adminTitle")+'</b>'+
  '<div class="stat"><span>'+AL("activeCount")+'</span><b>'+list.length+' / '+ADS.length+'</b></div>'+
  '<label>JSON array</label>'+
  '<textarea id="nxAdsJson" rows="10">'+esc(JSON.stringify(ADS,null,2))+'</textarea>'+
  '<div class="hlp">Example: '+esc(helpText)+'</div>'+
  '<button class="btn grn" style="width:100%;margin-top:10px" onclick="window.nxSaveAds()">💾 '+AL("saveBtn")+'</button>'+
 '</div>';
}

function inject(){
 var slot=document.getElementById("nxAdSlot");
 if(S.view==="home"){
  var live=document.querySelector(".live");
  if(live){
   if(!slot){slot=document.createElement("div");slot.id="nxAdSlot";live.insertAdjacentElement("afterend",slot);}
   var ad=pickAd();
   slot.innerHTML=ad?bannerHTML(ad):pitchHTML();
  }
 }else if(slot){slot.remove();}
 if(S.view==="settings"&&S.admin&&!document.getElementById("nxAdsAdmin")){
  var v=document.querySelector("main .view");
  if(v)v.insertAdjacentHTML("beforeend",adminHTML());
 }
}

window.nxAdClick=function(id){
 var ad=ADS.find(function(a){return a&&a.id===id;});
 if(!ad)return;
 if(ad.wa){
  var msg=AL("fromWA")+(ad.name_en||"")+" ad click.";
  window.open("https://wa.me/"+String(ad.wa).replace(/\D/g,"")+"?text="+encodeURIComponent(msg),"_blank");
 }else if(ad.link){
  window.open(ad.link,"_blank");
 }
};

window.nxSaveAds=function(){
 try{
  var txt=document.getElementById("nxAdsJson").value;
  var parsed=JSON.parse(txt);
  if(!Array.isArray(parsed))throw new Error("Must be an array");
  ADS.length=0;parsed.forEach(function(a){ADS.push(a);});
  localStorage.setItem("nx_ads_custom",JSON.stringify(ADS));
  toast("Ads saved ("+ADS.length+")");
  render();
 }catch(e){alert("JSON error: "+e.message);}
};

/* ===== HOOK EN RENDER GLOBAL ===== */
var _r=window.render;
window.render=function(){
 var out=_r.apply(this,arguments);
 setTimeout(inject,120);
 return out;
};
setTimeout(inject,300);
})();
