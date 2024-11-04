import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faChildReaching,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@nextui-org/react";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";

const BodyAdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [assessments, setAssessment] = useState([]);
  const [teachersCount, setTeachersCount] = useState(0);
  const [parentsCount, setParentsCount] = useState(0);
  const [selectedAssessment, setSelectedAssessment] = useState("Pagbabaybay");
  const [performanceCounts, setPerformanceCounts] = useState([]);
  const [averageScores, setAverageScores] = useState({});
  const [selectedSection, setSelectedSection] = useState("All Sections");
  const [sectionStatusCounts, setSectionStatusCounts] = useState({});
  const [sectionRecommendations, setSectionRecommendations] = useState({});
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchUsers(), fetchStudents(), fetchAssessment()]);
        await fetchPerformance();
        computeAverageScores();
        generateSectionRecommendation();
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [selectedAssessment]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      const data = Array.isArray(response.data) ? response.data : [];
      setTeachersCount(countByRole(data, "Teacher"));
      setParentsCount(countByRole(data, "Parent"));
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api/getStudents");
      const data = Array.isArray(response.data) ? response.data : [];
      setStudents(data);

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
            console.warn(`Unknown status: ${student.status}`);
            break;
        }
      });

      setStatusCounts(statusGroups);

      const sectionCounts = countStudentsBySection(data);
      setSectionCounts(sectionCounts.totalCounts);
      setSectionStatusCounts(sectionCounts.statusCounts);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const fetchAssessment = async () => {
    try {
      const response = await axios.get("/api/getAssessments");
      const data = Array.isArray(response.data) ? response.data : [];

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
      const data = Array.isArray(response.data) ? response.data : [];
      setPerformanceCounts(data);
    } catch (err) {
      console.error("Error fetching performance:", err);
    }
  };

  const countByRole = (data, role) =>
    Array.isArray(data) ? data.filter((user) => user.role === role).length : 0;

  const countStudentsBySection = (students) => {
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

  const getColorForStatus = (status) => {
    switch (status) {
      case "Incomplete":
        return "#ff505b";
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
        return "#ccc";
    }
  };

  const computeAverageScores = () => {
    const sectionScores = {};

    sections.forEach((section) => {
      sectionScores[section] = [];
    });

    performanceCounts.forEach((performance) => {
      const student = students.find((s) => s.LRN === performance.LRN);
      if (
        student &&
        student.Section &&
        performance.Type === selectedAssessment
      ) {
        sectionScores[student.Section].push(parseInt(performance.Score, 10));
      }
    });

    const avgScores = {};
    sections.forEach((section) => {
      const scores = sectionScores[section];
      avgScores[section] = scores.length
        ? scores.reduce((acc, score) => acc + score, 0) / scores.length
        : 0;
    });

    setAverageScores(avgScores);
  };

  const generateSectionRecommendation = () => {
    const recommendations = {};

    sections.forEach((section) => {
      recommendations[section] = [];
    });

    sections.forEach((section) => {
      const sectionPerformances = performanceCounts.filter((performance) => {
        const student = students.find((s) => s.LRN === performance.LRN);
        return student && student.Section === section;
      });

      const lowScoreAssessments = {};
      const wordErrorCounts = {};

      sectionPerformances.forEach((performance) => {
        if (performance.Score < 5) {
          lowScoreAssessments[performance.Type] =
            (lowScoreAssessments[performance.Type] || 0) + 1;
        }

        if (performance.PerformanceItems) {
          performance.PerformanceItems.forEach((item) => {
            if (item.Remarks && item.Remarks.toLowerCase() === "incorrect") {
              wordErrorCounts[item.Word] =
                (wordErrorCounts[item.Word] || 0) + 1;
            }
          });
        }
      });

      const lowScoreRecommendations = Object.keys(lowScoreAssessments).map(
        (assessment) =>
          `Focus on improving scores in ${assessment} by reviewing key concepts.`
      );

      const wordRecommendations = Object.keys(wordErrorCounts)
        .sort((a, b) => wordErrorCounts[b] - wordErrorCounts[a])
        .slice(0, 5)
        .map((word) => `Practice with the word "${word}" to reduce errors.`);

      recommendations[section] = [
        ...lowScoreRecommendations,
        ...wordRecommendations,
      ];
    });

    setSectionRecommendations(recommendations);
  };

  const getChartData = () => {
    if (selectedSection === "All Sections") {
      return {
        labels: Object.keys(averageScores),
        data: Object.values(averageScores),
      };
    } else {
      return {
        labels: [selectedSection],
        data: [averageScores[selectedSection] || 0],
      };
    }
  };

  const { labels: sectionLabels, data: sectionData } = getChartData();

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

        <div className="col-span-1 lg:col-span-3 bg-white rounded-lg shadow p-4">
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
          <div className="bg-[#ff505b] rounded-lg shadow-md p-4 flex flex-row justify-between">
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
                tickSize: 10,
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
            series={statusSeries.map((series, idx) => ({
              ...series,
              element: (
                <Tooltip
                  content={
                    Array.isArray(sectionRecommendations[sectionLabels[idx]]) &&
                    sectionRecommendations[sectionLabels[idx]].length > 0 ? (
                      <div>
                        {sectionRecommendations[sectionLabels[idx]].map(
                          (rec, index) => (
                            <p key={index}>{rec}</p>
                          )
                        )}
                      </div>
                    ) : (
                      "No specific recommendation available"
                    )
                  }
                  placement="top"
                >
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      backgroundColor: series.color,
                      cursor: "pointer",
                    }}
                  ></div>
                </Tooltip>
              ),
            }))}
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
                  color: "#7668d2", // Primary color for bars
                  label: "Assessments", // Label for better clarity
                },
              ]}
              barsize={40} // Increase bar size for better visuals
              gap={30} // Increase gap between bars for a cleaner look
              height={500}
            />
          </div>

          <div className="col-span-1 lg:col-span-3 bg-slate-100 rounded-lg shadow-md p-4 mt-6">
            {/* Dropdown or Buttons to Select Section */}
            <div className="flex justify-start gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-semibold">Select Section:</h2>
                <Select
                  variant="bordered"
                  className="bg-white rounded-sm"
                  placeholder="All Sections"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                >
                  <SelectItem key="All Sections">All Sections</SelectItem>
                  {sections.map((section) => (
                    <SelectItem key={section}>{section}</SelectItem>
                  ))}
                </Select>
              </div>

              {/* Dropdown to Select Assessment */}
              <div>
                <h2 className="text-2xl font-semibold">Select Assessment:</h2>
                <Select
                  variant="bordered"
                  className="bg-white rounded-sm"
                  placeholder="Select Assessment"
                  value={selectedAssessment}
                  onChange={(e) => setSelectedAssessment(e.target.value)}
                >
                  <SelectItem key="Pagbabaybay">Assessment 1</SelectItem>
                  <SelectItem key="Pantig">Assessment 2</SelectItem>
                  <SelectItem key="Salita">Assessment 3</SelectItem>
                  <SelectItem key="Pagbabasa">Assessment 4</SelectItem>
                </Select>
              </div>
            </div>

            <h2 className="text-xl font-semibold">
              Average Scores in {selectedAssessment} Assessment
            </h2>
            <BarChart
              xAxis={[
                {
                  label: "Sections",
                  scaleType: "band",
                  data: sectionLabel,
                  tickSize: 10,
                },
              ]}
              yAxis={[
                {
                  label: "Average Score",
                  min: 0,
                  max: 10, // Assuming the max score is 100
                  tickCount: 6,
                  tickFormat: (value) => Math.floor(value),
                },
              ]}
              series={[
                {
                  data: sectionData, // Average scores per section or per selected section
                  color: "#91c123",
                  label: "Average Score",
                },
              ]}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyAdminDashboard;
