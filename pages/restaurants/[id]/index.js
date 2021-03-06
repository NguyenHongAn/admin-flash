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
import Toast from "../../../components/Toast";
import CustomButton from "../../../components/CustomButtons/Button";
//styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../../assets/jss/layout/restaurantLayout";
//function
import { useRouter } from "next/router";
import classNames from "classnames";
import Service from "./services";
import { useFormik } from "formik";
import ErrorCollection from "../../../config";
import { getTokenInSS, removeJwt } from "../../../utils/handleAuthetication";
import { useDispatch } from "react-redux";
import ToastAction from "../../../store/actions/toast.A";

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
          _manager: data.manager || {},
          _phone: data.restaurant.Phone,
          _password: data.newPassword,
        },
      };
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
      removeJwt();
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return { notFound: true };
  }
}

function Restaurant({
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
  _password,
}) {
  const classes = useStyles();
  const router = useRouter();
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(_avatar);
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
              "Th??nh c??ng c???p nh???t v??? tr?? nh?? h??ng"
            )
          );
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
              "error",
              ErrorCollection.SERVER[error.response.status]
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
              "C???p nh???t th??ng tin nh?? h??ng th??nh c??ng"
            )
          );
          router.push(`/restaurants/${id}`);
        } else {
          dispatch(
            ToastAction.displayInfo(
              "error",
              ErrorCollection.EXECUTION[errorCode]
            )
          );
        }
        setAvatar(null);
      } catch (error) {
        console.log(error);
        if (error.response) {
          dispatch(
            ToastAction.displayInfo(
              "error",
              ErrorCollection.SERVER[error.response.status]
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
    onSubmit: async (values) => {
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
          router.push("/restaurants");
          dispatch(
            ToastAction.displayInfo(
              "success",
              "Th??nh c??ng c???p nh???t quy???n qu???n l?? nh?? h??ng"
            )
          );
        } else {
          dispatch(
            ToastAction.displayInfo(
              "error",
              ErrorCollection.EXECUTION[errroCode]
            )
          );
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          dispatch(
            ToastAction.displayInfo(
              "error",
              ErrorCollection.SERVER[error.response.status]
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
            "T???m ng???ng khing doanh nh?? h??ng" + _restaurantName
          )
        );
        console.log({ errorCode });
        router.push("/restaurants");
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
    //e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    setAvatar(file);
    reader.readAsDataURL(file);

    reader.addEventListener("load", () => {
      setAvatarUrl(reader.result);
    });
  };

  return (
    <div className={classes.wrapper}>
      <Meta title="Restaurant Info"></Meta>
      <Toast></Toast>
      <div className={classes.dialogFrame}>
        <AppBar className={classes.navbar}>
          <Toolbar className={classes.container}>
            <div
              className={classNames(classes.flex, classes.backLink)}
              onClick={() => router.push("/restaurants")}
            >
              <InlineIcon icon={arrowLeft}></InlineIcon>
              <span>Quay L???i</span>
            </div>
            <div className={classes.title}>Th??ng tin nh?? h??ng</div>
          </Toolbar>
        </AppBar>
        <div>
          <Grid container style={{ paddingTop: "60px" }}>
            <Grid container spacing={1} className={classes.container}>
              <div className={classes.updateTitle}>C???p nh???t th??ng tin</div>
              <Grid container item md={3} justify="space-around">
                <img
                  className={classes.avatar}
                  src={avatarUrl}
                  id="image-review"
                ></img>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept=".png, .jpg, .jpeg"
                  style={{ height: "max-content" }}
                  onChange={hanldeChooseImage}
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
                    placeholder="T??n nh?? h??ng"
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
                    placeholder="S??t nh?? h??ng"
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
                    label="M??? c???a l??c"
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
                    label="????ng c???a l??c"
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
                <CustomButton
                  type="submit"
                  variant="contained"
                  className={classes.updateBtn}
                >
                  C???p nh???t
                </CustomButton>
              </Grid>
            </Grid>
            <hr className={classes.breakLine}></hr>
            <Grid container spacing={1} className={classes.container}>
              <div className={classes.updateTitle}>C???p nh???t ?????a ch???</div>
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
                        : `Ch???n Th??nh ph???`}
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
                        : ` Ch???n Qu???n/ Huy???n`}
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
                        : `Ch???n Ph?????ng/ x??`}
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
                    placeholder="?????a ch???: s??? nh??, t??n ???????ng"
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
                  C???p nh???t
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
                  Quy???n qu???n l?? nh?? h??ng
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
                  <span style={{ width: "85px", textAlign: "end" }}>S??t: </span>
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
                    T??n qu???n l??:{" "}
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
                <Grid item xs={12} container justify="space-between">
                  <span style={{ width: "85px", textAlign: "end" }}>
                    M???t kh???u
                  </span>
                  <TextField
                    style={{ width: "80%" }}
                    variant="outlined"
                    name="password"
                    id="password"
                    fullWidth
                    inputProps={{ readOnly: true }}
                    defaultValue={_password}
                  ></TextField>
                </Grid>
                <CustomButton
                  type="submit"
                  //color="rose"
                  className={classes.permisionBtn}
                >
                  C???p quy???n
                </CustomButton>
              </Grid>
              <Grid container item md={6} alignContent="flex-start">
                <div className={classes.updateTitle}>
                  Ng???ng kinh doanh nh?? h??ng
                </div>
                <Grid item xs={12} container justify="space-between">
                  <CustomButton
                    onClick={handleStopService}
                    className={classes.permisionBtn}
                  >
                    Ng???ng kinh doanh
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
