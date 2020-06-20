import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

import Color from "../../config/colors";
import "../../assets/sass/light-bootstrap-dashboard-react.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      sidebarExists: false
    };
  }
  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true
      });
    }
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function() {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  }
  render() {
    return (
      <Navbar style={{ height: "61.5px" }} fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <p style={{ color: Color.LightBlue, fontWeight: "bold" }}>
              {this.props.brandText}
            </p>
          </Navbar.Brand>
         
          <Navbar.Toggle
            className="pe-7s-science"
            onClick={this.mobileSidebarToggle}
          />
        </Navbar.Header>
        <Navbar.Collapse></Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
