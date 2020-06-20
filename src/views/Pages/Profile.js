import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

import { Card } from "../../components/Card/Card.jsx";

class Profile extends Component {
  render() {
    const { name, email } = this.props.userInfo;
    const createdDate = this.props.userInfo.createdDate
      ? this.props.userInfo.createdDate.slice(0, 10)
      : null;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title={
                  <h3 style={{ fontWeight: "Bold", color: "#18ce0f" }}>
                    Profile
                  </h3>
                }
                category="Your Information"
                ctTableResponsive
                content={
                  <form>
                    <div className="form-group">
                      <label> Name</label>
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        disabled={true}
                        value={name}
                      />
                      <small id="emailHelp" className="form-text text-muted">
                        We'll never share your name with anyone else.
                      </small>
                    </div>
                    <div className="form-group">
                      <label>Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        aria-describedby="emailHelp"
                        disabled={true}
                        value={email}
                      />
                      <small id="emailHelp" className="form-text text-muted">
                        We'll never share your emailwith anyone else.
                      </small>
                    </div>
                    <div className="form-group">
                      <label>date of join</label>
                      <input
                        type="text"
                        className="form-control"
                        disabled={true}
                        value={createdDate}
                      />
                    </div>
                    <button disabled={true} className="btn btn-success">
                      Submit
                    </button>
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
function mapStateToProps(states) {
  return {
    userInfo: states.AuthReducer.user
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
