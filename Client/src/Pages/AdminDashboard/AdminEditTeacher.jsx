import React from 'react'
import AdminSidebar from '../../Components/AdminDashboardComponent/AdminSidebar'
import BodyAdminEditTeacher from '../../Components/AdminDashboardComponent/BodyAdminEditTeacher'


const AdminEditTeacher = () => {
  return (
    <div className='dashboard'>
      <AdminSidebar />
      <div className="dashboard-content">
        <BodyAdminEditTeacher />
      </div>
    </div>
  )
}

export default AdminEditTeacher