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
  Textarea,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faComment,
  faQuestion,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const ImportSentenceSucess = ({ show, onHide }) => {
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
          Sentence imported Successfully!
        </ModalHeader>
        <ModalBody>
          <p>You have imported a sentence for your students!</p>
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

const ImportSentence = ({ show, onHide }) => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState({
    Type: "",
    Word: "",
    Image: null,
    Audio: null,
  });

  const importSentence = async (e) => {
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
        size="2xl"
        aria-labelledby="contained-modal-title-vcenter"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior={"inside"}
      >
        <ModalContent>
          <ModalHeader id="contained-modal-title-vcenter">
            Import New Sentence
          </ModalHeader>
          <form onSubmit={importSentence}>
            <ModalBody>
              <div className="text-sm">
                <p>Please add an information to your assessment.</p>
              </div>
              <Select
                labelPlacement="outside"
                defaultSelectedKeys={"1"}
                disabledKeys={"0"}
                label="Select type of Word Assessment"
                aria-label="Select activity type"
                value={data.Type}
                variant="bordered"
                className="bg-transparent py-1 my-1"
                onChange={(e) => setData({ ...data, Type: e.target.value })}
              >
                <SelectItem key="0">Select Type of Assessment:</SelectItem>
                <SelectItem key="1">Assessment 4: Pagbabasa</SelectItem>
              </Select>

              <Textarea
                type="textfield"
                placeholder="Input sentence"
                labelPlacement="outside"
                label="Add a filipino short reading story"
                variant="bordered"
                className="bg-transparent py-1 my-1"
                value={data.Word}
                onChange={(e) => setData({ ...data, Word: e.target.value })}
                endContent={
                  <FontAwesomeIcon
                    icon={faBook}
                    className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                  />
                }
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  label="Question 1"
                  placeholder="Write a question"
                  labelPlacement="outside"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  onChange={(e) => setData({ ...data, Image: e.target.value })}
                  endContent={
                    <FontAwesomeIcon
                      icon={faQuestion}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
                <Input
                  type="text"
                  label="Answer 1"
                  placeholder="Input the answer"
                  labelPlacement="outside"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  onChange={(e) => setData({ ...data, Audio: e.target.value })}
                  endContent={
                    <FontAwesomeIcon
                      icon={faComment}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />

                <Input
                  type="text"
                  label="Question 2"
                  placeholder="Write a question"
                  labelPlacement="outside"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  onChange={(e) => setData({ ...data, Image: e.target.value })}
                  endContent={
                    <FontAwesomeIcon
                      icon={faQuestion}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
                <Input
                  type="text"
                  label="Answer 2"
                  placeholder="Input the answer"
                  labelPlacement="outside"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  onChange={(e) => setData({ ...data, Audio: e.target.value })}
                  endContent={
                    <FontAwesomeIcon
                      icon={faComment}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />

                <Input
                  type="text"
                  label="Question 3"
                  placeholder="Write a question"
                  labelPlacement="outside"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  onChange={(e) => setData({ ...data, Image: e.target.value })}
                  endContent={
                    <FontAwesomeIcon
                      icon={faQuestion}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
                <Input
                  type="text"
                  label="Answer 3"
                  placeholder="Input the answer"
                  labelPlacement="outside"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  onChange={(e) => setData({ ...data, Audio: e.target.value })}
                  endContent={
                    <FontAwesomeIcon
                      icon={faComment}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
                <Input
                  type="text"
                  label="Question 4"
                  placeholder="Write a question"
                  labelPlacement="outside"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  onChange={(e) => setData({ ...data, Image: e.target.value })}
                  endContent={
                    <FontAwesomeIcon
                      icon={faQuestion}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
                <Input
                  type="text"
                  label="Answer 4"
                  placeholder="Input the answer"
                  labelPlacement="outside"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  onChange={(e) => setData({ ...data, Audio: e.target.value })}
                  endContent={
                    <FontAwesomeIcon
                      icon={faComment}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
                <Input
                  type="text"
                  label="Question 5"
                  placeholder="Write a question"
                  labelPlacement="outside"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  onChange={(e) => setData({ ...data, Image: e.target.value })}
                  endContent={
                    <FontAwesomeIcon
                      icon={faQuestion}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
                <Input
                  type="text"
                  label="Answer 5"
                  placeholder="Input the answer"
                  labelPlacement="outside"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  onChange={(e) => setData({ ...data, Audio: e.target.value })}
                  endContent={
                    <FontAwesomeIcon
                      icon={faComment}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
              </div>
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
      <ImportSentenceSucess
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

// Add prop types validation
ImportSentence.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default ImportSentence;
