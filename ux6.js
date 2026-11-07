/* ===== UX6: premium polish (overlay splash, notif center, smart alerts, marquee, layout) ===== */
(function(){
function splashFix(){var s=document.getElementById('splash');if(s&&!s.dataset.fx6){s.dataset.fx6='1';s.style.position='fixed';s.style.inset='0';s.style.zIndex='9998';s.style.overflow='auto';s.style.background='#05070f';}}
setTimeout(splashFix,200);setTimeout(splashFix,900);
function notifs(){try{return JSON.parse(localStorage.getItem('nx_notif')||'[]')}catch(e){return[]}}
function saveN(l){localStorage.setItem('nx_notif',JSON.stringify(l.slice(0,20)))}
window.nxNotify=function(icon,title,body){var l=notifs();if(l[0]&&l[0].title===title&&Date.now()-l[0].ts<60000)return;l.unshift({icon:icon,title:title,body:body,ts:Date.now(),read:false});saveN(l);badge();toast(icon+' '+title,'info');
 if(window.Notification&&Notification.permission==='granted'){try{new Notification(title,{body:body})}catch(e){}}};
function badge(){var b=document.getElementById('nxBell');if(!b)return;var n=notifs().filter(function(x){return!x.read}).length;var d=b.querySelector('span');d.textContent=n||'';d.style.display=n?'flex':'none';}
function bell(){if(document.getElementById('nxBell'))return badge();var b=document.createElement('button');b.id='nxBell';b.style.cssText='position:fixed;top:52px;right:12px;z-index:900;width:44px;height:44px;border-radius:50%;border:1px solid var(--border);background:rgba(10,14,35,.85);backdrop-filter:blur(10px);font-size:19px;cursor:pointer';b.innerHTML='🔔<span style="display:none;position:absolute;top:-4px;right:-4px;min-width:18px;height:18px;border-radius:99px;background:#f43f5e;color:#fff;font-size:10px;font-weight:800;align-items:center;justify-content:center"></span>';b.onclick=nxBellOpen;document.body.appendChild(b);badge();}
window.nxBellOpen=function(){var l=notifs();l.forEach(function(x){x.read=true});saveN(l);badge();
 var ov=document.getElementById('nxPayOv');if(!ov){document.body.insertAdjacentHTML('beforeend','<div id="nxPayOv" style="position:fixed;inset:0;z-index:999;background:#070b21;overflow-y:auto;padding:16px" hidden></div>');ov=document.getElementById('nxPayOv');}
 ov.hidden=false;ov.innerHTML='<div class="card" style="max-width:560px;margin:0 auto"><button class="btn ghost" style="width:auto;padding:8px 14px" onclick="document.getElementById(\'nxPayOv\').hidden=true">← Back</button><h2 class="t">🔔 Notifications</h2>'+(l.length?l.map(function(x){return '<div style="border:1px solid var(--border);border-radius:12px;padding:10px;margin-bottom:8px;font-size:12.5px;line-height:1.6;background:rgba(255,255,255,.03)"><b>'+x.icon+' '+x.title+'</b><div style="color:var(--muted)">'+x.body+'</div><div style="font-size:10px;color:var(--muted);margin-top:4px">'+new Date(x.ts).toLocaleString()+'</div></div>'}).join(''):'<div class="empty">No notifications yet. Orders, price drops, committee progress and payment confirmations will appear here.</div>')+'</div>';};
setTimeout(bell,1200);
function askSheet(){if(!('Notification' in window))return;if(localStorage.getItem('nx_notif_asked'))return;var v=Number(localStorage.getItem('nx_visits')||0)+1;localStorage.setItem('nx_visits',v);if(v<2)return;localStorage.setItem('nx_notif_asked','1');
 document.body.insertAdjacentHTML('beforeend','<div id="nxAsk" style="position:fixed;inset:0;z-index:997;background:rgba(4,6,15,.7);backdrop-filter:blur(6px);display:flex;align-items:flex-end"><div style="width:100%;background:#0b1020;border-radius:24px 24px 0 0;padding:22px;text-align:center;border:1px solid rgba(255,255,255,.08)"><div style="font-size:40px">🔔</div><b style="font-size:16px">Activá las notificaciones</b><p style="font-size:12.5px;color:var(--muted);margin:8px 0 16px;line-height:1.6">Te avisamos por tus compras, ventas, envíos, bajadas de precio y cuando tu committee esté por cerrarse.</p><button class="btn" onclick="nxAskYes()">Activar notificaciones</button><button class="btn ghost" onclick="document.getElementById(\'nxAsk\').remove()">Ahora no</button></div></div>');}
window.nxAskYes=function(){Notification.requestPermission().then(function(p){var a=document.getElementById('nxAsk');if(a)a.remove();if(p==='granted')nxNotify('🔔','Notificaciones activas','Te avisaremos de todo lo importante.');});};
setTimeout(askSheet,2500);
function alerts(){if(!window.PRODS)return setTimeout(alerts,2000);
 var vv=(typeof viewed==='function')?viewed():[];var vp=JSON.parse(localStorage.getItem('nx_vp')||'{}');var now={};
 PRODS.forEach(function(p){now[p.id]=p.price;});
 vv.forEach(function(id){var p=PRODS.find(function(q){return q.id===id});if(p&&vp[id]&&p.price<vp[id])nxNotify('📉','Bajó de precio',p.name+': ahora Rs. '+p.price.toLocaleString()+' (antes Rs. '+vp[id].toLocaleString()+')');});
 localStorage.setItem('nx_vp',JSON.stringify(now));
 var c=(typeof cart==='function')?cart():[];
 c.forEach(function(x){var p=PRODS.find(function(q){return q.id===x.i});if(p&&p.stock>0&&p.stock<=2)nxNotify('⚠️','Quedan '+p.stock+' unidades',p.name+' — tu carrito puede quedarse sin stock.');});
 if(window.SB){var tok=localStorage.getItem('nx_token')||localStorage.getItem('nx_tok')||localStorage.getItem('buyer_token');
  if(tok)SB.from('orders').select('id,status').eq('buyer_token',tok).order('created_at',{ascending:false}).limit(5).then(function(r){var seen=JSON.parse(localStorage.getItem('nx_ost')||'{}');(r.data||[]).forEach(function(o){if(seen[o.id]&&seen[o.id]!==o.status)nxNotify('📦','Pedido actualizado','Tu pedido '+o.id.slice(0,6)+' ahora está: '+o.status);seen[o.id]=o.status;});localStorage.setItem('nx_ost',JSON.stringify(seen));});}
 if(window.SB&&window.NXSHOPID)SB.from('payments').select('receipt_code,status,verified').eq('shop_id',window.NXSHOPID).eq('status','active').eq('verified',true).order('verified_at',{ascending:false}).limit(1).then(function(r){var p=(r.data||[])[0];if(p&&localStorage.getItem('nx_lastpaid')!==p.receipt_code){localStorage.setItem('nx_lastpaid',p.receipt_code);nxNotify('✅','Pago confirmado','Recibo oficial '+p.receipt_code+' emitido. Funciones desbloqueadas.');}});}
setTimeout(alerts,3000);setInterval(alerts,90000);
function marquee(){if(typeof VIEW==='undefined'||VIEW!=='home'||document.getElementById('nxMq'))return;
 var txt='🚀 NexusShop launch week · '+PRODS.filter(function(p){return !p.demo}).length+' products live · COD en todo Pakistán · Committee Buy: 3 amigos = −15% · ';
 var d=document.createElement('div');d.id='nxMq';d.style.cssText='overflow:hidden;white-space:nowrap;border-block:1px solid var(--border);background:rgba(34,211,238,.06);font-size:11px;color:#a5f3fc;padding:6px 0;margin:8px 0';
 d.innerHTML='<span style="display:inline-block;padding-left:100%;animation:nxmq 22s linear infinite">'+txt+txt+'</span><style>@keyframes nxmq{to{transform:translateX(-100%)}}</style>';
 var hero=document.getElementById('nxHero');if(hero)hero.insertAdjacentElement('afterend',d);}
var _r6=render;render=function(){_r6();if(typeof VIEW==='undefined'||VIEW!=='home')return;
 var sb=document.getElementById('nxSortBar');var fy=document.getElementById('nxForYou');
 var fc=document.querySelector('#view [onclick^="openP("] button');
 if(fc){var grid=fc.parentElement.parentElement;
  if(sb&&sb.nextElementSibling!==grid)grid.parentElement.insertBefore(sb,grid);
  if(fy&&fy.nextElementSibling!==grid)grid.parentElement.insertBefore(fy,grid);}
 marquee();};
var _g6=window.nxPlanGate;window.nxPlanGate=function(){_g6();var n=0;var t=setInterval(function(){n++;var w=document.getElementById('nxgWrap');if(w&&!document.getElementById('nxMx')&&window.nxMatrix){w.insertAdjacentHTML('afterbegin',nxMatrix(window.NXPLAN||'free'));clearInterval(t);}if(n>8)clearInterval(t);},150);};
})();
