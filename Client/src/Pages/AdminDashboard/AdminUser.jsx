import React from 'react'
import AdminSidebar from '../../Components/AdminDashboardComponent/AdminSidebar'
import BodyAdminUsers from '../../Components/AdminDashboardComponent/BodyAdminUsers'

const AdminUser = () => {
  return (
    <div className='dashboard'>
      <AdminSidebar />
      <div className="dashboard-content">
        <BodyAdminUsers />
      </div>
    </div>
  )
}

export default AdminUser
