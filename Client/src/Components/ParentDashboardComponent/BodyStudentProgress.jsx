import React, { useState, useEffect, useContext } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import profile from "./../../assets/profile.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";

const BodyStudentProgress = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { user } = useContext(UserContext);
  const [parent, setParent] = useState([]);

  const [student, setStudent] = useState({
    FirstName: "",
    LastName: "",
    Section: "",
    LRN: "",
    Nationality: "",
    Status: "",
    Gender: "",
    Birthday: "",
    Address: "",
    ContactNumber: "",
  });

  useEffect(() => {
    axios
      .get(`/api/getParent/${user.UserID}`)
      .then((response) => {
        setParent(response.data);
      })
      .catch((err) => {
        setError("Failed to load parent data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user.UserID]);

  useEffect(() => {
    if (parent && parent.LRN) {
      setLoading(true);
      axios
        .get(`/api/getStudentParent/${parent.LRN}`)
        .then((response) => {
          setStudent(response.data);
        })
        .catch((err) => {
          setError("Failed to load student data.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [parent]);

  const toggleActive = (index) => {
    setActiveIndex(index);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-10">
      <div className="flex items-center justify-start gap-2 mb-5">
        <h1 className="text-3xl font-semibold">Student Progress</h1>
        <Tooltip
          showArrow={true}
          content={
            <div className="p-2">
              <div className="text-sm font-bold">View Progress</div>
              <div className="text-xs">
                This function allows you to view the student's progress in the
                system.
              </div>
            </div>
          }
        >
          <FontAwesomeIcon icon={faCircleInfo} className="text-gray-600" />
        </Tooltip>
      </div>

      <div className="w-full max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img src={profile} className="w-32 h-32 rounded-full" alt="Profile" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold">
              {`${student.FirstName} ${student.LastName}`}
            </h2>
            <h4>{`Section: ${student.Section}`}</h4>
            <div className="flex flex-col mt-4 text-gray-700">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faAddressCard}
                  className="text-gray-600"
                />
                <span>Learner Reference Number: {student.LRN}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
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
          </div>

          {/* Content Based on Active Tab */}
          {activeIndex === 0 && (
            <div className="mt-6 bg-[#faf9f4] p-6 rounded-lg shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="block text-sm text-gray-600">
                    First Name:
                  </span>
                  <p className="text-gray-800">{student.FirstName || "N/A"}</p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">
                    Last Name:
                  </span>
                  <p className="text-gray-800">{student.LastName || "N/A"}</p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">
                    Civil Status:
                  </span>
                  <p className="text-gray-800">{student.Status || "N/A"}</p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">Gender:</span>
                  <p className="text-gray-800">{student.Gender || "N/A"}</p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">Birthday:</span>
                  <p className="text-gray-800">{student.Birthday || "N/A"}</p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">Address:</span>
                  <p className="text-gray-800">{student.Address || "N/A"}</p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">
                    Contact Number:
                  </span>
                  <p className="text-gray-800">
                    {student.ContactNumber || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BodyStudentProgress;
