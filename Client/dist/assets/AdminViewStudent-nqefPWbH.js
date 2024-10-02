import{r as t,j as e}from"./react-BCcS7c0c.js";import{A as E}from"./AdminSidebar-DKOvjyxF.js";import{p as F}from"./profile-Berhznzr.js";import{F as w,d as B,k as T}from"./@fortawesome-BVdY808A.js";import{a as y}from"./axios-CCb-kr4I.js";import{_ as A}from"./react-hot-toast-Dux6v_Wl.js";import{P as h}from"./prop-types-LuavYUF2.js";import{m as C,f as k,g as R,h as I,j as D,b as c,t as q}from"./@nextui-org-CLkIIHEi.js";import{b as V,a as G,g as M}from"./react-router-MkLRJz4d.js";import{C as z}from"./ContentHeader-H0gjkgJW.js";import"./@babel-m2JXyA6a.js";import"./react-router-dom-Dk6_dLEo.js";import"./react-dom-rv-KAOpM.js";import"./scheduler-CzFDRTuY.js";import"./@remix-run-BOUEh3jQ.js";import"./index-B-3vnZ7x.js";import"./goober-vt3s6TGe.js";import"./@react-aria-CfXSs2UI.js";import"./@react-stately-ChQ0zIrC.js";import"./clsx-B-dksMZM.js";import"./@swc-DS7M6wx8.js";import"./@internationalized-BB0Nk989.js";import"./framer-motion-BvVSIgoR.js";import"./react-textarea-autosize-bEG1sDiq.js";import"./use-latest-2zZSkz0C.js";import"./use-isomorphic-layout-effect-Co3QFFXf.js";import"./use-composed-ref-BmZZpR7Y.js";import"./tailwind-variants-ayMnMv5e.js";import"./tailwind-merge-Dc5vmgZ1.js";const K=({show:i,onHide:a,status:n,comment:o})=>e.jsx(C,{isOpen:i,onClose:a,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(k,{children:[e.jsx(R,{children:"Assess Student Performance Successfully"}),e.jsxs(I,{children:[e.jsxs("p",{children:["Status: ",n||"Status not available"]})," ",e.jsxs("p",{children:["Comment: ",o]})," "]}),e.jsx(D,{children:e.jsx(c,{color:"primary",onClick:a,children:"Close"})})]})}),_=({show:i,onHide:a,LRN:n,onStatusUpdate:o})=>{const[x,s]=t.useState(!1),[p,u]=t.useState(""),[f,j]=t.useState(""),g=async()=>{try{const r=await y.patch(`/api/studentStatus/${n}`);console.log("Response data:",r.data);const{status:m,comment:N}=r.data;o(m),u(m),j(N),s(!0)}catch(r){A.error("Error updating student status"),console.error("Error updating student status:",r)}};return e.jsxs(e.Fragment,{children:[e.jsx(C,{isOpen:i,onClose:a,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(k,{children:[e.jsx(R,{className:"flex flex-col",children:"Assess Student Status"}),e.jsx(I,{children:e.jsx("p",{children:"Do you want to assess the performance of the selected student?"})}),e.jsxs(D,{children:[e.jsx(c,{color:"danger",variant:"light",onClick:a,children:"Close"}),e.jsx(c,{color:"primary",onClick:g,children:"Assess"})]})]})}),e.jsx(K,{show:x,onHide:()=>{s(!1),a()},status:p,comment:f})]})};_.propTypes={show:h.bool.isRequired,onHide:h.func.isRequired,LRN:h.string.isRequired,onStatusUpdate:h.func.isRequired};const O=({src:i,alt:a})=>e.jsx("img",{loading:"lazy",src:i,alt:a,className:"w-32 h-32 rounded-full"}),U=()=>{const i=V(),a=G(),{id:n}=M(),[o,x]=t.useState(0),[s,p]=t.useState(null),[u,f]=t.useState([]),[j,g]=t.useState(!0),[r,m]=t.useState(""),[N,b]=t.useState(!1),[H,L]=t.useState(!1);t.useEffect(()=>{n&&(async()=>{try{const d=await y.get(`/api/getStudentID/${n}`);p(d.data),m(d.data.status);const S=await y.get(`/api/getPerformanceStudent/${d.data.LRN}`);f(S.data)}catch{A.error("Failed to fetch data. Please try again later.")}finally{g(!1)}})()},[n]),t.useEffect(()=>{if(s){const d=[`/adminViewStudent/${s._id}`].findIndex(S=>S===i.pathname);x(d)}},[i.pathname,s]);const v=l=>x(l),P=()=>{b(!0)},$=l=>{m(l),L(!0),b(!1)};return j?e.jsx("div",{children:"Loading..."}):e.jsxs("div",{className:"p-10",children:[e.jsx(_,{show:N,onHide:()=>b(!1),LRN:s.LRN,onStatusUpdate:$}),e.jsxs("div",{className:"flex items-center justify-start gap-2 mb-5",children:[e.jsx("h1",{className:"text-3xl font-semibold",children:"Student Information"}),e.jsx(q,{showArrow:!0,content:e.jsxs("div",{className:"p-2",children:[e.jsx("div",{className:"text-sm font-bold",children:"View Information"}),e.jsx("div",{className:"text-xs",children:"This function allows you to view the student's information in the system."})]}),children:e.jsx(w,{icon:B,className:"text-gray-600"})})]}),e.jsxs("div",{className:"w-full max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-[3rem]",children:[e.jsxs("div",{className:"flex flex-col md:flex-row items-center md:items-start gap-6",children:[e.jsx(O,{src:(s==null?void 0:s.profileImage)||F,alt:"Profile"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("h2",{className:"text-2xl font-bold",children:s?`${s.FirstName} ${s.LastName}`:"Name of the Student"}),e.jsx("h4",{children:s?`Section: ${s.Section}`:"Student section"}),e.jsxs("div",{className:"flex flex-col mt-4 text-gray-700",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(w,{icon:T,className:"text-gray-600"}),e.jsxs("span",{children:["Learner Reference Number: ",(s==null?void 0:s.LRN)||"N/A"]})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx("span",{className:"text-sm font-bold",children:"Status:"}),e.jsx("span",{className:`ml-2 px-2 py-1 rounded-full ${r==="Grade Ready Reader"?"bg-green-200 text-green-800":r==="Transitioning Reader"?"bg-blue-200 text-blue-800":r==="Developing Reader"?"bg-yellow-200 text-yellow-800":r==="Incomplete"?"bg-gray-200 text-gray-800":"bg-red-200 text-red-800"}`,children:r||"N/A"})]})]})]}),e.jsx(c,{color:"primary",className:"w-[120px] text-md p-1",onClick:()=>a(-1),children:"Back"})]}),e.jsx("div",{className:"mt-4",children:e.jsx(c,{color:"primary",onClick:P,children:"Assess Status"})}),e.jsxs("div",{className:"mt-8",children:[e.jsxs("div",{className:"flex gap-6 border-b pb-2",children:[e.jsx(c,{variant:"light",radius:"none",className:`text-md font-medium ${o===0?"border-b-4 border-blue-500":""}`,onClick:()=>v(0),children:"Basic Information"}),e.jsx(c,{variant:"light",radius:"none",className:`text-md font-medium ${o===1?"border-b-4 border-blue-500":""}`,onClick:()=>v(1),children:"Student Progress"})]}),o===0&&e.jsx("div",{className:"mt-6 bg-[#faf9f4] p-6 rounded-lg shadow",children:e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"First Name:"}),e.jsx("p",{className:"text-gray-800",children:s.FirstName||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Last Name:"}),e.jsx("p",{className:"text-gray-800",children:s.LastName||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Civil Status:"}),e.jsx("p",{className:"text-gray-800",children:s.Status||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Gender:"}),e.jsx("p",{className:"text-gray-800",children:s.Gender||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Birthday:"}),e.jsx("p",{className:"text-gray-800",children:s.Birthday||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Address:"}),e.jsx("p",{className:"text-gray-800",children:s.Address||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Contact Number:"}),e.jsx("p",{className:"text-gray-800",children:s.ContactNumber||"N/A"})]})]})}),o===1&&e.jsxs("div",{className:"mt-6 bg-[#f9f9f9] p-6 rounded-lg shadow",children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Student Progress"}),u.length>0?e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:u.map((l,d)=>e.jsxs("div",{className:"p-4 bg-white rounded-lg shadow-md",children:[e.jsxs("div",{className:"mb-2",children:[e.jsxs("span",{className:"block text-sm text-gray-600",children:["Assessment: ",l.Type||"N/A"]}),e.jsxs("span",{className:"block text-sm text-gray-600",children:["Activity Code: ",l.ActivityCode||"N/A"]})]}),e.jsxs("p",{className:"text-gray-800",children:["Score: ",l.Score||"N/A"]})]},d))}):e.jsx("p",{className:"text-gray-800",children:"No performance data available."})]})]})]})]})},ve=()=>e.jsxs("div",{className:"w-full h-full flex",children:[e.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6]",children:e.jsx(E,{})}),e.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[e.jsx(z,{}),e.jsx(U,{})]})]});export{ve as default};
