import { useState, useEffect } from "react";
import { Tooltip } from "@nextui-org/react";
import profile from "./../../assets/profile.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faCircleInfo,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import ContentHeader from "../ContentDasboard/ContentHeader";

const BodyAdminViewTeacher = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const [showEducationDetails, setShowEducationDetails] = useState(false);
  const { id } = useParams();

  const [data, setData] = useState({
    _id: "",
    UserID: "",
    FirstName: "",
    LastName: "",
    Section: "",
    Department: "",
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
    const menuItem = [`/adminViewTeacher/${data?._id}`];
    const index = menuItem.findIndex((item) => item === location.pathname);
    setActiveIndex(index);
    setShowEducationDetails(index === 1);
  }, [location.pathname]);

  const toggleActive = (index) => {
    setActiveIndex(index);
    setShowEducationDetails(index === 1);
  };

  return (
    <div className="content">
      <ContentHeader />
      <div className="content-body">
        <div className="content-title-header">
          <div>
            View Teacher Profile
            <Tooltip
              content={
                <div className="px-1 py-2">
                  <div className="text-small font-bold">View Information</div>
                  <div className="text-tiny">
                    This function will view the information of the selected
                    teacher in the system.
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
        </div>
        <div className="content-container">
          <div className="back-button-profile">
            <button className="btn-back" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
          <div className="Profile-body">
            <img src={profile} alt="Profile" />
            <div className="profile-detail">
              <h2>
                {data
                  ? `Teacher ${data.FirstName} ${data.LastName}`
                  : "Name of the Teacher"}
              </h2>
              <h4>{data ? `Section ${data.Section}` : "Teacher of section"}</h4>
              <div className="profile-detail-info">
                <div className="profile-number">
                  <FontAwesomeIcon
                    icon={faAddressCard}
                    size="1x"
                    className="profile-icon"
                  />
                  Teacher ID Number: {`${data.UserID}`}
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
                  link: `/adminViewTeacher/${data?._id}`,
                },
                {
                  text: "Education Attainment",
                  link: `/adminViewTeacher/${data?._id}`,
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
                <div className="input-profile-text">Nationality:</div>
                <input type="text" value={data.Nationality} readOnly />
              </div>
              <div className="input-profile">
                <div className="input-profile-text">Middle Name:</div>
                <input type="text" value={data.MiddleName} readOnly />
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
              <div className="input-profile">
                <div className="input-profile-text">Contact Number:</div>
                <input type="text" value={data.Gender} readOnly />
              </div>
            </div>
            {showEducationDetails && (
              <div className="profile-info-details">
                <div className="input-profile">
                  <div className="input-profile-text">Highest Education:</div>
                  <input type="text" placeholder="Name" />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Masteral:</div>
                  <input type="text" placeholder="Name" />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Department:</div>
                  <input type="text" value={data.Department} readOnly />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Years of service:</div>
                  <input type="text" placeholder="Name" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyAdminViewTeacher;
