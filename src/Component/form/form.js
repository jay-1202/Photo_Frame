import UploadFileIcon from "@mui/icons-material/UploadFile";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import * as htmlparser2 from "htmlparser2";
import React, { useState } from "react";
import { saveAs } from "file-saver";
import FormService from "./from.service";

export default function Form() {
  const handleClose = () => {
    setSnackBarConfig((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };

  const [networkRequest, setNetworkRequest] = useState(false);
  const [file, setFile] = useState(null);
  const [SnackbarConfig, setSnackBarConfig] = useState({
    horizontal: "center",
    vertical: "bottom",
    handleClose,
    autoHideDuration: 3 * 1000,
    open: false,
    severity: "success",
    innerText: "",
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setSnackBarConfig((prev) => {
        return {
          ...prev,
          severity: "error",
          open: true,
          innerText: "Select a File",
        };
      });

      return;
    }

    setNetworkRequest(true);
    
    const parser = new htmlparser2.Parser({
      onopentag(name, attributes) {
        if (attributes.src) {
          saveAs(attributes.src, "download.jpg");
        }
      },
    });

    await FormService.handleFormSubmitAsync(file)
      .then((response) => {
        setSnackBarConfig((prev) => {
          return {
            ...prev,
            severity: "success",
            open: true,
            innerText: "Converted successfully",
          };
        });

        parser.write(response.data);
      })
      .catch((err) => {
        const { response } = err;

        if (response.status === 400) {
          setSnackBarConfig((prev) => {
            return {
              ...prev,
              severity: "error",
              open: true,
              innerText: response.data.messsage,
            };
          });

          return;
        }

        setSnackBarConfig((prev) => {
          return {
            ...prev,
            severity: "error",
            open: true,
            innerText: "Something went wrong",
          };
        });
      })
      .finally(() => {
        setNetworkRequest(false);
      });
  };

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="max-w-sm bg-white rounded-lg shadow-md px-8 pt-5 pb-10 flex flex-col items-center transition duration-300 ease-in-out sm:max-w-md md:max-w-lg" // Responsive sizing based on screen size
      >
        <img
          width="250px"
          src="/frame.png"
          alt="frame_img"
          className="mx-auto mb-2 transition duration-300 ease-in-out" // Rounded image with white border, transition for hover scale
        />
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Upload Your Photo
        </h3>
        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-4 py-2 rounded-full text-blue-700 border border-dashed border-blue-500 bg-blue-100 hover:bg-blue-200 cursor-pointer transition duration-300 ease-in-out w-full justify-center" // Full-width label, centered content
        >
          <UploadFileIcon className="mr-2 text-blue-700" />
          <span>Choose File</span>
        </label>
        <div className="text-gray-500 text-sm mt-2 px-4 text-center">
          {" "}
          {/* Added padding and centered text */}
          {file ? `${file.name}` : "No file selected"}
        </div>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={(e) => handleFileChange(e)}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-red-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition duration-300 ease-in-out w-full mt-3" // Full-width button with margin-top
          disabled={networkRequest}
        >
          {networkRequest ? "Processing..." : "Create Frame"}
        </button>
      </form>

      <Snackbar
        anchorOrigin={{
          vertical: SnackbarConfig.vertical,
          horizontal: SnackbarConfig.horizontal,
        }}
        open={SnackbarConfig.open}
        autoHideDuration={1000}
        onClose={SnackbarConfig.handleClose}
        className="transition duration-300 ease-out" // Transition for Snackbar
      >
        <Alert
          onClose={SnackbarConfig.handleClose}
          severity={SnackbarConfig.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {SnackbarConfig.innerText}
        </Alert>
      </Snackbar>
    </>
  );
}
