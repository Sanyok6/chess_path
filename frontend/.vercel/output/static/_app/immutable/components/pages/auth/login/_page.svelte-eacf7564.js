import{S as ge,i as _e,s as be,k as s,q as L,a as g,l as r,m as i,r as T,h as l,c as _,n as t,b as ve,C as e,P as Q,D as R,Q as pe,J as he,O as ye,u as Ee}from"../../../../chunks/index-1680125d.js";import{g as we}from"../../../../chunks/navigation-64ca9d41.js";import{a as xe,f as Ie,b as De}from"../../../../chunks/api-a4ebcd18.js";function me(v){let o,d=v[0].toString()+"",u;return{c(){o=s("div"),u=L(d),this.h()},l(a){o=r(a,"DIV",{class:!0});var n=i(o);u=T(n,d),n.forEach(l),this.h()},h(){t(o,"class","alert alert-warning")},m(a,n){ve(a,o,n),e(o,u)},p(a,n){n&1&&d!==(d=a[0].toString()+"")&&Ee(u,d)},d(a){a&&l(o)}}}function Pe(v){let o,d,u,a,n,U,j,b,A,q,f,C,N,G,y,D,P,K,W,p,X,S,V,Y,Z,h,$,E,w,ee,te,O,k,ae,se,re,c=v[0].length&&me(v);return{c(){o=s("div"),d=s("div"),u=s("div"),a=s("div"),n=s("p"),U=L("Chess Path"),j=g(),b=s("h2"),A=L("Log in to your account"),q=g(),f=s("form"),c&&c.c(),C=g(),N=s("input"),G=g(),y=s("div"),D=s("div"),P=s("label"),K=L("Email address"),W=g(),p=s("input"),X=g(),S=s("div"),V=s("label"),Y=L("Password"),Z=g(),h=s("input"),$=g(),E=s("div"),w=s("button"),ee=L("Sign in"),te=g(),O=s("div"),k=s("a"),ae=L("Sign up instead"),this.h()},l(m){o=r(m,"DIV",{class:!0});var x=i(o);d=r(x,"DIV",{class:!0});var le=i(d);u=r(le,"DIV",{class:!0});var B=i(u);a=r(B,"DIV",{});var z=i(a);n=r(z,"P",{class:!0});var oe=i(n);U=T(oe,"Chess Path"),oe.forEach(l),j=_(z),b=r(z,"H2",{class:!0});var ne=i(b);A=T(ne,"Log in to your account"),ne.forEach(l),z.forEach(l),q=_(B),f=r(B,"FORM",{class:!0});var I=i(f);c&&c.l(I),C=_(I),N=r(I,"INPUT",{type:!0,name:!0}),G=_(I),y=r(I,"DIV",{class:!0});var J=i(y);D=r(J,"DIV",{});var F=i(D);P=r(F,"LABEL",{for:!0,class:!0});var ie=i(P);K=T(ie,"Email address"),ie.forEach(l),W=_(F),p=r(F,"INPUT",{id:!0,name:!0,type:!0,autocomplete:!0,class:!0,placeholder:!0}),F.forEach(l),X=_(J),S=r(J,"DIV",{});var H=i(S);V=r(H,"LABEL",{for:!0,class:!0});var de=i(V);Y=T(de,"Password"),de.forEach(l),Z=_(H),h=r(H,"INPUT",{id:!0,name:!0,type:!0,autocomplete:!0,class:!0,placeholder:!0}),H.forEach(l),J.forEach(l),$=_(I),E=r(I,"DIV",{class:!0});var M=i(E);w=r(M,"BUTTON",{type:!0,class:!0});var ue=i(w);ee=T(ue,"Sign in"),ue.forEach(l),te=_(M),O=r(M,"DIV",{class:!0});var ce=i(O);k=r(ce,"A",{class:!0,href:!0});var fe=i(k);ae=T(fe,"Sign up instead"),fe.forEach(l),ce.forEach(l),M.forEach(l),I.forEach(l),B.forEach(l),le.forEach(l),x.forEach(l),this.h()},h(){t(n,"class","font-extralight text-center text-xl mb-4"),t(b,"class","text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100"),t(N,"type","hidden"),t(N,"name","remember"),N.value="true",t(P,"for","email-address"),t(P,"class","sr-only"),t(p,"id","email-address"),t(p,"name","email"),t(p,"type","email"),t(p,"autocomplete","email"),p.required=!0,t(p,"class","relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"),t(p,"placeholder","Email address"),t(V,"for","password"),t(V,"class","sr-only"),t(h,"id","password"),t(h,"name","password"),t(h,"type","password"),t(h,"autocomplete","current-password"),h.required=!0,t(h,"class","relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"),t(h,"placeholder","Password"),t(y,"class","-space-y-px rounded-md shadow-sm"),t(w,"type","submit"),t(w,"class","group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"),t(k,"class","underline"),t(k,"href","/auth/signup"),t(O,"class","mt-5"),t(E,"class","text-center"),t(f,"class","mt-8 space-y-6"),t(u,"class","w-full max-w-md space-y-8"),t(d,"class","flex items-center justify-center bg-slate-200 dark:bg-slate-900 pt-14 pb-16 px-10 rounded-2xl min-w-[400px]"),t(o,"class","h-[70vh] flex flex-col items-center justify-center")},m(m,x){ve(m,o,x),e(o,d),e(d,u),e(u,a),e(a,n),e(n,U),e(a,j),e(a,b),e(b,A),e(u,q),e(u,f),c&&c.m(f,null),e(f,C),e(f,N),e(f,G),e(f,y),e(y,D),e(D,P),e(P,K),e(D,W),e(D,p),Q(p,v[1]),e(y,X),e(y,S),e(S,V),e(V,Y),e(S,Z),e(S,h),Q(h,v[2]),e(f,$),e(f,E),e(E,w),e(w,ee),e(E,te),e(E,O),e(O,k),e(k,ae),se||(re=[R(p,"input",v[4]),R(h,"input",v[5]),R(w,"submit",pe(v[3])),R(f,"submit",pe(v[3]))],se=!0)},p(m,[x]){m[0].length?c?c.p(m,x):(c=me(m),c.c(),c.m(f,C)):c&&(c.d(1),c=null),x&2&&p.value!==m[1]&&Q(p,m[1]),x&4&&h.value!==m[2]&&Q(h,m[2])},i:he,o:he,d(m){m&&l(o),c&&c.d(),se=!1,ye(re)}}}function Se(v,o,d){let u=[],a,n;const U=async()=>{const A=await xe("auth/login/",{method:"POST",body:JSON.stringify({email:a,password:n})});if(A.ok)Ie(null),we("/dashboard");else{const q=De(await A.json());d(0,u=q)}};function j(){a=this.value,d(1,a)}function b(){n=this.value,d(2,n)}return[u,a,n,U,j,b]}class Te extends ge{constructor(o){super(),_e(this,o,Se,Pe,be,{})}}export{Te as default};
