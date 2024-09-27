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
  submitFeedback,
  getFeedbacks,
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
  getOnePerformance,
  getAssessmentID,
  deleteAssessment,
  deletePerformance,
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
router.get("/getActivity/:ActivityCode", getAssessmentCode); //okay imporSentence deletePerformance
router.get("/getActivity/:UserID", getAssessmentID);
router.get("/getPerformance", getPerformance); //okay
router.get("/getPerformance/:UserInputId", getOnePerformance);
router.get("/getSentence", getSentence); //okay
router.get("/getAssessments", getActivities); //okay
router.get("/getAssessment/:id", getActivity); //okay
router.delete("/deleteAssessment/:id", deleteAssessment); //Okay
router.delete("/deletePerformance/:id", deletePerformance); //okay

// Admin Routes
router.post("/addUser", addUser); //okay
router.get("/users", getUsers); //okay
router.get("/getUser/:id", getUser); //okay
router.get("/getAdmin/:UserID", getAdmin); //okay
router.patch("/updateUser/:id", updateUser);
router.delete("/deleteUser/:email", deleteUser); //okay
router.get("/profile", getProfile); //okay

// Student Routes
router.post("/addStudent", addStudent); // okay
router.get("/getStudents", getStudents); //okay
router.get("/getStudentID/:id", getStudent); //okay
router.delete("/deleteStudent/:id", deleteStudent); //okay
router.patch("/updateStudent/:id", updateStudent); //okay

// Parent Routes
router.get("/getParent", getParentUsers); //okay
router.get("/getParent/:UserID", getParentUser); //okay
router.get("/getStudentParent/:LRN", getStudentUser); //okay getFeedbacks
router.patch("/updateParent/:id", updateParent);
router.get("/getFeedbacks", getFeedbacks);

// Teacher Routes
router.patch("/updateTeacher/:id", updateTeacher);
router.post("/createAssessment", createAssessment); //okay
router.patch("/updateAssessment/:id", updateActivity);
router.get("/getTeacher", getTeacherUsers); //okay
router.get("/getTeacher/:UserID", getTeacherUser); //okay
router.post("/submitFeedback", submitFeedback); //okay

module.exports = router;
