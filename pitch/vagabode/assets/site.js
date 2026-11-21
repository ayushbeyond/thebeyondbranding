/* Vagabode concept · shared site script (Beyond Branding) */
(() => {
"use strict";
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const P=window.VG||[];
const NUM="919201676762";
const ROOMS=[null,{n:"I",t:"The Surrealists",d:"Floating roses, avenging angels and a merman in a crown. Dreams you can button up."},{n:"II",t:"Masters & Moderns",d:"Tyeb Mehta’s bull, Matisse’s musicians, two Fridas and a red horse."},{n:"III",t:"The Cinema Hall",d:"Lights down. Hitchcock, Kubrick and a club nobody talks about."},{n:"IV",t:"Riders & Roads",d:"Cavalry, stallions and Scottish summers. For the ones who keep moving."}];
const GROUPS={art:"Art masters",cinema:"Cinema",travel:"Travel & folk",original:"Vagabode originals"};
const SIZES=["S","M","L","XL","XXL","3XL","4XL"];
const inr=n=>"₹"+Math.round(n).toLocaleString("en-IN");
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const wa=t=>"https://wa.me/"+NUM+"?text="+encodeURIComponent(t);
const off=p=>Math.round((1-p.p/p.m)*100);
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const byId=id=>P.find(p=>p.id===id);

/* storage */
const load=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}};
const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
let bag=load("vgb-bag2",[]),wish=load("vgb-wish",[]);
bag=bag.filter(b=>byId(b.id));wish=wish.filter(byId);

const heartSvg='<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-9.2-8.6C1.2 8.2 3 4.8 6.4 4.8c2 0 3.2 1.1 3.9 2.3h3.4c.7-1.2 1.9-2.3 3.9-2.3 3.4 0 5.2 3.4 3.6 6.6C19 15.6 12 20 12 20z"/></svg>';
function card(p,opts={}){
  const R=ROOMS[p.r],w=wish.includes(p.id);
  return `<article class="pcard${opts.rv?" rv":""}" data-id="${p.id}">
  <div class="pcard__img"><img class="main" src="assets/img/s/${p.id}.webp" alt="${esc(p.t)}" loading="lazy" width="600" height="600">${p.mk?`<img class="alt" src="assets/mock/${p.id}.webp" alt="" loading="lazy">`:""}
  <span class="tag">Room ${R.n}</span><span class="tag off">−${off(p)}%</span>
  <button class="heart" data-wish="${p.id}" aria-pressed="${w}" aria-label="Save ${esc(p.t)} to wishlist">${heartSvg}</button></div>
  <div class="pcard__b"><span class="pcard__room">${R.t}</span><h3 class="pcard__t">${esc(p.t)}</h3><span class="pcard__a">${esc(p.a)}</span><span class="pcard__p">${inr(p.p)} <s>${inr(p.m)}</s></span></div>
  <a class="cover" href="product.html?id=${p.id}" aria-label="View ${esc(p.t)}"></a></article>`;
}

/* chrome: satchel + toast + mobile nav */
document.body.insertAdjacentHTML("beforeend",`
<div class="scrim" id="scrim"></div>
<aside class="sat" id="sat" aria-label="Your satchel" aria-hidden="true">
  <div style="display:flex;justify-content:space-between;align-items:start;gap:12px"><div><h2>Your satchel</h2><p class="k">Checkout is a WhatsApp chat</p></div><button class="x" id="satX" aria-label="Close satchel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
  <div class="sat__list" id="satList"></div>
  <div class="sat__sum"><span>Estimated total</span><span id="satSum">₹0</span></div>
  <p class="sat__note">We confirm availability, payment and delivery with you in the chat.</p>
  <a class="btn btn--ink" id="satWa" target="_blank" rel="noopener">Send order on WhatsApp</a>
</aside>
<nav class="mnav" id="mnav" aria-label="Mobile"><a href="index.html">Home</a><a href="shop.html">Shop all</a>${[1,2,3,4].map(r=>`<a href="shop.html?room=${r}">${ROOMS[r].t}</a>`).join("")}<a href="index.html#lab">The Print Lab</a><small>Orders and styling help on WhatsApp · +91 92016 76762</small></nav>
<div class="toast" id="toast" role="status" aria-live="polite"></div>`);

