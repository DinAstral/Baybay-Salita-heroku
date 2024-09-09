const express = require("express");
const router = express.Router();
const cors = require("cors");

const {
  test,
  getUsers,
  getUser,
  addUser,
  updateUser,
  addStudent,
  getStudents,
  getStudent,
  deleteStudent,
  updateStudent,
  getProfile,
  updateParent,
  deleteUser,
} = require("../controllers/authControllers");

const {
  createAssessment,
  getActivities,
  addTeacherDetails,
  updateTeacher,
  getActivity,
  updateActivity,
  getTeacherUsers,
  getTeacherUser,
} = require("../controllers/actControllers");

const {
  getParentUsers,
  getParentUser,
  getStudentUser,
} = require("../controllers/parentController");

const {
  registerAdmin,
  registerParent,
  registerTeacher,
  verifyOTP,
  loginUser,
  forgotPassword,
  resetPassword,
  logout,
} = require("../controllers/RegistrationController"); //registration functions

const {
  importWord,
  deleteFile,
  downloadFile,
  submitAssessment,
  getImportWords,
  getPerformance,
  deleteAssessment,
  userInputAudio,
} = require("../controllers/assessmentController");

const {
  mobileLogin,
  getStudentbyLRN,
} = require("../controllers/mobileController");

const { compareAudio } = require("../controllers/CompareController");

// Configure CORS middleware
router.use(
  cors({
    origin: process.env.CLIENT_URL, // Update this with your client's URL
    methods: ["GET", "POST", "DELETE", "PATCH"], // Add the allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

//Mobile route
router.post("/mobileLogin", mobileLogin); //okay
router.get("/getStudent/:LRN", getStudentbyLRN);

//Login Routes get data
router.get("/", test); //okay
router.post("/registerParent", registerParent); //okay
router.post("/registerTeacher", registerTeacher); //okay
router.post("/verify", verifyOTP); //okay
router.post("/login", loginUser); //okay
router.post("/forgotPass", forgotPassword); //okay
router.post("/reset-password/:id/:token", resetPassword); //okay
router.post("/logout", logout);
getImportWords;

//Upload Routes
router.post("/importWord", importWord); // Route to upload word and associated files
router.post("/userInput", userInputAudio); // Route to upload user input audio
router.delete("/deleteInputFile/:id", deleteFile); // Route to delete a file by ID
router.get("/downloadInputfile/:filename", downloadFile); // Route to download file by filename
router.get("/getImportWord", getImportWords); // Route to retrieve metadata of uploaded words

//Assessment Route  getPerformance
router.post("/submitAssessment", submitAssessment);
router.get("/getPerformance", getPerformance);
router.delete("/deleteAssessment/:id", deleteAssessment);

//Admin Routes
router.post("/addUser", addUser);
router.get("/users", getUsers); //okay
router.get("/getUser/:id", getUser); //okay
router.patch("/updateUser/:id", updateUser);
router.delete("/deleteUser/:email", deleteUser);
router.get("/profile", getProfile); //okay app.post("/compare-audio", upload.single("audio")

//Student Routes
router.post("/addStudent", addStudent);
router.get("/getStudents", getStudents); // Corrected route name to match client request
router.get("/getStudent/:id", getStudent); // Route to get a student by ID
router.delete("/getStudent/:id", deleteStudent);
router.patch("/getStudent/:id", updateStudent);

//Parent Routes
router.get("/getParent", getParentUsers);
router.get("/getParent/:UserID", getParentUser);
router.get("/getStudentParent/:LRN", getStudentUser);
router.patch("/updateParent/:id", updateParent);

//Teacher Routes
router.patch("/updateTeacher/:id", updateTeacher);
router.post("/createAssessment", createAssessment);
router.get("/getAssessments", getActivities);
router.get("/getAssessment/id", getActivity);
router.patch("/updateAssessment/id", updateActivity);
router.get("/getTeacher", getTeacherUsers);
router.get("/getTeacher/:UserID", getTeacherUser);

module.exports = router;
