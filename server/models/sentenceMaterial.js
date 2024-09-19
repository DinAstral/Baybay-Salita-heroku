const mongoose = require("mongoose");
const { Schema } = mongoose;

const materialSchema = new Schema(
  {
    SentenceCode: {
      type: String,
      unique: true,
    },
    Type: String,
    Story: String,
    Question: Object,
  },
  { timestamps: true }
);

const MaterialModel = mongoose.model("materials", materialSchema);

module.exports = MaterialModel;
