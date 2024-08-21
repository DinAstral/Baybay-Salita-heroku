import React from 'react'
import Sidebar from '../../Components/TeacherDashboardComponent/Sidebar'
import BodyViewScore from '../../Components/TeacherDashboardComponent/BodyViewScore'

const ViewScore = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className="dashboard-content">
        <BodyViewScore />
      </div>
    </div>
  )
}

export default ViewScore