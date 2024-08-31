/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import toast from "react-hot-toast";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const DeleteSuccess = ({ show, onHide }) => (
  <Modal
    isOpen={show}
    onClose={onHide}
    aria-labelledby="contained-modal-title-vcenter"
    isDismissable={false}
    isKeyboardDismissDisabled={true}
  >
    <ModalContent>
      <ModalHeader id="contained-modal-title-vcenter">
        Delete Student Successful
      </ModalHeader>
      <ModalBody>
        <p>You have deleted the student information.</p>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={onHide}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

const DeleteStudent = ({ show, onHide, student, onDeleteSuccess }) => {
  const [modalDeleteSuccess, setModalDeleteSuccess] = useState(false);

  const deleteStudent = async () => {
    try {
      await axios.delete(`/getStudent/${student._id}`); // Ensure this route matches your backend
      setModalDeleteSuccess(true);
      onDeleteSuccess(student._id); // Callback to remove student from list
    } catch (err) {
      console.error("Error deleting student:", err);
      toast.error("Failed to delete student. Please try again later.");
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
          <ModalHeader id="contained-modal-title-vcenter">
            Delete Student Information
          </ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this student's information?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onClick={onHide}>
              Cancel
            </Button>
            <Button color="danger" onClick={deleteStudent}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <DeleteSuccess
        show={modalDeleteSuccess}
        onHide={() => {
          setModalDeleteSuccess(false);
          onHide();
        }}
      />
    </>
  );
};

// Add prop types validation
DeleteStudent.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
  student: PropTypes.object,
};

export default DeleteStudent;
