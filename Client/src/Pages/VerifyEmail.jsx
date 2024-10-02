import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const loginButton = () => {
    navigate("/login");
  };

  const verifyUser = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

    if (!userId) {
      toast.error("User ID is missing. Please try registering again.");
      return;
    }

    try {
      const response = await axios.post("/api/verify", { userId, otp });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setOtp("");
        toast.success("Verification successful. Please log in.");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during verification. Please try again.");
    }
  };

  return (
    <div className="flex bg-[#f6fbff] w-full h-screen">
      <div className="w-full flex flex-col items-center justify-center m-3">
        <Card className="w-[50%] flex flex-col p-4">
          <h1 className="text-3xl font-bold items-center justify-center">
            Verify Email
          </h1>
          <p className="text-sm items-center justify-center mt-2">
            Please enter the OTP code that has been sent to your email for
            verification.
          </p>
          <CardBody>
            <form onSubmit={verifyUser}>
              <div className="flex flex-col gap-2">
                <Input
                  type="text"
                  label="Enter the code"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  endContent={
                    <FontAwesomeIcon
                      icon={faLock}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
              </div>
              <div className="w-full flex items-center justify-center gap-6 my-4">
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

export default VerifyEmail;
