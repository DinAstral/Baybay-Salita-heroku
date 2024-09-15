const mongoose = require("mongoose"); //(npm i mongoose)
const { Schema } = mongoose;

const comparisonSchema = new Schema(
  {
    UserInputId: String,
    LRN: String,
    Section: String,
    ActivityCode: String,
    Type: String,
    Itemcode1: String,
    mfccResult1: Number,
    Result1: Number,
    Itemcode2: String,
    mfccResult2: Number,
    Result2: Number,
    Itemcode3: String,
    mfccResult3: Number,
    Result3: Number,
    Itemcode4: String,
    mfccResult4: Number,
    Result4: Number,
    Itemcode5: String,
    mfccResult5: Number,
    Result5: Number,
    AverageResult: Number,
  },
  { timestamps: true }
);

const ComparisonModel = mongoose.model(
  "result_comparison_audio",
  comparisonSchema
);

module.exports = ComparisonModel;
