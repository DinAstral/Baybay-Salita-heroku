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

    // Define assessments with max scores and types
    const assessments = [
      { name: "Pagbabaybay", maxScore: 10 }, // Assessment 1
      { name: "Pantig", maxScore: 10 }, // Assessment 2
      { name: "Salita", maxScore: 10 }, // Assessment 3
      { name: "Pagbabasa", maxScore: 5 }, // Assessment 4 (includes comprehension)
    ];

    // Fetch all performance entries for the student
    const performances = await Performance.find({
      LRN: student.LRN,
      Type: { $in: assessments.map((a) => a.name) },
    });

    // If no performance data found, mark as "Incomplete"
    if (performances.length === 0) {
      const status = "Incomplete";
      const comment =
        "No assessments completed. Please ensure all assessments are completed for a comprehensive evaluation.";
      const recommendations = [
        "Schedule each assessment to complete the student’s profile.",
        "Review incomplete areas, focusing on fundamental sounds and letters in assessments 1 and 2.",
      ];

      await Student.findByIdAndUpdate(student._id, { status });

      return res.status(200).json({
        message: "No assessments completed, status set to Incomplete",
        status,
        comment,
        recommendations,
      });
    }

    // Check completed assessments
    const completedAssessments = new Set(performances.map((p) => p.Type));
    const allAssessmentsCompleted = assessments.every((a) =>
      completedAssessments.has(a.name)
    );

    // If not all assessments are completed, mark as "Incomplete"
    if (!allAssessmentsCompleted) {
      const status = "Incomplete";
      const comment =
        "Some assessments are missing. Please complete all required assessments.";
      const recommendations = [
        "Identify missing assessments and schedule them.",
        "Discuss with the student the importance of completing each assessment to track progress.",
      ];

      await Student.findByIdAndUpdate(student._id, { status });

      return res.status(200).json({
        message: "Status updated to Incomplete due to missing assessments",
        status,
        comment,
        recommendations,
      });
    }

    // Calculate scores
    let totalScore = 0;
    let totalPossibleScore = 0;
    let timeReadPercentage = 0;

    performances.forEach((performance) => {
      const assessment = assessments.find((a) => a.name === performance.Type);
      if (assessment) {
        totalScore += performance.Score;
        totalPossibleScore += assessment.maxScore;

        if (performance.Type === "Pagbabasa" && performance.TimeRead) {
          const timeRead = parseInt(performance.TimeRead, 10);
          if (!isNaN(timeRead)) {
            timeReadPercentage = (timeRead / assessment.maxScore) * 100;
          } else {
            console.warn(`Invalid TimeRead value for LRN: ${student.LRN}`);
          }
        }
      }
    });

    // Calculate score percentage
    const averageScore = (totalScore / totalPossibleScore) * 100;

    // Status, comments, and recommendations
    let status = "Low Emerging Reader";
    let comment =
      "The student faces challenges with sounds and letter recognition, particularly in assessments 1 and 2.";
    let recommendations = [
      "Focus on foundational phonics and letter-sound recognition, especially in assessments 1 (Pagbabaybay) and 2 (Pantig).",
      "Incorporate sound-letter matching activities and use phonetic games to build familiarity.",
    ];

    // Assign feedback based on score and assessments completed
    if (averageScore >= 0 && averageScore <= 16) {
      status = "Low Emerging Reader";
      comment =
        "The student faces challenges with sounds and letter recognition, particularly in assessments 1 and 2.";
      recommendations = [
        "Focus on foundational phonics and letter-sound recognition, especially in assessments 1 and 2.",
        "Introduce repetitive sound and letter matching exercises to reinforce understanding.",
        "Consider additional support sessions focusing on letter recognition and sounds.",
      ];
    } else if (
      averageScore >= 17 &&
      averageScore <= 30 &&
      timeReadPercentage < 25
    ) {
      status = "High Emerging Reader";
      comment =
        "The student shows slight improvement but still struggles with sounds and letters, especially in assessments 1 and 2.";
      recommendations = [
        "Continue reinforcing phonics and letter-sound recognition.",
        "Incorporate paired reading with another student to boost confidence.",
        "Add phonics games that gradually increase in complexity to encourage progress.",
      ];
    } else if (
      averageScore >= 17 &&
      averageScore <= 30 &&
      timeReadPercentage >= 26 &&
      timeReadPercentage <= 50 &&
      performances.filter((p) => p.correctAnswers >= 1).length > 0
    ) {
      status = "Developing Reader";
      comment =
        "The student can recognize sounds and letters but has some challenges with syllables and words in assessments 2 and 3.";
      recommendations = [
        "Practice combining letters into syllables to strengthen word recognition.",
        "Focus on exercises that involve breaking down and blending syllables.",
        "Encourage daily reading with simple text to reinforce understanding of sounds and words.",
      ];
    } else if (
      averageScore >= 17 &&
      averageScore <= 30 &&
      timeReadPercentage >= 51 &&
      timeReadPercentage <= 75 &&
      performances.filter((p) => p.correctAnswers >= 2).length > 0
    ) {
      status = "Transitioning Reader";
      comment =
        "The student shows major improvements but still needs work with word recognition and basic comprehension in assessments 3 and 4.";
      recommendations = [
        "Introduce more complex word recognition exercises.",
        "Practice comprehension questions after reading simple passages to improve understanding.",
        "Incorporate activities that require the student to summarize or retell stories.",
      ];
    } else if (
      averageScore >= 17 &&
      averageScore <= 30 &&
      timeReadPercentage >= 76 &&
      performances.filter((p) => p.correctAnswers >= 4).length > 0
    ) {
      status = "Grade Level Reader";
      comment =
        "The student has achieved grade-level reading skills with good comprehension and fluency.";
      recommendations = [
        "Encourage reading across various genres to further strengthen comprehension.",
        "Engage the student in discussions about themes and messages in stories.",
        "Set personalized reading goals to continue developing reading fluency and enjoyment.",
      ];
    }

    // Update student status in the database
    await Student.findByIdAndUpdate(student._id, { status });

    // Return response with status, comment, and recommendations
    return res.status(200).json({
      message: `Status updated to ${status}`,
      totalScore,
      totalPossibleScore,
      timeReadPercentage,
      comment,
      status,
      recommendations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { studentStatus };
