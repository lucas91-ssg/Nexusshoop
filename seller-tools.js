/* ===== SELLER CONTROL: stock & listing management (Peace checklist) ===== */
(function(){
function esc2(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function boot(){if(!window.SB||!window.NXUID)return setTimeout(boot,1500);
 SB.from('stores').select('id').eq('owner_id',window.NXUID).limit(1).then(function(r){var s=r.data&&r.data[0];if(!s)return;window.NXSHOPID=window.NXSHOPID||s.id;load(s.id);});}
function load(shopId){SB.from('ns_products').select('*').eq('shop_id',shopId).order('created_at',{ascending:false}).then(function(r){var l=r.data||[];
 var old=document.getElementById('nxMgr');if(old)old.remove();
 var div=document.createElement('div');div.className='nxpf-card';div.id='nxMgr';
 div.innerHTML='<h2 style="font-size:16px;font-weight:800;margin-bottom:6px">🗂️ Listing manager</h2><p style="font-size:11.5px;opacity:.75;margin-bottom:10px">Stock, pricing and listing updates — live edits, no republish needed.</p>'+
 (l.length?l.map(function(p){return '<div style="border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:10px;margin-bottom:8px;font-size:12.5px;line-height:1.6">'+
 '<div style="display:flex;gap:8px;align-items:center">'+(p.image_url?'<img src="'+p.image_url+'" style="width:40px;height:40px;border-radius:8px;object-fit:cover">':'<div style="width:40px;height:40px;border-radius:8px;background:rgba(255,255,255,.06)"></div>')+
 '<div style="flex:1"><b>'+esc2(p.title_en)+'</b><div style="font-size:11px;opacity:.7">Rs. '+Number(p.price).toLocaleString()+' · stock '+p.stock+' · '+(p.is_active?'ACTIVE':'paused')+'</div></div></div>'+
 '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">'+
 '<button class="nxpf-btn" style="padding:7px 10px" onclick="nxStock(\''+p.id+'\','+(Number(p.stock||0)+1)+')">➕ stock</button>'+
 '<button class="nxpf-btn" style="padding:7px 10px" onclick="nxStock(\''+p.id+'\','+Math.max(0,Number(p.stock||0)-1)+')">➖ stock</button>'+
 '<button class="nxpf-btn" style="padding:7px 10px" onclick="nxEdit(\''+p.id+'\')">✏️ Edit listing</button>'+
 '<button class="nxpf-btn" style="padding:7px 10px;background:transparent;border:1px solid rgba(251,191,36,.4);color:#fde68a" onclick="nxPause(\''+p.id+'\','+(!p.is_active)+')">'+(p.is_active?'⏸ Pause':'▶ Activate')+'</button>'+
 '</div></div>';}).join(''):'<p style="font-size:12px;opacity:.7">No products yet — publish your first one above.</p>');
 (document.querySelector('main')||document.body).appendChild(div);});}
window.nxStock=function(id,v){SB.from('ns_products').update({stock:v}).eq('id',id).then(function(r){if(r.error){toast(r.error.message,'err');return}toast('✓ Stock → '+v,'ok');load(window.NXSHOPID);});};
window.nxPause=function(id,on){SB.from('ns_products').update({is_active:on}).eq('id',id).then(function(r){if(r.error){toast(r.error.message,'err');return}toast(on?'▶ Live again':'⏸ Paused','info');load(window.NXSHOPID);});};
window.nxEdit=function(id){SB.from('ns_products').select('*').eq('id',id).single().then(function(r){var p=r.data;if(!p)return;
 var ov=document.getElementById('nxPayOv');if(!ov){document.body.insertAdjacentHTML('beforeend','<div id="nxPayOv" style="position:fixed;inset:0;z-index:999;background:#070b21;overflow-y:auto;padding:16px" hidden></div>');ov=document.getElementById('nxPayOv');}
 ov.hidden=false;
 ov.innerHTML='<div class="nxpf-card"><button class="nxpf-btn" style="background:transparent;border:1px solid rgba(255,255,255,.2);color:inherit" onclick="document.getElementById(\'nxPayOv\').hidden=true">← Back</button>'+
 '<h2 style="margin:10px 0;font-size:16px;font-weight:800">✏️ Edit listing</h2>'+
 '<div class="nxpf-lbl">Title (English)</div><input class="nxpf-inp" id="eT" value="'+esc2(p.title_en)+'">'+
 '<div class="nxpf-lbl">Title (Urdu)</div><input class="nxpf-inp" id="eU" value="'+esc2(p.title_ur||'')+'">'+
 '<div class="nxpf-lbl">Price PKR</div><input class="nxpf-inp" id="eP" type="number" value="'+p.price+'">'+
 '<div class="nxpf-lbl">Old price (% OFF badge)</div><input class="nxpf-inp" id="eO" type="number" value="'+(p.old_price||'')+'">'+
 '<div class="nxpf-lbl">Stock</div><input class="nxpf-inp" id="eS" type="number" value="'+(p.stock||0)+'">'+
 '<div class="nxpf-lbl">Photo URL</div><input class="nxpf-inp" id="eI" value="'+esc2(p.image_url||'')+'">'+
 '<div class="nxpf-lbl">Description</div><textarea class="nxpf-inp" id="eD" rows="3">'+esc2(p.description||'')+'</textarea>'+
 '<button class="nxpf-btn" onclick="nxEditSave(\''+p.id+'\')">💾 Save changes</button></div>';});};
window.nxEditSave=function(id){var g=function(k){return document.getElementById(k).value};
 SB.from('ns_products').update({title_en:g('eT'),title_ur:g('eU'),price:Number(g('eP'))||0,old_price:Number(g('eO'))||null,stock:Number(g('eS'))||0,image_url:g('eI'),description:g('eD')}).eq('id',id).then(function(r){if(r.error){toast(r.error.message,'err');return}document.getElementById('nxPayOv').hidden=true;toast('✓ Listing updated live','ok');load(window.NXSHOPID);});};
setTimeout(boot,2000);})();
