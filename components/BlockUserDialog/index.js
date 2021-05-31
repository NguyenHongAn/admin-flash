import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  InputLabel,
  Select,
  FormControl,
  TextField,
  Typography,
} from "@material-ui/core";
import Toast from "../Toast";
import Service from "./services";
import ErrorCollection from "../../config";
import { useDispatch } from "react-redux";
import loadingAction from "../../store/actions/loading.A";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function BlockUserDialog({ open, info, handleClose }) {
  const [inputReason, setInputReason] = useState(false);
  const [reason, setReason] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const dispatch = useDispatch();

  const handleChangeReason = (e) => {
    const index = e.target.value;
    if (index === 3) {
      setInputReason(true);
    } else {
      setReason(Service.reasons[index].label);
    }
  };

  const handleBlockUserAccount = async () => {
    try {
      dispatch(loadingAction.turnOnLoading());
      const { errorCode, data } = await Service.blockUserAccount(info._id);
      console.log(data);
      if (errorCode === 0) {
        setSuccessMsg(
          `${data.Status === 0 ? "Mở khóa" : "Khóa"} tài khoản thành công`
        );
      } else {
        setErrorMsg(ErrorCollection.EXECUTION[errorCode]);
      }
      handleClose();
    } catch (error) {
      console.log(error);

      error.response
        ? setErrorMsg(ErrorCollection.SERVER[error.response.status])
        : null;
    }
    dispatch(loadingAction.turnOffLoading());
  };

  return (
    <>
      {successMsg === "" ? null : (
        <Toast type="info" content={successMsg}></Toast>
      )}
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
          <DialogContentText>{`${
            info.status === 0 ? "Khóa" : "Mở khóa"
          } tài khoản: ${info.phone}`}</DialogContentText>

          {info.status === 0 ? (
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-age-native-simple">
                Nguyên do
              </InputLabel>
              <Select
                onChange={handleChangeReason}
                defaultValue={-1}
                label="reason"
                inputProps={{
                  name: "reason",
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="-1" />
                {Service.reasons.map((option) => (
                  <option key={option} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          ) : null}

          {inputReason ? (
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
            variant="contained"
            onClick={handleClose}
            style={{ width: 100 }}
            onClick={() => {
              setErrorMsg("");
              handleClose();
            }}
          >
            Huỷ
          </Button>
          <Button
            variant="contained"
            style={{ width: 100, color: "white", background: "red" }}
            onClick={handleBlockUserAccount}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default BlockUserDialog;
