import{j as e,L as B,r as l,a as J}from"./index-CXtfmwZQ.js";import{A as G}from"./AdminSidebar-DqYJhNt7.js";import{l as W}from"./index-pAZREUIK.js";import{R as $}from"./react-paginate-Dk6f_v4e.js";import{P as b,F as A,d as Q,i as X}from"./index-CM3tdvt6.js";import{C as Y}from"./ContentHeader-C6WfBba0.js";import{P as Z,t as ee,a as se,b as a,c as te,d as le,e as i}from"./PrintRecord-B0iTxoNS.js";import{m as ae,a as ie,b as re,c as ne,d as oe}from"./chunk-P2T5LMDM-vGbn1626.js";import{b as h}from"./chunk-DBLREEYE-FY3488ZC.js";import{D as ce}from"./DeletePerformance-DoKo6EEv.js";import{t as R}from"./profile-C3-SQTJL.js";import{s as D,l as t}from"./chunk-CEHIK4GH-BVkK9qkA.js";import"./useOverlayTriggerState-DaPpTKZA.js";import"./useDialog-q1ilz28J.js";import"./useLabels-mzJkRGwl.js";import"./VisuallyHidden-CmE0bZKs.js";import"./chunk-KBN3H6OQ-Buzcug8b.js";import"./chunk-CAFRINWI-CMvs8fyY.js";import"./useField-C3TM-VGB.js";import"./chunk-CIZQCQPA-BLAwQ4xO.js";import"./useFormReset-q0VssPgm.js";const k=({show:x,onHide:c,performance:d})=>e.jsx(ae,{isOpen:x,onClose:c,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(ie,{children:[e.jsx(re,{className:"flex flex-col",id:"edit-user-modal-title",children:"View Performance Information"}),e.jsx(ne,{children:e.jsx("p",{children:"Do you want to view the performance of the student selected?"})}),e.jsxs(oe,{children:[e.jsx(h,{color:"danger",variant:"light",onClick:c,children:"Cancel"}),e.jsx(B,{to:`/AdminViewStudentPerformance/${d==null?void 0:d.UserInputId}`,children:e.jsx(h,{color:"primary",children:"View"})})]})]})});k.propTypes={show:b.bool.isRequired,onHide:b.func.isRequired,performance:b.object};const de=()=>{const[x,c]=l.useState(!1),[d,w]=l.useState(!1),[I,v]=l.useState(!1),[u,T]=l.useState([]),[S,P]=l.useState(null),[V,L]=l.useState(0),[f]=l.useState(9),[g,N]=l.useState([]),[j,E]=l.useState(""),[p,F]=l.useState(""),y=l.useRef(null),{onDownload:M}=W.useDownloadExcel({currentTableRef:y.current,filename:"Performance_List_Report",sheet:"Performance",data:u.map(({_id:s,...r})=>r)}),C=()=>{J.get("/api/getPerformance").then(s=>{T(s.data),N(s.data)}).catch(s=>console.log(s))};l.useEffect(()=>{C()},[]);const H=s=>{L(s.selected)},_=(s,r)=>{const m=s.target.value;r==="section"?E(m):r==="type"&&F(m);let n=u;m&&(n=u.filter(o=>r==="section"?o.Section===m:o.Type===m)),j&&r==="type"&&(n=n.filter(o=>o.Section===j)),p&&r==="section"&&(n=n.filter(o=>o.Type===p)),N(n)},K=()=>{c(!0)},O=s=>{P(s),w(!0)},U=s=>{P(s),v(!0)},q=()=>{const s=V*f;return g.slice(s,s+f)},z=()=>Math.ceil(g.length/f);return e.jsxs("div",{className:"px-9",children:[e.jsx(Z,{show:x,onHide:()=>c(!1),print:M}),e.jsx(k,{show:d,onHide:()=>w(!1),performance:S}),e.jsx(ce,{show:I,onHide:()=>v(!1),performance:S,refreshActivities:C}),e.jsxs("div",{className:"content-title-header",children:[e.jsxs("div",{children:["Student Performance",e.jsx(R,{showArrow:!0,content:e.jsxs("div",{className:"px-1 py-2",children:[e.jsx("div",{className:"text-small font-bold",children:"Performance Table"}),e.jsx("div",{className:"text-tiny",children:"This function will view the performance of your students in each section."})]}),children:e.jsx(A,{icon:Q,size:"1x",className:"help-icon"})})]}),e.jsx("div",{className:"generate-report",children:e.jsx(R,{showArrow:!0,content:e.jsxs("div",{className:"px-1 py-2",children:[e.jsx("div",{className:"text-small font-bold",children:"Print"}),e.jsx("div",{className:"text-tiny",children:"Generate report/Print table"})]}),children:e.jsx(A,{icon:X,size:"1x",className:"print-icon",onClick:K})})})]}),e.jsx("div",{className:"content-container",children:e.jsx("div",{className:"row",children:e.jsx("div",{className:"col",children:e.jsxs("div",{className:"card mt-1 border-0",children:[e.jsxs("div",{className:"flex flex-row gap-2 mb-4",children:[e.jsxs(D,{className:"w-[20%]",labelPlacement:"outside",label:"Section",placeholder:"Select Section",variant:"bordered",defaultSelectedKeys:[""],onChange:s=>_(s,"section"),value:j,children:[e.jsx(t,{children:"All"},""),e.jsx(t,{children:"Aster"},"Aster"),e.jsx(t,{children:"Camia"},"Camia"),e.jsx(t,{children:"Dahlia"},"Dahlia"),e.jsx(t,{children:"Iris"},"Iris"),e.jsx(t,{children:"Jasmin"},"Jasmin"),e.jsx(t,{children:"Orchid"},"Orchid"),e.jsx(t,{children:"Rose"},"Rose"),e.jsx(t,{children:"Tulip"},"Tulip"),e.jsx(t,{children:"SSC"},"SSC")]}),e.jsxs(D,{className:"w-[20%]",labelPlacement:"outside",label:"Assessment",placeholder:"Select Type of Assessment",variant:"bordered",defaultSelectedKeys:[""],onChange:s=>_(s,"type"),value:p,children:[e.jsx(t,{children:"All"},""),e.jsx(t,{children:"Assessment 1"},"Pagbabaybay"),e.jsx(t,{children:"Assessment 2"},"Pantig"),e.jsx(t,{children:"Assessment 3"},"Salita"),e.jsx(t,{children:"Assessment 4"},"Pagbabasa")]})]}),e.jsxs("div",{className:"card-body scrollable-table scrollable-container",children:[e.jsxs(ee,{ref:y,removeWrapper:!0,color:"primary",selectionMode:"single",children:[e.jsxs(se,{children:[e.jsx(a,{children:"Input ID"}),e.jsx(a,{children:"LRN"}),e.jsx(a,{children:"Section"}),e.jsx(a,{children:"Activity Code"}),e.jsx(a,{children:"Type"}),e.jsx(a,{children:"Score"}),e.jsx(a,{children:"Result"}),e.jsx(a,{className:"text-center",children:"Actions"})]}),e.jsx(te,{emptyContent:"No rows to display.",children:q().map(s=>e.jsxs(le,{children:[e.jsx(i,{children:s.UserInputId}),e.jsx(i,{children:s.LRN}),e.jsx(i,{children:s.Section}),e.jsx(i,{children:s.ActivityCode}),e.jsx(i,{children:s.Type}),e.jsx(i,{children:s.Score}),e.jsx(i,{children:s.Result}),e.jsx(i,{className:"text-center",children:e.jsxs("div",{className:"table-buttons",children:[e.jsx(h,{color:"primary",onClick:()=>O(s),children:"View"}),e.jsx(h,{className:"bg-[#ff505b] text-white",onClick:()=>U(s),children:"Delete"})]})})]},s._id))})]}),e.jsx($,{previousLabel:"Previous",nextLabel:"Next",breakLabel:"...",breakClassName:"break-me",pageCount:z(),marginPagesDisplayed:2,pageRangeDisplayed:5,onPageChange:H,containerClassName:"pagination",activeClassName:"active"})]})]})})})})]})},Ie=()=>e.jsxs("div",{className:"w-full h-full flex",children:[e.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6] shadow-lg",children:e.jsx(G,{})}),e.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[e.jsx(Y,{}),e.jsx(de,{})]})]});export{Ie as default};
