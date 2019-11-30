import React from "react";
import {
  Avatar,
  Table,
  TableHead,
  TableCell,
  TableRow,
  Typography,
  Paper,
  TableBody,
  Tooltip,
  IconButton,
  Button,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { Cancel, CheckBox } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import * as Actions from "app/store/actions";
import axios from "axios";
import config from "app/config";

const tableHeaders = [
  {
    id: "action",
    title: "Actions"
  },
  {
    id: "id",
    title: "Id"
  },
  {
    id: "firstName",
    title: "First Name"
  },
  {
    id: "lastName",
    title: "Last Name"
  },
  {
    id: "phoneNumber",
    title: "phoneNumber"
  },
  {
    id: "userName",
    title: "User Name"
  },
  {
    id: "userEmail",
    title: "Email"
  },
  {
    id: "isApproved",
    title: "Status"
  },
  {
    id: "homeTown",
    title: "Home Town"
  },
  {
    id: "dob",
    title: "Date of birth"
  },
  {
    id: "experience",
    title: "Experience"
  },
  {
    id: "gender",
    title: "Gender"
  },
  {
    id: "trainingAreas",
    title: "trainingAreas"
  },
  {
    id: "trainingStyle",
    title: "Training Style"
  },
  {
    id: "comfortWithInjuries",
    title: "Comfort with injuries"
  },
  {
    id: "cheatMeal",
    title: "Certifications"
  },
  {
    id: "locations",
    title: "Location"
  }
];

function Widget11(props) {
  const { widget, getUsersData } = props;
  const dispatch = useDispatch();

  async function handleSubmit(data) {
    try {
      await axios
        .post(`${config.baseURL}/api/user/update/${data.id}`, data.params)
        .then(response => {
          if (response.data) {
            getUsersData();
            dispatch(Actions.closeDialog());
          } else {
          }
        });
    } catch (err) {
      console.log("Something went wrong");
    }
  }

  return (
    <Paper className="w-full rounded-8 shadow-none border-1">
      <div className="flex items-center justify-between px-16 h-64 border-b-1">
        <Typography className="text-16">{props.widget.title}</Typography>
        <Typography className="text-11 font-500 rounded-4 text-white bg-blue px-8 py-4">
          {widget.length + " Members"}
        </Typography>
      </div>
      <div className="table-responsive">
        <Table className="w-full min-w-full" size="small">
          <TableHead>
            <TableRow>
              {tableHeaders.map(column => {
                switch (column.id) {
                  case "avatar": {
                    return (
                      <TableCell
                        key={column.id}
                        className="whitespace-no-wrap p-8 pl-16"
                      >
                        {column.title}
                      </TableCell>
                    );
                  }
                  default: {
                    return (
                      <TableCell key={column.id} className="whitespace-no-wrap">
                        {column.title}
                      </TableCell>
                    );
                  }
                }
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {widget.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton
                    size="small"
                    color="secondary"
                    onClick={() =>
                      dispatch(
                        Actions.openDialog({
                          children: (
                            <React.Fragment>
                              <DialogTitle id="alert-dialog-title">
                                Approve this profile
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  By clicking confirm, user profile will be
                                  approved.
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  onClick={() =>
                                    dispatch(Actions.closeDialog())
                                  }
                                  color="primary"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => {
                                    let bodyParams = {
                                      id: row.id,
                                      params: {
                                        isApproved: true
                                      }
                                    };
                                    handleSubmit(bodyParams);
                                  }}
                                  color="primary"
                                  autoFocus
                                >
                                  Confirm
                                </Button>
                              </DialogActions>
                            </React.Fragment>
                          )
                        })
                      )
                    }
                  >
                    <Tooltip title="Approve Profile">
                      <CheckBox fontSize="inherit" />
                    </Tooltip>
                  </IconButton>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() =>
                      dispatch(
                        Actions.openDialog({
                          children: (
                            <React.Fragment>
                              <DialogTitle id="alert-dialog-title">
                                Cancel User profile
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  By clicking confirm, user profile will be soft
                                  deleted.
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  onClick={() =>
                                    dispatch(Actions.closeDialog())
                                  }
                                  color="primary"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => {
                                    let bodyParams = {
                                      id: row.id,
                                      params: {
                                        isActive: false
                                      }
                                    };
                                    handleSubmit(bodyParams);
                                  }}
                                  color="primary"
                                  autoFocus
                                >
                                  Confirm
                                </Button>
                              </DialogActions>
                            </React.Fragment>
                          )
                        })
                      )
                    }
                  >
                    <Tooltip title="Cancel Profile">
                      <Cancel fontSize="inherit" />
                    </Tooltip>
                  </IconButton>
                </TableCell>
                {row.cells.map(cell => {
                  switch (cell.id) {
                    case "avatar": {
                      return (
                        <TableCell
                          key={cell.id}
                          component="th"
                          scope="row"
                          className="pl-16 pr-0"
                        >
                          <Avatar src={cell.value} />
                        </TableCell>
                      );
                    }
                    case "actions": {
                      return null;
                    }
                    case "userName": {
                      return (
                        <TableCell
                          key={cell.id}
                          component="th"
                          scope="row"
                          className="truncate font-600"
                        >
                          {cell.value}
                        </TableCell>
                      );
                    }

                    case "isApproved": {
                      return (
                        <TableCell key={cell.id} component="th" scope="row">
                          {cell.value ? (
                            <Tooltip title="Approved">
                              <Icon color="primary" style={{ fontSize: 25 }}>
                                check_circle
                              </Icon>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Pending">
                              <Icon color="secondary" style={{ fontSize: 25 }}>
                                feedback
                              </Icon>
                            </Tooltip>
                          )}
                        </TableCell>
                      );
                    }
                    default: {
                      return (
                        <TableCell
                          key={cell.id}
                          component="th"
                          scope="row"
                          className="truncate"
                        >
                          {cell.value}
                        </TableCell>
                      );
                    }
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
}

export default React.memo(Widget11);
