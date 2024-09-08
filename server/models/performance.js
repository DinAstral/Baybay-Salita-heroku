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
      type: String,
    },
    Itemcode2: String,
    Audio2: {
      type: String,
    },
    Itemcode3: String,
    Audio3: {
      type: String,
    },
    Itemcode4: String,
    Audio4: {
      type: String,
    },
    Itemcode5: String,
    Audio5: {
      type: String,
    },
  },
  { timestamps: true }
);

const PerformanceModel = mongoose.model(
  "student_performance",
  performanceSchema
);

module.exports = PerformanceModel;
