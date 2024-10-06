import { useState, useEffect, useContext } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "../../../context/userContext";

import axios from "axios";
import toast from "react-hot-toast";

// Utility function to convert seconds to MM:SS format
const formatTimeRead = (secondsString) => {
  const seconds = parseInt(secondsString, 10);
  if (isNaN(seconds)) return "Not applicable";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds} min`;
};

const BodyAdminViewPerformance = () => {
  const navigate = useNavigate();
  const [modalShowView, setModalShowView] = useState(false);

  const { user } = useContext(UserContext);

  const { UserInputId } = useParams();
  const [data, setData] = useState({
    UserInputId: "",
    LRN: "",
    Section: "",
    ActivityCode: "",
    Type: "",
    PerformanceItems: [], // For items other than 'Pagbabasa'
    Questions: [], // For 'Pagbabasa' questions
    Score: "", // Student score
    TimeRead: "", // Time the student spent reading (in seconds)
  });

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await axios.get(`/api/getPerformance/${UserInputId}`);
        setData(response.data);
      } catch (err) {
        toast.error(
          "Failed to fetch performance data. Please try again later."
        );
      }
    };

    fetchPerformanceData();
  }, [UserInputId]);

  const handleViewClick = () => {
    setModalShowView(true);
  };

  return (
    <div className="p-10">
      <div className="flex items-center justify-start gap-2 mb-5">
        <h1 className="text-3xl font-semibold">View Performance</h1>
        <Tooltip
          showArrow
          content={
            <div className="p-2">
              <div className="text-sm font-bold">View Student Performance</div>
              <div className="text-xs">
                This section displays the student's performance.
              </div>
            </div>
          }
        >
          <FontAwesomeIcon icon={faCircleInfo} className="text-gray-600" />
        </Tooltip>
      </div>

      <div className="w-full max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Assessment Details</h2>
          <p className="text-gray-700">
            <strong>Activity Code:</strong> {data.ActivityCode || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>LRN:</strong> {data.LRN || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Section:</strong> {data.Section || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Type:</strong> {data.Type || "N/A"}
          </p>
        </div>

        {/* If the assessment type is 'Pagbabasa' */}
        {data.Type === "Pagbabasa" && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Questions and Answers
            </h2>

            {/* Display Score */}
            <p className="text-gray-700">
              <strong>Score:</strong> {data.Score || "N/A"}
            </p>

            {/* Display TimeRead, converted to MM:SS */}
            <p className="text-gray-700">
              <strong>Time Read:</strong> {formatTimeRead(data.TimeRead)}
            </p>

            {data.Questions && data.Questions.length > 0 ? (
              <ul className="list-none pl-0 space-y-4">
                {data.Questions.map((questionObj, index) => (
                  <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                    <p className="text-gray-800">
                      <strong>Question {index + 1}:</strong>{" "}
                      {questionObj.Question || "N/A"}
                    </p>
                    <p className="text-gray-800">
                      <strong>Answer:</strong> {questionObj.Answer || "N/A"}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">
                No questions available for this assessment.
              </p>
            )}
          </div>
        )}

        {/* Items section for non-Pagbabasa assessments */}
        {data.Type !== "Pagbabasa" && (
          <div>
            <h2 className="text-xl font-semibold">Items</h2>
            {data.PerformanceItems && data.PerformanceItems.length > 0 ? (
              <ul className="list-none pl-0 space-y-4">
                {data.PerformanceItems.map((item, index) => (
                  <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                    <p className="text-gray-800">
                      <strong>Item Code:</strong> {item.ItemCode}
                    </p>
                    <p className="text-gray-800">
                      <strong>Word:</strong> {item.Word || "N/A"}
                    </p>
                    <p className="text-gray-800">
                      <strong>User Audio:</strong>
                      {item.UserAudioURL ? (
                        <Tooltip content="Play User Audio">
                          <Button
                            as="a"
                            href={item.UserAudioURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                            size="sm"
                            className="ml-2 my-2"
                          >
                            Play User Audio
                          </Button>
                        </Tooltip>
                      ) : (
                        "No audio uploaded"
                      )}
                    </p>
                    <p className="text-gray-800">
                      <strong>Default Audio:</strong>
                      {item.DefaultAudio && (
                        <Tooltip content="Play Default Audio">
                          <Button
                            as="a"
                            href={item.DefaultAudio}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                            size="sm"
                            className="ml-2 my-2"
                          >
                            Play Default Audio
                          </Button>
                        </Tooltip>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">
                No items available for this assessment.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BodyAdminViewPerformance;
