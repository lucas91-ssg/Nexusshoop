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
