import { useState } from "react";
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
    <div className="flex bg-[#f4e7c9] w-full h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg flex flex-col items-center justify-center">
        <Card className="w-full p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Registration
          </h1>
          <p className="text-sm text-center mb-6">
            Please fill up the details needed!
          </p>
          <CardBody>
            <form>
              <div className="flex flex-col items-center justify-center mb-6">
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
                  className="space-x-4"
                >
                  <Checkbox value="Parent">Parent</Checkbox>
                  <Checkbox value="Teacher">Teacher</Checkbox>
                </CheckboxGroup>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Button className="my-2" size="lg" radius="md" color="danger">
                  <Link to="/login" className="text-white">
                    Cancel
                  </Link>
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
