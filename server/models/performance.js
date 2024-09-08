const mongoose = require("mongoose"); //(npm i mongoose)
const { Schema } = mongoose;

const performanceSchema = new Schema(
  {
    UserInputId: String,
    //  LRN: String,
    //  Section: String,
    // ActivityCode: {
    // type: String,
    //  unique: true,
    // },
    //Period: String,
    //Type: String,
    Itemcode1: String,
    Audio1: {
      type: mongoose.Schema.Types.filename, // Store the GridFS file ID
      ref: "uploads.files", // Reference to the GridFS collection
    },
    Itemcode2: String,
    Audio2: {
      type: mongoose.Schema.Types.filename, // Store the GridFS file ID
      ref: "uploads.files", // Reference to the GridFS collection
    },
    Itemcode3: String,
    Audio3: {
      type: mongoose.Schema.Types.filename, // Store the GridFS file ID
      ref: "uploads.files", // Reference to the GridFS collection
    },
    Itemcode4: String,
    Audio4: {
      type: mongoose.Schema.Types.filename, // Store the GridFS file ID
      ref: "uploads.files", // Reference to the GridFS collection
    },
    Itemcode5: String,
    Audio5: {
      type: mongoose.Schema.Types.filename, // Store the GridFS file ID
      ref: "uploads.files", // Reference to the GridFS collection
    },
  },
  { timestamps: true }
);

const PerformanceModel = mongoose.model(
  "student_performance",
  performanceSchema
);

module.exports = PerformanceModel;
