import React from 'react'
import Sidebar from '../../Components/TeacherDashboardComponent/Sidebar'
import BodyStudentEdit from '../../Components/TeacherDashboardComponent/BodyStudentEdit'

const EditStudent = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className="dashboard-content">
        <BodyStudentEdit />
      </div>
    </div>
  )
}

export default EditStudent
