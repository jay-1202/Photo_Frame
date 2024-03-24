class ImageValidator {
    /**
     *
     * @param file File Object that take the File
     * @returns true if the file is valid Image type or else return false
     */
    static validImageType(file) {
      return file.mimetype.includes("image");
    }
  }
  
  module.exports = ImageValidator;
  