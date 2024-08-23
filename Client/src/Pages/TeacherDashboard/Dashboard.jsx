import React from "react";
import BodyAnalyticsTeacher from "../../Components/TeacherDashboardComponent/BodyAnalyticsTeacher";
import Sidebar from "../../Components/TeacherDashboardComponent/Sidebar";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <BodyAnalyticsTeacher />
      </div>
    </div>
  );
};

export default Dashboard;
