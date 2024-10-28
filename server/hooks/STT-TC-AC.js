const axios = require("axios");
const Meyda = require("meyda");
const Pitchfinder = require("pitchfinder");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const wav = require("wav-decoder");
const mongoose = require("mongoose");
const CompareModel = require("../models/ComparisonResult");

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

const deleteFileIfExists = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

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

const detectSilentOrLowVoiceAudio = (features) => {
  const zcrThreshold = 10.0;
  const energyThreshold = 0.03;
  const avgZCR = features.zcr.reduce((a, b) => a + b, 0) / features.zcr.length;
  const avgEnergy = features.energy ? features.energy : 0;

  console.log("Voice Detection - Average ZCR:", avgZCR);
  console.log("Voice Detection - Average Energy:", avgEnergy);

  return avgZCR < zcrThreshold && avgEnergy < energyThreshold;
};

// Updated extractAudioFeatures to include pitch analysis with pitchfinder
const extractAudioFeatures = async (audioPath) => {
  return new Promise((resolve, reject) => {
    const tempOutput = `temp_${audioPath}`;
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
            const audioData = await wav.decode(data);
            const channelData = audioData.channelData[0];
            const bufferSize = 512;
            const audioChunks = chunkArray(channelData, bufferSize);

            // Initialize Pitchfinder's pitch detector
            const detectPitch = Pitchfinder.YIN();
            let totalPitch = 0;
            let pitchCount = 0;

            const sumFeatures = audioChunks.reduce((acc, chunk, index) => {
              const features = Meyda.extract(["mfcc", "chroma", "zcr"], chunk);
              const pitch = detectPitch(chunk);

              if (pitch) {
                totalPitch += pitch;
                pitchCount += 1;
              }

              if (index === 0) {
                Object.keys(features).forEach((key) => {
                  acc[key] = Array.isArray(features[key])
                    ? features[key].slice()
                    : [features[key]];
                });
              } else {
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

            // Average the MFCC, chroma, and ZCR features
            Object.keys(sumFeatures).forEach((key) => {
              sumFeatures[key] = sumFeatures[key].map(
                (val) => val / audioChunks.length
              );
            });

            // Calculate average pitch if any pitches were detected
            sumFeatures.pitch = pitchCount > 0 ? totalPitch / pitchCount : 0;

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

const compareAudioFeatures = (features1, features2) => {
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

  // Calculate pitch difference
  const pitchDifference = Math.abs(features1.pitch - features2.pitch);

  return {
    mfccDistance,
    chromaDistance,
    zcr,
    pitchDifference, // Include pitch difference
  };
};

const stentWeightedAudioSimilarity = (
  mfccDistance,
  chromaDistance,
  zcr,
  pitchDifference
) => {
  const weightMfcc = 0.4;
  const weightChroma = 0.3;
  const weightZcr = 0.1;
  const weightPitch = 0.2; // Add a weight for pitch comparison

  let similarityScore =
    weightMfcc * mfccDistance +
    weightChroma * chromaDistance +
    weightZcr * zcr +
    weightPitch * pitchDifference;

  return similarityScore;
};

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
      console.log(
        "No significant sound detected in user audio. Setting similarity score to max."
      );

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
    console.log("Audio Feature Comparison:", audioComparison);

    const weightedSimilarity = stentWeightedAudioSimilarity(
      audioComparison.mfccDistance,
      audioComparison.chromaDistance,
      audioComparison.zcr,
      audioComparison.pitchDifference
    );

    console.log("Stent Weighted Audio Similarity:", weightedSimilarity);

    return {
      audioComparison,
      weightedSimilarity,
    };
  } catch (error) {
    console.error("Error during audio comparison:", error.message);
    throw error;
  }
};

module.exports = {
  runComparisonAndSaveResult,
};
