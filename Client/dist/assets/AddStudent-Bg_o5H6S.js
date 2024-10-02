import{r as p,j as e}from"./react-BCcS7c0c.js";import{C as u}from"./ContentHeader-DwIQzFOv.js";import{S as f}from"./Sidebar-DaLC3a38.js";import{F as j,d as g}from"./@fortawesome-BVdY808A.js";import{a as y}from"./axios-CCb-kr4I.js";import{_ as d}from"./react-hot-toast-Dux6v_Wl.js";import{a as N}from"./react-router-MkLRJz4d.js";import{t as b,i as S,s as o,l as a,b as m}from"./@nextui-org-CLkIIHEi.js";import"./@babel-m2JXyA6a.js";import"./index-DzzbZJ-V.js";import"./react-dom-rv-KAOpM.js";import"./scheduler-CzFDRTuY.js";import"./react-router-dom-Dk6_dLEo.js";import"./@remix-run-BOUEh3jQ.js";import"./goober-vt3s6TGe.js";import"./@react-aria-CfXSs2UI.js";import"./@react-stately-ChQ0zIrC.js";import"./clsx-B-dksMZM.js";import"./@swc-DS7M6wx8.js";import"./@internationalized-BB0Nk989.js";import"./framer-motion-BvVSIgoR.js";import"./react-textarea-autosize-bEG1sDiq.js";import"./use-latest-2zZSkz0C.js";import"./use-isomorphic-layout-effect-Co3QFFXf.js";import"./use-composed-ref-BmZZpR7Y.js";import"./tailwind-variants-ayMnMv5e.js";import"./tailwind-merge-Dc5vmgZ1.js";import"./profile-Berhznzr.js";import"./prop-types-LuavYUF2.js";const v=()=>{const i=N(),[s,l]=p.useState({LRN:"",FirstName:"",MiddleName:"",LastName:"",Level:"",Section:"",Birthday:"",Address:"",MotherTongue:"",Gender:"",ContactNumber:""}),c=t=>{const{name:r,value:n}=t.target;if(r==="LRN"){const x=n.replace(/[^0-9]/g,"").slice(0,12);l({...s,[r]:x})}else l({...s,[r]:n})},h=async t=>{t.preventDefault();try{const r=await y.post("/api/addStudent",s);r.data.error?d.error(r.data.error):(l({}),d.success("Added Student info Successfully."),i("/manageStudent"))}catch(r){console.error(r),d.error("Failed to add student. Please try again.")}};return e.jsx("div",{className:"container mx-auto px-6 pt-[4rem]",children:e.jsxs("div",{className:"bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 flex flex-col",children:[e.jsxs("h2",{className:"mb-6 text-3xl font-bold text-gray-700 flex items-center gap-2",children:["Add Student's Information",e.jsx(b,{showArrow:!0,content:e.jsxs("div",{className:"px-1 py-2",children:[e.jsx("div",{className:"text-small font-bold",children:"Add Student"}),e.jsx("div",{className:"text-tiny",children:"This function will add the information of the students in the system."})]}),children:e.jsx(j,{icon:g,size:"sm",className:"text-gray-700 text-[20px]"})})]}),e.jsxs("form",{onSubmit:h,children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[[{label:"LRN",type:"text",placeholder:"Enter student's LRN",name:"LRN",maxLength:12},{label:"First Name",type:"text",placeholder:"Enter the First Name",name:"FirstName"},{label:"Last Name",type:"text",placeholder:"Enter the Last Name",name:"LastName"},{label:"Birthday",type:"date",name:"Birthday"},{label:"Address",type:"text",placeholder:"Enter the Address",name:"Address"},{label:"Mother Tongue",type:"text",placeholder:"Enter the Mother Tongue",name:"MotherTongue"}].map((t,r)=>e.jsxs("div",{children:[e.jsx("label",{className:"font-medium text-gray-700",children:t.label}),e.jsx(S,{underlined:!0,clearable:!0,bordered:!0,fullWidth:!0,type:t.type,placeholder:t.placeholder,value:s[t.name],onChange:c,name:t.name,maxLength:t.maxLength||void 0})]},r)),e.jsxs("div",{children:[e.jsx("label",{className:"font-medium text-gray-700",children:"Section"}),e.jsxs(o,{placeholder:"Select your section",className:"bg-transparent py-1 my-1",value:s.Section,onChange:t=>l({...s,Section:t.target.value}),children:[e.jsx(a,{disabled:!0,children:"Select Section"},""),e.jsx(a,{children:"Aster"},"Aster"),e.jsx(a,{children:"Camia"},"Camia"),e.jsx(a,{children:"Dahlia"},"Dahlia"),e.jsx(a,{children:"Iris"},"Iris"),e.jsx(a,{children:"Jasmin"},"Jasmin"),e.jsx(a,{children:"Orchid"},"Orchid"),e.jsx(a,{children:"Rose"},"Rose"),e.jsx(a,{children:"Tulip"},"Tulip"),e.jsx(a,{children:"SSC"},"SSC")]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"font-medium text-gray-700",children:"Gender"}),e.jsxs(o,{name:"Gender",placeholder:"Select your gender",className:"bg-transparent py-1 my-1",value:s.Gender,onChange:t=>l({...s,Gender:t.target.value}),children:[e.jsx(a,{disabled:!0,children:"Select Gender"},""),e.jsx(a,{children:"Male"},"Male"),e.jsx(a,{children:"Female"},"Female"),e.jsx(a,{children:"Other"},"Other")]})]})]}),e.jsxs("div",{className:"mt-6 items-center flex flex-row justify-end gap-2",children:[e.jsx(m,{type:"submit",color:"primary",auto:!0,ghost:!0,children:"Add Student"}),e.jsx(m,{flat:!0,auto:!0,color:"danger",variant:"light",onClick:()=>i(-1),children:"Cancel"})]})]})]})})},$=()=>e.jsxs("div",{className:"w-full h-full flex",children:[e.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6]",children:e.jsx(f,{})}),e.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[e.jsx(u,{}),e.jsx(v,{})]})]});export{$ as default};
