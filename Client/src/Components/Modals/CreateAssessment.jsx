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
  const [filteredWords, setFilteredWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState({
    Item1: "",
    Item2: "",
    Item3: "",
    Item4: "",
    Item5: "",
  });
  const [data, setData] = useState({
    Period: "",
    Type: "",
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

  useEffect(() => {
    fetchImportWord();
  }, []);

  useEffect(() => {
    // Filter words based on selected type
    if (data.Type) {
      const filtered = words.filter((word) => word.Type === data.Type);
      setFilteredWords(filtered);
    } else {
      setFilteredWords([]);
    }
  }, [data.Type, words]);

  useEffect(() => {
    console.log("Filtered Words:", filteredWords); // Debugging
  }, [filteredWords]);

  const handleWordChange = (itemKey, selectedWord) => {
    const selectedItem = filteredWords.find(
      (word) => word.ItemCode === selectedWord
    );

    // Debugging the selected word and corresponding item
    console.log("Selected ItemCode:", selectedWord);
    console.log(
      "Selected Word:",
      selectedItem ? selectedItem.Word : "Not found"
    );

    setSelectedWords({ ...selectedWords, [itemKey]: selectedWord });
    setData({ ...data, [itemKey]: selectedItem ? selectedItem.ItemCode : "" });
  };
  const createAct = async (e) => {
    console.log("Selected Words State:", selectedWords); // Debugging
    console.log("Data being submitted:", data); // Debugging

    e.preventDefault();
    const {
      Period,
      Type,
      Item1,
      ItemCode1,
      Item2,
      ItemCode2,
      Item3,
      ItemCode3,
      Item4,
      ItemCode4,
      Item5,
      ItemCode5,
    } = data;

    try {
      const response = await axios.post(`/submitAssessment`, {
        Period,
        Type,
        Item1,
        ItemCode1,
        Item2,
        ItemCode2,
        Item3,
        ItemCode3,
        Item4,
        ItemCode4,
        Item5,
        ItemCode5,
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({
          Period: "",
          Type: "",
          Item1: "",
          ItemCode1: "",
          Item2: "",
          ItemCode2: "",
          Item3: "",
          ItemCode3: "",
          Item4: "",
          ItemCode4: "",
          Item5: "",
          ItemCode5: "",
        });
        setSelectedWords({
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
                aria-label="Select activity type"
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
                aria-label="Select activity type"
                defaultSelectedKeys={"0"}
                disabledKeys={"0"}
                variant="bordered"
                className="bg-transparent py-1 my-1"
                value={data.Type}
                onChange={(e) => {
                  setData({ ...data, Type: e.target.value });
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
              <div className="text-sm">
                <p>Please add aan item to your assessment.</p>
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
                    value={data.Item1} // This should be the word, not the ItemCode
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
