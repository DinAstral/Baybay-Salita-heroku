import{j as e}from"./react-BCcS7c0c.js";import{P as s}from"./prop-types-LuavYUF2.js";import{L as r}from"./react-router-dom-Dk6_dLEo.js";import{m as t,f as d,g as n,h as c,j as m,b as l}from"./@nextui-org-CLkIIHEi.js";const h=({show:a,onHide:o,student:i})=>e.jsx(t,{isOpen:a,onClose:o,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(d,{children:[e.jsx(n,{className:"flex flex-col",id:"edit-user-modal-title",children:"View Student Information"}),e.jsx(c,{children:e.jsx("p",{children:"Do you want to view the profile of student selected?"})}),e.jsxs(m,{children:[e.jsx(l,{color:"danger",variant:"light",onClick:o,children:"Cancel"}),e.jsx(r,{to:`/adminViewStudent/${i==null?void 0:i._id}`,children:e.jsx(l,{color:"primary",children:"View"})})]})]})});h.propTypes={show:s.bool.isRequired,onHide:s.func.isRequired,student:s.object};const u=({show:a,onHide:o,student:i})=>e.jsx(t,{isOpen:a,onClose:o,"aria-labelledby":"contained-modal-title-vcenter",isDismissable:!1,isKeyboardDismissDisabled:!0,children:e.jsxs(d,{children:[e.jsx(n,{className:"flex flex-col",id:"contained-modal-title-vcenter",children:"Update Student Information"}),e.jsx(c,{children:e.jsx("p",{children:"Are you sure you want to update this student's information?"})}),e.jsxs(m,{children:[e.jsx(l,{color:"danger",variant:"light",onClick:o,children:"Cancel"}),e.jsx(r,{to:`/adminEditStudent/${i==null?void 0:i._id}`,children:e.jsx(l,{color:"primary",children:"Update"})})]})]})});u.propTypes={show:s.bool.isRequired,onHide:s.func.isRequired,student:s.object};export{u as U,h as V};
