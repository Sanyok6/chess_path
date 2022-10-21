import{S as We,i as Ye,s as Xe,a as Ze,e as D,c as Qe,b as F,g as X,t as V,d as Z,f as q,h as z,j as xe,o as ke,k as et,l as tt,m as nt,n as ve,p as H,q as rt,r as at,u as ot,v as J,w as oe,x as G,y as K,z as Ce}from"./chunks/index-1680125d.js";import{g as Be,f as ze,s as Y,a as $e,b as st,i as it}from"./chunks/singletons-ee129913.js";function lt(r,e){return r==="/"||e==="ignore"?r:e==="never"?r.endsWith("/")?r.slice(0,-1):r:e==="always"&&!r.endsWith("/")?r+"/":r}function ct(r){for(const e in r)r[e]=r[e].replace(/%23/g,"#").replace(/%3[Bb]/g,";").replace(/%2[Cc]/g,",").replace(/%2[Ff]/g,"/").replace(/%3[Ff]/g,"?").replace(/%3[Aa]/g,":").replace(/%40/g,"@").replace(/%26/g,"&").replace(/%3[Dd]/g,"=").replace(/%2[Bb]/g,"+").replace(/%24/g,"$");return r}const ft=["href","pathname","search","searchParams","toString","toJSON"];function ut(r,e){const n=new URL(r);for(const s of ft){let a=n[s];Object.defineProperty(n,s,{get(){return e(),a},enumerable:!0,configurable:!0})}return pt(n),n}function pt(r){Object.defineProperty(r,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}function dt(r){let e=5381;if(typeof r=="string"){let n=r.length;for(;n;)e=e*33^r.charCodeAt(--n)}else if(ArrayBuffer.isView(r)){const n=new Uint8Array(r.buffer,r.byteOffset,r.byteLength);let s=n.length;for(;s;)e=e*33^n[--s]}else throw new TypeError("value must be a string or TypedArray");return(e>>>0).toString(36)}const he=window.fetch;window.fetch=(r,e)=>{if((r instanceof Request?r.method:(e==null?void 0:e.method)||"GET")!=="GET"){const s=new URL(r instanceof Request?r.url:r.toString(),document.baseURI).href;de.delete(s)}return he(r,e)};const de=new Map;function ht(r,e,n){let a=`script[data-sveltekit-fetched][data-url=${JSON.stringify(r instanceof Request?r.url:r)}]`;(n==null?void 0:n.body)&&(typeof n.body=="string"||ArrayBuffer.isView(n.body))&&(a+=`[data-hash="${dt(n.body)}"]`);const l=document.querySelector(a);if(l!=null&&l.textContent){const{body:t,...i}=JSON.parse(l.textContent),f=l.getAttribute("data-ttl");return f&&de.set(e,{body:t,init:i,ttl:1e3*Number(f)}),Promise.resolve(new Response(t,i))}return he(r,n)}function mt(r,e){const n=de.get(r);if(n){if(performance.now()<n.ttl)return new Response(n.body,n.init);de.delete(r)}return he(r,e)}const _t=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function gt(r){const e=[],n=[];let s=!0;return{pattern:r==="/"?/^\/$/:new RegExp(`^${r.split(/(?:\/|$)/).slice(1).filter(wt).map((l,t,i)=>{const f=decodeURIComponent(l),d=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(f);if(d)return e.push(d[1]),n.push(d[2]),"(?:/(.*))?";const g=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(f);if(g)return e.push(g[1]),n.push(g[2]),"(?:/([^/]+))?";const v=t===i.length-1;if(!f)return;const E=f.split(/\[(.+?)\](?!\])/).map((U,M)=>{if(M%2){const C=_t.exec(U);if(!C)throw new Error(`Invalid param: ${U}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,se,Q,ie,ee]=C;return e.push(ie),n.push(ee),Q?"(.*?)":se?"([^/]*)?":"([^/]+?)"}return v&&U.includes(".")&&(s=!1),U.normalize().replace(/%5[Bb]/g,"[").replace(/%5[Dd]/g,"]").replace(/#/g,"%23").replace(/\?/g,"%3F").replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}).join("");return"/"+E}).join("")}${s?"/?":""}$`),names:e,types:n}}function wt(r){return!/^\([^)]+\)$/.test(r)}function yt(r,e,n,s){const a={};for(let l=0;l<e.length;l+=1){const t=e[l],i=n[l];let f=r[l+1]||"";if(i){const d=s[i];if(!d)throw new Error(`Missing "${i}" param matcher`);if(!d(f))return}a[t]=f}return a}function bt(r,e,n,s){const a=new Set(e);return Object.entries(n).map(([i,[f,d,g]])=>{const{pattern:v,names:T,types:E}=gt(i),U={id:i,exec:M=>{const C=v.exec(M);if(C)return yt(C,T,E,s)},errors:[1,...g||[]].map(M=>r[M]),layouts:[0,...d||[]].map(t),leaf:l(f)};return U.errors.length=U.layouts.length=Math.max(U.errors.length,U.layouts.length),U});function l(i){const f=i<0;return f&&(i=~i),[f,r[i]]}function t(i){return i===void 0?i:[a.has(i),r[i]]}}function vt(r){let e,n,s;var a=r[0][0];function l(t){return{props:{data:t[2],form:t[1]}}}return a&&(e=new a(l(r))),{c(){e&&J(e.$$.fragment),n=D()},l(t){e&&oe(e.$$.fragment,t),n=D()},m(t,i){e&&G(e,t,i),F(t,n,i),s=!0},p(t,i){const f={};if(i&4&&(f.data=t[2]),i&2&&(f.form=t[1]),a!==(a=t[0][0])){if(e){X();const d=e;V(d.$$.fragment,1,0,()=>{K(d,1)}),Z()}a?(e=new a(l(t)),J(e.$$.fragment),q(e.$$.fragment,1),G(e,n.parentNode,n)):e=null}else a&&e.$set(f)},i(t){s||(e&&q(e.$$.fragment,t),s=!0)},o(t){e&&V(e.$$.fragment,t),s=!1},d(t){t&&z(n),e&&K(e,t)}}}function Et(r){let e,n,s;var a=r[0][0];function l(t){return{props:{data:t[2],$$slots:{default:[Ot]},$$scope:{ctx:t}}}}return a&&(e=new a(l(r))),{c(){e&&J(e.$$.fragment),n=D()},l(t){e&&oe(e.$$.fragment,t),n=D()},m(t,i){e&&G(e,t,i),F(t,n,i),s=!0},p(t,i){const f={};if(i&4&&(f.data=t[2]),i&1051&&(f.$$scope={dirty:i,ctx:t}),a!==(a=t[0][0])){if(e){X();const d=e;V(d.$$.fragment,1,0,()=>{K(d,1)}),Z()}a?(e=new a(l(t)),J(e.$$.fragment),q(e.$$.fragment,1),G(e,n.parentNode,n)):e=null}else a&&e.$set(f)},i(t){s||(e&&q(e.$$.fragment,t),s=!0)},o(t){e&&V(e.$$.fragment,t),s=!1},d(t){t&&z(n),e&&K(e,t)}}}function kt(r){let e,n,s;var a=r[0][1];function l(t){return{props:{data:t[3],form:t[1]}}}return a&&(e=new a(l(r))),{c(){e&&J(e.$$.fragment),n=D()},l(t){e&&oe(e.$$.fragment,t),n=D()},m(t,i){e&&G(e,t,i),F(t,n,i),s=!0},p(t,i){const f={};if(i&8&&(f.data=t[3]),i&2&&(f.form=t[1]),a!==(a=t[0][1])){if(e){X();const d=e;V(d.$$.fragment,1,0,()=>{K(d,1)}),Z()}a?(e=new a(l(t)),J(e.$$.fragment),q(e.$$.fragment,1),G(e,n.parentNode,n)):e=null}else a&&e.$set(f)},i(t){s||(e&&q(e.$$.fragment,t),s=!0)},o(t){e&&V(e.$$.fragment,t),s=!1},d(t){t&&z(n),e&&K(e,t)}}}function $t(r){let e,n,s;var a=r[0][1];function l(t){return{props:{data:t[3],$$slots:{default:[Rt]},$$scope:{ctx:t}}}}return a&&(e=new a(l(r))),{c(){e&&J(e.$$.fragment),n=D()},l(t){e&&oe(e.$$.fragment,t),n=D()},m(t,i){e&&G(e,t,i),F(t,n,i),s=!0},p(t,i){const f={};if(i&8&&(f.data=t[3]),i&1043&&(f.$$scope={dirty:i,ctx:t}),a!==(a=t[0][1])){if(e){X();const d=e;V(d.$$.fragment,1,0,()=>{K(d,1)}),Z()}a?(e=new a(l(t)),J(e.$$.fragment),q(e.$$.fragment,1),G(e,n.parentNode,n)):e=null}else a&&e.$set(f)},i(t){s||(e&&q(e.$$.fragment,t),s=!0)},o(t){e&&V(e.$$.fragment,t),s=!1},d(t){t&&z(n),e&&K(e,t)}}}function Rt(r){let e,n,s;var a=r[0][2];function l(t){return{props:{data:t[4],form:t[1]}}}return a&&(e=new a(l(r))),{c(){e&&J(e.$$.fragment),n=D()},l(t){e&&oe(e.$$.fragment,t),n=D()},m(t,i){e&&G(e,t,i),F(t,n,i),s=!0},p(t,i){const f={};if(i&16&&(f.data=t[4]),i&2&&(f.form=t[1]),a!==(a=t[0][2])){if(e){X();const d=e;V(d.$$.fragment,1,0,()=>{K(d,1)}),Z()}a?(e=new a(l(t)),J(e.$$.fragment),q(e.$$.fragment,1),G(e,n.parentNode,n)):e=null}else a&&e.$set(f)},i(t){s||(e&&q(e.$$.fragment,t),s=!0)},o(t){e&&V(e.$$.fragment,t),s=!1},d(t){t&&z(n),e&&K(e,t)}}}function Ot(r){let e,n,s,a;const l=[$t,kt],t=[];function i(f,d){return f[0][2]?0:1}return e=i(r),n=t[e]=l[e](r),{c(){n.c(),s=D()},l(f){n.l(f),s=D()},m(f,d){t[e].m(f,d),F(f,s,d),a=!0},p(f,d){let g=e;e=i(f),e===g?t[e].p(f,d):(X(),V(t[g],1,1,()=>{t[g]=null}),Z(),n=t[e],n?n.p(f,d):(n=t[e]=l[e](f),n.c()),q(n,1),n.m(s.parentNode,s))},i(f){a||(q(n),a=!0)},o(f){V(n),a=!1},d(f){t[e].d(f),f&&z(s)}}}function Fe(r){let e,n=r[6]&&Je(r);return{c(){e=et("div"),n&&n.c(),this.h()},l(s){e=tt(s,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var a=nt(e);n&&n.l(a),a.forEach(z),this.h()},h(){ve(e,"id","svelte-announcer"),ve(e,"aria-live","assertive"),ve(e,"aria-atomic","true"),H(e,"position","absolute"),H(e,"left","0"),H(e,"top","0"),H(e,"clip","rect(0 0 0 0)"),H(e,"clip-path","inset(50%)"),H(e,"overflow","hidden"),H(e,"white-space","nowrap"),H(e,"width","1px"),H(e,"height","1px")},m(s,a){F(s,e,a),n&&n.m(e,null)},p(s,a){s[6]?n?n.p(s,a):(n=Je(s),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(s){s&&z(e),n&&n.d()}}}function Je(r){let e;return{c(){e=rt(r[7])},l(n){e=at(n,r[7])},m(n,s){F(n,e,s)},p(n,s){s&128&&ot(e,n[7])},d(n){n&&z(e)}}}function Lt(r){let e,n,s,a,l;const t=[Et,vt],i=[];function f(g,v){return g[0][1]?0:1}e=f(r),n=i[e]=t[e](r);let d=r[5]&&Fe(r);return{c(){n.c(),s=Ze(),d&&d.c(),a=D()},l(g){n.l(g),s=Qe(g),d&&d.l(g),a=D()},m(g,v){i[e].m(g,v),F(g,s,v),d&&d.m(g,v),F(g,a,v),l=!0},p(g,[v]){let T=e;e=f(g),e===T?i[e].p(g,v):(X(),V(i[T],1,1,()=>{i[T]=null}),Z(),n=i[e],n?n.p(g,v):(n=i[e]=t[e](g),n.c()),q(n,1),n.m(s.parentNode,s)),g[5]?d?d.p(g,v):(d=Fe(g),d.c(),d.m(a.parentNode,a)):d&&(d.d(1),d=null)},i(g){l||(q(n),l=!0)},o(g){V(n),l=!1},d(g){i[e].d(g),g&&z(s),d&&d.d(g),g&&z(a)}}}function St(r,e,n){let{stores:s}=e,{page:a}=e,{components:l}=e,{form:t}=e,{data_0:i=null}=e,{data_1:f=null}=e,{data_2:d=null}=e;xe(s.page.notify);let g=!1,v=!1,T=null;return ke(()=>{const E=s.page.subscribe(()=>{g&&(n(6,v=!0),n(7,T=document.title||"untitled page"))});return n(5,g=!0),E}),r.$$set=E=>{"stores"in E&&n(8,s=E.stores),"page"in E&&n(9,a=E.page),"components"in E&&n(0,l=E.components),"form"in E&&n(1,t=E.form),"data_0"in E&&n(2,i=E.data_0),"data_1"in E&&n(3,f=E.data_1),"data_2"in E&&n(4,d=E.data_2)},r.$$.update=()=>{r.$$.dirty&768&&s.page.set(a)},[l,t,i,f,d,g,v,T,s,a]}class It extends We{constructor(e){super(),Ye(this,e,St,Lt,Xe,{stores:8,page:9,components:0,form:1,data_0:2,data_1:3,data_2:4})}}const At=function(){const e=document.createElement("link").relList;return e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}(),Pt=function(r,e){return new URL(r,e).href},Ge={},B=function(e,n,s){return!n||n.length===0?e():Promise.all(n.map(a=>{if(a=Pt(a,s),a in Ge)return;Ge[a]=!0;const l=a.endsWith(".css"),t=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${t}`))return;const i=document.createElement("link");if(i.rel=l?"stylesheet":At,l||(i.as="script",i.crossOrigin=""),i.href=a,document.head.appendChild(i),l)return new Promise((f,d)=>{i.addEventListener("load",f),i.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${a}`)))})})).then(()=>e())},Nt={},me=[()=>B(()=>import("./chunks/0-ccc136ed.js"),["chunks/0-ccc136ed.js","components/pages/_layout.svelte-3f0f47cf.js","assets/_layout-39fc820f.css","chunks/index-1680125d.js","chunks/store-8478c103.js","chunks/api-a4ebcd18.js"],import.meta.url),()=>B(()=>import("./chunks/1-33ff9ca9.js"),["chunks/1-33ff9ca9.js","components/error.svelte-f3a816e7.js","chunks/index-1680125d.js","chunks/stores-b319caff.js","chunks/singletons-ee129913.js"],import.meta.url),()=>B(()=>import("./chunks/2-b9ab4be4.js"),["chunks/2-b9ab4be4.js","components/pages/dashboard/_layout.svelte-4b990b0d.js","chunks/index-1680125d.js","chunks/navigation-d0b0b8ab.js","chunks/singletons-ee129913.js","chunks/api-a4ebcd18.js","chunks/store-8478c103.js"],import.meta.url),()=>B(()=>import("./chunks/3-11c86ee7.js"),["chunks/3-11c86ee7.js","components/pages/_page.svelte-0a196e9c.js","assets/_page-56bc52ac.css","chunks/index-1680125d.js","chunks/navigation-d0b0b8ab.js","chunks/singletons-ee129913.js"],import.meta.url),()=>B(()=>import("./chunks/4-e1a8f0e9.js"),["chunks/4-e1a8f0e9.js","components/pages/auth/login/_page.svelte-e7253afd.js","chunks/index-1680125d.js","chunks/navigation-d0b0b8ab.js","chunks/singletons-ee129913.js","chunks/api-a4ebcd18.js","chunks/store-8478c103.js"],import.meta.url),()=>B(()=>import("./chunks/5-194bca5c.js"),["chunks/5-194bca5c.js","components/pages/auth/logout/_page.svelte-2eb44b8f.js","chunks/index-1680125d.js","chunks/api-a4ebcd18.js","chunks/store-8478c103.js"],import.meta.url),()=>B(()=>import("./chunks/6-bc7011b3.js"),["chunks/6-bc7011b3.js","components/pages/auth/signup/_page.svelte-4885d310.js","chunks/index-1680125d.js","chunks/navigation-d0b0b8ab.js","chunks/singletons-ee129913.js","chunks/api-a4ebcd18.js","chunks/store-8478c103.js"],import.meta.url),()=>B(()=>import("./chunks/7-27448781.js"),["chunks/7-27448781.js","components/pages/dashboard/_page.svelte-626d666f.js","chunks/index-1680125d.js","chunks/navigation-d0b0b8ab.js","chunks/singletons-ee129913.js"],import.meta.url),()=>B(()=>import("./chunks/8-fcb8700a.js"),["chunks/8-fcb8700a.js","components/pages/dashboard/goals/_page.svelte-965125cb.js","chunks/index-1680125d.js","chunks/store-8478c103.js","chunks/api-a4ebcd18.js"],import.meta.url),()=>B(()=>import("./chunks/9-abc5c68d.js"),["chunks/9-abc5c68d.js","components/pages/dashboard/path/_page.svelte-2106f652.js","assets/_page-d9e30c17.css","chunks/index-1680125d.js","chunks/store-8478c103.js"],import.meta.url),()=>B(()=>import("./chunks/10-d5a23b8b.js"),["chunks/10-d5a23b8b.js","components/pages/dashboard/puzzles/_page.svelte-cc571d88.js","chunks/index-1680125d.js","chunks/navigation-d0b0b8ab.js","chunks/singletons-ee129913.js","chunks/api-a4ebcd18.js","chunks/store-8478c103.js"],import.meta.url),()=>B(()=>import("./chunks/11-352e7dc1.js"),["chunks/11-352e7dc1.js","components/pages/dashboard/puzzles/_set_/_page.svelte-c9daf364.js","assets/_page-e159d1ed.css","chunks/index-1680125d.js","chunks/api-a4ebcd18.js","chunks/store-8478c103.js","chunks/stores-b319caff.js","chunks/singletons-ee129913.js","chunks/navigation-d0b0b8ab.js"],import.meta.url)],jt=[],Tt={"/":[3],"/auth/login":[4],"/auth/logout":[5],"/auth/signup":[6],"/dashboard":[7,[2]],"/dashboard/goals":[8,[2]],"/dashboard/path":[9,[2]],"/dashboard/puzzles":[10,[2]],"/dashboard/puzzles/[set]":[11,[2]]},Ut={handleError:({error:r})=>{console.error(r)}};class Re{constructor(e,n){this.status=e,typeof n=="string"?this.body={message:n}:n?this.body=n:this.body={message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}}class Ke{constructor(e,n){this.status=e,this.location=n}}const Dt="/__data.json";async function Vt(r){var e;for(const n in r)if(typeof((e=r[n])==null?void 0:e.then)=="function")return Object.fromEntries(await Promise.all(Object.entries(r).map(async([s,a])=>[s,await a])));return r}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");Object.getOwnPropertyNames(Object.prototype).sort().join("\0");const qt=-1,Ct=-2,Bt=-3,zt=-4,Ft=-5,Jt=-6;function Gt(r){const e=JSON.parse(r);if(typeof e=="number")return a(e);const n=e,s=Array(n.length);function a(l){if(l===qt)return;if(l===Bt)return NaN;if(l===zt)return 1/0;if(l===Ft)return-1/0;if(l===Jt)return-0;if(l in s)return s[l];const t=n[l];if(!t||typeof t!="object")s[l]=t;else if(Array.isArray(t))if(typeof t[0]=="string")switch(t[0]){case"Date":s[l]=new Date(t[1]);break;case"Set":const f=new Set;s[l]=f;for(let v=1;v<t.length;v+=1)f.add(a(t[v]));break;case"Map":const d=new Map;s[l]=d;for(let v=1;v<t.length;v+=2)d.set(a(t[v]),a(t[v+1]));break;case"RegExp":s[l]=new RegExp(t[1],t[2]);break;case"Object":s[l]=Object(t[1]);break;case"BigInt":s[l]=BigInt(t[1]);break;case"null":const g=Object.create(null);s[l]=g;for(let v=1;v<t.length;v+=2)g[t[v]]=a(t[v+1]);break}else{const i=new Array(t.length);s[l]=i;for(let f=0;f<t.length;f+=1){const d=t[f];d!==Ct&&(i[f]=a(d))}}else{const i={};s[l]=i;for(const f in t){const d=t[f];i[f]=a(d)}}return s[l]}return a(0)}const He="sveltekit:scroll",W="sveltekit:index",fe=bt(me,jt,Tt,Nt),Oe=me[0],Le=me[1];Oe();Le();let ae={};try{ae=JSON.parse(sessionStorage[He])}catch{}function Ee(r){ae[r]=$e()}function Kt({target:r,base:e,trailing_slash:n}){var De;const s=[];let a=null;const l={before_navigate:[],after_navigate:[]};let t={branch:[],error:null,url:null},i=!1,f=!1,d=!0,g=!1,v=!1,T,E=(De=history.state)==null?void 0:De[W];E||(E=Date.now(),history.replaceState({...history.state,[W]:E},"",location.href));const U=ae[E];U&&(history.scrollRestoration="manual",scrollTo(U.x,U.y));let M=!1,C,se,Q;async function ie(){Q=Q||Promise.resolve(),await Q,Q=null;const o=new URL(location.href),p=we(o,!0);a=null,await Ie(p,o,[])}async function ee(o,{noscroll:p=!1,replaceState:h=!1,keepfocus:c=!1,state:u={}},m,_){return typeof o=="string"&&(o=new URL(o,Be(document))),ye({url:o,scroll:p?$e():null,keepfocus:c,redirect_chain:m,details:{state:u,replaceState:h},nav_token:_,accepted:()=>{},blocked:()=>{},type:"goto"})}async function Se(o){const p=we(o,!1);if(!p)throw new Error(`Attempted to prefetch a URL that does not belong to this app: ${o}`);return a={id:p.id,promise:Ne(p)},a.promise}async function Ie(o,p,h,c,u={},m){var $,k;se=u;let _=o&&await Ne(o);if(_||(_=await Ue(p,null,re(new Error(`Not found: ${p.pathname}`),{url:p,params:{},routeId:null}),404)),p=(o==null?void 0:o.url)||p,se!==u)return!1;if(_.type==="redirect")if(h.length>10||h.includes(p.pathname))_=await le({status:500,error:re(new Error("Redirect loop"),{url:p,params:{},routeId:null}),url:p,routeId:null});else return ee(new URL(_.location,p).href,{},[...h,p.pathname],u),!1;else((k=($=_.props)==null?void 0:$.page)==null?void 0:k.status)>=400&&await Y.updated.check()&&await ce(p);if(s.length=0,v=!1,g=!0,c&&c.details){const{details:y}=c,b=y.replaceState?0:1;y.state[W]=E+=b,history[y.replaceState?"replaceState":"pushState"](y.state,"",p)}if(a=null,f){t=_.state,_.props.page&&(_.props.page.url=p);const y=pe();T.$set(_.props),y()}else Ae(_);if(c){const{scroll:y,keepfocus:b}=c;if(!b){const O=document.body,S=O.getAttribute("tabindex");O.tabIndex=-1,O.focus({preventScroll:!0}),setTimeout(()=>{var I;(I=getSelection())==null||I.removeAllRanges()}),S!==null?O.setAttribute("tabindex",S):O.removeAttribute("tabindex")}if(await Ce(),d){const O=p.hash&&document.getElementById(p.hash.slice(1));y?scrollTo(y.x,y.y):O?O.scrollIntoView():scrollTo(0,0)}}else await Ce();d=!0,_.props.page&&(C=_.props.page),m&&m(),g=!1}function Ae(o){var u,m;t=o.state;const p=document.querySelector("style[data-sveltekit]");p&&p.remove(),C=o.props.page;const h=pe();T=new It({target:r,props:{...o.props,stores:Y},hydrate:!0}),h();const c={from:null,to:ue("to",{params:t.params,routeId:(m=(u=t.route)==null?void 0:u.id)!=null?m:null,url:new URL(location.href)}),type:"load"};l.after_navigate.forEach(_=>_(c)),f=!0}async function te({url:o,params:p,branch:h,status:c,error:u,route:m,form:_}){var S;const $=h.filter(Boolean),k={type:"loaded",state:{url:o,params:p,branch:h,error:u,route:m},props:{components:$.map(I=>I.node.component)}};_!==void 0&&(k.props.form=_);let y={},b=!C;for(let I=0;I<$.length;I+=1){const N=$[I];y={...y,...N.data},(b||!t.branch.some(j=>j===N))&&(k.props[`data_${I}`]=y,b=b||Object.keys((S=N.data)!=null?S:{}).length>0)}if(b||(b=Object.keys(C.data).length!==Object.keys(y).length),!t.url||o.href!==t.url.href||t.error!==u||_!==void 0||b){k.props.page={error:u,params:p,routeId:m&&m.id,status:c,url:o,form:_,data:b?y:C.data};const I=(N,j)=>{Object.defineProperty(k.props.page,N,{get:()=>{throw new Error(`$page.${N} has been replaced by $page.url.${j}`)}})};I("origin","origin"),I("path","pathname"),I("query","searchParams")}return k}async function _e({loader:o,parent:p,url:h,params:c,routeId:u,server_data_node:m}){var y,b,O,S,I;let _=null;const $={dependencies:new Set,params:new Set,parent:!1,url:!1},k=await o();if((y=k.shared)!=null&&y.load){let N=function(...L){for(const w of L){const{href:R}=new URL(w,h);$.dependencies.add(R)}};const j={routeId:u,params:new Proxy(c,{get:(L,w)=>($.params.add(w),L[w])}),data:(b=m==null?void 0:m.data)!=null?b:null,url:ut(h,()=>{$.url=!0}),async fetch(L,w){let R;L instanceof Request?(R=L.url,w={body:L.method==="GET"||L.method==="HEAD"?void 0:await L.blob(),cache:L.cache,credentials:L.credentials,headers:L.headers,integrity:L.integrity,keepalive:L.keepalive,method:L.method,mode:L.mode,redirect:L.redirect,referrer:L.referrer,referrerPolicy:L.referrerPolicy,signal:L.signal,...w}):R=L;const P=new URL(R,h).href;return N(P),f?mt(P,w):ht(R,P,w)},setHeaders:()=>{},depends:N,parent(){return $.parent=!0,p()}};Object.defineProperties(j,{props:{get(){throw new Error("@migration task: Replace `props` with `data` stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1},session:{get(){throw new Error("session is no longer available. See https://github.com/sveltejs/kit/discussions/5883")},enumerable:!1},stuff:{get(){throw new Error("@migration task: Remove stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1}}),_=(O=await k.shared.load.call(null,j))!=null?O:null,_=_?await Vt(_):null}return{node:k,loader:o,server:m,shared:(S=k.shared)!=null&&S.load?{type:"data",data:_,uses:$}:null,data:(I=_!=null?_:m==null?void 0:m.data)!=null?I:null}}function Pe(o,p,h,c){if(v)return!0;if(!h)return!1;if(h.parent&&p||h.url&&o)return!0;for(const u of h.params)if(c[u]!==t.params[u])return!0;for(const u of h.dependencies)if(s.some(m=>m(new URL(u))))return!0;return!1}function ge(o,p){var h,c;return(o==null?void 0:o.type)==="data"?{type:"data",data:o.data,uses:{dependencies:new Set((h=o.uses.dependencies)!=null?h:[]),params:new Set((c=o.uses.params)!=null?c:[]),parent:!!o.uses.parent,url:!!o.uses.url}}:(o==null?void 0:o.type)==="skip"&&p!=null?p:null}async function Ne({id:o,invalidating:p,url:h,params:c,route:u}){var L;if((a==null?void 0:a.id)===o)return a.promise;const{errors:m,layouts:_,leaf:$}=u,k=[..._,$];m.forEach(w=>w==null?void 0:w().catch(()=>{})),k.forEach(w=>w==null?void 0:w[1]().catch(()=>{}));let y=null;const b=t.url?o!==t.url.pathname+t.url.search:!1,O=k.reduce((w,R,P)=>{var ne;const A=t.branch[P],x=!!(R!=null&&R[0])&&((A==null?void 0:A.loader)!==R[1]||Pe(b,w.some(Boolean),(ne=A.server)==null?void 0:ne.uses,c));return w.push(x),w},[]);if(O.some(Boolean)){try{y=await Me(h,O)}catch(w){return le({status:500,error:re(w,{url:h,params:c,routeId:u.id}),url:h,routeId:u.id})}if(y.type==="redirect")return y}const S=y==null?void 0:y.nodes;let I=!1;const N=k.map(async(w,R)=>{var ne;if(!w)return;const P=t.branch[R],A=S==null?void 0:S[R];if((!A||A.type==="skip")&&w[1]===(P==null?void 0:P.loader)&&!Pe(b,I,(ne=P.shared)==null?void 0:ne.uses,c))return P;if(I=!0,(A==null?void 0:A.type)==="error")throw A;return _e({loader:w[1],url:h,params:c,routeId:u.id,parent:async()=>{var qe;const Ve={};for(let be=0;be<R;be+=1)Object.assign(Ve,(qe=await N[be])==null?void 0:qe.data);return Ve},server_data_node:ge(A===void 0&&w[0]?{type:"skip"}:A!=null?A:null,P==null?void 0:P.server)})});for(const w of N)w.catch(()=>{});const j=[];for(let w=0;w<k.length;w+=1)if(k[w])try{j.push(await N[w])}catch(R){if(R instanceof Ke)return{type:"redirect",location:R.location};let P=500,A;S!=null&&S.includes(R)?(P=(L=R.status)!=null?L:P,A=R.error):R instanceof Re?(P=R.status,A=R.body):A=re(R,{params:c,url:h,routeId:u.id});const x=await je(w,j,m);return x?await te({url:h,params:c,branch:j.slice(0,x.idx).concat(x.node),status:P,error:A,route:u}):await Ue(h,u.id,A,P)}else j.push(void 0);return await te({url:h,params:c,branch:j,status:200,error:null,route:u,form:p?void 0:null})}async function je(o,p,h){for(;o--;)if(h[o]){let c=o;for(;!p[c];)c-=1;try{return{idx:c+1,node:{node:await h[o](),loader:h[o],data:{},server:null,shared:null}}}catch{continue}}}async function le({status:o,error:p,url:h,routeId:c}){var y;const u={},m=await Oe();let _=null;if(m.server)try{const b=await Me(h,[!0]);if(b.type!=="data"||b.nodes[0]&&b.nodes[0].type!=="data")throw 0;_=(y=b.nodes[0])!=null?y:null}catch{(h.origin!==location.origin||h.pathname!==location.pathname||i)&&await ce(h)}const $=await _e({loader:Oe,url:h,params:u,routeId:c,parent:()=>Promise.resolve({}),server_data_node:ge(_)}),k={node:await Le(),loader:Le,shared:null,server:null,data:null};return await te({url:h,params:u,branch:[$,k],status:o,error:p,route:null})}function we(o,p){if(Te(o))return;const h=decodeURI(o.pathname.slice(e.length)||"/");for(const c of fe){const u=c.exec(h);if(u){const m=new URL(o.origin+lt(o.pathname,n)+o.search+o.hash);return{id:m.pathname+m.search,invalidating:p,route:c,params:ct(u),url:m}}}}function Te(o){return o.origin!==location.origin||!o.pathname.startsWith(e)}async function ye({url:o,scroll:p,keepfocus:h,redirect_chain:c,details:u,type:m,delta:_,nav_token:$,accepted:k,blocked:y}){var N,j,L,w;let b=!1;const O=we(o,!1),S={from:ue("from",{params:t.params,routeId:(j=(N=t.route)==null?void 0:N.id)!=null?j:null,url:t.url}),to:ue("to",{params:(L=O==null?void 0:O.params)!=null?L:null,routeId:(w=O==null?void 0:O.route.id)!=null?w:null,url:o}),type:m};_!==void 0&&(S.delta=_);const I={...S,cancel:()=>{b=!0}};if(l.before_navigate.forEach(R=>R(I)),b){y();return}Ee(E),k(),f&&Y.navigating.set(S),await Ie(O,o,c,{scroll:p,keepfocus:h,details:u},$,()=>{l.after_navigate.forEach(R=>R(S)),Y.navigating.set(null)})}async function Ue(o,p,h,c){return o.origin===location.origin&&o.pathname===location.pathname&&!i?await le({status:c,error:h,url:o,routeId:p}):await ce(o)}function ce(o){return location.href=o.href,new Promise(()=>{})}return{after_navigate:o=>{ke(()=>(l.after_navigate.push(o),()=>{const p=l.after_navigate.indexOf(o);l.after_navigate.splice(p,1)}))},before_navigate:o=>{ke(()=>(l.before_navigate.push(o),()=>{const p=l.before_navigate.indexOf(o);l.before_navigate.splice(p,1)}))},disable_scroll_handling:()=>{(g||!f)&&(d=!1)},goto:(o,p={})=>ee(o,p,[]),invalidate:o=>{if(o===void 0)throw new Error("`invalidate()` (with no arguments) has been replaced by `invalidateAll()`");if(typeof o=="function")s.push(o);else{const{href:p}=new URL(o,location.href);s.push(h=>h.href===p)}return ie()},invalidateAll:()=>(v=!0,ie()),prefetch:async o=>{const p=new URL(o,Be(document));await Se(p)},prefetch_routes:async o=>{const h=(o?fe.filter(c=>o.some(u=>c.exec(u))):fe).map(c=>Promise.all([...c.layouts,c.leaf].map(u=>u==null?void 0:u[1]())));await Promise.all(h)},apply_action:async o=>{if(o.type==="error"){const p=new URL(location.href),{branch:h,route:c}=t;if(!c)return;const u=await je(t.branch.length,h,c.errors);if(u){const m=await te({url:p,params:t.params,branch:h.slice(0,u.idx).concat(u.node),status:500,error:o.error,route:c});t=m.state;const _=pe();T.$set(m.props),_()}}else if(o.type==="redirect")ee(o.location,{},[]);else{const p={form:o.data,page:{...C,form:o.data,status:o.status}},h=pe();T.$set(p),h()}},_start_router:()=>{history.scrollRestoration="manual",addEventListener("beforeunload",c=>{var _,$;let u=!1;const m={from:ue("from",{params:t.params,routeId:($=(_=t.route)==null?void 0:_.id)!=null?$:null,url:t.url}),to:null,type:"unload",cancel:()=>u=!0};l.before_navigate.forEach(k=>k(m)),u?(c.preventDefault(),c.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){Ee(E);try{sessionStorage[He]=JSON.stringify(ae)}catch{}}});const o=c=>{const{url:u,options:m}=ze(c);if(u&&m.prefetch){if(Te(u))return;Se(u)}};let p;const h=c=>{clearTimeout(p),p=setTimeout(()=>{var u;(u=c.target)==null||u.dispatchEvent(new CustomEvent("sveltekit:trigger_prefetch",{bubbles:!0}))},20)};addEventListener("touchstart",o),addEventListener("mousemove",h),addEventListener("sveltekit:trigger_prefetch",o),addEventListener("click",c=>{if(c.button||c.which!==1||c.metaKey||c.ctrlKey||c.shiftKey||c.altKey||c.defaultPrevented)return;const{a:u,url:m,options:_}=ze(c);if(!u||!m)return;const $=u instanceof SVGAElement;if(!$&&m.protocol!==location.protocol&&!(m.protocol==="https:"||m.protocol==="http:"))return;const k=(u.getAttribute("rel")||"").split(/\s+/);if(u.hasAttribute("download")||k.includes("external")||_.reload||($?u.target.baseVal:u.target))return;const[y,b]=m.href.split("#");if(b!==void 0&&y===location.href.split("#")[0]){M=!0,Ee(E),t.url=m,Y.page.set({...C,url:m}),Y.page.notify();return}ye({url:m,scroll:_.noscroll?$e():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:m.href===location.href},accepted:()=>c.preventDefault(),blocked:()=>c.preventDefault(),type:"link"})}),addEventListener("popstate",c=>{if(c.state){if(c.state[W]===E)return;const u=c.state[W]-E;ye({url:new URL(location.href),scroll:ae[c.state[W]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{E=c.state[W]},blocked:()=>{history.go(-u)},type:"popstate",delta:u})}}),addEventListener("hashchange",()=>{M&&(M=!1,history.replaceState({...history.state,[W]:++E},"",location.href))});for(const c of document.querySelectorAll("link"))c.rel==="icon"&&(c.href=c.href);addEventListener("pageshow",c=>{c.persisted&&Y.navigating.set(null)})},_hydrate:async({status:o,error:p,node_ids:h,params:c,routeId:u,data:m,form:_})=>{var y;i=!0;const $=new URL(location.href);let k;try{const b=h.map(async(O,S)=>{const I=m[S];return _e({loader:me[O],url:$,params:c,routeId:u,parent:async()=>{const N={};for(let j=0;j<S;j+=1)Object.assign(N,(await b[j]).data);return N},server_data_node:ge(I)})});k=await te({url:$,params:c,branch:await Promise.all(b),status:o,error:p,form:_,route:(y=fe.find(O=>O.id===u))!=null?y:null})}catch(b){if(b instanceof Ke){await ce(new URL(b.location,location.href));return}k=await le({status:b instanceof Re?b.status:500,error:re(b,{url:$,params:c,routeId:u}),url:$,routeId:u})}Ae(k)}}}async function Me(r,e){const n=new URL(r);n.pathname=r.pathname.replace(/\/$/,"")+Dt;const s=await he(n.href,{headers:{"x-sveltekit-invalidated":e.map(l=>l?"1":"").join(",")}}),a=await s.text();if(!s.ok)throw new Error(JSON.parse(a));return Gt(a)}function re(r,e){var n;return r instanceof Re?r.body:(n=Ut.handleError({error:r,event:e}))!=null?n:{message:e.routeId!=null?"Internal Error":"Not Found"}}const Mt=["hash","href","host","hostname","origin","pathname","port","protocol","search","searchParams","toString","toJSON"];function ue(r,e){for(const n of Mt)Object.defineProperty(e,n,{get(){throw new Error(`The navigation shape changed - ${r}.${n} should now be ${r}.url.${n}`)},enumerable:!1});return e}function pe(){return()=>{}}async function Yt({env:r,hydrate:e,paths:n,target:s,trailing_slash:a}){st(n);const l=Kt({target:s,base:n.base,trailing_slash:a});it({client:l}),e?await l._hydrate(e):l.goto(location.href,{replaceState:!0}),l._start_router()}export{Yt as start};
