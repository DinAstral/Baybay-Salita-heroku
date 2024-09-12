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
  const audioUserFile = files["User"] ? files["User"][0] : null;

  if (!audioUserFile) {
    return res.json({ error: "File not found" });
  }

  try {
    const uploadAudioUser = await cloudinary.uploader.upload(
      audioUserFile.path,
      {
        resource_type: "auto",
        public_id: `audioUser/${audioUserFile.filename}`,
        folder: "user_audio",
      }
    );

    return { uploadAudioUser };
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
