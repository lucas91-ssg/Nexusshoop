/* nx-command.js v1 — OWNER COMMAND CENTER + MEDIA KIT
   Creá este archivo como nx-command.js (solo JS, sin etiquetas <script>).
   Luego agregá en index.html, antes de </body>:
   <script src="nx-command.js"></script>
*/
(function(){
"use strict";
if(window.__nxCmd)return;window.__nxCmd=true;
var URL="https://jtbxqwiyktzjdjohcyli.supabase.co";
var ANON="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0Ynhxd2l5a3R6amRqb2hjeWxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ5MzY5NzIsImV4cCI6MjExMDUxMjk3Mn0.lTQDVQgJqY65_daClS0V7LvO6Kl1Pi7pyGrL5F5j-1U";
var sb=null,me=null;
var PAL=["#1d5c3f","#4c8b6a","#8a6d1f","#d97706","#0369a1","#7c3aed","#be123c","#0f766e"];
var D={tab:"over",days:14,market:"all",lang:"all",event:"all",sort:"new",live:true,compact:false,
 events:[],listings:[],shops:[],reports:[],vers:[],sel:{},q:"",drawer:null,undo:null};
var ADSLOTS=[{id:"s1",name:"Home Banner · Slot 1",price:15000,status:"available",adv:""},
 {id:"s2",name:"Home Banner · Slot 2",price:15000,status:"available",adv:""},
 {id:"s3",name:"Featured Product",price:8000,status:"available",adv:""}];
try{var sa=JSON.parse(localStorage.getItem("nx_adslots")||"null");if(sa)ADSLOTS=sa;}catch(e){}

var css=document.createElement("style");css.textContent=
"#nxCmd{position:fixed;inset:0;z-index:400;background:var(--bg);display:none;flex-direction:column;overflow:hidden}"+
"#nxCmd.on{display:flex}"+
"#nxCmd *{scrollbar-width:thin;scrollbar-color:var(--grn3) var(--bg2)}"+
"#nxCmd ::-webkit-scrollbar{width:9px;height:9px}#nxCmd ::-webkit-scrollbar-track{background:var(--bg2)}"+
"#nxCmd ::-webkit-scrollbar-thumb{background:var(--grn3);border-radius:8px;border:2px solid var(--bg2)}"+
"#nxCmd ::-webkit-scrollbar-thumb:hover{background:var(--grn)}"+
"#nxCmd .hd{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:10px;padding:12px 16px;background:linear-gradient(120deg,#123528,#1d5c3f 55%,#2f6b4f);color:#fff;box-shadow:0 6px 20px rgba(18,53,40,.35)}"+
"#nxCmd .hd .lg{font-family:Georgia,serif;font-weight:800;font-size:18px}"+
"#nxCmd .hd .lg b{color:#f3e8c8}"+
"#nxCmd .hd .sp{flex:1}"+
"#nxCmd .hd button{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.3);color:#fff;border-radius:999px;padding:7px 13px;font-size:12px;font-weight:700;cursor:pointer}"+
"#nxCmd .ctl{position:sticky;top:52px;z-index:4;display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:10px 16px;background:var(--sf);border-bottom:1px solid var(--ln)}"+
"#nxCmd .ctl label{font-size:10px;color:var(--mut);display:flex;flex-direction:column;gap:3px;margin:0}"+
"#nxCmd .ctl select,#nxCmd .ctl input[type=range]{border:1px solid var(--ln);background:var(--sf2);border-radius:999px;padding:5px 10px;font-size:12px;color:var(--ink2)}"+
"#nxCmd .ctl input[type=range]{padding:0;width:90px;accent-color:var(--grn)}"+
"#nxCmd .ctl .tg{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--ink2);background:var(--sf2);border:1px solid var(--ln);border-radius:999px;padding:5px 10px;cursor:pointer}"+
"#nxCmd .ctl .tg input{width:auto;margin:0;accent-color:var(--grn)}"+
"#nxCmd .ctl .act{background:var(--grn);color:#fff;border:none;border-radius:999px;padding:7px 13px;font-size:12px;font-weight:700;cursor:pointer}"+
"#nxCmd .ctl .act.gh{background:var(--sf2);color:var(--ink2);border:1px solid var(--ln)}"+
"#nxCmd .tabs{display:flex;gap:6px;padding:10px 16px 0;overflow-x:auto}"+
"#nxCmd .tabs button{flex:none;border:1px solid var(--ln);background:var(--sf);border-radius:999px;padding:8px 15px;font-size:12.5px;font-weight:700;color:var(--ink2);cursor:pointer}"+
"#nxCmd .tabs button.on{background:var(--grn);color:#fff;border-color:var(--grn)}"+
"#nxCmd .body{flex:1;overflow-y:auto;padding:16px}"+
"#nxCmd .kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:14px}"+
"#nxCmd .kpi{background:var(--sf);border:1px solid var(--ln);border-radius:16px;padding:14px;position:relative;overflow:hidden}"+
"#nxCmd .kpi:before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--kc,var(--grn))}"+
"#nxCmd .kpi b{display:block;font-family:Georgia,serif;font-size:26px;color:var(--ink);line-height:1.1}"+
"#nxCmd .kpi span{font-size:11px;color:var(--mut)}"+
"#nxCmd .kpi .dl{font-size:10px;font-weight:800;color:var(--kc,var(--grn))}"+
"#nxCmd .grid2{display:grid;grid-template-columns:1fr;gap:12px}@media(min-width:900px){#nxCmd .grid2{grid-template-columns:1.4fr 1fr}}"+
"#nxCmd .panel{background:var(--sf);border:1px solid var(--ln);border-radius:18px;padding:16px}"+
"#nxCmd .panel h3{font-size:14px;font-weight:800;margin-bottom:10px;display:flex;align-items:center;gap:8px}"+
"#nxCmd .panel h3 .badge{font-size:9px;background:var(--goldbg);color:var(--gold);border:1px solid var(--gold);border-radius:999px;padding:2px 7px;font-weight:800}"+
"#nxCmd table{width:100%;border-collapse:collapse;font-size:12px}"+
"#nxCmd th{text-align:start;font-size:10px;color:var(--mut);text-transform:uppercase;letter-spacing:.5px;padding:6px 8px;border-bottom:1px solid var(--ln);cursor:pointer;white-space:nowrap}"+
"#nxCmd td{padding:8px;border-bottom:1px solid var(--ln);vertical-align:middle}"+
"#nxCmd tr:hover td{background:var(--sf2)}"+
"#nxCmd .pill{display:inline-block;border-radius:999px;padding:2px 9px;font-size:10px;font-weight:800}"+
"#nxCmd .pill.ok{background:var(--mint);color:var(--grn)}#nxCmd .pill.warn{background:var(--goldbg);color:var(--gold)}"+
"#nxCmd .pill.bad{background:var(--redbg);color:var(--red)}#nxCmd .pill.info{background:#e0f2fe;color:#0369a1}"+
"#nxCmd .mini{border:none;border-radius:8px;padding:5px 9px;font-size:11px;font-weight:700;cursor:pointer}"+
"#nxCmd .mini.ok{background:var(--grn);color:#fff}#nxCmd .mini.bad{background:var(--red);color:#fff}#nxCmd .mini.gh{background:var(--sf2);border:1px solid var(--ln);color:var(--ink2)}"+
"#nxCmd .search{width:100%;border:1px solid var(--ln);border-radius:999px;background:var(--sf2);padding:8px 14px;font-size:12px;margin-bottom:10px}"+
"#nxCmd .bulkbar{display:flex;gap:8px;align-items:center;background:var(--mint);border:1px solid var(--grn3);border-radius:12px;padding:8px 12px;margin-bottom:10px;font-size:12px}"+
"#nxCmd .drawer{position:fixed;top:0;right:0;bottom:0;width:min(400px,92vw);background:var(--sf);border-left:1px solid var(--ln);box-shadow:-16px 0 40px rgba(38,34,27,.2);z-index:6;padding:18px;overflow-y:auto;transform:translateX(100%);transition:transform .3s cubic-bezier(.2,.9,.25,1)}"+
"#nxCmd .drawer.on{transform:none}"+
"#nxCmd .drawer .x{position:absolute;top:12px;right:12px;background:var(--sf2);border:1px solid var(--ln);border-radius:50%;width:30px;height:30px;cursor:pointer}"+
"#nxCmd .kv{display:flex;justify-content:space-between;gap:10px;padding:7px 0;border-bottom:1px solid var(--ln);font-size:12px}"+
"#nxCmd .kv span{color:var(--mut)}#nxCmd .kv b{text-align:end;word-break:break-word}"+
"#nxCmd .funnel{display:flex;flex-direction:column;gap:6px}"+
"#nxCmd .funnel .f{display:flex;align-items:center;gap:8px;font-size:11px}"+
"#nxCmd .funnel .f .bar{height:22px;border-radius:6px;display:flex;align-items:center;padding:0 8px;color:#fff;font-weight:800;font-size:10px;min-width:34px}"+
"#nxCmd .legend{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}"+
"#nxCmd .legend span{display:flex;align-items:center;gap:5px;font-size:10px;color:var(--mut)}"+
"#nxCmd .legend i{width:9px;height:9px;border-radius:3px}"+
"#nxCmd .adrow{display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:10px 0;border-bottom:1px solid var(--ln)}"+
"#nxCmd .adrow input{border:1px solid var(--ln);border-radius:9px;background:var(--sf2);padding:6px 9px;font-size:12px}"+
"#nxCmd .empty{text-align:center;padding:30px;color:var(--mut);font-size:13px}"+
"#nxCmd .toast2{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--ink);color:var(--sf);border-radius:999px;padding:10px 18px;font-size:13px;z-index:9;display:flex;gap:12px;align-items:center;box-shadow:0 10px 30px rgba(0,0,0,.3)}"+
"#nxCmd .toast2 button{background:none;border:none;color:var(--goldbg);font-weight:800;text-decoration:underline;cursor:pointer}"+
"@media(max-width:640px){#nxCmd .ctl{top:50px}#nxCmd .hd .lg{font-size:15px}}";
document.head.appendChild(css);

var root=document.createElement("div");root.id="nxCmd";document.body.appendChild(root);
function load(cb){if(window.supabase){cb();return;}var s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";s.onload=cb;document.head.appendChild(s);}
load(function(){sb=window.supabase.createClient(URL,ANON,{auth:{persistSession:true}});sb.auth.getSession().then(function(r){me=r.data.session?r.data.session.user.id:null;});pull();});

function seedEvents(){var out=[],now=Date.now();var evs=["product_view","product_view","product_view","add_to_cart","add_to_cart","checkout_start","haggle_start","order_placed"];
 for(var d=0;d<14;d++){var n=8+Math.floor(Math.random()*14);for(var i=0;i<n;i++){out.push({ts:new Date(now-d*86400000-Math.random()*86400000).toISOString(),event:evs[Math.floor(Math.random()*evs.length)],meta:{market:["PK","PK","PK","IN","SK","DE","NG","GL"][Math.floor(Math.random()*8)],lang:["en","ur","en","hi","sk","de"][Math.floor(Math.random()*6)],pid:"p"+(1+Math.floor(Math.random()*8))}});}}
 return out;}
async function pull(){if(!sb)return;
 var e=await sb.from("nx_events").select("*").order("ts",{ascending:false}).limit(2000);D.events=e.data||[];
 var l=await sb.from("nx_listings").select("*");D.listings=l.data||[];
 var s=await sb.from("nx_shops").select("*");D.shops=s.data||[];
 var r=await sb.from("nx_reports").select("*").eq("status","open");D.reports=r.data||[];
 var v=await sb.from("nx_verifications").select("*").eq("status","pending");D.vers=v.data||[];
 if(D.events.length<5){D.events=seedEvents();D.demo=true;}else D.demo=false;
 paint();}
window.nxCmdPull=pull;

function filt(){var cut=Date.now()-D.days*86400000;
 return D.events.filter(function(e){var t=new Date(e.ts).getTime();if(t<cut)return false;
  var m=(e.meta||{});if(D.market!=="all"&&m.market!==D.market)return false;
  if(D.lang!=="all"&&m.lang!==D.lang)return false;
  if(D.event!=="all"&&e.event!==D.event)return false;return true;});}
function cnt(ev,list){return (list||filt()).filter(function(e){return e.event===ev;}).length;}
function byDay(list){var map={};for(var i=D.days-1;i>=0;i--){var k=new Date(Date.now()-i*86400000).toISOString().slice(5,10);map[k]=0;}
 list.forEach(function(e){var k=e.ts.slice(5,10);if(map[k]!==undefined)map[k]++;});return Object.keys(map).map(function(k){return {k:k,v:map[k]};});}
function spark(list){var d=byDay(list);var max=Math.max(1,Math.max.apply(null,d.map(function(x){return x.v;})));
 var w=560,h=120,p=8;var pts=d.map(function(x,i){return [p+i*(w-2*p)/(d.length-1),h-p-(x.v/max)*(h-2*p)];});
 var line=pts.map(function(pt,i){return (i?"L":"M")+pt[0].toFixed(1)+","+pt[1].toFixed(1);}).join(" ");
 var area=line+" L"+(w-p)+","+(h-p)+" L"+p+","+(h-p)+" Z";
 return '<svg viewBox="0 0 '+w+" "+h+'" style="width:100%;height:120px"><defs><linearGradient id="nxg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4c8b6a" stop-opacity=".45"/><stop offset="1" stop-color="#4c8b6a" stop-opacity="0"/></linearGradient></defs>'+
  '<path d="'+area+'" fill="url(#nxg)"/><path d="'+line+'" fill="none" stroke="#1d5c3f" stroke-width="2.5" stroke-linecap="round"/>'+
  pts.map(function(pt,i){return '<circle cx="'+pt[0]+'" cy="'+pt[1]+'" r="3" fill="'+(i===pts.length-1?"#d97706":"#1d5c3f")+'"><title>'+d[i].k+": "+d[i].v+"</title></circle>";}).join("")+"</svg>";}
function donut(list){var mk={};list.forEach(function(e){var m=(e.meta||{}).market||"PK";mk[m]=(mk[m]||0)+1;});
 var keys=Object.keys(mk);var tot=keys.reduce(function(a,k){return a+mk[k];},0)||1;var acc=0;
 var segs=keys.map(function(k,i){var frac=mk[k]/tot;var a0=acc*2*Math.PI-Math.PI/2;acc+=frac;var a1=acc*2*Math.PI-Math.PI/2;
  var x0=60+48*Math.cos(a0),y0=60+48*Math.sin(a0),x1=60+48*Math.cos(a1),y1=60+48*Math.sin(a1);
  var large=frac>0.5?1:0;return '<path d="M60,60 L'+x0.toFixed(1)+","+y0.toFixed(1)+" A48,48 0 "+large+" 1 "+x1.toFixed(1)+","+y1.toFixed(1)+' Z" fill="'+PAL[i%8]+'"><title>'+k+": "+mk[k]+"</title></path>";}).join("");
 return '<svg viewBox="0 0 120 120" style="width:120px;height:120px">'+segs+'<circle cx="60" cy="60" r="26" fill="var(--sf)"/><text x="60" y="64" text-anchor="middle" font-size="14" font-weight="800" fill="var(--ink)">'+tot+"</text></svg>"+
  '<div class="legend">'+keys.map(function(k,i){return "<span><i style=\"background:"+PAL[i%8]+'"></i>'+k+" "+mk[k]+"</span>";}).join("")+"</div>";}
function topProducts(list){var m={};list.forEach(function(e){if(e.event==="product_view"&&(e.meta||{}).pid){m[e.meta.pid]=(m[e.meta.pid]||0)+1;}});
 var arr=Object.keys(m).map(function(k){return {id:k,v:m[k]};}).sort(function(a,b){return b.v-a.v;}).slice(0,6);
 var max=Math.max(1,arr[0]?arr[0].v:1);
 if(!arr.length)return '<div class="empty">—</div>';
 return arr.map(function(x,i){var p=prod(x.id);var nm=p?pn(p):x.id;
  return '<div style="display:flex;align-items:center;gap:8px;margin:6px 0;font-size:11px"><span style="width:110px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+esc(nm)+'</span><div style="flex:1;height:16px;background:var(--bg2);border-radius:5px;overflow:hidden"><div style="height:100%;width:'+Math.round(x.v/max*100)+"%;background:"+PAL[i%8]+';border-radius:5px"></div></div><b style="width:26px;text-align:end">'+x.v+"</b></div>";}).join("");}

function paint(){if(!root.classList.contains("on"))return;
 var list=filt();var views=cnt("product_view",list),adds=cnt("add_to_cart",list),cks=cnt("checkout_start",list),hag=cnt("haggle_start",list),ord=cnt("order_placed",list);
 var conv=views?Math.round(ord/views*100):0;
 var rev=ADSLOTS.filter(function(a){return a.status==="sold";}).reduce(function(a,b){return a+Number(b.price||0);},0);
 var h='<div class="hd"><span class="lg">🛰 Nexus<b>Command</b></span><span class="sp"></span>'+
  '<button data-cmd="kit">📄 Media Kit</button><button data-cmd="csv">⬇ CSV</button><button data-cmd="close">✕</button></div>'+
  '<div class="ctl">'+
  '<label>Days <input type="range" min="7" max="30" step="1" value="'+D.days+'" data-c="days"><span id="nxDaysV">'+D.days+'</span></label>'+
  '<label>Market <select data-c="market"><option value="all">All</option>'+Object.keys(MK).map(function(k){return '<option value="'+k+'"'+(D.market===k?" selected":"")+">"+k+"</option>";}).join("")+"</select></label>"+
  '<label>Lang <select data-c="lang"><option value="all">All</option>'+["en","ur","sk","de","hi"].map(function(k){return '<option value="'+k+'"'+(D.lang===k?" selected":"")+">"+k+"</option>";}).join("")+"</select></label>"+
  '<label>Event <select data-c="event"><option value="all">All</option>'+["product_view","add_to_cart","checkout_start","haggle_start","order_placed"].map(function(k){return '<option value="'+k+'"'+(D.event===k?" selected":"")+">"+k+"</option>";}).join("")+"</select></label>"+
  '<label>Sort <select data-c="sort"><option value="new">Newest</option><option value="old">Oldest</option></select></label>'+
  '<label class="tg"><input type="checkbox" data-c="live"'+(D.live?" checked":"")+"> Live</label>"+
  '<label class="tg"><input type="checkbox" data-c="compact"'+(D.compact?" checked":"")+"> Compact</label>"+
  '<button class="act gh" data-cmd="reset">Reset</button></div>'+
  '<div class="tabs">'+[["over","📊 Overview"],["mod","🛡 Moderation"],["ver","✅ Verification"],["ads","📢 Ads"],["kit","📄 Media Kit"]].map(function(t){return '<button data-tab="'+t[0]+'" class="'+(D.tab===t[0]?"on":"")+'">'+t[1]+"</button>";}).join("")+"</div>"+
  '<div class="body">';
 if(D.tab==="over"){
  h+='<div class="kpis">'+
   kpi(views,"Product views",PAL[0],"+live")+kpi(adds,"Add to cart",PAL[1],"")+kpi(cks,"Checkouts",PAL[3],"")+kpi(hag,"Haggles",PAL[5],"")+kpi(ord,"Orders",PAL[6],"")+kpi(conv+"%","Conversion",PAL[4],"")+kpi(money(rev),"Ad revenue /mo",PAL[2],"")+"</div>"+
   '<div class="grid2"><div class="panel"><h3>📈 Activity · last '+D.days+" days "+(D.demo?'<span class="badge">DEMO</span>':"")+"</h3>"+spark(list)+"</div>"+
   '<div class="panel"><h3>🌍 Markets</h3><div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">'+donut(list)+"</div></div></div>"+
   '<div class="grid2" style="margin-top:12px"><div class="panel"><h3>🏆 Top products</h3>'+topProducts(list)+"</div>"+
   '<div class="panel"><h3>🔻 Funnel</h3><div class="funnel">'+
   funnel("Views",views,PAL[0],views)+funnel("Add to cart",adds,PAL[1],views)+funnel("Checkout",cks,PAL[3],views)+funnel("Haggle",hag,PAL[5],views)+funnel("Order",ord,PAL[6],views)+"</div></div></div>";
 }
 if(D.tab==="mod"){
  var rows=D.listings.concat(D.shops.map(function(s){return Object.assign({_type:"shop"},s);})).concat(D.reports.map(function(r){return Object.assign({_type:"report"},r);}));
  rows=rows.filter(function(r){var t=JSON.stringify(r).toLowerCase();return !D.q||t.indexOf(D.q.toLowerCase())>=0;});
  var selN=Object.keys(D.sel).filter(function(k){return D.sel[k];}).length;
  h+='<div class="panel"><h3>🛡 Moderation queue</h3><input class="search" placeholder="Search listings, shops, reports…" value="'+esc(D.q)+'" data-c="q">'+
   (selN?'<div class="bulkbar"><b>'+selN+' selected</b><button class="mini ok" data-cmd="bulkok">✓ Approve all</button><button class="mini bad" data-cmd="bulkno">✕ Reject all</button><button class="mini gh" data-cmd="bulkclear">Clear</button></div>':"")+
   '<table><tr><th></th><th>Type</th><th>Name</th><th>Status</th><th></th></tr>'+
   (rows.length?rows.map(function(r){var ty=r._type||(r.reason?"report":(r.owner_id&&!r.price?"shop":"listing"));
    var nm=r.name||r.seller||r.listing_id||r.id;var st=r._type==="report"?"open":(r.approved===false?"pending":"approved");
    return '<tr><td><input type="checkbox" data-sel="'+r.id+'"'+(D.sel[r.id]?" checked":"")+'></td><td><span class="pill info">'+ty+'</span></td><td><a href="#" data-drawer="'+r.id+'" style="color:var(--grn);font-weight:700">'+esc(nm)+"</a></td><td>"+pill(st)+"</td><td>"+
     (st!=="approved"?'<button class="mini ok" data-ok="'+r.id+'" data-ty="'+ty+'">✓</button> ':"")+'<button class="mini bad" data-no="'+r.id+'" data-ty="'+ty+'">✕</button></td></tr>';}).join(""):'<tr><td colspan="5"><div class="empty">Queue clear 🎉</div></td></tr>')+"</table></div>";
 }
 if(D.tab==="ver"){
  h+='<div class="panel"><h3>✅ Seller verification</h3><table><tr><th>Shop</th><th>WhatsApp</th><th></th></tr>'+
   (D.vers.length?D.vers.map(function(v){return "<tr><td><b>"+esc(v.shop_name)+"</b></td><td>"+esc(v.wa)+'</td><td><button class="mini ok" data-ver="'+v.id+'">✓ Approve</button></td></tr>';}).join(""):'<tr><td colspan="3"><div class="empty">No pending verifications</div></td></tr>')+"</table></div>";
 }
 if(D.tab==="ads"){
  h+='<div class="panel"><h3>📢 Ad slots · revenue '+money(rev)+'/mo</h3>'+
   ADSLOTS.map(function(a){return '<div class="adrow"><b style="flex:1;min-width:140px">'+esc(a.name)+'</b><input type="number" value="'+a.price+'" data-adp="'+a.id+'" style="width:90px"><input placeholder="Advertiser" value="'+esc(a.adv)+'" data-ada="'+a.id+'" style="flex:1;min-width:120px"><select data-ads="'+a.id+'"><option value="available"'+(a.status==="available"?" selected":"")+'>Available</option><option value="sold"'+(a.status==="sold"?" selected":"")+'>Sold</option></select></div>';}).join("")+
   '<p class="mut" style="font-size:11px;margin-top:10px">Changes save instantly. Sold slots count toward monthly ad revenue.</p></div>';
 }
 if(D.tab==="kit"){h+=kitHTML(views,adds,ord,conv,rev);}
 h+="</div>";
 h+='<div class="drawer'+(D.drawer?" on":"")+'" id="nxDrawer">'+(D.drawer?drawerHTML():"")+"</div>";
 root.innerHTML=h;
}
function kpi(v,l,c,d){return '<div class="kpi" style="--kc:'+c+'"><b>'+v+"</b><span>"+l+'</span><div class="dl">'+d+"</div></div>";}
function pill(s){return '<span class="pill '+(s==="approved"?"ok":s==="open"?"bad":"warn")+'">'+s+"</span>";}
function funnel(l,v,c,max){var pc=max?Math.max(6,Math.round(v/max*100)):6;return '<div class="f"><span style="width:80px">'+l+'</span><div class="bar" style="width:'+pc+"%;background:"+c+'">'+v+"</div></div>";}
function drawerHTML(){var r=findRec(D.drawer);if(!r)return "";
 return '<button class="x" data-cmd="closedr">✕</button><h3 style="margin-bottom:12px">Record detail</h3>'+
  Object.keys(r).slice(0,14).map(function(k){var v=r[k];if(typeof v==="object")v=JSON.stringify(v);return '<div class="kv"><span>'+esc(k)+"</span><b>"+esc(String(v))+"</b></div>";}).join("");}
function findRec(id){return D.listings.concat(D.shops,D.reports,D.vers).find(function(x){return x.id===id;});}
function kitHTML(views,adds,ord,conv,rev){
 return '<div class="panel"><h3>📄 Media Kit — ready to send to brands</h3>'+
  '<p class="mut" style="font-size:12px;margin-bottom:12px">Live numbers from your Command Center. Open the printable kit and share it with Gul Ahmed, Khaadi, Sapphire…</p>'+
  '<div class="kpis">'+kpi(views,"Monthly views",PAL[0],"")+kpi(adds,"Cart adds",PAL[1],"")+kpi(ord,"Orders",PAL[6],"")+kpi(conv+"%","Conversion",PAL[4],"")+"</div>"+
  '<button class="act" data-cmd="kit" style="margin-top:8px">🖨 Open printable Media Kit</button></div>';}
function openKit(){
 var list=filt();var views=cnt("product_view",list),adds=cnt("add_to_cart",list),ord=cnt("order_placed",list),conv=views?Math.round(ord/views*100):0;
 var w=window.open("","_blank");if(!w)return;
 w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>NexusShop Media Kit</title><style>body{font-family:Georgia,serif;color:#26221b;margin:0;padding:40px;background:#f6f1e4}h1{font-size:34px;margin:0 0 4px}h1 b{color:#1d5c3f}.sub{color:#6b6355;font-size:14px;margin-bottom:24px}.k{display:inline-block;background:#fff;border:1px solid #d9d0bb;border-radius:14px;padding:16px 22px;margin:6px;min-width:120px}.k b{display:block;font-size:30px;color:#1d5c3f}.k span{font-size:12px;color:#6b6355}table{width:100%;border-collapse:collapse;margin:20px 0;background:#fff}td,th{border:1px solid #d9d0bb;padding:10px;text-align:left;font-size:14px}th{background:#dcead9}.ft{margin-top:24px;font-size:12px;color:#6b6355}</style></head><body>'+
  '<h1>Nexus<b>Shop</b> — Media Kit</h1><div class="sub">COD-first marketplace · Pakistan · Nigeria · Slovakia · Germany · India · Global · '+new Date().toLocaleDateString()+"</div>"+
  '<div class="k"><b>'+views+'</b><span>product views / '+D.days+'d</span></div><div class="k"><b>'+adds+'</b><span>cart adds</span></div><div class="k"><b>'+ord+'</b><span>orders</span></div><div class="k"><b>'+conv+'%</b><span>conversion</span></div>'+
  '<h2 style="font-size:20px">Advertising slots</h2><table><tr><th>Placement</th><th>Monthly (PKR)</th><th>Status</th></tr>'+
  ADSLOTS.map(function(a){return "<tr><td>"+a.name+"</td><td>"+Number(a.price).toLocaleString()+"</td><td>"+a.status+"</td></tr>";}).join("")+"</table>"+
  '<h2 style="font-size:20px">Why NexusShop</h2><p style="font-size:14px;line-height:1.6">Cash-on-delivery with parcel inspection, direct WhatsApp checkout to verified sellers, AI-assisted haggling (Mol-Bhav), 5 languages and 6 markets. Zero commission for sellers during founding. Your brand reaches shoppers at the moment of purchase intent.</p>'+
  '<div class="ft">Contact: neuralfocusai@gmail.com · WhatsApp +54 225 755 0650 · nexusshoop.is-a.dev</div></body></html>');
 w.document.close();setTimeout(function(){try{w.print();}catch(e){}},400);}
function exportCSV(){var list=filt();var csv="ts,event,market,lang,pid\n"+list.map(function(e){var m=e.meta||{};return e.ts+","+e.event+","+(m.market||"")+","+(m.lang||"")+","+(m.pid||"");}).join("\n");
 var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="nexusshop-events.csv";a.click();}
function toast2(msg,undo){var old=root.querySelector(".toast2");if(old)old.remove();var t=document.createElement("div");t.className="toast2";t.innerHTML=esc(msg)+(undo?' <button data-cmd="undo">Undo</button>':"");root.appendChild(t);setTimeout(function(){if(t.parentNode)t.remove();},4000);}

root.addEventListener("input",function(e){var c=e.target.dataset.c;if(!c)return;
 if(c==="days"){D.days=+e.target.value;var v=root.querySelector("#nxDaysV");if(v)v.textContent=D.days;paint();}
 if(c==="q"){D.q=e.target.value;paint();var s=root.querySelector(".search");if(s){s.focus();s.setSelectionRange(s.value.length,s.value.length);}}
 if(c==="live"){D.live=e.target.checked;}
 if(c==="compact"){D.compact=e.target.checked;root.style.fontSize=D.compact?"12px":"";paint();}});
root.addEventListener("change",function(e){var c=e.target.dataset.c;
 if(c&&["market","lang","event","sort"].indexOf(c)>=0){D[c]=e.target.value;paint();}
 var adp=e.target.dataset.adp;if(adp){var a=ADSLOTS.find(function(x){return x.id===adp;});a.price=+e.target.value;saveAds();paint();}
 var ada=e.target.dataset.ada;if(ada){var a2=ADSLOTS.find(function(x){return x.id===ada;});a2.adv=e.target.value;saveAds();}
 var ads=e.target.dataset.ads;if(ads){var a3=ADSLOTS.find(function(x){return x.id===ads;});a3.status=e.target.value;saveAds();paint();}
 var sel=e.target.dataset.sel;if(sel){D.sel[sel]=e.target.checked;paint();}});
function saveAds(){localStorage.setItem("nx_adslots",JSON.stringify(ADSLOTS));}
root.addEventListener("click",function(e){
 var tb=e.target.closest("[data-tab]");if(tb){D.tab=tb.dataset.tab;paint();return;}
 var dr=e.target.closest("[data-drawer]");if(dr){e.preventDefault();D.drawer=dr.dataset.drawer;paint();return;}
 var ok=e.target.closest("[data-ok]");if(ok){approve(ok.dataset.ty,ok.dataset.ok);return;}
 var no=e.target.closest("[data-no]");if(no){reject(no.dataset.ty,no.dataset.ok);return;}
 var ver=e.target.closest("[data-ver]");if(ver){sb.from("nx_verifications").update({status:"approved"}).eq("id",ver.dataset.ver).then(function(){toast2("✓ Verified");pull();});return;}
 var cm=e.target.closest("[data-cmd]");if(cm){var a=cm.dataset.cmd;
  if(a==="close")root.classList.remove("on");
  if(a==="closedr"){D.drawer=null;paint();}
  if(a==="reset"){D.days=14;D.market="all";D.lang="all";D.event="all";D.q="";D.sel={};paint();}
  if(a==="csv")exportCSV();
  if(a==="kit")openKit();
  if(a==="bulkclear"){D.sel={};paint();}
  if(a==="bulkok"){Object.keys(D.sel).forEach(function(id){if(D.sel[id])approve("listing",id,true);});D.sel={};pull();}
  if(a==="bulkno"){Object.keys(D.sel).forEach(function(id){if(D.sel[id])reject("listing",id,true);});D.sel={};pull();}
  if(a==="undo"&&D.undo){D.undo();D.undo=null;cm.parentNode.remove();}
  return;}});
function approve(ty,id,silent){var tbl=ty==="shop"?"nx_shops":ty==="report"?"nx_reports":"nx_listings";
 var upd=ty==="report"?{status:"dismissed"}:{approved:true};
 sb.from(tbl).update(upd).eq("id",id).then(function(){if(!silent)toast2("✓ Approved");pull();});}
function reject(ty,id,silent){var tbl=ty==="shop"?"nx_shops":ty==="report"?"nx_reports":"nx_listings";
 var prev=findRec(id);var upd=ty==="report"?{status:"dismissed"}:{approved:false,active:false};
 sb.from(tbl).update(upd).eq("id",id).then(function(){if(!silent){D.undo=function(){sb.from(tbl).update(ty==="report"?{status:"open"}:{approved:true,active:true}).eq("id",id).then(pull);};toast2("✕ Rejected",true);}pull();});}
setInterval(function(){if(D.live&&root.classList.contains("on"))pull();},15000);

function addOpen(){var v=document.querySelector("main .view");if(!v)return;
 if((S.view==="account"||S.view==="settings")&&S.admin&&!v.querySelector("[data-nxcmdopen]")){
  var b=document.createElement("div");b.className="card";b.setAttribute("data-nxcmdopen","1");b.style.borderColor="var(--grn)";
  b.innerHTML='<div class="sl"><b>🛰 Owner Command Center</b><button class="btn grn sm" id="nxOpenCmd">Open</button></div><p class="mut" style="font-size:11px;margin-top:4px">KPIs, moderation, verification, ads & media kit.</p>';
  v.appendChild(b);b.querySelector("#nxOpenCmd").onclick=function(){root.classList.add("on");pull();};}}
var _r=window.render;window.render=function(){var o=_r.apply(this,arguments);setTimeout(addOpen,240);return o;};
setTimeout(addOpen,600);
})();
