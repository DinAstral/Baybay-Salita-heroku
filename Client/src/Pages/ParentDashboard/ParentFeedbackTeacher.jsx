import ParentSidebar from "../../Components/ParentDashboardComponent/ParentSidebar";
import BodyFeedbackParentTeacher from "../../Components/ParentDashboardComponent/BodyFeedbackParentTeacher";

const ParentFeedbackTeacher = () => {
  return (
    <div className="dashboard">
      <ParentSidebar />
      <div className="dashboard-content">
        <BodyFeedbackParentTeacher />
      </div>
    </div>
  );
};

export default ParentFeedbackTeacher;
