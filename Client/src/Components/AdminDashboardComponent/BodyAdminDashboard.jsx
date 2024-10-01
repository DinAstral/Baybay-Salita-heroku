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

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Student_List_Report_table",
    sheet: "Students",
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
      setSectionCounts(countStudentsBySection(data)); // Set section counts
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const fetchAssessment = async () => {
    try {
      const response = await axios.get("/api/getAssessments");
      const data = response.data;
      setAssessment(data);
      setActivityCounts(countAssessmentsByType(data));
    } catch (err) {
      console.error("Error fetching assessments:", err);
    }
  };

  const fetchPerformance = async () => {
    try {
      const response = await axios.get(
        `/api/getPerformance?assessment=${selectedAssessment}`
      );
      const data = response.data;
      setPerformanceData(data); // Set performance data
      const distribution = countScores(data); // Calculate score distribution
      setScoreDistribution(distribution);
    } catch (err) {
      console.error("Error fetching performance data:", err);
    }
  };

  const countByRole = (data, role) =>
    data.filter((user) => user.role === role).length;

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
    return sections.reduce((acc, section) => {
      acc[section] = students.filter(
        (student) => student.Section === section
      ).length;
      return acc;
    }, {});
  };

  const countAssessmentsByType = (assessments) => {
    const assessmentTypes = ["Pagbabaybay", "Pantig", "Salita", "Pagbabasa"];
    return assessmentTypes.reduce((acc, type) => {
      acc[type] = assessments.filter(
        (assessment) => assessment.type === type
      ).length;
      return acc;
    }, {});
  };

  const countScores = (data) => {
    const scores = {};
    const counts = {};
    data.forEach((entry) => {
      const { Score, AssessmentType } = entry;
      if (!scores[AssessmentType]) scores[AssessmentType] = 0;
      scores[AssessmentType] += Score;
      if (!counts[AssessmentType]) counts[AssessmentType] = 0;
      counts[AssessmentType]++;
    });
    return { scores, counts };
  };

  const getFormattedData = () => {
    const studentDataMap = {};
    const assessments = [
      "Assessment 1",
      "Assessment 2",
      "Assessment 3",
      "Assessment 4",
    ];

    performanceData.forEach((entry) => {
      const { LRN, Score, AssessmentType } = entry;

      if (!studentDataMap[LRN]) {
        studentDataMap[LRN] = { LRN, scores: assessments.map(() => 0) };
      }

      const index = assessments.indexOf(AssessmentType);
      let totalScore =
        AssessmentType === "Assessment 4" ? (Score / 5) * 10 : Score || 0;

      if (index !== -1) {
        studentDataMap[LRN].scores[index] = totalScore;
      }
    });

    return Object.values(studentDataMap).map((student) => ({
      label: `LRN: ${student.LRN}`,
      data: student.scores.map((score, index) => ({
        x: assessments[index],
        y: !isNaN(score) ? score : 0,
      })),
    }));
  };

  const formattedData = getFormattedData();

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
        <div className="bg-white rounded-lg shadow p-4 flex flex-row justify-between">
          <div>
            <h2 className="text-xl font-semibold">Students</h2>
            <p className="text-5xl mt-2">{students.length}</p>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faChildReaching}
              size="2xl"
              className="text-md"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex flex-row justify-between">
          <div>
            <h2 className="text-xl font-semibold">Teachers</h2>
            <p className="text-5xl mt-2">{teachersCount}</p>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faChalkboardTeacher}
              size="2xl"
              className="text-md"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex flex-row justify-between">
          <div>
            <h2 className="text-xl font-semibold">Parents</h2>
            <p className="text-5xl mt-2">{parentsCount}</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faHouse} size="2xl" className="text-md" />
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
                scaleType: "band",
                data: Object.keys(sectionCounts),
              },
            ]}
            yAxis={[
              {
                label: "Number of Students",
              },
            ]}
            margin={{ top: 20, bottom: 20, left: 50, right: 20 }}
            series={[
              {
                data: Object.values(sectionCounts),
                label: "Students",
              },
            ]}
            height={300}
          />
        </div>

        <div className="col-span-1 lg:col-span-3 bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold">Assessment Types</h2>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: Object.keys(activityCounts),
              },
            ]}
            yAxis={[
              {
                label: "Count of Activities",
              },
            ]}
            series={[
              {
                data: Object.values(activityCounts),
                label: "Assessments",
              },
            ]}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default BodyAdminDashboard;
