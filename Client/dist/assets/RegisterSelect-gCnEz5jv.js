import{r as i,j as e}from"./react-BCcS7c0c.js";import{a as x}from"./react-router-MkLRJz4d.js";import{a as p,d as f,e as h,c,b as n}from"./@nextui-org-CLkIIHEi.js";import"./@babel-m2JXyA6a.js";import"./@remix-run-BOUEh3jQ.js";import"./@react-aria-CfXSs2UI.js";import"./@react-stately-ChQ0zIrC.js";import"./react-dom-rv-KAOpM.js";import"./scheduler-CzFDRTuY.js";import"./clsx-B-dksMZM.js";import"./@swc-DS7M6wx8.js";import"./@internationalized-BB0Nk989.js";import"./framer-motion-BvVSIgoR.js";import"./react-textarea-autosize-bEG1sDiq.js";import"./use-latest-2zZSkz0C.js";import"./use-isomorphic-layout-effect-Co3QFFXf.js";import"./use-composed-ref-BmZZpR7Y.js";import"./tailwind-variants-ayMnMv5e.js";import"./tailwind-merge-Dc5vmgZ1.js";const q=()=>{const[s,o]=i.useState([]),[r,a]=i.useState(!0),l=x(),m=()=>{l("/login")},d=()=>{if(s.length===1){const t=s[0];t==="Parent"?l("/registerParent"):t==="Teacher"&&l("/registerTeacher")}else a(!0)};return e.jsx("div",{className:"flex bg-[#f6fbff] w-full h-screen items-center justify-center p-4",children:e.jsx("div",{className:"w-full max-w-lg flex flex-col items-center justify-center",children:e.jsxs(p,{className:"w-full p-6 sm:p-8",children:[e.jsx("h1",{className:"text-2xl sm:text-3xl font-semibold text-center mb-4 text-gray-700",children:"Registration"}),e.jsx("p",{className:"text-sm text-center mb-6",children:"Please fill up the details needed!"}),e.jsx(f,{children:e.jsxs("form",{children:[e.jsxs("div",{className:"flex flex-col items-center justify-center mb-6",children:[e.jsxs(h,{value:s,onChange:t=>{o(t),a(t.length!==1)},orientation:"horizontal",isInvalid:r,className:"space-x-4",children:[e.jsx(c,{value:"Parent",children:"Parent"}),e.jsx(c,{value:"Teacher",children:"Teacher"})]}),r&&e.jsx("p",{className:"text-red-600 text-sm mt-2",children:"Please select exactly one role."})]}),e.jsxs("div",{className:"flex items-center justify-center gap-4",children:[e.jsx(n,{className:"my-2",size:"lg",radius:"md",color:"danger",onClick:m,children:"Cancel"}),e.jsx(n,{type:"button",className:"my-2",size:"lg",radius:"md",color:"primary",onClick:d,disabled:r,children:"Next"})]})]})})]})})})};export{q as default};
