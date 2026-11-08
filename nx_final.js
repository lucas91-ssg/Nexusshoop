/* ===== NX_FINAL v6 — SELECTORES 100% REALES DEL SOURCE ===== */
(function(){
"use strict";
function ready(fn){if(document.readyState!=='loading')fn();else document.addEventListener('DOMContentLoaded',fn);}
ready(function(){

/* ═══ A) ENTRADA FUTURISTA: el splash YA tiene animaciones CSS ═══
   Lo que agregamos: transición suave al salir + partículas extra */
var enterBtn=document.getElementById('enterBtn');
if(enterBtn){
 var _origEnter=window.enterShop;
 window.enterShop=function(){
  var sp=document.getElementById('splash');
  if(sp){
   sp.style.transition='opacity 1s cubic-bezier(.4,0,.2,1), transform 1s cubic-bezier(.4,0,.2,1), filter 1s ease';
   sp.style.opacity='0';
   sp.style.transform='scale(1.1)';
   sp.style.filter='blur(8px)';
   setTimeout(function(){_origEnter();afterEnter()},1000);
  }else{_origEnter();afterEnter();}
 };
}
function afterEnter(){
 var s=document.createElement('style');
 s.textContent='@keyframes nxSlideUp{0%{opacity:0;transform:translateY(50px)}100%{opacity:1;transform:translateY(0)}}'+
  '#view>*{animation:nxSlideUp .6s ease-out backwards}'+
  '#view>*:nth-child(1){animation-delay:.05s}'+
  '#view>*:nth-child(2){animation-delay:.15s}'+
  '#view>*:nth-child(3){animation-delay:.25s}'+
  '#view>*:nth-child(4){animation-delay:.35s}'+
  '#view>*:nth-child(5){animation-delay:.45s}'+
  '#view>*:nth-child(6){animation-delay:.55s}';
 document.head.appendChild(s);
}

/* ═══ B) MARQUEE: insertar DESPUÉS de #bannerCarousel (selector REAL) ═══ */
function addMarquee(){
 if(document.getElementById('nxMq'))return;
 var bc=document.getElementById('bannerCarousel');
 if(!bc)return;
 var mq=document.createElement('div');mq.id='nxMq';
 mq.style.cssText='overflow:hidden;white-space:nowrap;border:1px solid rgba(34,211,238,.15);border-radius:12px;background:rgba(34,211,238,.06);font-size:11.5px;color:#a5f3fc;padding:8px 0;margin:10px 0';
 var txt='🚀 NexusShop launch week · 7 products live · COD in all Pakistan · Committee Buy: 3 friends = −15% · ';
 mq.innerHTML='<span style="display:inline-block;padding-left:100%;animation:nxScroll 28s linear infinite">'+txt+txt+txt+'</span>';
 var st=document.createElement('style');st.textContent='@keyframes nxScroll{to{transform:translateX(-100%)}}';
 document.head.appendChild(st);
 bc.insertAdjacentElement('afterend',mq);
}
/* Reintentar porque render() reescribe #view */
var _origRender=window.render;
if(_origRender){
 window.render=function(){_origRender.apply(this,arguments);setTimeout(addMarquee,300);setTimeout(fixPrices,400);setTimeout(fixShopNow,500);};
}
setTimeout(addMarquee,2000);

/* ═══ C) SHOP NOW: buscar en slides del carousel (selector REAL) ═══ */
function fixShopNow(){
 var slides=document.querySelectorAll('.carousel-slide');
 for(var i=0;i<slides.length;i++){
  var btns=slides[i].querySelectorAll('button,a');
  for(var j=0;j<btns.length;j++){
   if(/Shop Now/i.test(btns[j].textContent)){
    btns[j].onclick=function(e){
     e.preventDefault();e.stopPropagation();
     var grid=document.getElementById('grid');
     if(grid)grid.scrollIntoView({behavior:'smooth',block:'start'});
     else{var chips=document.querySelector('.chips');if(chips)chips.scrollIntoView({behavior:'smooth'});}
     return false;
    };
   }
  }
 }
}
setTimeout(fixShopNow,2000);

/* ═══ D) INSTALL APP: arriba izquierda con logo (NO tapa Raahnuma) ═══ */
if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js?v=2').catch(function(){});}
var deferredPrompt=null;
window.addEventListener('beforeinstallprompt',function(e){
 e.preventDefault();deferredPrompt=e;
 if(document.getElementById('nxInstallBtn'))return;
 var btn=document.createElement('button');btn.id='nxInstallBtn';btn.title='Install NexusShop';
 btn.style.cssText='position:fixed;top:56px;left:12px;z-index:60;height:34px;border-radius:99px;border:1px solid rgba(34,211,238,.4);background:linear-gradient(135deg,#059669,#34d399);color:#fff;font-size:11.5px;font-weight:700;padding:0 12px;cursor:pointer;box-shadow:0 4px 16px rgba(5,150,105,.4);display:flex;align-items:center;gap:5px';
 btn.innerHTML='<img src="/icon.svg" style="width:18px;height:18px;border-radius:4px"> Install';
 btn.onclick=function(){deferredPrompt.prompt();deferredPrompt.userChoice.then(function(){btn.remove();});};
 document.body.appendChild(btn);
});

/* ═══ E) SOPORTE EN ⚙️ SETTINGS ═══ */
setTimeout(function(){
 var hdr=document.querySelector('#hdr')||document.querySelector('header');
 if(!hdr)return;
 var btns=hdr.querySelectorAll('button');
 for(var i=0;i<btns.length;i++){
  if(btns[i].innerHTML.indexOf('⚙')>=0){
   btns[i].addEventListener('click',function(){
    setTimeout(function(){
     if(document.getElementById('nxSupp'))return;
     var p=document.createElement('div');p.id='nxSupp';
     p.style.cssText='position:fixed;top:56px;left:50%;transform:translateX(-50%);z-index:9999;background:rgba(10,14,35,.97);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:20px;min-width:280px;max-width:90vw;box-shadow:0 20px 60px rgba(0,0,0,.6);text-align:center';
     p.innerHTML='<div style="font-size:15px;font-weight:800;margin-bottom:12px">⚙️ Settings</div>'+
      '<div style="padding:12px;background:rgba(34,211,238,.08);border-radius:12px;border-left:3px solid #22d3ee;text-align:left;margin-bottom:12px">'+
      '<div style="font-size:10px;color:#67e8f9;font-weight:700;margin-bottom:4px">📧 SUPPORT 24/7</div>'+
      '<div style="font-size:13px;font-weight:600;color:#e2e8f0">neuralfocusai@gmail.com</div></div>'+
      '<button onclick="this.parentElement.remove()" style="width:100%;padding:10px;border:1px solid rgba(255,255,255,.15);border-radius:10px;background:transparent;color:#94a3b8;font-size:12px;cursor:pointer">Close</button>';
     document.body.appendChild(p);
    },200);
   });
   break;
  }
 }
},1500);

/* ═══ F) PRECIOS COMPETITIVOS ═══ */
function fixPrices(){
 var map={'Rs. 2,500/mo':'Rs. 1,999/mo','Rs. 5,000/mo':'Rs. 3,999/mo','Rs. 2,500/month':'Rs. 1,999/mo','Rs. 5,000/month':'Rs. 3,999/mo'};
 document.querySelectorAll('*').forEach(function(el){
  if(el.children.length>0)return;var t=el.textContent.trim();if(map[t])el.textContent=map[t];
 });
}
fixPrices();setTimeout(fixPrices,2000);

/* ═══ G) URDU SIN RELOAD ═══ */
var UR={'Shop Now':'ابھی خریدیں','Start Selling — free':'فروخت شروع کریں — مفت','The marketplace that speaks your language':'وہ مارکیٹ جو آپ کی بولی بولتی ہے','Electronics':'الیکٹرانکس','Fashion':'فیشن','Home & Living':'گھر اور رہائش','Grocery':'گروسری','Beauty':'بیوٹی','Kids & Toys':'بچے اور کھلونے','All':'سب','FREE':'مفت','Start Free · Grow Fast':'مفت شروع کریں · تیزی سے بڑھیں','Made for Pakistan':'پاکستان کے لیے بنایا گیا','List in Minutes':'منٹوں میں لسٹ کریں','RECENTLY VIEWED':'حال ہی میں دیکھے گئے','Best match':'بہترین مطابقت','Cheapest':'سب سے سستا','Best selling':'سب سے زیادہ فروخت','Biggest deals':'بڑی ڈیلز','Add':'شامل','Sold by':'فروخت کنندہ','Cash on Delivery':'کیش آن ڈیلیوری','in stock':'اسٹاک میں','Out of stock':'اسٹاک ختم','Quantity':'تعداد','Details':'تفصیل','Doorstep delivery':'دہلیز پر ڈیلیوری','Seller arranges':'سیلر کا انتظام','Reviews':'جائزے','Start a group':'گروپ شروع کریں','Choose your plan':'اپنا پلان چنیں','Free':'مفت','Pro':'پرو','Max':'میکس','MOST POPULAR':'سب سے مقبول','Home':'ہوم','Reorder':'دوبارہ آرڈر','Orders':'آرڈرز','Sell':'بیچیں','Search products...':'مصنوعات تلاش کریں...','New':'نیا','Only 5 left':'صرف 5 باقی','Welcome to Pakistan\'s Future':'پاکستان کے مستقبل میں خوش آمدید','Your marketplace, your language, your success.':'آپ کی مارکیٹ، آپ کی زبان، آپ کی کامیابی۔','COD nationwide':'پاکستان بھر میں COD','WhatsApp checkout':'واٹس ایپ چیک آؤٹ','Urdu + English':'اردو + انگریزی','Committee −15%':'کمیٹی −15%','Enter NexusShop · داخل ہوں':'NexusShop میں داخل ہوں'};
function doSweep(){var ur=document.documentElement.dir==='rtl';document.querySelectorAll('*').forEach(function(el){if(el.children.length>0||el.tagName==='SCRIPT'||el.tagName==='STYLE')return;var t=el.textContent.trim();if(ur&&UR[t])el.textContent=UR[t];});}
var pUr=document.getElementById('pUr');if(pUr)pUr.addEventListener('click',function(){document.documentElement.dir='rtl';localStorage.setItem('nx_lang','ur');setTimeout(doSweep,400);});
var pEn=document.getElementById('pEn');if(pEn)pEn.addEventListener('click',function(){document.documentElement.dir='ltr';localStorage.setItem('nx_lang','en');setTimeout(doSweep,400);});
setTimeout(function(){var btns=document.querySelectorAll('button');for(var i=0;i<btns.length;i++){if(btns[i].textContent.trim()==='اردو'){btns[i].addEventListener('click',function(){document.documentElement.dir='rtl';localStorage.setItem('nx_lang','ur');setTimeout(doSweep,400);});break;}}},2000);
if(localStorage.getItem('nx_lang')==='ur'){document.documentElement.dir='rtl';setTimeout(doSweep,600);}

});
})();
