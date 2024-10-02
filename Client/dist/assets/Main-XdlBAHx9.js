import{j as a,a as u,r as t}from"./react-BCcS7c0c.js";import{F as n,o as x,p as y,q as j,r as b,s as k,f,n as N,t as v,u as A,v as S}from"./@fortawesome-BVdY808A.js";import{L as d}from"./react-router-dom-Dk6_dLEo.js";import{L as g}from"./react-scroll-BM_GtmPX.js";import{U as w}from"./index-CTn7D3WU.js";import"./@babel-m2JXyA6a.js";import"./prop-types-LuavYUF2.js";import"./react-dom-rv-KAOpM.js";import"./scheduler-CzFDRTuY.js";import"./react-router-MkLRJz4d.js";import"./@remix-run-BOUEh3jQ.js";import"./lodash.throttle-DkgJ3G11.js";import"./axios-CCb-kr4I.js";import"./react-hot-toast-Dux6v_Wl.js";import"./goober-vt3s6TGe.js";import"./@nextui-org-CLkIIHEi.js";import"./@react-aria-CfXSs2UI.js";import"./@react-stately-ChQ0zIrC.js";import"./clsx-B-dksMZM.js";import"./@swc-DS7M6wx8.js";import"./@internationalized-BB0Nk989.js";import"./framer-motion-BvVSIgoR.js";import"./react-textarea-autosize-bEG1sDiq.js";import"./use-latest-2zZSkz0C.js";import"./use-isomorphic-layout-effect-Co3QFFXf.js";import"./use-composed-ref-BmZZpR7Y.js";import"./tailwind-variants-ayMnMv5e.js";import"./tailwind-merge-Dc5vmgZ1.js";const L=()=>a.jsx("div",{className:"hero",children:a.jsxs("div",{className:"hero-text",children:[a.jsx("h1",{children:"Mabuhay! Ito ang Baybay Salita"}),a.jsx("p",{children:"Isang makabago at dynamic na plataporma sa pag-aaral na naglalayong pahusayin ang kakayahan sa pag-unawa sa pagbasa ng mga estudyanteng Grade 1 sa Taytay Elementary School."})]})}),T=()=>a.jsx("div",{className:"loader_bg",children:a.jsx("div",{className:"loader"})}),p=({subTitle:e,title:s})=>a.jsxs("div",{className:"title",children:[a.jsx("p",{children:e}),a.jsx("h2",{children:s})]}),P="/assets/img23-jZPVYQ9a.png",h="/assets/img4-9RFBjbzX.png",I="/assets/img5-CJVu-DeN.png",B=()=>a.jsxs("div",{className:"services",children:[a.jsxs("div",{className:"service",children:[a.jsx("img",{src:P,alt:""}),a.jsxs("div",{className:"caption",children:[a.jsx(n,{icon:x,size:"4x",inverse:!0,className:"icon"}),a.jsx("p",{children:"Madaling Pag-gamit ng Aplikasyon"})]})]}),a.jsxs("div",{className:"service",children:[a.jsx("img",{src:h,alt:""}),a.jsxs("div",{className:"caption",children:[a.jsx(n,{icon:y,size:"4x",inverse:!0,className:"icon"}),a.jsx("p",{children:"Tulong Sa Pagbaybay ng Salita ng mga bata"})]})]}),a.jsxs("div",{className:"service",children:[a.jsx("img",{src:I,alt:""}),a.jsxs("div",{className:"caption",children:[a.jsx(n,{icon:j,size:"4x",inverse:!0,className:"icon"}),a.jsx("p",{children:"Pagpapalawak sa Kaalaman ng mga bata"})]})]})]}),C=()=>a.jsxs("div",{className:"about",children:[a.jsxs("div",{className:"about-left",children:[a.jsx("img",{src:h,alt:"",className:"about-img"}),a.jsx(n,{icon:b,size:"3x",className:"icon-play"})]}),a.jsxs("div",{className:"about-right",children:[a.jsx("h3",{children:"TUNGKOL SA APLIKASYON"}),a.jsx("h2",{children:"Baybay Salita Aplikasyon"}),a.jsx("p",{children:"Maligayang pagdating sa BAYBAYSALITA, isang makabago at dynamic na plataporma sa pag-aaral na naglalayong pahusayin ang kakayahan sa pag-unawa sa pagbasa ng mga estudyanteng Grade 1 sa Taytay Elementary School. Ang aming misyon ay pagyamanin ang pagmamahal sa pagbabasa at tiyakin na ang bawat batang mag-aaral ay may matibay na pundasyon para sa tagumpay sa edukasyon."}),a.jsx("p",{children:"Sa BAYBAYSALITA, kinikilala namin ang mahalagang papel ng maagang kakayahan sa pagbabasa sa paglalakbay ng isang bata sa edukasyon. Ang aming plataporma ay idinisenyo para sa natatanging pangangailangan ng mga batang Grade 1 sa Pilipinas, na nagbibigay ng nakakaengganyo at makabuluhang nilalaman na kaakibat ng kanilang pang-araw-araw na karanasan. Sa pamamagitan ng mga interaktibong aralin, nakakaakit na mga kwento, at mga personalisadong landas ng pagkatuto, layunin naming gawing masaya at kapaki-pakinabang ang pagbabasa para sa bawat bata."}),a.jsx("p",{children:"Ang aming komprehensibong approach ay pinagsasama ang pinakabagong pananaliksik sa edukasyon at praktikal na mga estratehiya sa pagtuturo upang suportahan ang mga estudyante sa pag-develop ng malakas na kakayahan sa pag-unawa sa pagbasa. Nag-aalok kami ng ibat ibang mapagkukunan, kabilang ang mga digital na libro, interaktibong ehersisyo, at mga tool sa pagtatasa, na lahat ay iniayon sa pangangailangan ng mga batang mambabasa. Sa suporta ng mga dedikadong guro at magulang, ang BAYBAYSALITA ay nagsusumikap na lumikha ng isang sumusuporta at nakakapagpayamang kapaligiran kung saan ang mga estudyante ay maaaring umunlad."})]})]}),M=()=>{const[e,s]=u.useState(""),i=async o=>{o.preventDefault(),s("Sending....");const r=new FormData(o.target);r.append("access_key","458a4527-ac95-47b7-9cc2-f687b3fc2486");const l=await(await fetch("https://api.web3forms.com/submit",{method:"POST",body:r})).json();l.success?(s("Form Submitted Successfully"),o.target.reset()):(console.log("Error",l),s(l.message))};return a.jsxs("div",{className:"contact",children:[a.jsxs("div",{className:"contact-col",children:[a.jsxs("h3",{children:["Mag bigay ng iyong mensahe!"," ",a.jsx(n,{icon:k,size:"1x",className:"message"})]}),a.jsx("p",{children:"Wag mahihiyang magtanong, kami ay inyong bigyan ng mensahe kung meron kayung gustong itanong sa amin. Ang inyong mga pahayag ay mahalaga samin at ito ay gagawin namin para mas mapaayus namin ang serbisyo na hatid namin sa inyo."}),a.jsxs("ul",{children:[a.jsxs("li",{children:[a.jsx(n,{icon:f,size:"1x",className:"img-icon"})," ","baybaysalita@gmail.com"]}),a.jsxs("li",{children:[a.jsx(n,{icon:N,size:"1x",className:"img-icon"})," ","+63 999 XXX XXXX"]}),a.jsxs("li",{children:[a.jsx(n,{icon:v,size:"1x",className:"img-icon"})," ","National University Manila"]})]})]}),a.jsxs("div",{className:"contact-col",children:[a.jsxs("form",{onSubmit:i,children:[a.jsx("label",{htmlFor:"",children:"Iyong Pangalan"}),a.jsx("input",{type:"text",name:"name",placeholder:"Ilagay ang iyong pangalan",required:!0}),a.jsx("label",{htmlFor:"",children:"Telepono"}),a.jsx("input",{type:"tel",name:"phone",placeholder:"Ilagay ang iyong telepono",required:!0}),a.jsx("label",{htmlFor:"",children:"Ang iyong mensahe"}),a.jsx("textarea",{name:"message",id:"message",cols:"30",rows:"6",placeholder:"Ilagay ang iyong mensahe",required:!0}),a.jsxs("button",{type:"submit",className:"btn-home-send img",children:["Ipasa"," ",a.jsx(n,{icon:A,size:"1x",className:"message"})]})]}),a.jsx("span",{children:e})]})]})},z=()=>a.jsxs("div",{className:"footer",children:[a.jsx("p",{children:"© 2024 Baybay Salita. All rights reserved."}),a.jsxs("ul",{children:[a.jsx("li",{children:"Terms of Services"}),a.jsx("li",{children:"Privacy Policy"})]})]}),E="/assets/LogoFinal-CCkmdkQA.png";function F(){const[e,s]=t.useState(!1),[i,o]=t.useState(!1),{user:r,clearCookie:c}=t.useContext(w);t.useEffect(()=>{const m=()=>{window.scrollY>400?s(!0):s(!1)};return window.addEventListener("scroll",m),()=>{window.removeEventListener("scroll",m)}},[]);const l=()=>{o(!i)};return a.jsxs("nav",{className:`container-nav ${e?"dark-nav":""}`,children:[a.jsx("img",{src:E,alt:"",className:"logo"}),a.jsxs("ul",{className:i?"":"hide-mobile-menu",children:[a.jsx("li",{children:a.jsx(g,{to:"hero",smooth:!0,offset:-100,duration:100,className:"cursor-pointer",children:"Home"})}),a.jsx("li",{children:a.jsx(g,{to:"services",smooth:!0,offset:-290,duration:100,className:"cursor-pointer",children:"Services"})}),a.jsx("li",{children:a.jsx(g,{to:"about",smooth:!0,offset:-150,duration:100,className:"cursor-pointer",children:"About"})}),a.jsx("li",{children:a.jsx(g,{to:"contact",smooth:!0,offset:-300,duration:100,className:"cursor-pointer",children:"Contact"})}),r&&a.jsxs(a.Fragment,{children:[a.jsx("li",{children:a.jsx(d,{to:`/${r.role.toLowerCase()}Dashboard`,className:"btn-home",children:"Dashboard"})}),a.jsx("li",{children:a.jsx("button",{onClick:()=>c(),className:"btn-home",children:"Logout"})})]}),!r&&a.jsx("li",{children:a.jsx(d,{to:"/login",className:"btn-home",children:"Login"})})]}),a.jsx(n,{icon:S,size:"2x",className:"menu-icon",onClick:l})]})}const ma=()=>{const[e,s]=t.useState(!0),i=()=>{console.log("Data refreshed")};return t.useEffect(()=>{(()=>{setTimeout(()=>{s(!1),i()},2e3)})(),setTimeout(()=>{i()},2e3)},[]),t.useEffect(()=>{console.log("Component re-rendered or data refreshed")},[e]),e?a.jsx(T,{}):a.jsxs("div",{className:"body-main",children:[a.jsx(F,{}),a.jsx(L,{}),a.jsxs("div",{className:"px-8",children:[a.jsx(p,{subTitle:"Aming Serbisyo",title:"Ang handog namin sa inyo"}),a.jsx(B,{})]}),a.jsx(C,{}),a.jsx(p,{subTitle:"Kami ay kontakin",title:"Tayu'y maging malapit sa isa't-isa"}),a.jsx(M,{}),a.jsx(z,{})]})};export{ma as default};
