import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { TableRow as MuiTableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import styles from "styles/components/TableRow";

const useStyles = makeStyles(styles);

const TableRow = ({ children, header, ...props }) => {
  const classes = useStyles();

  return (
    <MuiTableRow
      {...props}
      className={header ? clsx(classes.row, classes.header) : classes.row}
    >
      {children}
    </MuiTableRow>
  );
};

TableRow.propTypes = {
  header: PropTypes.bool
};

export default TableRow;
