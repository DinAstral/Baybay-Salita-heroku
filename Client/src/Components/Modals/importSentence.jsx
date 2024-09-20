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
    Sentence: "",
    Questions: [
      { Question: "", Answer: "" },
      { Question: "", Answer: "" },
      { Question: "", Answer: "" },
      { Question: "", Answer: "" },
      { Question: "", Answer: "" },
    ],
  });

  const importSentence = async (e) => {
    e.preventDefault();
    const { Type, Sentence, Questions } = data;

    if (!Type || !Sentence) {
      return toast.error("All fields are required.");
    }

    try {
      const response = await axios.post("/importSentence", {
        Type,
        Sentence,
        Questions: JSON.stringify(Questions),
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

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...data.Questions];
    updatedQuestions[index].Question = value;
    setData({ ...data, Questions: updatedQuestions });
  };

  const handleAnswerChange = (index, value) => {
    const updatedQuestions = [...data.Questions];
    updatedQuestions[index].Answer = value;
    setData({ ...data, Questions: updatedQuestions });
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
        scrollBehavior="inside" // The prop remains
      >
        <ModalContent>
          <ModalHeader id="import-modal-title">Import New Sentence</ModalHeader>
          <form onSubmit={importSentence}>
            <ModalBody>
              <div className="text-sm">
                <p>Please provide the information for your assessment.</p>
              </div>
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
                <SelectItem key="1">Assessment 4: Pagbabasa</SelectItem>
              </Select>

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
                    icon={faBook}
                    className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                  />
                }
              />

              <div className="flex flex-col gap-6 overflow-y-auto max-h-96">
                {data.Questions.map((qa, index) => (
                  <div className="flex flex-wrap gap-4" key={index}>
                    <div className="flex flex-1">
                      <Input
                        type="text"
                        label={`Question ${index + 1}`}
                        placeholder="Write a question"
                        labelPlacement="outside"
                        variant="bordered"
                        className="bg-transparent py-1 my-1"
                        value={qa.Question}
                        onChange={(e) =>
                          handleQuestionChange(index, e.target.value)
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
                        label={`Answer ${index + 1}`}
                        placeholder="Input the answer"
                        labelPlacement="outside"
                        variant="bordered"
                        className="bg-transparent py-1 my-1"
                        value={qa.Answer}
                        onChange={(e) =>
                          handleAnswerChange(index, e.target.value)
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
                ))}
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
