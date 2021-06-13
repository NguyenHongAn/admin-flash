import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
  Typography,
} from "@material-ui/core";
import Toast from "../Toast";
import Service from "./services";
import ErrorCollection from "../../config";
import { useDispatch } from "react-redux";
import loadingAction from "../../store/actions/loading.A";
import ToastAction from "../../store/actions/toast.A";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function BlockUserDialog({ open, info, handleClose }) {
  const [reason, setReason] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  //const [successMsg, setSuccessMsg] = useState("");
  const dispatch = useDispatch();

  const handleBlockUserAccount = async () => {
    try {
      dispatch(loadingAction.turnOnLoading());
      const { errorCode, data } = await Service.blockUserAccount(
        info._id,
        reason
      );
      console.log(errorCode, data);
      if (errorCode === 0) {
        dispatch(
          ToastAction.displayInfo(
            "error",
            `${data.Status === 0 ? "Mở khóa" : "Khóa"} tài khoản thành công`
          )
        );
      } else {
        setErrorMsg(ErrorCollection.EXECUTION[errorCode]);
      }
      handleClose();
    } catch (error) {
      console.log(error.message);
      error.response
        ? dispatch(
            ToastAction.displayInfo(
              "error",
              ErrorCollection.SERVER[error.response.status]
            )
          )
        : null;
    }
    dispatch(loadingAction.turnOffLoading());
  };

  return (
    <>
      {/* {successMsg === "" ? null : (
        <Toast type="info" content={successMsg}></Toast>
      )} */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {`${info.status === 0 ? "Khóa" : "Mở khóa"} tài khoản`}
        </DialogTitle>
        <DialogContent>
          {errorMsg === "" ? null : (
            <Typography style={{ color: "red" }} align="left">
              {errorMsg}
            </Typography>
          )}
          <Typography>{`${info.status === 0 ? "Khóa" : "Mở khóa"} tài khoản: ${
            info.phone
          }`}</Typography>

          {info.status === 0 ? (
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Lý do"
              margin="normal"
              id="reason"
              name="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></TextField>
          ) : null}
        </DialogContent>
        <DialogActions style={{ padding: "8px 24px!important" }}>
          <Button
            style={{ width: 100 }}
            onClick={() => {
              setErrorMsg("");
              handleClose();
            }}
          >
            Huỷ
          </Button>
          <Button color="secondary" onClick={handleBlockUserAccount}>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default BlockUserDialog;
