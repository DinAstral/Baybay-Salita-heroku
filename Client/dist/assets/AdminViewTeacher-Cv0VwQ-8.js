import{r,j as e}from"./react-BCcS7c0c.js";import{A as N}from"./AdminSidebar-D1UWcytW.js";import{p as f}from"./profile-Berhznzr.js";import{F as i,d as j,k as g,f as u}from"./@fortawesome-BVdY808A.js";import{a as v}from"./axios-CCb-kr4I.js";import{_ as b}from"./react-hot-toast-Dux6v_Wl.js";import{b as y,a as A,g as w}from"./react-router-MkLRJz4d.js";import{t as I,b as l}from"./@nextui-org-CLkIIHEi.js";import{C as k}from"./ContentHeader-DwIQzFOv.js";import"./@babel-m2JXyA6a.js";import"./react-router-dom-Dk6_dLEo.js";import"./react-dom-rv-KAOpM.js";import"./scheduler-CzFDRTuY.js";import"./@remix-run-BOUEh3jQ.js";import"./index-DzzbZJ-V.js";import"./goober-vt3s6TGe.js";import"./@react-aria-CfXSs2UI.js";import"./@react-stately-ChQ0zIrC.js";import"./clsx-B-dksMZM.js";import"./@swc-DS7M6wx8.js";import"./@internationalized-BB0Nk989.js";import"./framer-motion-BvVSIgoR.js";import"./react-textarea-autosize-bEG1sDiq.js";import"./use-latest-2zZSkz0C.js";import"./use-isomorphic-layout-effect-Co3QFFXf.js";import"./use-composed-ref-BmZZpR7Y.js";import"./tailwind-variants-ayMnMv5e.js";import"./tailwind-merge-Dc5vmgZ1.js";import"./prop-types-LuavYUF2.js";const C=()=>{const c=y(),o=A(),{UserID:m}=w(),[t,n]=r.useState(0),[s,x]=r.useState({_id:"",UserID:"",FirstName:"",LastName:"",Section:"",Department:"",Age:"",Birthday:"",Gender:"",Address:"",Status:"",Nationality:"",ContactNumber:"",email:""});r.useEffect(()=>{v.get(`/api/getTeacher/${m}`).then(a=>{x(a.data)}).catch(a=>{b.error("Failed to fetch teacher data. Please try again later.")})},[m]),r.useEffect(()=>{const h=[`/adminViewTeacher/${s==null?void 0:s.UserID}`].findIndex(p=>p===c.pathname);n(h)},[s==null?void 0:s.UserID,c.pathname]);const d=a=>{n(a)};return e.jsxs("div",{className:"p-10",children:[e.jsxs("div",{className:"flex items-center justify-start gap-2 mb-5 ",children:[e.jsx("h1",{className:"text-3xl font-semibold",children:"View Teacher Profile"}),e.jsx(I,{showArrow:!0,content:e.jsxs("div",{className:"p-2",children:[e.jsx("div",{className:"text-sm font-bold",children:"View Information"}),e.jsx("div",{className:"text-xs",children:"This function will view the teacher's information in the system."})]}),children:e.jsx(i,{icon:j,className:"text-gray-600"})})]}),e.jsxs("div",{className:"w-full max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-[3rem]",children:[e.jsxs("div",{className:"flex flex-col md:flex-row items-center md:items-start gap-6",children:[e.jsx("img",{src:f,className:"w-32 h-32 rounded-full",alt:"Profile"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("h2",{className:"text-2xl font-bold",children:s.FirstName&&s.LastName?`${s.FirstName} ${s.LastName}`:"Teacher Name"}),e.jsx("h4",{children:s.Section?`Section: ${s.Section}`:"Teacher of section"}),e.jsxs("div",{className:"flex flex-col mt-4 text-gray-700",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(i,{icon:g,className:"text-gray-600"}),e.jsxs("span",{children:["Teacher ID Number: ",s.UserID||"N/A"]})]}),e.jsxs("div",{className:"flex items-center gap-2 mt-2",children:[e.jsx(i,{icon:u,className:"text-gray-600"}),e.jsxs("span",{children:["Email Address: ",s.email||"N/A"]})]})]})]}),e.jsx(l,{color:"primary",className:"w-[120px] text-md p-1",onClick:()=>o(-1),children:"Back"})]}),e.jsxs("div",{className:"mt-8",children:[e.jsxs("div",{className:"flex gap-6 border-b pb-2",children:[e.jsx(l,{variant:"light",radius:"none",className:`text-md font-medium ${t===0?"border-b-4 border-blue-500":""}`,onClick:()=>d(0),children:"Basic Information"}),e.jsx(l,{variant:"light",radius:"none",className:`text-md font-medium ${t===1?"border-b-4 border-blue-500":""}`,onClick:()=>d(1),children:"Education Attainment"})]}),t===0&&e.jsx("div",{className:"mt-6 bg-[#faf9f4] p-6 rounded-lg shadow",children:e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"First Name:"}),e.jsx("p",{className:"text-gray-800",children:s.FirstName||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Last Name:"}),e.jsx("p",{className:"text-gray-800",children:s.LastName||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Nationality:"}),e.jsx("p",{className:"text-gray-800",children:s.Nationality||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Civil Status:"}),e.jsx("p",{className:"text-gray-800",children:s.Status||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Gender:"}),e.jsx("p",{className:"text-gray-800",children:s.Gender||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Birthday:"}),e.jsx("p",{className:"text-gray-800",children:s.Birthday||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Contact Number:"}),e.jsx("p",{className:"text-gray-800",children:s.ContactNumber||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Address:"}),e.jsx("p",{className:"text-gray-800",children:s.Address||"N/A"})]})]})}),t===1&&e.jsx("div",{className:"mt-6 bg-[#f9f9f9] p-6 rounded-lg shadow",children:e.jsx("p",{children:"Education Attainment information goes here..."})})]})]})]})},te=()=>e.jsxs("div",{className:"w-full h-full flex",children:[e.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6]",children:e.jsx(N,{})}),e.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[e.jsx(k,{}),e.jsx(C,{})]})]});export{te as default};
