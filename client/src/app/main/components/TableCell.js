import React from "react";
import clsx from "clsx";
import { TableCell as MuiTableCell } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import styles from "styles/components/TableCell";

const useStyles = makeStyles(styles);

const TableCell = ({ children, ...props }) => {
    const classes = useStyles();

    return (
        <MuiTableCell {...props} align="left" className={clsx(classes.cell, props.className)}>
            {children}
        </MuiTableCell>
    );
};

export default TableCell;
