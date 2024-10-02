import{r as p,j as e}from"./react-BCcS7c0c.js";import{a as V}from"./axios-CCb-kr4I.js";import{n as u}from"./react-hot-toast-Dux6v_Wl.js";import{F as o,l as y,m as O,n as T,f as $,a as C,b as S}from"./@fortawesome-BVdY808A.js";import{a as J}from"./react-router-MkLRJz4d.js";import{a as U,d as W,i as d,s as f,l as r,b as w}from"./@nextui-org-CLkIIHEi.js";import"./@babel-m2JXyA6a.js";import"./goober-vt3s6TGe.js";import"./prop-types-LuavYUF2.js";import"./@remix-run-BOUEh3jQ.js";import"./@react-aria-CfXSs2UI.js";import"./@react-stately-ChQ0zIrC.js";import"./react-dom-rv-KAOpM.js";import"./scheduler-CzFDRTuY.js";import"./clsx-B-dksMZM.js";import"./@swc-DS7M6wx8.js";import"./@internationalized-BB0Nk989.js";import"./framer-motion-BvVSIgoR.js";import"./react-textarea-autosize-bEG1sDiq.js";import"./use-latest-2zZSkz0C.js";import"./use-isomorphic-layout-effect-Co3QFFXf.js";import"./use-composed-ref-BmZZpR7Y.js";import"./tailwind-variants-ayMnMv5e.js";import"./tailwind-merge-Dc5vmgZ1.js";const ge=()=>{const[a,i]=p.useState({FirstName:"",LastName:"",Section:"",Department:"",Birthday:"",Gender:"",Address:"",Status:"",ContactNumber:"",email:"",password:"",confirmPassword:""}),[s,P]=p.useState({}),v=J(),[h,I]=p.useState(!1),D=()=>I(!h),[g,F]=p.useState(!1),A=()=>F(!g);function L(t){return!isNaN(t)}function M(t){const l=[],x=/[A-Z]/.test(t),m=/[a-z]/.test(t),b=/\d/.test(t),N=/[!@#$%^&*(),.?":{}|<>]/.test(t);return t?(t.length<8&&l.push("Password must be at least 8 characters long."),x||l.push("Password must contain at least one uppercase letter."),m||l.push("Password must contain at least one lowercase letter."),b||l.push("Password must contain at least one digit."),N||l.push("Password must contain at least one special character."),l.length>0?l.join(" "):null):"Password is required."}const k=()=>{let t=!0,n={};a.FirstName||(n.FirstName="First Name is required",t=!1),a.LastName||(n.LastName="Last Name is required",t=!1),a.Section||(n.Section="Section is required",t=!1),a.Department||(n.Department="Department is required",t=!1),a.Birthday||(n.Birthday="Birthday is required",t=!1),a.Gender||(n.Gender="Gender is required",t=!1),a.Address||(n.Address="Address is required",t=!1),a.Status||(n.Status="Status is required",t=!1),a.ContactNumber||(n.ContactNumber="Contact Number is required",t=!1),L(a.ContactNumber)||(n.ContactNumber="Invalid Contact Number",t=!1),/^09\d{9}$/.test(a.ContactNumber)||(n.ContactNumber="Enter PH Contact number",t=!1),a.email||(n.email="Email is required",t=!1),/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email)||(n.email="Invalid email format.");const m=M(a.password);return m?(n.password=m,t=!1):a.password!==a.confirmPassword&&(n.confirmPassword="Passwords do not match.",t=!1),P(n),t},E=async t=>{if(t.preventDefault(),!k()){u.error("Please fix the errors in the form.");return}const{FirstName:n,LastName:l,Section:x,Department:m,Birthday:b,Address:N,Status:G,Gender:q,ContactNumber:B,email:R,password:j,confirmPassword:_}=a;if(j!==_){u.error("Passwords do not match");return}try{const c=await V.post("/api/registerTeacher",{FirstName:n,LastName:l,Section:x,Department:m,Birthday:b,Address:N,Status:G,Gender:q,ContactNumber:B,email:R,password:j});c.data.error?u.error(c.data.error):(i({}),u.success(c.data.message),localStorage.setItem("userId",c.data.data.userId),v("/verifyEmail"))}catch(c){console.log(c),u.error("An error occurred. Please try again.")}};return e.jsx("div",{className:"flex bg-[#f6fbff] w-full items-center min-h-screen p-4 md:p-8",children:e.jsx("div",{className:"w-full max-w-4xl mx-auto",children:e.jsxs(U,{className:"w-full flex flex-col p-4",children:[e.jsx("h1",{className:"text-2xl md:text-3xl font-bold text-center",children:"Teacher Registration"}),e.jsx("p",{className:"text-sm text-center mb-4",children:"Please fill up the details needed!"}),e.jsx(W,{children:e.jsxs("form",{onSubmit:E,children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsx(d,{type:"text",name:"FirstName",label:"First Name",variant:"bordered",className:"bg-transparent py-1 my-1",value:a.FirstName,onChange:t=>i({...a,FirstName:t.target.value}),errorMessage:s.FirstName,isInvalid:!!s.FirstName,endContent:e.jsx(o,{icon:y,className:"text-xl md:text-2xl text-default-400 pointer-events-none flex-shrink-0"})}),e.jsx(d,{type:"text",name:"LastName",label:"Last Name",variant:"bordered",className:"bg-transparent py-1 my-1",value:a.LastName,onChange:t=>i({...a,LastName:t.target.value}),errorMessage:s.LastName,isInvalid:!!s.LastName,endContent:e.jsx(o,{icon:y,className:"text-xl md:text-2xl text-default-400 pointer-events-none flex-shrink-0"})}),e.jsxs(f,{label:"Section",placeholder:"Select your section",variant:"bordered",className:"bg-transparent py-1 my-1",value:a.Section,onChange:t=>i({...a,Section:t.target.value}),errorMessage:s.Section,isInvalid:!!s.Section,children:[e.jsx(r,{disabled:!0,children:"Select Section"},""),e.jsx(r,{children:"Aster"},"Aster"),e.jsx(r,{children:"Camia"},"Camia"),e.jsx(r,{children:"Dahlia"},"Dahlia"),e.jsx(r,{children:"Iris"},"Iris"),e.jsx(r,{children:"Jasmin"},"Jasmin"),e.jsx(r,{children:"Orchid"},"Orchid"),e.jsx(r,{children:"Rose"},"Rose"),e.jsx(r,{children:"Tulip"},"Tulip"),e.jsx(r,{children:"SSC"},"SSC")]}),e.jsxs(f,{label:"Department",placeholder:"Select your department",variant:"bordered",className:"bg-transparent py-1 my-1",value:a.Department,onChange:t=>i({...a,Department:t.target.value}),errorMessage:s.Department,isInvalid:!!s.Department,children:[e.jsx(r,{disabled:!0,children:"Select Department"},""),e.jsx(r,{children:"Filipino"},"Filipino")]}),e.jsx(d,{className:"pt-2",type:"date",label:"Birthday",variant:"bordered",value:a.Birthday,onChange:t=>i({...a,Birthday:t.target.value}),errorMessage:s.Birthday,isInvalid:!!s.Birthday}),e.jsxs(f,{label:"Gender",name:"Gender",placeholder:"Select your gender",variant:"bordered",className:"bg-transparent py-1 my-1",value:a.Gender,onChange:t=>i({...a,Gender:t.target.value}),errorMessage:s.Gender,isInvalid:!!s.Gender,children:[e.jsx(r,{disabled:!0,children:"Select Gender"},""),e.jsx(r,{children:"Male"},"Male"),e.jsx(r,{children:"Female"},"Female"),e.jsx(r,{children:"Other"},"Other")]}),e.jsx(d,{type:"text",name:"Address",label:"Address",variant:"bordered",className:"bg-transparent py-1 my-1",value:a.Address,onChange:t=>i({...a,Address:t.target.value}),errorMessage:s.Address,isInvalid:!!s.Address,endContent:e.jsx(o,{icon:O,className:"text-xl md:text-2xl text-default-400 pointer-events-none flex-shrink-0"})}),e.jsxs(f,{label:"Status",name:"Status",placeholder:"Select your status",variant:"bordered",className:"bg-transparent py-1 my-1",value:a.Status,onChange:t=>i({...a,Status:t.target.value}),errorMessage:s.Status,isInvalid:!!s.Status,children:[e.jsx(r,{disabled:!0,children:"Select Status"},""),e.jsx(r,{children:"Single"},"Single"),e.jsx(r,{children:"Married"},"Married"),e.jsx(r,{children:"Widowed"},"Widowed"),e.jsx(r,{children:"Separated"},"Separated"),e.jsx(r,{children:"Other"},"Other")]}),e.jsx(d,{type:"text",name:"ContactNumber",label:"Contact Number",maxLength:11,variant:"bordered",className:"bg-transparent py-1 my-1",value:a.ContactNumber,onChange:t=>i({...a,ContactNumber:t.target.value}),errorMessage:s.ContactNumber,isInvalid:!!s.ContactNumber,endContent:e.jsx(o,{icon:T,className:"text-xl md:text-2xl text-default-400 pointer-events-none flex-shrink-0"})}),e.jsx(d,{type:"text",name:"email",label:"Email",variant:"bordered",className:"bg-transparent py-1 my-1",value:a.email,onChange:t=>i({...a,email:t.target.value}),errorMessage:s.email,isInvalid:!!s.email,endContent:e.jsx(o,{icon:$,className:"text-xl md:text-2xl text-default-400 pointer-events-none flex-shrink-0"})})]}),e.jsxs("div",{className:"mt-2",children:[e.jsx(d,{name:"password",label:"Password",variant:"bordered",className:"bg-transparent py-1 my-1",value:a.password,onChange:t=>i({...a,password:t.target.value}),errorMessage:s.password,isInvalid:!!s.password,endContent:e.jsx("button",{className:"focus:outline-none",type:"button",onClick:D,"aria-label":"toggle password visibility",children:h?e.jsx(o,{icon:C,className:"text-xl md:text-2xl text-default-400 pointer-events-none flex-shrink-0"}):e.jsx(o,{icon:S,className:"text-xl md:text-2xl text-default-400 pointer-events-none flex-shrink-0"})}),type:h?"text":"password"}),e.jsx(d,{name:"confirmPassword",label:"Confirm Password",variant:"bordered",className:"bg-transparent py-1 my-1",endContent:e.jsx("button",{className:"focus:outline-none",type:"button",onClick:A,"aria-label":"toggle password visibility",children:g?e.jsx(o,{icon:C,className:"text-xl md:text-2xl text-default-400 pointer-events-none flex-shrink-0"}):e.jsx(o,{icon:S,className:"text-xl md:text-2xl text-default-400 pointer-events-none flex-shrink-0"})}),type:g?"text":"password",value:a.confirmPassword,onChange:t=>i({...a,confirmPassword:t.target.value}),errorMessage:s.confirmPassword,isInvalid:!!s.confirmPassword})]}),e.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-center gap-4 mt-6",children:[e.jsx(w,{className:"w-full md:w-1/2 text-md",color:"danger",onClick:()=>v(-1),children:"Cancel"}),e.jsx(w,{type:"submit",className:"w-full md:w-1/2 text-md",color:"primary",children:"Submit"})]})]})})]})})})};export{ge as default};
