import React from 'react'
import AdminSidebar from '../../Components/AdminDashboardComponent/AdminSidebar'
import BodyAdminAddStudent from '../../Components/AdminDashboardComponent/BodyAdminAddStudent'


const AdminAddStudent = () => {
  return (
    <div className='dashboard'>
      <AdminSidebar />
      <div className="dashboard-content">
        <BodyAdminAddStudent />
      </div>
    </div>
  )
}

export default AdminAddStudent