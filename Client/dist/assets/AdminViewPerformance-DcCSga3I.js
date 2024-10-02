import{j as e,r as l}from"./react-BCcS7c0c.js";import{A as B}from"./AdminSidebar-DKOvjyxF.js";import{l as J}from"./react-export-table-to-excel-CDdXcfrC.js";import{R as G}from"./react-paginate-BYTMUaIF.js";import{F as R,d as W,i as $}from"./@fortawesome-BVdY808A.js";import{a as Q}from"./axios-CCb-kr4I.js";import{C as X}from"./ContentHeader-H0gjkgJW.js";import{P as Y}from"./PrintRecord-LBy-exmt.js";import"./UpdateStudent-Dy7pziZp.js";import{D as Z}from"./DeletePerformance-Df2jiBps.js";import{P as p}from"./prop-types-LuavYUF2.js";import{L as ee}from"./react-router-dom-Dk6_dLEo.js";import{m as se,f as te,g as le,h as ae,j as ie,b as h,t as D,s as A,l as t,k as re,n as ne,o as a,p as oe,q as ce,r as i}from"./@nextui-org-CLkIIHEi.js";import"./@babel-m2JXyA6a.js";import"./profile-Berhznzr.js";import"./index-B-3vnZ7x.js";import"./react-dom-rv-KAOpM.js";import"./scheduler-CzFDRTuY.js";import"./react-hot-toast-Dux6v_Wl.js";import"./goober-vt3s6TGe.js";import"./react-router-MkLRJz4d.js";import"./@remix-run-BOUEh3jQ.js";import"./@react-aria-CfXSs2UI.js";import"./@react-stately-ChQ0zIrC.js";import"./clsx-B-dksMZM.js";import"./@swc-DS7M6wx8.js";import"./@internationalized-BB0Nk989.js";import"./framer-motion-BvVSIgoR.js";import"./react-textarea-autosize-bEG1sDiq.js";import"./use-latest-2zZSkz0C.js";import"./use-isomorphic-layout-effect-Co3QFFXf.js";import"./use-composed-ref-BmZZpR7Y.js";import"./tailwind-variants-ayMnMv5e.js";import"./tailwind-merge-Dc5vmgZ1.js";const k=({show:x,onHide:o,performance:c})=>e.jsx(se,{isOpen:x,onClose:o,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(te,{children:[e.jsx(le,{className:"flex flex-col",id:"edit-user-modal-title",children:"View Performance Information"}),e.jsx(ae,{children:e.jsx("p",{children:"Do you want to view the performance of the student selected?"})}),e.jsxs(ie,{children:[e.jsx(h,{color:"danger",variant:"light",onClick:o,children:"Cancel"}),e.jsx(ee,{to:`/adminViewPerformance/${c==null?void 0:c.UserInputId}`,children:e.jsx(h,{color:"primary",children:"View"})})]})]})});k.propTypes={show:p.bool.isRequired,onHide:p.func.isRequired,performance:p.object};const de=()=>{const[x,o]=l.useState(!1),[c,b]=l.useState(!1),[I,S]=l.useState(!1),[v,T]=l.useState([]),[w,P]=l.useState(null),[V,L]=l.useState(0),[u]=l.useState(10),[y,g]=l.useState([]),[f,E]=l.useState(""),[j,F]=l.useState(""),N=l.useRef(null),{onDownload:M}=J.useDownloadExcel({currentTableRef:N.current,filename:"Performance_List_Report_table",sheet:"Performance"}),C=()=>{Q.get("/api/getPerformance").then(s=>{T(s.data),g(s.data)}).catch(s=>console.log(s))};l.useEffect(()=>{C()},[]);const H=s=>{L(s.selected)},_=(s,d)=>{const m=s.target.value;d==="section"?E(m):d==="type"&&F(m);let r=v;m&&(r=v.filter(n=>d==="section"?n.Section===m:n.Type===m)),f&&d==="type"&&(r=r.filter(n=>n.Section===f)),j&&d==="section"&&(r=r.filter(n=>n.Type===j)),g(r)},q=()=>{o(!0)},K=s=>{P(s),b(!0)},O=s=>{P(s),S(!0)},U=()=>{const s=V*u;return y.slice(s,s+u)},z=()=>Math.ceil(y.length/u);return e.jsxs("div",{className:"px-9",children:[e.jsx(Y,{show:x,onHide:()=>o(!1),print:M}),e.jsx(k,{show:c,onHide:()=>b(!1),performance:w}),e.jsx(Z,{show:I,onHide:()=>S(!1),performance:w,refreshActivities:C}),e.jsxs("div",{className:"content-title-header",children:[e.jsxs("div",{children:["Student Performance",e.jsx(D,{showArrow:!0,content:e.jsxs("div",{className:"px-1 py-2",children:[e.jsx("div",{className:"text-small font-bold",children:"Performance Table"}),e.jsx("div",{className:"text-tiny",children:"This function will view the performance of your students in each section."})]}),children:e.jsx(R,{icon:W,size:"1x",className:"help-icon"})})]}),e.jsx("div",{className:"generate-report",children:e.jsx(D,{showArrow:!0,content:e.jsxs("div",{className:"px-1 py-2",children:[e.jsx("div",{className:"text-small font-bold",children:"Print"}),e.jsx("div",{className:"text-tiny",children:"Generate report/Print table"})]}),children:e.jsx(R,{icon:$,size:"1x",className:"print-icon",onClick:q})})})]}),e.jsx("div",{className:"content-container",children:e.jsx("div",{className:"row",children:e.jsx("div",{className:"col",children:e.jsxs("div",{className:"card mt-1 border-0",children:[e.jsxs("div",{className:"flex flex-row gap-2 mb-4",children:[e.jsxs(A,{className:"w-[20%]",labelPlacement:"outside",label:"Sort by Section",variant:"bordered",defaultSelectedKeys:[""],onChange:s=>_(s,"section"),value:f,children:[e.jsx(t,{children:"Select Section"},""),e.jsx(t,{children:"Aster"},"Aster"),e.jsx(t,{children:"Camia"},"Camia"),e.jsx(t,{children:"Dahlia"},"Dahlia"),e.jsx(t,{children:"Iris"},"Iris"),e.jsx(t,{children:"Jasmin"},"Jasmin"),e.jsx(t,{children:"Orchid"},"Orchid"),e.jsx(t,{children:"Rose"},"Rose"),e.jsx(t,{children:"Tulip"},"Tulip"),e.jsx(t,{children:"SSC"},"SSC")]}),e.jsxs(A,{className:"w-[20%]",labelPlacement:"outside",label:"Sort by Type",variant:"bordered",defaultSelectedKeys:[""],onChange:s=>_(s,"type"),value:j,children:[e.jsx(t,{children:"Select Type of Assessment:"},""),e.jsx(t,{children:"Assessment 1"},"Pagbabaybay"),e.jsx(t,{children:"Assessment 2"},"Pantig"),e.jsx(t,{children:"Assessment 3"},"Salita"),e.jsx(t,{children:"Assessment 4"},"Pagbabasa")]})]}),e.jsxs("div",{className:"card-body scrollable-table scrollable-container",children:[e.jsxs(re,{ref:N,removeWrapper:!0,color:"primary",selectionMode:"single",children:[e.jsxs(ne,{children:[e.jsx(a,{children:"Input ID"}),e.jsx(a,{children:"LRN"}),e.jsx(a,{children:"Section"}),e.jsx(a,{children:"Activity Code"}),e.jsx(a,{children:"Type"}),e.jsx(a,{children:"Score"}),e.jsx(a,{children:"Result"}),e.jsx(a,{className:"text-center",children:"Actions"})]}),e.jsx(oe,{emptyContent:"No rows to display.",children:U().map(s=>e.jsxs(ce,{children:[e.jsx(i,{children:s.UserInputId}),e.jsx(i,{children:s.LRN}),e.jsx(i,{children:s.Section}),e.jsx(i,{children:s.ActivityCode}),e.jsx(i,{children:s.Type}),e.jsx(i,{children:s.Score}),e.jsx(i,{children:s.Result}),e.jsx(i,{className:"text-center",children:e.jsxs("div",{className:"table-buttons",children:[e.jsx(h,{color:"primary",onClick:()=>K(s),children:"View"}),e.jsx(h,{color:"danger",onClick:()=>O(s),children:"Delete"})]})})]},s._id))})]}),e.jsx(G,{previousLabel:"Previous",nextLabel:"Next",breakLabel:"...",breakClassName:"break-me",pageCount:z(),marginPagesDisplayed:2,pageRangeDisplayed:5,onPageChange:H,containerClassName:"pagination",activeClassName:"active"})]})]})})})})]})},Be=()=>e.jsxs("div",{className:"w-full h-full flex",children:[e.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6]",children:e.jsx(B,{})}),e.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[e.jsx(X,{}),e.jsx(de,{})]})]});export{Be as default};
