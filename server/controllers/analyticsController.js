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

    // Define the list of assessments with max scores and criteria for TimeRead
    const assessments = [
      { name: "Pagbabaybay", maxScore: 10 },
      { name: "Pantig", maxScore: 10 },
      { name: "Salita", maxScore: 10 },
      { name: "Pagbabasa", maxScore: 5 }, // Includes time read
    ];

    // Fetch all the performance entries for the student's LRN
    const performances = await Performance.find({
      LRN: student.LRN,
      Type: { $in: assessments.map((a) => a.name) }, // Filter by the required assessment types
    });

    // If no performance data is found, the student is marked as incomplete
    if (performances.length === 0) {
      const status = "Incomplete";
      const comment =
        "No assessments completed. Please complete the required assessments.";

      await Student.findByIdAndUpdate(student._id, { status });

      return res.status(200).json({
        message: "No assessments completed, status set to Incomplete",
        status,
        comment,
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
      const status = "Incomplete";
      const comment =
        "Some assessments are missing. Please complete all required assessments.";

      await Student.findByIdAndUpdate(student._id, { status });

      return res.status(200).json({
        message: "Status updated to Incomplete due to missing assessments",
        status,
        comment,
      });
    }

    // Calculate the total score and possible score based on the assessments in the database
    let totalScore = 0;
    let totalPossibleScore = 0;
    let timeReadPercentage = 0; // For tracking percentage of reading completion in "Pagbabasa"

    performances.forEach((performance) => {
      const assessment = assessments.find((a) => a.name === performance.Type);
      if (assessment) {
        totalScore += performance.Score; // Add the actual score the student received
        totalPossibleScore += assessment.maxScore; // Add the maximum possible score for that assessment

        // Track the reading time if it's for "Pagbabasa"
        if (performance.Type === "Pagbabasa" && performance.TimeRead) {
          const timeRead = parseInt(performance.TimeRead, 10); // Convert TimeRead to an integer

          if (!isNaN(timeRead)) {
            timeReadPercentage = (timeRead / assessment.maxScore) * 100; // Calculate percentage if valid integer
          } else {
            console.warn(`Invalid TimeRead value for LRN: ${student.LRN}`); // Log warning for invalid values
          }
        }
      }
    });

    // Calculate weighted average score as a percentage
    const averageScore = (totalScore / totalPossibleScore) * 100;

    // Initial status and comment
    let status = "Low Emerging Reader";
    let comment = "Keep practicing to improve your reading skills.";
    let recommendation =
      "Practice reading daily to strengthen foundational skills.";

    // Assign status based on the new criteria including TimeRead percentage
    if (averageScore >= 0 && averageScore <= 16) {
      status = "Low Emerging Reader";
      comment = "Focus on improving your foundational reading skills.";
      recommendation =
        "Engage in one-on-one tutoring sessions and practice reading aloud.";
    } else if (
      averageScore >= 17 &&
      averageScore <= 30 &&
      timeReadPercentage < 25
    ) {
      status = "High Emerging Reader";
      comment = "You're progressing! Keep working on your reading fluency.";
      recommendation =
        "Try reading stories with a peer and focus on fluency exercises.";
    } else if (
      averageScore >= 17 &&
      averageScore <= 30 &&
      timeReadPercentage >= 26 &&
      timeReadPercentage <= 50 &&
      performances.filter((p) => p.correctAnswers >= 1).length > 0
    ) {
      status = "Developing Reader";
      comment = "Good progress! You are answering questions correctly.";
      recommendation =
        "Start reading comprehension exercises to build on your understanding of texts.";
    } else if (
      averageScore >= 17 &&
      averageScore <= 30 &&
      timeReadPercentage >= 51 &&
      timeReadPercentage <= 75 &&
      performances.filter((p) => p.correctAnswers >= 2).length > 0
    ) {
      status = "Transitioning Reader";
      comment = "You're transitioning well, answering more questions!";
      recommendation =
        "Continue reading longer texts and focus on improving comprehension and speed.";
    } else if (
      averageScore >= 17 &&
      averageScore <= 30 &&
      timeReadPercentage >= 76 &&
      performances.filter((p) => p.correctAnswers >= 4).length > 0
    ) {
      status = "Grade Level Reader";
      comment = "Great job! You're reading at grade level!";
      recommendation =
        "Maintain your progress by reading a variety of genres and challenging materials.";
    }

    // Update student status based on calculated score and time read
    await Student.findByIdAndUpdate(student._id, { status });

    // Return the response with the status, comment, and recommendations
    return res.status(200).json({
      message: `Status updated to ${status}`,
      totalScore,
      totalPossibleScore,
      timeReadPercentage,
      comment, // Include the comment in the response
      status,
      recommendation, // Include the recommendation in the response
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { studentStatus };
