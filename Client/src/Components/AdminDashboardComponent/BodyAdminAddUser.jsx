import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";

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

  const [data, setData] = useState({
    UserID: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const addUser = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, role } = data;

    if (!firstName || !lastName || !email || !password || !role) {
      toast.error("All fields are required.");
      return;
    }

    const UserID = generateRandomCode(role, 6);

    try {
      const response = await axios.post("/api/addUser", {
        UserID,
        firstName,
        lastName,
        email,
        password,
        role,
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({
          UserID: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
        });
        toast.success("User added successfully.");
        navigate("/adminUsers");
      }
    } catch (error) {
      console.error("There was an error adding the user:", error);
      toast.error("Failed to add user. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto px-6 pt-[4rem]">
      <div className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h2 className="mb-6 text-3xl font-bold text-gray-700 flex items-center gap-2">
          Add User's Information
          <Tooltip
            showArrow={true}
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">Add User</div>
                <div className="text-tiny">
                  This function will add the information of the user to the
                  system.
                </div>
              </div>
            }
          >
            <FontAwesomeIcon
              icon={faCircleInfo}
              size="sm"
              className="text-gray-700 text-[20px]"
            />
          </Tooltip>
        </h2>
        <form onSubmit={addUser}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <Input
              label="First Name"
              type="text"
              placeholder="Enter First Name"
              value={data.firstName}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
            />
            {/* Last Name */}
            <Input
              label="Last Name"
              type="text"
              placeholder="Enter Last Name"
              value={data.lastName}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
            />
            {/* Email */}
            <Input
              label="Email"
              type="email"
              placeholder="Enter Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            {/* Password */}
            <Input
              label="Password"
              type="password"
              placeholder="Set Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            {/* Role */}
            <Select
              label="Role"
              placeholder="Select Role"
              value={data.role}
              onChange={(e) => setData({ ...data, role: e })}
            >
              <SelectItem key="Admin" value="Admin">
                Admin
              </SelectItem>
              <SelectItem key="Teacher" value="Teacher">
                Teacher
              </SelectItem>
              <SelectItem key="Parent" value="Parent">
                Parent
              </SelectItem>
            </Select>
          </div>
          <div className="mt-6">
            <Button type="submit" color="primary" size="lg" radius="sm">
              Add User
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BodyAdminAddUser;
