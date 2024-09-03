const mongoose = require("mongoose"); //(npm i mongoose)
const { Schema } = mongoose;

const materialSchema = new Schema(
  {
    ItemCode: {
      type: String,
      unique: true,
    },
    Type: String,
    Word: String,
    Image: String,
    Audio: String,
  },

  { timestamps: true }
);

const MaterialModel = mongoose.model("materials", materialSchema);

module.exports = MaterialModel;
