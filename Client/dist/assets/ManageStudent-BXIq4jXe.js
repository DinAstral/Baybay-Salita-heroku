import{j as e,L as S,r as t,U as se,a as M}from"./index-B79Lp1Sb.js";import{C as te}from"./ContentHeader-D9qUqZMF.js";import{S as ae}from"./Sidebar-CSUWXeww.js";import{l as le}from"./index-BhCuoFHt.js";import{R as ie}from"./react-paginate-C4QOuzEa.js";import{P as d,F as p,d as re,i as oe,j as ne}from"./index-D4iS7rHE.js";import{P as de,t as ce,a as he,b as o,c as me,d as xe,e as n}from"./PrintRecord-ey893QW0.js";import{m as b,a as g,b as w,c as N}from"./chunk-P2T5LMDM-CsRz1fQ4.js";import{m as v}from"./chunk-LT4XONRR-Cq-iOy3d.js";import{b as c}from"./chunk-DBLREEYE-C-H-JCr7.js";import{D as ue}from"./DeleteStudent-BrbO3XBM.js";import{t as T}from"./profile-DMRa1GgG.js";import{i as fe}from"./chunk-GQQM5TNQ-tY51uwqH.js";import"./getChildNodes-DIw3H4Lt.js";import"./useOverlayTriggerState-BuaucyBg.js";import"./useDialog-Bt-U2vEu.js";import"./useLabels-CHoZES-g.js";import"./VisuallyHidden-DEDZOC4H.js";import"./Overlay-Camil_-P.js";import"./chunk-KBN3H6OQ-DIhqdszT.js";import"./useField-CgV5KgWF.js";import"./chunk-CIZQCQPA-D7mxbdH2.js";import"./useFormReset-MCMICyhn.js";const A=({show:a,onHide:l,student:i})=>e.jsx(b,{isOpen:a,onClose:l,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(v,{children:[e.jsx(g,{className:"flex flex-col",id:"edit-user-modal-title",children:"View Student Information"}),e.jsx(w,{children:e.jsx("p",{children:"Do you want to view the profile of student selected?"})}),e.jsxs(N,{children:[e.jsx(c,{color:"danger",variant:"light",onClick:l,children:"Cancel"}),e.jsx(S,{to:`/viewStudent/${i==null?void 0:i._id}`,children:e.jsx(c,{color:"primary",children:"View"})})]})]})});A.propTypes={show:d.bool.isRequired,onHide:d.func.isRequired,student:d.object};const U=({show:a,onHide:l})=>e.jsx(b,{isOpen:a,onClose:l,"aria-labelledby":"add-user-modal-title",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(v,{children:[e.jsx(g,{className:"flex flex-col",id:"add-user-modal-title",children:"Add Student Information"}),e.jsx(w,{children:e.jsx("p",{children:"Do you want to add student information?"})}),e.jsxs(N,{children:[e.jsx(c,{color:"danger",variant:"light",onClick:l,children:"Cancel"}),e.jsx(S,{to:"/addStudent",children:e.jsx(c,{color:"primary",children:"Add"})})]})]})});U.propTypes={show:d.bool.isRequired,onHide:d.func.isRequired};const F=({show:a,onHide:l,student:i})=>e.jsx(b,{isOpen:a,onClose:l,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(v,{children:[e.jsx(g,{className:"flex flex-col",id:"contained-modal-title-vcenter",children:"Update Student Information"}),e.jsx(w,{children:e.jsx("p",{children:"Are you sure you want to update this student's information?"})}),e.jsxs(N,{children:[e.jsx(c,{color:"danger",variant:"light",onClick:l,children:"Cancel"}),e.jsx(S,{to:`/editStudent/${i==null?void 0:i._id}`,children:e.jsx(c,{color:"primary",children:"Update"})})]})]})});F.propTypes={show:d.bool.isRequired,onHide:d.func.isRequired,student:d.object};const je=()=>{const{user:a}=t.useContext(se),[l,i]=t.useState(!1),[I,y]=t.useState(!1),[H,C]=t.useState(!1),[V,_]=t.useState(!1),[q,R]=t.useState(!1),[m,D]=t.useState([]),[P,z]=t.useState([]),[x,G]=t.useState(""),[u,L]=t.useState(null),[K,O]=t.useState(0),[f]=t.useState(10),[j,pe]=t.useState(""),[h,$]=t.useState(""),k=t.useRef(null),{onDownload:B}=le.useDownloadExcel({currentTableRef:k.current,filename:"Student_List_Report_table",sheet:"Students"});t.useEffect(()=>{a&&a.UserID&&M.get(`/api/getTeacher/${a.UserID}`).then(s=>{G(s.data.Section)}).catch(s=>console.log(s))},[a]),t.useEffect(()=>{M.get("/api/getStudents").then(s=>{D(s.data)}).catch(s=>console.log(s))},[]),t.useEffect(()=>{let s=m;x&&(s=s.filter(r=>r.Section===x)),h&&(s=s.filter(r=>r.FirstName.toLowerCase().includes(h.toLowerCase())||r.LastName.toLowerCase().includes(h.toLowerCase())||r.LRN.includes(h))),j&&(s=s.filter(r=>r.Section===j)),z(s)},[h,j,m,x]);const Q=()=>y(!0),W=s=>{L(s),_(!0)},J=s=>{L(s),C(!0)},X=s=>{D(m.filter(r=>r._id!==s)),R(!1)},Y=s=>O(s.selected),E=K*f,Z=P.slice(E,E+f),ee=s=>{switch(s){case"Grade Ready Reader":return"text-green-600 font-semibold";case"Transitioning Reader":return"text-blue-600 font-semibold";case"Developing Reader":return"text-orange-600 font-semibold";case"Low Emerging Reader":return"text-red-600 font-semibold";case"High Emerging Reader":return"text-red-600 font-semibold";case"Incomplete":return"text-gray-600 italic";default:return"text-black"}};return e.jsxs("div",{className:"px-9",children:[e.jsx(de,{show:I,onHide:()=>y(!1),print:B}),e.jsx(U,{show:l,onHide:()=>i(!1)}),e.jsx(A,{show:V,onHide:()=>_(!1),student:u}),e.jsx(F,{show:H,student:u,onHide:()=>C(!1)}),e.jsx(ue,{show:q,onHide:()=>R(!1),student:u,onDeleteSuccess:X}),e.jsxs("div",{className:"content-title-header",children:[e.jsxs("div",{children:["Manage Student",e.jsx(T,{showArrow:!0,content:e.jsxs("div",{className:"px-1 py-2",children:[e.jsx("div",{className:"text-small font-bold",children:"Student Table"}),e.jsx("div",{className:"text-tiny",children:"This function will view the list of the students in each section."})]}),children:e.jsx(p,{icon:re,size:"1x",className:"help-icon"})})]}),e.jsx("div",{className:"generate-report",children:e.jsx(T,{showArrow:!0,content:e.jsxs("div",{className:"px-1 py-2",children:[e.jsx("div",{className:"text-small font-bold",children:"Print"}),e.jsx("div",{className:"text-tiny",children:"Generate report/Print table"})]}),children:e.jsx(p,{icon:oe,size:"1x",className:"print-icon",onClick:Q})})})]}),e.jsx("div",{className:"content-container",children:e.jsx("div",{className:"row",children:e.jsx("div",{className:"col",children:e.jsxs("div",{className:"card mt-1 border-0",children:[e.jsx("div",{className:"list-header-drop-score",children:e.jsx("div",{className:"w-[40%] flex pt-4",children:e.jsx(fe,{type:"text",placeholder:"Search Student Name or LRN",variant:"bordered",startContent:e.jsx(p,{icon:ne,size:"1x",inverse:!0,className:"text-2xl text-default-400 pointer-events-none flex-shrink-0"}),onChange:s=>$(s.target.value)})})}),e.jsxs("div",{className:"card-body scrollable-table scrollable-container",children:[e.jsxs(ce,{ref:k,removeWrapper:!0,color:"primary",selectionMode:"single",children:[e.jsxs(he,{children:[e.jsx(o,{children:"LRN"}),e.jsx(o,{children:"First Name"}),e.jsx(o,{children:"Last Name"}),e.jsx(o,{children:"Age"}),e.jsx(o,{children:"Section"}),e.jsx(o,{children:"Mother Tongue"}),e.jsx(o,{children:"Gender"}),e.jsx(o,{children:"Status"})," ",e.jsx(o,{className:"text-center",children:"Actions"})]}),e.jsx(me,{emptyContent:"No rows to display.",children:Z.map(s=>e.jsxs(xe,{children:[e.jsx(n,{children:s.LRN}),e.jsx(n,{children:s.FirstName}),e.jsx(n,{children:s.LastName}),e.jsx(n,{children:s.Age}),e.jsx(n,{children:s.Section}),e.jsx(n,{children:s.MotherTongue}),e.jsx(n,{children:s.Gender}),e.jsx(n,{children:e.jsx("span",{className:ee(s.status),children:s.status})}),e.jsx(n,{children:e.jsxs("div",{className:"flex justify-center gap-2",children:[e.jsx(c,{color:"default",size:"sm",onClick:()=>W(s),children:"View"}),e.jsx(c,{color:"primary",size:"sm",onClick:()=>J(s),children:"Update"})]})})]},s._id))})]}),e.jsx(ie,{previousLabel:"Previous",nextLabel:"Next",breakLabel:"...",breakClassName:"break-me",pageCount:Math.ceil(P.length/f),marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:Y,containerClassName:"pagination",activeClassName:"active"})]})]})})})})]})},qe=()=>e.jsxs("div",{className:"w-full h-full flex",children:[e.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6] shadow-lg",children:e.jsx(ae,{})}),e.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[e.jsx(te,{}),e.jsx(je,{})]})]});export{qe as default};