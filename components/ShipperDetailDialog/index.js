import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Slide,
  DialogActions,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import Button from "../../components/CustomButtons/Button";
import Rating from "../../components/RatingStar";
//styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/components/profileDetail";
import ToastAction from "../../store/actions/toast.A";
import { useDispatch } from "react-redux";
import ErrorCollection from "../../config";
import Service from "./services";
import {
  getAccountStatus,
  getReceiptStatus,
  getGender,
} from "../../utils/getStatus";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(styles);

function ShipperDetailDialog({ id, handleClose, open, shipper }) {
  const classes = useStyles();
  const [orderID, setOrderID] = useState("");

  const dispatch = useDispatch();
  //console.log(shipper);
  const handleBoomOrder = async () => {
    try {
      const { errorCode, data } = await Service.handleBoomOrder(
        orderID,
        shipper._id
      );
      if (errorCode === 0) {
        console.log(data);
      } else {
        dispatch(
          ToastAction.displayInfo("error", ErrorCollection.EXECUTION[errorCode])
        );
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        router.push("/");
      }
      error.response
        ? dispatch(
            ToastAction.displayInfo(
              "error",
              ErrorCollection.SERVER[error.response.status]
            )
          )
        : null;
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="md"
      fullWidth
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle align="center">Thông tin tài xế</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item container justify="center" alignItems="flex-start" md={4}>
            <Grid item md={8}>
              <img
                src={shipper.avatar}
                alt="avatar"
                className={classes.avatar}
              ></img>
            </Grid>

            <Grid item className={classes.textCenter} component="div" md={12}>
              {shipper.fullname}
            </Grid>
            <Grid
              item
              className={classes.textCenter}
              component={Rating}
              value={parseInt(shipper.rating)}
            ></Grid>
          </Grid>
          <Grid item container md={8} spacing={1}>
            <Grid item md={6}>
              <div className={classes.title}>Email: </div>
              <span>{shipper.email}</span>
            </Grid>

            <Grid item md={6}>
              <div className={classes.title}>Giới tính: </div>
              <span>{getGender(shipper.gender)}</span>
            </Grid>

            <Grid item md={6}>
              <div className={classes.title}>Phone: </div>
              <span>{shipper.phone}</span>
            </Grid>
            <Grid item md={6}>
              <div className={classes.title}>Trạng thái: </div>
              <span>{getAccountStatus(shipper.status)}</span>
            </Grid>

            <Grid item md={6}>
              <div className={classes.title}>Tình trạng phi: </div>
              <span>{getReceiptStatus(shipper.serviceCharge)}</span>
            </Grid>
            <Grid item md={6}>
              <div className={classes.title}>Phí dịch vụ: </div>
              <span>{shipper.serviceFee}</span>
            </Grid>
            <Grid item md={6}>
              <div className={classes.title}>Ví điện tử: </div>
              <span>{shipper.wallet}</span>
            </Grid>
            <Grid item md={12}>
              <div className={classes.title}>Lịch sử đơn hàng: </div>
              <div className={classes.history}>
                <div>
                  Thành công: {shipper.history && shipper.history.Delivery}
                </div>
                <div>Bỏ qua: {shipper.history && shipper.history.Skip}</div>
                <div>Bị hủy: {shipper.history && shipper.history.Cancel}</div>
              </div>
            </Grid>
            <Grid item md={12}>
              <div className={classes.title}>Đơn hàng bị bom: </div>
            </Grid>
            <Grid
              container
              spacing={2}
              alignItems="center"
              item
              md={12}
              component="form"
              onSubmit={handleBoomOrder}
            >
              <Grid
                item
                md={8}
                component={TextField}
                fullWidth
                variant="outlined"
                placeholder="Id đơn hàng bị boom"
                id="orderID"
                name="orderID"
                value={orderID}
                onChange={(e) => setOrderID(e.target.value)}
              ></Grid>
              <Grid
                item
                md={2}
                component={Button}
                type="submit"
                color="success"
              >
                Xác nhận
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.textCenter}>
        <Button
          variant="outlined"
          onClick={() => {
            handleClose(false);
          }}
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default ShipperDetailDialog;
