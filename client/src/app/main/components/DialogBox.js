import React from "react";
import { makeStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Close";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from "@material-ui/core";

import styles from "app/styles/components/DialogBox";

const useStyles = makeStyles(styles);

const DialogBox = props => {
  const classes = useStyles(props);
  const { handleDialogClose, open, onClose, maxWidth } = props;

  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth || "sm"}
      open={open}
      onClose={handleDialogClose || onClose}
      aria-labelledby="responsive-dialog-title"
    >
      {props.title && (
        <DialogTitle
          id="responsive-dialog-title"
          classes={{
            root: classes.title
          }}
        >
          {props.title}{" "}
          <IconButton
            aria-label="Close"
            className={classes.closeButton}
            onClick={handleDialogClose || onClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent
        dividers
        classes={{
          root: classes.content
        }}
      >
        {props.children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
