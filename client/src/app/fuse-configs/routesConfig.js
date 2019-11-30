import React from "react";
import { Redirect } from "react-router-dom";
import { FuseUtils } from "@fuse";
import { DashboardConfig } from "app/main/dashboard/DashboardConfig";
import { CalendarAppConfig } from "app/main/calendar/CalendarAppConfig";
import { LoginConfig } from "app/main/login/LoginConfig";
import { RegisterConfig } from "app/main/register/RegisterConfig";
import { ProjectDashboardAppConfig } from "app/main/project/ProjectDashboardAppConfig";
import { ProfilePageConfig } from "app/main/profile/ProfilePageConfig";
import { Error404PageConfig } from "app/main/errors/404/Error404PageConfig";
import { Error500PageConfig } from "app/main/errors/500/Error500PageConfig";

const routeConfigs = [
  DashboardConfig,
  CalendarAppConfig,
  LoginConfig,
  RegisterConfig,
  ProjectDashboardAppConfig,
  ProfilePageConfig,
  Error404PageConfig,
  Error500PageConfig
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />
  },
  {
    component: () => <Redirect to="/pages/errors/error-404" />
  }
];

export default routes;
