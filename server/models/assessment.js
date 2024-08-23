const mongoose = require("mongoose"); //(npm i mongoose)
const { Schema } = mongoose;

const assessSchema = new Schema(
  {
    ActivityCode: {
      type: String,
      unique: true,
    },
    ActivityNumber: {
      type: String,
    },
    Period: String,
    Type: String,
    Status: String,
    Word1: String,
    Picture1: String,
    Audio1: String,
  },
  { timestamps: true }
);

const AssessmentModel = mongoose.model("activityAssess", assessSchema);

module.exports = AssessmentModel;
