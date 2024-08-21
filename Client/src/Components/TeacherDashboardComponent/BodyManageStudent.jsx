import React, { useEffect, useState, useRef } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import ReactPaginate from 'react-paginate';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCircleInfo, faPrint } from '@fortawesome/free-solid-svg-icons';
import { Table, Modal, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../ContentDasboard/Content.css';
import toast from 'react-hot-toast';
import TeacherContentHeader from '../ContentDasboard/TeacherContentHeader';


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
        <p>You are now going to generate a excel file of this data. Do you want to continue?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Cancel
        </Button>
          <Button variant="success" onClick={print}>Print</Button>
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
  const [modalShowPrint, setModalShowPrint] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [modalShowView, setModalShowView] = useState(false);

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(10);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Student_List_Report_table',
    sheet: 'Student'
})


  const handlePrintClick = () => {
    setModalShowPrint(true);
  };

  useEffect(() => {
    axios
      .get('/getStudents') // Corrected route
      .then((response) => {
        setStudents(response.data);
        setFilteredRoles(response.data);
      }
    )
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
  const currentUsers = filteredRoles.slice(offset, offset + usersPerPage);

  const handleSectionChange = (e) => {
    const section = e.target.value;
    setSelectedRole(section);
    if (section === '') {
      setFilteredRoles(students);
    } else {
      const filtered = students.filter(student => student.Section === section);
      setFilteredRoles(filtered);
    }
  };

  return (
    <div className="content">
      <TeacherContentHeader />
       <div className="content-body">
        <PrintRecord
          show={modalShowPrint}
          onHide={() => setModalShowPrint(false)}
          print= {onDownload}
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
        <FontAwesomeIcon icon={faCircleInfo} size='1x' className="help-icon" />
        </OverlayTrigger>
        </div>
        <div className='generate-report'>
        <OverlayTrigger
         placement="bottom"
         delay={{ show: 250, hide: 400 }}
         overlay={generateReport}
        > 
        <FontAwesomeIcon icon={faPrint} size='1x' className="print-icon" onClick={handlePrintClick}/>
        </OverlayTrigger>
        </div>
        </div>
        <div className="content-container">
          <div className="row">
            <div className="col">
              <div className="card mt-1 border-0">
                <div className="list-header-drop-score">
                 <select name="" id="" onChange={handleSectionChange} value={selectedRole}>
                  <option value="">Select Section</option>
                  <option value="Camia">Camia</option>
                  <option value="Daffodil">Daffodil</option>
                  <option value="Daisy">Daisy</option>
                  <option value="Gumamela">Gumamela</option>
                  <option value="Lily">Lily</option>
                  <option value="Rosal">Rosal</option>
                  <option value="Rose">Rose</option>
                  <option value="Santan">Santan</option>
                  <option value="Speacial">Speacial</option>
                  </select>
                <div className="search-box-table">
                    <FontAwesomeIcon icon={faSearch} size='1x' inverse className="con-icon"/>
                    <input type="text" placeholder='Enter Student Name'/>
                  </div>
                </div>
                <div className="card-body scrollable-table scrollable-container">
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr className="bg-primary text-dark font-weight-bold">
                        <th className="text-center">LRN</th>
                        <th className="text-center">First Name</th>
                        <th className="text-center">Last Name</th>
                        <th className="text-center">Age</th>
                        <th className="text-center">Section</th>
                        <th className="text-center">Birthday</th>
                        <th className="text-center">Mother Tongue</th>
                        <th className="text-center">Nationality</th>
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
                          <td className="text-center">{student.MotherTongue}</td>
                          <td className="text-center">{student.Nationality}</td>
                          <td className="text-center">{student.Gender}</td>
                          <td className="text-center">
                            <div className="table-buttons">
                              <Button variant="info" onClick={() => handleViewClick()}>View</Button>
                              <Button variant="primary" onClick={() => handleEditClick(student)}>Update</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(filteredRoles.length / usersPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={10}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
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
