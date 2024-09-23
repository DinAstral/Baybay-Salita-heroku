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

const CreateAssessment = ({ show, handleClose }) => {
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
  });

  const fetchImportWord = () => {
    axios
      .get("/getImportWord")
      .then((response) => {
        setWords(response.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchImportSentence = () => {
    axios
      .get("/getSentence")
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
      const response = await axios.post(`/submitAssessment`, {
        Period,
        Type,
        Title,
        Item1: data.Item1,
        Item2: data.Item2,
        Item3: data.Item3,
        Item4: data.Item4,
        Item5: data.Item5,
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
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior={"inside"}
      >
        <ModalContent>
          <ModalHeader id="contained-modal-title-vcenter">
            Create New Activity
          </ModalHeader>
          <form onSubmit={createAct}>
            <ModalBody>
              <Select
                labelPlacement="outside"
                label="Grading Period"
                defaultSelectedKeys={"0"}
                disabledKeys={"0"}
                aria-label="Select grading period"
                variant="bordered"
                className="bg-transparent py-1 my-1"
                value={data.Period}
                onChange={(e) => {
                  setData({ ...data, Period: e.target.value });
                }}
              >
                <SelectItem key="0">Select Grading Period:</SelectItem>
                <SelectItem key="1">Grading Period 1</SelectItem>
                <SelectItem key="2">Grading Period 2</SelectItem>
                <SelectItem key="3">Grading Period 3</SelectItem>
                <SelectItem key="4">Grading Period 4</SelectItem>
              </Select>

              <Select
                labelPlacement="outside"
                label="Type of Assessment"
                aria-label="Select type of assessment"
                defaultSelectedKeys={"0"}
                disabledKeys={"0"}
                variant="bordered"
                className="bg-transparent py-1 my-1"
                value={data.Type}
                onChange={(e) => {
                  setData({ ...data, Type: e.target.value, Title: "" }); // Reset Title when type changes
                }}
              >
                <SelectItem key="0">Select Type of Assessment:</SelectItem>
                <SelectItem key="Pagbabaybay">
                  Assessment 1: Pagbabaybay Tunog at Letra
                </SelectItem>
                <SelectItem key="Pantig">Assessment 2: Pantig</SelectItem>
                <SelectItem key="Salita">Assessment 3: Salita</SelectItem>
                <SelectItem key="Pagbabasa">Assessment 4: Pagbabasa</SelectItem>
              </Select>

              {data.Type === "Pagbabasa" ? (
                <Select
                  labelPlacement="outside"
                  placeholder="Select a Title"
                  label="Title"
                  aria-label="Select title"
                  variant="bordered"
                  className="bg-transparent py-1 my-1"
                  value={data.Title}
                  onChange={(e) => {
                    setData({ ...data, Title: e.target.value });
                  }}
                >
                  <SelectItem key="0">Select a Title:</SelectItem>
                  {sentences.map((sentence) => (
                    <SelectItem key={sentence.Title} value={sentence.Title}>
                      {sentence.Title}
                    </SelectItem>
                  ))}
                </Select>
              ) : (
                <>
                  <div className="text-sm">
                    <p>Please add items to your assessment.</p>
                  </div>
                  {["Item1", "Item2", "Item3", "Item4", "Item5"].map(
                    (item, index) => (
                      <Select
                        key={item}
                        labelPlacement="outside"
                        placeholder="Select a word:"
                        label={`Item ${index + 1}`}
                        variant="bordered"
                        className="bg-transparent py-1 my-1"
                        value={data[item]}
                        onChange={(e) => {
                          handleWordChange(item, e.target.value);
                        }}
                      >
                        <SelectItem key="0">Select Word:</SelectItem>
                        {filteredWords.map((word) => (
                          <SelectItem key={word.ItemCode} value={word.Word}>
                            {word.Word}
                          </SelectItem>
                        ))}
                      </Select>
                    )
                  )}
                </>
              )}
            </ModalBody>
            <ModalFooter>
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
