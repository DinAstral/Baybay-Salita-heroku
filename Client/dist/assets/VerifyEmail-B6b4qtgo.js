import{u,r as m,j as e,n as r,a as x}from"./index-BIpMVIIL.js";import{F as p,c as g}from"./index-CvjLAEGH.js";import{c as h,a as y}from"./chunk-H4VOEXHF-BrnBFhy3.js";import{i as j}from"./chunk-GQQM5TNQ-BdBGmm4A.js";import{b}from"./chunk-DBLREEYE-K5Ru5l8H.js";import"./chunk-CAFRINWI-CMvs8fyY.js";import"./useFormReset-BTRTa68U.js";import"./useField-DFHvYu13.js";import"./useLabels-C_TwE3HU.js";const k=({verificationType:a="email"})=>{const f=u(),[i,l]=m.useState(""),[o,n]=m.useState(!1),d=async s=>{s.preventDefault();const c=localStorage.getItem("userId");if(!c){r.error("User ID is missing. Please try registering again.");return}n(!0);try{const t=await x.post("/api/verify",{userId:c,otp:i});t.data.error?r.error(t.data.error):(l(""),r.success("Verification successful. Please log in."),f("/login"))}catch(t){console.error(t),r.error("An error occurred during verification. Please try again.")}finally{n(!1)}};return e.jsx("div",{className:"flex bg-[#f6fbff] w-full h-screen justify-center items-center",children:e.jsx("div",{className:"w-full max-w-md px-6 sm:px-8 lg:px-12",children:e.jsxs(h,{className:"p-6",children:[e.jsxs("h1",{className:"text-2xl lg:text-3xl font-bold text-center",children:["Verify ",a==="email"?"Email":"Phone"]}),e.jsxs("p",{className:"text-sm text-center mt-2",children:["Please enter the OTP code sent to your ",a," for verification."]}),e.jsx(y,{children:e.jsxs("form",{onSubmit:d,children:[e.jsx("div",{className:"flex flex-col gap-4",children:e.jsx(j,{type:"text",label:"Enter the code",variant:"bordered",className:"bg-transparent py-1 my-1",value:i,onChange:s=>l(s.target.value),required:!0,endContent:e.jsx(p,{icon:g,className:"text-xl text-default-400 flex-shrink-0"})})}),e.jsx("div",{className:"w-full flex items-center justify-center gap-6 mt-6",children:e.jsx(b,{type:"submit",className:"w-full sm:w-auto",size:"lg",radius:"md",color:"primary",disabled:o,children:o?"Verifying...":"Submit"})})]})})]})})})};export{k as default};
