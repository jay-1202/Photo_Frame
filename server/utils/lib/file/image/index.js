const ImageValidator = require("./image.validator");
const CloudinaryConfig = require("../../../../config/cloudinary.config");
const Cloudinary = require("cloudinary").v2;

class ImageHelper extends ImageValidator {
  tempPath = "./public/temp/";

  /**
   *
   * @param {*} file File: Object want to upload
   * @return Error or Image Tag
   */
  static async imageUpload(file) {
  
    Cloudinary.config({
      cloud_name: CloudinaryConfig.cloudName,
      api_key: CloudinaryConfig.apiKey,
      api_secret: CloudinaryConfig.apiSecret,
    });

    const UploadApiOptions = {
      faces: true,
    };

    const res = await Cloudinary.uploader.upload(
      `./public/temp/${file.originalname}`,
      UploadApiOptions
    );

    const test = await Cloudinary.image(res.public_id, {
      transformation: [
        { width: 500, height: 500, gravity: "faces", crop: "thumb" },
        {overlay: CloudinaryConfig.backgroundImagePublicUrl}
      ],
    });

    return test;
  }
}

module.exports = ImageHelper;
