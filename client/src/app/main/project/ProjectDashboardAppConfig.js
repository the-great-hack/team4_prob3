import React from "react";

export const ProjectDashboardAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: "/admin/dashboard",
      component: React.lazy(() => import("./ProjectDashboardApp"))
    }
  ]
};
