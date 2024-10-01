const axios = require("axios");
const Meyda = require("meyda");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const wav = require("wav-decoder");
const mongoose = require("mongoose");
const CompareModel = require("../models/ComparisonResult");

// URLs to the audio files (you can replace these with dynamic URLs)
const audioUrl1 =
  "http://res.cloudinary.com/dvcqnbkwb/video/upload/v1726210673/user_audio/audioUser/user_hello1.wav.wav";
const audioUrl2 =
  "http://res.cloudinary.com/dvcqnbkwb/video/upload/v1726210690/user_audio/audioUser/user_hello2.wav.wav";

// Function to download and save audio files locally
const downloadAudio = async (url, filename) => {
  const response = await axios({
    method: "GET",
    url: url,
    responseType: "stream",
  });

  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(filename);
    response.data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
};

// Function to delete a file if it exists
const deleteFileIfExists = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// Helper function to chunk audio data into frames of a power of 2 size (512)
const chunkArray = (arr, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    // If the last chunk is smaller, pad it with zeros
    if (chunk.length < chunkSize) {
      const paddedChunk = new Float32Array(chunkSize);
      paddedChunk.set(chunk);
      chunks.push(paddedChunk);
    } else {
      chunks.push(chunk);
    }
  }
  return chunks;
};

// Function to extract audio features using Meyda
const extractAudioFeatures = async (audioPath) => {
  return new Promise((resolve, reject) => {
    const tempOutput = `temp_${audioPath}`;

    // Delete any existing temp file before processing
    deleteFileIfExists(tempOutput);

    ffmpeg(audioPath)
      .toFormat("wav")
      .on("end", () => {
        fs.readFile(tempOutput, async (err, data) => {
          if (err) {
            reject(err);
            return;
          }

          try {
            // Decode the WAV file
            const audioData = await wav.decode(data);

            // Use the first audio channel for feature extraction
            const channelData = audioData.channelData[0];

            // Define the buffer size (512, a power of 2)
            const bufferSize = 512;

            // Chunk the audio data into frames of size 512
            const audioChunks = chunkArray(channelData, bufferSize);

            // Extract features for each chunk and accumulate the results
            const totalChunks = audioChunks.length;
            const sumFeatures = audioChunks.reduce((acc, chunk, index) => {
              const features = Meyda.extract(
                [
                  "mfcc",
                  "chroma",
                  "spectralCentroid",
                  "zcr",
                  "perceptualSpread",
                ],
                chunk
              );

              // Initialize the accumulator for the first chunk
              if (index === 0) {
                Object.keys(features).forEach((key) => {
                  acc[key] = Array.isArray(features[key])
                    ? features[key].slice()
                    : [features[key]];
                });
              } else {
                // Accumulate features for subsequent chunks
                Object.keys(features).forEach((key) => {
                  if (Array.isArray(features[key])) {
                    acc[key] = acc[key].map((val, i) => val + features[key][i]);
                  } else {
                    acc[key][0] += features[key];
                  }
                });
              }

              return acc;
            }, {});

            // Average the features across all chunks
            Object.keys(sumFeatures).forEach((key) => {
              sumFeatures[key] = sumFeatures[key].map(
                (val) => val / totalChunks
              );
            });

            resolve(sumFeatures);
          } catch (decodeError) {
            reject(decodeError);
          }
        });
      })
      .on("error", (err) => reject(err))
      .save(tempOutput);
  });
};

// Function to compare audio features
const compareAudioFeatures = (features1, features2) => {
  // Simple comparison by calculating the Euclidean distance between feature vectors
  const euclideanDistance = (vector1, vector2) => {
    const sumSquares = vector1.reduce(
      (acc, val, idx) => acc + Math.pow(val - vector2[idx], 2),
      0
    );
    return Math.sqrt(sumSquares);
  };

  const mfccDistance = euclideanDistance(features1.mfcc, features2.mfcc);
  const chromaDistance = euclideanDistance(features1.chroma, features2.chroma);
  const zcr = euclideanDistance(features1.zcr, features2.zcr);

  return {
    mfccDistance,
    chromaDistance,
    zcr,
  };
};

// Function to compute Stent Weighted Audio Similarity with NaN handling and scaling to 0-100
const stentWeightedAudioSimilarity = (mfccDistance, chromaDistance, zcr) => {
  const weightMfcc = 0.8; // Adjust weights as needed
  const weightChroma = 0.1;
  const weightZcr = 0.1;

  // Calculate the weighted sum
  let similarityScore =
    weightMfcc * mfccDistance + weightChroma * chromaDistance + weightZcr * zcr;

  return similarityScore;
};

// Main comparison function that accepts dynamic audio URLs
const run = async (defaultAudioUrl, userAudioUrl) => {
  try {
    // Local file paths for downloaded audio files
    const audioFile1 = "audio1.wav"; // For the default audio
    const audioFile2 = "audio2.wav"; // For the user-uploaded audio

    // Download the audio files locally
    await downloadAudio(defaultAudioUrl, audioFile1);
    await downloadAudio(userAudioUrl, audioFile2);

    // Extract audio features from both files
    const features1 = await extractAudioFeatures(audioFile1); // Default audio
    const features2 = await extractAudioFeatures(audioFile2); // User audio

    // Compare the extracted audio features
    const audioComparison = compareAudioFeatures(features1, features2);
    console.log("Audio Feature Comparison:", audioComparison);

    // Compute Stent Weighted Audio Similarity
    const weightedSimilarity = stentWeightedAudioSimilarity(
      audioComparison.mfccDistance,
      audioComparison.chromaDistance,
      audioComparison.zcr
    );

    console.log("Mfcc Distance:", audioComparison.mfccDistance);
    console.log("Stent Weighted Audio Similarity:", weightedSimilarity);

    // Return the comparison results
    return {
      audioComparison,
      weightedSimilarity,
    };
  } catch (error) {
    console.error("Error during audio comparison:", error.message);
    throw error; // Ensure errors are caught and handled
  }
};

const runComparisonAndSaveResult = async (
  UserInputId,
  ActivityCode,
  LRN,
  Section,
  Type,
  fileUrls,
  defaultAudios
) => {
  try {
    const comparisonResults = [];
    let totalScore = 0;

    for (let i = 0; i < defaultAudios.length; i++) {
      const userAudioUrl = fileUrls[`AudioURL${i + 1}`];
      const defaultAudioUrl = defaultAudios[i];

      // Run the comparison using the main comparison function
      const result = await run(defaultAudioUrl, userAudioUrl);

      // Calculate the score based on stentWeightedSimilarity being >= 80
      if (result.weightedSimilarity >= 25) {
        totalScore += 1; // Increment the score
      }

      // Save the detailed result for each audio comparison
      comparisonResults.push({
        ItemCode: `Itemcode${i + 1}`,
        mfccDistance: result.audioComparison.mfccDistance,
        chromaDistance: result.audioComparison.chromaDistance,
        zcr: result.audioComparison.zcr,
        stentWeightedSimilarity: result.weightedSimilarity,
      });
    }

    // Save the comparison results in the database
    await CompareModel.create({
      UserInputId,
      ActivityCode,
      LRN,
      Section,
      Type,
      Results: comparisonResults,
    });

    // Return the total score
    return totalScore;
  } catch (error) {
    console.error("Error during audio comparison:", error);
    throw error;
  }
};

module.exports = {
  runComparisonAndSaveResult,
};