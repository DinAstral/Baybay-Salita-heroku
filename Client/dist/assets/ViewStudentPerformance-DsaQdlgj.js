import{r as m,j as e,a as v,_ as p,u as U,U as E,c as L}from"./index-B7MPDMra.js";import{C as V}from"./ContentHeader-CLqeOHbp.js";import{S as M}from"./Sidebar-ByR6eiqV.js";import{P as n,F as Q,d as B}from"./index-C254uZew.js";import{m as C,a as T,b as A,c as w}from"./chunk-P2T5LMDM-peo3FA51.js";import{m as k}from"./chunk-LT4XONRR-CECnONwD.js";import{i as N}from"./chunk-GQQM5TNQ-3AqrG7fD.js";import{s as $,l as h}from"./chunk-CEHIK4GH-BiVCugjE.js";import{t as z}from"./chunk-ATAY3LCU-DcGJxCmt.js";import{b as x}from"./chunk-DBLREEYE-BBTKcXgi.js";import{t as y}from"./profile-F0OvA6C9.js";import"./useOverlayTriggerState-B7DmzVKq.js";import"./Overlay-BuIxXbGb.js";import"./useDialog-DxlzFUnp.js";import"./useLabels-DBq97qWD.js";import"./VisuallyHidden-BptF3qJE.js";import"./useField-CUjDOBJZ.js";import"./useFormReset-vmAMJXSZ.js";import"./extends-CF3RwP-h.js";import"./objectWithoutPropertiesLoose-CAYKN5F1.js";import"./chunk-CIZQCQPA-BNeo4a9C.js";const P=({show:c,onHide:l})=>{const i=()=>{l()};return e.jsx(C,{isOpen:c,onClose:l,"aria-labelledby":"success-modal-title",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(k,{children:[e.jsx(T,{id:"success-modal-title",children:"Feedback Created Successfully!"}),e.jsx(A,{children:e.jsx("p",{children:"You have created feedback for your student's performance!"})}),e.jsx(w,{children:e.jsx(x,{color:"primary",onClick:i,children:"Close"})})]})})},S=({show:c,onHide:l,actCode:i,userid:u,lrn:f,section:a})=>{const[j,b]=m.useState(!1),[s,r]=m.useState({Title:"",Type:"",Feedback_Date:"",Context:""}),[o,D]=m.useState({}),_=()=>{let t=!0,d={};return s.Title||(d.Title="Title is required.",t=!1),s.Type||(d.Type="Type of assessment is required.",t=!1),s.Feedback_Date||(d.Feedback_Date="Feedback date is required.",t=!1),s.Context||(d.Context="Context is required.",t=!1),D(d),t},F=async t=>{if(t.preventDefault(),!_()){p.error("Please fill out all required fields.");return}const{Feedback_Date:d,Type:I,Title:R,Context:q}=s;try{const g=await v.post("/api/submitFeedback",{UserID:u,LRN:f,Section:a,Title:R,ActivityCode:i,Type:I,Feedback_Date:d,Context:q});g.data.error?p.error(g.data.error):(r({Title:"",Type:"",Feedback_Date:"",Context:""}),p.success("Created Feedback Successfully."),b(!0))}catch(g){console.error(g),p.error("Error creating feedback. Please try again.")}};return e.jsxs(e.Fragment,{children:[e.jsx(C,{isOpen:c,onClose:l,size:"lg","aria-labelledby":"create-feedback-modal-title",isDismissable:!1,isKeyboardDismissDisabled:!0,scrollBehavior:"inside",children:e.jsxs(k,{children:[e.jsx(T,{id:"create-feedback-modal-title",children:"Create New Feedback"}),e.jsxs("form",{onSubmit:F,children:[e.jsxs(A,{children:[e.jsx(N,{type:"text",label:"Title",placeholder:"Input a concern title",labelPlacement:"outside",variant:"bordered",className:"bg-transparent py-1 my-1",value:s.Title,onChange:t=>r({...s,Title:t.target.value}),isInvalid:!!o.Title,errorMessage:o.Title}),e.jsxs($,{labelPlacement:"outside",label:"Type of Assessment",placeholder:"Select Type of Assessment","aria-label":"Select type of assessment",variant:"bordered",className:"bg-transparent py-1 my-1",value:s.Type,onChange:t=>r({...s,Type:t.target.value}),isInvalid:!!o.Type,errorMessage:o.Type,children:[e.jsx(h,{children:"Select Type of Assessment"},""),e.jsx(h,{children:"Assessment 1: Pagbabaybay Tunog at Letra"},"Pagbabaybay"),e.jsx(h,{children:"Assessment 2: Pantig"},"Pantig"),e.jsx(h,{children:"Assessment 3: Salita"},"Salita"),e.jsx(h,{children:"Assessment 4: Pagbabasa"},"Pagbabasa")]}),e.jsx(N,{className:"pt-2",type:"date",label:"Feedback Date",labelPlacement:"outside",variant:"bordered",value:s.Feedback_Date,onChange:t=>r({...s,Feedback_Date:t.target.value}),isInvalid:!!o.Feedback_Date,errorMessage:o.Feedback_Date}),e.jsx(z,{placeholder:"Input feedback context",label:"Context",labelPlacement:"outside",variant:"bordered",className:"bg-transparent py-1 my-1",value:s.Context,onChange:t=>r({...s,Context:t.target.value}),isInvalid:!!o.Context,errorMessage:o.Context})]}),e.jsxs(w,{children:[e.jsx(x,{color:"danger",variant:"light",onClick:l,children:"Close"}),e.jsx(x,{color:"primary",type:"submit",children:"Send Feedback"})]})]})]})}),e.jsx(P,{show:j,onHide:()=>b(!1)})]})};S.propTypes={show:n.bool.isRequired,onHide:n.func.isRequired,actCode:n.string.isRequired,userid:n.string.isRequired,lrn:n.string.isRequired,section:n.string.isRequired};P.propTypes={show:n.bool.isRequired,onHide:n.func.isRequired};const H=c=>{const l=parseInt(c,10);if(isNaN(l))return"Not applicable";const i=Math.floor(l/60),u=l%60;return`${i}:${u<10?"0":""}${u} min`},K=()=>{const c=U(),[l,i]=m.useState(!1),{user:u}=m.useContext(E),{UserInputId:f}=L(),[a,j]=m.useState({UserInputId:"",LRN:"",Section:"",ActivityCode:"",Type:"",PerformanceItems:[],Questions:[],Score:"",TimeRead:""});m.useEffect(()=>{(async()=>{try{const r=await v.get(`/api/getPerformance/${f}`);j(r.data)}catch{p.error("Failed to fetch performance data. Please try again later.")}})()},[f]);const b=()=>{i(!0)};return e.jsxs("div",{className:"p-10",children:[e.jsx(S,{show:l,onHide:()=>i(!1),actCode:a.ActivityCode,userid:u.UserID,lrn:a.LRN,section:a.Section}),e.jsxs("div",{className:"flex items-center justify-start gap-2 mb-5",children:[e.jsx("h1",{className:"text-3xl font-semibold",children:"View Performance"}),e.jsx(y,{showArrow:!0,content:e.jsxs("div",{className:"p-2",children:[e.jsx("div",{className:"text-sm font-bold",children:"View Student Performance"}),e.jsx("div",{className:"text-xs",children:"This section displays the student's performance."})]}),children:e.jsx(Q,{icon:B,className:"text-gray-600"})})]}),e.jsxs("div",{className:"w-full max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-6",children:[e.jsxs("div",{className:"mb-6",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Assessment Details"}),e.jsxs("p",{className:"text-gray-700",children:[e.jsx("strong",{children:"Activity Code:"})," ",a.ActivityCode||"N/A"]}),e.jsxs("p",{className:"text-gray-700",children:[e.jsx("strong",{children:"LRN:"})," ",a.LRN||"N/A"]}),e.jsxs("p",{className:"text-gray-700",children:[e.jsx("strong",{children:"Section:"})," ",a.Section||"N/A"]}),e.jsxs("p",{className:"text-gray-700",children:[e.jsx("strong",{children:"Type:"})," ",a.Type||"N/A"]})]}),e.jsx("div",{className:"mb-6",children:e.jsxs("p",{className:"text-gray-700",children:[e.jsx("strong",{children:"Score:"})," ",a.Score||"N/A"]})}),a.Type==="Pagbabasa"&&e.jsxs("div",{className:"mb-6",children:[e.jsx("h2",{className:"text-xl font-semibold mb-4",children:"Questions and Answers"}),e.jsxs("p",{className:"text-gray-700",children:[e.jsx("strong",{children:"Time Read:"})," ",H(a.TimeRead)]}),a.Questions&&a.Questions.length>0?e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:a.Questions.map((s,r)=>e.jsxs("div",{className:"bg-gray-100 p-4 rounded-lg shadow",children:[e.jsxs("p",{className:"text-gray-800",children:[e.jsxs("strong",{children:["Question ",r+1,":"]})," ",s.Question||"N/A"]}),e.jsxs("p",{className:"text-gray-800",children:[e.jsx("strong",{children:"Answer:"})," ",s.Answer||"N/A"]})]},r))}):e.jsx("p",{className:"text-gray-700",children:"No questions available for this assessment."})]}),a.Type!=="Pagbabasa"&&e.jsxs("div",{children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Items"}),a.PerformanceItems&&a.PerformanceItems.length>0?e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-4",children:a.PerformanceItems.map((s,r)=>e.jsxs("div",{className:"bg-gray-100 p-4 rounded-lg shadow",children:[e.jsxs("p",{className:"text-gray-800",children:[e.jsx("strong",{children:"Item Code:"})," ",s.ItemCode]}),e.jsxs("p",{className:"text-gray-800",children:[e.jsx("strong",{children:"Word:"})," ",s.Word||"N/A"]}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("div",{className:"flex items-center gap-2",children:s.UserAudioURL?e.jsx(y,{content:"Play User Audio",children:e.jsx(x,{as:"a",href:s.UserAudioURL,target:"_blank",rel:"noopener noreferrer",color:"primary",size:"sm",children:"Play User Audio"})}):"No audio uploaded"}),e.jsx("div",{className:"flex items-center gap-2",children:s.DefaultAudio?e.jsx(y,{content:"Play Default Audio",children:e.jsx(x,{as:"a",href:s.DefaultAudio,target:"_blank",rel:"noopener noreferrer",color:"primary",size:"sm",children:"Play Default Audio"})}):"No default audio available"})]})]},r))}):e.jsx("p",{className:"text-gray-700",children:"No items available for this assessment."})]}),e.jsxs("div",{className:"mt-6 gap-5 flex",children:[e.jsx(x,{color:"danger",onClick:()=>c(-1),className:"my-4",children:"Back"}),e.jsx(x,{color:"primary",onClick:b,className:"my-4",children:"Feedback"})]})]})]})},he=()=>e.jsxs("div",{className:"w-full h-full flex",children:[e.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6] shadow-lg",children:e.jsx(M,{})}),e.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[e.jsx(V,{}),e.jsx(K,{})]})]});export{he as default};