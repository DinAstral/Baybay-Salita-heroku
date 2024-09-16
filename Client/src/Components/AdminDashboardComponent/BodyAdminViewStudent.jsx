import { useState, useEffect } from "react";
import { Tooltip } from "@nextui-org/react";
import profile from "./../../assets/profile.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import ContentHeader from "../ContentDasboard/ContentHeader";

const BodyAdminViewStudent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const menuItem = ["/adminViewStudent", "/adminViewStudent"];
    const index = menuItem.findIndex((item) => item === location.pathname);
    setActiveIndex(index);
  }, [location.pathname]);

  const toggleActive = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="content">
      <ContentHeader />
      <div className="content-body">
        <div className="content-title-header">
          <div>
            Information of the Student
            <Tooltip
              content={
                <div className="px-1 py-2">
                  <div className="text-small font-bold">View Information</div>
                  <div className="text-tiny">
                    This function will view the information of the student in
                    the system.
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
              <h2>Name of the Student</h2>
              <h4>Section</h4>
              <div className="profile-detail-info">
                <div className="profile-number">
                  <FontAwesomeIcon
                    icon={faAddressCard}
                    size="1x"
                    className="profile-icon"
                  />
                  Learner Reference Number:
                </div>
              </div>
            </div>
          </div>
          <div className="profile-information">
            <div className="profile-nav">
              {[
                { text: "Basic Information", link: "/adminViewStudent" },
                { text: "Student Progress", link: "/adminViewStudent" },
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
                  <input type="text" placeholder="Name" />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Nationality:</div>
                  <input type="text" placeholder="Name" />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Middle Name:</div>
                  <input type="text" placeholder="Name" />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Civil Status:</div>
                  <input type="text" placeholder="Name" />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Last Name:</div>
                  <input type="text" placeholder="Name" />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Gender:</div>
                  <input type="text" placeholder="Name" />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Birthday:</div>
                  <input type="text" placeholder="Name" />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Address:</div>
                  <input type="text" placeholder="Name" />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Contact Number:</div>
                  <input type="text" placeholder="Name" />
                </div>
                <div className="input-profile">
                  <div className="input-profile-text">Section:</div>
                  <input type="text" placeholder="Name" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyAdminViewStudent;
