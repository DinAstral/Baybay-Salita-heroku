import React from 'react'
import ParentSidebar from '../../Components/ParentDashboardComponent/ParentSidebar'
import BodyInformationKid from '../../Components/ParentDashboardComponent/BodyInformationKid'


const InformationKid = () => {
  return (
    <div className='dashboard'>
      <ParentSidebar />
      <div className="dashboard-content">
        <BodyInformationKid />
      </div>
    </div>
  )
}

export default InformationKid
