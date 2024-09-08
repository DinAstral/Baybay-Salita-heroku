const mongoose = require("mongoose");
const Material = require("../models/materials");
const Performance = require("../models/performance");
const AssessmentModel = require("../models/assessment");
const multer = require("multer");
const { wordUpload, UserUpload } = require("../middleware/upload");
const { gfs } = require("../index"); // Import gfs from index.js

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
  const itemID = generateRandomCodeItem(6);

  wordUpload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.json({ error: `Multer Error: ${err.message}` });
    } else if (err) {
      return res.json({ error: `Error: ${err.message}` });
    }

    try {
      const { Type, Word } = req.body;
      if (!Type || !Word) {
        return res.json({ error: "Type and Word are required" });
      }

      const imageFile = req.files["Image"] ? req.files["Image"][0] : null;
      const audioFile = req.files["Audio"] ? req.files["Audio"][0] : null;

      const material = new Material({
        ItemCode: itemID,
        Type,
        Word,
        Image: imageFile ? imageFile.id : undefined,
        Audio: audioFile ? audioFile.id : undefined,
      });

      await material.save();

      res.json({ message: "Word and files successfully uploaded" });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
};

// Upload user input audio
const userInputAudio = async (req, res) => {
  UserUpload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.json({ error: `Multer Error: ${err.message}` });
    } else if (err) {
      return res.json({ error: `Error: ${err.message}` });
    }

    try {
      // Check if the file is uploaded
      if (!req.files || !req.files.User || req.files.User.length === 0) {
        return res.json({ error: "No file was uploaded." });
      }

      // Access the uploaded file
      const uploadedFile = req.files.User[0];
      console.log("Uploaded audio file:", uploadedFile);

      // Insert the file info into the Performance collection
      const insert = await Performance.create({
        Audio1: uploadedFile.id, // Storing the GridFS file ID
        // Add other fields as needed
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

// Download file
const downloadFile = (req, res) => {
  const { filename } = req.params;

  gfs.files.findOne({ filename }, (err, file) => {
    if (err) {
      return res.json({ error: "Error fetching file" });
    }
    if (!file || file.length === 0) {
      return res.json({ error: "No file exists" });
    }
    const readStream = gfs.createReadStream({ filename });
    readStream.pipe(res);
  });
};

const deleteFile = (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid file ID format" });
  }

  gfs.files.deleteOne({ _id: mongoose.Types.ObjectId(id) }, (err) => {
    if (err) {
      console.error("Error deleting file from GridFS:", err);
      return res.status(500).json({ error: "Error deleting file from GridFS" });
    }
    res.json({ message: "File deleted successfully" });
  });
};

// Get imported words
const getImportWords = (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching files" });
    }
    if (!files || files.length === 0) {
      return res.json({ error: "No files found" });
    }
    res.json(files);
  });
};

module.exports = {
  importWord,
  deleteFile,
  downloadFile,
  submitAssessment,
  getImportWords,
  getPerformance,
  deleteAssessment,
  userInputAudio,
};
