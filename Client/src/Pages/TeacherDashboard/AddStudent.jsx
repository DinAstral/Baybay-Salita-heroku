import React from 'react'
import Sidebar from '../../Components/TeacherDashboardComponent/Sidebar'
import BodyAddStudent from '../../Components/TeacherDashboardComponent/BodyAddStudent'

const AddStudent = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className="dashboard-content">
        <BodyAddStudent />
      </div>
    </div>
  )
}

export default AddStudent