/* ===== GUEST CHECKOUT · sin pared de login para compradores ===== */
function addCart(id){var p=PRODS.find(function(x){return x.id===id});if(!p)return;
 if(p.demo){toast('DEMO item — cannot add to cart','info');return}
 var c=cart(),f=c.find(function(x){return x.i===id});
 if(f)f.q++;else c.push({i:id,q:1,name:p.name,price:p.price,img:p.img,wa:p.wa,shopName:p.shopName});
 saveCart(c);toast('✓ '+t('add'),'ok');render();}
function go(v){VIEW=v;CUR=null;render();window.scrollTo(0,0);
 document.querySelectorAll('#nav button').forEach(function(b){b.classList.toggle('on',b.dataset.v===v)});}
function addCur(){var p=PRODS.find(function(x){return x.id===CUR});if(!p)return;
 var c=cart(),f=c.find(function(x){return x.i===CUR});
 if(f)f.q+=QTY;else c.push({i:CUR,q:QTY,name:p.name,price:p.price,img:p.img,wa:p.wa,shopName:p.shopName});
 saveCart(c);toast('✓ '+t('add'),'ok');go('cart');}
function guest(){return LS.get('nx_guest',null)}
function saveGuest(g){LS.set('nx_guest',g)}
window.nxGuestForm=function(after){var g=guest();var o=document.getElementById('nxGroup');o.hidden=false;
 o.innerHTML='<div class="card"><button class="btn ghost" style="width:auto;padding:9px 14px;margin:0 0 10px" onclick="nxClose()">← Back</button>'+
 '<h2 class="t">📬 Delivery details</h2><p style="font-size:12px;color:var(--muted);margin-bottom:10px">No account needed. The seller uses this to deliver your COD order.</p>'+
 '<div class="lbl">Full name</div><input class="f" id="gN" value="'+(g&&g.name?esc(g.name):'')+'" placeholder="Ali Raza">'+
 '<div class="lbl">WhatsApp</div><input class="f" id="gP" type="tel" value="'+(g&&g.phone?esc(g.phone):'')+'" placeholder="+92 3XX XXXXXXX">'+
 '<div class="lbl">City</div><input class="f" id="gC" value="'+(g&&g.city?esc(g.city):'')+'" placeholder="Lahore">'+
 '<button class="btn" onclick="nxGuestSave()">Continue →</button></div>';
 window._gAfter=after;};
window.nxGuestSave=function(){var n=document.getElementById('gN').value.trim(),p=document.getElementById('gP').value.trim(),c=document.getElementById('gC').value.trim();
 if(!n||p.replace(/\D/g,'').length<10||p.replace(/[^0-9]/g,"").length>13){toast('Name + valid WhatsApp required','err');return}
 saveGuest({name:n,phone:p,city:c});document.getElementById('nxGroup').hidden=true;
 if(window._gAfter)window._gAfter();};
function whoLine(){var g=guest();return (BUYER&&BUYER.email?BUYER.email+' / ':'')+(g?g.name+' · '+g.phone:'guest')}
window.waOne=function(p){function send(){var g=guest();
  var wa=String((p.wa)||WA_DEFAULT).replace(/\D/g,'');var shopName=p.shopName||'Seller';
  var msg=(LAN==='ur'?'السلام علیکم ':'Assalam o Alaikum ')+shopName+'! I want to order from NexusShop:\n• '+p.name+' x'+QTY+' — '+money(p.price*QTY)+
   '\n👤 '+whoLine()+(g&&g.city?' · '+g.city:'')+'\n💵 Cash on Delivery'+
   (window.NXCOURIER&&window.NXCOURIER!=='Seller arranges'?'\n🚚 Courier: '+window.NXCOURIER:'');
  window.open('https://wa.me/'+wa+'?text='+encodeURIComponent(msg),'_blank');
  markOrdered([p.id]);toast('✓ Order sent','ok');}
 if(!guest())nxGuestForm(send);else send();};