function syncCounts(){
  $$("[data-count=bag]").forEach(b=>{b.textContent=bag.length;b.dataset.n=bag.length});
  $$("[data-count=wish]").forEach(b=>{b.textContent=wish.length;b.dataset.n=wish.length});
}
function renderBag(){
  syncCounts();
  $("#satList").innerHTML=bag.length?bag.map((b,k)=>{const p=byId(b.id);return `<div class="sat__it"><img src="assets/img/s/${p.id}.webp" alt=""><div><b>${esc(p.t)}</b><span>Size ${b.s} · ${inr(p.p)}</span></div><button data-rm="${k}" aria-label="Remove ${esc(p.t)}"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>`}).join(""):`<p class="lead">Your satchel is empty. Wander the rooms and add a piece or two.</p><a class="more" href="shop.html" style="margin-top:12px;justify-self:start">Shop the collection</a>`;
  $("#satSum").textContent=inr(bag.reduce((a,b)=>a+byId(b.id).p,0));
  const msg="Hi Vagabode! I’d like to order:\n"+bag.map(b=>{const p=byId(b.id);return `• ${p.t} · size ${b.s} · ${inr(p.p)}`}).join("\n")+"\n\nCould you confirm availability and delivery?";
  $("#satWa").href=bag.length?wa(msg):"shop.html";
  $("#satWa").toggleAttribute("target",!!bag.length);
}
let lenis=null;
function openSat(o){$("#sat").classList.toggle("open",o);$("#scrim").classList.toggle("on",o);$("#sat").setAttribute("aria-hidden",!o);if(lenis)o?lenis.stop():lenis.start()}
function toast(html){const t=$("#toast");t.innerHTML=html;t.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("on"),2800)}
function addToBag(id,s){bag.push({id,s});save("vgb-bag2",bag);renderBag();toast(`${esc(byId(id).t)} (${s}) added <a href="#" data-open-sat>View satchel</a>`)}
function toggleWish(id){const i=wish.indexOf(id);i<0?wish.push(id):wish.splice(i,1);save("vgb-wish",wish);syncCounts();$$(`[data-wish="${id}"]`).forEach(b=>b.setAttribute("aria-pressed",wish.includes(id)));if(i<0)toast(`Saved to your wishlist <a href="shop.html?wish=1">View</a>`);document.dispatchEvent(new CustomEvent("vg:wish"))}

document.addEventListener("click",e=>{
  const w=e.target.closest("[data-wish]");if(w){e.preventDefault();e.stopPropagation();toggleWish(w.dataset.wish);return}
  if(e.target.closest("[data-open-sat]")){e.preventDefault();openSat(true);$("#mnav").classList.remove("open");return}
  const rm=e.target.closest("[data-rm]");if(rm){bag.splice(+rm.dataset.rm,1);save("vgb-bag2",bag);renderBag();return}
  if(e.target.closest("#satX")||e.target.id==="scrim"){openSat(false);return}
  if(e.target.closest("[data-burger]")){$("#mnav").classList.toggle("open");return}
});
addEventListener("keydown",e=>{if(e.key==="Escape"){openSat(false);$("#mnav").classList.remove("open")}});
renderBag();

/* reveals */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{rootMargin:"0px 0px -6% 0px"});
const observe=root=>$$(".rv:not(.in)",root||document).forEach(el=>io.observe(el));
observe();

/* nav hide on scroll */
let lastY=0;const nav=$(".nav");
function navState(y){if(!nav)return;nav.classList.toggle("hide",y>lastY&&y>400&&!$("#sat").classList.contains("open"));lastY=y}

/* smooth scroll */
if(window.Lenis&&!reduce){
  lenis=new Lenis({lerp:.09,smoothWheel:true,syncTouch:false});
  lenis.on("scroll",e=>{navState(e.scroll);if(window.ScrollTrigger)ScrollTrigger.update()});
  if(window.gsap){gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0)}
  else{const raf=t=>{lenis.raf(t);requestAnimationFrame(raf)};requestAnimationFrame(raf)}
}else addEventListener("scroll",()=>navState(scrollY),{passive:true});

