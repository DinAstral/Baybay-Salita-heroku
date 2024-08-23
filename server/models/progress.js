const mongoose = require("mongoose"); //(npm i mongoose)
const { Schema } = mongoose;

const ScoreSchema = new Schema(
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
    Audio1: String,
    Score: String,
    Feedback: String,
  },
  { timestamps: true }
);

const ProgressScoreModel = mongoose.model("score_progress", ScoreSchema);

module.exports = ProgressScoreModel;
