/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { Tooltip, Button, Input } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";

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
      .get(`/api/getUser/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        toast.error("Failed to fetch user data. Please try again later.");
      });
  }, [id]);

  const editUser = async (e) => {
    e.preventDefault();
    const { email, password, role } = data;
    try {
      const response = await axios.patch(`/api/updateUser/${id}`, {
        email,
        password,
        role,
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({});
        toast.success("Updated User info successfully.");
        navigate("/AdminUsers");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Update User's Information
        </h2>
        <Tooltip
          content={
            <div className="px-1 py-2">
              <div className="text-sm font-bold">Update Information</div>
              <div className="text-xs">
                This function will update the information of the user in the
                system.
              </div>
            </div>
          }
        >
          <FontAwesomeIcon
            icon={faCircleInfo}
            size="lg"
            className="text-gray-600"
          />
        </Tooltip>
      </div>
      <form onSubmit={editUser}>
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Email</label>
            <Input
              underlined
              type="email"
              placeholder="Enter the User's Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Password</label>
            <Input
              underlined
              type="password"
              placeholder="Set Password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Role</label>
            <Input
              underlined
              placeholder="Enter Role"
              value={data.role}
              onChange={(e) => setData({ ...data, role: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Button type="submit" color="primary" auto>
            Save Changes
          </Button>
          <Button
            auto
            flat
            color="error"
            onClick={() => navigate(-1)}
            className="ml-4"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BodyAdminEditUser;
