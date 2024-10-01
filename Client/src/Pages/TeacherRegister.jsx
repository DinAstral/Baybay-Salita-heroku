import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Input,
  Button,
  Card,
  CardBody,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faUser,
  faEnvelope,
  faEye,
  faEyeSlash,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const TeacherRegister = () => {
  const [data, setData] = useState({
    FirstName: "",
    LastName: "",
    Section: "",
    Department: "",
    Birthday: "",
    Gender: "",
    Address: "",
    Status: "",
    ContactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  function isNumber(input) {
    return !isNaN(input);
  }

  function validatePassword(password) {
    const minLength = 8;
    const errors = [];

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Check if password is provided
    if (!password) {
      return "Password is required.";
    }

    // Validate the different criteria and accumulate errors
    if (password.length < minLength) {
      errors.push("Password must be at least 8 characters long.");
    }
    if (!hasUpperCase) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!hasLowerCase) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    if (!hasDigit) {
      errors.push("Password must contain at least one digit.");
    }
    if (!hasSpecialChar) {
      errors.push("Password must contain at least one special character.");
    }

    // If there are any errors, return them as a combined string
    if (errors.length > 0) {
      return errors.join(" ");
    }

    return null; // No errors
  }

  const validateInputs = () => {
    let isValid = true;
    let newErrors = {};

    if (!data.FirstName) {
      newErrors.FirstName = "First Name is required";
      isValid = false;
    }
    if (!data.LastName) {
      newErrors.LastName = "Last Name is required";
      isValid = false;
    }
    if (!data.Section) {
      newErrors.Section = "Section is required";
      isValid = false;
    }
    if (!data.Department) {
      newErrors.Department = "Department is required";
      isValid = false;
    }
    if (!data.Birthday) {
      newErrors.Birthday = "Birthday is required";
      isValid = false;
    }
    if (!data.Gender) {
      newErrors.Gender = "Gender is required";
      isValid = false;
    }
    if (!data.Address) {
      newErrors.Address = "Address is required";
      isValid = false;
    }
    if (!data.Status) {
      newErrors.Status = "Status is required";
      isValid = false;
    }
    if (!data.ContactNumber) {
      newErrors.ContactNumber = "Contact Number is required";
      isValid = false;
    }
    if (!isNumber(data.ContactNumber)) {
      newErrors.ContactNumber = "Invalid Contact Number";
      isValid = false;
    }
    // Validate Contact Number (starts with 09 and 11 digits long)
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(data.ContactNumber)) {
      newErrors.ContactNumber = "Enter PH Contact number";
      isValid = false;
    }
    if (!data.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Validate email format
    if (!emailRegex.test(data.email)) {
      newErrors.email = "Invalid email format.";
    }

    const passwordError = validatePassword(data.password);
    if (passwordError) {
      newErrors.password = passwordError;
      isValid = false;
    }

    // Validate passwords match
    else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const registerTeacher = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    const {
      FirstName,
      LastName,
      Section,
      Department,
      Birthday,
      Address,
      Status,
      Gender,
      ContactNumber,
      email,
      password,
      confirmPassword,
    } = data;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/registerTeacher", {
        FirstName,
        LastName,
        Section,
        Department,
        Birthday,
        Address,
        Status,
        Gender,
        ContactNumber,
        email,
        password,
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({});
        toast.success(response.data.message);
        localStorage.setItem("userId", response.data.data.userId); // Store userId for verification step
        navigate("/verifyEmail");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex bg-[#f6fbff] w-full items-center min-h-screen p-4 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Card className="w-full flex flex-col p-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            Teacher Registration
          </h1>
          <p className="text-sm text-center mb-4">
            Please fill up the details needed!
          </p>
          <CardBody>
            <form onSubmit={registerTeacher}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="FirstName"
                  label="First Name"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  value={data.FirstName}
                  onChange={(e) =>
                    setData({ ...data, FirstName: e.target.value })
                  }
                  errorMessage={errors.FirstName}
                  isInvalid={!!errors.FirstName}
                  endContent={
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-xl md:text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
                <Input
                  type="text"
                  name="LastName"
                  label="Last Name"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  value={data.LastName}
                  onChange={(e) =>
                    setData({ ...data, LastName: e.target.value })
                  }
                  errorMessage={errors.LastName}
                  isInvalid={!!errors.LastName}
                  endContent={
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-xl md:text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
                <Select
                  label="Section"
                  placeholder="Select your section"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  value={data.Section}
                  onChange={(e) =>
                    setData({ ...data, Section: e.target.value })
                  }
                  errorMessage={errors.Section}
                  isInvalid={!!errors.Section}
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
                <Select
                  label="Department"
                  placeholder="Select your department"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  value={data.Department}
                  onChange={(e) =>
                    setData({ ...data, Department: e.target.value })
                  }
                  errorMessage={errors.Department}
                  isInvalid={!!errors.Department}
                >
                  <SelectItem key="" disabled>
                    Select Department
                  </SelectItem>
                  <SelectItem key="Filipino">Filipino</SelectItem>
                </Select>
                <Input
                  className="pt-2"
                  type="date"
                  label="Birthday"
                  variant="bordered"
                  value={data.Birthday}
                  onChange={(e) =>
                    setData({ ...data, Birthday: e.target.value })
                  }
                  errorMessage={errors.Birthday}
                  isInvalid={!!errors.Birthday}
                />
                <Select
                  label="Gender"
                  name="Gender"
                  placeholder="Select your gender"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  value={data.Gender}
                  onChange={(e) => setData({ ...data, Gender: e.target.value })}
                  errorMessage={errors.Gender}
                  isInvalid={!!errors.Gender}
                >
                  <SelectItem key="" disabled>
                    Select Gender
                  </SelectItem>
                  <SelectItem key="Male">Male</SelectItem>
                  <SelectItem key="Female">Female</SelectItem>
                  <SelectItem key="Other">Other</SelectItem>
                </Select>
                <Input
                  type="text"
                  name="Address"
                  label="Address"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  value={data.Address}
                  onChange={(e) =>
                    setData({ ...data, Address: e.target.value })
                  }
                  errorMessage={errors.Address}
                  isInvalid={!!errors.Address}
                  endContent={
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="text-xl md:text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
                <Select
                  label="Status"
                  name="Status"
                  placeholder="Select your status"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  value={data.Status}
                  onChange={(e) => setData({ ...data, Status: e.target.value })}
                  errorMessage={errors.Status}
                  isInvalid={!!errors.Status}
                >
                  <SelectItem key="" disabled>
                    Select Status
                  </SelectItem>
                  <SelectItem key="Single">Single</SelectItem>
                  <SelectItem key="Married">Married</SelectItem>
                  <SelectItem key="Widowed">Widowed</SelectItem>
                  <SelectItem key="Separated">Separated</SelectItem>
                  <SelectItem key="Other">Other</SelectItem>
                </Select>
                <Input
                  type="text"
                  name="ContactNumber"
                  label="Contact Number"
                  maxLength={11}
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  value={data.ContactNumber}
                  onChange={(e) =>
                    setData({ ...data, ContactNumber: e.target.value })
                  }
                  errorMessage={errors.ContactNumber}
                  isInvalid={!!errors.ContactNumber}
                  endContent={
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="text-xl md:text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
                <Input
                  type="text"
                  name="email"
                  label="Email"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  errorMessage={errors.email}
                  isInvalid={!!errors.email}
                  endContent={
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-xl md:text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
              </div>
              <div className="mt-2">
                <Input
                  name="password"
                  label="Password"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  errorMessage={errors.password}
                  isInvalid={!!errors.password}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isVisible ? (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className="text-xl md:text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-xl md:text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                />
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibilityConfirm}
                      aria-label="toggle password visibility"
                    >
                      {isVisibleConfirm ? (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className="text-xl md:text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-xl md:text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      )}
                    </button>
                  }
                  type={isVisibleConfirm ? "text" : "password"}
                  value={data.confirmPassword}
                  onChange={(e) =>
                    setData({ ...data, confirmPassword: e.target.value })
                  }
                  errorMessage={errors.confirmPassword}
                  isInvalid={!!errors.confirmPassword}
                />
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
                <Button
                  className="w-full md:w-1/2 text-md"
                  color="danger"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full md:w-1/2 text-md"
                  color="primary"
                >
                  Submit
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default TeacherRegister;
