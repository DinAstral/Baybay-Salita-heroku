import React from 'react'
import Sidebar from '../../Components/TeacherDashboardComponent/Sidebar'
import BodyAssessment from '../../Components/TeacherDashboardComponent/BodyAssessment'


const ViewAssessment = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className="dashboard-content">
        <BodyAssessment />
      </div>
    </div>
  )
}

export default ViewAssessment
