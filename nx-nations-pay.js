/* nx-nations-pay.js — Pagos locales por nación + toggle de idioma co-oficial + hero tagline por país (refina nx-nations.js según feedback de Tomáš/Sopio) */
(function(){
"use strict";
if(window.__nxPay2)return;window.__nxPay2=true;
function E(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function L(en,ur){return S.lang==="ur"?ur:en;}
/* mercados/couriers de respaldo por si nx-nations.js no cargó */
if(!window.MK.SK)MK.SK={code:"SK",flag:"🇸🇰",sym:"€",rate:0.0033,del:1200,free:15000,cities:"Bratislava · Košice · Žilina",phone:"+421",couriers:[["Packeta","packeta.sk"],["Slovenská pošta","posta.sk"],["DPD","dpd.sk"],["GLS","gls-group.com/SK"],["SPS","sps-sk.sk"]],pay:"Dobierka · Bank transfer"};
if(!window.MK.DE)MK.DE={code:"DE",flag:"🇩🇪",sym:"€",rate:0.0033,del:1500,free:15000,cities:"Berlin · München · Hamburg",phone:"+49",couriers:[["DHL","dhl.de"],["Hermes","hermesworld.com"],["DPD","dpd.de"],["GLS","gls-group.com/DE"],["UPS","ups.com/de"],["Deutsche Post","deutschepost.de"]],pay:"Nachnahme · SEPA"};
if(!window.MK.IN)MK.IN={code:"IN",flag:"🇮🇳",sym:"₹",rate:0.30,del:150,free:15000,cities:"Delhi · Mumbai · Bengaluru",phone:"+91",couriers:[["India Post","indiapost.gov.in"],["Delhivery","delhivery.com"],["Blue Dart","bluedart.com"],["DTDC","dtdc.in"],["Ecom Express","ecomexpress.in"],["Shadowfax","shadowfax.in"]],pay:"UPI · COD"};
if(!window.MK.GL)MK.GL={code:"GL",flag:"🌍",sym:"$",rate:0.0036,del:1500,free:20000,cities:"Worldwide",phone:"+",couriers:[["DHL Express","dhl.com"],["UPS","ups.com"],["FedEx","fedex.com"],["Aramex","aramex.com"]],pay:"Card · PayPal"};
/* métodos de pago por nación (del video: Tomáš pidió pagos locales SK) */
var PAY={
 SK:[{c:"cod",n:"Dobierka (COD)"},{c:"bank",n:"Bankový prevod"},{c:"card",n:"Karta online"}],
 DE:[{c:"cod",n:"Nachnahme (COD)"},{c:"sepa",n:"SEPA-Überweisung"},{c:"paypal",n:"PayPal"},{c:"card",n:"Kreditkarte"}],
 IN:[{c:"upi",n:"UPI"},{c:"cod",n:"Cash on Delivery"},{c:"net",n:"NetBanking"}],
 PK:[{c:"cod",n:"Cash on Delivery"},{c:"jazz",n:"JazzCash"},{c:"easy",n:"Easypaisa"},{c:"bank",n:"Bank transfer"}],
 NG:[{c:"cod",n:"Cash on Delivery"},{c:"paystack",n:"Paystack"},{c:"flutter",n:"Flutterwave"}],
 GL:[{c:"card",n:"Card"},{c:"paypal",n:"PayPal"},{c:"cod",n:"COD where available"}]};
var PRIMARY={SK:"sk",DE:"de",IN:"hi",PK:"ur",NG:"en",GL:"en"};
var HERO={
 SK:{en:"Buy from trusted Slovak shops. Pay on delivery, your way.",sk:"Nakupujte od overených slovenských obchodov. Plaťte pri doručení, po svojom."},
 DE:{en:"Buy from trusted German shops. Pay on delivery, your way.",de:"Kaufen bei geprüften deutschen Shops. Zahlen bei Lieferung, wie Sie wollen."},
 IN:{en:"Buy from trusted Indian shops. Pay on delivery, your way.",hi:"भरोसेमंद भारतीय दुकानों से खरीदें। डिलीवरी पर, अपने तरीके से भुगतान करें।"},
 PK:{en:"Buy from trusted Pakistani shops. Pay when it arrives.",ur:"قابلِ اعتماد پاکستانی دکانوں سے خریدیں۔ پہنچنے پر ادائیگی کریں۔"},
 NG:{en:"Buy from trusted Nigerian shops. Pay when it arrives."},
 GL:{en:"Buy from trusted shops worldwide. Pay on delivery where available."}};
if(!S.payMethod)S.payMethod="cod";
var css=document.createElement("style");css.textContent=
".np-card{background:var(--sf);border:1px solid var(--ln);border-radius:var(--r);padding:14px;margin-bottom:14px}"+
".np-chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}"+
".np-chip{border:1px solid var(--ln);background:var(--sf2);border-radius:999px;padding:7px 13px;font-size:12px;font-weight:600;color:var(--ink2);cursor:pointer}"+
".np-chip.on{background:var(--grn);color:#fff;border-color:var(--grn)}"+
".np-lang{background:var(--goldbg);border:1px solid var(--gold);color:var(--gold);border-radius:999px;padding:5px 11px;font-size:11px;font-weight:800;cursor:pointer;margin-inline-start:6px}";
document.head.appendChild(css);
function payChips(){var list=PAY[S.market]||PAY.GL;
 return '<div class="np-card np-paycard"><b>💳 '+L("Payment method","طریقہ ادائیگی")+'</b><div class="np-chips">'+list.map(function(p){return '<button class="np-chip'+(S.payMethod===p.c?" on":"")+'" data-np-pay="'+p.c+'">'+E(p.n)+"</button>";}).join("")+"</div></div>";}
function inject(){
 /* payment chooser in cart, right after logistics card */
 var v=document.querySelector("main .view");
 if(v&&S.view==="cart"&&S.cart.length&&!v.querySelector(".np-paycard")){var lg=v.querySelector(".nn-logcard");if(lg)lg.insertAdjacentHTML("afterend",payChips());else v.insertAdjacentHTML("beforeend",payChips());}
 /* quick co-official language toggle in header (Tomáš: English as additional for SK) */
 var hd=document.querySelector("header");
 if(hd&&!hd.querySelector(".np-lang")){var pr=PRIMARY[S.market];var other=(S.lang===pr)?"en":pr;var lbl={sk:"SK",de:"DE",hi:"HI",ur:"UR",en:"EN"}[other]||other.toUpperCase();hd.insertAdjacentHTML("beforeend",'<button class="np-lang" data-np-lang title="Switch language">'+lbl+"</button>");}
 /* nation-specific hero tagline for a distinct experience */
 if(S.view==="home"){var hp=document.querySelector(".hero p");var hset=HERO[S.market];if(hp&&hset){var txt=hset[S.lang]||hset.en;if(txt&&hp.textContent!==txt)hp.textContent=txt;}}
}
document.addEventListener("click",function(e){
 var p=e.target.closest("[data-np-pay]");if(p){S.payMethod=p.dataset.npPay;save();inject();return;}
 var g=e.target.closest("[data-np-lang]");if(g){var pr=PRIMARY[S.market];S.lang=(S.lang===pr)?"en":pr;save();render();return;}
});
/* order message carries nation payment method + courier (WhatsApp, like Pakistan) */
var _om=window.orderMessage;window.orderMessage=function(o){var base=_om?_om(o):"";var pm=(PAY[S.market]||PAY.GL).find(function(x){return x.c===S.payMethod;});return base+(pm?"\n"+L("Payment","ادائیگی")+": "+pm.n:"")+(S.courier?"\n"+L("Courier","کورئیر")+": "+S.courier:"");};
var _r=window.render;window.render=function(){var out=_r.apply(this,arguments);setTimeout(inject,170);return out;};
setTimeout(inject,400);
})();
