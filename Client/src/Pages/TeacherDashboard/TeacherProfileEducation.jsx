import React from 'react'
import Sidebar from '../../Components/TeacherDashboardComponent/Sidebar'
import BodyTeacherProfileEducation from '../../Components/TeacherDashboardComponent/BodyTeacherProfileEducation'

const TeacherProfileEducation = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className="dashboard-content">
        <BodyTeacherProfileEducation />
      </div>
    </div>
  )
}

export default TeacherProfileEducation
