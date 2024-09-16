import React, { useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Table, Button as BootstrapButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faCircleInfo,
  faSearch,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import "../ContentDasboard/Content.css";
import ContentHeader from "../ContentDasboard/ContentHeader";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const lists = [
  {
    ActivityCode: "nbQGlB",
    LRN: "111022233442",
    FirstName: "Marc Alan",
    LastName: "Din",
    Type: "Word",
    Quiz1: "View Record",
    Quiz2: "View Record",
    Quiz3: "View Record",
    Quiz4: "View Record",
    Quiz5: "View Record",
  },
  {
    ActivityCode: "nbQGlB",
    LRN: "111022233442",
    FirstName: "Marc Alan",
    LastName: "Din",
    Type: "Word",
    Quiz1: "View Record",
    Quiz2: "View Record",
    Quiz3: "View Record",
    Quiz4: "View Record",
    Quiz5: "View Record",
  },
  {
    ActivityCode: "nbQGlB",
    LRN: "111022233442",
    FirstName: "Marc Alan",
    LastName: "Din",
    Type: "Word",
    Quiz1: "View Record",
    Quiz2: "View Record",
    Quiz3: "View Record",
    Quiz4: "View Record",
    Quiz5: "View Record",
  },
  {
    ActivityCode: "nbQGlB",
    LRN: "111022233442",
    FirstName: "Marc Alan",
    LastName: "Din",
    Type: "Word",
    Quiz1: "View Record",
    Quiz2: "View Record",
    Quiz3: "View Record",
    Quiz4: "View Record",
    Quiz5: "View Record",
  },
];

const FeedbackModal = ({ show, onHide }) => {
  return (
    <Modal isOpen={show} onOpenChange={onHide}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Feedback</ModalHeader>
            <ModalBody>
              <p>
                Please provide your feedback here. You can also include any
                comments or suggestions for the student's progress.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const BodyViewScore = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This function will view the score of your students on each section.
    </Tooltip>
  );

  const generateReport = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Generate report/Print table
    </Tooltip>
  );

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="content">
      <ContentHeader />
      <div className="content-body">
        <div className="content-title-header">
          <div>
            Manage Student Progress
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <FontAwesomeIcon
                icon={faCircleInfo}
                size="1x"
                className="help-icon"
              />
            </OverlayTrigger>
          </div>
          <div className="generate-report">
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={generateReport}
            >
              <FontAwesomeIcon
                icon={faPrint}
                size="1x"
                className="print-icon"
              />
            </OverlayTrigger>
          </div>
        </div>
        <div className="content-container">
          <div className="row">
            <div className="col">
              <div className="card mt-1 border-0">
                <div className="list-header-drop-score">
                  <div className="search-box-table">
                    <FontAwesomeIcon
                      icon={faSearch}
                      size="1x"
                      inverse
                      className="con-icon"
                    />
                    <input type="text" placeholder="Enter student name" />
                  </div>
                  <div className="back-button-profile">
                    <div
                      className="btn-back"
                      onClick={() => navigate("/viewAssessment")}
                    >
                      Back
                    </div>
                  </div>
                </div>
                <div className="card-body scrollable-table scrollable-container">
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr className="bg-primary text-dark font-weight-bold">
                        <th>Activity Code</th>
                        <th>LRN</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Type of Activity</th>
                        <th>Record 1</th>
                        <th>Record 2</th>
                        <th>Record 3</th>
                        <th>Record 4</th>
                        <th>Record 5</th>
                        <th>Score</th>
                        <th>Feedback</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lists.map((list, index) => (
                        <tr key={index}>
                          <td>{list.ActivityCode}</td>
                          <td>{list.LRN}</td>
                          <td>{list.FirstName}</td>
                          <td>{list.LastName}</td>
                          <td>{list.Type}</td>
                          <td>{list.Quiz1}</td>
                          <td>{list.Quiz2}</td>
                          <td>{list.Quiz3}</td>
                          <td>{list.Quiz4}</td>
                          <td>{list.Quiz5}</td>
                          <td></td>
                          <td></td>
                          <td className="text-center">
                            <div className="table-buttons">
                              <BootstrapButton variant="info">
                                Check
                              </BootstrapButton>
                              <BootstrapButton
                                variant="primary"
                                onClick={handleModalOpen}
                              >
                                Feedback
                              </BootstrapButton>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FeedbackModal show={isModalOpen} onHide={handleModalClose} />
      </div>
    </div>
  );
};

export default BodyViewScore;
