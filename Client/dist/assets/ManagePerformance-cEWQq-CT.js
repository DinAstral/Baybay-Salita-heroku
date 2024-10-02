import{j as e,r as t}from"./react-BCcS7c0c.js";import{C as $}from"./ContentHeader-H0gjkgJW.js";import{S as G}from"./Sidebar-xN55oo5R.js";import{l as W}from"./react-export-table-to-excel-CDdXcfrC.js";import{R as Q}from"./react-paginate-BYTMUaIF.js";import{F as C,d as X,i as Y}from"./@fortawesome-BVdY808A.js";import{U as Z}from"./index-B-3vnZ7x.js";import{a as _}from"./axios-CCb-kr4I.js";import{P as ee}from"./PrintRecord-LBy-exmt.js";import{D as se}from"./DeletePerformance-Df2jiBps.js";import{P as b}from"./prop-types-LuavYUF2.js";import{L as te}from"./react-router-dom-Dk6_dLEo.js";import{m as ae,f as le,g as re,h as ie,j as ne,b as S,t as D,s as R,l as a,k as oe,n as ce,o as l,p as de,q as me,r}from"./@nextui-org-CLkIIHEi.js";import"./@babel-m2JXyA6a.js";import"./profile-Berhznzr.js";import"./react-router-MkLRJz4d.js";import"./@remix-run-BOUEh3jQ.js";import"./react-dom-rv-KAOpM.js";import"./scheduler-CzFDRTuY.js";import"./react-hot-toast-Dux6v_Wl.js";import"./goober-vt3s6TGe.js";import"./@react-aria-CfXSs2UI.js";import"./@react-stately-ChQ0zIrC.js";import"./clsx-B-dksMZM.js";import"./@swc-DS7M6wx8.js";import"./@internationalized-BB0Nk989.js";import"./framer-motion-BvVSIgoR.js";import"./react-textarea-autosize-bEG1sDiq.js";import"./use-latest-2zZSkz0C.js";import"./use-isomorphic-layout-effect-Co3QFFXf.js";import"./use-composed-ref-BmZZpR7Y.js";import"./tailwind-variants-ayMnMv5e.js";import"./tailwind-merge-Dc5vmgZ1.js";const T=({show:h,onHide:i,performance:n})=>e.jsx(ae,{isOpen:h,onClose:i,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(le,{children:[e.jsx(re,{className:"flex flex-col",id:"edit-user-modal-title",children:"View Performance Information"}),e.jsx(ie,{children:e.jsx("p",{children:"Do you want to view the performance of the student selected?"})}),e.jsxs(ne,{children:[e.jsx(S,{color:"danger",variant:"light",onClick:i,children:"Cancel"}),e.jsx(te,{to:`/ViewStudentPerformance/${n==null?void 0:n.UserInputId}`,children:e.jsx(S,{color:"primary",children:"View"})})]})]})});T.propTypes={show:b.bool.isRequired,onHide:b.func.isRequired,performance:b.object};const he=()=>{const[h,i]=t.useState(!1),[n,P]=t.useState(!1),[A,I]=t.useState(!1),[k,V]=t.useState([]),[g,E]=t.useState(null),[L,M]=t.useState(0),[x]=t.useState(10),[w,v]=t.useState([]),[f,U]=t.useState(""),[u,F]=t.useState(""),y=t.useRef(null),{user:d}=t.useContext(Z),[p,H]=t.useState(""),{onDownload:q}=W.useDownloadExcel({currentTableRef:y.current,filename:"Performance_List_Report_table",sheet:"Performance"});t.useEffect(()=>{d&&d.UserID&&_.get(`/api/getTeacher/${d.UserID}`).then(s=>{H(s.data.Section)}).catch(s=>console.log(s))},[d]),t.useEffect(()=>{p&&_.get("/api/getPerformance").then(s=>{const o=s.data.filter(m=>m.Section===p);V(o),v(o)}).catch(s=>console.log(s))},[p]);const K=s=>{M(s.selected)},N=(s,o)=>{const m=s.target.value;o==="section"?U(m):o==="type"&&F(m);let c=k;f&&(c=c.filter(j=>j.Section===f)),u&&(c=c.filter(j=>j.Type===u)),v(c)},O=()=>{i(!0)},z=s=>{E(s),P(!0)},B=()=>{const s=L*x;return w.slice(s,s+x)},J=()=>Math.ceil(w.length/x);return e.jsxs("div",{className:"px-9",children:[e.jsx(ee,{show:h,onHide:()=>i(!1),print:q}),e.jsx(T,{show:n,onHide:()=>P(!1),performance:g}),e.jsx(se,{show:A,onHide:()=>I(!1),performance:g}),e.jsxs("div",{className:"content-title-header",children:[e.jsxs("div",{children:["Admin View Student Performance",e.jsx(D,{showArrow:!0,content:e.jsxs("div",{className:"px-1 py-2",children:[e.jsx("div",{className:"text-small font-bold",children:"Performance Table"}),e.jsx("div",{className:"text-tiny",children:"This function will view the performance of your students in each section."})]}),children:e.jsx(C,{icon:X,size:"1x",className:"help-icon"})})]}),e.jsx("div",{className:"generate-report",children:e.jsx(D,{showArrow:!0,content:e.jsxs("div",{className:"px-1 py-2",children:[e.jsx("div",{className:"text-small font-bold",children:"Print"}),e.jsx("div",{className:"text-tiny",children:"Generate report/Print table"})]}),children:e.jsx(C,{icon:Y,size:"1x",className:"print-icon",onClick:O})})})]}),e.jsx("div",{className:"content-container",children:e.jsx("div",{className:"row",children:e.jsx("div",{className:"col",children:e.jsxs("div",{className:"card mt-1 border-0",children:[e.jsxs("div",{className:"flex flex-row gap-2 mb-4",children:[e.jsxs(R,{className:"w-[20%]",labelPlacement:"outside",label:"Sort by Section",variant:"bordered",defaultSelectedKeys:[""],onChange:s=>N(s,"section"),value:f,children:[e.jsx(a,{children:"Select Section"},""),e.jsx(a,{children:"Aster"},"Aster"),e.jsx(a,{children:"Camia"},"Camia"),e.jsx(a,{children:"Dahlia"},"Dahlia"),e.jsx(a,{children:"Iris"},"Iris"),e.jsx(a,{children:"Jasmin"},"Jasmin"),e.jsx(a,{children:"Orchid"},"Orchid"),e.jsx(a,{children:"Rose"},"Rose"),e.jsx(a,{children:"Tulip"},"Tulip"),e.jsx(a,{children:"SSC"},"SSC")]}),e.jsxs(R,{className:"w-[20%]",labelPlacement:"outside",label:"Sort by Type",variant:"bordered",defaultSelectedKeys:[""],onChange:s=>N(s,"type"),value:u,children:[e.jsx(a,{children:"Select Type of Assessment:"},""),e.jsx(a,{children:"Assessment 1"},"Pagbabaybay"),e.jsx(a,{children:"Assessment 2"},"Pantig"),e.jsx(a,{children:"Assessment 3"},"Salita"),e.jsx(a,{children:"Assessment 4"},"Pagbabasa")]})]}),e.jsxs("div",{className:"card-body scrollable-table scrollable-container",children:[e.jsxs(oe,{ref:y,removeWrapper:!0,color:"primary",selectionMode:"single",children:[e.jsxs(ce,{children:[e.jsx(l,{children:"Input ID"}),e.jsx(l,{children:"LRN"}),e.jsx(l,{children:"Section"}),e.jsx(l,{children:"Activity Code"}),e.jsx(l,{children:"Type"}),e.jsx(l,{children:"Submitted"}),e.jsx(l,{className:"text-center",children:"Actions"})]}),e.jsx(de,{emptyContent:"No rows to display.",children:B().map(s=>e.jsxs(me,{children:[e.jsx(r,{children:s.UserInputId}),e.jsx(r,{children:s.LRN}),e.jsx(r,{children:s.Section}),e.jsx(r,{children:s.ActivityCode}),e.jsx(r,{children:s.Type}),e.jsx(r,{children:s.Result}),e.jsx(r,{className:"text-center",children:e.jsx("div",{className:"table-buttons",children:e.jsx(S,{color:"primary",onClick:()=>z(s),children:"View"})})})]},s._id))})]}),e.jsx(Q,{previousLabel:"Previous",nextLabel:"Next",breakLabel:"...",breakClassName:"break-me",pageCount:J(),marginPagesDisplayed:2,pageRangeDisplayed:5,onPageChange:K,containerClassName:"pagination",activeClassName:"active"})]})]})})})})]})},Je=()=>e.jsxs("div",{className:"w-full h-full flex",children:[e.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6]",children:e.jsx(G,{})}),e.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[e.jsx($,{}),e.jsx(he,{})]})]});export{Je as default};
