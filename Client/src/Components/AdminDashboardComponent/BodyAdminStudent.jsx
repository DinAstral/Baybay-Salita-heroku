import { useEffect, useState, useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
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
  Tooltip,
} from "@nextui-org/react";
import axios from "axios";
import "../ContentDasboard/Content.css";
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
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(10);
  const [selectedRole, setSelectedRole] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Added state for search query

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Student_List_Report_table",
    sheet: "Students",
  });

  useEffect(() => {
    axios
      .get("/api/getStudents") // Corrected route
      .then((response) => {
        setStudents(response.data);
        setFilteredRoles(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // Filter students based on search query and selected role
    let filtered = students;

    if (searchQuery) {
      filtered = filtered.filter(
        (student) =>
          student.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.LastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.LRN.includes(searchQuery)
      );
    }

    if (selectedRole) {
      filtered = filtered.filter((student) => student.Section === selectedRole);
    }

    setFilteredRoles(filtered);
  }, [searchQuery, selectedRole, students]);

  const handlePrintClick = () => {
    setModalShowPrint(true);
  };

  const handleAddClick = () => {
    setModalShow(true);
  };

  const handleViewClick = (student) => {
    setSelectedStudent(student);
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
  };

  // Function to get color based on the status
  const getStatusColor = (status) => {
    switch (status) {
      case "Grade Ready Reader":
        return "text-green-600 font-semibold"; // Green with bold text
      case "Transitioning Reader":
        return "text-blue-600 font-semibold"; // Blue with bold text
      case "Developing Reader":
        return "text-orange-600 font-semibold"; // Orange with bold text
      case "Low Emerging Reader":
        return "text-red-600 font-semibold"; // Red with bold text
      case "High Emerging Reader":
        return "text-red-600 font-semibold"; // Red with bold text
      case "Incomplete":
        return "text-gray-600 italic"; // Gray with italic style
      default:
        return "text-black"; // Default color
    }
  };

  return (
    <div className="px-9">
      <PrintRecord
        show={modalShowPrint}
        onHide={() => setModalShowPrint(false)}
        print={onDownload}
      />
      <AddStudent show={modalShow} onHide={() => setModalShow(false)} />
      <ViewStudent
        show={modalShowView}
        onHide={() => setModalShowView(false)}
        student={selectedStudent}
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
          Manage Student
          <Tooltip
            showArrow={true}
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">Student Table</div>
                <div className="text-tiny">
                  This function will view the list of the students in each
                  section.
                </div>
              </div>
            }
          >
            <FontAwesomeIcon
              icon={faCircleInfo}
              size="1x"
              className="help-icon"
            />
          </Tooltip>
        </div>
        <div className="generate-report">
          <Tooltip
            showArrow={true}
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">Print</div>
                <div className="text-tiny">Generate report/Print table</div>
              </div>
            }
          >
            <FontAwesomeIcon
              icon={faPrint}
              size="1x"
              className="print-icon"
              onClick={handlePrintClick}
            />
          </Tooltip>
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
                  label="Section"
                  variant="bordered"
                  defaultSelectedKeys={[""]}
                  onChange={handleSectionChange}
                  aria-label="Filter students by section"
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

                <Select
                  className="w-[20%]"
                  labelPlacement="outside"
                  label="Status"
                  variant="bordered"
                  onChange={(e) => setSelectedRole(e.target.value)} // Add this line to update the selectedRole
                  defaultSelectedKeys={""}
                >
                  <SelectItem key="">All</SelectItem>
                  <SelectItem key="Incomplete">Incomplete</SelectItem>
                  <SelectItem key="Low Emerging Reader">
                    Low Emerging
                  </SelectItem>
                  <SelectItem key="High Emerging Reader">
                    High Emerging
                  </SelectItem>
                  <SelectItem key="Developing Reader">Developing</SelectItem>
                  <SelectItem key="Transitioning Reader">
                    Transitioning
                  </SelectItem>
                  <SelectItem key="Grade Ready Reader">Grade Ready</SelectItem>
                </Select>
                <div className="w-[40%] flex pt-8">
                  <Input
                    type="text"
                    placeholder="Search Student Name or LRN"
                    variant="bordered"
                    startContent={
                      <FontAwesomeIcon
                        icon={faSearch}
                        size="1x"
                        inverse
                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                      />
                    }
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                    <TableColumn>Gender</TableColumn>
                    <TableColumn>Status</TableColumn>{" "}
                    {/* Added Status Column */}
                    <TableColumn className="text-center">Actions</TableColumn>
                  </TableHeader>
                  <TableBody emptyContent={"No rows to display."}>
                    {currentUsers.map((student) => (
                      <TableRow key={student._id}>
                        <TableCell>{student.LRN}</TableCell>
                        <TableCell>{student.FirstName}</TableCell>
                        <TableCell>{student.LastName}</TableCell>
                        <TableCell>{student.Age}</TableCell>
                        <TableCell>{student.Section}</TableCell>
                        <TableCell>{student.Birthday}</TableCell>
                        <TableCell>{student.MotherTongue}</TableCell>
                        <TableCell>{student.Gender}</TableCell>
                        {/* Apply color to the status based on student performance */}
                        <TableCell>
                          {/* Apply color to the status based on student performance */}
                          <span className={getStatusColor(student.status)}>
                            {student.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                            <Button
                              color="default"
                              size="sm"
                              onClick={() => handleViewClick(student)}
                            >
                              View
                            </Button>
                            <Button
                              color="primary"
                              size="sm"
                              onClick={() => handleEditClick(student)}
                            >
                              Update
                            </Button>
                            <Button
                              color="danger"
                              size="sm"
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
  );
};

export default BodyAdminStudent;
