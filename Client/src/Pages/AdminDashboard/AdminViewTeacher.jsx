import React from 'react'
import AdminSidebar from '../../Components/AdminDashboardComponent/AdminSidebar'
import BodyAdminViewTeacher from '../../Components/AdminDashboardComponent/BodyAdminViewTeacher'


const AdminViewTeacher = () => {
  return (
    <div className='dashboard'>
      <AdminSidebar />
      <div className="dashboard-content">
        <BodyAdminViewTeacher />
      </div>
    </div>
  )
}

export default AdminViewTeacher