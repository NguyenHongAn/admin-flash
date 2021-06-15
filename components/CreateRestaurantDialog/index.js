import React, { useState } from "react";
import innerStyle from "./styles.module.css";
import { useFormik } from "formik";
import service from "./services";
import { useDispatch } from "react-redux";
import loadingAction from "../../store/actions/loading.A";
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

function CreateRestaurantDialog({ open, handleClose, location }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [districts, setDistricts] = useState(null);
  const [wards, setWards] = useState(null);
  const dispatch = useDispatch();

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      restaurantName: "",
      address: "",
      ward: "",
      district: "",
      city: "",
      password: "",
      openAt: "06:00",
      closeAt: "22:00",
      parkingFee: 0,
    },
    validationSchema: service.validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        dispatch(loadingAction.turnOnLoading());
        const {
          email,
          phone,
          restaurantName,
          address,
          city,
          password,
          ward,
          district,
          openAt,
          closeAt,
          parkingFee,
        } = values;
        const cityID = location.filter((elm) => elm.Name === city)[0].Id;
        const districtID = districts.filter((elm) => elm.Name === district)[0]
          .Id;
        const { errorCode, data } = await service.createNewRestaurant({
          email,
          phone,
          password,
          restaurantName,
          address,
          city,
          ward,
          district,
          cityID,
          districtID,
          openAt,
          closeAt,
          parkingFee,
        });
        console.log({ errorCode, data });
        if (errorCode === 0) {
          resetForm();
          setErrorMsg("");
          dispatch(
            ToastAction.displayInfo("success", "Tạo nhà hàng mới thành công")
          );
          handleClose();
        } else {
          setErrorMsg(ErrorCollection.EXECUTION[errorCode]);
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
          router.push("/");
        }
        dispatch(
          ToastAction.displayInfo(
            "error",
            ErrorCollection.SERVER[error.response.status]
          )
        );
      }
      dispatch(loadingAction.turnOffLoading());
    },
  });

  const handleSelectedCity = (e) => {
    const temp = location.filter((city) => city.Name === e.target.value)[0]
      .Districts;
    setDistricts(temp);
    formik.setFieldValue("city", e.target.value);
    formik.setFieldValue("district", "");
    formik.setFieldValue("ward", "");
  };

  const handleSelectedDsitrcts = (e) => {
    const temp = districts.filter(
      (district) => district.Name === e.target.value
    )[0].Wards;
    setWards(temp);
    formik.setFieldValue("district", e.target.value);
    formik.setFieldValue("ward", "");
  };

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
            <form onSubmit={formik.handleSubmit}>
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
                    error={formik.errors.email && formik.touched.email && true}
                    label={formik.errors.email}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={12} className={innerStyle.input}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Password"
                    required
                    id="pass"
                    name="pass"
                    value={formik.values.password}
                    onChange={(e) =>
                      formik.setFieldValue("password", e.target.value)
                    }
                    error={
                      formik.errors.password && formik.touched.password && true
                    }
                    label={formik.errors.password}
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
                    error={formik.errors.phone && formik.touched.phone && true}
                    label={formik.errors.phone}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={12} className={innerStyle.input}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Tên nhà hàng"
                    required
                    id="restaurantName"
                    name="restaurantName"
                    onChange={formik.handleChange}
                    value={formik.values.restaurantName}
                    error={
                      formik.errors.restaurantName &&
                      formik.touched.restaurantName &&
                      true
                    }
                    label={formik.errors.restaurantName}
                  ></TextField>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="openAt"
                      name="openAt"
                      label="Mở cửa lúc"
                      fullWidth
                      type="time"
                      value={formik.values.openAt}
                      variant="outlined"
                      onChange={formik.handleChange}
                      error={
                        formik.errors.openAt && formik.touched.openAt && true
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{ step: 300 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="closeAt"
                      name="closeAt"
                      label="Đóng cửa lúc"
                      fullWidth
                      type="time"
                      value={formik.values.closeAt}
                      variant="outlined"
                      onChange={formik.handleChange}
                      error={
                        formik.errors.closeAt && formik.touched.closeAt && true
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{ step: 300 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="city-label">
                        {formik.errors.city
                          ? formik.errors.city
                          : `Chọn Thành phố`}
                      </InputLabel>
                      <Select
                        labelId="city-label"
                        id="city"
                        name="city"
                        value={formik.values.city}
                        onChange={handleSelectedCity}
                        error={
                          formik.errors.city && formik.touched.city && true
                        }
                        label={formik.errors.city}
                      >
                        {location &&
                          location.map((city) => (
                            <MenuItem value={city.Name} key={city.Id}>
                              {city.Name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="district-label">
                        {formik.errors.district
                          ? formik.errors.district
                          : ` Chọn Quận/ Huyện`}
                      </InputLabel>
                      <Select
                        labelId="distrcit-label"
                        id="district"
                        name="district"
                        disabled={formik.values.city === ""}
                        value={formik.values.district}
                        onChange={handleSelectedDsitrcts}
                        error={
                          formik.errors.district &&
                          formik.touched.district &&
                          true
                        }
                        label={formik.errors.district}
                      >
                        {districts &&
                          districts.map((district) => (
                            <MenuItem value={district.Name} key={district.Id}>
                              {district.Name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="ward-label">
                        {formik.errors.ward
                          ? formik.errors.ward
                          : `Chọn Phường/ xã`}
                      </InputLabel>
                      <Select
                        labelId="ward-label"
                        id="ward"
                        name="ward"
                        disabled={formik.values.district === ""}
                        value={formik.values.ward}
                        onChange={formik.handleChange}
                        error={
                          formik.errors.ward && formik.touched.ward && true
                        }
                        label={formik.errors.ward}
                      >
                        {wards &&
                          wards.map((ward) => (
                            <MenuItem key={ward.Id} value={ward.Name}>
                              {ward.Name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="transport-label">
                        {formik.errors.parkingFee
                          ? formik.errors.parkingFee
                          : `Gửi xe`}
                      </InputLabel>
                      <Select
                        labelId="transport-label"
                        id="parkingFee"
                        name="parkingFee"
                        value={formik.values.parkingFee}
                        onChange={formik.handleChange}
                        error={
                          formik.errors.parkingFee &&
                          formik.touched.parkingFee &&
                          true
                        }
                        label={formik.errors.parkingFee}
                      >
                        <MenuItem value={0}>
                          <em>Gửi xe miễn phí</em>
                        </MenuItem>
                        <MenuItem value={1}>
                          <em>Gửi xe có phí</em>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
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
                    error={
                      formik.errors.address && formik.touched.address && true
                    }
                    label={formik.errors.address}
                  ></TextField>
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
                        handleClose();
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
