/* ===== UX7: Shop Now scroll real + gate con matriz determinística ===== */
(function(){
window.nxScrollCat=function(){var fc=document.querySelector('#view [onclick^="openP("] button');
 var el=fc?fc.parentElement.parentElement:document.getElementById('nxCatRow');
 if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
 var sb=document.getElementById('nxSortBar');
 if(sb){sb.style.boxShadow='0 0 0 2px #22d3ee, 0 0 24px rgba(34,211,238,.5)';setTimeout(function(){sb.style.boxShadow=''},1400);}};
window.nxPlanGate=function(){if(document.getElementById('nxgWrap'))return;
 document.body.insertAdjacentHTML('beforeend','<div id="nxgWrap" style="position:fixed;inset:0;z-index:998;overflow-y:auto;padding:16px;background:radial-gradient(1000px 500px at 80% -10%,rgba(34,211,238,.14),transparent),radial-gradient(800px 400px at 10% 110%,rgba(244,114,182,.12),transparent),#04060f"></div>');
 var P=[{n:'Free',p:0,f:['Up to 5 products live','WhatsApp COD checkout','Committee Buy groups','Public shop profile'],cta:'🛍️ Start free — browse & sell',g:0},
 {n:'Pro',p:2500,f:['Up to 50 products live','Priority placement on home','Sales stats dashboard','Pro shop badge','Official payment receipts'],cta:'💳 Pay & unlock Pro',g:1},
 {n:'Max',p:5000,f:['Up to 500 products live','Top-of-category placement','Everything in Pro','Dedicated WhatsApp support','Early access to new features'],cta:'💳 Pay & unlock Max',g:0}];
 document.getElementById('nxgWrap').innerHTML='<div style="max-width:560px;margin:0 auto;padding:6px 0">'+
 '<div style="text-align:center;margin:10px 0 14px"><div style="font-size:10px;font-weight:800;letter-spacing:3px;color:#67e8f9">NEXUSSHOP PAY™</div><div style="font-size:27px;font-weight:900;margin-top:4px;background:linear-gradient(90deg,#f472b6,#a78bfa,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent">Choose your plan</div><div style="font-size:12px;color:#94a3b8;margin-top:6px;line-height:1.6">Buyers browse free forever. Paid features unlock only after the bank confirms your transfer.</div></div>'+
 (window.nxMatrix?window.nxMatrix(window.NXPLAN||'free'):'')+
 P.map(function(x,i){return '<div class="nxp-glass'+(x.g?' nxg-pro':'')+'" style="padding:16px;margin-bottom:12px;'+(i===0?'border-color:rgba(52,211,153,.45)':'')+'">'+
 '<div style="display:flex;justify-content:space-between;align-items:baseline"><b style="font-size:16px">'+x.n+(x.g?' <span style="font-size:9px;font-weight:800;color:#05070f;background:linear-gradient(90deg,#22d3ee,#a78bfa);padding:3px 8px;border-radius:99px">MOST POPULAR</span>':'')+'</b><span style="font-size:19px;font-weight:900;color:'+(i===0?'#34d399':'#e2e8f0')+'">Rs. '+x.p.toLocaleString()+'<span style="font-size:11px;color:#64748b;font-weight:600">/mo</span></span></div>'+
 '<ul style="margin:10px 0 12px 16px;font-size:12px;line-height:1.9;color:#cbd5e1">'+x.f.map(function(f){return '<li>'+(i===0?'✓':'🔒')+' '+f+'</li>'}).join('')+'</ul>'+
 '<button class="btn'+(x.g?' nxg-glow':'')+'" style="font-size:14px;'+(i===0?'background:linear-gradient(90deg,#059669,#34d399)':'')+'" onclick="'+(i===0?'nxGateFree()':'nxGatePay(\''+x.n.toLowerCase()+'\','+x.p+')')+'">'+x.cta+' →</button></div>';}).join('')+
 '<div style="text-align:center;font-size:10.5px;color:#64748b;line-height:1.7;padding:4px 8px 20px">Payments land in the official NexusShop Pakistan account (MCB · Talal Rehan). Confirmed by the account holder ≤24h. Official receipt issued on confirmation only.</div></div>';};
})();
