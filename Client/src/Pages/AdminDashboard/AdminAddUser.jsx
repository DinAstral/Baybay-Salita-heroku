import React from 'react'
import AdminSidebar from '../../Components/AdminDashboardComponent/AdminSidebar'
import BodyAdminAddUser from '../../Components/AdminDashboardComponent/BodyAdminAddUser'

const AdminAddUser = () => {
  return (
    <div className='dashboard'>
      <AdminSidebar />
      <div className="dashboard-content">
        <BodyAdminAddUser />
      </div>
    </div>
  )
}

export default AdminAddUser