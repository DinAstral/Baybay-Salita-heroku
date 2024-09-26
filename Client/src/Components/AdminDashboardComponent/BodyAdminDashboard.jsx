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

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Student_List_Report_table",
    sheet: "Students",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users");
        const data = response.data;
        setUsers(data);
        setTeachersCount(countByRole(data, "Teacher"));
        setParentsCount(countByRole(data, "Parent"));
      } catch (err) {
        console.error(err);
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
        console.error(err);
      }
    };

    const fetchAssessment = async () => {
      try {
        const response = await axios.get("/getAssessments");
        const data = response.data;
        setAssessment(data);
        setActivityCounts(countAssessmentsByType(data));
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
    fetchStudents();
    fetchAssessment();
  }, []);

  const countByRole = (data, role) => {
    return data.filter((user) => user.role === role).length;
  };

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
    const activities = ["Pagbabaybay", "Pantig", "Salita", "Pagbabasa"];
    return activities.reduce((acc, activity) => {
      acc[activity] = assessments.filter(
        (assessment) => assessment.Type === activity
      ).length;
      return acc;
    }, {});
  };

  // Calculate the number of users to display based on the current page
  const offset = currentPage * usersPerPage;
  const currentUsers = filteredRoles.slice(offset, offset + usersPerPage);

  const totalPages = Math.ceil(filteredRoles.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="">
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
              margin={{ top: 20, bottom: 30, left: 40, right: 60 }}
              series={[
                {
                  data: Object.values(sectionCounts),
                },
              ]}
              width={1000}
              height={300}
            />
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">
            Status of the Students
          </h2>
          <div className="bg-white rounded-lg shadow p-4">
            <Table
              ref={tableRef}
              removeWrapper
              color="primary"
              selectionMode="single"
            >
              <TableHeader>
                <TableColumn>LRN</TableColumn>
                <TableColumn>First Name</TableColumn>
                <TableColumn>Last Name</TableColumn>
                <TableColumn>Age</TableColumn>
                <TableColumn>Section</TableColumn>
                <TableColumn>Mother Tongue</TableColumn>
                <TableColumn>Gender</TableColumn>
                <TableColumn>Status</TableColumn>
              </TableHeader>
              <TableBody emptyContent={"No rows to display."}>
                {currentUsers.map((student) => (
                  <TableRow key={student.LRN}>
                    <TableCell>{student.LRN}</TableCell>
                    <TableCell>{student.FirstName}</TableCell>
                    <TableCell>{student.LastName}</TableCell>
                    <TableCell>{student.Age}</TableCell>
                    <TableCell>{student.Section}</TableCell>
                    <TableCell>{student.MotherTongue}</TableCell>
                    <TableCell>{student.Gender}</TableCell>
                    <TableCell>{student.Status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-4">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
              >
                Previous
              </Button>
              <div>
                Page {currentPage + 1} of {totalPages}
              </div>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">
            Score Rating of Students
          </h2>
          <div className="bg-white rounded-lg shadow p-4">
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[{ data: [1, 1, 4, 6, 3, 10] }]}
              height={300}
              margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
              grid={{ vertical: true, horizontal: true }}
            />
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Assessment Created</h2>
          <div className="bg-white rounded-lg shadow p-4">
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: Object.keys(activityCounts),
                },
              ]}
              yAxis={[
                {
                  label: "Number of Students",
                },
              ]}
              margin={{ top: 20, bottom: 30, left: 40, right: 60 }}
              series={[
                {
                  data: Object.values(activityCounts),
                },
              ]}
              width={1500}
              height={300}
            />
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Output Per Section</h2>
          <div className="bg-white rounded-lg shadow p-4">
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: Object.keys(sectionCounts),
                  dataKey: "section",
                },
              ]}
              yAxis={[
                {
                  label: "Number of Students",
                },
              ]}
              margin={{ top: 20, bottom: 30, left: 40, right: 60 }}
              series={[
                {
                  data: Object.values(sectionCounts),
                },
              ]}
              width={1500}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyAdminDashboard;
