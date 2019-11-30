import { authRoles } from "app/auth";

const navigationConfig = [
  {
    id: "applications",
    title: "Applications",
    type: "group",
    icon: "apps",
    auth: authRoles.normal,
    children: [
      {
        id: "dashboard",
        title: "Dashboard",
        type: "item",
        icon: "whatshot",
        url: "/dashboard"
      }
    ]
  }
];

export default navigationConfig;
