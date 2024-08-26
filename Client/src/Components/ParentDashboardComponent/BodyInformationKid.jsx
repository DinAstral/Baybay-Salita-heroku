/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import ContentHeader from "../ContentDasboard/ContentHeader";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import profile from "./../../assets/profile.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../context/userContext";
import axios from "axios";

const BodyInformationKid = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const { user } = useContext(UserContext);
  const [student, setStudent] = useState({
    FirstName: "",
    LastName: "",
    Section: "",
    LRN: "",
    Nationality: "",
    Status: "",
    Gender: "",
    Birthday: "",
    Address: "",
    ContactNumber: "",
  });
  const [parent, setParent] = useState(null);

  // Set active index based on current location
  useEffect(() => {
    const menuItem = ["/parentKidTab", "/parentStudentProgress"];
    const index = menuItem.findIndex((item) => item === location.pathname);
    setActiveIndex(index);
  }, [location.pathname]);

  // Fetch parent data
  useEffect(() => {
    axios
      .get(`getParent/${user.UserID}`)
      .then((response) => {
        console.log("Parent Response:", response.data);
        setParent(response.data);
      })
      .catch((err) => {
        console.error("Error fetching parent data:", err);
        setError("Failed to load parent data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user.UserID]);

  // Fetch student data once parent data is available
  useEffect(() => {
    if (parent && parent.LRN) {
      setLoading(true);
      axios
        .get(`getStudentParent/${parent.LRN}`)
        .then((response) => {
          console.log("Student Response:", response.data);
          setStudent(response.data);
        })
        .catch((err) => {
          console.error("Error fetching student data:", err);
          setError("Failed to load student data.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [parent]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This function will view your profile.
    </Tooltip>
  );

  const toggleActive = (index) => {
    setActiveIndex(index);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="content">
      <ContentHeader />
      <div className="content-body">
        <div className="content-title-header">
          <div>
            Information of the Student
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
          <div className="Profile-body">
            <img src={profile} alt="Profile" />
            <div className="profile-detail">
              <h2>
                {student.FirstName} {student.LastName}
              </h2>
              <h4>{student.Section}</h4>
              <div className="profile-detail-info">
                <div className="profile-number">
                  <FontAwesomeIcon
                    icon={faAddressCard}
                    size="1x"
                    className="profile-icon"
                  />
                  Learner Reference Number: {student.LRN}
                </div>
              </div>
            </div>
          </div>
          <div className="profile-information">
            <div className="profile-nav">
              {[
                { text: "Basic Information", link: "/parentKidTab" },
                { text: "Student Progress", link: "/parentStudentProgress" },
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
              <div className="profile-deets">
                <div className="input-profile">
                  <div className="input-profile-text">First Name:</div>
                  <input
                    type="text"
                    placeholder={student.FirstName || "Name"}
                    readOnly
                  />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Nationality:</div>
                  <input
                    type="text"
                    placeholder={student.Nationality || "Nationality"}
                    readOnly
                  />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Middle Name:</div>
                  <input
                    type="text"
                    placeholder={student.MiddleName || "Middle Name"}
                    readOnly
                  />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Civil Status:</div>
                  <input
                    type="text"
                    placeholder={student.Status || "Civil Status"}
                    readOnly
                  />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Last Name:</div>
                  <input
                    type="text"
                    placeholder={student.LastName || "Last Name"}
                    readOnly
                  />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Gender:</div>
                  <input
                    type="text"
                    placeholder={student.Gender || "Gender"}
                    readOnly
                  />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Birthday:</div>
                  <input
                    type="text"
                    placeholder={student.Birthday || "Birthday"}
                    readOnly
                  />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Address:</div>
                  <input
                    type="text"
                    placeholder={student.Address || "Address"}
                    readOnly
                  />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Contact Number:</div>
                  <input
                    type="text"
                    placeholder={student.ContactNumber || "Contact Number"}
                    readOnly
                  />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Number of Section:</div>
                  <input
                    type="text"
                    placeholder={student.Section || "Section"}
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

export default BodyInformationKid;
