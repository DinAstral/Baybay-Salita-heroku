import{r as n,U as w,u as y,R as N,j as e,L as v,a as S,n as t}from"./index-B79Lp1Sb.js";import{F as c,f as C,a as L,b as E}from"./index-D4iS7rHE.js";import{i as d}from"./chunk-GQQM5TNQ-tY51uwqH.js";import{c as A}from"./chunk-KBN3H6OQ-DIhqdszT.js";import{b as u}from"./chunk-DBLREEYE-C-H-JCr7.js";import"./useField-CgV5KgWF.js";import"./useLabels-CHoZES-g.js";import"./useFormReset-MCMICyhn.js";import"./chunk-CIZQCQPA-D7mxbdH2.js";import"./VisuallyHidden-DEDZOC4H.js";const F="/assets/Login_baybay-C01TVwar.png",I="/assets/login_blue-Dt1pCWI8.png",W=()=>{const{setUser:x}=n.useContext(w),[o,f]=n.useState(!1),r=y(),[a,i]=n.useState({email:"",password:""}),g=()=>f(!o),[p,b]=N.useState(!1),h=()=>{r("/register")},j=async l=>{l.preventDefault();try{const s=(await S.post("/api/login",{email:a.email,password:a.password})).data;s.error?t.error(s.error):(localStorage.setItem("token",s.token),localStorage.setItem("user",JSON.stringify(s.user)),x(s.user),i({email:"",password:""}),s.role==="Parent"?(t.success("Login Successful."),r("/parentDashboard")):s.role==="Teacher"?(t.success("Login Successful."),r("/teacherDashboard")):s.role==="Admin"?(t.success("Login Successful."),r("/AdminDashboard")):t.error(s.error||"Login failed."))}catch(m){console.log(m),t.error("Error occurred while logging in.")}};return e.jsxs("div",{className:"flex flex-col md:flex-row w-full h-screen",children:[e.jsx("div",{className:"w-full md:w-[65%] h-full flex items-center justify-center bg-[#FAFAFA]",children:e.jsx("img",{src:F,className:"w-full h-full object-fill",alt:"Learning Platform"})}),e.jsxs("div",{className:"relative w-full md:w-[35%] h-full flex items-center justify-center bg-[#FAFAFA]",children:[e.jsx("img",{src:I,className:"absolute inset-0 w-full h-full object-fill opacity-50",alt:"Background Image"}),e.jsx("div",{className:"relative z-10 w-full max-w-md bg-white shadow-lg rounded-lg p-8 opacity-90",children:e.jsxs("div",{className:"mb-6",children:[e.jsx("h1",{className:"text-lg font-semibold text-center text-[#060606] mb-4",children:"Taytay Elementary School Baybay Salita"}),e.jsxs("div",{className:"text-center mb-6",children:[e.jsx("h3",{className:"text-2xl font-semibold mb-2",children:"Login"}),e.jsx("p",{className:"text-sm mb-2",children:"Welcome Back! Please enter your details."})]}),e.jsxs("form",{onSubmit:j,className:"flex flex-col",children:[e.jsx(d,{type:"text",label:"Email",variant:"bordered",placeholder:"Enter your email",className:"mb-4",errorMessage:"Please enter a valid email.",value:a.email,onChange:l=>i({...a,email:l.target.value}),endContent:e.jsx(c,{icon:C,className:"text-2xl text-default-400"})}),e.jsx(d,{label:"Password",placeholder:"Enter your password",variant:"bordered",className:"mb-4",value:a.password,onChange:l=>i({...a,password:l.target.value}),endContent:e.jsx("button",{className:"focus:outline-none",type:"button",onClick:g,"aria-label":"toggle password visibility",children:o?e.jsx(c,{icon:L,className:"text-2xl text-default-400"}):e.jsx(c,{icon:E,className:"text-2xl text-default-400"})}),type:o?"text":"password"}),e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx(A,{className:"mr-2",isSelected:p,onValueChange:b,children:e.jsx("p",{className:"text-sm",children:"Remember me"})}),e.jsx(v,{to:"/forgotPassword",className:"text-sm font-medium cursor-pointer underline underline-offset-2",children:"Forgot Password?"})]}),e.jsx(u,{className:"my-2",size:"lg",radius:"md",color:"primary",type:"submit",children:"Login"}),e.jsx(u,{className:"my-2",size:"lg",radius:"md",onClick:h,children:"Register"})]})]})})]})]})};export{W as default};