window.waCart=function(){function send(){var c=cart().filter(function(x){return !x.demo});if(!c.length)return;
  var g=guest();var first=c[0];var wa=(first&&first.wa)||WA_DEFAULT;var shopName=(first&&first.shopName)||'Seller';
  var msg='Assalam o Alaikum '+shopName+'! I want to order from NexusShop:\n'+
   c.map(function(x){return '• '+x.name+' x'+x.q+' — '+money(x.price*x.q)}).join('\n')+
   '\nTotal: '+money(c.reduce(function(s,x){return s+x.price*x.q},0))+' (COD)'+
   '\n👤 '+whoLine()+(g&&g.city?' · '+g.city:'')+
   (window.NXCOURIER&&window.NXCOURIER!=='Seller arranges'?'\n🚚 Courier: '+window.NXCOURIER:'');
  window.open('https://wa.me/'+wa+'?text='+encodeURIComponent(msg),'_blank');
  markOrdered(c.map(function(x){return x.i}));saveCart([]);toast('✓ Order sent — saved for reorder','ok');render();}
 if(!guest())nxGuestForm(send);else send();};
function vCart(){var c=cart().filter(function(x){return !x.demo});
 if(!c.length)return '<div class="card"><h2 class="t">🛒 '+t('cart')+'</h2><div class="empty">'+t('emptyCart')+'</div></div>';
 var tot=c.reduce(function(s,x){return s+x.price*x.q},0);
 var first=c[0];var shopLine=first&&first.shopName?'<div class="shopline">🏪 Ordering from <b>'+esc(first.shopName)+'</b></div>':'';
 return '<div class="card"><h2 class="t">🛒 '+t('cart')+'</h2>'+shopLine+
 c.map(function(x){return '<div class="row">'+(x.img?'<img src="'+esc(x.img)+'" onerror="this.outerHTML=\'<div style=&quot;font-size:30px&quot;>🛍️</div>\'">':'<div style="font-size:30px">🛍️</div>')+
 '<div class="inf"><div class="nm">'+esc(x.name)+'</div><div class="pr">'+money(x.price*x.q)+'</div></div>'+
 '<div class="q"><button onclick="setQ(\''+x.i+'\',-1)">−</button><span>'+x.q+'</span><button onclick="setQ(\''+x.i+'\',1)">+</button></div></div>'}).join('')+
 '<div class="tot"><span>'+t('total')+'</span><b>'+money(tot)+'</b></div>'+
 (typeof nxCourierBox==='function'?nxCourierBox():'')+
 '<button class="btn wa" style="margin-top:12px" onclick="waCart()">💬 '+t('orderWA')+'</button></div>';}
function userTap(){var g=guest();var o=document.getElementById('nxGroup');o.hidden=false;
 o.innerHTML='<div class="card"><button class="btn ghost" style="width:auto;padding:9px 14px;margin:0 0 10px" onclick="nxClose()">← Back</button>'+
 '<h2 class="t">👤 Profile</h2>'+
 (g?'<div class="shopline">📬 <b>'+esc(g.name)+'</b> · '+esc(g.phone)+(g.city?' · '+esc(g.city):'')+'</div><button class="btn" onclick="nxGuestEdit()">✏️ Edit delivery details</button>'
   :'<p style="color:var(--muted);font-size:13px;line-height:1.6">You are shopping as a guest — no account needed. Add your delivery details so sellers can reach you for COD orders.</p><button class="btn" onclick="nxGuestEdit()">📬 Add delivery details</button>')+
 (BUYER?'<div class="shopline" style="margin-top:10px">✅ '+esc(BUYER.email)+'</div><button class="btn ghost" onclick="nxLogout()">Log out</button>'
   :'<button class="btn ghost" style="margin-top:10px" onclick="nxEmailLogin()">Optional: sign in with email</button>')+
 '</div>';}
