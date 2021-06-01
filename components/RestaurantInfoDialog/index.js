import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  DialogTitle,
  Slide,
  OutlinedInput,
  Grid,
} from "@material-ui/core";
import React from "react";

import { Icon, InlineIcon } from "@iconify/react";
import emailLine from "@iconify/icons-clarity/email-line";
import bxPhoneCall from "@iconify/icons-bx/bx-phone-call";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RestaurantInfoDialog({ open, handleClose, contractID, email }) {
  return (
    <div>
      <Dialog
        open={open}
        maxWidth="xs"
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          style={{ textAlign: "center" }}
        >
          Thông tin liên hệ
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column">
            <Grid container spacing={1} alignItems="flex-end" justify="center">
              <Grid item>
                <InlineIcon
                  icon={emailLine}
                  style={{ fontSize: "24px" }}
                ></InlineIcon>
              </Grid>
              <Grid item>
                <TextField fullWidth defaultValue={email} readOnly />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end" justify="center">
              <Grid item>
                <InlineIcon
                  icon={bxPhoneCall}
                  style={{ fontSize: "24px" }}
                ></InlineIcon>
              </Grid>
              <Grid item>
                <TextField fullWidth defaultValue={contractID} readOnly />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default RestaurantInfoDialog;
