const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");

// Create GridFS storage engine for "uploads"
const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
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
  fileSize: (file) => {
    if (file.fieldname === "Image") {
      return 10 * 1024 * 1024; // 10 MB for images
    } else if (file.fieldname === "Audio" || file.fieldname === "User") {
      return 100 * 1024 * 1024; // 100 MB for audio files
    }
    return 0; // No limit set for other files, but you can add more logic here
  },
};

// Configure multer upload using GridFS storage
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: (req, file) => limits.fileSize(file) },
});

// Define upload middleware for word and user
const wordUpload = upload.fields([
  { name: "Image", maxCount: 1 },
  { name: "Audio", maxCount: 1 },
]);

const UserUpload = upload.fields([{ name: "User", maxCount: 1 }]);

// Export upload middleware for use in routes
module.exports = {
  wordUpload,
  UserUpload,
};
