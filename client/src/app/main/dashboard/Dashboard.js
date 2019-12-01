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
import CreateCart from "./components/CreateCart";
import ViewCartItems from "./components/ViewCartItems";
import Carts from "./tabs/Carts";
import EditCart from "./tabs/EditCart";
import axios from "axios";
import config from "app/config";

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
  const [open, setDialog] = useState({
    title: "",
    isOpen: false,
    type: ""
  });
  const [isTeamRedirect, setIsTeamRedirect] = useState(0);
  const [cartItems, setCartItems] = useState(false);

  const user = useSelector(({ auth }) => auth.user);

  const userData = useSelector(({ dashboardUser }) => dashboardUser.user);

  useEffect(() => {
    dispatch(Actions.getTeamData());
    getCartData();
  }, [dispatch]);

  const getCartData = () => {
    axios.get(`${config.baseURL}/api/v1/user/carts`).then(res => {
      setCartItems(res.data);
    });
  };

  const handleChangeTab = (event, tabValue) => {
    setTabValue(tabValue);
  };

  const getUpdatedTeams = () => {
    dispatch(Actions.getTeamData());
    getCartData();
  };

  const handleDialogClose = () => {
    setDialog({
      ...open,
      isOpen: false
    });
  };

  const setDialogBox = (title, type) => {
    setDialog({
      ...open,
      isOpen: true,
      title: title,
      type: type
    });
  };

  const openCartPage = teamId => {
    setIsTeamRedirect(teamId);
    setTabValue(2);
  };

  const passDialogContent = type => {
    switch (type) {
      case "addTeam": {
        return <AddTeam getTeams={() => getUpdatedTeams()} />;
      }
      case "createCart": {
        return <CreateCart teams={userData} />;
      }
      default:
        return null;
    }
  };

  if (!user.role || user.role.length === 0) {
    return null;
  }
  return (
    <React.Fragment>
      <DialogBox
        handleDialogClose={handleDialogClose}
        open={open.isOpen}
        title={open.title}
      >
        {passDialogContent(open.type)}
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
            <Tab
              className="text-14 font-600 normal-case"
              label="Carts"
              disabled={!isTeamRedirect}
            />
            <Tab className="text-14 font-600 normal-case" label="Edit Cart" />
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
                <Button
                  variant="outlined"
                  onClick={() => setDialogBox("Add Team", "addTeam")}
                >
                  Add Team
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setDialogBox("Create Cart", "createCart")}
                >
                  Add Cart
                </Button>
                <ViewCartItems cartItems={cartItems} />
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
                  openCartPage={teamId => openCartPage(teamId)}
                  userRole={user.role}
                />
              </FuseAnimateGroup>
            )}
            {tabValue === 2 && (
              <FuseAnimateGroup
                className="flex flex-wrap"
                enter={{
                  animation: "transition.slideUpBigIn"
                }}
              >
                <Carts
                  teamId={isTeamRedirect}
                  userId={user.id}
                  getCartData={() => getCartData()}
                />
              </FuseAnimateGroup>
            )}
            {tabValue === 3 && (
              <FuseAnimateGroup
                className="flex flex-wrap"
                enter={{
                  animation: "transition.slideUpBigIn"
                }}
              >
                <EditCart />
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
