import{j as d,r as F,a as Q}from"./index-B79Lp1Sb.js";import{A as Se}from"./AdminSidebar-CckALMVt.js";import{l as Me}from"./index-BhCuoFHt.js";import{F as Y,d as Te,e as Ie,g as De,h as ke}from"./index-D4iS7rHE.js";import{t as Ee}from"./profile-DMRa1GgG.js";import{_ as D}from"./extends-CF3RwP-h.js";import{_ as J}from"./objectWithoutPropertiesLoose-CAYKN5F1.js";import{p as ge,c as q,s as U,a as z,h as me,e as O,t as Fe,b as G,m as le,d as fe,f as E,g as pe,i as He,j as Oe,k as be,l as je,n as ve,u as Ue,o as se,q as $e,r as Pe,v as _e,w as Ce,x as xe,y as Be,D as ze,z as We,A as qe,R as Ve,B as Xe,C as Je,E as Ze,F as Ge,G as Ke,H as Qe,I as Ae}from"./BarChart-CNsD6kgF.js";import{C as Ye}from"./ContentHeader-D9qUqZMF.js";import"./chunk-DBLREEYE-C-H-JCr7.js";import"./useOverlayTriggerState-BuaucyBg.js";import"./chunk-CIZQCQPA-D7mxbdH2.js";import"./createPopper-iTKh2FQm.js";const de=Math.PI,ce=2*de,V=1e-6,es=ce-V;function we(e){this._+=e[0];for(let s=1,t=e.length;s<t;++s)this._+=arguments[s]+e[s]}function ss(e){let s=Math.floor(e);if(!(s>=0))throw new Error(`invalid digits: ${e}`);if(s>15)return we;const t=10**s;return function(n){this._+=n[0];for(let i=1,r=n.length;i<r;++i)this._+=Math.round(arguments[i]*t)/t+n[i]}}class ts{constructor(s){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=s==null?we:ss(s)}moveTo(s,t){this._append`M${this._x0=this._x1=+s},${this._y0=this._y1=+t}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(s,t){this._append`L${this._x1=+s},${this._y1=+t}`}quadraticCurveTo(s,t,n,i){this._append`Q${+s},${+t},${this._x1=+n},${this._y1=+i}`}bezierCurveTo(s,t,n,i,r,g){this._append`C${+s},${+t},${+n},${+i},${this._x1=+r},${this._y1=+g}`}arcTo(s,t,n,i,r){if(s=+s,t=+t,n=+n,i=+i,r=+r,r<0)throw new Error(`negative radius: ${r}`);let g=this._x1,l=this._y1,f=n-s,u=i-t,a=g-s,p=l-t,o=a*a+p*p;if(this._x1===null)this._append`M${this._x1=s},${this._y1=t}`;else if(o>V)if(!(Math.abs(p*f-u*a)>V)||!r)this._append`L${this._x1=s},${this._y1=t}`;else{let h=n-g,R=i-l,y=f*f+u*u,C=h*h+R*R,x=Math.sqrt(y),A=Math.sqrt(o),b=r*Math.tan((de-Math.acos((y+o-C)/(2*x*A)))/2),$=b/A,v=b/x;Math.abs($-1)>V&&this._append`L${s+$*a},${t+$*p}`,this._append`A${r},${r},0,0,${+(p*h>a*R)},${this._x1=s+v*f},${this._y1=t+v*u}`}}arc(s,t,n,i,r,g){if(s=+s,t=+t,n=+n,g=!!g,n<0)throw new Error(`negative radius: ${n}`);let l=n*Math.cos(i),f=n*Math.sin(i),u=s+l,a=t+f,p=1^g,o=g?i-r:r-i;this._x1===null?this._append`M${u},${a}`:(Math.abs(this._x1-u)>V||Math.abs(this._y1-a)>V)&&this._append`L${u},${a}`,n&&(o<0&&(o=o%ce+ce),o>es?this._append`A${n},${n},0,1,${p},${s-l},${t-f}A${n},${n},0,1,${p},${this._x1=u},${this._y1=a}`:o>V&&this._append`A${n},${n},0,${+(o>=de)},${p},${this._x1=s+n*Math.cos(r)},${this._y1=t+n*Math.sin(r)}`)}rect(s,t,n,i){this._append`M${this._x0=this._x1=+s},${this._y0=this._y1=+t}h${n=+n}v${+i}h${-n}Z`}toString(){return this._}}function ns(e){let s=3;return e.digits=function(t){if(!arguments.length)return s;if(t==null)s=null;else{const n=Math.floor(t);if(!(n>=0))throw new RangeError(`invalid digits: ${t}`);s=n}return e},()=>new ts(s)}function as(e){return e.innerRadius}function is(e){return e.outerRadius}function rs(e){return e.startAngle}function os(e){return e.endAngle}function ls(e){return e&&e.padAngle}function ds(e,s,t,n,i,r,g,l){var f=t-e,u=n-s,a=g-i,p=l-r,o=p*f-a*u;if(!(o*o<O))return o=(a*(s-r)-p*(e-i))/o,[e+o*f,s+o*u]}function ee(e,s,t,n,i,r,g){var l=e-t,f=s-n,u=(g?r:-r)/G(l*l+f*f),a=u*f,p=-u*l,o=e+a,h=s+p,R=t+a,y=n+p,C=(o+R)/2,x=(h+y)/2,A=R-o,b=y-h,$=A*A+b*b,v=i-r,P=o*y-R*h,L=(b<0?-1:1)*G(Oe(0,v*v*$-P*P)),S=(P*b-A*L)/$,w=(-P*A-b*L)/$,M=(P*b+A*L)/$,T=(-P*A+b*L)/$,I=S-C,m=w-x,c=M-C,j=T-x;return I*I+m*m>c*c+j*j&&(S=M,w=T),{cx:S,cy:w,x01:-a,y01:-p,x11:S*(i/v-1),y11:w*(i/v-1)}}function Le(){var e=as,s=is,t=z(0),n=null,i=rs,r=os,g=ls,l=null,f=ns(u);function u(){var a,p,o=+e.apply(this,arguments),h=+s.apply(this,arguments),R=i.apply(this,arguments)-me,y=r.apply(this,arguments)-me,C=fe(y-R),x=y>R;if(l||(l=a=f()),h<o&&(p=h,h=o,o=p),!(h>O))l.moveTo(0,0);else if(C>Fe-O)l.moveTo(h*q(R),h*U(R)),l.arc(0,0,h,R,y,!x),o>O&&(l.moveTo(o*q(y),o*U(y)),l.arc(0,0,o,y,R,x));else{var A=R,b=y,$=R,v=y,P=C,L=C,S=g.apply(this,arguments)/2,w=S>O&&(n?+n.apply(this,arguments):G(o*o+h*h)),M=le(fe(h-o)/2,+t.apply(this,arguments)),T=M,I=M,m,c;if(w>O){var j=pe(w/o*U(S)),_=pe(w/h*U(S));(P-=j*2)>O?(j*=x?1:-1,$+=j,v-=j):(P=0,$=v=(R+y)/2),(L-=_*2)>O?(_*=x?1:-1,A+=_,b-=_):(L=0,A=b=(R+y)/2)}var N=h*q(A),k=h*U(A),H=o*q(v),W=o*U(v);if(M>O){var Z=h*q(b),K=h*U(b),te=o*q($),ne=o*U($),B;if(C<ge)if(B=ds(N,k,te,ne,Z,K,H,W)){var ae=N-B[0],ie=k-B[1],re=Z-B[0],oe=K-B[1],ue=1/U(He((ae*re+ie*oe)/(G(ae*ae+ie*ie)*G(re*re+oe*oe)))/2),he=G(B[0]*B[0]+B[1]*B[1]);T=le(M,(o-he)/(ue-1)),I=le(M,(h-he)/(ue+1))}else T=I=0}L>O?I>O?(m=ee(te,ne,N,k,h,I,x),c=ee(Z,K,H,W,h,I,x),l.moveTo(m.cx+m.x01,m.cy+m.y01),I<M?l.arc(m.cx,m.cy,I,E(m.y01,m.x01),E(c.y01,c.x01),!x):(l.arc(m.cx,m.cy,I,E(m.y01,m.x01),E(m.y11,m.x11),!x),l.arc(0,0,h,E(m.cy+m.y11,m.cx+m.x11),E(c.cy+c.y11,c.cx+c.x11),!x),l.arc(c.cx,c.cy,I,E(c.y11,c.x11),E(c.y01,c.x01),!x))):(l.moveTo(N,k),l.arc(0,0,h,A,b,!x)):l.moveTo(N,k),!(o>O)||!(P>O)?l.lineTo(H,W):T>O?(m=ee(H,W,Z,K,o,-T,x),c=ee(N,k,te,ne,o,-T,x),l.lineTo(m.cx+m.x01,m.cy+m.y01),T<M?l.arc(m.cx,m.cy,T,E(m.y01,m.x01),E(c.y01,c.x01),!x):(l.arc(m.cx,m.cy,T,E(m.y01,m.x01),E(m.y11,m.x11),!x),l.arc(0,0,o,E(m.cy+m.y11,m.cx+m.x11),E(c.cy+c.y11,c.cx+c.x11),x),l.arc(c.cx,c.cy,T,E(c.y11,c.x11),E(c.y01,c.x01),!x))):l.arc(0,0,o,v,$,x)}if(l.closePath(),a)return l=null,a+""||null}return u.centroid=function(){var a=(+e.apply(this,arguments)+ +s.apply(this,arguments))/2,p=(+i.apply(this,arguments)+ +r.apply(this,arguments))/2-ge/2;return[q(p)*a,U(p)*a]},u.innerRadius=function(a){return arguments.length?(e=typeof a=="function"?a:z(+a),u):e},u.outerRadius=function(a){return arguments.length?(s=typeof a=="function"?a:z(+a),u):s},u.cornerRadius=function(a){return arguments.length?(t=typeof a=="function"?a:z(+a),u):t},u.padRadius=function(a){return arguments.length?(n=a==null?null:typeof a=="function"?a:z(+a),u):n},u.startAngle=function(a){return arguments.length?(i=typeof a=="function"?a:z(+a),u):i},u.endAngle=function(a){return arguments.length?(r=typeof a=="function"?a:z(+a),u):r},u.padAngle=function(a){return arguments.length?(g=typeof a=="function"?a:z(+a),u):g},u.context=function(a){return arguments.length?(l=a??null,u):l},u}function X(e,s){if(typeof e=="number")return e;if(e==="100%")return s;if(e.endsWith("%")){const t=Number.parseFloat(e.slice(0,e.length-1));if(!Number.isNaN(t))return t*s/100}if(e.endsWith("px")){const t=Number.parseFloat(e.slice(0,e.length-2));if(!Number.isNaN(t))return t}throw Error(`MUI X: Received an unknown value "${e}". It should be a number, or a string with a percentage value.`)}const cs=["classes","color","cornerRadius","dataIndex","endAngle","id","innerRadius","isFaded","isHighlighted","onClick","outerRadius","paddingAngle","startAngle","highlightScope"];function us(e){return Pe("MuiPieArc",e)}be("MuiPieArc",["root","highlighted","faded"]);const hs=e=>{const{classes:s,id:t,isFaded:n,isHighlighted:i}=e,r={root:["root",`series-${t}`,i&&"highlighted",n&&"faded"]};return $e(r,us,s)},gs=je(ve.path,{name:"MuiPieArc",slot:"Root",overridesResolver:(e,s)=>s.arc})(({theme:e})=>({stroke:(e.vars||e).palette.background.paper,strokeWidth:1,strokeLinejoin:"round"}));function ms(e){const{classes:s,color:t,cornerRadius:n,dataIndex:i,endAngle:r,id:g,innerRadius:l,isFaded:f,isHighlighted:u,onClick:a,outerRadius:p,paddingAngle:o,startAngle:h}=e,R=J(e,cs),y={id:g,dataIndex:i,classes:s,color:t,isFaded:f,isHighlighted:u},C=hs(y),x=Ue();return d.jsx(gs,D({d:se([h,r,o,l,p,n],(A,b,$,v,P,L)=>Le().cornerRadius(L)({padAngle:$,startAngle:A,endAngle:b,innerRadius:v,outerRadius:P})),visibility:se([h,r],(A,b)=>A===b?"hidden":"visible"),onClick:a,cursor:a?"pointer":"unset",ownerState:y,className:C.root},R,x({type:"pie",seriesId:g,dataIndex:i})))}const fs={keys:e=>e.id,from:({innerRadius:e,outerRadius:s,cornerRadius:t,startAngle:n,endAngle:i,paddingAngle:r,color:g,isFaded:l})=>({innerRadius:e,outerRadius:(e+s)/2,cornerRadius:t,startAngle:(n+i)/2,endAngle:(n+i)/2,paddingAngle:r,fill:g,opacity:l?.3:1}),leave:({innerRadius:e,startAngle:s,endAngle:t})=>({innerRadius:e,outerRadius:e,startAngle:(s+t)/2,endAngle:(s+t)/2}),enter:({innerRadius:e,outerRadius:s,startAngle:t,endAngle:n})=>({innerRadius:e,outerRadius:s,startAngle:t,endAngle:n}),update:({innerRadius:e,outerRadius:s,cornerRadius:t,startAngle:n,endAngle:i,paddingAngle:r,color:g,isFaded:l})=>({innerRadius:e,outerRadius:s,cornerRadius:t,startAngle:n,endAngle:i,paddingAngle:r,fill:g,opacity:l?.3:1}),config:{tension:120,friction:14,clamp:!0}},ps={keys:e=>e.id,from:({innerRadius:e,outerRadius:s,arcLabelRadius:t,cornerRadius:n,startAngle:i,endAngle:r,paddingAngle:g})=>({innerRadius:e,outerRadius:(e+s)/2,cornerRadius:n,arcLabelRadius:t,startAngle:(i+r)/2,endAngle:(i+r)/2,paddingAngle:g,opacity:0}),leave:({innerRadius:e,startAngle:s,endAngle:t})=>({innerRadius:e,outerRadius:e,arcLabelRadius:e,startAngle:(s+t)/2,endAngle:(s+t)/2,opacity:0}),enter:({innerRadius:e,outerRadius:s,startAngle:t,endAngle:n,arcLabelRadius:i})=>({innerRadius:e,outerRadius:s,startAngle:t,endAngle:n,arcLabelRadius:i,opacity:1}),update:({innerRadius:e,outerRadius:s,cornerRadius:t,startAngle:n,endAngle:i,paddingAngle:r,arcLabelRadius:g})=>({innerRadius:e,outerRadius:s,cornerRadius:t,startAngle:n,endAngle:i,paddingAngle:r,arcLabelRadius:g,opacity:1}),config:{tension:120,friction:14,clamp:!0}};function Ne(e){const{id:s,data:t,faded:n,highlighted:i,paddingAngle:r=0,innerRadius:g=0,arcLabelRadius:l,outerRadius:f,cornerRadius:u=0}=e,{isFaded:a,isHighlighted:p}=_e();return F.useMemo(()=>t.map((h,R)=>{const y={seriesId:s,dataIndex:R},C=p(y),x=!C&&a(y),A=D({additionalRadius:0},x&&n||C&&i||{}),b=Math.max(0,Math.PI*(A.paddingAngle??r)/180),$=Math.max(0,A.innerRadius??g),v=Math.max(0,A.outerRadius??f+A.additionalRadius),P=A.cornerRadius??u,L=A.arcLabelRadius??l??($+v)/2;return D({},h,A,{isFaded:x,isHighlighted:C,paddingAngle:b,innerRadius:$,outerRadius:v,cornerRadius:P,arcLabelRadius:L})}),[u,g,f,r,l,t,n,i,a,p,s])}const xs=["slots","slotProps","innerRadius","outerRadius","cornerRadius","paddingAngle","id","highlighted","faded","data","onItemClick","skipAnimation"],As=["startAngle","endAngle","paddingAngle","innerRadius","arcLabelRadius","outerRadius","cornerRadius"];function Rs(e){const{slots:s,slotProps:t,innerRadius:n=0,outerRadius:i,cornerRadius:r=0,paddingAngle:g=0,id:l,highlighted:f,faded:u={additionalRadius:-5},data:a,onItemClick:p,skipAnimation:o}=e,h=J(e,xs),R=Ne({innerRadius:n,outerRadius:i,cornerRadius:r,paddingAngle:g,id:l,highlighted:f,faded:u,data:a}),y=Ce(R,D({},fs,{immediate:o})),{highlightScope:C}=_e();if(a.length===0)return null;const x=(s==null?void 0:s.pieArc)??ms;return d.jsx("g",D({},h,{children:y((A,b,$,v)=>{let{startAngle:P,endAngle:L,paddingAngle:S,innerRadius:w,outerRadius:M,cornerRadius:T}=A,I=J(A,As);return d.jsx(x,D({startAngle:P,endAngle:L,paddingAngle:S,innerRadius:w,outerRadius:M,cornerRadius:T,style:I,id:l,color:b.color,dataIndex:v,highlightScope:C,isFaded:b.isFaded,isHighlighted:b.isHighlighted,onClick:p&&(m=>{p(m,{type:"pie",seriesId:l,dataIndex:v},b)})},t==null?void 0:t.pieArc))})}))}const ys=["id","classes","color","startAngle","endAngle","paddingAngle","arcLabelRadius","innerRadius","outerRadius","cornerRadius","formattedArcLabel","isHighlighted","isFaded","style"];function bs(e){return Pe("MuiPieArcLabel",e)}be("MuiPieArcLabel",["root","highlighted","faded"]);const js=e=>{const{classes:s,id:t,isFaded:n,isHighlighted:i}=e,r={root:["root",`series-${t}`,i&&"highlighted",n&&"faded"]};return $e(r,bs,s)},vs=je(ve.text,{name:"MuiPieArcLabel",slot:"Root",overridesResolver:(e,s)=>s.root})(({theme:e})=>({fill:(e.vars||e).palette.text.primary,textAnchor:"middle",dominantBaseline:"middle",pointerEvents:"none"})),Re=(e,s)=>(t,n,i,r,g)=>{if(!e)return 0;const[l,f]=Le().cornerRadius(g).centroid({padAngle:i,startAngle:t,endAngle:n,innerRadius:r,outerRadius:r});return s==="x"?l:f};function $s(e){const{id:s,classes:t,color:n,startAngle:i,endAngle:r,paddingAngle:g,arcLabelRadius:l,cornerRadius:f,formattedArcLabel:u,isHighlighted:a,isFaded:p,style:o}=e,h=J(e,ys),y=js({id:s,classes:t,color:n,isFaded:p,isHighlighted:a});return d.jsx(vs,D({className:y.root},h,{style:D({x:se([i,r,g,l,f],Re(u,"x")),y:se([i,r,g,l,f],Re(u,"y"))},o),children:u}))}const Ps=["arcLabel","arcLabelMinAngle","arcLabelRadius","cornerRadius","data","faded","highlighted","id","innerRadius","outerRadius","paddingAngle","skipAnimation","slotProps","slots"],_s=["startAngle","endAngle","paddingAngle","innerRadius","outerRadius","arcLabelRadius","cornerRadius"],Cs=180/Math.PI;function ws(e,s,t){var i;if(!e||(t.endAngle-t.startAngle)*Cs<s)return null;switch(e){case"label":return xe(t.label,"arc");case"value":return(i=t.value)==null?void 0:i.toString();case"formattedValue":return t.formattedValue;default:return e(D({},t,{label:xe(t.label,"arc")}))}}function Ls(e){const{arcLabel:s,arcLabelMinAngle:t=0,arcLabelRadius:n,cornerRadius:i=0,data:r,faded:g={additionalRadius:-5},highlighted:l,id:f,innerRadius:u,outerRadius:a,paddingAngle:p=0,skipAnimation:o,slotProps:h,slots:R}=e,y=J(e,Ps),C=Ne({innerRadius:u,outerRadius:a,arcLabelRadius:n,cornerRadius:i,paddingAngle:p,id:f,highlighted:l,faded:g,data:r}),x=Ce(C,D({},ps,{immediate:o}));if(r.length===0)return null;const A=(R==null?void 0:R.pieArcLabel)??$s;return d.jsx("g",D({},y,{children:x((b,$)=>{let{startAngle:v,endAngle:P,paddingAngle:L,innerRadius:S,outerRadius:w,arcLabelRadius:M,cornerRadius:T}=b,I=J(b,_s);return d.jsx(A,D({startAngle:v,endAngle:P,paddingAngle:L,innerRadius:S,outerRadius:w,arcLabelRadius:M,cornerRadius:T,style:I,id:f,color:$.color,isFaded:$.isFaded,isHighlighted:$.isHighlighted,formattedArcLabel:ws(s,t,$)},h==null?void 0:h.pieArcLabel))})}))}function ye(e,s){const{height:t,width:n}=s,{cx:i,cy:r}=e,g=Math.min(n,t)/2,l=X(i??"50%",n),f=X(r??"50%",t);return{cx:l,cy:f,availableRadius:g}}function Ns(e){const{skipAnimation:s,slots:t,slotProps:n,onItemClick:i}=e,r=Be(),{left:g,top:l,width:f,height:u}=F.useContext(ze);if(r===void 0)return null;const{series:a,seriesOrder:p}=r;return d.jsxs("g",{children:[p.map(o=>{const{innerRadius:h,outerRadius:R,cornerRadius:y,paddingAngle:C,data:x,cx:A,cy:b,highlighted:$,faded:v}=a[o],{cx:P,cy:L,availableRadius:S}=ye({cx:A,cy:b},{width:f,height:u}),w=X(R??S,S),M=X(h??0,S);return d.jsx("g",{transform:`translate(${g+P}, ${l+L})`,children:d.jsx(Rs,{innerRadius:M,outerRadius:w,cornerRadius:y,paddingAngle:C,id:o,data:x,skipAnimation:s,highlighted:$,faded:v,onItemClick:i,slots:t,slotProps:n})},o)}),p.map(o=>{const{innerRadius:h,outerRadius:R,arcLabelRadius:y,cornerRadius:C,paddingAngle:x,arcLabel:A,arcLabelMinAngle:b,data:$,cx:v,cy:P}=a[o],{cx:L,cy:S,availableRadius:w}=ye({cx:v,cy:P},{width:f,height:u}),M=X(R??w,w),T=X(h??0,w),I=y===void 0?(M+T)/2:X(y,w);return d.jsx("g",{transform:`translate(${g+L}, ${l+S})`,children:d.jsx(Ls,{innerRadius:T,outerRadius:M??w,arcLabelRadius:I,cornerRadius:C,paddingAngle:x,id:o,data:$,skipAnimation:s,arcLabel:A,arcLabelMinAngle:b,slots:t,slotProps:n})},o)})]})}const Ss=["xAxis","yAxis","series","width","height","margin","colors","sx","tooltip","axisHighlight","skipAnimation","legend","topAxis","leftAxis","rightAxis","bottomAxis","children","slots","slotProps","onItemClick","loading","highlightedItem","onHighlightChange","className"],Ms={top:5,bottom:5,left:5,right:100},Ts={top:5,bottom:5,left:100,right:5},Is=F.forwardRef(function(s,t){const n=We({props:s,name:"MuiPieChart"}),{xAxis:i,yAxis:r,series:g,width:l,height:f,margin:u,colors:a,sx:p,tooltip:o={trigger:"item"},axisHighlight:h={x:"none",y:"none"},skipAnimation:R,legend:y,topAxis:C=null,leftAxis:x=null,rightAxis:A=null,bottomAxis:b=null,children:$,slots:v,slotProps:P,onItemClick:L,loading:S,highlightedItem:w,onHighlightChange:M,className:T}=n,I=J(n,Ss),m=qe(),c=D({},m?Ts:Ms,u),j=D({direction:"column",position:{vertical:"middle",horizontal:m?"left":"right"}},y);return d.jsxs(Ve,D({},I,{ref:t,series:g.map(_=>D({type:"pie"},_)),width:l,height:f,margin:c,xAxis:i??[{id:Xe,scaleType:"point",data:[...new Array(Math.max(...g.map(_=>_.data.length)))].map((_,N)=>N)}],yAxis:r,colors:a,sx:p,disableAxisListener:(o==null?void 0:o.trigger)!=="axis"&&(h==null?void 0:h.x)==="none"&&(h==null?void 0:h.y)==="none",highlightedItem:w,onHighlightChange:M,className:T,children:[d.jsx(Je,{topAxis:C,leftAxis:x,rightAxis:A,bottomAxis:b,slots:v,slotProps:P}),d.jsx(Ns,{slots:v,slotProps:P,onItemClick:L,skipAnimation:R}),d.jsx(Ze,{loading:S,slots:v,slotProps:P}),d.jsx(Ge,D({},j,{slots:v,slotProps:P})),d.jsx(Ke,D({},h)),!S&&d.jsx(Qe,D({},o,{slots:v,slotProps:P})),$]}))}),Ds=()=>{const[e,s]=F.useState([]),[t,n]=F.useState([]),[i,r]=F.useState([]),[g,l]=F.useState(0),[f,u]=F.useState(0),[a,p]=F.useState([]),[o,h]=F.useState("Assessment 1"),[R,y]=F.useState({Aster:0,Camia:0,Dahlia:0,Iris:0,Jasmin:0,Orchid:0,Rose:0,Tulip:0,SSC:0}),[C,x]=F.useState({Aster:0,Camia:0,Dahlia:0,Iris:0}),[A,b]=F.useState({scores:[],counts:[]}),$=F.useRef(null);Me.useDownloadExcel({currentTableRef:$.current,filename:"Student_List_Report_table",sheet:"Students"}),F.useEffect(()=>{(async()=>{try{await Promise.all([v(),P(),L()]),await S()}catch(j){console.error("Error fetching data:",j)}})()},[o]);const v=async()=>{try{const j=(await Q.get("/api/users")).data;s(j),l(w(j,"Teacher")),u(w(j,"Parent"))}catch(c){console.error("Error fetching users:",c)}},P=async()=>{try{const j=(await Q.get("/api/getStudents")).data;n(j),y(M(j))}catch(c){console.error("Error fetching students:",c)}},L=async()=>{try{const j=(await Q.get("/api/getAssessments")).data;r(j),x(T(j))}catch(c){console.error("Error fetching assessments:",c)}},S=async()=>{try{const j=(await Q.get(`/api/getPerformance?assessment=${o}`)).data;p(j);const _=I(j);b(_)}catch(c){console.error("Error fetching performance data:",c)}},w=(c,j)=>c.filter(_=>_.role===j).length,M=c=>["Aster","Camia","Dahlia","Iris","Jasmin","Orchid","Rose","Tulip","SSC"].reduce((_,N)=>(_[N]=c.filter(k=>k.Section===N).length,_),{}),T=c=>["Pagbabaybay","Pantig","Salita","Pagbabasa"].reduce((_,N)=>(_[N]=c.filter(k=>k.type===N).length,_),{}),I=c=>{const j={},_={};return c.forEach(N=>{const{Score:k,AssessmentType:H}=N;j[H]||(j[H]=0),j[H]+=k,_[H]||(_[H]=0),_[H]++}),{scores:j,counts:_}};return(()=>{const c={},j=["Assessment 1","Assessment 2","Assessment 3","Assessment 4"];return a.forEach(_=>{const{LRN:N,Score:k,AssessmentType:H}=_;c[N]||(c[N]={LRN:N,scores:j.map(()=>0)});const W=j.indexOf(H);let Z=H==="Assessment 4"?k/5*10:k||0;W!==-1&&(c[N].scores[W]=Z)}),Object.values(c).map(_=>({label:`LRN: ${_.LRN}`,data:_.scores.map((N,k)=>({x:j[k],y:isNaN(N)?0:N}))}))})(),d.jsxs("div",{className:"px-9",children:[d.jsxs("div",{className:"flex items-center mb-4",children:[d.jsx("h1",{className:"text-3xl font-semibold",children:"Admin Dashboard"}),d.jsx(Ee,{showArrow:!0,content:d.jsxs("div",{className:"p-2 text-sm",children:[d.jsx("div",{className:"font-bold",children:"Dashboard Info"}),d.jsx("p",{children:"View system data for each section."})]}),children:d.jsx(Y,{icon:Te,className:"ml-2 text-black"})})]}),d.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-4",children:[d.jsxs("div",{className:"bg-white rounded-lg shadow p-4 flex flex-row justify-between",children:[d.jsxs("div",{children:[d.jsx("h2",{className:"text-xl font-semibold",children:"Students"}),d.jsx("p",{className:"text-5xl mt-2",children:t.length})]}),d.jsx("div",{children:d.jsx(Y,{icon:Ie,size:"2xl",className:"text-md"})})]}),d.jsxs("div",{className:"bg-white rounded-lg shadow p-4 flex flex-row justify-between",children:[d.jsxs("div",{children:[d.jsx("h2",{className:"text-xl font-semibold",children:"Teachers"}),d.jsx("p",{className:"text-5xl mt-2",children:g})]}),d.jsx("div",{children:d.jsx(Y,{icon:De,size:"2xl",className:"text-md"})})]}),d.jsxs("div",{className:"bg-white rounded-lg shadow p-4 flex flex-row justify-between",children:[d.jsxs("div",{children:[d.jsx("h2",{className:"text-xl font-semibold",children:"Parents"}),d.jsx("p",{className:"text-5xl mt-2",children:f})]}),d.jsx("div",{children:d.jsx(Y,{icon:ke,size:"2xl",className:"text-md"})})]}),d.jsxs("div",{className:"col-span-1 lg:col-span-1 bg-white rounded-lg shadow p-4",children:[d.jsx("h2",{className:"text-xl font-semibold",children:"User Distribution"}),d.jsx("div",{className:"pt-8 pl-5",children:d.jsx(Is,{series:[{data:[{id:1,value:t.length,label:"Students"},{id:2,value:g,label:"Teachers"},{id:3,value:f,label:"Parents"}]}],width:400,height:200})})]}),d.jsxs("div",{className:"col-span-1 lg:col-span-2 bg-white rounded-lg shadow p-4",children:[d.jsx("h2",{className:"text-xl font-semibold",children:"Students Per Section"}),d.jsx(Ae,{xAxis:[{scaleType:"band",data:Object.keys(R)}],yAxis:[{label:"Number of Students"}],margin:{top:20,bottom:20,left:50,right:20},series:[{data:Object.values(R),label:"Students"}],height:300})]}),d.jsxs("div",{className:"col-span-1 lg:col-span-3 bg-white rounded-lg shadow p-4",children:[d.jsx("h2",{className:"text-xl font-semibold",children:"Assessment Types"}),d.jsx(Ae,{xAxis:[{scaleType:"band",data:Object.keys(C)}],yAxis:[{label:"Count of Activities"}],series:[{data:Object.values(C),label:"Assessments"}],height:300})]})]})]})},Zs=()=>d.jsxs("div",{className:"w-full h-full flex",children:[d.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6] shadow-lg",children:d.jsx(Se,{})}),d.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[d.jsx(Ye,{}),d.jsx(Ds,{})]})]});export{Zs as default};