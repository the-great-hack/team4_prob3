import Dashboard from "./Dashboard";
import { authRoles } from "app/auth";

export const DashboardConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  auth: authRoles.normal,
  routes: [
    {
      path: "/dashboard",
      component: Dashboard
    }
  ]
};

