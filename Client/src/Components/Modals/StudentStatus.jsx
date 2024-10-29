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
  recommendation,
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
          <b>Recommendation:</b> {recommendation || "No recommendations available"}
        </p>
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
  const [recommendation, setRecommendation] = useState("");

  const handleAssessClick = async () => {
    try {
      const response = await axios.patch(`/api/studentStatus/${LRN}`);
      console.log("Response data:", response.data);

      const { status, comment, recommendation } = response.data;
      onStatusUpdate(status);
      setStatus(status);
      setComment(comment);

      // Set the single recommendation string
      setRecommendation(recommendation || "No recommendations available");

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
        recommendation={recommendation} // Pass the single recommendation
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
