import{r as l,j as e,a as P,_ as B,L as ie,U as re}from"./index-46g2bTDn.js";import{C as oe}from"./ContentHeader-DpVqTCVw.js";import{S as ne}from"./Sidebar-DpQKFVYP.js";import{l as ce}from"./index-BNgsrzIl.js";import{P as C,F as K,d as de,i as me}from"./index-DNBWh895.js";import{P as he,t as xe,a as ue,b,c as pe,d as fe,e as I}from"./PrintRecord-UO3Gbyum.js";import{m as M,a as U,b as V,c as H,d as $}from"./chunk-P2T5LMDM-qiyDJ0_b.js";import{s as y,l as i}from"./chunk-CEHIK4GH-DOIINAQy.js";import{b as d}from"./chunk-DBLREEYE-BXO_GMqR.js";import{I as je,a as be,D as Ie}from"./importSentence-DYSQ1LLP.js";import{t as L}from"./profile-BbWcRgwB.js";import"./getChildNodes-BL6AwTCE.js";import"./useOverlayTriggerState-DubV0HT-.js";import"./useDialog-Ut058J2V.js";import"./useLabels-BPo4wpnf.js";import"./VisuallyHidden-C5gje3G6.js";import"./chunk-KBN3H6OQ-C0XKlXen.js";import"./useField-BjMqx42N.js";import"./chunk-CIZQCQPA-O0-gHmPi.js";import"./useFormReset-CCBh5ESW.js";import"./chunk-GQQM5TNQ-L-PYr1s4.js";import"./chunk-ATAY3LCU-D-xNJaoI.js";import"./extends-CF3RwP-h.js";import"./objectWithoutPropertiesLoose-CAYKN5F1.js";const ye=({show:x,onHide:o})=>{const c=()=>{o(),window.location.reload()};return e.jsx(M,{isOpen:x,onClose:o,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(U,{children:[e.jsx(V,{id:"contained-modal-title-vcenter",children:"Activity Created Successfully!"}),e.jsx(H,{children:e.jsx("p",{children:"You have created an activity for your students!"})}),e.jsx($,{children:e.jsx(d,{color:"primary",onClick:c,children:"Close"})})]})})},O=({show:x,handleClose:o,userId:c,section:N})=>{const[R,g]=l.useState(!1),[T,_]=l.useState([]),[W,D]=l.useState([]),[S,G]=l.useState([]),[s,u]=l.useState({Period:"",Type:"",Title:"",Item1:"",Item2:"",Item3:"",Item4:"",Item5:"",Item6:"",Item7:"",Item8:"",Item9:"",Item10:""}),E=()=>{P.get("/api/getImportWord").then(t=>{_(t.data)}).catch(t=>console.log(t))},k=()=>{P.get("/api/getSentence").then(t=>{D(t.data)}).catch(t=>console.log(t))};l.useEffect(()=>{E(),k()},[]),l.useEffect(()=>{if(s.Type){const t=T.filter(n=>n.Type===s.Type);G(t)}else G([])},[s.Type,T]);const w=(t,n)=>{const r=S.find(v=>v.ItemCode===n);u({...s,[t]:r?r.ItemCode:""})},F=async t=>{t.preventDefault();const{Period:n,Type:r,Title:v}=s;try{const m=await P.post("/api/submitAssessment",{UserID:c,Section:N,Period:n,Type:r,Title:v,Item1:s.Item1,Item2:s.Item2,Item3:s.Item3,Item4:s.Item4,Item5:s.Item5,Item6:s.Item6,Item7:s.Item7,Item8:s.Item8,Item9:s.Item9,Item10:s.Item10});m.data.error?B.error(m.data.error):(u({Period:"",Type:"",Title:"",Item1:"",Item2:"",Item3:"",Item4:"",Item5:"",Item6:"",Item7:"",Item8:"",Item9:"",Item10:""}),B.success("Created Activity Successfully."),g(!0),o())}catch(m){console.log(m)}};return e.jsxs(e.Fragment,{children:[e.jsx(M,{isOpen:x,onClose:o,size:"lg","aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,placement:"center",scrollBehavior:"inside",children:e.jsxs(U,{className:"w-full md:w-[50vw] max-w-full max-h-[80vh] overflow-y-auto bg-white p-4 rounded-lg",children:[e.jsx(V,{id:"contained-modal-title-vcenter",className:"text-lg font-bold",children:"Create New Activity"}),e.jsxs("form",{onSubmit:F,className:"space-y-4",children:[e.jsxs(H,{children:[e.jsxs(y,{labelPlacement:"outside",label:"Grading Period",placeholder:"Select Grading Period",value:s.Period,onChange:t=>u({...s,Period:t.target.value}),className:"w-full my-2",children:[e.jsx(i,{children:"Grading Period 1"},"1"),e.jsx(i,{children:"Grading Period 2"},"2"),e.jsx(i,{children:"Grading Period 3"},"3"),e.jsx(i,{children:"Grading Period 4"},"4")]}),e.jsxs(y,{labelPlacement:"outside",label:"Type of Assessment",placeholder:"Select Type of Assessment:",value:s.Type,onChange:t=>u({...s,Type:t.target.value}),className:"w-full my-2",children:[e.jsx(i,{children:"Assessment 1: Pagbabaybay Tunog at Letra"},"Pagbabaybay"),e.jsx(i,{children:"Assessment 2: Pantig"},"Pantig"),e.jsx(i,{children:"Assessment 3: Salita"},"Salita"),e.jsx(i,{children:"Assessment 4: Pagbabasa"},"Pagbabasa")]}),s.Type==="Pagbabasa"?e.jsx(y,{labelPlacement:"outside",label:"Title",value:s.Title,placeholder:"Select a Title:",onChange:t=>u({...s,Title:t.target.value}),className:"w-full my-2",children:W.map(t=>e.jsx(i,{value:t.Title,children:t.Title},t.Title))}):e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[...Array(10)].map((t,n)=>e.jsx(y,{labelPlacement:"outside",label:`Item ${n+1}`,value:s[`Item${n+1}`],placeholder:"Select a word:",onChange:r=>w(`Item${n+1}`,r.target.value),className:"w-full my-2",children:S.map(r=>e.jsx(i,{value:r.Word,children:r.Word},r.ItemCode))},`Item${n+1}`))})]}),e.jsxs($,{className:"flex justify-end space-x-2",children:[e.jsx(d,{color:"danger",variant:"light",onClick:o,children:"Close"}),e.jsx(d,{color:"primary",type:"submit",children:"Create Activity"})]})]})]})}),e.jsx(ye,{show:R,onHide:()=>g(!1)})]})};O.propTypes={show:C.bool.isRequired,handleClose:C.func.isRequired};const Y=({show:x,onHide:o,activity:c})=>e.jsx(M,{isOpen:x,onClose:o,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(U,{children:[e.jsx(V,{className:"flex flex-col",id:"edit-user-modal-title",children:"View Assessment Information"}),e.jsx(H,{children:e.jsx("p",{children:"Do you want to view the assessment of the student selected?"})}),e.jsxs($,{children:[e.jsx(d,{color:"danger",variant:"light",onClick:o,children:"Cancel"}),e.jsx(ie,{to:`/ViewActivityAssessment/${c==null?void 0:c.ActivityCode}`,children:e.jsx(d,{color:"primary",children:"View"})})]})]})});Y.propTypes={show:C.bool.isRequired,onHide:C.func.isRequired,activity:C.object};const ge=()=>{const[x,o]=l.useState(!1),[c,N]=l.useState(!1),[R,g]=l.useState(!1),[T,_]=l.useState(!1),[W,D]=l.useState(!1),[S,G]=l.useState(null),[s,u]=l.useState([]),[E,k]=l.useState([]),[w,F]=l.useState(""),[t,n]=l.useState(!1),[r,v]=l.useState(""),[m,J]=l.useState(""),[Q,X]=l.useState(""),{user:A}=l.useContext(re),Z=()=>o(!1),ee=()=>o(!0),q=l.useRef(null),{onDownload:se}=ce.useDownloadExcel({currentTableRef:q.current,filename:"Student_Assessment_Report_table",sheet:"Assessment"});l.useEffect(()=>{A&&A.UserID&&P.get(`/api/getTeacher/${A.UserID}`).then(a=>{J(a.data.Section),X(a.data.UserID)}).catch(a=>console.log(a))},[A]),l.useEffect(()=>{m&&P.get("/api/getAssessments").then(a=>{const h=a.data.filter(p=>p.UserID===Q);u(h),k(h)}).catch(a=>console.log(a))},[m]);const te=()=>{D(!0)},le=()=>{N(!0)},ae=()=>{_(!0)},z=(a,h)=>{const p=a.target.value;h==="period"?F(p):h==="type"&&v(p);let f=s;p!==""&&(f=s.filter(j=>h==="period"?j.Period===p:j.Type===p)),w&&h==="type"&&(f=f.filter(j=>j.Period===w)),r&&h==="period"&&(f=f.filter(j=>j.Type===r)),k(f)};return e.jsxs("div",{className:"px-9",children:[e.jsx(he,{show:W,onHide:()=>D(!1),print:se}),e.jsx(O,{show:x,handleClose:Z,userId:A.UserID,section:m}),e.jsx(je,{show:c,onHide:()=>N(!1)}),e.jsx(be,{show:T,onHide:()=>_(!1)}),e.jsx(Y,{show:R,activity:S,onHide:()=>g(!1)}),e.jsx(Ie,{show:t,activity:S,onHide:()=>n(!1)}),e.jsxs("div",{className:"content-title-header",children:[e.jsxs("div",{children:["Manage Student Assessment",e.jsx(L,{showArrow:!0,content:e.jsxs("div",{className:"px-1 py-2",children:[e.jsx("div",{className:"text-small font-bold",children:"Assessment Table"}),e.jsx("div",{className:"text-tiny",children:"This function will view the assessment of the students in each section."})]}),children:e.jsx(K,{icon:de,size:"1x",className:"help-icon"})})]}),e.jsx("div",{className:"generate-report",children:e.jsx(L,{showArrow:!0,content:e.jsxs("div",{className:"px-1 py-2",children:[e.jsx("div",{className:"text-small font-bold",children:"Print"}),e.jsx("div",{className:"text-tiny",children:"Generate report/Print table"})]}),children:e.jsx(K,{icon:me,size:"1x",className:"print-icon",onClick:te})})})]}),e.jsx("div",{className:"content-container",children:e.jsx("div",{className:"row",children:e.jsx("div",{className:"col",children:e.jsxs("div",{className:"card mt-1 border-0",children:[e.jsxs("div",{className:"list-header-drop-score",children:[e.jsxs("div",{className:"flex flex-row gap-5 justify-start w-[100%]",children:[e.jsxs(y,{labelPlacement:"outside",label:"Sort by Grading Period",variant:"bordered",className:"bg-transparent w-[20%]",onChange:a=>z(a,"period"),value:w,children:[e.jsx(i,{children:"Select Grading Period"},""),e.jsx(i,{children:"Grading Period 1"},"1"),e.jsx(i,{children:"Grading Period 2"},"2"),e.jsx(i,{children:"Grading Period 3"},"3"),e.jsx(i,{children:"Grading Period 4"},"4")]}),e.jsxs(y,{className:"w-[20%]",labelPlacement:"outside",label:"Sort by Type",variant:"bordered",onChange:a=>z(a,"type"),value:r,children:[e.jsx(i,{children:"Select Type of Assessment:"},""),e.jsx(i,{children:"Assessment 1"},"Pagbabaybay"),e.jsx(i,{children:"Assessment 2"},"Pantig"),e.jsx(i,{children:"Assessment 3"},"Salita"),e.jsx(i,{children:"Assessment 4"},"Pagbabasa")]})]}),e.jsxs("div",{className:"flex flex-row gap-5 justify-end mt-3",children:[e.jsx(d,{auto:!0,onClick:ae,color:"default",children:"Import Sentence"}),e.jsx(d,{auto:!0,onClick:le,color:"default",children:"Import Word"}),e.jsx(d,{auto:!0,onClick:ee,color:"primary",children:"Create Activity"})]})]}),e.jsx("div",{className:"card-body scrollable-table scrollable-container",children:e.jsxs(xe,{"aria-label":"Assessment Table",ref:q,removeWrapper:!0,color:"primary",selectionMode:"single",children:[e.jsxs(ue,{children:[e.jsx(b,{children:"Activity Code"}),e.jsx(b,{children:"Grading Period"}),e.jsx(b,{children:"Section"}),e.jsx(b,{children:"Type"}),e.jsx(b,{children:"Status"}),e.jsx(b,{className:"text-center",children:"Actions"})]}),e.jsx(pe,{emptyContent:"No rows to display.",children:E.map(a=>e.jsxs(fe,{children:[e.jsx(I,{children:a.ActivityCode}),e.jsx(I,{children:a.Period}),e.jsx(I,{children:a.Section}),e.jsx(I,{children:a.Type}),e.jsx(I,{children:a.Assessment}),e.jsx(I,{className:"text-center",children:e.jsx("div",{className:"table-buttons",children:e.jsx(d,{color:"primary",onClick:()=>{G(a),g(!0)},children:"View"})})})]},a._id))})]})})]})})})})]})},Ke=()=>e.jsxs("div",{className:"w-full h-full flex",children:[e.jsx("div",{className:"fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6]",children:e.jsx(ne,{})}),e.jsxs("div",{className:"ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]",children:[e.jsx(oe,{}),e.jsx(ge,{})]})]});export{Ke as default};
