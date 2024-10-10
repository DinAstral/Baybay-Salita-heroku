import { useState, useEffect, useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faChildReaching,
  faCircleInfo,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { Table, Button, Tooltip } from "@nextui-org/react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import axios from "axios";

const BodyAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [assessments, setAssessment] = useState([]);
  const [teachersCount, setTeachersCount] = useState(0);
  const [parentsCount, setParentsCount] = useState(0);
  const [performanceData, setPerformanceData] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState("Assessment 1");
  const [performanceCounts, setPerformanceCounts] = useState([]);

  const [sectionStatusCounts, setSectionStatusCounts] = useState({});

  const [sectionCounts, setSectionCounts] = useState({
    Aster: 0,
    Camia: 0,
    Dahlia: 0,
    Iris: 0,
    Jasmin: 0,
    Orchid: 0,
    Rose: 0,
    Tulip: 0,
    SSC: 0,
  });

  const [activityCounts, setActivityCounts] = useState({
    Aster: 0,
    Camia: 0,
    Dahlia: 0,
    Iris: 0,
  });

  const [scoreDistribution, setScoreDistribution] = useState({
    scores: [],
    counts: [],
  });

  const [statusCounts, setStatusCounts] = useState({
    Incomplete: 0,
    LowEmergingReader: 0,
    HighEmergingReader: 0,
    DevelopingReader: 0,
    TransitioningReader: 0,
    GradeLevelReader: 0,
  });

  // Fetch data when the component loads or when the selectedAssessment changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchUsers(), fetchStudents(), fetchAssessment()]);
        await fetchPerformance(); // Fetch performance data separately
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [selectedAssessment]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      const data = response.data;
      setUsers(data);
      setTeachersCount(countByRole(data, "Teacher"));
      setParentsCount(countByRole(data, "Parent"));
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api/getStudents");
      const data = response.data;

      setStudents(data);

      // Group students by their status and update the state
      const statusGroups = {
        Incomplete: 0,
        LowEmergingReader: 0,
        HighEmergingReader: 0,
        DevelopingReader: 0,
        TransitioningReader: 0,
        GradeLevelReader: 0,
      };

      data.forEach((student) => {
        switch (student.status) {
          case "Incomplete":
            statusGroups.Incomplete += 1;
            break;
          case "Low Emerging Reader":
            statusGroups.LowEmergingReader += 1;
            break;
          case "High Emerging Reader":
            statusGroups.HighEmergingReader += 1;
            break;
          case "Developing Reader":
            statusGroups.DevelopingReader += 1;
            break;
          case "Transitioning Reader":
            statusGroups.TransitioningReader += 1;
            break;
          case "Grade Level Reader":
            statusGroups.GradeLevelReader += 1;
            break;
          default:
            break;
        }
      });

      setStatusCounts(statusGroups);

      const sectionCounts = countStudentsBySection(data);
      setSectionCounts(sectionCounts.totalCounts); // Set total counts
      setSectionStatusCounts(sectionCounts.statusCounts); // Set status counts
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const fetchAssessment = async () => {
    try {
      const response = await axios.get("/api/getAssessments");
      const data = response.data;

      const activities = ["Pagbabaybay", "Pantig", "Salita", "Pagbabasa"];
      const counts = activities.reduce((acc, activity) => {
        acc[activity] = data.filter((type) => type.Type === activity).length;
        return acc;
      }, {});

      setAssessment(data);
      setActivityCounts(counts);
    } catch (err) {
      console.error("Error fetching assessments:", err);
    }
  };

  const fetchPerformance = async () => {
    try {
      const response = await axios.get("/api/getPerformance");
      const data = response.data;

      setPerformanceCounts(data);
    } catch (err) {
      console.error("Error fetching performance:", err);
    }
  };

  // Count the number of users by role (e.g., Teacher, Parent)
  const countByRole = (data, role) =>
    data.filter((user) => user.role === role).length;

  // Function to count students by section and status
  const countStudentsBySection = (students) => {
    const sections = [
      "Aster",
      "Camia",
      "Dahlia",
      "Iris",
      "Jasmin",
      "Orchid",
      "Rose",
      "Tulip",
      "SSC",
    ];

    const statusTypes = [
      "Incomplete",
      "Low Emerging Reader",
      "High Emerging Reader",
      "Developing Reader",
      "Transitioning Reader",
      "Grade Level Reader",
    ];

    const totalCounts = {};
    const statusCounts = {};

    sections.forEach((section) => {
      totalCounts[section] = 0;
      statusCounts[section] = {};

      statusTypes.forEach((status) => {
        const count = students.filter(
          (student) => student.Section === section && student.status === status
        ).length;

        statusCounts[section][status] = count;
        totalCounts[section] += count;
      });
    });

    return { totalCounts, statusCounts };
  };

  // Assign colors to statuses
  const getColorForStatus = (status) => {
    switch (status) {
      case "Incomplete":
        return "#f63845";
      case "Low Emerging Reader":
        return "#ff7828";
      case "High Emerging Reader":
        return "#DC84F3";
      case "Developing Reader":
        return "#4b99f5";
      case "Transitioning Reader":
        return "#ffce1f";
      case "Grade Level Reader":
        return "#FF8080";
      default:
        return "#ccc"; // Default color for unknown status
    }
  };

  // Data preparation for the bar charts
  const sectionLabels = Object.keys(sectionCounts);
  const statusTypes = [
    "Incomplete",
    "Low Emerging Reader",
    "High Emerging Reader",
    "Developing Reader",
    "Transitioning Reader",
    "Grade Level Reader",
  ];

  // Create data series for the BarChart
  const statusSeries = statusTypes.map((status) => ({
    data: sectionLabels.map(
      (section) =>
        (sectionStatusCounts[section] &&
          sectionStatusCounts[section][status]) ||
        0
    ),
    label: status,
    color: getColorForStatus(status),
  }));

  /// Prepare data for the dynamic student performance chart based on LRN
  const studentsPerformanceData = students.map((student) => {
    const studentPerformances = performanceCounts.filter(
      (performance) => performance.LRN === student.LRN // Use LRN to filter performance
    );

    // Ensure that we get a score for every assessment type, even if it's not present (default to 0)
    const scoresByAssessment = assessments.map((assessment) => {
      const studentAssessment = studentPerformances.find(
        (perf) => perf.Type === assessment.Type
      );
      return studentAssessment ? parseInt(studentAssessment.Score, 10) : 0; // Default score 0 if no data
    });

    return {
      studentName: student.Name,
      scores: scoresByAssessment,
    };
  });

  const assessmentLabels = assessments.map((assessment) => assessment.Type); // Dynamic assessment labels

  return (
    <div className="px-9">
      <div className="flex items-center mb-4">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <Tooltip
          showArrow={true}
          content={
            <div className="p-2 text-sm">
              <div className="font-bold">Dashboard Info</div>
              <p>View system data for each section.</p>
            </div>
          }
        >
          <FontAwesomeIcon icon={faCircleInfo} className="ml-2 text-black" />
        </Tooltip>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-[#fb6ea4] rounded-lg shadow p-4 flex flex-row justify-between">
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

        <div className="bg-[#7668d2] rounded-lg shadow p-4 flex flex-row justify-between">
          <div className="text-white">
            <h2 className="text-xl font-semibold">Teachers</h2>
            <p className="text-5xl mt-2">{teachersCount}</p>
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

        <div className="bg-[#91c123] rounded-lg shadow p-4 flex flex-row justify-between">
          <div className="text-white">
            <h2 className="text-xl font-semibold">Parents</h2>
            <p className="text-5xl mt-2">{parentsCount}</p>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faHouse}
              size="2xl"
              className="text-md"
              inverse
            />
          </div>
        </div>

        <div className="col-span-1 lg:col-span-1 bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold">User Distribution</h2>
          <div className="pt-8 pl-5">
            <PieChart
              series={[
                {
                  data: [
                    { id: 1, value: students.length, label: "Students" },
                    { id: 2, value: teachersCount, label: "Teachers" },
                    { id: 3, value: parentsCount, label: "Parents" },
                  ],
                },
              ]}
              width={400}
              height={200}
            />
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2 bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold">Students Per Section</h2>
          <BarChart
            xAxis={[
              {
                label: "Sections",
                scaleType: "band",
                data: sectionLabels,
                tickSize: 10, // Larger tick size for better readability
              },
            ]}
            yAxis={[
              {
                label: "Number of Students",
                tickCount: 6,
                grid: true,
              },
            ]}
            series={[
              {
                data: Object.values(sectionCounts), // Total students per section
                color: "#4b99f5",
                label: "Total Students",
              },
            ]}
            height={300}
          />
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-md shadow">
        <h2 className="text-2xl font-semibold mb-4 items-center flex flex-col">
          Student Status
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-[#f63845] rounded-lg shadow-md p-4 flex flex-row justify-between">
            <div className="text-white">
              <h2 className="text-xl font-semibold">Incomplete</h2>
              <p className="text-5xl mt-2">{statusCounts.Incomplete}</p>
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

          <div className="bg-[#ff7828] rounded-lg shadow-md p-4 flex flex-row justify-between">
            <div className="text-white">
              <h2 className="text-xl font-semibold">Low Emerging Reader</h2>
              <p className="text-5xl mt-2">{statusCounts.LowEmergingReader}</p>
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

          <div className="bg-[#DC84F3] rounded-lg shadow-md p-4 flex flex-row justify-between">
            <div className="text-white">
              <h2 className="text-xl font-semibold">High Emerging Reader</h2>
              <p className="text-5xl mt-2">{statusCounts.HighEmergingReader}</p>
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

          <div className="bg-[#4b99f5] rounded-lg shadow-md p-4 flex flex-row justify-between">
            <div className="text-white">
              <h2 className="text-xl font-semibold">Developing Reader</h2>
              <p className="text-5xl mt-2">{statusCounts.DevelopingReader}</p>
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

          <div className="bg-[#ffce1f] rounded-lg shadow-md p-4 flex flex-row justify-between">
            <div className="text-white">
              <h2 className="text-xl font-semibold">Transitioning Reader</h2>
              <p className="text-5xl mt-2">
                {statusCounts.TransitioningReader}
              </p>
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

          <div className="bg-[#FF8080] rounded-lg shadow-md p-4 flex flex-row justify-between">
            <div className="text-white">
              <h2 className="text-xl font-semibold">Grade Level Reader</h2>
              <p className="text-5xl mt-2">{statusCounts.GradeLevelReader}</p>
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

        <div className="col-span-1 lg:col-span-2 bg-slate-100 rounded-lg shadow-md p-4 mt-6">
          <h2 className="text-xl font-semibold">Student Status Per Section</h2>
          <BarChart
            xAxis={[
              {
                label: "Sections",
                scaleType: "band",
                data: sectionLabels,
                tickSize: 10, // Larger tick size for better readability
              },
            ]}
            yAxis={[
              {
                label: "Number of Students",
                tickCount: 6,
                grid: true,
                max: 20,
                tickFormat: (value) => Math.floor(value),
              },
            ]}
            series={statusSeries}
            gap={20}
            height={500}
          />
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-md shadow">
        <h2 className="text-2xl font-semibold mb-4 items-center flex flex-col">
          Student Assessment and Performance
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

          <div className="col-span-1 lg:col-span-3 bg-slate-100 rounded-lg shadow-md p-4 mt-6">
            <h2 className="text-xl font-semibold">Assessment Created</h2>
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
              height={400}
            />
          </div>

          <div className="col-span-1 lg:col-span-3 bg-slate-100 rounded-lg shadow-md p-4 mt-6">
            <h2 className="text-xl font-semibold">Performance of Students</h2>
            {performanceCounts.length > 0 && students.length > 0 ? (
              <BarChart
                xAxis={[
                  {
                    label: "Assessment Type",
                    data: assessmentLabels,
                    scaleType: "band",
                    tickSize: 10,
                  },
                ]}
                yAxis={[
                  {
                    label: "Score",
                    min: 0,
                    max: 10, // Assuming scores are out of 100
                    tickCount: 6,
                    tickFormat: (value) => Math.floor(value),
                  },
                ]}
                series={studentsPerformanceData.map((studentData) => ({
                  data: studentData.scores, // Array of scores per assessment
                  label: studentData.studentName, // Student name as label
                  color: `#${Math.floor(Math.random() * 16777215).toString(
                    16
                  )}`, // Random color for each student
                }))}
                height={400}
              />
            ) : (
              <p>No performance data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyAdminDashboard;
