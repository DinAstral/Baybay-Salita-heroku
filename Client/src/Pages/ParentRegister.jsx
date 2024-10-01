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

const ParentRegister = () => {
  const [data, setData] = useState({
    FirstName: "",
    LastName: "",
    StudentName: "",
    LRN: "",
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
    if (!data.LRN) {
      newErrors.LRN = "LRN is required";
      isValid = false;
    }
    // Validate LRN
    if (!isNumber(data.LRN)) {
      newErrors.LRN = "Invalid LRN";
      isValid = false;
    }
    if (!data.StudentName) {
      newErrors.StudentName = "StudentName is required";
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

  const registerParent = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    const {
      FirstName,
      LastName,
      StudentName,
      LRN,
      Birthday,
      Address,
      Status,
      Gender,
      ContactNumber,
      email,
      password,
    } = data;

    try {
      const response = await axios.post("/api/registerParent", {
        FirstName,
        LastName,
        StudentName,
        LRN,
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
        toast.success("Register Verification.");
        localStorage.setItem("userId", response.data.data.userId);
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
            Parent Registration
          </h1>
          <p className="text-sm text-center mb-4">
            Please fill up the details needed!
          </p>
          <CardBody>
            <form onSubmit={registerParent}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="FirstName"
                  label="First Name"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  value={data.FirstName}
                  errorMessage={errors.FirstName}
                  isInvalid={!!errors.FirstName}
                  onChange={(e) =>
                    setData({ ...data, FirstName: e.target.value })
                  }
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
                  errorMessage={errors.LastName}
                  isInvalid={!!errors.LastName}
                  onChange={(e) =>
                    setData({ ...data, LastName: e.target.value })
                  }
                  endContent={
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-xl md:text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
                <Input
                  type="text"
                  label="Name of Grade 1 student"
                  name="Name of Grade 1 student"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  value={data.StudentName}
                  errorMessage={errors.StudentName}
                  isInvalid={!!errors.StudentName}
                  onChange={(e) =>
                    setData({ ...data, StudentName: e.target.value })
                  }
                  endContent={
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-xl md:text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
                <Input
                  type="text"
                  label="LRN of Grade 1 student"
                  name="LRN of Grade 1 student"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  value={data.LRN}
                  onChange={(e) => setData({ ...data, LRN: e.target.value })}
                  maxLength={12} // Limit LRN to 12 characters
                  errorMessage={errors.LRN}
                  isInvalid={!!errors.LRN}
                  endContent={
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-xl md:text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
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
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  value={data.ContactNumber}
                  onChange={(e) =>
                    setData({ ...data, ContactNumber: e.target.value })
                  }
                  maxLength={11} // Limit to 11 characters
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
                  type="email"
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

              <div className="mt-4">
                <Input
                  type={isVisible ? "text" : "password"}
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
                    <FontAwesomeIcon
                      icon={isVisible ? faEye : faEyeSlash}
                      className="text-xl md:text-2xl text-default-400 cursor-pointer"
                      onClick={toggleVisibility}
                    />
                  }
                />
              </div>
              <div className="mt-4">
                <Input
                  type={isVisibleConfirm ? "text" : "password"}
                  name="confirmPassword"
                  label="Confirm Password"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  value={data.confirmPassword}
                  onChange={(e) =>
                    setData({ ...data, confirmPassword: e.target.value })
                  }
                  errorMessage={errors.confirmPassword}
                  isInvalid={!!errors.confirmPassword}
                  endContent={
                    <FontAwesomeIcon
                      icon={isVisibleConfirm ? faEye : faEyeSlash}
                      className="text-xl md:text-2xl text-default-400 cursor-pointer"
                      onClick={toggleVisibilityConfirm}
                    />
                  }
                />
              </div>
              <div className="flex items-center justify-center gap-6 my-4">
                <Button
                  className="w-full md:w-1/3 text-md"
                  color="danger"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full md:w-1/3 text-md"
                  color="primary"
                >
                  Register
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ParentRegister;
