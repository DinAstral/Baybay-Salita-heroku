import{j as e,r as t}from"./react-BCcS7c0c.js";import{C as G}from"./ContentHeader-D_Hb8_9_.js";import{S as W}from"./Sidebar-DrSsHGrI.js";import{l as Q}from"./react-export-table-to-excel-CDdXcfrC.js";import{R as X}from"./react-paginate-BYTMUaIF.js";import{F as D,d as Y,i as Z}from"./@fortawesome-BVdY808A.js";import{U as ee}from"./index-CTn7D3WU.js";import{a as R}from"./axios-CCb-kr4I.js";import{P as se}from"./PrintRecord-LBy-exmt.js";import{D as te}from"./DeletePerformance-jioH6Sd0.js";import{P as S}from"./prop-types-LuavYUF2.js";import{L as ae}from"./react-router-dom-Dk6_dLEo.js";import{m as le,f as re,g as ie,h as ne,j as oe,b as h,t as T,s as A,l as a,k as ce,n as de,o as l,p as me,q as he,r}from"./@nextui-org-CLkIIHEi.js";import"./@babel-m2JXyA6a.js";import"./profile-Berhznzr.js";import"./react-router-MkLRJz4d.js";import"./@remix-run-BOUEh3jQ.js";import"./react-dom-rv-KAOpM.js";import"./scheduler-CzFDRTuY.js";import"./react-hot-toast-Dux6v_Wl.js";import"./goober-vt3s6TGe.js";import"./@react-aria-CfXSs2UI.js";import"./@react-stately-ChQ0zIrC.js";import"./clsx-B-dksMZM.js";import"./@swc-DS7M6wx8.js";import"./@internationalized-BB0Nk989.js";import"./framer-motion-BvVSIgoR.js";import"./react-textarea-autosize-bEG1sDiq.js";import"./use-latest-2zZSkz0C.js";import"./use-isomorphic-layout-effect-Co3QFFXf.js";import"./use-composed-ref-BmZZpR7Y.js";import"./tailwind-variants-ayMnMv5e.js";import"./tailwind-merge-Dc5vmgZ1.js";const k=({show:x,onHide:i,performance:n})=>e.jsx(le,{isOpen:x,onClose:i,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(re,{children:[e.jsx(ie,{className:"flex flex-col",id:"edit-user-modal-title",children:"View Performance Information"}),e.jsx(ne,{children:e.jsx("p",{children:"Do you want to view the performance of the student selected?"})}),e.jsxs(oe,{children:[e.jsx(h,{color:"danger",variant:"light",onClick:i,children:"Cancel"}),e.jsx(ae,{to:`/ViewStudentPerformance/${n==null?void 0:n.UserInputId}`,children:e.jsx(h,{color:"primary",children:"View"})})]})]})});k.propTypes={show:S.bool.isRequired,onHide:S.func.isRequired,performance:S.object};const xe=()=>{const[x,i]=t.useState(!1),[n,P]=t.useState(!1),[I,g]=t.useState(!1),[V,E]=t.useState([]),[w,v]=t.useState(null),[L,M]=t.useState(0),[f]=t.useState(10),[y,N]=t.useState([]),[u,U]=t.useState(""),[p,F]=t.useState(""),C=t.useRef(null),{user:d}=t.useContext(ee),[j,H]=t.useState(""),{onDownload:q}=Q.useDownloadExcel({currentTableRef:C.current,filename:"Performance_List_Report_table",sheet:"Performance"});t.useEffect(()=>{d&&d.UserID&&R.get(`/api/getTeacher/${d.UserID}`).then(s=>{H(s.data.Section)}).catch(s=>console.log(s))},[d]),t.useEffect(()=>{j&&R.get("/api/getPerformance").then(s=>{const o=s.data.filter(m=>m.Section===j);E(o),N(o)}).catch(s=>console.log(s))},[j]);const K=s=>{M(s.selected)},_=(s,o)=>{const m=s.target.value;o==="section"?U(m):o==="type"&&F(m);let c=V;u&&(c=c.filter(b=>b.Section===u)),p&&(c=c.filter(b=>b.Type===p)),N(c)},O=()=>{i(!0)},z=s=>{v(s),P(!0)},B=s=>{v(s),g(!0)},J=()=>{const s=L*f;return y.slice(s,s+f)},$=()=>Math.ceil(y.length/f);return e.jsxs("div",{className:"px-9",children:[e.jsx(se,{show:x,onHide:()=>i(!1),print:q}),e.jsx(k,{show:n,onHide:()=>P(!1),performance:w}),e.jsx(te,{show:I,onHide:()=>g(!1),performance:w}),e.jsxs("div",{className:"content-title-header",children:[e.jsxs("div",{children:["Admin View Student Performance",e.jsx(T,{showArrow:!0,content:e.jsxs("div",{className:"px-1 py-2",children:[e.jsx("div",{className:"text-small font-bold",children:"Performance Table"}),e.jsx("div",{className:"text-tiny",children:"This function will view the performance of your students in each section."})]}),children:e.jsx(D,{icon:Y,size:"1x",className:"help-icon"})})]}),e.jsx("div",{className:"generate-report",children:e.jsx(T,{showArrow:!0,content:e.jsxs("div",{className:"px-1 py-2",children:[e.jsx("div",{className:"text-small font-bold",children:"Print"}),e.jsx("div",{className:"text-tiny",children:"Generate report/Print table"})]}),children:e.jsx(D,{icon:Z,size:"1x",className:"print-icon",onClick:O})})})]}),e.jsx("div",{className:"content-container",children:e.jsx("div",{className:"row",children:e.jsx("div",{className:"col",children:e.jsxs("div",{className:"card mt-1 border-0",children:[e.jsxs("div",{className:"flex flex-row gap-2 mb-4",children:[e.jsxs(A,{className:"w-[20%]",labelPlacement:"outside",label:"Sort by Section",variant:"bordered",defaultSelectedKeys:[""],onChange:s=>_(s,"section"),value:u,children:[e.jsx(a,{children:"Select Section"},""),e.jsx(a,{children:"Aster"},"Aster"),e.jsx(a,{children:"Camia"},"Camia"),e.jsx(a,{children:"Dahlia"},"Dahlia"),e.jsx(a,{children:"Iris"},"Iris"),e.jsx(a,{children:"Jasmin"},"Jasmin"),e.jsx(a,{children:"Orchid"},"Orchid"),e.jsx(a,{children:"Rose"},"Rose"),e.jsx(a,{children:"Tulip"},"Tulip"),e.jsx(a,{children:"SSC"},"SSC")]}),e.jsxs(A,{className:"w-[20%]",labelPlacement:"outside",label:"Sort by Type",variant:"bordered",defaultSelectedKeys:[""],onChange:s=>_(s,"type"),value:p,children:[e.jsx(a,{children:"Select Type of Assessment:"},""),e.jsx(a,{children:"Assessment 1"},"Pagbabaybay"),e.jsx(a,{children:"Assessment 2"},"Pantig"),e.jsx(a,{children:"Assessment 3"},"Salita"),e.jsx(a,{children:"Assessment 4"},"Pagbabasa")]})]}),e.jsxs("div",{className:"card-body scrollable-table scrollable-container",children:[e.jsxs(ce,{ref:C,removeWrapper:!0,color:"primary",selectionMode:"single",children:[e.jsxs(de,{children:[e.jsx(l,{children:"Input ID"}),e.jsx(l,{children:"LRN"}),e.jsx(l,{children:"Section"}),e.jsx(l,{children:"Activity Code"}),e.jsx(l,{children:"Type"}),e.jsx(l,{children:"Submitted"}),e.jsx(l,{className:"text-center",children:"Actions"})]}),e.jsx(me,{emptyContent:"No rows to display.",children:J().map(s=>e.jsxs(he,{children:[e.jsx(r,{children:s.UserInputId}),e.jsx(r,{children:s.LRN}),e.jsx(r,{children:s.Section}),e.jsx(r,{children:s.ActivityCode}),e.jsx(r,{children:s.Type}),e.jsx(r,{children:s.Result}),e.jsx(r,{className:"text-center",children:e.jsxs("div",{className:"table-buttons",children:[e.jsx(h,{color:"primary",onClick:()=>z(s),children:"View"}),e.jsx(h,{color:"danger",onClick:()=>B(s),children:"Delete"})]})})]},s._id))})]}),e.jsx(X,{previousLabel:"Previous",nextLabel:"Next",breakLabel:"...",breakClassName:"break-me",pageCount:$(),marginPagesDisplayed:2,pageRangeDisplayed:5,onPageChange:K,containerClassName:"pagination",activeClassName:"active"})]})]})})})})]})},$e=()=>e.jsxs("div",{className:"w-full h-full flex",children:[e.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6]",children:e.jsx(W,{})}),e.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[e.jsx(G,{}),e.jsx(xe,{})]})]});export{$e as default};
