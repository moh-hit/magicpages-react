import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Redirect, Router } from "react-router-dom";

import Index from "./views/Index.js";
import LoginPage from "./views/Pages/LoginPage.js";
import SignUpPage from "./views/Pages/SignUpPage.js";
import Dashboard from "./views/Pages/Dashboard";
import AdminLayout from "./views/Admin.jsx";

// // Main styles
import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss";
// DashBoard style
import "./assets/css/animate.min.css";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import Apphistory from "./config/history"
import {Provider} from 'react-redux';
import store from './store'
import PageDetail from "./views/Pages/PageDetail.jsx";

ReactDOM.render(
  <Provider store={store}>
    {console.log(localStorage.getItem("user_id"))}
  <Router history={Apphistory}> 
    <Switch>
      <Switch>
        <Route path="/index" render={props => <Index {...props} />} />
        <Route path="/login-page" render={props => <LoginPage {...props} />} />
        <Route path="/admin/pageDetails" render={props => <PageDetail {...props} />} />
        <Route path="/signUp-page" render={props => <SignUpPage {...props} />} />
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/admin/dashboard" render={props => <Dashboard {...props} />}/>
        <Route path="/admin/pageDetails" render={props => <PageDetail {...props} />} />
        <Redirect to="/index" />
        <Redirect from="/" to="/index" />
      </Switch>
    </Switch>
  </Router>
  </Provider>,
  document.getElementById("root")
);
