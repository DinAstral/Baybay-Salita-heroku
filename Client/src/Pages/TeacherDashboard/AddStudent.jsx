import React from "react";
import Sidebar from "../../Components/TeacherDashboardComponent/Sidebar";
import BodyTeacherAddStudent from "../../Components/TeacherDashboardComponent/BodyAddStudent";

const AddStudent = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <BodyTeacherAddStudent />
      </div>
    </div>
  );
};

export default AddStudent;
