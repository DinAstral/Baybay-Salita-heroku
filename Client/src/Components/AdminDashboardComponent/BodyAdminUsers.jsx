import { useEffect, useState, useRef } from "react";
import "../ContentDasboard/Content.css";
import ContentHeader from "../ContentDasboard/ContentHeader";
import PrintRecord from "../Modals/PrintRecord";
import AddUser from "../Modals/AdminModal/AddUserModal";
import EditUser from "../Modals/AdminModal/EditUser";
import ViewParent from "../Modals/AdminModal/ViewPaRENT";
import ViewTeacher from "../Modals/AdminModal/ViewTeacher";
import UpdateParent from "../Modals/AdminModal/UpdateParent";
import UpdateTeacher from "../Modals/AdminModal/UpdateTEacher";
import DeleteUser from "../Modals/AdminModal/DeleteUser";
import { useDownloadExcel } from "react-export-table-to-excel";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ReactPaginate from "react-paginate";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleInfo,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";

const BodyAdminUsers = () => {
  const [modalShowUser, setModalShowUser] = useState(false);
  const [modalShowPrint, setModalShowPrint] = useState(false);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowEditTeacher, setModalShowEditTeacher] = useState(false);
  const [modalShowViewTeacher, setModalShowViewTeacher] = useState(false);
  const [modalShowEditParent, setModalShowEditParent] = useState(false);
  const [modalShowViewParent, setModalShowViewParent] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(10);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users table",
    sheet: "Users",
  });

  const fetchUsers = () => {
    axios
      .get("/users")
      .then((response) => {
        setUsers(response.data);
        setFilteredRoles(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This function will view Information of Registered User on the system.
    </Tooltip>
  );

  const generateReport = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Generate report/Print table
    </Tooltip>
  );

  const handleAddUser = () => {
    setModalShowAdd(true);
  };

  const handleEditClick = (user) => {
    setModalShowUser(true);
    setSelectedUser(user);
  };

  const handlePrintClick = () => {
    setModalShowPrint(true);
  };

  const handleEditTeacher = (user) => {
    setSelectedUser(user);
    setModalShowEditTeacher(true);
  };

  const handleViewTeacher = (user) => {
    setSelectedUser(user);
    setModalShowViewTeacher(true);
  };

  const handleEditParent = (user) => {
    setSelectedUser(user);
    setModalShowEditParent(true);
  };

  const handleViewParent = (user) => {
    setSelectedUser(user);
    setModalShowViewParent(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setModalShowDelete(true);
  };

  {
    /* Page Interactions */
  }
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    filterUsers(role, searchQuery);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterUsers(selectedRole, query);
  };

  const filterUsers = (role, query) => {
    let filtered = users;
    if (role && role !== "default") {
      filtered = filtered.filter((user) => user.role === role);
    }
    if (query) {
      filtered = filtered.filter((user) => user.email.includes(query));
    }
    setFilteredRoles(filtered);
  };

  const offset = currentPage * usersPerPage;
  const currentUsers = filteredRoles.slice(offset, offset + usersPerPage);

  return (
    <div className="content">
      <ContentHeader />
      <div className="content-body">
        <AddUser show={modalShowAdd} onHide={() => setModalShowAdd(false)} />
        <EditUser
          show={modalShowUser}
          onHide={() => setModalShowUser(false)}
          user={selectedUser}
        />
        <PrintRecord
          show={modalShowPrint}
          onHide={() => setModalShowPrint(false)}
          print={onDownload}
        />
        {/* Modals Teacher*/}
        <ViewTeacher
          show={modalShowViewTeacher}
          user={selectedUser}
          onHide={() => setModalShowViewTeacher(false)}
        />
        <UpdateTeacher
          show={modalShowEditTeacher}
          user={selectedUser}
          onHide={() => setModalShowEditTeacher(false)}
        />
        {/* Modals Parent*/}
        <ViewParent
          show={modalShowViewParent}
          user={selectedUser}
          onHide={() => setModalShowViewParent(false)}
        />
        <UpdateParent
          show={modalShowEditParent}
          user={selectedUser}
          onHide={() => setModalShowEditParent(false)}
        />
        {/* Modals Delete*/}
        <DeleteUser
          show={modalShowDelete}
          onHide={() => setModalShowDelete(false)}
          user={selectedUser}
          onDeleteSuccess={fetchUsers}
        />
        <div className="content-title-header">
          <div>
            Admin Manage User
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
                    onChange={handleRoleChange}
                    value={selectedRole}
                  >
                    {" "}
                    {/* Filter the table by Role */}
                    <option value="default">Select Role</option>
                    <option value="Parent">Parent</option>
                    <option value="Teacher">Teacher</option>
                  </select>
                  <div className="search-box-table">
                    <FontAwesomeIcon
                      icon={faSearch}
                      size="1x"
                      inverse
                      className="con-icon"
                    />
                    <input
                      type="text"
                      placeholder="Enter User Email"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />{" "}
                    {/* Filter the table by Email Search */}
                  </div>
                  <div className="back-button-profile">
                    <button
                      className="btn-back"
                      onClick={() => handleAddUser()}
                    >
                      Add User
                    </button>
                  </div>
                </div>
                <div className="card-body scrollable-table scrollable-container">
                  {!selectedRole || selectedRole === "default" ? (
                    <Table
                      ref={tableRef}
                      removeWrapper
                      color="primary"
                      selectionMode="single"
                    >
                      <TableHeader emptyContent={"No rows to display."}>
                        <TableColumn>UserID</TableColumn>
                        <TableColumn>Email</TableColumn>
                        <TableColumn>Role</TableColumn>
                        <TableColumn className="text-center">
                          Actions
                        </TableColumn>
                      </TableHeader>
                      <TableBody>
                        {currentUsers.map((user) => (
                          <TableRow key={user._id}>
                            <TableCell>{user.UserID}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell className="text-center">
                              <div className="table-buttons">
                                <Button
                                  color="primary"
                                  onClick={() => handleEditClick(user)}
                                >
                                  Update
                                </Button>
                                <Button
                                  color="danger"
                                  onClick={() => handleDeleteClick(user)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <>
                      {selectedRole === "Parent" && (
                        <Table
                          ref={tableRef}
                          removeWrapper
                          color="primary"
                          selectionMode="single"
                        >
                          <TableHeader emptyContent={"No rows to display."}>
                            <TableColumn>UserID</TableColumn>
                            <TableColumn>First Name</TableColumn>
                            <TableColumn>Last Name</TableColumn>
                            <TableColumn>Name of Student</TableColumn>
                            <TableColumn>LRN of Student</TableColumn>
                            <TableColumn>Email</TableColumn>
                            <TableColumn>Role</TableColumn>
                            <TableColumn className="text-center">
                              Actions
                            </TableColumn>
                          </TableHeader>
                          <TableBody>
                            {currentUsers.map((user) => (
                              <TableRow key={user._id}>
                                <TableCell>{user.UserID}</TableCell>
                                <TableCell>{user.FirstName}</TableCell>
                                <TableCell>{user.LastName}</TableCell>
                                <TableCell>{user.StudentName}</TableCell>
                                <TableCell>{user.LRN}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell className="text-center">
                                  <div className="table-buttons">
                                    <Button
                                      color="default"
                                      onClick={() => handleViewParent(user)}
                                    >
                                      View
                                    </Button>
                                    <Button
                                      color="primary"
                                      onClick={() => handleEditParent(user)}
                                    >
                                      Update
                                    </Button>
                                    <Button
                                      color="danger"
                                      onClick={() => handleDeleteClick(user)}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                      {selectedRole === "Teacher" && (
                        <Table
                          ref={tableRef}
                          removeWrapper
                          color="primary"
                          selectionMode="single"
                        >
                          <TableHeader emptyContent={"No rows to display."}>
                            <TableColumn>TeacherID Number</TableColumn>
                            <TableColumn>First Name</TableColumn>
                            <TableColumn>Last Name</TableColumn>
                            <TableColumn>Department</TableColumn>
                            <TableColumn>Section</TableColumn>
                            <TableColumn>Email</TableColumn>
                            <TableColumn>Role</TableColumn>
                            <TableColumn className="text-center">
                              Actions
                            </TableColumn>
                          </TableHeader>
                          <TableBody>
                            {currentUsers.map((user) => (
                              <TableRow key={user._id}>
                                <TableCell>{user.UserID}</TableCell>
                                <TableCell>{user.FirstName}</TableCell>
                                <TableCell>{user.LastName}</TableCell>
                                <TableCell>{user.Department}</TableCell>
                                <TableCell>{user.Section}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell className="text-center">
                                  <div className="table-buttons">
                                    <Button
                                      color="default"
                                      onClick={() => handleViewTeacher(user)}
                                    >
                                      View
                                    </Button>
                                    <Button
                                      color="primary"
                                      onClick={() => handleEditTeacher(user)}
                                    >
                                      Update
                                    </Button>
                                    <Button
                                      color="danger"
                                      onClick={() => handleDeleteClick(user)}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </>
                  )}
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

export default BodyAdminUsers;
