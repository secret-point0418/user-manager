import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IConfirmModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (id: string) => void;
}

export const ConfirmModal: React.FC<IConfirmModal> = ({
  isOpen,
  setIsOpen,
  onConfirm,
}) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{" Are you sure you want to delete this user?"}</DialogTitle>

      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={() => onConfirm("DF")}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
};
