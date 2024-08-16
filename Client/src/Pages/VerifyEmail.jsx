import React, { useState } from "react";
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

const VerifyEmail = () => {
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

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex bg-[#f4e7c9] w-full h-screen ">
      <div className="w-full flex flex-col items-center justify-center m-3">
        <Card className="w-[50%] flex flex-col p-4 ">
          <h1 className="text-3xl font-bold items-center justify-center">
            Verify Email
          </h1>
          <p className="text-sm items-center justify-center mt-2">
            Please enter the OTP code that has been sent to your email for
            verification.
          </p>
          <CardBody>
            <form>
              <div className="flex flex-col gap-2">
                <Input
                  type="text"
                  label="OTP Code"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  onChange={handleChange}
                  endContent={
                    <FontAwesomeIcon
                      icon={faLock}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
              </div>
              <div className="w-full flex items-center justify-center gap-6 my-4">
                <Button className="my-2" size="lg" radius="md" color="danger">
                  <Link to="/login">Cancel</Link>
                </Button>
                <Button
                  type="submit"
                  className="my-2"
                  size="lg"
                  radius="md"
                  color="primary"
                >
                  Next
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmail;
