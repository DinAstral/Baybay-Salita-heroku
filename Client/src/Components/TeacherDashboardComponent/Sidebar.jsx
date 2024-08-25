import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEye,
  faSquarePlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/BaybaySalita_Logo.png";
import { UserContext } from "../../../context/userContext"; // Adjust the import path

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCookie } = useContext(UserContext); // Access clearCookie from UserContext
  const [activeIndex, setActiveIndex] = useState(null);

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

  const handleLogout = () => {
    clearCookie(); // Clear the cookie and user state
    navigate("/"); // Redirect to the Home page
  };

  return (
    <div className="menu-dash">
      <div className="logo-dash">
        <img src={logo} alt="Logo" />
      </div>
      <div className="menu--list">
        {[
          { icon: faHome, text: "Dashboard", link: "/teacherDashboard" },
          { icon: faUser, text: "Manage Student", link: "/manageStudent" },
          { icon: faSquarePlus, text: "Add Student", link: "/addStudent" },
          { icon: faEye, text: "Manage Assessment", link: "/viewAssessment" },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`item ${index === activeIndex ? "active" : ""}`}
          >
            <div onClick={() => setActiveIndex(index)}>
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

export default Sidebar;
