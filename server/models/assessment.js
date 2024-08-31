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
    word1: String,
    word1Audio: String,
    word2: String,
    word2Audio: String,
    word3: String,
    word3Audio: String,
    word4: String,
    word4Audio: String,
    word5: String,
    word5Audio: String,
  },

  { timestamps: true }
);

const AssessmentModel = mongoose.model("activityAssess", assessSchema);

module.exports = AssessmentModel;
