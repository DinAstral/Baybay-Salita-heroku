import { useState, useEffect } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import profile from "./../../assets/profile.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";
import StudentStatus from "../Modals/StudentStatus";

const LazyProfileImage = ({ src, alt }) => (
  <img loading="lazy" src={src} alt={alt} className="w-32 h-32 rounded-full" />
);

const BodyAdminViewStudent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState(null);
  const [performance, setPerformance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  const [modalShowStatus, setModalShowStatus] = useState(false);
  const [modalSubmitSuccess, setModalSubmitSuccess] = useState(false);
  const [profileImgUrl, setProfileImgUrl] = useState(profile);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentResponse = await axios.get(`/api/getStudentID/${id}`);
        const studentData = studentResponse.data;

        setData(studentData);
        setStatus(studentData.status);
        setProfileImgUrl(studentData.Picture || profile);

        const performanceResponse = await axios.get(
          `/api/getPerformanceStudent/${studentData.LRN}`
        );
        setPerformance(performanceResponse.data);
      } catch (err) {
        toast.error("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudentData();
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      const menuItem = [`/adminViewStudent/${data._id}`];
      const index = menuItem.findIndex((item) => item === location.pathname);
      setActiveIndex(index);
    }
  }, [location.pathname, data]);

  const toggleActive = (index) => setActiveIndex(index);

  const handleStatusClick = () => {
    setModalShowStatus(true);
  };

  const handleStatusSuccess = (newStatus) => {
    setStatus(newStatus);
    setModalSubmitSuccess(true);
    setModalShowStatus(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-10">
      <StudentStatus
        show={modalShowStatus}
        onHide={() => setModalShowStatus(false)}
        LRN={data.LRN}
        onStatusUpdate={handleStatusSuccess}
      />
      <div className="flex items-center justify-start gap-2 mb-5">
        <h1 className="text-3xl font-semibold">Student Information</h1>
        <Tooltip
          showArrow={true}
          content={
            <div className="p-2">
              <div className="text-sm font-bold">View Information</div>
              <div className="text-xs">
                This function allows you to view the student's information in
                the system.
              </div>
            </div>
          }
        >
          <FontAwesomeIcon icon={faCircleInfo} className="text-gray-600" />
        </Tooltip>
      </div>
      <div className="w-full max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-[3rem]">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <LazyProfileImage src={profileImgUrl} alt="Profile" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold">
              {data
                ? `${data.FirstName} ${data.LastName}`
                : "Name of the Student"}
            </h2>
            <h3>{data ? `Section: ${data.Section}` : "Student section"}</h3>
            <div className="flex flex-col mt-4 text-gray-700">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faAddressCard}
                  className="text-gray-600"
                />
                <span>Learner Reference Number: {data?.LRN || "N/A"}</span>
              </div>
              <div className="mt-4">
                <span className="text-sm font-bold">Status:</span>
                <span
                  className={`ml-2 px-2 py-1 rounded-full ${
                    status === "Grade Ready Reader"
                      ? "bg-green-200 text-green-800"
                      : status === "Transitioning Reader"
                      ? "bg-blue-200 text-blue-800"
                      : status === "Developing Reader"
                      ? "bg-yellow-200 text-yellow-800"
                      : status === "Incomplete"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {status || "N/A"}
                </span>
              </div>
            </div>
          </div>
          <Button
            color="primary"
            className="w-[120px] text-md p-1"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>

        <div className="mt-4">
          <Button color="primary" onClick={handleStatusClick}>
            Assess Status
          </Button>
        </div>

        <div className="mt-8">
          <div className="flex gap-6 border-b pb-2">
            <Button
              variant="light"
              radius="none"
              className={`text-md font-medium ${
                activeIndex === 0 ? "border-b-4 border-blue-500" : ""
              }`}
              onClick={() => toggleActive(0)}
            >
              Basic Information
            </Button>
            <Button
              variant="light"
              radius="none"
              className={`text-md font-medium ${
                activeIndex === 1 ? "border-b-4 border-blue-500" : ""
              }`}
              onClick={() => toggleActive(1)}
            >
              Student Progress
            </Button>
          </div>

          {activeIndex === 0 && (
            <div className="mt-6 bg-[#faf9f4] p-6 rounded-lg shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="block text-sm text-gray-600">
                    First Name:
                  </span>
                  <p className="text-gray-800">{data?.FirstName || "N/A"}</p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">
                    Last Name:
                  </span>
                  <p className="text-gray-800">{data?.LastName || "N/A"}</p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">Gender:</span>
                  <p className="text-gray-800">{data?.Gender || "N/A"}</p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">Birthday:</span>
                  <p className="text-gray-800">{data?.Birthday || "N/A"}</p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">Age:</span>
                  <p className="text-gray-800">{data?.Age || "N/A"}</p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">Address:</span>
                  <p className="text-gray-800">{data?.Address || "N/A"}</p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">
                    Contact Number:
                  </span>
                  <p className="text-gray-800">
                    {data?.ContactNumber || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeIndex === 1 && (
            <div className="mt-6 bg-[#f9f9f9] p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Student Progress</h2>
              {performance.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {performance.map((assessment, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white rounded-lg shadow-md"
                    >
                      <div className="mb-2">
                        <span className="block text-sm text-gray-600">
                          Title:
                        </span>
                        <p className="text-gray-800">{assessment.Title}</p>
                      </div>
                      <div className="mb-2">
                        <span className="block text-sm text-gray-600">
                          Type:
                        </span>
                        <p className="text-gray-800">{assessment.Type}</p>
                      </div>
                      <div>
                        <span className="block text-sm text-gray-600">
                          Score:
                        </span>
                        <p className="text-gray-800">{assessment.Score}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-600">
                  No progress found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BodyAdminViewStudent;
