import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const ShowStatus = ({
  show,
  onHide,
  status,
  comment,
  randomRecommendation,
}) => (
  <Modal
    isOpen={show}
    onClose={onHide}
    aria-labelledby="contained-modal-title-vcenter"
    isDismissable={false}
    isKeyboardDismissDisabled={true}
  >
    <ModalContent>
      <ModalHeader>Assess Student Performance Successfully</ModalHeader>
      <ModalBody>
        <p>
          <b>Status:</b> {status || "Status not available"}
        </p>
        <p>
          <b>Comment:</b> {comment || "No comments available"}
        </p>
        <p>
          <b>Recommendation:</b>
        </p>
        <p>{randomRecommendation || "No recommendations available"}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onHide}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

const StudentStatus = ({ show, onHide, LRN, onStatusUpdate }) => {
  const [modalSubmitSuccess, setModalSubmitSuccess] = useState(false);
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const [randomRecommendation, setRandomRecommendation] = useState("");

  // Handle status update on button click
  const handleAssessClick = async () => {
    try {
      const response = await axios.patch(`/api/studentStatus/${LRN}`);
      console.log("Response data:", response.data);

      const { status, comment, recommendation } = response.data;
      onStatusUpdate(status);
      setStatus(status);
      setComment(comment);

      // Select a random recommendation and store it in state
      if (Array.isArray(recommendation) && recommendation.length > 0) {
        const randomIndex = Math.floor(Math.random() * recommendation.length);
        setRandomRecommendation(recommendation[randomIndex]);
      } else {
        setRandomRecommendation(
          recommendation || "No recommendations available"
        );
      }

      setModalSubmitSuccess(true);
    } catch (error) {
      toast.error("Error updating student status");
      console.error("Error updating student status:", error);
    }
  };

  return (
    <>
      <Modal
        isOpen={show}
        onClose={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col">
            Assess Student Status
          </ModalHeader>
          <ModalBody>
            <p>
              Do you want to assess the performance of the selected student?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={onHide}>
              Close
            </Button>
            <Button color="primary" onClick={handleAssessClick}>
              Assess
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ShowStatus
        show={modalSubmitSuccess}
        onHide={() => {
          setModalSubmitSuccess(false);
          onHide();
        }}
        status={status}
        comment={comment}
        randomRecommendation={randomRecommendation} // Pass the selected random recommendation
      />
    </>
  );
};

// Prop types validation
StudentStatus.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  LRN: PropTypes.string.isRequired,
  onStatusUpdate: PropTypes.func.isRequired,
};

export default StudentStatus;
