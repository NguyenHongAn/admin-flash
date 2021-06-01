import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { useSelector } from "react-redux";
//styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/components/spinnerStyle";

const useStyles = makeStyles(styles);
function Loading() {
  const loading = useSelector((state) => state.loading);
  const classes = useStyles();

  return (
    <div style={{ position: "absolute", width: "100%" }}>
      {loading && (
        <div className={classes.loadingPage}>
          <MoonLoader
            loading={loading}
            size={120}
            className={classes.spinner}
          ></MoonLoader>
        </div>
      )}
    </div>
  );
}
export default Loading;
