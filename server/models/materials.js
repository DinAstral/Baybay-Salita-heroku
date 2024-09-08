const mongoose = require("mongoose");
const { Schema } = mongoose;

const materialSchema = new Schema(
  {
    ItemCode: {
      type: String,
      unique: true,
    },
    Type: String,
    Word: String,
    Image: {
      type: String,
    },
    Audio: {
      type: String,
    },
  },
  { timestamps: true }
);

const MaterialModel = mongoose.model("materials", materialSchema);

module.exports = MaterialModel;
