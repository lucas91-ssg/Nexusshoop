/* ===== UX9: splash overlay + logo oficial, detectados por contenido (no por ids) ===== */
(function(){
function splashEl(){var bs=[].slice.call(document.querySelectorAll('button')).filter(function(x){return /Enter NexusShop/.test(x.textContent||'')});if(!bs.length)return null;var el=bs[0];for(var i=0;i<7&&el.parentElement;i++){el=el.parentElement;if(el.scrollHeight>380)return el;}return el;}
function fix(){var s=splashEl();if(!s||s.dataset.fx9)return;s.dataset.fx9='1';
 s.style.position='fixed';s.style.inset='0';s.style.zIndex='9998';s.style.overflow='auto';s.style.background='radial-gradient(900px 500px at 70% -10%,rgba(34,211,238,.15),transparent),radial-gradient(700px 420px at 10% 110%,rgba(244,114,182,.12),transparent),#05070f';
 if(!s.querySelector('.nx9logo')){var lock=document.createElement('div');lock.className='nx9logo';lock.style.cssText='display:flex;justify-content:center;margin:-6px 0 6px';lock.innerHTML='<img src="icon.svg" alt="NexusShop official logo" style="width:84px;height:84px;filter:drop-shadow(0 0 26px rgba(34,211,238,.85)) drop-shadow(0 0 60px rgba(244,114,182,.5))">';var cube=s.querySelector('[class*="cube"],[id*="cube"]');if(cube)cube.parentElement.insertBefore(lock,cube);else s.insertBefore(lock,s.firstChild);}}
var n=0;var t=setInterval(function(){n++;fix();if(n>24)clearInterval(t);},400);
setTimeout(fix,250);
})();
