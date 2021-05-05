import React, { useState } from "react";
import innerStyle from "./styles.module.css";
import { useFormik } from "formik";
import service from "./services";

import {
  Dialog,
  DialogContent,
  Slide,
  Button,
  DialogTitle,
  TextField,
  Container,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CreateRestaurantDialog({ open, handleClose }) {
  const [errorMsg, setErrorMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      address: "",
      ward: "",
      district: "",
      city: "",
      openTime: "06:00",
      closeTime: "22:00",
      transport: "",
    },
    validationSchema: service.validationSchema,
    onSubmit: async (value, { resetForm }) => {},
  });

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="sm"
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" align="center">
          Tạo nhà hàng mới
        </DialogTitle>
        <DialogContent>
          <Container
            component="main"
            maxWidth="sm"
            className={innerStyle.formContainer}
          >
            {errorMsg === "" ? null : (
              <Typography className={innerStyle.error} align="left">
                {errorMsg}
              </Typography>
            )}
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} className={innerStyle.input}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Email"
                    required
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && formik.errors.email}
                    label={formik.errors.email}
                  ></TextField>
                </Grid>

                <Grid item xs={12} sm={12} className={innerStyle.input}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Số điện thoại"
                    required
                    id="phone"
                    name="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    error={formik.touched.phone && formik.errors.phone}
                    label={formik.errors.phone}
                  ></TextField>
                </Grid>

                <Grid item xs={12} sm={12} className={innerStyle.input}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Địa chỉ"
                    required
                    id="address"
                    name="address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    error={formik.touched.address && formik.errors.address}
                    label={formik.errors.address}
                  ></TextField>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="ward-label">Chọn Phường/ Xã</InputLabel>
                      <Select
                        labelId="ward-label"
                        id="ward"
                        value={formik.values.ward}
                        onChange={formik.handleChange}
                        error={formik.touched.ward && formik.errors.ward}
                        label={formik.errors.ward}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="district-label">
                        Chọn Quận/ Huyện
                      </InputLabel>
                      <Select
                        labelId="distrcit-label"
                        id="district"
                        value={formik.values.district}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.district && formik.errors.district
                        }
                        label={formik.errors.district}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="city-label">Chọn Thành phố</InputLabel>
                      <Select
                        labelId="city-label"
                        id="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        error={formik.touched.city && formik.errors.city}
                        label={formik.errors.city}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="transport-label">
                        Chọn Phương thức giao hàng
                      </InputLabel>
                      <Select
                        labelId="transport-label"
                        id="transport"
                        value={formik.values.transport}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.transport && formik.errors.transport
                        }
                        label={formik.errors.transport}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="openTime"
                      name="openTime"
                      label="Mở cửa lúc"
                      fullWidth
                      type="time"
                      value={formik.values.openTime}
                      variant="outlined"
                      onChange={formik.handleChange}
                      error={formik.touched.openTime && formik.errors.openTime}
                      label={formik.errors.openTime}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="closeTime"
                      name="closeTime"
                      label="Đóng cửa lúc"
                      fullWidth
                      type="time"
                      value={formik.values.closeTime}
                      variant="outlined"
                      onChange={formik.handleChange}
                      error={
                        formik.touched.closetime && formik.errors.closeTime
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  spacing={1}
                  className={innerStyle.formAction}
                >
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => {
                        handleClose(false);
                        setErrorMsg("");
                        formik.resetForm();
                      }}
                    >
                      Huỷ
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={innerStyle.submit}
                    >
                      Tạo
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default CreateRestaurantDialog;
