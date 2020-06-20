import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Button } from "reactstrap";
import { Colors } from "../../config";
import CloneModal from "../Modals/CloneModal/CloneModal";
import { Item } from "react-bootstrap/lib/Breadcrumb";
import Frame from "react-frame";
var HtmlToReactParser = require("html-to-react").Parser;

export class StatsCard extends Component {
  

 
  render() {
    const { onClick } = this.props;
    const decoded = atob(this.props.frame);
    return (
      <div className="card card-stats" style={{ borderRadius: 28 }}>
        <div className="content">
          <Row md={12}>
            <Col md={12}>
              <iframe width="100%" height="500" className="Image" srcDoc={decoded} />
            </Col>
          </Row>
          <div className="heading">
            <h4 style={{ color: this.props.statsColor, fontWeight: "bolder" }}>
              {this.props.statsHeading}
            </h4>
            {/* {this.props.statsText} */}
          </div>
          <div className="text">{this.props.statsText}</div>
          <hr />
          
          <div className="footer">
            <div className="btns" style={{ display: "inline" }}>
              {/* <CloneModal /> */}
              
              <Button
                className="btn"
                style={{ backgroundColor: Colors.Green, fontWeight: 1000  }}
                onClick={onClick}
              >
                {this.props.statsBtn2Text}
              </Button>
              <i className={this.props.className}></i>
              {/* {this.props.statsIcon}  */}
              
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default StatsCard;
