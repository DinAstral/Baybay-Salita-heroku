import React from "react";
import AdminSidebar from "../../Components/AdminDashboardComponent/AdminSidebar";
import BodyAdminDashboard from "../../Components/AdminDashboardComponent/BodyAdminDashboard";

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <AdminSidebar />
      <div className="dashboard-content">
        <BodyAdminDashboard />
      </div>
    </div>
  );
};

export default AdminDashboard;
