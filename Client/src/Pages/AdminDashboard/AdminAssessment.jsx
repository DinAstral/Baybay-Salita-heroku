import React from 'react'
import AdminSidebar from '../../Components/AdminDashboardComponent/AdminSidebar'
import BodyAdminStudentAssessment from '../../Components/AdminDashboardComponent/BodyAdminStudentAssessment'

const AdminAssessment = () => {
  return (
    <div className='dashboard'>
      <AdminSidebar />
      <div className="dashboard-content">
        <BodyAdminStudentAssessment />
      </div>
    </div>
  )
}

export default AdminAssessment