import React, { useState } from "react";
import { useFormik } from "formik";
import Service from "./services";
import { useDispatch } from "react-redux";
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
import ErrorCollection from "../../config";
import { useRouter } from "next/router";
import ToastAction from "../../store/actions/toast.A";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CreateShipperDialog({ open, handleClose }) {
  const dispatch = useDispatch();

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      fullname: "",
      gender: 0,
    },
    validationSchema: Service.validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const { email, phone, fullname, gender } = values;

        const { errorCode, data } = await Service.createNewShipper({
          email,
          phone,
          fullname,
          gender,
        });
        console.log({ errorCode, data });
        if (errorCode === 0) {
          resetForm();

          dispatch(
            ToastAction.displayInfo("success", "Tạo tài xế mới thành công")
          );
          handleClose();
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
    },
  });
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
      <DialogTitle id="alert-dialog-slide-title" align="center">
        Tạo tài xế mới
      </DialogTitle>
      <DialogContent>
        <Container component="main" container>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Email"
                  required
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.errors.email && formik.touched.email && true}
                  label={formik.errors.email}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Số điện thoại"
                  required
                  id="phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.errors.phone && formik.touched.phone && true}
                  label={formik.errors.phone}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Họ và tên"
                  required
                  id="fullname"
                  name="fullname"
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                  error={
                    formik.errors.fullname && formik.touched.fullname && true
                  }
                  label={formik.errors.fullname}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="gender-label">
                    {formik.errors.parkingFee
                      ? formik.errors.parkingFee
                      : `Giới tính`}
                  </InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    error={
                      formik.errors.gender && formik.touched.gender && true
                    }
                    label={formik.errors.gender}
                  >
                    <MenuItem value={0}>
                      <em>Chưa rõ</em>
                    </MenuItem>
                    <MenuItem value={1}>
                      <em>Nam</em>
                    </MenuItem>
                    <MenuItem value={2}>
                      <em>Nữ</em>
                    </MenuItem>
                    <MenuItem value={3}>
                      <em>Khác</em>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid container alignItems="center" spacing={1}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      handleClose();
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
  );
}
export default CreateShipperDialog;
