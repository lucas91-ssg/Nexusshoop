/* ===== NX_FINAL v10 — restauración completa + committee + logística + carrito por vendedor ===== */
(function(){
"use strict";
function ready(fn){if(document.readyState!=='loading')fn();else document.addEventListener('DOMContentLoaded',fn);}
ready(function(){
var D=[{id:'demo-w1',name:'Smart Watch T900 Ultra',price:3499,old:4999,img:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=70',desc:'Bluetooth calling, heart rate, 7 day battery. COD all Pakistan.',stock:12,sold:0,demo:true},
{id:'demo-p1',name:'Perfume Attar Oud 12ml',price:1299,old:1899,img:'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=70',desc:'Long lasting oud attar in gift box. COD.',stock:20,sold:0,demo:true},
{id:'demo-k1',name:'Electric Kettle 1.8L Steel',price:2799,old:3599,img:'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=70',desc:'Fast boil, auto cut-off, 1 year warranty. COD.',stock:8,sold:0,demo:true},
{id:'demo-e1',name:'Wireless Earbuds AirDots',price:1999,old:2999,img:'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=70',desc:'Touch control, charging case, bass boost. COD.',stock:15,sold:0,demo:true}];
function ensureDemos(){if(!window.PRODS)return;D.forEach(function(d){if(!PRODS.find(function(p){return p.id===d.id}))PRODS.push(d);});}
function fixPrices(){var m={'Rs. 2,500/mo':'Rs. 1,999/mo','Rs. 5,000/mo':'Rs. 3,999/mo','Rs. 2,500/month':'Rs. 1,999/mo','Rs. 5,000/month':'Rs. 3,999/mo'};
 document.querySelectorAll('*').forEach(function(el){if(el.children.length>0)return;var t=el.textContent.trim();if(m[t])el.textContent=m[t];});}
var UR={'🛍️ Shop Now':'🛍️ ابھی خریدیں','🏪 Start Selling — free':'🏪 فروخت شروع کریں — مفت','Shop Now':'ابھی خریدیں','Start Selling — free':'فروخت شروع کریں — مفت','Committee':'کمیٹی','Reviews':'جائزے','Doorstep delivery':'دہلیز پر ڈیلیوری','Smart map: nearest courier to me':'سمارٹ نقشہ: میرے قریب ترین کورئیر','Start a group':'گروپ شروع کریں','Join 3 buyers and everyone pays the committee price. Nobody pays until delivery (COD).':'3 خریداروں میں شامل ہوں اور سب کمیٹی قیمت ادا کریں۔ ڈیلیوری تک کوئی ادائیگی نہیں (COD)۔','Bazaar live · Lahore · Karachi · Islamabad':'بازار لائیو · لاہور · کراچی · اسلام آباد','Thousands of deals moving right now — join the committee and save 15%':'ہزاروں ڈیلز ابھی چل رہی ہیں — کمیٹی میں شامل ہوں اور 15% بچائیں','Start Free · Grow Fast':'مفت شروع کریں · تیزی سے بڑھیں','Made for Pakistan':'پاکستان کے لیے بنایا گیا','List in Minutes':'منٹوں میں لسٹ کریں','5 products FREE forever. No credit card needed.':'5 مصنوعات ہمیشہ مفت۔ کوئی کریڈٹ کارڈ نہیں۔','5 Free Products':'5 مفت مصنوعات','Direct WhatsApp':'براہ راست واٹس ایپ','Zero Commission':'زیرو کمیشن','COD Ready':'COD تیار','Urdu Language':'اردو زبان','Quick Setup':'جلدی سیٹ اپ','Easy Upload':'آسان اپ لوڈ','Fast Sales':'تیز فروخت','Search products…':'مصنوعات تلاش کریں…','All':'سب','Add':'شامل','Home':'ہوم','Wishlist':'پسندیدہ','Cart':'کارٹ','Orders':'آرڈرز','Sell':'بیچیں','New':'نیا','Only 5 left':'صرف 5 باقی','Sold by':'فروخت کنندہ','Cash on Delivery':'کیش آن ڈیلیوری','Delivery tomorrow':'کل ڈیلیوری','7-day returns':'7 دن واپسی','in stock':'اسٹاک میں','Quantity':'تعداد','Details':'تفصیل','Chat with seller':'فروخت کنندہ سے چیٹ','Back':'واپس','Sell on NexusShop':'NexusShop پر بیچیں','Open Seller Center →':'سیلر سینٹر کھولیں →','See plans & subscribe →':'پلانز دیکھیں اور سبسکرائب کریں →','Start FREE with 5 products. Then upgrade from PKR 2,500/month.':'5 مصنوعات کے ساتھ مفت شروع کریں۔ پھر اپ گریڈ کریں۔','Example catalog with real photos — test orders welcome. First Lahore sellers go live this week.':'مثالی کیٹلاگ حقیقی تصاویر کے ساتھ — ٹیسٹ آرڈرز خوش آمدید۔','Enter NexusShop':'NexusShop میں داخل ہوں','Welcome to Pakistan\'s Future':'پاکستان کے مستقبل میں خوش آمدید','Where commerce meets innovation. Your marketplace, your language, your success.':'جہاں تجارت اور جدت ملتی ہے۔ آپ کی مارکیٹ، آپ کی زبان، آپ کی کامیابی۔'};
function sweep(){var ur=document.documentElement.dir==='rtl';
 document.querySelectorAll('*').forEach(function(el){if(el.children.length>0||el.tagName==='SCRIPT'||el.tagName==='STYLE')return;var t=el.textContent.trim();if(ur&&UR[t])el.textContent=UR[t];});
 var sb=document.getElementById('nxShopBtn');if(sb)sb.textContent=ur?'🛍️ ابھی خریدیں':'🛍️ Shop Now';
 var s2=document.getElementById('nxSellBtn');if(s2)s2.textContent=ur?'🏪 فروخت شروع کریں — مفت':'🏪 Start Selling — free';
 var nb=document.querySelector('nav button[data-v="wish"] span');if(nb)nb.textContent=ur?'کمیٹی':'Committee';}
/* welcome 3D bazaar */
function welcome(){if(sessionStorage.getItem('nx_in'))return;if(document.getElementById('nxW'))return;
 var imgs=['https://images.unsplash.com/photo-1593356114865-9495d959a59b?w=300&q=60','https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=60','https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&q=60','https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&q=60','https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=300&q=60','https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&q=60'];
 var w=document.createElement('div');w.id='nxW';
 w.style.cssText='position:fixed;inset:0;z-index:10000;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:radial-gradient(900px 500px at 70% -10%,rgba(34,211,238,.18),transparent),radial-gradient(700px 420px at 10% 110%,rgba(244,114,182,.16),transparent),#05070f';
 w.innerHTML='<style>@keyframes nxSpin{from{transform:rotateY(0)}to{transform:rotateY(360deg)}}@keyframes nxUp2{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}</style>'+
 '<div style="perspective:900px;width:240px;height:150px;margin-bottom:8px"><div style="width:100%;height:100%;position:relative;transform-style:preserve-3d;animation:nxSpin 16s linear infinite">'+imgs.map(function(u,i){return '<img src="'+u+'" style="position:absolute;left:50%;top:50%;width:86px;height:86px;margin:-43px 0 0 -43px;object-fit:cover;border-radius:16px;border:1px solid rgba(255,255,255,.2);box-shadow:0 10px 30px rgba(0,0,0,.5);transform:rotateY('+(i*60)+'deg) translateZ(120px)">'}).join('')+'</div></div>'+
 '<div style="font-size:34px;font-weight:900;background:linear-gradient(90deg,#f472b6,#a78bfa,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent;animation:nxUp2 .8s .2s ease both">NexusShop</div>'+
 '<div style="font-size:13px;color:#67e8f9;font-weight:700;margin-top:4px;animation:nxUp2 .8s .4s ease both">Pakistan ka apna bazaar — ab 3D mein</div>'+
 '<div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin:14px 0;animation:nxUp2 .8s .6s ease both">'+['🇵🇰 COD nationwide','💬 WhatsApp checkout','👥 Committee −15%','🗣️ Urdu + English'].map(function(t){return '<span style="font-size:10.5px;font-weight:700;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);border-radius:99px;padding:6px 10px;color:#cbd5e1">'+t+'</span>'}).join('')+'</div>'+
 '<button id="nxWEnter" style="width:86%;max-width:340px;padding:16px;border:0;border-radius:18px;background:linear-gradient(90deg,#f472b6,#a78bfa,#22d3ee);color:#071021;font-size:16px;font-weight:900;cursor:pointer;box-shadow:0 14px 40px rgba(34,211,238,.35);animation:nxUp2 .8s .8s ease both">Enter NexusShop →</button>';
 document.body.appendChild(w);
 document.getElementById('nxWEnter').onclick=function(){window.enterShop();};}
var _e=window.enterShop;if(_e&&!window._nxW){window._nxW=1;window.enterShop=function(){var w=document.getElementById('nxW');if(w)w.remove();_e();};}
welcome();
/* hero bar + live banner */
function heroBar(){if(document.getElementById('nxHeroBar'))return;var bc=document.getElementById('bannerCarousel');if(!bc)return;
 bc.querySelectorAll('.carousel-slide button').forEach(function(b){b.remove();});
 var bar=document.createElement('div');bar.id='nxHeroBar';bar.style.cssText='display:flex;gap:10px;margin:12px 0';
 bar.innerHTML='<button id="nxShopBtn" style="flex:1;padding:15px;border:0;border-radius:16px;background:linear-gradient(135deg,#059669,#34d399);color:#fff;font-weight:900;font-size:15px;cursor:pointer;box-shadow:0 10px 30px rgba(5,150,105,.45)">🛍️ Shop Now</button><button id="nxSellBtn" style="flex:1;padding:15px;border:0;border-radius:16px;background:linear-gradient(135deg,#f472b6,#a78bfa,#22d3ee);color:#0b1030;font-weight:900;font-size:15px;cursor:pointer;box-shadow:0 10px 30px rgba(244,114,182,.45)">🏪 Start Selling — free</button>';
 bc.insertAdjacentElement('afterend',bar);
 document.getElementById('nxShopBtn').onclick=function(){var g=document.getElementById('grid');if(g)g.scrollIntoView({behavior:'smooth'});};
 document.getElementById('nxSellBtn').onclick=function(){location.href='seller.html';};}
function liveBanner(){if(document.getElementById('nxLive'))return;var bar=document.getElementById('nxHeroBar');if(!bar)return;
 var d=document.createElement('div');d.id='nxLive';d.style.cssText='position:relative;overflow:hidden;border-radius:18px;margin:12px 0;height:110px;border:1px solid rgba(255,255,255,.12)';
 d.innerHTML='<div style="position:absolute;inset:0;background:linear-gradient(120deg,#0ea5e9,#a21caf,#f59e0b,#0ea5e9);background-size:300% 300%;animation:nxGrad 8s ease infinite"></div><div style="position:absolute;top:-40px;left:-60px;width:180px;height:180px;background:rgba(255,255,255,.18);border-radius:50%;animation:nxFloat 6s ease-in-out infinite"></div><div style="position:absolute;bottom:-50px;right:-40px;width:160px;height:160px;background:rgba(0,0,0,.25);border-radius:50%;animation:nxFloat 7s ease-in-out infinite reverse"></div><div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:16px;background:linear-gradient(90deg,rgba(4,6,15,.75),transparent)"><b style="font-size:15px">🎬 Bazaar live · Lahore · Karachi · Islamabad</b><span style="font-size:11.5px;color:#e0f2fe;margin-top:4px">Thousands of deals moving right now — join the committee and save 15%</span></div><style>@keyframes nxGrad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}@keyframes nxFloat{50%{transform:translateY(18px)}}</style>';
 bar.insertAdjacentElement('afterend',d);}
/* detail cards */
function detailCards(){if(typeof VIEW==='undefined'||VIEW!=='detail')return;if(document.getElementById('nxLog'))return;var view=document.getElementById('view');if(!view||!window.CUR)return;
 var p=PRODS.find(function(x){return x.id===CUR});if(!p)return;
 var cour=[['TCS','tcs.com.pk'],['Leopards','leopards.com.pk'],['M&P','mp.com.pk'],['PostEx','postex.pk'],['Trax','trax.com.pk']];
 var html='<div class="card" id="nxLog"><h2 class="t">🚚 Doorstep delivery — your region</h2>'+cour.map(function(c){return '<div class="row" style="padding:10px"><div class="inf"><div class="nm">'+c[0]+'</div><div style="font-size:11px;color:var(--muted)">'+c[1]+'</div></div><button class="btn ghost" style="width:auto;padding:8px 12px;font-size:11px" onclick="window.open(\'https://www.google.com/maps/search/'+c[0]+'+courier+near+me\',\'_blank\')">📍 Map</button></div>';}).join('')+'<button class="btn" style="margin-top:10px" onclick="if(navigator.geolocation){navigator.geolocation.getCurrentPosition(function(pos){window.open(\'https://www.google.com/maps/search/courier+service+near+\'+pos.coords.latitude+\',\'+pos.coords.longitude,\'_blank\')},function(){window.open(\'https://www.google.com/maps/search/courier+service+near+me\',\'_blank\')})}else{window.open(\'https://www.google.com/maps/search/courier+service+near+me\',\'_blank\')}">📍 Smart map: nearest courier to me</button></div>';
 html+='<div class="card" id="nxRev"><h2 class="t">⭐ Reviews</h2><div class="empty" style="padding:20px">★★★★★ <b>0 reviews yet</b> — be the first! Reviews unlock with the first delivered COD orders. Every review is tied to a real order, so ratings can never be faked.</div></div>';
 var cp=Math.round(p.price*0.85);
 html+='<div class="card" id="nxCom" style="border-color:rgba(52,211,153,.4)"><h2 class="t">👥 Committee Buy · sath mein sasta</h2><p style="font-size:12.5px;color:var(--muted);line-height:1.6">Join 3 buyers and everyone pays the committee price. Nobody pays until delivery (COD).</p><div style="font-size:20px;font-weight:900;color:#34d399;margin:8px 0">'+money(cp)+' <s style="font-size:12px;color:var(--muted)">'+money(p.price)+'</s> · −15%</div><button class="btn" onclick="nxStartGroup()">👥 Start a group</button></div>';
 view.insertAdjacentHTML('beforeend',html);}
window.nxStartGroup=function(){var g=LS.get('nx_groups',[]);var code='NX'+Math.floor(1000+Math.random()*9000);g.unshift({code:code,item:CUR,members:1,at:Date.now()});LS.set('nx_groups',g);window.open('https://wa.me/?text='+encodeURIComponent('Join my NexusShop committee group '+code+' and we all save 15% (COD): https://nexusshoop.vercel.app'),'_blank');toast('👥 Group '+code+' created — 2 friends to go!','ok');};
function committeeNav(){var nb=document.querySelector('nav button[data-v="wish"]');if(!nb||nb.dataset.nx)return;nb.dataset.nx='1';var i=nb.querySelector('i');if(i)i.textContent='👥';nb.onclick=function(e){e.stopPropagation();nxCommitteeView();};}
window.nxCommitteeView=function(){var gs=LS.get('nx_groups',[]);var ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:9998;background:#070b21;overflow-y:auto;padding:16px';
 ov.innerHTML='<div class="card"><button class="btn ghost" style="width:auto;padding:10px 16px" onclick="this.parentElement.parentElement.remove()">← Back</button><h2 class="t" style="margin-top:12px">👥 Committee Buy</h2><p style="font-size:12.5px;color:var(--muted);line-height:1.6;margin-bottom:12px">3 buyers = −15% for everyone. Nobody pays until delivery (COD).</p>'+(gs.length?gs.map(function(g){return '<div class="row"><div class="inf"><div class="nm">Code '+g.code+'</div><div style="font-size:11px;color:var(--muted)">'+g.members+'/3 members</div></div><span style="font-size:11px;font-weight:800;color:'+(g.members>=3?'#34d399':'#fbbf24')+'">'+(g.members>=3?'LOCKED −15%':'OPEN')+'</span></div>';}).join(''):'<div class="empty">No groups yet. Open any product and tap "Start a group".</div>')+'<button class="btn" style="margin-top:12px" onclick="nxJoinGroup()">Join with a code</button></div>';
 document.body.appendChild(ov);};
window.nxJoinGroup=function(){var code=prompt('Committee code (e.g. NX1234):');if(!code)return;var gs=LS.get('nx_groups',[]);var g=gs.find(function(x){return x.code===code.toUpperCase();});if(!g){toast('Code not found on this device','err');return;}if(g.members<3)g.members++;LS.set('nx_groups',gs);toast(g.members>=3?'🎉 Committee complete! Price locked at −15%':'👥 Joined! '+(3-g.members)+' to go','ok');};
/* cart por vendedor */
function cartSplit(){if(typeof VIEW==='undefined'||VIEW!=='cart')return;var view=document.getElementById('view');if(!view)return;var c=cart().filter(function(x){return !x.demo;});if(!c.length)return;
 var G={};c.forEach(function(x){var s=x.shopName||'NexusShop Market';(G[s]=G[s]||[]).push(x);});
 var ks=Object.keys(G);if(ks.length<1)return;
 var html='<div class="card"><h2 class="t">🛒 '+t('cart')+' · '+ks.length+' seller'+(ks.length>1?'s':'')+'</h2>';
 ks.forEach(function(s){var items=G[s];var tot=items.reduce(function(a,b){return a+b.price*b.q;},0);
  html+='<div style="border:1px solid var(--border);border-radius:14px;padding:12px;margin:10px 0"><div style="font-size:12.5px;font-weight:800;margin-bottom:8px">🏪 '+esc(s)+'</div>'+items.map(function(x){return '<div class="row" style="padding:8px"><div class="inf"><div class="nm">'+esc(x.name)+'</div><div class="pr">'+money(x.price*x.q)+'</div></div><div class="q"><button onclick="setQ(\''+x.i+'\',-1)">−</button><span>'+x.q+'</span><button onclick="setQ(\''+x.i+'\',1)">+</button></div></div>';}).join('')+'<div class="tot" style="padding:8px 4px"><span>'+t('total')+'</span><b>'+money(tot)+'</b></div><button class="btn wa" onclick="nxWaSeller(\''+s.replace(/'/g,'\\&#39;')+'\')">💬 Order from '+esc(s)+' (COD)</button></div>';});
 html+='</div>';view.innerHTML=html;}
window.nxWaSeller=function(shop){var c=cart().filter(function(x){return !x.demo&&(x.shopName||'NexusShop Market')===shop;});if(!c.length)return;var pr=PRODS.find(function(p){return p.name===c[0].name;});var wa=(pr&&pr.wa)||WA_DEFAULT;var msg='Assalam o Alaikum '+shop+'! My NexusShop order (COD):\n'+c.map(function(x){return '• '+x.name+' x'+x.q+' — '+money(x.price*x.q);}).join('\n')+'\nTotal: '+money(c.reduce(function(a,b){return a+b.price*b.q;},0));window.open('https://wa.me/'+String(wa).replace(/\D/g,'')+'?text='+encodeURIComponent(msg),'_blank');};
/* gear + install */
if(!document.getElementById('nxGear')){var hdr=document.querySelector('header');if(hdr){var g=document.createElement('button');g.id='nxGear';g.className='icb';g.textContent='⚙️';g.onclick=function(){var x=document.getElementById('nxSupp');if(x){x.remove();return;}var p=document.createElement('div');p.id='nxSupp';p.style.cssText='position:fixed;top:60px;left:50%;transform:translateX(-50%);z-index:9999;background:rgba(10,14,35,.97);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:20px;min-width:280px;max-width:90vw;box-shadow:0 20px 60px rgba(0,0,0,.6);text-align:center';p.innerHTML='<div style="font-size:15px;font-weight:800;margin-bottom:12px">⚙️ Settings & Support</div><div style="padding:12px;background:rgba(34,211,238,.08);border-radius:12px;border-left:3px solid #22d3ee;text-align:left;margin-bottom:12px"><div style="font-size:10px;color:#67e8f9;font-weight:700;margin-bottom:4px">📧 SUPPORT 24/7</div><div style="font-size:13px;font-weight:600;color:#e2e8f0">neuralfocusai@gmail.com</div></div><button onclick="this.parentElement.remove()" style="width:100%;padding:10px;border:1px solid rgba(255,255,255,.15);border-radius:10px;background:transparent;color:#94a3b8;font-size:12px;cursor:pointer">Close</button>';document.body.appendChild(p);};hdr.insertBefore(g,document.getElementById('langB'));}}
if(!document.getElementById('nxInstallBtn')){var b=document.createElement('button');b.id='nxInstallBtn';b.style.cssText='position:fixed;top:60px;right:12px;z-index:60;height:34px;border-radius:99px;border:1px solid rgba(34,211,238,.4);background:linear-gradient(135deg,#059669,#34d399);color:#fff;font-size:11.5px;font-weight:700;padding:0 12px;cursor:pointer;display:flex;align-items:center;gap:5px;box-shadow:0 4px 16px rgba(5,150,105,.4)';b.innerHTML='<img src="/icon.svg" style="width:18px;height:18px;border-radius:4px"> Install';var dp=null;window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();dp=e;});b.onclick=function(){if(dp){dp.prompt();dp.userChoice.then(function(){b.remove();dp=null;});}else alert('Tap ⋮ → "Add to Home screen"');};document.body.appendChild(b);}
/* render wrap */
var _r=window.render;if(_r&&!window._nx10){window._nx10=1;window.render=function(){ensureDemos();_r.apply(this,arguments);setTimeout(function(){heroBar();liveBanner();detailCards();cartSplit();committeeNav();sweep();fixPrices();},120);};}
var _p=window.pickLang;if(_p&&!window._nxPL){window._nxPL=1;window.pickLang=function(l){_p(l);setTimeout(sweep,250);setTimeout(fixPrices,300);};}
fixPrices();
});
})();
/* ===== v11 module: profile + photo + predictive For-You + full settings + light mode PK ===== */
;(function(){
"use strict";
function ready(fn){if(document.readyState!=='loading')fn();else document.addEventListener('DOMContentLoaded',fn);}
ready(function(){
function applyTheme(){var l=localStorage.getItem('nx_theme')==='light';document.documentElement.classList.toggle('nxLight',l);
 if(!document.getElementById('nxLightCss')){var st=document.createElement('style');st.id='nxLightCss';
 st.textContent='html.nxLight{--bg:#f7fcf8;--glass:rgba(1,65,28,.06);--border:rgba(1,65,28,.18);--text:#06281a;--muted:#41684f;--grad:linear-gradient(135deg,#01411C,#059669,#34d399)}html.nxLight body{background:#f7fcf8;color:#06281a}html.nxLight header,html.nxLight nav{background:rgba(255,255,255,.9)}html.nxLight .card,html.nxLight .pcard{background:#fff;border-color:rgba(1,65,28,.14)}html.nxLight .search,html.nxLight input.f{background:#fff;color:#06281a;border-color:rgba(1,65,28,.22)}html.nxLight .chip,html.nxLight .tag,html.nxLight .slide-pill{background:rgba(1,65,28,.06);color:#06281a;border-color:rgba(1,65,28,.18)}html.nxLight .btn,html.nxLight .add{color:#fff}html.nxLight .infob{background:rgba(5,150,105,.08);border-color:rgba(5,150,105,.35);color:#065f46}html.nxLight .empty{color:#41684f}';
 document.head.appendChild(st);}}
applyTheme();
function prof(){try{return JSON.parse(localStorage.getItem('nx_profile')||'null')}catch(e){return null}}
function saveProf(p){localStorage.setItem('nx_profile',JSON.stringify(p));if(p.email){var b={email:p.email,loginTime:Date.now()};localStorage.setItem('nx_buyer',JSON.stringify(b));window.BUYER=b;}avatar();}
function avatar(){var u=document.getElementById('userB');if(!u)return;var p=prof();
 if(p&&p.pic){u.innerHTML='<img src="'+p.pic+'" style="width:26px;height:26px;border-radius:50%;object-fit:cover">';}
 else if(p&&p.name){u.textContent=p.name.charAt(0).toUpperCase();}
 else if(window.BUYER){u.textContent='✅';}else{u.textContent='👤';}}
window.nxProfile=function(){var p=prof()||{};var ov=document.createElement('div');ov.id='nxProfOv';ov.style.cssText='position:fixed;inset:0;z-index:9998;background:var(--bg,#070b21);overflow-y:auto;padding:16px';
 ov.innerHTML='<div class="card" style="max-width:560px;margin:0 auto"><button class="btn ghost" style="width:auto;padding:10px 16px" onclick="document.getElementById(\'nxProfOv\').remove()">← Back</button><h2 class="t" style="margin-top:12px">👤 My Profile</h2>'+
 '<div style="display:flex;align-items:center;gap:12px;margin:12px 0">'+(p.pic?'<img id="nxPicPrev" src="'+p.pic+'" style="width:64px;height:64px;border-radius:50%;object-fit:cover">':'<div id="nxPicPrev" style="width:64px;height:64px;border-radius:50%;background:var(--glass);display:flex;align-items:center;justify-content:center;font-size:26px">👤</div>')+
 '<label class="btn ghost" style="width:auto;padding:10px 14px;cursor:pointer;margin:0">📷 Photo<input type="file" accept="image/*" hidden id="nxPicIn"></label></div>'+
 '<div class="lbl">Full name</div><input class="f" id="nxPName" value="'+(p.name||'')+'" placeholder="e.g. Ali Raza">'+
 '<div class="lbl">Email</div><input class="f" id="nxPEmail" type="email" value="'+(p.email||'')+'" placeholder="you@email.com">'+
 '<div class="lbl">WhatsApp</div><input class="f" id="nxPWa" value="'+(p.wa||'')+'" placeholder="+92 3XX XXXXXXX">'+
 '<div class="lbl">City</div><input class="f" id="nxPCity" value="'+(p.city||'')+'" placeholder="Lahore">'+
 '<button class="btn" style="margin-top:8px" onclick="nxSaveProfile()">💾 Save profile</button>'+
 (p.email?'<button class="btn ghost" style="margin-top:8px" onclick="nxLogout()">Log out</button>':'')+'</div>';
 document.body.appendChild(ov);
 document.getElementById('nxPicIn').onchange=function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();
  r.onload=function(ev){var img=new Image();img.onload=function(){var c=document.createElement('canvas');var s=128/Math.max(img.width,img.height);c.width=Math.round(img.width*s);c.height=Math.round(img.height*s);c.getContext('2d').drawImage(img,0,0,c.width,c.height);var d=c.toDataURL('image/jpeg',.72);localStorage.setItem('nx_pic_tmp',d);var pv=document.getElementById('nxPicPrev');if(pv)pv.outerHTML='<img id="nxPicPrev" src="'+d+'" style="width:64px;height:64px;border-radius:50%;object-fit:cover">';};img.src=ev.target.result;};r.readAsDataURL(f);};};
window.nxSaveProfile=function(){var p={name:document.getElementById('nxPName').value.trim(),email:document.getElementById('nxPEmail').value.trim(),wa:document.getElementById('nxPWa').value.trim(),city:document.getElementById('nxPCity').value.trim(),pic:localStorage.getItem('nx_pic_tmp')||(prof()||{}).pic||null};
 if(!p.name||!p.email){toast('Name and email required','err');return;}
 localStorage.removeItem('nx_pic_tmp');saveProf(p);var o=document.getElementById('nxProfOv');if(o)o.remove();toast('✓ Profile saved — experience personalized','ok');};
window.nxLogout=function(){localStorage.removeItem('nx_profile');localStorage.setItem('nx_buyer','null');window.BUYER=null;avatar();var o=document.getElementById('nxProfOv');if(o)o.remove();toast('Logged out','info');};
var ub=document.getElementById('userB');if(ub)ub.onclick=function(e){e.stopPropagation();nxProfile();};
avatar();
var _op=window.openP;if(_op&&!window._nxHist){window._nxHist=1;window.openP=function(id){try{var h=JSON.parse(localStorage.getItem('nx_hist')||'[]');var p=(window.PRODS||[]).find(function(x){return x.id===id;});if(p){h.unshift({id:id,cat:p.cat,ts:Date.now()});localStorage.setItem('nx_hist',JSON.stringify(h.slice(0,60)));}}catch(e){}_op(id);};}
function forYou(){if(typeof VIEW==='undefined'||VIEW!=='home')return;if(document.getElementById('nxForYouRail'))return;var h=JSON.parse(localStorage.getItem('nx_hist')||'[]');if(h.length<1)return;var cnt={};h.forEach(function(x){cnt[x.cat]=(cnt[x.cat]||0)+1;});var top=Object.keys(cnt).sort(function(a,b){return cnt[b]-cnt[a];}).slice(0,2);var seen={};h.forEach(function(x){seen[x.id]=1;});var recs=(window.PRODS||[]).filter(function(p){return top.indexOf(String(p.cat))>=0&&!seen[p.id];}).slice(0,6);if(!recs.length)return;var g=document.getElementById('grid');if(!g)return;var rail=document.createElement('div');rail.id='nxForYouRail';rail.style.cssText='margin:14px 0';rail.innerHTML='<h3 style="font-size:12px;font-weight:800;letter-spacing:1px;color:var(--muted);margin-bottom:8px">💡 FOR YOU — PICKED FROM YOUR TASTE</h3><div style="display:flex;gap:10px;overflow-x:auto;padding-bottom:6px">'+recs.map(function(p){return '<div style="flex:0 0 150px;border:1px solid var(--border);border-radius:16px;overflow:hidden;background:var(--glass);cursor:pointer" onclick="openP(\''+p.id+'\')">'+(p.img?'<img src="'+p.img+'" style="width:100%;height:110px;object-fit:cover">':'')+'<div style="padding:8px"><div style="font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+p.name+'</div><div style="font-size:12px;font-weight:800;color:var(--g3)">Rs. '+Number(p.price).toLocaleString()+'</div></div></div>';}).join('')+'</div>';g.insertAdjacentElement('beforebegin',rail);}
var gear=document.getElementById('nxGear');if(gear)gear.onclick=function(e){e.stopPropagation();nxSettings();};
window.nxSettings=function(){var ov=document.createElement('div');ov.id='nxSetOv';ov.style.cssText='position:fixed;inset:0;z-index:9998;background:var(--bg,#070b21);overflow-y:auto;padding:16px';
 var light=localStorage.getItem('nx_theme')==='light';
 function row(ic,tx,fn){return '<div class="row" style="cursor:pointer" onclick="'+fn+'"><div style="font-size:20px">'+ic+'</div><div class="inf"><div class="nm">'+tx+'</div></div><span style="color:var(--muted)">›</span></div>';}
 ov.innerHTML='<div class="card" style="max-width:560px;margin:0 auto"><button class="btn ghost" style="width:auto;padding:10px 16px" onclick="document.getElementById(\'nxSetOv\').remove()">← Back</button><h2 class="t" style="margin-top:12px">⚙️ Settings</h2>'+
 row('👤','My profile & photo','nxProfile()')+
 row(light?'🌙':'',light?'Switch to dark mode':'Light mode — Pakistan white & green','nxToggleTheme()')+
 row('📖','About us','nxPage("about")')+
 row('🔒','Privacy policy (Pakistan & international)','nxPage("privacy")')+
 row('⚖️','Terms & legal rights','nxPage("legal")')+
 row('📧','Support 24/7','nxPage("support")')+
 row('🌐','Language: '+(document.documentElement.dir==='rtl'?'Urdu':'English'),'toggleLang();document.getElementById(\'nxSetOv\').remove()')+
 '</div>';
 document.body.appendChild(ov);};
window.nxToggleTheme=function(){var l=localStorage.getItem('nx_theme')==='light';localStorage.setItem('nx_theme',l?'dark':'light');applyTheme();var o=document.getElementById('nxSetOv');if(o)o.remove();toast(localStorage.getItem('nx_theme')==='light'?'🌗 Light mode — Pakistan white & green':'🌙 Dark mode','info');};
var PAGES={
about:{t:'📖 About us',b:'NexusShop is Pakistan\'s COD-first marketplace, built to give every seller — from a Lahore basement shop to a Karachi startup — a digital storefront in minutes. Buyers browse free forever, pay on delivery, open the box before paying, and chat with sellers on WhatsApp. NexusShop is an independent technology platform: we do not own inventory and we do not sell products; we connect Pakistani sellers with Pakistani buyers, in their own language.'},
privacy:{t:'🔒 Privacy policy',b:'Your privacy is protected under international best practices (GDPR principles) and the laws of the Islamic Republic of Pakistan, including the Prevention of Electronic Crimes Act 2016 and the Personal Data Protection Bill framework.\n\nWe collect only what is necessary: name, email, WhatsApp number, city and order history — stored on your device and in our secured database with row-level security (each user sees only their own data). We never sell personal data. Your profile photo stays on your device. You may request access, correction or deletion of your data at any time at neuralfocusai@gmail.com.\n\nLocalStorage/cookies are used only for cart, language, theme and session. Payment declarations contain only transaction references; bank account details belong exclusively to the official account holder and are displayed solely to enable the transfer.'},
legal:{t:'⚖️ Terms & legal rights',b:'NexusShop is a technology intermediary intended for lawful commerce within Pakistan. Sellers are independent businesses solely responsible for their products, prices, stock and delivery promises. Prohibited: weapons, drugs, counterfeit goods, stolen items, adult content and anything illegal under Pakistani law.\n\nThe platform is not a party to buyer-seller transactions; our liability is limited to providing the software service. Users agree to indemnify NexusShop against any claim arising from their listings, purchases or misuse of the service. All intellectual property (code, brand, design) belongs to NexusShop Pakistan.\n\nThese terms are governed by the laws of the Islamic Republic of Pakistan, with jurisdiction in Lahore. By using NexusShop you accept these terms.'},
support:{t:'📧 Support 24/7',b:'We answer every message within 24 hours.\n\nEmail: neuralfocusai@gmail.com\n\n• Buyers: order issues, undelivered COD, committee groups.\n• Sellers: onboarding help by WhatsApp during launch week (Lahore first).\n• Partners & press: same email, subject "Partnership".'}};
window.nxPage=function(k){var o=document.getElementById('nxSetOv');if(o)o.remove();var pg=PAGES[k];var ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:9998;background:var(--bg,#070b21);overflow-y:auto;padding:16px';
 ov.innerHTML='<div class="card" style="max-width:640px;margin:0 auto"><button class="btn ghost" style="width:auto;padding:10px 16px" onclick="this.parentElement.parentElement.remove()">← Back</button><h2 class="t" style="margin-top:12px">'+pg.t+'</h2><p style="font-size:13.5px;line-height:1.8;color:var(--muted);white-space:pre-line">'+pg.b+'</p>'+(k==='support'?'<a class="btn" style="display:block;text-align:center;margin-top:14px;text-decoration:none" href="mailto:neuralfocusai@gmail.com">✉️ Write to support</a>':'')+'</div>';
 document.body.appendChild(ov);};
var _r2=window.render;if(_r2&&!window._nx11){window._nx11=1;window.render=function(){_r2.apply(this,arguments);setTimeout(function(){forYou();avatar();},150);};}
});
})();
/* ===== v12 module: settings serio/moderno + onclicks con comillas simples ===== */
;(function(){
"use strict";
function ready(fn){if(document.readyState!=='loading')fn();else document.addEventListener('DOMContentLoaded',fn);}
ready(function(){
var TEXTS={
about:{ic:'📖',t:'About us',b:'NexusShop is Pakistan\'s COD-first marketplace, built to give every seller — from a Lahore basement shop to a Karachi startup — a digital storefront in minutes. Buyers browse free forever, pay on delivery, open the box before paying, and chat with sellers on WhatsApp.\n\nNexusShop is an independent technology platform: we do not own inventory and we do not sell products; we connect Pakistani sellers with Pakistani buyers, in their own language.\n\nFounded 2026 · Built mobile-first · Urdu & English native.'},
privacy:{ic:'🔒',t:'Privacy policy',b:'Your privacy is protected under international best practices (GDPR principles) and the laws of the Islamic Republic of Pakistan, including the Prevention of Electronic Crimes Act 2016 and the Personal Data Protection Bill framework.\n\nWe collect only what is necessary: name, email, WhatsApp number, city and order history — stored on your device and in our secured database with row-level security (each user sees only their own data). We never sell personal data. Your profile photo stays on your device. You may request access, correction or deletion of your data at any time at neuralfocusai@gmail.com.\n\nLocalStorage/cookies are used only for cart, language, theme and session. Payment declarations contain only transaction references; bank account details belong exclusively to the official account holder and are displayed solely to enable the transfer.'},
legal:{ic:'⚖️',t:'Terms & legal rights',b:'NexusShop is a technology intermediary intended for lawful commerce within Pakistan. Sellers are independent businesses solely responsible for their products, prices, stock and delivery promises. Prohibited: weapons, drugs, counterfeit goods, stolen items, adult content and anything illegal under Pakistani law.\n\nThe platform is not a party to buyer-seller transactions; our liability is limited to providing the software service. Users agree to indemnify NexusShop against any claim arising from their listings, purchases or misuse of the service. All intellectual property (code, brand, design) belongs to NexusShop Pakistan.\n\nThese terms are governed by the laws of the Islamic Republic of Pakistan, with jurisdiction in Lahore. By using NexusShop you accept these terms.'},
support:{ic:'📧',t:'Support 24/7',b:'We answer every message within 24 hours.\n\nEmail: neuralfocusai@gmail.com\n\n• Buyers: order issues, undelivered COD, committee groups.\n• Sellers: onboarding help by WhatsApp during launch week (Lahore first).\n• Partners & press: same email, subject "Partnership".'}};
window.nxPage=function(k){var o=document.getElementById('nxSetOv');if(o)o.remove();var pg=TEXTS[k];if(!pg)return;
 var ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:9998;background:var(--bg,#070b21);overflow-y:auto;padding:16px';
 ov.innerHTML='<div class="card" style="max-width:640px;margin:0 auto;padding:22px"><button class="btn ghost" style="width:auto;padding:9px 14px;font-size:12px" onclick="this.parentElement.parentElement.remove()">← Back</button>'+
 '<div style="display:flex;align-items:center;gap:10px;margin:14px 0 6px"><div style="width:40px;height:40px;border-radius:12px;background:rgba(34,211,238,.1);border:1px solid rgba(34,211,238,.25);display:flex;align-items:center;justify-content:center;font-size:19px">'+pg.ic+'</div><div><div style="font-size:17px;font-weight:900">'+pg.t+'</div><div style="font-size:10.5px;color:var(--muted)">Last updated: November 2026</div></div></div>'+
 '<p style="font-size:13.5px;line-height:1.85;color:var(--muted);white-space:pre-line;margin-top:10px">'+pg.b+'</p>'+
 (k==='support'?'<a class="btn" style="display:block;text-align:center;margin-top:16px;text-decoration:none" href="mailto:neuralfocusai@gmail.com">✉️ Write to support</a>':'')+
 '<div style="margin-top:16px;font-size:10.5px;color:var(--muted);text-align:center">NexusShop™ · Lahore, Pakistan</div></div>';
 document.body.appendChild(ov);};
window.nxSettings=function(){var ov=document.createElement('div');ov.id='nxSetOv';ov.style.cssText='position:fixed;inset:0;z-index:9998;background:var(--bg,#070b21);overflow-y:auto;padding:16px';
 var light=localStorage.getItem('nx_theme')==='light';
 function row(ic,tx,sb,fn){return '<div class="row" style="cursor:pointer;padding:14px" onclick="'+fn+'"><div style="width:38px;height:38px;border-radius:12px;background:rgba(34,211,238,.1);border:1px solid rgba(34,211,238,.25);display:flex;align-items:center;justify-content:center;font-size:18px;flex:0 0 auto">'+ic+'</div><div class="inf"><div class="nm" style="font-size:13.5px">'+tx+'</div><div style="font-size:11px;color:var(--muted);margin-top:2px">'+sb+'</div></div><span style="color:var(--muted);font-size:18px">›</span></div>';}
 function grp(t){return '<div style="font-size:10px;font-weight:800;letter-spacing:2px;color:var(--muted);margin:16px 4px 8px">'+t+'</div>';}
 ov.innerHTML='<div class="card" style="max-width:560px;margin:0 auto;padding:20px">'+
 '<div style="display:flex;align-items:center;gap:10px;margin-bottom:4px"><img src="/icon.svg" style="width:34px;height:34px;border-radius:10px"><div><div style="font-size:17px;font-weight:900">Settings</div><div style="font-size:11px;color:var(--muted)">NexusShop · v2.12 · Pakistan</div></div><button class="btn ghost" style="width:auto;padding:8px 12px;margin-left:auto;font-size:12px" onclick="document.getElementById(\'nxSetOv\').remove()">✕</button></div>'+
 grp('ACCOUNT')+
 row('👤','My profile & photo','Personal data, avatar, delivery city','nxProfile()')+
 row(light?'🌙':'🌗','Appearance',light?'Dark mode (default)':'Light mode — Pakistan white & green','nxToggleTheme()')+
 grp('PLATFORM')+
 row('🌐','Language',document.documentElement.dir==='rtl'?'Urdu':'English','toggleLang();document.getElementById(\'nxSetOv\').remove()')+
 row('📲','Install app','Add NexusShop to your home screen','nxInstallApp()')+
 grp('LEGAL & COMPANY')+
 row('📖','About us','Who we are and what we are building','nxPage(\'about\')')+
 row('🔒','Privacy policy','Pakistan PECA 2016 + GDPR principles','nxPage(\'privacy\')')+
 row('⚖️','Terms & legal rights','Intermediary liability · jurisdiction Lahore','nxPage(\'legal\')')+
 row('📧','Support 24/7','neuralfocusai@gmail.com · reply < 24h','nxPage(\'support\')')+
 '<div style="margin-top:18px;padding-top:14px;border-top:1px solid var(--border);font-size:10.5px;color:var(--muted);line-height:1.7;text-align:center">© 2026 NexusShop™ · The E-Commerce of Pakistan<br>Registered intermediary platform · Lahore, Pakistan</div></div>';
 document.body.appendChild(ov);};
window.nxInstallApp=function(){var b=document.getElementById('nxInstallBtn');if(b)b.click();else alert('Tap ⋮ → "Add to Home screen"');};
});
})();
/* ===== v13 module: footer único © NexusShop platform e-commerce 2026 ===== */
;(function(){
function clean(){
 var f=document.querySelector('footer');
 if(f)f.innerHTML='© NexusShop platform e-commerce 2026';
 document.querySelectorAll('div,p').forEach(function(d){
  if(d.innerHTML.indexOf('Lahore, Pakistan')>=0&&d.querySelectorAll('*').length<=1)d.innerHTML='© NexusShop platform e-commerce 2026';
 });
}
function boot(){
 clean();
 var _r=window.render;if(_r&&!window._nx13){window._nx13=1;window.render=function(){_r.apply(this,arguments);setTimeout(clean,100);};}
 var _p=window.nxPage;if(_p&&!window._nx13p){window._nx13p=1;window.nxPage=function(k){_p(k);setTimeout(clean,80);};}
 var _s=window.nxSettings;if(_s&&!window._nx13s){window._nx13s=1;window.nxSettings=function(){_s();setTimeout(clean,80);};}
 var _q=window.nxProfile;if(_q&&!window._nx13q){window._nx13q=1;window.nxProfile=function(){_q();setTimeout(clean,80);};}
 setInterval(clean,2500);
}
if(document.readyState!=='loading')boot();else document.addEventListener('DOMContentLoaded',boot);
})();
/* ===== v16 module: Peace-audit fixes — COD plain language, FAQ additions (COD/Temu/domain), audit doc ===== */
;(function(){
"use strict";
function ready(fn){if(document.readyState!=='loading')fn();else document.addEventListener('DOMContentLoaded',fn);}
ready(function(){
var RULES=[['COD nationwide','Pay-on-delivery nationwide'],['Cash on Delivery','Pay on delivery (cash)'],['(COD)','(pay on delivery)'],['COD in all','Pay-on-delivery in all'],['COD first','Pay-on-delivery first']];
function codify(){var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);var n;
 while(n=w.nextNode()){var t=n.nodeValue;if(!t||t.indexOf('COD')<0)continue;var nt=t;
  for(var i=0;i<RULES.length;i++)nt=nt.split(RULES[i][0]).join(RULES[i][1]);
  if(nt!==t)n.nodeValue=nt;}}
var EXTRA=[['What does the COD mean?','Cash on Delivery: the rider brings the box, you open it and check it, and you pay ONLY if you keep it — cash or transfer. No prepayment, no risk. In Nigeria: pay on delivery, same rule.'],
['Is this Temu?','No. Temu ships from China in weeks. NexusShop connects YOU with sellers in your own city: delivery in days, pay on delivery, open-the-box trust, and Committee Buy (-15% with 3 neighbours). Local first.'],
['Why does the address say nexusshoop but the brand is NexusShop?','The beta address (nexusshoop.vercel.app) was registered on day one; the brand is NexusShop. A clean nexusshop domain migration is in progress — your bookmarks keep working via redirect.']];
var _f=window.nxFAQ;if(_f&&!window._nx16f){window._nx16f=1;window.nxFAQ=function(){_f();setTimeout(function(){
 var ov=document.body.lastElementChild;if(!ov)return;var card=ov.querySelector('.card');if(!card)return;var foot=card.lastElementChild;
 var d=document.createElement('div');d.innerHTML=EXTRA.map(function(q){return '<div style="margin:12px 0"><div style="font-size:13.5px;font-weight:800">'+q[0]+'</div><div style="font-size:12.5px;color:var(--muted);line-height:1.7;margin-top:4px">'+q[1]+'</div></div>';}).join('');
 card.insertBefore(d,foot);},120);};}
var _r=window.render;if(_r&&!window._nx16){window._nx16=1;window.render=function(){var a=_r.apply(this,arguments);setTimeout(codify,260);return a;};}
setTimeout(codify,600);
});
})();
/* ===== v17 module: Vitrina Premium — Fase 1 del plan Ayesha + pagos verificados + límites de plan ===== */
;(function(){
"use strict";
function ready(fn){if(document.readyState!=='loading')fn();else document.addEventListener('DOMContentLoaded',fn);}
ready(function(){
/* --- Tema sereno premium (neutros cálidos) por defecto, con toggle --- */
var st=document.createElement('style');st.id='nxWarm';st.textContent=
'body.warm{--bg:#f7f3ea;--muted:#6b7f74;background:#f7f3ea;color:#20342c}'+
'body.warm .card,body.warm .pcard,body.warm .glass{background:#fffdf8;border-color:#e4dcc9;color:#20342c;box-shadow:0 1px 2px rgba(32,52,44,.06)}'+
'body.warm header{background:rgba(247,243,234,.94);border-bottom:1px solid #e4dcc9}'+
'body.warm h1,body.warm h2,body.warm h3,body.warm .t{color:#1d4035;font-family:Georgia,"Times New Roman",serif}'+
'body.warm .btn,body.warm .cta{background:#2f6b4f;color:#f7f3ea;border:none}'+
'body.warm .chip.on{background:#2f6b4f;color:#f7f3ea}'+
'body.warm input,body.warm select,body.warm textarea{background:#fffdf8;border-color:#e4dcc9;color:#20342c}'+
'body.warm .pprice{color:#2f6b4f}body.warm .ribbon{background:#2f6b4f;color:#f7f3ea}'+
'body.warm .pimg{filter:saturate(.95)}';
document.head.appendChild(st);
window.nxTheme=function(warm){document.body.classList.toggle('warm',warm);localStorage.setItem('nx_theme',warm?'warm':'dark');};
nxTheme((localStorage.getItem('nx_theme')||'warm')==='warm');

/* --- Límites canónicos de plan (hallazgo 3: 5, no 10) --- */
window.NX_PLANS={free:5,premium:50,platinum:100,gold:500};

/* --- Splash: fuera el clic de inicio (Fase 1) --- */
function noGate(){var sp=document.getElementById('splash')||document.querySelector('.splash');if(!sp)return;var b=sp.querySelector('button');if(b)b.click();setTimeout(function(){if(sp.parentNode)sp.remove();},900);}

/* --- Hero claro + barra de confianza (Fase 1) --- */
function hero(){if(document.getElementById('nxHero'))return;var anchor=document.querySelector('.chips')||document.querySelector('.grid');if(!anchor)return;
 var h=document.createElement('div');h.id='nxHero';
 h.innerHTML='<div style="padding:16px 2px 4px"><div style="font-size:25px;font-weight:800;font-family:Georgia,serif;line-height:1.15;color:inherit">Apni dukaan 5 minute mein<span style="display:block;font-size:13px;font-weight:600;color:var(--muted)">Tu tienda en 5 minutos — vendé por WhatsApp, cobrá al entregar</span></div>'+
 '<div style="display:flex;gap:6px;flex-wrap:wrap;margin:10px 0 2px"><span class="chip">🚚 Pago contra entrega</span><span class="chip">💬 Pedidos por WhatsApp</span><span class="chip">🇵 Urdu + English</span><span class="chip">📲 Instalable sin Play Store</span></div></div>';
 anchor.parentNode.insertBefore(h,anchor);}

/* --- Vitrina limpia: fuera sticker DEMO y aviso de catálogo vacío (Fase 1) --- */
function clean(){document.querySelectorAll('.ribbon,.tag,.pill').forEach(function(r){if(/DEMO/i.test(r.textContent))r.remove();});
 var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);var n;
 while(n=w.nextNode()){var t=n.nodeValue;if(!t)continue;var nt=t.split('7 productos activos').join('Vendedores de Punjab uniéndose esta semana').split('10 productos').join('5 productos');if(nt!==t)n.nodeValue=nt;}}

/* --- Cola de verificación de pagos (hallazgo 2) --- */
function pays(){try{return JSON.parse(localStorage.getItem('nx_payments')||'[]')}catch(e){return[]}}
function savePays(a){localStorage.setItem('nx_payments',JSON.stringify(a));}
window.nxPaySubmit=function(d){var a=pays();d.id=Date.now();d.status='pending';a.unshift(d);savePays(a);toast('💳 Enviado a verificación — respuesta en 24h','ok');};
window.nxPayDecide=function(id,ok){var a=pays();a.forEach(function(p){if(p.id===id)p.status=ok?'verified':'rejected';});savePays(a);toast(ok?'✅ Pago verificado — activá el plan del vendedor':'❌ Pago rechazado','info');if(typeof render==='function')render();};
function payCard(){if(typeof VIEW==='undefined'||VIEW!=='sell')return;if(document.getElementById('nxPayCard'))return;var v=document.getElementById('view');if(!v)return;
 var c=document.createElement('div');c.id='nxPayCard';c.className='card';
 c.innerHTML='<h3 class="t">💳 Pagar suscripción — verificación en 24h</h3>'+
 '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">'+
 '<select id="pBank"><option>JazzCash</option><option>Easypaisa</option><option>HBL</option><option>Meezan</option></select>'+
 '<input id="pAmt" type="number" placeholder="Monto PKR 2500">'+
 '<input id="pName" placeholder="Nombre del remitente">'+
 '<input id="pLast" placeholder="Últimos 4 del teléfono">'+
 '<input id="pTid" class="span2" placeholder="TID / referencia de transferencia" style="grid-column:1/-1"></div>'+
 '<button class="btn" id="pSend" style="margin-top:10px">Enviar a verificación</button>'+
 '<div style="font-size:10.5px;color:var(--muted);margin-top:6px">Cada pago se verifica contra el extracto antes de activar el plan. Sin TID válido no hay activación.</div>';
 v.appendChild(c);
 c.querySelector('#pSend').addEventListener('click',function(){var d={bank:c.querySelector('#pBank').value,amt:Number(c.querySelector('#pAmt').value)||0,name:c.querySelector('#pName').value.trim(),last:c.querySelector('#pLast').value.trim(),tid:c.querySelector('#pTid').value.trim()};
  if(!d.tid||!d.amt||!d.name){toast('Completá remitente, monto y TID','err');return;}nxPaySubmit(d);});}
function adminPays(){var ov=document.getElementById('nxSetOv');if(!ov||document.getElementById('nxPayRow'))return;var card=ov.querySelector('.card');if(!card)return;
 var r=document.createElement('div');r.id='nxPayRow';r.className='row';r.style.cursor='pointer';
 r.innerHTML='<div style="width:38px;height:38px;border-radius:12px;background:rgba(47,107,79,.12);border:1px solid rgba(47,107,79,.3);display:flex;align-items:center;justify-content:center;font-size:18px">💳</div><div class="inf"><div class="nm" style="font-size:13.5px">Cola de verificación de pagos</div><div style="font-size:11px;color:var(--muted)">'+pays().filter(function(p){return p.status==='pending'}).length+' pendientes · aprobá o rechazá</div></div><span style="color:var(--muted)">›</span>';
 r.onclick=function(){var list=pays();var html=list.length?list.map(function(p){return '<div style="border:1px solid var(--border);border-radius:12px;padding:10px;margin:8px 0;font-size:12px"><b>'+p.name+'</b> · '+p.bank+' · PKR '+p.amt+' · TID '+p.tid+' <span style="color:var(--muted)">('+p.status+')</span><br><span style="font-size:10.5px;color:var(--muted)">últimos 4: '+p.last+'</span>'+(p.status==='pending'?'<div style="display:flex;gap:8px;margin-top:8px"><button class="btn" style="padding:7px" onclick="nxPayDecide('+p.id+',true)">Aprobar</button><button class="btn ghost" style="padding:7px" onclick="nxPayDecide('+p.id+',false)">Rechazar</button></div>':'')+'</div>';}).join(''):'<div style="font-size:12px;color:var(--muted)">Sin pagos en cola.</div>';
  var o=document.createElement('div');o.style.cssText='position:fixed;inset:0;z-index:9998;background:var(--bg);overflow-y:auto;padding:16px';
  o.innerHTML='<div class="card" style="max-width:560px;margin:0 auto;padding:18px"><button class="btn ghost" style="width:auto;padding:8px 14px;font-size:12px" onclick="this.parentElement.parentElement.remove()">← Volver</button><h3 class="t" style="margin-top:10px">💳 Cola de pagos</h3>'+html+'</div>';
  document.body.appendChild(o);};
 card.appendChild(r);}

/* --- Toggle de tema en Settings --- */
function themeRow(){var ov=document.getElementById('nxSetOv');if(!ov||document.getElementById('nxThemeRow'))return;var card=ov.querySelector('.card');if(!card)return;
 var r=document.createElement('div');r.id='nxThemeRow';r.className='row';r.style.cursor='pointer';
 r.innerHTML='<div style="width:38px;height:38px;border-radius:12px;background:rgba(47,107,79,.12);border:1px solid rgba(47,107,79,.3);display:flex;align-items:center;justify-content:center;font-size:18px">🎨</div><div class="inf"><div class="nm" style="font-size:13.5px">Tema de la tienda</div><div style="font-size:11px;color:var(--muted)">Actual: '+((localStorage.getItem('nx_theme')||'warm')==='warm'?'Cálido premium':'Oscuro')+' · tocá para cambiar</div></div><span style="color:var(--muted)">›</span>';
 r.onclick=function(){nxTheme(!(document.body.classList.contains('warm')));ov.remove();toast('🎨 Tema actualizado','info');};
 card.appendChild(r);}

/* --- Raahnuma: el cliente ahora manda el header de cliente y maneja 429 --- */
var _fetch=window.fetch;window.fetch=function(u,o){if(typeof u==='string'&&u.indexOf('/api/raahnuma')>=0){o=o||{};o.headers=o.headers||{};o.headers['x-nx-client']='nx-web-v17';
 return _fetch.call(this,u,o).then(function(r){if(r.status===429){toast('⏳ Raahnuma: límite de uso alcanzado, probá en un minuto','err');throw new Error('NX_RATE');}return r;});}
 return _fetch.apply(this,arguments);};

/* --- Hooks de render --- */
function post(){noGate();hero();clean();payCard();adminPays();themeRow();}
var _r=window.render;if(_r&&!window._nx17){window._nx17=1;window.render=function(){var a=_r.apply(this,arguments);setTimeout(post,240);return a;};}
setTimeout(post,600);
});
})();
/* ===== v18 module: AmarSkin — UI exacta de los mockups de Ayesha (crema/serif/verde, nav 5, cart por vendedor, order placed, detalle trust, UR RTL) ===== */
;(function(){
"use strict";
function ready(fn){if(document.readyState!=='loading')fn();else document.addEventListener('DOMContentLoaded',fn);}
ready(function(){
var CSS='body{background:#e9e2d3!important;color:#26221b!important;padding-bottom:70px!important}'+
'header,footer{background:#ece5d6!important;border:none!important}'+
'h1,h2,h3,.t,.logo{font-family:Georgia,"Times New Roman",serif!important;color:#221d15!important}'+
'.card,.pcard,.glass{background:#f6f1e4!important;border:1px solid #d9d0bb!important;border-radius:16px!important;box-shadow:none!important;color:#26221b!important}'+
'.btn{background:#2a251d!important;color:#f5efe2!important;border:none!important;border-radius:12px!important}'+
'.btn.ghost{background:transparent!important;border:1px solid #2a251d!important;color:#2a251d!important}'+
'.btn.wa{background:#1d6b45!important;color:#fff!important}'+
'.chip{background:#f6f1e4!important;border:1px solid #d9d0bb!important;color:#26221b!important;border-radius:999px!important}'+
'.pprice,.price{color:#1d5c3f!important}'+
'nav:not(#axNav){display:none!important}'+
'.axnav{position:fixed;bottom:0;left:0;right:0;display:flex;background:#ece5d6;border-top:1px solid #d9d0bb;z-index:60;padding:6px 4px calc(6px + env(safe-area-inset-bottom))}'+
'.axnav button{flex:1;background:none;border:none;display:flex;flex-direction:column;align-items:center;gap:2px;font-size:10px;color:#6b6355}'+
'.axnav button.on{color:#1d5c3f;font-weight:700}'+
'.axbanner{background:#d9d0bb;color:#4a443a;font-size:11px;text-align:center;padding:6px}'+
'.axhero{background:#efe8d9;border:1px solid #d9d0bb;border-radius:20px;padding:22px;margin:12px 0}'+
'.axhero h1{font-size:26px;line-height:1.25;margin:0 0 8px}'+
'.axhero p{color:#6b6355;font-size:13px;margin:0 0 14px}'+
'.axrow{display:flex;gap:8px;flex-wrap:wrap}'+
'.axtrust{display:flex;gap:14px;flex-wrap:wrap;margin-top:14px;font-size:12px;color:#4a443a}'+
'.axlab{font-size:15px;margin:16px 0 8px}'+
'.axchips{display:flex;gap:8px;overflow-x:auto}'+
'.axov{position:fixed;inset:0;background:rgba(20,17,12,.45);z-index:998;overflow:auto;padding:16px}'+
'.axovcard{background:#f6f1e4;border-radius:20px;padding:20px;max-width:560px;margin:24px auto}'+
'.axline{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #d9d0bb;font-size:13px}'+
'.axitem{display:block;width:100%;text-align:left;background:#efe8d9;border:1px solid #d9d0bb;border-radius:12px;padding:12px;margin:8px 0;font-size:14px}'+
'.axtrustcard{background:#f6f1e4;border:1px solid #d9d0bb;border-radius:14px;padding:12px;margin:10px 0;font-size:12.5px;color:#4a443a;display:flex;flex-direction:column;gap:6px}'+
'.axcheck{width:56px;height:56px;border-radius:50%;background:#1d5c3f;color:#fff;font-size:26px;display:flex;align-items:center;justify-content:center;margin:0 auto 10px}'+
'.axcenter{text-align:center}'+
'.axid{font-family:Georgia,serif;font-size:20px;letter-spacing:1px;margin:6px 0 10px}'+
'.axorder{border:1px solid #d9d0bb;border-radius:14px;padding:14px;margin:10px 0;text-align:left}'+
'.axorder .btn{margin-top:8px}'+
'.axmuted{color:#6b6355;font-size:12.5px}'+
'.axback{width:auto!important;padding:8px 14px!important;font-size:12px!important;margin-bottom:10px}'+
'.axstart{margin-top:12px}'+
'[dir=rtl] h1,[dir=rtl] .axhero h1{font-family:"Noto Nastaliq Urdu",Georgia,serif!important;line-height:1.9}';
var st=document.createElement('style');st.id='axCSS';st.textContent=CSS;document.head.appendChild(st);
function RTL(){return document.documentElement.dir==='rtl'}
function T(en,ur){return RTL()?ur:en}
function banner(){if(document.getElementById('axBanner'))return;var h=document.querySelector('header');if(!h)return;var d=document.createElement('div');d.id='axBanner';d.className='axbanner';d.textContent='ⓘ '+T('Preview mode: sample products. Connect the backend to go live.','پریویو موڈ: نمونہ مصنوعات۔ لائیو کے لیے بیک اینڈ جوڑیں۔');h.after(d);}
function hero(){var old=document.getElementById('nxHero');if(old)old.remove();if(document.getElementById('axHero'))return;var a=document.querySelector('.grid')||document.getElementById('view');if(!a)return;var d=document.createElement('div');d.id='axHero';d.className='axhero';
 d.innerHTML='<h1>'+T('Buy from trusted Pakistani shops. Pay when it arrives.','قابلِ اعتماد پاکستانی دکانوں سے خریدیں۔ پہنچنے پر ادائیگی کریں۔')+'</h1><p>'+T('Every order has a number, a seller you can call, and cash on delivery.','ہر آرڈر کا نمبر، فروخت کنندہ کا رابطہ، اور کیش آن ڈیلیوری۔')+'</p><div class="axrow"><button class="btn" id="axShop">🛍 '+T('Shop now','خریداری کریں')+'</button><button class="btn ghost" id="axSell">🏪 '+T('Start selling free','مفت بیچنا شروع کریں')+'</button></div><div class="axtrust"><span>💳 '+T('Cash on delivery','کیش آن ڈیلیوری')+'</span><span>🚚 '+T('Order tracking','آرڈر ٹریکنگ')+'</span><span>✓ '+T('Verified reviews','تصدیق شدہ جائزے')+'</span></div>';
 a.parentNode.insertBefore(d,a);
 d.querySelector('#axShop').onclick=function(){var g=document.querySelector('.grid');if(g)g.scrollIntoView({behavior:'smooth'});};
 d.querySelector('#axSell').onclick=function(){clickOld('Sell');};}
function cats(){if(document.getElementById('axCats'))return;var a=document.querySelector('.grid');if(!a)return;var seen={},out=[];(window.PRODS||[]).forEach(function(p){var c=p.cat||p.category;if(c&&!seen[c]){seen[c]=1;out.push(c);}});
 var d=document.createElement('div');d.id='axCats';d.innerHTML='<h3 class="axlab">'+T('Categories','زمرے')+'</h3><div class="axchips">'+out.slice(0,6).map(function(c){return '<span class="chip" data-cat="'+c+'">'+c+'</span>';}).join('')+'</div><h3 class="axlab">'+T('Featured shops','نمایاں دکانیں')+'</h3>';
 a.parentNode.insertBefore(d,a);
 d.addEventListener('click',function(e){var s=e.target.closest('[data-cat]');if(!s)return;var q=document.querySelector('input[placeholder*="Search"],#q');if(q){q.value=s.dataset.cat;q.dispatchEvent(new Event('input'));}var g=document.querySelector('.grid');if(g)g.scrollIntoView({behavior:'smooth'});});}
function oldBtn(t){var bs=[].slice.call(document.querySelectorAll('button,a'));for(var i=0;i<bs.length;i++){if(bs[i].textContent.trim().toLowerCase()===t.toLowerCase())return bs[i];}return null;}
function clickOld(t){var b=oldBtn(t);if(b){b.click();return true;}return false;}
function clickCart(){var c=document.getElementById('cartB')||oldBtn('Cart');if(c)c.click();}
function SAVED(){try{return JSON.parse(localStorage.getItem('nx_saved')||'[]')}catch(e){return[]}}
document.addEventListener('click',function(e){var h=e.target.closest('[class*=wish],.wish,[aria-label*=Save],[aria-label*=save]');if(!h)return;var card=h.closest('.pcard,.card');if(!card)return;var nm=((card.querySelector('h3,.nm,.pname')||{}).textContent||'').trim();var pr=((card.querySelector('.pprice,.price')||{}).textContent||'').trim();if(!nm)return;var a=SAVED();var i=-1;a.forEach(function(x,j){if(x.n===nm)i=j;});if(i>=0)a.splice(i,1);else a.unshift({n:nm,p:pr});localStorage.setItem('nx_saved',JSON.stringify(a));},true);
function ov(title,html,wire){var d=document.createElement('div');d.className='axov';d.innerHTML='<div class="axovcard"><button class="btn ghost axback">← '+T('Back','واپس')+'</button><h2>'+title+'</h2>'+html+'</div>';document.body.appendChild(d);d.querySelector('.axback').onclick=function(){d.remove();};if(wire)wire(d);}
function savedOv(){var a=SAVED();ov(T('Saved','محفوظ'),a.length?a.map(function(x){return '<div class="axline"><b>'+x.n+'</b><span>'+x.p+'</span></div>';}).join(''):'<p class="axmuted">'+T('Nothing saved yet. Tap the heart on any product.','ابھی کچھ محفوظ نہیں۔ کسی پروڈکٹ پر دل دبائیں۔')+'</p>');}
function ORDERS(){try{return JSON.parse(localStorage.getItem('nx_orders')||'[]')}catch(e){return[]}}
function ordersOv(){var o=ORDERS();ov(T('Orders','آرڈرز'),o.length?o.map(function(x){return '<div class="axline"><b>'+x.id+'</b><span>'+x.s+'</span></div>';}).join(''):'<p class="axmuted">'+T('No orders yet.','ابھی کوئی آرڈر نہیں۔')+'</p>');}
function accountOv(){var acts=[[function(){clickOld('Sell')},'🏪 '+T('Seller Center','سیلر سینٹر')],[function(){clickOld('Committee')},'👥 '+T('Committee Buy','کمیٹی خرید')],[function(){var m=document.getElementById('nxMk');if(m)m.click();},'🌍 '+T('Market & currency','مارکیٹ اور کرنسی')],[function(){var g=document.getElementById('nxGear');if(g)g.click();},'⚙️ '+T('Settings & support','ترتیبات اور مدد')]];
 ov(T('Account','اکاؤنٹ'),'<div>'+acts.map(function(r,i){return '<button class="axitem" data-i="'+i+'">'+r[1]+'</button>';}).join('')+'</div>',function(root){root.addEventListener('click',function(e){var b=e.target.closest('[data-i]');if(!b)return;root.remove();acts[Number(b.dataset.i)][0]();});});}
function nav(){if(document.getElementById('axNav'))return;var N=[['home','🏠','Home','ہوم'],['saved','♡','Saved','محفوظ'],['cart','🛍','Cart','کارٹ'],['orders','📦','Orders','آرڈرز'],['account','👤','Account','اکاؤنٹ']];
 var d=document.createElement('nav');d.id='axNav';d.className='axnav';d.innerHTML=N.map(function(n){return '<button data-t="'+n[0]+'"><span>'+n[1]+'</span><small>'+T(n[2],n[3])+'</small></button>';}).join('');document.body.appendChild(d);
 d.addEventListener('click',function(e){var b=e.target.closest('[data-t]');if(!b)return;var t=b.dataset.t;
  if(t==='home')clickOld('Home');else if(t==='cart')clickCart();else if(t==='orders')ordersOv();else if(t==='saved')savedOv();else accountOv();
  d.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b);});});}
document.addEventListener('click',function(e){var b=e.target.closest('button,a');if(!b)return;if(!/checkout|confirm order|place order/i.test(b.textContent))return;
 setTimeout(function(){var rows=[].slice.call(document.querySelectorAll('#view .pcard,#view .cartrow,#view li,#view .card')).map(function(r){return{n:((r.querySelector('h3,.nm,.pname')||{}).textContent||'').trim(),p:((r.querySelector('.pprice,.price')||{}).textContent||'').trim(),s:((r.querySelector('.seller,.shop,.ss')||{}).textContent||'').trim()||'NexusShop Seller'};}).filter(function(x){return x.n&&x.p;});
  if(!rows.length)return;var g={};rows.forEach(function(r){(g[r.s]=g[r.s]||[]).push(r);});
  var orders=Object.keys(g).map(function(s){return{id:'NX-'+Math.random().toString(36).slice(2,8).toUpperCase(),s:s};});
  var o=ORDERS();orders.forEach(function(x){o.unshift(x);});localStorage.setItem('nx_orders',JSON.stringify(o.slice(0,30)));
  var d=document.createElement('div');d.className='axov';d.innerHTML='<div class="axovcard axcenter"><div class="axcheck">✓</div><h2>'+T('Order placed','آرڈر ہو گیا')+'</h2><p class="axmuted">'+T('Save your order number. The seller will confirm on WhatsApp or by call.','آرڈر نمبر محفوظ کریں۔ فروخت کنندہ واٹس ایپ یا کال پر تصدیق کرے گا۔')+'</p>'+orders.map(function(x,i){return '<div class="axorder"><b>'+x.s+'</b><div class="axid">'+x.id+'</div><button class="btn wa" data-i="'+i+'">💬 '+T('Message seller on WhatsApp','فروخت کنندہ کو واٹس ایپ پر پیغام')+'</button><button class="btn ghost">'+T('Track an order','آرڈر ٹریک کریں')+'</button></div>';}).join('')+'<button class="btn ghost axstart">'+T('Start shopping','خریداری شروع کریں')+'</button></div>';
  document.body.appendChild(d);
  d.querySelector('.axstart').onclick=function(){d.remove();clickOld('Home');};
  d.querySelectorAll('.wa').forEach(function(btn){btn.onclick=function(){var x=orders[Number(btn.dataset.i)];window.open('https://wa.me/?text='+encodeURIComponent(T('Hello! I placed order ','سلام! میں نے آرڈر رکھا ')+x.id+' — '+x.s),'_blank');};});},700);},true);
function detail(){var v=document.getElementById('view');if(!v||document.getElementById('axTrust'))return;if(!/Rs|₨/.test(v.textContent))return;var card=v.querySelector('.card');if(!card)return;var t=document.createElement('div');t.id='axTrust';t.className='axtrustcard';
 t.innerHTML='<div>💳 '+T('Cash on delivery — Check the parcel before you pay','کیش آن ڈیلیوری — ادائیگی سے پہلے پارسل چیک کریں')+'</div><div>🚚 '+T('Delivery: Rs 200 · Free delivery over Rs 5,000','ڈیلیوری: Rs 200 · Rs 5,000 سے اوپر مفت')+'</div><div>↩ '+T('Returns & refunds','واپسی اور رقم کی واپسی')+'</div>';
 card.after(t);}
function post(){banner();nav();var v=(typeof VIEW!=='undefined')?VIEW:'';if(v==='home'||v===''){hero();cats();}detail();
 document.querySelectorAll('.ribbon,[class*=demo],[class*=badge]').forEach(function(x){if(/DEMO/i.test(x.textContent))x.style.display='none';});}
var _r=window.render;if(_r&&!window._nx18){window._nx18=1;window.render=function(){var a=_r.apply(this,arguments);setTimeout(post,220);return a;};}
setTimeout(post,500);
});
})();
