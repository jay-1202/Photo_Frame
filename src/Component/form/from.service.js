import axios from "axios";
import ServerConfig from "../../config/server.config";

export default class FormService {
  /**
   * Method For submitting a form
   * @param file file: File
   */
  static async handleFormSubmitAsync(file) {
    // if file is null/ undefined
    if (!file) {
      return 'Select File';
    }

    const formData = new FormData();
    formData.append("profilePicture", file);

    const axiosRequestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return await axios.post(
      ServerConfig.baseServerUrl + ServerConfig.imagePath,
      formData,
      axiosRequestConfig
    );
  }
}
