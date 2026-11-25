/* nx-lang-select.js — Selector de idioma flotante premium. Ningún botón cambia idioma solo. */
(function(){
"use strict";
if(window.__nxLangSel)return;window.__nxLangSel=true;
var LANGS=[["en","English","English","🇬🇧"],["ur","اردو","Urdu","🇵🇰"],["sk","Slovenčina","Slovak","🇸🇰"],["de","Deutsch","German","🇩🇪"],["hi","हिन्दी","Hindi","🇮🇳"]];
var SL={en:{t:"Choose your language",s:"The whole app switches instantly.",n:"NexusShop speaks your language"},
ur:{t:"اپنی زبان چنیں",s:"پوری ایپ فوراً بدل جائے گی۔",n:"NexusShop آپ کی زبان بولتا ہے"},
sk:{t:"Vyberte si jazyk",s:"Celá aplikácia sa okamžite prepne.",n:"NexusShop hovorí vaším jazykom"},
de:{t:"Sprache wählen",s:"Die ganze App wechselt sofort.",n:"NexusShop spricht Ihre Sprache"},
hi:{t:"अपनी भाषा चुनें",s:"पूरा ऐप तुरंत बदल जाएगा।",n:"NexusShop आपकी भाषा बोलता है"}};
function ST(k){return (SL[S.lang]&&SL[S.lang][k])||SL.en[k];}
/* inyecta claves i18n de Bulk/Wholesale (reemplazo de Committee) */
var BK={
en:{bulkT:"Bulk & wholesale",bulkS:"Request a wholesale quote directly from the seller on WhatsApp. NexusShop never holds money or stock.",bulkQty:"Quantity",bulkBtn:"Request bulk quote",bulkSent:"Quote request sent to the seller on WhatsApp",bulkNote:"You negotiate and pay the seller directly on delivery. NexusShop is only the showcase.",myBulk:"My bulk requests",bulkNone:"No bulk requests yet."},
ur:{bulkT:"تھوک اور ہول سیل",bulkS:"فروخت کنندہ سے واٹس ایپ پر براہ راست تھوک قیمت مانگیں۔ NexusShop کبھی پیسہ یا اسٹاک نہیں رکھتا۔",bulkQty:"مقدار",bulkBtn:"تھوک قیمت مانگیں",bulkSent:"درخواست فروخت کنندہ کو واٹس ایپ پر بھیج دی گئی",bulkNote:"سودا اور ادائیگی براہ راست فروخت کنندہ سے۔ NexusShop صرف ویترین ہے۔",myBulk:"میری تھوک درخواستیں",bulkNone:"ابھی کوئی درخواست نہیں۔"},
sk:{bulkT:"Veľkoobchod",bulkS:"Požiadajte predajcu o veľkoobchodnú cenu priamo cez WhatsApp. NexusShop nedrží peniaze ani tovar.",bulkQty:"Množstvo",bulkBtn:"Požiadať o veľkoobchodnú cenu",bulkSent:"Požiadavka odoslaná predajcovi cez WhatsApp",bulkNote:"Obchod a platba prebiehajú priamo s predajcom. NexusShop je len výklad.",myBulk:"Moje požiadavky",bulkNone:"Zatiaľ žiadne požiadavky."},
de:{bulkT:"Großhandel",bulkS:"Fragen Sie den Verkäufer direkt per WhatsApp nach einem Großhandelspreis. NexusShop hält weder Geld noch Ware.",bulkQty:"Menge",bulkBtn:"Großhandelspreis anfragen",bulkSent:"Anfrage per WhatsApp an den Verkäufer gesendet",bulkNote:"Verhandlung und Zahlung laufen direkt mit dem Verkäufer. NexusShop ist nur das Schaufenster.",myBulk:"Meine Anfragen",bulkNone:"Noch keine Anfragen."},
hi:{bulkT:"थोक और होलसेल",bulkS:"विक्रेता से सीधे WhatsApp पर थोक भाव पूछें। NexusShop न पैसा रखता है न स्टॉक।",bulkQty:"मात्रा",bulkBtn:"थोक भाव पूछें",bulkSent:"अनुरोध विक्रेता को WhatsApp पर भेजा गया",bulkNote:"सौदा और भुगतान सीधे विक्रेता से। NexusShop केवल विट्रिन है।",myBulk:"मेरे थोक अनुरोध",bulkNone:"अभी कोई अनुरोध नहीं।"}};
Object.keys(BK).forEach(function(l){I18N[l]=I18N[l]||{};Object.keys(BK[l]).forEach(function(k){I18N[l][k]=BK[l][k];});});
var css=document.createElement("style");css.textContent=
"#nxLangScrim{position:fixed;inset:0;z-index:520;background:rgba(15,12,8,.55);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);display:none;align-items:flex-end;justify-content:center}"+
"#nxLangScrim.on{display:flex}"+
"@media(min-width:640px){#nxLangScrim.on{align-items:center}}"+
"#nxLangSheet{width:100%;max-width:430px;background:linear-gradient(180deg,rgba(251,248,239,.97),rgba(246,241,228,.97));backdrop-filter:blur(20px);border-radius:28px 28px 0 0;padding:18px 18px calc(20px + env(safe-area-inset-bottom));box-shadow:0 -20px 60px rgba(0,0,0,.4),inset 0 1px 0 #fff;transform:translateY(60px);opacity:0;transition:transform .38s cubic-bezier(.2,.9,.25,1.05),opacity .3s;position:relative;overflow:hidden}"+
"@media(min-width:640px){#nxLangSheet{border-radius:28px}}"+
"#nxLangScrim.on #nxLangSheet{transform:none;opacity:1}"+
"#nxLangSheet:before{content:'';position:absolute;top:0;left:10%;right:10%;height:4px;border-radius:0 0 6px 6px;background:linear-gradient(90deg,var(--grn),var(--gold),var(--grn3))}"+
"#nxLangSheet .orb{position:absolute;border-radius:50%;filter:blur(34px);opacity:.25;pointer-events:none}"+
"#nxLangSheet .oa{width:150px;height:150px;background:var(--grn3);top:-50px;right:-40px;animation:nlF 7s ease-in-out infinite}"+
"#nxLangSheet .ob{width:110px;height:110px;background:var(--gold);bottom:-30px;left:-30px;animation:nlF 9s ease-in-out infinite reverse}"+
"@keyframes nlF{0%,100%{transform:translate(0,0)}50%{transform:translate(-14px,12px)}}"+
"#nxLangSheet .hd{display:flex;align-items:center;gap:10px;margin-bottom:4px;position:relative}"+
"#nxLangSheet .hd .gl{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,var(--grn),var(--grn3));color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 6px 16px rgba(29,92,63,.3)}"+
"#nxLangSheet .hd b{font-family:Georgia,serif;font-size:17px;color:var(--ink);display:block}"+
"#nxLangSheet .hd span{font-size:11.5px;color:var(--mut)}"+
"#nxLangSheet .x{margin-inline-start:auto;width:32px;height:32px;border-radius:50%;background:var(--sf2);border:1px solid var(--ln);color:var(--mut);font-size:14px;cursor:pointer}"+
"#nxLangList{margin-top:12px;max-height:52vh;overflow-y:auto;padding-right:4px;scrollbar-width:thin;scrollbar-color:var(--grn3) transparent;position:relative}"+
"#nxLangList::-webkit-scrollbar{width:6px}#nxLangList::-webkit-scrollbar-thumb{background:var(--grn3);border-radius:6px}"+
".nlRow{display:flex;align-items:center;gap:12px;width:100%;background:var(--sf2);border:1.5px solid var(--ln);border-radius:16px;padding:12px 14px;margin-bottom:8px;cursor:pointer;transition:all .16s;animation:nlIn .3s ease backwards}"+
".nlRow:nth-child(2){animation-delay:.05s}.nlRow:nth-child(3){animation-delay:.1s}.nlRow:nth-child(4){animation-delay:.15s}.nlRow:nth-child(5){animation-delay:.2s}"+
"@keyframes nlIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}"+
".nlRow:hover{transform:translateX(3px);border-color:var(--grn3)}"+
".nlRow.on{background:var(--mint);border-color:var(--grn);box-shadow:0 4px 14px rgba(29,92,63,.18)}"+
".nlRow .fl{width:40px;height:40px;border-radius:50%;background:#fff;border:1px solid var(--ln);display:flex;align-items:center;justify-content:center;font-size:20px;flex:none;box-shadow:0 2px 8px rgba(0,0,0,.08)}"+
".nlRow .nm{flex:1;text-align:start}.nlRow .nm b{display:block;font-size:15px;color:var(--ink)}+.nlRow .nm span{font-size:11px;color:var(--mut)}"+
".nlRow .nm span{font-size:11px;color:var(--mut);display:block}"+
".nlRow .ck{width:24px;height:24px;border-radius:50%;border:2px solid var(--ln2);flex:none;transition:all .16s}"+
".nlRow.on .ck{border-color:var(--grn);background:var(--grn);color:#fff;font-size:13px;display:flex;align-items:center;justify-content:center}"+
"#nxLangSheet .ft{margin-top:6px;text-align:center;font-size:11px;color:var(--fnt);position:relative}";
document.head.appendChild(css);
var scrim=document.createElement("div");scrim.id="nxLangScrim";
scrim.innerHTML='<div id="nxLangSheet"><span class="orb oa"></span><span class="orb ob"></span>'+
'<div class="hd"><span class="gl">🌐</span><div><b id="nlT"></b><span id="nlS"></span></div><button class="x" id="nlX">✕</button></div>'+
'<div id="nxLangList"></div><div class="ft" id="nlF"></div></div>';
document.body.appendChild(scrim);
function paint(){$("nlT").textContent=ST("t");$("nlS").textContent=ST("s");$("nlF").textContent="🛍 "+ST("n");
 $("nxLangList").innerHTML=LANGS.map(function(l){var on=S.lang===l[0];
  return '<button class="nlRow'+(on?" on":"")+'" data-nl="'+l[0]+'"><span class="fl">'+l[3]+'</span><span class="nm"><b>'+l[1]+'</b><span>'+l[2]+'</span></span><span class="ck">'+(on?"✓":"")+'</span></button>';}).join("");}
function $(id){return document.getElementById(id);}
function open(){paint();scrim.classList.add("on");if(window.NXSound)NXSound.beep(680,.08,"sine",.02);}
function close(){scrim.classList.remove("on");}
window.nxOpenLangSelect=open;
scrim.addEventListener("click",function(e){if(e.target===scrim){close();return;}
 if(e.target.closest("#nlX")){close();return;}
 var r=e.target.closest("[data-nl]");if(r){S.lang=r.dataset.nl;S.langMenu=false;save();close();render();toast(t("langSet"));if(window.NXSound)NXSound.beep(880,.1,"sine",.03);}});
/* CAPTURA: ningún botón de idioma cambia nada por sí solo */
document.addEventListener("click",function(e){
 if(e.target.closest('[data-a="lang"]')||e.target.closest("[data-np-lang]")){e.preventDefault();e.stopPropagation();open();}
},true);
})();
