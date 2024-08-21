import React from 'react'
import ParentSidebar from '../../Components/ParentDashboardComponent/ParentSidebar'
import BodyStudentProgress from '../../Components/ParentDashboardComponent/BodyStudentProgress'


const ParentViewStudentProgress = () => {
  return (
    <div className='dashboard'>
      <ParentSidebar/>
      <div className="dashboard-content">
        <BodyStudentProgress />
      </div>
    </div>
  )
}

export default ParentViewStudentProgress
