/* ===== UX13: fix precios reales + urdu por botón + shop now robusto ===== */
(function(){
/* 1) PRECIOS: reemplazo directo de texto */
function fixPrices(){
 document.body.querySelectorAll('*').forEach(function(el){
  if(el.children.length>0)return;
  var t=el.textContent.trim();
  if(t==='Rs. 2,500/mo'||t==='Rs. 2,500/month')el.textContent='Rs. 1,999/mo';
  if(t==='Rs. 5,000/mo'||t==='Rs. 5,000/month')el.textContent='Rs. 3,999/mo';
  if(t==='Rs. 2,500')el.textContent='Rs. 1,999';
  if(t==='Rs. 5,000')el.textContent='Rs. 3,999';
 });
}
setTimeout(fixPrices,500);setTimeout(fixPrices,1500);

/* 2) URDU: detectar click en botón اردو y traducir TODO */
function setupUrdu(){
 var btn=[].slice.call(document.querySelectorAll('button')).find(function(b){return b.textContent.trim()==='اردو'});
 if(!btn)return;
 btn.onclick=function(){
  document.documentElement.dir='rtl';
  document.documentElement.lang='ur';
  localStorage.setItem('nx_lang','ur');
  doUrduSweep();
 };
 var enBtn=[].slice.call(document.querySelectorAll('button')).find(function(b){return b.textContent.trim()==='English'});
 if(enBtn)enBtn.onclick=function(){
  document.documentElement.dir='ltr';
  document.documentElement.lang='en';
  localStorage.setItem('nx_lang','en');
  ;
 };
 if(localStorage.getItem('nx_lang')==='ur'){document.documentElement.dir='rtl';setTimeout(doUrduSweep,300);}
}
var UR_MAP={'Shop Now':'ابھی خریدیں','Start Selling — free':'فروخت شروع کریں — مفت','The marketplace that speaks your language':'وہ مارکیٹ جو آپ کی بولی بولتی ہے','Cash on Delivery · WhatsApp checkout · Urdu, English & more · Group buys that cut prices':'کیش آن ڈیلیوری · واٹس ایپ چیک آؤٹ · اردو، انگریزی و مزید · گروپ خرید پر رعایت','Launch week in Lahore':'لاہور میں لانچ ہفتہ','First sellers onboarding now — free setup help by WhatsApp':'پہلے سیلرز ابھی شامل ہو رہے ہیں — واٹس ایپ سے مفت سیٹ اپ مدد','Electronics':'الیکٹرانکس','Fashion':'فیشن','Home & Living':'گھر اور رہائش','Grocery':'گروسری','Beauty':'بیوٹی','Kids & Toys':'بچے اور کھلونے','All':'سب','FREE':'مفت','Start Free · Grow Fast':'مفت شروع کریں · تیزی سے بڑھیں','5 products FREE forever. No credit card needed.':'5 مصنوعات ہمیشہ مفت۔ کوئی کریڈٹ کارڈ نہیں چاہیے۔','5 Free Products':'5 مفت مصنوعات','Direct WhatsApp':'براہ راست واٹس ایپ','Zero Commission':'زیرو کمیشن','Made for Pakistan':'پاکستان کے لیے بنایا گیا','Cash on Delivery, Urdu support, WhatsApp checkout.':'کیش آن ڈیلیوری، اردو سپورٹ، واٹس ایپ چیک آؤٹ۔','COD Ready':'COD تیار','Urdu Language':'اردو زبان','WhatsApp':'واٹس ایپ','List in Minutes':'منٹوں میں لسٹ کریں','From signup to first sale in under 24 hours.':'سائن اپ سے پہلی فروخت 24 گھنٹے میں۔','Quick Setup':'جلدی سیٹ اپ','Easy Upload':'آسان اپ لوڈ','Fast Sales':'تیز فروخت','RECENTLY VIEWED':'حال ہی میں دیکھے گئے','Best match':'بہترین مطابقت','Cheapest':'سب سے سستا','Best selling':'سب سے زیادہ فروخت','Biggest deals':'بڑی ڈیلز','Add':'شامل','Sold by':'فروخت کنندہ','Cash on Delivery':'کیش آن ڈیلیوری','Courier at checkout':'چیک آؤٹ پر کورئیر','in stock':'اسٹاک میں','Out of stock':'اسٹاک ختم','Quantity':'تعداد','Details':'تفصیل','Doorstep delivery':'دہلیز پر ڈیلیوری','Seller arranges':'سیلر کا انتظام','Reviews':'جائزے','Committee Buy · sath mein sasta':'کمیٹی خرید · ساتھ میں سستا','Join 3 buyers and everyone pays the committee price. Nobody pays until delivery (COD).':'3 خریداروں میں شامل ہوں اور سب کمیٹی قیمت ادا کریں۔ ڈیلیوری تک کوئی ادائیگی نہیں (COD)۔','Start a group':'گروپ شروع کریں','Choose your plan':'اپنا پلان چنیں','Buyers browse free forever. Paid features unlock only after the bank confirms your transfer.':'خریدار ہمیشہ مفت براؤز کرتے ہیں۔ ادائیگی کی خصوصیات صرف تب کھلتی ہیں جب بینک تصدیق کرے۔','Your plan: FREE':'آپ کا پلان: مفت','Available to you NOW:':'ابھی آپ کے لیے دستیاب:','Locked until you upgrade:':'اپ گریڈ تک مقفل:','Priority placement on home':'ہوم پر ترجیحی جگہ','Sales stats dashboard':'سیلز اسٹیٹس ڈیش بورڈ','Pro shop badge':'پرو دکان بیج','Official payment receipts':'سرکاری ادائیگی رسیدیں','Top-of-category placement':'کیٹیگری میں سرفہرست','Dedicated WhatsApp support':'مخصوص واٹس ایپ سپورٹ','Early access to new features':'نئی خصوصیات تک ابتدائی رسائی','Free':'مفت','Pro':'پرو','Max':'میکس','MOST POPULAR':'سب سے مقبول','Pay & unlock Pro →':'ادائیگی کریں اور پرو کھولیں →','Pay & unlock Max →':'ادائیگی کریں اور میکس کھولیں →','Start free — browse & sell →':'مفت شروع کریں — دیکھیں اور بیچیں →','Up to 5 products live':'5 مصنوعات تک لائیو','WhatsApp COD checkout':'واٹس ایپ COD چیک آؤٹ','Committee Buy groups':'کمیٹی خرید گروپس','Public shop profile':'عوامی دکان پروفائل','Smart sort & For-You rails':'سمارٹ ترتیب اور آپ کے لیے ریلیں','Up to 50 products live':'50 مصنوعات تک لائیو','Up to 500 products live':'500 مصنوعات تک لائیو','Everything in Pro':'پرو کی ہر چیز','Subscribe to Pro →':'پرو کی سبسکرائب کریں →','Subscribe to Max →':'میکس کی سبسکرائب کریں →','Already have an account? Sign in →':'پہلے سے اکاؤنٹ ہے؟ سائن ان کریں →','Notifications':'اطلاعات','Notificaciones activas':'اطلاعات فعال','We will notify you about everything important.':'ہم آپ کو ہر اہم چیز کی اطلاع دیں گے۔','Profile':'پروفائل','You are shopping as a guest — no account needed. Add your delivery details so sellers can reach you for COD orders.':'آپ مہمان کے طور پر خریداری کر رہے ہیں — اکاؤنٹ کی ضرورت نہیں۔','Add delivery details':'ڈیلیوری کی تفصیلات شامل کریں','Optional: sign in with email':'اختیاری: ای میل سے سائن ان کریں','Delivery details':'ڈیلیوری کی تفصیلات','No account needed. The seller uses this to deliver your COD order.':'اکاؤنٹ کی ضرورت نہیں۔','Full name':'پورا نام','City':'شہر','Continue →':'جاری رکھیں →','Back':'واپس','Cart':'کارٹ','Your cart is empty. Add something you love.':'آپ کا کارٹ خالی ہے۔','Orders':'آرڈرز','No orders yet. When you order, tracking lives here.':'ابھی آرڈر نہیں۔','Reorder':'دوبارہ آرڈر','Products you order will appear here — one tap to buy again.':'آپ کے آرڈر یہاں نظر آئیں گے۔','Sell on NexusShop':'NexusShop پر بیچیں','Start FREE with 5 products. Then upgrade from PKR 2,500/month.':'5 مصنوعات کے ساتھ مفت شروع کریں۔','Open Seller Center →':'سیلر سینٹر کھولیں →','See plans & subscribe →':'پلانز دیکھیں اور سبسکرائب کریں →','Plans & pricing (PKR)':'پلانز اور قیمتیں (PKR)','No login needed to compare. Subscribe opens the Seller Center payment desk.':'موازنہ کے لیے لاگ ان کی ضرورت نہیں۔','Rs. 0/month':'Rs. 0/ماہ','Rs. 2,500/month':'Rs. 1,999/ماہ','Rs. 5,000/month':'Rs. 3,999/ماہ','Enter NexusShop →':'NexusShop میں داخل ہوں →','COD nationwide':'پاکستان بھر میں COD','Urdu + English':'اردو + انگریزی','Committee −15%':'کمیٹی −15%','Cash on Delivery · Open-box before payment · Verified reviews only':'کیش آن ڈیلیوری · ادائیگی سے پہلے باکس کھولیں · صرف تصدیق شدہ جائزے','Your marketplace, your language, your success.':'آپ کی مارکیٹ، آپ کی زبان، آپ کی کامیابی۔','Welcome to Pakistan\'s Future':'پاکستان کے مستقبل میں خوش آمدید','New':'نیا','Only 5 left':'صرف 5 باقی','Best match':'بہترین مطابقت','Example catalog with real photos — test orders welcome. First Lahore sellers go live this week. Open Seller Center →':'مثالی کیٹلاگ حقیقی تصاویر کے ساتھ — ٹیسٹ آرڈرز خوش آمدید۔ لاہور کے پہلے سیلرز اس ہفتے لائیو ہوں گے۔','Home':'ہوم','Search products...':'مصنوعات تلاش کریں...'};
function doUrduSweep(){
 document.body.querySelectorAll('*').forEach(function(el){
  if(el.children.length>0)return;
  var t=el.textContent.trim();
  if(UR_MAP[t])el.textContent=UR_MAP[t];
 });
}
setTimeout(setupUrdu,800);

/* 3) SHOP NOW robusto */
function fixShopNow(){
 var btn=[].slice.call(document.querySelectorAll('button')).find(function(b){return /Shop Now/.test(b.textContent||'')});
 if(!btn)return;
 btn.onclick=function(e){e.preventDefault();e.stopPropagation();
  var grid=document.querySelector('#view');
  if(grid){grid.scrollIntoView({behavior:'smooth',block:'start'});}
  else{window.scrollTo({top:document.body.scrollHeight*0.4,behavior:'smooth'});}
 };
}
setTimeout(fixShopNow,1000);
})();
