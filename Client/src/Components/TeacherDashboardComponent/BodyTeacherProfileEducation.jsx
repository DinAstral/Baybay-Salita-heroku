import React, { useState, useEffect, useContext } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import profileImage from "./../../assets/profile.png"; // Changed variable name to avoid conflict
import { Modal, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faCircleInfo,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import ContentHeader from "../ContentDasboard/ContentHeader";
import { UserContext } from "../../../context/userContext";

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

const BodyTeacherProfileEducation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [activeIndex, setActiveIndex] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const menuItem = ["/teacherProfile", "/teacherProfileEduc"];
    const index = menuItem.findIndex((item) => item === location.pathname);
    setActiveIndex(index);
  }, [location.pathname]);

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

  return (
    <div className="content">
      <ContentHeader />
      <div className="content-body">
        <EditUser
          show={modalShow}
          onHide={() => setModalShow(false)}
          userId={user ? user.id : ""}
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
                {user
                  ? `${user.FirstName} ${user.LastName}`
                  : "Name of the Teacher"}
              </h2>
              <h4>
                {user ? `Adviser of ${user.Section}` : "Adviser of Section"}
              </h4>
              <div className="profile-detail-info">
                <div className="profile-number">
                  <FontAwesomeIcon
                    icon={faAddressCard}
                    size="1x"
                    className="profile-icon"
                  />
                  Teacher ID Number:{" "}
                  <b>{user ? `  ${user.UserID}` : "Teacher ID"}</b>
                </div>
                <div className="profile-email">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    size="1x"
                    className="profile-icon"
                  />
                  Email Address:{" "}
                  <b>{user ? `  ${user.email}` : "Email Address"}</b>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-information">
            <div className="profile-nav">
              {[
                { text: "Basic Information", link: "/teacherProfile" },
                { text: "Education Attainment", link: "/teacherProfileEduc" },
                { text: "Update", onClick: handleEditClick }, // Adding onClick directly for update
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
                  <div className="input-profile-text">Highest Education:</div>
                  <input type="text" value={user ? user.Educ : ""} readOnly />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Masteral:</div>
                  <input
                    type="text"
                    value={user ? user.Masteral : ""}
                    readOnly
                  />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Department:</div>
                  <input
                    type="text"
                    value={user ? user.Department : ""}
                    readOnly
                  />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Years of service:</div>
                  <input
                    type="text"
                    value={user ? user.Service : ""}
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

export default BodyTeacherProfileEducation;
