import{d as x,u,r as a,U as f,j as e,L as b}from"./index-B79Lp1Sb.js";import{A as h,l as o,B as g,b as p,F as j}from"./index-D4iS7rHE.js";import{l as A}from"./profile-DMRa1GgG.js";import{b as v}from"./chunk-DBLREEYE-C-H-JCr7.js";const y=()=>{const n=x(),i=u(),[r,l]=a.useState(null),{clearCookie:d}=a.useContext(f),m=()=>{d(),i("/")};return a.useEffect(()=>{const t=["/AdminDashboard","/AdminUsers","/adminStudents","/adminStudentAssessment","/adminViewPerformance"].findIndex(c=>c===n.pathname);l(t)},[n.pathname]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col gap-10 px-4 h-11 justify-between",children:[e.jsx("div",{className:"logo-dash pr-1 pt-4",children:e.jsx("img",{src:A,alt:"Baybay Salita Logo"})}),e.jsx("hr",{className:"border-gray-600 border-t-1"}),e.jsx("div",{className:"flex flex-col gap-3 p-3 mb-4",children:[{icon:h,text:"Dashboard",link:"/AdminDashboard"},{icon:o,text:"Manage Users",link:"/AdminUsers"},{icon:o,text:"Student List",link:"/adminStudents"},{icon:g,text:"Manage Assessment",link:"/adminStudentAssessment"},{icon:p,text:"View Performance",link:"/adminViewPerformance"}].map((s,t)=>e.jsxs(b,{to:s.link,className:`flex items-center p-2 font-semibold text-md text-gray-850 hover:bg-blue-100 rounded-md ${t===r?"bg-blue-400 text-white":""}`,children:[e.jsx(j,{icon:s.icon,size:"1x",className:"mr-2"}),s.text]},t))}),e.jsx("div",{className:"flex flex-col px-5",children:e.jsx(v,{color:"error",className:"w-full text-md font-semibold py-3 rounded-lg shadow-md transition-all duration-150 text-white bg-[#ff505b] hover:bg-red-600",onClick:m,children:"Logout"})})]})})};export{y as A};