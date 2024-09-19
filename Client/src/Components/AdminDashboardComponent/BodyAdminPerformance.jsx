import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
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
  Tooltip,
} from "@nextui-org/react";
import axios from "axios";
import "../ContentDasboard/Content.css";

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
  const [selectedType, setSelectedType] = useState(""); // New state for type filter

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

  const handleFilterChange = useCallback(
    (e, filterType) => {
      const value = e.target.value;

      if (filterType === "section") {
        setSelectedRole(value);
      } else if (filterType === "type") {
        setSelectedType(value);
      }

      let filtered = performances;

      if (value === "") {
        filtered = performances;
      } else {
        filtered = performances.filter((performance) =>
          filterType === "section"
            ? performance.Section === value
            : performance.Type === value
        );
      }

      if (selectedRole && filterType === "type") {
        filtered = filtered.filter(
          (performance) => performance.Section === selectedRole
        );
      }

      if (selectedType && filterType === "section") {
        filtered = filtered.filter(
          (performance) => performance.Type === selectedType
        );
      }

      setFilteredRoles(filtered);
    },
    [performances, selectedRole, selectedType]
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

  return (
    <div className="px-9">
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
          <Tooltip
            showArrow={true}
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">Performance Table</div>
                <div className="text-tiny">
                  This function will view the performance of your students in
                  each section.
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
              <div className="flex flex-row gap-2 mb-4">
                <Select
                  className="w-[20%]"
                  labelPlacement="outside"
                  label="Sort by Section"
                  variant="bordered"
                  defaultSelectedKeys={[""]}
                  onChange={(e) => handleFilterChange(e, "section")}
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
                  onChange={(e) => handleFilterChange(e, "type")}
                  value={selectedType}
                >
                  <SelectItem key="">Select Type of Assessment:</SelectItem>
                  <SelectItem key="Pagbabaybay">Assessment 1</SelectItem>
                  <SelectItem key="Pantig">Assessment 2</SelectItem>
                  <SelectItem key="Salita">Assessment 3</SelectItem>
                  <SelectItem key="Pagbabasa">Assessment 4</SelectItem>
                </Select>
              </div>
              <div className="card-body scrollable-table scrollable-container">
                <Table
                  ref={tableRef}
                  removeWrapper
                  color="primary"
                  selectionMode="single"
                >
                  <TableHeader>
                    <TableColumn>Input ID</TableColumn>
                    <TableColumn>LRN</TableColumn>
                    <TableColumn>Section</TableColumn>
                    <TableColumn>Activity Code</TableColumn>
                    <TableColumn>Type</TableColumn>
                    <TableColumn>Submitted</TableColumn>
                    <TableColumn className="text-center">Actions</TableColumn>
                  </TableHeader>
                  <TableBody emptyContent={"No rows to display."}>
                    {currentUsers.map((performance) => (
                      <TableRow key={performance._id}>
                        <TableCell>{performance.UserInputId}</TableCell>
                        <TableCell>{performance.LRN}</TableCell>
                        <TableCell>{performance.Section}</TableCell>
                        <TableCell>{performance.ActivityCode}</TableCell>
                        <TableCell>{performance.Type}</TableCell>
                        <TableCell>{performance.Result}</TableCell>
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
  );
};

export default BodyAdminPerformance;
