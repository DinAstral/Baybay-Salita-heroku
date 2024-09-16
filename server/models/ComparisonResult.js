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
    Result1: Object,
    Itemcode2: String,
    Result2: Object,
    Itemcode3: String,
    Result3: Object,
    Itemcode4: String,
    Result4: Object,
    Itemcode5: String,
    Result5: Object,
    AverageResult: Object,
  },
  { timestamps: true }
);

const ComparisonModel = mongoose.model(
  "result_comparison_audio",
  comparisonSchema
);

module.exports = ComparisonModel;
