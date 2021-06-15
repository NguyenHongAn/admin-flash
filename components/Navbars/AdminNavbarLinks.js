import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import { Icon } from "@iconify/react";
import logoutIcon from "@iconify/icons-carbon/logout";

import Button from "../CustomButtons/Button.js";
import { useDispatch } from "react-redux";
import authActions from "../../store/actions/auth.A";

import styles from "../../assets/jss/components/headerLinksStyle";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";
const useStyles = makeStyles(styles);
const cookies = new Cookies();

export default function AdminNavbarLinks() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(authActions.signOut());
    cookies.remove("jwt");
    router.push("/");
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
