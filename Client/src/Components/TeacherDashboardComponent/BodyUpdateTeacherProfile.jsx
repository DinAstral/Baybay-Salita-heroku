import React, { useState, useEffect } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import "../ContentDasboard/Content.css";
import axios from "axios";
import toast from "react-hot-toast";
import AdminContentHeader from "../ContentDasboard/AdminContentHeader";

const BodyUpdateTeacherProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({
    UserID: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Department: "",
    Age: "",
    Section: "",
    Birthday: "",
    Address: "",
    Nationality: "",
    Gender: "",
    ContactNumber: "",
    email: "",
    Picture: "",
  });

  useEffect(() => {
    axios
      .get(`getTeacher/${id}`) // route to include student ID
      .then((response) => {
        console.log("Response:", response.data); // Log response data
        setData(response.data); // Assuming response.data contains student data
      })
      .catch((err) => {
        console.error("Error fetching student data:", err);
        toast.error("Failed to fetch student data. Please try again later.");
      });
  }, [id]); // Added 'id' to dependency array

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This function will edit the information of your teachers.
    </Tooltip>
  );

  const editTeacher = async (e) => {
    e.preventDefault();
    const {
      FirstName,
      MiddleName,
      LastName,
      Department,
      Age,
      Section,
      Birthday,
      Address,
      Nationality,
      Gender,
      ContactNumber,
      Picture,
      email,
    } = data;
    try {
      const { data } = await axios.patch(`updateTeacher/${id}`, {
        FirstName,
        MiddleName,
        LastName,
        Department,
        Age,
        Section,
        Birthday,
        Address,
        Nationality,
        Gender,
        ContactNumber,
        Picture,
        email,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Updated Teacher info Successful.");
        navigate("/adminUsers");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content">
      <AdminContentHeader />
      <div className="content-body">
        <div className="content-title-header">
          <div>
            Update Your Profile Information
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
        <form onSubmit={editTeacher}>
          <div className="content-container">
            <div className="back-button-profile">
              <div className="btn-back" onClick={() => navigate(-1)}>
                Back
              </div>
            </div>
            <div className="add-inputs">
              <div className="add-input">
                <div className="label-add">ID Number</div>
                <input
                  disabled
                  type="text"
                  name="addID"
                  id="addID"
                  placeholder="Enter the First Name"
                  value={data.UserID}
                  onChange={(e) => setData({ ...data, UserID: e.target.value })}
                />
              </div>
              <div className="add-input">
                <div className="label-add">First Name</div>
                <input
                  type="text"
                  name="addFirstName"
                  id="addFirstName"
                  placeholder="Enter the First Name"
                  value={data.FirstName}
                  onChange={(e) =>
                    setData({ ...data, FirstName: e.target.value })
                  }
                />
              </div>
              <div className="add-input">
                <div className="label-add">Last Name</div>
                <input
                  type="text"
                  name="addLastName"
                  id="addLastName"
                  placeholder="Enter the Last Name"
                  value={data.LastName}
                  onChange={(e) =>
                    setData({ ...data, LastName: e.target.value })
                  }
                />
              </div>
              <div className="add-input">
                <div className="label-add">Age</div>
                <input
                  type="text"
                  name="addAge"
                  id="addAge"
                  placeholder="Enter Teacher's age"
                  value={data.Age}
                  onChange={(e) => setData({ ...data, Age: e.target.value })}
                />
              </div>
              <div className="add-input">
                <div className="label-add">Birthday</div>
                <input
                  type="date"
                  placeholder="Enter the Contact Number"
                  value={data.Birthday}
                  onChange={(e) =>
                    setData({ ...data, Birthday: e.target.value })
                  }
                />
              </div>
              <div className="add-input">
                <div className="label-add">Department</div>
                <select
                  className="select-gender"
                  value={data.Department}
                  onChange={(e) =>
                    setData({ ...data, Department: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  <option value="Filipino Department">
                    Filipino Department
                  </option>
                </select>
              </div>
              <div className="add-input">
                <div className="label-add">Email</div>
                <input
                  type="email"
                  placeholder="Enter the Teacher's Email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  disabled
                />
              </div>
              <div className="add-input">
                <div className="label-add">Gender</div>
                <select
                  className="select-gender"
                  name="addGender"
                  id="addGender"
                  value={data.Gender}
                  onChange={(e) => setData({ ...data, Gender: e.target.value })}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="add-input">
                <div className="label-add">Contact Number</div>
                <input
                  type="text"
                  name="addContactNumber"
                  id="addContactNumber"
                  placeholder="Enter the Contact Number"
                  value={data.ContactNumber}
                  onChange={(e) =>
                    setData({ ...data, ContactNumber: e.target.value })
                  }
                />
              </div>
              <div className="add-input">
                <div className="label-add">Upload Picture</div>
                <input
                  type="file"
                  name="addContactNumber"
                  id="addContactNumber"
                  placeholder="Enter the Contact Number"
                  value={data.Picture}
                  onChange={(e) =>
                    setData({ ...data, Picture: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="add-student">
              <button className="btn-add" type="submit">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BodyUpdateTeacherProfile;
