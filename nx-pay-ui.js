/* nx-pay-ui.js — módulo OFICIAL de pagos dentro de la plataforma (Supabase). Único módulo cargado por index.html. */
(function(){
"use strict";
var SUPABASE_URL="https://jtbxqwiyktzjdjohcyli.supabase.co";
var SUPABASE_ANON="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0Ynhxd2l5a3R6amRqb2hjeWxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ5MzY5NzIsImV4cCI6MjExMDUxMjk3Mn0.lTQDVQgJqY65_daClS0V7LvO6Kl1Pi7pyGrL5F5j-1U";
var sb=null,ready=false,session=null,role=null,shop=null,plans=[],rail=null,orders=[],sub=null,invs=[],stats=null,queue=[],conf=[],audit=[],lastSet=null,lastSetPer="";
var PD={en:{paySec:"Subscriptions & payments (secure)",connecting:"Connecting to payment backend…",payIntro:"Manage your plan, pay by bank transfer and track verification — inside the app.",login:"Log in",signup:"Create account",email:"Email",pass:"Password",createShop:"Create your shop",shopName:"Shop name",city:"City",wa:"WhatsApp",mySub:"My subscription",plan:"Plan",expires:"Expires",noSub:"No active subscription",choosePlan:"Choose plan",method:"Payment method",createOrder:"Create payment order",openOrders:"My payments",none:"No payments yet",instructions:"Payment instructions",amount:"Amount",ref:"Reference",bank:"Bank",title:"Account title",iban:"IBAN / account",deadline:"Pay before",tid:"Transaction ID (TID)",receipt:"Receipt photo (optional)",submit:"Submit for verification",warn:"A TID or screenshot is not proof of payment. Activation only after bank verification.",invoices:"Invoices",print:"Print",admin:"Admin financial control",queue:"Verification queue",approve:"Approve",reject:"Reject",note:"Note",dup:"DUPLICATE TID",confirmed:"Confirmed payments",refund:"Refund",reason:"Reason",settlement:"Monthly settlement",month:"Month",rate:"EUR rate (PKR to EUR)",generate:"Generate",csv:"Download CSV",printPdf:"Print / PDF",record:"Record in ledger",audit:"Audit log",copy:"Copy",copied:"Copied",goPay:"Payments & subscription",checkMail:"Check your email to confirm."},
ur:{paySec:"سبسکرپشن اور ادائیگیاں (محفوظ)",connecting:"پیمنٹ بیک اینڈ سے جڑ رہا ہے…",payIntro:"پلان کا انتظام، بینک ٹرانسفر سے ادائیگی اور تصدیق کی ٹریکنگ — ایپ کے اندر۔",login:"لاگ ان",signup:"اکاؤنٹ بنائیں",email:"ای میل",pass:"پاس ورڈ",createShop:"اپنی دکان بنائیں",shopName:"دکان کا نام",city:"شہر",wa:"واٹس ایپ",mySub:"میری سبسکرپشن",plan:"پلان",expires:"میعاد",noSub:"کوئی فعال سبسکرپشن نہیں",choosePlan:"پلان چنیں",method:"ادائیگی کا طریقہ",createOrder:"پے آرڈر بنائیں",openOrders:"میری ادائیگیاں",none:"ابھی کوئی ادائیگی نہیں",instructions:"ادائیگی ہدایات",amount:"رقم",ref:"حوالہ",bank:"بینک",title:"اکاؤنٹ ٹائٹل",iban:"IBAN / اکاؤنٹ",deadline:"ادائیگی کی آخری تاریخ",tid:"ٹرانزیکشن ID (TID)",receipt:"رسید فوٹو (اختیاری)",submit:"تصدیق کے لیے بھیجیں",warn:"TID یا اسکرین شاٹ ثبوت نہیں۔ بینک تصدیق کے بعد ہی ایکٹیویشن۔",invoices:"رسیدیں",print:"پرنٹ",admin:"ایڈمن مالی کنٹرول",queue:"تصدیق قطار",approve:"منظور",reject:"مسترد",note:"نوٹ",dup:"نقلی TID",confirmed:"تصدیق شدہ ادائیگیاں",refund:"واپسی",reason:"وجہ",settlement:"ماہانہ تصفیہ",month:"مہینہ",rate:"EUR ریٹ",generate:"تیار کریں",csv:"CSV ڈاؤن لوڈ",printPdf:"پرنٹ / PDF",record:"ledger میں درج",audit:"آڈٹ لاگ",copy:"کاپی",copied:"کاپی ہو گیا",goPay:"ادائیگیاں اور سبسکرپشن",checkMail:"تصدیق کے لیے اپنا ای میل دیکھیں۔"}};
function PT(k){return (PD[S.lang]&&PD[S.lang][k])||PD.en[k]||k;}
function st_(s){return s==="confirmed"?"delivered":(s==="rejected"?"paused":"placed");}
var st=document.createElement("style");st.textContent="table.nxt{width:100%;border-collapse:collapse;font-size:12px}table.nxt td,table.nxt th{padding:6px 4px;border-bottom:1px solid var(--ln);text-align:start;vertical-align:top}";document.head.appendChild(st);
function loadSDK(cb){if(window.supabase){cb();return;}var s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";s.onload=cb;document.head.appendChild(s);}
loadSDK(function(){sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON);ready=true;refresh();});
async function refresh(){if(!ready)return;
 session=(await sb.auth.getSession()).data.session;role=null;shop=null;
 if(session){var r=await sb.from("admin_roles").select("role").eq("user_id",session.user.id).limit(1);role=(r.data||[])[0]?r.data[0].role:null;
  var sh=await sb.from("nx_shops").select("*").eq("owner_id",session.user.id).limit(1);shop=(sh.data||[])[0]||null;
  if(shop){var A=await Promise.all([sb.from("plans").select("*").eq("active",true).order("price_pkr"),sb.from("rail_config").select("*").limit(1),sb.from("payment_orders").select("*").eq("shop_id",shop.id).order("created_at",{ascending:false}).limit(8),sb.from("subscriptions").select("*").eq("shop_id",shop.id).in("status",["active","past_due"]).limit(1),sb.from("invoices").select("*,payment_orders(ref,status,plan_code)").order("issued_at",{ascending:false}).limit(8)]);
   plans=A[0].data||[];rail=(A[1].data||[])[0]||null;orders=A[2].data||[];sub=(A[3].data||[])[0]||null;invs=A[4].data||[];}
  if(role){var B=await Promise.all([sb.rpc("nx_admin_stats"),sb.from("payment_orders").select("*,nx_shops(name,city)").eq("status","under_review").order("created_at"),sb.from("payment_orders").select("*,invoices(number),nx_shops(name)").eq("status","confirmed").order("reviewed_at",{ascending:false}).limit(15),sb.from("audit_log").select("*").order("created_at",{ascending:false}).limit(20)]);
   stats=B[0].data||{};queue=B[1].data||[];conf=B[2].data||[];audit=B[3].data||[];}}
 injectView();}
function instrBlock(o){return `<div class="tc" style="margin-top:10px"><b>${PT("instructions")} · ${esc(o.ref)}</b>
<div class="row"><span>${PT("amount")}</span><b>${money(o.amount_pkr)}</b></div>
<div class="row"><span>${PT("bank")}</span><b>${esc(rail?rail.bank_name:"—")}</b></div>
<div class="row"><span>${PT("title")}</span><b>${esc(rail?rail.account_title:"—")}</b></div>
<div class="row"><span>${PT("iban")}</span><span><b>${esc(rail?rail.iban:"—")}</b> <button class="btn gh sm" data-nx="copy" data-id="iban">${PT("copy")}</button></span></div>
<div class="row"><span>${PT("deadline")}</span><b>${new Date(o.expires_at).toLocaleString()}</b></div>
<p class="mut">${esc(S.lang==="ur"?(rail?rail.instructions_ur:""):(rail?rail.instructions_en:""))}</p>
<p class="fnt" style="color:var(--red)">${PT("warn")}</p>
<label>${PT("tid")}</label><input id="nxTid"><label>${PT("receipt")}</label><input id="nxRc" type="file" accept="image/*">
<button class="btn wa" data-nx="submit" data-id="${o.id}">${PT("submit")}</button><div class="fnt" id="nxSubE" style="color:var(--red)"></div></div>`;}
function sellerCard(){
 if(!ready)return `<div class="card" data-nxsec-view><b>${PT("paySec")}</b><p class="mut">${PT("connecting")}</p></div>`;
 if(!session)return `<div class="card" data-nxsec-view><b>${PT("paySec")}</b><p class="mut">${PT("payIntro")}</p><button class="btn grn" data-nx="login">${PT("login")}</button></div>`;
 if(!shop)return `<div class="card" data-nxsec-view><b>${PT("createShop")}</b><label>${PT("shopName")}</label><input id="nxShN"><label>${PT("city")}</label><input id="nxShC"><label>${PT("wa")}</label><input id="nxShW" placeholder="+92..."><button class="btn grn" data-nx="shop">${PT("createShop")}</button><div class="fnt" id="nxShE" style="color:var(--red)"></div></div>`;
 var aw=orders.filter(function(o){return o.status==="awaiting_payment";});
 return `<div class="card" data-nxsec-view><b>${PT("mySub")}</b>
 ${sub?`<div class="row"><span>${PT("plan")}</span><b>${esc(sub.plan_code.toUpperCase())}</b></div><div class="row"><span>${PT("expires")}</span><b>${new Date(sub.expires_at).toLocaleDateString()}</b></div>`:`<p class="mut">${PT("noSub")}</p>`}
 <label>${PT("choosePlan")}</label><select id="nxPlan">${plans.filter(p=>p.price_pkr>0).map(p=>`<option value="${esc(p.code)}">${esc(p.name_en)} — ${money(p.price_pkr)}/mo</option>`).join("")}</select>
 <label>${PT("method")}</label><select id="nxMethod">${((rail&&rail.active_methods)||["bank_transfer"]).map(m=>`<option value="${m}">${m}</option>`).join("")}</select>
 <button class="btn grn" data-nx="order">${PT("createOrder")}</button><div class="fnt" id="nxOrderErr" style="color:var(--red)"></div>
 ${aw.length?instrBlock(aw[0]):""}
 <h2 class="sec">${PT("openOrders")}</h2>
 ${orders.length?orders.map(o=>`<div class="row"><span>${esc(o.ref)} · ${esc(o.plan_code)} · ${money(o.amount_pkr)}</span><span class="st ${st_(o.status)}">${o.status}</span></div>${o.review_note?`<p class="fnt">${PT("note")}: ${esc(o.review_note)}</p>`:""}`).join(""):`<p class="mut">${PT("none")}</p>`}
 <h2 class="sec">${PT("invoices")}</h2>
 ${invs.length?invs.map(i=>`<div class="row"><span>${esc(i.number)} · ${esc(i.kind)}</span><button class="btn gh sm" data-nx="inv" data-id="${i.id}">${PT("print")}</button></div>`).join(""):`<p class="mut">—</p>`}</div>`;}
function adminOv(){var dups=stats.dup_tids||[];
 return `<div class="modal" data-nxov style="z-index:150"><div class="box" style="max-width:780px">
 <div class="sl"><b>🛡️ ${PT("admin")}</b><button class="btn gh sm" data-nx="close">✕</button></div>
 <div class="row" style="margin:10px 0"><span class="st placed">${PT("queue")}: ${stats.under_review||0}</span><span class="st">${PT("confirmed")}: ${stats.confirmed||0}</span><span class="st delivered">MRR: ${money(stats.mrr_pkr||0)}</span><span class="st">${PT("openOrders")}: ${stats.shops||0} shops</span></div>
 <h2 class="sec">${PT("queue")}</h2>
 ${queue.length?`<table class="nxt"><tr><th>Ref</th><th>Shop</th><th>Amount</th><th>TID</th><th></th></tr>${queue.map(o=>`<tr><td><b>${esc(o.ref)}</b><br><span class="fnt">${esc(o.plan_code)} · ${esc(o.method)}</span></td><td>${esc(o.nx_shops?o.nx_shops.name:"")}</td><td>${money(o.amount_pkr)}</td><td>${esc(o.tid)} ${dups.indexOf(o.tid)>=0?`<span class="off" style="position:static">${PT("dup")}</span>`:""}</td><td><button class="btn grn sm" data-nx="approve" data-id="${o.id}">${PT("approve")}</button> <button class="btn red sm" data-nx="reject" data-id="${o.id}">${PT("reject")}</button></td></tr>`).join("")}</table>`:`<p class="mut">—</p>`}
 <h2 class="sec">${PT("confirmed")}</h2>
 ${conf.length?`<table class="nxt"><tr><th>Ref</th><th>Shop</th><th>Amount</th><th>Invoice</th><th></th></tr>${conf.map(o=>`<tr><td>${esc(o.ref)}</td><td>${esc(o.nx_shops?o.nx_shops.name:"")}</td><td>${money(o.amount_pkr)}</td><td>${esc(o.invoices?o.invoices.number:"—")}</td><td><button class="btn gold sm" data-nx="refund" data-id="${o.id}">${PT("refund")}</button></td></tr>`).join("")}</table>`:`<p class="mut">—</p>`}
 <h2 class="sec">${PT("settlement")}</h2>
 <div class="row"><input type="month" id="nxPer" value="${new Date().toISOString().slice(0,7)}" style="max-width:170px"><input id="nxRate" type="number" step="0.0001" value="0.0033" style="max-width:110px"><button class="btn" data-nx="gen">${PT("generate")}</button></div>
 <div id="nxSetBox"></div>
 <h2 class="sec">${PT("audit")}</h2>
 <table class="nxt"><tr><th>When</th><th>Action</th><th>Entity</th></tr>${audit.map(a=>`<tr><td class="fnt">${new Date(a.created_at).toLocaleString()}</td><td><b>${esc(a.action)}</b></td><td class="fnt">${esc(a.entity)} ${esc(a.entity_id||"").slice(0,8)}</td></tr>`).join("")}</table>
 </div></div>`;}
function authOv(){return `<div class="modal" data-nxov><div class="box" style="max-width:380px"><b>${PT("login")}</b>
<label>${PT("email")}</label><input id="nxEm" type="email"><label>${PT("pass")}</label><input id="nxPw" type="password">
<button class="btn grn" data-nx="authLogin">${PT("login")}</button><button class="btn gh" data-nx="authSignup">${PT("signup")}</button>
<div class="fnt" id="nxAuthE" style="color:var(--red)"></div>
<button class="btn gh sm" data-nx="closeAuth" style="margin-top:10px">✕</button></div></div>`;}
function injectView(){document.querySelectorAll("[data-nxsec-view]").forEach(function(e){e.remove();});
 var menu=document.querySelector("[data-nxmenu]");if(menu)menu.remove();
 if(S.view==="seller"){var v=document.querySelector("main .view");if(v)v.insertAdjacentHTML("beforeend",sellerCard());}
 if(S.view==="account"){var m=document.querySelector(".menu");if(m)m.insertAdjacentHTML("afterbegin",`<div class="menu" data-nxmenu style="margin:0 0 8px"><button data-nx="goseller">💳 ${PT("goPay")}<span>›</span></button>${role?`<button data-nx="admin">🛡️ ${PT("admin")}<span>›</span></button>`:""}</div>`);}}
function printDoc(html){var w=window.open("","_blank");if(!w)return;w.document.write(html);w.document.close();setTimeout(function(){try{w.print();}catch(e){}},400);}
function invHtml(i){var o=i.payment_orders||{};return `<html><head><title>${esc(i.number)}</title><style>body{font-family:Georgia,serif;padding:32px;color:#222}h1{font-size:22px}table{width:100%;border-collapse:collapse;margin-top:16px}td{padding:8px;border-bottom:1px solid #ddd;font-size:14px}</style></head><body><h1>NexusShop — ${i.kind==="receipt"?"PAYMENT RECEIPT":"PROFORMA (not a receipt)"}</h1><table><tr><td>Invoice</td><td><b>${esc(i.number)}</b></td></tr><tr><td>Order ref</td><td>${esc(o.ref||"")}</td></tr><tr><td>Plan</td><td>${esc(o.plan_code||"")}</td></tr><tr><td>Amount</td><td><b>${money(i.amount_pkr)} PKR</b></td></tr><tr><td>Issued</td><td>${new Date(i.issued_at).toLocaleString()}</td></tr><tr><td>Status</td><td>${esc(o.status||"")}</td></tr></table><p style="margin-top:20px;font-size:12px;color:#666">NexusShop · Lahore, Pakistan · neuralfocusai@gmail.com</p></body></html>`;}
document.addEventListener("click",function(e){var el=e.target.closest("[data-nx]");if(!el)return;var a=el.dataset.nx,id=el.dataset.id;
 if(a==="login"){document.body.insertAdjacentHTML("beforeend",authOv());}
 if(a==="closeAuth"||a==="close"){document.querySelectorAll("[data-nxov]").forEach(function(o){o.remove();});}
 if(a==="authLogin"){sb.auth.signInWithPassword({email:document.getElementById("nxEm").value,password:document.getElementById("nxPw").value}).then(function(r){if(r.error)document.getElementById("nxAuthE").textContent=r.error.message;else{document.querySelectorAll("[data-nxov]").forEach(function(o){o.remove();});refresh();}});}
 if(a==="authSignup"){sb.auth.signUp({email:document.getElementById("nxEm").value,password:document.getElementById("nxPw").value}).then(function(r){if(r.error)document.getElementById("nxAuthE").textContent=r.error.message;else if(!r.data.session)document.getElementById("nxAuthE").textContent=PT("checkMail");else{document.querySelectorAll("[data-nxov]").forEach(function(o){o.remove();});refresh();}});}
 if(a==="goseller"){S.view="seller";save();render();}
 if(a==="admin"){if(!document.querySelector("[data-nxov]"))document.body.insertAdjacentHTML("beforeend",adminOv());}
 if(a==="shop"){sb.from("nx_shops").insert({owner_id:session.user.id,name:document.getElementById("nxShN").value,city:document.getElementById("nxShC").value,wa:document.getElementById("nxShW").value}).select().then(function(r){if(r.error)document.getElementById("nxShE").textContent=r.error.message;else refresh();});}
 if(a==="order"){sb.rpc("nx_create_payment_order",{p_plan_code:document.getElementById("nxPlan").value,p_method:document.getElementById("nxMethod").value}).then(function(r){if(r.error)document.getElementById("nxOrderErr").textContent=r.error.message;else refresh();});}
 if(a==="copy"){var v=(id==="iban"&&rail)?rail.iban:(rail?rail.account_number||rail.iban:"");if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(v).then(function(){toast(PT("copied"));});else{var ta=document.createElement("textarea");ta.value=v;document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove();toast(PT("copied"));}}
 if(a==="submit"){var tid=document.getElementById("nxTid").value;var fi=document.getElementById("nxRc").files[0];var err=document.getElementById("nxSubE");
  var send=function(path){sb.rpc("nx_submit_payment",{p_order_id:id,p_tid:tid,p_receipt_url:path}).then(function(r){if(r.error)err.textContent=r.error.message;else refresh();});};
  if(!tid){err.textContent=PT("tid");return;}
  if(fi){sb.storage.from("receipts").upload(id+"/"+Date.now()+"_"+fi.name,fi).then(function(u){if(u.error){err.textContent=u.error.message;return;}send(u.data.path);});}else send(null);}
 if(a==="inv"){var i=invs.find(function(x){return x.id===id;});if(i)printDoc(invHtml(i));}
 if(a==="approve"){var note=prompt(PT("note"),"")||"";sb.rpc("nx_approve_payment",{p_order_id:id,p_note:note}).then(function(r){if(r.error)alert(r.error.message);else refresh();});}
 if(a==="reject"){var n2="";while(!n2.trim())n2=prompt(PT("note"))||"";sb.rpc("nx_reject_payment",{p_order_id:id,p_note:n2}).then(function(r){if(r.error)alert(r.error.message);else refresh();});}
 if(a==="refund"){var amt=prompt(PT("amount"),"2500");if(amt===null)return;var rs="";while(!rs.trim())rs=prompt(PT("reason"))||"";sb.rpc("nx_create_refund",{p_order_id:id,p_amount_pkr:Number(amt),p_reason:rs}).then(function(r){if(r.error)alert(r.error.message);else refresh();});}
 if(a==="gen"){var per=document.getElementById("nxPer").value;var from=per+"-01T00:00:00Z";var to=per+"-31T23:59:59Z";
  sb.from("payment_orders").select("amount_pkr,plan_code,ref,reviewed_at,nx_shops(name)").eq("status","confirmed").gte("reviewed_at",from).lte("reviewed_at",to).then(function(r){
   lastSet=r.data||[];lastSetPer=per;var total=lastSet.reduce(function(a,b){return a+b.amount_pkr;},0);var by={};lastSet.forEach(function(x){by[x.plan_code]=(by[x.plan_code]||0)+1;});
   document.getElementById("nxSetBox").innerHTML=`<table class="nxt"><tr><th>${PT("month")}</th><th>Orders</th><th>Total</th><th>Plans</th></tr><tr><td><b>${per}</b></td><td>${lastSet.length}</td><td><b>${money(total)}</b></td><td>${Object.keys(by).map(k=>k+"×"+by[k]).join(", ")||"—"}</td></tr></table><div class="row" style="margin-top:8px"><button class="btn gh sm" data-nx="csv">${PT("csv")}</button><button class="btn gh sm" data-nx="printset">${PT("printPdf")}</button><button class="btn grn sm" data-nx="record">${PT("record")}</button></div>`;});}
 if(a==="csv"&&lastSet){var csv="ref,shop,plan,amount_pkr,reviewed_at\n"+lastSet.map(x=>x.ref+",'"+(x.nx_shops?x.nx_shops.name:"")+"',"+x.plan_code+","+x.amount_pkr+","+x.reviewed_at).join("\n");var a2=document.createElement("a");a2.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a2.download="nexusshop-settlement-"+lastSetPer+".csv";a2.click();}
 if(a==="printset"&&lastSet){var tot=lastSet.reduce(function(a,b){return a+b.amount_pkr;},0);printDoc(`<html><head><title>Settlement ${lastSetPer}</title></head><body style="font-family:Georgia,serif;padding:32px"><h2>NexusShop — Settlement ${lastSetPer}</h2><p>Orders: ${lastSet.length} · Total: ${money(tot)} PKR</p><table border="1" cellpadding="6" style="border-collapse:collapse;width:100%"><tr><th>Ref</th><th>Shop</th><th>Plan</th><th>PKR</th></tr>${lastSet.map(x=>`<tr><td>${x.ref}</td><td>${esc(x.nx_shops?x.nx_shops.name:"")}</td><td>${x.plan_code}</td><td>${x.amount_pkr}</td></tr>`).join("")}</table><p style="margin-top:16px;font-size:12px">Generated ${new Date().toLocaleString()} · basis for invoice · payout: Takenos EUR IBAN (Malta)</p></body></html>`);}
 if(a==="record"&&lastSet){var t2=lastSet.reduce(function(a,b){return a+b.amount_pkr;},0);var rate=Number(document.getElementById("nxRate").value)||0.0033;var eur=Math.round(t2*rate*100)/100;
  sb.rpc("nx_record_settlement",{p_period:lastSetPer,p_amount_pkr:t2,p_amount_eur:eur,p_rate:rate,p_invoice:"NX-SET-"+lastSetPer,p_destination:"Takenos EUR IBAN (Malta)"}).then(function(r){if(r.error)alert(r.error.message);else{toast("Settlement recorded: "+eur+" EUR");refresh();document.body.insertAdjacentHTML("beforeend",adminOv());}});}
});
var _r=window.render;window.render=function(){var out=_r.apply(this,arguments);setTimeout(injectView,140);return out;};
})();
