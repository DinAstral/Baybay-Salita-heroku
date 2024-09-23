const mongoose = require("mongoose");
const Material = require("../models/materials");
const SentenceModel = require("../models/sentenceMaterial");
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

function generateRandomCodeSentence(length) {
  const characters = "0123456789";
  let result = "sentence_";
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
    const { Period, Type, Title, Item1, Item2, Item3, Item4, Item5 } = req.body;

    if (!Period || !Type) {
      return res.json({ error: "All fields are required" });
    }

    const exist = await AssessmentModel.findOne({ ActivityCode: randomCode });
    if (exist) {
      return res.json({ error: "ActivityCode is already taken" });
    }

    // Fetch materials for each item
    const items = [Item1, Item2, Item3, Item4, Item5];
    const materials = await Material.find({ ItemCode: { $in: items } });

    const assessmentItems = items.map((itemCode) => {
      const material = materials.find((m) => m.ItemCode === itemCode);
      return {
        ItemCode: itemCode,
        Word: material?.Word || "",
        Image: material?.Image || "",
        Audio: material?.Audio || "",
      };
    });

    // Fetch the corresponding sentence for Pagbabasa type assessment
    let questions = [];
    let sentenceText = ""; // Initialize the sentence to save later

    if (Type === "Pagbabasa") {
      const sentence = await SentenceModel.findOne({ Title }); // Fetch the sentence based on the Title

      if (sentence) {
        sentenceText = sentence.Sentence; // Store the Sentence for saving

        questions = [
          {
            ItemCode: sentence.ItemCode,
            Question: sentence.Question1,
            Answer: sentence.Answer1,
          },
          {
            ItemCode: sentence.ItemCode,
            Question: sentence.Question2,
            Answer: sentence.Answer2,
          },
          {
            ItemCode: sentence.ItemCode,
            Question: sentence.Question3,
            Answer: sentence.Answer3,
          },
          {
            ItemCode: sentence.ItemCode,
            Question: sentence.Question4,
            Answer: sentence.Answer4,
          },
          {
            ItemCode: sentence.ItemCode,
            Question: sentence.Question5,
            Answer: sentence.Answer5,
          },
        ];
      }
    }

    const act = await AssessmentModel.create({
      ActivityCode: randomCode,
      Period,
      Type,
      Title,
      Sentence: sentenceText, // Save the sentence if Pagbabasa is selected
      Questions: questions, // Saving grouped questions and answers
      Items: assessmentItems, // Save items with image and audio
      Assessment: "Submitted",
    });

    return res.json(act);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// get assessment based on Activitycode
const getAssessmentCode = async (req, res) => {
  const { ActivityCode } = req.params;

  try {
    const activity = await AssessmentModel.findOne({ ActivityCode });

    // If no parent is found, return a 404 status
    if (!activity) {
      return res.json({
        message: "No activity found",
      });
    }

    // Return the found parent
    res.json(activity);
  } catch (error) {
    // Handle any other errors
    res.json({
      message: error.message,
    });
  }
};

// Get performance data
const getPerformance = (req, res) => {
  Performance.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

// Get Sentence data
const getSentence = (req, res) => {
  SentenceModel.find()
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
      const imageFile = uploadResponse.uploadImage.url;
      const securedImageFile = uploadResponse.uploadImage.secure_url;
      const audioFile = uploadResponse.uploadAudio.url;
      const securedAudioFile = uploadResponse.uploadImage.secure_url;

      // Creating a new Material object
      const material = new Material({
        ItemCode: itemID,
        Type,
        Word,
        Image: imageFile,
        SecureImage: securedImageFile,
        Audio: audioFile,
        SecureAudio: securedAudioFile,
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

const importSentence = async (req, res) => {
  const itemID = generateRandomCodeSentence(6); // Generate unique item code

  try {
    // Extracting Type, Sentence, and Questions from request body
    const {
      Type,
      Title,
      Sentence,
      Question1,
      Question2,
      Question3,
      Question4,
      Question5,
      Answer1,
      Answer2,
      Answer3,
      Answer4,
      Answer5,
    } = req.body;

    if (!Type || !Sentence || !Question1 || !Title) {
      return res.json({ error: "Type, Sentence, and Questions are required" });
    }

    // Create a new SentenceModel object
    const material = new SentenceModel({
      ItemCode: itemID,
      Type,
      Title,
      Sentence,
      Question1,
      Question2,
      Question3,
      Question4,
      Question5,
      Answer1,
      Answer2,
      Answer3,
      Answer4,
      Answer5,
    });

    // Save the material to the database
    await material.save();

    return res.json({ message: "Sentence successfully uploaded" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const { runComparisonAndSaveResult } = require("../api/STT-TC-AC"); // Import the helper function for comparison

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
        ActivityCode,
        Itemcode1,
        Itemcode2,
        Itemcode3,
        Itemcode4,
        Itemcode5,
      } = req.body;

      // Upload user input audio files to cloudinary
      const uploadResponse = await cloudinaryUploaderUser(req, res);

      // Get uploaded URLs for each user input audio
      const fileUrls = {
        AudioURL1: uploadResponse.uploadAudioUser1
          ? uploadResponse.uploadAudioUser1.secure_url
          : "",
        AudioURL2: uploadResponse.uploadAudioUser2
          ? uploadResponse.uploadAudioUser2.secure_url
          : "",
        AudioURL3: uploadResponse.uploadAudioUser3
          ? uploadResponse.uploadAudioUser3.secure_url
          : "",
        AudioURL4: uploadResponse.uploadAudioUser4
          ? uploadResponse.uploadAudioUser4.secure_url
          : "",
        AudioURL5: uploadResponse.uploadAudioUser5
          ? uploadResponse.uploadAudioUser5.secure_url
          : "",
      };

      // Group item codes for fetching from the database
      const itemCodes = [Itemcode1, Itemcode2, Itemcode3, Itemcode4, Itemcode5];

      // Fetch words and default audio for each ItemCode from the database
      const materials = await Material.find({
        ItemCode: { $in: itemCodes },
      });

      // Create an array of items with their corresponding data
      const assessmentItems = itemCodes.map((itemCode, index) => {
        const material = materials.find((m) => m.ItemCode === itemCode);
        return {
          ItemCode: itemCode,
          Word: material?.Word || "",
          Audio: material?.Audio || "",
          UserAudioURL: fileUrls[`AudioURL${index + 1}`],
        };
      });

      // Prepare the data for insertion into the Performance model
      const performanceData = {
        UserInputId: InputID,
        ActivityCode,
        LRN,
        Section,
        Type,
        Result: "Sumbitted",
        PerformanceItems: assessmentItems.map((item, index) => ({
          ItemCode: item.ItemCode,
          Word: item.Word,
          UserAudioURL: item.UserAudioURL,
          DefaultAudio: item.Audio,
        })),
      };

      // Insert data into the Performance model
      const insert = await Performance.create(performanceData);

      if (insert) {
        // Run audio comparison and save the results to the database
        await runComparisonAndSaveResult(
          InputID,
          ActivityCode,
          LRN,
          Section,
          Type,
          fileUrls,
          assessmentItems.map((item) => item.Audio) // Extract default audios
        );

        return res.json({
          message:
            "Audio files uploaded, data stored, and comparison results saved successfully.",
        });
      } else {
        return res.status(500).json({
          error: "Upload unsuccessful. Please try again later!",
        });
      }
    } catch (error) {
      console.error("Error during upload process:", error);
      if (!res.headersSent) {
        return res
          .status(500)
          .json({ error: "An error occurred during the upload process." });
      }
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
  importSentence,
  submitAssessment,
  getAssessmentCode,
  getImportWords,
  getPerformance,
  getSentence,
  deleteAssessment,
  userInputAudio,
};
