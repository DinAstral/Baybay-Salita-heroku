import React, { useState } from "react";
import { Tooltip, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";

const BodyAdminAddStudent = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    LRN: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Age: "",
    Level: "",
    Section: "",
    Birthday: "",
    Address: "",
    MotherTongue: "",
    Nationality: "",
    Gender: "",
    ContactNumber: "",
  });

  // Handle input changes with validation for LRN
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special validation for LRN field
    if (name === "LRN") {
      // Allow only numbers and limit to 12 characters
      const newValue = value.replace(/[^0-9]/g, "").slice(0, 12);
      setData({ ...data, [name]: newValue });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  // Handle form submission
  const addStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/addStudent", data);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({});
        toast.success("Added Student info Successfully.");
        navigate("/adminStudents");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add student. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-6 pt-[4rem]">
      <div className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h2 className="mb-6 text-3xl font-bold text-gray-700 flex items-center gap-2">
          Add Student's Information
          <Tooltip
            showArrow={true}
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">Add Student</div>
                <div className="text-tiny">
                  This function will add the information of the students in the
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
        <form onSubmit={addStudent}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: "LRN",
                type: "text",
                placeholder: "Enter student's LRN",
                name: "LRN",
                maxLength: 12,
              },
              {
                label: "First Name",
                type: "text",
                placeholder: "Enter the First Name",
                name: "FirstName",
              },
              {
                label: "Last Name",
                type: "text",
                placeholder: "Enter the Last Name",
                name: "LastName",
              },
              {
                label: "Birthday",
                type: "date",
                name: "Birthday",
              },
              {
                label: "Address",
                type: "text",
                placeholder: "Enter the Address",
                name: "Address",
              },
              {
                label: "Mother Tongue",
                type: "text",
                placeholder: "Enter the Mother Tongue",
                name: "MotherTongue",
              },
            ].map((input, index) => (
              <div key={index}>
                <label className="font-medium text-gray-700">
                  {input.label}
                </label>
                <Input
                  underlined
                  clearable
                  bordered
                  fullWidth
                  type={input.type}
                  placeholder={input.placeholder}
                  value={data[input.name]}
                  onChange={handleChange}
                  name={input.name}
                  maxLength={input.maxLength || undefined}
                  // We use maxLength here, but it's mostly for visual constraint. The actual validation happens in handleChange.
                />
              </div>
            ))}
            <div>
              <label className="font-medium text-gray-700">Section</label>
              <Select
                placeholder="Select your section"
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
            </div>
            <div>
              <label className="font-medium text-gray-700">Gender</label>
              <Select
                name="Gender"
                placeholder="Select your gender"
                className="bg-transparent py-1 my-1"
                value={data.Gender}
                onChange={(e) => setData({ ...data, Gender: e.target.value })}
              >
                <SelectItem key="" disabled>
                  Select Gender
                </SelectItem>
                <SelectItem key="Male">Male</SelectItem>
                <SelectItem key="Female">Female</SelectItem>
                <SelectItem key="Other">Other</SelectItem>
              </Select>
            </div>
          </div>
          <div className="mt-6 items-center flex flex-row justify-end gap-2">
            <Button type="submit" color="primary" auto ghost>
              Add Student
            </Button>
            <Button
              flat
              auto
              color="danger"
              variant="light"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BodyAdminAddStudent;
