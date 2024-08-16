import React from 'react'
import AdminSidebar from '../../Components/AdminDashboardComponent/AdminSidebar'
import BodyAdminStudent from '../../Components/AdminDashboardComponent/BodyAdminStudent'

const AdminStudent = () => {
  return (
    <div className='dashboard'>
      <AdminSidebar />
      <div className="dashboard-content">
        <BodyAdminStudent />
      </div>
    </div>
  )
}

export default AdminStudent
