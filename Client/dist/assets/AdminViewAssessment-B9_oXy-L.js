import{u as x,c as h,r as d,j as s,a as g,_ as j}from"./index-CTjF65Bf.js";import{A as p}from"./AdminSidebar-LWyvR1-U.js";import{C as N}from"./ContentHeader-BG8XZ0b8.js";import{F as f,d as y}from"./index-BEPVNJaY.js";import{t as i}from"./profile-DzgRJjWV.js";import{b as r}from"./chunk-DBLREEYE-BCf7xM7G.js";import"./useOverlayTriggerState-b4fMS1Sn.js";import"./chunk-CIZQCQPA-p8uCXWEl.js";const u=()=>{const o=x(),{ActivityCode:l}=h(),[a,m]=d.useState({ActivityCode:"",Period:"",Type:"",Title:"",Sentence:"",Questions:[],Items:[]});d.useEffect(()=>{(async()=>{try{const t=await g.get(`/api/getActivity/${l}`);m(t.data)}catch{j.error("Failed to fetch assessment data. Please try again later.")}})()},[l]);const n=(e,t=!1)=>{if(t){const c=new Image;c.src=e,window.open("").document.write(c.outerHTML)}else window.open(e,"_blank")};return s.jsxs("div",{className:"px-9",children:[s.jsxs("div",{className:"flex items-center justify-start gap-2 mb-5",children:[s.jsx("h1",{className:"text-3xl font-semibold",children:"View Assessment"}),s.jsx(i,{showArrow:!0,content:s.jsxs("div",{className:"p-2",children:[s.jsx("div",{className:"text-sm font-bold",children:"View Information"}),s.jsx("div",{className:"text-xs",children:"This section displays the assessment's information."})]}),children:s.jsx(f,{icon:y,className:"text-gray-600"})})]}),s.jsxs("div",{className:"w-full max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-6",children:[s.jsxs("div",{className:"mb-6",children:[s.jsx("h2",{className:"text-2xl font-bold",children:"Assessment Details"}),s.jsxs("p",{className:"text-gray-700",children:[s.jsx("strong",{children:"Activity Code:"})," ",a.ActivityCode||"N/A"]}),s.jsxs("p",{className:"text-gray-700",children:[s.jsx("strong",{children:"Period:"})," ",a.Period||"N/A"]}),s.jsxs("p",{className:"text-gray-700",children:[s.jsx("strong",{children:"Type:"})," ",a.Type||"N/A"]})]}),a.Type==="Pagbabasa"&&s.jsxs("div",{className:"mb-6 bg-gray-100 p-4 rounded-lg shadow",children:[s.jsx("h2",{className:"text-xl font-semibold mb-4",children:"Reading Activity"}),s.jsxs("p",{className:"text-gray-800",children:[s.jsx("strong",{children:"Title:"})," ",a.Title||"N/A"]}),s.jsxs("p",{className:"text-gray-800",children:[s.jsx("strong",{children:"Sentence:"})," ",a.Sentence||"N/A"]})]}),a.Type==="Pagbabasa"&&s.jsxs("div",{children:[s.jsx("h2",{className:"text-xl font-semibold mb-4",children:"Questions"}),a.Questions.length>0?s.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:a.Questions.map((e,t)=>s.jsxs("div",{className:"bg-gray-100 p-4 rounded-lg shadow",children:[s.jsxs("p",{className:"text-gray-800",children:[s.jsxs("strong",{children:["Question ",t+1,":"]})," ",e.Question||"N/A"]}),s.jsxs("p",{className:"text-gray-800",children:[s.jsx("strong",{children:"Answer:"})," ",e.Answer||"N/A"]})]},t))}):s.jsx("p",{className:"text-gray-700",children:"No questions available for this assessment."})]}),a.Type!=="Pagbabasa"&&s.jsxs("div",{children:[s.jsx("h2",{className:"text-xl font-semibold mb-4",children:"Items"}),a.Items.length>0?s.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:a.Items.map((e,t)=>s.jsxs("div",{className:"bg-gray-100 p-4 rounded-lg shadow",children:[s.jsxs("p",{className:"text-gray-800",children:[s.jsx("strong",{children:"Item Code:"})," ",e.ItemCode]}),s.jsxs("p",{className:"text-gray-800",children:[s.jsx("strong",{children:"Word:"})," ",e.Word||"N/A"]}),s.jsxs("div",{className:"flex items-center space-x-4",children:[e.Image&&s.jsx(i,{content:"View Image",children:s.jsx(r,{color:"primary",size:"sm",className:"my-2",onPress:()=>n(e.SecureImage,!0),children:"View Image"})}),e.Audio&&s.jsx(i,{content:"Play Audio",children:s.jsx(r,{color:"primary",size:"sm",className:"my-2",onPress:()=>n(e.SecureAudio),children:"Play Audio"})})]})]},t))}):s.jsx("p",{className:"text-gray-700",children:"No items available for this assessment."})]}),s.jsx("div",{className:"mt-6",children:s.jsx(r,{color:"primary",onPress:()=>o("/adminStudentAssessment"),className:"my-4",children:"Back"})})]})]})},D=()=>s.jsxs("div",{className:"w-full h-full flex",children:[s.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6] shadow-lg",children:s.jsx(p,{})}),s.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[s.jsx(N,{}),s.jsx(u,{})]})]});export{D as default};