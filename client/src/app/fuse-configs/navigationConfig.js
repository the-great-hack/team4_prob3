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
  },
  {
    id: "calendar",
    title: "Calendar",
    type: "item",
    auth: authRoles.admin,
    icon: "today",
    url: "/calendar"
  },
  {
    id: "adminDashboard",
    title: "Admin Dashboard",
    type: "group",
    icon: "chat",
    auth: authRoles.admin,
    children: [
      {
        id: "contacts",
        title: "Contacts",
        type: "item",
        icon: "account_box",
        url: "/admin/dashboard"
      }
    ]
  }
];

export default navigationConfig;
