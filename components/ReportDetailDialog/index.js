import React from "react";
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
//styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/components/reportDialogStyle";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

SwiperCore.use([Navigation, Pagination]);
const useStyles = makeStyles(styles);

function ReportDetailDialog({ report, handleClose, open }) {
  const classes = useStyles();
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
        Thông tin khiếu nại (Mã đơn: {report.orderID})
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
          {report.imageLinks &&
            report.imageLinks.map((link) => (
              <SwiperSlide
                key={link}
                style={{ listStyle: "none" }}
                tag="li"
                slot="container-start"
              >
                <img
                  src={link}
                  alt="report image"
                  style={{ objectFit: "contain" }}
                ></img>
              </SwiperSlide>
            ))}
        </Swiper>
        <Grid container direction="column">
          <div className={classes.info}>
            <div className={classes.infoTitle}>Người báo cáo: </div>
            <div className={classes.infoContent}>{report.annunciator}</div>
          </div>
          <div className={classes.info}>
            <div className={classes.infoTitle}>Đối tượng báo cáo: </div>
            <div className={classes.infoContent}>{report.reported}</div>
          </div>
          <div className={classes.info}>
            <div className={classes.infoTitle}>Nội dung</div>
            <div className={classes.infoContent}>{report.content}</div>
          </div>
          <div className={classes.info}>
            <div className={classes.infoTitle}>Tình trạng</div>
            <div className={classes.infoContent}>{report.status}</div>
          </div>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => {
            handleClose(false);
          }}
        >
          Đóng
        </Button>
        <Button
          fullWidth
          color="success"
          variant="outlined"
          onClick={() => {
            handleClose(false);
          }}
        >
          Đã giải quyết
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default ReportDetailDialog;
