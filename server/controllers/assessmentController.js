const Material = require("../models/materials");
const Performance = require("../models/performance");
const AssessmentModel = require("../models/assessment");
const mongoose = require("mongoose");
const multer = require("multer");
const { wordUpload } = require("../middleware/upload");

function generateRandomCodeItem(length) {
  const characters = "0123456789";
  let result = "item_";
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

      const insert = await Material.create({
        ItemCode: itemID,
        Type,
        Word,
        Image: req.files["Image"][0].path,
        Audio: req.files["Audio"][0].path,
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

module.exports = {
  importWord,
  submitAssessment,
  getImportWords,
  getPerformance,
};
