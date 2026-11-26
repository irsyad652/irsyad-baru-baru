let EMAIL="irsyad11302008@gmail.com";
// loader
let n=0;const L=document.getElementById("loader"),pc=document.getElementById("pct"),pb=document.getElementById("pb");
const t=setInterval(()=>{n=Math.min(100,n+Math.ceil(Math.random()*7));pc.firstChild.nodeValue=n;pb.style.width=n+"%";if(n>=100){clearInterval(t);setTimeout(()=>{L.style.opacity=0;setTimeout(()=>L.remove(),600);swing()},300)}},60);
// stars
const cv=document.getElementById("stars"),cx=cv.getContext("2d");let S=[];
function rs(){cv.width=innerWidth;cv.height=innerHeight;S=Array.from({length:130},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*1.3+.2,v:Math.random()*.15+.03}))}
rs();addEventListener("resize",rs);
(function d(){cx.clearRect(0,0,cv.width,cv.height);cx.fillStyle="#cfdcff";S.forEach(s=>{s.y=(s.y+s.v)%cv.height;cx.globalAlpha=.4+s.r/2;cx.beginPath();cx.arc(s.x,s.y,s.r,0,7);cx.fill()});requestAnimationFrame(d)})();
// typing
const P=["Industrial Automation","PLC Programming","Electrical Control","HMI Design"],R=document.getElementById("role");let pi=0,ci=0,del=false;
(function ty(){const w=P[pi];R.textContent=w.slice(0,ci);if(!del&&ci==w.length){del=true;return setTimeout(ty,1400)}if(del&&ci==0){del=false;pi=(pi+1)%P.length}ci+=del?-1:1;setTimeout(ty,del?40:80)})();
// nav
const links=[...document.querySelectorAll("nav a")];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle("on",a.hash=="#"+e.target.id))}),{threshold:.5});
document.querySelectorAll("section").forEach(s=>io.observe(s));
// tabs
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tabs button,.tp").forEach(x=>x.classList.remove("on"));b.classList.add("on");document.getElementById(b.dataset.t).classList.add("on")});
// lanyard
const lan=document.getElementById("lan");let a=0,v=0,drag=false,run=false;
function swing(){a=18;v=0}
function tick(){if(!drag){v+=-a*.012;v*=.985;a+=v}lan.style.transform="rotate("+a+"deg)";requestAnimationFrame(tick)}tick();
lan.addEventListener("pointerdown",e=>{if(document.body.classList.contains("editing"))return;drag=true;lan.setPointerCapture(e.pointerId)});
lan.addEventListener("pointermove",e=>{if(!drag)return;const r=lan.getBoundingClientRect(),px=r.left+r.width/2,py=lan.parentElement.getBoundingClientRect().top;a=Math.max(-60,Math.min(60,Math.atan2(px-e.clientX,0-0)*0+(e.clientX-(lan.parentElement.getBoundingClientRect().left+150))*.35))});
lan.addEventListener("pointerup",()=>{drag=false;v=0});
// edit mode
const SEL="h1,.sec-t,.about h2,.about .lead,#home .lead,.id h3,.id small,.id em,.edu b,.edu span,.edu i,.stats strong,.stats b,.stats span,.music h3,.music .lead,.music .box b,.music .box>span,#p2 h4,#p2 p,#p3 h4,#p3 p,.tech .pc,.soc a,footer>div";
const E=[...document.querySelectorAll(SEL)],K="irsyad-v2",P1=document.getElementById("p1"),B=document.body,$=id=>document.getElementById(id),IL=[...document.querySelectorAll(".il")],SA=[...document.querySelectorAll(".soc a")];
let D={};try{D=JSON.parse(localStorage.getItem(K)||"{}")}catch(e){}
function ph(s){document.querySelectorAll(".id .ph").forEach(x=>{x.style.background="url("+s+") center/cover";x.style.color="transparent"})}
if(D.t)E.forEach((el,i)=>{if(D.t[i]!=null)el.innerHTML=D.t[i]});
if(D.h)SA.forEach((a,i)=>{if(D.h[i])a.href=D.h[i]});
if(D.p1)P1.innerHTML=D.p1;
if(D.img)ph(D.img);
if(D.em)EMAIL=D.em;
if(D.r)P.splice(0,P.length,...D.r.split(",").map(s=>s.trim()).filter(Boolean));
function msg(t){$("emsg").textContent=t;setTimeout(()=>$("emsg").textContent="",3000)}
function setEd(on){B.classList.toggle("editing",on);
 [...E,...P1.querySelectorAll("h4,p")].forEach(el=>el.contentEditable=on?"true":"false");
 P1.querySelectorAll(".pc").forEach(c=>{if(!c.querySelector(".del"))c.insertAdjacentHTML("beforeend",'<button class="del editonly" aria-label="Hapus projek">×</button>')});
 $("etg").textContent=on?"Batal":"Edit";
 if(on){$("ie").value=EMAIL;$("ir").value=P.join(", ");IL.forEach((x,i)=>{const h=SA[i].getAttribute("href");x.value=h&&h!="#"?h:""})}}
