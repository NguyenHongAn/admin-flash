import { container, grayColor, infoColor, whiteColor } from "../index.js";

const restaurantStyles = {
  wrapper: {
    margin: "auto",
    position: "relative",
    borderRadius: "10px",
    backgroundColor: whiteColor,
    width: "70%",
    paddingTop: "10px",
    top: "0",
    height: "100vh",
    display: "block",
  },
  container: {
    ...container,
    minHeight: "50px",
    width: "100%",
  },
  flex: {
    flex: 1,
  },
  backLink: {
    cursor: "pointer",
    color: infoColor[2],
  },
  navbar: {
    backgroundColor: grayColor[4],
    boxShadow: "none",
    borderBottom: "0",
    marginBottom: "0",
    position: "absolute",
    width: "100%",
    borderRadius: "10px 10px 0px 0px",
    fontSize: "16px",
    color: grayColor[2],
  },
  title: {
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    left: " 50%",
    fontSize: "20px",
  },
  avatar: {
    width: "100%",
    margin: "10px 20px",
  },
  updateTitle: {
    fontWeight: "bold",
    width: "100%",
    margin: "10px",
  },
  updateBtn: {
    backgroundColor: infoColor[4] + "!important",
    height: "35px",
    color: whiteColor,
    marginTop: "10px",
  },
  breakLine: {
    backgroundColor: grayColor[0],
    margin: "10px 20px",
    width: "100%",
  },
};
export default restaurantStyles;
