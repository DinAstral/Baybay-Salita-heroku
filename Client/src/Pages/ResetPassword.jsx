import { useState } from "react";
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-hot-toast";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const resetPassword = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const { data } = await axios.post(`/reset-password/${id}/${token}`, {
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Reset Password Successful.");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-[#f6fbff] w-full h-screen ">
      <div className="w-full flex flex-col items-center justify-center m-3">
        <Card className="w-[50%] flex flex-col p-4 ">
          <h1 className="text-3xl font-bold items-center justify-center">
            Reset Password
          </h1>
          <p className="text-sm items-center justify-center mt-2">
            Please input your new password to your account.
          </p>
          <CardBody>
            <form onSubmit={resetPassword}>
              <div className="flex flex-col gap-2">
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
                  <Link to="/login">Cancel</Link>
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

export default ResetPassword;
