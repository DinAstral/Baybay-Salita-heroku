import{r as t,U as S,j as e,a as c}from"./index-46g2bTDn.js";import{C as w}from"./ContentHeader-DpVqTCVw.js";import{S as y}from"./Sidebar-DpQKFVYP.js";import{F as m,d as C,e as A}from"./index-DNBWh895.js";import{t as E}from"./profile-BbWcRgwB.js";import{I as D}from"./BarChart-9x7gjORb.js";import"./chunk-DBLREEYE-BXO_GMqR.js";import"./useOverlayTriggerState-DubV0HT-.js";import"./chunk-CIZQCQPA-O0-gHmPi.js";import"./extends-CF3RwP-h.js";import"./objectWithoutPropertiesLoose-CAYKN5F1.js";import"./createPopper-iTKh2FQm.js";const T=()=>{const[r,x]=t.useState({}),[f,u]=t.useState([]);t.useState([]);const{user:i}=t.useContext(S),[I,p]=t.useState({}),[l,g]=t.useState({});return t.useEffect(()=>{const j=async()=>{try{const s=await c.get(`/api/getTeacher/${i.UserID}`);x(s.data)}catch(s){console.error("Error fetching teacher:",s)}},b=async()=>{try{const o=(await c.get("/api/getStudents")).data.filter(a=>a.Section===r.Section);u(o);const n=o.length;p({[r.Section]:n})}catch(s){console.error("Error fetching students:",s)}},v=async()=>{try{const d=(await c.get("/getAssessments")).data,n=["Pagbabaybay","Pantig","Salita","Pagbabasa"].reduce((a,h)=>(a[h]=d.filter(N=>N.Type===h).length,a),{});g(n)}catch(s){console.error("Error fetching assessments:",s)}};j(),b(),v()},[i.UserID,r.Section]),e.jsxs("div",{className:"p-6",children:[e.jsxs("div",{className:"flex items-center mb-6",children:[e.jsx("h1",{className:"text-3xl font-semibold",children:"Teacher Dashboard"}),e.jsx(E,{showArrow:!0,content:e.jsxs("div",{className:"p-2 text-sm",children:[e.jsx("div",{className:"font-bold",children:"Dashboard Info"}),e.jsx("p",{children:"View system data for the assigned section."})]}),children:e.jsx(m,{icon:C,className:"ml-2 text-black"})})]}),e.jsx("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:e.jsxs("div",{className:"bg-white rounded-lg shadow p-4 flex flex-row justify-between",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Students"}),e.jsx("p",{className:"text-5xl mt-2",children:f.length})]}),e.jsx("div",{children:e.jsx(m,{icon:A,size:"2xl",className:"text-md"})})]})}),e.jsxs("div",{className:"mt-6",children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4",children:"Assessment Created"}),e.jsx("div",{className:"bg-white rounded-lg shadow p-4",children:e.jsx(D,{xAxis:[{label:"Activities",scaleType:"band",data:Object.keys(l)}],yAxis:[{label:"Number of Assessments"}],margin:{top:20,bottom:30,left:40,right:60},series:[{data:Object.values(l)}],width:1500,height:300})})]})]})},q=()=>e.jsxs("div",{className:"w-full h-full flex",children:[e.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6]",children:e.jsx(y,{})}),e.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[e.jsx(w,{}),e.jsx(T,{})]})]});export{q as default};
