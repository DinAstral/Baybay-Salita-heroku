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
  faPen,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

const ImportSentenceSucess = ({ show, onHide }) => {
  const handleSuccessClick = () => {
    onHide();
  };

  return (
    <Modal
      isOpen={show}
      onClose={onHide}
      aria-labelledby="success-modal-title"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        <ModalHeader id="success-modal-title">
          Sentence Imported Successfully!
        </ModalHeader>
        <ModalBody>
          <p>You have successfully imported a sentence for your students!</p>
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
    Title: "",
    Sentence: "",
    Question1: "",
    Question2: "",
    Question3: "",
    Question4: "",
    Question5: "",
    Answer1: "",
    Answer2: "",
    Answer3: "",
    Answer4: "",
    Answer5: "",
  });

  const importSentence = async (e) => {
    e.preventDefault();
    const {
      Type,
      Title,
      Sentence,
      Question1,
      Question2,
      Question3,
      Question4,
      Question5,
      Answer1,
      Answer2,
      Answer3,
      Answer4,
      Answer5,
    } = data;

    if (!Type || !Sentence) {
      return toast.error("All fields are required.");
    }

    try {
      const response = await axios.post("/api/importSentence", {
        Type,
        Title,
        Sentence,
        Question1,
        Question2,
        Question3,
        Question4,
        Question5,
        Answer1,
        Answer2,
        Answer3,
        Answer4,
        Answer5,
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Sentence imported successfully.");
        setModalShow(true); // Show success modal
      }
    } catch (error) {
      console.error("Failed to import sentence:", error);
      toast.error("Failed to import sentence.");
    }
  };

  return (
    <>
      <Modal
        isOpen={show}
        onClose={onHide}
        size="2xl"
        aria-labelledby="import-modal-title"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
        placement="center"
      >
        <ModalContent className="w-full md:w-[50vw] max-w-full max-h-[80vh] overflow-y-auto bg-white p-4 rounded-lg">
          <ModalHeader id="import-modal-title">Import New Sentence</ModalHeader>
          <form onSubmit={importSentence}>
            <ModalBody>
              <div className="text-sm">
                <p>Please provide the information for your assessment.</p>
              </div>
              <Select
                labelPlacement="outside"
                label="Select type of Assessment"
                aria-label="Select activity type"
                defaultSelectedKeys={[" "]}
                value={data.Type}
                variant="bordered"
                className="bg-transparent py-1 my-1"
                onChange={(e) => setData({ ...data, Type: e.target.value })}
              >
                <SelectItem key=" ">Select Type of Assessment:</SelectItem>
                <SelectItem key="1">Assessment 4: Pagbabasa</SelectItem>
              </Select>

              <Input
                type="text"
                label={`Title`}
                placeholder="Enter a title"
                labelPlacement="outside"
                variant="bordered"
                className="bg-transparent py-1 my-1"
                value={data.Title}
                onChange={(e) => setData({ ...data, Title: e.target.value })}
                endContent={
                  <FontAwesomeIcon
                    icon={faBook}
                    className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                  />
                }
              />

              <Textarea
                placeholder="Input sentence"
                labelPlacement="outside"
                label="Add a Filipino short reading story"
                variant="bordered"
                className="bg-transparent py-1 my-1"
                value={data.Sentence}
                onChange={(e) => setData({ ...data, Sentence: e.target.value })}
                endContent={
                  <FontAwesomeIcon
                    icon={faPen}
                    className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                  />
                }
              />

              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-1">
                    <Input
                      type="text"
                      label={`Question 1`}
                      placeholder="Write a question"
                      labelPlacement="outside"
                      variant="bordered"
                      className="bg-transparent py-1 my-1"
                      value={data.Question1}
                      onChange={(e) =>
                        setData({ ...data, Question1: e.target.value })
                      }
                      endContent={
                        <FontAwesomeIcon
                          icon={faQuestion}
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      }
                    />
                  </div>
                  <div className="flex flex-1">
                    <Input
                      type="text"
                      label={`Answer 1`}
                      placeholder="Input the answer"
                      labelPlacement="outside"
                      variant="bordered"
                      className="bg-transparent py-1 my-1"
                      value={data.Answer1}
                      onChange={(e) =>
                        setData({ ...data, Answer1: e.target.value })
                      }
                      endContent={
                        <FontAwesomeIcon
                          icon={faComment}
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-1">
                    <Input
                      type="text"
                      label={`Question 1`}
                      placeholder="Write a question"
                      labelPlacement="outside"
                      variant="bordered"
                      className="bg-transparent py-1 my-1"
                      value={data.Question2}
                      onChange={(e) =>
                        setData({ ...data, Question2: e.target.value })
                      }
                      endContent={
                        <FontAwesomeIcon
                          icon={faQuestion}
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      }
                    />
                  </div>
                  <div className="flex flex-1">
                    <Input
                      type="text"
                      label={`Answer 1`}
                      placeholder="Input the answer"
                      labelPlacement="outside"
                      variant="bordered"
                      className="bg-transparent py-1 my-1"
                      value={data.Answer2}
                      onChange={(e) =>
                        setData({ ...data, Answer2: e.target.value })
                      }
                      endContent={
                        <FontAwesomeIcon
                          icon={faComment}
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-1">
                    <Input
                      type="text"
                      label={`Question 3`}
                      placeholder="Write a question"
                      labelPlacement="outside"
                      variant="bordered"
                      className="bg-transparent py-1 my-1"
                      value={data.Question3}
                      onChange={(e) =>
                        setData({ ...data, Question3: e.target.value })
                      }
                      endContent={
                        <FontAwesomeIcon
                          icon={faQuestion}
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      }
                    />
                  </div>
                  <div className="flex flex-1">
                    <Input
                      type="text"
                      label={`Answer 3`}
                      placeholder="Input the answer"
                      labelPlacement="outside"
                      variant="bordered"
                      className="bg-transparent py-1 my-1"
                      value={data.Answer3}
                      onChange={(e) =>
                        setData({ ...data, Answer3: e.target.value })
                      }
                      endContent={
                        <FontAwesomeIcon
                          icon={faComment}
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-1">
                    <Input
                      type="text"
                      label={`Question 4`}
                      placeholder="Write a question"
                      labelPlacement="outside"
                      variant="bordered"
                      className="bg-transparent py-1 my-1"
                      value={data.Question4}
                      onChange={(e) =>
                        setData({ ...data, Question4: e.target.value })
                      }
                      endContent={
                        <FontAwesomeIcon
                          icon={faQuestion}
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      }
                    />
                  </div>
                  <div className="flex flex-1">
                    <Input
                      type="text"
                      label={`Answer 4`}
                      placeholder="Input the answer"
                      labelPlacement="outside"
                      variant="bordered"
                      className="bg-transparent py-1 my-1"
                      value={data.Answer4}
                      onChange={(e) =>
                        setData({ ...data, Answer4: e.target.value })
                      }
                      endContent={
                        <FontAwesomeIcon
                          icon={faComment}
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-1">
                    <Input
                      type="text"
                      label={`Question 5`}
                      placeholder="Write a question"
                      labelPlacement="outside"
                      variant="bordered"
                      className="bg-transparent py-1 my-1"
                      value={data.Question5}
                      onChange={(e) =>
                        setData({ ...data, Question5: e.target.value })
                      }
                      endContent={
                        <FontAwesomeIcon
                          icon={faQuestion}
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      }
                    />
                  </div>
                  <div className="flex flex-1">
                    <Input
                      type="text"
                      label={`Answer 5`}
                      placeholder="Input the answer"
                      labelPlacement="outside"
                      variant="bordered"
                      className="bg-transparent py-1 my-1"
                      value={data.Answer5}
                      onChange={(e) =>
                        setData({ ...data, Answer5: e.target.value })
                      }
                      endContent={
                        <FontAwesomeIcon
                          icon={faComment}
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      }
                    />
                  </div>
                </div>
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
