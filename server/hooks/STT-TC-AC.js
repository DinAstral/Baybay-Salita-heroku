const axios = require("axios");
const Meyda = require("meyda");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const wav = require("wav-decoder");
const Pitchfinder = require("pitchfinder"); // Import Pitchfinder for pitch detection
const mongoose = require("mongoose");
const CompareModel = require("../models/ComparisonResult");

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

// Function to detect if audio contains significant sound/voice based on ZCR and energy
const detectSilentOrLowVoiceAudio = (features) => {
  const zcrThreshold = 10.0;
  const energyThreshold = 0.03;

  const avgZCR = features.zcr.reduce((a, b) => a + b, 0) / features.zcr.length;
  const avgEnergy = features.energy ? features.energy : 0;

  console.log("Voice Detection - Average ZCR:", avgZCR);
  console.log("Voice Detection - Average Energy:", avgEnergy);

  return avgZCR < zcrThreshold && avgEnergy < energyThreshold;
};

// Function to extract audio features using Meyda
const extractAudioFeatures = async (audioPath) => {
  return new Promise((resolve, reject) => {
    const tempOutput = `temp_${audioPath}`;

    deleteFileIfExists(tempOutput);

    ffmpeg(audioPath)
      .toFormat("wav")
      .on("end", async () => {
        fs.readFile(tempOutput, async (err, data) => {
          if (err) {
            reject(err);
            return;
          }

          try {
            const audioData = await wav.decode(data);
            const channelData = audioData.channelData[0];
            const bufferSize = 512;
            const audioChunks = chunkArray(channelData, bufferSize);

            const detectPitch = Pitchfinder.YIN({
              sampleRate: audioData.sampleRate,
            });
            let sumFeatures = { mfcc: [], chroma: [], zcr: [], pitch: [] };

            audioChunks.forEach((chunk) => {
              const features = Meyda.extract(["mfcc", "chroma", "zcr"], chunk);

              if (features) {
                sumFeatures.mfcc.push(features.mfcc);
                sumFeatures.chroma.push(features.chroma);
                sumFeatures.zcr.push(features.zcr);
              }

              const pitch = detectPitch(chunk);
              if (pitch) sumFeatures.pitch.push(pitch);
            });

            const avgFeatures = {};
            Object.keys(sumFeatures).forEach((key) => {
              avgFeatures[key] =
                sumFeatures[key].reduce(
                  (acc, val) =>
                    acc +
                    (Array.isArray(val) ? val.reduce((a, b) => a + b, 0) : val),
                  0
                ) / sumFeatures[key].length;
            });

            resolve(avgFeatures);
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
  const euclideanDistance = (vector1, vector2) => {
    return Math.sqrt(
      vector1.reduce(
        (acc, val, idx) => acc + Math.pow(val - vector2[idx], 2),
        0
      )
    );
  };

  const mfccDistance = euclideanDistance(features1.mfcc, features2.mfcc);
  const chromaDistance = euclideanDistance(features1.chroma, features2.chroma);
  const zcr = Math.abs(features1.zcr - features2.zcr);
  const pitchDifference = Math.abs(features1.pitch - features2.pitch); // Pitch difference added

  return { mfccDistance, chromaDistance, zcr, pitchDifference };
};

// Function to compute Weighted Audio Similarity with pitch added
const stentWeightedAudioSimilarity = (
  mfccDistance,
  chromaDistance,
  zcr,
  pitchDifference
) => {
  const weightMfcc = 0.4;
  const weightChroma = 0.3;
  const weightZcr = 0.15;
  const weightPitch = 0.15; // Add weight for pitch difference

  const similarityScore =
    weightMfcc * mfccDistance +
    weightChroma * chromaDistance +
    weightZcr * zcr +
    weightPitch * pitchDifference;

  return similarityScore;
};

// Main comparison function that accepts dynamic audio URLs
const run = async (defaultAudioUrl, userAudioUrl) => {
  try {
    const audioFile1 = "audio1.wav";
    const audioFile2 = "audio2.wav";
    const noiseSuppressedAudio = "noise_suppressed_audio.wav";

    await downloadAudio(defaultAudioUrl, audioFile1);
    await downloadAudio(userAudioUrl, audioFile2);

    await new Promise((resolve, reject) => {
      ffmpeg(audioFile2)
        .output(noiseSuppressedAudio)
        .audioFilters("afftdn=nf=-25")
        .on("end", resolve)
        .on("error", reject)
        .run();
    });

    const features1 = await extractAudioFeatures(audioFile1);
    const features2 = await extractAudioFeatures(noiseSuppressedAudio);

    deleteFileIfExists(audioFile2);
    deleteFileIfExists(noiseSuppressedAudio);

    if (detectSilentOrLowVoiceAudio(features2)) {
      return {
        audioComparison: {
          mfccDistance: Infinity,
          chromaDistance: Infinity,
          zcr: Infinity,
          pitchDifference: Infinity,
        },
        weightedSimilarity: 100,
      };
    }

    const audioComparison = compareAudioFeatures(features1, features2);

    const weightedSimilarity = stentWeightedAudioSimilarity(
      audioComparison.mfccDistance,
      audioComparison.chromaDistance,
      audioComparison.zcr,
      audioComparison.pitchDifference
    );

    return { audioComparison, weightedSimilarity };
  } catch (error) {
    console.error("Error during audio comparison:", error.message);
    throw error;
  }
};

// Main function to execute multiple comparisons and save results
const runComparisonAndSaveResult = async (
  UserInputId,
  ActivityCode,
  LRN,
  Section,
  Type,
  fileUrls,
  defaultAudios,
  similarityThreshold = 25
) => {
  try {
    const comparisonResults = [];
    let totalScore = 0;

    for (let i = 0; i < defaultAudios.length; i++) {
      const userAudioUrl = fileUrls[`AudioURL${i + 1}`];
      const defaultAudioUrl = defaultAudios[i];

      const result = await run(defaultAudioUrl, userAudioUrl);

      const isCorrect = result.weightedSimilarity <= similarityThreshold;
      if (isCorrect) {
        totalScore += 1;
      }

      comparisonResults.push({
        ItemCode: `Itemcode${i + 1}`,
        mfccDistance: result.audioComparison.mfccDistance,
        chromaDistance: result.audioComparison.chromaDistance,
        zcr: result.audioComparison.zcr,
        pitchDifference: result.audioComparison.pitchDifference,
        stentWeightedSimilarity: result.weightedSimilarity,
        Remarks: isCorrect ? "Correct" : "Incorrect",
      });
    }

    await CompareModel.create({
      UserInputId,
      ActivityCode,
      LRN,
      Section,
      Type,
      Results: comparisonResults,
    });

    return { score: totalScore, resultsWithRemarks: comparisonResults };
  } catch (error) {
    console.error("Error during audio comparison:", error);
    throw error;
  }
};

module.exports = {
  runComparisonAndSaveResult,
};
