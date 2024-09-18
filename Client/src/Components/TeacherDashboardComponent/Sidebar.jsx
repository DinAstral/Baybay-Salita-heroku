import React, { useState, useEffect, useContext } from "react";
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

const Sidebar = () => {
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
      "/teacherDashboard",
      "/manageStudent",
      "/addStudent",
      "/viewAssessment",
    ];
    const index = menuItem.findIndex((item) => item === location.pathname);
    setActiveIndex(index);
  }, [location.pathname]);

  const toggleActive = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="menu-dash">
      <div className="logo-dash p-4">
        <img src={logo} alt="Baybay Salita Logo" />
      </div>
      <div className="menu--list flex flex-col">
        {[
          { icon: faHome, text: "Dashboard", link: "/teacherDashboard" },
          { icon: faUser, text: "Manage Student", link: "/manageStudent" },
          { icon: faSquarePlus, text: "Add Student", link: "/addStudent" },
          { icon: faEye, text: "Manage Assessment", link: "/viewAssessment" },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`flex items-center p-2 font-semibold text-md text-gray-850 hover:bg-blue-100 rounded-md ${
              index === activeIndex ? "bg-blue-400 text-white" : ""
            }`}
          >
            <FontAwesomeIcon icon={item.icon} size="1x" className="mr-2" />
            {item.text}
          </Link>
        ))}
      </div>
      <div className="menu-logout p-4">
        <Button
          color="primary"
          className="w-full text-md"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
