import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faChildReaching,
  faCircleInfo,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip, Select, SelectItem } from "@nextui-org/react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";

const BodyAdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [teachersCount, setTeachersCount] = useState(0);
  const [parentsCount, setParentsCount] = useState(0);
  const [performanceCounts, setPerformanceCounts] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState("Pagbabaybay");
  const [selectedSection, setSelectedSection] = useState("All Sections");

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

  const [sectionCounts, setSectionCounts] = useState({});
  const [activityCounts, setActivityCounts] = useState({});
  const [statusCounts, setStatusCounts] = useState({});
  const [sectionRecommendations, setSectionRecommendations] = useState({});
  const [averageScores, setAverageScores] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchUsers(),
          fetchStudents(),
          fetchAssessment(),
          fetchPerformance(),
        ]);
        generateSectionRecommendations();
        computeAverageScores();
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
      setTeachersCount(countByRole(data, "Teacher"));
      setParentsCount(countByRole(data, "Parent"));
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api/getStudents");
      setStudents(response.data);
      setStatusCounts(getCounts(response.data, "status"));
      setSectionCounts(getCounts(response.data, "Section"));
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const fetchAssessment = async () => {
    try {
      const response = await axios.get("/api/getAssessments");
      const activities = ["Pagbabaybay", "Pantig", "Salita", "Pagbabasa"];
      setActivityCounts(getCounts(response.data, "Type", activities));
    } catch (err) {
      console.error("Error fetching assessments:", err);
    }
  };

  const fetchPerformance = async () => {
    try {
      const response = await axios.get("/api/getPerformance");
      setPerformanceCounts(response.data);
    } catch (err) {
      console.error("Error fetching performance:", err);
    }
  };

  const countByRole = (data, role) =>
    data.filter((user) => user.role === role).length;

  const getCounts = (data, key, categories = []) =>
    categories.length
      ? categories.reduce((acc, cat) => {
          acc[cat] = data.filter((item) => item[key] === cat).length;
          return acc;
        }, {})
      : data.reduce((acc, item) => {
          acc[item[key]] = (acc[item[key]] || 0) + 1;
          return acc;
        }, {});

  const generateSectionRecommendations = () => {
    const recommendations = {};

    sections.forEach((section) => {
      const sectionPerformances = performanceCounts.filter((performance) => {
        const student = students.find((s) => s.LRN === performance.LRN);
        return student && student.Section === section;
      });

      const lowScoreRecommendations = sectionPerformances
        .filter((perf) => perf.Score < 5)
        .map((perf) => `Improve in ${perf.Type}`);

      recommendations[section] = lowScoreRecommendations;
    });

    setSectionRecommendations(recommendations);
  };

  const computeAverageScores = () => {
    const sectionScores = {};
    sections.forEach((section) => {
      sectionScores[section] = performanceCounts
        .filter((perf) => perf.Type === selectedAssessment)
        .map((perf) => parseInt(perf.Score, 10));
    });

    const avgScores = {};
    Object.keys(sectionScores).forEach((section) => {
      const scores = sectionScores[section];
      avgScores[section] = scores.length
        ? scores.reduce((acc, score) => acc + score, 0) / scores.length
        : 0;
    });

    setAverageScores(avgScores);
  };

  const getChartData = () => ({
    labels: selectedSection === "All Sections" ? sections : [selectedSection],
    data:
      selectedSection === "All Sections"
        ? sections.map((section) => averageScores[section] || 0)
        : [averageScores[selectedSection] || 0],
  });

  const { labels: sectionLabels, data: sectionData } = getChartData();

  return (
    <div className="px-9">
      <div className="flex items-center mb-4">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <Tooltip showArrow content="View system data for each section.">
          <FontAwesomeIcon icon={faCircleInfo} className="ml-2 text-black" />
        </Tooltip>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <InfoCard
          title="Students"
          count={students.length}
          color="#fb6ea4"
          icon={faChildReaching}
        />
        <InfoCard
          title="Teachers"
          count={teachersCount}
          color="#7668d2"
          icon={faChalkboardTeacher}
        />
        <InfoCard
          title="Parents"
          count={parentsCount}
          color="#91c123"
          icon={faHouse}
        />
      </div>

      <div className="col-span-1 lg:col-span-3 bg-white rounded-lg shadow p-4 mt-6">
        <h2 className="text-xl font-semibold">Students Per Section</h2>
        <BarChart
          xAxis={[
            { label: "Sections", scaleType: "band", data: sectionLabels },
          ]}
          yAxis={[{ label: "Number of Students", grid: true }]}
          series={[
            {
              data: Object.values(sectionCounts),
              color: "#4b99f5",
              label: "Total Students",
            },
          ]}
          height={300}
        />
      </div>

      <div className="mt-6 bg-white p-6 rounded-md shadow">
        <h2 className="text-2xl font-semibold mb-4">Student Status</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Object.keys(statusCounts).map((status) => (
            <StatusCard
              key={status}
              status={status}
              count={statusCounts[status]}
              color={getColorForStatus(status)}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-md shadow">
        <h2 className="text-2xl font-semibold mb-4">
          Average Scores in {selectedAssessment} Assessment
        </h2>
        <Select
          variant="bordered"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e)}
        >
          <SelectItem key="All Sections" value="All Sections">
            All Sections
          </SelectItem>
          {sections.map((section) => (
            <SelectItem key={section} value={section}>
              {section}
            </SelectItem>
          ))}
        </Select>
        <BarChart
          xAxis={[
            { label: "Sections", scaleType: "band", data: sectionLabels },
          ]}
          yAxis={[
            {
              label: "Average Score",
              max: 10,
              tickFormat: (v) => Math.floor(v),
            },
          ]}
          series={[
            {
              data: sectionData,
              color: "#91c123",
              label: "Average Score",
            },
          ]}
          height={500}
        />
      </div>
    </div>
  );
};

// Helper components for cleaner UI
const InfoCard = ({ title, count, color, icon }) => (
  <div
    className="rounded-lg shadow p-4 flex flex-row justify-between"
    style={{ backgroundColor: color }}
  >
    <div className="text-white">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-5xl mt-2">{count}</p>
    </div>
    <FontAwesomeIcon icon={icon} size="2xl" className="text-md" inverse />
  </div>
);

const StatusCard = ({ status, count, color }) => (
  <div
    className="rounded-lg shadow p-4 flex flex-row justify-between"
    style={{ backgroundColor: color }}
  >
    <div className="text-white">
      <h2 className="text-xl font-semibold">{status}</h2>
      <p className="text-5xl mt-2">{count}</p>
    </div>
  </div>
);

const getColorForStatus = (status) => {
  const colors = {
    Incomplete: "#ff505b",
    "Low Emerging Reader": "#ff7828",
    "High Emerging Reader": "#DC84F3",
    "Developing Reader": "#4b99f5",
    "Transitioning Reader": "#ffce1f",
    "Grade Level Reader": "#FF8080",
  };
  return colors[status] || "#ccc";
};

export default BodyAdminDashboard;
