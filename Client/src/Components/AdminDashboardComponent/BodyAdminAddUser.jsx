import { useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import "../ContentDasboard/Content.css";
import axios from "axios";
import toast from "react-hot-toast";
import ContentHeader from "../ContentDasboard/ContentHeader";

function generateRandomCode(role, length) {
  const characters = "0123456789";
  let prefix = "";
  switch (role) {
    case "Parent":
      prefix = "parentID_";
      break;
    case "Teacher":
      prefix = "teacherID_";
      break;
    case "Admin":
      prefix = "adminID_";
      break;
    default:
      break;
  }
  let result = prefix;
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const BodyAdminAddUser = () => {
  const navigate = useNavigate();

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This function will add user information for your section.
    </Tooltip>
  );

  const [data, setData] = useState({
    UserID: "",
    email: "",
    password: "",
    role: "",
  });

  const addUser = async (e) => {
    e.preventDefault();
    const { email, password, role } = data;

    if (!email || !password || !role) {
      toast.error("All fields are required.");
      return;
    }

    const UserID = generateRandomCode(role, 6);

    try {
      const response = await axios.post("/addUser", {
        UserID,
        email,
        password,
        role,
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({ UserID: "", email: "", password: "", role: "" });
        toast.success("Added User Successfully.");
        navigate("/adminUsers");
      }
    } catch (error) {
      console.error("There was an error adding the user:", error);
      toast.error("Failed to add user. Please try again later.");
    }
  };

  return (
    <div className="content">
      <ContentHeader />
      <div className="content-body">
        <div className="content-title-header">
          <div>
            Add User's Information
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
        <form onSubmit={addUser}>
          <div className="content-container">
            <div className="back-button-profile">
              <div className="btn-back" onClick={() => navigate(-1)}>
                Back
              </div>
            </div>
            <div className="add-inputs">
              <div className="add-input">
                <div className="label-add">Email</div>
                <input
                  type="email"
                  placeholder="Enter the User's Email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div className="add-input">
                <div className="label-add">Password</div>
                <input
                  type="password"
                  placeholder="Set Password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>
              <div className="add-input">
                <div className="label-add">Role</div>
                <select
                  className="select-gender"
                  value={data.role}
                  onChange={(e) => setData({ ...data, role: e.target.value })}
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="Admin">Admin</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Parent">Parent</option>
                </select>
              </div>
            </div>
            <div className="add-student">
              <button className="btn-add" type="submit">
                Add User
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BodyAdminAddUser;
