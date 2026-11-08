/* ===== NX_FINAL v5 — SELECTORES REALES DEL HTML ===== */
(function(){
"use strict";

function ready(fn){if(document.readyState!=='loading')fn();else document.addEventListener('DOMContentLoaded',fn);}

ready(function(){

 /* ═══ A) ENTRADA FUTURISTA: animar el splash ANTES de entrar ═══ */
 var splash=document.getElementById('splash');
 if(splash){
  splash.style.transition='opacity 1.2s ease, transform 1.2s ease';
  splash.style.opacity='0';
  splash.style.transform='scale(1.05)';
  setTimeout(function(){splash.style.opacity='1';splash.style.transform='scale(1)'},50);
 }
 /* Glow pulsante en el logo del splash */
 var splashImg=splash?splash.querySelector('img'):null;
 if(splashImg){
  var gs=document.createElement('style');
  gs.textContent='@keyframes nxPulse{0%,100%{filter:drop-shadow(0 0 20px rgba(34,211,238,.6))}50%{filter:drop-shadow(0 0 50px rgba(244,114,182,.9))}}#splash img{animation:nxPulse 3s ease-in-out infinite}';
  document.head.appendChild(gs);
 }

 /* ═══ B) WRAP enterShop: fade-out premium al entrar ═══ */
 var _origEnter=window.enterShop;
 window.enterShop=function(){
  var sp=document.getElementById('splash');
  if(sp){
   sp.style.transition='opacity .8s ease, transform .8s ease';
   sp.style.opacity='0';
   sp.style.transform='scale(.95) translateY(-30px)';
   setTimeout(function(){_origEnter();animateHome()},800);
  }else{_origEnter();animateHome();}
 };

 function animateHome(){
  var s=document.createElement('style');
  s.textContent='@keyframes nxUp{0%{opacity:0;transform:translateY(40px)}100%{opacity:1;transform:translateY(0)}}#view{animation:nxUp .7s ease-out forwards}';
  document.head.appendChild(s);
 }

 /* ═══ C) SHOP NOW: scroll al grid (selector real) ═══ */
 setTimeout(function(){
  var btns=document.querySelectorAll('button');
  for(var i=0;i<btns.length;i++){
   if(/Shop Now/.test(btns[i].textContent)){
    btns[i].onclick=function(e){
     e.preventDefault();e.stopPropagation();
     var cards=document.querySelectorAll('[onclick^="openP("]');
     if(cards.length>0){cards[0].scrollIntoView({behavior:'smooth',block:'center'});}
     else{var v=document.getElementById('view');if(v)v.scrollIntoView({behavior:'smooth'});}
     return false;
    };
    break;
   }
  }
 },1500);

 /* ═══ D) MARQUEE: insertar después del hero card (selector real) ═══ */
 setTimeout(function(){
  if(document.getElementById('nxMq'))return;
  var view=document.getElementById('view');if(!view)return;
  var firstCard=view.querySelector('.card');
  if(!firstCard)return;
  var mq=document.createElement('div');mq.id='nxMq';
  mq.style.cssText='overflow:hidden;white-space:nowrap;border:1px solid rgba(34,211,238,.15);border-radius:12px;background:rgba(34,211,238,.06);font-size:11px;color:#a5f3fc;padding:8px 0;margin:10px 0';
  mq.innerHTML='<span style="display:inline-block;padding-left:100%;animation:nxScroll 25s linear infinite">🚀 NexusShop launch week · 7 products live · COD in all Pakistan · Committee Buy: 3 friends = −15% · 🚀 NexusShop launch week · 7 products live · COD in all Pakistan · Committee Buy: 3 friends = −15% · </span>';
  var st=document.createElement('style');st.textContent='@keyframes nxScroll{to{transform:translateX(-100%)}}';
  document.head.appendChild(st);
  firstCard.insertAdjacentElement('afterend',mq);
 },2000);

 /* ═══ E) INSTALL BUTTON: arriba a la IZQUIERDA (NO tapa Raahnuma) ═══ */
 if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js?v=2').catch(function(){});}
 var deferredPrompt=null;
 window.addEventListener('beforeinstallprompt',function(e){
  e.preventDefault();deferredPrompt=e;
  var btn=document.createElement('button');btn.title='Install NexusShop';
  btn.style.cssText='position:fixed;top:56px;left:12px;z-index:60;height:36px;border-radius:99px;border:1px solid rgba(34,211,238,.4);background:linear-gradient(135deg,#059669,#34d399);color:#fff;font-size:12px;font-weight:700;padding:0 14px;cursor:pointer;box-shadow:0 4px 16px rgba(5,150,105,.4);display:flex;align-items:center;gap:6px';
  btn.innerHTML='<img src="/icon.svg" style="width:20px;height:20px;border-radius:4px"> Install App';
  btn.onclick=function(){deferredPrompt.prompt();deferredPrompt.userChoice.then(function(){btn.remove();});};
  document.body.appendChild(btn);
 });

 /* ═══ F) SOPORTE EN CONFIGURACIÓN (botón ⚙️) ═══ */
 setTimeout(function(){
  var gearBtn=null;
  var btns=document.querySelectorAll('button');
  for(var i=0;i<btns.length;i++){if(btns[i].innerHTML.indexOf('⚙')>=0||btns[i].textContent.indexOf('⚙')>=0){gearBtn=btns[i];break;}}
  if(!gearBtn)return;
  var origClick=gearBtn.onclick;
  gearBtn.onclick=function(e){
   if(origClick)origClick.call(this,e);
   var existing=document.getElementById('nxSupportPanel');
   if(existing){existing.remove();return;}
   var p=document.createElement('div');p.id='nxSupportPanel';
   p.style.cssText='position:fixed;top:56px;left:50%;transform:translateX(-50%);z-index:9999;background:rgba(10,14,35,.97);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:20px;min-width:280px;max-width:90vw;box-shadow:0 20px 60px rgba(0,0,0,.6);text-align:center';
   p.innerHTML='<div style="font-size:15px;font-weight:800;margin-bottom:12px">⚙️ Settings & Support</div>'+
    '<div style="padding:12px;background:rgba(34,211,238,.08);border-radius:12px;border-left:3px solid #22d3ee;text-align:left;margin-bottom:12px">'+
    '<div style="font-size:10px;color:#67e8f9;font-weight:700;margin-bottom:4px">📧 SUPPORT 24/7</div>'+
    '<div style="font-size:13px;font-weight:600;color:#e2e8f0">neuralfocusai@gmail.com</div></div>'+
    '<button onclick="document.getElementById(\'nxSupportPanel\').remove()" style="width:100%;padding:10px;border:1px solid rgba(255,255,255,.15);border-radius:10px;background:transparent;color:#94a3b8;font-size:12px;cursor:pointer">Close</button>';
   document.body.appendChild(p);
  };
 },1000);

 /* ═══ G) PRECIOS COMPETITIVOS ═══ */
 function fixPrices(){
  var map={'Rs. 2,500/mo':'Rs. 1,999/mo','Rs. 5,000/mo':'Rs. 3,999/mo','Rs. 2,500/month':'Rs. 1,999/mo','Rs. 5,000/month':'Rs. 3,999/mo'};
  document.querySelectorAll('*').forEach(function(el){
   if(el.children.length>0)return;var t=el.textContent.trim();if(map[t])el.textContent=map[t];
  });
 }
 fixPrices();setTimeout(fixPrices,2000);setTimeout(fixPrices,4000);

 /* ═══ H) URDU SIN RELOAD ═══ */
 var UR={'Shop Now':'ابھی خریدیں','Start Selling — free':'فروخت شروع کریں — مفت','The marketplace that speaks your language':'وہ مارکیٹ جو آپ کی بولی بولتی ہے','Electronics':'الیکٹرانکس','Fashion':'فیشن','Home & Living':'گھر اور رہائش','Grocery':'گروسری','Beauty':'بیوٹی','Kids & Toys':'بچے اور کھلونے','All':'سب','FREE':'مفت','Start Free · Grow Fast':'مفت شروع کریں · تیزی سے بڑھیں','Made for Pakistan':'پاکستان کے لیے بنایا گیا','List in Minutes':'منٹوں میں لسٹ کریں','RECENTLY VIEWED':'حال ہی میں دیکھے گئے','Best match':'بہترین مطابقت','Cheapest':'سب سے سستا','Best selling':'سب سے زیادہ فروخت','Biggest deals':'بڑی ڈیلز','Add':'شامل','Sold by':'فروخت کنندہ','Cash on Delivery':'کیش آن ڈیلیوری','in stock':'اسٹاک میں','Out of stock':'اسٹاک ختم','Quantity':'تعداد','Details':'تفصیل','Doorstep delivery':'دہلیز پر ڈیلیوری','Seller arranges':'سیلر کا انتظام','Reviews':'جائزے','Start a group':'گروپ شروع کریں','Choose your plan':'اپنا پلان چنیں','Free':'مفت','Pro':'پرو','Max':'میکس','MOST POPULAR':'سب سے مقبول','Home':'ہوم','Reorder':'دوبارہ آرڈر','Orders':'آرڈرز','Sell':'بیچیں','Search products...':'مصنوعات تلاش کریں...','New':'نیا','Only 5 left':'صرف 5 باقی','Enter NexusShop · داخل ہوں':'NexusShop میں داخل ہوں','Welcome to Pakistan\'s Future':'پاکستان کے مستقبل میں خوش آمدید','Your marketplace, your language, your success.':'آپ کی مارکیٹ، آپ کی زبان، آپ کی کامیابی۔','COD nationwide':'پاکستان بھر میں COD','WhatsApp checkout':'واٹس ایپ چیک آؤٹ','Urdu + English':'اردو + انگریزی','Committee −15%':'کمیٹی −15%'};
 function doSweep(){var ur=document.documentElement.dir==='rtl';document.querySelectorAll('*').forEach(function(el){if(el.children.length>0||el.tagName==='SCRIPT'||el.tagName==='STYLE')return;var t=el.textContent.trim();if(ur&&UR[t])el.textContent=UR[t];});}
 var pUr=document.getElementById('pUr');if(pUr){var o=pUr.onclick;pUr.onclick=function(e){if(o)o.call(this,e);document.documentElement.dir='rtl';localStorage.setItem('nx_lang','ur');setTimeout(doSweep,300);};}
 var pEn=document.getElementById('pEn');if(pEn){var o2=pEn.onclick;pEn.onclick=function(e){if(o2)o2.call(this,e);document.documentElement.dir='ltr';localStorage.setItem('nx_lang','en');setTimeout(doSweep,300);};}
 /* Urdu toggle en header */
 setTimeout(function(){var btns=document.querySelectorAll('button');for(var i=0;i<btns.length;i++){if(btns[i].textContent.trim()==='اردو'){btns[i].addEventListener('click',function(){document.documentElement.dir='rtl';localStorage.setItem('nx_lang','ur');setTimeout(doSweep,300);});break;}}},1500);
 if(localStorage.getItem('nx_lang')==='ur'){document.documentElement.dir='rtl';setTimeout(doSweep,500);}

});
})();
