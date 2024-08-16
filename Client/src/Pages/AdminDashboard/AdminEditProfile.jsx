import React from 'react'
import AdminSidebar from '../../Components/AdminDashboardComponent/AdminSidebar'
import BodyAdminEditAdmin from '../../Components/AdminDashboardComponent/BodyAdminEditAdmin'



const AdminEditProfile = () => {
  return (
    <div className='dashboard'>
      <AdminSidebar />
      <div className="dashboard-content">
        <BodyAdminEditAdmin />
      </div>
    </div>
  )
}

export default AdminEditProfile