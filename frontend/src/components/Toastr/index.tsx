import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { RESPONSE_MESSAGES } from "../../constants/common";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface IToastrProps {
  isOpen: boolean;
  message?: string;
  status: "success" | "info" | "warning" | "error";
  setIsOpen: (isOpen: boolean) => void;
}

export const Toastr: React.FC<IToastrProps> = ({
  status,
  isOpen,
  setIsOpen,
  message,
}) => {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setIsOpen(false);
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={status} sx={{ width: "100%" }}>
        {message || RESPONSE_MESSAGES[status]}
      </Alert>
    </Snackbar>
  );
};
