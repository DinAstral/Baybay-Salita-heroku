const express = require("express");
const router = express.Router();
const cors = require("cors");

const {
  test,
  getUsers,
  getUser,
  getAdmin,
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
  profileUpdate,
} = require("../controllers/RegistrationController");

const {
  importWord,
  importSentence,
  submitAssessment,
  getAssessmentCode,
  getImportWords,
  getPerformance,
  deleteAssessment,
  userInputAudio,
  getSentence,
} = require("../controllers/assessmentController");

const {
  mobileLogin,
  getStudentbyLRN,
} = require("../controllers/mobileController");

const { compareAudio } = require("../controllers/CompareController");

// Configure CORS middleware
router.use(
  cors({
    origin: "https://baybay-salita-heroku-8c328f3ddd0f.herokuapp.com", // Update this with your client's URL https://baybay-salita-edu.netlify.app
    methods: ["GET", "POST", "DELETE", "PATCH"], // Add the allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// Mobile route
router.post("/mobileLogin", mobileLogin); //okay
router.get("/getStudent/:LRN", getStudentbyLRN); //okay

// Login Routes
router.get("/", test); //okay
router.post("/registerParent", registerParent); //okay
router.post("/registerTeacher", registerTeacher); //okay
router.post("/verify", verifyOTP); //okay
router.post("/login", loginUser); //okay
router.post("/forgotPass", forgotPassword); //okay
router.post("/reset-password/:id/:token", resetPassword); //okay
router.post("/logout", logout); //okay

// Upload Routes
router.post("/importWord", importWord); //okay
router.post("/userInput", userInputAudio); //okay
router.get("/getImportWord", getImportWords); //okay profileUpdate
router.post("/profileUpdate", profileUpdate); //okay
router.post("/importSentence", importSentence); //okay

// Assessment Routes
router.post("/submitAssessment", submitAssessment); //okay
router.get("/getActivity/:ActivityCode", getAssessmentCode); //okay imporSentence
router.get("/getPerformance", getPerformance); //okay
router.get("/getSentence", getSentence); //okay
router.get("/getAssessments", getActivities); //okay
router.get("/getAssessment/:id", getActivity);
router.delete("/deleteAssessment/:id", deleteAssessment);

// Admin Routes
router.post("/addUser", addUser);
router.get("/users", getUsers); //okay
router.get("/getUser/:id", getUser); //okay
router.get("/getAdmin/:UserID", getAdmin); //okay
router.patch("/updateUser/:id", updateUser);
router.delete("/deleteUser/:email", deleteUser); //okay
router.get("/profile", getProfile); //okay

// Student Routes
router.post("/addStudent", addStudent);
router.get("/getStudents", getStudents); //okay
router.get("/getStudentID/:id", getStudent);
router.delete("/deleteStudent/:id", deleteStudent);
router.patch("/updateStudent/:id", updateStudent);

// Parent Routes
router.get("/getParent", getParentUsers);
router.get("/getParent/:UserID", getParentUser);
router.get("/getStudentParent/:LRN", getStudentUser);
router.patch("/updateParent/:id", updateParent);

// Teacher Routes
router.patch("/updateTeacher/:id", updateTeacher);
router.post("/createAssessment", createAssessment);
router.patch("/updateAssessment/:id", updateActivity);
router.get("/getTeacher", getTeacherUsers);
router.get("/getTeacher/:UserID", getTeacherUser);

module.exports = router;
