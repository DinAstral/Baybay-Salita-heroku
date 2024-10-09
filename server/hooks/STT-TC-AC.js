const axios = require("axios");
const Meyda = require("meyda");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const wav = require("wav-decoder");
const CompareModel = require("../models/ComparisonResult");

const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY; // Replace with your AssemblyAI API key

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
              const features = Meyda.extract(["mfcc", "chroma", "zcr"], chunk);

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

// Function to perform Speech-to-Text conversion using AssemblyAI
const transcribeAudioWithAssemblyAI = async (audioPath) => {
  const audioFile = fs.readFileSync(audioPath);

  // Upload the audio file to AssemblyAI
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

  // Request transcription
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
      language_code: "tl", // Filipino language code
    },
  });

  const transcriptId = transcriptionResponse.data.id;

  // Wait for the transcription to complete
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

    // Poll every 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  return transcriptionResult;
};

// Function to compare the transcriptions
const compareTranscriptions = (text1, text2) => {
  return text1.trim().toLowerCase() === text2.trim().toLowerCase();
};

// Function to compute Stent Weighted Audio Similarity with NaN handling and scaling to 0-100
const stentWeightedAudioSimilarity = (mfccDistance, chromaDistance, zcr) => {
  const weightMfcc = 0.5; // Adjust weights as needed
  const weightChroma = 0.3;
  const weightZcr = 0.2;

  // Calculate the weighted sum
  let similarityScore =
    weightMfcc * mfccDistance + weightChroma * chromaDistance + weightZcr * zcr;

  return similarityScore;
};

// Function to compare audio features
const compareAudioFeatures = (features1, features2) => {
  const mfccDistance = calculateEuclideanDistance(
    features1.mfcc,
    features2.mfcc
  );
  const chromaDistance = calculateEuclideanDistance(
    features1.chroma,
    features2.chroma
  );
  const zcrDifference = Math.abs(features1.zcr[0] - features2.zcr[0]);

  return {
    mfccDistance,
    chromaDistance,
    zcr: zcrDifference,
  };
};

// Helper function to calculate Euclidean distance between two arrays
const calculateEuclideanDistance = (arr1, arr2) => {
  if (!arr1 || !arr2 || arr1.length !== arr2.length) return 0;
  return Math.sqrt(
    arr1.reduce((sum, val, i) => sum + Math.pow(val - arr2[i], 2), 0)
  );
};

// Helper function to validate URL
const isValidUrl = (url) => {
  try {
    new URL(url); // This will throw if the URL is invalid
    return true;
  } catch (_) {
    return false;
  }
};

// Main comparison function that accepts dynamic audio URLs
const run = async (defaultAudioUrl, userAudioUrl) => {
  try {
    // Validate the URLs before proceeding
    if (!isValidUrl(defaultAudioUrl)) {
      throw new Error(`Invalid URL for default audio: ${defaultAudioUrl}`);
    }
    if (!isValidUrl(userAudioUrl)) {
      throw new Error(`Invalid URL for user audio: ${userAudioUrl}`);
    }

    const audioFile1 = "audio1.wav"; // Default audio
    const audioFile2 = "audio2.wav"; // User-uploaded audio

    // Download the audio files
    await downloadAudio(defaultAudioUrl, audioFile1);
    await downloadAudio(userAudioUrl, audioFile2);

    // Perform transcription for both audios
    const transcription1 = await transcribeAudioWithAssemblyAI(audioFile1);
    const transcription2 = await transcribeAudioWithAssemblyAI(audioFile2);

    // Compare transcriptions
    if (!compareTranscriptions(transcription1, transcription2)) {
      console.log("Text doesn't match, score is 0");
      return { score: 0 };
    }

    // Extract audio features
    const features1 = await extractAudioFeatures(audioFile1);
    const features2 = await extractAudioFeatures(audioFile2);

    // Compare the extracted features
    const audioComparison = compareAudioFeatures(features1, features2);

    // Compute the Stent Weighted Audio Similarity
    const weightedSimilarity = stentWeightedAudioSimilarity(
      audioComparison.mfccDistance,
      audioComparison.chromaDistance,
      audioComparison.zcr
    );

    console.log("Mfcc Distance:", audioComparison.mfccDistance);
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

// Function to compare and save the result
const runComparisonAndSaveResult = async (
  UserInputId,
  ActivityCode,
  LRN,
  Section,
  Type,
  fileUrls,
  defaultAudios,
  similarityThreshold = 20 // Add a default threshold
) => {
  try {
    // Ensure both URLs are passed correctly
    if (!fileUrls || !fileUrls[0] || !defaultAudios || !defaultAudios[0]) {
      throw new Error("Missing audio URLs for comparison");
    }

    // Compare both audios
    const { weightedSimilarity } = await run(fileUrls[0], defaultAudios[0]);

    // Create a result object and save it
    const result = new CompareModel({
      userInputId: UserInputId,
      activityCode: ActivityCode,
      LRN: LRN,
      section: Section,
      type: Type,
      weightedSimilarity: weightedSimilarity,
    });

    await result.save();

    console.log("Comparison result saved successfully!");
    return result;
  } catch (error) {
    console.error(
      "Error during the comparison and saving process:",
      error.message
    );
    throw error;
  }
};

module.exports = { runComparisonAndSaveResult };
