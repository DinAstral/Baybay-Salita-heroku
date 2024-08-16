import React from 'react'
import AdminSidebar from '../../Components/AdminDashboardComponent/AdminSidebar'
import BodyAdminViewStudent from '../../Components/AdminDashboardComponent/BodyAdminViewStudent'


const AdminViewStudent = () => {
  return (
    <div className='dashboard'>
      <AdminSidebar />
      <div className="dashboard-content">
        <BodyAdminViewStudent />
      </div>
    </div>
  )
}

export default AdminViewStudent
