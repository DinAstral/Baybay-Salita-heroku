const User = require("../models/users");
const Student = require("../models/student");
const Admin = require("../models/admin");
const UserOTPVerification = require("../models/UserOTPVerification");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const ParentModel = require("../models/parents");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

const sendCredentialEmail = async ({ email, password, role }, res) => {
  try {
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Credentials for Your Account",
      html: `<p><i>Mabuhay!</i></p>
            <p>You have been created an account for the application. Here's the details of your account for the BAYBAY SALITA System:</p>
            <h3>Email: ${email}</h3>
            <h3>Password: ${password}</h3>
            <h3>Role: ${role}</h3>
            <p>To verify your account please use these credentials to login and input the verification code that will be given to you.</p>
            <p>If you need any assistance, please don't hesitate to contact our team.</p>
            <p>Thank you.</p>
            <br>
            <p>Best regards,<br>
            <b>Technical Team</b></p>`,
    };

    transporter.sendMail(mailOptions);
    console.log("Success");
    res.json({
      status: "SUCCESS",
      message: "Credential email sent",
      data: { email, password },
    });
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const test = (req, res) => {
  res.json("test is working");
};

// Update the data of the Parent base on the _id
const updateParent = async (req, res) => {
  const { UserID } = req.params;

  try {
    // Destructure only the necessary fields from the request body
    const {
      email,
      FirstName,
      LastName,
      Age,
      Birthday,
      Gender,
      Address,
      Status,
      ContactNumber,
    } = req.body;

    // Validate that the email field is present
    if (!email) {
      return res.status(400).json({
        error: "Email is required",
      });
    }

    // Create an object to hold only the updatable fields
    const updateFields = {
      email,
      FirstName,
      LastName,
      Age,
      Birthday,
      Gender,
      Address,
      Status,
      ContactNumber,
    };

    // Remove any fields that are undefined (optional)
    Object.keys(updateFields).forEach(
      (key) => updateFields[key] === undefined && delete updateFields[key]
    );

    // Update the admin information
    const adminUpdate = await ParentModel.findOneAndUpdate(
      { UserID },
      updateFields,
      {
        new: true, // Return the updated document
        runValidators: true, // Validate the update against the schema
      }
    );

    // Update the user information
    const userUpdate = await User.findOneAndUpdate({ UserID }, updateFields, {
      new: true,
      runValidators: true,
    });

    // Check if either update was successful
    if (!adminUpdate && !userUpdate) {
      return res.status(404).json({
        message: "No account found with this ID",
      });
    }

    // Return the updated admin and user documents
    return res.status(200).json({
      admin: adminUpdate,
      user: userUpdate,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

//ADD STUDENT MODULE
const addStudent = async (req, res) => {
  function isNumber(input) {
    return !isNaN(input);
  }
  try {
    const {
      LRN,
      FirstName,
      LastName,
      Age,
      Level,
      Section,
      Birthday,
      Address,
      MotherTongue,
      Gender,
    } = req.body;
    // Check if name is entered
    if (!LRN) {
      return res.json({
        error: "LRN is required",
      });
    }
    if (!isNumber(LRN)) {
      return res.json({ error: "Invalid LRN" });
    }
    if (LRN.length != 12) {
      return res.json({ error: "LRN must 12 numbers long" });
    }

    const exist = await Student.findOne({ LRN });
    if (exist) {
      return res.json({
        error: "LRN is already taken",
      });
    }

    if (!FirstName) {
      return res.json({
        error: "First Name is required",
      });
    }
    if (!LastName) {
      return res.json({
        error: "Last Name is required",
      });
    }
    if (!Section) {
      return res.json({
        error: "Section is required",
      });
    }
    if (!Birthday) {
      return res.json({
        error: "Birthday is required",
      });
    }
    if (!Address) {
      return res.json({
        error: "Address is required",
      });
    }
    if (!MotherTongue) {
      return res.json({
        error: "MotherTongue is required",
      });
    }
    if (!Gender) {
      return res.json({
        error: "Gender is required",
      });
    }

    // Create user in database (Table)
    const student = await Student.create({
      LRN,
      FirstName,
      LastName,
      Age,
      Level,
      Section,
      Birthday,
      Address,
      MotherTongue,
      Gender,
      role: "student",
    });

    return res.json(student);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" }); // Add proper error response
  }
};

// Gets the whole data of the Students
const getStudents = (req, res) => {
  Student.find()
    .then((students) => res.json(students))
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Gets the data of the Student base on the _id
const getStudent = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        message: "No account found",
      });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete the data of the Student base on the _id
const deleteStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  try {
    const student = await Student.findByIdAndDelete({ _id: id });
    if (!student) {
      return res.status(404).json({
        message: "No account found",
      });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update the data of the Student base on the _id
const updateStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  function isNumber(input) {
    return !isNaN(input);
  }

  try {
    const {
      LRN,
      FirstName,
      MiddleName,
      LastName,
      Age,
      Level,
      Section,
      Birthday,
      Address,
      MotherTongue,
      Nationality,
      Gender,
    } = req.body;

    // Check if name is entered
    if (!LRN) {
      return res.json({
        error: "LRN is required",
      });
    }
    if (!isNumber(LRN)) {
      return res.json({ error: "Invalid LRN inputted" });
    }
    if (!LRN.length == 12) {
      return res.json({ error: "LRN must 12 numbers long" });
    }

    const student = await Student.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    ); // Update credentials in database

    if (!student) {
      return res.status(404).json({
        message: "No account found",
      });
    }

    return res.json(student);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" }); // Add proper error response
  }
};

const getUsers = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

const getUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "No account found",
      });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAdmin = async (req, res) => {
  const { UserID } = req.params; // Extract UserID from route parameters

  try {
    // Find the Admin by UserID
    const user = await Admin.findOne({ UserID });

    // If no teacher is found, return a 404 status
    if (!user) {
      return res.json({
        message: "No account found",
      });
    }

    // Return the found Admin
    res.json(user);
  } catch (error) {
    // Handle any other errors
    res.json({
      message: error.message,
    });
  }
};

// Add User function
const addUser = async (req, res) => {
  function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasDigit) {
      return "Password must contain at least one digit.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }

    return null; // No error
  }

  try {
    const { UserID, email, password, role } = req.body;

    if (!email) {
      return res.json({ error: "Email is required" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ error: "Email is already taken" });
    }

    if (!password) {
      return res.json({ error: "Password is required" });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.json({ error: passwordError });
    }

    if (!role) {
      return res.json({ error: "Role is required" });
    }

    const hashedPassword = await hashPassword(password);

    // Create user in database (Table)
    const user = new User({
      UserID,
      email,
      password: hashedPassword,
      role,
    });

    user
      .save()
      .then((result) => {
        sendCredentialEmail({ email, password, role }, res); // Send plain password
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message: "An error occurred while saving your account!",
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" }); // Add proper error response
  }
};

// Update the data of the Student base on the _id
const updateUser = async (req, res) => {
  const { id } = req.params;

  function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasDigit) {
      return "Password must contain at least one digit.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }

    return null; // No error
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  try {
    const { email, password, role } = req.body;

    if (!password) {
      return res.json({
        error: "Password is required",
      });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.json({ error: passwordError });
    }

    if (!role) {
      return res.json({
        error: "Role is required",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.findByIdAndUpdate(
      { _id: id },
      {
        email,
        password: hashedPassword,
        role,
      }
    ); // Update credentials in database

    if (!user) {
      return res.status(404).json({
        message: "No account found",
      });
    }

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" }); // Add proper error response
  }
};

const deleteUser = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOneAndDelete({ email });

    if (user) {
      res.status(200).json({
        message: "User deleted successfully",
        user,
      });
    } else {
      return res.status(404).json({
        message: "No User found with this email",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//Endpoint getProfile with get res
//Verifying the user
const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = {
  test, //okay
  addStudent, //okay
  getStudents, //okay
  getStudent, //okay
  deleteStudent,
  updateStudent,
  updateParent,
  addUser,
  getUsers,
  getAdmin,
  getUser,
  updateUser,
  deleteUser,
  getProfile,
};
