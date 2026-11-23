/* nx-raahnuma.js — Raahnuma Concierge: voz + NLU natural + acciones reales, bilingüe EN/اردو */
(function(){
"use strict";
if(window.__nxRaah)return;window.__nxRaah=true;
var muted=localStorage.getItem("nx_mute")==="1";var AC=null;
function beep(f,d,t,g){if(muted)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();var o=AC.createOscillator(),gn=AC.createGain();o.type=t||"sine";o.frequency.value=f;gn.gain.value=g||0.035;o.connect(gn);gn.connect(AC.destination);o.start();gn.gain.exponentialRampToValueAtTime(0.0001,AC.currentTime+(d||0.12));o.stop(AC.currentTime+(d||0.12)+0.03);}catch(e){}}
window.NXSound={beep:beep,muted:function(){return muted;},toggle:function(){muted=!muted;localStorage.setItem("nx_mute",muted?"1":"0");return muted;}};
var css=document.createElement("style");css.textContent=
"#raahFab,#raah{display:none!important}"+
".rc-fab{position:fixed;inset-inline-end:16px;bottom:88px;z-index:118;width:60px;height:60px;border-radius:50%;border:none;cursor:pointer;background:conic-gradient(from 210deg,#1d5c3f,#4c8b6a,#8a6d1f,#1d5c3f);box-shadow:0 10px 30px rgba(29,92,63,.4);display:flex;align-items:center;justify-content:center;font-size:26px;color:#fff}"+
".rc-fab:before{content:'';position:absolute;inset:-6px;border-radius:50%;border:2px solid rgba(76,139,106,.5);animation:rcping 2.2s ease-out infinite}"+
"@keyframes rcping{0%{transform:scale(.8);opacity:.9}100%{transform:scale(1.5);opacity:0}}"+
".rc-scrim{position:fixed;inset:0;z-index:140;background:rgba(20,17,12,.55);backdrop-filter:blur(6px);display:none;align-items:flex-end;justify-content:center}"+
".rc-scrim.on{display:flex}"+
".rc-panel{width:100%;max-width:520px;height:min(88vh,760px);background:linear-gradient(180deg,#fbf8ef,#f6f1e4);border-radius:24px 24px 0 0;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 -20px 60px rgba(0,0,0,.35);animation:rcup .32s cubic-bezier(.2,.9,.25,1)}"+
"@media(min-width:640px){.rc-scrim.on{align-items:center}.rc-panel{border-radius:24px;height:min(82vh,720px)}}"+
"@keyframes rcup{from{transform:translateY(40px);opacity:0}to{transform:none;opacity:1}}"+
".rc-hd{display:flex;align-items:center;gap:12px;padding:14px 16px;background:linear-gradient(120deg,#1d5c3f,#2f6b4f 60%,#4c8b6a);color:#fff}"+
".rc-orb{width:42px;height:42px;border-radius:50%;background:radial-gradient(circle at 32% 30%,#dcead9,#4c8b6a 45%,#1d5c3f);box-shadow:0 0 0 3px rgba(255,255,255,.18),0 0 18px rgba(220,234,217,.6);animation:rcorb 4s ease-in-out infinite}"+
"@keyframes rcorb{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}"+
".rc-hd b{font-family:Georgia,serif;font-size:18px;display:block}.rc-hd span{font-size:11px;color:#dcead9}"+
".rc-hd .sp{flex:1}.rc-ic{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.25);color:#fff;border-radius:999px;width:36px;height:36px;cursor:pointer;font-size:15px}"+
".rc-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;scrollbar-width:thin;scrollbar-color:#4c8b6a #efe8d9}"+
".rc-msgs::-webkit-scrollbar{width:8px}.rc-msgs::-webkit-scrollbar-track{background:#efe8d9}.rc-msgs::-webkit-scrollbar-thumb{background:#4c8b6a;border-radius:8px}.rc-msgs::-webkit-scrollbar-thumb:hover{background:#1d5c3f}"+
".rc-m{max-width:86%;padding:11px 14px;border-radius:16px;font-size:13.5px;line-height:1.55;white-space:pre-line;animation:rcin .25s ease}"+
"@keyframes rcin{from{transform:translateY(8px);opacity:0}to{transform:none;opacity:1}}"+
".rc-m.u{align-self:flex-end;background:linear-gradient(135deg,#1d5c3f,#2f6b4f);color:#fff;border-end-end-radius:4px}"+
".rc-m.a{align-self:flex-start;background:#fff;border:1px solid #d9d0bb;color:#26221b;border-end-start-radius:4px;box-shadow:0 2px 10px rgba(38,34,27,.06)}"+
".rc-m.a .caret{display:inline-block;width:7px;height:14px;background:#4c8b6a;vertical-align:-2px;animation:rcblink .8s steps(1) infinite}"+
"@keyframes rcblink{50%{opacity:0}}"+
".rc-typ{display:inline-flex;gap:5px;padding:4px 2px}.rc-typ i{width:7px;height:7px;border-radius:50%;background:#8a8172;animation:rcb 1s infinite}.rc-typ i:nth-child(2){animation-delay:.18s}.rc-typ i:nth-child(3){animation-delay:.36s}@keyframes rcb{50%{opacity:.25;transform:translateY(-3px)}}"+
".rc-cards{display:flex;flex-direction:column;gap:8px;align-self:stretch}"+
".rc-pc{display:flex;gap:10px;align-items:center;background:#fff;border:1px solid #d9d0bb;border-radius:14px;padding:8px;box-shadow:0 2px 8px rgba(38,34,27,.06)}"+
".rc-pc img{width:52px;height:52px;border-radius:10px;object-fit:cover;background:#efe8d9}.rc-pc .g{flex:1;min-width:0}.rc-pc .g b{font-size:12.5px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.rc-pc .g span{color:#1d5c3f;font-weight:800;font-size:13px}"+
".rc-pc button{background:#1d5c3f;color:#fff;border:none;border-radius:10px;padding:8px 10px;font-size:11.5px;font-weight:700;cursor:pointer}"+
".rc-oc{background:#fff;border:1px solid #d9d0bb;border-radius:14px;padding:12px}.rc-oc b{font-family:Georgia,serif;letter-spacing:1px}.rc-oc .st{display:inline-block;margin-top:4px;background:#f3e8c8;color:#8a6d1f;border-radius:999px;padding:3px 10px;font-size:11px}"+
".rc-chips{display:flex;gap:8px;flex-wrap:wrap;padding:0 16px 10px}"+
".rc-chip{background:#fff;border:1px solid #4c8b6a;color:#1d5c3f;border-radius:999px;padding:7px 13px;font-size:12px;font-weight:600;cursor:pointer;transition:all .15s}.rc-chip:hover{background:#dcead9}"+
".rc-ft{display:flex;gap:8px;align-items:center;padding:12px 16px calc(12px + env(safe-area-inset-bottom));border-top:1px solid #d9d0bb;background:#fbf8ef}"+
".rc-in{flex:1;border:1px solid #d9d0bb;border-radius:999px;padding:11px 16px;font-size:14px;background:#fff;color:#26221b;outline:none}.rc-in:focus{border-color:#4c8b6a;box-shadow:0 0 0 3px rgba(76,139,106,.18)}"+
".rc-mic,.rc-send{width:44px;height:44px;border-radius:50%;border:none;cursor:pointer;font-size:17px;display:flex;align-items:center;justify-content:center}"+
".rc-mic{background:#fff;border:1px solid #d9d0bb;color:#1d5c3f}.rc-mic.on{background:#a33a2a;color:#fff;border-color:#a33a2a;animation:rcmic 1s infinite}@keyframes rcmic{50%{box-shadow:0 0 0 8px rgba(163,58,42,.18)}}"+
".rc-send{background:linear-gradient(135deg,#1d5c3f,#4c8b6a);color:#fff}"+
".rc-wave{display:none;align-items:flex-end;gap:3px;height:22px;padding:0 4px}.rc-wave.on{display:flex}.rc-wave i{width:3px;background:#a33a2a;border-radius:2px;animation:rcw .7s ease-in-out infinite}.rc-wave i:nth-child(1){height:8px}.rc-wave i:nth-child(2){height:16px;animation-delay:.1s}.rc-wave i:nth-child(3){height:22px;animation-delay:.2s}.rc-wave i:nth-child(4){height:14px;animation-delay:.3s}.rc-wave i:nth-child(5){height:9px;animation-delay:.4s}@keyframes rcw{50%{transform:scaleY(.4)}}";
document.head.appendChild(css);
var fab=document.createElement("button");fab.className="rc-fab";fab.innerHTML="🤖";fab.title="Raahnuma";document.body.appendChild(fab);
var scrim=document.createElement("div");scrim.className="rc-scrim";scrim.innerHTML=
'<div class="rc-panel"><div class="rc-hd"><div class="rc-orb"></div><div><b>Raahnuma</b><span id="rcStatus">online · your bazaar concierge</span></div><div class="sp"></div><button class="rc-ic" id="rcMute">🔊</button><button class="rc-ic" id="rcClose">✕</button></div>'+
'<div class="rc-msgs" id="rcMsgs"></div><div class="rc-chips" id="rcChips"></div>'+
'<div class="rc-ft"><div class="rc-wave" id="rcWave"><i></i><i></i><i></i><i></i><i></i></div><input class="rc-in" id="rcIn" placeholder="Ask in English or اردو…"><button class="rc-mic" id="rcMic">🎤</button><button class="rc-send" id="rcSend">➤</button></div></div>';
document.body.appendChild(scrim);
var $=function(id){return document.getElementById(id);};
var msgs=[];try{msgs=JSON.parse(localStorage.getItem("nx_raah_v2")||"[]");}catch(e){msgs=[];}
var mem={pending:null,budget:null,cat:null,city:null,forWhom:null};var streamTimer=null;var rec=null,listening=false;
function saveMsgs(){localStorage.setItem("nx_raah_v2",JSON.stringify(msgs.slice(-40)));}
function L(en,ur){return S.lang==="ur"?ur:en;}
function esc2(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function bubble(role,html){var d=document.createElement("div");d.className="rc-m "+role;d.innerHTML=html;$("rcMsgs").appendChild(d);$("rcMsgs").scrollTop=$("rcMsgs").scrollHeight;return d;}
function setChips(list){$("rcChips").innerHTML=(list||[]).map(function(c){return '<button class="rc-chip" data-say="'+esc2(c)+'">'+esc2(c)+"</button>";}).join("");}
function stream(text,cards,chips){
 if(streamTimer)clearInterval(streamTimer);
 var d=bubble("a","");var i=0;var caret='<span class="caret"></span>';
 streamTimer=setInterval(function(){i+=2;d.innerHTML=esc2(text.slice(0,i))+caret;$("rcMsgs").scrollTop=$("rcMsgs").scrollHeight;
  if(i>=text.length){clearInterval(streamTimer);streamTimer=null;d.innerHTML=esc2(text);
   if(cards&&cards.length){var cw=document.createElement("div");cw.className="rc-cards";cw.innerHTML=cards.join("");$("rcMsgs").appendChild(cw);}
   setChips(chips);$("rcMsgs").scrollTop=$("rcMsgs").scrollHeight;saveMsgs();beep(660,.09,"sine",.02);}},14);
 msgs.push({r:"a",t:text});saveMsgs();
}
function think(){var d=bubble("a",'<span class="rc-typ"><i></i><i></i><i></i></span>');return d;}
function norm(s){return String(s||"").toLowerCase().replace(/[۔،؟!.,]/g," ").replace(/\s+/g," ").trim();}
var CATKW={fashion:["fashion","cloth","kapre","kapra","lawn","suit","dress","shoe","shoes","jora","libas","فیشن","کپڑے","لان","سوٹ","جوتا"],electronics:["electronic","gadget","phone","earbud","earbuds","watch","speaker","tv","led","mobile","bijli","الیکٹرانکس","گیجٹ","فون","ایئربڈ","گھڑی","اسپیکر","ٹی وی"],home:["home","kitchen","kettle","chair","table","ghar","bawarchi","گھر","باورچی","کیتلی","کرسی"],beauty:["beauty","perfume","attar","itar","makeup","skin","خوبصورتی","عطر","اتر","میک اپ"],grocery:["grocery","rice","basmati","food","pantry","chawal","rashan","گروسری","چاول","راشن"]};
var CITYKW=["lahore","karachi","islamabad","multan","لاہور","کراچی","اسلام آباد","ملتان"];
function detectCat(t){for(var k in CATKW){if(CATKW[k].some(function(w){return t.indexOf(w)>=0;}))return k;}return null;}
function detectBudget(t){var m=t.match(/(?:budget|under|below|less than|tak|ke andar|andar|سے کم|تک|بجٹ|rs|pkr|rupees|rupay)\s*(\d[\d,]*)/)||t.match(/(\d[\d,]*)\s*(?:rs|pkr|rupees|rupay|روپے|تک|اندَر|اندر)/);if(m)return parseInt(m[1].replace(/,/g,""),10);var n=t.match(/\b(\d{3,6})\b/);return n?parseInt(n[1],10):null;}
function detectCity(t){for(var i=0;i<CITYKW.length;i++){if(t.indexOf(CITYKW[i])>=0)return CITYKW[i];}return null;}
function detectFor(t){if(/(wife|biwi|begum|abi|amma|mother|mom|gift|birthday|shadi|anniversary|تحفہ|بیوی|اماں|ابی|سالگرہ|شادی)/.test(t))return true;return false;}
function searchProds(sl){var l=prods().slice();if(sl.cat)l=l.filter(function(p){return p.cat===sl.cat;});if(sl.city)l=l.filter(function(p){return (p.city||"").toLowerCase().indexOf(sl.city)>=0;});if(sl.budget)l=l.filter(function(p){return p.price<=sl.budget;});if(sl.q){l=l.filter(function(p){return (pn(p)+" "+pd(p)+" "+p.seller).toLowerCase().indexOf(sl.q)>=0;});}l.sort(function(a,b){return (rating(b)||0)-(rating(a)||0);});return l;}
function pCard(p){return '<div class="rc-pc"><img src="'+p.img+'" onerror="this.style.visibility=\'hidden\'"><div class="g"><b>'+esc2(pn(p))+"</b><span>"+money(p.price)+"</span></div><button data-rc=\"add\" data-id=\""+p.id+'">+ '+(S.lang==="ur"?"کارٹ":"Cart")+"</button></div>";}
function oCard(o){return '<div class="rc-oc"><b>'+o.code+'</b><div class="st">'+o.status+"</div><div style=\"margin-top:6px;font-size:12px;color:#6b6355\">"+esc2(o.seller)+" · "+money(o.total)+'</div><div style="display:flex;gap:6px;margin-top:8px"><button class="rc-chip" data-rc="confirm" data-id="'+o.code+'">✓ '+L("Received","مل گیا")+'</button><button class="rc-chip" data-rc="msg" data-id="'+o.code+'">💬 '+L("Seller","سیلر")+"</button></div></div>";}
function greet(){var h=new Date().getHours();var tod=h<12?L("Good morning","صبح بخیر"):h<18?L("Good afternoon","السلام علیکم"):L("Good evening","شام بخیر");
 return L(tod+"! I'm Raahnuma, your NexusShop concierge. Tell me what you need in plain words — a gift under Rs 3,000 in Lahore, your order status, or a live committee deal — and I'll handle it.",tod+"! میں راہنما ہوں، آپ کا NexusShop کنسیئرج۔ سادہ الفاظ میں بتائیں — لاہور میں 3,000 روپے تک تحفہ، آرڈر کی حالت، یا لائیو کمیٹی ڈیل — میں سنبھال لوں گا۔");}
function respond(raw){
 var t=norm(raw);msgs.push({r:"u",t:raw});saveMsgs();bubble("u",esc2(raw));beep(520,.07,"triangle",.02);
 var td=think();
 setTimeout(function(){td.remove();route(t,raw);},420+Math.random()*380);
}
function route(t,raw){
 var cat=detectCat(t),budget=detectBudget(t),city=detectCity(t),forWhom=detectFor(t);
 if(budget)mem.budget=budget;if(cat)mem.cat=cat;if(city)mem.city=city;if(forWhom)mem.forWhom=true;
 if(/^(hi|hello|salam|assalam|hey|ہیلو|سلام|السلام)/.test(t)){stream(greet(),null,[L("Gift under 3000","3000 تک تحفہ"),L("Track my order","میرا آرڈر"),L("Live committee deals","لائیو کمیٹی"),L("Start selling free","مفت بیچیں")]);return;}
 if(/(track|status|order|kahan|pahunch|ٹریک|آرڈر|حالت|کہاں)/.test(t)&&!/(committee|live)/.test(t)){var o=(S.orders||[])[0];if(!o){stream(L("You have no orders yet. Browse the bazaar and checkout via WhatsApp — I'll track it from there.","ابھی کوئی آرڈر نہیں۔ بازار دیکھیں اور واٹس ایپ سے چیک آؤٹ کریں — پھر میں ٹریک کروں گا۔"),null,[L("Show deals","ڈیلز دکھائیں")]);return;}stream(L("Here's your latest order. Tap to confirm delivery or message the seller.","یہ آپ کا تازہ آرڈر ہے۔ ڈیلیوری کی تصدیق یا سیلر کو میسج کریں۔"),[oCard(o)],[L("Confirm delivery","ڈیلیوری تصدیق"),L("Message seller","سیلر میسج")]);return;}
 if(/(return|refund|exchange|wapas|واپسی|رقم)/.test(t)){stream(L("Returns are simple: check the parcel before paying; if wrong, refuse at the door or message the seller within 7 days. I can open your orders to start a return.","واپسی آسان: ادائیگی سے پہلے پارسل چیک کریں؛ غلط ہو تو دروازے پر واپس یا 7 دن میں سیلر کو میسج۔ میں آرڈرز کھول سکتا ہوں۔"),null,[L("Open my orders","میرے آرڈرز کھولیں")]);return;}
 if(/(committee|live|group|discount|deal|کمیٹی|لائیو|گروپ|ڈسکاؤنٹ|ڈیل)/.test(t)){stream(L("Committee Live is our star: join a live group-buy room, and as members join, everyone's discount unlocks — up to 25%. Share the room on WhatsApp to fill it faster.","کمیٹی لائیو ہمارا ستارہ: لائیو گروپ خریداری روم میں شامل ہوں، جیسے جیسے ارکان آئیں سب کا ڈسکاؤنٹ کھلے — 25% تک۔ روم واٹس ایپ پر شیئر کریں۔"),null,[L("Open Committee Live","کمیٹی لائیو کھولیں")]);return;}
 if(/(sell|selling|shop|dukan|list|فروخت|دکان|بیچ)/.test(t)){stream(L("Selling is free and unlimited during our founding phase. Create your shop, add products, and get paid cash on delivery — NexusShop never holds your money.","بانی مرحلہ میں فروخت مفت اور لامحدود۔ دکان بنائیں، مصنوعات شامل کریں، ڈیلیوری پر نقد لیں — NexusShop پیسہ نہیں رکھتا۔"),null,[L("Open Seller Center","سیلر سینٹر کھولیں")]);return;}
 if(/(plan|price|subscription|premium|gold|free|پلان|قیمت|سبسکرپشن|مفت)/.test(t)){stream(L("Right now everything is free — founding phase. Premium and Gold arrive later once the bazaar has real demand; you'll keep founding perks.","ابھی سب مفت — بانی مرحلہ۔ پریمیم/گولڈ بعد میں جب حقیقی مانگ ہو؛ آپ کو بانی مراعات ملیں گی۔"),null,[L("Open Seller Center","سیلر سینٹر")]);return;}
 if(/(cod|cash|delivery|courier|tcs|leopard|ڈیلیوری|کورئیر|نقد)/.test(t)){var m=MK[S.market];stream(L("Cash on delivery: check before you pay. Delivery "+money(m.del)+", free over "+money(m.free)+". Couriers: "+m.couriers.map(function(c){return c[0];}).join(", ")+".","کیش آن ڈیلیوری: ادائیگی سے پہلے چیک۔ ڈیلیوری "+money(m.del)+"، "+money(m.free)+" سے اوپر مفت۔ کورئیر: "+m.couriers.map(function(c){return c[0];}).join(", ")+"۔"),null,[L("Nearest courier","قریبی کورئیر")]);return;}
 if(/(language|urdu|english|زبان|اردو|انگریزی)/.test(t)){S.lang=/urdu|اردو/.test(t)?"ur":"en";save();render();stream(L("Switched to English.","اردو پر.switch ہو گیا۔"),null,[]);return;}
 if(/(thanks|shukriya|شکریہ|thank)/.test(t)){stream(L("Anytime! I'm here whenever you need a deal, a track, or a committee.","کسی بھی وقت! ڈیل، ٹریک یا کمیٹی کے لیے حاضر ہوں۔"),null,[L("Live deals","لائیو ڈیلز")]);return;}
 // search / slot-filling
 var sl={cat:mem.cat,budget:mem.budget,city:mem.city,q:null};
 if(mem.pending==="search"&&(cat||budget||forWhom)){mem.pending=null;}
 else if(!cat&&!budget&&!forWhom&&t.length>2&&!/(add|cart|buy|خرید|کارٹ)/.test(t)){
   // treat as keyword search if matches something, else ask
   var kw=prods().filter(function(p){return (pn(p)+" "+pd(p)).toLowerCase().indexOf(t)>=0;});
   if(kw.length){sl.q=t;}else{mem.pending="search";stream(L("Happy to help. What are you shopping for — fashion, electronics, home, beauty or grocery? And a budget if you have one.","خوشی سے مدد کروں گا۔ کس چیز کی خریداری — فیشن، الیکٹرانکس، گھر، خوبصورتی یا گروسری؟ بجٹ ہو تو بتائیں۔"),null,[L("Fashion","فیشن"),L("Electronics","الیکٹرانکس"),L("Beauty gifts","تحفے")]);return;}
 }
 if(/(add|cart|buy|خرید|کارٹ)/.test(t)){var target=searchProds(sl)[0]||prods()[0];addCart(target.id,1);stream(L("Added "+pn(target)+" to your cart. Want me to open checkout or start a committee for extra savings?","کارٹ میں "+pn(target)+" شامل۔ چیک آؤٹ کھولوں یا کمیٹی شروع کروں؟"),[pCard(target)],[L("Open cart","کارٹ کھولیں"),L("Start committee","کمیٹی شروع")]);return;}
 var found=searchProds(sl);
 if(!found.length){stream(L("Nothing matches that yet. Try a different category or raise the budget a little.","ابھی کچھ نہیں ملا۔ دوسرا زمرہ یا بجٹ تھوڑا بڑھائیں۔"),null,[L("Show all deals","سب ڈیلز")]);return;}
 var intro=forWhom?L("Perfect gift picks","بہترین تحفے"):L("Here are the best matches","بہترین میچ");
 if(sl.budget)intro+=L(" under "+money(sl.budget),money(sl.budget)+" سے کم");
 if(sl.city)intro+=L(" in "+sl.city,sl.city+" میں");
 intro+=":";
 stream(intro,found.slice(0,3).map(pCard),[L("Add best to cart","بہترین کارٹ میں"),L("Start committee","کمیٹی شروع"),L("More options","مزید")]);
 mem.last=found[0]?found[0].id:null;
}
function openSheet(){scrim.classList.add("on");$("rcMute").textContent=window.NXSound.muted()?"🔇":"";
 if(!msgs.length){bubble("a",esc2(greet()));setChips([L("Gift under 3000","3000 تک تحفہ"),L("Track my order","میرا آرڈر"),L("Live committee","لائیو کمیٹی"),L("Sell free","مفت بیچیں")]);msgs.push({r:"a",t:greet()});saveMsgs();}
 else{$("rcMsgs").innerHTML="";msgs.slice(-14).forEach(function(m){bubble(m.r,esc2(m.t));});setChips([L("Live deals","لائیو ڈیلز"),L("Track order","آرڈر ٹریک")]);}
 setTimeout(function(){$("rcIn").focus();},250);beep(700,.1,"sine",.02);}
function closeSheet(){scrim.classList.remove("on");stopMic();}
fab.onclick=openSheet;$("rcClose").onclick=closeSheet;
scrim.addEventListener("click",function(e){if(e.target===scrim)closeSheet();});
$("rcMute").onclick=function(){var m=window.NXSound.toggle();$("rcMute").textContent=m?"🔇":"🔊";};
$("rcSend").onclick=function(){var v=$("rcIn").value.trim();if(!v)return;$("rcIn").value="";respond(v);};
$("rcIn").addEventListener("keydown",function(e){if(e.key==="Enter"){var v=$("rcIn").value.trim();if(v){$("rcIn").value="";respond(v);}}});
$("rcChips").addEventListener("click",function(e){var b=e.target.closest("[data-say]");if(b)respond(b.dataset.say);});
$("rcMsgs").addEventListener("click",function(e){var b=e.target.closest("[data-rc]");if(!b)return;var a=b.dataset.rc,id=b.dataset.id;
 if(a==="add"){addCart(id,1);beep(880,.1,"sine",.03);stream(L("Added to cart.","کارٹ میں شامل۔"),null,[L("Open cart","کارٹ کھولیں")]);}
 if(a==="confirm"){var o=(S.orders||[]).find(function(x){return x.code===id;});if(o){o.status="delivered";save();render();stream(L("Delivery confirmed. You can now leave a verified review.","ڈیلیوری تصدیق۔ اب تصدیق شدہ جائزہ دے سکتے ہیں۔"),null,[]);}}
 if(a==="msg"){var o2=(S.orders||[]).find(function(x){return x.code===id;});if(o2)wa(o2.swa,orderMessage(o2));}
});
document.addEventListener("click",function(e){var c=e.target.closest(".rc-chip[data-say]");if(c&&scrim.contains(c))return;});
// delegated quick actions from chips that are commands
$("rcChips").addEventListener("click",function(e){var b=e.target.closest("[data-say]");if(!b)return;var s=norm(b.dataset.say);
 if(/open cart|کارٹ کھولیں/.test(s)){S.view="cart";save();render();closeSheet();}
 else if(/open my orders|میرے آرڈرز/.test(s)){S.view="orders";save();render();closeSheet();}
 else if(/seller center|سیلر سینٹر/.test(s)){S.view="seller";S.payFocus=true;save();render();closeSheet();}
 else if(/committee live|کمیٹی لائیو/.test(s)){closeSheet();if(window.NXLive)window.NXLive.open();}
 else if(/nearest courier|قریبی کورئیر/.test(s)){closeSheet();var fb=function(){window.open("https://www.google.com/maps/search/courier+service+near+me","_blank");};if(navigator.geolocation)navigator.geolocation.getCurrentPosition(function(p){window.open("https://www.google.com/maps/search/courier+service+near+"+p.coords.latitude+","+p.coords.longitude,"_blank");},fb);else fb();}
});
// voice
function stopMic(){listening=false;$("rcMic").classList.remove("on");$("rcWave").classList.remove("on");if(rec){try{rec.stop();}catch(e){}}$("rcStatus").textContent="online · your bazaar concierge";}
$("rcMic").onclick=function(){
 var SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){stream(L("Voice isn't supported in this browser — type instead, I understand Urdu and English.","اس براؤزر میں وائس نہیں — ٹائپ کریں، میں اردو/انگریزی سمجھتا ہوں۔"),null,[]);return;}
 if(listening){stopMic();return;}
 rec=new SR();rec.lang=S.lang==="ur"?"ur-PK":"en-US";rec.interimResults=true;rec.continuous=false;listening=true;$("rcMic").classList.add("on");$("rcWave").classList.add("on");$("rcStatus").textContent=L("listening…","سن رہا ہوں…");beep(900,.08,"sine",.02);
 var final="";rec.onresult=function(ev){var interim="";for(var i=ev.resultIndex;i<ev.results.length;i++){if(ev.results[i].isFinal)final+=ev.results[i][0].transcript;else interim+=ev.results[i][0].transcript;}$("rcIn").value=(final+interim).trim();};
 rec.onend=function(){stopMic();var v=$("rcIn").value.trim();if(v){$("rcIn").value="";respond(v);}};
 rec.onerror=function(){stopMic();};
 try{rec.start();}catch(e){stopMic();}
};
})();
