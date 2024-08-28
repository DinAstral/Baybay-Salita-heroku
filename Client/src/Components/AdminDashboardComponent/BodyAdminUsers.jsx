import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useDownloadExcel } from "react-export-table-to-excel";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleInfo,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "../ContentDasboard/Content.css";
import { Link } from "react-router-dom";
import AdminContentHeader from "../ContentDasboard/AdminContentHeader";

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

const AddUser = ({ show, onHide }) => {
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
          Add User Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Do you want to add a user?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Cancel
        </Button>
        <Link to={`/adminAddUser`}>
          <Button variant="success">Add</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

const EditUser = ({ show, onHide, user }) => {
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
          Add User Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          You are now going to update the selected user. Do you wish to
          continue?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Cancel
        </Button>
        <Link to={`/AdminEditUser/${user?._id}`}>
          <Button variant="primary">Update</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

const ViewParent = ({ show, onHide, user }) => {
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
          View Super Teacher Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Do you want to View the profile of Parent selected?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Cancel
        </Button>
        <Link to={`/adminViewParent/${user?._id}`}>
          <Button variant="info">View</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

const EditParent = ({ show, onHide, user }) => {
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
          Edit Parent Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to edit this parent's information?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Cancel
        </Button>
        <Link to={`/adminEditParent/${user?._id}`}>
          <Button variant="primary">Update</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

const ViewTeacher = ({ show, onHide, user }) => {
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
          View Super Teacher Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Do you want to View the profile of Teacher selected?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Cancel
        </Button>
        <Link to={`/adminViewTeacher/${user?._id}`}>
          <Button variant="info">View</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

const EditTeacher = ({ show, onHide, user }) => {
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
          Update Teacher Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to edit this Teacher's information?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Cancel
        </Button>
        <Link to={`/adminEditTeacher/${user?._id}`}>
          <Button variant="primary">Update</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

const DeleteSuccess = ({ show, onHide }) => (
  <Modal
    show={show}
    onHide={onHide}
    size="sm-down"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Delete User Successful
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>You have deleted the User information.</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

const DeleteUser = ({ show, onHide, user, onDeleteSuccess }) => {
  const [modalDeleteSuccess, setModalDeleteSuccess] = useState(false);

  const deleteUser = async () => {
    try {
      await axios.delete(`/deleteUser/${user.email}`);
      setModalDeleteSuccess(true);
      onDeleteSuccess();
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user. Please try again later.");
    }
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
            Delete User Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this User's information?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <DeleteSuccess
        show={modalDeleteSuccess}
        onHide={() => {
          setModalDeleteSuccess(false);
          onHide();
        }}
      />
    </>
  );
};

const BodyAdminUsers = () => {
  const [modalShow, setModalShow] = useState(false);
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
    setModalShow(true);
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
      <AdminContentHeader />
      <div className="content-body">
        <AddUser show={modalShowAdd} onHide={() => setModalShowAdd(false)} />
        <EditUser
          show={modalShow}
          onHide={() => setModalShow(false)}
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
        <EditTeacher
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
        <EditParent
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
                      <TableHeader>
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
                                  variant="primary"
                                  onClick={() => handleEditClick(user)}
                                >
                                  Update
                                </Button>
                                <Button
                                  variant="danger"
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
                          <TableHeader>
                            <TableColumn>UserID</TableColumn>
                            <TableColumn>First Name</TableColumn>
                            <TableColumn>Last Name</TableColumn>
                            <TableColumn>Age</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Gender</TableColumn>
                            <TableColumn>Contact Number</TableColumn>
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
                                <TableCell>{user.Age}</TableCell>
                                <TableCell>{user.Status}</TableCell>
                                <TableCell>{user.Gender}</TableCell>
                                <TableCell>{user.ContactNumber}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell className="text-center">
                                  <div className="table-buttons">
                                    <Button
                                      variant="info"
                                      onClick={() => handleViewParent(user)}
                                    >
                                      View
                                    </Button>
                                    <Button
                                      variant="primary"
                                      onClick={() => handleEditParent(user)}
                                    >
                                      Update
                                    </Button>
                                    <Button
                                      variant="danger"
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
                          <TableHeader>
                            <TableColumn>TeacherID Number</TableColumn>
                            <TableColumn>First Name</TableColumn>
                            <TableColumn>Last Name</TableColumn>
                            <TableColumn>Age</TableColumn>
                            <TableColumn>Department</TableColumn>
                            <TableColumn>Section</TableColumn>
                            <TableColumn>Gender</TableColumn>
                            <TableColumn>Contact Number</TableColumn>
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
                                <TableCell>{user.Age}</TableCell>
                                <TableCell>{user.Department}</TableCell>
                                <TableCell>{user.Section}</TableCell>
                                <TableCell>{user.Gender}</TableCell>
                                <TableCell>{user.ContactNumber}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell className="text-center">
                                  <div className="table-buttons">
                                    <Button
                                      variant="info"
                                      onClick={() => handleViewTeacher(user)}
                                    >
                                      View
                                    </Button>
                                    <Button
                                      variant="primary"
                                      onClick={() => handleEditTeacher(user)}
                                    >
                                      Update
                                    </Button>
                                    <Button
                                      variant="danger"
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
