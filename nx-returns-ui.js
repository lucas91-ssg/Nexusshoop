/* nx-returns-ui.js — Returns loop AUTOMATICO para modelo vidriera: WhatsApp arregla, el sistema cuenta y bloquea solo. */
(function(){
"use strict";
var SUPABASE_URL="https://jtbxqwiyktzjdjohcyli.supabase.co";
var SUPABASE_ANON="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0Ynhxd2l5a3R6amRqb2hjeWxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ5MzY5NzIsImV4cCI6MjExMDUxMjk3Mn0.lTQDVQgJqY65_daClS0V7LvO6Kl1Pi7pyGrL5F5j-1U";
var SELLER_FLAG=3,BUYER_FLAG=2;
var sb=null,ready=false,me=null,meEmail="",role=null,sellerStats=[],buyerStats=[];
var RD={en:{returns:"Returns & reports",window:"Report within 7 days of delivery. The return is arranged directly with the seller on WhatsApp — NexusShop never holds your money.",none:"No reports yet.",open:"Report a problem",reason:"Reason",note:"Details (optional)",submit:"Send & open WhatsApp",sent:"Report sent — WhatsApp opened. Review for this order is now blocked automatically.",myReq:"Your reports",toSeller:"Sent to seller",adminQ:"Returns & reports (automatic)",sellerStats:"Seller report rate",buyerStats:"Buyer COD refusals",flagged:"AUTO-FLAGGED",noFlags:"No automatic flags right now.",auto:"Counters and flags update automatically — no manual review needed.",caution:"⚠ This seller has multiple open return reports. Check the parcel carefully before paying.",voided:"Return reported — review disabled automatically for this order.",cartWarn:"⚠ Your account has repeated COD refusals. Future orders may require seller approval.",r_damaged:"Damaged on arrival",r_defective:"Defective / not working",r_misdescribed:"Different from listing",r_refused_at_door:"Refused at door (COD)",r_other:"Other",loginFirst:"Log in (💳) so your report is counted across devices."},
ur:{returns:"واپسی اور رپورٹس",window:"ڈیلیوری کے 7 دن کے اندر رپورٹ کریں۔ واپسی براہ راست فروخت کنندہ سے واٹس ایپ پر طے ہوتی ہے — NexusShop آپ کی رقم نہیں رکھتا۔",none:"ابھی کوئی رپورٹ نہیں۔",open:"مسئلہ رپورٹ کریں",reason:"وجہ",note:"تفصیل (اختیاری)",submit:"بھیجیں اور واٹس ایپ کھولیں",sent:"رپورٹ بھیج دی گئی — واٹس ایپ کھل گیا۔ اس آرڈر کا جائزہ خودبخود بلاک۔",myReq:"آپ کی رپورٹس",toSeller:"فروخت کنندہ کو بھیجا گیا",adminQ:"واپسی اور رپورٹس (خودکار)",sellerStats:"فی فروخت کنندہ رپورٹ شرح",buyerStats:"خریدار COD انکار",flagged:"خودکار-flagged",noFlags:"ابھی کوئی خودکار فلگ نہیں۔",auto:"کاؤنٹر اور فلگ خودبخود اپڈیٹ ہوتے ہیں — دستی جائزے کی ضرورت نہیں۔",caution:"⚠ اس فروخت کنندہ کی کئی واپسی رپورٹس ہیں۔ ادائیگی سے پہلے پارسل اچھی طرح چیک کریں۔",voided:"واپسی رپورٹ شدہ — اس آرڈر کا جائزہ خودبخود غیر فعال۔",cartWarn:"⚠ آپ کے اکاؤنٹ پر بار بار COD انکار ہیں۔ اگلے آرڈرز کو فروخت کنندہ کی منظوری درکار ہو سکتی ہے۔",r_damaged:"پہنچنے پر خراب",r_defective:"خراب / کام نہیں کرتا",r_misdescribed:"لسٹنگ سے مختلف",r_refused_at_door:"دروازے پر انکار (COD)",r_other:"دیگر",loginFirst:"لاگ ان ہوں (💳) تاکہ آپ کی رپورٹ تمام ڈیوائسز پر گنی جائے۔"}};
function RT(k){return (RD[S.lang]&&RD[S.lang][k])||RD.en[k]||k;}
function loadSDK(cb){if(window.supabase){cb();return;}var s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";s.onload=cb;document.head.appendChild(s);}
loadSDK(function(){sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON);ready=true;refresh();});
async function refresh(){if(!ready)return;
 var ses=(await sb.auth.getSession()).data.session;me=ses?ses.user.id:null;meEmail=ses?(ses.user.email||""):"";role=null;sellerStats=[];buyerStats=[];
 if(me){var r=await sb.from("admin_roles").select("role").eq("user_id",me).limit(1);role=(r.data||[])[0]?r.data[0].role:null;
  if(role){var a=await Promise.all([sb.from("nx_seller_report_stats").select("*").order("reports",{ascending:false}),sb.from("nx_buyer_refusal_stats").select("*").order("refusals",{ascending:false})]);sellerStats=a[0].data||[];buyerStats=a[1].data||[];}}
 inject();}
function localReports(){if(!S.reports)S.reports=[];return S.reports;}
function reportedCodes(){var c={};localReports().forEach(function(r){c[r.code]=1;});return c;}
function sellerCount(name){var sv=sellerStats.find(function(x){return x.seller===name;});var base=sv?sv.reports:0;var loc=localReports().filter(function(r){return r.seller===name;}).length;return Math.max(base,loc);}
function myRefusals(){var bv=buyerStats.find(function(x){return x.buyer_email===meEmail;});var base=bv?bv.refusals:0;var loc=localReports().filter(function(r){return r.reason==="refused_at_door";}).length;return Math.max(base,loc);}
function deliveredUnreported(){var c=reportedCodes();return (S.orders||[]).filter(function(o){return o.status==="delivered"&&!c[o.code];});}
function ordersBlock(){
 if(!me)return `<div class="card" data-rxsec><b>📦 ${RT("returns")}</b><p class="mut">${RT("loginFirst")}</p>${rowsOrEmpty()}</div>`;
 return `<div class="card" data-rxsec style="border-color:var(--grn3)"><b>📦 ${RT("returns")}</b><p class="fnt">${RT("window")}</p>
 ${localReports().length?`<h2 class="sec">${RT("myReq")}</h2>`+localReports().map(function(r){return `<div class="row" style="justify-content:space-between"><span>🧾 ${esc(r.code)} · ${esc(RT("r_"+r.reason))}</span><span class="st placed">${RT("toSeller")}</span></div>`;}).join(""):`<p class="mut">${RT("none")}</p>`}
 ${deliveredUnreported().length?`<h2 class="sec">${RT("open")}</h2>`+deliveredUnreported().map(function(o){return `<div class="row" style="justify-content:space-between"><span>${esc(o.code)} · ${esc(o.seller)} · ${money(o.total)}</span><button class="btn gold sm" data-rx="open" data-id="${esc(o.code)}" data-amt="${o.total}" data-seller="${esc(o.seller)}" data-wa="${esc(o.swa)}">📦 ${RT("open")}</button></div>`;}).join(""):""}
 </div>`;
 function rowsOrEmpty(){return deliveredUnreported().length?deliveredUnreported().map(function(o){return `<div class="row" style="justify-content:space-between"><span>${esc(o.code)} · ${esc(o.seller)}</span><button class="btn gold sm" data-rx="open" data-id="${esc(o.code)}" data-amt="${o.total}" data-seller="${esc(o.seller)}" data-wa="${esc(o.swa)}">📦 ${RT("open")}</button></div>`;}).join(""):`<p class="mut">${RT("none")}</p>`;}}
function formOv(code,seller,amt,wanum){return `<div class="modal" data-rxov><div class="box" style="max-width:400px"><b>📦 ${RT("open")} · ${esc(code)}</b>
<label>${RT("reason")}</label><select id="rxReason">${["damaged","defective","misdescribed","refused_at_door","other"].map(function(k){return `<option value="${k}">${RT("r_"+k)}</option>`;}).join("")}</select>
<label>${RT("note")}</label><textarea id="rxNote" rows="2"></textarea>
<div class="row" style="margin-top:10px"><button class="btn wa" data-rx="submit" data-id="${esc(code)}" data-amt="${amt}" data-seller="${esc(seller)}" data-wa="${esc(wanum)}">💬 ${RT("submit")}</button><button class="btn gh" data-rx="close">✕</button></div>
<p class="fnt" style="margin-top:8px">${RT("window")}</p></div></div>`;}
function adminOv(){return `<div class="modal" data-rxov style="z-index:150"><div class="box" style="max-width:720px">
 <div class="sl"><b>📦 ${RT("adminQ")}</b><button class="btn gh sm" data-rx="close">✕</button></div>
 <p class="fnt" style="margin:8px 0">${RT("auto")}</p>
 <h2 class="sec">${RT("sellerStats")}</h2>
 ${sellerStats.length?`<table class="nxt"><tr><th>Seller</th><th>Reports</th><th>Misdescribed</th><th>Refused</th><th></th></tr>${sellerStats.map(function(s){return `<tr><td><b>${esc(s.seller)}</b></td><td>${s.reports}</td><td>${s.misdescribed}</td><td>${s.refused}</td><td>${s.reports>=SELLER_FLAG?`<span class="st paused">${RT("flagged")}</span>`:""}</td></tr>`;}).join("")}</table>`:`<p class="mut">${RT("noFlags")}</p>`}
 <h2 class="sec">${RT("buyerStats")}</h2>
 ${buyerStats.length?`<table class="nxt"><tr><th>Buyer</th><th>Refusals</th><th></th></tr>${buyerStats.map(function(b){return `<tr><td>${esc(b.buyer_email)}</td><td>${b.refusals}</td><td>${b.refusals>=BUYER_FLAG?`<span class="st paused">${RT("flagged")}</span>`:""}</td></tr>`;}).join("")}</table>`:`<p class="mut">${RT("noFlags")}</p>`}
 </div></div>`;}
function inject(){document.querySelectorAll("[data-rxsec]").forEach(function(e){e.remove();});
 if(S.view==="orders"){var v=document.querySelector("main .view");if(v)v.insertAdjacentHTML("beforeend",ordersBlock());}
 if(S.view==="cart"&&myRefusals()>=BUYER_FLAG){var c2=document.querySelector("main .view");if(c2)c2.insertAdjacentHTML("afterbegin",`<div class="card" data-rxsec style="border-color:var(--red);background:var(--redbg)"><b>${RT("cartWarn")}</b></div>`);}
 if(S.view==="detail"){var p=prod(S.pid);
  if(p&&sellerCount(p.seller)>=SELLER_FLAG){var hs=document.querySelectorAll("h2.sec");for(var i=0;i<hs.length;i++){if(hs[i].textContent.indexOf(t("reviews"))>=0){hs[i].insertAdjacentHTML("beforebegin",`<div class="card" data-rxsec style="border-color:var(--gold);background:var(--goldbg)"><b>${RT("caution")}</b></div>`);break;}}}
  var codes=reportedCodes();var hit=(S.orders||[]).some(function(o){return o.status==="delivered"&&codes[o.code]&&o.items.some(function(it){return it.id===S.pid;});});
  if(hit){var b=document.querySelector('[data-a="revSubmit"]');if(b){b.disabled=true;b.insertAdjacentHTML("afterend",`<p class="fnt" style="color:var(--red);margin-top:6px">⚠ ${RT("voided")}</p>`);}}}
 if(S.view==="account"&&role&&!document.querySelector("[data-rxmenu]")){var m=document.querySelector(".menu");if(m)m.insertAdjacentHTML("afterbegin",`<div class="menu" data-rxmenu style="margin:0 0 8px"><button data-rx="admin">📦 ${RT("adminQ")}<span>›</span></button></div>`);}}
document.addEventListener("click",function(e){var el=e.target.closest("[data-rx]");if(!el)return;var a=el.dataset.rx,id=el.dataset.id;
 if(a==="open"){document.body.insertAdjacentHTML("beforeend",formOv(id,el.dataset.seller,Number(el.dataset.amt)||0,el.dataset.wa));}
 if(a==="close"){document.querySelectorAll("[data-rxov]").forEach(function(o){o.remove();});}
 if(a==="admin"){if(!document.querySelector("[data-rxov]"))document.body.insertAdjacentHTML("beforeend",adminOv());}
 if(a==="submit"){var reason=document.getElementById("rxReason").value,note=document.getElementById("rxNote").value;
  var msg=(S.lang==="ur"?"السلام علیکم! آرڈر ":"Assalam o Alaikum! Order ")+id+" ("+money(Number(el.dataset.amt)||0)+(S.lang==="ur"?) میں مسئلہ: ":" ) has an issue: ")+RT("r_"+reason)+(note?". "+note:"")+(S.lang==="ur"?"۔ براہ کرم واپسی کا انتظام کریں۔ — NexusShop":". I would like to arrange a return directly with you. — via NexusShop");
  localReports().unshift({code:id,seller:el.dataset.seller,reason:reason,note:note,ts:Date.now()});save();
  wa(el.dataset.wa,msg);
  if(me&&ready){sb.from("return_reports").insert({buyer_id:me,buyer_email:meEmail,order_code:id,seller:el.dataset.seller,amount_pkr:Number(el.dataset.amt)||0,reason:reason,note:note}).then(function(){refresh();});}
  document.querySelectorAll("[data-rxov]").forEach(function(o){o.remove();});
  toast(RT("sent"));render();}
});
var _r3=window.render;window.render=function(){var out=_r3.apply(this,arguments);setTimeout(inject,170);return out;};
setTimeout(inject,750);
})();
