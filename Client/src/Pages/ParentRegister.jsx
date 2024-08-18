import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { CalendarDate } from "@internationalized/date";
import {
  Input,
  Button,
  Card,
  CardBody,
  DatePicker,
  Select,
  SelectItem,
  Checkbox,
  CheckboxGroup,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faUser,
  faEnvelope,
  faLock,
  faIdCard,
  faEye,
  faEyeSlash,
  faPhone,
  faLocationDot,
  faPersonHalfDress,
  faCakeCandles,
} from "@fortawesome/free-solid-svg-icons";

const ParentRegister = () => {
  const [data, setData] = useState({
    FirstName: "",
    LastName: "",
    Age: "",
    Birthday: "",
    Gender: "",
    Address: "",
    Status: "",
    ContactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isInvalid, setIsInvalid] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const registerUser = async (e) => {
    e.preventDefault();
    const {
      FirstName,
      LastName,
      Student,
      LRN,
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
      const response = await axios.post("/register", {
        FirstName,
        LastName,
        Student,
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
        localStorage.setItem("userId", response.data.data.userId); // Store userId for verification step
        navigate("/verify");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex bg-[#f4e7c9] w-full h-screen ">
      <div className="w-full flex flex-col items-center justify-center m-3">
        <Card className="w-[70%] flex flex-col p-4 ">
          <h1 className="text-3xl font-bold items-center justify-center">
            Parent Registration
          </h1>
          <p className="text-sm items-center justify-center">
            Please fill up the details needed!
          </p>
          <CardBody>
            <form>
              <div className="grid grid-cols-2 gap-4">
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
                  endContent={
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
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
                  endContent={
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
                <Input
                  type="text"
                  label="Name of Grade 1 student"
                  name="Name of Grade 1 student"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  value={data.Student}
                  onChange={(e) =>
                    setData({ ...data, Student: e.target.value })
                  }
                  endContent={
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
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
                  endContent={
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
                <DatePicker
                  variant="bordered"
                  label={"Birth date"}
                  showMonthAndYearPickers
                  placeholderValue={new CalendarDate(1995, 11, 6)}
                  className="bg-transparent py-1 my-1"
                  selected={data.Birthday}
                  onDateChange={(date) => setData({ ...data, Birthday: date })}
                  endContent={
                    <FontAwesomeIcon
                      icon={faCakeCandles}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
                <Select
                  label="Gender"
                  name="Gender"
                  placeholder="Select your gender"
                  variant="bordered"
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
                  endContent={
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
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
                  endContent={
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
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
                  endContent={
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
                <Input
                  name="password"
                  label="Password"
                  variant="bordered"
                  className="py-1 my-0 mb-2"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
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
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
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
                  className="py-1 my-0 mb-2"
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
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      )}
                    </button>
                  }
                  type={isVisibleConfirm ? "text" : "password"}
                  value={data.confirmPassword}
                  onChange={(e) =>
                    setData({ ...data, confirmPassword: e.target.value })
                  }
                />
              </div>
              <div className="w-full flex items-center justify-center gap-6 my-4">
                <Button className="my-2" size="lg" radius="md" color="danger">
                  <Link to="/register">Cancel</Link>
                </Button>
                <Button
                  type="submit"
                  className="my-2"
                  size="lg"
                  radius="md"
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

export default ParentRegister;
