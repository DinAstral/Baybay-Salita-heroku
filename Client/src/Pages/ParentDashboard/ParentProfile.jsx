import React from 'react'
import ParentSidebar from '../../Components/ParentDashboardComponent/ParentSidebar'
import BodyParentProfile from '../../Components/ParentDashboardComponent/BodyParentProfile'

const ParentProfile = () => {
    return (
      <div className='dashboard'>
        <ParentSidebar/>
        <div className="dashboard-content">
          <BodyParentProfile />
        </div>
      </div>
    )
  }

export default ParentProfile
