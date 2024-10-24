import{u as f,c as j,r as m,a as x,_ as n,j as e}from"./index-CXtfmwZQ.js";import{C as g}from"./ContentHeader-C6WfBba0.js";import{S as N}from"./Sidebar-CxjM3ZbU.js";import{F as p,d as v}from"./index-CM3tdvt6.js";import{t as y}from"./profile-C3-SQTJL.js";import{i as r}from"./chunk-GQQM5TNQ-CFSTJq-O.js";import{s as c,l as t}from"./chunk-CEHIK4GH-BVkK9qkA.js";import{b as u}from"./chunk-DBLREEYE-FY3488ZC.js";import"./useOverlayTriggerState-DaPpTKZA.js";import"./chunk-CIZQCQPA-BLAwQ4xO.js";import"./chunk-CAFRINWI-CMvs8fyY.js";import"./useFormReset-q0VssPgm.js";import"./useField-C3TM-VGB.js";import"./useLabels-mzJkRGwl.js";import"./useDialog-q1ilz28J.js";import"./VisuallyHidden-CmE0bZKs.js";const b=()=>{const o=f(),{id:i}=j(),[l,s]=m.useState({LRN:"",FirstName:"",MiddleName:"",LastName:"",Age:"",Level:"",Section:"",Birthday:"",Address:"",MotherTongue:"",Nationality:"",Gender:"",ContactNumber:""});m.useEffect(()=>{x.get(`/api/getStudentID/${i}`).then(a=>{s(a.data)}).catch(a=>{console.error("Error fetching student data:",a),n.error("Failed to fetch student data. Please try again later.")})},[i]);const h=async a=>{a.preventDefault();try{const{data:d}=await x.patch(`/api/updateStudent/${i}`,l);d.error?n.error(d.error):(n.success("Updated Student info Successfully."),o("/manageStudent"))}catch(d){console.error("Error updating student data:",d),n.error("Failed to update student. Please try again.")}};return e.jsx("div",{className:"container mx-auto px-6",children:e.jsxs("div",{className:"max-w-9xl mx-auto bg-white shadow-lg rounded-lg p-8 pt",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800",children:"Update Student's Information"}),e.jsx(y,{showArrow:!0,content:e.jsxs("div",{className:"px-2 py-1",children:[e.jsx("div",{className:"text-sm font-bold",children:"Update Information"}),e.jsx("div",{className:"text-xs",children:"This function will update the information of the students in the system."})]}),children:e.jsx(p,{icon:v,size:"md",className:"text-gray-600"})})]}),e.jsxs("form",{onSubmit:h,children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"font-medium text-gray-700",children:"LRN"}),e.jsx(r,{underlined:!0,clearable:!0,value:l.LRN,onChange:a=>s({...l,LRN:a.target.value}),placeholder:"Enter student's LRN",maxLength:12,type:"number"})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"font-medium text-gray-700",children:"First Name"}),e.jsx(r,{underlined:!0,clearable:!0,value:l.FirstName,onChange:a=>s({...l,FirstName:a.target.value}),placeholder:"Enter the First Name"})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"font-medium text-gray-700",children:"Middle Name"}),e.jsx(r,{underlined:!0,clearable:!0,value:l.MiddleName,onChange:a=>s({...l,MiddleName:a.target.value}),placeholder:"Enter the Middle Name"})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"font-medium text-gray-700",children:"Last Name"}),e.jsx(r,{underlined:!0,clearable:!0,value:l.LastName,onChange:a=>s({...l,LastName:a.target.value}),placeholder:"Enter the Last Name"})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"font-medium text-gray-700",children:"Age"}),e.jsx(r,{underlined:!0,clearable:!0,value:l.Age,onChange:a=>s({...l,Age:a.target.value}),placeholder:"Enter student's age",type:"number"})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"font-medium text-gray-700",children:"Grade Level"}),e.jsxs(c,{placeholder:"Select Grade Level",value:l.Level,onChange:a=>s({...l,Level:a}),children:[e.jsx(t,{disabled:!0,children:"Select Grade Level"},""),e.jsx(t,{children:"Grade 1"},"Grade 1")]})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"font-medium text-gray-700",children:"Section"}),e.jsxs(c,{placeholder:"Select Section",value:l.Section,onChange:a=>s({...l,Section:a}),children:[e.jsx(t,{disabled:!0,children:"Select Section"},""),e.jsx(t,{children:"Camia"},"Camia"),e.jsx(t,{children:"Daffodil"},"Daffodil"),e.jsx(t,{children:"Daisy"},"Daisy"),e.jsx(t,{children:"Gumamela"},"Gumamela"),e.jsx(t,{children:"Lily"},"Lily"),e.jsx(t,{children:"Rosal"},"Rosal"),e.jsx(t,{children:"Rose"},"Rose"),e.jsx(t,{children:"Santan"},"Santan"),e.jsx(t,{children:"Special"},"Special")]})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"font-medium text-gray-700",children:"Birthday"}),e.jsx(r,{underlined:!0,clearable:!0,value:l.Birthday,onChange:a=>s({...l,Birthday:a.target.value}),type:"date"})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"font-medium text-gray-700",children:"Address"}),e.jsx(r,{underlined:!0,clearable:!0,value:l.Address,onChange:a=>s({...l,Address:a.target.value}),placeholder:"Enter the Address"})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"font-medium text-gray-700",children:"Mother Tongue"}),e.jsx(r,{underlined:!0,clearable:!0,value:l.MotherTongue,onChange:a=>s({...l,MotherTongue:a.target.value}),placeholder:"Enter the Mother Tongue"})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"font-medium text-gray-700",children:"Nationality"}),e.jsx(r,{underlined:!0,clearable:!0,value:l.Nationality,onChange:a=>s({...l,Nationality:a.target.value}),placeholder:"Enter the Nationality"})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"font-medium text-gray-700",children:"Gender"}),e.jsxs(c,{placeholder:"Select Gender",value:l.Gender,onChange:a=>s({...l,Gender:a}),children:[e.jsx(t,{disabled:!0,children:"Select Gender"},""),e.jsx(t,{children:"Male"},"male"),e.jsx(t,{children:"Female"},"female"),e.jsx(t,{children:"Other"},"other")]})]})]}),e.jsxs("div",{className:"flex justify-end mt-6",children:[e.jsx(u,{type:"submit",color:"primary",auto:!0,children:"Save Changes"}),e.jsx(u,{auto:!0,flat:!0,color:"danger",onClick:()=>o(-1),className:"ml-4",children:"Cancel"})]})]})]})})},U=()=>e.jsxs("div",{className:"w-full h-full flex",children:[e.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6] shadow-lg",children:e.jsx(N,{})}),e.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[e.jsx(g,{}),e.jsx(b,{})]})]});export{U as default};
