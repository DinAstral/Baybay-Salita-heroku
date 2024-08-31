/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import PropTypes from "prop-types"; // Import PropTypes
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Form, Row, Col } from "react-bootstrap";

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

const CreateAssessment = ({ show, handleClose, onSuccess }) => {
  const [activityType, setActivityType] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState({
    ActivityNumber: "",
    Period: "",
    Type: "",
    Word1: "",
    Word1Image: null,
    Word1Audio: null,
    Word2: "",
    Word2Image: null,
    Word2Audio: null,
    Word3: "",
    Word3Image: null,
    Word3Audio: null,
    Word4: "",
    Word4Image: null,
    Word4Audio: null,
    Word5: "",
    Word5Image: null,
    Word5Audio: null,
  });

  const handleActivityTypeChange = (event) => {
    setActivityType(event.target.value);
  };

  const createAct = async (e) => {
    e.preventDefault();
    const {
      ActivityNumber,
      Period,
      Type,
      Word1,
      Word2,
      Word3,
      Word4,
      Word5,
      Word1Image,
      Word2Image,
      Word3Image,
      Word4Image,
      Word5Image,
      Word1Audio,
      Word2Audio,
      Word3Audio,
      Word4Audio,
      Word5Audio,
    } = data;

    console.log(
      ActivityNumber,
      Period,
      Type,
      Word1,
      Word2,
      Word3,
      Word4,
      Word5,
      Word1Image,
      Word2Image,
      Word3Image,
      Word4Image,
      Word5Image,
      Word1Audio,
      Word2Audio,
      Word3Audio,
      Word4Audio,
      Word5Audio
    );
    if (
      !Word1 ||
      !Word2 ||
      !Word3 ||
      !Word4 ||
      !Word5 ||
      !Word1Image ||
      !Word2Image ||
      !Word3Image ||
      !Word4Image ||
      !Word5Image ||
      !Word1Audio ||
      !Word2Audio ||
      !Word3Audio ||
      !Word4Audio ||
      !Word5Audio
    ) {
      return toast.error("Pleast input all fields");
    }

    try {
      const formData = new FormData();
      formData.append("ActivityNumber", ActivityNumber);
      formData.append("Period", Period);
      formData.append("Type", Type);
      formData.append("word1", Word1);
      formData.append("word2", Word2);
      formData.append("word3", Word3);
      formData.append("word4", Word4);
      formData.append("word5", Word5);
      formData.append("word1Image", Word1Image);
      formData.append("word2Image", Word2Image);
      formData.append("word3Image", Word3Image);
      formData.append("word4Image", Word4Image);
      formData.append("word5Image", Word5Image);
      formData.append("word1Audio", Word1Audio);
      formData.append("word2Audio", Word2Audio);
      formData.append("word3Audio", Word3Audio);
      formData.append("word4Audio", Word4Audio);
      formData.append("word5Audio", Word5Audio);

      formData.forEach((value, key) => {
        console.log(key + " " + value);
      });

      const response = await axios.post("/submitAssessment", formData);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Created Activity Successfully.");
        setModalShow(true);
        handleClose();
        onSuccess(); // Notify parent component to update state
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create an Activity.");
    }
  };

  return (
    <>
      <Modal
        isOpen={show}
        onClose={handleClose}
        size="5xl"
        aria-labelledby="contained-modal-title-vcenter"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior={"inside"}
      >
        <ModalContent>
          <ModalHeader id="contained-modal-title-vcenter">
            Create New Activity
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={createAct} encType="multipart/form-data">
              <Form.Group className="mb-3" controlId="activityType">
                <Form.Label>Activity Type</Form.Label>
                <Form.Select
                  aria-label="Select activity type"
                  value={data.Type}
                  onChange={(e) => {
                    setData({ ...data, Type: e.target.value });
                    handleActivityTypeChange(e);
                  }}
                >
                  <option value="">Select Type of Assessment:</option>
                  <option value="Pagbabaybay">
                    Assessment 1: Tunog at Letra
                  </option>
                  <option value="Pantig">Assessment 2: Pantig</option>
                  <option value="Salita">Assessment 3: Salita</option>
                  <option value="Pagbabasa">Assessment 4: Pagbabasa</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-1" controlId="activityDetails">
                <Form.Label>Activity Details: </Form.Label>
                Please enter your desire words that you want to assess your
                students.
              </Form.Group>
              {activityType === "Word Assessment/Pagbabaybay" && (
                <Row>
                  <Col xs={6}>
                    <Form.Group className="mb-3" controlId="word1">
                      <Form.Label>Pagbabaybay 1</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter word 1"
                        value={data.Word1}
                        onChange={(e) =>
                          setData({ ...data, Word1: e.target.value })
                        }
                      />
                      <Form.Control
                        type="file"
                        onChange={(e) =>
                          setData({ ...data, Word1Image: e.target.files[0] })
                        }
                      />
                      <Form.Control
                        type="file"
                        onChange={(e) =>
                          setData({ ...data, Word1Audio: e.target.files[0] })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3" controlId="word2">
                      <Form.Label>Word 2</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter word 2"
                        value={data.Word2}
                        onChange={(e) =>
                          setData({ ...data, Word2: e.target.value })
                        }
                      />
                      <Form.Control
                        type="file"
                        onChange={(e) =>
                          setData({ ...data, Word2Image: e.target.files[0] })
                        }
                      />
                      <Form.Control
                        type="file"
                        onChange={(e) =>
                          setData({ ...data, Word2Audio: e.target.files[0] })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3" controlId="word3">
                      <Form.Label>Word 3</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter word 3"
                        value={data.Word3}
                        onChange={(e) =>
                          setData({ ...data, Word3: e.target.value })
                        }
                      />
                      <Form.Control
                        type="file"
                        onChange={(e) =>
                          setData({ ...data, Word3Image: e.target.files[0] })
                        }
                      />
                      <Form.Control
                        type="file"
                        onChange={(e) =>
                          setData({ ...data, Word3Audio: e.target.files[0] })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3" controlId="word4">
                      <Form.Label>Word 4</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter word 4"
                        value={data.Word4}
                        onChange={(e) =>
                          setData({ ...data, Word4: e.target.value })
                        }
                      />
                      <Form.Control
                        type="file"
                        onChange={(e) =>
                          setData({ ...data, Word4Image: e.target.files[0] })
                        }
                      />
                      <Form.Control
                        type="file"
                        onChange={(e) =>
                          setData({ ...data, Word4Audio: e.target.files[0] })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3" controlId="word5">
                      <Form.Label>Word 5</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter word 5"
                        value={data.Word5}
                        onChange={(e) =>
                          setData({ ...data, Word5: e.target.value })
                        }
                      />
                      <Form.Control
                        type="file"
                        onChange={(e) =>
                          setData({ ...data, Word5Image: e.target.files[0] })
                        }
                      />
                      <Form.Control
                        type="file"
                        onChange={(e) =>
                          setData({ ...data, Word5Audio: e.target.files[0] })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              )}
              {activityType === "Reading Assessment" && (
                <Row>
                  <Col xs={6}>
                    <Form.Group className="mb-3" controlId="readingPassage1">
                      <Form.Label>Reading Passage 1</Form.Label>
                      <Form.Control
                        type="textfield"
                        placeholder="Enter word 5"
                        value={data.Word1}
                        onChange={(e) =>
                          setData({ ...data, Word1: e.target.value })
                        }
                      />
                      <Form.Control type="file" />
                      <Form.Control type="file" />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3" controlId="readingPassage2">
                      <Form.Label>Reading Passage 2</Form.Label>
                      <Form.Control
                        type="textfield"
                        placeholder="Enter word 5"
                        value={data.Word2}
                        onChange={(e) =>
                          setData({ ...data, Word2: e.target.value })
                        }
                      />
                      <Form.Control type="file" />
                      <Form.Control type="file" />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3" controlId="readingPassage3">
                      <Form.Label>Reading Passage 3</Form.Label>
                      <Form.Control
                        type="textfield"
                        placeholder="Enter word 5"
                        value={data.Word3}
                        onChange={(e) =>
                          setData({ ...data, Word3: e.target.value })
                        }
                      />
                      <Form.Control type="file" />
                      <Form.Control type="file" />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3" controlId="readingPassage4">
                      <Form.Label>Reading Passage 4</Form.Label>
                      <Form.Control
                        type="textfield"
                        placeholder="Enter word 5"
                        value={data.Word4}
                        onChange={(e) =>
                          setData({ ...data, Word4: e.target.value })
                        }
                      />
                      <Form.Control type="file" />
                      <Form.Control type="file" />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3" controlId="readingPassage5">
                      <Form.Label>Reading Passage 5</Form.Label>
                      <Form.Control
                        type="textfield"
                        placeholder="Enter word 5"
                        value={data.Word5}
                        onChange={(e) =>
                          setData({ ...data, Word5: e.target.value })
                        }
                      />
                      <Form.Control type="file" />
                      <Form.Control type="file" />
                    </Form.Group>
                  </Col>
                </Row>
              )}
              <ModalFooter>
                <Button color="danger" variant="light" onClick={handleClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Create Activity
                </Button>
              </ModalFooter>
            </Form>
          </ModalBody>
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
  onSuccess: PropTypes.func.isRequired, // Added prop for success callback
};

export default CreateAssessment;
