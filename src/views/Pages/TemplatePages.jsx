import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

import { DataBaseMiddleware } from "../../store/middlewares";

import UploadTemplateModal from "../../components/Modals/UploadTemplateModal/UploadTemplateModal";
import { StatsCard } from "../../components/StatsCard/StatsCard.jsx";
import Card from "../../components/Card/Card.jsx";

import { Colors } from "../../config";
import image from "../../assets/img/bg14.jpg";
import image2 from "../../assets/img/bg9.jpeg";
import History from "../../config/history";
import CloneModal from "../../components/Modals/CloneModal/CloneModal";
import $ from "jquery";

class TemplatePages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      htmlContent: " ",
      user_id: " ",
      showPopup: false,
      con: "",
      modal: false,
    };
  }

  componentDidMount() {
    const { GetTemplates, GetPages, userId, pages } = this.props;
    //alert(userId);
    GetTemplates(localStorage.getItem("userId"));
  }

  render() {
    var { templates } = this.props;

    console.log("Templates===>", templates);

    return (
      <div className="content text-center">
        <Grid fluid>
          <Row className="text-center">
            <Col md={12}>
              <h2
                style={{
                  fontWeight: "Bold",
                  color: "black",
                  fontFamily: "Montserrat",
                  letterSpacing: 2,
                }}
              >
                Templates
              </h2>
            </Col>
          </Row>

          <Row>
            {templates &&
              templates.map((item, index) => {
                return (
                  <Col lg={3} sm={8} key={index}>
                    <StatsCard
                      MainImage={image}
                      statsColor={Colors.Black}
                      statsHeading={item.name}
                      statsBtn1Text="View Template"
                      statsBtn2Text="Clone Template"
                      statsHTML={item.html}
                    />
                    {this.state.user_id}
                  </Col>
                );
              })}
          </Row>
        </Grid>

        <UploadTemplateModal
          id={localStorage.getItem("userId")}
          modal={this.state.modal}
        />
      </div>
    );
  }
}

function mapStateToProps(states) {
  return {
    userInfo: states.AuthReducer.user,
    userId: states.AuthReducer.user.id,
    templates: states.DataBaseReducer.templates,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GetTemplates: (userId) => {
      dispatch(DataBaseMiddleware.GetTemplates(userId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplatePages);
