import React from 'react'
import Sidebar from '../../Components/TeacherDashboardComponent/Sidebar'
import BodyTeacherProfileBasic from '../../Components/TeacherDashboardComponent/BodyTeacherProfileBasic'

const TeacherProfile = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className="dashboard-content">
        <BodyTeacherProfileBasic />
      </div>
    </div>
  )
}

export default TeacherProfile
