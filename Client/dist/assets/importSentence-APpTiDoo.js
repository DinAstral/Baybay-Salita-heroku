import{r as f,j as e,_ as c,a as D}from"./index-_hBb-rJH.js";import{P as x,F as p,l as I,q as O,x as R,y as z,z as B}from"./index-kQkd6Vwp.js";import{m as y,a as b,b as j,c as v}from"./chunk-P2T5LMDM-pd3GF4Xk.js";import{m as g}from"./chunk-LT4XONRR-DIhF-B7w.js";import{s as Q,l as w}from"./chunk-CEHIK4GH-BVOHJP1B.js";import{i as h}from"./chunk-GQQM5TNQ-Cvs5IUQ7.js";import{b as u}from"./chunk-DBLREEYE-dWdyKFVG.js";import{t as Y}from"./chunk-ATAY3LCU-Bohssusq.js";const L=({show:o,onHide:n})=>{const d=()=>{n(),window.location.reload()};return e.jsx(y,{isOpen:o,onClose:n,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(g,{children:[e.jsx(b,{id:"contained-modal-title-vcenter",children:"Word imported Successfully!"}),e.jsx(j,{children:e.jsx("p",{children:"You have imported a word for your students!"})}),e.jsx(v,{children:e.jsx(u,{color:"primary",onClick:d,children:"Close"})})]})})},U=({show:o,onHide:n})=>{const[d,m]=f.useState(!1),[s,i]=f.useState({Type:"",Word:"",Image:null,Audio:null}),[a,S]=f.useState({}),C=()=>{const t={};return s.Type||(t.Type="Please select a word assessment type."),s.Word||(t.Word="Please input a word."),s.Image||(t.Image="Please upload an image."),s.Audio||(t.Audio="Please upload an audio file."),S(t),Object.keys(t).length===0},T=async t=>{if(t.preventDefault(),!C())return c.error("Please fill out all required fields.");const r=new FormData;r.append("Type",s.Type),r.append("Word",s.Word),r.append("Image",s.Image),r.append("Audio",s.Audio);try{const l=await D.post("/api/importWord",r,{headers:{"Content-Type":"multipart/form-data"}});l.status===400&&l.data.error?c.error(l.data.error):(c.success("Word imported successfully."),m(!0))}catch(l){l.response&&l.response.data&&l.response.data.error?c.error(`Error: ${l.response.data.error}`):c.error("Failed to import word. Please try again."),console.error("Failed to import word:",l)}};return e.jsxs(e.Fragment,{children:[e.jsx(y,{isOpen:o,onClose:n,size:"lg","aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,scrollBehavior:"inside",placement:"center",children:e.jsxs(g,{children:[e.jsx(b,{id:"contained-modal-title-vcenter",children:"Import New Word"}),e.jsxs("form",{onSubmit:T,children:[e.jsxs(j,{children:[e.jsxs(Q,{labelPlacement:"outside",label:"Assessment",placeholder:"Select type of Word Assessment","aria-label":"Select activity type",value:s.Type,variant:"bordered",className:"bg-transparent py-1 my-1",isInvalid:!!a.Type,errorMessage:a.Type,onChange:t=>i({...s,Type:t.target.value}),children:[e.jsx(w,{children:"Assessment 1: Pagbabaybay Tunog at Letra"},"Pagbabaybay"),e.jsx(w,{children:"Assessment 2: Pantig"},"Pantig"),e.jsx(w,{children:"Assessment 3: Salita"},"Salita")]}),e.jsx(h,{type:"text",placeholder:"Input Word",labelPlacement:"outside",label:"Word/Letra/Tunog",variant:"bordered",className:"bg-transparent py-1 my-1",value:s.Word,onChange:t=>i({...s,Word:t.target.value}),isInvalid:!!a.Word,errorMessage:a.Word,endContent:e.jsx(p,{icon:I,className:"text-2xl text-default-400 pointer-events-none flex-shrink-0"})}),e.jsx(h,{type:"file",label:"Insert an Image",variant:"bordered",className:"bg-transparent py-1 my-1",onChange:t=>i({...s,Image:t.target.files[0]}),isInvalid:!!a.Image,errorMessage:a.Image,endContent:e.jsx(p,{icon:I,className:"text-2xl text-default-400 pointer-events-none flex-shrink-0"})}),e.jsx(h,{type:"file",label:"Insert an Audio",variant:"bordered",className:"bg-transparent py-1 my-1",onChange:t=>i({...s,Audio:t.target.files[0]}),isInvalid:!!a.Audio,errorMessage:a.Audio,endContent:e.jsx(p,{icon:I,className:"text-2xl text-default-400 pointer-events-none flex-shrink-0"})})]}),e.jsxs(v,{children:[e.jsx(u,{color:"danger",variant:"light",onClick:n,children:"Close"}),e.jsx(u,{color:"primary",type:"submit",children:"Import"})]})]})]})}),e.jsx(L,{show:d,onHide:()=>m(!1)})]})};U.propTypes={show:x.bool.isRequired,onHide:x.func.isRequired};const V=({show:o,onHide:n})=>{const d=()=>{n(),window.location.reload()};return e.jsx(y,{isOpen:o,onClose:n,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(g,{children:[e.jsx(b,{children:"Delete Activity Successfully"}),e.jsx(j,{children:e.jsx("p",{children:"You have deleted the activity for the student successfully."})}),e.jsx(v,{children:e.jsx(u,{color:"primary",onClick:d,children:"Close"})})]})})},G=({show:o,onHide:n,activity:d})=>{const[m,s]=f.useState(!1),i=async()=>{try{await D.delete(`/api/deleteAssessment/${d._id}`),s(!0)}catch(a){console.error("Error deleting activity:",a),c.error("Failed to delete activity. Please try again later.")}};return e.jsxs(e.Fragment,{children:[e.jsx(y,{isOpen:o,onClose:n,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(g,{children:[e.jsx(b,{className:"flex flex-col",children:"Delete The Activity"}),e.jsx(j,{children:e.jsx("p",{children:"Do you want to delete the current activity?"})}),e.jsxs(v,{children:[e.jsx(u,{color:"danger",variant:"light",onClick:n,children:"Close"}),e.jsx(u,{color:"primary",onClick:i,children:"Delete"})]})]})}),e.jsx(V,{show:m,onHide:()=>{s(!1),n()}})]})};G.propTypes={show:x.bool.isRequired,onHide:x.func.isRequired,activity:x.object};const J=({show:o,onHide:n})=>{const d=()=>{n(),window.location.reload()};return e.jsx(y,{isOpen:o,onClose:n,"aria-labelledby":"success-modal-title",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(g,{children:[e.jsx(b,{id:"success-modal-title",children:"Sentence Imported Successfully!"}),e.jsx(j,{children:e.jsx("p",{children:"You have successfully imported a sentence for your students!"})}),e.jsx(v,{children:e.jsx(u,{color:"primary",onClick:d,children:"Close"})})]})})},X=({show:o,onHide:n})=>{const[d,m]=f.useState(!1),[s,i]=f.useState({Type:"",Title:"",Sentence:"",Question1:"",Question2:"",Question3:"",Question4:"",Question5:"",Answer1:"",Answer2:"",Answer3:"",Answer4:"",Answer5:""}),[a,S]=f.useState({}),C=()=>{let t=!0,r={};return s.Type||(r.Type="Type is required.",t=!1),s.Title||(r.Title="Title is required.",t=!1),s.Sentence||(r.Sentence="Sentence is required.",t=!1),s.Question1||(r.Question1="Question 1 is required.",t=!1),s.Answer1||(r.Answer1="Answer 1 is required.",t=!1),s.Question2||(r.Question2="Question 2 is required.",t=!1),s.Answer2||(r.Answer2="Answer 2 is required.",t=!1),s.Question3||(r.Question3="Question 3 is required.",t=!1),s.Answer3||(r.Answer3="Answer 3 is required.",t=!1),s.Question4||(r.Question4="Question 4 is required.",t=!1),s.Answer4||(r.Answer4="Answer 4 is required.",t=!1),s.Question5||(r.Question5="Question 5 is required.",t=!1),s.Answer5||(r.Answer5="Answer 5 is required.",t=!1),S(r),t},T=async t=>{if(t.preventDefault(),!C()){c.error("Please fill out all required fields.");return}const{Type:r,Title:l,Sentence:N,Question1:P,Question2:q,Question3:_,Question4:k,Question5:W,Answer1:F,Answer2:M,Answer3:$,Answer4:E,Answer5:K}=s;try{const A=await D.post("/api/importSentence",{Type:r,Title:l,Sentence:N,Question1:P,Question2:q,Question3:_,Question4:k,Question5:W,Answer1:F,Answer2:M,Answer3:$,Answer4:E,Answer5:K});A.data.error?c.error(A.data.error):(c.success("Sentence imported successfully."),m(!0))}catch(A){console.error("Failed to import sentence:",A),c.error("Failed to import sentence.")}};return e.jsxs(e.Fragment,{children:[e.jsx(y,{isOpen:o,onClose:n,size:"2xl","aria-labelledby":"import-modal-title",isDismissable:!1,isKeyboardDismissDisabled:!0,scrollBehavior:"inside",placement:"center",children:e.jsxs(g,{className:"w-full md:w-[50vw] max-w-full max-h-[80vh] overflow-y-auto bg-white p-4 rounded-lg",children:[e.jsx(b,{id:"import-modal-title",children:"Import New Sentence"}),e.jsxs("form",{onSubmit:T,children:[e.jsxs(j,{children:[e.jsx("div",{className:"text-sm",children:e.jsx("p",{children:"Please provide the information for your assessment."})}),e.jsxs(Q,{labelPlacement:"outside",label:"Select type of Assessment","aria-label":"Select activity type",defaultSelectedKeys:[" "],value:s.Type,variant:"bordered",className:"bg-transparent py-1 my-1",onChange:t=>i({...s,Type:t.target.value}),isInvalid:!!a.Type,errorMessage:a.Type,children:[e.jsx(w,{children:"Select Type of Assessment:"}," "),e.jsx(w,{children:"Assessment 4: Pagbabasa"},"1")]}),e.jsx(h,{type:"text",label:"Title",placeholder:"Enter a title",labelPlacement:"outside",variant:"bordered",className:"bg-transparent py-1 my-1",value:s.Title,onChange:t=>i({...s,Title:t.target.value}),isInvalid:!!a.Title,errorMessage:a.Title,endContent:e.jsx(p,{icon:O,className:"text-2xl text-default-400 pointer-events-none flex-shrink-0"})}),e.jsx(Y,{placeholder:"Input sentence",labelPlacement:"outside",label:"Add a Filipino short reading story",variant:"bordered",className:"bg-transparent py-1 my-1",value:s.Sentence,onChange:t=>i({...s,Sentence:t.target.value}),isInvalid:!!a.Sentence,errorMessage:a.Sentence,endContent:e.jsx(p,{icon:R,className:"text-2xl text-default-400 pointer-events-none flex-shrink-0"})}),e.jsx("div",{className:"flex flex-col gap-6",children:[...Array(5)].map((t,r)=>e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsx("div",{className:"flex flex-1",children:e.jsx(h,{type:"text",label:`Question ${r+1}`,placeholder:"Write a question",labelPlacement:"outside",variant:"bordered",className:"bg-transparent py-1 my-1",value:s[`Question${r+1}`],onChange:l=>i({...s,[`Question${r+1}`]:l.target.value}),isInvalid:!!a[`Question${r+1}`],errorMessage:a[`Question${r+1}`],endContent:e.jsx(p,{icon:z,className:"text-2xl text-default-400 pointer-events-none flex-shrink-0"})})}),e.jsx("div",{className:"flex flex-1",children:e.jsx(h,{type:"text",label:`Answer ${r+1}`,placeholder:"Input the answer",labelPlacement:"outside",variant:"bordered",className:"bg-transparent py-1 my-1",value:s[`Answer${r+1}`],onChange:l=>i({...s,[`Answer${r+1}`]:l.target.value}),isInvalid:!!a[`Answer${r+1}`],errorMessage:a[`Answer${r+1}`],endContent:e.jsx(p,{icon:B,className:"text-2xl text-default-400 pointer-events-none flex-shrink-0"})})})]},r))})]}),e.jsxs(v,{children:[e.jsx(u,{color:"danger",variant:"light",onClick:n,children:"Close"}),e.jsx(u,{color:"primary",type:"submit",children:"Import"})]})]})]})}),e.jsx(J,{show:d,onHide:()=>m(!1)})]})};X.propTypes={show:x.bool.isRequired,onHide:x.func.isRequired};export{G as D,U as I,X as a};
