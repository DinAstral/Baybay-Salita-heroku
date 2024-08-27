import React, { useState, useEffect, useContext } from "react";
import "./../ContentDasboard/Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpenReader,
  faComment,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext"; // Import UserContext
import logo from "../../assets/BaybaySalita_Logo.png";

const ParentSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const { clearCookie } = useContext(UserContext); // Access clearCookie from UserContext

  const handleLogout = () => {
    clearCookie(); // Clear the cookie and user state
    navigate("/"); // Redirect to the Home page
  };

  useEffect(() => {
    const menuItem = [
      "/parentDashboard",
      "/parentFeedbackTeacher",
      "/parentFeedbackTeacher",
    ];
    const index = menuItem.findIndex((item) => item === location.pathname);
    setActiveIndex(index);
  }, [location.pathname]);

  return (
    <div className="menu-dash">
      <div className="logo-dash">
        <img src={logo} alt="" />
      </div>
      <div className="menu--list">
        {[
          {
            icon: faBookOpenReader,
            text: "Information of Kid",
            link: "/parentDashboard",
          },
          {
            icon: faEye,
            text: "Student Performance",
            link: "/parentFeedbackTeacher",
          },
          {
            icon: faComment,
            text: "Feedback of Teacher",
            link: "/parentFeedbackTeacher",
          },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`item ${index === activeIndex ? "active" : ""}`}
          >
            <div>
              <FontAwesomeIcon
                icon={item.icon}
                size="1x"
                className="dash-icon"
              />
              {item.text}
            </div>
          </Link>
        ))}
      </div>

      <div className="menu-logout">
        <div className="menu-logout-btn">
        <button className="btn-side" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParentSidebar;
