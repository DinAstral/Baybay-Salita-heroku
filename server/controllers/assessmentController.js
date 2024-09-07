const Material = require("../models/materials");
const Performance = require("../models/performance");
const AssessmentModel = require("../models/assessment");
const mongoose = require("mongoose");
const multer = require("multer");
const { wordUpload, UserUpload } = require("../middleware/upload");

function generateRandomCodeItem(length) {
  const characters = "0123456789";
  let result = "item_";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function generateRandomCodeUser(length) {
  const characters = "0123456789";
  let result = "UserInput_";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function generateRandomCode(length) {
  const characters = "0123456789";
  let result = "assessment_";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const submitAssessment = async (req, res) => {
  const randomCode = generateRandomCode(6);
  try {
    const { Period, Type, Item1, Item2, Item3, Item4, Item5 } = req.body;

    // Check if ActivityCode exists
    const exist = await AssessmentModel.findOne({ ActivityCode: randomCode });
    if (exist) {
      return res.json({
        error: "ActivityCode is already taken",
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
    if (!Item1 || !Item2 || !Item3 || !Item4 || !Item5) {
      return res.json({
        error: "All Items are required",
      });
    }

    // Create assessment in the database (Table)
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

const importWord = async (req, res) => {
  const itemID = generateRandomCodeItem(6);

  wordUpload(req, res, async function (err) {
    if (err) {
      // Handle Multer errors
      if (err instanceof multer.MulterError) {
        return res.json({ error: `${err.message}` });
      } else if (err) {
        return res.json({ error: `${err.message}` });
      }
    }

    try {
      const { Type, Word } = req.body;

      if (!Type) {
        return res.json({ error: "Type is required" });
      }

      if (!Word) {
        return res.json({ error: "Word is required" });
      }

      const imageFileName = req.files["Image"][0].originalname;
      const audioFileName = req.files["Audio"][0].originalname;

      const insert = await Material.create({
        ItemCode: itemID,
        Type,
        Word,
        Image: imageFileName,
        Audio: audioFileName,
      });

      if (insert) {
        console.log(req.files); // Log the uploaded files
        return res.json({
          message: "Assessment Successfully Uploaded",
        });
      }

      return res.json({
        error: "Upload unsuccessful. Please try again later!",
      });
    } catch (error) {
      console.log(error);
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

const getPerformance = (req, res) => {
  Performance.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

// Delete the data of the Assessment based on the _id
const deleteAssessment = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid activity ID format",
    });
  }

  try {
    // Find the activity by ID and delete it
    const activity = await AssessmentModel.findByIdAndDelete(id);

    // If no activity is found, return 404
    if (!activity) {
      return res.status(404).json({
        message: "No activity found",
      });
    }

    // If successful, return the deleted activity
    return res.status(200).json({
      message: "Activity deleted successfully",
      data: activity,
    });
  } catch (error) {
    // Catch any errors and return a 500 status
    return res.status(500).json({
      message: "Error deleting activity",
      error: error.message,
    });
  }
};

const userInputAudio = async (req, res) => {
  UserUpload(req, res, async function (err) {
    if (err) {
      // Handle Multer errors
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: `Multer Error: ${err.message}` });
      } else {
        return res.status(400).json({ error: `Error: ${err.message}` });
      }
    }

    // Debugging: Log the entire req.files object
    console.log("Uploaded files:", req.files);

    // Check if req.files and req.files["User"] are defined
    if (!req.files) {
      return res
        .status(400)
        .json({ error: "No files were uploaded. req.files is undefined." });
    }

    if (!req.files["User"]) {
      return res
        .status(400)
        .json({ error: "No files found under the field 'User'." });
    }

    if (req.files["User"].length === 0) {
      return res
        .status(400)
        .json({ error: "No files were uploaded under the field 'User'." });
    }

    try {
      const audioFile = req.files["User"][0];
      const originalFileName = audioFile.originalname;

      // Debugging: Log the audio file information
      console.log("Audio file info:", audioFile);

      const insert = await Performance.create({
        Audio1: originalFileName,
        // Add other fields as needed
      });

      if (insert) {
        return res.json({
          message: "Assessment Successfully Uploaded",
        });
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

module.exports = {
  importWord,
  submitAssessment,
  getImportWords,
  getPerformance,
  deleteAssessment,
  userInputAudio,
};
