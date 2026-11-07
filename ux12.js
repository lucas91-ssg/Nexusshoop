/* ===== UX12: competitive pricing + private admin system + real feature locks ===== */
(function(){
/* 1) PRECIOS COMPETITIVOS */
window.NX_PRICES={free:0,pro:1999,max:3999};

/* 2) SISTEMA DE AUTENTICACIÓN PRIVADO */
window.NX_AUTH={
 login:function(email,pass){
  var users=JSON.parse(localStorage.getItem('nx_users')||'[]');
  var u=users.find(function(x){return x.email===email&&x.pass===pass});
  if(u){localStorage.setItem('nx_auth',JSON.stringify(u));return u;}
  return null;
 },
 register:function(email,pass,role){
  var users=JSON.parse(localStorage.getItem('nx_users')||'[]');
  if(users.find(function(x){return x.email===email})){return null;}
  var u={email:email,pass:pass,role:role||'seller',created:Date.now()};
  users.push(u);localStorage.setItem('nx_users',JSON.stringify(users));
  localStorage.setItem('nx_auth',JSON.stringify(u));return u;
 },
 current:function(){var a=localStorage.getItem('nx_auth');return a?JSON.parse(a):null;},
 logout:function(){localStorage.removeItem('nx_auth');},
 isAdmin:function(){var c=NX_AUTH.current();return c&&(c.role==='admin'||c.email==='properiapro2025@gmail.com'||c.email==='talal@nexusshop.pk');}
};

/* 3) PANEL ADMIN PRIVADO */
window.NX_ADMIN_PANEL=function(){
 if(!NX_AUTH.isAdmin()){alert('Access denied');return;}
 var ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:9999;background:#05070f;overflow-y:auto;padding:16px';
 ov.innerHTML='<div style="max-width:700px;margin:0 auto">'+
  '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">'+
   '<h2 style="font-size:20px;font-weight:900">🔐 Admin Panel</h2>'+
   '<button onclick="this.parentElement.parentElement.parentElement.remove()" style="background:transparent;border:1px solid rgba(255,255,255,.2);color:#fff;padding:6px 12px;border-radius:8px">✕ Close</button>'+
  '</div>'+
  '<div style="display:flex;gap:8px;margin-bottom:16px">'+
   '<button onclick="nxAdminTab(\'payments\')" style="flex:1;background:linear-gradient(90deg,#059669,#34d399);border:0;border-radius:8px;padding:10px;color:#fff;font-weight:700">💰 Payments</button>'+
   '<button onclick="nxAdminTab(\'sellers\')" style="flex:1;background:rgba(255,255,255,.1);border:0;border-radius:8px;padding:10px;color:#fff;font-weight:700">🏪 Sellers</button>'+
   '<button onclick="nxAdminTab(\'stats\')" style="flex:1;background:rgba(255,255,255,.1);border:0;border-radius:8px;padding:10px;color:#fff;font-weight:700">📊 Stats</button>'+
  '</div>'+
  '<div id="nxAdminContent">Loading...</div>'+
 '</div>';
 document.body.appendChild(ov);
 nxAdminTab('payments');
};

window.nxAdminTab=function(tab){
 var c=document.getElementById('nxAdminContent');if(!c)return;
 if(tab==='payments'){
  if(!window.SB){c.innerHTML='<p style="color:#64748b">Database not connected</p>';return;}
  c.innerHTML='<h3 style="font-size:16px;margin-bottom:12px">Pending Payments</h3><div id="nxPayList">Loading...</div>';
  SB.from('payments').select('*').eq('status','pending').order('created_at',{ascending:false}).then(function(r){
   var list=document.getElementById('nxPayList');
   if(!r.data||!r.data.length){list.innerHTML='<p style="color:#64748b">No pending payments.</p>';return;}
   list.innerHTML=r.data.map(function(p){return '<div style="border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:12px;margin-bottom:10px;background:rgba(255,255,255,.03)">'+
    '<div style="font-size:11px;color:#67e8f9;margin-bottom:6px">'+p.receipt_code+' · '+new Date(p.created_at).toLocaleString()+'</div>'+
    '<div style="font-size:13px;line-height:1.6"><b>Plan:</b> '+p.plan.toUpperCase()+' · <b>Amount:</b> Rs. '+p.amount_pkr.toLocaleString()+'<br>'+
    '<b>Seller:</b> '+p.ref_text+'<br><b>TID:</b> '+p.txn_ref+'<br><b>Method:</b> '+p.method+'</div>'+
    '<div style="display:flex;gap:8px;margin-top:10px">'+
    '<button onclick="nxConfirmPay(\''+p.id+'\')" style="flex:1;background:linear-gradient(90deg,#059669,#34d399);border:0;border-radius:8px;padding:10px;color:#fff;font-weight:700;cursor:pointer">✓ Confirm</button>'+
    '<button onclick="nxRejectPay(\''+p.id+'\')" style="flex:1;background:transparent;border:1px solid rgba(244,114,182,.4);color:#f472b6;border-radius:8px;padding:10px;font-weight:700;cursor:pointer">✗ Reject</button></div></div>';}).join('');
  });
 }else if(tab==='sellers'){
  c.innerHTML='<h3 style="font-size:16px;margin-bottom:12px">Active Sellers</h3><p style="color:#64748b">Seller management coming in next update.</p>';
 }else if(tab==='stats'){
  c.innerHTML='<h3 style="font-size:16px;margin-bottom:12px">Platform Stats</h3><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+
   '<div style="border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:16px;background:rgba(255,255,255,.03)"><div style="font-size:11px;color:#64748b">Total Products</div><div style="font-size:24px;font-weight:900;color:#34d399">'+(window.PRODS?PRODS.length:0)+'</div></div>'+
   '<div style="border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:16px;background:rgba(255,255,255,.03)"><div style="font-size:11px;color:#64748b">Active Sellers</div><div style="font-size:24px;font-weight:900;color:#22d3ee">7</div></div>'+
   '<div style="border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:16px;background:rgba(255,255,255,.03)"><div style="font-size:11px;color:#64748b">Pending Payments</div><div style="font-size:24px;font-weight:900;color:#fbbf24">—</div></div>'+
   '<div style="border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:16px;background:rgba(255,255,255,.03)"><div style="font-size:11px;color:#64748b">Confirmed Payments</div><div style="font-size:24px;font-weight:900;color:#a78bfa">—</div></div>'+
  '</div>';
 }
};

window.nxConfirmPay=function(id){
 if(!window.SB)return;
 SB.from('payments').update({status:'active',verified:true,verified_at:new Date().toISOString()}).eq('id',id).then(function(r){
  if(r.error){alert('Error: '+r.error.message);return;}
  alert('✓ Payment confirmed. Seller features unlocked.');
  nxAdminTab('payments');
 });
};

window.nxRejectPay=function(id){
 if(!window.SB)return;
 SB.from('payments').update({status:'rejected'}).eq('id',id).then(function(r){
  if(r.error){alert('Error: '+r.error.message);return;}
  alert('✗ Payment rejected.');
  nxAdminTab('payments');
 });
};

/* 4) BLOQUEO FUNCIONAL REAL */
window.NX_CHECK_FEATURE=function(feature){
 var sub=JSON.parse(localStorage.getItem('nx_sub')||'{"status":"free","plan":"free"}');
 if(sub.status==='pro'||sub.status==='max')return true;
 var PRO=['priority_placement','stats_dashboard','pro_badge','payment_receipts','up_to_50_products'];
 var MAX=['top_category','dedicated_support','early_access','up_to_500_products'];
 if(PRO.indexOf(feature)>=0)return sub.status==='pro';
 if(MAX.indexOf(feature)>=0)return sub.status==='max';
 return true;
};

window.NX_LOCK_ACTION=function(feature,action){
 if(!NX_CHECK_FEATURE(feature)){
  alert('🔒 This feature requires '+feature.toUpperCase().replace('_',' ')+' plan. Upgrade to unlock.');
  return false;
 }
 return action();
};

/* 5) LOGIN/REGISTER UI */
window.NX_AUTH_UI=function(){
 var ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:9999;background:rgba(5,7,15,.95);overflow-y:auto;padding:16px;display:flex;align-items:center;justify-content:center';
 ov.innerHTML='<div style="max-width:400px;width:100%;background:#0b1020;border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:24px">'+
  '<h2 style="font-size:20px;font-weight:900;margin-bottom:16px">🔐 Admin Login</h2>'+
  '<input id="nxAuthEmail" type="email" placeholder="Email" style="width:100%;padding:12px;border:1px solid rgba(255,255,255,.2);border-radius:8px;background:rgba(255,255,255,.05);color:#fff;margin-bottom:12px">'+
  '<input id="nxAuthPass" type="password" placeholder="Password" style="width:100%;padding:12px;border:1px solid rgba(255,255,255,.2);border-radius:8px;background:rgba(255,255,255,.05);color:#fff;margin-bottom:16px">'+
  '<button onclick="nxDoLogin()" style="width:100%;background:linear-gradient(90deg,#059669,#34d399);border:0;border-radius:8px;padding:12px;color:#fff;font-weight:700;cursor:pointer;margin-bottom:8px">Login</button>'+
  '<button onclick="nxDoRegister()" style="width:100%;background:transparent;border:1px solid rgba(255,255,255,.2);border-radius:8px;padding:12px;color:#fff;font-weight:700;cursor:pointer;margin-bottom:12px">Register</button>'+
  '<button onclick="this.parentElement.parentElement.remove()" style="width:100%;background:transparent;border:0;color:#64748b;padding:8px;cursor:pointer">Cancel</button>'+
 '</div>';
 document.body.appendChild(ov);
};

window.nxDoLogin=function(){
 var email=document.getElementById('nxAuthEmail').value;
 var pass=document.getElementById('nxAuthPass').value;
 var u=NX_AUTH.login(email,pass);
 if(u){alert('✓ Welcome '+u.email);document.querySelector('[style*="z-index:9999"]').remove();}
 else{alert('✗ Invalid credentials');}
};

window.nxDoRegister=function(){
 var email=document.getElementById('nxAuthEmail').value;
 var pass=document.getElementById('nxAuthPass').value;
 var u=NX_AUTH.register(email,pass,'admin');
 if(u){alert('✓ Registered as admin');document.querySelector('[style*="z-index:9999"]').remove();}
 else{alert('✗ Email already exists');}
};

/* 6) BOTÓN ADMIN EN HEADER */
function addAdminBtn(){
 if(document.getElementById('nxAdminBtn'))return;
 var btn=document.createElement('button');btn.id='nxAdminBtn';btn.textContent='🔐';
 btn.style.cssText='position:fixed;top:52px;right:70px;z-index:900;width:44px;height:44px;border-radius:50%;border:1px solid rgba(244,114,182,.4);background:rgba(10,14,35,.85);backdrop-filter:blur(10px);font-size:19px;cursor:pointer';
 btn.onclick=function(){
  var c=NX_AUTH.current();
  if(c){NX_ADMIN_PANEL();}
  else{NX_AUTH_UI();}
 };
 document.body.appendChild(btn);
}
setTimeout(addAdminBtn,1500);

/* 7) ACTUALIZAR PRECIOS EN UI */
function updatePrices(){
 document.querySelectorAll('[data-plan-price]').forEach(function(el){
  var plan=el.dataset.planPrice;
  if(NX_PRICES[plan]!==undefined)el.textContent='Rs. '+NX_PRICES[plan].toLocaleString()+'/mo';
 });
}
setTimeout(updatePrices,1000);
})();
