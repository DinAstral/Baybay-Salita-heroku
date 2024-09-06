const multer = require("multer");
const path = require("path");

// Set up multer storage

const uploadUserStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";
    if (file.fieldname === "User") {
      folder = "uploads/UserInput";
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + file.originalname);
  },
});

const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";
    if (file.fieldname === "Image") {
      folder = "uploads/Images/";
    } else if (file.fieldname === "Audio") {
      folder = "uploads/DefaultAudio/";
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + file.originalname);
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
  } else if (file.fieldname === "Audio") {
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
  } else if (file.fieldname === "User") {
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
    } else if (file.fieldname === "Audio") {
      return 100 * 1024 * 1024; // 100 MB for audio files
    } else if (file.fieldname === "User") {
      return 100 * 1024 * 1024; // 100 MB for audio files
    }
    return 0; // No limit set for other files, but you can add more logic here
  },
};

const wordUpload = multer({
  storage: uploadStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: limits.fileSize,
  },
}).fields([
  { name: "Image", maxCount: 1 },
  { name: "Audio", maxCount: 1 },
]);

const UserUpload = multer({
  storage: uploadUserStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: limits.fileSize,
  },
}).fields([{ name: "User", maxCount: 1 }]);

module.exports = { wordUpload, UserUpload };