window.nxGuestEdit=function(){nxGuestForm(function(){userTap()})};
window.nxLogout=function(){BUYER=null;LS.set('nx_buyer',null);document.getElementById('userB').textContent='👤';nxClose();toast('Logged out','info');render()};
window.nxEmailLogin=function(){nxClose();go('login')};
/* ===== LAUNCH POLISH: reviews, stock, select style, multi-shop cart ===== */
(function(){
document.head.insertAdjacentHTML('beforeend','<style>select.f{background:var(--glass);color:var(--text);border:1px solid var(--border);border-radius:14px;padding:12px 14px;font-size:14px;font-family:inherit}select.f option{background:#0b1030;color:#eef2ff}body.light select.f{background:#fff;color:#141a3a}body.light select.f option{background:#fff;color:#141a3a}</style>');
window.nxPolish=function(){var p=PRODS.find(function(x){return x.id===CUR});if(!p||p.demo)return;
 var tags=document.querySelector('#view .tags');
 if(tags&&p.stock!=null&&!tags.querySelector('.tgstock'))tags.insertAdjacentHTML('beforeend','<span class="tag tgstock">📦 '+p.stock+' in stock</span>');
 if(!document.getElementById('nxRev')){var box=document.getElementById('nxCommitBox');if(box)box.insertAdjacentHTML('beforebegin',
 '<div class="card" id="nxRev"><h2 class="t">⭐ Reviews</h2><p style="font-size:13px;color:var(--muted);line-height:1.6">★★★★★ <b>0 reviews yet</b> — be the first! Reviews unlock with the first delivered COD orders. Every review is tied to a real order, so ratings on NexusShop can never be faked.</p></div>');}};
var _rp=render;render=function(){_rp();if(typeof VIEW!=='undefined'&&VIEW==='detail')nxPolish();};
window.waCart=function(){function send(){var c=cart().filter(function(x){return !x.demo});if(!c.length)return;
 var shops={};c.forEach(function(x){var k=x.shopName||'Seller';(shops[k]=shops[k]||[]).push(x)});
 var keys=Object.keys(shops);var g=guest();
 function whoLine2(){return (BUYER&&BUYER.email?BUYER.email+' / ':'')+(g?g.name+' · '+g.phone:'guest')}
 function msgFor(k){var items=shops[k];return 'Assalam o Alaikum '+k+'! I want to order from NexusShop:\n'+
  items.map(function(x){return '• '+x.name+' x'+x.q+' — '+money(x.price*x.q)}).join('\n')+
  '\nTotal: '+money(items.reduce(function(s,x){return s+x.price*x.q},0))+' (COD)'+
  '\n👤 '+whoLine2()+(g&&g.city?' · '+g.city:'')+
  (window.NXCOURIER&&window.NXCOURIER!=='Seller arranges'?'\n🚚 Courier: '+window.NXCOURIER:'');}
 var first=keys[0];var wa=(shops[first][0].wa)||WA_DEFAULT;
 window.open('https://wa.me/'+String(wa).replace(/\D/g,'')+'?text='+encodeURIComponent(msgFor(first)),'_blank');
 if(keys.length>1&&navigator.clipboard){navigator.clipboard.writeText(msgFor(keys[1]));toast('📋 Order for '+keys[1]+' copied — paste in WhatsApp','info');}
 markOrdered(c.map(function(x){return x.i}));saveCart([]);toast('✓ Order sent — saved for reorder','ok');render();}
 if(!guest())nxGuestForm(send);else send();};
})();
/* ===== TRUST LOOP: pedidos registrados + tracking + reviews verificadas ===== */
(function(){
function nxToken(){var t=LS.get('nx_token',null);if(!t){t='nx-'+Math.random().toString(36).slice(2)+Date.now().toString(36);LS.set('nx_token',t);}return t;}
window.nxToken=nxToken;
function ensureSBX(cb){if(window.SBX)return cb(window.SBX);import('https://esm.sh/@supabase/supabase-js@2.45.4').then(function(m){window.SBX=m.createClient('https://iafofzwxkzwliisvstfy.supabase.co','sb_publishable_uXpbSgDe4OXVWibgQ187RA_INLaX0SY',{global:{headers:{'x-nx-token':nxToken()}},auth:{persistSession:false}});cb(window.SBX);}).catch(function(){cb(null)});}
window.ensureSBX=ensureSBX;
function logOrder(items,shopId,total){var g=guest();ensureSBX(function(s){if(!s)return;
 s.from('orders').insert({store_id:shopId,items:items,customer_name:g?g.name:(BUYER&&BUYER.email?BUYER.email:'Guest'),customer_phone:g?g.phone:'',customer_city:g?g.city:'',payment_method:'COD',status:'pending',total:total,buyer_token:nxToken(),attribution_ref:'wa'}).then(function(r){if(!r.error)toast('📦 Order registered — track it in Orders','ok');});});}
var _open=window.open;
window.open=function(url){try{if(typeof url==='string'&&url.indexOf('https://wa.me/')===0){
 if(VIEW==='cart'){var c=cart().filter(function(x){return !x.demo});if(c.length){var p0=PRODS.find(function(p){return p.id===c[0].i});logOrder(c.map(function(x){return {i:x.i,q:x.q,name:x.name,price:x.price}}),p0?p0.shopId:null,c.reduce(function(s,x){return s+x.price*x.q},0));}}
 else if(VIEW==='detail'){var p=PRODS.find(function(x){return x.id===CUR});if(p)logOrder([{i:p.id,q:QTY,name:p.name,price:p.price}],p.shopId||null,p.price*QTY);}}}catch(e){}
 return _open.apply(window,arguments);};
window.vOrders=function(){return '<div class="card"><h2 class="t">📦 '+t('orders')+'</h2><div id="nxOrdList"><div class="empty">Loading…</div></div></div>'};
var _rv=render;render=function(){_rv();if(typeof VIEW!=='undefined'&&VIEW==='orders')nxLoadOrders();};
window.nxLoadOrders=function(){var el=document.getElementById('nxOrdList');if(!el)return;ensureSBX(function(s){if(!s){el.innerHTML='<div class="empty">Offline</div>';return}
 s.from('orders').select('*').eq('buyer_token',nxToken()).order('created_at',{ascending:false}).limit(20).then(function(r){var l=r.data||[];
  if(!l.length){el.innerHTML='<div class="empty">'+t('ordersEmpty')+'</div>';return}
  el.innerHTML=l.map(function(o){var chip=o.status==='delivered'?'🟢':o.status==='shipped'?'🚚':'';
   return '<div class="row" style="flex-wrap:wrap"><div class="inf"><div class="nm">'+chip+' Order '+o.created_at.slice(5,10)+' · '+money(o.total)+'</div><div class="pr" style="color:var(--muted);font-size:11px">'+(o.items||[]).map(function(it){return it.name+' x'+it.q}).join(', ')+'</div><div style="margin-top:6px;font-size:11px;font-weight:800;color:'+(o.status==='delivered'?'var(--ok)':o.status==='shipped'?'var(--g3)':'var(--muted)')+'">'+o.status.toUpperCase()+'</div></div>'+(o.status==='delivered'?'<button class="btn ghost" style="width:auto;padding:8px 12px;margin:0" onclick="nxReview(\''+o.id+'\',\''+((o.items&&o.items[0]&&o.items[0].i)||'')+'\')">⭐ Review</button>':'')+'</div>';}).join('');});});};
window.nxReview=function(orderId,productId){if(!productId){toast('No product linked','err');return}
 var o=document.getElementById('nxGroup');o.hidden=false;window._star=0;
 o.innerHTML='<div class="card"><button class="btn ghost" style="width:auto;padding:9px 14px;margin:0 0 10px" onclick="nxClose()">← Back</button><h2 class="t">⭐ Review your order</h2>'+
 '<div class="lbl">Rating</div><div style="display:flex;gap:8px" id="nxStars">'+[1,2,3,4,5].map(function(n){return '<b style="font-size:26px;cursor:pointer" onclick="window._star='+n+';document.querySelectorAll(\'#nxStars b\').forEach(function(s,i){s.style.opacity=i<'+n+'?1:.3})">★</b>'}).join('')+'</div>'+
 '<div class="lbl">Comment (optional)</div><input class="f" id="rvT" placeholder="Fast delivery, good quality…">'+
 '<button class="btn" onclick="nxReviewSend(\''+orderId+'\',\''+productId+'\')">Publish review →</button></div>';};
window.nxReviewSend=function(orderId,productId){var g=guest();var stars=window._star||5;var body=(document.getElementById('rvT').value||'').trim();
 SB.from('reviews').insert({product_id:productId,order_id:orderId,author:(g?g.name:'Guest')+' · verified order',rating:stars,body:body}).then(function(r){if(r.error){toast(r.error.message,'err');return}nxClose();toast('✓ Review published — thank you!','ok');if(VIEW==='detail')nxPolish();});};
var _pl=window.nxPolish;
window.nxPolish=function(){_pl();var box=document.getElementById('nxRev');if(!box||box.dataset.loaded)return;box.dataset.loaded='1';
 SB.from('reviews').select('*').eq('product_id',CUR).order('created_at',{ascending:false}).limit(10).then(function(r){var l=r.data||[];if(!l.length)return;
  var avg=l.reduce(function(s,x){return s+x.rating},0)/l.length;
  box.innerHTML='<h2 class="t">⭐ Reviews ('+l.length+')</h2><div style="font-size:13px;margin-bottom:8px"><b style="color:var(--ok)">'+avg.toFixed(1)+' / 5</b> average · verified orders only</div>'+
  l.map(function(v){return '<div style="border-top:1px solid var(--border);padding:10px 0;font-size:12.5px;line-height:1.6"><b>'+'★'.repeat(v.rating)+'☆'.repeat(5-v.rating)+'</b> · '+esc(v.author)+'<div style="color:var(--muted)">'+esc(v.body||'')+'</div></div>'}).join('');});};
})();
