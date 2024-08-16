import React from 'react'
import AdminSidebar from '../../Components/AdminDashboardComponent/AdminSidebar'
import BodyAdminStudentProgress from '../../Components/AdminDashboardComponent/BodyAdminStudentProgress'

const AdminStudentProgress = () => {
  return (
    <div className='dashboard'>
      <AdminSidebar />
      <div className="dashboard-content">
        <BodyAdminStudentProgress />
      </div>
    </div>
  )
}

export default AdminStudentProgress
