import{r as a,j as e}from"./react-BCcS7c0c.js";import{z as x,l as o,A as f,b as u,F as p}from"./@fortawesome-BVdY808A.js";import{L as h}from"./react-router-dom-Dk6_dLEo.js";import{l as b}from"./profile-Berhznzr.js";import{U as g}from"./index-CTn7D3WU.js";import{b as j,a as A}from"./react-router-MkLRJz4d.js";import{b as v}from"./@nextui-org-CLkIIHEi.js";const U=()=>{const n=j(),i=A(),[r,m]=a.useState(null),{clearCookie:l}=a.useContext(g),d=()=>{l(),i("/")};return a.useEffect(()=>{const s=["/AdminDashboard","/AdminUsers","/adminStudents","/adminStudentAssessment","/adminViewPerformance"].findIndex(c=>c===n.pathname);m(s)},[n.pathname]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col gap-10 px-4 h-11 justify-between",children:[e.jsx("div",{className:"logo-dash pr-1",children:e.jsx("img",{src:b,alt:"Baybay Salita Logo"})}),e.jsx("div",{className:"flex flex-col gap-3 p-3",children:[{icon:x,text:"Dashboard",link:"/AdminDashboard"},{icon:o,text:"Manage Users",link:"/AdminUsers"},{icon:o,text:"Student List",link:"/adminStudents"},{icon:f,text:"Manage Assessment",link:"/adminStudentAssessment"},{icon:u,text:"View Performance",link:"/adminViewPerformance"}].map((t,s)=>e.jsxs(h,{to:t.link,className:`flex items-center p-2 font-semibold text-md text-gray-850 hover:bg-blue-100 rounded-md ${s===r?"bg-blue-400 text-white":""}`,children:[e.jsx(p,{icon:t.icon,size:"1x",className:"mr-2"}),t.text]},s))}),e.jsx("div",{className:"flex flex-col px-5",children:e.jsx(v,{color:"error",className:"w-full text-md font-semibold py-3 rounded-lg shadow-md transition-all duration-150 text-white bg-[#ff505b] hover:bg-red-600",onClick:d,children:"Logout"})})]})})};export{U as A};
