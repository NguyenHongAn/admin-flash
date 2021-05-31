import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  loadingPage: {
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "10000",
  },
}));

export default useStyles;
