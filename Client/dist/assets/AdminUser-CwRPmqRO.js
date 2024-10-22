import{j as e,L as j,r as c,_ as N,a as _}from"./index-CuF2S_gx.js";import{A as Q}from"./AdminSidebar-nDULRVuu.js";import{C as W}from"./ContentHeader-mDxhvIwR.js";import{P as J,t as X,a as Z,b as w,c as ee,d as se,e as y}from"./PrintRecord-Dl-gqFSm.js";import{P as i,F as P,d as le,i as re,j as te}from"./index-Dwc9WYvd.js";import{m as h,a as m,b as x,c as f}from"./chunk-P2T5LMDM-mppG7zae.js";import{m as u}from"./chunk-LT4XONRR-DSyTWFia.js";import{b as a}from"./chunk-DBLREEYE-8AJS5ZgE.js";import{l as ie}from"./index-5U1QNFnd.js";import{R as ae}from"./react-paginate-BsbmwESZ.js";import{t as E}from"./profile-CqU1njxP.js";import{s as ne,l as v}from"./chunk-CEHIK4GH-DO1lEcIK.js";import{i as oe}from"./chunk-GQQM5TNQ-CDtmyARy.js";import"./useOverlayTriggerState-Cxqf9S1j.js";import"./useDialog-DmKmGu7k.js";import"./useLabels-6K5bYqFT.js";import"./VisuallyHidden-CjGvSP-J.js";import"./Overlay-CkX1cLz_.js";import"./chunk-KBN3H6OQ-Bb-Uy1H9.js";import"./chunk-CAFRINWI-CMvs8fyY.js";import"./useField-DrkOjzsU.js";import"./chunk-CIZQCQPA-CIyQusMM.js";import"./useFormReset-Bh9EAnCA.js";const I=({show:r,onHide:s})=>e.jsx(h,{isOpen:r,onClose:s,"aria-labelledby":"add-user-modal-title",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(u,{children:[e.jsx(m,{className:"flex flex-col",id:"add-user-modal-title",children:"Add User Information"}),e.jsx(x,{children:e.jsx("p",{children:"Do you want to add a user?"})}),e.jsxs(f,{children:[e.jsx(a,{color:"danger",variant:"light",onClick:s,children:"Cancel"}),e.jsx(j,{to:"/adminAddUser",children:e.jsx(a,{color:"primary",children:"Add"})})]})]})});I.propTypes={show:i.bool.isRequired,onHide:i.func.isRequired};const V=({show:r,onHide:s,user:l})=>e.jsx(h,{isOpen:r,onClose:s,"aria-labelledby":"edit-user-modal-title",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(u,{children:[e.jsx(m,{className:"flex flex-col",id:"edit-user-modal-title",children:"Add User Information"}),e.jsx(x,{children:e.jsx("p",{children:"You are now going to update the selected user. Do you wish to continue?"})}),e.jsxs(f,{children:[e.jsx(a,{variant:"light",color:"danger",onClick:s,children:"Cancel"}),e.jsx(j,{to:`/AdminEditUser/${l==null?void 0:l.UserID}`,children:e.jsx(a,{color:"primary",children:"Update"})})]})]})});V.propTypes={show:i.bool.isRequired,onHide:i.func.isRequired,user:i.object};const F=({show:r,onHide:s,user:l})=>e.jsx(h,{isOpen:r,onClose:s,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(u,{children:[e.jsx(m,{className:"flex flex-col",id:"edit-user-modal-title",children:"View Parent Information"}),e.jsx(x,{children:e.jsx("p",{children:"Do you want to View the profile of Parent selected?"})}),e.jsxs(f,{children:[e.jsx(a,{color:"danger",variant:"light",onClick:s,children:"Cancel"}),e.jsx(j,{to:`/adminViewParent/${l==null?void 0:l.UserID}`,children:e.jsx(a,{color:"primary",children:"View"})})]})]})});F.propTypes={show:i.bool.isRequired,onHide:i.func.isRequired,user:i.object};const H=({show:r,onHide:s,user:l})=>e.jsx(h,{isOpen:r,onClose:s,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(u,{children:[e.jsx(m,{className:"flex flex-col",id:"edit-user-modal-title",children:"View Teacher Information"}),e.jsx(x,{children:e.jsx("p",{children:"Do you want to view the profile of teacher selected?"})}),e.jsxs(f,{children:[e.jsx(a,{color:"danger",variant:"light",onClick:s,children:"Cancel"}),e.jsx(j,{to:`/adminViewTeacher/${l==null?void 0:l.UserID}`,children:e.jsx(a,{color:"primary",children:"View"})})]})]})});H.propTypes={show:i.bool.isRequired,onHide:i.func.isRequired,user:i.object};const K=({show:r,onHide:s,user:l})=>e.jsx(h,{isOpen:r,onClose:s,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(u,{children:[e.jsx(m,{className:"flex flex-col",id:"contained-modal-title-vcenter",children:"Update Parent Information"}),e.jsx(x,{children:e.jsx("p",{children:"Are you sure you want to update this parent's information?"})}),e.jsxs(f,{children:[e.jsx(a,{color:"danger",variant:"light",onClick:s,children:"Cancel"}),e.jsx(j,{to:`/adminEditParent/${l==null?void 0:l._id}`,children:e.jsx(a,{color:"primary",children:"Update"})})]})]})});K.propTypes={show:i.bool.isRequired,onHide:i.func.isRequired,user:i.object};const O=({show:r,onHide:s,user:l})=>e.jsx(h,{isOpen:r,onClose:s,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(u,{children:[e.jsx(m,{className:"flex flex-col",id:"contained-modal-title-vcenter",children:"Update Teacher Information"}),e.jsx(x,{children:e.jsx("p",{children:"Are you sure you want to update this teacher's information?"})}),e.jsxs(f,{children:[e.jsx(a,{color:"danger",variant:"light",onClick:s,children:"Cancel"}),e.jsx(j,{to:`/adminEditTeacher/${l==null?void 0:l._id}`,children:e.jsx(a,{color:"primary",children:"Update"})})]})]})});O.propTypes={show:i.bool.isRequired,onHide:i.func.isRequired,user:i.object};const de=({show:r,onHide:s})=>e.jsx(h,{isOpen:r,onClose:s,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(u,{children:[e.jsx(m,{id:"contained-modal-title-vcenter",children:"Delete User Successful"}),e.jsx(x,{children:e.jsx("p",{children:"You have successfully deleted the User's information."})}),e.jsx(f,{children:e.jsx(a,{color:"danger",onClick:s,children:"Close"})})]})}),L=({show:r,onHide:s,user:l,onDeleteSuccess:o})=>{const[d,p]=c.useState(!1),g=async()=>{try{if(!l||!l.email){N.error("User not found.");return}(await _.delete(`/api/deleteUser/${l.email}`)).status===200?(p(!0),o()):N.error("Failed to delete user. Please try again.")}catch(b){console.error("Error deleting user:",b),N.error("Failed to delete user. Please try again later.")}};return e.jsxs(e.Fragment,{children:[e.jsx(h,{isOpen:r,onClose:s,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(u,{children:[e.jsx(m,{id:"contained-modal-title-vcenter",children:"Delete User Information"}),e.jsx(x,{children:e.jsx("p",{children:"Are you sure you want to delete this User's information?"})}),e.jsxs(f,{children:[e.jsx(a,{color:"default",variant:"light",onClick:s,children:"Cancel"}),e.jsx(a,{color:"danger",onClick:g,children:"Delete"})]})]})}),e.jsx(de,{show:d,onHide:()=>{p(!1),s()}})]})};L.propTypes={show:i.bool.isRequired,onHide:i.func.isRequired,onDeleteSuccess:i.func.isRequired,user:i.object};const ce=(r,s,l)=>{let o=r;return s!=="default"&&(o=o.filter(d=>d.role===s)),l&&(o=o.filter(d=>d.email.toLowerCase().includes(l.toLowerCase()))),o},he=(r,s,l)=>{const o=s*l;return r.slice(o,o+l)},me=()=>{const[r,s]=c.useState({add:!1,print:!1,editUser:!1,editTeacher:!1,viewTeacher:!1,editParent:!1,viewParent:!1,delete:!1}),[l,o]=c.useState([]),[d,p]=c.useState(null),[g,b]=c.useState(0),[T]=c.useState(10),[R,M]=c.useState(""),[S,$]=c.useState("default"),A=c.useRef(null),{onDownload:z}=ie.useDownloadExcel({currentTableRef:A.current,filename:"Users table",sheet:"Users"}),k=async()=>{try{const[t,C]=await Promise.all([_.get("/api/getTeacher"),_.get("/api/getParent")]),D=t.data.map(U=>({...U,role:"Teacher"})),G=C.data.map(U=>({...U,role:"Parent"}));o([...D,...G])}catch(t){console.error(t)}};c.useEffect(()=>{k()},[]);const q=ce(l,S,R),B=he(q,g,T),n=(t,C)=>{s(D=>({...D,[t]:C}))},Y=t=>{b(t.selected)};return e.jsxs("div",{className:"px-4 md:px-9",children:[e.jsx(I,{show:r.add,onHide:()=>n("add",!1)}),e.jsx(V,{show:r.editUser,onHide:()=>n("editUser",!1),user:d}),e.jsx(J,{show:r.print,onHide:()=>n("print",!1),print:z}),e.jsx(H,{show:r.viewTeacher,user:d,onHide:()=>n("viewTeacher",!1)}),e.jsx(O,{show:r.editTeacher,user:d,onHide:()=>n("editTeacher",!1)}),e.jsx(F,{show:r.viewParent,user:d,onHide:()=>n("viewParent",!1)}),e.jsx(K,{show:r.editParent,user:d,onHide:()=>n("editParent",!1)}),e.jsx(L,{show:r.delete,onHide:()=>n("delete",!1),user:d,onDeleteSuccess:k}),e.jsxs("div",{className:"flex justify-between items-center mb-6",children:[e.jsxs("div",{className:"text-2xl md:text-3xl font-semibold",children:["Manage User",e.jsx(E,{showArrow:!0,content:e.jsxs("div",{className:"px-1 py-2",children:[e.jsx("div",{className:"text-small font-bold",children:"User Table"}),e.jsx("div",{className:"text-tiny",children:"This function will view the information of the students in the system."})]}),children:e.jsx(P,{icon:le,size:"1x",className:"ml-2 cursor-pointer text-lg"})})]}),e.jsx("div",{className:"cursor-pointer flex items-center",children:e.jsx(E,{showArrow:!0,content:e.jsxs("div",{className:"px-1 py-2",children:[e.jsx("div",{className:"text-small font-bold",children:"Print"}),e.jsx("div",{className:"text-tiny",children:"Generate report/Print table"})]}),children:e.jsx(P,{icon:re,size:"1x",className:"ml-2 cursor-pointer text-lg",onClick:()=>n("print",!0)})})})]}),e.jsxs("div",{className:"max-w-full bg-white p-4 md:p-6 rounded-lg",children:[e.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-center mb-4",children:[e.jsxs(ne,{labelPlacement:"outside",label:"Role",variant:"bordered",className:"bg-transparent w-full md:w-1/5",onChange:t=>$(t.target.value),value:S,children:[e.jsx(v,{children:"All"},"default"),e.jsx(v,{children:"Admin"},"Admin"),e.jsx(v,{children:"Parent"},"Parent"),e.jsx(v,{children:"Teacher"},"Teacher")]}),e.jsx("div",{className:"w-full md:w-[40%] flex items-center mt-4 md:mt-4",children:e.jsx(oe,{variant:"bordered",type:"text",placeholder:"Enter User Email",value:R,onChange:t=>M(t.target.value),startContent:e.jsx(P,{icon:te,size:"1x",inverse:!0,className:"text-2xl text-default-400 pointer-events-none flex-shrink-0"})})}),e.jsx("div",{className:"mt-4 md:mt-4",children:e.jsx(a,{color:"primary",className:"w-full md:w-[120px] text-md",onClick:()=>n("add",!0),children:"Add User"})})]}),e.jsx("div",{className:"overflow-auto max-h-[600px]",children:e.jsxs(X,{"aria-label":"User Table",ref:A,removeWrapper:!0,color:"primary",selectionMode:"single",className:"w-full whitespace-nowrap",children:[e.jsxs(Z,{children:[e.jsx(w,{children:"UserID"}),e.jsx(w,{children:"Email"}),e.jsx(w,{children:"Role"}),e.jsx(w,{className:"text-center",children:"Actions"})]}),e.jsx(ee,{emptyContent:"No rows to display.",children:B.map(t=>e.jsxs(se,{children:[e.jsx(y,{children:t.UserID}),e.jsx(y,{children:t.email}),e.jsx(y,{children:t.role}),e.jsx(y,{className:"text-center",children:e.jsxs("div",{className:"flex justify-center space-x-2",children:[e.jsx(a,{color:"default",onClick:()=>{p(t),t.role==="Teacher"?n("viewTeacher",!0):t.role==="Parent"&&n("viewParent",!0)},children:"View"}),e.jsx(a,{color:"primary",onClick:()=>p(t)||n("editUser",!0),children:"Update"}),e.jsx(a,{className:"bg-[#ff505b] text-white",onClick:()=>{p(t),n("delete",!0)},children:"Delete"})]})})]},t.UserID))})]})}),e.jsx(ae,{pageCount:Math.ceil(q.length/T),onPageChange:Y,containerClassName:"flex justify-center mt-4 space-x-2",activeClassName:"text-white bg-blue-600 hover:bg-gray-200 px-3 py-1 rounded",pageLinkClassName:"px-2 py-1 rounded",previousLinkClassName:"px-2 py-1  rounded",nextLinkClassName:"px-2 py-1 rounded"})]})]})},Ie=()=>e.jsxs("div",{className:"w-full h-full flex",children:[e.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6] shadow-lg",children:e.jsx(Q,{})}),e.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[e.jsx(W,{}),e.jsx(me,{})]})]});export{Ie as default};
