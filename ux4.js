/* ===== MARKETPLACE HOMEPAGE (Peace review) ===== */
(function(){
var CATS=[['Electronics','📱',/tv|led|speaker|phone|mobile|earbud|charger|bluetooth|electronic/],['Fashion','👟',/shoe|sneaker|boot|cloth|shirt|dress|bag|watch|fashion/],['Home & Living','🛋️',/bed|sheet|pillow|curtain|lamp|sofa|kitchen|home|decor/],['Grocery','🍚',/rice|basmati|flour|atta|ghee|tea|chai|grocery|food|burger|drink/],['Beauty','💄',/cream|serum|soap|beauty|makeup|perfume/],['Kids & Toys','🧸',/kid|toy|baby|child/]];
window.NXCATS=CATS;
var _es4=window.enterShop;
window.enterShop=function(){LS.set('nx_gate',1);_es4();};
function heroHTML(){
 var feat=PRODS.filter(function(p){return !p.demo&&((p.sold||0)>0||p.old>p.price)}).sort(function(a,b){return (b.sold||0)-(a.sold||0)}).slice(0,6);
 return '<div class="card" id="nxHero" style="overflow:hidden;border:0;background:linear-gradient(135deg,rgba(34,211,238,.14),rgba(167,139,250,.12),rgba(244,114,182,.14));padding:18px">'+
 '<div style="font-size:20px;font-weight:900;background:linear-gradient(90deg,#f472b6,#a78bfa,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent">The marketplace that speaks your language</div>'+
 '<div style="font-size:12px;color:var(--muted);margin:6px 0 14px;line-height:1.6">Cash on Delivery · WhatsApp checkout · Urdu, English & more · Group buys that cut prices</div>'+
 '<div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn" style="flex:1;min-width:140px;background:linear-gradient(90deg,#059669,#34d399)" onclick="nxScrollCat()">🛍️ Shop Now</button><button class="btn" style="flex:1;min-width:140px" onclick="nxPlanGate()">🏪 Start Selling — free</button></div></div>'+
 '<div id="nxCatRow" style="display:flex;gap:8px;overflow-x:auto;padding:12px 2px">'+CATS.map(function(c,i){return '<button onclick="nxCat('+i+')" id="nxcat'+i+'" style="flex:0 0 auto;border:1px solid var(--border);background:rgba(255,255,255,.04);color:var(--text);border-radius:99px;padding:9px 14px;font-size:12px;font-weight:700">'+c[1]+' '+c[0]+'</button>'}).join('')+'<button onclick="nxCat(-1)" id="nxcat-1" style="flex:0 0 auto;border:1px solid #22d3ee;background:rgba(34,211,238,.08);color:var(--text);border-radius:99px;padding:9px 14px;font-size:12px;font-weight:700">✨ All</button></div>'+
 (feat.length?'<div style="margin:4px 0 12px"><b style="font-size:12px;color:var(--muted)">⭐ FEATURED TODAY</b><div style="display:flex;gap:10px;overflow-x:auto;padding-top:8px">'+feat.map(function(p){return '<div onclick="openP(\''+p.id+'\')" style="flex:0 0 132px;border:1px solid var(--border);border-radius:14px;overflow:hidden;background:rgba(255,255,255,.03);cursor:pointer">'+(p.img?'<img src="'+esc(p.img)+'" style="width:100%;height:88px;object-fit:cover">':'<div style="height:88px;display:flex;align-items:center;justify-content:center;font-size:30px">🛍️</div>')+'<div style="padding:8px;font-size:11px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+esc(p.name)+'</div><div style="padding:0 8px 8px;font-size:11px;color:#34d399;font-weight:800">'+money(p.price)+'</div></div>'}).join('')+'</div></div>':'');
}
window.nxScrollCat=function(){var el=document.getElementById('nxCatRow');if(el)el.scrollIntoView({behavior:'smooth',block:'start'});};
window.nxCat=function(i){window.NXCATF=i>=0?CATS[i][2]:null;
 CATS.forEach(function(c,k){var b=document.getElementById('nxcat'+k);if(b)b.style.borderColor=(k===i)?'#22d3ee':'var(--border)';});
 var ba=document.getElementById('nxcat-1');if(ba)ba.style.borderColor=i<0?'#22d3ee':'var(--border)';
 document.querySelectorAll('[onclick^="openP("]').forEach(function(el){if(!el.querySelector('button'))return;var m=el.getAttribute('onclick').match(/openP\('([^']+)'\)/);if(!m)return;var p=PRODS.find(function(x){return x.id===m[1]});if(!p)return;var hay=(p.name+' '+(p.desc||'')).toLowerCase();el.style.display=(!window.NXCATF||window.NXCATF.test(hay))?'':'none';});};
var _r4=render;
render=function(){_r4();if(typeof VIEW!=='undefined'&&VIEW==='home'){var v=document.getElementById('view');if(v&&!document.getElementById('nxHero'))v.insertAdjacentHTML('afterbegin',heroHTML());if(window.NXCATF){var idx=-1;CATS.forEach(function(c,k){if(c[2]===window.NXCATF)idx=k;});nxCat(idx);}}};
})();
