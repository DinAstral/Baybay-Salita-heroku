import{r as y,a as S}from"./react-BCcS7c0c.js";function O(i,e,t){let[l,r]=y.useState(i||e),s=y.useRef(i!==void 0),n=i!==void 0;y.useEffect(()=>{let o=s.current;o!==n&&console.warn(`WARN: A component changed from ${o?"controlled":"uncontrolled"} to ${n?"controlled":"uncontrolled"}.`),s.current=n},[n]);let d=n?i:l,c=y.useCallback((o,...u)=>{let a=(h,...f)=>{t&&(Object.is(d,h)||t(h,...f)),n||(d=h)};typeof o=="function"?(console.warn("We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320"),r((f,...m)=>{let g=o(n?d:f,...m);return a(g,...u),n?f:g})):(n||r(o),a(o,...u))},[n,d,t]);return[d,c]}function Fe(i,e=-1/0,t=1/0){return Math.min(Math.max(i,e),t)}class p extends Set{constructor(e,t,l){super(e),e instanceof p?(this.anchorKey=t||e.anchorKey,this.currentKey=l||e.currentKey):(this.anchorKey=t,this.currentKey=l)}}function oe(i,e,t){let[l,r]=y.useState(i||e),s=y.useRef(i!==void 0),n=i!==void 0;y.useEffect(()=>{let o=s.current;o!==n&&console.warn(`WARN: A component changed from ${o?"controlled":"uncontrolled"} to ${n?"controlled":"uncontrolled"}.`),s.current=n},[n]);let d=n?i:l,c=y.useCallback((o,...u)=>{let a=(h,...f)=>{t&&(Object.is(d,h)||t(h,...f)),n||(d=h)};typeof o=="function"?(console.warn("We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320"),r((f,...m)=>{let g=o(n?d:f,...m);return a(g,...u),n?f:g})):(n||r(o),a(o,...u))},[n,d,t]);return[d,c]}function ae(i,e){if(i.size!==e.size)return!1;for(let t of i)if(!e.has(t))return!1;return!0}function Y(i){let{selectionMode:e="none",disallowEmptySelection:t,allowDuplicateSelectionEvents:l,selectionBehavior:r="toggle",disabledBehavior:s="all"}=i,n=y.useRef(!1),[,d]=y.useState(!1),c=y.useRef(null),o=y.useRef(null),[,u]=y.useState(null),a=y.useMemo(()=>B(i.selectedKeys),[i.selectedKeys]),h=y.useMemo(()=>B(i.defaultSelectedKeys,new p),[i.defaultSelectedKeys]),[f,m]=oe(a,h,i.onSelectionChange),g=y.useMemo(()=>i.disabledKeys?new Set(i.disabledKeys):new Set,[i.disabledKeys]),[b,C]=y.useState(r);r==="replace"&&b==="toggle"&&typeof f=="object"&&f.size===0&&C("replace");let k=y.useRef(r);return y.useEffect(()=>{r!==k.current&&(C(r),k.current=r)},[r]),{selectionMode:e,disallowEmptySelection:t,selectionBehavior:b,setSelectionBehavior:C,get isFocused(){return n.current},setFocused(v){n.current=v,d(v)},get focusedKey(){return c.current},get childFocusStrategy(){return o.current},setFocusedKey(v,M="first"){c.current=v,o.current=M,u(v)},selectedKeys:f,setSelectedKeys(v){(l||!ae(v,f))&&m(v)},disabledKeys:g,disabledBehavior:s}}function B(i,e){return i?i==="all"?"all":new p(i):e}function ce(i,e){return typeof e.getChildren=="function"?e.getChildren(i.key):i.childNodes}function de(i){return ue(i)}function ue(i,e){for(let t of i)return t}function N(i,e,t){if(e.parentKey===t.parentKey)return e.index-t.index;let l=[...z(i,e),e],r=[...z(i,t),t],s=l.slice(0,r.length).findIndex((n,d)=>n!==r[d]);return s!==-1?(e=l[s],t=r[s],e.index-t.index):l.findIndex(n=>n===t)>=0?1:(r.findIndex(n=>n===e)>=0,-1)}function z(i,e){let t=[];for(;(e==null?void 0:e.parentKey)!=null;)e=i.getItem(e.parentKey),t.unshift(e);return t}class G{get selectionMode(){return this.state.selectionMode}get disallowEmptySelection(){return this.state.disallowEmptySelection}get selectionBehavior(){return this.state.selectionBehavior}setSelectionBehavior(e){this.state.setSelectionBehavior(e)}get isFocused(){return this.state.isFocused}setFocused(e){this.state.setFocused(e)}get focusedKey(){return this.state.focusedKey}get childFocusStrategy(){return this.state.childFocusStrategy}setFocusedKey(e,t){(e==null||this.collection.getItem(e))&&this.state.setFocusedKey(e,t)}get selectedKeys(){return this.state.selectedKeys==="all"?new Set(this.getSelectAllKeys()):this.state.selectedKeys}get rawSelection(){return this.state.selectedKeys}isSelected(e){return this.state.selectionMode==="none"?!1:(e=this.getKey(e),this.state.selectedKeys==="all"?this.canSelectItem(e):this.state.selectedKeys.has(e))}get isEmpty(){return this.state.selectedKeys!=="all"&&this.state.selectedKeys.size===0}get isSelectAll(){if(this.isEmpty)return!1;if(this.state.selectedKeys==="all")return!0;if(this._isSelectAll!=null)return this._isSelectAll;let e=this.getSelectAllKeys(),t=this.state.selectedKeys;return this._isSelectAll=e.every(l=>t.has(l)),this._isSelectAll}get firstSelectedKey(){let e=null;for(let t of this.state.selectedKeys){let l=this.collection.getItem(t);(!e||l&&N(this.collection,l,e)<0)&&(e=l)}return e==null?void 0:e.key}get lastSelectedKey(){let e=null;for(let t of this.state.selectedKeys){let l=this.collection.getItem(t);(!e||l&&N(this.collection,l,e)>0)&&(e=l)}return e==null?void 0:e.key}get disabledKeys(){return this.state.disabledKeys}get disabledBehavior(){return this.state.disabledBehavior}extendSelection(e){if(this.selectionMode==="none")return;if(this.selectionMode==="single"){this.replaceSelection(e);return}e=this.getKey(e);let t;if(this.state.selectedKeys==="all")t=new p([e],e,e);else{let l=this.state.selectedKeys,r=l.anchorKey||e;t=new p(l,r,e);for(let s of this.getKeyRange(r,l.currentKey||e))t.delete(s);for(let s of this.getKeyRange(e,r))this.canSelectItem(s)&&t.add(s)}this.state.setSelectedKeys(t)}getKeyRange(e,t){let l=this.collection.getItem(e),r=this.collection.getItem(t);return l&&r?N(this.collection,l,r)<=0?this.getKeyRangeInternal(e,t):this.getKeyRangeInternal(t,e):[]}getKeyRangeInternal(e,t){let l=[],r=e;for(;r;){let s=this.collection.getItem(r);if((s&&s.type==="item"||s.type==="cell"&&this.allowsCellSelection)&&l.push(r),r===t)return l;r=this.collection.getKeyAfter(r)}return[]}getKey(e){let t=this.collection.getItem(e);if(!t||t.type==="cell"&&this.allowsCellSelection)return e;for(;t.type!=="item"&&t.parentKey!=null;)t=this.collection.getItem(t.parentKey);return!t||t.type!=="item"?null:t.key}toggleSelection(e){if(this.selectionMode==="none")return;if(this.selectionMode==="single"&&!this.isSelected(e)){this.replaceSelection(e);return}if(e=this.getKey(e),e==null)return;let t=new p(this.state.selectedKeys==="all"?this.getSelectAllKeys():this.state.selectedKeys);t.has(e)?t.delete(e):this.canSelectItem(e)&&(t.add(e),t.anchorKey=e,t.currentKey=e),!(this.disallowEmptySelection&&t.size===0)&&this.state.setSelectedKeys(t)}replaceSelection(e){if(this.selectionMode==="none"||(e=this.getKey(e),e==null))return;let t=this.canSelectItem(e)?new p([e],e,e):new p;this.state.setSelectedKeys(t)}setSelectedKeys(e){if(this.selectionMode==="none")return;let t=new p;for(let l of e)if(l=this.getKey(l),l!=null&&(t.add(l),this.selectionMode==="single"))break;this.state.setSelectedKeys(t)}getSelectAllKeys(){let e=[],t=l=>{for(;l!=null;){if(this.canSelectItem(l)){let r=this.collection.getItem(l);r.type==="item"&&e.push(l),r.hasChildNodes&&(this.allowsCellSelection||r.type!=="item")&&t(de(ce(r,this.collection)).key)}l=this.collection.getKeyAfter(l)}};return t(this.collection.getFirstKey()),e}selectAll(){!this.isSelectAll&&this.selectionMode==="multiple"&&this.state.setSelectedKeys("all")}clearSelection(){!this.disallowEmptySelection&&(this.state.selectedKeys==="all"||this.state.selectedKeys.size>0)&&this.state.setSelectedKeys(new p)}toggleSelectAll(){this.isSelectAll?this.clearSelection():this.selectAll()}select(e,t){this.selectionMode!=="none"&&(this.selectionMode==="single"?this.isSelected(e)&&!this.disallowEmptySelection?this.toggleSelection(e):this.replaceSelection(e):this.selectionBehavior==="toggle"||t&&(t.pointerType==="touch"||t.pointerType==="virtual")?this.toggleSelection(e):this.replaceSelection(e))}isSelectionEqual(e){if(e===this.state.selectedKeys)return!0;let t=this.selectedKeys;if(e.size!==t.size)return!1;for(let l of e)if(!t.has(l))return!1;for(let l of t)if(!e.has(l))return!1;return!0}canSelectItem(e){var t;if(this.state.selectionMode==="none"||this.state.disabledKeys.has(e))return!1;let l=this.collection.getItem(e);return!(!l||!(l==null||(t=l.props)===null||t===void 0)&&t.isDisabled||l.type==="cell"&&!this.allowsCellSelection)}isDisabled(e){var t,l;return this.state.disabledBehavior==="all"&&(this.state.disabledKeys.has(e)||!!(!((l=this.collection.getItem(e))===null||l===void 0||(t=l.props)===null||t===void 0)&&t.isDisabled))}isLink(e){var t,l;return!!(!((l=this.collection.getItem(e))===null||l===void 0||(t=l.props)===null||t===void 0)&&t.href)}getItemProps(e){var t;return(t=this.collection.getItem(e))===null||t===void 0?void 0:t.props}constructor(e,t,l){this.collection=e,this.state=t;var r;this.allowsCellSelection=(r=l==null?void 0:l.allowsCellSelection)!==null&&r!==void 0?r:!1,this._isSelectAll=null}}function Q(i){return null}Q.getCollectionNode=function*(e,t){let{childItems:l,title:r,children:s}=e,n=e.title||e.children,d=e.textValue||(typeof n=="string"?n:"")||e["aria-label"]||"";!d&&!(t!=null&&t.suppressTextValueWarning)&&console.warn("<Item> with non-plain text contents is unsupported by type to select for accessibility. Please add a `textValue` prop."),yield{type:"item",props:e,rendered:n,textValue:d,"aria-label":e["aria-label"],hasChildNodes:fe(e),*childNodes(){if(l)for(let c of l)yield{type:"item",value:c};else if(r){let c=[];S.Children.forEach(s,o=>{c.push({type:"item",element:o})}),yield*c}}}};function fe(i){return i.hasChildItems!=null?i.hasChildItems:!!(i.childItems||i.title&&S.Children.count(i.children)>0)}let Be=Q;class he{build(e,t){return this.context=t,L(()=>this.iterateCollection(e))}*iterateCollection(e){let{children:t,items:l}=e;if(typeof t=="function"){if(!l)throw new Error("props.children was a function but props.items is missing");for(let r of e.items)yield*this.getFullNode({value:r},{renderer:t})}else{let r=[];S.Children.forEach(t,n=>{r.push(n)});let s=0;for(let n of r){let d=this.getFullNode({element:n,index:s},{});for(let c of d)s++,yield c}}}getKey(e,t,l,r){if(e.key!=null)return e.key;if(t.type==="cell"&&t.key!=null)return`${r}${t.key}`;let s=t.value;if(s!=null){var n;let d=(n=s.key)!==null&&n!==void 0?n:s.id;if(d==null)throw new Error("No key found for item");return d}return r?`${r}.${t.index}`:`$.${t.index}`}getChildState(e,t){return{renderer:t.renderer||e.renderer}}*getFullNode(e,t,l,r){let s=e.element;if(!s&&e.value&&t&&t.renderer){let c=this.cache.get(e.value);if(c&&(!c.shouldInvalidate||!c.shouldInvalidate(this.context))){c.index=e.index,c.parentKey=r?r.key:null,yield c;return}s=t.renderer(e.value)}if(S.isValidElement(s)){let c=s.type;if(typeof c!="function"&&typeof c.getCollectionNode!="function"){let h=typeof s.type=="function"?s.type.name:s.type;throw new Error(`Unknown element <${h}> in collection.`)}let o=c.getCollectionNode(s.props,this.context),u=e.index,a=o.next();for(;!a.done&&a.value;){let h=a.value;e.index=u;let f=h.key;f||(f=h.element?null:this.getKey(s,e,t,l));let g=[...this.getFullNode({...h,key:f,index:u,wrapper:ye(e.wrapper,h.wrapper)},this.getChildState(t,h),l?`${l}${s.key}`:s.key,r)];for(let b of g){if(b.value=h.value||e.value,b.value&&this.cache.set(b.value,b),e.type&&b.type!==e.type)throw new Error(`Unsupported type <${R(b.type)}> in <${R(r.type)}>. Only <${R(e.type)}> is supported.`);u++,yield b}a=o.next(g)}return}if(e.key==null)return;let n=this,d={type:e.type,props:e.props,key:e.key,parentKey:r?r.key:null,value:e.value,level:r?r.level+1:0,index:e.index,rendered:e.rendered,textValue:e.textValue,"aria-label":e["aria-label"],wrapper:e.wrapper,shouldInvalidate:e.shouldInvalidate,hasChildNodes:e.hasChildNodes,childNodes:L(function*(){if(!e.hasChildNodes)return;let c=0;for(let o of e.childNodes()){o.key!=null&&(o.key=`${d.key}${o.key}`),o.index=c;let u=n.getFullNode(o,n.getChildState(t,o),d.key,d);for(let a of u)c++,yield a}})};yield d}constructor(){this.cache=new WeakMap}}function L(i){let e=[],t=null;return{*[Symbol.iterator](){for(let l of e)yield l;t||(t=i());for(let l of t)e.push(l),yield l}}}function ye(i,e){if(i&&e)return t=>i(e(t));if(i)return i;if(e)return e}function R(i){return i[0].toUpperCase()+i.slice(1)}function J(i,e,t){let l=y.useMemo(()=>new he,[]),{children:r,items:s,collection:n}=i;return y.useMemo(()=>{if(n)return n;let c=l.build({children:r,items:s},t);return e(c)},[l,r,s,n,t,e])}function me(i,e){return typeof e.getChildren=="function"?e.getChildren(i.key):i.childNodes}function ge(i){return be(i,0)}function be(i,e){if(e<0)return;let t=0;for(let l of i){if(t===e)return l;t++}}function $e(i){let e;for(let t of i)e=t;return e}const W=new WeakMap;function ze(i){let e=W.get(i);if(e!=null)return e;e=0;let t=l=>{for(let r of l)r.type==="section"?t(me(r,i)):e++};return t(i),W.set(i,e),e}const F={badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valueMissing:!1,valid:!0},X={...F,customError:!0,valid:!1},I={isInvalid:!1,validationDetails:F,validationErrors:[]},ve=y.createContext({}),H="__formValidationState"+Date.now();function pe(i){if(i[H]){let{realtimeValidation:e,displayValidation:t,updateValidation:l,resetValidation:r,commitValidation:s}=i[H];return{realtimeValidation:e,displayValidation:t,updateValidation:l,resetValidation:r,commitValidation:s}}return Ke(i)}function Ke(i){let{isInvalid:e,validationState:t,name:l,value:r,builtinValidation:s,validate:n,validationBehavior:d="aria"}=i;t&&(e||(e=t==="invalid"));let c=e!==void 0?{isInvalid:e,validationErrors:[],validationDetails:X}:null,o=y.useMemo(()=>U(Se(n,r)),[n,r]);s!=null&&s.validationDetails.valid&&(s=null);let u=y.useContext(ve),a=y.useMemo(()=>l?Array.isArray(l)?l.flatMap($=>_(u[$])):_(u[l]):[],[u,l]),[h,f]=y.useState(u),[m,g]=y.useState(!1);u!==h&&(f(u),g(!1));let b=y.useMemo(()=>U(m?[]:a),[m,a]),C=y.useRef(I),[k,v]=y.useState(I),M=y.useRef(I),se=()=>{if(!re)return;E(!1);let $=o||s||C.current;D($,M.current)||(M.current=$,v($))},[re,E]=y.useState(!1);return y.useEffect(se),{realtimeValidation:c||b||o||s||I,displayValidation:d==="native"?c||b||k:c||b||o||s||k,updateValidation($){d==="aria"&&!D(k,$)?v($):C.current=$},resetValidation(){let $=I;D($,M.current)||(M.current=$,v($)),d==="native"&&E(!1),g(!0)},commitValidation(){d==="native"&&E(!0),g(!0)}}}function _(i){return i?Array.isArray(i)?i:[i]:[]}function Se(i,e){if(typeof i=="function"){let t=i(e);if(t&&typeof t!="boolean")return _(t)}return[]}function U(i){return i.length?{isInvalid:!0,validationErrors:i,validationDetails:X}:null}function D(i,e){return i===e?!0:i&&e&&i.isInvalid===e.isInvalid&&i.validationErrors.length===e.validationErrors.length&&i.validationErrors.every((t,l)=>t===e.validationErrors[l])&&Object.entries(i.validationDetails).every(([t,l])=>e.validationDetails[t]===l)}function we(...i){let e=new Set,t=!1,l={...F};for(let n of i){var r,s;for(let d of n.validationErrors)e.add(d);t||(t=n.isInvalid);for(let d in l)(r=l)[s=d]||(r[s]=n.validationDetails[d])}return l.valid=!t,{isInvalid:t,validationErrors:[...e],validationDetails:l}}function Le(i={}){let{isReadOnly:e}=i,[t,l]=O(i.isSelected,i.defaultSelected||!1,i.onChange);function r(n){e||l(n)}function s(){e||l(!t)}return{isSelected:t,setSelected:r,toggle:s}}function We(i={}){let[e,t]=O(i.value,i.defaultValue||[],i.onChange),l=!!i.isRequired&&e.length===0,r=y.useRef(new Map),s=pe({...i,value:e}),n=s.displayValidation.isInvalid;var d;return{...s,value:e,setValue(o){i.isReadOnly||i.isDisabled||t(o)},isDisabled:i.isDisabled||!1,isReadOnly:i.isReadOnly||!1,isSelected(o){return e.includes(o)},addValue(o){i.isReadOnly||i.isDisabled||e.includes(o)||t(e.concat(o))},removeValue(o){i.isReadOnly||i.isDisabled||e.includes(o)&&t(e.filter(u=>u!==o))},toggleValue(o){i.isReadOnly||i.isDisabled||(e.includes(o)?t(e.filter(u=>u!==o)):t(e.concat(o)))},setInvalid(o,u){let a=new Map(r.current);u.isInvalid?a.set(o,u):a.delete(o),r.current=a,s.updateValidation(we(...a.values()))},validationState:(d=i.validationState)!==null&&d!==void 0?d:n?"invalid":null,isInvalid:n,isRequired:l}}function Z(i){let[e,t]=O(i.isOpen,i.defaultOpen||!1,i.onOpenChange);const l=y.useCallback(()=>{t(!0)},[t]),r=y.useCallback(()=>{t(!1)},[t]),s=y.useCallback(()=>{t(!e)},[t,e]);return{isOpen:e,setOpen:t,open:l,close:r,toggle:s}}const xe=1500,P=500;let w={},Ce=0,V=!1,K=null,x=null;function He(i={}){let{delay:e=xe,closeDelay:t=P}=i,{isOpen:l,open:r,close:s}=Z(i),n=y.useMemo(()=>`${++Ce}`,[]),d=y.useRef(),c=()=>{w[n]=a},o=()=>{for(let f in w)f!==n&&(w[f](!0),delete w[f])},u=()=>{clearTimeout(d.current),d.current=null,o(),c(),V=!0,r(),K&&(clearTimeout(K),K=null),x&&(clearTimeout(x),x=null)},a=f=>{f||t<=0?(clearTimeout(d.current),d.current=null,s()):d.current||(d.current=setTimeout(()=>{d.current=null,s()},t)),K&&(clearTimeout(K),K=null),V&&(x&&clearTimeout(x),x=setTimeout(()=>{delete w[n],x=null,V=!1},Math.max(P,t)))},h=()=>{o(),c(),!l&&!K&&!V?K=setTimeout(()=>{K=null,V=!0,u()},e):l||u()};return y.useEffect(()=>()=>{clearTimeout(d.current),w[n]&&delete w[n]},[n]),{isOpen:l,open:f=>{!f&&e>0&&!d.current?h():u()},close:a}}function Ue(i){let e=Z(i),[t,l]=y.useState(null),[r,s]=y.useState([]),n=()=>{s([]),e.close()};return{focusStrategy:t,...e,open(o=null){l(o),e.open()},toggle(o=null){l(o),e.toggle()},close(){n()},expandedKeysStack:r,openSubmenu:(o,u)=>{s(a=>u>a.length?a:[...a.slice(0,u),o])},closeSubmenu:(o,u)=>{s(a=>a[u]===o?a.slice(0,u):a)}}}let ke=!1;function Pe(){return ke}function q(i,e){return typeof e.getChildren=="function"?e.getChildren(i.key):i.childNodes}function Me(i){return Ie(i)}function Ie(i,e){for(let t of i)return t}function Ve(i){let e;for(let t of i)e=t;return e}function Ee(i){let{collection:e,focusMode:t}=i,l=i.UNSAFE_selectionState||Y(i),r=y.useMemo(()=>i.disabledKeys?new Set(i.disabledKeys):new Set,[i.disabledKeys]),s=l.setFocusedKey;l.setFocusedKey=(c,o)=>{if(t==="cell"&&c!=null){let h=e.getItem(c);if((h==null?void 0:h.type)==="item"){var u,a;let f=q(h,e);o==="last"?c=(u=Ve(f))===null||u===void 0?void 0:u.key:c=(a=Me(f))===null||a===void 0?void 0:a.key}}s(c,o)};let n=y.useMemo(()=>new G(e,l),[e,l]);const d=y.useRef(null);return y.useEffect(()=>{if(l.focusedKey!=null&&!e.getItem(l.focusedKey)){const c=d.current.getItem(l.focusedKey),o=c.parentKey!=null&&(c.type==="cell"||c.type==="rowheader"||c.type==="column")?d.current.getItem(c.parentKey):c,u=d.current.rows,a=e.rows,h=u.length-a.length;let f=Math.min(h>1?Math.max(o.index-h+1,0):o.index,a.length-1),m;for(;f>=0;){if(!n.isDisabled(a[f].key)&&a[f].type!=="headerrow"){m=a[f];break}f<a.length-1?f++:(f>o.index&&(f=o.index),f--)}if(m){const g=m.hasChildNodes?[...q(m,e)]:[],b=m.hasChildNodes&&o!==c&&c.index<g.length?g[c.index].key:m.key;l.setFocusedKey(b)}else l.setFocusedKey(null)}d.current=e},[e,n,l,l.focusedKey]),{collection:e,disabledKeys:r,isKeyboardNavigationDisabled:!1,selectionManager:n}}class Ne{*[Symbol.iterator](){yield*[...this.rows]}get size(){return[...this.rows].length}getKeys(){return this.keyMap.keys()}getKeyBefore(e){let t=this.keyMap.get(e);return t?t.prevKey:null}getKeyAfter(e){let t=this.keyMap.get(e);return t?t.nextKey:null}getFirstKey(){var e;return(e=[...this.rows][0])===null||e===void 0?void 0:e.key}getLastKey(){var e;let t=[...this.rows];return(e=t[t.length-1])===null||e===void 0?void 0:e.key}getItem(e){return this.keyMap.get(e)}at(e){const t=[...this.getKeys()];return this.getItem(t[e])}getChildren(e){let t=this.keyMap.get(e);return(t==null?void 0:t.childNodes)||[]}constructor(e){this.keyMap=new Map,this.keyMap=new Map,this.columnCount=e==null?void 0:e.columnCount,this.rows=[];let t=s=>{let n=this.keyMap.get(s.key);e.visitNode&&(s=e.visitNode(s)),this.keyMap.set(s.key,s);let d=new Set,c;for(let o of s.childNodes)o.type==="cell"&&o.parentKey==null&&(o.parentKey=s.key),d.add(o.key),c?(c.nextKey=o.key,o.prevKey=c.key):o.prevKey=null,t(o),c=o;if(c&&(c.nextKey=null),n)for(let o of n.childNodes)d.has(o.key)||l(o)},l=s=>{this.keyMap.delete(s.key);for(let n of s.childNodes)this.keyMap.get(n.key)===n&&l(n)},r;e.items.forEach((s,n)=>{let d={level:0,key:"row-"+n,type:"row",value:void 0,hasChildNodes:!0,childNodes:[...s.childNodes],rendered:void 0,textValue:void 0,...s};r?(r.nextKey=d.key,d.prevKey=r.key):d.prevKey=null,this.rows.push(d),t(d),r=d}),r&&(r.nextKey=null)}}const ee="row-header-column-"+Math.random().toString(36).slice(2);let A="row-header-column-"+Math.random().toString(36).slice(2);for(;ee===A;)A="row-header-column-"+Math.random().toString(36).slice(2);function Re(i,e){if(e.length===0)return[];let t=[],l=new Map;for(let c of e){let o=c.parentKey,u=[c];for(;o;){let a=i.get(o);if(!a)break;if(l.has(a)){a.colspan++;let{column:h,index:f}=l.get(a);if(f>u.length)break;for(let m=f;m<u.length;m++)h.splice(m,0,null);for(let m=u.length;m<h.length;m++)h[m]&&l.has(h[m])&&(l.get(h[m]).index=m)}else a.colspan=1,u.push(a),l.set(a,{column:u,index:u.length-1});o=a.parentKey}t.push(u),c.index=t.length-1}let r=Math.max(...t.map(c=>c.length)),s=Array(r).fill(0).map(()=>[]),n=0;for(let c of t){let o=r-1;for(let u of c){if(u){let a=s[o],h=a.reduce((f,m)=>f+m.colspan,0);if(h<n){let f={type:"placeholder",key:"placeholder-"+u.key,colspan:n-h,index:h,value:null,rendered:null,level:o,hasChildNodes:!1,childNodes:[],textValue:null};a.length>0&&(a[a.length-1].nextKey=f.key,f.prevKey=a[a.length-1].key),a.push(f)}a.length>0&&(a[a.length-1].nextKey=u.key,u.prevKey=a[a.length-1].key),u.level=o,u.colIndex=n,a.push(u)}o--}n++}let d=0;for(let c of s){let o=c.reduce((u,a)=>u+a.colspan,0);if(o<e.length){let u={type:"placeholder",key:"placeholder-"+c[c.length-1].key,colspan:e.length-o,index:o,value:null,rendered:null,level:d,hasChildNodes:!1,childNodes:[],textValue:null,prevKey:c[c.length-1].key};c.push(u)}d++}return s.map((c,o)=>({type:"headerrow",key:"headerrow-"+o,index:o,value:null,rendered:null,level:0,hasChildNodes:!0,childNodes:c,textValue:null}))}class De extends Ne{*[Symbol.iterator](){yield*this.body.childNodes}get size(){return this._size}getKeys(){return this.keyMap.keys()}getKeyBefore(e){let t=this.keyMap.get(e);return t?t.prevKey:null}getKeyAfter(e){let t=this.keyMap.get(e);return t?t.nextKey:null}getFirstKey(){var e;return(e=ge(this.body.childNodes))===null||e===void 0?void 0:e.key}getLastKey(){var e;return(e=$e(this.body.childNodes))===null||e===void 0?void 0:e.key}getItem(e){return this.keyMap.get(e)}at(e){const t=[...this.getKeys()];return this.getItem(t[e])}getTextValue(e){let t=this.getItem(e);if(!t)return"";if(t.textValue)return t.textValue;let l=this.rowHeaderColumnKeys;if(l){let r=[];for(let s of t.childNodes){let n=this.columns[s.index];if(l.has(n.key)&&s.textValue&&r.push(s.textValue),r.length===l.size)break}return r.join(" ")}return""}constructor(e,t,l){let r=new Set,s,n=[];if(l!=null&&l.showSelectionCheckboxes){let a={type:"column",key:ee,value:null,textValue:"",level:0,index:l!=null&&l.showDragButtons?1:0,hasChildNodes:!1,rendered:null,childNodes:[],props:{isSelectionCell:!0}};n.unshift(a)}if(l!=null&&l.showDragButtons){let a={type:"column",key:A,value:null,textValue:"",level:0,index:0,hasChildNodes:!1,rendered:null,childNodes:[],props:{isDragButtonCell:!0}};n.unshift(a)}let d=[],c=new Map,o=a=>{switch(a.type){case"body":s=a;break;case"column":c.set(a.key,a),a.hasChildNodes||(n.push(a),a.props.isRowHeader&&r.add(a.key));break;case"item":d.push(a);return}for(let h of a.childNodes)o(h)};for(let a of e)o(a);let u=Re(c,n);u.forEach((a,h)=>d.splice(h,0,a)),super({columnCount:n.length,items:d,visitNode:a=>(a.column=n[a.index],a)}),this._size=0,this.columns=n,this.rowHeaderColumnKeys=r,this.body=s,this.headerRows=u,this._size=[...s.childNodes].length,this.rowHeaderColumnKeys.size===0&&this.rowHeaderColumnKeys.add(this.columns.find(a=>{var h,f;return!(!((h=a.props)===null||h===void 0)&&h.isDragButtonCell)&&!(!((f=a.props)===null||f===void 0)&&f.isSelectionCell)}).key)}}const _e={ascending:"descending",descending:"ascending"};function qe(i){let[e,t]=y.useState(!1),{selectionMode:l="none",showSelectionCheckboxes:r,showDragButtons:s}=i,n=y.useMemo(()=>({showSelectionCheckboxes:r&&l!=="none",showDragButtons:s,selectionMode:l,columns:[]}),[i.children,r,l,s]),d=J(i,y.useCallback(u=>new De(u,null,n),[n]),n),{disabledKeys:c,selectionManager:o}=Ee({...i,collection:d,disabledBehavior:i.disabledBehavior||"selection"});return{collection:d,disabledKeys:c,selectionManager:o,showSelectionCheckboxes:i.showSelectionCheckboxes||!1,sortDescriptor:i.sortDescriptor,isKeyboardNavigationDisabled:d.size===0||e,setKeyboardNavigationDisabled:t,sort(u,a){var h;i.onSortChange({column:u,direction:a??(((h=i.sortDescriptor)===null||h===void 0?void 0:h.column)===u?_e[i.sortDescriptor.direction]:"ascending")})}}}function te(i){return null}te.getCollectionNode=function*(e,t){let{children:l,columns:r}=e;if(t.columns=[],typeof l=="function"){if(!r)throw new Error("props.children was a function but props.columns is missing");for(let s of r)yield{type:"column",value:s,renderer:l}}else{let s=[];S.Children.forEach(l,n=>{s.push({type:"column",element:n})}),yield*s}};let je=te;function le(i){return null}le.getCollectionNode=function*(e){let{children:t,items:l}=e;yield{type:"body",hasChildNodes:!0,props:e,*childNodes(){if(typeof t=="function"){if(!l)throw new Error("props.children was a function but props.items is missing");for(let r of l)yield{type:"item",value:r,renderer:t}}else{let r=[];S.Children.forEach(t,s=>{r.push({type:"item",element:s})}),yield*r}}}};let Ye=le;function ie(i){return null}ie.getCollectionNode=function*(e,t){let{title:l,children:r,childColumns:s}=e,n=l||r,d=e.textValue||(typeof n=="string"?n:"")||e["aria-label"],c=yield{type:"column",hasChildNodes:!!s||l&&S.Children.count(r)>0,rendered:n,textValue:d,props:e,*childNodes(){if(s)for(let u of s)yield{type:"column",value:u};else if(l){let u=[];S.Children.forEach(r,a=>{u.push({type:"column",element:a})}),yield*u}},shouldInvalidate(u){return o(u),!1}},o=u=>{for(let a of c)a.hasChildNodes||u.columns.push(a)};o(t)};let Ge=ie;function T(i){return null}T.getCollectionNode=function*(e,t){let{children:l,textValue:r,UNSTABLE_childItems:s}=e;yield{type:"item",props:e,textValue:r,"aria-label":e["aria-label"],hasChildNodes:!0,*childNodes(){if(t.showDragButtons&&(yield{type:"cell",key:"header-drag",props:{isDragButtonCell:!0}}),t.showSelectionCheckboxes&&t.selectionMode!=="none"&&(yield{type:"cell",key:"header",props:{isSelectionCell:!0}}),typeof l=="function"){for(let n of t.columns)yield{type:"cell",element:l(n.key),key:n.key};if(s)for(let n of s)yield{type:"item",value:n}}else{let n=[],d=[];if(S.Children.forEach(l,c=>{if(c.type===T){if(n.length<t.columns.length)throw new Error("All of a Row's child Cells must be positioned before any child Rows.");d.push({type:"item",element:c})}else n.push({type:"cell",element:c})}),n.length!==t.columns.length)throw new Error(`Cell count must match column count. Found ${n.length} cells and ${t.columns.length} columns.`);yield*n,yield*d}},shouldInvalidate(n){return n.columns.length!==t.columns.length||n.columns.some((d,c)=>d.key!==t.columns[c].key)||n.showSelectionCheckboxes!==t.showSelectionCheckboxes||n.showDragButtons!==t.showDragButtons||n.selectionMode!==t.selectionMode}}};let Qe=T;function ne(i){return null}ne.getCollectionNode=function*(e){let{children:t}=e,l=e.textValue||(typeof t=="string"?t:"")||e["aria-label"]||"";yield{type:"cell",props:e,rendered:t,textValue:l,"aria-label":e["aria-label"],hasChildNodes:!1}};let Je=ne;class j{*[Symbol.iterator](){yield*this.iterable}get size(){return this.keyMap.size}getKeys(){return this.keyMap.keys()}getKeyBefore(e){let t=this.keyMap.get(e);return t?t.prevKey:null}getKeyAfter(e){let t=this.keyMap.get(e);return t?t.nextKey:null}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(e){return this.keyMap.get(e)}at(e){const t=[...this.getKeys()];return this.getItem(t[e])}getChildren(e){let t=this.keyMap.get(e);return(t==null?void 0:t.childNodes)||[]}constructor(e){this.keyMap=new Map,this.iterable=e;let t=s=>{if(this.keyMap.set(s.key,s),s.childNodes&&s.type==="section")for(let n of s.childNodes)t(n)};for(let s of e)t(s);let l,r=0;for(let[s,n]of this.keyMap)l?(l.nextKey=s,n.prevKey=l.key):(this.firstKey=s,n.prevKey=void 0),n.type==="item"&&(n.index=r++),l=n,l.nextKey=void 0;this.lastKey=l==null?void 0:l.key}}function Xe(i){let{filter:e}=i,t=Y(i),l=y.useMemo(()=>i.disabledKeys?new Set(i.disabledKeys):new Set,[i.disabledKeys]),r=y.useCallback(o=>e?new j(e(o)):new j(o),[e]),s=y.useMemo(()=>({suppressTextValueWarning:i.suppressTextValueWarning}),[i.suppressTextValueWarning]),n=J(i,r,s),d=y.useMemo(()=>new G(n,t),[n,t]);const c=y.useRef(null);return y.useEffect(()=>{if(t.focusedKey!=null&&!n.getItem(t.focusedKey)){const o=c.current.getItem(t.focusedKey),u=[...c.current.getKeys()].map(g=>{const b=c.current.getItem(g);return b.type==="item"?b:null}).filter(g=>g!==null),a=[...n.getKeys()].map(g=>{const b=n.getItem(g);return b.type==="item"?b:null}).filter(g=>g!==null),h=u.length-a.length;let f=Math.min(h>1?Math.max(o.index-h+1,0):o.index,a.length-1),m;for(;f>=0;){if(!d.isDisabled(a[f].key)){m=a[f];break}f<a.length-1?f++:(f>o.index&&(f=o.index),f--)}t.setFocusedKey(m?m.key:null)}c.current=n},[n,d,t,t.focusedKey]),{collection:n,disabledKeys:l,selectionManager:d}}export{We as $,Le as a,He as b,O as c,Z as d,qe as e,Qe as f,Ye as g,Je as h,Ge as i,je as j,Xe as k,Ue as l,pe as m,Be as n,Fe as o,I as p,H as q,ge as r,me as s,be as t,Pe as u,$e as v,ze as w};
