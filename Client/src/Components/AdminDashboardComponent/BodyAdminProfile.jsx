import { useState, useEffect, useContext } from "react";
import profileImage from "./../../assets/profile.png";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip, Button } from "@nextui-org/react";
import {
  faAddressCard,
  faCircleInfo,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../context/userContext";

import axios from "axios";
import toast from "react-hot-toast";

const BodyAdminProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const { user } = useContext(UserContext);
  const [profileImg, setProfileImg] = useState(profileImage);
  const [data, setData] = useState({
    _id: "",
    UserID: "",
    FirstName: "",
    LastName: "",
    Age: "",
    Birthday: "",
    Gender: "",
    Address: "",
    Status: "",
    Nationality: "",
    ContactNumber: "",
    Picture: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get(`getAdmin/${user.UserID}`)
      .then((response) => {
        setData(response.data);
        setProfileImg(response.data.Picture || profileImage);
      })
      .catch(() => {
        toast.error("Failed to fetch admin data. Please try again later.");
      });
  }, [user.UserID]);

  useEffect(() => {
    const menuItem = ["/adminProfile"];
    const index = menuItem.findIndex((item) => item === location.pathname);
    setActiveIndex(index);
  }, [location.pathname]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("Profile", file);
      formData.append("role", user.role); // Adjust role according to your user context
      formData.append("UserID", user.UserID);

      try {
        const response = await axios.post("/profileUpdate", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.data.message) {
          setProfileImg(response.data.updatedProfileUrl); // Update profile image URL
          toast.success("Profile picture updated successfully!");
        } else if (response.data.error) {
          toast.error(`Error: ${response.data.error}`);
        }
      } catch (error) {
        toast.error(
          "Failed to update profile picture. Please try again later."
        );
      }
    }
  };

  const handleEditClick = () => {
    setModalShow(true);
  };

  const toggleActive = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="p-10">
      <div className="flex items-center justify-start gap-2 mb-5">
        <h1 className="text-3xl font-semibold">Admin Profile</h1>
        <Tooltip
          showArrow={true}
          content={
            <div className="p-2">
              <div className="text-sm font-bold">Profile Information</div>
              <div className="text-xs">
                This function will view your information.
              </div>
            </div>
          }
        >
          <FontAwesomeIcon icon={faCircleInfo} className="text-gray-600" />
        </Tooltip>
      </div>
      <div className="w-full max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-[3rem]">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative">
          <Tooltip
            content={
              <div className="p-2">
                <div className="text-sm font-bold">Profile Picture Update</div>
                <div className="text-xs">
                  You can update you profile picture once clicked.
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
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </Tooltip>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">
              {data ? `${data.FirstName} ${data.LastName}` : "Admin Name"}
            </h2>
            <h4>{data ? data.role : "Position"}</h4>
            <div className="flex flex-col mt-4 text-gray-700">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faAddressCard}
                  className="text-gray-600"
                />
                <span>Admin ID Number: {data ? data.UserID : "Admin ID"}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-600" />
                <span>
                  Email Address: {data ? data.email : "Email Address"}
                </span>
              </div>
            </div>
          </div>
          <Button
            color="primary"
            className="w-[120px] text-md p-1"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>

        {/* Tabs */}
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

          {/* Content Based on Active Tab */}
          {activeIndex === 0 && (
            <div className="mt-6 bg-[#faf9f4] p-6 rounded-lg shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="block text-sm text-gray-600">
                    First Name:
                  </span>
                  <p className="text-gray-800">{data.FirstName || "N/A"}</p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">
                    Civil Status:
                  </span>
                  <p className="text-gray-800">{data.Status || "N/A"}</p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">
                    Last Name:
                  </span>
                  <p className="text-gray-800">{data.LastName || "N/A"}</p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">Gender:</span>
                  <p className="text-gray-800">{data.Gender || "N/A"}</p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">Birthday:</span>
                  <p className="text-gray-800">{data.Birthday || "N/A"}</p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">Address:</span>
                  <p className="text-gray-800">{data.Address || "N/A"}</p>
                </div>
                <div>
                  <span className="block text-sm text-gray-600">
                    Contact Number:
                  </span>
                  <p className="text-gray-800">{data.ContactNumber || "N/A"}</p>
                </div>
              </div>
            </div>
          )}

          {activeIndex === 1 && (
            <div className="mt-6 bg-[#f9f9f9] p-6 rounded-lg shadow">
              <p>Update Profile form goes here...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BodyAdminProfile;
