import{j as e,L as p,r as c,a as A,_ as B}from"./index-B7MPDMra.js";import{A as Y}from"./AdminSidebar-hpWMdrn7.js";import{C as G}from"./ContentHeader-CLqeOHbp.js";import{P as Q,t as W,a as J,b,c as X,d as Z,e as w}from"./PrintRecord-_BwnpoNg.js";import{P as t,F as g,d as ee,i as se,j as le}from"./index-C254uZew.js";import{m as h,a as x,b as m,c as j}from"./chunk-P2T5LMDM-peo3FA51.js";import{m as f}from"./chunk-LT4XONRR-CECnONwD.js";import{b as a}from"./chunk-DBLREEYE-BBTKcXgi.js";import{l as re}from"./index-BVONtYvv.js";import{R as ie}from"./react-paginate-L_N3Alhv.js";import{t as R}from"./profile-F0OvA6C9.js";import{s as te,l as v}from"./chunk-CEHIK4GH-BiVCugjE.js";import{i as ae}from"./chunk-GQQM5TNQ-3AqrG7fD.js";import"./useOverlayTriggerState-B7DmzVKq.js";import"./useDialog-DxlzFUnp.js";import"./useLabels-DBq97qWD.js";import"./VisuallyHidden-BptF3qJE.js";import"./Overlay-BuIxXbGb.js";import"./chunk-KBN3H6OQ-DUiqG_tn.js";import"./useField-CUjDOBJZ.js";import"./chunk-CIZQCQPA-BNeo4a9C.js";import"./useFormReset-vmAMJXSZ.js";const S=({show:r,onHide:s})=>e.jsx(h,{isOpen:r,onClose:s,"aria-labelledby":"add-user-modal-title",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(f,{children:[e.jsx(x,{className:"flex flex-col",id:"add-user-modal-title",children:"Add User Information"}),e.jsx(m,{children:e.jsx("p",{children:"Do you want to add a user?"})}),e.jsxs(j,{children:[e.jsx(a,{color:"danger",variant:"light",onClick:s,children:"Cancel"}),e.jsx(p,{to:"/adminAddUser",children:e.jsx(a,{color:"primary",children:"Add"})})]})]})});S.propTypes={show:t.bool.isRequired,onHide:t.func.isRequired};const k=({show:r,onHide:s,user:l})=>e.jsx(h,{isOpen:r,onClose:s,"aria-labelledby":"edit-user-modal-title",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(f,{children:[e.jsx(x,{className:"flex flex-col",id:"edit-user-modal-title",children:"Add User Information"}),e.jsx(m,{children:e.jsx("p",{children:"You are now going to update the selected user. Do you wish to continue?"})}),e.jsxs(j,{children:[e.jsx(a,{variant:"light",color:"danger",onClick:s,children:"Cancel"}),e.jsx(p,{to:`/AdminEditUser/${l==null?void 0:l._id}`,children:e.jsx(a,{color:"primary",children:"Update"})})]})]})});k.propTypes={show:t.bool.isRequired,onHide:t.func.isRequired,user:t.object};const q=({show:r,onHide:s,user:l})=>e.jsx(h,{isOpen:r,onClose:s,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(f,{children:[e.jsx(x,{className:"flex flex-col",id:"edit-user-modal-title",children:"View Parent Information"}),e.jsx(m,{children:e.jsx("p",{children:"Do you want to View the profile of Parent selected?"})}),e.jsxs(j,{children:[e.jsx(a,{color:"danger",variant:"light",onClick:s,children:"Cancel"}),e.jsx(p,{to:`/adminViewParent/${l==null?void 0:l.UserID}`,children:e.jsx(a,{color:"primary",children:"View"})})]})]})});q.propTypes={show:t.bool.isRequired,onHide:t.func.isRequired,user:t.object};const E=({show:r,onHide:s,user:l})=>e.jsx(h,{isOpen:r,onClose:s,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(f,{children:[e.jsx(x,{className:"flex flex-col",id:"edit-user-modal-title",children:"View Teacher Information"}),e.jsx(m,{children:e.jsx("p",{children:"Do you want to view the profile of teacher selected?"})}),e.jsxs(j,{children:[e.jsx(a,{color:"danger",variant:"light",onClick:s,children:"Cancel"}),e.jsx(p,{to:`/adminViewTeacher/${l==null?void 0:l.UserID}`,children:e.jsx(a,{color:"primary",children:"View"})})]})]})});E.propTypes={show:t.bool.isRequired,onHide:t.func.isRequired,user:t.object};const I=({show:r,onHide:s,user:l})=>e.jsx(h,{isOpen:r,onClose:s,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(f,{children:[e.jsx(x,{className:"flex flex-col",id:"contained-modal-title-vcenter",children:"Update Parent Information"}),e.jsx(m,{children:e.jsx("p",{children:"Are you sure you want to update this parent's information?"})}),e.jsxs(j,{children:[e.jsx(a,{color:"danger",variant:"light",onClick:s,children:"Cancel"}),e.jsx(p,{to:`/adminEditParent/${l==null?void 0:l._id}`,children:e.jsx(a,{color:"primary",children:"Update"})})]})]})});I.propTypes={show:t.bool.isRequired,onHide:t.func.isRequired,user:t.object};const V=({show:r,onHide:s,user:l})=>e.jsx(h,{isOpen:r,onClose:s,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(f,{children:[e.jsx(x,{className:"flex flex-col",id:"contained-modal-title-vcenter",children:"Update Teacher Information"}),e.jsx(m,{children:e.jsx("p",{children:"Are you sure you want to update this teacher's information?"})}),e.jsxs(j,{children:[e.jsx(a,{color:"danger",variant:"light",onClick:s,children:"Cancel"}),e.jsx(p,{to:`/adminEditTeacher/${l==null?void 0:l._id}`,children:e.jsx(a,{color:"primary",children:"Update"})})]})]})});V.propTypes={show:t.bool.isRequired,onHide:t.func.isRequired,user:t.object};const ne=({show:r,onHide:s})=>e.jsx(h,{isOpen:r,onClose:s,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(f,{children:[e.jsx(x,{id:"contained-modal-title-vcenter",children:"Delete User Successful"}),e.jsx(m,{children:e.jsx("p",{children:"You have deleted the User information."})}),e.jsx(j,{children:e.jsx(a,{color:"danger",onClick:s,children:"Close"})})]})}),H=({show:r,onHide:s,user:l,onDeleteSuccess:o})=>{const[d,u]=c.useState(!1),y=async()=>{try{await A.delete(`/api/deleteUser/${l.email}`),u(!0),o()}catch(C){console.error("Error deleting user:",C),B.error("Failed to delete user. Please try again later.")}};return e.jsxs(e.Fragment,{children:[e.jsx(h,{isOpen:r,onClose:s,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(f,{children:[e.jsx(x,{id:"contained-modal-title-vcenter",children:"Delete User Information"}),e.jsx(m,{children:e.jsx("p",{children:"Are you sure you want to delete this User's information?"})}),e.jsxs(j,{children:[e.jsx(a,{color:"default",variant:"light",onClick:s,children:"Cancel"}),e.jsx(a,{color:"danger",onClick:y,children:"Delete"})]})]})}),e.jsx(ne,{show:d,onHide:()=>{u(!1),s()}})]})};H.propTypes={show:t.bool.isRequired,onHide:t.func.isRequired,onDeleteSuccess:t.func.isRequired,user:t.object};const oe=(r,s,l)=>{let o=r;return s!=="default"&&(o=o.filter(d=>d.role===s)),l&&(o=o.filter(d=>d.email.toLowerCase().includes(l.toLowerCase()))),o},de=(r,s,l)=>{const o=s*l;return r.slice(o,o+l)},ce=()=>{const[r,s]=c.useState({add:!1,print:!1,editUser:!1,editTeacher:!1,viewTeacher:!1,editParent:!1,viewParent:!1,delete:!1}),[l,o]=c.useState([]),[d,u]=c.useState(null),[y,C]=c.useState(0),[D]=c.useState(10),[U,K]=c.useState(""),[N,O]=c.useState("default"),_=c.useRef(null),{onDownload:F}=re.useDownloadExcel({currentTableRef:_.current,filename:"Users table",sheet:"Users"}),P=async()=>{try{const i=await A.get("/api/users");o(i.data)}catch(i){console.error(i)}};c.useEffect(()=>{P()},[]);const T=oe(l,N,U),M=de(T,y,D),n=(i,L)=>{s(z=>({...z,[i]:L}))},$=i=>{C(i.selected)};return e.jsxs("div",{className:"px-9",children:[e.jsx(S,{show:r.add,onHide:()=>n("add",!1)}),e.jsx(k,{show:r.editUser,onHide:()=>n("editUser",!1),user:d}),e.jsx(Q,{show:r.print,onHide:()=>n("print",!1),print:F}),e.jsx(E,{show:r.viewTeacher,user:d,onHide:()=>n("viewTeacher",!1)}),e.jsx(V,{show:r.editTeacher,user:d,onHide:()=>n("editTeacher",!1)}),e.jsx(q,{show:r.viewParent,user:d,onHide:()=>n("viewParent",!1)}),e.jsx(I,{show:r.editParent,user:d,onHide:()=>n("editParent",!1)}),e.jsx(H,{show:r.delete,onHide:()=>n("delete",!1),user:d,onDeleteSuccess:P}),e.jsxs("div",{className:"content-title-header",children:[e.jsxs("div",{children:["Manage User",e.jsx(R,{showArrow:!0,content:e.jsxs("div",{className:"px-1 py-2",children:[e.jsx("div",{className:"text-small font-bold",children:"User Table"}),e.jsx("div",{className:"text-tiny",children:"This function will view the information of the students in the system."})]}),children:e.jsx(g,{icon:ee,size:"1x",className:"help-icon"})})]}),e.jsx("div",{className:"generate-report",children:e.jsx(R,{showArrow:!0,content:e.jsxs("div",{className:"px-1 py-2",children:[e.jsx("div",{className:"text-small font-bold",children:"Print"}),e.jsx("div",{className:"text-tiny",children:"Generate report/Print table"})]}),children:e.jsx(g,{icon:se,size:"1x",className:"print-icon",onClick:()=>n("print",!0)})})})]}),e.jsx("div",{className:"content-container",children:e.jsx("div",{className:"row",children:e.jsxs("div",{className:"col",children:[e.jsxs("div",{className:"card mt-1 border-0",children:[e.jsxs("div",{className:"list-header-drop-score",children:[e.jsxs(te,{labelPlacement:"outside",label:"Role",variant:"bordered",className:"bg-transparent w-[20%]",onChange:i=>O(i.target.value),value:N,children:[e.jsx(v,{children:"All"},"default"),e.jsx(v,{children:"Admin"},"Admin"),e.jsx(v,{children:"Parent"},"Parent"),e.jsx(v,{children:"Teacher"},"Teacher")]}),e.jsx("div",{className:"w-[40%] flex pt-8",children:e.jsx(ae,{variant:"bordered",type:"text",placeholder:"Enter User Email",value:U,onChange:i=>K(i.target.value),startContent:e.jsx(g,{icon:le,size:"1x",inverse:!0,className:"text-2xl text-default-400 pointer-events-none flex-shrink-0"})})}),e.jsx("div",{className:"back-button-profile",children:e.jsx(a,{color:"primary",className:"w-[120px] text-md p-1",onClick:()=>n("add",!0),children:"Add User"})})]}),e.jsx("div",{className:"card-body scrollable-table scrollable-container",children:e.jsxs(W,{"aria-label":"Assessment Table",ref:_,removeWrapper:!0,color:"primary",selectionMode:"single",children:[e.jsxs(J,{children:[e.jsx(b,{children:"UserID"}),e.jsx(b,{children:"Email"}),e.jsx(b,{children:"Role"}),e.jsx(b,{className:"text-center",children:"Actions"})]}),e.jsx(X,{emptyContent:"No rows to display.",children:M.map(i=>e.jsxs(Z,{children:[e.jsx(w,{children:i.UserID}),e.jsx(w,{children:i.email}),e.jsx(w,{children:i.role}),e.jsx(w,{className:"text-center",children:e.jsxs("div",{className:"table-buttons",children:[e.jsx(a,{color:"default",onClick:()=>{u(i),i.role==="Teacher"?n("viewTeacher",!0):i.role==="Parent"&&n("viewParent",!0)},children:"View"}),e.jsx(a,{color:"primary",onClick:()=>u(i)||n("editUser",!0),children:"Update"}),e.jsx(a,{color:"danger",onClick:()=>u(i)||n("delete",!0),children:"Delete"})]})})]},i._id))})]})})]}),e.jsx(ie,{pageCount:Math.ceil(T.length/D),onPageChange:$,containerClassName:"pagination",activeClassName:"active"})]})})})]})},ke=()=>e.jsxs("div",{className:"w-full h-full flex",children:[e.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6] shadow-lg",children:e.jsx(Y,{})}),e.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[e.jsx(G,{}),e.jsx(ce,{})]})]});export{ke as default};
