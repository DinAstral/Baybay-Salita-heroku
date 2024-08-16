import React from 'react'
import AdminSidebar from '../../Components/AdminDashboardComponent/AdminSidebar'
import BodyAdminEditParent from '../../Components/AdminDashboardComponent/BodyAdminEditParent'


const AdminEditParent = () => {
  return (
    <div className='dashboard'>
      <AdminSidebar />
      <div className="dashboard-content">
        <BodyAdminEditParent />
      </div>
    </div>
  )
}

export default AdminEditParent