const TableStyle = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    fontSize: "1.1rem",
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "400",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  tableContainer: {
    width: "100%",
    minHeight: "71vh",
    display: "flex",
    flexDirection: "column",
  },
  containerTitle: {
    fontSize: "1.1rem",
    fontWeight: "500",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  },
  restaurantTableHead: {
    display: "flex",
    justifyContent: "space-between",
    color: "white",
    padding: "10px",
    alignItems: "center",
  },

  tableBtn: {
    width: "80px",
    cursor: "pointer",
    color: "white",
  },
  settingBtn: {
    cursor: "pointer",
    textAlign: "center",
  },
  shortName: {
    whiteSpace: "nowrap",
    maxWidth: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  hidden: {
    display: "none",
  },
};

export default TableStyle;
