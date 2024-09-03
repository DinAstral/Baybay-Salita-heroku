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
import UpdateStudent from "../Modals/AdminModal/UpdateStudent";
import DeleteStudent from "../Modals/AdminModal/DeleteStudent";

const BodyPerformance = () => {
  const [modalShowPrint, setModalShowPrint] = useState(false);
  const [modalShowEdit, setModalShowFeedback] = useState(false);
  const [modalShowView, setModalShowView] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);

  const [performances, setPerformance] = useState([]);
  const [selectedPerformance, setSelectedPerformance] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(10);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Performance_List_Report_table",
    sheet: "Performance",
  });

  useEffect(() => {
    axios
      .get("/getPerformance")
      .then((response) => {
        setPerformance(response.data);
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

  const handleDeleteClick = (performance) => {
    setSelectedPerformance(performance);
    setModalShowDelete(true);
  };

  const handleDeleteSuccess = (deletedPerformanceId) => {
    setPerformance((prevPerformances) =>
      prevPerformances.filter(
        (performance) => performance._id !== deletedPerformanceId
      )
    );
    setFilteredRoles((prevRoles) =>
      prevRoles.filter(
        (performance) => performance._id !== deletedPerformanceId
      )
    );
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
      setFilteredRoles(performances);
    } else {
      const filtered = performances.filter(
        (performance) => performance.Section === section
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

        <ViewStudent
          show={modalShowView}
          onHide={() => setModalShowView(false)}
        />
        <UpdateStudent
          show={modalShowEdit}
          performance={selectedPerformance}
          onHide={() => setModalShowFeedback(false)}
        />
        <DeleteStudent
          show={modalShowDelete}
          onHide={() => setModalShowDelete(false)}
          performance={selectedPerformance}
          onDeleteSuccess={handleDeleteSuccess}
        />
        <div className="content-title-header">
          <div>
            Admin View Student Performance
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
                    label="Section"
                    variant="bordered"
                    defaultSelectedKeys={["Select Section"]}
                    disabledKeys={["Select Section"]}
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
                  <div className="w-[40%] pt-2 p-2 flex">
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
                      className=""
                    />
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
                      <TableColumn>Section</TableColumn>
                      <TableColumn>Activity Code</TableColumn>
                      <TableColumn>Period</TableColumn>
                      <TableColumn>Type</TableColumn>
                      <TableColumn>Audio1</TableColumn>
                      <TableColumn>Audio2</TableColumn>
                      <TableColumn>Audio3</TableColumn>
                      <TableColumn>Audio4</TableColumn>
                      <TableColumn>Audio5</TableColumn>
                      <TableColumn className="text-center">Actions</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {currentUsers.map((performance) => (
                        <TableRow key={performance.LRN}>
                          <TableCell>{performance.LRN}</TableCell>
                          <TableCell>{performance.Section}</TableCell>
                          <TableCell>{performance.ActivityCode}</TableCell>
                          <TableCell>{performance.Period}</TableCell>
                          <TableCell>{performance.Type}</TableCell>
                          <TableCell>{performance.Audio1}</TableCell>
                          <TableCell>{performance.Audio2}</TableCell>
                          <TableCell>{performance.Audio3}</TableCell>
                          <TableCell>{performance.Audio4}</TableCell>
                          <TableCell>{performance.Audio5}</TableCell>
                          <TableCell className="text-center">
                            <div className="table-buttons">
                              <Button
                                color="danger"
                                onClick={() => setModalShowView(performance)}
                              >
                                View
                              </Button>
                              <Button
                                color="danger"
                                onClick={() =>
                                  setModalShowFeedback(performance)
                                }
                              >
                                Feedback
                              </Button>
                              <Button
                                color="danger"
                                onClick={() => handleDeleteClick(performance)}
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
                    pageRangeDisplayed={5}
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

export default BodyPerformance;
