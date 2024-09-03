import React from "react";
import AdminSidebar from "../../Components/AdminDashboardComponent/AdminSidebar";
import BodyAdminDashboard from "../../Components/AdminDashboardComponent/BodyAdminDashboard";

const AdminDashboard = () => {
  return (
    <div className="w-full h-screen flex">
      <div className="flex w-[15%] h-full gap-10 bg-[#F5EBD6]">
        <AdminSidebar />
      </div>
      <div className="flex flex-[1] w-full h-full bg-[#F2EDE3] p-[2rem] gap-[1.5rem] justify-between">
        <BodyAdminDashboard />
      </div>
    </div>
  );
};

export default AdminDashboard;
