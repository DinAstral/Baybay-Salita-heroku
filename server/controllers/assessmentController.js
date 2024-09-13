const mongoose = require("mongoose");
const Material = require("../models/materials");
const Performance = require("../models/performance");
const AssessmentModel = require("../models/assessment");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const multer = require("multer");

const { wordUpload, UserUpload } = require("../middleware/multer");
const {
  cloudinaryUploader,
  cloudinaryUploaderUser,
} = require("../api/cloudinary");

cloudinary.config({
  cloud_name: "dvcqnbkwb",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Utility functions to generate random codes
function generateRandomCodeItem(length) {
  const characters = "0123456789";
  let result = "item_";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generateRandomCodeUser(length) {
  const characters = "0123456789";
  let result = "UserInput_";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generateRandomCode(length) {
  const characters = "0123456789";
  let result = "assessment_";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Submit assessment
const submitAssessment = async (req, res) => {
  const randomCode = generateRandomCode(6);
  try {
    const { Period, Type, Item1, Item2, Item3, Item4, Item5 } = req.body;

    if (!Period || !Type || !Item1 || !Item2 || !Item3 || !Item4 || !Item5) {
      return res.json({ error: "All fields are required" });
    }

    const exist = await AssessmentModel.findOne({ ActivityCode: randomCode });
    if (exist) {
      return res.json({ error: "ActivityCode is already taken" });
    }

    const act = await AssessmentModel.create({
      ActivityCode: randomCode,
      Period,
      Type,
      Item1,
      Item2,
      Item3,
      Item4,
      Item5,
    });

    return res.json(act);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Get performance data
const getPerformance = (req, res) => {
  Performance.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

// Delete assessment
const deleteAssessment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid activity ID format" });
  }

  try {
    const activity = await AssessmentModel.findByIdAndDelete(id);

    if (!activity) {
      return res.status(404).json({ message: "No activity found" });
    }

    return res
      .status(200)
      .json({ message: "Activity deleted successfully", data: activity });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting activity", error: error.message });
  }
};

const importWord = async (req, res) => {
  const itemID = generateRandomCodeItem(6); // Assume this function is defined somewhere

  wordUpload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.json({ error: `Multer Error: ${err.message}` });
    } else if (err) {
      return res.json({ error: `Error: ${err.message}` });
    }

    try {
      // Extracting Type and Word from request body
      const { Type, Word } = req.body;
      if (!Type || !Word) {
        return res.json({ error: "Type and Word are required" });
      }

      // Uploading to Cloudinary
      const uploadResponse = await cloudinaryUploader(req, res);
      const imageFile = uploadResponse.uploadImage.secure_url;
      const audioFile = uploadResponse.uploadAudio.secure_url;

      // Creating a new Material object
      const material = new Material({
        ItemCode: itemID,
        Type,
        Word,
        Image: imageFile,
        Audio: audioFile,
      });

      // Saving material to the database
      await material.save();

      return res.json({ message: "Word and files successfully uploaded" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  });
};

// Upload user input audio
const userInputAudio = async (req, res) => {
  const InputID = generateRandomCodeUser(6);

  UserUpload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.json({ error: `Multer Error: ${err.message}` });
    } else if (err) {
      return res.json({ error: `Error: ${err.message}` });
    }

    try {
      const {
        Type,
        LRN,
        Section,
        AssessmentID,
        Itemcode1,
        Itemcode2,
        Itemcode3,
        Itemcode4,
        Itemcode5,
      } = req.body;

      const uploadResponse = await cloudinaryUploaderUser(req, res);
      // Access the uploaded file
      const UserFile = uploadResponse.uploadAudioUser.secure_url;

      // Insert the file info into the Performance collection
      const insert = await Performance.create({
        UserInputId: InputID,
        AssessmentID: AssessmentID,
        LRN: LRN,
        Section: Section,
        Type: Type,
        Itemcode1: Itemcode1,
        Audio1: "Submitted",
        AudioURL1: UserFile,
        Itemcode1: Itemcode2,
        Audio1: "Submitted",
        AudioURL1: UserFile,
        Itemcode1: Itemcode3,
        Audio1: "Submitted",
        AudioURL1: UserFile,
        Itemcode1: Itemcode4,
        Audio1: "Submitted",
        AudioURL1: UserFile,
        Itemcode1: Itemcode5,
        Audio1: "Submitted",
        AudioURL1: UserFile,
      });

      if (insert) {
        return res.json({ message: "Audio file uploaded successfully." });
      }

      return res.status(500).json({
        error: "Upload unsuccessful. Please try again later!",
      });
    } catch (error) {
      console.error("Error during upload process:", error);
      return res
        .status(500)
        .json({ error: "An error occurred during the upload process." });
    }
  });
};

const getImportWords = (req, res) => {
  Material.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

module.exports = {
  importWord,
  submitAssessment,
  getImportWords,
  getPerformance,
  deleteAssessment,
  userInputAudio,
};
