/* ===== UX8: official logo splash + REAL notifications + full EN/UR sweep + photo & flash pack ===== */
(function(){
document.head.insertAdjacentHTML('beforeend','<style>#view [onclick^="openP("]{transition:transform .18s}#view [onclick^="openP("]:active{transform:scale(.97)}#view [onclick^="openP("] img{transition:transform .6s}#view [onclick^="openP("]:active img{transform:scale(1.08)}#nxHero{animation:nxfloat 6s ease-in-out infinite}@keyframes nxfloat{50%{transform:translateY(-4px)}}</style>');
/* 1) splash logo oficial */
function logoUp(){var s=document.getElementById('splash');if(!s||s.dataset.logo)return;s.dataset.logo='1';
 var lock=document.createElement('div');lock.style.cssText='display:flex;justify-content:center;margin:-10px 0 4px';
 lock.innerHTML='<img src="icon.svg" alt="NexusShop logo" style="width:86px;height:86px;filter:drop-shadow(0 0 26px rgba(34,211,238,.85)) drop-shadow(0 0 60px rgba(244,114,182,.5))">';
 var cube=s.querySelector('[class*="cube"],[id*="cube"]');if(cube)cube.parentElement.insertBefore(lock,cube);else s.insertBefore(lock,s.firstChild);}
setTimeout(logoUp,300);setTimeout(logoUp,1000);
/* 2) notificaciones REALES vía service worker */
function sysNotif(title,body){if(!('Notification' in window)||Notification.permission!=='granted')return;
 if(navigator.serviceWorker&&navigator.serviceWorker.ready){navigator.serviceWorker.ready.then(function(r){try{r.showNotification(title,{body:body,icon:'/icon.svg',badge:'/icon.svg',vibrate:[120,60,120]})}catch(e){try{new Notification(title,{body:body})}catch(e2){}}});}
 else{try{new Notification(title,{body:body})}catch(e){}}}
var _n8=window.nxNotify;
window.nxNotify=function(i,t,b){_n8(i,t,b);sysNotif(i+' '+t,b);};
/* 3) i18n sweep */
var UR={'🛍️ Shop Now':'🛍️ ابھی خریدیں','🏪 Start Selling — free':'🏪 فروخت شروع کریں — مفت','The marketplace that speaks your language':'وہ مارکیٹ جو آپ کی بولی بولتی ہے','Cash on Delivery · WhatsApp checkout · Urdu, English & more · Group buys that cut prices':'کیش آن ڈیلیوری · واٹس ایپ چیک آؤٹ · اردو، انگریزی و مزید · گروپ خرید پر رعایت','✨ Best match':'✨ بہترین مطابقت','💸 Cheapest':'💸 سب سے سستا','🔥 Best selling':'🔥 سب سے زیادہ فروخت','🏷️ Biggest deals':'🏷️ بڑی ڈیلز','💡 FOR YOU — based on what you viewed':'💡 آپ کے لیے — جو آپ نے دیکھا','⭐ FEATURED TODAY':'⭐ آج نمایاں','👀 RECENTLY VIEWED':'👀 حال میں دیکھے گئے','🔔 Notifications':'🔔 اطلاعات','Notifications':'اطلاعات','Choose your plan':'اپنا پلان چنیے','MOST POPULAR':'سب سے مقبول','💳 Pay & unlock Pro →':'💳 ادائیگی کریں اور پرو کھولیں →','💳 Pay & unlock Max →':'💳 ادائیگی کریں اور میکس کھولیں →','🛍️ Start free — browse & sell →':'🛍️ مفت شروع کریں — دیکھیں اور بیچیں →','Transfer the amount in YOUR bank app':'اپنی بینک ایپ میں رقم منتقل کریں','Declare the Transaction ID here':'ٹرانزیکشن آئی ڈی یہاں درج کریں','Talal confirms in the MCB statement (≤24h)':'طلال MCB اسٹیٹمنٹ میں تصدیق کریں گے (≤24 گھنٹے)','Official PAID receipt + features unlock':'سرکاری PAID رسید + فیچرز ان لاک','I executed the transfer — declare payment':'میں نے منتقلی کر دی — ادائیگی کا اعلان کریں','Your seller email OR shop name':'آپ کی سیلر ای میل یا دکان کا نام','Transaction ID / slip number':'ٹرانزیکشن آئی ڈی / سلپ نمبر','Bank transfer':'بینک منتقلی','Method':'طریقہ','Activate notifications':'اطلاعات فعال کریں','Not now':'ابھی نہیں','· Up to 5 products live':'· 5 پروڈکٹس تک لائیو','· WhatsApp COD checkout':'· واٹس ایپ COD چیک آؤٹ','· Committee Buy groups':'· کمیٹی گروپس','· Public shop profile':'· عوامی دکان پروفائل','· Up to 50 products live':'· 50 پروڈکٹس تک لائیو','· Priority placement on home':'· ہوم پر ترجیحی جگہ','· Sales stats dashboard':'· سیلز اسٹیٹس ڈیش بورڈ','· Pro shop badge':'· پرو دکان بیج','· Official payment receipts':'· سرکاری ادائیگی رسیدیں','· Up to 500 products live':'· 500 پروڈکٹس تک لائیو','· Top-of-category placement':'· کیٹیگری میں سرفہرست','· Everything in Pro':'· پرو کی ہر چیز','· Dedicated WhatsApp support':'· مخصوص واٹس ایپ سپورٹ','· Early access to new features':'· نئے فیچرز تک ابتدائی رسائی'};
var ES2EN={'✨ Nuevo':'✨ New','Activá las notificaciones':'Activate notifications','Ahora no':'Not now','Notificaciones activas':'Notifications active','Te avisaremos de todo lo importante.':'We will notify you about everything important.'};
function fixBadges(el,ur){var t=el.textContent.trim(),m;
 if(t==='✨ Nuevo'||t==='✨ New'){el.textContent=ur?'✨ نیا':'✨ New';return;}
 if(m=t.match(/^Quedan (\d+)$/)){el.textContent=ur?('صرف '+m[1]+' باقی'):('Only '+m[1]+' left');return;}
 if(m=t.match(/^🔥 (\d+) vendidos$/)){el.textContent=ur?('🔥 '+m[1]+' فروخت'):('🔥 '+m[1]+' sold');return;}
 if(m=t.match(/^📊 (\d+)% (below|above) similar items$/)){el.textContent=ur?('📊 اسی جیسی اشیاء سے '+m[1]+'% '+(m[2]==='below'?'کم':'زیادہ')):t;return;}}
window.nxSweep=function(root){var ur=document.documentElement.dir==='rtl';
 root.querySelectorAll('span,button,b,div,h2,p,li').forEach(function(el){if(el.children.length)return;var t=el.textContent.trim();if(!t)return;
  fixBadges(el,ur);if(ur){if(UR[t])el.textContent=UR[t];}else{if(ES2EN[t])el.textContent=ES2EN[t];if(UR[t]&&el.dataset.urdone){el.dataset.urdone='';}}
  if(ur)el.dataset.urdone='1';});};
/* 4) +4 productos demo con fotos */
function addDemos(){if(!window.PRODS)return setTimeout(addDemos,1500);
 var D=[{id:'demo-w1',name:'Smart Watch T900 Ultra',price:3499,old:4999,img:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=70',desc:'Bluetooth calling, heart rate, 7 day battery. COD all Pakistan.',stock:12,sold:0,demo:true},
 {id:'demo-p1',name:'Perfume Attar Oud 12ml',price:1299,old:1899,img:'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=70',desc:'Long lasting oud attar in gift box. COD.',stock:20,sold:0,demo:true},
 {id:'demo-k1',name:'Electric Kettle 1.8L Steel',price:2799,old:3599,img:'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=70',desc:'Fast boil, auto cut-off, 1 year warranty. COD.',stock:8,sold:0,demo:true},
 {id:'demo-e1',name:'Wireless Earbuds AirDots',price:1999,old:2999,img:'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=70',desc:'Touch control, charging case, bass boost. COD.',stock:15,sold:0,demo:true}];
 D.forEach(function(d){if(!PRODS.find(function(p){return p.id===d.id}))PRODS.push(d);});}
setTimeout(addDemos,1800);
/* 5) wraps: render + overlays con sweep */
var _r8=render;render=function(){_r8();setTimeout(function(){nxSweep(document.getElementById('view')||document.body);},60);};
var _g8=window.nxPlanGate;window.nxPlanGate=function(){_g8();setTimeout(function(){var w=document.getElementById('nxgWrap');if(w)nxSweep(w);},250);};
var _d8=window.nxPayDesk;window.nxPayDesk=function(p,v){_d8(p,v);setTimeout(function(){var w=document.getElementById('nxDeskOv');if(w)nxSweep(w);},400);};
var _b8=window.nxBellOpen;window.nxBellOpen=function(){_b8();setTimeout(function(){var w=document.getElementById('nxPayOv');if(w)nxSweep(w);},150);};
setTimeout(function(){var a=document.getElementById('nxAsk');if(a)nxSweep(a);},3600);
})();
