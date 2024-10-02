import{r as s,j as t}from"./react-BCcS7c0c.js";import{C as S}from"./ContentHeader-H0gjkgJW.js";import{S as A}from"./Sidebar-xN55oo5R.js";import{F as h,d as C,e as E}from"./@fortawesome-BVdY808A.js";import{a as n}from"./axios-CCb-kr4I.js";import{U as D}from"./index-B-3vnZ7x.js";import{t as T}from"./@nextui-org-CLkIIHEi.js";import{B as x}from"./@mui-BJ_bEgfB.js";import"./@babel-m2JXyA6a.js";import"./profile-Berhznzr.js";import"./react-router-dom-Dk6_dLEo.js";import"./react-dom-rv-KAOpM.js";import"./scheduler-CzFDRTuY.js";import"./react-router-MkLRJz4d.js";import"./@remix-run-BOUEh3jQ.js";import"./prop-types-LuavYUF2.js";import"./react-hot-toast-Dux6v_Wl.js";import"./goober-vt3s6TGe.js";import"./@react-aria-CfXSs2UI.js";import"./@react-stately-ChQ0zIrC.js";import"./clsx-B-dksMZM.js";import"./@swc-DS7M6wx8.js";import"./@internationalized-BB0Nk989.js";import"./framer-motion-BvVSIgoR.js";import"./react-textarea-autosize-bEG1sDiq.js";import"./use-latest-2zZSkz0C.js";import"./use-isomorphic-layout-effect-Co3QFFXf.js";import"./use-composed-ref-BmZZpR7Y.js";import"./tailwind-variants-ayMnMv5e.js";import"./tailwind-merge-Dc5vmgZ1.js";import"./@emotion-Bi_v61fx.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./stylis-BqmD5Vow.js";import"./react-is-DcfIKM1A.js";import"./@react-spring-Dh4SiAG8.js";import"./d3-shape-D9lAmgB5.js";import"./d3-path-CimkQT29.js";import"./d3-color-9lF95FHy.js";import"./d3-scale-DrjEpSXf.js";import"./internmap-BkD7Hj8s.js";import"./d3-array-DJclFi1f.js";import"./d3-format-CzD4bSOQ.js";import"./d3-time-format-DZUSPL1N.js";import"./d3-time-Dz5jZYzf.js";import"./d3-interpolate-HHnA3okx.js";import"./@popperjs-CY3HxPKn.js";const I=()=>{const[o,f]=s.useState({}),[u,b]=s.useState([]);s.useState([]);const{user:c}=s.useContext(D),[l,g]=s.useState({}),[m,j]=s.useState({});return s.useEffect(()=>{const v=async()=>{try{const e=await n.get(`/api/getTeacher/${c.UserID}`);f(e.data)}catch(e){console.error("Error fetching teacher:",e)}},N=async()=>{try{const a=(await n.get("/api/getStudents")).data.filter(r=>r.Section===o.Section);b(a);const i=a.length;g({[o.Section]:i})}catch(e){console.error("Error fetching students:",e)}},w=async()=>{try{const d=(await n.get("/getAssessments")).data,i=["Pagbabaybay","Pantig","Salita","Pagbabasa"].reduce((r,p)=>(r[p]=d.filter(y=>y.Type===p).length,r),{});j(i)}catch(e){console.error("Error fetching assessments:",e)}};v(),N(),w()},[c.UserID,o.Section]),t.jsxs("div",{className:"p-6",children:[t.jsxs("div",{className:"flex items-center mb-6",children:[t.jsx("h1",{className:"text-3xl font-semibold",children:"Teacher Dashboard"}),t.jsx(T,{showArrow:!0,content:t.jsxs("div",{className:"p-2 text-sm",children:[t.jsx("div",{className:"font-bold",children:"Dashboard Info"}),t.jsx("p",{children:"View system data for the assigned section."})]}),children:t.jsx(h,{icon:C,className:"ml-2 text-black"})})]}),t.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[t.jsxs("div",{className:"bg-white rounded-lg shadow p-4 flex flex-row justify-between",children:[t.jsxs("div",{children:[t.jsx("h2",{className:"text-xl font-semibold",children:"Students"}),t.jsx("p",{className:"text-5xl mt-2",children:u.length})]}),t.jsx("div",{children:t.jsx(h,{icon:E,size:"2xl",className:"text-md"})})]}),t.jsxs("div",{className:"col-span-1 lg:col-span-2 bg-white rounded-lg shadow p-4",children:[t.jsx("h2",{className:"text-xl font-semibold"}),t.jsx(x,{xAxis:[{label:"Number of Students"}],yAxis:[{label:"Sections",scaleType:"band",data:Object.keys(l)}],series:[{data:Object.values(l)}],layout:"horizontal",width:1e3,height:300})]})]}),t.jsxs("div",{className:"mt-6",children:[t.jsx("h2",{className:"text-2xl font-semibold mb-4",children:"Assessment Created"}),t.jsx("div",{className:"bg-white rounded-lg shadow p-4",children:t.jsx(x,{xAxis:[{label:"Activities",scaleType:"band",data:Object.keys(m)}],yAxis:[{label:"Number of Assessments"}],margin:{top:20,bottom:30,left:40,right:60},series:[{data:Object.values(m)}],width:1500,height:300})})]})]})},yt=()=>t.jsxs("div",{className:"w-full h-full flex",children:[t.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6]",children:t.jsx(A,{})}),t.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[t.jsx(S,{}),t.jsx(I,{})]})]});export{yt as default};
