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
  submitAssessment,
  getImportWords,
  getPerformance,
} = require("../controllers/assessmentController");

const { mobileLogin } = require("../controllers/mobileController");

// Configure CORS middleware
router.use(
  cors({
    origin: "http://192.168.56.1:3000", // Update this with your client's URL
    methods: ["GET", "POST", "DELETE", "PATCH"], // Add the allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

//Mobile route
router.post("/mobileLogin", mobileLogin); //okay

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
router.post("/importWord", importWord);

//Assessment Route  getPerformance
router.get("/getImportWord", getImportWords);
router.post("/submitAssessment", submitAssessment);
router.get("/getPerformance", getPerformance);

//Admin Routes
router.post("/addUser", addUser);
router.get("/users", getUsers); //okay
router.get("/getUser/:id", getUser); //okay
router.patch("/updateUser/:id", updateUser);
router.delete("/deleteUser/:email", deleteUser);
router.get("/profile", getProfile); //okay

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
