/* nx-nations-boot.js — fuente Devanagari + clase body.hi (complementa nx-nations.js sin tocar index.html) */
(function(){
"use strict";
if(window.__nxBoot)return;window.__nxBoot=true;
var l=document.createElement("link");l.rel="stylesheet";
l.href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;700&display=swap";
document.head.appendChild(l);
var c=document.createElement("style");
c.textContent="body.hi{font-family:'Noto Sans Devanagari','Segoe UI',sans-serif}body.hi h1,body.hi h2,body.hi h3,body.hi .serif{line-height:1.9}";
document.head.appendChild(c);
function sync(){document.body.classList.toggle("hi",S.lang==="hi");}
var _r=window.render;window.render=function(){var o=_r.apply(this,arguments);setTimeout(sync,60);return o;};
setTimeout(sync,300);
})();
