import React from 'react'
import Sidebar from '../../Components/TeacherDashboardComponent/Sidebar'
import BodyUpdateTeacherProfile from '../../Components/TeacherDashboardComponent/BodyUpdateTeacherProfile'


const UpdateProfileTeacher = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className="dashboard-content">
        <BodyUpdateTeacherProfile />
      </div>
    </div>
  )
}

export default UpdateProfileTeacher
