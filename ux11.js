/* ===== UX11: complete EN/UR sweep + working Shop Now + real subscription system + Talal admin panel ===== */
(function(){
/* 1) SHOP NOW — scroll real al grid */
function shopNow(){var btn=[].slice.call(document.querySelectorAll('button')).find(function(b){return /Shop Now/.test(b.textContent||'')});
 if(!btn)return;btn.onclick=function(e){e.preventDefault();
  var grid=document.querySelector('#view [onclick^="openP("]');
  if(grid){grid.scrollIntoView({behavior:'smooth',block:'start'});
   var sb=document.getElementById('nxSortBar');
   if(sb){sb.style.boxShadow='0 0 0 3px #22d3ee, 0 0 30px rgba(34,211,238,.6)';setTimeout(function(){sb.style.boxShadow=''},1500);}}};}
setTimeout(shopNow,500);

/* 2) SISTEMA DE SUSCRIPCIÓN REAL */
window.NX_SUB=function(){var s=localStorage.getItem('nx_sub');return s?JSON.parse(s):{status:'free',plan:'free',verified:false};};
window.NX_SET_SUB=function(s){localStorage.setItem('nx_sub',JSON.stringify(s));};
window.NX_CAN=function(feature){var sub=NX_SUB();if(sub.status==='pro'||sub.status==='max')return true;if(sub.status==='pending')return false;
 var PRO=['priority_placement','stats_dashboard','pro_badge','payment_receipts'];
 var MAX=['top_category','dedicated_support','early_access'];
 if(PRO.indexOf(feature)>=0)return sub.status==='pro';
 if(MAX.indexOf(feature)>=0)return sub.status==='max';
 return true;};

/* 3) SWEEP EN/UR COMPLETO */
var UR={'Shop Now':'ابھی خریدیں','Start Selling — free':'فروخت شروع کریں — مفت','The marketplace that speaks your language':'وہ مارکیٹ جو آپ کی بولی بولتی ہے','Cash on Delivery · WhatsApp checkout · Urdu, English & more · Group buys that cut prices':'کیش آن ڈیلیوری · واٹس ایپ چیک آؤٹ · اردو، انگریزی و مزید · گروپ خرید پر رعایت','Launch week in Lahore':'لاہور میں لانچ ہفتہ','First sellers onboarding now — free setup help by WhatsApp':'پہلے سیلرز ابھی شامل ہو رہے ہیں — واٹس ایپ سے مفت سیٹ اپ مدد','Electronics':'الیکٹرانکس','Fashion':'فیشن','Home & Living':'گھر اور رہائش','Grocery':'گروسری','Beauty':'بیوٹی','Kids & Toys':'بچے اور کھلونے','All':'سب','FREE':'مفت','Start Free · Grow Fast':'مفت شروع کریں · تیزی سے بڑھیں','5 products FREE forever. No credit card needed.':'5 مصنوعات ہمیشہ مفت۔ کوئی کریڈٹ کارڈ نہیں چاہیے۔','5 Free Products':'5 مفت مصنوعات','Direct WhatsApp':'براہ راست واٹس ایپ','Zero Commission':'زیرو کمیشن','Made for Pakistan':'پاکستان کے لیے بنایا گیا','Cash on Delivery, Urdu support, WhatsApp checkout.':'کیش آن ڈیلیوری، اردو سپورٹ، واٹس ایپ چیک آؤٹ۔','COD Ready':'COD تیار','Urdu Language':'اردو زبان','WhatsApp':'واٹس ایپ','List in Minutes':'منٹوں میں لسٹ کریں','From signup to first sale in under 24 hours.':'سائن اپ سے پہلی فروخت 24 گھنٹے میں۔','Quick Setup':'جلدی سیٹ اپ','Easy Upload':'آسان اپ لوڈ','Fast Sales':'تیز فروخت','RECENTLY VIEWED':'حال ہی میں دیکھے گئے','New':'نیا','Only 5 left':'صرف 5 باقی','Best match':'بہترین مطابقت','Cheapest':'سب سے سستا','Best selling':'سب سے زیادہ فروخت','Biggest deals':'بڑی ڈیلز','Add':'شامل','Sold by':'فروخت کنندہ','Cash on Delivery':'کیش آن ڈیلیوری','Courier at checkout':'چیک آؤٹ پر کورئیر','in stock':'اسٹاک میں','Out of stock':'اسٹاک ختم','Quantity':'تعداد','Details':'تفصیل','Doorstep delivery':'دہلیز پر ڈیلیوری','Seller arranges':'سیلر کا انتظام','Reviews':'جائزے','reviews yet — be the first! Reviews unlock with the first delivered COD orders. Every review is tied to a real order, so ratings on NexusShop can never be faked.':'ابھی جائزے نہیں — پہلے بنیں! جائزے پہلی ڈیلیور شدہ COD آرڈرز کے ساتھ کھلتے ہیں۔ ہر جائزہ ایک حقیقی آرڈر سے جڑا ہے، اس لیے NexusShop پر ریٹنگز کبھی جعلی نہیں ہو سکتیں۔','Committee Buy · sath mein sasta':'کمیٹی خرید · ساتھ میں سستا','Join 3 buyers and everyone pays the committee price. Nobody pays until delivery (COD).':'3 خریداروں میں شامل ہوں اور سب کمیٹی قیمت ادا کریں۔ ڈیلیوری تک کوئی ادائیگی نہیں (COD)۔','Start a group':'گروپ شروع کریں','Choose your plan':'اپنا پلان چنیں','Buyers browse free forever. Paid features unlock only after the bank confirms your transfer.':'خریدار ہمیشہ مفت براؤز کرتے ہیں۔ ادائیگی کی خصوصیات صرف تب کھلتی ہیں جب بینک آپ کی منتقلی کی تصدیق کرے۔','Your plan: FREE':'آپ کا پلان: مفت','Available to you NOW:':'ابھی آپ کے لیے دستیاب:','Locked until you upgrade:':'اپ گریڈ تک مقفل:','Priority placement on home':'ہوم پر ترجیحی جگہ','Sales stats dashboard':'سیلز اسٹیٹس ڈیش بورڈ','Pro shop badge':'پرو دکان بیج','Official payment receipts':'سرکاری ادائیگی رسیدیں','Top-of-category placement':'کیٹیگری میں سرفہرست','Dedicated WhatsApp support':'مخصوص واٹس ایپ سپورٹ','Early access to new features':'نئی خصوصیات تک ابتدائی رسائی','Free':'مفت','Pro':'پرو','Max':'میکس','MOST POPULAR':'سب سے مقبول','Pay & unlock Pro →':'ادائیگی کریں اور پرو کھولیں →','Pay & unlock Max →':'ادائیگی کریں اور میکس کھولیں →','Start free — browse & sell →':'مفت شروع کریں — دیکھیں اور بیچیں →','Up to 5 products live':'5 مصنوعات تک لائیو','WhatsApp COD checkout':'واٹس ایپ COD چیک آؤٹ','Committee Buy groups':'کمیٹی خرید گروپس','Public shop profile':'عوامی دکان پروفائل','Smart sort & For-You rails':'سمارٹ ترتیب اور آپ کے لیے ریلیں','Up to 50 products live':'50 مصنوعات تک لائیو','Up to 500 products live':'500 مصنوعات تک لائیو','Everything in Pro':'پرو کی ہر چیز','Subscribe to Pro →':'پرو کی سبسکرائب کریں →','Subscribe to Max →':'میکس کی سبسکرائب کریں →','Already have an account? Sign in →':'پہلے سے اکاؤنٹ ہے؟ سائن ان کریں →','Notifications':'اطلاعات','Notificaciones activas':'اطلاعات فعال','We will notify you about everything important.':'ہم آپ کو ہر اہم چیز کی اطلاع دیں گے۔','Profile':'پروفائل','You are shopping as a guest — no account needed. Add your delivery details so sellers can reach you for COD orders.':'آپ مہمان کے طور پر خریداری کر رہے ہیں — اکاؤنٹ کی ضرورت نہیں۔ اپنی ڈیلیوری کی تفصیلات شامل کریں تاکہ سیلرز COD آرڈرز کے لیے آپ تک پہنچ سکیں۔','Add delivery details':'ڈیلیوری کی تفصیلات شامل کریں','Optional: sign in with email':'اختیاری: ای میل سے سائن ان کریں','Delivery details':'ڈیلیوری کی تفصیلات','No account needed. The seller uses this to deliver your COD order.':'اکاؤنٹ کی ضرورت نہیں۔ سیلر اسے آپ کا COD آرڈر ڈیلیور کرنے کے لیے استعمال کرتا ہے۔','Full name':'پورا نام','City':'شہر','Continue →':'جاری رکھیں →','Back':'واپس','Cart':'کارٹ','Your cart is empty. Add something you love.':'آپ کا کارٹ خالی ہے۔ کچھ پسندیدہ شامل کریں۔','Orders':'آرڈرز','No orders yet. When you order, tracking lives here.':'ابھی آرڈر نہیں۔ جب آرڈر کریں گے، ٹریکنگ یہاں ہوگی۔','Reorder':'دوبارہ آرڈر','Products you order will appear here — one tap to buy again.':'آپ کے آرڈر کردہ مصنوعات یہاں نظر آئیں گی — دوبارہ خریدنے کے لیے ایک ٹیپ۔','Sell on NexusShop':'NexusShop پر بیچیں','Start FREE with 5 products. Then upgrade from PKR 2,500/month.':'5 مصنوعات کے ساتھ مفت شروع کریں۔ پھر PKR 2,500/ماہ سے اپ گریڈ کریں۔','Open Seller Center →':'سیلر سینٹر کھولیں →','See plans & subscribe →':'پلانز دیکھیں اور سبسکرائب کریں →','Plans & pricing (PKR)':'پلانز اور قیمتیں (PKR)','No login needed to compare. Subscribe opens the Seller Center payment desk.':'موازنہ کے لیے لاگ ان کی ضرورت نہیں۔ سبسکرائب سیلر سینٹر پےمنٹ ڈیسک کھولتا ہے۔','Rs. 0/month':'Rs. 0/ماہ','Rs. 2,500/month':'Rs. 2,500/ماہ','Rs. 5,000/month':'Rs. 5,000/ماہ','Enter NexusShop →':'NexusShop میں داخل ہوں →','COD nationwide':'پاکستان بھر میں COD','Urdu + English':'اردو + انگریزی','Committee −15%':'کمیٹی −15%','Cash on Delivery · Open-box before payment · Verified reviews only':'کیش آن ڈیلیوری · ادائیگی سے پہلے باکس کھولیں · صرف تصدیق شدہ جائزے','Your marketplace, your language, your success.':'آپ کی مارکیٹ، آپ کی زبان، آپ کی کامیابی۔','Welcome to Pakistan\'s Future':'پاکستان کے مستقبل میں خوش آمدید'};

function sweep(root){var ur=document.documentElement.dir==='rtl';if(!ur)return;
 root.querySelectorAll('*').forEach(function(el){if(el.children.length>0)return;var t=el.textContent.trim();if(!t)return;
  if(UR[t])el.textContent=UR[t];});}

/* 4) PANEL ADMIN PARA TALAL */
window.NX_TALAL_ADMIN=function(){if(!window.SB)return;
 var ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:9999;background:#05070f;overflow-y:auto;padding:16px';
 ov.innerHTML='<div style="max-width:600px;margin:0 auto"><button onclick="this.parentElement.parentElement.remove()" style="background:transparent;border:1px solid rgba(255,255,255,.2);color:#fff;padding:8px 14px;border-radius:8px;margin-bottom:12px">← Back</button>'+
 '<h2 style="font-size:20px;font-weight:900;margin-bottom:16px">🕵️ Bank Audit — Pending Payments</h2>'+
 '<div id="nxPayList">Loading...</div></div>';
 document.body.appendChild(ov);
 SB.from('payments').select('*').eq('status','pending').order('created_at',{ascending:false}).then(function(r){var list=document.getElementById('nxPayList');
  if(!r.data||!r.data.length){list.innerHTML='<p style="color:#64748b">No pending payments.</p>';return;}
  list.innerHTML=r.data.map(function(p){return '<div style="border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:12px;margin-bottom:10px;background:rgba(255,255,255,.03)">'+
   '<div style="font-size:11px;color:#67e8f9;margin-bottom:6px">'+p.receipt_code+'</div>'+
   '<div style="font-size:13px;line-height:1.6"><b>Plan:</b> '+p.plan.toUpperCase()+' · <b>Amount:</b> Rs. '+p.amount_pkr.toLocaleString()+'<br>'+
   '<b>Ref:</b> '+p.ref_text+'<br><b>TID:</b> '+p.txn_ref+'<br><b>Date:</b> '+new Date(p.created_at).toLocaleString()+'</div>'+
   '<div style="display:flex;gap:8px;margin-top:10px">'+
   '<button onclick="nxConfirmPay(\''+p.id+'\')" style="flex:1;background:linear-gradient(90deg,#059669,#34d399);border:0;border-radius:8px;padding:10px;color:#fff;font-weight:700;cursor:pointer">✓ Bank confirmed</button>'+
   '<button onclick="nxRejectPay(\''+p.id+'\')" style="flex:1;background:transparent;border:1px solid rgba(244,114,182,.4);color:#f472b6;border-radius:8px;padding:10px;font-weight:700;cursor:pointer">✗ Reject</button></div></div>';}).join('');});};

window.nxConfirmPay=function(id){if(!window.SB)return;
 SB.from('payments').update({status:'active',verified:true,verified_at:new Date().toISOString()}).eq('id',id).then(function(r){
  if(r.error){alert('Error: '+r.error.message);return;}
  alert('✓ Payment confirmed. Receipt issued. Features unlocked.');
  NX_TALAL_ADMIN();});};

window.nxRejectPay=function(id){if(!window.SB)return;
 SB.from('payments').update({status:'rejected'}).eq('id',id).then(function(r){
  if(r.error){alert('Error: '+r.error.message);return;}
  alert('✗ Payment rejected.');
  NX_TALAL_ADMIN();});};

/* 5) BLOQUEO FUNCIONAL DE FEATURES PRO/MAX */
function lockFeatures(){var sub=NX_SUB();if(sub.status==='pro'||sub.status==='max')return;
 document.querySelectorAll('[data-pro],[data-max]').forEach(function(el){
  var need=el.dataset.pro?'pro':'max';
  if(sub.status!==need){el.style.opacity='0.5';el.style.pointerEvents='none';
   el.insertAdjacentHTML('beforeend','<span style="position:absolute;top:4px;right:4px;background:#f472b6;color:#fff;font-size:9px;font-weight:800;padding:2px 6px;border-radius:99px">LOCKED</span>');}});}
setTimeout(lockFeatures,1000);

/* 6) APLICAR SWEEP EN CADA RENDER */
var _r11=render;render=function(){_r11();setTimeout(function(){sweep(document.body);},100);};
})();
