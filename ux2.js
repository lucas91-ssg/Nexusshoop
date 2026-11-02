/* ===== UX CLARITY PACK v2 ===== */
(function(){
var PLANS=[
 {id:'free',name:'Free',price:0,features:['Up to 5 products live','WhatsApp COD checkout','Committee Buy groups','Public shop profile']},
 {id:'pro',name:'Pro',price:2500,features:['Up to 50 products live','Priority placement on home','Sales stats dashboard','Pro shop badge','Official payment receipts']},
 {id:'max',name:'Max',price:5000,features:['Up to 500 products live','Top-of-category placement','Everything in Pro','Dedicated WhatsApp support','Early access to new features']}];
window.nxPlans=function(){var o=document.getElementById('nxGroup');o.hidden=false;
 o.innerHTML='<div class="card"><button class="btn ghost" style="width:auto;padding:9px 14px;margin:0 0 10px" onclick="nxClose()">← Back</button><h2 class="t">📈 Plans & pricing (PKR)</h2><p style="font-size:12px;color:var(--muted);margin-bottom:10px">No login needed to compare. Subscribe from Seller Center once your shop is live.</p>'+
 PLANS.map(function(p,i){return '<div style="border:1px solid '+(i===0?'#00A650':'var(--border)')+';border-radius:14px;padding:12px;margin-bottom:10px;background:'+(i===0?'rgba(0,166,80,.08)':'rgba(255,255,255,.03)')+'"><b style="font-size:14px">'+p.name+' · Rs. '+p.price.toLocaleString()+'/month</b><ul style="margin:8px 0 0 16px;font-size:12px;line-height:1.7;color:var(--muted)">'+p.features.map(function(f){return '<li>'+(i===0?'✓ ':'🔒 ')+f+'</li>'}).join('')+'</ul></div>'}).join('')+
 '<button class="btn" onclick="nxClose();location.href=\'seller.html\'">🏪 Open Seller Center →</button><button class="btn ghost" onclick="location.href=\'checkout.html\'">Already have an account? Sign in →</button></div>';};
window.vCart=function(){var c=cart().filter(function(x){return !x.demo});
 if(!c.length)return '<div class="card"><h2 class="t">🛒 '+t('cart')+'</h2><div class="empty">'+t('emptyCart')+'</div></div>';
 var shops={};c.forEach(function(x){var k=x.shopName||'Seller';(shops[k]=shops[k]||[]).push(x)});
 var keys=Object.keys(shops);var tot=c.reduce(function(s,x){return s+x.price*x.q},0);
 return '<div class="card"><h2 class="t">🛒 '+t('cart')+'</h2>'+
 (keys.length>1?'<div class="infob">🧾 '+keys.length+' sellers in this cart — each order goes to its own seller WhatsApp. No confusion.</div>':'')+
 keys.map(function(k){var items=shops[k];var sub=items.reduce(function(s,x){return s+x.price*x.q},0);
  return '<div style="border:1px solid var(--border);border-radius:14px;padding:12px;margin-bottom:12px;background:rgba(255,255,255,.03)">'+
  '<div class="shopline" style="margin:0 0 10px">🏪 <b>'+esc(k)+'</b> · '+items.length+' items · '+money(sub)+'</div>'+
  items.map(function(x){return '<div class="row">'+(x.img?'<img src="'+esc(x.img)+'" onerror="this.outerHTML=\'<div style=&quot;font-size:30px&quot;>🛍️</div>\'">':'<div style="font-size:30px">🛍️</div>')+
   '<div class="inf"><div class="nm">'+esc(x.name)+'</div><div class="pr">'+money(x.price*x.q)+'</div></div>'+
   '<div class="q"><button onclick="setQ(\''+x.i+'\',-1)">−</button><span>'+x.q+'</span><button onclick="setQ(\''+x.i+'\',1)">+</button></div></div>'}).join('')+
  '<button class="btn wa" style="margin-top:10px" onclick="waShop(\''+k.replace(/'/g,"\\'")+'\')">💬 Order from '+esc(k)+' (COD)</button></div>'}).join('')+
 '<div class="tot"><span>'+t('total')+'</span><b>'+money(tot)+'</b></div>'+
 (typeof nxCourierBox==='function'?nxCourierBox():'')+'</div>';};
window.waShop=function(name){function send(){var c=cart().filter(function(x){return !x.demo&&(x.shopName||'Seller')===name});if(!c.length)return;
 var g=guest();var wa=(c[0].wa)||WA_DEFAULT;
 var msg='Assalam o Alaikum '+name+'! I want to order from NexusShop:\n'+c.map(function(x){return '• '+x.name+' x'+x.q+' — '+money(x.price*x.q)}).join('\n')+
 '\nTotal: '+money(c.reduce(function(s,x){return s+x.price*x.q},0))+' (COD)'+
 '\n👤 '+((BUYER&&BUYER.email?BUYER.email+' / ':'')+(g?g.name+' · '+g.phone:'guest'))+(g&&g.city?' · '+g.city:'')+
 (window.NXCOURIER&&window.NXCOURIER!=='Seller arranges'?'\n🚚 Courier: '+window.NXCOURIER:'');
 window.open('https://wa.me/'+String(wa).replace(/\D/g,'')+'?text='+encodeURIComponent(msg),'_blank');
 markOrdered(c.map(function(x){return x.i}));
 saveCart(cart().filter(function(x){return (x.shopName||'Seller')!==name}));
 toast('✓ Order sent to '+name,'ok');render();}
 if(!guest())nxGuestForm(send);else send();};
var _ns2=window.nxShow;
window.nxShow=function(id){_ns2(id);setTimeout(function(){var c=document.querySelector('#nxGroup .card');if(c&&!c.querySelector('.nxsteps'))c.insertAdjacentHTML('afterbegin','<div class="infob nxsteps">📣 <b>How it works:</b> 1) Share the link → 2) 3 buyers join → 3) everyone pays the committee price, COD at the door. Orders register automatically.</div>');},350);};
var _nf2=window.nxSubmitForm;
window.nxSubmitForm=function(){var b=document.querySelector('#nxGroup .btn:not(.ghost)');if(b){b.disabled=true;b.textContent='Creating…';setTimeout(function(){if(b){b.disabled=false;b.textContent='Confirm →'}},3500);} _nf2();};
var _r2=render;
render=function(){_r2();
 if(VIEW==='sell'){var bs=document.querySelectorAll('#view .btn');if(bs.length>1){var g=bs[bs.length-1];g.removeAttribute('onclick');g.onclick=function(){nxPlans()};}}
 if(VIEW==='detail'){var p=PRODS.find(function(x){return x.id===CUR});
  if(p&&p.stock===0){var tags=document.querySelector('#view .tags');if(tags&&!tags.querySelector('.tgoos'))tags.insertAdjacentHTML('beforeend','<span class="tag tgoos" style="border-color:rgba(248,113,113,.5);color:#fecaca">⛔ Out of stock</span>');
   document.querySelectorAll('#view .btn').forEach(function(b){if(/Add —/.test(b.textContent)){b.disabled=true;b.style.opacity=.5;b.textContent='⛔ Out of stock';}});}}};
var _es2=window.enterShop;
window.enterShop=function(){_es2();if(LS.get('nx_welcomed',0))return;LS.set('nx_welcomed',1);
 setTimeout(function(){var o=document.getElementById('nxGroup');o.hidden=false;
 o.innerHTML='<div class="card"><h2 class="t">👋 Welcome to NexusShop</h2><p style="font-size:12.5px;color:var(--muted);line-height:1.6;margin-bottom:12px">Sign in to sync orders across devices — or continue as guest. <b>Buying never requires an account.</b> Sellers must sign in to protect their shop.</p>'+
 '<button class="btn" onclick="nxClose();go(\'login\')">✉️ Continue with email</button>'+
 '<button class="btn ghost" onclick="nxWaLogin()">📱 Continue with WhatsApp number</button>'+
 '<button class="btn ghost" onclick="nxGoogle()">G Continue with Google</button>'+
 '<button class="btn ghost" onclick="nxClose();toast(\'Shopping as guest — full access\',\'info\')">→ Continue as guest</button></div>';},600);};
window.nxWaLogin=function(){var o=document.getElementById('nxGroup');
 o.innerHTML='<div class="card"><button class="btn ghost" style="width:auto;padding:9px 14px;margin:0 0 10px" onclick="nxClose()">← Back</button><h2 class="t">📱 WhatsApp identity</h2><p style="font-size:12px;color:var(--muted);margin-bottom:10px">We save your number on this device so sellers can reach you. SMS code (OTP) arrives with v2.</p>'+
 '<div class="lbl">Your WhatsApp</div><input class="f" id="waId" type="tel" placeholder="+92 3XX XXXXXXX">'+
 '<button class="btn" onclick="nxWaSave()">Continue →</button></div>';};
window.nxWaSave=function(){var p=(document.getElementById('waId').value||'').trim();var d=p.replace(/\D/g,'');if(d.length<10||d.length>13){toast('Enter a valid WhatsApp number','err');return}
 var g=guest()||{};g.phone=p;g.name=g.name||'Guest';LS.set('nx_guest',g);nxClose();document.getElementById('userB').textContent='✅';toast('✓ WhatsApp identity saved','ok');};
window.nxGoogle=function(){ensureSB().then(function(s){if(!s){toast('Offline','err');return}s.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+location.pathname}}).then(function(r){if(r.error)toast('Google sign-in needs one-time setup (Supabase → Auth → Providers → Google). Email works now.','err');});});};
})();
