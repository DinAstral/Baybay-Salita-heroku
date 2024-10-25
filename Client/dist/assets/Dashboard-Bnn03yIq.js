import{r as i,U as z,j as e,a as f}from"./index-9k_Ocd80.js";import{C as F}from"./ContentHeader-BKYcynH5.js";import{S as G}from"./Sidebar-C8qJrSzU.js";import{F as r,d as H,e as c,g as b}from"./index-B6K5ESG2.js";import{t as B}from"./profile-DYuKv9Zm.js";import{I as S}from"./BarChart-CAu_MaS0.js";import"./chunk-DBLREEYE-DVjbjQx8.js";import"./useOverlayTriggerState-BZO4l0S3.js";import"./chunk-CIZQCQPA-8Nr0sLZY.js";import"./extends-CF3RwP-h.js";import"./objectWithoutPropertiesLoose-CAYKN5F1.js";import"./createPopper-iTKh2FQm.js";const M=()=>{const[x,E]=i.useState({}),[g,A]=i.useState([]),[N,C]=i.useState([]),{user:v}=i.useContext(z),[U,T]=i.useState({}),[w,k]=i.useState({}),[j,D]=i.useState([]),[n,L]=i.useState({Incomplete:0,LowEmergingReader:0,HighEmergingReader:0,DevelopingReader:0,TransitioningReader:0,GradeLevelReader:0});i.useEffect(()=>{const t=async()=>{try{const s=await f.get(`/api/getTeacher/${v.UserID}`);E(s.data)}catch(s){console.error("Error fetching teacher:",s)}},u=async()=>{try{const l=(await f.get("/api/getStudents")).data.filter(o=>o.Section===x.Section);A(l);const a={Incomplete:0,LowEmergingReader:0,HighEmergingReader:0,DevelopingReader:0,TransitioningReader:0,GradeLevelReader:0};l.forEach(o=>{switch(o.status){case"Incomplete":a.Incomplete+=1;break;case"Low Emerging Reader":a.LowEmergingReader+=1;break;case"High Emerging Reader":a.HighEmergingReader+=1;break;case"Developing Reader":a.DevelopingReader+=1;break;case"Transitioning Reader":a.TransitioningReader+=1;break;case"Grade Level Reader":a.GradeLevelReader+=1;break;default:break}}),L(a),T(l)}catch(s){console.error("Error fetching students:",s)}},p=async()=>{try{const l=(await f.get("/api/getPerformance")).data.filter(a=>a.Section===x.Section);D(l)}catch(s){console.error("Error fetching performance:",s)}},d=async()=>{try{const l=(await f.get("/api/getAssessments")).data.filter(h=>h.Section===x.Section),o=["Pagbabaybay","Pantig","Salita","Pagbabasa"].reduce((h,R)=>(h[R]=l.filter(I=>I.Type===R).length,h),{});C(l),k(o)}catch(s){console.error("Error fetching assessments:",s)}};t(),u(),p(),d()},[v.UserID,x.Section]);const y=["Pagbabaybay","Pantig","Salita","Pagbabasa"],P=g.map(t=>{const u=j.filter(d=>d.LRN===t.LRN),p=y.map(d=>{const s=u.find(m=>m.Type===d);return s?parseInt(s.Score,10):0});return{studentName:t.Name,scores:p}});return N.map(t=>t.Type),e.jsxs("div",{className:"p-6",children:[e.jsxs("div",{className:"flex items-center mb-6",children:[e.jsx("h1",{className:"text-3xl font-semibold",children:"Teacher Dashboard"}),e.jsx(B,{showArrow:!0,content:e.jsxs("div",{className:"p-2 text-sm",children:[e.jsx("div",{className:"font-bold",children:"Dashboard Info"}),e.jsx("p",{children:"View system data for the assigned section."})]}),children:e.jsx(r,{icon:H,className:"ml-2 text-black"})})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"bg-[#fb6ea4] rounded-lg shadow-2xl p-4 flex flex-row justify-between",children:[e.jsxs("div",{className:"text-white",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Students"}),e.jsx("p",{className:"text-5xl mt-2",children:g.length})]}),e.jsx("div",{children:e.jsx(r,{icon:c,size:"2xl",className:"text-md",inverse:!0})})]}),e.jsxs("div",{className:"bg-[#7668d2] rounded-lg shadow-2xl p-4 flex flex-row justify-between",children:[e.jsxs("div",{className:"text-white",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Assessment"}),e.jsx("p",{className:"text-5xl mt-2",children:N.length})," "]}),e.jsx("div",{children:e.jsx(r,{icon:b,size:"2xl",className:"text-md",inverse:!0})})]}),e.jsxs("div",{className:"bg-[#91c123] rounded-lg shadow-2xl p-4 flex flex-row justify-between",children:[e.jsxs("div",{className:"text-white",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Performance"}),e.jsx("p",{className:"text-5xl mt-2",children:j.length})," "]}),e.jsx("div",{children:e.jsx(r,{icon:c,size:"2xl",className:"text-md",inverse:!0})})]})]}),e.jsxs("div",{className:"mt-6 bg-white p-6 rounded-md shadow",children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4 items-center flex flex-col",children:"Student Status"}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"bg-[#ff505b] rounded-lg shadow-2xl p-4 flex flex-row justify-between",children:[e.jsxs("div",{className:"text-white",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Incomplete"}),e.jsx("p",{className:"text-5xl mt-2",children:n.Incomplete})]}),e.jsx("div",{children:e.jsx(r,{icon:c,size:"2xl",className:"text-md",inverse:!0})})]}),e.jsxs("div",{className:"bg-[#ff7828] rounded-lg shadow-2xl p-4 flex flex-row justify-between",children:[e.jsxs("div",{className:"text-white",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Low Emerging Reader"}),e.jsx("p",{className:"text-5xl mt-2",children:n.LowEmergingReader})]}),e.jsx("div",{children:e.jsx(r,{icon:b,size:"2xl",className:"text-md",inverse:!0})})]}),e.jsxs("div",{className:"bg-[#DC84F3] rounded-lg shadow-2xl p-4 flex flex-row justify-between",children:[e.jsxs("div",{className:"text-white",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"High Emerging Reader"}),e.jsx("p",{className:"text-5xl mt-2",children:n.HighEmergingReader})]}),e.jsx("div",{children:e.jsx(r,{icon:b,size:"2xl",className:"text-md",inverse:!0})})]}),e.jsxs("div",{className:"bg-[#4b99f5] rounded-lg shadow-2xl p-4 flex flex-row justify-between",children:[e.jsxs("div",{className:"text-white",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Developing Reader"}),e.jsx("p",{className:"text-5xl mt-2",children:n.DevelopingReader})]}),e.jsx("div",{children:e.jsx(r,{icon:c,size:"2xl",className:"text-md",inverse:!0})})]}),e.jsxs("div",{className:"bg-[#ffce1f] rounded-lg shadow-2xl p-4 flex flex-row justify-between",children:[e.jsxs("div",{className:"text-white",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Transitioning Reader"}),e.jsx("p",{className:"text-5xl mt-2",children:n.TransitioningReader})]}),e.jsx("div",{children:e.jsx(r,{icon:c,size:"2xl",className:"text-md",inverse:!0})})]}),e.jsxs("div",{className:"bg-[#FF8080] rounded-lg shadow-2xl p-4 flex flex-row justify-between",children:[e.jsxs("div",{className:"text-white",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Grade Level Reader"}),e.jsx("p",{className:"text-5xl mt-2",children:n.GradeLevelReader})]}),e.jsx("div",{children:e.jsx(r,{icon:c,size:"2xl",className:"text-md",inverse:!0})})]})]})]}),e.jsxs("div",{className:"mt-6",children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4",children:"Assessment Created"}),e.jsx("div",{className:"bg-white rounded-lg shadow-2xl p-4",children:e.jsx(S,{xAxis:[{label:"Activities",scaleType:"band",data:Object.keys(w),tickSize:10}],yAxis:[{label:"Number of Assessments",max:10,min:0,tickCount:6,tickFormat:t=>Math.floor(t),grid:!0}],series:[{data:Object.values(w),color:"#ffce1f",label:"Assessments"}],barsize:40,gap:30,width:1500,height:400})})]}),e.jsxs("div",{className:"mt-6",children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4",children:"Performance of Students"}),e.jsx("div",{className:"bg-white rounded-lg shadow-2xl p-4",children:j.length>0&&g.length>0?e.jsx(S,{xAxis:[{label:"Assessment Type",data:y,scaleType:"band",tickSize:10}],yAxis:[{label:"Score",min:0,max:10,tickCount:6,tickFormat:t=>Math.floor(t)}],series:P.map(t=>({data:t.scores,label:t.studentName,color:`#${Math.floor(Math.random()*16777215).toString(16)}`})),width:1500,height:500}):e.jsx("p",{children:"No performance data available"})})]})]})},ee=()=>e.jsxs("div",{className:"w-full h-full flex",children:[e.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6] shadow-lg",children:e.jsx(G,{})}),e.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[e.jsx(F,{}),e.jsx(M,{})]})]});export{ee as default};
