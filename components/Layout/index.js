import React, { useState } from "react";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "../Navbars";
import Sidebar from "../Sidebar";
import Toast from "../Toast";
import styles from "../../assets/jss/layout/adminLayout";

let ps;

const useStyles = makeStyles(styles);

export default function Layout({ routers, children }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routers}
        logoText={"Admin"}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={"blue"}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar routes={routers} handleDrawerToggle={handleDrawerToggle} />

        <div className={classes.content}>
          <Toast></Toast>
          <div className={classes.container}>{children}</div>
        </div>
      </div>
    </div>
  );
}
