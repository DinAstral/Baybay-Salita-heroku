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

    const assessments = [
      { name: "Pagbabaybay", maxScore: 10 },
      { name: "Pantig", maxScore: 10 },
      { name: "Salita", maxScore: 10 },
      { name: "Pagbabasa", maxScore: 5 },
    ];

    const performances = await Performance.find({
      LRN: student.LRN,
      Type: { $in: assessments.map((a) => a.name) },
    });

    if (performances.length === 0) {
      const status = "Incomplete";
      const comment = "No assessments completed. Complete all assessments.";
      const recommendation = "Schedule each assessment to complete the student’s profile.";

      await Student.findByIdAndUpdate(student._id, { status });

      return res.status(200).json({
        message: "No assessments completed, status set to Incomplete",
        status,
        comment,
        recommendation, // Only one recommendation
      });
    }

    const completedAssessments = new Set(performances.map((p) => p.Type));
    const allAssessmentsCompleted = assessments.every((a) =>
      completedAssessments.has(a.name)
    );

    if (!allAssessmentsCompleted) {
      const status = "Incomplete";
      const comment = "Some assessments are missing. Complete all required assessments.";
      const recommendation = "Identify missing assessments and schedule them.";

      await Student.findByIdAndUpdate(student._id, { status });

      return res.status(200).json({
        message: "Status updated to Incomplete due to missing assessments",
        status,
        comment,
        recommendation,
      });
    }

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

    const averageScore = (totalScore / totalPossibleScore) * 100;

    let status = "Low Emerging Reader";
    let comment = "The student faces challenges with sounds and letter recognition.";
    let recommendation = "Focus on foundational phonics and letter-sound recognition.";

    if (averageScore >= 0 && averageScore <= 16) {
      status = "Low Emerging Reader";
      comment = "Challenges with sounds and letter recognition in assessments 1 and 2.";
      recommendation = "Focus on phonics and letter-sound recognition.";
    } else if (averageScore >= 17 && averageScore <= 30 && timeReadPercentage < 25) {
      status = "High Emerging Reader";
      comment = "Slight improvement but struggles remain, especially in assessments 1 and 2.";
      recommendation = "Reinforce phonics and letter-sound recognition.";
    } else if (averageScore >= 17 && averageScore <= 30 && timeReadPercentage >= 26 && timeReadPercentage <= 50 && performances.filter((p) => p.correctAnswers >= 1).length > 0) {
      status = "Developing Reader";
      comment = "Recognition of sounds and letters but challenges with syllables and words.";
      recommendation = "Practice combining letters into syllables.";
    } else if (averageScore >= 17 && averageScore <= 30 && timeReadPercentage >= 51 && timeReadPercentage <= 75 && performances.filter((p) => p.correctAnswers >= 2).length > 0) {
      status = "Transitioning Reader";
      comment = "Improvements noted, needs work with word recognition and comprehension.";
      recommendation = "Introduce complex word recognition exercises.";
    } else if (averageScore >= 17 && averageScore <= 30 && timeReadPercentage >= 76 && performances.filter((p) => p.correctAnswers >= 4).length > 0) {
      status = "Grade Level Reader";
      comment = "Achieved grade-level reading with good comprehension.";
      recommendation = "Encourage reading various genres.";
    }

    await Student.findByIdAndUpdate(student._id, { status });

    return res.status(200).json({
      message: `Status updated to ${status}`,
      totalScore,
      totalPossibleScore,
      timeReadPercentage,
      comment,
      status,
      recommendation, // Only one recommendation
    });
  } catch (error) {
    console.error("Error in studentStatus function:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { studentStatus };
