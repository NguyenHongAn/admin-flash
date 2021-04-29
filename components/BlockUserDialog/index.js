import React from "react";
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
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function BlockUserDialog({ open, info, handleClose }) {
  return (
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
        Khóa tài khoản người dùng{" "}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{`Khóa tài khoản: ${info}`}</DialogContentText>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-age-native-simple">
            Nguyên do
          </InputLabel>
          <Select
            //onChange={handleChange}
            // defaultValue={-1}
            label="Nguyên do"
            inputProps={{
              name: "Nguyên do",
              id: "outlined-age-native-simple",
            }}
          >
            <option aria-label="None" value="-1" />
            <option value={10}>Thích</option>
            <option value={20}>Do định mệnh nó thế</option>
            <option value={30}>Đoán xem</option>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions style={{ padding: "8px 24px!important" }}>
        <Button
          variant="contained"
          onClick={handleClose}
          style={{ width: 100 }}
        >
          Huỷ
        </Button>
        <Button
          variant="contained"
          style={{ width: 100, color: "white", background: "red" }}
        >
          Khóa
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default BlockUserDialog;
