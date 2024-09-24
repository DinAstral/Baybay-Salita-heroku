import React from "react";
import ContentHeader from "../../Components/ContentDasboard/ContentHeader";
import Sidebar from "../../Components/TeacherDashboardComponent/Sidebar";
import BodyViewAssessment from "../../Components/TeacherDashboardComponent/BodyViewAssessment";
import BodyViewPerformnace from "../../Components/TeacherDashboardComponent/BodyViewPerformnace";

const ViewStudentPerformance = () => {
  return (
    <div className="w-full h-full flex">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-[15%] h-full bg-[#F5EBD6]">
        <Sidebar />
      </div>

      {/* Main Dashboard Content */}
      <div className="ml-[15%] w-[85%] h-full min-h-[100vh] bg-[#F2EDE3] p-[2rem] flex flex-col gap-[1.5rem]">
        <ContentHeader />
        <BodyViewPerformnace />
      </div>
    </div>
  );
};

export default ViewStudentPerformance;