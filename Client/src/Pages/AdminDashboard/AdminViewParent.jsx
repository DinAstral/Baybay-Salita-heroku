import React from 'react'
import AdminSidebar from '../../Components/AdminDashboardComponent/AdminSidebar'
import BodyAdminViewParent from '../../Components/AdminDashboardComponent/BodyAdminViewParent'


const AdminViewParent = () => {
  return (
    <div className='dashboard'>
      <AdminSidebar />
      <div className="dashboard-content">
        <BodyAdminViewParent />
      </div>
    </div>
  )
}

export default AdminViewParent
