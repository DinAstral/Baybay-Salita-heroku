const Activity = require("../models/assessment");
const Teacher = require("../models/teachers");
const AssessmentModel = require("../models/assessment");
const mongoose = require("mongoose");

function generateRandomCode(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
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

function generateRandomCodeSuperTeacher(length) {
  const characters = "0123456789";
  let result = "superTeacherID_";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generatePassword(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

//Add teacher information
const addTeacherDetails = async (req, res) => {
  const isNumber = (value) => {
    return !isNaN(value);
  };

  const teacherCode = generateRandomCodeTeacher(6);
  try {
    const {
      UserID,
      FirstName,
      MiddleName,
      LastName,
      Department,
      Age,
      Section,
      Birthday,
      Address,
      Nationality,
      Gender,
      ContactNumber,
      email,
    } = req.body;
    // Check the inputted data
    const exist = await Teacher.findOne({ UserID });
    if (exist) {
      return res.json({
        error: "TeacherID is already taken",
      });
    }
    if (!FirstName) {
      return res.json({
        error: "First Name is required",
      });
    }
    if (!MiddleName) {
      return res.json({
        error: "Middle Name is required",
      });
    }
    if (!LastName) {
      return res.json({
        error: "Last Name is required",
      });
    }
    if (!Department) {
      return res.json({
        error: "Department is required",
      });
    }
    if (!Age) {
      return res.json({
        error: "Age is required",
      });
    }
    if (!isNumber(Age)) {
      return res.json({ error: "Invalid Age inputted" });
    }
    if (!Gender) {
      return res.json({
        error: "Gender is required",
      });
    }
    if (!ContactNumber) {
      return res.json({
        error: "Contact Number is required",
      });
    }
    if (!isNumber(ContactNumber) || ContactNumber.length < 11) {
      return res.json({ error: "Invalid ContactNumber inputted" });
    }

    // Create user in database (Table)
    const user = await Teacher.create({
      TeacherID: teacherCode,
      FirstName,
      LastName,
      Age,
      Department,
      Section,
      Birthday,
      Address,
      Nationality,
      Gender,
      ContactNumber,
      Education: "",
      email,
      role: "Teacher",
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" }); // Add proper error response
  }
};

const updateTeacher = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  const isNumber = (value) => {
    return !isNaN(value);
  };

  try {
    const {
      FirstName,
      LastName,
      Department,
      Age,
      Section,
      Gender,
      ContactNumber,
      email,
    } = req.body;

    // Check the inputted data
    if (!FirstName) {
      return res.status(400).json({
        error: "First Name is required",
      });
    }
    if (!LastName) {
      return res.status(400).json({
        error: "Last Name is required",
      });
    }
    if (!Department) {
      return res.status(400).json({
        error: "Department is required",
      });
    }
    if (!Section) {
      return res.status(400).json({
        error: "Section is required",
      });
    }
    if (!Age) {
      return res.status(400).json({
        error: "Age is required",
      });
    }
    if (!isNumber(Age)) {
      return res.status(400).json({
        error: "Invalid Age inputted",
      });
    }
    if (!Gender) {
      return res.status(400).json({
        error: "Gender is required",
      });
    }
    if (!ContactNumber) {
      return res.status(400).json({
        error: "Contact Number is required",
      });
    }
    if (!isNumber(ContactNumber) || ContactNumber.length < 11) {
      return res.status(400).json({
        error: "Invalid Contact Number inputted",
      });
    }
    if (!email) {
      return res.status(400).json({
        error: "Email is required",
      });
    }

    const user = await Teacher.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!user) {
      return res.status(404).json({
        message: "No account found",
      });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

//create Activities
const createAssessment = async (req, res) => {
  const randomCode = generateRandomCode(6);
  try {
    const {
      ActivityCode,
      ActivityNumber,
      Period,
      Type,
      Word1,
      Word2,
      Word3,
      Word4,
      Word5,
    } = req.body;
    // Check if ActivityCode
    const exist = await Activity.findOne({ ActivityCode });
    if (exist) {
      return res.json({
        error: "TeacherID is already taken",
      });
    }
    if (!ActivityNumber) {
      return res.json({
        error: "Activity Number is required",
      });
    }

    if (!Period) {
      return res.json({
        error: "Period is required",
      });
    }
    if (!Type) {
      return res.json({
        error: "Type of Assessment is required",
      });
    }
    if (!Word1) {
      return res.json({
        error: "Answer 1 is required",
      });
    }
    if (!Word2) {
      return res.json({
        error: "Answer 2 is required",
      });
    }
    if (!Word3) {
      return res.json({
        error: "Answer 3 is required",
      });
    }
    if (!Word4) {
      return res.json({
        error: "Answer 4 is required",
      });
    }
    if (!Word5) {
      return res.json({
        error: "Answer 5 is required",
      });
    }

    // Create user in database (Table)
    const act = await Activity.create({
      ActivityCode: randomCode,
      ActivityNumber,
      Period,
      Type,
      Word1,
      Word2,
      Word3,
      Word4,
      Word5,
    });

    return res.json(act);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" }); // Add proper error response
  }
};

// Gets the whole data of the Activities
const getActivities = (req, res) => {
  Activity.find()
    .then((act) => res.json(act))
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Gets the data of the Activity base on the _id
const getActivity = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  try {
    const act = await Activity.findById(req.params.id);
    if (!act) {
      return res.status(404).json({
        message: "No Activity found",
      });
    }
    res.status(200).json(act);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateActivity = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  try {
    const {
      ActivityCode,
      ActivityNumber,
      Period,
      Type,
      Status,
      Word1,
      Word2,
      Word3,
      Word4,
      Word5,
    } = req.body;
    // Check if ActivityCode
    if (!ActivityCode) {
      return res.json({
        error: "Activity Number is required",
      });
    }
    if (!ActivityNumber) {
      return res.json({
        error: "Activity Number is required",
      });
    }
    if (!Period) {
      return res.json({
        error: "Period is required",
      });
    }
    if (!Type) {
      return res.json({
        error: "Type of Assessment is required",
      });
    }
    if (!Status) {
      return res.json({
        error: "Type of Assessment is required",
      });
    }
    if (!Word1) {
      return res.json({
        error: "Answer 1 is required",
      });
    }
    if (!Word2) {
      return res.json({
        error: "Answer 2 is required",
      });
    }
    if (!Word3) {
      return res.json({
        error: "Answer 3 is required",
      });
    }
    if (!Word4) {
      return res.json({
        error: "Answer 4 is required",
      });
    }
    if (!Word5) {
      return res.json({
        error: "Answer 5 is required",
      });
    }

    const act = await Activity.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!act) {
      return res.status(404).json({
        message: "No Activity found",
      });
    }

    return res.json(act);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const getTeacherUsers = (req, res) => {
  Teacher.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

const getTeacherUser = async (req, res) => {
  const { UserID } = req.params; // Extract UserID from route parameters

  try {
    // Find the teacher by UserID
    const user = await Teacher.findOne({ UserID });

    // If no teacher is found, return a 404 status
    if (!user) {
      return res.json({
        message: "No account found",
      });
    }

    // Return the found teacher
    res.json(user);
  } catch (error) {
    // Handle any other errors
    res.json({
      message: error.message,
    });
  }
};

const submitAssessment = async (req, res) => {
  try {
    console.log(
      req.files["word1Image"],
      req.files["word1Audio"],
      req.files["word2Image"],
      req.files["word2Audio"],
      req.files["word3Image"],
      req.files["word3Audio"],
      req.files["word4Image"],
      req.files["word4Audio"],
      req.files["word5Image"],
      req.files["word5Audio"]
    );
    const assessmentData = AssessmentModel.create({
      word1: req.files["word1Image"][0].path,
      word1Audio: req.files["word1Audio"][0].path,
      word2: req.files["wordImage2"][0].path,
      word2Audio: req.files["word2Audio"][0].path,
      word3: req.files["word3Image"][0].path,
      word3Audio: req.files["word3Audio"][0].path,
      word4: req.files["word4Image"][0].path,
      word4Audio: req.files["word4Audio"][0].path,
      word5: req.files["word5Image"][0].path,
      word5Audio: req.files["word5Audio"][0].path,
    });

    if (assessmentData) {
      return res.json({
        message: "Assessment Successfully Uploaded",
      });
    }

    return res.json({
      error: "Upload unsuccessful. Please try again later!",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addTeacherDetails,
  createAssessment,
  getActivities,
  getActivity,
  updateActivity,
  updateTeacher,
  getTeacherUsers,
  getTeacherUser,
  submitAssessment,
};
