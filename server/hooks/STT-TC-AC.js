const axios = require("axios");
const Meyda = require("meyda");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const wav = require("wav-decoder");
const mongoose = require("mongoose");
const CompareModel = require("../models/ComparisonResult");

const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;

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

// Function to extract audio features using Meyda
const extractAudioFeatures = async (audioPath) => {
  return new Promise((resolve, reject) => {
    const tempOutput = `${audioPath.replace(/\.wav$/, "")}_temp.wav`;

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

            const totalChunks = audioChunks.length;
            const sumFeatures = audioChunks.reduce((acc, chunk, index) => {
              const features = Meyda.extract(["mfcc", "chroma", "zcr"], chunk);

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

// Function to perform Speech-to-Text conversion using AssemblyAI
const transcribeAudioWithAssemblyAI = async (audioPath) => {
  const audioFile = fs.readFileSync(audioPath);

  const uploadResponse = await axios({
    method: "POST",
    url: "https://api.assemblyai.com/v2/upload",
    headers: {
      authorization: ASSEMBLYAI_API_KEY,
      "content-type": "application/octet-stream",
    },
    data: audioFile,
  });

  const uploadUrl = uploadResponse.data.upload_url;

  const transcriptionResponse = await axios({
    method: "POST",
    url: "https://api.assemblyai.com/v2/transcript",
    headers: {
      authorization: ASSEMBLYAI_API_KEY,
      "content-type": "application/json",
    },
    data: {
      audio_url: uploadUrl,
      speech_model: "nano",
      language_code: "tl",
    },
  });

  const transcriptId = transcriptionResponse.data.id;

  let transcriptionResult = null;
  while (true) {
    const statusResponse = await axios({
      method: "GET",
      url: `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
      headers: {
        authorization: ASSEMBLYAI_API_KEY,
      },
    });

    if (statusResponse.data.status === "completed") {
      transcriptionResult = statusResponse.data.text;
      break;
    } else if (statusResponse.data.status === "failed") {
      throw new Error("Transcription failed.");
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  return transcriptionResult;
};

// Function to compare audio features
const compareAudioFeatures = (features1, features2) => {
  const calculateDistance = (f1, f2) => {
    return f1.reduce((acc, value, i) => acc + Math.abs(value - f2[i]), 0);
  };

  return {
    mfccDistance: calculateDistance(features1.mfcc, features2.mfcc),
    chromaDistance: calculateDistance(features1.chroma, features2.chroma),
    zcr: Math.abs(features1.zcr[0] - features2.zcr[0]),
  };
};

// Function to compute similarity
const stentWeightedAudioSimilarity = (mfccDistance, chromaDistance, zcr) => {
  const weightMfcc = 0.5;
  const weightChroma = 0.3;
  const weightZcr = 0.2;

  return (
    weightMfcc * mfccDistance + weightChroma * chromaDistance + weightZcr * zcr
  );
};

// Main comparison function
const run = async (defaultAudioUrl, userAudioUrl) => {
  try {
    const audioFile1 = "audio1.wav";
    const audioFile2 = "audio2.wav";

    await downloadAudio(defaultAudioUrl, audioFile1);
    await downloadAudio(userAudioUrl, audioFile2);

    const transcription1 = await transcribeAudioWithAssemblyAI(audioFile1);
    const transcription2 = await transcribeAudioWithAssemblyAI(audioFile2);

    if (!compareTranscriptions(transcription1, transcription2)) {
      return { score: 0 };
    }

    const features1 = await extractAudioFeatures(audioFile1);
    const features2 = await extractAudioFeatures(audioFile2);

    const audioComparison = compareAudioFeatures(features1, features2);

    const weightedSimilarity = stentWeightedAudioSimilarity(
      audioComparison.mfccDistance,
      audioComparison.chromaDistance,
      audioComparison.zcr
    );

    return {
      audioComparison,
      weightedSimilarity,
    };
  } catch (error) {
    console.error("Error during audio comparison:", error.message);
    throw error;
  }
};

// Save comparison result
const runComparisonAndSaveResult = async (
  UserInputId,
  ActivityCode,
  LRN,
  Section,
  Type,
  fileUrls,
  defaultAudios,
  similarityThreshold = 20
) => {
  try {
    const comparisonResults = [];
    let totalScore = 0;

    for (let i = 0; i < defaultAudios.length; i++) {
      const userAudioUrl = fileUrls[`AudioURL${i + 1}`];
      const defaultAudioUrl = defaultAudios[i];

      const result = await run(defaultAudioUrl, userAudioUrl);

      if (result.score === 0) {
        console.log(`Text didn't match for Audio ${i + 1}. Score: 0`);
      } else if (result.weightedSimilarity <= similarityThreshold) {
        totalScore += 1;
      }

      comparisonResults.push({
        ItemCode: `Itemcode${i + 1}`,
        mfccDistance: result.audioComparison.mfccDistance,
        chromaDistance: result.audioComparison.chromaDistance,
        zcr: result.audioComparison.zcr,
        stentWeightedSimilarity: result.weightedSimilarity,
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

    return totalScore;
  } catch (error) {
    console.error("Error during audio comparison:", error);
    throw error;
  }
};

module.exports = {
  runComparisonAndSaveResult,
};
