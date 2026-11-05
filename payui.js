/* ===== NEXUSSHOP PAY™ — premium payment UI ===== */
(function(){
document.head.insertAdjacentHTML('beforeend','<style>'+
'.nxp-glass{border:1px solid rgba(255,255,255,.09);background:linear-gradient(160deg,rgba(255,255,255,.06),rgba(255,255,255,.02));border-radius:24px;backdrop-filter:blur(18px);box-shadow:0 30px 90px rgba(0,0,0,.55)}'+
'.nxp-bank{position:relative;overflow:hidden;border-radius:18px;padding:16px;background:linear-gradient(135deg,#06283d 0%,#0b4f6c 55%,#06283d 100%);border:1px solid rgba(103,232,249,.35);box-shadow:0 12px 40px rgba(6,40,61,.6)}'+
'.nxp-bank:after{content:"";position:absolute;inset:-40%;background:conic-gradient(from 0deg,transparent 0 70%,rgba(103,232,249,.22) 78%,transparent 86%);animation:nxrot 6s linear infinite}'+
'@keyframes nxrot{to{transform:rotate(360deg)}}'+
'.nxp-mono{font-family:ui-monospace,Menlo,monospace;letter-spacing:2px}'+
'.nxp-chip{width:34px;height:26px;border-radius:6px;background:linear-gradient(135deg,#fcd34d,#b45309);box-shadow:inset 0 0 6px rgba(0,0,0,.5)}'+
'.nxp-orb{width:76px;height:76px;margin:0 auto;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;background:radial-gradient(circle at 35% 30%,rgba(251,191,36,.35),rgba(251,191,36,.08));border:1px solid rgba(251,191,36,.5);box-shadow:0 0 40px rgba(251,191,36,.35);animation:nxpulse 1.6s ease-in-out infinite}'+
'@keyframes nxpulse{50%{transform:scale(1.06);box-shadow:0 0 60px rgba(251,191,36,.5)}}'+
'.nxp-step{display:flex;gap:10px;align-items:flex-start;font-size:12px;line-height:1.6;color:#94a3b8;margin-bottom:8px}'+
'.nxp-dot{min-width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.04)}'+
'.nxp-dot.on{border-color:#34d399;color:#052e16;background:#34d399;box-shadow:0 0 14px rgba(52,211,153,.6)}'+
'.nxp-dot.now{border-color:#fbbf24;color:#451a03;background:#fbbf24;box-shadow:0 0 14px rgba(251,191,36,.6)}'+
'.nxp-copy{border:1px solid rgba(103,232,249,.4);color:#a5f3fc;background:rgba(34,211,238,.1);border-radius:8px;padding:3px 9px;font-size:10.5px;font-weight:800;cursor:pointer;margin-left:8px}'+
'</style>');
function grp(s){return String(s||'').replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim();}
function client(cb){if(window.SB)return cb();import('https://esm.sh/@supabase/supabase-js@2.45.4').then(function(m){if(!window.SB)window.SB=m.createClient('https://iafofzwxkzwliisvstfy.supabase.co','sb_publishable_uXpbSgDe4OXVWibgQ187RA_INLaX0SY');cb();});}
function desk(){var o=document.getElementById('nxDeskOv');if(!o){document.body.insertAdjacentHTML('beforeend','<div id="nxDeskOv" style="position:fixed;inset:0;z-index:999;background:radial-gradient(1000px 500px at 80% -10%,rgba(34,211,238,.12),transparent),radial-gradient(800px 400px at 10% 110%,rgba(244,114,182,.1),transparent),#04060f;overflow-y:auto;padding:16px" hidden></div>');o=document.getElementById('nxDeskOv');}return o;}
function steps(now){var S=['Transfer the amount in YOUR bank app','Declare the Transaction ID here','Talal confirms in the MCB statement (≤24h)','Official PAID receipt + features unlock'];return S.map(function(s,i){var c=i<now?'on':(i===now?'now':'');return '<div class="nxp-step"><span class="nxp-dot '+c+'">'+(i<now?'✓':i+1)+'</span><span'+(i===now?' style="color:#e2e8f0;font-weight:700"':'')+'>'+s+'</span></div>';}).join('');}
window.nxPayDesk=function(plan,price){var o=desk();o.hidden=false;
 o.innerHTML='<div class="nxp-glass" style="max-width:560px;margin:0 auto;padding:18px"><button class="btn ghost" style="width:auto;padding:8px 14px;margin:0 0 8px" onclick="document.getElementById(\'nxDeskOv\').hidden=true">← Back</button>'+
 '<div style="font-size:10px;font-weight:800;letter-spacing:3px;color:#67e8f9">NEXUSSHOP PAY™ · SECURE TRANSFER DESK</div>'+
 '<h2 style="font-size:20px;font-weight:900;margin:4px 0 2px">Subscribe to '+plan.toUpperCase()+'</h2>'+
 '<div style="font-size:27px;font-weight:900;color:#34d399;margin:6px 0 12px">Rs. '+price.toLocaleString()+'<span style="font-size:12px;color:#94a3b8;font-weight:600"> /month · PKR</span></div>'+
 steps(0)+
 '<div class="nxp-bank" style="margin:12px 0"><div style="position:relative;z-index:2"><div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:13px;color:#e0f2fe">🏦 MCB Bank · Pakistan</b><span class="nxp-chip"></span></div><div class="nxp-mono" style="font-size:17px;color:#f0fdff;margin:12px 0 4px" id="nxpAc">•••• •••• •••• ••••</div><div style="display:flex;justify-content:space-between;font-size:10.5px;color:#a5f3fc"><span id="nxpTitle">LOADING…</span><span>PKR ACCOUNT</span></div><div class="nxp-mono" style="font-size:9.5px;color:#67e8f9;margin-top:6px;word-break:break-all" id="nxpIban"></div></div></div>'+
 '<div class="lbl" style="color:#94a3b8">Your seller email OR shop name</div><input class="f" id="dkRef" placeholder="e.g. Food & drinks Lahore">'+
 '<div class="lbl" style="color:#94a3b8">Method</div><select class="f" id="dkM"><option>Bank transfer</option></select>'+
 '<div class="lbl" style="color:#94a3b8">Transaction ID / slip number</div><input class="f" id="dkT" placeholder="e.g. 1234567890">'+
 '<button class="btn wa" style="margin-top:12px;font-size:15px" onclick="nxPaySendDesk(\''+plan+'\','+price+')">✅ I executed the transfer — declare payment</button>'+
 '<div style="display:flex;gap:12px;justify-content:center;margin-top:10px;font-size:10.5px;color:#64748b">🔒 RLS-protected · 🧾 official receipt · ⏱ ≤24h confirmation</div></div>';
 client(function(){if(!window.SB)return;SB.from('pay_config').select('*').limit(1).then(function(r){var c=(r.data&&r.data[0])||{};
  var acm=(c.bank_iban||'').match(/AC:\s*([0-9]+)/);var ac=acm?acm[1]:'';
  document.getElementById('nxpAc').innerHTML=(ac?grp(ac):'—')+'<span class="nxp-copy" onclick="nxCopy(\''+ac+'\')">copy</span>';
  document.getElementById('nxpTitle').innerHTML=(c.bank_title||'—')+'<span class="nxp-copy" onclick="nxCopy(\''+(c.bank_title||'')+'\')">copy</span>';
  document.getElementById('nxpIban').textContent=c.bank_iban||'';
  var m=document.getElementById('dkM');if(c.jazzcash)m.insertAdjacentHTML('beforeend','<option>JazzCash</option>');if(c.easypaisa)m.insertAdjacentHTML('beforeend','<option>Easypaisa</option>');});});};
window.nxPaySendDesk=function(plan,price){
 var ref=(document.getElementById('dkRef').value||'').trim();
 var tid=(document.getElementById('dkT').value||'').trim();
 var m=document.getElementById('dkM').value;
 if(!ref){toast('Add your seller email or shop name','err');return;}
 if(tid.length<6){toast('Enter the transaction ID from your bank slip','err');return;}
 client(function(){if(!window.SB){toast('Offline — try again','err');return;}
  var pc='NX-P-'+new Date().getFullYear()+'-'+Math.floor(1000+Math.random()*9000);
  SB.from('payments').insert({plan:plan,amount_pkr:price,method:m,txn_ref:tid,ref_text:ref,owner_id:window.NXUID||null,shop_id:window.NXSHOPID||null,status:'pending',verified:false,receipt_code:pc}).then(function(r){
   if(r.error){toast(r.error.message,'err');return;}
   window._nxInv='NEXUSSHOP PAY PROFORMA '+pc+' | '+plan.toUpperCase()+' Rs. '+price+' PKR | TID '+tid+' | ref '+ref+' | awaiting bank confirmation';
   var o=desk();o.hidden=false;
   o.innerHTML='<div class="nxp-glass" style="max-width:560px;margin:0 auto;padding:18px;text-align:center">'+
   '<div class="nxp-orb">⏳</div>'+
   '<h2 style="font-size:19px;font-weight:900;margin:12px 0 4px">Payment declared — not paid yet</h2>'+
   '<div style="font-size:12px;color:#94a3b8;margin-bottom:12px">Proforma <b class="nxp-mono" style="color:#fbbf24">'+pc+'</b></div>'+
   '<div style="text-align:left;margin:0 0 12px">'+steps(2)+'</div>'+
   '<div style="border:1px dashed rgba(251,191,36,.45);border-radius:14px;padding:12px;font-size:12.5px;line-height:1.9;text-align:left;background:rgba(251,191,36,.05)">Plan: <b>'+plan.toUpperCase()+' — 1 month</b><br>Amount: <b style="color:#34d399">Rs. '+price.toLocaleString()+' PKR</b><br>TID: <b>'+tid+'</b> · Ref: <b>'+ref+'</b><br>Status: <b style="color:#fbbf24">AWAITING BANK CONFIRMATION</b></div>'+
   '<p style="font-size:11px;color:#64748b;line-height:1.6;margin:10px 0">All Pro/Max features stay <b>locked</b> until the transfer appears in the MCB statement. Only then the official PAID receipt (NX-…) is issued and your plan unlocks. No simulations.</p>'+
   '<button class="btn ghost" onclick="navigator.clipboard&&navigator.clipboard.writeText(window._nxInv);toast(\'📋 Copied\',\'info\')">📋 Copy declaration</button>'+
   '<button class="btn ghost" onclick="document.getElementById(\'nxDeskOv\').hidden=true">Done</button></div>';
   toast('⏳ Declared — awaiting bank confirmation','info');});});};
window.nxPlanGate=function(){if(document.getElementById('nxgWrap'))return;
 document.body.insertAdjacentHTML('beforeend','<div id="nxgWrap" style="position:fixed;inset:0;z-index:998;overflow-y:auto;padding:16px;background:radial-gradient(1000px 500px at 80% -10%,rgba(34,211,238,.14),transparent),radial-gradient(800px 400px at 10% 110%,rgba(244,114,182,.12),transparent),#04060f"></div>');
 var P=[{n:'Free',p:0,f:['Up to 5 products live','WhatsApp COD checkout','Committee Buy groups','Public shop profile'],cta:'🛍️ Start free — browse & sell',g:0},
 {n:'Pro',p:2500,f:['Up to 50 products live','Priority placement on home','Sales stats dashboard','Pro shop badge','Official payment receipts'],cta:'💳 Pay & unlock Pro',g:1},
 {n:'Max',p:5000,f:['Up to 500 products live','Top-of-category placement','Everything in Pro','Dedicated WhatsApp support','Early access to new features'],cta:'💳 Pay & unlock Max',g:0}];
 document.getElementById('nxgWrap').innerHTML='<div style="max-width:560px;margin:0 auto;padding:6px 0">'+
 '<div style="text-align:center;margin:10px 0 16px"><div style="font-size:10px;font-weight:800;letter-spacing:3px;color:#67e8f9">NEXUSSHOP PAY™</div><div style="font-size:27px;font-weight:900;margin-top:4px;background:linear-gradient(90deg,#f472b6,#a78bfa,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent">Choose your plan</div><div style="font-size:12px;color:#94a3b8;margin-top:6px;line-height:1.6">Buyers browse free forever. Paid features unlock only after the bank confirms your transfer.</div></div>'+
 P.map(function(x,i){return '<div class="nxp-glass'+(x.g?' nxg-pro':'')+'" style="padding:16px;margin-bottom:12px;'+(i===0?'border-color:rgba(52,211,153,.45)':'')+'">'+
 '<div style="display:flex;justify-content:space-between;align-items:baseline"><b style="font-size:16px">'+x.n+(x.g?' <span style="font-size:9px;font-weight:800;color:#05070f;background:linear-gradient(90deg,#22d3ee,#a78bfa);padding:3px 8px;border-radius:99px">MOST POPULAR</span>':'')+'</b><span style="font-size:19px;font-weight:900;color:'+(i===0?'#34d399':'#e2e8f0')+'">Rs. '+x.p.toLocaleString()+'<span style="font-size:11px;color:#64748b;font-weight:600">/mo</span></span></div>'+
 '<ul style="margin:10px 0 12px 16px;font-size:12px;line-height:1.9;color:#cbd5e1">'+x.f.map(function(f){return '<li>'+(i===0?'✓':'🔒')+' '+f+'</li>'}).join('')+'</ul>'+
 '<button class="btn'+(x.g?' nxg-glow':'')+'" style="font-size:14px;'+(i===0?'background:linear-gradient(90deg,#059669,#34d399)':'')+'" onclick="'+(i===0?'nxGateFree()':'nxGatePay(\''+x.n.toLowerCase()+'\','+x.p+')')+'">'+x.cta+' →</button></div>';}).join('')+
 '<div style="text-align:center;font-size:10.5px;color:#64748b;line-height:1.7;padding:4px 8px 20px">Payments land in the official NexusShop Pakistan account (MCB · Talal Rehan). Confirmed by the account holder ≤24h. Official receipt issued on confirmation only.</div></div>';};
})();
