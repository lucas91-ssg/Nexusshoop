/* nx-ads.js v1 — Publicidad nativa de marcas locales para NexusShop */
(function(){
"use strict";
if(window.__nxAds)return;window.__nxAds=true;

/* ===== BASE DE DATOS DE ANUNCIANTES (editá acá cuando vendas) =====
   Cada ad tiene: id, nombre, slogan, image, link, whatsapp, mercados donde se muestra
   Si ads=[] no se muestra nada. Cuando vendas, agregás el anunciante acá. */
var ADS=[
 /* EJEMPLO (borrar cuando tengas reales):
 {id:"demo1",name_en:"Demo Brand",name_ur:"ڈیمو برانڈ",slogan_en:"Sponsored slot",slogan_ur:"سپانسرڈ",
  img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
  wa:"923001234567",markets:["PK","SK","DE","IN","NG","GL"],active:true}
 */
];

var AD_LABELS={
 en:{sponsored:"Sponsored",ad:"Ad",cta:"Visit",advertiseHere:"Advertise with NexusShop",
     adTitle:"Your brand, in front of thousands of shoppers",
     adSub:"3 banner slots on home · Featured product placement · Mention in Raahnuma AI",
     adCta:"Request media kit on WhatsApp"},
 ur:{sponsored:"سپانسرڈ",ad:"اشتہار",cta:"دیکھیں",advertiseHere:"NexusShop پر اشتہار دیں",
     adTitle:"آپ کا برانڈ، ہزاروں خریداروں کے سامنے",
     adSub:"ہوم پر 3 بینر · فیچرڈ پراڈکٹ · راہنما AI میں تذکرہ",
     adCta:"میڈیا کٹ واٹس ایپ پر مانگیں"},
 sk:{sponsored:"Sponzorované",ad:"Reklama",cta:"Navštíviť",advertiseHere:"Inzerujte na NexusShop",
     adTitle:"Vaša značka pred tisícmi nakupujúcich",adSub:"3 bannery · Odporúčané · Spomenutie v AI",
     adCta:"Požiadať o cenník cez WhatsApp"},
 de:{sponsored:"Gesponsert",ad:"Anzeige",cta:"Besuchen",advertiseHere:"Auf NexusShop werben",
     adTitle:"Ihre Marke vor Tausenden Käufern",adSub:"3 Banner · Empfohlen · KI-Erwähnung",
     adCta:"Medienkit per WhatsApp anfordern"},
 hi:{sponsored:"प्रायोजित",ad:"विज्ञापन",cta:"देखें",advertiseHere:"NexusShop पर विज्ञापन करें",
     adTitle:"आपका ब्रांड, हज़ारों खरीदारों के सामने",adSub:"होम पर 3 बैनर · फ़ीचर्ड · AI में ज़िक्र",
     adCta:"WhatsApp पर मीडिया किट मांगें"}
};
function AL(k){return (AD_LABELS[S.lang]&&AD_LABELS[S.lang][k])||AD_LABELS.en[k];}

/* ===== CSS ===== */
var css=document.createElement("style");css.textContent=
".nxAd{position:relative;border-radius:18px;overflow:hidden;margin:12px 0;box-shadow:0 6px 20px rgba(38,34,27,.12);cursor:pointer;animation:nxAIn .5s ease}"+
"@keyframes nxAIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}"+
".nxAd .bg{height:150px;background-size:cover;background-position:center;position:relative}"+
".nxAd .bg:before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(29,92,63,.55),rgba(138,109,31,.45))}"+
".nxAd .cnt{position:absolute;inset:0;padding:16px;color:#fff;display:flex;flex-direction:column;justify-content:space-between}"+
".nxAd .sp{display:inline-block;background:rgba(255,255,255,.2);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.3);border-radius:999px;padding:3px 10px;font-size:10px;font-weight:700;letter-spacing:.5px;width:fit-content}"+
".nxAd b{font-family:Georgia,serif;font-size:20px;line-height:1.2;text-shadow:0 2px 10px rgba(0,0,0,.4)}"+
".nxAd .sl{font-size:12px;opacity:.95}"+
".nxAd .cta{background:#fff;color:#1d5c3f;border-radius:10px;padding:8px 14px;font-size:12px;font-weight:800;width:fit-content;margin-top:6px}"+
".nxAdPitch{margin:16px 0;padding:16px;background:linear-gradient(135deg,var(--goldbg),var(--mint));border:1.5px dashed var(--gold);border-radius:18px;text-align:center}"+
".nxAdPitch b{font-family:Georgia,serif;font-size:16px;color:var(--ink);display:block;margin-bottom:4px}"+
".nxAdPitch .sub{font-size:11.5px;color:var(--mut);margin-bottom:10px}"+
".nxAdPitch .btn{background:var(--gold);color:#fff;border-radius:12px;padding:10px 16px;font-weight:800;font-size:13px;display:inline-flex;align-items:center;gap:6px}";
document.head.appendChild(css);

/* ===== ROTACIÓN DE ANUNCIOS ===== */
var lastAd=null;
function pickAd(){
 var market=S.market||"PK";
 var list=ADS.filter(function(a){return a.active&&a.markets.indexOf(market)>=0;});
 if(!list.length)return null;
 if(list.length===1)return list[0];
 /* evita repetir el mismo dos veces seguidas */
 var pick;do{pick=list[Math.floor(Math.random()*list.length)];}while(pick===lastAd&&list.length>1);
 lastAd=pick;return pick;
}

/* ===== RENDER ===== */
window.nxRenderAdBanner=function(){
 var ad=pickAd();
 if(!ad){
  /* Si no hay anunciantes aún, mostrar el pitch para captar */
  return '<div class="nxAdPitch"><b>📢 '+AL("advertiseHere")+'</b>'+
   '<div class="sub">'+AL("adTitle")+'<br>'+AL("adSub")+'</div>'+
   '<a class="btn" href="https://wa.me/5491123456789?text='+encodeURIComponent("Hola, quiero anunciar mi marca en NexusShop. ¿Me pasan media kit?")+'" target="_blank" rel="noopener">💬 '+AL("adCta")+'</a></div>';
 }
 var name=(ad["name_"+S.lang]||ad.name_en||ad.name);
 var slogan=(ad["slogan_"+S.lang]||ad.slogan_en||"");
 return '<div class="nxAd" onclick="window.nxAdClick(\''+ad.id+'\')">'+
  '<div class="bg" style="background-image:url(\''+ad.img+'\')">'+
   '<div class="cnt"><span class="sp">★ '+AL("sponsored")+'</span>'+
    '<div><b>'+name+'</b>'+(slogan?'<div class="sl">'+slogan+'</div>':'')+
    '<span class="cta">'+AL("cta")+' →</span></div>'+
   '</div>'+
  '</div></div>';
};

window.nxAdClick=function(id){
 var ad=ADS.find(function(a){return a.id===id;});
 if(!ad)return;
 if(ad.wa){
  window.open("https://wa.me/"+ad.wa.replace(/\D/g,"")+"?text="+
   encodeURIComponent((S.lang==="ur"?"السلام علیکم! NexusShop سے: ":"Hello from NexusShop: ")+
   (ad.name_en||"")+" ad click."),"_blank");
 }
};

/* ===== INYECCIÓN EN vHome() ===== */
var _origVHome=window.vHome;
if(_origVHome){
 window.vHome=function(){
  var html=_origVHome.apply(this,arguments);
  /* inserta el banner AD justo después del hero + live bar */
  var liveEnd=html.indexOf('</div>',html.indexOf('class="live"'));
  if(liveEnd>0){
   var insertAt=html.indexOf('</div>',liveEnd+6)+6;
   html=html.slice(0,insertAt)+window.nxRenderAdBanner()+html.slice(insertAt);
  }
  return html;
 };
}

/* ===== ADMIN: acceso rápido para agregar/editar anunciantes desde Settings =====
   Solo visible si S.admin=true. Permite cargar un JSON simple. */
var _origVSettings=window.vSettings;
if(_origVSettings){
 window.vSettings=function(){
  var html=_origVSettings.apply(this,arguments);
  if(!S.admin)return html;
  var activeCount=ADS.filter(function(a){return a.active;}).length;
  var pitch='<div class="card" style="border-color:var(--gold);margin-top:14px">'+
   '<b>📢 Ads admin</b>'+
   '<div class="mut" style="margin:4px 0">Active ads: <b>'+activeCount+'</b> / '+ADS.length+'</div>'+
   '<textarea id="nxAdsJson" rows="6" style="font-size:11px;font-family:monospace">'+JSON.stringify(ADS,null,2)+'</textarea>'+
   '<button class="btn grn sm" style="margin-top:8px" onclick="window.nxSaveAds()">💾 Save</button></div>';
  return html.replace('</main>','')+'</main>'+pitch;
 };
}
window.nxSaveAds=function(){
 try{
  var txt=document.getElementById("nxAdsJson").value;
  var parsed=JSON.parse(txt);
  localStorage.setItem("nx_ads_custom",JSON.stringify(parsed));
  ADS.length=0;parsed.forEach(function(a){ADS.push(a);});
  toast("Ads saved ("+ADS.length+")");render();
 }catch(e){alert("JSON error: "+e.message);}
};

/* Cargar ads custom si existen */
try{
 var custom=JSON.parse(localStorage.getItem("nx_ads_custom")||"null");
 if(custom&&Array.isArray(custom)){ADS.length=0;custom.forEach(function(a){ADS.push(a);});}
}catch(e){}

})();
