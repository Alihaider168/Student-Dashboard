/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import EmojiObjectsSharpIcon from '@material-ui/icons/EmojiObjectsSharp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupSharpIcon from '@material-ui/icons/GroupSharp';
import Dashboard from "@material-ui/icons/Dashboard";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import Meetings from "views/Meeting/index.js";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import student from "views/Student/index.js";
import supervisor from "views/Supervisor/index.js";
import idea from "views/Idea/index.js";
import FYPGroup from "views/FYPGroup/index.js";
import Docs from "views/Docs/index.js";
import VIVA from "views/VIVA/index.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/pmo",
    name: "Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/idea",
    name: "Ideas",
    rtlName: "قائمة الجدول",
    icon: EmojiObjectsSharpIcon,
    component: idea,
    layout: "/admin"
  },
  {
    path: "/supervisor",
    name: "Supervisors",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: supervisor,
    layout: "/admin"
  },
  {
    path: "/fyp-Groups",
    name: "Group Members",
    rtlName: "الرموز",
    icon: GroupSharpIcon,
    component: FYPGroup,
    layout: "/admin"
  },
  {
    path: "/viva",
    name: "Vivas",
    rtlName: "خرائط",
    icon: HourglassFullIcon,
    component: VIVA,
    layout: "/admin"
  },
  {
    path: "/meetings",
    name: "Meetings",
    rtlName: "خرائط",
    icon: AccessAlarmIcon,
    component: Meetings,
    layout: "/admin"
  },
  {
    path: "/docs",
    name: "Documents",
    rtlName: "خرائط",
    icon: InsertDriveFileIcon,
    component: Docs,
    layout: "/admin"
  }
];

export default dashboardRoutes;
