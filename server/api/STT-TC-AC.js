//SPEECH-TO-TEXT MODULE
//COMPARING OF TEXT AND AUDIO BASE ON RESULT
const Material = require("../models/materials");
const Performance = require("../models/performance");

const { AssemblyAI } = require("assemblyai");
const natural = require("natural");
const axios = require("axios");

// Initialize AssemblyAI client
const client = new AssemblyAI({
  apiKey: "3b4f512cbda24b0ab31463b8200b3916",
});

// URLs to the audio files
const audioUrl1 =
  "https://res.cloudinary.com/dvcqnbkwb/video/upload/v1726149505/user_audio/audioUser/user_manok%20rald.wav.wav";
const audioUrl2 =
  "https://res.cloudinary.com/dvcqnbkwb/video/upload/v1726149648/user_audio/audioUser/user_manok%202.wav.wav"; // Change this to your actual URL

// Function to get transcription from AssemblyAI
const getTranscription = async (audioUrl) => {
  const config = {
    audio_url: audioUrl,
    speech_model: "nano",
    language_code: "tl",
    language_confidence_threshold: 0.4,
  };

  try {
    const transcript = await client.transcripts.transcribe(config);
    return transcript;
  } catch (error) {
    console.error("Error:", error);
  }
};

// Function to compare two texts
const compareTexts = (text1, text2) => {
  const tokenizer = new natural.WordTokenizer();
  const tfidf = new natural.TfIdf();

  tfidf.addDocument(text1);
  tfidf.addDocument(text2);

  return tfidf.listTerms(0).map((item) => ({
    term: item.term,
    tfidf: item.tfidf,
  }));
};

// Main function to orchestrate the process
const run = async () => {
  try {
    // Get transcriptions
    const transcript1 = await getTranscription(audioUrl1);
    const transcript2 = await getTranscription(audioUrl2);

    // Debugging statements
    console.log("Transcript 1:", transcript1);
    console.log("Transcript 2:", transcript2);

    // Ensure transcript1 and transcript2 are not null and have the 'text' property
    if (transcript1 && transcript2) {
      const textComparison = compareTexts(transcript1.text, transcript2.text);
      console.log("Text Comparison:", textComparison);
    } else {
      console.error("Error: Transcription result is null or missing.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = {
  run,
};
