import{u as j,c as g,r as o,a as x,_ as n,j as a}from"./index-9k_Ocd80.js";import{A as p}from"./AdminSidebar-DGQnSepX.js";import{F as N,d as v}from"./index-B6K5ESG2.js";import{t as b}from"./profile-DYuKv9Zm.js";import{i as d}from"./chunk-GQQM5TNQ-DIeraZ41.js";import{s as u,l as s}from"./chunk-CEHIK4GH-zxS_DSeF.js";import{b as h}from"./chunk-DBLREEYE-DVjbjQx8.js";import{C as y}from"./ContentHeader-BKYcynH5.js";import"./useOverlayTriggerState-BZO4l0S3.js";import"./chunk-CIZQCQPA-8Nr0sLZY.js";import"./chunk-CAFRINWI-CMvs8fyY.js";import"./useFormReset-8bZuwF1F.js";import"./useField-CpUyNuvN.js";import"./useLabels-D-HJF6pw.js";import"./useDialog-Cje9gbXM.js";import"./VisuallyHidden-PT-Sj4_P.js";const A=()=>{const m=j(),{id:c}=g(),[t,r]=o.useState({FirstName:"",LastName:"",Age:"",Birthday:"",Gender:"",Address:"",Status:"",ContactNumber:"",email:""});o.useEffect(()=>{x.get(`/api/getAdmin/${c}`).then(l=>{r(l.data)}).catch(l=>{console.error("Error fetching admin data:",l),n.error("Failed to fetch admin data. Please try again later.")})},[c]);const f=async l=>{l.preventDefault();try{const{data:i}=await x.patch(`/api/updateAdmin/${c}`,t);i.error?n.error(i.error):(n.success("Updated admin information successfully."),m("/adminUsers"))}catch(i){console.error("Error updating admin data:",i),n.error("Failed to update admin. Please try again.")}};return a.jsx("div",{className:"container mx-auto px-6",children:a.jsxs("div",{className:"max-w-9xl mx-auto bg-white shadow-lg rounded-lg p-8",children:[a.jsxs("div",{className:"flex items-center gap-2 mb-6",children:[a.jsx("h2",{className:"text-2xl font-bold text-gray-800",children:"Update Admin's Information"}),a.jsx(b,{showArrow:!0,content:a.jsxs("div",{className:"px-2 py-1",children:[a.jsx("div",{className:"text-sm font-bold",children:"Update Information"}),a.jsx("div",{className:"text-xs",children:"This function will update the information of the admin in the system."})]}),children:a.jsx(N,{icon:v,size:"md",className:"text-gray-600"})})]}),a.jsxs("form",{onSubmit:f,children:[a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"font-medium text-gray-700",children:"First Name"}),a.jsx(d,{underlined:!0,clearable:!0,value:t.FirstName,onChange:l=>r({...t,FirstName:l.target.value}),placeholder:"Enter the First Name"})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"font-medium text-gray-700",children:"Last Name"}),a.jsx(d,{underlined:!0,clearable:!0,value:t.LastName,onChange:l=>r({...t,LastName:l.target.value}),placeholder:"Enter the Last Name"})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"font-medium text-gray-700",children:"Age"}),a.jsx(d,{underlined:!0,clearable:!0,value:t.Age,onChange:l=>r({...t,Age:l.target.value}),placeholder:"Enter Admin's age",type:"number"})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"font-medium text-gray-700",children:"Birthday"}),a.jsx(d,{underlined:!0,clearable:!0,value:t.Birthday,onChange:l=>r({...t,Birthday:l.target.value}),type:"date"})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"font-medium text-gray-700",children:"Gender"}),a.jsxs(u,{placeholder:"Select Gender",value:t.Gender,onChange:l=>r({...t,Gender:e.target.value}),children:[a.jsx(s,{disabled:!0,children:"Select Gender"},""),a.jsx(s,{children:"Male"},"Male"),a.jsx(s,{children:"Female"},"Female"),a.jsx(s,{children:"Other"},"Other")]})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"font-medium text-gray-700",children:"Address"}),a.jsx(d,{underlined:!0,clearable:!0,value:t.Address,onChange:l=>r({...t,Address:l.target.value}),placeholder:"Enter the Address"})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"font-medium text-gray-700",children:"Status"}),a.jsxs(u,{placeholder:"Select Status",value:t.Status,onChange:l=>r({...t,Status:e.target.value}),children:[a.jsx(s,{disabled:!0,children:"Select Status"},""),a.jsx(s,{children:"Single"},"Single"),a.jsx(s,{children:"Married"},"Married"),a.jsx(s,{children:"Widowed"},"Widowed"),a.jsx(s,{children:"Separated"},"Separated")]})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"font-medium text-gray-700",children:"Contact Number"}),a.jsx(d,{underlined:!0,clearable:!0,value:t.ContactNumber,onChange:l=>r({...t,ContactNumber:l.target.value}),placeholder:"Enter the Contact Number"})]}),a.jsxs("div",{className:"flex flex-col",children:[a.jsx("label",{className:"font-medium text-gray-700",children:"Email"}),a.jsx(d,{underlined:!0,clearable:!0,value:t.email,onChange:l=>r({...t,email:l.target.value}),placeholder:"Enter the Admin's Email",type:"email"})]})]}),a.jsxs("div",{className:"flex justify-end mt-6",children:[a.jsx(h,{type:"submit",color:"primary",auto:!0,children:"Save Changes"}),a.jsx(h,{auto:!0,flat:!0,color:"danger",onClick:()=>m(-1),className:"ml-4",children:"Cancel"})]})]})]})})},$=()=>a.jsxs("div",{className:"w-full h-full flex",children:[a.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6] shadow-lg",children:a.jsx(p,{})}),a.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[a.jsx(y,{}),a.jsx(A,{})]})]});export{$ as default};