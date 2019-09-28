import React, { FC } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { Typography } from "@material-ui/core";

interface IViewProps {
  open: boolean;
  title: string;
  onSubmit: () => void;
  onCancel: () => void;
  children: any;
  isBusy?: boolean;
}

const DialogTitle = (props: any) => {
  const { children } = props;
  return (
    <MuiDialogTitle disableTypography className="d-flex">
      <Typography variant="h6" className="flex-fill">
        {children}
      </Typography>
    </MuiDialogTitle>
  );
};

const FormDialog: FC<IViewProps> = (props: IViewProps) => {
  const { open, onCancel, children, title, isBusy, onSubmit } = props;

  return (
    <Dialog disableBackdropClick disableEscapeKeyDown open={open} style={{ pointerEvents: isBusy ? "none" : "auto" }}>
      <DialogTitle>
        <span className="flex-fill"> {title}</span>
        <LinearProgress color="secondary" hidden={!isBusy} />
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default FormDialog;
