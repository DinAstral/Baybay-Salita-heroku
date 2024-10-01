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
  const [assessments, setAssessment] = useState([]);
  const { user } = useContext(UserContext);

  const [sectionCounts, setSectionCounts] = useState({});
  const [activityCounts, setActivityCounts] = useState({});

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

        // Filter students by the section of the current teacher
        const filteredStudents = data.filter(
          (student) => student.Section === teacher.Section
        );
        setStudents(filteredStudents);

        // Count the number of students in the teacher's section
        const sectionCount = filteredStudents.length;

        setSectionCounts({ [teacher.Section]: sectionCount });
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    const fetchAssessment = async () => {
      try {
        const response = await axios.get("/getAssessments");
        const data = response.data;

        const activities = ["Pagbabaybay", "Pantig", "Salita", "Pagbabasa"];
        const counts = activities.reduce((acc, activity) => {
          acc[activity] = data.filter((type) => type.Type === activity).length;
          return acc;
        }, {});

        setActivityCounts(counts);
      } catch (err) {
        console.error("Error fetching assessments:", err);
      }
    };

    fetchTeacher();
    fetchStudents(); // Moved here to ensure it runs after the teacher is fetched
    fetchAssessment();
  }, [user.UserID, teacher.Section]); // Add teacher.Section as a dependency

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

        <div className="col-span-1 lg:col-span-2 bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold"></h2>
          <BarChart
            xAxis={[
              {
                label: "Number of Students",
              },
            ]}
            yAxis={[
              {
                label: "Sections",
                scaleType: "band",
                data: Object.keys(sectionCounts),
              },
            ]}
            series={[
              {
                data: Object.values(sectionCounts),
              },
            ]}
            layout="horizontal"
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
                label: "Activities",
                scaleType: "band",
                data: Object.keys(activityCounts),
              },
            ]}
            yAxis={[
              {
                label: "Number of Assessments",
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
        <h2 className="text-2xl font-semibold mb-4">Compared Result</h2>
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
    </div>
  );
};

export default BodyTeacherDashboard;
