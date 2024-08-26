const mongoose = require("mongoose"); //(npm i mongoose)
const { Schema } = mongoose;

const FeedbackSchema = new Schema(
  {
    UserID: {
      type: String,
      unique: true,
    },
    FeedbackID: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    Title: String,
    ActivityNumber: String,
    Type: String,
    Context: String,
  },
  { timestamps: true }
);

const FeedbackModel = mongoose.model("Feedback", FeedbackSchema);

module.exports = FeedbackModel;
