import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import {
  Dialog,
  DialogContent,
  Slide,
  DialogActions,
  Button,
  DialogTitle,
  Typography,
  Grid,
} from "@material-ui/core";
import innerStyle from "./styles.module.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

SwiperCore.use([Navigation, Pagination]);

function ReportDetailDialog({ report, handleClose, open }) {
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
          <div className={innerStyle.info}>
            <div className={innerStyle.infoTitle}>Người báo cáo: </div>
            <div className={innerStyle.infoContent}>{report.annunciator}</div>
          </div>
          <div className={innerStyle.info}>
            <div className={innerStyle.infoTitle}>Đối tượng báo cáo: </div>
            <div className={innerStyle.infoContent}>{report.reported}</div>
          </div>
          <div className={innerStyle.info}>
            <div className={innerStyle.infoTitle}>Nội dung</div>
            <div className={innerStyle.infoContent}>{report.content}</div>
          </div>
          <div className={innerStyle.info}>
            <div className={innerStyle.infoTitle}>Tình trạng</div>
            <div className={innerStyle.infoContent}>{report.status}</div>
          </div>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            handleClose(false);
          }}
        >
          Đóng
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            handleClose(false);
          }}
          style={{ background: "#3aeb34", color: "white" }}
        >
          Đã giải quyết
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default ReportDetailDialog;
