import { useEffect, useState, useRef, useMemo } from "react";
import "../ContentDasboard/Content.css";
import ContentHeader from "../ContentDasboard/ContentHeader";
import PrintRecord from "../Modals/PrintRecord";
import AddUser from "../Modals/AdminModal/AddUserModal";
import EditUser from "../Modals/AdminModal/EditUser";
import ViewParent from "../Modals/AdminModal/ViewParent";
import ViewTeacher from "../Modals/AdminModal/ViewTeacher";
import UpdateParent from "../Modals/AdminModal/UpdateParent";
import UpdateTeacher from "../Modals/AdminModal/UpdateTeacher";
import DeleteUser from "../Modals/AdminModal/DeleteUser";
import { useDownloadExcel } from "react-export-table-to-excel";
import { Tooltip } from "@nextui-org/react";
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
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleInfo,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";

const BodyAdminUsers = () => {
  const [modalState, setModalState] = useState({
    add: false,
    print: false,
    editUser: false,
    editTeacher: false,
    viewTeacher: false,
    editParent: false,
    viewParent: false,
    delete: false,
  });
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("default");

  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users table",
    sheet: "Users",
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    let filtered = users;
    if (selectedRole !== "default") {
      filtered = filtered.filter((user) => user.role === selectedRole);
    }
    if (searchQuery) {
      filtered = filtered.filter((user) =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [users, selectedRole, searchQuery]);

  const currentUsers = useMemo(() => {
    const offset = currentPage * usersPerPage;
    return filteredUsers.slice(offset, offset + usersPerPage);
  }, [currentPage, usersPerPage, filteredUsers]);

  const handleModalStateChange = (modalType, value) => {
    setModalState((prev) => ({ ...prev, [modalType]: value }));
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="content">
      <ContentHeader />
      <div className="content-body">
        <AddUser
          show={modalState.add}
          onHide={() => handleModalStateChange("add", false)}
        />
        <EditUser
          show={modalState.editUser}
          onHide={() => handleModalStateChange("editUser", false)}
          user={selectedUser}
        />
        <PrintRecord
          show={modalState.print}
          onHide={() => handleModalStateChange("print", false)}
          print={onDownload}
        />
        <ViewTeacher
          show={modalState.viewTeacher}
          user={selectedUser}
          onHide={() => handleModalStateChange("viewTeacher", false)}
        />
        <UpdateTeacher
          show={modalState.editTeacher}
          user={selectedUser}
          onHide={() => handleModalStateChange("editTeacher", false)}
        />
        <ViewParent
          show={modalState.viewParent}
          user={selectedUser}
          onHide={() => handleModalStateChange("viewParent", false)}
        />
        <UpdateParent
          show={modalState.editParent}
          user={selectedUser}
          onHide={() => handleModalStateChange("editParent", false)}
        />
        <DeleteUser
          show={modalState.delete}
          onHide={() => handleModalStateChange("delete", false)}
          user={selectedUser}
          onDeleteSuccess={fetchUsers}
        />

        <div className="content-title-header">
          <div>
            Admin Manage User
            <Tooltip
              content={
                <div className="px-1 py-2">
                  <div className="text-small font-bold">User Table</div>
                  <div className="text-tiny">
                    This function will view the information of the students in
                    the system.
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
                onClick={() => handleModalStateChange("print", true)}
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
                    labelPlacement="outside"
                    label="Sort by Role"
                    variant="bordered"
                    defaultSelectedKeys={[""]}
                    className="bg-transparent w-[20%]"
                    onChange={(e) => setSelectedRole(e.target.value)}
                    value={selectedRole}
                  >
                    <SelectItem key="">Select Role</SelectItem>
                    <SelectItem key="Parent">Parent</SelectItem>
                    <SelectItem key="Teacher">Teacher</SelectItem>
                  </Select>
                  <div className="w-[40%] flex pt-8">
                    <Input
                      variant="bordered"
                      type="text"
                      placeholder="Enter User Email"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
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
                      onClick={() => handleModalStateChange("add", true)}
                    >
                      Add User
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
                    <TableHeader emptyContent={"No rows to display."}>
                      <TableColumn>UserID</TableColumn>
                      <TableColumn>Email</TableColumn>
                      <TableColumn>Role</TableColumn>
                      <TableColumn className="text-center">Actions</TableColumn>
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
                                onClick={() =>
                                  setSelectedUser(user) ||
                                  handleModalStateChange("editUser", true)
                                }
                              >
                                Update
                              </Button>
                              <Button
                                color="danger"
                                onClick={() =>
                                  setSelectedUser(user) ||
                                  handleModalStateChange("delete", true)
                                }
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
                    pageCount={Math.ceil(filteredUsers.length / usersPerPage)}
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
