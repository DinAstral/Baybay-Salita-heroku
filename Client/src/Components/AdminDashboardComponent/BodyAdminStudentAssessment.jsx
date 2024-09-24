import { useState, useEffect, useRef } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Tooltip,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPrint } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../ContentDasboard/Content.css";
import PrintRecord from "../Modals/PrintRecord";
import CreateAssessment from "../Modals/CreateAssessment";
import ImportWord from "../Modals/importWord";
import DeleteAssessment from "../Modals/DeleteAssessment";
import ImportSentence from "../Modals/importSentence";
import ViewAssessment from "../Modals/ViewAssessment";

const BodyAdminStudentAssessment = () => {
  const [show, setShow] = useState(false);
  const [modalShowImport, setModalShowImport] = useState(false);
  const [modalShowView, setModalShowView] = useState(false);
  const [modalShowImportSentence, setModalShowImportSentence] = useState(false);
  const [modalShowPrint, setModalShowPrint] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [modalShowSubmit, setModalShowSubmit] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Student_Assessment_Report_table",
    sheet: "Assessment",
  });

  const refreshActivities = () => {
    axios
      .get("/getAssessments")
      .then((response) => {
        setActivities(response.data);
        setFilteredActivities(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    refreshActivities();
  }, []);

  const handlePrintClick = () => {
    setModalShowPrint(true);
  };

  const handleImportClick = () => {
    setModalShowImport(true);
  };

  const handleImportClickSentence = () => {
    setModalShowImportSentence(true);
  };

  const handleShowSubmit = (activity) => {
    setSelectedActivity(activity);
    setModalShowSubmit(true);
  };

  const handleFilterChange = (e, filterType) => {
    const value = e.target.value;

    if (filterType === "period") {
      setSelectedRole(value);
    } else if (filterType === "type") {
      setSelectedType(value);
    }

    let filtered = activities;

    if (value !== "") {
      filtered = activities.filter((activity) =>
        filterType === "period"
          ? activity.Period === value
          : activity.Type === value
      );
    }

    if (selectedRole && filterType === "type") {
      filtered = filtered.filter(
        (activity) => activity.Period === selectedRole
      );
    }

    if (selectedType && filterType === "period") {
      filtered = filtered.filter((activity) => activity.Type === selectedType);
    }

    setFilteredActivities(filtered);
  };

  return (
    <div className="px-9">
      <PrintRecord
        show={modalShowPrint}
        onHide={() => setModalShowPrint(false)}
        print={onDownload}
      />
      <CreateAssessment
        show={show}
        handleClose={handleClose}
        onSuccess={refreshActivities} // Pass callback to refresh activities on success
      />
      <ImportWord
        show={modalShowImport}
        onHide={() => setModalShowImport(false)}
      />
      <ImportSentence
        show={modalShowImportSentence}
        onHide={() => setModalShowImportSentence(false)}
      />
      <ViewAssessment
        show={modalShowView}
        activity={selectedActivity}
        onHide={() => setModalShowView(false)}
      />
      <DeleteAssessment
        show={modalShowSubmit}
        activity={selectedActivity}
        onHide={() => setModalShowSubmit(false)}
      />
      <div className="content-title-header">
        <div>
          Manage Student Assessment
          <Tooltip
            showArrow={true}
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">Assessment Table</div>
                <div className="text-tiny">
                  This function will view the assessment of the students in each
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
                <div className="flex flex-row gap-5 justify-start w-[100%]">
                  <Select
                    labelPlacement="outside"
                    label="Sort by Grading Period"
                    variant="bordered"
                    className="bg-transparent w-[20%]"
                    onChange={(e) => handleFilterChange(e, "period")}
                    value={selectedRole}
                  >
                    <SelectItem key="">Select Grading Period</SelectItem>
                    <SelectItem key="1">Grading Period 1</SelectItem>
                    <SelectItem key="2">Grading Period 2</SelectItem>
                    <SelectItem key="3">Grading Period 3</SelectItem>
                    <SelectItem key="4">Grading Period 4</SelectItem>
                  </Select>

                  <Select
                    className="w-[20%]"
                    labelPlacement="outside"
                    label="Sort by Type"
                    variant="bordered"
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
                <div className="flex flex-row gap-5 justify-end mt-3">
                  <Button
                    auto
                    onClick={handleImportClickSentence}
                    color="default"
                  >
                    Import Sentence
                  </Button>
                  <Button auto onClick={handleImportClick} color="default">
                    Import Word
                  </Button>
                  <Button auto onClick={handleShow} color="primary">
                    Create Activity
                  </Button>
                </div>
              </div>
              <div className="card-body scrollable-table scrollable-container">
                <Table
                  aria-label="Assessment Table"
                  ref={tableRef}
                  removeWrapper
                  color="primary"
                  selectionMode="single"
                >
                  <TableHeader>
                    <TableColumn>Activity Code</TableColumn>
                    <TableColumn>Grading Period</TableColumn>
                    <TableColumn>Type</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn className="text-center">Actions</TableColumn>
                  </TableHeader>
                  <TableBody emptyContent={"No rows to display."}>
                    {filteredActivities.map((activity) => (
                      <TableRow key={activity._id}>
                        <TableCell>{activity.ActivityCode}</TableCell>
                        <TableCell>{activity.Period}</TableCell>
                        <TableCell>{activity.Type}</TableCell>
                        <TableCell>{activity.Assessment}</TableCell>
                        <TableCell className="text-center">
                          <div className="table-buttons">
                            <Button
                              color="primary"
                              onClick={() => {
                                setSelectedActivity(activity);
                                setModalShowView(true);
                              }}
                            >
                              View
                            </Button>
                            <Button
                              color="danger"
                              onClick={() => {
                                setSelectedActivity(activity);
                                setModalShowSubmit(true);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyAdminStudentAssessment;
