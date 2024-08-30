import React, { useState, useEffect, useContext } from "react";
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
import { UserContext } from "../../../context/userContext";
import ContentHeader from "../ContentDasboard/ContentHeader";

const EditUser = ({ show, onHide, profile }) => {
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
        <Link to={`/AdminEditProfile/${profile}`}>
          <Button variant="primary">Update</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

const BodyAdminProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const { user } = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const menuItem = ["/adminProfile"];
    const index = menuItem.findIndex((item) => item === location.pathname);
    setActiveIndex(index);
  }, [location.pathname]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This function will view your profile.
    </Tooltip>
  );

  const handleEditClick = () => {
    setModalShow(true);
  };

  const toggleActive = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="content">
      <ContentHeader />
      <div className="content-body">
        <EditUser
          show={modalShow}
          onHide={() => setModalShow(false)}
          profile={user ? `${user.id}` : ""}
        />
        <div className="content-title-header">
          <div>
            Admin Profile
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
                  : "Name of the Admin"}
              </h2>
              <h4>{user ? user.role : "Position"}</h4>
              <div className="profile-detail-info">
                <div className="profile-number">
                  <FontAwesomeIcon
                    icon={faAddressCard}
                    size="1x"
                    className="profile-icon"
                  />
                  Admin ID Number:{" "}
                  <b>{user ? `  ${user.UserID}` : "Admin ID"}</b>
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
                { text: "Basic Information", link: "/adminProfile" },
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
                  <div className="input-profile-text">First Name:</div>
                  <input
                    type="text"
                    value={user ? user.FirstName : ""}
                    readOnly
                  />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Nationality:</div>
                  <input
                    type="text"
                    value={user ? user.Nationality : ""}
                    readOnly
                  />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Middle Name:</div>
                  <input
                    type="text"
                    value={user ? user.MiddleName : ""}
                    readOnly
                  />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Civil Status:</div>
                  <input type="text" value={user ? user.Status : ""} readOnly />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Last Name:</div>
                  <input
                    type="text"
                    value={user ? user.LastName : ""}
                    readOnly
                  />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Gender:</div>
                  <input type="text" value={user ? user.Gender : ""} readOnly />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Birthday:</div>
                  <input
                    type="date"
                    value={user ? user.Birthday : ""}
                    readOnly
                  />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Address:</div>
                  <input
                    type="text"
                    value={user ? user.Address : ""}
                    readOnly
                  />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Contact Number:</div>
                  <input
                    type="text"
                    value={user ? user.ContactNumber : ""}
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

export default BodyAdminProfile;
