import{u as c,r as l,U as d,c as m,j as e,a as x,_ as h}from"./index-Des4AIX5.js";import{A as f}from"./AdminSidebar-vkG0z9xr.js";import{C as p}from"./ContentHeader-DTj2bybd.js";import{F as u,d as j}from"./index-DtQijlPs.js";import{t as o}from"./profile-VtPcnlpD.js";import{b as i}from"./chunk-DBLREEYE-a1DeREyM.js";import"./useOverlayTriggerState-BLWYedV7.js";import"./chunk-CIZQCQPA-DaoMnn2M.js";const N=t=>{const s=parseInt(t,10);if(isNaN(s))return"Not applicable";const n=Math.floor(s/60),a=s%60;return`${n}:${a<10?"0":""}${a} min`},g=()=>{c(),l.useState(!1),l.useContext(d);const{UserInputId:t}=m(),[s,n]=l.useState({UserInputId:"",LRN:"",Section:"",ActivityCode:"",Type:"",PerformanceItems:[],Questions:[],Score:"",TimeRead:""});return l.useEffect(()=>{(async()=>{try{const r=await x.get(`/api/getPerformance/${t}`);n(r.data)}catch{h.error("Failed to fetch performance data. Please try again later.")}})()},[t]),e.jsxs("div",{className:"p-10",children:[e.jsxs("div",{className:"flex items-center justify-start gap-2 mb-5",children:[e.jsx("h1",{className:"text-3xl font-semibold",children:"View Performance"}),e.jsx(o,{showArrow:!0,content:e.jsxs("div",{className:"p-2",children:[e.jsx("div",{className:"text-sm font-bold",children:"View Student Performance"}),e.jsx("div",{className:"text-xs",children:"This section displays the student's performance."})]}),children:e.jsx(u,{icon:j,className:"text-gray-600"})})]}),e.jsxs("div",{className:"w-full max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-6",children:[e.jsxs("div",{className:"mb-6",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Assessment Details"}),e.jsxs("p",{className:"text-gray-700",children:[e.jsx("strong",{children:"Activity Code:"})," ",s.ActivityCode||"N/A"]}),e.jsxs("p",{className:"text-gray-700",children:[e.jsx("strong",{children:"LRN:"})," ",s.LRN||"N/A"]}),e.jsxs("p",{className:"text-gray-700",children:[e.jsx("strong",{children:"Section:"})," ",s.Section||"N/A"]}),e.jsxs("p",{className:"text-gray-700",children:[e.jsx("strong",{children:"Type:"})," ",s.Type||"N/A"]})]}),s.Type==="Pagbabasa"&&e.jsxs("div",{className:"mb-6",children:[e.jsx("h2",{className:"text-xl font-semibold mb-4",children:"Questions and Answers"}),e.jsxs("p",{className:"text-gray-700",children:[e.jsx("strong",{children:"Score:"})," ",s.Score||"N/A"]}),e.jsxs("p",{className:"text-gray-700",children:[e.jsx("strong",{children:"Time Read:"})," ",N(s.TimeRead)]}),s.Questions&&s.Questions.length>0?e.jsx("ul",{className:"list-none pl-0 space-y-4",children:s.Questions.map((a,r)=>e.jsxs("li",{className:"bg-gray-100 p-4 rounded-lg shadow",children:[e.jsxs("p",{className:"text-gray-800",children:[e.jsxs("strong",{children:["Question ",r+1,":"]})," ",a.Question||"N/A"]}),e.jsxs("p",{className:"text-gray-800",children:[e.jsx("strong",{children:"Answer:"})," ",a.Answer||"N/A"]})]},r))}):e.jsx("p",{className:"text-gray-700",children:"No questions available for this assessment."})]}),s.Type!=="Pagbabasa"&&e.jsxs("div",{children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Items"}),s.PerformanceItems&&s.PerformanceItems.length>0?e.jsx("ul",{className:"list-none pl-0 space-y-4",children:s.PerformanceItems.map((a,r)=>e.jsxs("li",{className:"bg-gray-100 p-4 rounded-lg shadow",children:[e.jsxs("p",{className:"text-gray-800",children:[e.jsx("strong",{children:"Item Code:"})," ",a.ItemCode]}),e.jsxs("p",{className:"text-gray-800",children:[e.jsx("strong",{children:"Word:"})," ",a.Word||"N/A"]}),e.jsxs("p",{className:"text-gray-800",children:[e.jsx("strong",{children:"User Audio:"}),a.UserAudioURL?e.jsx(o,{content:"Play User Audio",children:e.jsx(i,{as:"a",href:a.UserAudioURL,target:"_blank",rel:"noopener noreferrer",color:"primary",size:"sm",className:"ml-2 my-2",children:"Play User Audio"})}):"No audio uploaded"]}),e.jsxs("p",{className:"text-gray-800",children:[e.jsx("strong",{children:"Default Audio:"}),a.DefaultAudio&&e.jsx(o,{content:"Play Default Audio",children:e.jsx(i,{as:"a",href:a.DefaultAudio,target:"_blank",rel:"noopener noreferrer",color:"primary",size:"sm",className:"ml-2 my-2",children:"Play Default Audio"})})]})]},r))}):e.jsx("p",{className:"text-gray-700",children:"No items available for this assessment."})]})]})]})},D=()=>e.jsxs("div",{className:"w-full h-full flex",children:[e.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6] shadow-lg",children:e.jsx(f,{})}),e.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[e.jsx(p,{}),e.jsx(g,{})]})]});export{D as default};
