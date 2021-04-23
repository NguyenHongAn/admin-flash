import React from "react";
import { Grid } from "@material-ui/core";
import styles from "../../styles/Home.module.css";
import Notification from "../Notification";
import Sidebar from "../Sidebar";

function Layout({ children }) {
  return (
    <Grid container className={styles.dashboard}>
      <Grid item md={3} className={styles.sidebar}>
        <Sidebar></Sidebar>
      </Grid>
      <Grid item md={9} className={styles.pageContent}>
        <div className={styles.notification}>
          <Notification></Notification>
        </div>

        {children}
      </Grid>
    </Grid>
  );
}
export default Layout;
