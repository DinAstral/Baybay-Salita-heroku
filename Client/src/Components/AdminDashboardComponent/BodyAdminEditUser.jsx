/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { Tooltip } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import "../ContentDasboard/Content.css";
import axios from "axios";
import toast from "react-hot-toast";
import ContentHeader from "../ContentDasboard/ContentHeader";

const BodyAdminEditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    axios
      .get(`getUser/${id}`) // route to include student ID
      .then((response) => {
        console.log("Response:", response.data); // Log response data
        setData(response.data); // Assuming response.data contains student data
      })
      .catch((err) => {
        console.error("Error fetching student data:", err);
        toast.error("Failed to fetch student data. Please try again later.");
      });
  }, [id]); // Added 'id' to dependency array

  const editUser = async (e) => {
    e.preventDefault();
    const { email, password, role } = data;
    try {
      const { data } = await axios.patch(`updateUser/${id}`, {
        email,
        password,
        role,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Updated User info Successful.");
        navigate("/AdminUsers");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content">
      <ContentHeader />
      <div className="content-body">
        <div className="content-title-header">
          <div>
            Update User's Information
            <Tooltip
              content={
                <div className="px-1 py-2">
                  <div className="text-small font-bold">Update Information</div>
                  <div className="text-tiny">
                    This function will update the information of the user in
                    system.
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
        <form onSubmit={editUser}>
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
                  defaultValue={""}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>
              <div className="add-input">
                <div className="label-add">Role</div>
                <input
                  type="text"
                  placeholder="Enter Role"
                  value={data.role}
                  onChange={(e) => setData({ ...data, role: e.target.value })}
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

export default BodyAdminEditUser;
