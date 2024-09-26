import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  Button,
  Tooltip,
  CardHeader,
  CardBody,
  Spinner,
} from "@nextui-org/react";
import { UserContext } from "../../../context/userContext";
import toast from "react-hot-toast";

const BodyFeedbackParentTeacher = () => {
  const { user } = useContext(UserContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [parent, setParent] = useState(null); // Changed to null for clarity
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`getParent/${user.UserID}`)
      .then((response) => {
        setParent(response.data);
        console.log("Parent Data:", response.data); // Debug log
      })
      .catch((err) => {
        toast.error("Failed to load parent data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user.UserID]);

  useEffect(() => {
    const fetchParentAndFeedbacks = async () => {
      try {
        const feedbackResponse = await axios.get(`/getFeedbacks`);
        console.log("Feedback Data:", feedbackResponse.data); // Debug log

        const studentFeedbacks = feedbackResponse.data.filter(
          (feedback) => feedback.LRN === parent.LRN
        );

        setFeedbacks(studentFeedbacks);
        console.log("Filtered Feedbacks:", studentFeedbacks); // Debug log
      } catch (error) {
        toast.error("Failed to load feedbacks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (user && parent && parent.LRN) {
      fetchParentAndFeedbacks();
    }
  }, [user, parent]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="content-body px-9 py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center justify-start gap-2">
          <h1 className="text-3xl font-semibold">Student Information</h1>
          <Tooltip
            showArrow={true}
            content={
              <div className="p-2">
                <div className="text-sm font-bold">View Feedback</div>
                <div className="text-xs">
                  This function allows you to view the teachers's feedback in
                  the assessment.
                </div>
              </div>
            }
          >
            <FontAwesomeIcon icon={faCircleInfo} className="text-gray-600" />
          </Tooltip>
        </div>
      </div>

      <div className="content-container">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <Card key={feedback._id} className="shadow-lg hover:shadow-2xl">
                <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
                  <p className="text-lg uppercase font-bold text-primary">
                    {feedback.Title}
                  </p>
                  <small className="text-default-900">
                    {" "}
                    Assessment Type: {feedback.Type}
                  </small>
                  <h4 className="font-bold text-sm mt-1">
                    Assessment Code: {feedback.ActivityCode}
                  </h4>
                </CardHeader>
                <CardBody className="py-4">
                  <p className="mb-1">
                    <span className="font-semibold text-sm">
                      LRN: {feedback.LRN}
                    </span>{" "}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold text-sm">
                      Date: {feedback.Feedback_Date}
                    </span>{" "}
                  </p>
                  <p>
                    <span className="font-semibold text-sm">
                      Context: {feedback.Context}
                    </span>{" "}
                  </p>
                </CardBody>
                <div className="card-footer flex justify-end px-4 pb-4">
                  <Button size="sm" color="primary" className="w-full">
                    View Details
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-600 font-medium">
              No feedback available for this student.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BodyFeedbackParentTeacher;
