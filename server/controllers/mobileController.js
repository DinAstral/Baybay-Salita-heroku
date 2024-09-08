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

// Gets the data of the Student base on the _id
const getStudentbyLRN = async (req, res) => {
  const { LRN } = req.params;

  try {
    const student = await Student.findOne({ LRN });
    if (!student) {
      return res.status(404).json({
        message: "No account found",
      });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  mobileLogin,
  getStudentbyLRN,
};
