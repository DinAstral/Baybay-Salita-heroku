const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    let fileExt = file.originalname;
    let fileName = "";

    //Generate new filename
    if (file.fieldname === "Profile") {
      fileName = `image_${fileExt}`;
    }
    if (file.fieldname === "Image") {
      fileName = `image_${fileExt}`;
    }
    if (file.fieldname === "Audio") {
      fileName = `audio_${fileExt}`;
    }
    if (file.fieldname === "User1") {
      fileName = `user_${fileExt}`;
    }
    if (file.fieldname === "User2") {
      fileName = `user_${fileExt}`;
    }
    if (file.fieldname === "User3") {
      fileName = `user_${fileExt}`;
    }
    if (file.fieldname === "User4") {
      fileName = `user_${fileExt}`;
    }
    if (file.fieldname === "User5") {
      fileName = `user_${fileExt}`;
    }
    if (file.fieldname === "User6") {
      fileName = `user_${fileExt}`;
    }
    if (file.fieldname === "User7") {
      fileName = `user_${fileExt}`;
    }
    if (file.fieldname === "User8") {
      fileName = `user_${fileExt}`;
    }
    if (file.fieldname === "User9") {
      fileName = `user_${fileExt}`;
    }
    if (file.fieldname === "User10") {
      fileName = `user_${fileExt}`;
    }

    cb(null, fileName);
  },
});

// Set up file filter
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "Image" || file.fieldname === "Profile") {
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
  } else if (
    file.fieldname === "Audio" ||
    file.fieldname === "User1" ||
    file.fieldname === "User2" ||
    file.fieldname === "User3" ||
    file.fieldname === "User4" ||
    file.fieldname === "User5" ||
    file.fieldname === "User6" ||
    file.fieldname === "User7" ||
    file.fieldname === "User8" ||
    file.fieldname === "User9" ||
    file.fieldname === "User10"
  ) {
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
    if (file.fieldname === "Image" || file.fieldname === "Profile") {
      return 10 * 1024 * 1024; // 10 MB for images
    } else if (
      file.fieldname === "Audio" ||
      file.fieldname === "User1" ||
      file.fieldname === "User2" ||
      file.fieldname === "User3" ||
      file.fieldname === "User4" ||
      file.fieldname === "User5" ||
      file.fieldname === "User6" ||
      file.fieldname === "User7" ||
      file.fieldname === "User8" ||
      file.fieldname === "User9" ||
      file.fieldname === "User10"
    ) {
      return 100 * 1024 * 1024; // 100 MB for audio files
    }
    return 0; // No limit set for other files, but you can add more logic here
  },
};

// Configure the multer upload
const profileUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: limits.fileSize,
  },
}).fields([{ name: "Profile", maxCount: 1 }]);

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
}).fields([
  { name: "User1", maxCount: 1 },
  { name: "User2", maxCount: 1 },
  { name: "User3", maxCount: 1 },
  { name: "User4", maxCount: 1 },
  { name: "User5", maxCount: 1 },
  { name: "User6", maxCount: 1 },
  { name: "User7", maxCount: 1 },
  { name: "User8", maxCount: 1 },
  { name: "User9", maxCount: 1 },
  { name: "User10", maxCount: 1 },
]);

// Export the upload handlers
module.exports = { wordUpload, UserUpload, profileUpload };
