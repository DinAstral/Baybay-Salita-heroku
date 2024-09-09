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
      type: mongoose.Schema.Types.ObjectId, // Store the GridFS file ID
      ref: "uploads.files", // Reference to the GridFS collection
    },
    Audio: {
      type: mongoose.Schema.Types.ObjectId, // Store the GridFS file ID
      ref: "uploads.files", // Reference to the GridFS collection
    },
  },
  { timestamps: true }
);

const MaterialModel = mongoose.model("materials", materialSchema);

module.exports = MaterialModel;
