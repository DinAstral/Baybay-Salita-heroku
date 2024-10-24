import{u as F,r as c,U as B,j as t,a as f,_ as i}from"./index-CXtfmwZQ.js";import{C as R}from"./ContentHeader-C6WfBba0.js";import{S as T}from"./Sidebar-CxjM3ZbU.js";import{F as w,d as E}from"./index-CM3tdvt6.js";import{t as I}from"./profile-C3-SQTJL.js";import{s as D,l as G}from"./chunk-CEHIK4GH-BVkK9qkA.js";import{i as d}from"./chunk-GQQM5TNQ-CFSTJq-O.js";import{b as q}from"./chunk-DBLREEYE-FY3488ZC.js";import"./useOverlayTriggerState-DaPpTKZA.js";import"./chunk-CIZQCQPA-BLAwQ4xO.js";import"./useField-C3TM-VGB.js";import"./useLabels-mzJkRGwl.js";import"./useDialog-q1ilz28J.js";import"./VisuallyHidden-CmE0bZKs.js";import"./useFormReset-q0VssPgm.js";import"./chunk-CAFRINWI-CMvs8fyY.js";const _=()=>{const x=F(),[s,u]=c.useState({LRN:"",FirstName:"",MiddleName:"",LastName:"",Level:"",Section:"",Birthday:"",Address:"",MotherTongue:"",Gender:"",ContactNumber:""}),[n,p]=c.useState({}),[h,y]=c.useState([]),[N,S]=c.useState(""),[P,v]=c.useState(null),{user:b}=c.useContext(B);c.useEffect(()=>{const r=async()=>{try{const a=await f.get("/api/getParent");a.data&&a.data.length>0?y(a.data):i.error("No verified parents found.")}catch(a){console.error(a),i.error("Failed to fetch parent data.")}},e=async()=>{try{const a=await f.get(`/api/getTeacher/${b.UserID}`);a.data&&a.data.Section?(S(a.data.Section),u(o=>({...o,Section:a.data.Section}))):i.error("Failed to fetch teacher's section.")}catch(a){console.error(a),i.error("Failed to fetch teacher data.")}};r(),e()},[]);const L=r=>{const e=r.target.value;u({...s,LRN:e});const a=h.flatMap(o=>Array.isArray(o.Student)?o.Student:[]).find(o=>o.LRN===e);if(a){const o=h.find(m=>Array.isArray(m.Student)&&m.Student.some(A=>A.LRN===e));v(a),u({LRN:a.LRN,FirstName:a.FirstName,LastName:a.LastName,Birthday:a.Birthday,Age:g(a.Birthday),Address:(o==null?void 0:o.Address)||"",MotherTongue:a.MotherTongue,Gender:a.Gender,ContactNumber:(o==null?void 0:o.ContactNumber)||"",Section:N})}else i.error("Student not found.")},g=r=>{const e=new Date(r),a=new Date;let o=a.getFullYear()-e.getFullYear();const m=a.getMonth()-e.getMonth();return(m<0||m===0&&a.getDate()<e.getDate())&&o--,o},j=r=>{const e=r.target.value;u({...s,Birthday:e,Age:g(e)})},l=r=>{const{name:e,value:a}=r.target;u({...s,[e]:a})},C=()=>{let r=!0,e={};return s.LRN||(e.LRN="LRN is required.",r=!1),s.FirstName||(e.FirstName="First Name is required.",r=!1),s.LastName||(e.LastName="Last Name is required.",r=!1),s.Birthday||(e.Birthday="Birthday is required.",r=!1),s.Address||(e.Address="Address is required.",r=!1),s.MotherTongue||(e.MotherTongue="Mother Tongue is required.",r=!1),s.Gender||(e.Gender="Gender is required.",r=!1),s.ContactNumber||(e.ContactNumber="Contact Number is required.",r=!1),s.Section||(e.Section="Section is required.",r=!1),p(e),r},M=async r=>{if(r.preventDefault(),!C()){i.error("Please fill out the form correctly.");return}try{const e=await f.post("/api/addStudent",s);e.data.error?i.error(e.data.error):(u({LRN:"",FirstName:"",MiddleName:"",LastName:"",Level:"",Section:N,Birthday:"",Age:"",Address:"",MotherTongue:"",Gender:"",ContactNumber:""}),i.success("Student added successfully."),x("/manageStudent"))}catch(e){console.error(e),i.error("Failed to add student. Please try again.")}};return t.jsx("div",{className:"container mx-auto px-6 pt-[4rem]",children:t.jsxs("div",{className:"bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 flex flex-col",children:[t.jsxs("h2",{className:"mb-6 text-3xl font-bold text-gray-700 flex items-center gap-2",children:["Add Student's Information",t.jsx(I,{showArrow:!0,content:t.jsxs("div",{className:"px-1 py-2",children:[t.jsx("div",{className:"text-small font-bold",children:"Add Student"}),t.jsx("div",{className:"text-tiny",children:"This function will add the information of the students in the system."})]}),children:t.jsx(w,{icon:E,size:"sm",className:"text-gray-700 text-[20px]"})})]}),t.jsxs("form",{onSubmit:M,children:[t.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[t.jsx("div",{children:t.jsx(D,{label:"LRN",placeholder:"Select student's LRN",value:s.LRN,onChange:L,errorMessage:n.LRN,isInvalid:!!n.LRN,children:h.filter(r=>r.verified).flatMap(r=>Array.isArray(r.Student)?r.Student.map(e=>t.jsx(G,{value:e.LRN,children:e.LRN},e.LRN)):[])})}),t.jsx(d,{label:"First Name",type:"text",placeholder:"Enter the First Name",name:"FirstName",value:s.FirstName,onChange:l,errorMessage:n.FirstName,isInvalid:!!n.FirstName}),t.jsx(d,{label:"Last Name",type:"text",placeholder:"Enter the Last Name",name:"LastName",value:s.LastName,onChange:l,errorMessage:n.LastName,isInvalid:!!n.LastName}),t.jsx(d,{label:"Birthday",type:"date",name:"Birthday",value:s.Birthday.split("T")[0],onChange:l,errorMessage:n.Birthday,isInvalid:!!n.Birthday}),t.jsx(d,{label:"Birthday",type:"date",name:"Birthday",value:s.Birthday.split("T")[0],onChange:j,errorMessage:n.Birthday,isInvalid:!!n.Birthday}),t.jsx(d,{label:"Age",type:"text",name:"Age",value:s.Age,isDisabled:!0}),t.jsx(d,{label:"Mother Tongue",type:"text",placeholder:"Enter the Mother Tongue",name:"MotherTongue",value:s.MotherTongue,onChange:l,errorMessage:n.MotherTongue,isInvalid:!!n.MotherTongue}),t.jsx(d,{label:"Gender",type:"text",placeholder:"Enter Gender",name:"Gender",value:s.Gender,onChange:l,errorMessage:n.Gender,isInvalid:!!n.Gender}),t.jsx(d,{label:"Contact Number",type:"text",placeholder:"Enter the Contact Number",name:"ContactNumber",value:s.ContactNumber,onChange:l,errorMessage:n.ContactNumber,isInvalid:!!n.ContactNumber}),t.jsx(d,{label:"Section",type:"text",placeholder:"Enter the Section",name:"Section",value:s.Section,onChange:l,errorMessage:n.Section,isInvalid:!!n.Section,readOnly:!0})]}),t.jsx("div",{className:"mt-6",children:t.jsx(q,{type:"submit",color:"primary",size:"lg",radius:"sm",children:"Add Student"})})]})]})})},ae=()=>t.jsxs("div",{className:"w-full h-full flex",children:[t.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6] shadow-lg",children:t.jsx(T,{})}),t.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[t.jsx(R,{}),t.jsx(_,{})]})]});export{ae as default};
