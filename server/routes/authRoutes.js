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
} = require("../controllers/RegistrationController");

const {
  importWord,
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
    origin: "https://baybay-salita-edu.netlify.app", // Update this with your client's URL
    methods: ["GET", "POST", "DELETE", "PATCH"], // Add the allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// Mobile route
router.post("/mobileLogin", mobileLogin);
router.get("/getStudent/:LRN", getStudentbyLRN);

// Login Routes
router.get("/", test);
router.post("/registerParent", registerParent);
router.post("/registerTeacher", registerTeacher);
router.post("/verify", verifyOTP);
router.post("/login", loginUser);
router.post("/forgotPass", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);
router.post("/logout", logout);

// Upload Routes
router.post("/importWord", importWord);
router.post("/userInput", userInputAudio);
router.get("/getImportWord", getImportWords);

// Assessment Routes
router.post("/submitAssessment", submitAssessment);
router.get("/getPerformance", getPerformance);
router.delete("/deleteAssessment/:id", deleteAssessment);

// Admin Routes
router.post("/addUser", addUser);
router.get("/users", getUsers);
router.get("/getUser/:id", getUser);
router.patch("/updateUser/:id", updateUser);
router.delete("/deleteUser/:email", deleteUser);
router.get("/profile", getProfile);

// Student Routes
router.post("/addStudent", addStudent);
router.get("/getStudents", getStudents);
router.get("/getStudent/:id", getStudent);
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
router.get("/getAssessments", getActivities);
router.get("/getAssessment/:id", getActivity);
router.patch("/updateAssessment/:id", updateActivity);
router.get("/getTeacher", getTeacherUsers);
router.get("/getTeacher/:UserID", getTeacherUser);

module.exports = router;
