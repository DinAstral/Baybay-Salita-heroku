import{j as e,r as t}from"./react-BCcS7c0c.js";import{A as Q}from"./AdminSidebar-D1UWcytW.js";import{l as W}from"./react-export-table-to-excel-CDdXcfrC.js";import{R as X}from"./react-paginate-BYTMUaIF.js";import{F as p,d as Y,i as Z,j as $}from"./@fortawesome-BVdY808A.js";import{a as ee}from"./axios-CCb-kr4I.js";import{C as se}from"./ContentHeader-DwIQzFOv.js";import{P as te}from"./PrintRecord-LBy-exmt.js";import{V as ae,U as le}from"./UpdateStudent-Dy7pziZp.js";import{P as _}from"./prop-types-LuavYUF2.js";import{L as re}from"./react-router-dom-Dk6_dLEo.js";import{m as ie,f as ne,g as oe,h as de,j as ce,b as n,t as R,s as me,l as a,i as he,k as xe,n as ue,o as l,p as fe,q as je,r}from"./@nextui-org-CLkIIHEi.js";import{D as pe}from"./DeleteStudent-CRPEdoRc.js";import"./@babel-m2JXyA6a.js";import"./profile-Berhznzr.js";import"./index-DzzbZJ-V.js";import"./react-dom-rv-KAOpM.js";import"./scheduler-CzFDRTuY.js";import"./react-hot-toast-Dux6v_Wl.js";import"./goober-vt3s6TGe.js";import"./react-router-MkLRJz4d.js";import"./@remix-run-BOUEh3jQ.js";import"./@react-aria-CfXSs2UI.js";import"./@react-stately-ChQ0zIrC.js";import"./clsx-B-dksMZM.js";import"./@swc-DS7M6wx8.js";import"./@internationalized-BB0Nk989.js";import"./framer-motion-BvVSIgoR.js";import"./react-textarea-autosize-bEG1sDiq.js";import"./use-latest-2zZSkz0C.js";import"./use-isomorphic-layout-effect-Co3QFFXf.js";import"./use-composed-ref-BmZZpR7Y.js";import"./tailwind-variants-ayMnMv5e.js";import"./tailwind-merge-Dc5vmgZ1.js";const D=({show:m,onHide:o})=>e.jsx(ie,{isOpen:m,onClose:o,"aria-labelledby":"add-user-modal-title",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(ne,{children:[e.jsx(oe,{className:"flex flex-col",id:"add-user-modal-title",children:"Add Student Information"}),e.jsx(de,{children:e.jsx("p",{children:"Do you want to add student information?"})}),e.jsxs(ce,{children:[e.jsx(n,{color:"danger",variant:"light",onClick:o,children:"Cancel"}),e.jsx(re,{to:"/adminAddStudent",children:e.jsx(n,{color:"primary",children:"Add"})})]})]})});D.propTypes={show:_.bool.isRequired,onHide:_.func.isRequired};const Se=()=>{const[m,o]=t.useState(!1),[k,S]=t.useState(!1),[P,b]=t.useState(!1),[A,g]=t.useState(!1),[L,h]=t.useState(!1),[x,w]=t.useState([]),[N,v]=t.useState([]),[u,f]=t.useState(null),[E,M]=t.useState(0),[j]=t.useState(10),[c,T]=t.useState(""),[d,F]=t.useState(""),C=t.useRef(null),{onDownload:H}=W.useDownloadExcel({currentTableRef:C.current,filename:"Student_List_Report_table",sheet:"Students"});t.useEffect(()=>{ee.get("/api/getStudents").then(s=>{w(s.data),v(s.data)}).catch(s=>console.log(s))},[]),t.useEffect(()=>{let s=x;d&&(s=s.filter(i=>i.FirstName.toLowerCase().includes(d.toLowerCase())||i.LastName.toLowerCase().includes(d.toLowerCase())||i.LRN.includes(d))),c&&(s=s.filter(i=>i.Section===c)),v(s)},[d,c,x]);const z=()=>{S(!0)},I=()=>{o(!0)},V=s=>{f(s),g(!0)},B=s=>{f(s),b(!0)},G=s=>{f(s),h(!0)},U=s=>{w(x.filter(i=>i._id!==s)),h(!1)},q=s=>{M(s.selected)},y=E*j,O=N.slice(y,y+j),J=s=>{const i=s.target.value;T(i)},K=s=>{switch(s){case"Grade Ready Reader":return"text-green-600 font-semibold";case"Transitioning Reader":return"text-blue-600 font-semibold";case"Developing Reader":return"text-orange-600 font-semibold";case"Low Emerging Reader":return"text-red-600 font-semibold";case"High Emerging Reader":return"text-red-600 font-semibold";case"Incomplete":return"text-gray-600 italic";default:return"text-black"}};return e.jsxs("div",{className:"px-9",children:[e.jsx(te,{show:k,onHide:()=>S(!1),print:H}),e.jsx(D,{show:m,onHide:()=>o(!1)}),e.jsx(ae,{show:A,onHide:()=>g(!1),student:u}),e.jsx(le,{show:P,student:u,onHide:()=>b(!1)}),e.jsx(pe,{show:L,onHide:()=>h(!1),student:u,onDeleteSuccess:U}),e.jsxs("div",{className:"content-title-header",children:[e.jsxs("div",{children:["Manage Student",e.jsx(R,{showArrow:!0,content:e.jsxs("div",{className:"px-1 py-2",children:[e.jsx("div",{className:"text-small font-bold",children:"Student Table"}),e.jsx("div",{className:"text-tiny",children:"This function will view the list of the students in each section."})]}),children:e.jsx(p,{icon:Y,size:"1x",className:"help-icon"})})]}),e.jsx("div",{className:"generate-report",children:e.jsx(R,{showArrow:!0,content:e.jsxs("div",{className:"px-1 py-2",children:[e.jsx("div",{className:"text-small font-bold",children:"Print"}),e.jsx("div",{className:"text-tiny",children:"Generate report/Print table"})]}),children:e.jsx(p,{icon:Z,size:"1x",className:"print-icon",onClick:z})})})]}),e.jsx("div",{className:"content-container",children:e.jsx("div",{className:"row",children:e.jsx("div",{className:"col",children:e.jsxs("div",{className:"card mt-1 border-0",children:[e.jsxs("div",{className:"list-header-drop-score",children:[e.jsxs(me,{className:"w-[20%]",labelPlacement:"outside",label:"Sort by Section",variant:"bordered",defaultSelectedKeys:[""],onChange:J,"aria-label":"Filter students by section",value:c,children:[e.jsx(a,{children:"Select Section"},""),e.jsx(a,{children:"Aster"},"Aster"),e.jsx(a,{children:"Camia"},"Camia"),e.jsx(a,{children:"Dahlia"},"Dahlia"),e.jsx(a,{children:"Iris"},"Iris"),e.jsx(a,{children:"Jasmin"},"Jasmin"),e.jsx(a,{children:"Orchid"},"Orchid"),e.jsx(a,{children:"Rose"},"Rose"),e.jsx(a,{children:"Tulip"},"Tulip"),e.jsx(a,{children:"SSC"},"SSC")]}),e.jsx("div",{className:"w-[40%] flex pt-8",children:e.jsx(he,{type:"text",placeholder:"Search Student Name or LRN",variant:"bordered",startContent:e.jsx(p,{icon:$,size:"1x",inverse:!0,className:"text-2xl text-default-400 pointer-events-none flex-shrink-0"}),onChange:s=>F(s.target.value)})}),e.jsx("div",{className:"back-button-profile",children:e.jsx(n,{auto:!0,color:"primary",className:"",onClick:()=>I(),children:"Add Student"})})]}),e.jsxs("div",{className:"card-body scrollable-table scrollable-container",children:[e.jsxs(xe,{ref:C,removeWrapper:!0,color:"primary",selectionMode:"single",children:[e.jsxs(ue,{children:[e.jsx(l,{children:"LRN"}),e.jsx(l,{children:"First Name"}),e.jsx(l,{children:"Last Name"}),e.jsx(l,{children:"Age"}),e.jsx(l,{children:"Section"}),e.jsx(l,{children:"Birthday"}),e.jsx(l,{children:"Mother Tongue"}),e.jsx(l,{children:"Gender"}),e.jsx(l,{children:"Status"})," ",e.jsx(l,{className:"text-center",children:"Actions"})]}),e.jsx(fe,{emptyContent:"No rows to display.",children:O.map(s=>e.jsxs(je,{children:[e.jsx(r,{children:s.LRN}),e.jsx(r,{children:s.FirstName}),e.jsx(r,{children:s.LastName}),e.jsx(r,{children:s.Age}),e.jsx(r,{children:s.Section}),e.jsx(r,{children:s.Birthday}),e.jsx(r,{children:s.MotherTongue}),e.jsx(r,{children:s.Gender}),e.jsx(r,{children:e.jsx("span",{className:K(s.status),children:s.status})}),e.jsx(r,{children:e.jsxs("div",{className:"flex justify-center gap-2",children:[e.jsx(n,{color:"default",size:"sm",onClick:()=>V(s),children:"View"}),e.jsx(n,{color:"primary",size:"sm",onClick:()=>B(s),children:"Update"}),e.jsx(n,{color:"danger",size:"sm",onClick:()=>G(s),children:"Delete"})]})})]},s._id))})]}),e.jsx(X,{previousLabel:"Previous",nextLabel:"Next",breakLabel:"...",breakClassName:"break-me",pageCount:Math.ceil(N.length/j),marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:q,containerClassName:"pagination",activeClassName:"active"})]})]})})})})]})},$e=()=>e.jsxs("div",{className:"w-full h-full flex",children:[e.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6]",children:e.jsx(Q,{})}),e.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[e.jsx(se,{}),e.jsx(Se,{})]})]});export{$e as default};
