import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import "../ContentDasboard/Content.css";
import { Tooltip } from "@nextui-org/react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import ContentHeader from "../ContentDasboard/ContentHeader";
import axios from "axios";

const BodyAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachersCount, setTeachersCount] = useState(0);
  const [parentsCount, setParentsCount] = useState(0);
  const [asterCount, setAsterCount] = useState(0);
  const [camiaCount, setCamiaCount] = useState(0);
  const [dahliaCount, setDahliaCount] = useState(0);
  const [irisCount, setIrisCount] = useState(0);
  const [jasminCount, setJasminCount] = useState(0);
  const [orchidCount, setOrchidCount] = useState(0);
  const [roseCount, setRoseCount] = useState(0);
  const [tulipCount, setTulipCount] = useState(0);
  const [sscCount, setSSCCount] = useState(0);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(response.data);

      // Count teachers and parents
      const teachers = response.data.filter(
        (user) => user.role === "teacher"
      ).length;
      const parents = response.data.filter(
        (user) => user.role === "parent"
      ).length;

      setTeachersCount(teachers);
      setParentsCount(parents);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/getStudents");
      setStudents(response.data);

      // Count pre section
      const aster = response.data.filter(
        (student) => student.Section === "Aster"
      ).length;
      const camia = response.data.filter(
        (student) => student.Section === "Camia"
      ).length;
      const dahlia = response.data.filter(
        (student) => student.Section === "Dahlia"
      ).length;
      const iris = response.data.filter(
        (student) => student.Section === "Iris"
      ).length;
      const jasmin = response.data.filter(
        (student) => student.Section === "Jasmin"
      ).length;
      const orchid = response.data.filter(
        (student) => student.Section === "Orchid"
      ).length;
      const rose = response.data.filter(
        (student) => student.Section === "Rose"
      ).length;
      const tulip = response.data.filter(
        (student) => student.Section === "Tulip"
      ).length;
      const SSC = response.data.filter(
        (student) => student.Section === "SSC"
      ).length;

      setAsterCount(aster);
      setCamiaCount(camia);
      setDahliaCount(dahlia);
      setIrisCount(iris);
      setJasminCount(jasmin);
      setOrchidCount(orchid);
      setRoseCount(rose);
      setTulipCount(tulip);
      setSSCCount(SSC);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const sectionData = [
    { section: "Aster", count: asterCount },
    { section: "Camia", count: camiaCount },
    { section: "Dahlia", count: dahliaCount },
    { section: "Iris", count: irisCount },
    { section: "Jasmin", count: jasminCount },
    { section: "Orchid", count: orchidCount },
    { section: "Rose", count: roseCount },
    { section: "Tulip", count: tulipCount },
    { section: "SSC", count: sscCount },
  ];

  useEffect(() => {
    axios
      .get("/getStudents") // Corrected route
      .then((response) => {
        setStudents(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="content">
      <ContentHeader />
      <div className="content-body">
        <div className="content-title-header">
          <div>
            Admin Dashboard
            <Tooltip
              content={
                <div className="px-1 py-2">
                  <div className="text-small font-bold">Dashboard Table</div>
                  <div className="text-tiny">
                    This function will view the data of the system in each
                    section.
                  </div>
                </div>
              }
            >
              <FontAwesomeIcon
                icon={faCircleInfo}
                size="1x"
                className="help-icon"
              />
            </Tooltip>
          </div>
        </div>
        <div className="flex flex-col w-[100%] h-full max-h-[800px] bg-[#fff] mt-2 p-5 rounded-md shadow-sm">
          <div className="flex m-3">
            <p className="text-2xl font-semibold">Data Information</p>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <Card className="py-4 w-[20%]">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                <p className="text-md uppercase font-bold">Users</p>
              </CardHeader>
              <CardBody className="items-center">
                <p className="text-5xl">{users.length}</p>
              </CardBody>
            </Card>
            <Card className="py-4 w-[20%]">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                <p className="text-md uppercase font-bold">Student</p>
              </CardHeader>
              <CardBody className="items-center">
                <p className="text-5xl">{students.length}</p>
              </CardBody>
            </Card>
            <Card className="py-4 w-[20%]">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                <p className="text-md uppercase font-bold">Teacher</p>
              </CardHeader>
              <CardBody className="items-center">
                <p className="text-5xl">{teachersCount}</p>
              </CardBody>
            </Card>
            <Card className="py-4 w-[20%]">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                <p className="text-md uppercase font-bold">Parent</p>
              </CardHeader>
              <CardBody className="items-center">
                <p className="text-5xl">{parentsCount}</p>
              </CardBody>
            </Card>
            <Card className="py-4 w-[80%]">
              <CardBody className="overflow-visible py-2 flex items-center justify-center">
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: users.length, label: "User" },
                        { id: 1, value: students.length, label: "Student" },
                        { id: 2, value: teachersCount, label: "Teacher" },
                        { id: 3, value: parentsCount, label: "Parent" },
                      ],
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </CardBody>
            </Card>
          </div>
          <div className="flex">
            <Card className="py-4 w-full">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                <p className="text-md uppercase font-bold">Students</p>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: [
                        "Aster",
                        "Camia",
                        "Dahlia",
                        "Iris",
                        "Jasmin",
                        "Orchid",
                        "Rose",
                        "Tulip",
                        "SSC",
                      ],
                    },
                  ]}
                  yAxis={[
                    {
                      label: "Number of Students",
                    },
                  ]}
                  series={[
                    { data: [asterCount] },
                    { data: [camiaCount] },
                    { data: [dahliaCount] },
                    { data: [irisCount] },
                    { data: [jasminCount] },
                    { data: [orchidCount] },
                    { data: [roseCount] },
                    { data: [tulipCount] },
                    { data: [sscCount] },
                  ]}
                  width={1400}
                  height={300}
                />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyAdminDashboard;
