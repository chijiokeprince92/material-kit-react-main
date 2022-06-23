/*
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import Feed from "layouts/post/Feed";
import Maps from "layouts/maps/Maps";
import Jobs from "layouts/jobs/Jobs";
// import Messages from "layouts/messages/Messages";
import Groups from "layouts/groups/Groups";
import School from "layouts/school/School";
import Cheat from "layouts/messages/Cheat";
// import Whatsapp from "layouts/messages/whatsapp";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Posts",
    key: "posts",
    icon: <Icon fontSize="small">feed</Icon>,
    route: "/posts",
    component: <Feed />,
  },
  {
    type: "collapse",
    name: "Messages",
    key: "messages",
    icon: <Icon fontSize="small">message</Icon>,
    route: "/messages",
    component: <Cheat />,
  },
  {
    type: "collapse",
    name: "Maps",
    key: "maps",
    icon: <Icon fontSize="small">public</Icon>,
    route: "/maps",
    component: <Maps />,
  },
  {
    type: "collapse",
    name: "School",
    key: "school",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/school",
    component: <School />,
  },
  {
    type: "collapse",
    name: "Jobs",
    key: "jobs",
    icon: <Icon fontSize="small">workoutline</Icon>,
    route: "/jobs",
    component: <Jobs />,
  },
  {
    type: "collapse",
    name: "Groups",
    key: "groups",
    icon: <Icon fontSize="small">groups</Icon>,
    route: "/groups",
    component: <Groups />,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/rtl",
    component: <RTL />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  }
];

export default routes;
