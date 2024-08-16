import React from 'react'
import AdminSidebar from '../../Components/AdminDashboardComponent/AdminSidebar'
import BodyAdminEditStudent from '../../Components/AdminDashboardComponent/BodyAdminEditStudent'


const AdminEditStudent = () => {
  return (
    <div className='dashboard'>
      <AdminSidebar />
      <div className="dashboard-content">
        <BodyAdminEditStudent />
      </div>
    </div>
  )
}

export default AdminEditStudent