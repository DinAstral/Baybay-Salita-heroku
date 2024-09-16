const cloudinary = require("cloudinary").v2;

const cloudinaryUploader = async (req, res) => {
  const { files } = req;
  const imageFile = files["Image"] ? files["Image"][0] : null;
  const audioFile = files["Audio"] ? files["Audio"][0] : null;

  if (!imageFile || !audioFile) {
    return res.json({ error: "File not found" });
  }

  try {
    const uploadImage = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
      public_id: `image/${imageFile.filename}`,
      folder: "images",
    });

    const uploadAudio = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "auto",
      public_id: `audio/${audioFile.filename}`,
      folder: "default_audio",
    });

    return { uploadImage, uploadAudio };
  } catch (error) {
    console.log(error);
    throw new Error("Cloudinary upload failed");
  }
};

const cloudinaryUploaderUser = async (req, res) => {
  const { files } = req;
  const audioFiles = {
    User1: files["User1"] ? files["User1"][0] : null,
    User2: files["User2"] ? files["User2"][0] : null,
    User3: files["User3"] ? files["User3"][0] : null,
    User4: files["User4"] ? files["User4"][0] : null,
    User5: files["User5"] ? files["User5"][0] : null,
  };

  // Check if at least one file exists
  const fileKeys = Object.keys(audioFiles);
  const allFiles = fileKeys.every((key) => audioFiles[key]);
  if (!allFiles) {
    return res.json({ error: "One or more files are missing" });
  }

  try {
    const uploadPromises = fileKeys.map((key) =>
      cloudinary.uploader.upload(audioFiles[key].path, {
        resource_type: "auto",
        public_id: `audioUser/${audioFiles[key].filename}`,
        folder: "user_audio",
      })
    );

    const [
      uploadAudioUser1,
      uploadAudioUser2,
      uploadAudioUser3,
      uploadAudioUser4,
      uploadAudioUser5,
    ] = await Promise.all(uploadPromises);

    return {
      uploadAudioUser1,
      uploadAudioUser2,
      uploadAudioUser3,
      uploadAudioUser4,
      uploadAudioUser5,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Cloudinary upload failed");
  }
};

/*const url = cloudinary.url("", {
  transformation: [
    {
      fetch_format: "auto",
    },
    {
      quality: "auto",
    },
  ],
});

(async function () {
  try {
    const results = await cloudinary.uploader.upload("");
    console.log(results);
    const url = cloudinary.url(results.public_id, {
      transformation: [
        {
          fetch_format: "auto",
          quality: "auto",
        },
        {
          width: "1200",
          height: "1200",
          crop: "fill",
          gravity: "auto",
        },
      ],
    });
    console.log(url);
  } catch (error) {
    console.error("Error uploading image:", error);
  }
})();*/

module.exports = {
  cloudinaryUploader,
  cloudinaryUploaderUser,
};
