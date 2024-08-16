import React, { useState, useEffect, useContext } from "react";
import "./../ContentDasboard/Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEye,
  faSquarePlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/BaybaySalita_Logo.png";
import { UserContext } from "../../../context/userContext"; // Import UserContext

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const { setUser } = useContext(UserContext); // Destructure setUser from UserContext

  const clearCookie = () => {
    // Clear the token cookie by setting it with an expired date
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null); // Clear user state
    navigate("/");
  };

  useEffect(() => {
    const menuItem = [
      "/AdminDashboard",
      "/AdminUsers",
      "/adminStudents",
      "/adminStudentAssessment",
      "/performance",
    ];
    const index = menuItem.findIndex((item) => item === location.pathname);
    setActiveIndex(index);
  }, [location.pathname]);

  const toggleActive = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="menu-dash">
      <div className="logo-dash">
        <img src={logo} alt="Baybay Salita Logo" />
      </div>
      <div className="menu--list">
        {[
          { icon: faHome, text: "Dashboard", link: "/AdminDashboard" },
          { icon: faUser, text: "Manage Users", link: "/AdminUsers" },
          { icon: faUser, text: "Student List", link: "/adminStudents" },
          {
            icon: faSquarePlus,
            text: "Manage Assessment",
            link: "/adminStudentAssessment",
          },
          { icon: faEye, text: "View Performance", link: "/performance" },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`item ${index === activeIndex ? "active" : ""}`}
          >
            <div onClick={() => toggleActive(index)}>
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
          <button className="btn-side" onClick={clearCookie}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
