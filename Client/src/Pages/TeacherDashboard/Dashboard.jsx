import React from 'react'
import Sidebar from '../../Components/TeacherDashboardComponent/Sidebar'
import BodyAnalyticsTeacher from '../../Components/TeacherDashboardComponent/BodyAnalyticsTeacher'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className="dashboard-content">
        <BodyAnalyticsTeacher />
      </div>
    </div>
  )
}

export default Dashboard
