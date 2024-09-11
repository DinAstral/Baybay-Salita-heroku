const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    let fileExt = file.originalname;
    let fileName = "";

    //Generate new filename
    if (file.fieldname === "Image") {
      fileName = `image_${fileExt}`;
    }
    if (file.fieldname === "Audio") {
      fileName = `audio_${fileExt}`;
    }
    if (file.fieldname === "User") {
      fileName = `user_${fileExt}`;
    }

    cb(null, fileName);
  },
});

// Set up file filter
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "Image") {
    // Accept only JPEG and PNG files
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only JPEG and PNG are allowed for images."
        )
      );
    }
  } else if (file.fieldname === "Audio" || file.fieldname === "User") {
    // Accept only audio files
    if (file.mimetype.startsWith("audio/")) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only audio files are allowed for audio uploads."
        )
      );
    }
  } else {
    cb(
      new Error(
        "Invalid fieldname. Please check the fieldname used in the upload."
      )
    );
  }
};

// Set up limits
const limits = {
  fileSize: (req, file, cb) => {
    if (file.fieldname === "Image") {
      return 10 * 1024 * 1024; // 10 MB for images
    } else if (file.fieldname === "Audio" || file.fieldname === "User") {
      return 100 * 1024 * 1024; // 100 MB for audio files
    }
    return 0; // No limit set for other files, but you can add more logic here
  },
};

// Configure the multer upload
const wordUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: limits.fileSize,
  },
}).fields([
  { name: "Image", maxCount: 1 },
  { name: "Audio", maxCount: 1 },
]);

const UserUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: limits.fileSize,
  },
}).fields([{ name: "User", maxCount: 1 }]);

// Export the upload handlers
module.exports = { wordUpload, UserUpload };
