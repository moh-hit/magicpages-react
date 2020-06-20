import React, { Component } from "react";
import { Row, Col, Grid } from "react-bootstrap";
import { connect } from "react-redux";
import { DataBaseMiddleware } from "../../store/middlewares";
import { StatsCard } from "../../components/StatsCard/StatsCardPage";
import { Colors } from "../../config";
import History from "../../config/history";
//isomorphic re consielation

class Pages extends Component {
  componentDidMount() {
    const { GetTemplates, GetPages, userId, pages } = this.props;
    GetPages(localStorage.getItem("userId"));
  }

  componentWillUnmount() {
    console.log("unmount working===>");
  }

  componentWillUpdate() {
    console.log("Did update works===>");
  }

  render() {
    const { pages } = this.props;
    return (
      <div className="content">
        <Grid fluid className="text-center">
          <Row>
            {pages && pages.map((item, index) => {
              return (
                <>
                  <Col lg={4} sm={8}>
                    <StatsCard
                      key={index}
                      MainImage={<img alt="" src={item.image} />}
                      statsColor={Colors.LightBlue}
                      statsHeading={item.name}
                      frame={item.html}
                      statsBtn1Text="Select Page"
                      statsBtn2Text="Edit Page"
                      onClick={() => {
                        History.push("./pageDetails/?page_id="+item._id, { item });
                      }}
                      // className="pe-7s-trash"
                    />
                  </Col>
                </>
              );
            })}
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(states) {
  return {
    userId: states.AuthReducer.user.id,
    pages: states.DataBaseReducer.pages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GetTemplates: userId => {
      dispatch(DataBaseMiddleware.GetTemplates(userId));
    },
    GetPages: userId => {
      dispatch(DataBaseMiddleware.GetPages(userId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
