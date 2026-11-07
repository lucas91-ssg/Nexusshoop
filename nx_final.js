/* ===== NX_FINAL: el único archivo de UX — precios + urdu + shop now, sin loops ===== */
(function(){
"use strict";
var INIT_DONE=false;

function init(){
 if(INIT_DONE)return;INIT_DONE=true;
 
 /* A) PRECIOS CORRECTOS */
 var priceMap={'Rs. 2,500/mo':'Rs. 1,999/mo','Rs. 5,000/mo':'Rs. 3,999/mo',
               'Rs. 2,500/month':'Rs. 1,999/mo','Rs. 5,000/month':'Rs. 3,999/mo'};
 document.body.querySelectorAll('*').forEach(function(el){
  if(el.children.length>0)return;
  var t=el.textContent.trim();
  if(priceMap[t])el.textContent=priceMap[t];
 });
 
 /* B) URDU SIN RELOADS */
 var UR={};
 UR['Shop Now']='ابھی خریدیں';UR['Start Selling — free']='فروخت شروع کریں — مفت';
 UR['The marketplace that speaks your language']='وہ مارکیٹ جو آپ کی بولی بولتی ہے';
 UR['Cash on Delivery · WhatsApp checkout · Urdu, English & more · Group buys that cut prices']='کیش آن ڈیلیوری · واٹس ایپ چیک آؤٹ · اردو، انگریزی و مزید · گروپ خرید پر رعایت';
 UR['Launch week in Lahore']='لاہور میں لانچ ہفتہ';
 UR['First sellers onboarding now — free setup help by WhatsApp']='پہلے سیلرز ابھی شامل ہو رہے ہیں — واٹس ایپ سے مفت سیٹ اپ مدد';
 UR['Electronics']='الیکٹرانکس';UR['Fashion']='فیشن';UR['Home & Living']='گھر اور رہائش';
 UR['Grocery']='گروسری';UR['Beauty']='بیوٹی';UR['Kids & Toys']='بچے اور کھلونے';
 UR['All']='سب';UR['FREE']='مفت';UR['Start Free · Grow Fast']='مفت شروع کریں · تیزی سے بڑھیں';
 UR['5 products FREE forever. No credit card needed.']='5 مصنوعات ہمیشہ مفت۔ کوئی کریڈٹ کارڈ نہیں چاہیے۔';
 UR['5 Free Products']='5 مفت مصنوعات';UR['Direct WhatsApp']='براہ راست واٹس ایپ';
 UR['Zero Commission']='زیرو کمیشن';UR['Made for Pakistan']='پاکستان کے لیے بنایا گیا';
 UR['Cash on Delivery, Urdu support, WhatsApp checkout.']='کیش آن ڈیلیوری، اردو سپورٹ، واٹس ایپ چیک آؤٹ۔';
 UR['COD Ready']='COD تیار';UR['Urdu Language']='اردو زبان';UR['WhatsApp']='واٹس ایپ';
 UR['List in Minutes']='منٹوں میں لسٹ کریں';
 UR['From signup to first sale in under 24 hours.']='سائن اپ سے پہلی فروخت 24 گھنٹے میں۔';
 UR['Quick Setup']='جلدی سیٹ اپ';UR['Easy Upload']='آسان اپ لوڈ';UR['Fast Sales']='تیز فروخت';
 UR['RECENTLY VIEWED']='حال ہی میں دیکھے گئے';UR['Best match']='بہترین مطابقت';
 UR['Cheapest']='سب سے سستا';UR['Best selling']='سب سے زیادہ فروخت';
 UR['Biggest deals']='بڑی ڈیلز';UR['Add']='شامل';UR['Sold by']='فروخت کنندہ';
 UR['Cash on Delivery']='کیش آن ڈیلیوری';UR['Courier at checkout']='چیک آؤٹ پر کورئیر';
 UR['in stock']='اسٹاک میں';UR['Out of stock']='اسٹاک ختم';UR['Quantity']='تعداد';
 UR['Details']='تفصیل';UR['Doorstep delivery']='دہلیز پر ڈیلیوری';
 UR['Seller arranges']='سیلر کا انتظام';UR['Reviews']='جائزے';
 UR['Committee Buy · sath mein sasta']='کمیٹی خرید · ساتھ میں سستا';
 UR['Join 3 buyers and everyone pays the committee price. Nobody pays until delivery (COD).']='3 خریداروں میں شامل ہوں اور سب کمیٹی قیمت ادا کریں۔';
 UR['Start a group']='گروپ شروع کریں';UR['Choose your plan']='اپنا پلان چنیں';
 UR['Free']='مفت';UR['Pro']='پرو';UR['Max']='میکس';
 UR['MOST POPULAR']='سب سے مقبول';
 UR['Pay & unlock Pro →']='ادائیگی کریں اور پرو کھولیں →';
 UR['Pay & unlock Max →']='ادائیگی کریں اور میکس کھولیں →';
 UR['Start free — browse & sell →']='مفت شروع کریں — دیکھیں اور بیچیں →';
 UR['Up to 5 products live']='5 مصنوعات تک لائیو';
 UR['WhatsApp COD checkout']='واٹس ایپ COD چیک آؤٹ';
 UR['Committee Buy groups']='کمیٹی خرید گروپس';
 UR['Public shop profile']='عوامی دکان پروفائل';
 UR['Smart sort & For-You rails']='سمارٹ ترتیب اور آپ کے لیے ریلیں';
 UR['Up to 50 products live']='50 مصنوعات تک لائیو';
 UR['Up to 500 products live']='500 مصنوعات تک لائیو';
 UR['Everything in Pro']='پرو کی ہر چیز';
 UR['Subscribe to Pro →']='پرو کی سبسکرائب کریں →';
 UR['Subscribe to Max →']='میکس کی سبسکرائب کریں →';
 UR['Already have an account? Sign in →']='پہلے سے اکاؤنٹ ہے؟ سائن ان کریں →';
 UR['Notifications']='اطلاعات';UR['Profile']='پروفائل';
 UR['Add delivery details']='ڈیلیوری کی تفصیلات شامل کریں';
 UR['Optional: sign in with email']='اختیاری: ای میل سے سائن ان کریں';
 UR['Delivery details']='ڈیلیوری کی تفصیلات';
 UR['Full name']='پورا نام';UR['City']='شہر';UR['Continue →']='جاری رکھیں →';
 UR['Back']='واپس';UR['Cart']='کارٹ';
 UR['Your cart is empty. Add something you love.']='آپ کا کارٹ خالی ہے۔';
 UR['Orders']='آرڈرز';
 UR['No orders yet. When you order, tracking lives here.']='ابھی آرڈر نہیں۔';
 UR['Reorder']='دوبارہ آرڈر';
 UR['Products you order will appear here — one tap to buy again.']='آپ کے آرڈر یہاں نظر آئیں گے۔';
 UR['Sell on NexusShop']='NexusShop پر بیچیں';
 UR['Open Seller Center →']='سیلر سینٹر کھولیں →';
 UR['See plans & subscribe →']='پلانز دیکھیں اور سبسکرائب کریں →';
 UR['Plans & pricing (PKR)']='پلانز اور قیمتیں (PKR)';
 UR['Rs. 0/month']='Rs. 0/ماہ';UR['Rs. 2,500/month']='Rs. 1,999/ماہ';
 UR['Rs. 5,000/month']='Rs. 3,999/ماہ';
 UR['Enter NexusShop →']='NexusShop میں داخل ہوں →';
 UR['COD nationwide']='پاکستان بھر میں COD';UR['Urdu + English']='اردو + انگریزی';
 UR['Committee −15%']='کمیٹی −15%';
 UR['New']='نیا';UR['Only 5 left']='صرف 5 باقی';UR['Home']='ہوم';
 UR['Search products...']='مصنوعات تلاش کریں...';

 function translateToUrdu(){
  document.documentElement.dir='rtl';document.documentElement.lang='ur';
  localStorage.setItem('nx_lang','ur');
  document.body.querySelectorAll('*').forEach(function(el){
   if(el.children.length>0||el.tagName==='SCRIPT'||el.tagName==='STYLE')return;
   var t=el.textContent.trim();if(!t)return;
   if(UR[t])el.textContent=UR[t];
  });
 }
 
 function translateToEnglish(){
  document.documentElement.dir='ltr';document.documentElement.lang='en';
  localStorage.setItem('nx_lang','en');
  location.reload(); // Solo para volver a inglés limpio
 }
 
 var urduBtn=[].slice.call(document.querySelectorAll('button')).find(function(b){return b.textContent.trim()==='اردو'});
 var enBtn=[].slice.call(document.querySelectorAll('button')).find(function(b){return b.textContent.trim()==='English'});
 
 if(urduBtn)urduBtn.onclick=function(e){e.preventDefault();translateToUrdu();return false;};
 if(enBtn)enBtn.onclick=function(e){e.preventDefault();translateToEnglish();return false;};
 
 if(localStorage.getItem('nx_lang')==='ur'){
  setTimeout(translateToUrdu,200);
 }
 
 /* C) SHOP NOW FUNCIONAL */
 var shopBtn=[].slice.call(document.querySelectorAll('button')).find(function(b){return /Shop Now/.test(b.textContent||'')});
 if(shopBtn){
  shopBtn.onclick=function(e){e.preventDefault();
   var grid=document.querySelector('#view');
   if(grid)grid.scrollIntoView({behavior:'smooth',block:'start'});
   else window.scrollTo({top:600,behavior:'smooth'});
   return false;
  };
 }
}

// Ejecutar UNA sola vez cuando todo esté listo
if(document.readyState==='complete')init();
else window.addEventListener('load',init);
})();
