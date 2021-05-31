import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui/icons
import { Icon } from "@iconify/react";
import logoutIcon from "@iconify/icons-carbon/logout";

import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "../CustomInput/CustomInput.js";
import Button from "../CustomButtons/Button.js";
import { useDispatch } from "react-redux";
import authActions from "../../store/actions/auth.A";

import styles from "../../assets/jss/components/headerLinksStyle";
import { useRouter } from "next/router";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const route = useRouter();

  const handleLogout = () => {
    dispatch(authActions.signOut());
    localStorage.removeItem("jwt");
    route.push("/");
  };

  return (
    <div>
      <div className={classes.manager}>
        <Button
          color="white"
          aria-label="edit"
          justIcon
          round
          onClick={handleLogout}
        >
          <Icon
            icon={logoutIcon}
            style={{ color: "black", fontSize: "24px" }}
          />
        </Button>
      </div>
    </div>
  );
}
