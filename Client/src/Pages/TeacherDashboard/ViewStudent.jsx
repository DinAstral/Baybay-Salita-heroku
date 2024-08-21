import React from 'react'
import Sidebar from '../../Components/TeacherDashboardComponent/Sidebar'
import BodyAdminViewStudent from '../../Components/AdminDashboardComponent/BodyAdminViewStudent'

const ViewStudent = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className="dashboard-content">
        <BodyAdminViewStudent />
      </div>
    </div>
  )
}

export default ViewStudent