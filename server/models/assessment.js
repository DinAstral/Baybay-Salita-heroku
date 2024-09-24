const mongoose = require("mongoose"); //(npm i mongoose)
const { Schema } = mongoose;

const assessSchema = new Schema(
  {
    UserID: String,
    ActivityCode: {
      type: String,
      unique: true,
    },
    Period: {
      type: String,
    },
    Type: String,
    Title: String,
    Sentence: String,
    Questions: Object,
    Items: Object,
    Assessment: String,
  },

  { timestamps: true }
);

const AssessmentModel = mongoose.model("activityAssess", assessSchema);

module.exports = AssessmentModel;
