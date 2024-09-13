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
    Itemcode1: String,
    Audio1: String,
    AudioURL1: String,
    Itemcode2: String,
    Audio2: String,
    AudioURL2: String,
    Itemcode3: String,
    Audio3: String,
    AudioURL3: String,
    Itemcode4: String,
    Audio4: String,
    AudioURL4: String,
    Itemcode5: String,
    Audio5: String,
    AudioURL5: String,
  },
  { timestamps: true }
);

const PerformanceModel = mongoose.model(
  "student_performance",
  performanceSchema
);

module.exports = PerformanceModel;
