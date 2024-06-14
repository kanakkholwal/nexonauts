import axios from "axios";

export const handleFiles = async (files: File[]) => {
  return new Promise(async (resolve, reject) => {
    const formData = new FormData();
    const CLOUDINARY_UPLOAD_PRESET =
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!CLOUDINARY_UPLOAD_PRESET) {
      reject("Cloudinary Upload Preset not found");
      return;
    }
    const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!CLOUDINARY_CLOUD_NAME) {
      reject("Cloudinary Cloud Name not found");
      return;
    }
    if (files.length === 0) {
      reject("No file selected");
      return;
    }
    if (files[0].size > 10000000) {
      reject("File size should be less than 10MB");
      return;
    }

    formData.append("file", files[0]);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "nexomart");

    // upload image to cloudinary and get url
    await axios(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        data: formData,
      }
    )
      .then((res) => {
        const file = res.data;
        resolve(file);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
