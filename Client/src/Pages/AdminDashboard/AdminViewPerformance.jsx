import React from "react";
import AdminSidebar from "../../Components/AdminDashboardComponent/AdminSidebar";
import BodyAdminPerformance from "../../Components/AdminDashboardComponent/BodyAdminPerformance";

const AdminViewPerformance = () => {
  return (
    <div className="dashboard">
      <AdminSidebar />
      <div className="dashboard-content">
        <BodyAdminPerformance />
      </div>
    </div>
  );
};

export default AdminViewPerformance;
