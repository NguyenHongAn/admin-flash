import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  OutlinedInput,
} from "@material-ui/core";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RestaurantInfoDialog({ open, handleClose, contractID, email }) {
  return (
    <div>
      {" "}
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
          <DialogContentText style={{ textAlign: "center" }}>
            {" "}
            Số điện thoại
          </DialogContentText>
          <OutlinedInput
            variant="outlined"
            value={contractID}
            fullWidth
            readOnly
          ></OutlinedInput>
          <DialogContentText style={{ textAlign: "center" }}>
            {" "}
            Email
          </DialogContentText>
          <OutlinedInput
            variant="outlined"
            value={email}
            fullWidth
            readOnly
          ></OutlinedInput>
        </DialogContent>
        {/* <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            style={{ width: 100 }}
          >
            Huỷ
          </Button>
          <Button
            variant="contained"
            //onClick={handleDeleteCategory}
            style={{ width: 100, color: "white", background: "green" }}
          >
            Xoá
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
export default RestaurantInfoDialog;
