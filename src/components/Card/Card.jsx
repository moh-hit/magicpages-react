import React, { Component } from "react";
import {  } from "react-bootstrap";
export class Card extends Component {
  render() {
    return (
      <div
        className={"col-12 card" + (this.props.plain ? " card-plain" : "")}
        style={this.props.bg}
        // style={{

        // }}
      >
        <div className={"header" + (this.props.hCenter ? " text-center" : "")}>
          <center >
            <span className="title">{this.props.title}</span>
            <p className="category col-6">{this.props.category}</p>
          </center>
        </div>
        <div
          className={
            "content" +
            (this.props.ctAllIcons ? " all-icons" : "") +
            (this.props.ctTableFullWidth ? " table-full-width" : "") +
            (this.props.ctTableResponsive ? " table-responsive" : "") +
            (this.props.ctTableUpgrade ? " table-upgrade" : "")
          }
        >
          {this.props.content}
        </div>
      </div>
    );
  }
}

export default Card;
