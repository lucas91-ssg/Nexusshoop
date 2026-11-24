/* nx-gate.js — Puerta de entrada: bienvenida flotante moderna + auth Google obligatoria */
(function(){
"use strict";
if(window.__nxGate)return;window.__nxGate=true;
var SUPABASE_URL="https://jtbxqwiyktzjdjohcyli.supabase.co";
var SUPABASE_ANON="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0Ynhxd2l5a3R6amRqb2hjeWxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ5MzY5NzIsImV4cCI6MjExMDUxMjk3Mn0.lTQDVQgJqY65_daClS0V7LvO6Kl1Pi7pyGrL5F5j-1U";
var GD={en:{t:"Welcome to NexusShop",s:"Your COD bazaar, in your language, on every screen.",g:"Continue with Google",or:"or",e:"Email",p:"Password",li:"Log in",su:"Create account",ck:"Check your email to confirm.",chips:"COD nationwide,Verified reviews,Free founding phase",hi:"Welcome back"},
ur:{t:"NexusShop میں خوش آمدید",s:"آپ کی زبان میں، ہر اسکرین پر COD بازار۔",g:"Google کے ساتھ جاری رکھیں",or:"یا",e:"ای میل",p:"پاس ورڈ",li:"لاگ ان",su:"اکاؤنٹ بنائیں",ck:"تصدیق کے لیے ای میل دیکھیں۔",chips:"ملک بھر COD,تصدیق شدہ جائزے,مفت بانی مرحلہ",hi:"خوش آمدید"},
sk:{t:"Vitajte v NexusShop",s:"Váš COD bazár vo vašom jazyku.",g:"Pokračovať cez Google",or:"alebo",e:"E-mail",p:"Heslo",li:"Prihlásiť sa",su:"Vytvoriť účet",ck:"Skontrolujte e-mail.",chips:"Dobierka,Overené recenzie,Free fáza",hi:"Vitajte späť"},
de:{t:"Willkommen bei NexusShop",s:"Ihr COD-Basar in Ihrer Sprache.",g:"Mit Google fortfahren",or:"oder",e:"E-Mail",p:"Passwort",li:"Anmelden",su:"Konto erstellen",ck:"Bitte E-Mail prüfen.",chips:"Nachnahme,Geprüfte Bewertungen,Free-Phase",hi:"Willkommen zurück"},
hi:{t:"NexusShop में स्वागत है",s:"आपकी भाषा में आपका COD बाज़ार।",g:"Google से जारी रखें",or:"या",e:"ईमेल",p:"पासवर्ड",li:"लॉग इन",su:"खाता बनाएँ",ck:"ईमेल जाँचें।",chips:"देशभर COD,सत्यापित समीक्षाएँ,मुफ़्त फाउंडिंग",hi:"वापसी पर स्वागत"}};
function GT(k){return (GD[S.lang]&&GD[S.lang][k])||GD.en[k];}
var css=document.createElement("style");css.textContent=
"#nxGate{position:fixed;inset:0;z-index:500;overflow:hidden;display:flex;align-items:center;justify-content:center;padding:20px;background:radial-gradient(900px 500px at 15% -10%,rgba(76,139,106,.35),transparent 60%),radial-gradient(800px 460px at 110% 20%,rgba(214,51,108,.28),transparent 60%),radial-gradient(700px 500px at 50% 120%,rgba(245,159,0,.25),transparent 60%),linear-gradient(160deg,#101c16,#1d5c3f 55%,#0d1a13)}"+
"#nxGate .orb{position:absolute;border-radius:50%;filter:blur(46px);opacity:.5;animation:ngFloat 9s ease-in-out infinite}"+
"#nxGate .o1{width:260px;height:260px;background:#4c8b6a;top:-60px;left:-70px}"+
"#nxGate .o2{width:200px;height:200px;background:#f59f00;bottom:-40px;right:-50px;animation-delay:1.6s}"+
"#nxGate .o3{width:150px;height:150px;background:#d6336c;top:38%;right:8%;animation-delay:3.1s;opacity:.35}"+
"@keyframes ngFloat{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(26px,-30px) scale(1.12)}}"+
"#nxGate .chipf{position:absolute;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.22);backdrop-filter:blur(8px);color:#eaf5ec;border-radius:999px;padding:7px 14px;font-size:11px;font-weight:700;animation:ngDrift 7s ease-in-out infinite}"+
"#nxGate .c1{top:12%;left:10%}#nxGate .c2{top:20%;right:12%;animation-delay:1.2s}#nxGate .c3{bottom:16%;left:14%;animation-delay:2.2s}#nxGate .c4{bottom:10%;right:10%;animation-delay:3.4s}"+
"@keyframes ngDrift{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}"+
"#nxGate .card{position:relative;width:min(430px,100%);background:rgba(251,248,239,.92);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.6);border-radius:28px;padding:26px 22px;box-shadow:0 30px 80px rgba(0,0,0,.45),inset 0 1px 0 #fff;text-align:center;animation:ngIn .55s cubic-bezier(.2,.9,.25,1.1)}"+
"@keyframes ngIn{from{opacity:0;transform:translateY(34px) scale(.94)}to{opacity:1;transform:none}}"+
"#nxGate.out .card{animation:ngOut .45s ease forwards}#nxGate.out .orb,#nxGate.out .chipf{animation:ngFade .45s ease forwards}"+
"@keyframes ngOut{to{opacity:0;transform:translateY(-24px) scale(.9)}}@keyframes ngFade{to{opacity:0}}"+
"#nxGate .ring{width:150px;height:100px;margin:0 auto 8px;perspective:700px}"+
"#nxGate .spin{width:100%;height:100%;position:relative;transform-style:preserve-3d;animation:ngSpin 14s linear infinite}"+
"@keyframes ngSpin{from{transform:rotateY(0)}to{transform:rotateY(360deg)}}"+
"#nxGate .spin img{position:absolute;left:50%;top:50%;width:56px;height:56px;margin:-28px 0 0 -28px;border-radius:12px;object-fit:cover;border:1px solid rgba(255,255,255,.7);box-shadow:0 8px 20px rgba(0,0,0,.25)}"+
"#nxGate h1{font-family:Georgia,serif;font-size:27px;color:#26221b;margin:2px 0 4px}#nxGate h1 b{background:linear-gradient(120deg,#1d5c3f,#4c8b6a,#8a6d1f);-webkit-background-clip:text;background-clip:text;color:transparent}"+
"#nxGate .sub{font-size:12.5px;color:#6b6355;margin-bottom:16px}"+
"#nxGate .gbtn{width:100%;display:flex;align-items:center;justify-content:center;gap:10px;background:#fff;border:1px solid #d9d0bb;border-radius:14px;padding:13px;font-weight:700;font-size:14px;color:#333;cursor:pointer;box-shadow:0 6px 18px rgba(38,34,27,.12);transition:transform .12s,box-shadow .2s}"+
"#nxGate .gbtn:hover{transform:translateY(-2px);box-shadow:0 10px 26px rgba(38,34,27,.18)}"+
"#nxGate .gbtn svg{width:19px;height:19px}"+
"#nxGate .div{display:flex;align-items:center;gap:10px;color:#8a8172;font-size:11px;margin:14px 0}#nxGate .div:before,#nxGate .div:after{content:'';flex:1;height:1px;background:#d9d0bb}"+
"#nxGate input{width:100%;background:#fbf8ef;border:1px solid #d9d0bb;border-radius:12px;padding:11px 13px;font-size:13.5px;color:#26221b;margin-bottom:9px;outline:none}#nxGate input:focus{border-color:#4c8b6a;box-shadow:0 0 0 3px rgba(76,139,106,.16)}"+
"#nxGate .row2{display:flex;gap:8px}#nxGate .row2 button{flex:1;border-radius:12px;padding:12px;font-weight:700;font-size:13px;cursor:pointer}"+
"#nxGate .li{background:#1d5c3f;color:#fff;border:none}#nxGate .su{background:transparent;color:#1d5c3f;border:1.5px solid #1d5c3f}"+
"#nxGate .err{color:#a33a2a;font-size:11.5px;margin-top:8px;min-height:14px}"+
"#nxGate .langf{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.3);color:#fff;border-radius:999px;padding:7px 13px;font-size:12px;font-weight:800;cursor:pointer;backdrop-filter:blur(6px)}";
document.head.appendChild(css);
var GSVG='<svg viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';
var gate=document.createElement("div");gate.id="nxGate";
gate.innerHTML='<span class="orb o1"></span><span class="orb o2"></span><span class="orb o3"></span>'+
'<span class="chipf c1">💳 COD</span><span class="chipf c2">✓ '+ "Reviews"+'</span><span class="chipf c3">🎁 Free</span><span class="chipf c4">🌍 6 markets</span>'+
'<button class="langf" id="ngLang">EN</button>'+
'<div class="card"><div class="ring"><div class="spin" id="ngSpin"></div></div>'+
'<h1>Nexus<b>Shop</b></h1><div class="sub" id="ngSub"></div>'+
'<button class="gbtn" id="ngGoogle">'+GSVG+'<span id="ngGtxt"></span></button>'+
'<div class="div" id="ngOr"></div>'+
'<input id="ngEm" type="email" placeholder="Email"><input id="ngPw" type="password" placeholder="Password">'+
'<div class="row2"><button class="li" id="ngLi"></button><button class="su" id="ngSu"></button></div>'+
'<div class="err" id="ngErr"></div></div>';
var sb=null,ready=false;
function paint(){var imgs=["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=60","https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&q=60","https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&q=60","https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=200&q=60","https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&q=60","https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&q=60"];
 gate.querySelector("#ngSpin").innerHTML=imgs.map(function(u,i){return '<img src="'+u+'" style="transform:rotateY('+(i*60)+'deg) translateZ(86px)" alt="">';}).join("");
 gate.querySelector("#ngSub").textContent=GT("s");gate.querySelector("#ngGtxt").textContent=GT("g");gate.querySelector("#ngOr").textContent=GT("or");
 gate.querySelector("#ngLi").textContent=GT("li");gate.querySelector("#ngSu").textContent=GT("su");
 gate.querySelector("#ngLang").textContent=({en:"EN",ur:"اردو",sk:"SK",de:"DE",hi:"HI"})[S.lang]||"EN";
 var chips=GT("chips").split(",");for(var i=1;i<=4;i++){var el=gate.querySelector(".c"+i);if(el&&chips[i-1])el.textContent=el.textContent.split(" ")[0]+" "+chips[i-1];}}
function loadSDK(cb){if(window.supabase){cb();return;}var s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";s.onload=cb;document.head.appendChild(s);}
function syncProfile(u){if(!u)return;var m=u.user_metadata||{};if(!S.profile.name)S.profile.name=m.full_name||m.name||"";if(!S.profile.email)S.profile.email=u.email||"";if(!S.profile.pic&&m.avatar_url)S.profile.pic=m.avatar_url;save();}
function enterApp(u){syncProfile(u);sessionStorage.setItem("nx_in","1");gate.classList.add("out");setTimeout(function(){if(gate.parentNode)gate.parentNode.removeChild(gate);},460);render();toast(GT("hi")+", "+(S.profile.name||"")+ "! 🎉");}
function showGate(){if(!gate.parentNode)document.body.appendChild(gate);gate.classList.remove("out");paint();}
loadSDK(function(){sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON,{auth:{flowType:"implicit",detectSessionInUrl:true,persistSession:true}});ready=true;
 sb.auth.getSession().then(function(r){var ses=r.data.session;if(ses){enterApp(ses.user);}else{showGate();}
  sb.auth.onAuthStateChange(function(ev,ses2){if(ev==="SIGNED_IN"&&ses2)enterApp(ses2.user);if(ev==="SIGNED_OUT")showGate();});});});
gate.addEventListener("click",function(e){
 if(e.target.closest("#ngLang")){var langs=["en","ur","sk","de","hi"];S.lang=langs[(langs.indexOf(S.lang)+1)%langs.length];save();render();paint();return;}
 if(e.target.closest("#ngGoogle")){var b=e.target.closest("#ngGoogle");b.style.opacity=".6";sb.auth.signInWithOAuth({provider:"google",options:{redirectTo:location.origin+(location.pathname.endsWith("/")?location.pathname+"index.html":location.pathname)}}).then(function(r){b.style.opacity="1";if(r.error)gate.querySelector("#ngErr").textContent=r.error.message;});return;}
 if(e.target.closest("#ngLi")){sb.auth.signInWithPassword({email:gate.querySelector("#ngEm").value,password:gate.querySelector("#ngPw").value}).then(function(r){if(r.error)gate.querySelector("#ngErr").textContent=r.error.message;});return;}
 if(e.target.closest("#ngSu")){sb.auth.signUp({email:gate.querySelector("#ngEm").value,password:gate.querySelector("#ngPw").value}).then(function(r){if(r.error)gate.querySelector("#ngErr").textContent=r.error.message;else if(!r.data.session)gate.querySelector("#ngErr").textContent=GT("ck");});return;}
});
/* logout real → vuelve a la puerta */
document.addEventListener("click",function(e){if(e.target.closest('[data-a="logout"]')&&ready){setTimeout(function(){sb.auth.signOut().then(function(){showGate();});},0);}},true);
})();
