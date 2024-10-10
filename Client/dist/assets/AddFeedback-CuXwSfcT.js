import{r as m,j as e,a as w,_ as c}from"./index-B3evWOvr.js";import{P as r}from"./index-KVpr4HOM.js";import{m as y,a as h,b as g,c as j}from"./chunk-P2T5LMDM-CPUzQnkl.js";import{m as T}from"./chunk-LT4XONRR-DWlYuu8L.js";import{i as x}from"./chunk-GQQM5TNQ-CxrkTZN7.js";import{s as I,l as d}from"./chunk-CEHIK4GH-DLyrYah4.js";import{t as N}from"./chunk-ATAY3LCU-Bk1y3Yur.js";import{b as p}from"./chunk-DBLREEYE-BgWDaA6x.js";const C=({show:u,onHide:i})=>{const b=()=>{i()};return e.jsx(y,{isOpen:u,onClose:i,"aria-labelledby":"success-modal-title",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(T,{children:[e.jsx(h,{id:"success-modal-title",children:"Feedback Created Successfully!"}),e.jsx(g,{children:e.jsx("p",{children:"You have created feedback for your student's performance!"})}),e.jsx(j,{children:e.jsx(p,{color:"primary",onClick:b,children:"Close"})})]})})},E=({show:u,onHide:i,actCode:b,userid:_,lrn:k,section:v})=>{const[D,f]=m.useState(!1),[s,o]=m.useState({Title:"",Type:"",Feedback_Date:"",Context:""}),[t,F]=m.useState({}),S=()=>{let a=!0,l={};return s.Title||(l.Title="Title is required.",a=!1),s.Type||(l.Type="Type of assessment is required.",a=!1),s.Feedback_Date||(l.Feedback_Date="Feedback date is required.",a=!1),s.Context||(l.Context="Context is required.",a=!1),F(l),a},P=async a=>{if(a.preventDefault(),!S()){c.error("Please fill out all required fields.");return}const{Feedback_Date:l,Type:q,Title:A,Context:R}=s;try{const n=await w.post("/api/submitFeedback",{UserID:_,LRN:k,Section:v,Title:A,ActivityCode:b,Type:q,Feedback_Date:l,Context:R});n.data.error?c.error(n.data.error):(o({Title:"",Type:"",Feedback_Date:"",Context:""}),c.success("Created Feedback Successfully."),f(!0))}catch(n){console.error(n),c.error("Error creating feedback. Please try again.")}};return e.jsxs(e.Fragment,{children:[e.jsx(y,{isOpen:u,onClose:i,size:"lg","aria-labelledby":"create-feedback-modal-title",isDismissable:!1,isKeyboardDismissDisabled:!0,scrollBehavior:"inside",children:e.jsxs(T,{children:[e.jsx(h,{id:"create-feedback-modal-title",children:"Create New Feedback"}),e.jsxs("form",{onSubmit:P,children:[e.jsxs(g,{children:[e.jsx(x,{type:"text",label:"Title",placeholder:"Input a concern title",labelPlacement:"outside",variant:"bordered",className:"bg-transparent py-1 my-1",value:s.Title,onChange:a=>o({...s,Title:a.target.value}),isInvalid:!!t.Title,errorMessage:t.Title}),e.jsxs(I,{labelPlacement:"outside",label:"Type of Assessment",placeholder:"Select Type of Assessment","aria-label":"Select type of assessment",variant:"bordered",className:"bg-transparent py-1 my-1",value:s.Type,onChange:a=>o({...s,Type:a.target.value}),isInvalid:!!t.Type,errorMessage:t.Type,children:[e.jsx(d,{children:"Select Type of Assessment"},""),e.jsx(d,{children:"Assessment 1: Pagbabaybay Tunog at Letra"},"Pagbabaybay"),e.jsx(d,{children:"Assessment 2: Pantig"},"Pantig"),e.jsx(d,{children:"Assessment 3: Salita"},"Salita"),e.jsx(d,{children:"Assessment 4: Pagbabasa"},"Pagbabasa")]}),e.jsx(x,{className:"pt-2",type:"date",label:"Feedback Date",labelPlacement:"outside",variant:"bordered",value:s.Feedback_Date,onChange:a=>o({...s,Feedback_Date:a.target.value}),isInvalid:!!t.Feedback_Date,errorMessage:t.Feedback_Date}),e.jsx(N,{placeholder:"Input feedback context",label:"Context",labelPlacement:"outside",variant:"bordered",className:"bg-transparent py-1 my-1",value:s.Context,onChange:a=>o({...s,Context:a.target.value}),isInvalid:!!t.Context,errorMessage:t.Context})]}),e.jsxs(j,{children:[e.jsx(p,{color:"danger",variant:"light",onClick:i,children:"Close"}),e.jsx(p,{color:"primary",type:"submit",children:"Send Feedback"})]})]})]})}),e.jsx(C,{show:D,onHide:()=>f(!1)})]})};E.propTypes={show:r.bool.isRequired,onHide:r.func.isRequired,actCode:r.string.isRequired,userid:r.string.isRequired,lrn:r.string.isRequired,section:r.string.isRequired};C.propTypes={show:r.bool.isRequired,onHide:r.func.isRequired};export{E as A};
