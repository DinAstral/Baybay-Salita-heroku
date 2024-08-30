import React, { useState, useEffect } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import profile from "./../../assets/profile.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faCircleInfo,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";
import ContentHeader from "../ContentDasboard/ContentHeader";

const BodyAdminViewParent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const { id } = useParams();

  const [data, setData] = useState({
    _id: "",
    FirstName: "",
    LastName: "",
    Age: "",
    Birthday: "",
    Gender: "",
    Address: "",
    Status: "",
    Nationality: "",
    ContactNumber: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get(`getUser/${id}`) // route to include student ID
      .then((response) => {
        console.log("Response:", response.data); // Log response data
        setData(response.data); // Assuming response.data contains student data
      })
      .catch((err) => {
        console.error("Error fetching student data:", err);
        toast.error("Failed to fetch student data. Please try again later.");
      });
  }, [id]);

  useEffect(() => {
    const menuItem = [`/adminViewParent/${data?._id}`];
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

  return (
    <div className="content">
      <ContentHeader />
      <div className="content-body">
        <div className="content-title-header">
          <div>
            View Parent Profile
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
            <img src={profile}></img>
            <div className="profile-detail">
              <h2>
                {data
                  ? `${data.FirstName} ${data.LastName}`
                  : "Name of the Admin"}
              </h2>
              <div className="profile-detail-info">
                <div className="profile-number">
                  <FontAwesomeIcon
                    icon={faAddressCard}
                    size="1x"
                    className="profile-icon"
                  />
                  Contact Number: {`${data.ContactNumber}`}
                </div>
                <div className="profile-email">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    size="1x"
                    className="profile-icon"
                  />
                  Email Address: {`${data.email}`}
                </div>
              </div>
            </div>
          </div>
          <div className="profile-information">
            <div className="profile-nav">
              {[
                {
                  text: "Basic Information",
                  link: `/adminViewParent/${data?._id}`,
                },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className={`profile-nav-item ${
                    index === activeIndex ? "active" : ""
                  }`}
                >
                  <div onClick={() => toggleActive(index)}>{item.text}</div>
                </Link>
              ))}
            </div>
            <div className="profile-info-details">
              <div className="input-profile">
                <div className="input-profile-text">First Name:</div>
                <input type="text" value={data.FirstName} readOnly />
              </div>
              <div className="input-profile">
                <div className="input-profile-text">Civil Status:</div>
                <input type="text" value={data.Status} readOnly />
              </div>
              <div className="input-profile">
                <div className="input-profile-text">Last Name:</div>
                <input type="text" value={data.LastName} readOnly />
              </div>
              <div className="input-profile">
                <div className="input-profile-text">Age: </div>
                <input type="text" value={data.Age} readOnly />
              </div>
              <div className="input-profile">
                <div className="input-profile-text">Nationality: </div>
                <input type="text" value={data.Nationality} readOnly />
              </div>
              <div className="input-profile">
                <div className="input-profile-text">Gender:</div>
                <input type="text" value={data.Gender} readOnly />
              </div>
              <div className="input-profile">
                <div className="input-profile-text">Birthday:</div>
                <input type="text" value={data.Birthday} readOnly />
              </div>
              <div className="input-profile">
                <div className="input-profile-text">Address:</div>
                <input type="text" value={data.Address} readOnly />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyAdminViewParent;
