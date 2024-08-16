import React from 'react'
import AdminSidebar from '../../Components/AdminDashboardComponent/AdminSidebar'
import BodyAdminEditUser from '../../Components/AdminDashboardComponent/BodyAdminEditUser'


const AdminEditUser = () => {
  return (
    <div className='dashboard'>
      <AdminSidebar />
      <div className="dashboard-content">
        <BodyAdminEditUser />
      </div>
    </div>
  )
}

export default AdminEditUser