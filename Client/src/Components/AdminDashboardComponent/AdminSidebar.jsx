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
import logo from "../../assets/Sidebar_Final_Logo.png";
import { UserContext } from "../../../context/userContext"; // Import UserContext
import { Button } from "@nextui-org/react";

const AdminSidebar = () => {
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
      "/AdminDashboard",
      "/AdminUsers",
      "/adminStudents",
      "/adminStudentAssessment",
      "/adminViewPerformance",
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
          {
            icon: faEye,
            text: "View Performance",
            link: "/adminViewPerformance",
          },
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
          <Button
            color="primary"
            className="w-[150px] text-md p-4"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
