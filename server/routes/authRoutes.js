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
  registerParent,
  registerTeacher,
  verifyOTP,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/RegistrationController"); //registration functions

// Configure CORS middleware
router.use(
  cors({
    origin: "http://localhost:5173", // Update this with your client's URL
    methods: ["GET", "POST", "DELETE", "PATCH"], // Add the allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

//Login Routes get data
router.get("/", test); //okay
router.post("/registerParent", registerParent); //okay
router.post("/registerTeacher", registerTeacher); //okay
router.post("/verify", verifyOTP); //okay
router.post("/login", loginUser); //okay
router.post("/forgotPass", forgotPassword); //okay
router.post("/reset-password/:id/:token", resetPassword); //okay

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
