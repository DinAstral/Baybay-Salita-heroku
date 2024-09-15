/* eslint-disable react/prop-types */
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
  Select,
  Input,
  SelectItem,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ImportSuccess = ({ show, onHide }) => {
  const handleSuccessClick = () => {
    onHide();
    window.location.reload(); // You might want to change this to a more efficient state update instead of reloading the page.
  };

  return (
    <Modal
      isOpen={show}
      onClose={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        <ModalHeader id="contained-modal-title-vcenter">
          Word imported Successfully!
        </ModalHeader>
        <ModalBody>
          <p>You have imported a word for your students!</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSuccessClick}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ImportWord = ({ show, onHide }) => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState({
    Type: "",
    Word: "",
    Image: null,
    Audio: null,
  });

  const importWord = async (e) => {
    e.preventDefault();
    const { Type, Word, Image, Audio } = data;

    if (!Type || !Word || !Image || !Audio) {
      return toast.error("All fields are required.");
    }

    const formData = new FormData();
    formData.append("Type", Type);
    formData.append("Word", Word);
    formData.append("Image", Image);
    formData.append("Audio", Audio);

    try {
      const response = await axios.post("/importWord", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Word imported successfully.");
        setModalShow(true); // Show success modal
      }
    } catch (error) {
      console.error("Failed to import word:", error);
      toast.error("Failed to import word.");
    }
  };

  return (
    <>
      <Modal
        isOpen={show}
        onClose={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior={"inside"}
      >
        <ModalContent>
          <ModalHeader id="contained-modal-title-vcenter">
            Import New Word
          </ModalHeader>
          <form onSubmit={importWord}>
            <ModalBody>
              <Select
                labelPlacement="outside"
                label="Select type of Word Assessment"
                aria-label="Select activity type"
                value={data.Type}
                variant="bordered"
                className="bg-transparent py-1 my-1"
                onChange={(e) => setData({ ...data, Type: e.target.value })}
              >
                <SelectItem key="">Select Type of Assessment:</SelectItem>
                <SelectItem key="Pagbabaybay">
                  Assessment 1: Pagbabaybay Tunog at Letra
                </SelectItem>
                <SelectItem key="Pantig">Assessment 2: Pantig</SelectItem>
                <SelectItem key="Salita">Assessment 3: Salita</SelectItem>
              </Select>

              <Input
                type="text"
                placeholder="Input Word"
                labelPlacement="outside"
                label="Word/Letra/Tunog"
                variant="bordered"
                className="bg-transparent py-1 my-1"
                value={data.Word}
                onChange={(e) => setData({ ...data, Word: e.target.value })}
                endContent={
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                  />
                }
              />
              <Input
                type="file"
                label="Insert an Image"
                variant="bordered"
                className="bg-transparent py-1 my-1"
                onChange={(e) => setData({ ...data, Image: e.target.files[0] })}
                endContent={
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                  />
                }
              />
              <Input
                type="file"
                label="Insert an Audio"
                variant="bordered"
                className="bg-transparent py-1 my-1"
                onChange={(e) => setData({ ...data, Audio: e.target.files[0] })}
                endContent={
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                  />
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={onHide}>
                Close
              </Button>
              <Button color="primary" type="submit">
                Import
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <ImportSuccess show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

// Add prop types validation
ImportWord.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default ImportWord;
