import React, { useState, useRef, useEffect } from "react";
import {
  Hidden,
  Icon,
  IconButton,
  Tab,
  Tabs,
  Typography,
  Button
} from "@material-ui/core";
import { darken } from "@material-ui/core/styles/colorManipulator";
import { makeStyles } from "@material-ui/styles";
import { FuseAnimateGroup, FusePageSimple } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducers";
import WidgetNow from "./components/WidgetNow";
import AddTeam from "./components/AddTeam";
import * as Actions from "./store/actions";
import DialogBox from "app/main/components/DialogBox";
import TeamView from "./components/TeamView";

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
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const [tabValue, setTabValue] = useState(0);
  const [open, setDialog] = useState(false);

  const user = useSelector(({ auth }) => auth.user);

  const userData = useSelector(({ dashboardUser }) => dashboardUser.user);

  useEffect(() => {
    dispatch(Actions.getTeamData());
  }, [dispatch]);

  const handleChangeTab = (event, tabValue) => {
    setTabValue(tabValue);
  };

  const getUpdatedTeams = () => {
    dispatch(Actions.getTeamData());
  };

  const handleDialogClose = () => {
    setDialog(false);
  };

  return (
    <React.Fragment>
      <DialogBox
        handleDialogClose={handleDialogClose}
        open={open}
        title={"Add team"}
      >
        <AddTeam getTeams={() => getUpdatedTeams()} />
      </DialogBox>
      <FusePageSimple
        classes={{
          header: "min-h-160 h-160",
          toolbar: "min-h-48 h-48",
          rightSidebar: "w-288",
          content: classes.content
        }}
        header={
          <div className="flex flex-col justify-between flex-1 px-24 pt-24">
            <div className="flex justify-between items-start">
              <Typography className="py-0 sm:py-24" variant="h4">
                Welcome back {user.data && user.data.displayName}
              </Typography>
              <Hidden lgUp>
                <IconButton
                  onClick={ev => pageLayout.current.toggleRightSidebar()}
                  aria-label="open left sidebar"
                >
                  <Icon>menu</Icon>
                </IconButton>
              </Hidden>
            </div>
            <div className="flex items-end">
              <div className="flex items-center"></div>
            </div>
          </div>
        }
        contentToolbar={
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="off"
            className="w-full border-b-1 px-24"
          >
            <Tab className="text-14 font-600 normal-case" label="Home" />
            <Tab className="text-14 font-600 normal-case" label="See Teams" />
          </Tabs>
        }
        content={
          <div className="p-12">
            {tabValue === 0 && (
              <FuseAnimateGroup
                className="flex flex-wrap"
                enter={{
                  animation: "transition.slideUpBigIn"
                }}
              >
                <Button variant="outlined" onClick={() => setDialog(true)}>
                  Add Team
                </Button>
              </FuseAnimateGroup>
            )}
            {tabValue === 1 && (
              <FuseAnimateGroup
                className="flex flex-wrap"
                enter={{
                  animation: "transition.slideUpBigIn"
                }}
              >
                <TeamView
                  teams={userData}
                  getUpdatedTeams={() => getUpdatedTeams()}
                />
              </FuseAnimateGroup>
            )}
          </div>
        }
        rightSidebarContent={
          <FuseAnimateGroup
            className="w-full"
            enter={{
              animation: "transition.slideUpBigIn"
            }}
          >
            <div className="widget w-full p-12">
              <WidgetNow />
            </div>
          </FuseAnimateGroup>
        }
        ref={pageLayout}
      />
    </React.Fragment>
  );
}

export default withReducer("dashboardUser", reducer)(Dashboard);
