/* ===== UX10: commercial welcome overlay + home visual uplift ===== */
(function(){
function lang(){return document.documentElement.dir==='rtl'?'ur':'en'}
function welcome(){if(document.getElementById('nxW10'))return;
 var enterBtn=[].slice.call(document.querySelectorAll('button')).filter(function(x){return /Enter NexusShop/.test(x.textContent||'')})[0];
 if(!enterBtn)return;
 var photos=(window.PRODS||[]).filter(function(p){return p.img&&!p.demo}).slice(0,3);
 var ov=document.createElement('div');ov.id='nxW10';ov.style.cssText='position:fixed;inset:0;z-index:9999;overflow-y:auto;background:radial-gradient(1000px 520px at 75% -12%,rgba(34,211,238,.16),transparent),radial-gradient(820px 460px at 8% 112%,rgba(244,114,182,.14),transparent),linear-gradient(180deg,#070b21,#05070f)';
 ov.innerHTML='<div style="max-width:560px;margin:0 auto;padding:26px 18px 34px;text-align:center">'+
 '<img src="icon.svg" alt="NexusShop" style="width:96px;height:96px;filter:drop-shadow(0 0 30px rgba(34,211,238,.9)) drop-shadow(0 0 70px rgba(244,114,182,.55))">'+
 '<div style="font-size:34px;font-weight:900;letter-spacing:-1px;margin-top:10px;background:linear-gradient(90deg,#f472b6,#a78bfa,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent">NexusShop</div>'+
 '<div style="font-size:13px;color:#67e8f9;font-weight:700;margin-top:4px">'+(lang()==='ur'?'پاکستان کے مستقبل میں خوش آمدید':"Welcome to Pakistan's Future")+'</div>'+
 (photos.length?'<div style="display:flex;justify-content:center;gap:8px;margin:16px 0">'+photos.map(function(p){return '<img src="'+p.img+'" style="width:76px;height:76px;border-radius:16px;object-fit:cover;border:1px solid rgba(255,255,255,.14);box-shadow:0 10px 30px rgba(0,0,0,.5)">'}).join('')+'</div>':'')+
 '<div style="display:flex;justify-content:center;gap:6px;flex-wrap:wrap;margin:6px 0 14px">'+['🇵🇰 COD nationwide','💬 WhatsApp checkout','🗣️ Urdu + English','👥 Committee −15%'].map(function(t){return '<span style="font-size:10.5px;font-weight:700;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);border-radius:99px;padding:6px 10px;color:#cbd5e1">'+t+'</span>'}).join('')+'</div>'+
 '<div style="font-size:11px;color:#64748b;line-height:1.7;margin-bottom:16px">'+(lang()==='ur'?'آپ کی مارکیٹ، آپ کی زبان، آپ کی کامیابی۔':'Your marketplace, your language, your success.')+'</div>'+
 '<button id="nxW10enter" style="width:100%;border:0;border-radius:18px;padding:16px;font-size:16px;font-weight:900;color:#071021;background:linear-gradient(90deg,#f472b6,#a78bfa,#22d3ee);box-shadow:0 14px 40px rgba(34,211,238,.35);cursor:pointer">'+(lang()==='ur'?'ابھی داخل ہوں →':'Enter NexusShop →')+'</button>'+
 '<div style="display:flex;justify-content:center;gap:8px;margin-top:12px;font-size:10.5px;color:#64748b">🔒 Cash on Delivery · 📦 Open-box before payment · ⭐ Verified reviews only</div>'+
 '</div>';
 document.body.appendChild(ov);
 ov.querySelector('#nxW10enter').onclick=function(){enterBtn.click();ov.remove();};}
var n=0;var t=setInterval(function(){n++;
 var ready=(window.PRODS&&PRODS.length)||n>8;
 if(ready&&!document.getElementById('nxW10'))welcome();
 if(n>30)clearInterval(t);},500);
var _r10=render;render=function(){_r10();if(typeof VIEW==='undefined'||VIEW!=='home')return;
 var row=document.getElementById('nxCatRow');
 if(row&&!row.dataset.ph){row.dataset.ph='1';
  (window.NXCATS||[]).forEach(function(c,i){var b=document.getElementById('nxcat'+i);if(!b)return;var p=(PRODS||[]).filter(function(x){return !x.demo&&x.img&&c[2].test((x.name+' '+(x.desc||'')).toLowerCase())})[0];if(p)b.insertAdjacentHTML('afterbegin','<img src="'+p.img+'" style="width:20px;height:20px;border-radius:50%;object-fit:cover;vertical-align:-5px;margin-right:6px">');});}
 if(!document.getElementById('nxPromo10')){var hero=document.getElementById('nxHero');if(hero){hero.insertAdjacentHTML('afterend','<div id="nxPromo10" style="position:relative;border-radius:20px;overflow:hidden;margin:10px 0;border:1px solid rgba(255,255,255,.1)"><img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=70" style="width:100%;height:120px;object-fit:cover;filter:saturate(1.2)"><div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,8,20,.92),rgba(5,8,20,.35));display:flex;flex-direction:column;justify-content:center;padding:14px"><b style="font-size:14px">🚀 Launch week in Lahore</b><span style="font-size:11px;color:#a5f3fc;margin-top:3px">First sellers onboarding now — free setup help by WhatsApp</span></div></div>');}}};
})();
