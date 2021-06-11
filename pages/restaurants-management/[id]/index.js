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
import CustomButton from "../../../components/CustomButtons/Button";
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
import getTokenInSS from "../../../utils/handldAutheticaion";
import { useDispatch } from "react-redux";
import ToastAction from "../../../store/actions/toast.A";
import { route } from "next/dist/next-server/server/router";
const useStyles = makeStyles(styles);

export async function getServerSideProps({ req, query }) {
  const { id } = query;
  const token = getTokenInSS(req);

  try {
    const { errorCode, data } = await Service.getRestaurantInfo(id, token);
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
          _openAt: data.restaurant.OpenHours[0],
          _closeAt: data.restaurant.OpenHours[1],
          _anouncement: data.restaurant.Anouncement || "",
          _city: data.restaurant.Address.City,
          _ward: data.restaurant.Address.Ward,
          _district: data.restaurant.Address.District,
          _address: data.restaurant.Address.Street,
          _avatar: data.restaurant.Avatar || "",
          _districts,
          _wards,
          _manager: data.manager,
          _phone: data.restaurant.Phone,
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
    console.log(error.message);
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
}

function Restaurant({
  errorType,
  errorMsg,
  cities,
  _avatar,
  _restaurantName,
  _openAt,
  _closeAt,
  _address,
  _city,
  _ward,
  _district,
  _anouncement,
  _wards,
  _districts,
  _manager,
  _phone,
}) {
  const classes = useStyles();
  const router = useRouter();
  const [avatar, setAvatar] = useState(_avatar);
  const [districts, setDistricts] = useState(_districts);
  const [wards, setWards] = useState(_wards);
  const { id } = router.query;
  const dispatch = useDispatch();

  const addressFormik = useFormik({
    initialValues: {
      address: _address,
      ward: _ward,
      district: _district,
      city: _city,
      phone: _phone,
    },
    validationSchema: Service.addressSchema,
    onSubmit: async (values) => {
      const { address, ward, district, city } = values;
      console.log({ address, ward, district, city });
      try {
        const { errorCode, data } = await Service.updateAddress({
          address,
          ward,
          district,
          city,
          id,
        });
        console.log({ errorCode, data });
        if (errorCode === 0) {
          dispatch(
            ToastAction.displayInfo(
              "success",
              "Thành công cập nhật vị trí nhà hàng"
            )
          );
        } else {
          dispatch(
            ToastAction.displayInfo(
              "success",
              ErrorCollection.EXECUTION[errroCode]
            )
          );
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          dispatch(
            ToastAction.displayInfo(
              "success",
              ErrorCollection.EXECUTION[error.response.status]
            )
          );
        }
      }
    },
  });

  const infoFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      restaurantName: _restaurantName,
      openAt: _openAt,
      closeAt: _closeAt,
      anouncement: _anouncement,
      resPhone: _phone,
    },
    validationSchema: Service.infoSchema,
    onSubmit: async (values) => {
      let isChange = false;
      if (avatar !== _avatar) isChange = true;
      const token = getTokenInSS(null);
      console.log({ avatar, token });
      const { restaurantName, openAt, closeAt, anouncement, resPhone } = values;
      try {
        const { errorCode, data } = await Service.updateInfo({
          restaurantName,
          openAt,
          closeAt,
          anouncement,
          resPhone,
          id,
          avatar,
          isChange,
          token,
        });
        console.log({ errorCode, data });
        if (errorCode === 0) {
          dispatch(
            ToastAction.displayInfo(
              "success",
              "Cập nhật thông tin nhà hàng thành công"
            )
          );
          router.push(`restaurants-management/${id}`);
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
        if (error.response) {
          dispatch(
            ToastAction.displayInfo(
              "success",
              ErrorCollection.EXECUTION[error.response.status]
            )
          );
        }
      }
    },
  });

  const premisionFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullname: _manager.FullName,
      email: _manager.Email,
      phone: "",
    },
    validationSchema: Service.permisionSchema,
    onSubmit: async (values, { resetForm }) => {
      const { fullname, email, phone } = values;
      try {
        const { errorCode, data } = await Service.addPermision({
          fullname,
          email,
          phone,
          id: id,
          manager: _manager._id,
        });
        console.log({ errorCode, data });
        if (errorCode === 0) {
          router.push("/restaurants-management");
          dispatch(
            ToastAction.displayInfo(
              "success",
              "Thành công cập nhật quyền quản lý nhà hàng"
            )
          );
        } else {
          dispatch(
            ToastAction.displayInfo(
              "success",
              ErrorCollection.EXECUTION[errroCode]
            )
          );
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          dispatch(
            ToastAction.displayInfo(
              "success",
              ErrorCollection.EXECUTION[error.response.status]
            )
          );
        }
      }
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
  const handleStopService = async () => {
    try {
      const { errorCode } = await Service.stopRestaurantService(id);
      if (errorCode === 0) {
        dispatch(
          ToastAction.displayInfo(
            "success",
            "Tạm ngừng khing doanh nhà hàng" + _restaurantName
          )
        );
        console.log({ errorCode });
        router.push("/restaurants-management");
      } else {
        dispatch(
          ToastAction.displayInfo("error", ErrorCollection.EXECUTION[errorCode])
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hanldeChooseImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setAvatar(file);
    }.bind(this);
  };
  return (
    <div className={classes.wrapper}>
      <Meta title="Restaurant Info"></Meta>
      <div className={classes.dialogFrame}>
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
        <div>
          <Grid container style={{ paddingTop: "60px" }}>
            <Grid container spacing={1} className={classes.container}>
              <div className={classes.updateTitle}>Cập nhật thông tin</div>
              <Grid container item md={3} justify="space-around">
                <img
                  className={classes.avatar}
                  src={avatar}
                  id="image-review"
                ></img>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept=".png, .jpg, .jpeg"
                  style={{ height: "max-content" }}
                  onChange={(e) => setAvatar(e.target.files[0])}
                ></input>
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
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Sđt nhà hàng"
                    //required
                    id="resPhone"
                    name="resPhone"
                    onChange={infoFormik.handleChange}
                    value={infoFormik.values.resPhone}
                    error={infoFormik.errors.resPhone && true}
                    label={infoFormik.errors.resPhone}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="openAt"
                    name="openAt"
                    label="Mở cửa lúc"
                    fullWidth
                    type="time"
                    value={infoFormik.values.openAt}
                    variant="outlined"
                    onChange={infoFormik.handleChange}
                    error={infoFormik.errors.openAt && true}
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
                    value={infoFormik.values.closeAt}
                    variant="outlined"
                    onChange={infoFormik.handleChange}
                    error={infoFormik.errors.closeAt && true}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{ step: 300 }}
                  />
                </Grid>

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
                <CustomButton
                  type="submit"
                  variant="contained"
                  className={classes.updateBtn}
                >
                  Cập nhật
                </CustomButton>
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
                <CustomButton
                  type="submit"
                  variant="contained"
                  className={classes.updateBtn}
                >
                  Cập nhật
                </CustomButton>
              </Grid>
            </Grid>
            <hr className={classes.breakLine}></hr>
            <Grid container spacing={3} className={classes.container}>
              <Grid
                container
                item
                md={6}
                spacing={1}
                component="form"
                onSubmit={premisionFormik.handleSubmit}
              >
                <div className={classes.updateTitle}>
                  Quyền quản lý nhà hàng
                </div>
                <Grid item xs={12} container justify="space-between">
                  <span style={{ width: "85px", textAlign: "end" }}>
                    Email:{" "}
                  </span>
                  <TextField
                    style={{ width: "80%" }}
                    variant="outlined"
                    name="email"
                    id="email"
                    fullWidth
                    onChange={premisionFormik.handleChange}
                    value={premisionFormik.values.email}
                    error={premisionFormik.errors.email && true}
                    label={premisionFormik.errors.email}
                  ></TextField>
                </Grid>
                <Grid item xs={12} container justify="space-between">
                  <span style={{ width: "85px", textAlign: "end" }}>Sđt: </span>
                  <TextField
                    style={{ width: "80%" }}
                    variant="outlined"
                    name="phone"
                    id="phone"
                    fullWidth
                    onChange={premisionFormik.handleChange}
                    value={premisionFormik.values.phone}
                    error={premisionFormik.errors.phone && true}
                    label={premisionFormik.errors.phone}
                  ></TextField>
                </Grid>
                <Grid item xs={12} container justify="space-between">
                  <span style={{ width: "85px", textAlign: "end" }}>
                    Tên quản lý:{" "}
                  </span>
                  <TextField
                    style={{ width: "80%" }}
                    variant="outlined"
                    name="fullname"
                    id="fullname"
                    fullWidth
                    onChange={premisionFormik.handleChange}
                    value={premisionFormik.values.fullname}
                    error={premisionFormik.errors.fullname && true}
                    label={premisionFormik.errors.fullname}
                  ></TextField>
                </Grid>
                <CustomButton
                  type="submit"
                  //color="rose"
                  className={classes.permisionBtn}
                >
                  Cấp quyền
                </CustomButton>
              </Grid>
              <Grid container item md={6} alignContent="flex-start">
                <div className={classes.updateTitle}>
                  Ngừng kinh doanh nhà hàng
                </div>
                <Grid item xs={12} container justify="space-between">
                  <CustomButton
                    onClick={handleStopService}
                    className={classes.permisionBtn}
                  >
                    Ngừng kinh doanh
                  </CustomButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
export default Restaurant;
