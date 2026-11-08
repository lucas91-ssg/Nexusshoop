/* ===== NX_FINAL v8 — enterShop wrap seguro + precios + urdu + install + soporte ===== */
(function(){
"use strict";
function ready(fn){if(document.readyState!=='loading')fn();else document.addEventListener('DOMContentLoaded',fn);}
ready(function(){

/* A) WRAP enterShop: animación de salida del splash */
if(typeof window.enterShop==='function'&&!window._nxEnterWrapped){
 window._nxEnterWrapped=true;
 var _orig=window.enterShop;
 window.enterShop=function(){
  var sp=document.getElementById('splash');
  if(sp){
   sp.style.transition='opacity .9s ease, transform .9s ease, filter .9s ease';
   sp.style.opacity='0';
   sp.style.transform='scale(1.08)';
   sp.style.filter='blur(8px)';
   setTimeout(function(){
    _orig();
    var s=document.createElement('style');
    s.textContent='@keyframes nxUp{0%{opacity:0;transform:translateY(40px)}100%{opacity:1;transform:translateY(0)}}#view>*{animation:nxUp .6s ease-out backwards}#view>*:nth-child(1){animation-delay:.05s}#view>*:nth-child(2){animation-delay:.12s}#view>*:nth-child(3){animation-delay:.19s}#view>*:nth-child(4){animation-delay:.26s}#view>*:nth-child(5){animation-delay:.33s}';
    document.head.appendChild(s);
   },900);
  }else{_orig();}
 };
}

/* B) PRECIOS */
function fixPrices(){
 var map={'Rs. 2,500/mo':'Rs. 1,999/mo','Rs. 5,000/mo':'Rs. 3,999/mo','Rs. 2,500/month':'Rs. 1,999/mo','Rs. 5,000/month':'Rs. 3,999/mo'};
 document.querySelectorAll('*').forEach(function(el){
  if(el.children.length>0)return;var t=el.textContent.trim();if(map[t])el.textContent=map[t];
 });
}
fixPrices();setTimeout(fixPrices,2000);setTimeout(fixPrices,4000);
var _r=window.render;if(_r&&!window._nxRenderWrapped){window._nxRenderWrapped=true;window.render=function(){_r.apply(this,arguments);setTimeout(fixPrices,400);};}

/* C) URDU */
var UR={'🛍️ Shop Now':'🛍️ ابھی خریدیں','🏪 Start Selling — free':'🏪 فروخت شروع کریں — مفت','Shop Now':'ابھی خریدیں','Start Selling — free':'فروخت شروع کریں — مفت','The marketplace that speaks your language':'وہ مارکیٹ جو آپ کی بولی بولتی ہے','Electronics':'الیکٹرانکس','Fashion':'فیشن','Home & Living':'گھر اور رہائش','Grocery':'گروسری','Beauty':'بیوٹی','Kids & Toys':'بچے اور کھلونے','All':'سب','FREE':'مفت','Start Free · Grow Fast':'مفت شروع کریں · تیزی سے بڑھیں','Made for Pakistan':'پاکستان کے لیے بنایا گیا','List in Minutes':'منٹوں میں لسٹ کریں','RECENTLY VIEWED':'حال ہی میں دیکھے گئے','Best match':'بہترین مطابقت','Cheapest':'سب سے سستا','Best selling':'سب سے زیادہ فروخت','Biggest deals':'بڑی ڈیلز','Add':'شامل','Sold by':'فروخت کنندہ','Cash on Delivery':'کیش آن ڈیلیوری','in stock':'اسٹاک میں','Out of stock':'اسٹاک ختم','Quantity':'تعداد','Details':'تفصیل','Doorstep delivery':'دہلیز پر ڈیلیوری','Seller arranges':'سیلر کا انتظام','Reviews':'جائزے','Start a group':'گروپ شروع کریں','Choose your plan':'اپنا پلان چنیں','Free':'مفت','Pro':'پرو','Max':'میکس','MOST POPULAR':'سب سے مقبول','Home':'ہوم','Reorder':'دوبارہ آرڈر','Orders':'آرڈرز','Sell':'بیچیں','Search products...':'مصنوعات تلاش کریں...','New':'نیا','Only 5 left':'صرف 5 باقی','Welcome to Pakistan\'s Future':'پاکستان کے مستقبل میں خوش آمدید','Your marketplace, your language, your success.':'آپ کی مارکیٹ، آپ کی زبان، آپ کی کامیابی۔','COD nationwide':'پاکستان بھر میں COD','WhatsApp checkout':'واٹس ایپ چیک آؤٹ','Urdu + English':'اردو + انگریزی','Committee −15%':'کمیٹی −15%','Enter NexusShop · داخل ہوں':'NexusShop میں داخل ہوں'};
function doSweep(){var ur=document.documentElement.dir==='rtl';document.querySelectorAll('*').forEach(function(el){if(el.children.length>0||el.tagName==='SCRIPT'||el.tagName==='STYLE')return;var t=el.textContent.trim();if(ur&&UR[t])el.textContent=UR[t];});}
var pUr=document.getElementById('pUr');if(pUr)pUr.addEventListener('click',function(){document.documentElement.dir='rtl';localStorage.setItem('nx_lang','ur');setTimeout(doSweep,400);});
var pEn=document.getElementById('pEn');if(pEn)pEn.addEventListener('click',function(){document.documentElement.dir='ltr';localStorage.setItem('nx_lang','en');setTimeout(doSweep,400);});
setTimeout(function(){var btns=document.querySelectorAll('button');for(var i=0;i<btns.length;i++){if(btns[i].textContent.trim()==='اردو'){btns[i].addEventListener('click',function(){document.documentElement.dir='rtl';localStorage.setItem('nx_lang','ur');setTimeout(doSweep,400);});break;}}},2000);
if(localStorage.getItem('nx_lang')==='ur'){document.documentElement.dir='rtl';setTimeout(doSweep,600);}

/* D) INSTALL */
if(!document.getElementById('nxInstallBtn')){
 var btn=document.createElement('button');btn.id='nxInstallBtn';btn.title='Install NexusShop';
 btn.style.cssText='position:fixed;top:56px;left:12px;z-index:60;height:34px;border-radius:99px;border:1px solid rgba(34,211,238,.4);background:linear-gradient(135deg,#059669,#34d399);color:#fff;font-size:11.5px;font-weight:700;padding:0 12px;cursor:pointer;box-shadow:0 4px 16px rgba(5,150,105,.4);display:flex;align-items:center;gap:5px';
 btn.innerHTML='<img src="/icon.svg" style="width:18px;height:18px;border-radius:4px"> Install';
 var dp=null;window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();dp=e;});
 btn.onclick=function(){if(dp){dp.prompt();dp.userChoice.then(function(){btn.remove();dp=null;});}else{alert('Tap ⋮ menu → "Add to Home screen"');}};
 document.body.appendChild(btn);
}

/* E) SOPORTE EN ⚙️ */
setTimeout(function(){
 var hdr=document.querySelector('#hdr');if(!hdr)return;
 var btns=hdr.querySelectorAll('button');
 for(var i=0;i<btns.length;i++){
  if(btns[i].innerHTML.indexOf('⚙')>=0){
   btns[i].addEventListener('click',function(){
    setTimeout(function(){
     if(document.getElementById('nxSupp'))return;
     var p=document.createElement('div');p.id='nxSupp';
     p.style.cssText='position:fixed;top:56px;left:50%;transform:translateX(-50%);z-index:9999;background:rgba(10,14,35,.97);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:20px;min-width:280px;max-width:90vw;box-shadow:0 20px 60px rgba(0,0,0,.6);text-align:center';
     p.innerHTML='<div style="font-size:15px;font-weight:800;margin-bottom:12px">⚙️ Settings</div><div style="padding:12px;background:rgba(34,211,238,.08);border-radius:12px;border-left:3px solid #22d3ee;text-align:left;margin-bottom:12px"><div style="font-size:10px;color:#67e8f9;font-weight:700;margin-bottom:4px">📧 SUPPORT 24/7</div><div style="font-size:13px;font-weight:600;color:#e2e8f0">neuralfocusai@gmail.com</div></div><button onclick="this.parentElement.remove()" style="width:100%;padding:10px;border:1px solid rgba(255,255,255,.15);border-radius:10px;background:transparent;color:#94a3b8;font-size:12px;cursor:pointer">Close</button>';
     document.body.appendChild(p);
    },200);
   });break;
  }
 }
},1500);

});
})();
