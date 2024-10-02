/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
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
  SelectItem,
} from "@nextui-org/react";

const CreateSuccess = ({ show, onHide }) => {
  const handleSuccessClick = () => {
    onHide();
    window.location.reload(); // Consider updating state instead of reloading.
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
          Activity Created Successfully!
        </ModalHeader>
        <ModalBody>
          <p>You have created an activity for your students!</p>
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

const CreateAssessment = ({ show, handleClose, userId, section }) => {
  const [modalShow, setModalShow] = useState(false);
  const [words, setWords] = useState([]);
  const [sentences, setSentences] = useState([]); // Changed from sentence to sentences
  const [filteredWords, setFilteredWords] = useState([]);
  const [data, setData] = useState({
    Period: "",
    Type: "",
    Title: "",
    Item1: "",
    Item2: "",
    Item3: "",
    Item4: "",
    Item5: "",
    Item6: "",
    Item7: "",
    Item8: "",
    Item9: "",
    Item10: "",
  });

  const fetchImportWord = () => {
    axios
      .get("/api/getImportWord")
      .then((response) => {
        setWords(response.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchImportSentence = () => {
    axios
      .get("/api/getSentence")
      .then((response) => {
        setSentences(response.data); // Set sentences data
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchImportWord();
    fetchImportSentence(); // Fetch sentences on mount
  }, []);

  useEffect(() => {
    if (data.Type) {
      const filtered = words.filter((word) => word.Type === data.Type);
      setFilteredWords(filtered);
    } else {
      setFilteredWords([]);
    }
  }, [data.Type, words]);

  const handleWordChange = (itemKey, selectedWord) => {
    const selectedItem = filteredWords.find(
      (word) => word.ItemCode === selectedWord
    );

    setData({ ...data, [itemKey]: selectedItem ? selectedItem.ItemCode : "" });
  };

  const createAct = async (e) => {
    e.preventDefault();
    const { Period, Type, Title } = data; // Use Title in the submission

    try {
      const response = await axios.post(`/api/submitAssessment`, {
        UserID: userId,
        Section: section,
        Period,
        Type,
        Title,
        Item1: data.Item1,
        Item2: data.Item2,
        Item3: data.Item3,
        Item4: data.Item4,
        Item5: data.Item5,
        Item6: data.Item6,
        Item7: data.Item7,
        Item8: data.Item8,
        Item9: data.Item9,
        Item10: data.Item10,
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({
          Period: "",
          Type: "",
          Title: "",
          Item1: "",
          Item2: "",
          Item3: "",
          Item4: "",
          Item5: "",
          Item6: "",
          Item7: "",
          Item8: "",
          Item9: "",
          Item10: "",
        });
        toast.success("Created Activity Successfully.");
        setModalShow(true);
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        isOpen={show}
        onClose={handleClose}
        size="lg" // size prop can remain for larger screens
        aria-labelledby="contained-modal-title-vcenter"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        placement="center"
        scrollBehavior="inside" // Ensure content inside can scroll
      >
        <ModalContent className="w-full md:w-[50vw] max-w-full max-h-[80vh] overflow-y-auto bg-white p-4 rounded-lg">
          <ModalHeader
            id="contained-modal-title-vcenter"
            className="text-lg font-bold"
          >
            Create New Activity
          </ModalHeader>
          <form onSubmit={createAct} className="space-y-4">
            <ModalBody>
              {/* Form Inputs and Selects */}
              <Select
                labelPlacement="outside"
                label="Grading Period"
                placeholder="Select Grading Period"
                value={data.Period}
                onChange={(e) => setData({ ...data, Period: e.target.value })}
                className="w-full my-2"
              >
                <SelectItem key="1">Grading Period 1</SelectItem>
                <SelectItem key="2">Grading Period 2</SelectItem>
                <SelectItem key="3">Grading Period 3</SelectItem>
                <SelectItem key="4">Grading Period 4</SelectItem>
              </Select>

              <Select
                labelPlacement="outside"
                label="Type of Assessment"
                placeholder="Select Type of Assessment:"
                value={data.Type}
                onChange={(e) => setData({ ...data, Type: e.target.value })}
                className="w-full my-2"
              >
                <SelectItem key="Pagbabaybay">
                  Assessment 1: Pagbabaybay Tunog at Letra
                </SelectItem>
                <SelectItem key="Pantig">Assessment 2: Pantig</SelectItem>
                <SelectItem key="Salita">Assessment 3: Salita</SelectItem>
                <SelectItem key="Pagbabasa">Assessment 4: Pagbabasa</SelectItem>
              </Select>

              {/* Conditional content based on Type */}
              {data.Type === "Pagbabasa" ? (
                <Select
                  labelPlacement="outside"
                  label="Title"
                  value={data.Title}
                  placeholder="Select a Title:"
                  onChange={(e) => setData({ ...data, Title: e.target.value })}
                  className="w-full my-2"
                >
                  {sentences.map((sentence) => (
                    <SelectItem key={sentence.Title} value={sentence.Title}>
                      {sentence.Title}
                    </SelectItem>
                  ))}
                </Select>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(10)].map((_, i) => (
                    <Select
                      key={`Item${i + 1}`}
                      labelPlacement="outside"
                      label={`Item ${i + 1}`}
                      value={data[`Item${i + 1}`]}
                      placeholder="Select a word:"
                      onChange={(e) =>
                        handleWordChange(`Item${i + 1}`, e.target.value)
                      }
                      className="w-full my-2"
                    >
                      {filteredWords.map((word) => (
                        <SelectItem key={word.ItemCode} value={word.Word}>
                          {word.Word}
                        </SelectItem>
                      ))}
                    </Select>
                  ))}
                </div>
              )}
            </ModalBody>
            <ModalFooter className="flex justify-end space-x-2">
              <Button color="danger" variant="light" onClick={handleClose}>
                Close
              </Button>
              <Button color="primary" type="submit">
                Create Activity
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <CreateSuccess show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

// Add prop types validation
CreateAssessment.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default CreateAssessment;
