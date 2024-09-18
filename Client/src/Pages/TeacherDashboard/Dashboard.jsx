import React from "react";
import ContentHeader from "../../Components/ContentDasboard/ContentHeader";
import Sidebar from "../../Components/TeacherDashboardComponent/Sidebar";
import BodyTeacherDashboard from "../../Components/TeacherDashboardComponent/BodyTeacherDashboard";

const AdminDashboard = () => {
  return (
    <div className="w-full h-full flex">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6]">
        <Sidebar />
      </div>

      {/* Main Dashboard Content */}
      <div className="ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]">
        <ContentHeader />
        <BodyTeacherDashboard />
      </div>
    </div>
  );
};

export default AdminDashboard;
