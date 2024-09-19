const mongoose = require("mongoose");
const { Schema } = mongoose;

const materialSentenceSchema = new Schema(
  {
    ItemCode: {
      type: String,
      unique: true,
    },
    Type: String,
    Sentence: String,
    Questions: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  { timestamps: true }
);

const MaterialSentenceModel = mongoose.model(
  "materials_sentence",
  materialSentenceSchema
);

module.exports = MaterialSentenceModel;
