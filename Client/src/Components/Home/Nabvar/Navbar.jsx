import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
import "./Navbar.css";
import logo from "../../../assets/logo1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 400 ? setSticky(true) : setSticky(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <nav className={`container-nav ${sticky ? "dark-nav" : ""}`}>
      <img src={logo} alt="" className="logo" />
      <ul className={mobileMenu ? "" : "hide-mobile-menu"}>
        <li>
          <LinkScroll to="hero" smooth={true} offset={-100} duration={100}>
            Home
          </LinkScroll>
        </li>
        <li>
          <LinkScroll to="services" smooth={true} offset={-290} duration={100}>
            Services
          </LinkScroll>
        </li>
        <li>
          <LinkScroll to="about" smooth={true} offset={-150} duration={100}>
            About
          </LinkScroll>
        </li>
        <li>
          <LinkScroll to="contact" smooth={true} offset={-300} duration={100}>
            Contact
          </LinkScroll>
        </li>
        <li>
          <Link to="/login" className="btn-home">
            Login
          </Link>
        </li>{" "}
        {/* Use Link component for navigation */}
      </ul>
      <FontAwesomeIcon
        icon={faBars}
        size="2x"
        className="menu-icon"
        onClick={toggleMenu}
      />
    </nav>
  );
}

export default Navbar;
