import{r as j,j as e,a as p,_ as b}from"./index-CXtfmwZQ.js";import{P as s}from"./index-CM3tdvt6.js";import{m as r,a as d,b as i,c as n,d as c}from"./chunk-P2T5LMDM-vGbn1626.js";import{b as a}from"./chunk-DBLREEYE-FY3488ZC.js";const D=({show:l,onHide:t})=>e.jsx(r,{isOpen:l,onClose:t,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(d,{children:[e.jsx(i,{id:"contained-modal-title-vcenter",children:"Delete Student Successful"}),e.jsx(n,{children:e.jsx("p",{children:"You have deleted the student information."})}),e.jsx(c,{children:e.jsx(a,{color:"danger",onClick:t,children:"Close"})})]})}),_=({show:l,onHide:t,student:u,onDeleteSuccess:m})=>{const[h,o]=j.useState(!1),f=async()=>{try{await p.delete(`/api/deleteStudent/${u._id}`),o(!0),m()}catch(x){console.error("Error deleting student:",x),b.error("Failed to delete student. Please try again later.")}};return e.jsxs(e.Fragment,{children:[e.jsx(r,{isOpen:l,onClose:t,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(d,{children:[e.jsx(i,{id:"contained-modal-title-vcenter",children:"Delete Student Information"}),e.jsx(n,{children:e.jsx("p",{children:"Are you sure you want to delete this student's information?"})}),e.jsxs(c,{children:[e.jsx(a,{color:"default",variant:"light",onClick:t,children:"Cancel"}),e.jsx(a,{color:"danger",onClick:f,children:"Delete"})]})]})}),e.jsx(D,{show:h,onHide:()=>{o(!1),t()}})]})};_.propTypes={show:s.bool.isRequired,onHide:s.func.isRequired,onDeleteSuccess:s.func.isRequired,student:s.object};export{_ as D};
