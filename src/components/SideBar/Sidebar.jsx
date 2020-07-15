import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import {FiHash} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import {
  Dashboard,
  Receipt,
  MonetizationOn,
  LocationCity,
  ViewList,
  Business,
} from "@material-ui/icons";
import { ListItemIcon, ListItemText } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function Sidebar(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });


  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Divider />
      {console.log(props.routes)
      }

      <List>
      
        {props.routes.map((props, key) => {
          if (!props.redirect)
            return (
              <li
                className={
                  props.upgrade
                    ? "active active-pro"
                    : activeRoute(props.layout + props.path)
                }
                key={key}
              >
                <NavLink
                  to={props.layout + props.path}
                  className="nav-link d-flex" 
                  activeClassName="active"
                  style={{alignItems: "center"}}
                  onClick={toggleDrawer("left", false)}
                >
                 <ListItem button key={props.name}>
            <ListItemIcon>
              {<FiHash size={24} color="#6927ff" />}
              {/* <i className={props.icon} style={{fontSize: 24}} /> */}
            </ListItemIcon>
            <ListItemText style={{fontWeight: "bold"}} primary={props.name} />
          </ListItem>
                </NavLink>
              </li>
            );
          return null;
        })}
      </List>
    </div>
  );

  return (
    <div >
      <React.Fragment key="left" style={{position: "fixed"}}>
 
        <Navbar bg="light" expand="xl">
          <Navbar.Brand>
          <Button className="Button" style={{outline: "none"}} onClick={toggleDrawer("left", true)}>
            <MenuIcon color="secondary" fontSize="large" />
          </Button>
            <p style={{fontWeight: "bold", fontSize: 20, fontFamily: "Montserrat", verticalAlign: "middle" }}>
             PROPSTORY MAGIC PAGES
            </p>
          </Navbar.Brand>
        </Navbar>
        <Drawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}



