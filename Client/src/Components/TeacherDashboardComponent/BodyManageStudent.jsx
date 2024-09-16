import React, { useEffect, useState, useRef, useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { useDownloadExcel } from "react-export-table-to-excel";
import ReactPaginate from "react-paginate";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleInfo,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { Table, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../ContentDasboard/Content.css";
import ContentHeader from "../ContentDasboard/ContentHeader";

const PrintRecord = ({ show, onHide, print }) => {
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
          You are now going to generate an Excel file of this data. Do you want
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

const ViewProfile = ({ show, onHide }) => {
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
          View Student Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Do you want to view the profile of the student selected?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Cancel
        </Button>
        <Link to={`/viewStudent`}>
          <Button variant="info">View</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

const EditProfile = ({ show, onHide, student }) => {
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
          Update Student Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to edit this Student's information?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Cancel
        </Button>
        <Link to={`/adminEditStudent/${student?._id}`}>
          <Button variant="primary">Update</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

const BodyAdminStudent = () => {
  const { user } = useContext(UserContext);
  const [modalShowPrint, setModalShowPrint] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [modalShowView, setModalShowView] = useState(false);

  const [students, setStudents] = useState([]);
  const [teacher, setTeacher] = useState({
    Section: "",
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(10);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Student_List_Report_table",
    sheet: "Student",
  });

  const handlePrintClick = () => {
    setModalShowPrint(true);
  };

  // Fetch all students
  useEffect(() => {
    axios
      .get("/getStudents")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Fetch teacher data
  useEffect(() => {
    axios
      .get(`getTeacher/${user.UserID}`) // route to include student ID
      .then((response) => {
        console.log("Response:", response.data); // Log response data
        setTeacher(response.data); // Assuming response.data contains teacher data
      })
      .catch((err) => console.log(err));
  }, [user.UserID]);

  // Filter students by teacher section when both are available
  useEffect(() => {
    if (teacher.Section && students.length > 0) {
      setFilteredStudents(
        students.filter((student) => student.Section === teacher.Section)
      );
    } else {
      setFilteredStudents(students);
    }
  }, [teacher.Section, students]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This function will view information of your students on each section.
    </Tooltip>
  );

  const generateReport = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Generate report/Print table
    </Tooltip>
  );

  const handleViewClick = () => {
    setModalShowView(true);
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setModalShowEdit(true);
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * usersPerPage;
  const currentUsers = filteredStudents.slice(offset, offset + usersPerPage);

  return (
    <div className="content">
      <ContentHeader />
      <div className="content-body">
        <PrintRecord
          show={modalShowPrint}
          onHide={() => setModalShowPrint(false)}
          print={onDownload}
        />
        <ViewProfile
          show={modalShowView}
          onHide={() => setModalShowView(false)}
        />
        <EditProfile
          show={modalShowEdit}
          student={selectedStudent}
          onHide={() => setModalShowEdit(false)}
        />
        <div className="content-title-header">
          <div>
            Manage Student List
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
                  <div className="search-box-table">
                    <FontAwesomeIcon
                      icon={faSearch}
                      size="1x"
                      inverse
                      className="con-icon"
                    />
                    <input type="text" placeholder="Enter Student Name" />
                  </div>
                </div>
                <div className="card-body scrollable-table scrollable-container">
                  <Table striped bordered hover responsive ref={tableRef}>
                    <thead>
                      <tr className="bg-primary text-dark font-weight-bold">
                        <th className="text-center">LRN</th>
                        <th className="text-center">First Name</th>
                        <th className="text-center">Last Name</th>
                        <th className="text-center">Age</th>
                        <th className="text-center">Section</th>
                        <th className="text-center">Birthday</th>
                        <th className="text-center">Mother Tongue</th>
                        <th className="text-center">Gender</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.map((student) => (
                        <tr key={student.LRN}>
                          <td className="text-center">{student.LRN}</td>
                          <td className="text-center">{student.FirstName}</td>
                          <td className="text-center">{student.LastName}</td>
                          <td className="text-center">{student.Age}</td>
                          <td className="text-center">{student.Section}</td>
                          <td className="text-center">{student.Birthday}</td>
                          <td className="text-center">
                            {student.MotherTongue}
                          </td>
                          <td className="text-center">{student.Gender}</td>
                          <td className="text-center">
                            <div className="table-buttons">
                              <Button variant="info" onClick={handleViewClick}>
                                View
                              </Button>
                              <Button
                                variant="primary"
                                onClick={() => handleEditClick(student)}
                              >
                                Update
                              </Button>
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
                      filteredStudents.length / usersPerPage
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

export default BodyAdminStudent;
