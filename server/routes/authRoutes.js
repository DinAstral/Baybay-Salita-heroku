const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const path = require("path");

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
  uploadFile,
  verifyOTP,
  loginUser,
  forgotPassword,
  resetPassword,
  logout,
} = require("../controllers/RegistrationController"); //registration functions

const {
  mobileLogin,
} = require("../controllers/mobileController");

// Configure CORS middleware
router.use(
  cors({
    origin: "http://192.168.254.161:3000", // Update this with your client's URL
    methods: ["GET", "POST", "DELETE", "PATCH"], // Add the allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/Images")); // Ensure the correct path
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//Mobile route
router.post("/mobileLogin", mobileLogin); //okay

//Login Routes get data
router.get("/", test); //okay
router.post("/registerParent", registerParent); //okay
router.post("/registerTeacher", registerTeacher); //okay
router.post("/uploadFile", upload.single("file"), uploadFile); //okay
router.post("/verify", verifyOTP); //okay
router.post("/login", loginUser); //okay
router.post("/forgotPass", forgotPassword); //okay
router.post("/reset-password/:id/:token", resetPassword); //okay
router.post("/logout", logout);

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
