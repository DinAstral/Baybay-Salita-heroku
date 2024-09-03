const mongoose = require("mongoose"); //(npm i mongoose)
const { Schema } = mongoose;

const performanceSchema = new Schema(
  {
    LRN: String,
    Section: String,
    ActivityCode: {
      type: String,
      unique: true,
    },
    Period: String,
    Type: String,
    Itemcode1: String,
    Audio1: String,
    Itemcode2: String,
    Audio2: String,
    Itemcode3: String,
    Audio3: String,
    Itemcode4: String,
    Audio4: String,
    Itemcode5: String,
    Audio5: String,
  },
  { timestamps: true }
);

const PerformanceModel = mongoose.model(
  "student_performance",
  performanceSchema
);

module.exports = PerformanceModel;
