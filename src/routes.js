import Dashboard from "./views/Pages/Dashboard";
import TemplatePages from "./views/Pages/TemplatePages";
import Pages from "./views/Pages/Pages";
import EditImage from "./views/Pages/EditImage";
import Profile from "./views/Pages/Profile.js"
import Settings from "./views/Pages/Settings.js"


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/template_pages",
    name: "Templates",
    icon: "pe-7s-note2",
    component: TemplatePages,
    layout: "/admin"
  }
  ,
  {
    path: "/pages",
    name: "Pages",
    icon: "pe-7s-photo-gallery",
    component: Pages,
    layout: "/admin"
  },
  {
    path: "/editImages",
    name: "Edit Image",
    icon: "pe-7s-photo-gallery",
    component: EditImage,
    layout: "/admin"
  },
  
  {
    path: "/profile",
    name: "Profile",
    icon: "pe-7s-user",
    component: Profile,
    layout: "/admin"
  },
  
  {
    path: "/settings",
    name: "Settings",
    icon: "pe-7s-config",
    component: Settings,
    layout: "/admin"
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "pe-7s-back-2",
    component: "Logout",
    layout: "/login-page"
  }
  
];

export default dashboardRoutes;