const fi=document.createElement("input");fi.type="file";fi.accept="image/*";
$("eph").onclick=()=>fi.click();
fi.onchange=()=>{const f=fi.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{const im=new Image();im.onload=()=>{const c=document.createElement("canvas"),s=Math.min(1,600/Math.max(im.width,im.height));c.width=im.width*s;c.height=im.height*s;c.getContext("2d").drawImage(im,0,0,c.width,c.height);D.img=c.toDataURL("image/jpeg",.8);ph(D.img);msg("Foto siap, klik Simpan")};im.src=rd.result};rd.readAsDataURL(f)};
$("etg").onclick=()=>B.classList.contains("editing")?location.reload():setEd(true);
$("eadd").onclick=()=>{P1.insertAdjacentHTML("beforeend",'<div class="pc"><div class="th"></div><div class="b"><h4>Nama Projek Baru</h4><p>Deskripsi singkat projek.</p><a class="btn" href="#contact">Details</a></div></div>');setEd(true)};
$("ers").onclick=()=>{try{localStorage.removeItem(K)}catch(e){}location.reload()};
P1.addEventListener("click",e=>{const x=e.target.closest(".del");if(x&&B.classList.contains("editing"))x.closest(".pc").remove()});
document.querySelector("main").addEventListener("click",e=>{if(B.classList.contains("editing")&&e.target.closest("a"))e.preventDefault()});
$("esv").onclick=()=>{EMAIL=$("ie").value.trim()||EMAIL;IL.forEach((x,i)=>{if(x.value.trim())SA[i].href=x.value.trim()});P.splice(0,P.length,...($("ir").value||P.join(",")).split(",").map(s=>s.trim()).filter(Boolean));setEd(false);const d={t:E.map(e=>e.innerHTML),h:SA.map(a=>a.getAttribute("href")),p1:P1.innerHTML,em:EMAIL,img:D.img,r:P.join(", ")};try{localStorage.setItem(K,JSON.stringify(d));D=d;msg("Tersimpan")}catch(e){msg("Gagal menyimpan: penyimpanan penuh")}};
// form
document.getElementById("f").onsubmit=e=>{e.preventDefault();const s=encodeURIComponent("Pesan dari "+fn.value),b=encodeURIComponent(fm.value+"\n\n"+fn.value+" ("+fe.value+")");location.href="mailto:"+EMAIL+"?subject="+s+"&body="+b};

// polish: reveal, progress, lightbox
const RV=document.querySelectorAll(".sec-t,.about>div,.edu .box,.pc,.ct>div,.tabs");
RV.forEach(e=>e.classList.add("rv"));
const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io2.unobserve(e.target)}}),{threshold:.1});
RV.forEach(e=>io2.observe(e));
const pg=document.createElement("div");pg.id="prog";document.body.append(pg);
addEventListener("scroll",()=>{const h=document.documentElement;pg.style.width=(h.scrollTop/((h.scrollHeight-h.clientHeight)||1)*100)+"%"},{passive:true});
const lb=document.createElement("div");lb.id="lb";lb.innerHTML='<img alt="Foto diperbesar">';document.body.append(lb);
lb.onclick=()=>lb.classList.remove("on");addEventListener("keydown",e=>{if(e.key=="Escape")lb.classList.remove("on")});
document.addEventListener("click",e=>{if(B.classList.contains("editing"))return;const t=e.target.closest(".th,.pic");if(!t)return;const m=/url\(["']?([^"')]+)["']?\)/.exec(getComputedStyle(t).backgroundImage);if(!m)return;lb.firstChild.src=m[1];lb.classList.add("on")});

// counters & spotlight
document.querySelectorAll("[data-n]").forEach(el=>{const n=+el.dataset.n,o=new IntersectionObserver(es=>{if(es[0].isIntersecting){o.disconnect();let i=0;const t=setInterval(()=>{i++;el.textContent=i;if(i>=n)clearInterval(t)},200)}},{threshold:.6});o.observe(el)});
document.addEventListener("pointermove",e=>{const t=e.target.closest&&e.target.closest(".box,.pc");if(t){const r=t.getBoundingClientRect();t.style.setProperty("--mx",e.clientX-r.left+"px");t.style.setProperty("--my",e.clientY-r.top+"px")}});
