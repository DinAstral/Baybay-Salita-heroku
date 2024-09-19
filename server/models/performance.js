const mongoose = require("mongoose"); //(npm i mongoose)
const { Schema } = mongoose;

const performanceSchema = new Schema(
  {
    UserInputId: {
      type: String,
      unique: true,
    },
    LRN: String,
    Section: String,
    ActivityCode: String,
    Type: String,
    PerformanceItems: Object,
    Result: String,
  },
  { timestamps: true }
);

const PerformanceModel = mongoose.model(
  "student_performance",
  performanceSchema
);

module.exports = PerformanceModel;
