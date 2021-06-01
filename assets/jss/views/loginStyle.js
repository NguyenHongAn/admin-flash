const loginStyle = {
  loginPage: {
    minHeight: "100vh",
    background: "linear-gradient(to right bottom, #2196f3, #e9f5fe)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  loginFrame: {
    background: "white",
    minHeight: "50vh",
    width: "30%",
    borderRadius: "5px",
    boxShadow: "5px 5px 5px #888888",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    padding: "10px 20px",
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },

  loginError: {
    color: "red",
  },

  loginSubmit: {
    marginTop: "20px !important",
    width: "50%",
  },
};

export default loginStyle;
