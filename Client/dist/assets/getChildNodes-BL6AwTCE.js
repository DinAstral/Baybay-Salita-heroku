import{B}from"./chunk-DBLREEYE-BXO_GMqR.js";import{r as u,j as C,R as M}from"./index-46g2bTDn.js";import{e as R}from"./useOverlayTriggerState-DubV0HT-.js";let j=0;const K=new Map;function G(i){let[e,t]=u.useState();return B(()=>{if(!i)return;let l=K.get(i);if(l)t(l.element.id);else{let s=`react-aria-description-${j++}`;t(s);let n=document.createElement("div");n.id=s,n.style.display="none",n.textContent=i,document.body.appendChild(n),l={refCount:0,element:n},K.set(i,l)}return l.refCount++,()=>{l&&--l.refCount===0&&(l.element.remove(),K.delete(i))}},[i]),{"aria-describedby":i?e:void 0}}let v=new Map;function H(i){let{locale:e}=R(),t=e+(i?Object.entries(i).sort((s,n)=>s[0]<n[0]?-1:1).join():"");if(v.has(t))return v.get(t);let l=new Intl.Collator(e,i);return v.set(t,l),l}var J=({strokeWidth:i=1.5,...e})=>C.jsx("svg",{"aria-hidden":"true",fill:"none",focusable:"false",height:"1em",role:"presentation",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:i,viewBox:"0 0 24 24",width:"1em",...e,children:C.jsx("path",{d:"m6 9 6 6 6-6"})});class y extends Set{constructor(e,t,l){super(e),e instanceof y?(this.anchorKey=t||e.anchorKey,this.currentKey=l||e.currentKey):(this.anchorKey=t,this.currentKey=l)}}function z(i,e,t){let[l,s]=u.useState(i||e),n=u.useRef(i!==void 0),r=i!==void 0;u.useEffect(()=>{let a=n.current;a!==r&&console.warn(`WARN: A component changed from ${a?"controlled":"uncontrolled"} to ${r?"controlled":"uncontrolled"}.`),n.current=r},[r]);let c=r?i:l,o=u.useCallback((a,...g)=>{let h=(d,...f)=>{t&&(Object.is(c,d)||t(d,...f)),r||(c=d)};typeof a=="function"?(console.warn("We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320"),s((f,...p)=>{let S=a(r?c:f,...p);return h(S,...g),r?f:S})):(r||s(a),h(a,...g))},[r,c,t]);return[c,o]}function V(i,e){if(i.size!==e.size)return!1;for(let t of i)if(!e.has(t))return!1;return!0}function Q(i){let{selectionMode:e="none",disallowEmptySelection:t,allowDuplicateSelectionEvents:l,selectionBehavior:s="toggle",disabledBehavior:n="all"}=i,r=u.useRef(!1),[,c]=u.useState(!1),o=u.useRef(null),a=u.useRef(null),[,g]=u.useState(null),h=u.useMemo(()=>E(i.selectedKeys),[i.selectedKeys]),d=u.useMemo(()=>E(i.defaultSelectedKeys,new y),[i.defaultSelectedKeys]),[f,p]=z(h,d,i.onSelectionChange),S=u.useMemo(()=>i.disabledKeys?new Set(i.disabledKeys):new Set,[i.disabledKeys]),[m,b]=u.useState(s);s==="replace"&&m==="toggle"&&typeof f=="object"&&f.size===0&&b("replace");let I=u.useRef(s);return u.useEffect(()=>{s!==I.current&&(b(s),I.current=s)},[s]),{selectionMode:e,disallowEmptySelection:t,selectionBehavior:m,setSelectionBehavior:b,get isFocused(){return r.current},setFocused($){r.current=$,c($)},get focusedKey(){return o.current},get childFocusStrategy(){return a.current},setFocusedKey($,_="first"){o.current=$,a.current=_,g($)},selectedKeys:f,setSelectedKeys($){(l||!V($,f))&&p($)},disabledKeys:S,disabledBehavior:n}}function E(i,e){return i?i==="all"?"all":new y(i):e}function k(i,e){return typeof e.getChildren=="function"?e.getChildren(i.key):i.childNodes}function D(i){return P(i)}function P(i,e){for(let t of i)return t}function w(i,e,t){if(e.parentKey===t.parentKey)return e.index-t.index;let l=[...F(i,e),e],s=[...F(i,t),t],n=l.slice(0,s.length).findIndex((r,c)=>r!==s[c]);return n!==-1?(e=l[n],t=s[n],e.index-t.index):l.findIndex(r=>r===t)>=0?1:(s.findIndex(r=>r===e)>=0,-1)}function F(i,e){let t=[];for(;(e==null?void 0:e.parentKey)!=null;)e=i.getItem(e.parentKey),t.unshift(e);return t}class X{get selectionMode(){return this.state.selectionMode}get disallowEmptySelection(){return this.state.disallowEmptySelection}get selectionBehavior(){return this.state.selectionBehavior}setSelectionBehavior(e){this.state.setSelectionBehavior(e)}get isFocused(){return this.state.isFocused}setFocused(e){this.state.setFocused(e)}get focusedKey(){return this.state.focusedKey}get childFocusStrategy(){return this.state.childFocusStrategy}setFocusedKey(e,t){(e==null||this.collection.getItem(e))&&this.state.setFocusedKey(e,t)}get selectedKeys(){return this.state.selectedKeys==="all"?new Set(this.getSelectAllKeys()):this.state.selectedKeys}get rawSelection(){return this.state.selectedKeys}isSelected(e){return this.state.selectionMode==="none"?!1:(e=this.getKey(e),this.state.selectedKeys==="all"?this.canSelectItem(e):this.state.selectedKeys.has(e))}get isEmpty(){return this.state.selectedKeys!=="all"&&this.state.selectedKeys.size===0}get isSelectAll(){if(this.isEmpty)return!1;if(this.state.selectedKeys==="all")return!0;if(this._isSelectAll!=null)return this._isSelectAll;let e=this.getSelectAllKeys(),t=this.state.selectedKeys;return this._isSelectAll=e.every(l=>t.has(l)),this._isSelectAll}get firstSelectedKey(){let e=null;for(let t of this.state.selectedKeys){let l=this.collection.getItem(t);(!e||l&&w(this.collection,l,e)<0)&&(e=l)}return e==null?void 0:e.key}get lastSelectedKey(){let e=null;for(let t of this.state.selectedKeys){let l=this.collection.getItem(t);(!e||l&&w(this.collection,l,e)>0)&&(e=l)}return e==null?void 0:e.key}get disabledKeys(){return this.state.disabledKeys}get disabledBehavior(){return this.state.disabledBehavior}extendSelection(e){if(this.selectionMode==="none")return;if(this.selectionMode==="single"){this.replaceSelection(e);return}e=this.getKey(e);let t;if(this.state.selectedKeys==="all")t=new y([e],e,e);else{let l=this.state.selectedKeys,s=l.anchorKey||e;t=new y(l,s,e);for(let n of this.getKeyRange(s,l.currentKey||e))t.delete(n);for(let n of this.getKeyRange(e,s))this.canSelectItem(n)&&t.add(n)}this.state.setSelectedKeys(t)}getKeyRange(e,t){let l=this.collection.getItem(e),s=this.collection.getItem(t);return l&&s?w(this.collection,l,s)<=0?this.getKeyRangeInternal(e,t):this.getKeyRangeInternal(t,e):[]}getKeyRangeInternal(e,t){let l=[],s=e;for(;s;){let n=this.collection.getItem(s);if((n&&n.type==="item"||n.type==="cell"&&this.allowsCellSelection)&&l.push(s),s===t)return l;s=this.collection.getKeyAfter(s)}return[]}getKey(e){let t=this.collection.getItem(e);if(!t||t.type==="cell"&&this.allowsCellSelection)return e;for(;t.type!=="item"&&t.parentKey!=null;)t=this.collection.getItem(t.parentKey);return!t||t.type!=="item"?null:t.key}toggleSelection(e){if(this.selectionMode==="none")return;if(this.selectionMode==="single"&&!this.isSelected(e)){this.replaceSelection(e);return}if(e=this.getKey(e),e==null)return;let t=new y(this.state.selectedKeys==="all"?this.getSelectAllKeys():this.state.selectedKeys);t.has(e)?t.delete(e):this.canSelectItem(e)&&(t.add(e),t.anchorKey=e,t.currentKey=e),!(this.disallowEmptySelection&&t.size===0)&&this.state.setSelectedKeys(t)}replaceSelection(e){if(this.selectionMode==="none"||(e=this.getKey(e),e==null))return;let t=this.canSelectItem(e)?new y([e],e,e):new y;this.state.setSelectedKeys(t)}setSelectedKeys(e){if(this.selectionMode==="none")return;let t=new y;for(let l of e)if(l=this.getKey(l),l!=null&&(t.add(l),this.selectionMode==="single"))break;this.state.setSelectedKeys(t)}getSelectAllKeys(){let e=[],t=l=>{for(;l!=null;){if(this.canSelectItem(l)){let s=this.collection.getItem(l);s.type==="item"&&e.push(l),s.hasChildNodes&&(this.allowsCellSelection||s.type!=="item")&&t(D(k(s,this.collection)).key)}l=this.collection.getKeyAfter(l)}};return t(this.collection.getFirstKey()),e}selectAll(){!this.isSelectAll&&this.selectionMode==="multiple"&&this.state.setSelectedKeys("all")}clearSelection(){!this.disallowEmptySelection&&(this.state.selectedKeys==="all"||this.state.selectedKeys.size>0)&&this.state.setSelectedKeys(new y)}toggleSelectAll(){this.isSelectAll?this.clearSelection():this.selectAll()}select(e,t){this.selectionMode!=="none"&&(this.selectionMode==="single"?this.isSelected(e)&&!this.disallowEmptySelection?this.toggleSelection(e):this.replaceSelection(e):this.selectionBehavior==="toggle"||t&&(t.pointerType==="touch"||t.pointerType==="virtual")?this.toggleSelection(e):this.replaceSelection(e))}isSelectionEqual(e){if(e===this.state.selectedKeys)return!0;let t=this.selectedKeys;if(e.size!==t.size)return!1;for(let l of e)if(!t.has(l))return!1;for(let l of t)if(!e.has(l))return!1;return!0}canSelectItem(e){var t;if(this.state.selectionMode==="none"||this.state.disabledKeys.has(e))return!1;let l=this.collection.getItem(e);return!(!l||!(l==null||(t=l.props)===null||t===void 0)&&t.isDisabled||l.type==="cell"&&!this.allowsCellSelection)}isDisabled(e){var t,l;return this.state.disabledBehavior==="all"&&(this.state.disabledKeys.has(e)||!!(!((l=this.collection.getItem(e))===null||l===void 0||(t=l.props)===null||t===void 0)&&t.isDisabled))}isLink(e){var t,l;return!!(!((l=this.collection.getItem(e))===null||l===void 0||(t=l.props)===null||t===void 0)&&t.href)}getItemProps(e){var t;return(t=this.collection.getItem(e))===null||t===void 0?void 0:t.props}constructor(e,t,l){this.collection=e,this.state=t;var s;this.allowsCellSelection=(s=l==null?void 0:l.allowsCellSelection)!==null&&s!==void 0?s:!1,this._isSelectAll=null}}class L{build(e,t){return this.context=t,A(()=>this.iterateCollection(e))}*iterateCollection(e){let{children:t,items:l}=e;if(typeof t=="function"){if(!l)throw new Error("props.children was a function but props.items is missing");for(let s of e.items)yield*this.getFullNode({value:s},{renderer:t})}else{let s=[];M.Children.forEach(t,r=>{s.push(r)});let n=0;for(let r of s){let c=this.getFullNode({element:r,index:n},{});for(let o of c)n++,yield o}}}getKey(e,t,l,s){if(e.key!=null)return e.key;if(t.type==="cell"&&t.key!=null)return`${s}${t.key}`;let n=t.value;if(n!=null){var r;let c=(r=n.key)!==null&&r!==void 0?r:n.id;if(c==null)throw new Error("No key found for item");return c}return s?`${s}.${t.index}`:`$.${t.index}`}getChildState(e,t){return{renderer:t.renderer||e.renderer}}*getFullNode(e,t,l,s){let n=e.element;if(!n&&e.value&&t&&t.renderer){let o=this.cache.get(e.value);if(o&&(!o.shouldInvalidate||!o.shouldInvalidate(this.context))){o.index=e.index,o.parentKey=s?s.key:null,yield o;return}n=t.renderer(e.value)}if(M.isValidElement(n)){let o=n.type;if(typeof o!="function"&&typeof o.getCollectionNode!="function"){let d=typeof n.type=="function"?n.type.name:n.type;throw new Error(`Unknown element <${d}> in collection.`)}let a=o.getCollectionNode(n.props,this.context),g=e.index,h=a.next();for(;!h.done&&h.value;){let d=h.value;e.index=g;let f=d.key;f||(f=d.element?null:this.getKey(n,e,t,l));let S=[...this.getFullNode({...d,key:f,index:g,wrapper:O(e.wrapper,d.wrapper)},this.getChildState(t,d),l?`${l}${n.key}`:n.key,s)];for(let m of S){if(m.value=d.value||e.value,m.value&&this.cache.set(m.value,m),e.type&&m.type!==e.type)throw new Error(`Unsupported type <${x(m.type)}> in <${x(s.type)}>. Only <${x(e.type)}> is supported.`);g++,yield m}h=a.next(S)}return}if(e.key==null)return;let r=this,c={type:e.type,props:e.props,key:e.key,parentKey:s?s.key:null,value:e.value,level:s?s.level+1:0,index:e.index,rendered:e.rendered,textValue:e.textValue,"aria-label":e["aria-label"],wrapper:e.wrapper,shouldInvalidate:e.shouldInvalidate,hasChildNodes:e.hasChildNodes,childNodes:A(function*(){if(!e.hasChildNodes)return;let o=0;for(let a of e.childNodes()){a.key!=null&&(a.key=`${c.key}${a.key}`),a.index=o;let g=r.getFullNode(a,r.getChildState(t,a),c.key,c);for(let h of g)o++,yield h}})};yield c}constructor(){this.cache=new WeakMap}}function A(i){let e=[],t=null;return{*[Symbol.iterator](){for(let l of e)yield l;t||(t=i());for(let l of t)e.push(l),yield l}}}function O(i,e){if(i&&e)return t=>i(e(t));if(i)return i;if(e)return e}function x(i){return i[0].toUpperCase()+i.slice(1)}function Y(i,e,t){let l=u.useMemo(()=>new L,[]),{children:s,items:n,collection:r}=i;return u.useMemo(()=>{if(r)return r;let o=l.build({children:s,items:n},t);return e(o)},[l,s,n,r,t,e])}function Z(i,e){return typeof e.getChildren=="function"?e.getChildren(i.key):i.childNodes}function N(i){return U(i,0)}function U(i,e){if(e<0)return;let t=0;for(let l of i){if(t===e)return l;t++}}function ee(i){let e;for(let t of i)e=t;return e}export{G as $,J as C,H as a,Z as b,Q as c,Y as d,X as e,N as f,U as g,ee as h};
