import React, { useEffect } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { darken } from "@material-ui/core/styles/colorManipulator";
import { makeStyles } from "@material-ui/styles";
import { FuseAnimate } from "@fuse";
// import { useForm } from "@fuse/hooks";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducers";
import * as Actions from "./store/actions";
import Form from "./components/Form";

const useStyles = makeStyles(theme => ({
  root: {
    background:
      "radial-gradient(" +
      darken(theme.palette.primary.dark, 0.5) +
      " 0%, " +
      theme.palette.primary.dark +
      " 80%)",
    color: theme.palette.primary.contrastText
  }
}));

function Dashboard(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(({ auth }) => auth.user);

  // const userData = useSelector(({ dashboardUser }) => dashboardUser.user);
  // useEffect(() => {
  //   dispatch(Actions.getUserData(user.data.displayName));
  // }, [dispatch, user.data.displayName]);

  // const dispatchGetUserData = async () => {
  //   dispatch(Actions.getUserData(user.data.displayName));
  // };

  return (
    <React.Fragment>
      {user.role === "user" && (
        <div
          className={clsx(
            classes.root,
            "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32"
          )}
        >
          <div className="flex flex-col items-center justify-center w-full">
            <FuseAnimate animation="transition.expandIn">
              <Card className="w-full max-w-384">
                <CardContent className="flex flex-col items-center justify-center p-32 text-center">
                  <img
                    className="w-128 m-32"
                    src="assets/images/logos/fuse.svg"
                    alt="logo"
                  />

                  <Typography variant="subtitle1" className="mb-16">
                    Thanks for signing up for Hackathon!
                  </Typography>

                  <Typography color="textSecondary" className="max-w-288">
                    Work in progress
                  </Typography>
                </CardContent>
              </Card>
            </FuseAnimate>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default withReducer("dashboardUser", reducer)(Dashboard);
