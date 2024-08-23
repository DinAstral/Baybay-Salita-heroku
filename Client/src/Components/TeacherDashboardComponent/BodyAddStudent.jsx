import React, { useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import "../ContentDasboard/Content.css";
import axios from "axios";
import toast from "react-hot-toast";
import TeacherContentHeader from "../ContentDasboard/TeacherContentHeader";
import { Select, SelectItem } from "@nextui-org/react";

const BodyTeacherAddStudent = () => {
  const navigate = useNavigate();

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This function will add Information for your students in your section.
    </Tooltip>
  );

  const [data, setData] = useState({
    LRN: "",
    FirstName: "",
    LastName: "",
    Age: "",
    Level: "",
    Section: "",
    Birthday: "",
    Address: "",
    MotherTongue: "",
    Gender: "",
    ContactNumber: "",
  });

  const addStudent = async (e) => {
    e.preventDefault();
    const {
      LRN,
      FirstName,
      LastName,
      Age,
      Level,
      Section,
      Birthday,
      Address,
      MotherTongue,
      Gender,
      ContactNumber,
    } = data;
    try {
      const { data } = await axios.post("/addStudent", {
        LRN,
        FirstName,
        LastName,
        Age,
        Level,
        Section,
        Birthday,
        Address,
        MotherTongue,
        Gender,
        ContactNumber,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Added Student info Successful.");
        navigate("/manageStudent");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content">
      <TeacherContentHeader />
      <div className="content-body">
        <div className="content-title-header">
          <div>
            Add Student's Information
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
        <form onSubmit={addStudent}>
          <div className="content-container">
            <div className="back-button-profile">
              <div className="btn-back" onClick={() => navigate(-1)}>
                Back
              </div>
            </div>
            <div className="add-inputs">
              <div className="add-input">
                <div className="label-add">LRN</div>
                <input
                  type="text"
                  name="addLRN"
                  id="addLRN"
                  placeholder="Enter student's LRN"
                  value={data.LRN}
                  onChange={(e) => setData({ ...data, LRN: e.target.value })}
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
                  placeholder="Enter student's age"
                  value={data.Age}
                  onChange={(e) => setData({ ...data, Age: e.target.value })}
                />
              </div>
              <div className="add-input">
                <div className="label-add">Grade Level</div>
                <select
                  className="select-gender"
                  value={data.Level}
                  onChange={(e) => setData({ ...data, Level: e.target.value })}
                >
                  <option value="" disabled>
                    Select Grade Level
                  </option>
                  <option value="Grade 1">Grade 1</option>
                </select>
              </div>
              <Select
                label="Section"
                placeholder="Select section"
                variant="bordered"
                className="bg-transparent py-1 my-1"
                value={data.Section}
                onChange={(e) => setData({ ...data, Section: e.target.value })}
              >
                <SelectItem key="" disabled>
                  Select Section
                </SelectItem>
                <SelectItem key="Aster">Aster</SelectItem>
                <SelectItem key="Camia">Camia</SelectItem>
                <SelectItem key="Dahlia">Dahlia</SelectItem>
                <SelectItem key="Iris">Iris</SelectItem>
                <SelectItem key="Jasmin">Jasmin</SelectItem>
                <SelectItem key="Orchid">Orchid</SelectItem>
                <SelectItem key="Rose">Rose</SelectItem>
                <SelectItem key="Tulip">Tulip</SelectItem>
                <SelectItem key="SSC">SSC</SelectItem>
              </Select>

              <div className="add-input">
                <div className="label-add">Birthday</div>
                <input
                  type="date"
                  value={data.Birthday}
                  onChange={(e) =>
                    setData({ ...data, Birthday: e.target.value })
                  }
                />
              </div>
              <div className="add-input">
                <div className="label-add">Address</div>
                <input
                  type="address"
                  placeholder="Enter the Address"
                  value={data.Address}
                  onChange={(e) =>
                    setData({ ...data, Address: e.target.value })
                  }
                />
              </div>
              <div className="add-input">
                <div className="label-add">Mother Tongue</div>
                <input
                  type="text"
                  placeholder="Enter the Mother Tongue"
                  value={data.MotherTongue}
                  onChange={(e) =>
                    setData({ ...data, MotherTongue: e.target.value })
                  }
                />
              </div>
              <div className="add-input">
                <div className="label-add">Gender</div>
                <select
                  className="select-gender"
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
            </div>
            <div className="add-student">
              <button className="btn-add" type="submit">
                Add Student
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BodyTeacherAddStudent;
