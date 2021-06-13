/*eslint-disable*/
import React from "react";
import classNames from "classnames";
//import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@iconify/react";
// core components
import AdminNavbarLinks from "../Navbars/AdminNavbarLinks.js";

import styles from "../../assets/jss/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  const router = useRouter();

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return router.pathname === routeName;
  }

  const { color, logoText, routes } = props;
  const links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        let listItemClasses;

        listItemClasses = classNames({
          [" " + classes[color]]: activeRoute(prop.path),
        });

        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.path),
        });
        return (
          <Link
            href={prop.path}
            className={classNames(classes.item)}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              <Icon
                className={classNames(classes.itemIcon, whiteFontClasses, {
                  [classes.warningItem]: prop.path === "/list-report",
                })}
                icon={prop.icon}
              ></Icon>

              <ListItemText
                primary={prop.name}
                className={classNames(classes.itemText, whiteFontClasses, {
                  [classes.warningItem]: prop.path === "/list-report",
                })}
                disableTypography={true}
              />
            </ListItem>
          </Link>
        );
      })}
    </List>
  );
  const brand = (
    <div
      className={classes.logo}
      onClick={() => router.push("/general-statistics")}
    >
      <div className={classes.logoLink}>
        <div className={classes.logoImage}>
          <img src={"/img/Logo.png"} alt="logo" className={classes.img} />
        </div>
        <span style={{ verticalAlign: "middle" }}>{logoText}</span>
      </div>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
            {links}
          </div>

          <div
            className={classes.background}
            style={{ backgroundImage: `url(/img/sidebar2.jpg)` }}
          />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={"left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>

          <div
            className={classes.background}
            style={{ backgroundImage: "url('/img/sidebar2.jpg')" }}
          />
        </Drawer>
      </Hidden>
    </div>
  );
}

// Sidebar.propTypes = {
//   rtlActive: PropTypes.bool,
//   handleDrawerToggle: PropTypes.func,
//   bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
//   logoText: PropTypes.string,
//   routes: PropTypes.arrayOf(PropTypes.object),
//   open: PropTypes.bool,
// };
