import { container, grayColor, infoColor, whiteColor } from "../index.js";

const restaurantStyles = {
  wrapper: {
    top: "0",
    height: "100vh",
    overflowY: "scroll",
    position: "relative",
    background: "linear-gradient(to right bottom, #2196f3, #e9f5fe)",
  },
  dialogFrame: {
    margin: "auto",
    position: "relative",
    borderRadius: "10px",
    backgroundColor: whiteColor,
    width: "70%",
    padding: "10px 0 30px 0",
    top: "0",
    minHeight: "100vh",
    display: "block",
    overflow: "hidden",
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
    color: infoColor[3],
  },
  navbar: {
    backgroundColor: grayColor[6],
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
    color: whiteColor,
  },
  avatar: {
    width: "100%",
    margin: "10px",
    objectFit: "contain",
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
  permisionBtn: {
    background: whiteColor,
    border: "1px solid red",
    color: "red",
    "&:hover": {
      backgroundColor: "red",
      color: whiteColor,
    },
  },
  breakLine: {
    backgroundColor: grayColor[0],
    margin: "10px 20px",
    width: "100%",
  },
};
export default restaurantStyles;
