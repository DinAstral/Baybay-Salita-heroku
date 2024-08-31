import React from "react";
import AdminSidebar from "../../Components/AdminDashboardComponent/AdminSidebar";
import BodyAdminDashboard from "../../Components/AdminDashboardComponent/BodyAdminDashboard";

const AdminDashboard = () => {
  return (
    <div className="w-full h-screen flex">
      <div className="flex w-full h-full gap-10 bg-[#F5EBD6]">
        <AdminSidebar />
        <div className="flex flex-[1] bg-[#F2EDE3] p-[2rem] gap-[1.5rem] justify-between">
          <BodyAdminDashboard />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
