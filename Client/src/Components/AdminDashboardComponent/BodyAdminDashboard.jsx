import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faChildReaching,
  faCircleInfo,
  faHomeUser,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@nextui-org/react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";

const BodyAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachersCount, setTeachersCount] = useState(0);
  const [parentsCount, setParentsCount] = useState(0);

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users");
        const data = response.data;
        setUsers(data);

        // Count teachers and parents
        setTeachersCount(data.filter((user) => user.role === "Teacher").length);
        setParentsCount(data.filter((user) => user.role === "Parent").length);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await axios.get("/getStudents");
        const data = response.data;
        setStudents(data);

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
        const counts = sections.reduce((acc, section) => {
          acc[section] = data.filter(
            (student) => student.Section === section
          ).length;
          return acc;
        }, {});

        setSectionCounts(counts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
    fetchStudents();
  }, []);

  return (
    <div>
      <div className="px-9">
        <div className="flex items-center mb-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
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
            <h2 className="text-2xl font-semibold">Students Per Section</h2>
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
          <h2 className="text-2xl font-semibold mb-4">Assessment Created</h2>
          <div className="bg-white rounded-lg shadow p-4">
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

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">
            Answered Assessment Per Section
          </h2>
          <div className="bg-white rounded-lg shadow p-4">
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

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">
            Result from each Assessment
          </h2>
          <div className="bg-white rounded-lg shadow p-4">
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
