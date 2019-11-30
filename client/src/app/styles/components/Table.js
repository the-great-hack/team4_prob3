export default theme => ({
  container: {
    "max-width": "100%",
    "margin-bottom": theme.defaultMargin
  },

  table: {
    width: "100%",
    "border-spacing": "0px 5px"
  },

  row: {
    "background-color": theme.color.paleBlue,

    "&:last-child > td": {
      borderBottom: "none"
    },

    "&:hover": {
      "background-color": theme.color.whiteSmoke
    }
  },

  scrollContainer: {
    "overflow-x": "auto"
  },

  cell: {
    padding: theme.spacing(1.5, 0.5),

    "& > svg": {
      verticalAlign: "middle",
      marginLeft: theme.spacing(0.5)
    }
  },

  headerCell: {
    padding: "1rem",
    "text-align": "left",
    "text-transform": "uppercase",
    "font-weight": props =>
      props.type !== "standard" ? "100" : theme.fontWeightBold
  },
  root: {
    width: "100%",
    marginTop: theme.spacing * 3,
    overflowX: "auto"
  }
});
