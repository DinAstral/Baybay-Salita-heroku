import{d as j,u as g,r as t,U as p,a as x,j as e}from"./index-46g2bTDn.js";import{C as v}from"./ContentHeader-DpVqTCVw.js";import{P as b}from"./ParentSidebar-BDx-Z8Bv.js";import{t as y,p as w}from"./profile-BbWcRgwB.js";import{F as o,d as S,k as A}from"./index-DNBWh895.js";import{b as L}from"./chunk-DBLREEYE-BXO_GMqR.js";import"./useOverlayTriggerState-DubV0HT-.js";import"./chunk-CIZQCQPA-O0-gHmPi.js";const C=()=>{j(),g();const[m,l]=t.useState(!0),[i,d]=t.useState(null),[n,h]=t.useState(0),{user:c}=t.useContext(p),[r,N]=t.useState([]),[s,f]=t.useState({FirstName:"",LastName:"",Section:"",LRN:"",Nationality:"",Status:"",Gender:"",Birthday:"",Address:"",ContactNumber:""});t.useEffect(()=>{x.get(`/api/getParent/${c.UserID}`).then(a=>{N(a.data)}).catch(a=>{d("Failed to load parent data.")}).finally(()=>{l(!1)})},[c.UserID]),t.useEffect(()=>{r&&r.LRN&&(l(!0),x.get(`/api/getStudentParent/${r.LRN}`).then(a=>{f(a.data)}).catch(a=>{d("Failed to load student data.")}).finally(()=>{l(!1)}))},[r]);const u=a=>{h(a)};return m?e.jsx("div",{children:"Loading..."}):i?e.jsx("div",{children:i}):e.jsxs("div",{className:"p-10",children:[e.jsxs("div",{className:"flex items-center justify-start gap-2 mb-5",children:[e.jsx("h1",{className:"text-3xl font-semibold",children:"Student Progress"}),e.jsx(y,{showArrow:!0,content:e.jsxs("div",{className:"p-2",children:[e.jsx("div",{className:"text-sm font-bold",children:"View Progress"}),e.jsx("div",{className:"text-xs",children:"This function allows you to view the student's progress in the system."})]}),children:e.jsx(o,{icon:S,className:"text-gray-600"})})]}),e.jsxs("div",{className:"w-full max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-8",children:[e.jsxs("div",{className:"flex flex-col md:flex-row items-center md:items-start gap-6",children:[e.jsx("img",{src:w,className:"w-32 h-32 rounded-full",alt:"Profile"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("h2",{className:"text-2xl font-bold",children:`${s.FirstName} ${s.LastName}`}),e.jsx("h4",{children:`Section: ${s.Section}`}),e.jsx("div",{className:"flex flex-col mt-4 text-gray-700",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(o,{icon:A,className:"text-gray-600"}),e.jsxs("span",{children:["Learner Reference Number: ",s.LRN]})]})})]})]}),e.jsxs("div",{className:"mt-8",children:[e.jsx("div",{className:"flex gap-6 border-b pb-2",children:e.jsx(L,{variant:"light",radius:"none",className:`text-md font-medium ${n===0?"border-b-4 border-blue-500":""}`,onClick:()=>u(0),children:"Basic Information"})}),n===0&&e.jsx("div",{className:"mt-6 bg-[#faf9f4] p-6 rounded-lg shadow",children:e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"First Name:"}),e.jsx("p",{className:"text-gray-800",children:s.FirstName||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Last Name:"}),e.jsx("p",{className:"text-gray-800",children:s.LastName||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Civil Status:"}),e.jsx("p",{className:"text-gray-800",children:s.Status||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Gender:"}),e.jsx("p",{className:"text-gray-800",children:s.Gender||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Birthday:"}),e.jsx("p",{className:"text-gray-800",children:s.Birthday||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Address:"}),e.jsx("p",{className:"text-gray-800",children:s.Address||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Contact Number:"}),e.jsx("p",{className:"text-gray-800",children:s.ContactNumber||"N/A"})]})]})})]})]})]})},D=()=>e.jsxs("div",{className:"w-full h-full flex",children:[e.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6]",children:e.jsx(b,{})}),e.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[e.jsx(v,{}),e.jsx(C,{})]})]});export{D as default};
