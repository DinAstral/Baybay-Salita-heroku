const mongoose = require("mongoose"); //(npm i mongoose)
const { Schema } = mongoose;

const assessSchema = new Schema(
  {
    ActivityCode: {
      type: String,
      unique: true,
    },
    Period: {
      type: String,
    },
    Type: String,
    Item1: String,
    Item2: String,
    Item3: String,
    Item4: String,
    Item5: String,
  },

  { timestamps: true }
);

const AssessmentModel = mongoose.model("activityAssess", assessSchema);

module.exports = AssessmentModel;
