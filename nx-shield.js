/* nx-shield.js v1 — Trust Seal + Safe-Link Guard + Privacy Vault */
(function(){
"use strict";
if(window.__nxShield)return;window.__nxShield=true;
var URL="https://jtbxqwiyktzjdjohcyli.supabase.co";
var ANON="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0Ynhxd2l5a3R6amRqb2hjeWxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ5MzY5NzIsImV4cCI6MjExMDUxMjk3Mn0.lTQDVQgJqY65_daClS0V7LvO6Kl1Pi7pyGrL5F5j-1U";
var sb=null,me=null,shop=null,verified={};
var SH={en:{trust:"Trust Seal",verified:"Verified seller",trusted:"Trusted",elite:"Elite",newS:"New seller",score:"Trust score",req:"Request verification",pending:"Verification pending",safe:"Safe link",safeD:"This destination is verified by NexusShop. Your phone number is never shared — only the order code.",open:"Open WhatsApp",cancel:"Cancel",blocked:"Blocked destination",blockedD:"This link is not on the NexusShop safe list. For your safety it was not opened.",priv:"Privacy Vault",consent:"I consent to NexusShop storing my order data to operate the marketplace (KVKK/GDPR).",private:"Private mode (mask my data on screen)",export:"Export my data",delete:"Delete all my data",mydata:"My data & privacy",delDone:"Local data erased.",expDone:"Data exported."},
ur:{trust:"ٹرسٹ سیل",verified:"تصدیق شدہ فروخت کنندہ",trusted:"قابلِ اعتماد",elite:"ایلیٹ",newS:"نیا فروخت کنندہ",score:"ٹرسٹ اسکور",req:"تصدیق کی درخواست",pending:"تصدیق زیر التوا",safe:"محفوظ لنک",safeD:"یہ منزل NexusShop سے تصدیق شدہ ہے۔ آپ کا فون نمبر شیئر نہیں ہوتا — صرف آرڈر کوڈ۔",open:"واٹس ایپ کھولیں",cancel:"منسوخ",blocked:"مسدود منزل",blockedD:"یہ لنک محفوظ فہرست میں نہیں۔ آپ کی حفاظت کے لیے نہیں کھولا گیا۔",priv:"پرائیویسی والٹ",consent:"میں NexusShop کو میرا آرڈر ڈیٹا محفوظ کرنے کی اجازت دیتا ہوں (KVKK/GDPR)۔",private:"پرائیویٹ موڈ (میرا ڈیٹا چھپائیں)",export:"میرا ڈیٹا ایکسپورٹ",delete:"میرا تمام ڈیٹا حذف",mydata:"میرا ڈیٹا اور رازداری",delDone:"لوکل ڈیٹا حذف۔",expDone:"ڈیٹا ایکسپورٹ۔"},
sk:{trust:"Pečať dôvery",verified:"Overený predajca",trusted:"Dôveryhodný",elite:"Elite",newS:"Nový predajca",score:"Skóre dôvery",req:"Požiadať o overenie",pending:"Overenie čaká",safe:"Bezpečný odkaz",safeD:"Cieľ je overený NexusShop. Vaše číslo sa nezdieľa — len kód objednávky.",open:"Otvoriť WhatsApp",cancel:"Zrušiť",blocked:"Blokovaný cieľ",blockedD:"Odkaz nie je na bezpečnom zozname.",priv:"Trezor súkromia",consent:"Súhlasím so spracovaním údajov objednávky (KVKK/GDPR).",private:"Súkromný režim",export:"Exportovať údaje",delete:"Zmazať všetky údaje",mydata:"Moje údaje a súkromie",delDone:"Údaje zmazané.",expDone:"Údaje exportované."},
de:{trust:"Vertrauenssiegel",verified:"Verifizierter Verkäufer",trusted:"Vertrauenswürdig",elite:"Elite",newS:"Neuer Verkäufer",score:"Vertrauenswert",req:"Verifizierung anfordern",pending:"Verifizierung offen",safe:"Sicherer Link",safeD:"Ziel von NexusShop verifiziert. Ihre Nummer wird nie geteilt — nur der Bestellcode.",open:"WhatsApp öffnen",cancel:"Abbrechen",blocked:"Blockiertes Ziel",blockedD:"Link nicht auf der Sicherheitsliste.",priv:"Datenschutz-Tresor",consent:"Ich stimme der Speicherung meiner Bestelldaten zu (KVKK/DSGVO).",private:"Privatmodus",export:"Daten exportieren",delete:"Alle Daten löschen",mydata:"Meine Daten & Datenschutz",delDone:"Daten gelöscht.",expDone:"Daten exportiert."},
hi:{trust:"ट्रस्ट सील",verified:"सत्यापित विक्रेता",trusted:"भरोसेमंद",elite:"एलीट",newS:"नया विक्रेता",score:"ट्रस्ट स्कोर",req:"सत्यापन अनुरोध",pending:"सत्यापन लंबित",safe:"सुरक्षित लिंक",safeD:"गंतव्य NexusShop द्वारा सत्यापित। आपका नंबर साझा नहीं होता — केवल ऑर्डर कोड।",open:"WhatsApp खोलें",cancel:"रद्द",blocked:"अवरुद्ध गंतव्य",blockedD:"लिंक सुरक्षित सूची में नहीं।",priv:"प्राइवेसी वॉल्ट",consent:"मैं ऑर्डर डेटा संग्रहण की सहमति देता हूँ (KVKK/GDPR)।",private:"प्राइवेट मोड",export:"डेटा निर्यात",delete:"सारा डेटा हटाएँ",mydata:"मेरा डेटा और गोपनीयता",delDone:"डेटा हटाया।",expDone:"डेटा निर्यात।"}};
function ST(k){return (SH[S.lang]&&SH[S.lang][k])||SH.en[k];}
var css=document.createElement("style");css.textContent=
".nxSeal{display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:3px 10px;font-size:10px;font-weight:800;border:1px solid}"+
".nxSeal.v{background:var(--mint);color:var(--grn);border-color:var(--grn3)}"+
".nxSeal.t{background:#e0f2fe;color:#0369a1;border-color:#7dd3fc}"+
".nxSeal.e{background:linear-gradient(135deg,#fef3c7,#fde68a);color:#92400e;border-color:var(--gold)}"+
".nxSeal.n{background:var(--bg2);color:var(--mut);border-color:var(--ln2)}"+
".nxTrust{display:flex;gap:10px;align-items:center;margin:8px 0}"+
".nxTrust .ring{width:44px;height:44px;border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;color:#fff;background:conic-gradient(var(--grn) calc(var(--p)*1%),var(--ln) 0)}"+
".nxTrust .ring i{width:34px;height:34px;border-radius:50%;background:var(--sf);display:flex;align-items:center;justify-content:center;color:var(--grn);font-style:normal}"+
"#nxGuard{position:fixed;inset:0;background:rgba(15,28,22,.6);backdrop-filter:blur(8px);z-index:300;display:flex;align-items:center;justify-content:center;padding:16px}"+
"#nxGuard .gb{background:var(--sf);border-radius:22px;padding:22px;max-width:380px;width:100%;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,.4)}"+
"#nxGuard .lock{width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--grn),var(--grn3));color:#fff;font-size:24px;display:flex;align-items:center;justify-content:center;margin:0 auto 10px}"+
"#nxGuard.bad .lock{background:linear-gradient(135deg,var(--red),#7f1d1d)}"+
"#nxGuard .dest{background:var(--sf2);border:1px dashed var(--ln);border-radius:12px;padding:8px;font-size:12px;font-family:monospace;margin:10px 0;word-break:break-all}"+
".nxPriv label{display:flex;gap:8px;align-items:flex-start;font-size:12px;color:var(--ink2);margin:8px 0}"+
".nxPriv label input{width:auto;margin-top:2px}"+
"body.nxPrivate [data-mask]{filter:blur(5px);transition:filter .2s}"+
"body.nxPrivate [data-mask]:hover{filter:none}";
document.head.appendChild(css);
function load(cb){if(window.supabase){cb();return;}var s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";s.onload=cb;document.head.appendChild(s);}
load(function(){sb=window.supabase.createClient(URL,ANON,{auth:{persistSession:true}});sb.auth.getSession().then(function(r){me=r.data.session?r.data.session.user.id:null;});refresh();});
async function refresh(){if(!sb)return;var sh=await sb.from("nx_shops").select("*").eq("owner_id",me||"").limit(1);shop=(sh.data||[])[0]||null;
 var vf=await sb.from("nx_verifications").select("*").eq("status","approved");(vf.data||[]).forEach(function(v){verified[v.wa]=true;});inject();}
function trustScore(seller){var ps=prods().filter(function(p){return p.seller===seller;});
 var rev=ps.reduce(function(a,p){return a+revs(p).length;},0);
 var del=(S.orders||[]).filter(function(o){return o.seller===seller&&o.status==="delivered";}).length;
 var score=Math.min(100,20+rev*6+del*10+(verified[ps[0]&&ps[0].swa]?30:0));return score;}
function sealFor(seller){var sc=trustScore(seller);var wa=(prods().find(function(p){return p.seller===seller;})||{}).swa;
 if(verified[wa]&&sc>=80)return '<span class="nxSeal e">👑 '+ST("elite")+"</span>";
 if(verified[wa])return '<span class="nxSeal v">🛡 '+ST("verified")+"</span>";
 if(sc>=50)return '<span class="nxSeal t">✓ '+ST("trusted")+"</span>";
 return '<span class="nxSeal n">• '+ST("newS")+"</span>";}
/* ---- Safe-Link Guard: envuelve wa() ---- */
var SAFE=["wa.me","api.whatsapp.com","chat.whatsapp.com"];
var _wa=window.wa;
window.wa=function(num,msg){
 var n=String(num||"").replace(/\D/g,"");
 var host="wa.me";var ok=SAFE.indexOf(host)>=0&&n.length>=8;
 showGuard(ok,"https://wa.me/"+n, function(){if(_wa)_wa(num,msg);else window.open("https://wa.me/"+n+"?text="+encodeURIComponent(msg),"_blank");});
};
function showGuard(ok,dest,onOpen){
 var old=document.getElementById("nxGuard");if(old)old.remove();
 var d=document.createElement("div");d.id="nxGuard";if(!ok)d.classList.add("bad");
 d.innerHTML='<div class="gb"><div class="lock">'+(ok?"🔒":"⛔")+"</div><b>"+(ok?ST("safe"):ST("blocked"))+"</b>"+
  '<p class="mut" style="font-size:12px;margin:6px 0">'+(ok?ST("safeD"):ST("blockedD"))+"</p>"+
  '<div class="dest">'+esc(dest)+"</div>"+
  (ok?'<button class="btn wa" style="width:100%" id="nxGo">💬 '+ST("open")+"</button>":"")+
  '<button class="btn gh" style="width:100%;margin-top:8px" id="nxNo">✕ '+ST("cancel")+"</button></div>";
 document.body.appendChild(d);
 d.querySelector("#nxNo").onclick=function(){d.remove();};
 if(ok)d.querySelector("#nxGo").onclick=function(){d.remove();onOpen();};
 d.addEventListener("click",function(e){if(e.target===d)d.remove();});
}
/* interceptar anchors externos no seguros */
document.addEventListener("click",function(e){
 var a=e.target.closest("a[href]");if(!a)return;var h=a.getAttribute("href")||"";
 if(/^https?:/i.test(h)){var host=(h.match(/^https?:\/\/([^\/]+)/)||[])[1]||"";
  var allowed=SAFE.some(function(s){return host.indexOf(s)>=0;})||host.indexOf("github.io")>=0||host.indexOf("is-a.dev")>=0||host.indexOf("google.com")>=0||host.indexOf("unsplash.com")>=0;
  if(!allowed){e.preventDefault();e.stopPropagation();showGuard(false,h,null);}}
},true);
/* ---- Privacy Vault ---- */
function maskOn(){document.body.classList.toggle("nxPrivate",!!S.privateMode);
 document.querySelectorAll(".ci .gw div, #pfWa, #pfEmail").forEach(function(el){el.setAttribute("data-mask","1");});}
function inject(){
 maskOn();
 var v=document.querySelector("main .view");if(!v)return;
 if(S.view==="detail"){var p=prod(S.pid);if(p&&!v.querySelector("[data-nxseal]")){
  var sc=trustScore(p.seller);
  var card=document.createElement("div");card.className="card";card.setAttribute("data-nxseal","1");
  card.innerHTML='<div class="sl"><b>🛡 '+ST("trust")+"</b>"+sealFor(p.seller)+"</div>"+
   '<div class="nxTrust"><div class="ring" style="--p:'+sc+'"><i>'+sc+"</i></div><div><div style=\"font-size:12px;font-weight:700\">"+ST("score")+'</div><div class="fnt">'+esc(p.seller)+"</div></div></div>";
  var seller=v.querySelector("[data-nxseller]");if(seller)seller.insertAdjacentElement("beforebegin",card);else v.appendChild(card);
 }}
 if(S.view==="seller"&&shop&&!v.querySelector("[data-nxver]")){
  var c=document.createElement("div");c.className="card";c.setAttribute("data-nxver","1");
  var isV=verified[shop.wa];
  c.innerHTML='<div class="sl"><b>🛡 '+ST("trust")+"</b>"+(isV?'<span class="nxSeal v">🛡 '+ST("verified")+"</span>":'<span class="nxSeal n">• '+ST("newS")+"</span>")+"</div>"+
   (isV?"":'<button class="btn grn sm" style="margin-top:8px" id="nxReqVer">'+ST("req")+"</button>");
  v.appendChild(c);
  var rq=c.querySelector("#nxReqVer");if(rq)rq.onclick=function(){sb.from("nx_verifications").insert({shop_id:shop.id,owner_id:me,shop_name:shop.name,wa:shop.wa,status:"pending"}).then(function(){toast(ST("pending"));refresh();});};
 }
 if(S.view==="settings"&&!v.querySelector("[data-nxpriv]")){
  var pc=document.createElement("div");pc.className="card nxPriv";pc.setAttribute("data-nxpriv","1");
  pc.innerHTML="<b>🔐 "+ST("priv")+"</b>"+
   '<label><input type="checkbox" id="nxConsent" '+(S.consent?"checked":"")+"> "+ST("consent")+"</label>"+
   '<label><input type="checkbox" id="nxPrivMode" '+(S.privateMode?"checked":"")+"> "+ST("private")+"</label>"+
   '<div class="row" style="margin-top:8px"><button class="btn gh sm" id="nxExp">⬇ '+ST("export")+'</button><button class="btn red sm" id="nxDel">🗑 '+ST("delete")+"</button></div>";
  v.appendChild(pc);
  pc.querySelector("#nxConsent").onchange=function(e){S.consent=e.target.checked;save();};
  pc.querySelector("#nxPrivMode").onchange=function(e){S.privateMode=e.target.checked;save();maskOn();};
  pc.querySelector("#nxExp").onclick=function(){var blob=new Blob([JSON.stringify({profile:S.profile,orders:S.orders,haggles:S.haggles,reviews:S.reviews},null,2)],{type:"application/json"});var a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="nexusshop-my-data.json";a.click();toast(ST("expDone"));};
  pc.querySelector("#nxDel").onclick=function(){if(confirm(ST("delete")+"?")){localStorage.removeItem("nx_v3");localStorage.removeItem("nx_v4");sessionStorage.clear();location.reload();}};
 }
 if(S.view==="settings"&&S.admin&&!v.querySelector("[data-nxveradmin]")){
  var ac=document.createElement("div");ac.className="card";ac.setAttribute("data-nxveradmin","1");
  ac.innerHTML="<b>🛡 "+ST("trust")+" — admin</b><div id=\"nxVerList\" style=\"margin-top:8px\"></div>";
  v.appendChild(ac);
  sb.from("nx_verifications").select("*").eq("status","pending").then(function(r){
   ac.querySelector("#nxVerList").innerHTML=(r.data||[]).map(function(x){return '<div class="sl" style="padding:6px 0;border-bottom:1px solid var(--ln)"><span>'+esc(x.shop_name)+" · "+esc(x.wa)+'</span><button class="btn grn sm" data-verapprove="'+x.id+'">✓</button></div>';}).join("")||"—";});
 }
}
document.addEventListener("click",function(e){var ap=e.target.closest("[data-verapprove]");if(ap){sb.from("nx_verifications").update({status:"approved"}).eq("id",ap.dataset.verapprove).then(function(){toast("✓");refresh();});}},true);
var _r=window.render;window.render=function(){var o=_r.apply(this,arguments);setTimeout(inject,220);return o;};
setTimeout(function(){refresh();inject();},800);
})();
