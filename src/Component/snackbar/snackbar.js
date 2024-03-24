import React , {useEffect, useState} from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';
import SnackBarService from "./snackbar.service";

export default function SnackbarComponent() {

    const {autoHideDuration,
        open,
        handleClose,
        innerText,
        vertical,
        horizontal,
        severity} = SnackBarService

    const [state, setState] = useState({
        autoHideDuration,
        open,
        handleClose,
        innerText,
        vertical,
        horizontal,
        severity
    })

  useEffect(() => {
    setState((prev) => {
       return {
        ...prev,
        ...SnackBarService
       }
    })
  }, [SnackBarService])

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: SnackBarService.vertical,
          horizontal: SnackBarService.horizontal,
        }}
        open={SnackBarService.open}
        autoHideDuration={SnackBarService.autoHideDuration}
        onClose={SnackBarService.handleClose}
      >
        <Alert
          onClose={SnackBarService.handleClose}
          severity={SnackBarService.severity}
          variant="filled"
          sx={{ width: "100%" }}
          >
            {SnackBarService.innerText}
        </Alert>
      </Snackbar>
    </div>
  );
}
