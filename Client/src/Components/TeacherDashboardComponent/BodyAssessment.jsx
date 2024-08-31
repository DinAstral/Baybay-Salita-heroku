import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Tooltip,
  Pagination,
} from "@nextui-org/react";
import { useDownloadExcel } from "react-export-table-to-excel";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Modal, Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPrint } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../ContentDasboard/Content.css";
import toast from "react-hot-toast";
import TeacherContentHeader from "../ContentDasboard/TeacherContentHeader";
import PrintRecord from "../Modals/PrintRecord";
import CreateAssessment from "../Modals/TeacherModal/CreateAssessment";

const CheckAssessment = ({ show, onHide, student }) => (
  <Modal
    show={show}
    onHide={onHide}
    size="sm-down"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Check Assessment Activity
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Are you sure you want to check the students' activity?</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="danger" onClick={onHide}>
        Cancel
      </Button>
      <Link to="/viewScore">
        <Button variant="info">Check</Button>
      </Link>
    </Modal.Footer>
  </Modal>
);

const CancelActivitySuccess = ({ show, onHide }) => (
  <Modal
    show={show}
    onHide={onHide}
    size="sm-down"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Stop Activity Successfully
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>You have stopped the activity for the student successfully.</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

const CancelActivity = ({ show, onHide }) => {
  const [modalSubmitSuccess, setModalSubmitSuccess] = useState(false);

  const handleSubmitSuccess = () => {
    setModalSubmitSuccess(true);
    onHide();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="sm-down"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Stop The Activity
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to stop the current activity?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onHide}>
            Close
          </Button>
          <Button variant="danger" onClick={handleSubmitSuccess}>
            Stop
          </Button>
        </Modal.Footer>
      </Modal>
      <CancelActivitySuccess
        show={modalSubmitSuccess}
        onHide={() => setModalSubmitSuccess(false)}
      />
    </>
  );
};

