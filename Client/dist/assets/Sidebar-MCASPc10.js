import{d as x,u,r as s,U as f,j as e,L as g}from"./index-BIpMVIIL.js";import{A as h,l as b,B as p,b as o,F as j}from"./index-CvjLAEGH.js";import{l as v}from"./profile-ceLACK_d.js";import{b as S}from"./chunk-DBLREEYE-K5Ru5l8H.js";const A=()=>{const n=x(),r=u(),[l,i]=s.useState(null),{clearCookie:c}=s.useContext(f),d=()=>{c(),r("/")};return s.useEffect(()=>{const t=["/teacherDashboard","/manageStudent","/addStudent","/viewAssessment","/managePerformance"].findIndex(m=>m===n.pathname);i(t)},[n.pathname]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col gap-10 px-4 h-11 justify-between",children:[e.jsx("div",{className:"logo-dash pr-1",children:e.jsx("img",{src:v,alt:"Baybay Salita Logo"})}),e.jsx("hr",{className:"border-gray-600 border-t-1"}),e.jsx("div",{className:"flex flex-col gap-3 p-3",children:[{icon:h,text:"Dashboard",link:"/teacherDashboard"},{icon:b,text:"Manage Student",link:"/manageStudent"},{icon:p,text:"Add Student",link:"/addStudent"},{icon:o,text:"Manage Assessment",link:"/viewAssessment"},{icon:o,text:"Manage Performance",link:"/managePerformance"}].map((a,t)=>e.jsxs(g,{to:a.link,className:`flex items-center p-2 font-semibold text-md text-gray-850 hover:bg-blue-100 rounded-md ${t===l?"bg-blue-400 text-white":""}`,children:[e.jsx(j,{icon:a.icon,size:"1x",className:"mr-2"}),a.text]},t))}),e.jsx("div",{className:"flex flex-col px-5",children:e.jsx(S,{color:"error",className:"w-full text-md font-semibold py-3 rounded-lg shadow-md transition-all duration-150 text-white bg-[#ff505b] hover:bg-red-600",onClick:d,children:"Logout"})})]})})};export{A as S};