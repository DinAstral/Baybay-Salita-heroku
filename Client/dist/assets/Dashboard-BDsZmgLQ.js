import{r as T,j as c,U as ae,a as V}from"./index-DOir1VEp.js";import{C as le}from"./ContentHeader-DxsedZZO.js";import{S as ce}from"./Sidebar-kSy52A0G.js";import{F as J,d as he,e as bt,g as ue}from"./index-DRB5IWKv.js";import{_ as p}from"./extends-CF3RwP-h.js";import{_ as G}from"./objectWithoutPropertiesLoose-CAYKN5F1.js";import{w as pt,f as C,K as Mt,t as et,b as Y,p as ft,c as $t,s as Q,e as Ct,L as de,l as st,n as O,M as xt,N as nt,O as mt,x as Z,k as it,u as gt,P as yt,Q as Ht,q as ot,r as rt,S as Dt,T as at,U as lt,V as ct,W as Lt,X as fe,o as It,C as At,Y as Rt,Z as xe,A as _e,R as pe,_ as me,$ as ge,F as ye,H as Ae,E as ve,G as Pe,I as ke,a0 as be,J as Ce}from"./BarChart-DTDNoG4Y.js";import{t as Ie}from"./profile-BZ_9zrrG.js";import"./chunk-DBLREEYE-BUE9bXnN.js";import"./createPopper-iTKh2FQm.js";import"./useOverlayTriggerState-CEjPxx58.js";import"./chunk-CIZQCQPA-Cs75E8Kh.js";function Ft(t){this._context=t}Ft.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;default:this._context.lineTo(t,e);break}}};function vt(t){return new Ft(t)}function Ut(t){return t[0]}function Wt(t){return t[1]}function Xt(t,e){var s=C(!0),i=null,o=vt,n=null,a=pt(l);t=typeof t=="function"?t:t===void 0?Ut:C(t),e=typeof e=="function"?e:e===void 0?Wt:C(e);function l(h){var u,x=(h=Mt(h)).length,r,d=!1,m;for(i==null&&(n=o(m=a())),u=0;u<=x;++u)!(u<x&&s(r=h[u],u,h))===d&&((d=!d)?n.lineStart():n.lineEnd()),d&&n.point(+t(r,u,h),+e(r,u,h));if(m)return n=null,m+""||null}return l.x=function(h){return arguments.length?(t=typeof h=="function"?h:C(+h),l):t},l.y=function(h){return arguments.length?(e=typeof h=="function"?h:C(+h),l):e},l.defined=function(h){return arguments.length?(s=typeof h=="function"?h:C(!!h),l):s},l.curve=function(h){return arguments.length?(o=h,i!=null&&(n=o(i)),l):o},l.context=function(h){return arguments.length?(h==null?i=n=null:n=o(i=h),l):i},l}function je(t,e,s){var i=null,o=C(!0),n=null,a=vt,l=null,h=pt(u);t=typeof t=="function"?t:t===void 0?Ut:C(+t),e=typeof e=="function"?e:e===void 0?C(0):C(+e),s=typeof s=="function"?s:s===void 0?Wt:C(+s);function u(r){var d,m,y,f=(r=Mt(r)).length,g,k=!1,v,A=new Array(f),_=new Array(f);for(n==null&&(l=a(v=h())),d=0;d<=f;++d){if(!(d<f&&o(g=r[d],d,r))===k)if(k=!k)m=d,l.areaStart(),l.lineStart();else{for(l.lineEnd(),l.lineStart(),y=d-1;y>=m;--y)l.point(A[y],_[y]);l.lineEnd(),l.areaEnd()}k&&(A[d]=+t(g,d,r),_[d]=+e(g,d,r),l.point(i?+i(g,d,r):A[d],s?+s(g,d,r):_[d]))}if(v)return l=null,v+""||null}function x(){return Xt().defined(o).curve(a).context(n)}return u.x=function(r){return arguments.length?(t=typeof r=="function"?r:C(+r),i=null,u):t},u.x0=function(r){return arguments.length?(t=typeof r=="function"?r:C(+r),u):t},u.x1=function(r){return arguments.length?(i=r==null?null:typeof r=="function"?r:C(+r),u):i},u.y=function(r){return arguments.length?(e=typeof r=="function"?r:C(+r),s=null,u):e},u.y0=function(r){return arguments.length?(e=typeof r=="function"?r:C(+r),u):e},u.y1=function(r){return arguments.length?(s=r==null?null:typeof r=="function"?r:C(+r),u):s},u.lineX0=u.lineY0=function(){return x().x(t).y(e)},u.lineY1=function(){return x().x(t).y(s)},u.lineX1=function(){return x().x(i).y(e)},u.defined=function(r){return arguments.length?(o=typeof r=="function"?r:C(!!r),u):o},u.curve=function(r){return arguments.length?(a=r,n!=null&&(l=a(n)),u):a},u.context=function(r){return arguments.length?(r==null?n=l=null:l=a(n=r),u):n},u}const Gt={draw(t,e){const s=Y(e/ft);t.moveTo(s,0),t.arc(0,0,s,0,et)}},Te={draw(t,e){const s=Y(e/5)/2;t.moveTo(-3*s,-s),t.lineTo(-s,-s),t.lineTo(-s,-3*s),t.lineTo(s,-3*s),t.lineTo(s,-s),t.lineTo(3*s,-s),t.lineTo(3*s,s),t.lineTo(s,s),t.lineTo(s,3*s),t.lineTo(-s,3*s),t.lineTo(-s,s),t.lineTo(-3*s,s),t.closePath()}},Yt=Y(1/3),we=Yt*2,Ne={draw(t,e){const s=Y(e/we),i=s*Yt;t.moveTo(0,-s),t.lineTo(i,0),t.lineTo(0,s),t.lineTo(-i,0),t.closePath()}},Se={draw(t,e){const s=Y(e),i=-s/2;t.rect(i,i,s,s)}},Ee=.8908130915292852,Kt=Q(ft/10)/Q(7*ft/10),Me=Q(et/10)*Kt,$e=-$t(et/10)*Kt,He={draw(t,e){const s=Y(e*Ee),i=Me*s,o=$e*s;t.moveTo(0,-s),t.lineTo(i,o);for(let n=1;n<5;++n){const a=et*n/5,l=$t(a),h=Q(a);t.lineTo(h*s,-l*s),t.lineTo(l*i-h*o,h*i+l*o)}t.closePath()}},ut=Y(3),De={draw(t,e){const s=-Y(e/(ut*3));t.moveTo(0,s*2),t.lineTo(-ut*s,-s),t.lineTo(ut*s,-s),t.closePath()}},F=-.5,U=Y(3)/2,_t=1/Y(12),Le=(_t/2+1)*3,Re={draw(t,e){const s=Y(e/Le),i=s/2,o=s*_t,n=i,a=s*_t+s,l=-n,h=a;t.moveTo(i,o),t.lineTo(n,a),t.lineTo(l,h),t.lineTo(F*i-U*o,U*i+F*o),t.lineTo(F*n-U*a,U*n+F*a),t.lineTo(F*l-U*h,U*l+F*h),t.lineTo(F*i+U*o,F*o-U*i),t.lineTo(F*n+U*a,F*a-U*n),t.lineTo(F*l+U*h,F*h-U*l),t.closePath()}},Fe=[Gt,Te,Ne,Se,He,De,Re];function Ue(t,e){let s=null,i=pt(o);t=typeof t=="function"?t:C(t||Gt),e=typeof e=="function"?e:C(e===void 0?64:+e);function o(){let n;if(s||(s=n=i()),t.apply(this,arguments).draw(s,+e.apply(this,arguments)),n)return s=null,n+""||null}return o.type=function(n){return arguments.length?(t=typeof n=="function"?n:C(n),o):t},o.size=function(n){return arguments.length?(e=typeof n=="function"?n:C(+n),o):e},o.context=function(n){return arguments.length?(s=n??null,o):s},o}function jt(t,e,s){t._context.bezierCurveTo(t._x1+t._k*(t._x2-t._x0),t._y1+t._k*(t._y2-t._y0),t._x2+t._k*(t._x1-e),t._y2+t._k*(t._y1-s),t._x2,t._y2)}function Pt(t,e){this._context=t,this._k=(1-e)/6}Pt.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:jt(this,this._x1,this._y1);break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2,this._x1=t,this._y1=e;break;case 2:this._point=3;default:jt(this,t,e);break}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};(function t(e){function s(i){return new Pt(i,e)}return s.tension=function(i){return t(+i)},s})(0);function We(t,e,s){var i=t._x1,o=t._y1,n=t._x2,a=t._y2;if(t._l01_a>Ct){var l=2*t._l01_2a+3*t._l01_a*t._l12_a+t._l12_2a,h=3*t._l01_a*(t._l01_a+t._l12_a);i=(i*l-t._x0*t._l12_2a+t._x2*t._l01_2a)/h,o=(o*l-t._y0*t._l12_2a+t._y2*t._l01_2a)/h}if(t._l23_a>Ct){var u=2*t._l23_2a+3*t._l23_a*t._l12_a+t._l12_2a,x=3*t._l23_a*(t._l23_a+t._l12_a);n=(n*u+t._x1*t._l23_2a-e*t._l12_2a)/x,a=(a*u+t._y1*t._l23_2a-s*t._l12_2a)/x}t._context.bezierCurveTo(i,o,n,a,t._x2,t._y2)}function zt(t,e){this._context=t,this._alpha=e}zt.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:this.point(this._x2,this._y2);break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){if(t=+t,e=+e,this._point){var s=this._x2-t,i=this._y2-e;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(s*s+i*i,this._alpha))}switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;break;case 2:this._point=3;default:We(this,t,e);break}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};const Xe=function t(e){function s(i){return e?new zt(i,e):new Pt(i,0)}return s.alpha=function(i){return t(+i)},s}(.5);function Tt(t){return t<0?-1:1}function wt(t,e,s){var i=t._x1-t._x0,o=e-t._x1,n=(t._y1-t._y0)/(i||o<0&&-0),a=(s-t._y1)/(o||i<0&&-0),l=(n*o+a*i)/(i+o);return(Tt(n)+Tt(a))*Math.min(Math.abs(n),Math.abs(a),.5*Math.abs(l))||0}function Nt(t,e){var s=t._x1-t._x0;return s?(3*(t._y1-t._y0)/s-e)/2:e}function dt(t,e,s){var i=t._x0,o=t._y0,n=t._x1,a=t._y1,l=(n-i)/3;t._context.bezierCurveTo(i+l,o+l*e,n-l,a-l*s,n,a)}function tt(t){this._context=t}tt.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:dt(this,this._t0,Nt(this,this._t0));break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){var s=NaN;if(t=+t,e=+e,!(t===this._x1&&e===this._y1)){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;break;case 2:this._point=3,dt(this,Nt(this,s=wt(this,t,e)),s);break;default:dt(this,this._t0,s=wt(this,t,e));break}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=e,this._t0=s}}};function Ot(t){this._context=new qt(t)}(Ot.prototype=Object.create(tt.prototype)).point=function(t,e){tt.prototype.point.call(this,e,t)};function qt(t){this._context=t}qt.prototype={moveTo:function(t,e){this._context.moveTo(e,t)},closePath:function(){this._context.closePath()},lineTo:function(t,e){this._context.lineTo(e,t)},bezierCurveTo:function(t,e,s,i,o,n){this._context.bezierCurveTo(e,t,i,s,n,o)}};function St(t){return new tt(t)}function Ge(t){return new Ot(t)}function Bt(t){this._context=t}Bt.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=[],this._y=[]},lineEnd:function(){var t=this._x,e=this._y,s=t.length;if(s)if(this._line?this._context.lineTo(t[0],e[0]):this._context.moveTo(t[0],e[0]),s===2)this._context.lineTo(t[1],e[1]);else for(var i=Et(t),o=Et(e),n=0,a=1;a<s;++n,++a)this._context.bezierCurveTo(i[0][n],o[0][n],i[1][n],o[1][n],t[a],e[a]);(this._line||this._line!==0&&s===1)&&this._context.closePath(),this._line=1-this._line,this._x=this._y=null},point:function(t,e){this._x.push(+t),this._y.push(+e)}};function Et(t){var e,s=t.length-1,i,o=new Array(s),n=new Array(s),a=new Array(s);for(o[0]=0,n[0]=2,a[0]=t[0]+2*t[1],e=1;e<s-1;++e)o[e]=1,n[e]=4,a[e]=4*t[e]+2*t[e+1];for(o[s-1]=2,n[s-1]=7,a[s-1]=8*t[s-1]+t[s],e=1;e<s;++e)i=o[e]/n[e-1],n[e]-=i,a[e]-=i*a[e-1];for(o[s-1]=a[s-1]/n[s-1],e=s-2;e>=0;--e)o[e]=(a[e]-o[e+1])/n[e];for(n[s-1]=(t[s]+o[s-1])/2,e=0;e<s-1;++e)n[e]=2*t[e+1]-o[e+1];return[o,n]}function Ye(t){return new Bt(t)}function ht(t,e){this._context=t,this._t=e}ht.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=this._y=NaN,this._point=0},lineEnd:function(){0<this._t&&this._t<1&&this._point===2&&this._context.lineTo(this._x,this._y),(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line>=0&&(this._t=1-this._t,this._line=1-this._line)},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;default:{if(this._t<=0)this._context.lineTo(this._x,e),this._context.lineTo(t,e);else{var s=this._x*(1-this._t)+t*this._t;this._context.lineTo(s,this._y),this._context.lineTo(s,e)}break}}this._x=t,this._y=e}};function Ke(t){return new ht(t,.5)}function ze(t){return new ht(t,0)}function Oe(t){return new ht(t,1)}function kt(t){return t.replace(" ","_")}function qe(t){const e=T.useRef({currentPath:t,previousPath:void 0});return e.current.currentPath!==t&&(e.current={currentPath:t,previousPath:e.current.currentPath}),e.current}const Vt=t=>{const e=qe(t);return T.useMemo(()=>e.previousPath?de(e.previousPath,e.currentPath):()=>e.currentPath,[e.currentPath,e.previousPath])},Be=["d","skipAnimation","ownerState"],Ve=st(O.path,{name:"MuiAreaElement",slot:"Root",overridesResolver:(t,e)=>e.root})(({ownerState:t})=>({stroke:"none",fill:t.gradientId&&`url(#${t.gradientId})`||t.isHighlighted&&xt(t.color).brighter(1).formatHex()||xt(t.color).brighter(.5).formatHex(),transition:"opacity 0.2s ease-in, fill 0.2s ease-in",opacity:t.isFaded?.3:1}));function Je(t){const{d:e,skipAnimation:s,ownerState:i}=t,o=G(t,Be),{left:n,top:a,right:l,bottom:h,width:u,height:x}=nt(),r=mt(),d=Vt(e),m=Z([1],{from:{animatedWidth:n},to:{animatedWidth:u+n+l},enter:{animatedWidth:u+n+l},leave:{animatedWidth:n},reset:!1,immediate:s}),y=Z([d],{from:{value:0},to:{value:1},enter:{value:1},reset:!1,immediate:s}),f=kt(`${r}-${i.id}-area-clip`);return c.jsxs(T.Fragment,{children:[c.jsx("clipPath",{id:f,children:m(g=>c.jsx(O.rect,{x:0,y:0,width:g.animatedWidth,height:a+x+h}))}),c.jsx("g",{clipPath:`url(#${f})`,children:y((g,k)=>c.jsx(Ve,p({},o,{ownerState:i,d:g.value.to(k)})))})]})}const Qe=["id","classes","color","gradientId","slots","slotProps","onClick"];function Ze(t){return rt("MuiAreaElement",t)}it("MuiAreaElement",["root","highlighted","faded"]);const ts=t=>{const{classes:e,id:s,isFaded:i,isHighlighted:o}=t,n={root:["root",`series-${s}`,o&&"highlighted",i&&"faded"]};return ot(n,Ze,e)};function es(t){const{id:e,classes:s,color:i,gradientId:o,slots:n,slotProps:a,onClick:l}=t,h=G(t,Qe),u=gt(),{isFaded:x,isHighlighted:r}=yt({seriesId:e}),d={id:e,classes:s,color:i,gradientId:o,isFaded:x,isHighlighted:r},m=ts(d),y=(n==null?void 0:n.area)??Je,f=Ht({elementType:y,externalSlotProps:a==null?void 0:a.area,additionalProps:p({},u({type:"line",seriesId:e}),{onClick:l,cursor:l?"pointer":"unset"}),className:m.root,ownerState:d});return c.jsx(y,p({},h,f))}function Jt(t){switch(t){case"catmullRom":return Xe.alpha(.5);case"linear":return vt;case"monotoneX":return St;case"monotoneY":return Ge;case"natural":return Ye;case"step":return Ke;case"stepBefore":return ze;case"stepAfter":return Oe;default:return St}}const ss=["slots","slotProps","onItemClick","skipAnimation"],ns=()=>{const t=at(),e=lt();return T.useMemo(()=>{if(t===void 0)return[];const{series:i,stackingGroups:o}=t,{xAxis:n,yAxis:a,xAxisIds:l,yAxisIds:h}=e,u=l[0],x=h[0];return o.flatMap(({ids:r})=>[...r].reverse().map(d=>{const{xAxisId:m,yAxisId:y,xAxisKey:f=u,yAxisKey:g=x,stackedData:k,data:v,connectNulls:A,baseline:_}=i[d],b=m??f,N=y??g,M=ct(n[b].scale),P=a[N].scale,I=n[b].data,$=a[N].colorScale&&[N,"y"]||n[b].colorScale&&[b,"x"]||void 0,D=je().x(j=>M(j.x)).defined((j,S)=>A||v[S]!=null).y0(j=>{if(typeof _=="number")return P(_);if(_==="max")return P.range()[1];if(_==="min")return P.range()[0];const S=j.y&&P(j.y[0]);return Number.isNaN(S)?P.range()[0]:S}).y1(j=>j.y&&P(j.y[1])),w=Jt(i[d].curve),L=(I==null?void 0:I.map((j,S)=>({x:j,y:k[S]})))??[],E=A?L.filter((j,S)=>v[S]!=null):L,H=D.curve(w)(E)||"";return p({},i[d],{gradientUsed:$,d:H,seriesId:d})}))},[t,e])};function is(t){const{slots:e,slotProps:s,onItemClick:i,skipAnimation:o}=t,n=G(t,ss),a=Dt(),l=ns();return c.jsx("g",p({},n,{children:l.map(({d:h,seriesId:u,color:x,area:r,gradientUsed:d})=>!!r&&c.jsx(es,{id:u,d:h,color:x,gradientId:d&&a(...d),slots:e,slotProps:s,onClick:i&&(m=>i(m,{type:"line",seriesId:u})),skipAnimation:o},u))}))}const os=["d","skipAnimation","ownerState"],rs=st(O.path,{name:"MuiLineElement",slot:"Root",overridesResolver:(t,e)=>e.root})(({ownerState:t})=>({strokeWidth:2,strokeLinejoin:"round",fill:"none",stroke:t.gradientId&&`url(#${t.gradientId})`||t.isHighlighted&&xt(t.color).brighter(.5).formatHex()||t.color,transition:"opacity 0.2s ease-in, stroke 0.2s ease-in",opacity:t.isFaded?.3:1}));function as(t){const{d:e,skipAnimation:s,ownerState:i}=t,o=G(t,os),{left:n,top:a,bottom:l,width:h,height:u,right:x}=nt(),r=mt(),d=Vt(e),m=Z([1],{from:{animatedWidth:n},to:{animatedWidth:h+n+x},enter:{animatedWidth:h+n+x},leave:{animatedWidth:n},reset:!1,immediate:s}),y=Z([d],{from:{value:0},to:{value:1},enter:{value:1},reset:!1,immediate:s}),f=kt(`${r}-${i.id}-line-clip`);return c.jsxs(T.Fragment,{children:[c.jsx("clipPath",{id:f,children:m(g=>c.jsx(O.rect,{x:0,y:0,width:g.animatedWidth,height:a+u+l}))}),c.jsx("g",{clipPath:`url(#${f})`,children:y((g,k)=>c.jsx(rs,p({},o,{ownerState:i,d:g.value.to(k)})))})]})}const ls=["id","classes","color","gradientId","slots","slotProps","onClick"];function cs(t){return rt("MuiLineElement",t)}it("MuiLineElement",["root","highlighted","faded"]);const hs=t=>{const{classes:e,id:s,isFaded:i,isHighlighted:o}=t,n={root:["root",`series-${s}`,o&&"highlighted",i&&"faded"]};return ot(n,cs,e)};function us(t){const{id:e,classes:s,color:i,gradientId:o,slots:n,slotProps:a,onClick:l}=t,h=G(t,ls),u=gt(),{isFaded:x,isHighlighted:r}=yt({seriesId:e}),d={id:e,classes:s,color:i,gradientId:o,isFaded:x,isHighlighted:r},m=hs(d),y=(n==null?void 0:n.line)??as,f=Ht({elementType:y,externalSlotProps:a==null?void 0:a.line,additionalProps:p({},u({type:"line",seriesId:e}),{onClick:l,cursor:l?"pointer":"unset"}),className:m.root,ownerState:d});return c.jsx(y,p({},h,f))}const ds=["slots","slotProps","skipAnimation","onItemClick"],fs=()=>{const t=at(),e=lt();return T.useMemo(()=>{if(t===void 0)return[];const{series:i,stackingGroups:o}=t,{xAxis:n,yAxis:a,xAxisIds:l,yAxisIds:h}=e,u=l[0],x=h[0];return o.flatMap(({ids:r})=>r.flatMap(d=>{const{xAxisId:m,yAxisId:y,xAxisKey:f=u,yAxisKey:g=x,stackedData:k,data:v,connectNulls:A}=i[d],_=m??f,b=y??g,N=ct(n[_].scale),M=a[b].scale,P=n[_].data,I=a[b].colorScale&&[b,"y"]||n[_].colorScale&&[_,"x"]||void 0,$=Xt().x(E=>N(E.x)).defined((E,H)=>A||v[H]!=null).y(E=>M(E.y[1])),D=(P==null?void 0:P.map((E,H)=>({x:E,y:k[H]})))??[],w=A?D.filter((E,H)=>v[H]!=null):D,L=$.curve(Jt(i[d].curve))(w)||"";return p({},i[d],{gradientUsed:I,d:L,seriesId:d})}))},[t,e])};function xs(t){const{slots:e,slotProps:s,skipAnimation:i,onItemClick:o}=t,n=G(t,ds),a=Dt(),l=fs();return c.jsx("g",p({},n,{children:l.map(({d:h,seriesId:u,color:x,gradientUsed:r})=>c.jsx(us,{id:u,d:h,color:x,gradientId:r&&a(...r),skipAnimation:i,slots:e,slotProps:s,onClick:o&&(d=>o(d,{type:"line",seriesId:u}))},u))}))}function _s(t){return"circle cross diamond square star triangle wye".split(/ /).indexOf(t)||0}const ps=["x","y","id","classes","color","shape","dataIndex","onClick","skipAnimation"];function ms(t){return rt("MuiMarkElement",t)}it("MuiMarkElement",["root","highlighted","faded"]);const gs=t=>{const{classes:e,id:s,isFaded:i,isHighlighted:o}=t,n={root:["root",`series-${s}`,o&&"highlighted",i&&"faded"]};return ot(n,ms,e)},ys=st(O.path,{name:"MuiMarkElement",slot:"Root",overridesResolver:(t,e)=>e.root})(({ownerState:t,theme:e})=>({fill:(e.vars||e).palette.background.paper,stroke:t.color,strokeWidth:2}));function As(t){var v;const{x:e,y:s,id:i,classes:o,color:n,shape:a,dataIndex:l,onClick:h,skipAnimation:u}=t,x=G(t,ps),r=gt(),{isFaded:d,isHighlighted:m}=yt({seriesId:i}),{axis:y}=T.useContext(Lt),f=fe({to:{x:e,y:s},immediate:u}),g={id:i,classes:o,isHighlighted:((v=y.x)==null?void 0:v.index)===l||m,isFaded:d,color:n},k=gs(g);return c.jsx(ys,p({},x,{style:{transform:It([f.x,f.y],(A,_)=>`translate(${A}px, ${_}px)`),transformOrigin:It([f.x,f.y],(A,_)=>`${A}px ${_}px`)},ownerState:g,className:k.root,d:Ue(Fe[_s(a)])(),onClick:h,cursor:h?"pointer":"unset"},r({type:"line",seriesId:i,dataIndex:l})))}const vs=["slots","slotProps","skipAnimation","onItemClick"];function Ps(t){const{slots:e,slotProps:s,skipAnimation:i,onItemClick:o}=t,n=G(t,vs),a=at(),l=lt(),h=mt(),u=nt(),x=(e==null?void 0:e.mark)??As;if(a===void 0)return null;const{series:r,stackingGroups:d}=a,{xAxis:m,yAxis:y,xAxisIds:f,yAxisIds:g}=l,k=f[0],v=g[0];return c.jsx("g",p({},n,{children:d.flatMap(({ids:A})=>A.map(_=>{const{xAxisId:b,yAxisId:N,xAxisKey:M=k,yAxisKey:P=v,stackedData:I,data:$,showMark:D=!0}=r[_];if(D===!1)return null;const w=b??M,L=N??P,E=ct(m[w].scale),H=y[L].scale,j=m[w].data;if(j===void 0)throw new Error(`MUI X: ${w===At?"The first `xAxis`":`The x-axis with id "${w}"`} should have data property to be able to display a line plot.`);const S=kt(`${h}-${_}-line-clip`),K=Rt(r[_],m[w],y[L]);return c.jsx("g",{clipPath:`url(#${S})`,children:j==null?void 0:j.map((W,X)=>{const R=$[X]==null?null:I[X][1];return{x:E(W),y:R===null?null:H(R),position:W,value:R,index:X}}).filter(({x:W,y:X,index:R,position:z,value:q})=>q===null||X===null||!u.isPointInside({x:W,y:X})?!1:D===!0?!0:D({x:W,y:X,index:R,position:z,value:q})).map(({x:W,y:X,index:R})=>c.jsx(x,p({id:_,dataIndex:R,shape:"circle",color:K(R),x:W,y:X,skipAnimation:i,onClick:o&&(z=>o(z,{type:"line",seriesId:_,dataIndex:R}))},s==null?void 0:s.mark),`${_}-${R}`))},_)}))}))}const ks=["x","y","id","classes","color"];function bs(t){return rt("MuiHighlightElement",t)}it("MuiHighlightElement",["root"]);const Cs=t=>{const{classes:e,id:s}=t,i={root:["root",`series-${s}`]};return ot(i,bs,e)},Is=st("circle",{name:"MuiHighlightElement",slot:"Root",overridesResolver:(t,e)=>e.root})(({ownerState:t})=>({transform:`translate(${t.x}px, ${t.y}px)`,transformOrigin:`${t.x}px ${t.y}px`,fill:t.color}));function js(t){const{x:e,y:s,id:i,classes:o,color:n}=t,a=G(t,ks),l={id:i,classes:o,color:n,x:e,y:s},h=Cs(l);return c.jsx(Is,p({pointerEvents:"none",ownerState:l,className:h.root,cx:0,cy:0,r:a.r===void 0?5:a.r},a))}const Ts=["slots","slotProps"];function ws(t){var v;const{slots:e,slotProps:s}=t,i=G(t,Ts),o=at(),n=lt(),a=nt(),{axis:l}=T.useContext(Lt),h=(v=l.x)==null?void 0:v.index;if(h===void 0||o===void 0)return null;const{series:u,stackingGroups:x}=o,{xAxis:r,yAxis:d,xAxisIds:m,yAxisIds:y}=n,f=m[0],g=y[0],k=(e==null?void 0:e.lineHighlight)??js;return c.jsx("g",p({},i,{children:x.flatMap(({ids:A})=>A.flatMap(_=>{const{xAxisId:b,yAxisId:N,xAxisKey:M=f,yAxisKey:P=g,stackedData:I,data:$,disableHighlight:D}=u[_],w=b??M,L=N??P;if(D||$[h]==null)return null;const E=ct(r[w].scale),H=d[L].scale,j=r[w].data;if(j===void 0)throw new Error(`MUI X: ${w===At?"The first `xAxis`":`The x-axis with id "${w}"`} should have data property to be able to display a line plot.`);const S=E(j[h]),K=H(I[h][1]);if(!a.isPointInside({x:S,y:K}))return null;const W=Rt(u[_],r[w],d[L]);return c.jsx(k,p({id:_,color:W(h),x:S,y:K},s==null?void 0:s.lineHighlight),`${_}`)}))}))}const Ns=["xAxis","yAxis","series","width","height","margin","colors","dataset","sx","tooltip","onAxisClick","onAreaClick","onLineClick","onMarkClick","axisHighlight","disableLineItemHighlight","legend","grid","topAxis","leftAxis","rightAxis","bottomAxis","children","slots","slotProps","skipAnimation","loading","highlightedItem","onHighlightChange","className"],Ss=t=>{const{xAxis:e,yAxis:s,series:i,width:o,height:n,margin:a,colors:l,dataset:h,sx:u,tooltip:x,onAxisClick:r,onAreaClick:d,onLineClick:m,onMarkClick:y,axisHighlight:f,disableLineItemHighlight:g,legend:k,grid:v,topAxis:A,leftAxis:_,rightAxis:b,bottomAxis:N,children:M,slots:P,slotProps:I,skipAnimation:$,loading:D,highlightedItem:w,onHighlightChange:L,className:E}=t,H=G(t,Ns),S=`${xe()}-clip-path`,K=p({},H,{series:i.map(B=>p({disableHighlight:!!g,type:"line"},B)),width:o,height:n,margin:a,colors:l,dataset:h,xAxis:e??[{id:At,scaleType:"point",data:Array.from({length:Math.max(...i.map(B=>(B.data??h??[]).length))},(B,re)=>re)}],yAxis:s,sx:u,highlightedItem:w,onHighlightChange:L,disableAxisListener:(x==null?void 0:x.trigger)!=="axis"&&(f==null?void 0:f.x)==="none"&&(f==null?void 0:f.y)==="none"&&!r,className:E}),W={onAxisClick:r},X={vertical:v==null?void 0:v.vertical,horizontal:v==null?void 0:v.horizontal},R={clipPath:`url(#${S})`},z={id:S},q={slots:P,slotProps:I,onItemClick:d,skipAnimation:$},Qt={slots:P,slotProps:I,onItemClick:m,skipAnimation:$},Zt={slots:P,slotProps:I,onItemClick:y,skipAnimation:$},te={slots:P,slotProps:I,loading:D},ee={topAxis:A,leftAxis:_,rightAxis:b,bottomAxis:N,slots:P,slotProps:I},se=p({x:"line"},f),ne={slots:P,slotProps:I},ie=p({},k,{slots:P,slotProps:I}),oe=p({},x,{slots:P,slotProps:I});return{chartContainerProps:K,axisClickHandlerProps:W,gridProps:X,clipPathProps:z,clipPathGroupProps:R,areaPlotProps:q,linePlotProps:Qt,markPlotProps:Zt,overlayProps:te,chartsAxisProps:ee,axisHighlightProps:se,lineHighlightPlotProps:ne,legendProps:ie,tooltipProps:oe,children:M}},Es=T.forwardRef(function(e,s){const i=_e({props:e,name:"MuiLineChart"}),{chartContainerProps:o,axisClickHandlerProps:n,gridProps:a,clipPathProps:l,clipPathGroupProps:h,areaPlotProps:u,linePlotProps:x,markPlotProps:r,overlayProps:d,chartsAxisProps:m,axisHighlightProps:y,lineHighlightPlotProps:f,legendProps:g,tooltipProps:k,children:v}=Ss(i);return c.jsxs(pe,p({ref:s},o,{children:[i.onAxisClick&&c.jsx(me,p({},n)),c.jsx(ge,p({},a)),c.jsxs("g",p({},h,{children:[c.jsx(is,p({},u)),c.jsx(xs,p({},x)),c.jsx(ye,p({},d)),c.jsx(Ae,p({},y))]})),c.jsx(ve,p({},m)),c.jsx("g",{"data-drawing-container":!0,children:c.jsx(Ps,p({},r))}),c.jsx(ws,p({},f)),c.jsx(Pe,p({},g)),!i.loading&&c.jsx(ke,p({},k)),c.jsx(be,p({},l)),v]}))}),Ms=()=>{const[t,e]=T.useState({}),[s,i]=T.useState([]),[o,n]=T.useState([]),{user:a}=T.useContext(ae),[l,h]=T.useState({}),[u,x]=T.useState({}),[r,d]=T.useState([]);T.useEffect(()=>{const f=async()=>{try{const A=await V.get(`/api/getTeacher/${a.UserID}`);e(A.data)}catch(A){console.error("Error fetching teacher:",A)}},g=async()=>{try{const b=(await V.get("/api/getStudents")).data.filter(M=>M.Section===t.Section);i(b);const N=b.length;h({[t.Section]:N})}catch(A){console.error("Error fetching students:",A)}},k=async()=>{try{const b=(await V.get("/api/getPerformance")).data.filter(N=>N.Section===t.Section);d(b)}catch(A){console.error("Error fetching performance:",A)}},v=async()=>{try{const b=(await V.get("/api/getAssessments")).data.filter(P=>P.Section===t.Section),M=["Pagbabaybay","Pantig","Salita","Pagbabasa"].reduce((P,I)=>(P[I]=b.filter($=>$.Type===I).length,P),{});n(b),x(M)}catch(A){console.error("Error fetching assessments:",A)}};f(),g(),k(),v()},[a.UserID,t.Section]),T.useEffect(()=>{console.log("Performance Data: ",r)},[r]);const m=r.map(f=>f.Type),y=r.map(f=>{const g=parseInt(f.Score,10);return isNaN(g)?0:g});return c.jsxs("div",{className:"p-6",children:[c.jsxs("div",{className:"flex items-center mb-6",children:[c.jsx("h1",{className:"text-3xl font-semibold",children:"Teacher Dashboard"}),c.jsx(Ie,{showArrow:!0,content:c.jsxs("div",{className:"p-2 text-sm",children:[c.jsx("div",{className:"font-bold",children:"Dashboard Info"}),c.jsx("p",{children:"View system data for the assigned section."})]}),children:c.jsx(J,{icon:he,className:"ml-2 text-black"})})]}),c.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[c.jsxs("div",{className:"bg-[#fb6ea4] rounded-lg shadow-2xl p-4 flex flex-row justify-between",children:[c.jsxs("div",{className:"text-white",children:[c.jsx("h2",{className:"text-xl font-semibold",children:"Students"}),c.jsx("p",{className:"text-5xl mt-2",children:s.length})]}),c.jsx("div",{children:c.jsx(J,{icon:bt,size:"2xl",className:"text-md",inverse:!0})})]}),c.jsxs("div",{className:"bg-[#7668d2] rounded-lg shadow-2xl p-4 flex flex-row justify-between",children:[c.jsxs("div",{className:"text-white",children:[c.jsx("h2",{className:"text-xl font-semibold",children:"Assessment"}),c.jsx("p",{className:"text-5xl mt-2",children:o.length})," "]}),c.jsx("div",{children:c.jsx(J,{icon:ue,size:"2xl",className:"text-md",inverse:!0})})]}),c.jsxs("div",{className:"bg-[#91c123] rounded-lg shadow-2xl p-4 flex flex-row justify-between",children:[c.jsxs("div",{className:"text-white",children:[c.jsx("h2",{className:"text-xl font-semibold",children:"Performance"}),c.jsx("p",{className:"text-5xl mt-2",children:r.length})," "]}),c.jsx("div",{children:c.jsx(J,{icon:bt,size:"2xl",className:"text-md",inverse:!0})})]})]}),c.jsxs("div",{className:"mt-6",children:[c.jsx("h2",{className:"text-2xl font-semibold mb-4",children:"Assessment Created"}),c.jsx("div",{className:"bg-white rounded-lg shadow-2xl p-4",children:c.jsx(Ce,{xAxis:[{label:"Activities",scaleType:"band",data:Object.keys(u),tickSize:10}],yAxis:[{label:"Number of Assessments",max:10,min:0,tickCount:6,tickFormat:f=>Math.floor(f),grid:!0}],series:[{data:Object.values(u),color:"#ffce1f",label:"Assessments"}],barsize:40,gap:30,width:1500,height:400})})]}),c.jsxs("div",{className:"mt-6",children:[c.jsx("h2",{className:"text-2xl font-semibold mb-4",children:"Performance"}),c.jsx("div",{className:"bg-white rounded-lg shadow-2xl p-4",children:r.length>0?c.jsx(Es,{xAxis:[{label:"Assessment Type",data:m}],yAxis:[{label:"Score",min:0,max:10}],series:[{data:y,label:"Scores",color:"#ff5733"}],width:1500,height:400}):c.jsx("p",{children:"No performance data available"})})]})]})},zs=()=>c.jsxs("div",{className:"w-full h-full flex",children:[c.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6] shadow-lg",children:c.jsx(ce,{})}),c.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[c.jsx(le,{}),c.jsx(Ms,{})]})]});export{zs as default};
