/* ===== EXPERIENCE PACK (ML-inspired, COD-honest) ===== */
(function(){
var ETA='<div style="font-size:11px;color:var(--muted);margin-top:8px;line-height:1.6">🕒 Estimated delivery: TCS 2-4 days · Leopards 1-3 · M&P 2-5 · Post Ex 3-7 · Trax 1-3 · Seller arranges: agreed with seller.</div>';
window.vCart=function(){var c=cart().filter(function(x){return !x.demo});
 if(!c.length)return '<div class="card"><h2 class="t">🛒 '+t('cart')+'</h2><div class="empty">'+t('emptyCart')+'</div></div>';
 var shops={};c.forEach(function(x){var k=x.shopName||'Seller';(shops[k]=shops[k]||[]).push(x)});
 var keys=Object.keys(shops);var tot=c.reduce(function(s,x){return s+x.price*x.q},0);
 var save=0;c.forEach(function(x){var p=PRODS.find(function(pp){return pp.id===x.i});if(p&&p.old>p.price)save+=(p.old-p.price)*x.q;});
 return '<div class="card"><h2 class="t">🛒 '+t('cart')+'</h2>'+
 (keys.length>1?'<div class="infob">🧾 '+keys.length+' sellers — each order goes to its own WhatsApp.</div>':'')+
 keys.map(function(k){var items=shops[k];var sub=items.reduce(function(s,x){return s+x.price*x.q},0);
  return '<div style="border:1px solid var(--border);border-radius:14px;padding:12px;margin-bottom:12px;background:rgba(255,255,255,.03)">'+
  '<div class="shopline" style="margin:0 0 10px">🏪 <b>'+esc(k)+'</b> · '+items.length+' items · '+money(sub)+'</div>'+
  items.map(function(x){var p=PRODS.find(function(pp){return pp.id===x.i});var oos=p&&p.stock===0;
   return '<div class="row">'+(x.img?'<img src="'+esc(x.img)+'" onerror="this.outerHTML=\'<div style=&quot;font-size:30px&quot;>🛍️</div>\'">':'<div style="font-size:30px">🛍️</div>')+
   '<div class="inf"><div class="nm">'+esc(x.name)+(oos?' <b style="color:#f87171">⛔ AGOTADO</b>':'')+'</div><div class="pr">'+money(x.price*x.q)+'</div></div>'+
   '<div class="q"><button onclick="setQ(\''+x.i+'\',-1)">−</button><span>'+x.q+'</span><button onclick="setQ(\''+x.i+'\',1)">+</button></div></div>';}).join('')+
  '<button class="btn wa" style="margin-top:10px" onclick="waShop(\''+k.replace(/'/g,"\\'")+'\')">💬 Order from '+esc(k)+' (COD)</button></div>';}).join('')+
 '<div class="tot"><span>'+t('total')+'</span><b>'+money(tot)+'</b></div>'+
 (save>0?'<div style="text-align:right;font-size:12px;color:#34d399;font-weight:800;margin:-4px 0 8px">🎉 You save '+money(save)+'</div>':'')+
 (typeof nxCourierBox==='function'?nxCourierBox():'')+ETA+'</div>';};
var _pl3=window.nxPolish;
window.nxPolish=function(){_pl3();var p=PRODS.find(function(x){return x.id===CUR});var tags=document.querySelector('#view .tags');if(!p||!tags||tags.dataset.nxd)return;tags.dataset.nxd='1';
 if(p.old&&p.old>p.price)tags.insertAdjacentHTML('beforeend','<span class="tag" style="background:#f43f5e;border-color:#f43f5e;color:#fff">−'+Math.round((1-p.price/p.old)*100)+'% OFF</span>');
 tags.insertAdjacentHTML('beforeend','<span class="tag">'+(p.sold>0?'🔥 '+p.sold+' vendidos':'✨ Nuevo')+'</span>');};
var _r3=render;
render=function(){_r3();
 if(typeof VIEW==='undefined'||VIEW!=='home')return;
 var v=document.getElementById('view');
 if(!PRODS.length&&v&&!v.querySelector('.nxsk')){v.insertAdjacentHTML('beforeend','<style>@keyframes nxsh{to{background-position:-200% 0}}</style><div class="nxsk" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">'+new Array(7).join('<div style="border-radius:16px;height:220px;background:linear-gradient(100deg,rgba(255,255,255,.04) 40%,rgba(255,255,255,.10) 50%,rgba(255,255,255,.04) 60%);background-size:200% 100%;animation:nxsh 1.2s infinite"></div>')+'</div>');}
 document.querySelectorAll('[onclick^="openP("]').forEach(function(el){
  if(el.dataset.nxd)return;el.dataset.nxd='1';
  var m=el.getAttribute('onclick').match(/openP\('([^']+)'\)/);if(!m)return;
  var p=PRODS.find(function(x){return x.id===m[1]});if(!p)return;
  var chips='';
  if(p.old&&p.old>p.price)chips+='<span style="background:#f43f5e;color:#fff;font-size:10px;font-weight:800;padding:3px 8px;border-radius:99px">−'+Math.round((1-p.price/p.old)*100)+'% OFF</span>';
  if(p.stock!=null&&p.stock>0&&p.stock<=5)chips+='<span style="background:#f59e0b;color:#0b1020;font-size:10px;font-weight:800;padding:3px 8px;border-radius:99px">Quedan '+p.stock+'</span>';
  chips+=p.sold>0?'<span style="background:rgba(52,211,153,.15);color:#34d399;font-size:10px;font-weight:800;padding:3px 8px;border-radius:99px">🔥 '+p.sold+' vendidos</span>':'<span style="background:rgba(148,163,184,.15);color:#94a3b8;font-size:10px;font-weight:800;padding:3px 8px;border-radius:99px">✨ Nuevo</span>';
  el.style.position='relative';
  el.insertAdjacentHTML('afterbegin','<div style="position:absolute;top:8px;left:8px;right:8px;display:flex;gap:4px;flex-wrap:wrap;z-index:2">'+chips+'</div>');});};
})();
