import React, { useState } from "react";
//core components
import Meta from "../../../components/Meta";
import { InlineIcon } from "@iconify/react";
import {
  AppBar,
  FormControl,
  Select,
  InputLabel,
  Button,
  Grid,
  Toolbar,
  TextField,
  MenuItem,
} from "@material-ui/core";
import arrowLeft from "@iconify/icons-fe/arrow-left";
//styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../../assets/jss/layout/restaurantLayout";
//function
import { useRouter } from "next/router";
import classNames from "classnames";
import Service from "./services";
import { useFormik } from "formik";
import Toast from "../../../components/Toast";
import ErrorCollection from "../../../config";

const useStyles = makeStyles(styles);

export const getServerSideProps = async ({ query }) => {
  const { id } = query;

  try {
    const { errorCode, data } = await Service.getRestaurantInfo(id);
    if (errorCode === 0) {
      const _districts = data.cities.filter(
        (city) => city.Name === data.restaurant.Address.City
      )[0].Districts;
      const _wards = _districts.filter(
        (district) => district.Name === data.restaurant.Address.District
      )[0].Wards;

      return {
        props: {
          cities: data.cities,
          _restaurantName: data.restaurant.Name,
          _openTime: data.restaurant.OpenHours[0],
          _closeTime: data.restaurant.OpenHours[1],
          _anouncement: data.restaurant.Anouncement,
          _city: data.restaurant.Address.City,
          _ward: data.restaurant.Address.Ward,
          _district: data.restaurant.Address.District,
          _address: data.restaurant.Address.Street,
          _avatar: data.restaurant.Avatar,
          _districts,
          _wards,
        },
      };
    } else if (errorCode === ErrorCollection.INVALID_PARAM) {
      return { notFound: true };
    }
    return {
      props: {
        errorType: "error",
        errorMSh: ErrorCollection.EXECUTION[errorCode],
      },
    };
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 401) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    } else if (typeof error.response !== "undefined") {
      return {
        props: {
          errorType: "error",
          errorMsg: ErrorCollection.SERVER[error.response.status],
        },
      };
    }
    return { notFound: true };
  }
};

