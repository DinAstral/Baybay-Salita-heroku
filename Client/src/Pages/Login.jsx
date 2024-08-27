import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Input, Checkbox, Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

import Image1 from "../../src/assets/BaybaySalita_Logo.png";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const [isSelected, setIsSelected] = React.useState(false);

  const registerButton = () => {
    navigate("/register");
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        email: data.email,
        password: data.password,
      });

      const responseData = response.data;
      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        // Store the token in localStorage
        localStorage.setItem("token", responseData.token);

        setData({
          email: "",
          password: "",
        });
        if (responseData.role === "Parent") {
          toast.success("Login Successful.");
          navigate("/parentDashboard");
        } else if (responseData.role === "Teacher") {
          toast.success("Login Successful.");
          navigate("/teacherDashboard");
        } else if (responseData.role === "Admin") {
          toast.success("Login Successful.");
          navigate("/AdminDashboard");
        } else {
          toast.error("No User Registered");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while logging in.");
    }
  };

  return (
    <div className="w-full h-screen flex items-start">
      <div className="w-[65%] bg-[#f4e7c9] h-full flex flex-col">
        <img
          src={Image1}
          className="w-full h-full object-cover"
          alt="Learning Platform"
        />
      </div>

      <div className="w-[35%] h-full bg-[#FAFAFA] flex flex-col p-20 justify-between">
        <h1 className="text-xl text-[#060606] font-semibold">
          Taytay Elementary School Baybay Salita
        </h1>
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-2">Login</h3>
            <p className="text-sm mb-2">
              Welcome Back! Please enter your details.
            </p>
          </div>

          <div className="w-full flex flex-col">
            <Input
              type="email"
              label="Email"
              variant="bordered"
              placeholder="Enter your email"
              className="bg-transparent py-1 my-1"
              errorMessage="Please enter a valid email"
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
              label="Password"
              placeholder="Enter your password"
              variant="bordered"
              className="py-1 my-0 mb-2"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
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
          </div>

          <div className="w-full flex items-center justify-between">
            <div className="w-full flex items-center">
              <Checkbox
                className="w-full h-4 mr-2"
                isSelected={isSelected}
                onValueChange={setIsSelected}
              >
                <p className="text-sm">Remember me</p>
              </Checkbox>
            </div>

            <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
              <Link to="/forgotPassword">Forgot Password?</Link>
            </p>
          </div>

          <div className="w-full flex flex-col my-4">
            <Button
              className="my-2"
              size="lg"
              radius="md"
              color="primary"
              onClick={loginUser}
            >
              Login
            </Button>

            <Button
              className="my-2"
              size="lg"
              radius="md"
              onClick={registerButton}
            >
              Register
            </Button>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-[#060606]"></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
