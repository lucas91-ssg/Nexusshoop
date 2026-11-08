/* ===== NX_FINAL v9 — mínimo y seguro ===== */
(function(){
"use strict";
function ready(fn){if(document.readyState!=='loading')fn();else document.addEventListener('DOMContentLoaded',fn);}
ready(function(){
/* precios */
function fixPrices(){var m={'Rs. 2,500/mo':'Rs. 1,999/mo','Rs. 5,000/mo':'Rs. 3,999/mo','Rs. 2,500/month':'Rs. 1,999/mo','Rs. 5,000/month':'Rs. 3,999/mo'};
 document.querySelectorAll('*').forEach(function(el){if(el.children.length>0)return;var t=el.textContent.trim();if(m[t])el.textContent=m[t];});}
fixPrices();setTimeout(fixPrices,2500);
/* gear + soporte */
if(!document.getElementById('nxGear')){
 var hdr=document.querySelector('header');
 if(hdr){var g=document.createElement('button');g.id='nxGear';g.className='icb';g.textContent='⚙️';
  g.onclick=function(){var x=document.getElementById('nxSupp');if(x){x.remove();return;}
   var p=document.createElement('div');p.id='nxSupp';
   p.style.cssText='position:fixed;top:60px;left:50%;transform:translateX(-50%);z-index:9999;background:rgba(10,14,35,.97);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:20px;min-width:280px;max-width:90vw;box-shadow:0 20px 60px rgba(0,0,0,.6);text-align:center';
   p.innerHTML='<div style="font-size:15px;font-weight:800;margin-bottom:12px">⚙️ Settings & Support</div><div style="padding:12px;background:rgba(34,211,238,.08);border-radius:12px;border-left:3px solid #22d3ee;text-align:left;margin-bottom:12px"><div style="font-size:10px;color:#67e8f9;font-weight:700;margin-bottom:4px">📧 SUPPORT 24/7</div><div style="font-size:13px;font-weight:600;color:#e2e8f0">neuralfocusai@gmail.com</div></div><button onclick="this.parentElement.remove()" style="width:100%;padding:10px;border:1px solid rgba(255,255,255,.15);border-radius:10px;background:transparent;color:#94a3b8;font-size:12px;cursor:pointer">Close</button>';
   document.body.appendChild(p);};
  hdr.insertBefore(g,document.getElementById('langB'));}}
/* install */
if(!document.getElementById('nxInstallBtn')){
 var b=document.createElement('button');b.id='nxInstallBtn';
 b.style.cssText='position:fixed;top:60px;right:12px;z-index:60;height:34px;border-radius:99px;border:1px solid rgba(34,211,238,.4);background:linear-gradient(135deg,#059669,#34d399);color:#fff;font-size:11.5px;font-weight:700;padding:0 12px;cursor:pointer;display:flex;align-items:center;gap:5px;box-shadow:0 4px 16px rgba(5,150,105,.4)';
 b.innerHTML='<img src="/icon.svg" style="width:18px;height:18px;border-radius:4px"> Install';
 var dp=null;window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();dp=e;});
 b.onclick=function(){if(dp){dp.prompt();dp.userChoice.then(function(){b.remove();dp=null;});}else alert('Tap ⋮ → "Add to Home screen"');};
 document.body.appendChild(b);}
/* urdu sweep */
var UR={'🛍️ Shop Now':'🛍️ ابھی خریدیں','🏪 Start Selling — free':'🏪 فروخت شروع کریں — مفت','Start Free · Grow Fast':'مفت شروع کریں · تیزی سے بڑھیں','Made for Pakistan':'پاکستان کے لیے بنایا گیا','List in Minutes':'منٹوں میں لسٹ کریں','5 products FREE forever. No credit card needed.':'5 مصنوعات ہمیشہ مفت۔ کوئی کریڈٹ کارڈ نہیں۔','5 Free Products':'5 مفت مصنوعات','Direct WhatsApp':'براہ راست واٹس ایپ','Zero Commission':'زیرو کمیشن','COD Ready':'COD تیار','Urdu Language':'اردو زبان','WhatsApp':'واٹس ایپ','Quick Setup':'جلدی سیٹ اپ','Easy Upload':'آسان اپ لوڈ','Fast Sales':'تیز فروخت','Search products…':'مصنوعات تلاش کریں…','All':'سب','Add':'شامل','Home':'ہوم','Wishlist':'پسندیدہ','Cart':'کارٹ','Orders':'آرڈرز','Sell':'بیچیں','RECENTLY VIEWED':'حال ہی میں دیکھے گئے','Best match':'بہترین مطابقت','Cheapest':'سب سے سستا','Best selling':'سب سے زیادہ فروخت','New':'نیا','Only 5 left':'صرف 5 باقی'};
function sweep(){if(document.documentElement.dir!=='rtl')return;document.querySelectorAll('*').forEach(function(el){if(el.children.length>0||el.tagName==='SCRIPT'||el.tagName==='STYLE')return;var t=el.textContent.trim();if(UR[t])el.textContent=UR[t];});}
var _r=window.render;if(_r&&!window._nx9){window._nx9=1;window.render=function(){_r.apply(this,arguments);setTimeout(sweep,150);setTimeout(fixPrices,200);};}
if(localStorage.getItem('nx_lang')==='ur')setTimeout(sweep,800);
});
})();
