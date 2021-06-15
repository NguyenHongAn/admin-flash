import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import {
  Dialog,
  DialogContent,
  Slide,
  DialogActions,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import Button from "../../components/CustomButtons/Button";
import { InlineIcon } from "@iconify/react";
import checkCircleFill from "@iconify/icons-bi/check-circle-fill";
import checkCircleTwotone from "@iconify/icons-ant-design/check-circle-twotone";
//styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/components/reportDialogStyle";
import ToastAction from "../../store/actions/toast.A";
import { useDispatch } from "react-redux";
import ErrorCollection from "../../config";
import Service from "./service";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

SwiperCore.use([Navigation, Pagination]);
const useStyles = makeStyles(styles);

function ReportDetailDialog({ id, handleClose, open }) {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [reason, setReason] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [shipper, setShipper] = useState({});
  const [restaurant, setRestaurant] = useState({});
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(false);
  const [createdAt, setCreatedAt] = useState(null);
  const dispatch = useDispatch();

  const handleSolveComplaint = async () => {
    try {
      const { errorCode, data } = await Service.solveComplaint(id);
      console.log(errorCode, data);
      if (errorCode === 0) {
        dispatch(
          ToastAction.displayInfo("success", "Khiếu nại đã được giải quyết")
        );
      } else {
        dispatch(
          ToastAction.displayInfo(
            "error",
            ErrorCollection.EXECUTION[error.response.status]
          )
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
    handleClose();
  };

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { errorCode, data } = await Service.getComplaintDetail(id);
          if (errorCode === 0) {
            console.log(data);
            setImages(data.images);
            setTotal(data.total);
            setReason(data.reason);
            setCreatedAt(new Date(data.createAt));
            setFullname(data.fullname);
            setPhone(data.phoneNumber);
            setStatus(data.status);
            setEmail(data.email);
            setShipper(data.shipper);
            setRestaurant(data.restaurant);
          } else {
            dispatch(
              ToastAction.displayInfo(
                "error",
                ErrorCollection.EXECUTION[errorCode]
              )
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
      })();
    }
  }, [open, id]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="sm"
      fullWidth
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle align="center">
        Thông tin khiếu nại: {createdAt && createdAt.toLocaleDateString()}{" "}
        <InlineIcon
          icon={status ? checkCircleFill : checkCircleTwotone}
          style={{ fontSize: "24px", color: status ? "#008000" : "black" }}
        ></InlineIcon>
      </DialogTitle>
      <DialogContent>
        <Swiper
          style={{ background: "#eeee" }}
          id="main"
          tag="section"
          wrapperTag="ul"
          slidesPerView={2}
          spaceBetween={50}
          navigation
          pagination={{ clickable: true }}
        >
          {images &&
            images.map((link) => (
              <SwiperSlide
                key={link}
                style={{ listStyle: "none", margin: "0 20px" }}
                tag="li"
                slot="container-start"
              >
                <img
                  src={link}
                  alt="report image"
                  style={{ width: "300px", margin: "0 20px" }}
                ></img>
              </SwiperSlide>
            ))}
        </Swiper>
        <Grid
          container
          direction="column"
          spacing={2}
          style={{ marginTop: "20px" }}
        >
          <Grid container item sm={12}>
            <div className={classes.infoTitle}>Mã đơn: </div>
            <div className={classes.infoContent}>{id}</div>
          </Grid>
          <Grid container item sm={12}>
            <div className={classes.infoTitle}>Tên người khiếu nại: </div>
            <div className={classes.infoContent}>{fullname}</div>
          </Grid>
          <Grid container item sm={12}>
            <div className={classes.infoTitle}>Email : </div>
            <div className={classes.infoContent}>{email}</div>
          </Grid>
          <Grid container item sm={12}>
            <div className={classes.infoTitle}>Sđt: </div>
            <div className={classes.infoContent}>{phone}</div>
          </Grid>
          <Grid container item sm={12}>
            <div className={classes.infoTitle}>Nội dung: </div>
            <div className={classes.infoContent}>{reason}</div>
          </Grid>
          <Grid container item sm={12}>
            <div className={classes.infoTitle}>Tổng thanh toán: </div>
            <div className={classes.infoContent}>{total}</div>
          </Grid>

          <Grid container item sm={12}>
            <div className={classes.infoTitle}>Nhà hàng : </div>
            <div
              className={classes.infoContent}
            >{`${restaurant.Name} (${restaurant.Phone})`}</div>
          </Grid>

          <Grid container item sm={12}>
            <div className={classes.infoTitle}>Shipper: </div>
            <div
              className={classes.infoContent}
            >{`${shipper.FullName} (${shipper.Phone})`}</div>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => {
            handleClose();
          }}
        >
          Đóng
        </Button>
        <Button
          fullWidth
          color="success"
          variant="outlined"
          onClick={handleSolveComplaint}
        >
          Đã giải quyết
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default ReportDetailDialog;
