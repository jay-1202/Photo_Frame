const express = require("express");
const router = express.Router();
const FileHelper = require('../utils/lib/file/index');
const multer = require("multer");
const upload = multer();

class ImageRoute {
  static async processImage(req, res) {
    const profilePicture = req.file;
    try {

      const tempPath = './public/temp'

        
        // Check if the File passed is valid Image.
        if(!FileHelper.validImageType(profilePicture))
            return res.status(400).send({ messsage: "Image is not valid" });

        // Store Image to temp path
        await FileHelper.storeFileAsync(profilePicture, tempPath);
        
        const fileUpload = await FileHelper.imageUpload(profilePicture);

        await FileHelper.deleteDir(`${tempPath}/${profilePicture.originalname}`);

        res.send(fileUpload);
    } catch (err) {
      console.error(err);

      await FileHelper.deleteDir(`${tempPath}/${profilePicture.originalname}`);

      res.status(500).send({ messsage: "Internal Server Error" });
    }
  }
}

router.post("/", upload.single("profilePicture"), ImageRoute.processImage);

module.exports = router;
