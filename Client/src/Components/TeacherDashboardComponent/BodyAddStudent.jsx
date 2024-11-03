import React, { useState, useEffect, useContext } from "react";
import { Tooltip, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";

const BodyTeacherAddStudent = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    LRN: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Level: "",
    Section: "",
    Birthday: "",
    Address: "",
    MotherTongue: "",
    Gender: "",
    ContactNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [verifiedParents, setVerifiedParents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]); // Filtered student list
  const [teacherSection, setTeacherSection] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchVerifiedParents = async () => {
      try {
        const response = await axios.get("/api/getParent");
        if (response.data && response.data.length > 0) {
          setVerifiedParents(response.data);
          setFilteredStudents(
            response.data
              .filter((parent) => parent.verified)
              .flatMap((parent) => parent.Student || [])
          );
        } else {
          toast.error("No verified parents found.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch parent data.");
      }
    };

    const fetchTeacherData = async () => {
      try {
        const response = await axios.get(`/api/getTeacher/${user.UserID}`);
        if (response.data && response.data.Section) {
          setTeacherSection(response.data.Section);
          setData((prevData) => ({
            ...prevData,
            Section: response.data.Section,
          }));
        } else {
          toast.error("Failed to fetch teacher's section.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch teacher data.");
      }
    };

    fetchVerifiedParents();
    fetchTeacherData();
  }, [user.UserID]);

  const handleLRNSelect = (selectedLRN) => {
    setData({ ...data, LRN: selectedLRN });

    const student = verifiedParents
      .flatMap((parent) => parent.Student || [])
      .find((student) => student.LRN === selectedLRN);

    if (student) {
      const parent = verifiedParents.find((p) =>
        p.Student.some((s) => s.LRN === selectedLRN)
      );

      setSelectedStudent(student);
      setData({
        LRN: student.LRN,
        FirstName: student.FirstName,
        LastName: student.LastName,
        Birthday: student.Birthday,
        Age: calculateAge(student.Birthday),
        Address: parent?.Address || "",
        MotherTongue: student.MotherTongue,
        Gender: student.Gender,
        ContactNumber: parent?.ContactNumber || "",
        Section: teacherSection,
      });
    } else {
      toast.error("Student not found.");
    }
  };

  const handleSearchChange = (searchValue) => {
    setFilteredStudents(
      verifiedParents
        .flatMap((parent) => parent.Student || [])
        .filter((student) =>
          student.LRN.toLowerCase().includes(searchValue.toLowerCase())
        )
    );
  };

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const validateInputs = () => {
    let isValid = true;
    let newErrors = {};

    if (!data.LRN) {
      newErrors.LRN = "LRN is required.";
      isValid = false;
    }

    if (!data.FirstName) {
      newErrors.FirstName = "First Name is required.";
      isValid = false;
    }

    if (!data.LastName) {
      newErrors.LastName = "Last Name is required.";
      isValid = false;
    }

    if (!data.Birthday) {
      newErrors.Birthday = "Birthday is required.";
      isValid = false;
    }

    if (!data.Address) {
      newErrors.Address = "Address is required.";
      isValid = false;
    }

    if (!data.MotherTongue) {
      newErrors.MotherTongue = "Mother Tongue is required.";
      isValid = false;
    }

    if (!data.Gender) {
      newErrors.Gender = "Gender is required.";
      isValid = false;
    }

    if (!data.ContactNumber) {
      newErrors.ContactNumber = "Contact Number is required.";
      isValid = false;
    }

    if (!data.Section) {
      newErrors.Section = "Section is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const addStudent = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      toast.error("Please fill out the form correctly.");
      return;
    }

    try {
      const response = await axios.post("/api/addStudent", data);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({
          LRN: "",
          FirstName: "",
          MiddleName: "",
          LastName: "",
          Level: "",
          Section: teacherSection,
          Birthday: "",
          Age: "",
          Address: "",
          MotherTongue: "",
          Gender: "",
          ContactNumber: "",
        });
        toast.success("Student added successfully.");
        navigate("/manageStudent");
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
            <div>
              <Select
                label="LRN"
                placeholder="Select or search LRN"
                value={data.LRN}
                onChange={handleLRNSelect}
                onSearch={handleSearchChange} // Added search functionality
                searchable
                errorMessage={errors.LRN}
                isInvalid={!!errors.LRN}
              >
                {filteredStudents.map((student) => (
                  <SelectItem key={student.LRN} value={student.LRN}>
                    {student.LRN}
                  </SelectItem>
                ))}
              </Select>
            </div>
            {/* Rest of the form inputs */}
          </div>
          <div className="mt-6">
            <Button type="submit" color="primary" size="lg" radius="sm">
              Add Student
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BodyTeacherAddStudent;
