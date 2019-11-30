import React from "react";
import { authRoles } from "app/auth";

export const CalendarAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  auth: authRoles.admin,
  routes: [
    {
      path: "/calendar",
      component: React.lazy(() => import("./CalendarApp"))
    }
  ]
};
