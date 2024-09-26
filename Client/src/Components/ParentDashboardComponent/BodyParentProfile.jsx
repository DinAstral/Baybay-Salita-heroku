import React, { useState, useEffect, useContext } from "react";
import profileImage from "./../../assets/profile.png";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip, Button, Modal } from "@nextui-org/react";
import {
  faAddressCard,
  faCircleInfo,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";

const EditUser = ({ show, onClose, profile }) => {
  return (
    <Modal open={show} onClose={onClose} aria-labelledby="modal-title" centered>
      <Modal.Header>
        <h3 id="modal-title">Update User Information</h3>
      </Modal.Header>
      <Modal.Body>
        <p>
          You are now going to update your profile. Do you wish to continue?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => navigate(`/parentUpdateProfile/${profile}`)}
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const BodyParentProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [profileImg, setProfileImg] = useState(profileImage);
  const [parent, setParent] = useState([""]);

  useEffect(() => {
    axios
      .get(`getParent/${user.UserID}`)
      .then((response) => {
        setProfileImg(response.data.Picture || profileImage);
        setParent(response.data);
      })
      .catch(() => {
        toast.error("Failed to fetch parent data. Please try again later.");
      });
  }, [user.UserID]);

  useEffect(() => {
    const menuItem = ["/parentProfile"];
    const index = menuItem.findIndex((item) => item === location.pathname);
    setActiveIndex(index);
  }, [location.pathname]);

  const handleEditClick = () => {
    setModalShow(true);
  };

  const toggleActive = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="p-10">
      <div className="flex items-center justify-start gap-2 mb-5">
        <h1 className="text-3xl font-semibold">Parent Profile</h1>
        <Tooltip
          showArrow={true}
          content={
            <div className="p-2">
              <div className="text-sm font-bold">Profile Information</div>
              <div className="text-xs">
                This function will view your profile.
              </div>
            </div>
          }
        >
          <FontAwesomeIcon icon={faCircleInfo} className="text-gray-600" />
        </Tooltip>
      </div>

      <div className="w-full max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-[3rem]">
        <EditUser
          show={modalShow}
          onClose={() => setModalShow(false)}
          profile={user.UserID}
        />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative">
          <Tooltip
            content={
              <div className="p-2">
                <div className="text-sm font-bold">Profile Picture Update</div>
                <div className="text-xs">
                  You can update your profile picture once clicked.
                </div>
              </div>
            }
          >
            <label className="cursor-pointer">
              <img
                src={profileImg}
                className="w-32 h-32 rounded-full"
                alt="Profile"
              />
            </label>
          </Tooltip>

          <div className="flex-1">
            <h2 className="text-2xl font-bold">
              {user ? `${user.FirstName} ${user.LastName}` : "Parent Name"}
            </h2>
            <h4>{user ? user.role : "Role"}</h4>

            <div className="flex flex-col mt-4 text-gray-700">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faAddressCard}
                  className="text-gray-600"
                />
                <span>
                  Parent ID Number: {user ? user.UserID : "Parent ID"}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-600" />
                <span>
                  Email Address: {user ? user.email : "Email Address"}
                </span>
              </div>
            </div>
          </div>

          <Button color="primary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>

        <div className="mt-8">
          <div className="flex gap-6 border-b pb-2">
            <Button
              variant="light"
              radius="none"
              className={`text-md font-medium ${
                activeIndex === 0 ? "border-b-4 border-blue-500" : ""
              }`}
              onClick={() => toggleActive(0)}
            >
              Basic Information
            </Button>
            <Button
              variant="light"
              radius="none"
              className={`text-md font-medium ${
                activeIndex === 1 ? "border-b-4 border-blue-500" : ""
              }`}
              onClick={handleEditClick}
            >
              Update
            </Button>
          </div>

          {activeIndex === 0 && (
            <div className="mt-6 bg-[#faf9f4] p-6 rounded-lg shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="block text-sm text-gray-600">
                    First Name:
                  </span>
                  <p className="text-gray-800">
                    {user ? user.FirstName : "N/A"}
                  </p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">
                    Contact Number:
                  </span>
                  <p className="text-gray-800">
                    {parent ? parent.ContactNumber : "N/A"}
                  </p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">
                    Last Name:
                  </span>
                  <p className="text-gray-800">
                    {user ? user.LastName : "N/A"}
                  </p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">Gender:</span>
                  <p className="text-gray-800">
                    {parent ? parent.Gender : "N/A"}
                  </p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">Birthday:</span>
                  <p className="text-gray-800">
                    {parent ? parent.Birthday : "N/A"}
                  </p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">Address:</span>
                  <p className="text-gray-800">
                    {parent ? parent.Address : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BodyParentProfile;
