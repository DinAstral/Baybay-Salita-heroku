import{r as x,j as e,a as j,_ as b}from"./index-CTjF65Bf.js";import{P as a}from"./index-BEPVNJaY.js";import{m as i,a as c,b as n,c as d,d as m}from"./chunk-P2T5LMDM-DNx7nAwe.js";import{b as t}from"./chunk-DBLREEYE-BCf7xM7G.js";const y=({show:r,onHide:s})=>{const l=()=>{s(),window.location.reload()};return e.jsx(i,{isOpen:r,onClose:s,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(c,{children:[e.jsx(n,{children:"Delete Student Performance Successfully"}),e.jsx(d,{children:e.jsx("p",{children:"You have deleted the performance for the student successfully."})}),e.jsx(m,{children:e.jsx(t,{color:"primary",onClick:l,children:"Close"})})]})})},D=({show:r,onHide:s,performance:l,refreshActivities:u})=>{const[f,o]=x.useState(!1),h=async()=>{try{await j.delete(`/api/deletePerformance/${l._id}`),o(!0),u()}catch(p){console.error("Error deleting performance:",p),b.error("Failed to delete performance. Please try again later.")}};return e.jsxs(e.Fragment,{children:[e.jsx(i,{isOpen:r,onClose:s,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(c,{children:[e.jsx(n,{className:"flex flex-col",children:"Delete The Student Performance"}),e.jsx(d,{children:e.jsx("p",{children:"Do you want to delete the current performance?"})}),e.jsxs(m,{children:[e.jsx(t,{color:"danger",variant:"light",onClick:s,children:"Close"}),e.jsx(t,{color:"primary",onClick:h,children:"Delete"})]})]})}),e.jsx(y,{show:f,onHide:()=>{o(!1),s()}})]})};D.propTypes={show:a.bool.isRequired,onHide:a.func.isRequired,performance:a.object};export{D};