/* ---------- Print morph (WebGL) ---------- */
class Morph{
  constructor(box,first){
    this.box=box;this.cache={};this.cur=first;this.p=1;this.busy=false;this.t0=performance.now();
    const c=document.createElement("canvas");box.prepend(c);this.c=c;
    const gl=c.getContext("webgl",{premultipliedAlpha:false,antialias:false});
    if(!gl){this.fallback(first);return}
    this.gl=gl;
    const vs=`attribute vec2 a;varying vec2 v;void main(){v=vec2(a.x*.5+.5,.5-a.y*.5);gl_Position=vec4(a,0.,1.);}`;
    const fs=`precision mediump float;varying vec2 v;uniform sampler2D A,B,N;uniform float p,t,breathe;
    void main(){vec2 uv=v;
      vec2 br=vec2(sin(uv.y*11.+t*1.3),cos(uv.x*9.+t*1.1))*.0016*breathe;
      float nz=texture2D(N,uv*1.4).r;float nz2=texture2D(N,uv*1.4+.37).r;
      float e=p*1.3-.15;float m=1.-smoothstep(e-.05,e+.05,nz);
      float w=sin(3.14159*clamp(p,0.,1.));
      vec2 o=(vec2(nz,nz2)-.5)*.045*w;
      vec4 ca=texture2D(A,uv+br+o*m);vec4 cb=texture2D(B,uv+br-o*(1.-m));
      vec4 col=mix(ca,cb,m);
      float edge=1.-smoothstep(0.,.045,abs(nz-e));
      col.rgb=mix(col.rgb,col.rgb*.42+vec3(.12,.05,.02),edge*w*.9);
      gl_FragColor=vec4(col.rgb,1.);}`;
    const sh=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return s};
    const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,vs));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(pr);
    if(!gl.getProgramParameter(pr,gl.LINK_STATUS)){this.gl=null;this.fallback(first);return}
    gl.useProgram(pr);this.pr=pr;
    const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
    const loc=gl.getAttribLocation(pr,"a");gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    ["A","B","N"].forEach((n,i)=>gl.uniform1i(gl.getUniformLocation(pr,n),i));
    this.u={p:gl.getUniformLocation(pr,"p"),t:gl.getUniformLocation(pr,"t"),br:gl.getUniformLocation(pr,"breathe")};
    this.resize();new ResizeObserver(()=>this.resize()).observe(box);
    this.tex("assets/mock/noise.png",true).then(n=>{this.N=n;return Promise.all([this.tex(first),this.tex(first)])}).then(([a,b])=>{this.A=a;this.B=b;this.ready=true;this.loop()});
    box.addEventListener("pointermove",e=>{const r=box.getBoundingClientRect();box.style.setProperty("--mx",((e.clientX-r.left)/r.width*100)+"%");box.style.setProperty("--my",((e.clientY-r.top)/r.height*100)+"%")});
    this.vis=true;new IntersectionObserver(es=>{this.vis=es[0].isIntersecting;if(this.vis)this.loop()}).observe(box);
  }
  fallback(first){this.img=new Image();this.img.className="fb";this.img.src=first;this.img.alt="";this.box.prepend(this.img);this.c&&this.c.remove()}
  resize(){if(!this.gl)return;const d=Math.min(devicePixelRatio||1,2),r=this.box.getBoundingClientRect();this.c.width=Math.round(r.width*d);this.c.height=Math.round(r.height*d);this.gl.viewport(0,0,this.c.width,this.c.height)}
  tex(url,rep){
    if(this.cache[url])return this.cache[url];
    const gl=this.gl;
    return this.cache[url]=new Promise(res=>{const im=new Image();im.onload=()=>{const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,im);
      const wr=rep?gl.REPEAT:gl.CLAMP_TO_EDGE;gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,wr);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,wr);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);res(t)};im.src=url});
  }
  preload(urls){if(this.gl)urls.forEach(u=>this.tex(u))}
  async to(url,dur=1400){
    if(url===this.cur)return;
    if(!this.gl){if(this.img){this.img.style.transition="opacity .4s";this.img.style.opacity=0;setTimeout(()=>{this.img.src=url;this.img.style.opacity=1},400)}this.cur=url;return}
    const next=await this.tex(url);if(!this.ready)return;
    if(this.busy){this.A=this.B}
    this.B=next;this.cur=url;this.p=0;this.start=performance.now();this.dur=reduce?1:dur;this.busy=true;this.loop();
  }
  loop(){if(this.raf||!this.ready)return;const f=now=>{this.raf=null;if(!this.vis)return;this.draw(now);if(this.busy||!reduce)this.raf=requestAnimationFrame(f)};this.raf=requestAnimationFrame(f)}
  draw(now){
    const gl=this.gl;
    if(this.busy){const k=Math.min(1,(now-this.start)/this.dur);this.p=k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;if(k>=1){this.busy=false;this.A=this.B;this.p=0}}
    [this.A,this.B,this.N].forEach((t,i)=>{gl.activeTexture(gl.TEXTURE0+i);gl.bindTexture(gl.TEXTURE_2D,t)});
    gl.uniform1f(this.u.p,this.busy?this.p:0);gl.uniform1f(this.u.t,(now-this.t0)/1000);gl.uniform1f(this.u.br,reduce?0:1);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
  }
}

window.VGX={$, $$, P, ROOMS, GROUPS, SIZES, inr, esc, wa, off, card, byId, addToBag, toggleWish, openSat, observe, Morph, reduce, get wish(){return wish}, get lenis(){return lenis}};
document.dispatchEvent(new Event("vg:ready"));
})();
