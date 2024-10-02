import { useState } from "react";
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-hot-toast";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const loginButton = () => {
    navigate("/login");
  };

  const [data, setData] = useState({
    email: "",
  });

  const forgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/forgotPass", {
        email: data.email,
      });

      const responseData = response.data;
      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        setData({
          email: "",
        });
        toast.success("User Existed, Reset link has sent to your email.");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while logging in.");
    }
  };

  return (
    <div className="flex bg-[#f6fbff] w-full h-screen ">
      <div className="w-full flex flex-col items-center justify-center m-3">
        <Card className="w-[50%] flex flex-col p-4 ">
          <h1 className="text-3xl font-bold items-center justify-center">
            Forgot Password
          </h1>
          <p className="text-sm items-center justify-center mt-2">
            Please enter your registered email to reset your password.
          </p>
          <CardBody>
            <form onSubmit={forgotPassword}>
              <div className="flex flex-col gap-2">
                <Input
                  type="email"
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
              </div>
              <div className="w-full flex items-center justify-center gap-6 my-4">
                <Button
                  className="my-2"
                  size="lg"
                  radius="md"
                  color="danger"
                  variant="light"
                  onClick={loginButton}
                >
                  Back
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

export default ForgotPassword;
