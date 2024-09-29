import { useState, useEffect, useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faChildReaching,
  faCircleInfo,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Tooltip,
} from "@nextui-org/react";
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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(10); // Number of users per page
  const [filteredRoles, setFilteredRoles] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchUsers(), fetchStudents(), fetchAssessment()]);
        await fetchPerformance();
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [selectedAssessment]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
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
      const response = await axios.get("/getStudents");
      const data = response.data;
      setStudents(data);
      setFilteredRoles(data);
      setSectionCounts(countStudentsBySection(data));
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const fetchAssessment = async () => {
    try {
      const response = await axios.get("/getAssessments");
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
        `/getPerformance?assessment=${selectedAssessment}`
      );
      const data = response.data;
      const distribution = countScores(data);
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

  useEffect(() => {
    getFormattedData();
  }, [selectedAssessment]);

  const getFormattedData = () => {
    const studentDataMap = {};
    const assessments = [
      "Assessment 1",
      "Assessment 2",
      "Assessment 3",
      "Assessment 4",
    ];

    // Initialize data structure for each student (LRN) with scores for each assessment type
    performanceData.forEach((entry) => {
      const { LRN, Score, AssessmentType } = entry;

      // Ensure the LRN exists in the map
      if (!studentDataMap[LRN]) {
        studentDataMap[LRN] = { LRN, scores: assessments.map(() => 0) }; // Default scores to 0
      }

      // Scale the score for Assessment 4 and store it in the correct position
      const index = assessments.indexOf(AssessmentType);
      let totalScore = 0;

      if (AssessmentType === "Assessment 4") {
        totalScore = Score ? (Score / 5) * 10 : 0; // Handle invalid/missing score
      } else {
        totalScore = Score || 0; // Default to 0 if score is missing or invalid
      }

      // Update the student's score for the current assessment type
      if (index !== -1) {
        studentDataMap[LRN].scores[index] = totalScore;
      }
    });

    // Convert the map into an array that LineChart can understand
    return Object.values(studentDataMap).map((student) => ({
      label: `LRN: ${student.LRN}`,
      data: student.scores.map((score, index) => ({
        x: assessments[index],
        y: !isNaN(score) ? score : 0, // Ensure no NaN values in chart data
      })),
    }));
  };
  const formattedData = getFormattedData();

  // Pagination controls
  const offset = currentPage * usersPerPage;
  const currentUsers = filteredRoles.slice(offset, offset + usersPerPage);
  const totalPages = Math.ceil(filteredRoles.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">
          Score Rating of Students
        </h2>

        {/* Buttons to select assessments */}
        <div className="flex space-x-4">
          <button onClick={() => setSelectedAssessment("Assessment 1")}>
            Assessment 1
          </button>
          <button onClick={() => setSelectedAssessment("Assessment 2")}>
            Assessment 2
          </button>
          <button onClick={() => setSelectedAssessment("Assessment 3")}>
            Assessment 3
          </button>
          <button onClick={() => setSelectedAssessment("Assessment 4")}>
            Assessment 4
          </button>
        </div>

        {/* Line chart for student performance */}
        <div className="bg-white rounded-lg shadow p-4 mt-4">
          <LineChart
            xAxis={[
              {
                label: "Assessment Type",
                data: [
                  "Assessment 1",
                  "Assessment 2",
                  "Assessment 3",
                  "Assessment 4",
                ], // Fixed x-axis data
              },
            ]}
            yAxis={[
              {
                label: "Total Score (0-10)", // Y-axis label
              },
            ]}
            series={formattedData} // Data series for each student
            height={300}
            grid={{ vertical: true, horizontal: true }}
            title={`Score Performance - ${selectedAssessment}`} // Dynamic chart title
            titleProps={{ style: { fontSize: "1.5rem", fontWeight: "bold" } }}
            tooltip={{ show: true }} // Enable tooltips
          />
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Student List</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <Table aria-label="Paginated table of students" ref={tableRef}>
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Section</TableColumn>
              <TableColumn>Gender</TableColumn>
            </TableHeader>
            <TableBody>
              {currentUsers.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>
                    {student.FirstName + " " + student.LastName}
                  </TableCell>
                  <TableCell>{student.Email}</TableCell>
                  <TableCell>{student.Section}</TableCell>
                  <TableCell>{student.Gender}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 flex justify-between">
            <Button
              disabled={currentPage === 0}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous Page
            </Button>
            <Button
              disabled={currentPage === totalPages - 1}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next Page
            </Button>
            <Button color="success" onClick={onDownload}>
              Export to Excel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyAdminDashboard;
