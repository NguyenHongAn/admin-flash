import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import useStyles from "./styles";
import { useSelector } from "react-redux";

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
            className="login__spinner"
          ></MoonLoader>
        </div>
      )}
    </div>
  );
}
export default Loading;
