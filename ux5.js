/* ===== UX5: plan matrix + smart commerce + 3D premium splash ===== */
(function(){
document.head.insertAdjacentHTML('beforeend','<style>.ux5-orb{position:absolute;border-radius:50%;filter:blur(60px);opacity:.45;pointer-events:none;transition:transform .3s}.ux5-o1{width:280px;height:280px;background:#22d3ee;top:-60px;left:-80px}.ux5-o2{width:240px;height:240px;background:#a78bfa;bottom:8%;right:-70px}.ux5-o3{width:180px;height:180px;background:#f472b6;top:42%;left:8%}@keyframes ux5up{from{opacity:0;transform:translateY(26px) scale(.96)}to{opacity:1;transform:none}}.ux5-shine{position:relative;overflow:hidden}.ux5-shine:after{content:"";position:absolute;top:0;bottom:0;width:40%;left:-60%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.45),transparent);animation:ux5sh 2.6s infinite;pointer-events:none}@keyframes ux5sh{to{left:120%}}</style>');
var MATRIX=[
 {f:'Products live',v:['5','50','500']},
 {f:'WhatsApp COD checkout',v:[1,1,1]},
 {f:'Committee Buy groups',v:[1,1,1]},
 {f:'Public shop profile',v:[1,1,1]},
 {f:'Smart sort & For-You rails',v:[1,1,1]},
 {f:'Priority placement on home',v:[0,1,1]},
 {f:'Sales stats dashboard',v:[0,1,1]},
 {f:'Pro shop badge',v:[0,1,1]},
 {f:'Official payment receipts',v:[0,1,1]},
 {f:'Top-of-category placement',v:[0,0,1]},
 {f:'Dedicated WhatsApp support',v:[0,0,1]},
 {f:'Early access to new features',v:[0,0,1]}];
function matrixHTML(cur){var ci={free:0,pro:1,max:2}[cur||'free']||0;
 var inc=MATRIX.filter(function(r){return r.v[ci]!==0});
 var locked=MATRIX.filter(function(r){return r.v[ci]===0});
 return '<div class="nxp-glass" id="nxMx" style="padding:14px;margin-bottom:12px">'+
 '<b style="font-size:13px">Your plan: '+(cur||'free').toUpperCase()+'</b>'+
 '<div style="margin-top:8px;font-size:12px;line-height:1.9;color:#cbd5e1">✅ <b>Available to you NOW:</b><br>'+inc.map(function(r){return '· '+r.f+(typeof r.v[ci]==='string'?' — <b>'+r.v[ci]+'</b>':'')}).join('<br>')+'</div>'+
 (locked.length?'<div style="margin-top:10px;font-size:12px;line-height:1.9;color:#94a3b8">🔒 <b>Locked until you upgrade:</b><br>'+locked.map(function(r){var need=r.v[1]===1?'PRO':'MAX';return '· '+r.f+' <span style="font-size:9px;font-weight:800;color:#05070f;background:'+(need==='PRO'?'#a78bfa':'#f472b6')+';padding:2px 7px;border-radius:99px">'+need+'</span>'}).join('<br>')+'</div>':'')+
 '</div>';}
window.nxMatrix=matrixHTML;
var _g5=window.nxPlanGate;
window.nxPlanGate=function(){_g5();setTimeout(function(){var w=document.getElementById('nxgWrap');if(w&&!document.getElementById('nxMx')){var h=w.querySelector('div');if(h)h.insertAdjacentHTML('afterbegin',matrixHTML(window.NXPLAN||'free'));}},200);};
function featCard(){if(location.pathname.indexOf('seller')<0)return;if(!window.NXUID||!window.NXPLAN)return setTimeout(featCard,1500);
 if(document.getElementById('nxFeatCard'))return;
 var div=document.createElement('div');div.className='nxpf-card';div.id='nxFeatCard';
 div.innerHTML='<h2 style="font-size:15px;font-weight:800;margin-bottom:8px">🎛️ Your features</h2>'+matrixHTML(window.NXPLAN)+
 (window.NXPLAN==='free'?'<button class="nxpf-btn" onclick="nxPayDesk(\'pro\',2500)">💳 Unlock Pro — Rs. 2,500/month →</button>':'');
 (document.querySelector('main')||document.body).appendChild(div);}
setTimeout(featCard,2500);setTimeout(featCard,6000);
var SORTS=[['match','✨ Best match'],['cheap','💸 Cheapest'],['sold','🔥 Best selling'],['deal','🏷️ Biggest deals']];
window.nxSort=function(k){window.NXSORT=k;nxApplySort();document.querySelectorAll('#nxSortBar button').forEach(function(b){b.style.borderColor=b.dataset.k===k?'#22d3ee':'var(--border)'});};
function nxApplySort(){var cards=[].slice.call(document.querySelectorAll('#view [onclick^="openP("]')).filter(function(el){return el.querySelector('button')});if(cards.length<2)return;var par=cards[0].parentElement;
 var get=function(el){var m=el.getAttribute('onclick').match(/openP\('([^']+)'\)/);return m?PRODS.find(function(p){return p.id===m[1]}):null};
 cards.sort(function(a,b){var pa=get(a),pb=get(b);if(!pa||!pb)return 0;
  if(window.NXSORT==='cheap')return pa.price-pb.price;
  if(window.NXSORT==='sold')return (pb.sold||0)-(pa.sold||0);
  if(window.NXSORT==='deal'){var da=pa.old?((pa.old-pa.price)/pa.old):0;var db=pb.old?((pb.old-pb.price)/pb.old):0;return db-da;}
  return PRODS.indexOf(pa)-PRODS.indexOf(pb);});
 cards.forEach(function(c){par.appendChild(c)});}
function forYou(){var v=(typeof viewed==='function')?viewed():[];if(!v.length)return '';
 var kw={};v.forEach(function(id){var p=PRODS.find(function(x){return x.id===id});if(p)(p.name.toLowerCase().match(/[a-z]{4,}/g)||[]).forEach(function(w){if(!/with|this|that|from|shop/.test(w))kw[w]=(kw[w]||0)+1})});
 var tops=Object.keys(kw).sort(function(a,b){return kw[b]-kw[a]}).slice(0,3);
 var recs=PRODS.filter(function(p){return !p.demo&&v.indexOf(p.id)<0&&tops.some(function(w){return (p.name+' '+(p.desc||'')).toLowerCase().indexOf(w)>=0})}).slice(0,5);
 if(!recs.length)return '';
 return '<div id="nxForYou" style="margin:14px 0 4px"><b style="font-size:12px;color:var(--muted)">💡 FOR YOU — based on what you viewed</b><div style="display:flex;gap:10px;overflow-x:auto;padding-top:8px">'+recs.map(function(p){return '<div onclick="openP(\''+p.id+'\')" style="flex:0 0 132px;border:1px solid var(--border);border-radius:14px;overflow:hidden;background:rgba(255,255,255,.03);cursor:pointer">'+(p.img?'<img src="'+esc(p.img)+'" style="width:100%;height:88px;object-fit:cover">':'<div style="height:88px;display:flex;align-items:center;justify-content:center;font-size:30px">🛍️</div>')+'<div style="padding:8px;font-size:11px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+esc(p.name)+'</div><div style="padding:0 8px 8px;font-size:11px;color:#34d399;font-weight:800">'+money(p.price)+'</div></div>'}).join('')+'</div></div>';}
var _pl5=window.nxPolish;
window.nxPolish=function(){_pl5();var p=PRODS.find(function(x){return x.id===CUR});var tags=document.querySelector('#view .tags');if(!p||!tags||tags.dataset.pi)return;
 var kw=(p.name.toLowerCase().match(/[a-z]{4,}/)||[''])[0];if(!kw)return;
 var peers=PRODS.filter(function(x){return x.id!==p.id&&!x.demo&&(x.name+' ').toLowerCase().indexOf(kw)>=0&&x.price>0});
 if(peers.length<2)return;var avg=peers.reduce(function(s,x){return s+x.price},0)/peers.length;
 var d=Math.round((p.price-avg)/avg*100);tags.dataset.pi='1';
 tags.insertAdjacentHTML('beforeend','<span class="tag">'+(d<=0?'📊 '+Math.abs(d)+'% below similar items':'📊 '+d+'% above similar items')+'</span>');};
var _r5=render;
render=function(){_r5();if(typeof VIEW==='undefined'||VIEW!=='home')return;
 var old=document.getElementById('nxSortBar');if(old)old.remove();var of=document.getElementById('nxForYou');if(of)of.remove();
 var fc=document.querySelector('#view [onclick^="openP("]');if(!fc)return;var grid=fc.parentElement;
 grid.insertAdjacentHTML('beforebegin','<div id="nxSortBar" style="display:flex;gap:8px;overflow-x:auto;margin:10px 0">'+SORTS.map(function(s){return '<button data-k="'+s[0]+'" onclick="nxSort(\''+s[0]+'\')" style="flex:0 0 auto;border:1px solid var(--border);background:rgba(255,255,255,.04);color:var(--text);border-radius:99px;padding:8px 13px;font-size:11.5px;font-weight:700">'+s[1]+'</button>'}).join('')+'</div>'+forYou());
 nxApplySort();};
function splashUp(){var s=document.getElementById('splash');if(!s||s.dataset.ux5)return;s.dataset.ux5='1';s.style.position='relative';s.style.overflow='hidden';
 s.insertAdjacentHTML('afterbegin','<div class="ux5-orb ux5-o1"></div><div class="ux5-orb ux5-o2"></div><div class="ux5-orb ux5-o3"></div>');
 var btn=s.querySelector('.btn');if(btn)btn.classList.add('ux5-shine');
 [].forEach.call(s.children,function(el,i){if(el.className&&String(el.className).indexOf('ux5-orb')>=0)return;el.style.animation='ux5up .7s '+(0.1+i*0.12)+'s both cubic-bezier(.2,.9,.3,1.2)';});
 s.addEventListener('pointermove',function(e){var r=s.getBoundingClientRect();var x=(e.clientX-r.left)/r.width-0.5;var y=(e.clientY-r.top)/r.height-0.5;
  s.querySelectorAll('.ux5-orb').forEach(function(o,i){var d=(i+1)*18;o.style.transform='translate('+(x*d)+'px,'+(y*d)+'px)'});
  var cube=s.querySelector('[class*="cube"],[id*="cube"]');if(cube)cube.style.transform='rotateY('+(x*26)+'deg) rotateX('+(-y*20)+'deg)';});}
setTimeout(splashUp,300);setTimeout(splashUp,1200);
})();
window.nxPlans=function(){nxPlanGate();};
