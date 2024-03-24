const { rmdir } = require("node:fs");
const ImageHelper = require("./image");
const {mkdir } = require('node:fs/promises');
const fs = require('node:fs/promises');

class FileHelper extends ImageHelper {


    /**
     * 
     * @param {*} file File: Object 
     * @param {*} filePath FilePath: String Relative Path to store the File
     */
    static async storeFileAsync(file, filePath) {

        // Create Directory if not empty
        await mkdir(filePath, {recursive: true})

        await fs.writeFile(`${filePath}/${file.originalname}`, file.buffer);
    }

    
    /**
     * 
     * @param {*} filePath FilePath: String Relative Path to store the File
     */
    static async deleteDir(filePath) {

        const rmOptions = {
            force: true,
            recursive: true,
        }

        await fs.rm(filePath, rmOptions)
    }
}

module.exports = FileHelper;
