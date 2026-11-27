/* nx-comments.js v2 — comentarios premium con puntuación, orden, respuestas y post instantáneo */
(function(){
"use strict";
if(window.__nxCm2)return;window.__nxCm2=true;
var URL="https://jtbxqwiyktzjdjohcyli.supabase.co";
var ANON="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0Ynhxd2l5a3R6amRqb2hjeWxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ5MzY5NzIsImV4cCI6MjExMDUxMjk3Mn0.lTQDVQgJqY65_daClS0V7LvO6Kl1Pi7pyGrL5F5j-1U";
var sb=null,me=null,comments=[],order="new",myStars=5,busy=false;
var CM={en:{t:"Community reviews",write:"Share your experience…",post:"Post",reply:"Reply",like:"Helpful",none:"No reviews yet. Be the first to share your experience.",login:"Log in to leave a review",avg:"Average rating",dist:"Rating breakdown",ordNew:"Newest",ordTop:"Top rated",ordLike:"Most helpful",verified:"Verified buyer",del:"Delete",chars:"characters"},
ur:{t:"کمیونٹی جائزے",write:"اپنا تجربہ شیئر کریں…",post:"پوسٹ",reply:"جواب",like:"مددگار",none:"ابھی کوئی جائزہ نہیں۔ پہلے آپ شیئر کریں۔",login:"جائزہ کے لیے لاگ ان",avg:"اوسط درجہ",dist:"درجہ بندی",ordNew:"تازہ",ordTop:"بہترین",ordLike:"مددگار",verified:"تصدیق شدہ خریدار",del:"حذف",chars:"حروف"},
sk:{t:"Recenzie komunity",write:"Podeľte sa o skúsenosť…",post:"Odoslať",reply:"Odpovedať",like:"Užitočné",none:"Zatiaľ žiadne recenzie.",login:"Prihláste sa",avg:"Priemer",dist:"Rozloženie",ordNew:"Najnovšie",ordTop:"Najlepšie",ordLike:"Užitočné",verified:"Overený kupujúci",del:"Zmazať",chars:"znakov"},
de:{t:"Community-Bewertungen",write:"Erfahrung teilen…",post:"Posten",reply:"Antworten",like:"Hilfreich",none:"Noch keine Bewertungen.",login:"Zum Bewerten anmelden",avg:"Durchschnitt",dist:"Verteilung",ordNew:"Neueste",ordTop:"Beste",ordLike:"Hilfreichste",verified:"Verifizierter Käufer",del:"Löschen",chars:"Zeichen"},
hi:{t:"समुदाय समीक्षाएँ",write:"अपना अनुभव साझा करें…",post:"पोस्ट",reply:"जवाब",like:"उपयोगी",none:"अभी कोई समीक्षा नहीं।",login:"समीक्षा के लिए लॉगिन",avg:"औसत",dist:"वितरण",ordNew:"नवीनतम",ordTop:"शीर्ष",ordLike:"उपयोगी",verified:"सत्यापित खरीदार",del:"हटाएँ",chars:"अक्षर"}};
function CT(k){return (CM[S.lang]&&CM[S.lang][k])||CM.en[k];}
var css=document.createElement("style");css.textContent=
".nxCm2{margin-top:18px;padding-top:16px;border-top:1px solid var(--ln)}"+
".nxCm2 .hd{display:flex;gap:16px;align-items:center;flex-wrap:wrap;margin-bottom:14px}"+
".nxCm2 .avg{display:flex;flex-direction:column;align-items:center;background:linear-gradient(135deg,var(--mint),var(--sf2));border:1px solid var(--grn3);border-radius:18px;padding:12px 18px}"+
".nxCm2 .avg b{font-family:Georgia,serif;font-size:32px;color:var(--grn);line-height:1}"+
".nxCm2 .avg .st{color:var(--gold);font-size:13px;letter-spacing:1px}"+
".nxCm2 .avg span{font-size:10px;color:var(--mut)}"+
".nxCm2 .dist{flex:1;min-width:150px;display:flex;flex-direction:column;gap:3px}"+
".nxCm2 .dist .r{display:flex;align-items:center;gap:6px;font-size:10px;color:var(--mut)}"+
".nxCm2 .dist .r .bar{flex:1;height:6px;background:var(--ln);border-radius:99px;overflow:hidden}"+
".nxCm2 .dist .r .bar i{display:block;height:100%;background:linear-gradient(90deg,var(--gold),var(--grn3));border-radius:99px}"+
".nxCm2 select{width:auto;border-radius:999px;padding:6px 12px;font-size:12px;background:var(--sf2);border:1px solid var(--ln)}"+
".nxCm2 .comp{display:flex;gap:10px;background:var(--sf);border:1px solid var(--ln);border-radius:18px;padding:14px;margin-bottom:14px;box-shadow:0 2px 10px rgba(38,34,27,.05)}"+
".nxCm2 .comp .av{width:40px;height:40px;border-radius:50%;flex:none;background:linear-gradient(135deg,var(--grn),var(--grn3));color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;overflow:hidden}"+
".nxCm2 .comp .av img{width:100%;height:100%;object-fit:cover}"+
".nxCm2 .comp .gw{flex:1}"+
".nxCm2 .starsIn{display:flex;gap:2px;margin-bottom:6px}"+
".nxCm2 .starsIn button{background:none;border:none;font-size:20px;color:var(--ln2);cursor:pointer;padding:0;transition:transform .1s}"+
".nxCm2 .starsIn button.on{color:var(--gold)}"+
".nxCm2 .starsIn button:active{transform:scale(1.2)}"+
".nxCm2 textarea{width:100%;border:1px solid var(--ln);border-radius:12px;background:var(--sf2);padding:10px;font-size:13px;resize:vertical;min-height:44px}"+
".nxCm2 .comp .ft{display:flex;justify-content:space-between;align-items:center;margin-top:6px}"+
".nxCm2 .comp .ft span{font-size:10px;color:var(--fnt)}"+
".nxCm2 .comp .ft button{background:var(--grn);color:#fff;border:none;border-radius:10px;padding:8px 18px;font-weight:700;font-size:13px;cursor:pointer}"+
".nxCm2 .comp .ft button[disabled]{opacity:.5}"+
".nxCm2 .list{display:flex;flex-direction:column;gap:10px}"+
".nxCm2 .cm{display:flex;gap:10px;background:var(--sf);border:1px solid var(--ln);border-radius:16px;padding:12px;animation:cmIn .35s ease}"+
"@keyframes cmIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}"+
".nxCm2 .cm .av{width:36px;height:36px;border-radius:50%;flex:none;background:linear-gradient(135deg,var(--grn3),var(--gold));color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;overflow:hidden;box-shadow:0 0 0 2px var(--sf),0 0 0 3px var(--grn3)}"+
".nxCm2 .cm .av img{width:100%;height:100%;object-fit:cover}"+
".nxCm2 .cm .bd{flex:1;min-width:0}"+
".nxCm2 .cm .hd2{display:flex;gap:8px;align-items:center;flex-wrap:wrap}"+
".nxCm2 .cm .hd2 b{font-size:13px}"+
".nxCm2 .cm .hd2 .vb{font-size:9px;font-weight:800;color:var(--grn);background:var(--mint);border:1px solid var(--grn3);border-radius:999px;padding:2px 7px}"+
".nxCm2 .cm .hd2 .tm{font-size:10px;color:var(--fnt)}"+
".nxCm2 .cm .st{color:var(--gold);font-size:12px;letter-spacing:1px;margin:2px 0}"+
".nxCm2 .cm .tx{font-size:13px;color:var(--ink2);line-height:1.55}"+
".nxCm2 .cm .ac{display:flex;gap:14px;margin-top:6px}"+
".nxCm2 .cm .ac button{background:none;border:none;font-size:11px;color:var(--mut);cursor:pointer;padding:0;display:flex;gap:4px;align-items:center}"+
".nxCm2 .cm .ac button.on{color:var(--red);font-weight:700}"+
".nxCm2 .cm .ac button.del{color:var(--red)}"+
".nxCm2 .rep{margin:8px 0 0 12px;padding-left:12px;border-left:2px solid var(--grn3);display:flex;flex-direction:column;gap:8px}"+
".nxCm2 .rep .cm{background:var(--sf2);padding:9px}"+
".nxCm2 .rform{display:flex;gap:6px;margin-top:6px}"+
".nxCm2 .rform input{flex:1;border:1px solid var(--ln);border-radius:10px;padding:7px 10px;font-size:12px;background:var(--sf2)}"+
".nxCm2 .rform button{background:var(--grn);color:#fff;border:none;border-radius:10px;padding:7px 12px;font-size:12px;font-weight:700}"+
".nxCm2 .empty{text-align:center;padding:26px;color:var(--mut);font-size:13px}"+
".nxCm2 .empty .e{font-size:34px;display:block;margin-bottom:6px}";
document.head.appendChild(css);
function load(cb){if(window.supabase){cb();return;}var s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";s.onload=cb;document.head.appendChild(s);}
load(function(){sb=window.supabase.createClient(URL,ANON,{auth:{persistSession:true}});sb.auth.getSession().then(function(r){me=r.data.session?r.data.session.user.id:null;});refresh();});
function ago(ts){var s=Math.floor((Date.now()-new Date(ts).getTime())/1000);if(s<60)return s+"s";var m=Math.floor(s/60);if(m<60)return m+"m";var h=Math.floor(m/60);if(h<24)return h+"h";return Math.floor(h/24)+"d";}
function stars(n){return "★".repeat(n)+"☆".repeat(5-n);}
function isVerifiedBuyer(pid){return (S.orders||[]).some(function(o){return o.status==="delivered"&&(o.items||[]).some(function(i){return i.id===pid;});});}
async function refresh(){if(!sb||!S.pid)return;var r=await sb.from("nx_comments").select("*").eq("listing_id",S.pid).order("created_at",{ascending:false});comments=r.data||[];paint();}
window.nxCmRefresh=refresh;
function sorted(){var c=comments.slice();if(order==="top")c.sort(function(a,b){return (b.rating||0)-(a.rating||0);});if(order==="like")c.sort(function(a,b){return (b.likes||0)-(a.likes||0);});return c;}
function cmHTML(c,depth){
 var liked=(c.liked_by||[]).indexOf(me)>=0;
 var reps=comments.filter(function(x){return x.parent_id===c.id;});
 var av=c.user_pic?'<img src="'+c.user_pic+'">':(c.user_name||"?")[0].toUpperCase();
 var vb=c.verified?'<span class="vb">✓ '+CT("verified")+'</span>':"";
 var st=c.rating?'<div class="st">'+stars(c.rating)+"</div>":"";
 var own=c.user_id===me;
 return '<div class="cm"><div class="av">'+av+'</div><div class="bd">'+
  '<div class="hd2"><b>'+esc(c.user_name||"Anonymous")+"</b>"+vb+'<span class="tm">'+ago(c.created_at)+"</span></div>"+st+
  '<div class="tx">'+esc(c.content)+"</div>"+
  '<div class="ac"><button data-like="'+c.id+'" class="'+(liked?"on":"")+'">♥ '+(c.likes||0)+" "+CT("like")+"</button>"+
  (depth===0?'<button data-reply="'+c.id+'">↩ '+CT("reply")+"</button>":"")+
  (own?'<button class="del" data-del="'+c.id+'">🗑 '+CT("del")+"</button>":"")+"</div>"+
  '<div data-rform="'+c.id+'"></div>'+
  (reps.length?'<div class="rep">'+reps.map(function(r){return cmHTML(r,depth+1);}).join("")+"</div>":"")+
  "</div></div>";
}
function paint(){
 var box=document.querySelector("[data-nxcm2]");if(!box)return;
 var roots=sorted().filter(function(c){return !c.parent_id;});
 var rated=comments.filter(function(c){return c.rating>0;});
 var avg=rated.length?(rated.reduce(function(a,b){return a+b.rating;},0)/rated.length):0;
 var dist=[5,4,3,2,1].map(function(n){var ct=rated.filter(function(c){return c.rating===n;}).length;var pc=rated.length?Math.round(ct/rated.length*100):0;
  return '<div class="r"><span>'+n+'★</span><div class="bar"><i style="width:'+pc+'%"></i></div><span>'+ct+"</span></div>";}).join("");
 var av=S.profile.pic?'<img src="'+S.profile.pic+'">':(S.profile.name||"?")[0].toUpperCase();
 box.innerHTML='<div class="hd"><div class="avg"><b>'+(avg?avg.toFixed(1):"–")+'</b><span class="st">'+stars(Math.round(avg))+'</span><span>'+comments.length+" "+CT("t").toLowerCase()+'</span></div>'+
  '<div class="dist">'+dist+"</div>"+
  '<select data-cmorder><option value="new"'+(order==="new"?" selected":"")+">"+CT("ordNew")+'</option><option value="top"'+(order==="top"?" selected":"")+">"+CT("ordTop")+'</option><option value="like"'+(order==="like"?" selected":"")+">"+CT("ordLike")+"</option></select></div>"+
  (me?'<div class="comp"><div class="av">'+av+'</div><div class="gw"><div class="starsIn">'+[1,2,3,4,5].map(function(n){return '<button data-star="'+n+'" class="'+(n<=myStars?"on":"")+'">★</button>';}).join("")+"</div>"+
   '<textarea id="nxTa" maxlength="500" placeholder="'+CT("write")+'"></textarea>'+
   '<div class="ft"><span id="nxCh">0/500 '+CT("chars")+'</span><button id="nxPost">'+CT("post")+"</button></div></div></div>":'<p class="mut" style="margin-bottom:12px">'+CT("login")+"</p>")+
  '<div class="list">'+(roots.length?roots.map(function(c){return cmHTML(c,0);}).join(""):'<div class="empty"><span class="e">💬</span>'+CT("none")+"</div>")+"</div>";
 var ta=box.querySelector("#nxTa");
 if(ta){ta.addEventListener("input",function(){box.querySelector("#nxCh").textContent=ta.value.length+"/500 "+CT("chars");});}
}
function inject(){
 if(S.view!=="detail")return;
 var v=document.querySelector("main .view");if(!v)return;
 if(!v.querySelector("[data-nxcm2]")){var d=document.createElement("div");d.className="nxCm2";d.setAttribute("data-nxcm2","1");v.appendChild(d);paint();}
}
document.addEventListener("click",function(e){
 var box=e.target.closest("[data-nxcm2]");if(!box)return;
 var st=e.target.closest("[data-star]");if(st){myStars=+st.dataset.star;box.querySelectorAll("[data-star]").forEach(function(b){b.classList.toggle("on",+b.dataset.star<=myStars);});return;}
 var po=e.target.closest("#nxPost");if(po){var ta=box.querySelector("#nxTa");var txt=ta.value.trim();if(!txt||busy)return;busy=true;po.disabled=true;po.textContent="…";
  var row={listing_id:S.pid,user_id:me,user_name:S.profile.name||"Anonymous",user_pic:S.profile.pic||null,content:txt,rating:myStars,verified:isVerifiedBuyer(S.pid),parent_id:null};
  comments.unshift(Object.assign({id:"tmp"+Date.now(),likes:0,liked_by:[],created_at:new Date().toISOString()},row));
  ta.value="";myStars=5;paint();busy=false;
  sb.from("nx_comments").insert(row).then(function(){refresh();});return;}
 var lk=e.target.closest("[data-like]");if(lk){var id=lk.dataset.like;var c=comments.find(function(x){return x.id===id;});if(!c)return;
  var liked=(c.liked_by||[]).indexOf(me)>=0;var nl=liked?(c.likes||0)-1:(c.likes||0)+1;var nb=liked?(c.liked_by||[]).filter(function(x){return x!==me;}):(c.liked_by||[]).concat([me]);
  c.likes=nl;c.liked_by=nb;paint();sb.from("nx_comments").update({likes:nl,liked_by:nb}).eq("id",id).then(function(){refresh();});return;}
 var rp=e.target.closest("[data-reply]");if(rp){var rid=rp.dataset.reply;var f=box.querySelector('[data-rform="'+rid+'"]');if(f.innerHTML){f.innerHTML="";return;}
  f.innerHTML='<div class="rform"><input maxlength="300" placeholder="'+CT("write")+'"><button>'+CT("post")+"</button></div>";
  f.querySelector("button").onclick=function(){var t=f.querySelector("input").value.trim();if(!t)return;
   var row={listing_id:S.pid,user_id:me,user_name:S.profile.name||"Anonymous",user_pic:S.profile.pic||null,content:t,rating:0,verified:isVerifiedBuyer(S.pid),parent_id:rid};
   comments.push(Object.assign({id:"tmp"+Date.now(),likes:0,liked_by:[],created_at:new Date().toISOString()},row));paint();
   sb.from("nx_comments").insert(row).then(function(){refresh();});};return;}
 var dl=e.target.closest("[data-del]");if(dl){var did=dl.dataset.del;comments=comments.filter(function(x){return x.id!==did&&x.parent_id!==did;});paint();sb.from("nx_comments").delete().eq("id",did).then(function(){refresh();});return;}
},true);
document.addEventListener("change",function(e){if(e.target.matches("[data-cmorder]")){order=e.target.value;paint();}});
var _r=window.render;window.render=function(){var o=_r.apply(this,arguments);setTimeout(function(){inject();refresh();},200);return o;};
setTimeout(function(){inject();refresh();},700);
})();
