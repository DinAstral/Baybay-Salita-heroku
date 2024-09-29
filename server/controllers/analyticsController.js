const mongoose = require("mongoose");
const Performance = require("../models/performance");
const Student = require("../models/student");

const studentStatus = async (req, res) => {
  try {
    const { LRN } = req.params;

    // Fetch student by LRN
    const student = await Student.findOne({ LRN });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Define the list of assessments with max scores (could come from a database too)
    const assessments = [
      { name: "Pagbabaybay", maxScore: 10 },
      { name: "Pantig", maxScore: 10 },
      { name: "Salita", maxScore: 10 },
      { name: "Pagbabasa", maxScore: 5 },
    ];

    // Fetch all the performance entries for the student's LRN
    const performances = await Performance.find({
      LRN: student.LRN,
      Type: { $in: assessments.map((a) => a.name) }, // Filter by the required assessment types
    });

    // If no performance data is found, the student is marked as incomplete
    if (performances.length === 0) {
      await Student.findByIdAndUpdate(student._id, { status: "Incomplete" });
      return res.status(200).json({
        message: "No assessments completed, status set to Incomplete",
      });
    }

    // Check which assessments are completed at least once
    const completedAssessments = new Set(performances.map((p) => p.Type));

    // Ensure that every required assessment has been completed at least once
    const allAssessmentsCompleted = assessments.every((a) =>
      completedAssessments.has(a.name)
    );

    // If not all assessments are completed, mark as 'Incomplete'
    if (!allAssessmentsCompleted) {
      await Student.findByIdAndUpdate(student._id, { status: "Incomplete" });
      return res.status(200).json({
        message: "Status updated to Incomplete due to missing assessments",
      });
    }

    // Calculate the total score and possible score based on the assessments in the database
    let totalScore = 0;
    let totalPossibleScore = 0;

    performances.forEach((performance) => {
      const assessment = assessments.find((a) => a.name === performance.Type);
      if (assessment) {
        totalScore += performance.Score; // Add the actual score the student received
        totalPossibleScore += assessment.maxScore; // Add the maximum possible score for that assessment
      }
    });

    // Calculate weighted average score as a percentage
    const averageScore = (totalScore / totalPossibleScore) * 100;

    let status = "Low and High Emerging Reader";
    let comment = "Keep practicing to improve your reading skills.";

    // Assign comments based on the status and score ranges
    if (averageScore >= 70) {
      status = "Grade Ready Reader";
      comment = "Excellent work! You are ready for the next grade.";
    } else if (averageScore >= 50) {
      status = "Transitioning Reader";
      comment =
        "Good progress! You're on your way to becoming a fluent reader.";
    } else if (averageScore >= 30) {
      status = "Developing Reader";
      comment =
        "You're developing well! Continue practicing to enhance your skills.";
    }

    // Update student status based on calculated score
    await Student.findByIdAndUpdate(student._id, { status });

    // Return the response with the status and comment
    return res.status(200).json({
      message: `Status updated to ${status}`,
      totalScore,
      totalPossibleScore,
      comment, // Include the comment in the response
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { studentStatus };
