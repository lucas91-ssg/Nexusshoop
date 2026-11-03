/* ===== PLANES PKR + PAGO A TALAL + ACTIVACIÓN ADMIN + COMPROBANTES ===== */
(function(){
var NX_PAY=window.NX_PAY={jazzcash:'',easypaisa:'',holder:'Talal · NexusShop Pakistan'};
var NX_PLANS=[
 {id:'free',name:'Free',price:0,features:['Up to 5 products live','WhatsApp COD checkout','Committee Buy groups','Public shop profile']},
 {id:'pro',name:'Pro',price:2500,features:['Up to 50 products live','Priority placement on home','Sales stats dashboard','Pro shop badge','Official payment receipts']},
 {id:'max',name:'Max',price:5000,features:['Up to 500 products live','Top-of-category placement','Everything in Pro','Dedicated WhatsApp support line','Early access to new features']}];
var ADMIN=['lucasyabi125@gmail.com','properiapro2025@gmail.com'];
document.body.insertAdjacentHTML('beforeend','<div id="nxPayOv" style="position:fixed;inset:0;z-index:999;background:#070b21;overflow-y:auto;padding:16px" hidden></div>');
function boot(){if(!window.SB)return setTimeout(boot,800);
 SB.auth.getUser().then(function(u){if(!u.user)return;window.NXME=u.user.email;window.NXUID=u.user.id;
  SB.from('stores').select('*').eq('owner_id',u.user.id).limit(1).then(function(r){var s=r.data&&r.data[0];if(!s)return;ui(s);receipts(s);stats(s);admin();});});}
setTimeout(boot,1200);
function ui(s){var host=document.querySelector('main')||document.body;var cur=s.plan||'free';
 var ci=0;NX_PLANS.forEach(function(p,i){if(p.id===cur)ci=i;});
 var div=document.createElement('div');div.className='nxpf-card';div.id='nxPlans';
 div.innerHTML='<h2 style="font-size:16px;font-weight:800;margin-bottom:6px">📈 Plans & subscription</h2>'+
 '<p style="font-size:12px;opacity:.75;margin-bottom:10px">Current plan: <b>'+cur.toUpperCase()+'</b> · all prices in PKR (Pakistani Rupees)</p>'+
 NX_PLANS.map(function(p,i){var active=p.id===cur;var locked=i<ci;
  return '<div style="border:1px solid '+(active?'#00A650':'rgba(255,255,255,.12)')+';border-radius:14px;padding:12px;margin-bottom:10px;background:'+(active?'rgba(0,166,80,.08)':'rgba(255,255,255,.03)')+'">'+
  '<b style="font-size:14px">'+(locked&&!active?'':(!active&&i>ci?'':''))+p.name+' · Rs. '+p.price.toLocaleString()+'/month</b>'+
  '<ul style="margin:8px 0 0 16px;font-size:12px;line-height:1.7;opacity:.85">'+p.features.map(function(f){return '<li>'+((i>ci&&!active)?'🔒 ':'✓ ')+f+'</li>'}).join('')+'</ul>'+
  (active?'<span style="font-size:11px;color:#00A650;font-weight:800">✓ YOUR PLAN</span>':(i<ci?'<span style="font-size:11px;opacity:.6">below your current plan</span>':'<button class="nxpf-btn" style="margin-top:10px" onclick="nxPay(\''+s.id+'\',\''+p.id+'\','+p.price+')">Subscribe →</button>'))+
  '</div>';}).join('');
 host.appendChild(div);}
window.nxPay=function(shopId,plan,price){var ov=document.getElementById('nxPayOv');ov.hidden=false;
 ov.innerHTML='<div class="nxpf-card"><button class="nxpf-btn" style="background:transparent;border:1px solid rgba(255,255,255,.2);color:inherit" onclick="document.getElementById(\'nxPayOv\').hidden=true">← Back</button>'+
 '<h2 style="margin:10px 0 6px;font-size:16px;font-weight:800">💳 Subscribe to '+plan.toUpperCase()+'</h2>'+
 '<p style="font-size:15px;font-weight:800;color:#00A650">Rs. '+price.toLocaleString()+' / month (PKR)</p>'+
 '<p style="font-size:12px;opacity:.85;line-height:1.7;margin:10px 0">1) Send the amount via JazzCash or Easypaisa to:<br>• JazzCash: <b>'+NX_PAY.jazzcash+'</b><br>• Easypaisa: <b>'+NX_PAY.easypaisa+'</b><br>Holder: <b>'+NX_PAY.holder+'</b><br>2) Copy the Transaction ID (TID) from your confirmation SMS.<br>3) Paste it below and tap "I have paid".<br>Your plan is activated manually within 24h with an official receipt. The money goes directly to the NexusShop Pakistan wallet.</p>'+
 '<div class="nxpf-lbl">Method</div><select class="nxpf-inp" id="pyM"><option>JazzCash</option><option>Easypaisa</option><option>Bank transfer</option></select>'+
 '<div class="nxpf-lbl">Transaction ID (TID)</div><input class="nxpf-inp" id="pyT" placeholder="e.g. 1234567890">'+
 '<button class="nxpf-btn" onclick="nxPaySend(\''+shopId+'\',\''+plan+'\','+price+')">✅ I have paid — send for activation</button></div>';};
window.nxPaySend=function(shopId,plan,price){var tid=(document.getElementById('pyT').value||'').trim();var m=document.getElementById('pyM').value;
 if(tid.length<6){toast('Enter the transaction ID from your SMS','err');return}
 SB.from('payments').insert({shop_id:shopId,owner_id:window.NXUID,plan:plan,amount_pkr:price,method:m,txn_ref:tid}).then(function(r){
  if(r.error){toast(r.error.message,'err');return}
  document.getElementById('nxPayOv').hidden=true;toast('✓ Payment registered — activation within 24h','ok');
  window.open('https://wa.me/542257550650?text='+encodeURIComponent('NexusShop subscription: plan '+plan.toUpperCase()+' Rs. '+price+'/month via '+m+'. TID: '+tid+' (shop '+shopId+'). Please activate.'),'_blank');});};
function admin(){if(ADMIN.indexOf(window.NXME)<0)return;
 SB.from('payments').select('*,stores(name)').eq('status','pending').order('created_at').then(function(r){var list=r.data||[];if(!list.length)return;
  var div=document.createElement('div');div.className='nxpf-card';
  div.innerHTML='<h2 style="font-size:16px;font-weight:800;margin-bottom:10px">🧾 Payments pending activation (admin)</h2>'+
  list.map(function(p){return '<div style="border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:10px;margin-bottom:8px;font-size:12.5px;line-height:1.6">'+
   '<b>'+((p.stores&&p.stores.name)||'?')+'</b> · '+p.plan.toUpperCase()+' · Rs. '+p.amount_pkr+' · '+p.method+' · TID '+p.txn_ref+
   '<div style="display:flex;gap:8px;margin-top:8px"><button class="nxpf-btn" style="padding:10px" onclick="nxActivate(\''+p.id+'\',\''+p.shop_id+'\',\''+p.plan+'\')">✓ Activate & issue receipt</button><button class="nxpf-btn" style="padding:10px;background:transparent;border:1px solid rgba(248,113,113,.5);color:#fecaca" onclick="nxReject(\''+p.id+'\')">Reject</button></div></div>'}).join('');
  (document.querySelector('main')||document.body).appendChild(div);});}
window.nxActivate=function(id,shopId,plan){var code='NX-'+new Date().getFullYear()+'-'+Math.floor(1000+Math.random()*9000);
 SB.from('payments').update({status:'active',receipt_code:code,activated_at:new Date().toISOString()}).eq('id',id).then(function(){
  SB.from('stores').update({plan:plan}).eq('id',shopId).then(function(){toast('✓ Activated — receipt '+code,'ok');location.reload();});});};
window.nxReject=function(id){SB.from('payments').update({status:'rejected'}).eq('id',id).then(function(){toast('Rejected','info');location.reload();});};
function receipts(s){SB.from('payments').select('*').eq('shop_id',s.id).eq('status','active').order('activated_at').then(function(r){var el=document.getElementById('nxReceipts');var l=r.data||[];if(!l.length)return;
 var div=document.createElement('div');div.className='nxpf-card';
 div.innerHTML='<h2 style="font-size:14px;font-weight:800;margin-bottom:8px">🧾 My payment receipts</h2>'+l.map(function(p){return '<div style="border:1px dashed rgba(0,166,80,.5);border-radius:12px;padding:10px;margin-bottom:8px;font-size:12px;line-height:1.7">Receipt <b>'+p.receipt_code+'</b><br>Plan '+p.plan.toUpperCase()+' · Rs. '+p.amount_pkr+' · '+p.method+'<br>Activated: '+new Date(p.activated_at).toLocaleDateString()+' · NexusShop Pakistan™</div>'}).join('');
 (document.querySelector('main')||document.body).appendChild(div);});}
function stats(s){var div=document.createElement('div');div.className='nxpf-card';div.id='nxStats';
 if((s.plan||'free')==='free'){div.innerHTML='🔒 <b>Sales stats dashboard</b> — orders, COD volume and Committee conversions. Unlocked with Pro (Rs. 2,500/month).';(document.querySelector('main')||document.body).appendChild(div);return;}
 SB.from('orders').select('total,attribution_ref').eq('store_id',s.id).then(function(r){var l=r.data||[];var tot=l.reduce(function(a,x){return a+Number(x.total||0)},0);var com=l.filter(function(x){return (x.attribution_ref||'').indexOf('group:')===0}).length;
  div.innerHTML='<h2 style="font-size:14px;font-weight:800;margin-bottom:8px">📊 Sales stats (Pro)</h2><div style="display:flex;gap:8px;flex-wrap:wrap">'+
  '<div style="flex:1;min-width:90px;border:1px solid rgba(0,166,80,.4);border-radius:12px;padding:10px;text-align:center"><b style="font-size:18px">'+l.length+'</b><div style="font-size:10.5px;opacity:.7">orders</div></div>'+
  '<div style="flex:1;min-width:90px;border:1px solid rgba(0,166,80,.4);border-radius:12px;padding:10px;text-align:center"><b style="font-size:16px">Rs. '+tot.toLocaleString()+'</b><div style="font-size:10.5px;opacity:.7">COD value</div></div>'+
  '<div style="flex:1;min-width:90px;border:1px solid rgba(0,166,80,.4);border-radius:12px;padding:10px;text-align:center"><b style="font-size:18px">'+com+'</b><div style="font-size:10.5px;opacity:.7">committee</div></div></div>';
  (document.querySelector('main')||document.body).appendChild(div);});}
})();
/* tope de productos segun plan */
(function(){function setLimit(){if(!window.NXUID)return setTimeout(setLimit,1500);
 SB.from('stores').select('id,plan').eq('owner_id',window.NXUID).limit(1).then(function(r){var s=r.data&&r.data[0];if(!s)return;
  var p=s.plan||'free';window.NXLIMIT=p==='max'?500:(p==='pro'?50:5);
  SB.from('ns_products').select('id',{count:'exact',head:true}).eq('shop_id',s.id).then(function(c){
   var el=document.getElementById('myProdCount');if(el&&c.count!=null)el.innerHTML=c.count+' / '+window.NXLIMIT+(p==='free'?' free':' included');});});}
 setTimeout(setLimit,2500);})();
