import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { CalendarDate } from "@internationalized/date";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
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
import { Link, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const [isInvalid, setIsInvalid] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const [value, setValue] = React.useState(parseDate("2024-04-04"));

  let formatter = useDateFormatter({ dateStyle: "full" });

  const registerTeacher = async (e) => {
    e.preventDefault();
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
        toast.success("Register Successful.");
        localStorage.setItem("userId", response.data.userId); // Store userId for verification step
        navigate("/verifyEmail");
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
            Teacher Registration
          </h1>
          <p className="text-sm items-center justify-center">
            Please fill up the details needed!
          </p>
          <CardBody>
            <form onSubmit={registerTeacher}>
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
                <Select
                  label="Section"
                  name="section"
                  placeholder="Select your handled section"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  value={data.Section}
                  onChange={(e) =>
                    setData({ ...data, Section: e.target.value })
                  }
                >
                  <SelectItem key="" disabled>
                    Select Section
                  </SelectItem>
                  <SelectItem key="Daffodil">Daffodil</SelectItem>
                  <SelectItem key="Sampagita">Sampagita</SelectItem>
                  <SelectItem key="Banaba">Banaba</SelectItem>
                </Select>
                <Select
                  label="Department"
                  name="section"
                  placeholder="Select your handled department"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  value={data.Department}
                  onChange={(e) =>
                    setData({ ...data, Department: e.target.value })
                  }
                >
                  <SelectItem key="" disabled>
                    Select Department
                  </SelectItem>
                  <SelectItem key="Filipino">Filipino</SelectItem>
                </Select>

                <Input
                  type="date"
                  placeholder="Ilagay ang iyong Kaarawan"
                  value={data.Birthday}
                  onChange={(e) =>
                    setData({ ...data, Birthday: e.target.value })
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

export default TeacherRegister;
