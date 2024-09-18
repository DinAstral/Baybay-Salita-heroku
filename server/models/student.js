const mongoose = require("mongoose"); //(npm i mongoose)
const { Schema } = mongoose;

const studentSchema = new Schema(
  {
    LRN: {
      type: String,
      unique: true,
    },
    FirstName: String,
    MiddleName: String,
    LastName: String,
    Age: String,
    Level: String,
    Section: String,
    Birthday: String,
    Address: String,
    MotherTongue: String,
    Nationality: String,
    Gender: String,
    picture: String,
    role: String,
  },
  { timestamps: true }
);

const StudentModel = mongoose.model("Students", studentSchema);

module.exports = StudentModel;