/* config dinamica de cobro + metodos disponibles */
(function(){
 function loadCfg(){if(!window.SB)return setTimeout(loadCfg,1200);
  SB.from('pay_config').select('*').limit(1).then(function(r){var c=r.data&&r.data[0];if(!c)return;
   if(c.jazzcash)NX_PAY.jazzcash=c.jazzcash;if(c.easypaisa)NX_PAY.easypaisa=c.easypaisa;
   if(c.bank_name)NX_PAY.bank_name=c.bank_name;if(c.bank_title)NX_PAY.bank_title=c.bank_title;
   if(c.bank_iban)NX_PAY.bank_iban=c.bank_iban;if(c.holder)NX_PAY.holder=c.holder;});}
 setTimeout(loadCfg,1500);
 window.nxPay=function(shopId,plan,price){var ov=document.getElementById('nxPayOv');ov.hidden=false;
  var methods=[];var lines='';
  if(NX_PAY.jazzcash){methods.push('JazzCash');lines+='• JazzCash: <b>'+NX_PAY.jazzcash+'</b><br>';}
  if(NX_PAY.easypaisa){methods.push('Easypaisa');lines+='• Easypaisa: <b>'+NX_PAY.easypaisa+'</b><br>';}
  if(NX_PAY.bank_name){methods.push('Bank transfer');lines+='• '+NX_PAY.bank_name+' — Title: <b>'+NX_PAY.bank_title+'</b> — AC/IBAN: <b>'+NX_PAY.bank_iban+'</b><br>';}
  if(!methods.length)lines='Payment methods are being configured. Contact support on WhatsApp.';
  ov.innerHTML='<div class="nxpf-card"><button class="nxpf-btn" style="background:transparent;border:1px solid rgba(255,255,255,.2);color:inherit" onclick="document.getElementById(\'nxPayOv\').hidden=true">← Back</button>'+
  '<h2 style="margin:10px 0 6px;font-size:16px;font-weight:800">💳 Subscribe to '+plan.toUpperCase()+'</h2>'+
  '<p style="font-size:15px;font-weight:800;color:#00A650">Rs. '+price.toLocaleString()+' / month (PKR)</p>'+
  '<p style="font-size:12px;opacity:.85;line-height:1.7;margin:10px 0">Send the amount to the NexusShop Pakistan account:<br>'+lines+'Holder: <b>'+NX_PAY.holder+'</b><br>Then paste the Transaction ID / deposit slip number below. Your plan is activated within 24h with an official receipt.</p>'+
  '<div class="nxpf-lbl">Method</div><select class="nxpf-inp" id="pyM">'+methods.map(function(m){return '<option>'+m+'</option>'}).join('')+'</select>'+
  '<div class="nxpf-lbl">Transaction ID / slip number</div><input class="nxpf-inp" id="pyT" placeholder="e.g. 1234567890">'+
  '<button class="nxpf-btn" onclick="nxPaySend(\''+shopId+'\',\''+plan+'\','+price+')">✅ I have paid — send for activation</button></div>';};
})();
/* ===== SELLER: bandeja de pedidos entrantes en tiempo real ===== */
(function(){function esc2(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function money2(n){return 'Rs. '+Number(n||0).toLocaleString('en-PK')}
function boot2(){if(!window.SB||!window.NXUID)return setTimeout(boot2,1500);
 SB.from('stores').select('id').eq('owner_id',window.NXUID).limit(1).then(function(r){var s=r.data&&r.data[0];if(s)loadOrders(s.id);});}
function loadOrders(shopId){SB.from('orders').select('*').eq('store_id',shopId).order('created_at',{ascending:false}).limit(25).then(function(r){var l=r.data||[];
 var old=document.getElementById('nxOrdersCard');if(old)old.remove();
 var div=document.createElement('div');div.className='nxpf-card';div.id='nxOrdersCard';
 div.innerHTML='<h2 style="font-size:16px;font-weight:800;margin-bottom:10px">📥 Incoming orders ('+l.length+')</h2>'+
 (l.length?l.map(function(o){return '<div style="border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:10px;margin-bottom:8px;font-size:12.5px;line-height:1.6">'+
  '<b>'+esc2(o.customer_name)+'</b> · '+esc2(o.customer_city||'')+'<br>📞 '+esc2(o.customer_phone||'')+
  '<br>'+(o.items||[]).map(function(it){return esc2(it.name)+' x'+it.q}).join(', ')+
  '<br><b style="color:#00A650">'+money2(o.total)+' · '+o.status.toUpperCase()+'</b>'+
  (o.status==='pending'?'<div style="margin-top:8px"><button class="nxpf-btn" style="padding:9px" onclick="nxShip(\''+o.id+'\')">🚚 Mark shipped</button></div>':'')+
  (o.status==='shipped'?'<div style="margin-top:8px"><button class="nxpf-btn" style="padding:9px" onclick="nxDeliver(\''+o.id+'\')">🟢 Mark delivered (COD collected)</button></div>':'')+
  '</div>';}).join(''):'<p style="font-size:12px;opacity:.7">No orders yet. Share your shop link — orders arrive here in real time.</p>');
 (document.querySelector('main')||document.body).appendChild(div);});}
window.nxShip=function(id){SB.from('orders').update({status:'shipped'}).eq('id',id).then(function(){toast('🚚 Marked shipped','ok');location.reload();})};
window.nxDeliver=function(id){SB.from('orders').update({status:'delivered'}).eq('id',id).then(function(){toast('🟢 Delivered — buyer can now review','ok');location.reload();})};
setTimeout(boot2,2000);})();
/* v2.1: nxPay a prueba de fallos + auto-apertura desde ?plan= */
(function(){
var _np=window.nxPay;
window.nxPay=function(a,b,c){if(!document.getElementById('nxPayOv'))document.body.insertAdjacentHTML('beforeend','<div id="nxPayOv" style="position:fixed;inset:0;z-index:999;background:#070b21;overflow-y:auto;padding:16px" hidden></div>');_np(a,b,c);};
function autoPlan(){var m=new URLSearchParams(location.search).get('plan');if(!m||!window.SB||!window.NXUID)return;
 SB.from('stores').select('id').eq('owner_id',window.NXUID).limit(1).then(function(r){var s=r.data&&r.data[0];
  if(!s){toast('Create your shop first, then subscribe','info');return;}
  window.nxPay(s.id,m,m==='max'?5000:2500);});}
setTimeout(autoPlan,2500);setTimeout(autoPlan,5000);
})();
/* v2.2: feedback si el payment desk no puede abrirse (sin red) */
(function(){
 window._payOpened=false;
 var _np2=window.nxPay; window.nxPay=function(a,b,c){window._payOpened=true;_np2(a,b,c);};
 window.addEventListener('offline',function(){toast('📡 No connection — orders and payments need internet','err');});
 setTimeout(function(){var m=new URLSearchParams(location.search).get('plan');
  if(m&&!window._payOpened){toast('⚠️ Could not open the payment desk — check your internet and tap See plans again','err');}},9000);
})();
/* v2.2: feedback si el payment desk no puede abrirse (sin red) */
(function(){
 window._payOpened=false;
 var _np2=window.nxPay; window.nxPay=function(a,b,c){window._payOpened=true;_np2(a,b,c);};
 window.addEventListener('offline',function(){toast('📡 No connection — orders and payments need internet','err');});
 setTimeout(function(){var m=new URLSearchParams(location.search).get('plan');
  if(m&&!window._payOpened){toast('⚠️ Could not open the payment desk — check your internet and tap See plans again','err');}},9000);
})();
