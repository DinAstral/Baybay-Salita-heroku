import{u,r as g,j as e,_ as d,a as j}from"./index-BeTcVfSM.js";import{A as N}from"./AdminSidebar-CxSN793A.js";import{F as v,d as b}from"./index-CQ-r-5AQ.js";import{t as w}from"./profile-D4OwERSw.js";import{i as n}from"./chunk-GQQM5TNQ-8rat9Odn.js";import{s as A,l as h}from"./chunk-CEHIK4GH-6ZP7awBo.js";import{b as y}from"./chunk-DBLREEYE-BzKuSura.js";import{C as U}from"./ContentHeader-Ba5-KcvI.js";import"./useOverlayTriggerState-efY3q-2i.js";import"./chunk-CIZQCQPA-DGk942z1.js";import"./chunk-CAFRINWI-CMvs8fyY.js";import"./useFormReset-CRh2bn8n.js";import"./useField-Ddeb4sCA.js";import"./useLabels-CUB2NPeE.js";import"./useDialog-BT8fesRI.js";import"./VisuallyHidden-DjJdtpt7.js";import"./Overlay-BQdpL7pO.js";function _(m,r){const s="0123456789";let t="";switch(m){case"Parent":t="parentID_";break;case"Teacher":t="teacherID_";break;case"Admin":t="adminID_";break}let a=t;const o=s.length;for(let l=0;l<r;l++)a+=s.charAt(Math.floor(Math.random()*o));return a}const D=()=>{const m=u(),[r,s]=g.useState({UserID:"",firstName:"",lastName:"",email:"",password:"",role:""}),t=async a=>{a.preventDefault();const{firstName:o,lastName:l,email:p,password:x,role:c}=r;if(!o||!l||!p||!x||!c){d.error("All fields are required.");return}const f=_(c,6);try{const i=await j.post("/api/addUser",{UserID:f,firstName:o,lastName:l,email:p,password:x,role:c});i.data.error?d.error(i.data.error):(s({UserID:"",firstName:"",lastName:"",email:"",password:"",role:""}),d.success("User added successfully."),m("/adminUsers"))}catch(i){console.error("There was an error adding the user:",i),d.error("Failed to add user. Please try again later.")}};return e.jsx("div",{className:"container mx-auto px-6 pt-[4rem]",children:e.jsxs("div",{className:"bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 flex flex-col",children:[e.jsxs("h2",{className:"mb-6 text-3xl font-bold text-gray-700 flex items-center gap-2",children:["Add User's Information",e.jsx(w,{showArrow:!0,content:e.jsxs("div",{className:"px-1 py-2",children:[e.jsx("div",{className:"text-small font-bold",children:"Add User"}),e.jsx("div",{className:"text-tiny",children:"This function will add the information of the user to the system."})]}),children:e.jsx(v,{icon:b,size:"sm",className:"text-gray-700 text-[20px]"})})]}),e.jsxs("form",{onSubmit:t,children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsx(n,{label:"First Name",type:"text",placeholder:"Enter First Name",value:r.firstName,onChange:a=>s({...r,firstName:a.target.value})}),e.jsx(n,{label:"Last Name",type:"text",placeholder:"Enter Last Name",value:r.lastName,onChange:a=>s({...r,lastName:a.target.value})}),e.jsx(n,{label:"Email",type:"email",placeholder:"Enter Email",value:r.email,onChange:a=>s({...r,email:a.target.value})}),e.jsx(n,{label:"Password",type:"password",placeholder:"Set Password",value:r.password,onChange:a=>s({...r,password:a.target.value})}),e.jsxs(A,{label:"Role",placeholder:"Select Role",value:r.role,onChange:a=>s({...r,role:a}),children:[e.jsx(h,{value:"Admin",children:"Admin"},"Admin"),e.jsx(h,{value:"Teacher",children:"Teacher"},"Teacher"),e.jsx(h,{value:"Parent",children:"Parent"},"Parent")]})]}),e.jsx("div",{className:"mt-6",children:e.jsx(y,{type:"submit",color:"primary",size:"lg",radius:"sm",children:"Add User"})})]})]})})},K=()=>e.jsxs("div",{className:"w-full h-full flex",children:[e.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6] shadow-lg",children:e.jsx(N,{})}),e.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[e.jsx(U,{}),e.jsx(D,{})]})]});export{K as default};
