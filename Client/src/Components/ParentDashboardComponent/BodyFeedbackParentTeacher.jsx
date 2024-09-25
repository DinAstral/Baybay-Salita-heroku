import React, { useState, useEffect } from "react";
import ContentHeader from "../ContentDasboard/ContentHeader";
import profile from "./../../assets/profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faCircleInfo,
  faEnvelope,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Card, Button, Tooltip } from "@nextui-org/react"; // Removed Text from NextUI

// Example feedback data; you can replace this with actual data
const feedbackData = [
  {
    id: 1,
    studentLRN: "123456789",
    title: "Great Progress",
    type: "Assessment 1: Pagbabaybay Tunog at Letra",
    date: "2024-09-15",
    context:
      "The student has shown remarkable improvement in phonetics and letter recognition.",
  },
  {
    id: 2,
    studentLRN: "987654321",
    title: "Needs Improvement",
    type: "Assessment 2: Pantig",
    date: "2024-09-18",
    context:
      "More practice needed in syllable identification. Consider additional exercises.",
  },
];

const BodyFeedbackParentTeacher = () => {
  // State to hold feedback data; replace with real API fetch
  const [feedbacks, setFeedbacks] = useState(feedbackData);

  return (
    <div className="content-body mt-6">
      <div className="content-title-header flex justify-between items-center mb-4">
        <div className="text-2xl font-semibold flex items-center">
          Feedback of the Teacher
          <Tooltip
            content="This function will give feedback to the teacher."
            placement="bottom"
            offset={10}
          >
            <FontAwesomeIcon
              icon={faCircleInfo}
              size="1x"
              className="ml-2 text-blue-600 cursor-pointer"
            />
          </Tooltip>
        </div>
        <FontAwesomeIcon icon={faSearch} size="lg" className="cursor-pointer" />
      </div>

      <div className="content-container">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {feedbacks.map((feedback) => (
            <Card key={feedback.id} className="shadow-lg hover:shadow-2xl p-4">
              <div className="card-header flex flex-col items-start mb-2">
                <h3 className="text-lg font-bold">{feedback.title}</h3>
                <p className="text-sm text-gray-500">{feedback.type}</p>
              </div>
              <div className="card-body mb-4">
                <p className="mb-1">
                  <span className="font-semibold">LRN:</span>{" "}
                  {feedback.studentLRN}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Date:</span> {feedback.date}
                </p>
                <p>{feedback.context}</p>
              </div>
              <div className="card-footer flex justify-end">
                <Button size="sm" color="primary">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BodyFeedbackParentTeacher;
