const mongoose = require("mongoose");
const Performance = require("../models/performance");
const Student = require("../models/student");

const studentStatus = async (req, res) => {
  try {
    const { LRN } = req.params;

    // Fetch student by LRN from the database to ensure valid data processing
    const student = await Student.findOne({ LRN });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // List of assessment types and max scores; add criteria for TimeRead if applicable
    const assessments = [
      { name: "Pagbabaybay", maxScore: 10 },
      { name: "Pantig", maxScore: 10 },
      { name: "Salita", maxScore: 10 },
      { name: "Pagbabasa", maxScore: 5 },
    ];

    // Retrieve all performance data for the student to calculate their status
    const performances = await Performance.find({
      LRN: student.LRN,
      Type: { $in: assessments.map((a) => a.name) },
    });

    // If no performance data found, assign "Incomplete" status
    if (performances.length === 0) {
      const status = "Incomplete";
      const comment =
        "No assessments completed. Please complete the required assessments.";

      // Updating student record for easier future tracking of incomplete statuses
      await Student.findByIdAndUpdate(student._id, { status });

      return res.status(200).json({
        message: "No assessments completed, status set to Incomplete",
        status,
        comment,
      });
    }

    // Check which assessments are completed based on performance records
    const completedAssessments = new Set(performances.map((p) => p.Type));

    // Confirm that each assessment is completed to mark student as "Complete"
    const allAssessmentsCompleted = assessments.every((a) =>
      completedAssessments.has(a.name)
    );

    // If not all assessments are done, mark the student as "Incomplete"
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

    // Calculate total score and max possible score based on completed assessments
    let totalScore = 0;
    let totalPossibleScore = 0;
    let timeReadPercentage = 0; // Track percentage completion for "Pagbabasa" reading time

    performances.forEach((performance) => {
      const assessment = assessments.find((a) => a.name === performance.Type);
      if (assessment) {
        totalScore += performance.Score;
        totalPossibleScore += assessment.maxScore;

        // Handle special case for reading time in "Pagbabasa" to track progress
        if (performance.Type === "Pagbabasa" && performance.TimeRead) {
          const timeRead = parseInt(performance.TimeRead, 10);

          // Ensure valid TimeRead value to calculate the time read percentage
          if (!isNaN(timeRead)) {
            timeReadPercentage = (timeRead / assessment.maxScore) * 100;
          } else {
            console.warn(`Invalid TimeRead value for LRN: ${student.LRN}`); // Log an error if TimeRead is invalid
          }
        }
      }
    });

    // Calculate average score percentage to evaluate student's reading level
    const averageScore = (totalScore / totalPossibleScore) * 100;

    // Initial default status, comment, and recommendation for student feedback
    let status = "Low Emerging Reader";
    let comment = "Keep practicing to improve your reading skills.";
    let recommendation =
      "Practice reading daily to strengthen foundational skills.";

    // Define reading statuses based on score thresholds and TimeRead completion
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

    // Update the student's status in the database
    await Student.findByIdAndUpdate(student._id, { status });

    // Respond with updated status, score, and performance feedback
    return res.status(200).json({
      message: `Status updated to ${status}`,
      totalScore,
      totalPossibleScore,
      timeReadPercentage,
      comment,
      status,
      recommendation,
    });
  } catch (error) {
    console.error(error); // Log error details for debugging server-side issues
    return res.status(500).json({ error: "Server error" }); // Respond with server error status if any unexpected issue occurs
  }
};

module.exports = { studentStatus };
