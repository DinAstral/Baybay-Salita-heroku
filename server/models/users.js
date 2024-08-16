const mongoose = require('mongoose'); //(npm i mongoose)
const {Schema} = mongoose

const userSchema = new Schema ({
      UserID:{
        type: String,
        unique: true
      },
      email:{
        type: String,
        unique: true
      },
      FirstName: String,
      MiddleName: String,
      LastName: String,
      Section: String,
      Department: String,
      Age: String,
      Birthday: String,
      Address: String,
      Nationality: String,
      Status: String,
      Gender: String,
      ContactNumber: String,
      Education: String,
      password: String,
      role: String,
      verified: Boolean,

}, {timestamps: true})


const UserModel = mongoose.model('Users', userSchema);


module.exports = UserModel;