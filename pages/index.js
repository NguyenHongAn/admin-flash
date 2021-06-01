import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TextField, Typography, Grid, Button } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import loadingAction from "../store/actions/loading.A";
import Loading from "../components/Loading";
import { useRouter } from "next/router";
import authAction from "../store/actions/auth.A";
import Meta from "../components/Meta";
//styles
import styles from "../assets/jss/views/loginStyle";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const useStyles = makeStyles(styles);

function signin() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Địa chỉ email không hợp lệ"),
      password: Yup.string()
        .required("Mật khẩu không thể để trống")
        .min(6, "Mật khẩu phải nhiều hơn 6 chữ số"),
    }),
    onSubmit: (values) => {
      const { email, password } = values;
      try {
        dispatch(loadingAction.turnOnLoading());
        console.log({ email, password });
        //setError("Có gì đó nó sai sai");

        localStorage.setItem("jwt", "something");
        dispatch(authAction.signIn("something"));
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        dispatch(loadingAction.turnOffLoading());
        console.log("turn Off loading");
      }, 500);
    },
  });

  const router = useRouter();
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      router.push("/general-statistics", undefined, { shallow: true });
    }
  }, [loading]);

  return (
    <div
      className={classNames(classes.loginPage, {
        [classes.loadingPage]: loading,
      })}
    >
      <Meta title="Admin Flash - Login"></Meta>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className={classes.loginFrame}>
          <Image src="/img/Logo.png" alt="logo" width="64" height="64"></Image>
          <Typography component="h1" variant="h5" align="left">
            Đăng nhập
          </Typography>
          <form className={classes.loginForm} onSubmit={formik.handleSubmit}>
            {error === "" ? null : (
              <Typography className={classes.loginError}>* {error}</Typography>
            )}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <Typography className={classes.loginError} align="left">
                {formik.errors.email}
              </Typography>
            ) : null}
            <TextField
              variant="outlined"
              margin="normal"
              type="password"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <Typography className={classes.loginError} align="left">
                {formik.errors.password}
              </Typography>
            ) : null}
            <Grid item xs={6} className={classes.loginSubmit}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                fullWidth
              >
                Đăng nhập
              </Button>
            </Grid>
          </form>
        </div>
      )}
    </div>
  );
}
export default signin;
