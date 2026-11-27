/* nx-comments.js v1 — comentarios modernos con respuestas, likes y diseño social */
(function(){
"use strict";
if(window.__nxCm)return;window.__nxCm=true;
var URL="https://jtbxqwiyktzjdjohcyli.supabase.co";
var ANON="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0Ynhxd2l5a3R6amRqb2hjeWxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ5MzY5NzIsImV4cCI6MjExMDUxMjk3Mn0.lTQDVQgJqY65_daClS0V7LvO6Kl1Pi7pyGrL5F5j-1U";
var sb=null,me=null,comments=[];

var CM={
en:{title:"Comments",write:"Write a comment...",post:"Post",reply:"Reply",like:"Like",likes:"likes",replies:"replies",none:"Be the first to comment!",login:"Log in to comment"},
ur:{title:"تبصرے",write:"تبصرہ لکھیں...",post:"پوسٹ",reply:"جواب",like:"پسند",likes:"پسندیدگیاں",replies:"جوابات",none:"پہلا تبصرہ کریں!",login:"تبصرہ کرنے کے لیے لاگ ان کریں"},
sk:{title:"Komentáre",write:"Napísať komentár...",post:"Odoslať",reply:"Odpovedať",like:"Páči sa",likes:"páči sa",replies:"odpovede",none:"Buď prvý!",login:"Prihlás sa"},
de:{title:"Kommentare",write:"Kommentar schreiben...",post:"Posten",reply:"Antworten",like:"Gefällt",likes:"Gefällt mir",replies:"Antworten",none:"Sei der Erste!",login:"Anmelden zum Kommentieren"},
hi:{title:"टिप्पणियाँ",write:"टिप्पणी लिखें...",post:"पोस्ट",reply:"जवाब",like:"पसंद",likes:"पसंद",replies:"जवाब",none:"पहली टिप्पणी करें!",login:"टिप्पणी करने के लिए लॉगिन करें"}
};
function CT(k){return (CM[S.lang]&&CM[S.lang][k])||CM.en[k];}

var css=document.createElement("style");css.textContent=
".nxCmBox{margin-top:16px;padding-top:16px;border-top:1px solid var(--ln)}"+
".nxCmBox h3{font-size:16px;font-weight:800;margin-bottom:12px}"+
".nxCmInput{display:flex;gap:8px;margin-bottom:16px}"+
".nxCmInput input{flex:1;border:1px solid var(--ln);border-radius:12px;padding:10px 12px;font-size:13px;background:var(--sf2)}"+
".nxCmInput button{background:var(--grn);color:#fff;border:none;border-radius:12px;padding:10px 16px;font-weight:700;font-size:13px;cursor:pointer}"+
".nxCmList{display:flex;flex-direction:column;gap:12px}"+
".nxCm{display:flex;gap:10px;padding:12px;background:var(--sf2);border:1px solid var(--ln);border-radius:14px}"+
".nxCm .av{width:36px;height:36px;border-radius:50%;background:var(--grn);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;flex:none}"+
".nxCm .av img{width:100%;height:100%;border-radius:50%;object-fit:cover}"+
".nxCm .body{flex:1;min-width:0}"+
".nxCm .head{display:flex;gap:8px;align-items:center;margin-bottom:4px}"+
".nxCm .head b{font-size:13px;color:var(--ink)}"+
".nxCm .head span{font-size:11px;color:var(--mut)}"+
".nxCm .txt{font-size:13px;color:var(--ink2);line-height:1.5;margin-bottom:6px}"+
".nxCm .acts{display:flex;gap:12px;font-size:11px;color:var(--mut)}"+
".nxCm .acts button{background:none;border:none;color:var(--mut);cursor:pointer;font-size:11px;padding:0}"+
".nxCm .acts button.on{color:var(--red)}"+
".nxCm .replies{margin-left:46px;margin-top:8px;display:flex;flex-direction:column;gap:8px}"+
".nxCm .replies .nxCm{padding:8px;background:var(--bg)}"+
".nxCmForm{margin-top:8px;display:flex;gap:6px}"+
".nxCmForm input{flex:1;border:1px solid var(--ln);border-radius:10px;padding:8px 10px;font-size:12px;background:var(--sf2)}"+
".nxCmForm button{background:var(--grn);color:#fff;border:none;border-radius:10px;padding:8px 12px;font-size:12px;font-weight:700}";
document.head.appendChild(css);

function load(cb){if(window.supabase){cb();return;}var s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";s.onload=cb;document.head.appendChild(s);}
load(function(){sb=window.supabase.createClient(URL,ANON,{auth:{persistSession:true}});refresh();});
async function refresh(){if(!sb)return;var ses=(await sb.auth.getSession()).data.session;me=ses?ses.user.id:null;}

function timeAgo(ts){var d=Date.now()-new Date(ts).getTime();var s=Math.floor(d/1000);if(s<60)return s+"s";var m=Math.floor(s/60);if(m<60)return m+"m";var h=Math.floor(m/60);if(h<24)return h+"h";var dy=Math.floor(h/24);return dy+"d";}

function renderComment(c,depth){
 var isLiked=(c.liked_by||[]).indexOf(me)>=0;
 var replies=comments.filter(function(x){return x.parent_id===c.id;});
 var initial=(c.user_name||"?")[0].toUpperCase();
 var av=c.user_pic?'<img src="'+c.user_pic+'">':initial;
 return '<div class="nxCm" style="'+(depth>0?'margin-left:20px;font-size:12px':'')+'">'+
  '<div class="av">'+av+'</div>'+
  '<div class="body">'+
   '<div class="head"><b>'+esc(c.user_name||"Anonymous")+'</b><span>'+timeAgo(c.created_at)+'</span></div>'+
   '<div class="txt">'+esc(c.content)+'</div>'+
   '<div class="acts">'+
    '<button data-like="'+c.id+'" class="'+(isLiked?"on":"")+'">♥ '+(c.likes||0)+' '+CT("likes")+'</button>'+
    '<button data-reply="'+c.id+'">'+CT("reply")+'</button>'+
   '</div>'+
   '<div data-rform="'+c.id+'"></div>'+
   (replies.length?'<div class="replies">'+replies.map(function(r){return renderComment(r,depth+1);}).join("")+'</div>':'')+
  '</div></div>';
}

function inject(){
 if(S.view!=="detail")return;
 var v=document.querySelector("main .view");if(!v)return;
 if(v.querySelector("[data-nxcm]"))return;
 var box=document.createElement("div");box.className="nxCmBox";box.setAttribute("data-nxcm","1");
 var roots=comments.filter(function(c){return !c.parent_id;});
 box.innerHTML='<h3>💬 '+CT("title")+' ('+comments.length+')</h3>'+
  (me?'<div class="nxCmInput"><input id="nxCmTxt" placeholder="'+CT("write")+'"><button id="nxCmPost">'+CT("post")+'</button></div>':'<p class="mut">'+CT("login")+'</p>')+
  '<div class="nxCmList">'+(roots.length?roots.map(function(c){return renderComment(c,0);}).join(""):'<p class="mut">'+CT("none")+'</p>')+'</div>';
 v.appendChild(box);
 box.querySelector("#nxCmPost")&&box.querySelector("#nxCmPost").addEventListener("click",function(){
  var txt=box.querySelector("#nxCmTxt").value.trim();if(!txt)return;
  sb.from("nx_comments").insert({listing_id:S.pid,user_id:me,user_name:S.profile.name||"Anonymous",user_pic:S.profile.pic||null,content:txt}).then(function(){loadComments();});
 });
 box.addEventListener("click",function(e){
  var lb=e.target.closest("[data-like]");if(lb){var id=lb.dataset.like;var c=comments.find(function(x){return x.id===id;});
   var liked=(c.liked_by||[]).indexOf(me)>=0;var newLikes=liked?c.likes-1:c.likes+1;var newLikedBy=liked?(c.liked_by||[]).filter(function(x){return x!==me;}):(c.liked_by||[]).concat([me]);
   sb.from("nx_comments").update({likes:newLikes,liked_by:newLikedBy}).eq("id",id).then(function(){loadComments();});return;}
  var rb=e.target.closest("[data-reply]");if(rb){var id=rb.dataset.reply;var form=box.querySelector('[data-rform="'+id+'"]');
   if(form.innerHTML){form.innerHTML="";return;}
   form.innerHTML='<div class="nxCmForm"><input placeholder="'+CT("write")+'"><button>'+CT("post")+'</button></div>';
   form.querySelector("button").onclick=function(){var txt=form.querySelector("input").value.trim();if(!txt)return;
    sb.from("nx_comments").insert({listing_id:S.pid,user_id:me,user_name:S.profile.name||"Anonymous",user_pic:S.profile.pic||null,content:txt,parent_id:id}).then(function(){loadComments();});};
   return;}
 });
}
async function loadComments(){if(!sb||!S.pid)return;var r=await sb.from("nx_comments").select("*").eq("listing_id",S.pid).order("created_at",{ascending:false});comments=r.data||[];inject();}
window.nxLoadComments=loadComments;
var _r=window.render;window.render=function(){var o=_r.apply(this,arguments);setTimeout(inject,200);return o;};
setTimeout(function(){refresh();loadComments();},1000);
})();
