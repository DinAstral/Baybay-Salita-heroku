import React, { useState, useEffect, useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ReactPaginate from "react-paginate";
import { Table, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPrint } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import "../ContentDasboard/Content.css";
import toast from "react-hot-toast";
import ContentHeader from "../ContentDasboard/ContentHeader";

const PrintRecord = ({ show, onHide, print, role }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm-down"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Print User Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          You are now going to generate a excel file of this data. Do you want
          to continue?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="success" onClick={print}>
          Print
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const CheckAssessment = ({ show, onHide, student }) => {
  return (
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
        <Link to="/adminStudentProgress">
          <Button variant="info">Check</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

const BodyAdminStudentAssessment = () => {
  const [modalShowCheck, setModalShowCheck] = useState(false);
  const [modalShowPrint, setModalShowPrint] = useState(false);

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(10);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const handleClose = () => setShow(false);

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Student_Assessment_Report_table",
    sheet: "Assessment",
  });

  useEffect(() => {
    axios
      .get("/getAssessments")
      .then((response) => {
        setActivities(response.data);
        setFilteredActivities(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCheckClick = (activity) => {
    setSelectedActivity(activity);
    setModalShowCheck(true);
  };

  const handlePrintClick = () => {
    setModalShowPrint(true);
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

  {
    /* Page Interactions */
  }
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * usersPerPage;
  const currentUsers = filteredActivities.slice(offset, offset + usersPerPage);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This function will view the assessment of your students in each section.
    </Tooltip>
  );

  const generateReport = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Generate report/Print table
    </Tooltip>
  );

  return (
    <div className="content">
      <ContentHeader />
      <div className="content-body">
        <PrintRecord
          show={modalShowPrint}
          onHide={() => setModalShowPrint(false)}
          print={onDownload}
        />
        <CheckAssessment
          show={modalShowCheck}
          onHide={() => setModalShowCheck(false)}
          student={selectedActivity}
        />
        <div className="content-title-header">
          <div>
            Admin Manage Assessment
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
                </div>
                <div className="card-body scrollable-table scrollable-container">
                  <Table striped bordered hover responsive ref={tableRef}>
                    <thead>
                      <tr className="bg-primary text-dark font-weight-bold">
                        <th className="text-center">Activity Code</th>
                        <th className="text-center">Activity Number</th>
                        <th className="text-center">Grading Period</th>
                        <th className="text-center">Type</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Word 1</th>
                        <th className="text-center">Word 2</th>
                        <th className="text-center">Word 3</th>
                        <th className="text-center">Word 4</th>
                        <th className="text-center">Word 5</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.map((activity) => (
                        <tr key={activity.ActivityCode}>
                          <td className="text-center">
                            {activity.ActivityCode}
                          </td>
                          <td className="text-center">
                            {activity.ActivityNumber}
                          </td>
                          <td className="text-center">{activity.Period}</td>
                          <td className="text-center">{activity.Type}</td>
                          <td className="text-center">{activity.Status}</td>
                          <td className="text-center">{activity.Word1}</td>
                          <td className="text-center">{activity.Word2}</td>
                          <td className="text-center">{activity.Word3}</td>
                          <td className="text-center">{activity.Word4}</td>
                          <td className="text-center">{activity.Word5}</td>
                          <td className="text-center">
                            <div className="table-buttons">
                              <Button
                                variant="info"
                                onClick={() => handleCheckClick()}
                              >
                                Check
                              </Button>
                              <Button variant="danger">Delete</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={Math.ceil(
                      filteredActivities.length / usersPerPage
                    )}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={10}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyAdminStudentAssessment;
