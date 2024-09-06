import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPrint } from "@fortawesome/free-solid-svg-icons";
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
} from "@nextui-org/react";
import axios from "axios";
import "../ContentDasboard/Content.css";
import ContentHeader from "../ContentDasboard/ContentHeader";
import PrintRecord from "../Modals/PrintRecord";
import ViewStudent from "../Modals/AdminModal/ViewStudent";
import UpdateStudent from "../Modals/AdminModal/UpdateStudent";
import DeleteStudent from "../Modals/AdminModal/DeleteStudent";

const BodyAdminPerformance = () => {
  const [modalShowPrint, setModalShowPrint] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
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
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/getPerformance");
        setPerformance(data);
        setFilteredRoles(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handlePageClick = useCallback((event) => {
    setCurrentPage(event.selected);
  }, []);

  const handleSectionChange = useCallback(
    (e) => {
      const section = e.target.value;
      setSelectedRole(section);

      if (section === "") {
        setFilteredRoles(performances);
      } else {
        setFilteredRoles(
          performances.filter((performance) => performance.Section === section)
        );
      }
    },
    [performances]
  );

  const handlePrintClick = useCallback(() => {
    setModalShowPrint(true);
  }, []);

  const handleDeleteClick = useCallback((performance) => {
    setSelectedPerformance(performance);
    setModalShowDelete(true);
  }, []);

  const handleDeleteSuccess = useCallback((deletedPerformanceId) => {
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
  }, []);

  const currentUsers = useMemo(() => {
    const offset = currentPage * usersPerPage;
    return filteredRoles.slice(offset, offset + usersPerPage);
  }, [filteredRoles, currentPage, usersPerPage]);

  const pageCount = useMemo(() => {
    return Math.ceil(filteredRoles.length / usersPerPage);
  }, [filteredRoles.length, usersPerPage]);

  const renderTooltip = useCallback(
    (props) => (
      <Tooltip id="button-tooltip" {...props}>
        This function will view Information of your students on each section.
      </Tooltip>
    ),
    []
  );

  const generateReport = useCallback(
    (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Generate report/Print table
      </Tooltip>
    ),
    []
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

        <ViewStudent
          show={modalShowView}
          onHide={() => setModalShowView(false)}
        />
        <UpdateStudent
          show={modalShowEdit}
          student={selectedPerformance}
          onHide={() => setModalShowEdit(false)}
        />
        <DeleteStudent
          show={modalShowDelete}
          onHide={() => setModalShowDelete(false)}
          student={selectedPerformance}
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
                <div className="flex flex-row gap-2 mb-4">
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

                  <Select
                    className="w-[20%]"
                    labelPlacement="outside"
                    label="Sort by Grading Period"
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

                  <Select
                    className="w-[20%]"
                    labelPlacement="outside"
                    label="Sort by Type"
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
                </div>
                <div className="card-body scrollable-table scrollable-container">
                  <Table
                    ref={tableRef}
                    removeWrapper
                    color="primary"
                    selectionMode="single"
                  >
                    <TableHeader emptyContent={"No rows to display."}>
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
                                color="default"
                                onClick={() => handleDeleteClick(performance)}
                              >
                                View
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
                    pageCount={pageCount}
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

export default BodyAdminPerformance;
