import { useState, useEffect } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";

const BodyAdminViewPerformance = () => {
  const navigate = useNavigate();
  const { UserInputId } = useParams();
  const [data, setData] = useState({
    UserInputId: "",
    LRN: "",
    Section: "",
    ActivityCode: "",
    Type: "",
    PerformanceItems: [],
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

        <div>
          <h2 className="text-xl font-semibold mb-4">Items</h2>
          {data.PerformanceItems.length > 0 ? (
            <ul className="list-none pl-0 space-y-4">
              {data.PerformanceItems.map((item, index) => (
                <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                  <p className="text-gray-800">
                    <strong>Item Code:</strong> {item.ItemCode}
                  </p>
                  <p className="text-gray-800">
                    <strong>Word:</strong> {item.Word || "N/A"}
                  </p>
                  {data.Type === "Pagbabasa" && (
                    <div className="mt-2">
                      <strong>Pagbabasa Specific Content:</strong>
                      {/* Display specific content for Pagbabasa */}
                      <p>
                        {item.PagbabasaSpecificContent ||
                          "No specific content."}
                      </p>
                    </div>
                  )}
                  <p className="text-gray-800">
                    <strong>Image:</strong>
                    {item.Image && (
                      <Tooltip content="View Image">
                        <Button
                          as="a"
                          href={item.Image}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="primary"
                          size="sm"
                          className="ml-2"
                        >
                          View Image
                        </Button>
                      </Tooltip>
                    )}
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

        <div className="mt-6">
          <Button color="primary" onClick={() => navigate(-1)} className="my-4">
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BodyAdminViewPerformance;
