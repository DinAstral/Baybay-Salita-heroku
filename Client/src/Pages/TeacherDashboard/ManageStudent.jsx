import React from 'react'
import Sidebar from '../../Components/TeacherDashboardComponent/Sidebar'
import BodyManageStudent from '../../Components/TeacherDashboardComponent/BodyManageStudent'

const ManageStudent = () => {

  return (
    <div className='dashboard'>
      <Sidebar />
      <div className="dashboard-content">
        <BodyManageStudent />
      </div>
    </div>
  )
}

export default ManageStudent
