const multer = require("multer");
const path = require("path");

// Set up multer storage

const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/Audio/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/Images/"); // Ensure the correct path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const audioUpload = multer({ storage: audioStorage });
const imageUpload = multer({ storage: imageStorage });

module.exports = { audioUpload, imageUpload };
