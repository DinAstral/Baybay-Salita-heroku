const mongoose = require('mongoose'); //(npm i mongoose)
const {Schema} = mongoose

const assessSchema = new Schema ({
      ActivityCode:{
        type: String,
        unique: true
      },
      ActivityNumber:{
        type: String,
      },
      Period: String,
      Type: String,
      Status: String,
      Word1: String,
      Word2: String,
      Word3: String,
      Word4: String,
      Word5: String,
      Picture1: String,
      Picture2: String,
      Picture3: String,
      Picture4: String,
      Picture5: String,
      Audio1: String,
      Audio2: String,
      Audio3: String,
      Audio4: String,
      Audio5: String,
},{timestamps: true})


const AssessmentModel = mongoose.model('activityAssess', assessSchema);


module.exports = AssessmentModel;