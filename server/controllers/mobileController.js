const Student = require("../models/student");
const mongoose = require("mongoose");

const mobileLogin = async (req, res) => {
    try {
        const { LRN } = req.body;
    
        const user = await Student.findOne({ LRN });
    
        if (!LRN) {
          return res.json({
            error: "LRN is Required.",
          });
        }
        //check if user exist
        else if (!user) {
          return res.json({
            error: "No User Found",
          });
        } else if (!password) {
          return res.json({
            error: "Password is Required",
          });
        }
    
        //check password match
        const match = await comparePassword(password, user.password);
        if (match) {
          jwt.sign(
            {
              email: user.email,
              id: user._id,
              role: user.role,
              FirstName: user.FirstName,
              LastName: user.LastName,
              UserID: user.UserID,
              verified: user.verified,
            },
            process.env.JWT_SECRET,
            {},
            (err, token) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ error: "Failed to generate token" });
              }
              // Set cookie with token
              res
                .cookie("token", token, { httpOnly: true })
                .json({ success: true, token, role: user.role, user });
            }
          );
        }
        if (!match) {
          res.json({
            error: "Email and Passowrd doesn't match",
          });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
      }
    };

  module.exports = {
    mobileLogin,
  };
  
   