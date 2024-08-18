import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  CheckboxGroup,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";

const RegisterSelect = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [isInvalid, setIsInvalid] = useState(true);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedRole === "Parent") {
      navigate("/registerParent");
    } else if (selectedRole === "Teacher") {
      navigate("/registerTeacher");
    } else {
      setIsInvalid(true);
    }
  };

  return (
    <div className="flex bg-[#f4e7c9] w-full h-screen ">
      <div className="w-full flex flex-col items-center justify-center m-3">
        <Card className="w-[50%] flex flex-col p-4 ">
          <h1 className="text-3xl font-bold items-center justify-center">
            Registration
          </h1>
          <p className="text-sm items-center justify-center">
            Please fill up the details needed!
          </p>
          <CardBody>
            <form>
              <div className="w-full flex items-center justify-center flex-col">
                <CheckboxGroup
                  isRequired
                  description="Select only one"
                  orientation="horizontal"
                  isInvalid={isInvalid}
                  label="Select role"
                  onValueChange={(value) => {
                    setSelectedRole(value[0]);
                    setIsInvalid(value.length !== 1);
                  }}
                >
                  <Checkbox value="Parent">Parent</Checkbox>
                  <Checkbox value="Teacher">Teacher</Checkbox>
                </CheckboxGroup>
              </div>
              <div className="w-full flex items-center justify-center gap-6 my-4">
                <Button className="my-2" size="lg" radius="md" color="danger">
                  <Link to="/login">Cancel</Link>
                </Button>
                <Button
                  type="button"
                  className="my-2"
                  size="lg"
                  radius="md"
                  color="primary"
                  onClick={handleNext}
                  disabled={isInvalid}
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

export default RegisterSelect;