function Restaurant({
  errorType,
  errorMsg,
  cities,
  _avatar,
  _restaurantName,
  _openTime,
  _closeTime,
  _address,
  _city,
  _ward,
  _district,
  _anouncement,
  _wards,
  _districts,
}) {
  const classes = useStyles();
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState(_avatar);
  const [districts, setDistricts] = useState(_districts);
  const [wards, setWards] = useState(_wards);

  const addressFormik = useFormik({
    initialValues: {
      address: _address,
      ward: _ward,
      district: _district,
      city: _city,
    },
    validationSchema: Service.addressSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Click onSubmit");
    },
  });

  const infoFormik = useFormik({
    initialValues: {
      restaurantName: _restaurantName,
      openTime: _openTime,
      closeTime: _closeTime,
      // description: _description,
      anouncement: _anouncement,
    },
    validationSchema: Service.infoSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Click onSubmit");
    },
  });

  const handleSelectedCity = (e) => {
    const temp = cities.filter((city) => city.Name === e.target.value)[0]
      .Districts;
    setDistricts(temp);
    addressFormik.setFieldValue("city", e.target.value);
    addressFormik.setFieldValue("district", "");
    addressFormik.setFieldValue("ward", "");
  };

  const handleSelectedDsitrcts = (e) => {
    const temp = districts.filter(
      (district) => district.Name === e.target.value
    )[0].Wards;
    setWards(temp);
    addressFormik.setFieldValue("district", e.target.value);
    addressFormik.setFieldValue("ward", "");
  };

  return (
    <div className={classes.wrapper}>
      <Meta title="Restaurant Info"></Meta>
      {errorType ? <Toast type={errorType} content={errorMsg}></Toast> : null}

      <AppBar className={classes.navbar}>
        <Toolbar className={classes.container}>
          <div
            className={classNames(classes.flex, classes.backLink)}
            onClick={() => router.push("/restaurants-management")}
          >
            <InlineIcon icon={arrowLeft}></InlineIcon>
            <span>Quay Lại</span>
          </div>
          <div className={classes.title}>Thông tin nhà hàng</div>
        </Toolbar>
      </AppBar>
      <div className={classes.dialogFrame}>
        <Grid container style={{ paddingTop: "60px" }}>
          <Grid container spacing={1} className={classes.container}>
            <div className={classes.updateTitle}>Cập nhật thông tin</div>
            <Grid container item md={3} justify="center">
              <img className={classes.avatar} src={avatarUrl}></img>
              <input type="file" id="avatar" name="avatar"></input>
              <Button className={classes.updateBtn}>Cập nhật</Button>
            </Grid>
            <Grid
              container
              item
              md={9}
              component="form"
              spacing={1}
              onSubmit={infoFormik.handleSubmit}
            >
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Tên nhà hàng"
                  //required
                  id="restaurantName"
                  name="restaurantName"
                  onChange={infoFormik.handleChange}
                  value={infoFormik.values.restaurantName}
                  error={infoFormik.errors.restaurantName && true}
                  label={infoFormik.errors.restaurantName}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="openTime"
                  name="openTime"
                  label="Mở cửa lúc"
                  fullWidth
                  type="time"
                  value={infoFormik.values.openTime}
                  variant="outlined"
                  onChange={infoFormik.handleChange}
                  error={infoFormik.errors.openTime && true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{ step: 300 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="closeTime"
                  name="closeTime"
                  label="Đóng cửa lúc"
                  fullWidth
                  type="time"
                  value={infoFormik.values.closeTime}
                  variant="outlined"
                  onChange={infoFormik.handleChange}
                  error={infoFormik.errors.closeTime && true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{ step: 300 }}
                />
              </Grid>
              {/* <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Mô tả"
                  //required
                  id="description"
                  name="description"
                  onChange={infoFormik.handleChange}
                  value={infoFormik.values.description}
                  error={infoFormik.errors.description && true}
                  label={infoFormik.errors.description}
                ></TextField>
              </Grid> */}
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Thông báo"
                  //required
                  id="anouncement"
                  name="anouncement"
                  onChange={infoFormik.handleChange}
                  value={infoFormik.values.anouncement}
                  error={infoFormik.errors.anouncement && true}
                  label={infoFormik.errors.anouncement}
                ></TextField>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                className={classes.updateBtn}
              >
                Cập nhật
              </Button>
            </Grid>
          </Grid>
          <hr className={classes.breakLine}></hr>
          <Grid container spacing={1} className={classes.container}>
            <div className={classes.updateTitle}>Cập nhật địa chỉ</div>
            <Grid
              container
              item
              component="form"
              onSubmit={addressFormik.handleSubmit}
              spacing={1}
            >
              <Grid item md={4}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="city-label">
                    {addressFormik.errors.city
                      ? addressFormik.errors.city
                      : `Chọn Thành phố`}
                  </InputLabel>
                  <Select
                    labelId="city-label"
                    id="city"
                    name="city"
                    value={addressFormik.values.city}
                    onChange={handleSelectedCity}
                    error={addressFormik.errors.city && true}
                    label={addressFormik.errors.city}
                  >
                    {cities &&
                      cities.map((city) => (
                        <MenuItem value={city.Name} key={city.Id}>
                          {city.Name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="district-label">
                    {addressFormik.errors.district
                      ? addressFormik.errors.district
                      : ` Chọn Quận/ Huyện`}
                  </InputLabel>
                  <Select
                    labelId="distrcit-label"
                    id="district"
                    name="district"
                    disabled={addressFormik.values.city === ""}
                    value={addressFormik.values.district}
                    onChange={handleSelectedDsitrcts}
                    error={addressFormik.errors.district && true}
                    label={addressFormik.errors.district}
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
              <Grid item md={4}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="ward-label">
                    {addressFormik.errors.ward
                      ? addressFormik.errors.ward
                      : `Chọn Phường/ xã`}
                  </InputLabel>
                  <Select
                    labelId="ward-label"
                    id="ward"
                    name="ward"
                    disabled={addressFormik.values.district === ""}
                    value={addressFormik.values.ward}
                    onChange={addressFormik.handleChange}
                    error={addressFormik.errors.ward && true}
                    label={addressFormik.errors.ward}
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

              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Địa chỉ: số nhà, tên đường"
                  ////required
                  id="address"
                  name="address"
                  onChange={addressFormik.handleChange}
                  value={addressFormik.values.address}
                  error={addressFormik.errors.address && true}
                  label={addressFormik.errors.address}
                ></TextField>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                className={classes.updateBtn}
              >
                Cập nhật
              </Button>
            </Grid>
          </Grid>
          <hr className={classes.breakLine}></hr>
          <Grid container spacing={1} className={classes.container}></Grid>
        </Grid>
      </div>
    </div>
  );
}
export default Restaurant;
