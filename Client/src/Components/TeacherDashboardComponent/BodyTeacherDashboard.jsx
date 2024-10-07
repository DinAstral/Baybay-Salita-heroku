import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faChildReaching,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@nextui-org/react";
import { BarChart, LineChart } from "@mui/x-charts";
import axios from "axios";
import { UserContext } from "../../../context/userContext";

const BodyTeacherDashboard = () => {
  const [teacher, setTeacher] = useState({});
  const [students, setStudents] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const { user } = useContext(UserContext);

  const [sectionCounts, setSectionCounts] = useState({});
  const [activityCounts, setActivityCounts] = useState({});
  const [performanceCounts, setPerformanceCounts] = useState([]);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(`/api/getTeacher/${user.UserID}`);
        setTeacher(response.data);
      } catch (err) {
        console.error("Error fetching teacher:", err);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await axios.get("/api/getStudents");
        const data = response.data;

        const filteredStudents = data.filter(
          (student) => student.Section === teacher.Section
        );
        setStudents(filteredStudents);

        const sectionCount = filteredStudents.length;
        setSectionCounts({ [teacher.Section]: sectionCount });
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    const fetchPerformance = async () => {
      try {
        const response = await axios.get("/api/getPerformance");
        const data = response.data;

        const filteredPerformance = data.filter(
          (performance) => performance.Section === teacher.Section
        );
        setPerformanceCounts(filteredPerformance);
      } catch (err) {
        console.error("Error fetching performance:", err);
      }
    };

    const fetchAssessments = async () => {
      try {
        const response = await axios.get("/api/getAssessments");
        const data = response.data;

        const filteredAssessments = data.filter(
          (assessment) => assessment.Section === teacher.Section
        );

        const activities = ["Pagbabaybay", "Pantig", "Salita", "Pagbabasa"];
        const counts = activities.reduce((acc, activity) => {
          acc[activity] = filteredAssessments.filter(
            (type) => type.Type === activity
          ).length;
          return acc;
        }, {});

        setAssessments(filteredAssessments);
        setActivityCounts(counts);
      } catch (err) {
        console.error("Error fetching assessments:", err);
      }
    };

    fetchTeacher();
    fetchStudents();
    fetchPerformance();
    fetchAssessments();
  }, [user.UserID, teacher.Section]);

  useEffect(() => {
    console.log("Performance Data: ", performanceCounts); // Debugging: Check performanceCounts
  }, [performanceCounts]);

  // Prepare data for the performance line chart
  const assessmentLabels = performanceCounts.map((item) => item.Type); // Assessment types

  // Convert score to integer and ensure it's a valid number
  const scoreData = performanceCounts.map((item) => {
    const score = parseInt(item.Score, 10); // Convert to integer
    return isNaN(score) ? 0 : score; // If score is NaN, default to 0
  });

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-semibold">Teacher Dashboard</h1>
        <Tooltip
          showArrow={true}
          content={
            <div className="p-2 text-sm">
              <div className="font-bold">Dashboard Info</div>
              <p>View system data for the assigned section.</p>
            </div>
          }
        >
          <FontAwesomeIcon icon={faCircleInfo} className="ml-2 text-black" />
        </Tooltip>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#fb6ea4] rounded-lg shadow-2xl p-4 flex flex-row justify-between">
          <div className="text-white">
            <h2 className="text-xl font-semibold">Students</h2>
            <p className="text-5xl mt-2">{students.length}</p>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faChildReaching}
              size="2xl"
              className="text-md"
              inverse
            />
          </div>
        </div>
        <div className="bg-[#7668d2] rounded-lg shadow-2xl p-4 flex flex-row justify-between">
          <div className="text-white">
            <h2 className="text-xl font-semibold">Assessment</h2>
            <p className="text-5xl mt-2">{assessments.length}</p>{" "}
            {/* Corrected */}
          </div>
          <div>
            <FontAwesomeIcon
              icon={faChalkboardTeacher}
              size="2xl"
              className="text-md"
              inverse
            />
          </div>
        </div>
        <div className="bg-[#91c123] rounded-lg shadow-2xl p-4 flex flex-row justify-between">
          <div className="text-white">
            <h2 className="text-xl font-semibold">Performance</h2>
            <p className="text-5xl mt-2">{performanceCounts.length}</p>{" "}
            {/* Corrected */}
          </div>
          <div>
            <FontAwesomeIcon
              icon={faChildReaching}
              size="2xl"
              className="text-md"
              inverse
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Assessment Created</h2>
        <div className="bg-white rounded-lg shadow-2xl p-4">
          <BarChart
            xAxis={[
              {
                label: "Activities",
                scaleType: "band",
                data: Object.keys(activityCounts),
                tickSize: 10, // Larger tick size for better readability
              },
            ]}
            yAxis={[
              {
                label: "Number of Assessments",
                max: 10,
                min: 0,
                tickCount: 6, // Set tick count to control number of ticks on the Y-axis
                tickFormat: (value) => Math.floor(value), // Ensure the ticks are integers
                grid: true, // Add gridlines for better readability
              },
            ]}
            series={[
              {
                data: Object.values(activityCounts),
                color: "#ffce1f", // Primary color for bars
                label: "Assessments", // Label for better clarity
              },
            ]}
            barsize={40} // Increase bar size for better visuals
            gap={30} // Increase gap between bars for a cleaner look
            width={1500}
            height={400}
          />
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Performance</h2>
        <div className="bg-white rounded-lg shadow-2xl p-4">
          {performanceCounts.length > 0 ? (
            <LineChart
              xAxis={[
                {
                  label: "Assessment Type",
                  data: assessmentLabels,
                },
              ]}
              yAxis={[
                {
                  label: "Score",
                  min: 0,
                  max: 10, // Assuming the max score is 100
                },
              ]}
              series={[
                {
                  data: scoreData, // Array of student scores
                  label: "Scores", // A label for better understanding
                  color: "#ff5733", // Line color
                },
              ]}
              width={1500}
              height={400}
            />
          ) : (
            <p>No performance data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BodyTeacherDashboard;