const UpdateSuccess = ({ show, onHide }) => {
  const handleSuccessClick = () => {
    onHide();
    window.location.reload(); // Refresh the page
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Activity Updated Successfully!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You have updated an activity for your students!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleSuccessClick}>
          Success
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function UpdateAssessment({ show, handleClose, activity }) {
  const [activityType, setActivityType] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState({
    ActivityNumber: "",
    Period: "",
    Type: "",
    Word1: "",
    Word2: "",
    Word3: "",
    Word4: "",
    Word5: "",
    WordFile1: "",
    WordFile2: "",
    WordFile3: "",
    WordFile4: "",
    WordFile5: "",
  });

  useEffect(() => {
    if (activity) {
      setData(activity);
      setActivityType(activity.Type);
    }
  }, [activity]);

  const handleActivityTypeChange = (event) => {
    setActivityType(event.target.value);
  };

  const updateActivity = async (e) => {
    e.preventDefault();
    const { ActivityNumber, Period, Type, Word1, Word2, Word3, Word4, Word5 } =
      data;
    try {
      const response = await axios.post(`/updateAssessment/${id}`, {
        ActivityNumber,
        Period,
        Type,
        Word1,
        Word2,
        Word3,
        Word4,
        Word5,
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({
          ActivityNumber: "",
          Period: "",
          Type: "",
          Word1: "",
          Word2: "",
          Word3: "",
          Word4: "",
          Word5: "",
          WordFile1: "",
          WordFile2: "",
          WordFile3: "",
          WordFile4: "",
          WordFile5: "",
        });
        toast.success("Updated Activity Successfully.");
        setModalShow(true);
        handleClose();
      }
    } catch (error) {
      toast.error("Failed to update an Activity.");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateActivity}>
            <Form.Group className="mb-3" controlId="activityNumber">
              <Form.Label>Activity Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter activity number"
                value={data.ActivityNumber}
                onChange={(e) =>
                  setData({ ...data, ActivityNumber: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="gradePeriod">
              <Form.Label>Grading Period</Form.Label>
              <Form.Select
                aria-label="Select grading period"
                value={data.Period}
                onChange={(e) => setData({ ...data, Period: e.target.value })}
              >
                <option value="">Select Grading Period:</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="activityType">
              <Form.Label>Activity Type</Form.Label>
              <Form.Select
                aria-label="Select activity type"
                value={data.Type}
                onChange={(e) => {
                  setData({ ...data, Type: e.target.value });
                  handleActivityTypeChange(e);
                }}
              >
                <option value="">Select Type of Activity:</option>
                <option value="Word Assessment/Pagbabaybay">
                  Word Assessment/Pagbabaybay
                </option>
                <option value="Reading Assessment">Reading Assessment</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-1" controlId="activityDetails">
              <Form.Label>Activity Details: </Form.Label>
              Please enter your desire words that you want to assess your
              students.
            </Form.Group>
            {activityType === "Word Assessment/Pagbabaybay" && (
              <Row>
                <Col xs={6}>
                  <Form.Group className="mb-3" controlId="word1">
                    <Form.Label>Pagbabaybay 1</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter word 1"
                      value={data.Word1}
                      onChange={(e) =>
                        setData({ ...data, Word1: e.target.value })
                      }
                    />
                    <Form.Control type="file" />
                    <Form.Control type="file" />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group className="mb-3" controlId="word2">
                    <Form.Label>Word 2</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter word 2"
                      value={data.Word2}
                      onChange={(e) =>
                        setData({ ...data, Word2: e.target.value })
                      }
                    />
                    <Form.Control type="file" />
                    <Form.Control type="file" />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group className="mb-3" controlId="word3">
                    <Form.Label>Word 3</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter word 3"
                      value={data.Word3}
                      onChange={(e) =>
                        setData({ ...data, Word3: e.target.value })
                      }
                    />
                    <Form.Control type="file" />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group className="mb-3" controlId="word4">
                    <Form.Label>Word 4</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter word 4"
                      value={data.Word4}
                      onChange={(e) =>
                        setData({ ...data, Word4: e.target.value })
                      }
                    />
                    <Form.Control type="file" />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group className="mb-3" controlId="word5">
                    <Form.Label>Word 5</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter word 5"
                      value={data.Word5}
                      onChange={(e) =>
                        setData({ ...data, Word5: e.target.value })
                      }
                    />
                    <Form.Control type="file" />
                  </Form.Group>
                </Col>
              </Row>
            )}
            {activityType === "Reading Assessment" && (
              <Row>
                <Col xs={6}>
                  <Form.Group className="mb-3" controlId="readingPassage1">
                    <Form.Label>Reading Passage 1</Form.Label>
                    <Form.Control
                      type="textfield"
                      placeholder="Enter word 5"
                      value={data.Word5}
                      onChange={(e) =>
                        setData({ ...data, Word5: e.target.value })
                      }
                    />
                    <Form.Control type="file" />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group className="mb-3" controlId="readingPassage2">
                    <Form.Label>Reading Passage 2</Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group className="mb-3" controlId="readingPassage3">
                    <Form.Label>Reading Passage 3</Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group className="mb-3" controlId="readingPassage4">
                    <Form.Label>Reading Passage 4</Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group className="mb-3" controlId="readingPassage5">
                    <Form.Label>Reading Passage 5</Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>
                </Col>
              </Row>
            )}
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <UpdateSuccess show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

const BodyAssessment = () => {
  const [show, setShow] = useState(false);
  const [modalShowPrint, setModalShowPrint] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [modalShowCheck, setModalShowCheck] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(10);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [modalShowSubmit, setModalShowSubmit] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Student_Assessment_Report_table",
    sheet: "Assessment",
  });

  const refreshActivities = () => {
    axios
      .get("/getAssessments")
      .then((response) => {
        setActivities(response.data);
        setFilteredActivities(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    refreshActivities();
  }, []);

  const handlePrintClick = () => {
    setModalShowPrint(true);
  };

  const handleCheckClick = (activity) => {
    setSelectedActivity(activity);
    setModalShowCheck(true);
  };

  const handleEditClick = (activity) => {
    setSelectedActivity(activity);
    setShowUpdate(true);
  };

  const handleShowSubmit = () => {
    setModalShowSubmit(true);
  };

  const handlePeriodChange = (e) => {
    const period = e.target.value;
    setSelectedPeriod(period);
    if (period === "") {
      setFilteredActivities(activities);
    } else {
      const filtered = activities.filter(
        (activity) => activity.Period === period
      );
      setFilteredActivities(filtered);
    }
  };

  const renderTooltip = (props) => (
    <Tooltip
      content="This function will view the assessment of your students in each section."
      {...props}
    />
  );

  const generateReport = (props) => (
    <Tooltip content="Generate report/Print table" {...props} />
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const offset = currentPage * usersPerPage;
  const currentUsers = filteredActivities.slice(offset, offset + usersPerPage);

  return (
    <div className="content">
      <TeacherContentHeader />
      <div className="content-body">
        <PrintRecord
          show={modalShowPrint}
          onHide={() => setModalShowPrint(false)}
          print={onDownload}
        />
        <CreateAssessment
          show={show}
          handleClose={handleClose}
          onSuccess={refreshActivities} // Pass callback to refresh activities on success
        />
        <CheckAssessment
          show={modalShowCheck}
          onHide={() => setModalShowCheck(false)}
          student={selectedActivity}
        />
        <CancelActivity
          show={modalShowSubmit}
          onHide={() => setModalShowSubmit(false)}
        />
        <div className="content-title-header">
          <div>
            Manage Student Assessment
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
                onClick={handlePrintClick}
              />
            </OverlayTrigger>
          </div>
        </div>
        <div className="content-container">
          <div className="row">
            <div className="col">
              <div className="card mt-1 border-0">
                <div className="list-header-drop-score">
                  <select
                    name=""
                    id=""
                    onChange={handlePeriodChange}
                    value={selectedPeriod}
                  >
                    <option value="">Select Grading Period</option>
                    <option value="1">Grading Period 1</option>
                    <option value="2">Grading Period 2</option>
                    <option value="3">Grading Period 3</option>
                    <option value="4">Grading Period 4</option>
                  </select>
                  <div className="">
                    <Button auto onClick={handleShow}>
                      Create Activity
                    </Button>
                  </div>
                </div>
                <div className="card-body scrollable-table scrollable-container">
                  <Table
                    aria-label="Assessment Table"
                    ref={tableRef}
                    striped
                    bordered
                    shadow={false}
                  >
                    <TableHeader>
                      <TableColumn>Activity Code</TableColumn>
                      <TableColumn>Activity Number</TableColumn>
                      <TableColumn>Grading Period</TableColumn>
                      <TableColumn>Type</TableColumn>
                      <TableColumn>Status</TableColumn>
                      <TableColumn>Word 1</TableColumn>
                      <TableColumn>Word 2</TableColumn>
                      <TableColumn>Word 3</TableColumn>
                      <TableColumn>Word 4</TableColumn>
                      <TableColumn>Word 5</TableColumn>
                      <TableColumn>Actions</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {currentUsers.map((activity) => (
                        <TableRow key={activity._id}>
                          <TableCell>{activity.ActivityCode}</TableCell>
                          <TableCell>{activity.ActivityNumber}</TableCell>
                          <TableCell>{activity.Period}</TableCell>
                          <TableCell>{activity.Type}</TableCell>
                          <TableCell>{activity.Status}</TableCell>
                          <TableCell>{activity.Word1}</TableCell>
                          <TableCell>{activity.Word2}</TableCell>
                          <TableCell>{activity.Word3}</TableCell>
                          <TableCell>{activity.Word4}</TableCell>
                          <TableCell>{activity.Word5}</TableCell>
                          <TableCell>
                            <div className="table-buttons">
                              <Button
                                auto
                                color="default"
                                onClick={() => handleCheckClick(activity)}
                              >
                                Check
                              </Button>
                              <Button
                                auto
                                color="primary"
                                onClick={() => handleEditClick(activity)}
                              >
                                Update
                              </Button>
                              <Button
                                auto
                                color="danger"
                                onClick={handleShowSubmit}
                              >
                                Stop
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UpdateAssessment
        show={showUpdate}
        handleClose={() => setShowUpdate(false)}
        activity={selectedActivity}
      />
    </div>
  );
};

export default BodyAssessment;
