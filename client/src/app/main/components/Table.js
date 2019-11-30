import React, { Fragment } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableHead,
  TablePagination,
  Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { TableCell, TableRow, Spinner } from "components";
import styles from "app/styles/components/Table";

const useStyles = makeStyles(styles);

const Table = props => {
  const classes = useStyles();
  const {
    headings,
    rows,
    renderTableBody,
    withPagination,
    handleChangePage
  } = props;

  if (rows.isLoaded && !rows.error && rows.data) {
    return (
      <Fragment>
        <Paper className={classes.root}>
          <MuiTable className={classes.table}>
            <TableHead>
              <TableRow header>
                {headings.map((heading, index) => (
                  <TableCell key={index}>{heading}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{renderTableBody(rows)}</TableBody>
          </MuiTable>
        </Paper>
        {withPagination && rows.isLoaded && rows.data && (
          <TablePagination
            rowsPerPageOptions={[25]}
            component="div"
            count={rows.data.total}
            rowsPerPage={25}
            page={rows.data.currentPage - 1}
            onChangePage={handleChangePage}
          />
        )}
      </Fragment>
    );
  } else {
    return <Spinner />;
  }
};

export default Table;
