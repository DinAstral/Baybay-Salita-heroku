const Student = require("../models/student");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const mobileLogin = async (req, res) => {
  try {
    const { LRN } = req.body;

    const user = await Student.findOne({ LRN });

    if (!LRN) {
      return res.json({
        error: "LRN is Required.",
      });
    }

    //check password match
    jwt.sign(
      {
        LRN: user.LRN,
        id: user._id,
        role: user.role,
        FirstName: user.FirstName,
        LastName: user.LastName,
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  mobileLogin,
};
