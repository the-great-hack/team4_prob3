import React, { useEffect, useRef, useState } from "react";
import {
  Hidden,
  Icon,
  IconButton,
  Tab,
  Tabs,
  Typography
} from "@material-ui/core";
import { FuseAnimateGroup, FusePageSimple } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";
import Widget1 from "./widgets/Widget1";
import Widget2 from "./widgets/Widget2";
import Widget3 from "./widgets/Widget3";
import Widget4 from "./widgets/Widget4";
import Widget8 from "./widgets/Widget8";
import Widget9 from "./widgets/Widget9";
import Widget10 from "./widgets/Widget10";
import Widget11 from "./widgets/Widget11";
import WidgetNow from "./widgets/WidgetNow";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  content: {
    "& canvas": {
      maxHeight: "100%"
    }
  },
  selectedProject: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: "8px 0 0 0"
  },
  projectMenuButton: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: "0 8px 0 0",
    marginLeft: 1
  }
}));

function ProjectDashboardApp(props) {
  const dispatch = useDispatch();
  const widgets = useSelector(
    ({ projectDashboardApp }) => projectDashboardApp.widgets
  );
  const projects = useSelector(
    ({ projectDashboardApp }) => projectDashboardApp.projects
  );

  const classes = useStyles(props);
  const pageLayout = useRef(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    dispatch(Actions.getWidgets());
    dispatch(Actions.getProjects());
  }, [dispatch]);

  function handleChangeTab(event, tabValue) {
    setTabValue(tabValue);
  }

  if (!widgets || !projects) {
    return null;
  }

  return (
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
              Welcome back
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
            <div className="flex items-center">
            </div>
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
          <Tab
            className="text-14 font-600 normal-case"
            label="Budget Summary"
          />
          <Tab className="text-14 font-600 normal-case" label="Freelancers" />
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
              <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                <Widget1 widget={widgets.widget1} />
              </div>
              <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                <Widget2 widget={widgets.widget2} />
              </div>
              <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                <Widget3 widget={widgets.widget3} />
              </div>
              <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                <Widget4 widget={widgets.widget4} />
              </div>
              
            </FuseAnimateGroup>
          )}
          {tabValue === 1 && (
            <FuseAnimateGroup
              className="flex flex-wrap"
              enter={{
                animation: "transition.slideUpBigIn"
              }}
            >
              <div className="widget flex w-full sm:w-1/2 p-12">
                <Widget8 widget={widgets.widget8} />
              </div>
              <div className="widget flex w-full sm:w-1/2 p-12">
                <Widget9 widget={widgets.widget9} />
              </div>
              <div className="widget flex w-full p-12">
                <Widget10 widget={widgets.widget10} />
              </div>
            </FuseAnimateGroup>
          )}
          {tabValue === 2 && (
            <FuseAnimateGroup
              className="flex flex-wrap"
              enter={{
                animation: "transition.slideUpBigIn"
              }}
            >
              <div className="widget flex w-full p-12">
                
              </div>
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
          {/* <div className="widget w-full p-12">
            <WidgetWeather widget={widgets.weatherWidget} />
          </div> */}
        </FuseAnimateGroup>
      }
      ref={pageLayout}
    />
  );
}

export default withReducer("projectDashboardApp", reducer)(ProjectDashboardApp);
