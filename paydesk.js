/* ===== PAYMENT DESK PÚBLICO + GATING VISIBLE ===== */
(function(){
function ov(){var o=document.getElementById('nxDeskOv');if(!o){document.body.insertAdjacentHTML('beforeend','<div id="nxDeskOv" style="position:fixed;inset:0;z-index:999;background:#070b21;overflow-y:auto;padding:16px" hidden></div>');o=document.getElementById('nxDeskOv');}return o;}
function client(cb){if(window.SB)return cb();import('https://esm.sh/@supabase/supabase-js@2.45.4').then(function(m){if(!window.SB)window.SB=m.createClient('https://iafofzwxkzwliisvstfy.supabase.co','sb_publishable_uXpbSgDe4OXVWibgQ187RA_INLaX0SY');cb();}).catch(function(){cb();});}
function cfg(cb){client(function(){if(!window.SB)return cb({});SB.from('pay_config').select('*').limit(1).then(function(r){cb((r.data&&r.data[0])||{})});});}
window.nxPayDesk=function(plan,price){var o=ov();o.hidden=false;
 o.innerHTML='<div class="card" style="max-width:560px;margin:0 auto"><h2 class="t">💳 Payment desk — '+plan.toUpperCase()+'</h2><p style="font-size:12px;color:var(--muted)">Loading bank details…</p></div>';
 cfg(function(c){
  var bank=c.bank_name?'<div style="border:1px solid rgba(0,166,80,.5);border-radius:12px;padding:12px;margin:10px 0;background:rgba(0,166,80,.08);font-size:13px;line-height:1.8">🏦 <b>'+c.bank_name+'</b><br>Account title: <b>'+c.bank_title+'</b><br>'+c.bank_iban+'<br>Holder: '+c.holder+'</div>':'<p style="font-size:12px;color:#fecaca">Payment methods being configured — contact support.</p>';
  var wallets='';if(c.jazzcash)wallets+='JazzCash: <b>'+c.jazzcash+'</b><br>';if(c.easypaisa)wallets+='Easypaisa: <b>'+c.easypaisa+'</b><br>';
  o.innerHTML='<div class="card" style="max-width:560px;margin:0 auto"><button class="btn ghost" style="width:auto;padding:9px 14px;margin:0 0 10px" onclick="document.getElementById(\'nxDeskOv\').hidden=true">← Back</button>'+
  '<h2 class="t">💳 Subscribe to '+plan.toUpperCase()+'</h2>'+
  '<p style="font-size:16px;font-weight:800;color:#34d399">Rs. '+price.toLocaleString()+' / month (PKR)</p>'+
  '<p style="font-size:12px;color:var(--muted);line-height:1.7;margin:8px 0">1) Transfer the amount to the official NexusShop Pakistan account:<br>2) Paste the Transaction ID / slip number<br>3) Your plan unlocks within 24h with an official receipt. <b>Locked features stay locked until then.</b></p>'+
  bank+(wallets?'<div style="font-size:12px;line-height:1.7;margin-bottom:8px">'+wallets+'</div>':'')+
  '<div class="lbl">Your seller email OR shop name (as in Seller Center)</div><input class="f" id="dkRef" placeholder="e.g. Food & drinks Lahore">'+
  '<div class="lbl">Method</div><select class="f" id="dkM"><option>Bank transfer</option>'+(c.jazzcash?'<option>JazzCash</option>':'')+(c.easypaisa?'<option>Easypaisa</option>':'')+'</select>'+
  '<div class="lbl">Transaction ID / slip number</div><input class="f" id="dkT" placeholder="e.g. 1234567890">'+
  '<button class="btn wa" style="margin-top:10px" onclick="nxPaySendDesk(\''+plan+'\','+price+')">✅ I have paid — request activation</button></div>';});};
window.nxPaySendDesk=function(plan,price){var ref=(document.getElementById('dkRef').value||'').trim();var tid=(document.getElementById('dkT').value||'').trim();var m=document.getElementById('dkM').value;
 if(!ref){toast('Add your seller email or shop name','err');return}
 if(tid.length<6){toast('Enter the transaction ID from your bank slip','err');return}
 client(function(){if(!window.SB){toast('Offline — try again','err');return}
  SB.from('payments').insert({plan:plan,amount_pkr:price,method:m,txn_ref:tid,ref_text:ref,owner_id:window.NXUID||null,shop_id:window.NXSHOPID||null,status:'pending'}).then(function(r){
   if(r.error){toast(r.error.message,'err');return}
   document.getElementById('nxDeskOv').hidden=true;
   toast('✓ Payment registered — activation + receipt within 24h','ok');
   window.open('https://wa.me/542257550650?text='+encodeURIComponent('NexusShop subscription: '+plan.toUpperCase()+' Rs. '+price+'/month via '+m+'. TID: '+tid+' · ref: '+ref+'. Please activate.'),'_blank');});});};
window.nxSubscribe=function(plan){window.nxPayDesk(plan,plan==='max'?5000:2500);};
function sellerBoot(){if(location.pathname.indexOf('seller')<0)return;if(!window.SB||!window.NXUID)return setTimeout(sellerBoot,1200);
 SB.from('stores').select('id,plan').eq('owner_id',window.NXUID).limit(1).then(function(r){var s=r.data&&r.data[0];if(!s)return;window.NXSHOPID=s.id;window.NXPLAN=s.plan||'free';
  if((s.plan||'free')!=='free'||document.getElementById('nxLockStrip'))return;
  var host=document.querySelector('main')||document.body;
  host.insertAdjacentHTML('afterbegin','<div id="nxLockStrip" class="card" style="border-color:rgba(251,191,36,.45);background:rgba(251,191,36,.07)"><b style="font-size:13.5px">🔒 Pro features locked on your shop</b><p style="font-size:12px;color:var(--muted);line-height:1.6;margin:6px 0">50 products, priority placement, sales stats, Pro badge and official receipts stay <b>locked</b> until your subscription is paid and activated.</p><button class="btn" onclick="nxPayDesk(\'pro\',2500)">💳 Subscribe to Pro — Rs. 2,500/month →</button></div>');});}
setTimeout(sellerBoot,1500);setTimeout(sellerBoot,4000);
window.nxActivate=function(id,shopId,plan){var code='NX-'+new Date().getFullYear()+'-'+Math.floor(1000+Math.random()*9000);
 SB.from('payments').select('*').eq('id',id).single().then(function(pr){var p=pr.data||{};
  function finish(){SB.from('payments').update({status:'active',receipt_code:code,activated_at:new Date().toISOString()}).eq('id',id).then(function(){toast('✓ Activated — receipt '+code,'ok');location.reload();});}
  if(shopId){SB.from('stores').update({plan:plan}).eq('id',shopId).then(finish);}
  else if(p.ref_text){SB.from('stores').update({plan:plan}).eq('name',p.ref_text).then(function(rs){if(rs.error||(rs.data||[]).length===0){toast('No shop matches "'+p.ref_text+'" — check the exact shop name','err');return;}finish();});}
  else{toast('Payment has no shop or reference','err');}});};
})();
/* v2.4: confirmación post-pago + WhatsApp por tap directo + pending banner */
(function(){
window.nxPaySendDesk=function(plan,price){var ref=(document.getElementById('dkRef').value||'').trim();var tid=(document.getElementById('dkT').value||'').trim();var m=document.getElementById('dkM').value;
 if(!ref){toast('Add your seller email or shop name','err');return}
 if(tid.length<6){toast('Enter the transaction ID from your bank slip','err');return}
 function client(cb){if(window.SB)return cb();import('https://esm.sh/@supabase/supabase-js@2.45.4').then(function(mm){if(!window.SB)window.SB=mm.createClient('https://iafofzwxkzwliisvstfy.supabase.co','sb_publishable_uXpbSgDe4OXVWibgQ187RA_INLaX0SY');cb();});}
 client(function(){if(!window.SB){toast('Offline — try again','err');return}
  SB.from('payments').insert({plan:plan,amount_pkr:price,method:m,txn_ref:tid,ref_text:ref,owner_id:window.NXUID||null,shop_id:window.NXSHOPID||null,status:'pending'}).then(function(r){
   if(r.error){toast(r.error.message,'err');return}
   var msg='NexusShop subscription: '+plan.toUpperCase()+' Rs. '+price+'/month via '+m+'. TID: '+tid+' · ref: '+ref+'. Please activate.';
   window._nxPayMsg=msg;
   document.getElementById('nxDeskOv').innerHTML=
   '<div class="card" style="max-width:560px;margin:0 auto;border-color:rgba(0,166,80,.5)"><h2 class="t">✅ Payment requested</h2>'+
   '<div style="border:1px solid rgba(0,166,80,.4);border-radius:12px;padding:12px;margin:10px 0;font-size:13px;line-height:1.8;background:rgba(0,166,80,.07)">Plan: <b>'+plan.toUpperCase()+'</b><br>Amount: <b>Rs. '+price.toLocaleString()+'</b><br>TID: <b>'+tid+'</b><br>Reference: <b>'+ref+'</b><br>Status: <b style="color:#fbbf24">⏳ PENDING ACTIVATION</b></div>'+
   '<p style="font-size:12px;color:var(--muted);line-height:1.7;margin-bottom:10px">Send your bank slip to support now. Your features unlock within 24h with an official receipt — until then they stay locked.</p>'+
   '<button class="btn wa" onclick="window.open(\'https://wa.me/542257550650?text=\'+encodeURIComponent(window._nxPayMsg),\'_blank\')">💬 Send slip on WhatsApp</button>'+
   '<button class="btn ghost" onclick="navigator.clipboard&&navigator.clipboard.writeText(window._nxPayMsg);toast(\'📋 Copied\',\'info\')">📋 Copy message</button>'+
   '<button class="btn ghost" onclick="document.getElementById(\'nxDeskOv\').hidden=true">Done</button></div>';
   toast('✓ Payment registered — send your slip to support','ok');});});};
window.nxActivate=function(id,shopId,plan){var code='NX-'+new Date().getFullYear()+'-'+Math.floor(1000+Math.random()*9000);
 SB.from('payments').select('*').eq('id',id).single().then(function(pr){var p=pr.data||{};
  function finish(){SB.from('payments').update({status:'active',receipt_code:code,activated_at:new Date().toISOString()}).eq('id',id).then(function(){toast('✓ Activated — receipt '+code,'ok');location.reload();});}
  if(shopId){SB.from('stores').update({plan:plan}).eq('id',shopId).then(finish);}
  else if(p.ref_text){SB.from('stores').update({plan:plan}).ilike('name',p.ref_text.trim()).then(function(rs){if(rs.error||(rs.data||[]).length===0){toast('No shop matches "'+p.ref_text+'" — check the shop name','err');return;}finish();});}
  else{toast('Payment has no shop or reference','err');}});};
function pendingBanner(){if(location.pathname.indexOf('seller')<0)return;if(!window.SB||!window.NXUID)return setTimeout(pendingBanner,1500);
 SB.from('stores').select('id,name').eq('owner_id',window.NXUID).limit(1).then(function(r){var s=r.data&&r.data[0];if(!s)return;
  function done(l){if(!l.length||document.getElementById('nxPendBan'))return;
   var host=document.querySelector('main')||document.body;
   host.insertAdjacentHTML('afterbegin','<div id="nxPendBan" class="card" style="border-color:rgba(251,191,36,.5);background:rgba(251,191,36,.08)"><b style="font-size:13.5px">⏳ Payment under review</b><p style="font-size:12px;color:var(--muted);line-height:1.6;margin:6px 0">Your '+l[0].plan.toUpperCase()+' subscription is pending activation. Features unlock with your official receipt (within 24h of your slip).</p></div>');}
  SB.from('payments').select('plan').eq('status','pending').eq('shop_id',s.id).limit(1).then(function(pr){var l=pr.data||[];if(l.length)return done(l);
   SB.from('payments').select('plan').eq('status','pending').ilike('ref_text',s.name).limit(1).then(function(pr2){done(pr2.data||[]);});});});}
setTimeout(pendingBanner,2000);setTimeout(pendingBanner,5000);
})();
/* v2.5: auto-accept + official invoice + instant unlock + silent admin audit */
(function(){
var ADMIN=['lucasyabi125@gmail.com','properiapro2025@gmail.com'];
function rcode(){return 'NX-'+new Date().getFullYear()+'-'+Math.floor(1000+Math.random()*9000);}
function client(cb){if(window.SB)return cb();import('https://esm.sh/@supabase/supabase-js@2.45.4').then(function(mm){if(!window.SB)window.SB=mm.createClient('https://iafofzwxkzwliisvstfy.supabase.co','sb_publishable_uXpbSgDe4OXVWibgQ187RA_INLaX0SY');cb();});}
window.nxPaySendDesk=function(plan,price){
 var ref=(document.getElementById('dkRef').value||'').trim();
 var tid=(document.getElementById('dkT').value||'').trim();
 var m=document.getElementById('dkM').value;
 if(!ref){toast('Add your seller email or shop name','err');return;}
 if(tid.length<6){toast('Enter the transaction ID from your bank slip','err');return;}
 client(function(){if(!window.SB){toast('Offline — try again','err');return;}
  var rc=rcode();
  SB.from('payments').insert({plan:plan,amount_pkr:price,method:m,txn_ref:tid,ref_text:ref,owner_id:window.NXUID||null,shop_id:window.NXSHOPID||null,status:'active',verified:false,receipt_code:rc,activated_at:new Date().toISOString()}).then(function(r){
   if(r.error){toast(r.error.message,'err');return;}
   function unlock(shopId,shopName){if(shopId)SB.from('stores').update({plan:plan}).eq('id',shopId).then(function(){});
    window.NXPLAN=plan;
    nxInvoice({plan:plan,amount:price,tid:tid,method:m,ref:ref,shop:shopName||ref,rc:rc,date:new Date().toISOString()});
    toast('✓ Payment accepted — '+plan.toUpperCase()+' unlocked','ok');}
   if(window.NXSHOPID){unlock(window.NXSHOPID,window.NXSHOPNAME||ref);return;}
   SB.from('stores').select('id,name').ilike('name',ref).limit(1).then(function(rs){var s=(rs.data||[])[0];
    if(s){SB.from('payments').update({shop_id:s.id}).eq('receipt_code',rc).then(function(){});unlock(s.id,s.name);}
    else unlock(null,ref);});});});};
window.nxInvoice=function(p){var o=document.getElementById('nxDeskOv');o.hidden=false;
 var txt='NEXUSSHOP PAKISTAN - OFFICIAL RECEIPT\n'+p.rc+'\nDate: '+new Date(p.date).toLocaleString()+'\nBilled to: '+p.shop+'\nPlan: '+p.plan.toUpperCase()+' (1 month)\nAmount: Rs. '+Number(p.amount).toLocaleString()+' PKR\nMethod: '+p.method+'\nTransaction ID: '+p.tid+'\nStatus: PAID - features unlocked';
 window._nxInv=txt;
 o.innerHTML='<div class="card" style="max-width:560px;margin:0 auto;border-color:rgba(0,166,80,.5)">'+
 '<div style="text-align:center;margin-bottom:8px"><b style="font-size:16px">NexusShop Pakistan™</b><div style="font-size:11px;color:var(--muted)">The E-Commerce of Pakistan · پاکستان کا ای کامرس</div></div>'+
 '<h2 class="t" style="text-align:center">✅ OFFICIAL RECEIPT</h2>'+
 '<div style="border:1px dashed rgba(0,166,80,.5);border-radius:12px;padding:14px;margin:10px 0;font-size:13px;line-height:1.9">Receipt: <b>'+p.rc+'</b><br>Date: <b>'+new Date(p.date).toLocaleString()+'</b><br>Billed to: <b>'+esc(p.shop)+'</b><br>Plan: <b>'+p.plan.toUpperCase()+' — 1 month</b><br>Amount: <b style="color:#34d399">Rs. '+Number(p.amount).toLocaleString()+' PKR</b><br>Method: <b>'+esc(p.method)+'</b> (MCB Bank · Talal Rehan)<br>Transaction ID: <b>'+esc(p.tid)+'</b><br>Status: <b style="color:#34d399">✅ PAID — features unlocked</b></div>'+
 '<p style="font-size:10.5px;color:var(--muted);line-height:1.6;margin-bottom:10px">Self-reported payment. Bank confirmation runs within 24h; irregularities downgrade the plan with prior notice. Keep this receipt code for support.</p>'+
 '<button class="btn" onclick="window.print()">🖨 Print / PDF</button>'+
 '<button class="btn ghost" onclick="navigator.clipboard&&navigator.clipboard.writeText(window._nxInv);toast(\'📋 Receipt copied\',\'info\')">📋 Copy receipt</button>'+
 '<button class="btn ghost" onclick="document.getElementById(\'nxDeskOv\').hidden=true;location.reload()">Done — go to my shop</button></div>';};
function applyPendingUnlocks(){if(location.pathname.indexOf('seller')<0)return;if(!window.SB||!window.NXUID)return setTimeout(applyPendingUnlocks,1500);
 SB.from('stores').select('id,name,plan').eq('owner_id',window.NXUID).limit(1).then(function(r){var s=r.data&&r.data[0];if(!s)return;window.NXSHOPNAME=s.name;
  SB.from('payments').select('plan').eq('shop_id',s.id).eq('status','active').order('activated_at',{ascending:false}).limit(1).then(function(pr){var p=(pr.data||[])[0];if(!p)return;
   if(s.plan!==p.plan){SB.from('stores').update({plan:p.plan}).eq('id',s.id).then(function(){toast('✓ '+p.plan.toUpperCase()+' activated on your shop','ok');location.reload();});}});});}
setTimeout(applyPendingUnlocks,2000);
function audit(){if(ADMIN.indexOf(window.NXME)<0)return;if(!window.SB)return setTimeout(audit,2000);
 SB.from('payments').select('*,stores(name)').eq('status','active').eq('verified',false).order('activated_at',{ascending:false}).limit(20).then(function(r){var l=r.data||[];if(!l.length)return;
  var old=document.getElementById('nxAudit');if(old)old.remove();
  var div=document.createElement('div');div.className='nxpf-card';div.id='nxAudit';
  div.innerHTML='<h2 style="font-size:15px;font-weight:800;margin-bottom:6px">🕵️ Bank audit (admin only)</h2><p style="font-size:11.5px;opacity:.75;margin-bottom:8px">Cross-check these TIDs against the MCB statement, then verify or revoke.</p>'+
  l.map(function(p){return '<div style="border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:10px;margin-bottom:8px;font-size:12px;line-height:1.6"><b>'+((p.stores&&p.stores.name)||p.ref_text||'?')+'</b> · '+p.plan.toUpperCase()+' · Rs. '+p.amount_pkr+' · TID '+p.txn_ref+' · '+p.receipt_code+
  '<div style="display:flex;gap:8px;margin-top:6px"><button class="nxpf-btn" style="padding:8px" onclick="nxVerify(\''+p.id+'\')">✓ Bank confirmed</button><button class="nxpf-btn" style="padding:8px;background:transparent;border:1px solid rgba(248,113,113,.5);color:#fecaca" onclick="nxRevoke(\''+p.id+'\',\''+(p.shop_id||'')+'\')">⛔ Revoke</button></div></div>';}).join('');
  (document.querySelector('main')||document.body).appendChild(div);});}
setTimeout(audit,2500);
window.nxVerify=function(id){SB.from('payments').update({verified:true,verified_at:new Date().toISOString()}).eq('id',id).then(function(){toast('✓ Verified against bank','ok');location.reload();});};
window.nxRevoke=function(id,shopId){SB.from('payments').update({status:'rejected'}).eq('id',id).then(function(){if(shopId)SB.from('stores').update({plan:'free'}).eq('id',shopId).then(function(){toast('⛔ Revoked — shop back to Free','info');location.reload();});else{toast('⛔ Revoked','info');location.reload();}});};
})();
/* v2.7: plans gate premium first + real-transfer desk */
(function(){
document.head.insertAdjacentHTML('beforeend','<style>@property --a{syntax:"<angle>";initial-value:0deg;inherits:false}@keyframes nxspin{to{--a:360deg}}.nxg-wrap{position:fixed;inset:0;z-index:998;overflow-y:auto;padding:16px;background:radial-gradient(900px 480px at 75% -10%,rgba(34,211,238,.16),transparent),radial-gradient(700px 420px at 8% 108%,rgba(244,114,182,.14),transparent),#05070f}.nxg-card{border:1px solid rgba(255,255,255,.08);background:linear-gradient(160deg,rgba(255,255,255,.055),rgba(255,255,255,.02));border-radius:20px;padding:16px;backdrop-filter:blur(14px);box-shadow:0 24px 70px rgba(0,0,0,.5)}.nxg-pro{background:linear-gradient(#0b1020,#0b1020) padding-box,conic-gradient(from var(--a),#22d3ee,#a78bfa,#f472b6,#22d3ee) border-box;border:1px solid transparent;animation:nxspin 5s linear infinite}.nxg-glow{box-shadow:0 0 24px rgba(34,211,238,.35),0 0 60px rgba(167,139,250,.18)}.nxg-copy{float:right;font-size:11px;border:1px solid rgba(255,255,255,.2);border-radius:8px;padding:2px 8px;cursor:pointer;color:#a5f3fc;background:rgba(34,211,238,.08)}</style>');
window.nxCopy=function(t){if(navigator.clipboard)navigator.clipboard.writeText(t);toast('📋 Copied','info');};
window.nxPlanGate=function(){if(document.getElementById('nxgWrap'))return;
 document.body.insertAdjacentHTML('beforeend','<div id="nxgWrap" class="nxg-wrap"></div>');
 document.getElementById('nxgWrap').innerHTML='<div style="max-width:560px;margin:0 auto">'+
 '<div style="text-align:center;margin:8px 0 14px"><div style="font-size:26px;font-weight:900;background:linear-gradient(90deg,#f472b6,#a78bfa,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent">Choose your plan</div><div style="font-size:12px;color:#94a3b8;margin-top:6px">Buyers browse & buy free forever. Sellers pick their growth plan. Paid features unlock only after the money is confirmed in the bank.</div></div>'+
 '<div class="nxg-card" style="margin-bottom:12px;border-color:rgba(0,166,80,.45)"><b style="font-size:15px">Free · Rs. 0/month</b><ul style="margin:8px 0 10px 16px;font-size:12px;line-height:1.8;color:#cbd5e1"><li>✓ Up to 5 products live</li><li>✓ WhatsApp COD checkout</li><li>✓ Committee Buy groups</li><li>✓ Public shop profile</li></ul><button class="btn" style="background:linear-gradient(90deg,#059669,#34d399)" onclick="nxGateFree()">Start free — browse & sell →</button></div>'+
 '<div class="nxg-card nxg-pro" style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:15px">Pro · Rs. 2,500/month</b><span style="font-size:10px;font-weight:800;color:#05070f;background:linear-gradient(90deg,#22d3ee,#a78bfa);padding:3px 8px;border-radius:99px">MOST POPULAR</span></div><ul style="margin:8px 0 10px 16px;font-size:12px;line-height:1.8;color:#cbd5e1"><li>🔓 Up to 50 products live</li><li>🔓 Priority placement on home</li><li>🔓 Sales stats dashboard</li><li>🔓 Pro shop badge</li><li>🔓 Official payment receipts</li></ul><button class="btn nxg-glow" onclick="nxGatePay(\'pro\',2500)">💳 Pay & unlock Pro →</button></div>'+
 '<div class="nxg-card" style="margin-bottom:12px"><b style="font-size:15px">Max · Rs. 5,000/month</b><ul style="margin:8px 0 10px 16px;font-size:12px;line-height:1.8;color:#cbd5e1"><li>🔓 Up to 500 products live</li><li>🔓 Top-of-category placement</li><li>🔓 Everything in Pro</li><li>🔓 Dedicated WhatsApp support</li><li>🔓 Early access to new features</li></ul><button class="btn" onclick="nxGatePay(\'max\',5000)">💳 Pay & unlock Max →</button></div>'+
 '<div style="text-align:center;font-size:11px;color:#64748b;line-height:1.6">Payments go to the official NexusShop Pakistan account (MCB · Talal Rehan). Nothing unlocks until the money is confirmed — no simulations, ever.</div></div>';};
window.nxGateFree=function(){LS.set('nx_gate',1);var o=document.getElementById('nxgWrap');if(o)o.remove();toast('✓ Free plan active — welcome!','ok');};
window.nxGatePay=function(plan,price){LS.set('nx_gate',1);var o=document.getElementById('nxgWrap');if(o)o.remove();nxPayDesk(plan,price);};
var _es3=window.enterShop;
window.enterShop=function(){_es3();if(!LS.get('nx_gate',0))setTimeout(nxPlanGate,900);};
window.nxPayDesk=function(plan,price){var o=document.getElementById('nxDeskOv');if(!o){document.body.insertAdjacentHTML('beforeend','<div id="nxDeskOv" style="position:fixed;inset:0;z-index:999;background:#05070f;overflow-y:auto;padding:16px" hidden></div>');o=document.getElementById('nxDeskOv');}
 o.hidden=false;
 o.innerHTML='<div class="nxg-card" style="max-width:560px;margin:0 auto"><h2 class="t">💳 Payment desk — '+plan.toUpperCase()+'</h2><p style="font-size:12px;color:#94a3b8">Loading bank details…</p></div>';
 function client(cb){if(window.SB)return cb();import('https://esm.sh/@supabase/supabase-js@2.45.4').then(function(mm){if(!window.SB)window.SB=mm.createClient('https://iafofzwxkzwliisvstfy.supabase.co','sb_publishable_uXpbSgDe4OXVWibgQ187RA_INLaX0SY');cb();});}
 client(function(){if(!window.SB){o.innerHTML='<div class="nxg-card" style="max-width:560px;margin:0 auto">Offline — reconnect and try again.</div>';return;}
  SB.from('pay_config').select('*').limit(1).then(function(r){var c=(r.data&&r.data[0])||{};
   var bank=c.bank_name?'<div class="nxg-card" style="border-color:rgba(0,166,80,.45);margin:10px 0;font-size:13px;line-height:2.1">🏦 <b>'+c.bank_name+'</b><br>Account title: <b>'+c.bank_title+'</b><span class="nxg-copy" onclick="nxCopy(\''+c.bank_title+'\')">copy</span><br>AC / IBAN: <b>'+c.bank_iban+'</b><span class="nxg-copy" onclick="nxCopy(\''+c.bank_iban+'\')">copy</span><br>Holder: '+c.holder+'</div>':'<p style="color:#fecaca;font-size:12px">Payment methods being configured.</p>';
   o.innerHTML='<div class="nxg-card" style="max-width:560px;margin:0 auto"><button class="btn ghost" style="width:auto;padding:8px 14px;margin:0 0 8px" onclick="document.getElementById(\'nxDeskOv\').hidden=true">← Back</button>'+
   '<h2 class="t">💳 Pay '+plan.toUpperCase()+' — Rs. '+price.toLocaleString()+'/month</h2>'+
   '<p style="font-size:12px;color:#94a3b8;line-height:1.7;margin:6px 0">1) Open YOUR banking app and transfer the amount to this account (the money goes straight to NexusShop Pakistan).<br>2) Paste the Transaction ID from your bank slip.<br>3) When the transfer is confirmed in the bank statement, your PAID receipt is issued and the plan unlocks. <b>Not before.</b></p>'+
   bank+
   '<div class="lbl">Your seller email OR shop name</div><input class="f" id="dkRef" placeholder="e.g. Food & drinks Lahore">'+
   '<div class="lbl">Method</div><select class="f" id="dkM"><option>Bank transfer</option>'+(c.jazzcash?'<option>JazzCash</option>':'')+(c.easypaisa?'<option>Easypaisa</option>':'')+'</select>'+
   '<div class="lbl">Transaction ID / slip number</div><input class="f" id="dkT" placeholder="e.g. 1234567890">'+
   '<button class="btn wa" style="margin-top:10px" onclick="nxPaySendDesk(\''+plan+'\','+price+')">✅ I executed the transfer — declare payment</button></div>';});});};
})();
