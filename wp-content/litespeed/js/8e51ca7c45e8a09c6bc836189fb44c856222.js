function dancepad_pixels_shimmer_card(){class Dot{constructor(cvs,g,sx,sy,col,spd,lag){this.g=g;this.sx=sx;this.sy=sy;this.col=col;this.spd=(Math.random()*0.78+0.12)*spd;this.r=0;this.dr=Math.random()*0.38;this.rLo=0.55;this.rCap=2.1;this.rTop=Math.random()*(this.rCap-this.rLo)+this.rLo;this.lag=lag;this.tick=0;this.tickStep=Math.random()*3.8+(cvs.width+cvs.height)*0.012;this.done=!1;this.dir=1;this.waving=!1}
_paint(){const off=this.rCap*0.5-this.r*0.5;this.g.fillStyle=this.col;this.g.fillRect(this.sx+off,this.sy+off,this.r,this.r)}
fadeIn(){this.done=!1;if(this.tick<=this.lag){this.tick+=this.tickStep;return}
if(this.r>=this.rTop)this.waving=!0;if(this.waving)this._wave();else this.r+=this.dr;this._paint()}
fadeOut(){this.waving=!1;this.tick=0;if(this.r<=0){this.done=!0;return}
this.r-=0.12;this._paint()}
_wave(){if(this.r>=this.rTop)this.dir=-1;else if(this.r<=this.rLo)this.dir=1;this.r+=this.dir*this.spd}}
class PixelCanvas extends HTMLElement{static register(tag="pixel-canvas"){if("customElements" in window&&!customElements.get(tag)){customElements.define(tag,this)}}
static _hostCSS=`:host{display:grid;inline-size:100%;block-size:100%;overflow:hidden}`;get colors(){return this.dataset.colors?.split(",")||["#f8fafc","#f1f5f9","#cbd5e1"]}
get gap(){return Math.max(4,Math.min(50,parseInt(this.dataset.gap,10)||5))}
get speed(){const v=parseInt(this.dataset.speed,10)||35;if(v<=0||this._reducedMo)return 0;return Math.min(v,100)*0.001}
get noFocus(){return this.hasAttribute("data-no-focus")}
connectedCallback(){this._host=this.parentNode;this._reducedMo=window.matchMedia("(prefers-reduced-motion: reduce)").matches;const sr=this.attachShadow({mode:"open"});const sheet=new CSSStyleSheet();sheet.replaceSync(PixelCanvas._hostCSS);sr.adoptedStyleSheets=[sheet];this._cvs=document.createElement("canvas");sr.appendChild(this._cvs);this._g=this._cvs.getContext("2d");this._dots=[];this._dt=1000/60;this._prev=performance.now();this._raf=null;this._build();this._ro=new ResizeObserver(()=>this._build());this._ro.observe(this);this._enter=()=>this._play("fadeIn");this._leave=()=>this._play("fadeOut");this._host.addEventListener("mouseenter",this._enter);this._host.addEventListener("mouseleave",this._leave);if(!this.noFocus){this._fi=e=>{if(!e.currentTarget.contains(e.relatedTarget))this._play("fadeIn");};this._fo=e=>{if(!e.currentTarget.contains(e.relatedTarget))this._play("fadeOut");};this._host.addEventListener("focusin",this._fi);this._host.addEventListener("focusout",this._fo)}}
disconnectedCallback(){this._ro.disconnect();cancelAnimationFrame(this._raf);this._host.removeEventListener("mouseenter",this._enter);this._host.removeEventListener("mouseleave",this._leave);if(!this.noFocus){this._host.removeEventListener("focusin",this._fi);this._host.removeEventListener("focusout",this._fo)}
delete this._host}
_build(){const rc=this.getBoundingClientRect();const w=Math.floor(rc.width);const h=Math.floor(rc.height);this._cvs.width=w;this._cvs.height=h;this._cvs.style.width=w+"px";this._cvs.style.height=h+"px";this._dots=[];const cols=this.colors,gv=this.gap,sv=this.speed;const hw=w*0.5,hh=h*0.5;for(let x=0;x<w;x+=gv){for(let y=0;y<h;y+=gv){const c=cols[(Math.random()*cols.length)|0];const lag=this._reducedMo?0:Math.hypot(x-hw,y-hh);this._dots.push(new Dot(this._cvs,this._g,x,y,c,sv,lag))}}}
_play(method){cancelAnimationFrame(this._raf);this._tick(method)}
_tick(method){this._raf=requestAnimationFrame(()=>this._tick(method));const now=performance.now();if(now-this._prev<this._dt)return;this._prev=now-((now-this._prev)%this._dt);this._g.clearRect(0,0,this._cvs.width,this._cvs.height);let allDone=!0;for(let i=0;i<this._dots.length;i++){this._dots[i][method]();if(!this._dots[i].done)allDone=!1}
if(allDone)cancelAnimationFrame(this._raf);}}
document.querySelectorAll(".dan-pixels-shimmer-card").forEach(card=>{card.removeAttribute("data-flickering");PixelCanvas.register()})}
;