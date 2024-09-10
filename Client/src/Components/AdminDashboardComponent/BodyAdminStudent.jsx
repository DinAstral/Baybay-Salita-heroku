import { useEffect, useState, useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleInfo,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import axios from "axios";
import "../ContentDasboard/Content.css";
import ContentHeader from "../ContentDasboard/ContentHeader";
import PrintRecord from "../Modals/PrintRecord";
import ViewStudent from "../Modals/AdminModal/ViewStudent";
import AddStudent from "../Modals/AdminModal/AddStudent";
import UpdateStudent from "../Modals/AdminModal/UpdateStudent";
import DeleteStudent from "../Modals/AdminModal/DeleteStudent";

const BodyAdminStudent = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShowPrint, setModalShowPrint] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [modalShowView, setModalShowView] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(10);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Student_List_Report_table",
    sheet: "Students",
  });

  useEffect(() => {
    axios
      .get("/getStudents") // Corrected route
      .then((response) => {
        setStudents(response.data);
        setFilteredRoles(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This function will view Information of your students on each section.
    </Tooltip>
  );

  const generateReport = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Generate report/Print table
    </Tooltip>
  );

  const handlePrintClick = () => {
    setModalShowPrint(true);
  };

  const handleAddClick = () => {
    setModalShow(true);
  };

  const handleViewClick = () => {
    setModalShowView(true);
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setModalShowEdit(true);
  };

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setModalShowDelete(true);
  };

  const handleDeleteSuccess = (deletedStudentId) => {
    setStudents(students.filter((student) => student._id !== deletedStudentId));
    setModalShowDelete(false);
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * usersPerPage;
  const currentUsers = filteredRoles.slice(offset, offset + usersPerPage);

  const handleSectionChange = (e) => {
    const section = e.target.value;
    setSelectedRole(section);
    if (section === "") {
      setFilteredRoles(students);
    } else {
      const filtered = students.filter(
        (student) => student.Section === section
      );
      setFilteredRoles(filtered);
    }
  };

  return (
    <div className="content">
      <ContentHeader />
      <div className="content-body">
        <PrintRecord
          show={modalShowPrint}
          onHide={() => setModalShowPrint(false)}
          print={onDownload}
        />
        <AddStudent show={modalShow} onHide={() => setModalShow(false)} />
        <ViewStudent
          show={modalShowView}
          onHide={() => setModalShowView(false)}
        />
        <UpdateStudent
          show={modalShowEdit}
          student={selectedStudent}
          onHide={() => setModalShowEdit(false)}
        />
        <DeleteStudent
          show={modalShowDelete}
          onHide={() => setModalShowDelete(false)}
          student={selectedStudent}
          onDeleteSuccess={handleDeleteSuccess}
        />
        <div className="content-title-header">
          <div>
            Admin Manage Student
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
                  <Select
                    className="w-[20%]"
                    labelPlacement="outside"
                    label="Sort by Section"
                    variant="bordered"
                    defaultSelectedKeys={[""]}
                    onChange={handleSectionChange}
                    value={selectedRole}
                  >
                    <SelectItem key="">Select Section</SelectItem>
                    <SelectItem key="Aster">Aster</SelectItem>
                    <SelectItem key="Camia">Camia</SelectItem>
                    <SelectItem key="Dahlia">Dahlia</SelectItem>
                    <SelectItem key="Iris">Iris</SelectItem>
                    <SelectItem key="Jasmin">Jasmin</SelectItem>
                    <SelectItem key="Orchid">Orchid</SelectItem>
                    <SelectItem key="Rose">Rose</SelectItem>
                    <SelectItem key="Tulip">Tulip</SelectItem>
                    <SelectItem key="SSC">SSC</SelectItem>
                  </Select>
                  <div className="w-[40%] flex pt-8">
                    <Input
                      type="text"
                      placeholder="Search Student Name"
                      variant="bordered"
                      startContent={
                        <FontAwesomeIcon
                          icon={faSearch}
                          size="1x"
                          inverse
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      }
                    />
                  </div>
                  <div className="back-button-profile">
                    <Button
                      auto
                      color="primary"
                      className=""
                      onClick={() => handleAddClick()}
                    >
                      Add Student
                    </Button>
                  </div>
                </div>
                <div className="card-body scrollable-table scrollable-container">
                  <Table
                    ref={tableRef}
                    removeWrapper
                    color="primary"
                    selectionMode="single"
                  >
                    <TableHeader>
                      <TableColumn>LRN</TableColumn>
                      <TableColumn>First Name</TableColumn>
                      <TableColumn>Last Name</TableColumn>
                      <TableColumn>Age</TableColumn>
                      <TableColumn>Section</TableColumn>
                      <TableColumn>Birthday</TableColumn>
                      <TableColumn>Mother Tongue</TableColumn>
                      <TableColumn>Nationality</TableColumn>
                      <TableColumn>Gender</TableColumn>
                      <TableColumn className="text-center">Actions</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {currentUsers.map((student) => (
                        <TableRow key={student.LRN}>
                          <TableCell>{student.LRN}</TableCell>
                          <TableCell>{student.FirstName}</TableCell>
                          <TableCell>{student.LastName}</TableCell>
                          <TableCell>{student.Age}</TableCell>
                          <TableCell>{student.Section}</TableCell>
                          <TableCell>{student.Birthday}</TableCell>
                          <TableCell>{student.MotherTongue}</TableCell>
                          <TableCell>{student.Nationality}</TableCell>
                          <TableCell>{student.Gender}</TableCell>
                          <TableCell className="text-center">
                            <div className="table-buttons">
                              <Button
                                color="default"
                                onClick={() => handleViewClick()}
                              >
                                View
                              </Button>
                              <Button
                                color="primary"
                                onClick={() => handleEditClick(student)}
                              >
                                Update
                              </Button>
                              <Button
                                color="danger"
                                onClick={() => handleDeleteClick(student)}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={Math.ceil(filteredRoles.length / usersPerPage)}
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
