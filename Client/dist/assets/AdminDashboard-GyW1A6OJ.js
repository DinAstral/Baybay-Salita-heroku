import{j as e,r as D,a as ae}from"./index-B3evWOvr.js";import{A as Me}from"./AdminSidebar-QG88Dcth.js";import"./index-C2vyfmTV.js";import{F as U,d as ke,e as se,g as ie,h as Ie}from"./index-KVpr4HOM.js";import{t as Ee}from"./profile-BUfphmKk.js";import{_ as I}from"./extends-CF3RwP-h.js";import{_ as Y}from"./objectWithoutPropertiesLoose-CAYKN5F1.js";import{p as fe,c as Z,s as V,a as J,h as pe,e as O,t as De,b as te,m as ue,d as Re,f as H,g as be,i as Fe,j as He,k as ve,l as we,n as Ne,u as ze,o as le,q as Ce,r as Pe,v as $e,w as Le,x as Ae,y as Oe,D as Ge,z as Ue,A as Be,R as We,B as qe,C as Ve,E as Xe,F as Je,G as Ze,H as Ke,I as ne}from"./BarChart-QVyFdxYr.js";import{C as Qe}from"./ContentHeader-BzD-We4a.js";import"./chunk-DBLREEYE-BgWDaA6x.js";import"./useOverlayTriggerState-DmMDsRTn.js";import"./chunk-CIZQCQPA-DAO2OqzP.js";import"./createPopper-iTKh2FQm.js";const he=Math.PI,ge=2*he,K=1e-6,Ye=ge-K;function Se(s){this._+=s[0];for(let t=1,a=s.length;t<a;++t)this._+=arguments[t]+s[t]}function es(s){let t=Math.floor(s);if(!(t>=0))throw new Error(`invalid digits: ${s}`);if(t>15)return Se;const a=10**t;return function(i){this._+=i[0];for(let n=1,o=i.length;n<o;++n)this._+=Math.round(arguments[n]*a)/a+i[n]}}class ss{constructor(t){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=t==null?Se:es(t)}moveTo(t,a){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+a}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(t,a){this._append`L${this._x1=+t},${this._y1=+a}`}quadraticCurveTo(t,a,i,n){this._append`Q${+t},${+a},${this._x1=+i},${this._y1=+n}`}bezierCurveTo(t,a,i,n,o,h){this._append`C${+t},${+a},${+i},${+n},${this._x1=+o},${this._y1=+h}`}arcTo(t,a,i,n,o){if(t=+t,a=+a,i=+i,n=+n,o=+o,o<0)throw new Error(`negative radius: ${o}`);let h=this._x1,d=this._y1,x=i-t,c=n-a,r=h-t,R=d-a,l=r*r+R*R;if(this._x1===null)this._append`M${this._x1=t},${this._y1=a}`;else if(l>K)if(!(Math.abs(R*x-c*r)>K)||!o)this._append`L${this._x1=t},${this._y1=a}`;else{let u=i-h,A=n-d,y=x*x+c*c,C=u*u+A*A,f=Math.sqrt(y),p=Math.sqrt(l),j=o*Math.tan((he-Math.acos((y+l-C)/(2*f*p)))/2),b=j/p,v=j/f;Math.abs(b-1)>K&&this._append`L${t+b*r},${a+b*R}`,this._append`A${o},${o},0,0,${+(R*u>r*A)},${this._x1=t+v*x},${this._y1=a+v*c}`}}arc(t,a,i,n,o,h){if(t=+t,a=+a,i=+i,h=!!h,i<0)throw new Error(`negative radius: ${i}`);let d=i*Math.cos(n),x=i*Math.sin(n),c=t+d,r=a+x,R=1^h,l=h?n-o:o-n;this._x1===null?this._append`M${c},${r}`:(Math.abs(this._x1-c)>K||Math.abs(this._y1-r)>K)&&this._append`L${c},${r}`,i&&(l<0&&(l=l%ge+ge),l>Ye?this._append`A${i},${i},0,1,${R},${t-d},${a-x}A${i},${i},0,1,${R},${this._x1=c},${this._y1=r}`:l>K&&this._append`A${i},${i},0,${+(l>=he)},${R},${this._x1=t+i*Math.cos(o)},${this._y1=a+i*Math.sin(o)}`)}rect(t,a,i,n){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+a}h${i=+i}v${+n}h${-i}Z`}toString(){return this._}}function ts(s){let t=3;return s.digits=function(a){if(!arguments.length)return t;if(a==null)t=null;else{const i=Math.floor(a);if(!(i>=0))throw new RangeError(`invalid digits: ${a}`);t=i}return s},()=>new ss(t)}function as(s){return s.innerRadius}function is(s){return s.outerRadius}function ns(s){return s.startAngle}function rs(s){return s.endAngle}function ls(s){return s&&s.padAngle}function os(s,t,a,i,n,o,h,d){var x=a-s,c=i-t,r=h-n,R=d-o,l=R*x-r*c;if(!(l*l<O))return l=(r*(t-o)-R*(s-n))/l,[s+l*x,t+l*c]}function re(s,t,a,i,n,o,h){var d=s-a,x=t-i,c=(h?o:-o)/te(d*d+x*x),r=c*x,R=-c*d,l=s+r,u=t+R,A=a+r,y=i+R,C=(l+A)/2,f=(u+y)/2,p=A-l,j=y-u,b=p*p+j*j,v=n-o,N=l*y-A*u,$=(j<0?-1:1)*te(He(0,v*v*b-N*N)),_=(N*j-p*$)/b,L=(-N*p-j*$)/b,S=(N*j+p*$)/b,T=(-N*p+j*$)/b,M=_-C,g=L-f,w=S-C,B=T-f;return M*M+g*g>w*w+B*B&&(_=S,L=T),{cx:_,cy:L,x01:-r,y01:-R,x11:_*(n/v-1),y11:L*(n/v-1)}}function _e(){var s=as,t=is,a=J(0),i=null,n=ns,o=rs,h=ls,d=null,x=ts(c);function c(){var r,R,l=+s.apply(this,arguments),u=+t.apply(this,arguments),A=n.apply(this,arguments)-pe,y=o.apply(this,arguments)-pe,C=Re(y-A),f=y>A;if(d||(d=r=x()),u<l&&(R=u,u=l,l=R),!(u>O))d.moveTo(0,0);else if(C>De-O)d.moveTo(u*Z(A),u*V(A)),d.arc(0,0,u,A,y,!f),l>O&&(d.moveTo(l*Z(y),l*V(y)),d.arc(0,0,l,y,A,f));else{var p=A,j=y,b=A,v=y,N=C,$=C,_=h.apply(this,arguments)/2,L=_>O&&(i?+i.apply(this,arguments):te(l*l+u*u)),S=ue(Re(u-l)/2,+a.apply(this,arguments)),T=S,M=S,g,w;if(L>O){var B=be(L/l*V(_)),W=be(L/u*V(_));(N-=B*2)>O?(B*=f?1:-1,b+=B,v-=B):(N=0,b=v=(A+y)/2),($-=W*2)>O?(W*=f?1:-1,p+=W,j-=W):($=0,p=j=(A+y)/2)}var q=u*Z(p),m=u*V(p),P=l*Z(v),k=l*V(v);if(S>O){var E=u*Z(j),F=u*V(j),z=l*Z(b),X=l*V(b),G;if(C<fe)if(G=os(q,m,z,X,E,F,P,k)){var ee=q-G[0],oe=m-G[1],de=E-G[0],ce=F-G[1],me=1/V(Fe((ee*de+oe*ce)/(te(ee*ee+oe*oe)*te(de*de+ce*ce)))/2),xe=te(G[0]*G[0]+G[1]*G[1]);T=ue(S,(l-xe)/(me-1)),M=ue(S,(u-xe)/(me+1))}else T=M=0}$>O?M>O?(g=re(z,X,q,m,u,M,f),w=re(E,F,P,k,u,M,f),d.moveTo(g.cx+g.x01,g.cy+g.y01),M<S?d.arc(g.cx,g.cy,M,H(g.y01,g.x01),H(w.y01,w.x01),!f):(d.arc(g.cx,g.cy,M,H(g.y01,g.x01),H(g.y11,g.x11),!f),d.arc(0,0,u,H(g.cy+g.y11,g.cx+g.x11),H(w.cy+w.y11,w.cx+w.x11),!f),d.arc(w.cx,w.cy,M,H(w.y11,w.x11),H(w.y01,w.x01),!f))):(d.moveTo(q,m),d.arc(0,0,u,p,j,!f)):d.moveTo(q,m),!(l>O)||!(N>O)?d.lineTo(P,k):T>O?(g=re(P,k,E,F,l,-T,f),w=re(q,m,z,X,l,-T,f),d.lineTo(g.cx+g.x01,g.cy+g.y01),T<S?d.arc(g.cx,g.cy,T,H(g.y01,g.x01),H(w.y01,w.x01),!f):(d.arc(g.cx,g.cy,T,H(g.y01,g.x01),H(g.y11,g.x11),!f),d.arc(0,0,l,H(g.cy+g.y11,g.cx+g.x11),H(w.cy+w.y11,w.cx+w.x11),f),d.arc(w.cx,w.cy,T,H(w.y11,w.x11),H(w.y01,w.x01),!f))):d.arc(0,0,l,v,b,f)}if(d.closePath(),r)return d=null,r+""||null}return c.centroid=function(){var r=(+s.apply(this,arguments)+ +t.apply(this,arguments))/2,R=(+n.apply(this,arguments)+ +o.apply(this,arguments))/2-fe/2;return[Z(R)*r,V(R)*r]},c.innerRadius=function(r){return arguments.length?(s=typeof r=="function"?r:J(+r),c):s},c.outerRadius=function(r){return arguments.length?(t=typeof r=="function"?r:J(+r),c):t},c.cornerRadius=function(r){return arguments.length?(a=typeof r=="function"?r:J(+r),c):a},c.padRadius=function(r){return arguments.length?(i=r==null?null:typeof r=="function"?r:J(+r),c):i},c.startAngle=function(r){return arguments.length?(n=typeof r=="function"?r:J(+r),c):n},c.endAngle=function(r){return arguments.length?(o=typeof r=="function"?r:J(+r),c):o},c.padAngle=function(r){return arguments.length?(h=typeof r=="function"?r:J(+r),c):h},c.context=function(r){return arguments.length?(d=r??null,c):d},c}function Q(s,t){if(typeof s=="number")return s;if(s==="100%")return t;if(s.endsWith("%")){const a=Number.parseFloat(s.slice(0,s.length-1));if(!Number.isNaN(a))return a*t/100}if(s.endsWith("px")){const a=Number.parseFloat(s.slice(0,s.length-2));if(!Number.isNaN(a))return a}throw Error(`MUI X: Received an unknown value "${s}". It should be a number, or a string with a percentage value.`)}const ds=["classes","color","cornerRadius","dataIndex","endAngle","id","innerRadius","isFaded","isHighlighted","onClick","outerRadius","paddingAngle","startAngle","highlightScope"];function cs(s){return Pe("MuiPieArc",s)}ve("MuiPieArc",["root","highlighted","faded"]);const us=s=>{const{classes:t,id:a,isFaded:i,isHighlighted:n}=s,o={root:["root",`series-${a}`,n&&"highlighted",i&&"faded"]};return Ce(o,cs,t)},hs=we(Ne.path,{name:"MuiPieArc",slot:"Root",overridesResolver:(s,t)=>t.arc})(({theme:s})=>({stroke:(s.vars||s).palette.background.paper,strokeWidth:1,strokeLinejoin:"round"}));function gs(s){const{classes:t,color:a,cornerRadius:i,dataIndex:n,endAngle:o,id:h,innerRadius:d,isFaded:x,isHighlighted:c,onClick:r,outerRadius:R,paddingAngle:l,startAngle:u}=s,A=Y(s,ds),y={id:h,dataIndex:n,classes:t,color:a,isFaded:x,isHighlighted:c},C=us(y),f=ze();return e.jsx(hs,I({d:le([u,o,l,d,R,i],(p,j,b,v,N,$)=>_e().cornerRadius($)({padAngle:b,startAngle:p,endAngle:j,innerRadius:v,outerRadius:N})),visibility:le([u,o],(p,j)=>p===j?"hidden":"visible"),onClick:r,cursor:r?"pointer":"unset",ownerState:y,className:C.root},A,f({type:"pie",seriesId:h,dataIndex:n})))}const ms={keys:s=>s.id,from:({innerRadius:s,outerRadius:t,cornerRadius:a,startAngle:i,endAngle:n,paddingAngle:o,color:h,isFaded:d})=>({innerRadius:s,outerRadius:(s+t)/2,cornerRadius:a,startAngle:(i+n)/2,endAngle:(i+n)/2,paddingAngle:o,fill:h,opacity:d?.3:1}),leave:({innerRadius:s,startAngle:t,endAngle:a})=>({innerRadius:s,outerRadius:s,startAngle:(t+a)/2,endAngle:(t+a)/2}),enter:({innerRadius:s,outerRadius:t,startAngle:a,endAngle:i})=>({innerRadius:s,outerRadius:t,startAngle:a,endAngle:i}),update:({innerRadius:s,outerRadius:t,cornerRadius:a,startAngle:i,endAngle:n,paddingAngle:o,color:h,isFaded:d})=>({innerRadius:s,outerRadius:t,cornerRadius:a,startAngle:i,endAngle:n,paddingAngle:o,fill:h,opacity:d?.3:1}),config:{tension:120,friction:14,clamp:!0}},xs={keys:s=>s.id,from:({innerRadius:s,outerRadius:t,arcLabelRadius:a,cornerRadius:i,startAngle:n,endAngle:o,paddingAngle:h})=>({innerRadius:s,outerRadius:(s+t)/2,cornerRadius:i,arcLabelRadius:a,startAngle:(n+o)/2,endAngle:(n+o)/2,paddingAngle:h,opacity:0}),leave:({innerRadius:s,startAngle:t,endAngle:a})=>({innerRadius:s,outerRadius:s,arcLabelRadius:s,startAngle:(t+a)/2,endAngle:(t+a)/2,opacity:0}),enter:({innerRadius:s,outerRadius:t,startAngle:a,endAngle:i,arcLabelRadius:n})=>({innerRadius:s,outerRadius:t,startAngle:a,endAngle:i,arcLabelRadius:n,opacity:1}),update:({innerRadius:s,outerRadius:t,cornerRadius:a,startAngle:i,endAngle:n,paddingAngle:o,arcLabelRadius:h})=>({innerRadius:s,outerRadius:t,cornerRadius:a,startAngle:i,endAngle:n,paddingAngle:o,arcLabelRadius:h,opacity:1}),config:{tension:120,friction:14,clamp:!0}};function Te(s){const{id:t,data:a,faded:i,highlighted:n,paddingAngle:o=0,innerRadius:h=0,arcLabelRadius:d,outerRadius:x,cornerRadius:c=0}=s,{isFaded:r,isHighlighted:R}=$e();return D.useMemo(()=>a.map((u,A)=>{const y={seriesId:t,dataIndex:A},C=R(y),f=!C&&r(y),p=I({additionalRadius:0},f&&i||C&&n||{}),j=Math.max(0,Math.PI*(p.paddingAngle??o)/180),b=Math.max(0,p.innerRadius??h),v=Math.max(0,p.outerRadius??x+p.additionalRadius),N=p.cornerRadius??c,$=p.arcLabelRadius??d??(b+v)/2;return I({},u,p,{isFaded:f,isHighlighted:C,paddingAngle:j,innerRadius:b,outerRadius:v,cornerRadius:N,arcLabelRadius:$})}),[c,h,x,o,d,a,i,n,r,R,t])}const fs=["slots","slotProps","innerRadius","outerRadius","cornerRadius","paddingAngle","id","highlighted","faded","data","onItemClick","skipAnimation"],ps=["startAngle","endAngle","paddingAngle","innerRadius","arcLabelRadius","outerRadius","cornerRadius"];function Rs(s){const{slots:t,slotProps:a,innerRadius:i=0,outerRadius:n,cornerRadius:o=0,paddingAngle:h=0,id:d,highlighted:x,faded:c={additionalRadius:-5},data:r,onItemClick:R,skipAnimation:l}=s,u=Y(s,fs),A=Te({innerRadius:i,outerRadius:n,cornerRadius:o,paddingAngle:h,id:d,highlighted:x,faded:c,data:r}),y=Le(A,I({},ms,{immediate:l})),{highlightScope:C}=$e();if(r.length===0)return null;const f=(t==null?void 0:t.pieArc)??gs;return e.jsx("g",I({},u,{children:y((p,j,b,v)=>{let{startAngle:N,endAngle:$,paddingAngle:_,innerRadius:L,outerRadius:S,cornerRadius:T}=p,M=Y(p,ps);return e.jsx(f,I({startAngle:N,endAngle:$,paddingAngle:_,innerRadius:L,outerRadius:S,cornerRadius:T,style:M,id:d,color:j.color,dataIndex:v,highlightScope:C,isFaded:j.isFaded,isHighlighted:j.isHighlighted,onClick:R&&(g=>{R(g,{type:"pie",seriesId:d,dataIndex:v},j)})},a==null?void 0:a.pieArc))})}))}const bs=["id","classes","color","startAngle","endAngle","paddingAngle","arcLabelRadius","innerRadius","outerRadius","cornerRadius","formattedArcLabel","isHighlighted","isFaded","style"];function As(s){return Pe("MuiPieArcLabel",s)}ve("MuiPieArcLabel",["root","highlighted","faded"]);const ys=s=>{const{classes:t,id:a,isFaded:i,isHighlighted:n}=s,o={root:["root",`series-${a}`,n&&"highlighted",i&&"faded"]};return Ce(o,As,t)},js=we(Ne.text,{name:"MuiPieArcLabel",slot:"Root",overridesResolver:(s,t)=>t.root})(({theme:s})=>({fill:(s.vars||s).palette.text.primary,textAnchor:"middle",dominantBaseline:"middle",pointerEvents:"none"})),ye=(s,t)=>(a,i,n,o,h)=>{if(!s)return 0;const[d,x]=_e().cornerRadius(h).centroid({padAngle:n,startAngle:a,endAngle:i,innerRadius:o,outerRadius:o});return t==="x"?d:x};function vs(s){const{id:t,classes:a,color:i,startAngle:n,endAngle:o,paddingAngle:h,arcLabelRadius:d,cornerRadius:x,formattedArcLabel:c,isHighlighted:r,isFaded:R,style:l}=s,u=Y(s,bs),y=ys({id:t,classes:a,color:i,isFaded:R,isHighlighted:r});return e.jsx(js,I({className:y.root},u,{style:I({x:le([n,o,h,d,x],ye(c,"x")),y:le([n,o,h,d,x],ye(c,"y"))},l),children:c}))}const ws=["arcLabel","arcLabelMinAngle","arcLabelRadius","cornerRadius","data","faded","highlighted","id","innerRadius","outerRadius","paddingAngle","skipAnimation","slotProps","slots"],Ns=["startAngle","endAngle","paddingAngle","innerRadius","outerRadius","arcLabelRadius","cornerRadius"],Cs=180/Math.PI;function Ps(s,t,a){var n;if(!s||(a.endAngle-a.startAngle)*Cs<t)return null;switch(s){case"label":return Ae(a.label,"arc");case"value":return(n=a.value)==null?void 0:n.toString();case"formattedValue":return a.formattedValue;default:return s(I({},a,{label:Ae(a.label,"arc")}))}}function $s(s){const{arcLabel:t,arcLabelMinAngle:a=0,arcLabelRadius:i,cornerRadius:n=0,data:o,faded:h={additionalRadius:-5},highlighted:d,id:x,innerRadius:c,outerRadius:r,paddingAngle:R=0,skipAnimation:l,slotProps:u,slots:A}=s,y=Y(s,ws),C=Te({innerRadius:c,outerRadius:r,arcLabelRadius:i,cornerRadius:n,paddingAngle:R,id:x,highlighted:d,faded:h,data:o}),f=Le(C,I({},xs,{immediate:l}));if(o.length===0)return null;const p=(A==null?void 0:A.pieArcLabel)??vs;return e.jsx("g",I({},y,{children:f((j,b)=>{let{startAngle:v,endAngle:N,paddingAngle:$,innerRadius:_,outerRadius:L,arcLabelRadius:S,cornerRadius:T}=j,M=Y(j,Ns);return e.jsx(p,I({startAngle:v,endAngle:N,paddingAngle:$,innerRadius:_,outerRadius:L,arcLabelRadius:S,cornerRadius:T,style:M,id:x,color:b.color,isFaded:b.isFaded,isHighlighted:b.isHighlighted,formattedArcLabel:Ps(t,a,b)},u==null?void 0:u.pieArcLabel))})}))}function je(s,t){const{height:a,width:i}=t,{cx:n,cy:o}=s,h=Math.min(i,a)/2,d=Q(n??"50%",i),x=Q(o??"50%",a);return{cx:d,cy:x,availableRadius:h}}function Ls(s){const{skipAnimation:t,slots:a,slotProps:i,onItemClick:n}=s,o=Oe(),{left:h,top:d,width:x,height:c}=D.useContext(Ge);if(o===void 0)return null;const{series:r,seriesOrder:R}=o;return e.jsxs("g",{children:[R.map(l=>{const{innerRadius:u,outerRadius:A,cornerRadius:y,paddingAngle:C,data:f,cx:p,cy:j,highlighted:b,faded:v}=r[l],{cx:N,cy:$,availableRadius:_}=je({cx:p,cy:j},{width:x,height:c}),L=Q(A??_,_),S=Q(u??0,_);return e.jsx("g",{transform:`translate(${h+N}, ${d+$})`,children:e.jsx(Rs,{innerRadius:S,outerRadius:L,cornerRadius:y,paddingAngle:C,id:l,data:f,skipAnimation:t,highlighted:b,faded:v,onItemClick:n,slots:a,slotProps:i})},l)}),R.map(l=>{const{innerRadius:u,outerRadius:A,arcLabelRadius:y,cornerRadius:C,paddingAngle:f,arcLabel:p,arcLabelMinAngle:j,data:b,cx:v,cy:N}=r[l],{cx:$,cy:_,availableRadius:L}=je({cx:v,cy:N},{width:x,height:c}),S=Q(A??L,L),T=Q(u??0,L),M=y===void 0?(S+T)/2:Q(y,L);return e.jsx("g",{transform:`translate(${h+$}, ${d+_})`,children:e.jsx($s,{innerRadius:T,outerRadius:S??L,arcLabelRadius:M,cornerRadius:C,paddingAngle:f,id:l,data:b,skipAnimation:t,arcLabel:p,arcLabelMinAngle:j,slots:a,slotProps:i})},l)})]})}const Ss=["xAxis","yAxis","series","width","height","margin","colors","sx","tooltip","axisHighlight","skipAnimation","legend","topAxis","leftAxis","rightAxis","bottomAxis","children","slots","slotProps","onItemClick","loading","highlightedItem","onHighlightChange","className"],_s={top:5,bottom:5,left:5,right:100},Ts={top:5,bottom:5,left:100,right:5},Ms=D.forwardRef(function(t,a){const i=Ue({props:t,name:"MuiPieChart"}),{xAxis:n,yAxis:o,series:h,width:d,height:x,margin:c,colors:r,sx:R,tooltip:l={trigger:"item"},axisHighlight:u={x:"none",y:"none"},skipAnimation:A,legend:y,topAxis:C=null,leftAxis:f=null,rightAxis:p=null,bottomAxis:j=null,children:b,slots:v,slotProps:N,onItemClick:$,loading:_,highlightedItem:L,onHighlightChange:S,className:T}=i,M=Y(i,Ss),g=Be(),w=I({},g?Ts:_s,c),B=I({direction:"column",position:{vertical:"middle",horizontal:g?"left":"right"}},y);return e.jsxs(We,I({},M,{ref:a,series:h.map(W=>I({type:"pie"},W)),width:d,height:x,margin:w,xAxis:n??[{id:qe,scaleType:"point",data:[...new Array(Math.max(...h.map(W=>W.data.length)))].map((W,q)=>q)}],yAxis:o,colors:r,sx:R,disableAxisListener:(l==null?void 0:l.trigger)!=="axis"&&(u==null?void 0:u.x)==="none"&&(u==null?void 0:u.y)==="none",highlightedItem:L,onHighlightChange:S,className:T,children:[e.jsx(Ve,{topAxis:C,leftAxis:f,rightAxis:p,bottomAxis:j,slots:v,slotProps:N}),e.jsx(Ls,{slots:v,slotProps:N,onItemClick:$,skipAnimation:A}),e.jsx(Xe,{loading:_,slots:v,slotProps:N}),e.jsx(Je,I({},B,{slots:v,slotProps:N})),e.jsx(Ze,I({},u)),!_&&e.jsx(Ke,I({},l,{slots:v,slotProps:N})),b]}))}),ks=()=>{const[s,t]=D.useState([]),[a,i]=D.useState([]),[n,o]=D.useState([]),[h,d]=D.useState(0),[x,c]=D.useState(0);D.useState([]);const[r,R]=D.useState("Assessment 1"),[l,u]=D.useState([]),[A,y]=D.useState({}),[C,f]=D.useState({Aster:0,Camia:0,Dahlia:0,Iris:0,Jasmin:0,Orchid:0,Rose:0,Tulip:0,SSC:0}),[p,j]=D.useState({Aster:0,Camia:0,Dahlia:0,Iris:0});D.useState({scores:[],counts:[]});const[b,v]=D.useState({Incomplete:0,LowEmergingReader:0,HighEmergingReader:0,DevelopingReader:0,TransitioningReader:0,GradeLevelReader:0});D.useEffect(()=>{(async()=>{try{await Promise.all([N(),$(),_()]),await L()}catch(P){console.error("Error fetching data:",P)}})()},[r]);const N=async()=>{try{const P=(await ae.get("/api/users")).data;t(P),d(S(P,"Teacher")),c(S(P,"Parent"))}catch(m){console.error("Error fetching users:",m)}},$=async()=>{try{const P=(await ae.get("/api/getStudents")).data;i(P);const k={Incomplete:0,LowEmergingReader:0,HighEmergingReader:0,DevelopingReader:0,TransitioningReader:0,GradeLevelReader:0};P.forEach(F=>{switch(F.status){case"Incomplete":k.Incomplete+=1;break;case"Low Emerging Reader":k.LowEmergingReader+=1;break;case"High Emerging Reader":k.HighEmergingReader+=1;break;case"Developing Reader":k.DevelopingReader+=1;break;case"Transitioning Reader":k.TransitioningReader+=1;break;case"Grade Level Reader":k.GradeLevelReader+=1;break;default:break}}),v(k);const E=T(P);f(E.totalCounts),y(E.statusCounts)}catch(m){console.error("Error fetching students:",m)}},_=async()=>{try{const P=(await ae.get("/api/getAssessments")).data,E=["Pagbabaybay","Pantig","Salita","Pagbabasa"].reduce((F,z)=>(F[z]=P.filter(X=>X.Type===z).length,F),{});o(P),j(E)}catch(m){console.error("Error fetching assessments:",m)}},L=async()=>{try{const P=(await ae.get("/api/getPerformance")).data;u(P)}catch(m){console.error("Error fetching performance:",m)}},S=(m,P)=>m.filter(k=>k.role===P).length,T=m=>{const P=["Aster","Camia","Dahlia","Iris","Jasmin","Orchid","Rose","Tulip","SSC"],k=["Incomplete","Low Emerging Reader","High Emerging Reader","Developing Reader","Transitioning Reader","Grade Level Reader"],E={},F={};return P.forEach(z=>{E[z]=0,F[z]={},k.forEach(X=>{const G=m.filter(ee=>ee.Section===z&&ee.status===X).length;F[z][X]=G,E[z]+=G})}),{totalCounts:E,statusCounts:F}},M=m=>{switch(m){case"Incomplete":return"#f63845";case"Low Emerging Reader":return"#ff7828";case"High Emerging Reader":return"#DC84F3";case"Developing Reader":return"#4b99f5";case"Transitioning Reader":return"#ffce1f";case"Grade Level Reader":return"#FF8080";default:return"#ccc"}},g=Object.keys(C),B=["Incomplete","Low Emerging Reader","High Emerging Reader","Developing Reader","Transitioning Reader","Grade Level Reader"].map(m=>({data:g.map(P=>A[P]&&A[P][m]||0),label:m,color:M(m)})),W=a.map(m=>{const P=l.filter(E=>E.LRN===m.LRN),k=n.map(E=>{const F=P.find(z=>z.Type===E.Type);return F?parseInt(F.Score,10):0});return{studentName:m.Name,scores:k}}),q=n.map(m=>m.Type);return e.jsxs("div",{className:"px-9",children:[e.jsxs("div",{className:"flex items-center mb-4",children:[e.jsx("h1",{className:"text-3xl font-semibold",children:"Admin Dashboard"}),e.jsx(Ee,{showArrow:!0,content:e.jsxs("div",{className:"p-2 text-sm",children:[e.jsx("div",{className:"font-bold",children:"Dashboard Info"}),e.jsx("p",{children:"View system data for each section."})]}),children:e.jsx(U,{icon:ke,className:"ml-2 text-black"})})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"bg-[#fb6ea4] rounded-lg shadow p-4 flex flex-row justify-between",children:[e.jsxs("div",{className:"text-white",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Students"}),e.jsx("p",{className:"text-5xl mt-2",children:a.length})]}),e.jsx("div",{children:e.jsx(U,{icon:se,size:"2xl",className:"text-md",inverse:!0})})]}),e.jsxs("div",{className:"bg-[#7668d2] rounded-lg shadow p-4 flex flex-row justify-between",children:[e.jsxs("div",{className:"text-white",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Teachers"}),e.jsx("p",{className:"text-5xl mt-2",children:h})]}),e.jsx("div",{children:e.jsx(U,{icon:ie,size:"2xl",className:"text-md",inverse:!0})})]}),e.jsxs("div",{className:"bg-[#91c123] rounded-lg shadow p-4 flex flex-row justify-between",children:[e.jsxs("div",{className:"text-white",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Parents"}),e.jsx("p",{className:"text-5xl mt-2",children:x})]}),e.jsx("div",{children:e.jsx(U,{icon:Ie,size:"2xl",className:"text-md",inverse:!0})})]}),e.jsxs("div",{className:"col-span-1 lg:col-span-1 bg-white rounded-lg shadow p-4",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"User Distribution"}),e.jsx("div",{className:"pt-8 pl-5",children:e.jsx(Ms,{series:[{data:[{id:1,value:a.length,label:"Students"},{id:2,value:h,label:"Teachers"},{id:3,value:x,label:"Parents"}]}],width:400,height:200})})]}),e.jsxs("div",{className:"col-span-1 lg:col-span-2 bg-white rounded-lg shadow p-4",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Students Per Section"}),e.jsx(ne,{xAxis:[{label:"Sections",scaleType:"band",data:g,tickSize:10}],yAxis:[{label:"Number of Students",tickCount:6,grid:!0}],series:[{data:Object.values(C),color:"#4b99f5",label:"Total Students"}],height:300})]})]}),e.jsxs("div",{className:"mt-6 bg-white p-6 rounded-md shadow",children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4 items-center flex flex-col",children:"Student Status"}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"bg-[#f63845] rounded-lg shadow-md p-4 flex flex-row justify-between",children:[e.jsxs("div",{className:"text-white",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Incomplete"}),e.jsx("p",{className:"text-5xl mt-2",children:b.Incomplete})]}),e.jsx("div",{children:e.jsx(U,{icon:se,size:"2xl",className:"text-md",inverse:!0})})]}),e.jsxs("div",{className:"bg-[#ff7828] rounded-lg shadow-md p-4 flex flex-row justify-between",children:[e.jsxs("div",{className:"text-white",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Low Emerging Reader"}),e.jsx("p",{className:"text-5xl mt-2",children:b.LowEmergingReader})]}),e.jsx("div",{children:e.jsx(U,{icon:ie,size:"2xl",className:"text-md",inverse:!0})})]}),e.jsxs("div",{className:"bg-[#DC84F3] rounded-lg shadow-md p-4 flex flex-row justify-between",children:[e.jsxs("div",{className:"text-white",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"High Emerging Reader"}),e.jsx("p",{className:"text-5xl mt-2",children:b.HighEmergingReader})]}),e.jsx("div",{children:e.jsx(U,{icon:ie,size:"2xl",className:"text-md",inverse:!0})})]}),e.jsxs("div",{className:"bg-[#4b99f5] rounded-lg shadow-md p-4 flex flex-row justify-between",children:[e.jsxs("div",{className:"text-white",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Developing Reader"}),e.jsx("p",{className:"text-5xl mt-2",children:b.DevelopingReader})]}),e.jsx("div",{children:e.jsx(U,{icon:se,size:"2xl",className:"text-md",inverse:!0})})]}),e.jsxs("div",{className:"bg-[#ffce1f] rounded-lg shadow-md p-4 flex flex-row justify-between",children:[e.jsxs("div",{className:"text-white",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Transitioning Reader"}),e.jsx("p",{className:"text-5xl mt-2",children:b.TransitioningReader})]}),e.jsx("div",{children:e.jsx(U,{icon:se,size:"2xl",className:"text-md",inverse:!0})})]}),e.jsxs("div",{className:"bg-[#FF8080] rounded-lg shadow-md p-4 flex flex-row justify-between",children:[e.jsxs("div",{className:"text-white",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Grade Level Reader"}),e.jsx("p",{className:"text-5xl mt-2",children:b.GradeLevelReader})]}),e.jsx("div",{children:e.jsx(U,{icon:se,size:"2xl",className:"text-md",inverse:!0})})]})]}),e.jsxs("div",{className:"col-span-1 lg:col-span-2 bg-slate-100 rounded-lg shadow-md p-4 mt-6",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Student Status Per Section"}),e.jsx(ne,{xAxis:[{label:"Sections",scaleType:"band",data:g,tickSize:10}],yAxis:[{label:"Number of Students",tickCount:6,grid:!0,max:20,tickFormat:m=>Math.floor(m)}],series:B,gap:20,height:500})]})]}),e.jsxs("div",{className:"mt-6 bg-white p-6 rounded-md shadow",children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4 items-center flex flex-col",children:"Student Assessment and Performance"}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"bg-[#7668d2] rounded-lg shadow-2xl p-4 flex flex-row justify-between",children:[e.jsxs("div",{className:"text-white",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Assessment"}),e.jsx("p",{className:"text-5xl mt-2",children:n.length})," "]}),e.jsx("div",{children:e.jsx(U,{icon:ie,size:"2xl",className:"text-md",inverse:!0})})]}),e.jsxs("div",{className:"bg-[#91c123] rounded-lg shadow-2xl p-4 flex flex-row justify-between",children:[e.jsxs("div",{className:"text-white",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Performance"}),e.jsx("p",{className:"text-5xl mt-2",children:l.length})," "]}),e.jsx("div",{children:e.jsx(U,{icon:se,size:"2xl",className:"text-md",inverse:!0})})]}),e.jsxs("div",{className:"col-span-1 lg:col-span-3 bg-slate-100 rounded-lg shadow-md p-4 mt-6",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Assessment Created"}),e.jsx(ne,{xAxis:[{label:"Activities",scaleType:"band",data:Object.keys(p),tickSize:10}],yAxis:[{label:"Number of Assessments",max:10,min:0,tickCount:6,tickFormat:m=>Math.floor(m),grid:!0}],series:[{data:Object.values(p),color:"#ffce1f",label:"Assessments"}],barsize:40,gap:30,height:400})]}),e.jsxs("div",{className:"col-span-1 lg:col-span-3 bg-slate-100 rounded-lg shadow-md p-4 mt-6",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Performance of Students"}),l.length>0&&a.length>0?e.jsx(ne,{xAxis:[{label:"Assessment Type",data:q,scaleType:"band",tickSize:10}],yAxis:[{label:"Score",min:0,max:10,tickCount:6,tickFormat:m=>Math.floor(m)}],series:W.map(m=>({data:m.scores,label:m.studentName,color:`#${Math.floor(Math.random()*16777215).toString(16)}`})),height:400}):e.jsx("p",{children:"No performance data available"})]})]})]})]})},Xs=()=>e.jsxs("div",{className:"w-full h-full flex",children:[e.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6] shadow-lg",children:e.jsx(Me,{})}),e.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[e.jsx(Qe,{}),e.jsx(ks,{})]})]});export{Xs as default};
