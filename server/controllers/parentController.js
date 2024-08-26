const Parent = require("../models/parents");
const Student = require("../models/student");
const mongoose = require("mongoose");

const getParentUsers = (req, res) => {
  Parent.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

const getParentUser = async (req, res) => {
  const { UserID } = req.params; // Extract UserID from route parameters

  try {
    // Find the parent by UserID
    const user = await Parent.findOne({ UserID });

    // If no parent is found, return a 404 status
    if (!user) {
      return res.json({
        message: "No account found",
      });
    }

    // Return the found parent
    res.json(user);
  } catch (error) {
    // Handle any other errors
    res.json({
      message: error.message,
    });
  }
};

const getStudentUser = async (req, res) => {
  const { LRN } = req.params; // Extract UserID from route parameters

  try {
    // Find the student by LRN
    const user = await Student.findOne({ LRN });

    // If no student is found, return a 404 status
    if (!user) {
      return res.json({
        message: "No account found",
      });
    }

    // Return the found student
    res.json(user);
  } catch (error) {
    // Handle any other errors
    res.json({
      message: error.message,
    });
  }
};

module.exports = {
  getParentUsers,
  getParentUser,
  getStudentUser,
};
