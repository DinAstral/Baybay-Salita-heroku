import { useState, useEffect, useContext } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import profileImage from "./../../assets/profile.png";
import { Modal, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faCircleInfo,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import TeacherContentHeader from "../ContentDasboard/TeacherContentHeader";
import { UserContext } from "../../../context/userContext";
import axios from "axios";

const EditUser = ({ show, onHide, userId }) => {
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
          Update User Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          You are now going to update your profile. Do you wish to continue?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Cancel
        </Button>
        <Link to={`/teacherUpdateProfile/${userId}`}>
          <Button variant="primary">Update</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

const BodyTeacherProfileBasic = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [teacher, setTeacher] = useState({
    FirstName: "",
    LastName: "",
    Section: "",
    UserID: "",
    email: "",
    Nationality: "",
    Status: "",
    Gender: "",
    Birthday: "",
    Address: "",
    ContactNumber: "",
  });
  const [activeIndex, setActiveIndex] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const menuItem = ["/teacherProfile", "/teacherProfileEduc"];
    const index = menuItem.findIndex((item) => item === location.pathname);
    setActiveIndex(index);
  }, [location.pathname]);

  useEffect(() => {
    axios
      .get(`getTeacher/${user.UserID}`)
      .then((response) => {
        console.log("Response:", response.data);
        setTeacher(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching teacher data:", err);
        setError("Failed to load teacher data.");
        setLoading(false);
      });
  }, [user.UserID]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This function will view your profile.
    </Tooltip>
  );

  const toggleActive = (index) => {
    setActiveIndex(index);
  };

  const handleEditClick = () => {
    setModalShow(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="content">
      <TeacherContentHeader />
      <div className="content-body">
        <EditUser
          show={modalShow}
          onHide={() => setModalShow(false)}
          userId={teacher ? teacher._id : ""}
        />
        <div className="content-title-header">
          <div>
            Teacher Profile
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
        </div>
        <div className="content-container">
          <div className="back-button-profile">
            <button className="btn-back" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
          <div className="Profile-body">
            <img src={profileImage} alt="Profile" />
            <div className="profile-detail">
              <h2>
                {teacher.FirstName && teacher.LastName
                  ? `${teacher.FirstName} ${teacher.LastName}`
                  : "Name of the Teacher"}
              </h2>
              <h4>
                {teacher.Section
                  ? `Adviser of ${teacher.Section}`
                  : "Adviser of Section"}
              </h4>
              <div className="profile-detail-info">
                <div className="profile-number">
                  <FontAwesomeIcon
                    icon={faAddressCard}
                    size="1x"
                    className="profile-icon"
                  />
                  Teacher ID Number:{" "}
                  <b>{teacher.UserID ? `  ${teacher.UserID}` : "Teacher ID"}</b>
                </div>
                <div className="profile-email">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    size="1x"
                    className="profile-icon"
                  />
                  Email Address:{" "}
                  <b>
                    {teacher.email ? `  ${teacher.email}` : "Email Address"}
                  </b>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-information">
            <div className="profile-nav">
              {[
                { text: "Basic Information", link: "/teacherProfile" },
                { text: "Education Attainment", link: "/teacherProfileEduc" },
                { text: "Update", onClick: handleEditClick },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className={`profile-nav-item ${
                    index === activeIndex ? "active" : ""
                  }`}
                  onClick={item.onClick || (() => toggleActive(index))}
                >
                  <div>{item.text}</div>
                </Link>
              ))}
            </div>
            <div className="profile-info-details">
              <div className="profile-deets">
                <div className="input-profile">
                  <div className="input-profile-text">First Name:</div>
                  <input type="text" value={teacher.FirstName || ""} readOnly />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Nationality:</div>
                  <input
                    type="text"
                    value={teacher.Nationality || ""}
                    readOnly
                  />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Civil Status:</div>
                  <input type="text" value={teacher.Status || ""} readOnly />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Last Name:</div>
                  <input type="text" value={teacher.LastName || ""} readOnly />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Gender:</div>
                  <input type="text" value={teacher.Gender || ""} readOnly />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Birthday:</div>
                  <input type="date" value={teacher.Birthday || ""} readOnly />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Address:</div>
                  <input type="text" value={teacher.Address || ""} readOnly />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Contact Number:</div>
                  <input
                    type="text"
                    value={teacher.ContactNumber || ""}
                    readOnly
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

export default BodyTeacherProfileBasic;
