import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import styles from "../../styles/Home.module.css";
import { useSelector } from "react-redux";

function Loading() {
  const loading = useSelector((state) => state.loading);
  return (
    <div className={styles.loadingPage}>
      <MoonLoader
        loading={loading}
        size={120}
        className="login__spinner"
      ></MoonLoader>
    </div>
  );
}
export default Loading;
