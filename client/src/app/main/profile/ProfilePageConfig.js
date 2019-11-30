import React from "react";
import { authRoles } from "app/auth";

export const ProfilePageConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  auth: authRoles.admin,
  routes: [
    {
      path: "/profile/:userName",
      component: React.lazy(() => import("./ProfilePage"))
    }
  ]
};
