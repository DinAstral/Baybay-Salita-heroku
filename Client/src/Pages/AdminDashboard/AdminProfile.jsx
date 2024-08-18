import React from "react";
import AdminSidebar from "../../Components/AdminDashboardComponent/AdminSidebar";
import BodyAdminProfile from "../../Components/AdminDashboardComponent/BodyAdminProfile";

const AdminProfile = () => {
  return (
    <div className="dashboard">
      <AdminSidebar />
      <div className="dashboard-content">
        <BodyAdminProfile />
      </div>
    </div>
  );
};

export default AdminProfile;
