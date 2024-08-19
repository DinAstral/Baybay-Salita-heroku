const User = require("../models/users");
const Teacher = require("../models/teachers");
const Parent = require("../models/parents");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const UserOTPVerification = require("../models/UserOTPVerification");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

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

// Register User function
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
      Birthday,
      Address,
      Status,
      Gender,
      ContactNumber,
      email,
      password,
      Section,
      Department,
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

    // Create Teacher and User records
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
      role: "Teacher",
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

    // Save both teacher and user records
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

const registerParent = async (req, res) => {
  const ParentID = generateRandomCodeParent(6);

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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!email) {
      return res.json({
        error: "Email is Required.",
      });
    }
    //check if user exist
    else if (!user) {
      return res.json({
        error: "No User Found",
      });
    } else if (!password) {
      return res.json({
        error: "Password is Required",
      });
    }

    //check password match
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        {
          email: user.email,
          id: user._id,
          role: user.role,
          FirstName: user.FirstName,
          LastName: user.LastName,
          UserID: user.UserID,
          Nationality: user.Nationality,
          MiddleName: user.MiddleName,
          Status: user.Status,
          Gender: user.Gender,
          Birthday: user.Birthday,
          Address: user.Address,
          ContactNumber: user.ContactNumber,
          Section: user.Section,
          Department: user.Department,
          Age: user.Department,
        },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to generate token" });
          }
          // Set cookie with token
          res
            .cookie("token", token, { httpOnly: true })
            .json({ success: true, role: user.role, user });
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
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  registerParent,
  registerTeacher,
  verifyOTP,
  loginUser,
};
