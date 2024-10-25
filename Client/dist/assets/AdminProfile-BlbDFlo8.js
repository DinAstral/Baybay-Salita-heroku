import{d as k,u as U,r as n,U as E,a as u,_ as i,j as e}from"./index-9k_Ocd80.js";import{A as S}from"./AdminSidebar-DGQnSepX.js";import{p as v,t as b}from"./profile-DYuKv9Zm.js";import{F as f,d as B,k as _,f as $}from"./index-B6K5ESG2.js";import{b as h}from"./chunk-DBLREEYE-DVjbjQx8.js";import{i as c}from"./chunk-GQQM5TNQ-DIeraZ41.js";import{s as y,l as o}from"./chunk-CEHIK4GH-zxS_DSeF.js";import"./useOverlayTriggerState-BZO4l0S3.js";import"./chunk-CIZQCQPA-8Nr0sLZY.js";import"./chunk-CAFRINWI-CMvs8fyY.js";import"./useFormReset-8bZuwF1F.js";import"./useField-CpUyNuvN.js";import"./useLabels-D-HJF6pw.js";import"./useDialog-Cje9gbXM.js";import"./VisuallyHidden-PT-Sj4_P.js";const L=()=>{const g=k(),A=U(),[m,p]=n.useState(0),{user:x}=n.useContext(E),[C,N]=n.useState(v),[a,l]=n.useState({_id:"",UserID:"",FirstName:"",LastName:"",Age:"",Birthday:"",Gender:"",Address:"",Status:"",Nationality:"",ContactNumber:"",Picture:"",email:""});n.useEffect(()=>{u.get(`/api/getAdmin/${x.UserID}`).then(s=>{l(s.data),N(s.data.Picture||v)}).catch(()=>{i.error("Failed to fetch admin data. Please try again later.")})},[x.UserID]),n.useEffect(()=>{const t=["/adminProfile"].findIndex(r=>r===g.pathname);p(t)},[g.pathname]);const D=async s=>{const t=s.target.files[0];if(t){const r=new FormData;r.append("Profile",t),r.append("role",x.role),r.append("UserID",x.UserID);try{const d=await u.post("/api/profileUpdate",r,{headers:{"Content-Type":"multipart/form-data"}});d.data.message?(N(d.data.updatedProfileUrl),i.success("Profile picture updated successfully!")):d.data.error&&i.error(`Error: ${d.data.error}`)}catch{i.error("Failed to update profile picture. Please try again later.")}}},w=()=>{p(1)},I=s=>{p(s)},F=s=>{if(!s)return"";const t=new Date(s),r=new Date;let d=r.getFullYear()-t.getFullYear();const j=r.getMonth()-t.getMonth();return(j<0||j===0&&r.getDate()<t.getDate())&&d--,d};n.useEffect(()=>{const s=F(a.Birthday);l(t=>({...t,Age:s}))},[a.Birthday]);const P=async s=>{s.preventDefault();try{const t=await u.patch(`/api/updateAdmin/${a.UserID}`,a);if(t.status===200&&t.data){i.success("Admin profile updated successfully!");const r=await u.get(`/api/getAdmin/${a.UserID}`);l(r.data)}else i.error(`Error: ${t.data.error||"Update failed."}`)}catch(t){console.error("Error updating admin profile:",t),t.response?i.error(`Failed to update admin profile: ${t.response.data.error||"Please try again later."}`):t.request?i.error("No response from server. Please check your connection."):i.error("Failed to update admin profile. Please try again later.")}};return e.jsxs("div",{className:"p-10",children:[e.jsxs("div",{className:"flex items-center justify-start gap-2 mb-5",children:[e.jsx("h1",{className:"text-3xl font-semibold",children:"Admin Profile"}),e.jsx(b,{showArrow:!0,content:e.jsxs("div",{className:"p-2",children:[e.jsx("div",{className:"text-sm font-bold",children:"Profile Information"}),e.jsx("div",{className:"text-xs",children:"This function will view your information."})]}),children:e.jsx(f,{icon:B,className:"text-gray-600"})})]}),e.jsxs("div",{className:"w-full max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-[3rem]",children:[e.jsxs("div",{className:"flex flex-col md:flex-row items-center md:items-start gap-6 relative",children:[e.jsx(b,{content:e.jsxs("div",{className:"p-2",children:[e.jsx("div",{className:"text-sm font-bold",children:"Profile Picture Update"}),e.jsx("div",{className:"text-xs",children:"You can update your profile picture once clicked."})]}),children:e.jsxs("label",{className:"cursor-pointer",children:[e.jsx("img",{src:C,className:"w-32 h-32 rounded-full",alt:"Profile"}),e.jsx("input",{type:"file",accept:"image/*",className:"hidden",onChange:D})]})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("h2",{className:"text-2xl font-bold",children:a?`${a.FirstName} ${a.LastName}`:"Admin Name"}),e.jsx("h3",{children:a?a.role:"Position"}),e.jsxs("div",{className:"flex flex-col mt-4 text-gray-700",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(f,{icon:_,className:"text-gray-600"}),e.jsxs("span",{children:["Admin ID Number: ",a?a.UserID:"Admin ID"]})]}),e.jsxs("div",{className:"flex items-center gap-2 mt-2",children:[e.jsx(f,{icon:$,className:"text-gray-600"}),e.jsxs("span",{children:["Email Address: ",a?a.email:"Email Address"]})]})]})]}),e.jsx(h,{color:"primary",className:"w-[120px] text-md p-1",onClick:()=>A(-1),children:"Back"})]}),e.jsxs("div",{className:"mt-8",children:[e.jsxs("div",{className:"flex gap-6 border-b pb-2",children:[e.jsx(h,{variant:"light",radius:"none",className:`text-md font-medium ${m===0?"border-b-4 border-blue-500":""}`,onClick:()=>I(0),children:"Basic Information"}),e.jsx(h,{variant:"light",radius:"none",className:`text-md font-medium ${m===1?"border-b-4 border-blue-500":""}`,onClick:w,children:"Update"})]}),m===0&&e.jsx("div",{className:"mt-6 bg-[#faf9f4] p-6 rounded-lg shadow",children:e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"First Name:"}),e.jsx("p",{className:"text-gray-800",children:a.FirstName||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Civil Status:"}),e.jsx("p",{className:"text-gray-800",children:a.Status||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Last Name:"}),e.jsx("p",{className:"text-gray-800",children:a.LastName||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Gender:"}),e.jsx("p",{className:"text-gray-800",children:a.Gender||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Birthday:"}),e.jsx("p",{className:"text-gray-800",children:a.Birthday||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Age:"}),e.jsx("p",{className:"text-gray-800",children:a.Age||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Contact Number:"}),e.jsx("p",{className:"text-gray-800",children:a.ContactNumber||"N/A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"block text-sm text-gray-600",children:"Address:"}),e.jsx("p",{className:"text-gray-800",children:a.Address||"N/A"})]})]})}),m===1&&e.jsxs("form",{onSubmit:P,children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 mt-4",children:[e.jsx(c,{clearable:!0,bordered:!0,label:"First Name",value:a.FirstName,onChange:s=>l({...a,FirstName:s.target.value})}),e.jsx(c,{clearable:!0,bordered:!0,label:"Last Name",value:a.LastName,onChange:s=>l({...a,LastName:s.target.value})}),e.jsxs(y,{label:"Civil Status",value:a.Status,onChange:s=>l({...a,Status:s.target.value}),children:[e.jsx(o,{value:"Single",children:"Single"}),e.jsx(o,{value:"Married",children:"Married"}),e.jsx(o,{value:"Divorced",children:"Divorced"})]}),e.jsx(c,{clearable:!0,bordered:!0,label:"Address",value:a.Address,onChange:s=>l({...a,Address:s.target.value})}),e.jsx(c,{clearable:!0,bordered:!0,label:"Contact Number",value:a.ContactNumber,onChange:s=>l({...a,ContactNumber:s.target.value})}),e.jsxs(y,{label:"Gender",value:a.Gender,onChange:s=>l({...a,Gender:s.target.value}),children:[e.jsx(o,{value:"Male",children:"Male"}),e.jsx(o,{value:"Female",children:"Female"})]}),e.jsx(c,{clearable:!0,bordered:!0,label:"Birthday",type:"date",value:a.Birthday.split("T")[0],onChange:s=>l({...a,Birthday:s.target.value})})]}),e.jsx(h,{type:"submit",className:"mt-6",children:"Update Profile"})]})]})]})]})},Z=()=>e.jsxs("div",{className:"w-full h-full flex",children:[e.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6] shadow-lg",children:e.jsx(S,{})}),e.jsx("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:e.jsx(L,{})})]});export{Z as default};