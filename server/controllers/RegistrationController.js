const User = require("../models/users");
const Admin = require("../models/admin");
const Teacher = require("../models/teachers");
const Parent = require("../models/parents");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const UserOTPVerification = require("../models/UserOTPVerification");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");

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

function generateRandomCodeAdmin(length) {
  const characters = "0123456789";
  let result = "adminID_";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generateRandomCodeParent(length) {
  const characters = "0123456789";
  let result = "parentID_";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generateRandomCodeTeacher(length) {
  const characters = "0123456789";
  let result = "teacherID_";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

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

const sendForgotPasswordEmail = async ({ email, link }, res) => {
  try {
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Reset your account",
      html: `<p><i>Mabuhay!</i></p>
             <p><b><i>This is BaybaySalita Admin!</i></b></p>
              <p>To reset you account password please follow this link! This link is only valid for 30 minutes before it expires.</p>
              <h3>Link: <a href="${link}">Reset Password</a> </h3>
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

const sendVerificationEmail = async ({ _id, email }, res) => {
  try {
    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<p><i>Mabuhay!</i></p>
              <p>We received a registration request to your account. To verify your account, please use the following One-Time Password (OTP) code.</p>
              <h3>OTP: ${otp}</h3>
              <p>This code will <b>expire in 1 hour.</b></p>
              <p>Please enter this code on the OTP verification page to complete the process. If you didn't initiate this request, please disregard this email.</p>
              <p>If you need any assistance, please don't hesitate to contact our team.</p>
              <p>Thank you.</p>
              <br>
              <p>Best regards,<br>
              <b>BaybaySalita</b>`,
    };

    const saltrounds = 10;

    const hashedOTP = await bcrypt.hash(otp, saltrounds);
    const newOTPVerification = await new UserOTPVerification({
      userId: _id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    await newOTPVerification.save();
    transporter.sendMail(mailOptions);
    console.log("Success");
    res.json({
      status: "PENDING",
      message: "Verification otp email sent",
      data: {
        userId: _id,
        email,
      },
    });
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.json({ error: "Empty OTP details are not allowed" });
    }

    // Fetch the OTP verification records for the given userId
    const UserOTPVerificationRecords = await UserOTPVerification.find({
      userId,
    });
    if (UserOTPVerificationRecords.length === 0) {
      return res.json({
        error:
          "Account record doesn't exist or has been verified already. Please sign up or log in.",
      });
    }

    // Extract the first record (assuming there could be multiple records)
    const { expiresAt, otp: hashedOTP } = UserOTPVerificationRecords[0];

    // Check if the OTP has expired
    if (expiresAt < Date.now()) {
      await UserOTPVerification.deleteMany({ userId });
      return res.json({ error: "Code is expired. Please request again." });
    }

    // Ensure the hashedOTP is defined before comparing
    if (!hashedOTP) {
      return res.json({ error: "he" });
    }

    // Compare the provided OTP with the stored hashed OTP
    const validOTP = await bcrypt.compare(otp, hashedOTP);

    if (!validOTP) {
      return res.json({ error: "Invalid code. Please check your email." });
    }

    // Mark the user as verified
    await User.updateOne({ _id: userId }, { verified: true });
    await UserOTPVerification.deleteMany({ userId });

    res.json({
      status: "VERIFIED",
      message: "User email verified successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const registerTeacher = async (req, res) => {
  const TeacherID = generateRandomCodeTeacher(6);

  function isNumber(input) {
    return !isNaN(input);
  }

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
    const {
      FirstName,
      LastName,
      Section,
      Department,
      Birthday,
      Address,
      Status,
      Gender,
      ContactNumber,
      email,
      password,
    } = req.body;

    if (!FirstName) {
      return res.json({ error: "First Name is required" });
    }
    if (!LastName) {
      return res.json({ error: "Last Name is required" });
    }
    if (!Section) {
      return res.json({ error: "Section is required" });
    }
    if (!Department) {
      return res.json({ error: "Department is required" });
    }
    if (!Birthday) {
      return res.json({ error: "Birthday is required" });
    }
    if (!Gender) {
      return res.json({ error: "Gender is required" });
    }
    if (!Address) {
      return res.json({ error: "Address is required" });
    }
    if (!Status) {
      return res.json({ error: "Status is required" });
    }
    if (!ContactNumber) {
      return res.json({ error: "Contact Number is required" });
    }
    if (!isNumber(ContactNumber)) {
      return res.json({ error: "Invalid Contact Number inputted" });
    }
    if (!email) {
      return res.json({ error: "Email is required" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ error: "Email is already taken" });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.json({ error: passwordError });
    }

    const hashedPassword = await hashPassword(password); // Hash the password

    // Create teacher and User records
    const teacher = new Teacher({
      UserID: TeacherID,
      FirstName,
      LastName,
      Section,
      Department,
      Birthday,
      Gender,
      Address,
      Status,
      ContactNumber,
      email,
      password: hashedPassword,
      role: "Teacher",
      verified: false,
    });

    const user = new User({
      UserID: TeacherID,
      FirstName,
      LastName,
      email,
      role: "Teacher",
      password: hashedPassword,
      verified: false,
    });

    // Save both admin and user records
    await teacher.save();
    await user
      .save()
      .then((result) => {
        sendVerificationEmail(result, res);
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message: "An Error occurred while saving your account!",
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ error: "No file uploaded" });
    }

    const { TeacherID } = req.body;

    if (!TeacherID) {
      return res.json({ error: "TeacherID is required" });
    }

    // Find the teacher and update the Picture field
    const teacher = await Teacher.findOneAndUpdate(
      { UserID: TeacherID },
      { Picture: req.file.filename },
      { new: true }
    );

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    return res.json({
      status: "SUCCESS",
      message: "File uploaded and associated with teacher successfully",
      teacher,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const registerParent = async (req, res) => {
  const ParentID = generateRandomCodeParent(6);

  function isNumber(input) {
    return !isNaN(input);
  }

  try {
    const {
      FirstName,
      LastName,
      LRN,
      StudentName,
      Birthday,
      Address,
      Status,
      Gender,
      ContactNumber,
      email,
      password,
    } = req.body;

    if (!FirstName) {
      return res.json({ error: "First Name is required" });
    }
    if (!LastName) {
      return res.json({ error: "Last Name is required" });
    }
    if (!LRN) {
      return res.json({ error: "LRN is required" });
    }
    if (!StudentName) {
      return res.json({ error: "StudentName is required" });
    }
    if (!Birthday) {
      return res.json({ error: "Birthday is required" });
    }
    if (!Gender) {
      return res.json({ error: "Gender is required" });
    }
    if (!Address) {
      return res.json({ error: "Address is required" });
    }
    if (!Status) {
      return res.json({ error: "Status is required" });
    }
    if (!ContactNumber) {
      return res.json({ error: "Contact Number is required" });
    }
    if (!isNumber(ContactNumber)) {
      return res.json({ error: "Invalid Contact Number inputted" });
    }
    if (!email) {
      return res.json({ error: "Email is required" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ error: "Email is already taken" });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.json({ error: passwordError });
    }

    const hashedPassword = await hashPassword(password); // Hash the password

    // Create Parent and User records
    const parent = new Parent({
      UserID: ParentID,
      FirstName,
      LastName,
      LRN,
      StudentName,
      Birthday,
      Gender,
      Address,
      Status,
      ContactNumber,
      email,
      password: hashedPassword,
      role: "Parent",
      verified: false,
    });

    const user = new User({
      UserID: ParentID,
      FirstName,
      LastName,
      email,
      role: "Parent",
      password: hashedPassword,
      verified: false,
    });

    // Save both teacher and user records
    await parent.save();
    await user
      .save()
      .then((result) => {
        sendVerificationEmail(result, res);
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message: "An Error occurred while saving your account!",
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const registerAdmin = async (req, res) => {
  const adminID = generateRandomCodeAdmin(6);

  function isNumber(input) {
    return !isNaN(input);
  }

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
    const {
      FirstName,
      LastName,
      Birthday,
      Address,
      Status,
      Gender,
      ContactNumber,
      email,
      password,
    } = req.body;

    if (!FirstName) {
      return res.json({ error: "First Name is required" });
    }
    if (!LastName) {
      return res.json({ error: "Last Name is required" });
    }
    if (!Birthday) {
      return res.json({ error: "Birthday is required" });
    }
    if (!Gender) {
      return res.json({ error: "Gender is required" });
    }
    if (!Address) {
      return res.json({ error: "Address is required" });
    }
    if (!Status) {
      return res.json({ error: "Status is required" });
    }
    if (!ContactNumber) {
      return res.json({ error: "Contact Number is required" });
    }
    if (!isNumber(ContactNumber)) {
      return res.json({ error: "Invalid Contact Number inputted" });
    }
    if (!email) {
      return res.json({ error: "Email is required" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ error: "Email is already taken" });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.json({ error: passwordError });
    }

    const hashedPassword = await hashPassword(password); // Hash the password

    // Create Parent and User records
    const admin = new Admin({
      UserID: adminID,
      FirstName,
      LastName,
      Birthday,
      Gender,
      Address,
      Status,
      ContactNumber,
      email,
      password: hashedPassword,
      role: "Admin",
      verified: false,
    });

    const user = new User({
      UserID: adminID,
      FirstName,
      LastName,
      email,
      role: "Admin",
      password: hashedPassword,
      verified: false,
    });

    // Save both teacher and user records
    await admin.save();
    await user
      .save()
      .then((result) => {
        sendVerificationEmail(result, res);
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message: "An Error occurred while saving your account!",
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!email && !password) {
      return res.json({
        error: "Email and Password are required.",
      });
    } else if (!email) {
      return res.json({
        error: "Email is Required.",
      });
    } else if (!password) {
      return res.json({
        error: "Password is Required",
      });
    }

    if (!user) {
      return res.json({
        error: "User not found.",
      });
    }

    //check password match
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        {
          email: user.email,
        },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) {
            console.error(err);
            return res.json({ error: "Failed to generate token" });
          }
          // Set cookie with token
          res
            .cookie("token", token, { httpOnly: true })
            .json({ success: true, token, role: user.role, user });
        }
      );
    }
    if (!match) {
      res.json({
        error: "Email and Passowrd doesn't match",
      });
    }
  } catch (error) {
    console.error(error);
    return res.json({ error: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const userEmail = await User.findOne({ email });
    if (!userEmail) {
      return res.json({
        error: "No User email has found",
      });
    } else {
      const secret = process.env.JWT_SECRET + userEmail.password;
      const token = jwt.sign({ email: userEmail, id: userEmail._id }, secret, {
        expiresIn: "30m",
      });
      const link = `http://localhost:5173/reset-password/${userEmail._id}/${token}`;
      console.log(link);
      sendForgotPasswordEmail({ email, link }, res);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.json({ error: "User not found" });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.json({ error: passwordError });
    }

    const secret = process.env.JWT_SECRET + user.password;

    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        return res.json({ status: "Error with token" });
      } else {
        try {
          const hashedPassword = await hashPassword(password);
          user.password = hashedPassword;
          await user.save();
          return res.json({
            status: "Success",
            message: "Password updated successfully",
          });
        } catch (err) {
          console.error(err);
          return res.status(500).json({
            status: "FAILED",
            message: "An error occurred while saving your account!",
          });
        }
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", { path: "/" }); // Adjust the path as necessary
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  registerAdmin,
  registerParent,
  registerTeacher,
  uploadFile,
  verifyOTP,
  loginUser,
  forgotPassword,
  resetPassword,
  logout,
};
