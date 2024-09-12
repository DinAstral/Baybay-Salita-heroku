// You can remove this if you're not exporting anything

//SPEECH-TO-TEXT MODULE
/*const openai = new OpenAI({
  organization: "org-GpJdWSOHAjDNZ2G7cGgjbhSn",
  apiKey: process.env.OPENAI_API_KEY, // Make sure this is set in your environment variables
});

console.log(process.env.OPENAI_API_KEY);

const audioTry = async () => {
  try {
    const transcriptions = await openai.audio.transcriptions.create({
      file: fs.createReadStream("./uploads/DefaultAudio/Audio_Pusa.m4a"), // Ensure this path is correct
      model: "whisper-1",
    });
    console.log("Your Text:", transcriptions.text); // Log the transcription text
  } catch (error) {
    if (error.response) {
      console.error("API Response Error:", error.response);
    } else if (error.request) {
      console.error("API Request Error:", error.request);
    } else {
      console.log("Error:", error);
    }
  }
};*/
