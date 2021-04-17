import React, { useState } from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { TextField, Typography, Grid, Button } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";

function signin() {
  const [error, setError] = useState("");

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
      console.log({ email, password });
      //setError("Có gì đó nó sai sai");
      localStorage.setItem("jwt", "something");
    },
  });
  return (
    <div className={styles.loginPage}>
      <Head>
        <title>Flash Admin - Login</title>
      </Head>
      <div className={styles.loginFrame}>
        <Image src="/Logo.png" alt="logo" width="64" height="64"></Image>
        <Typography component="h1" variant="h5" align="left">
          Đăng nhập
        </Typography>
        <form className="login__form" onSubmit={formik.handleSubmit}>
          {error === "" ? null : (
            <Typography className="login__error">* {error}</Typography>
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
            <Typography className="login__error" align="left">
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
            <Typography className="login__error" align="left">
              {formik.errors.password}
            </Typography>
          ) : null}
          <Grid item xs={6} className="login__submit">
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
    </div>
  );
}
export default signin;
