import React from "react";
import { Grid } from "@material-ui/core";
import styles from "../../styles/Home.module.css";
import Notification from "../Notification";
import Sidebar from "../Sidebar";

function Layout({ children }) {
  return (
    <Grid container className={styles.dashboard}>
      <Grid md={3} className={styles.sidebar}>
        <Sidebar></Sidebar>
      </Grid>
      <Grid md={9} style={{ backgroundColor: "white" }}>
        <Notification></Notification>
        {children}
      </Grid>
    </Grid>
  );
}
export default Layout;
