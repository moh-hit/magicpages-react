import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "../../components/Card/Card.jsx";



class Settings extends Component {
  state = {};
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title={
                  <h3 style={{ fontWeight: "Bold", color:"#18ce0f"}}>
                    Settings
                  </h3>
                }
                category="Change your password "
                ctTableResponsive
                content={
                  <form>
                    <div className="form-group">
                      <label >New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter New Password"
                      />
                      <small id="emailHelp" className="form-text text-muted">
                        We'll never share your Password with anyone else.
                      </small>
                    </div>
                    <div className="form-group">
                      <label>Re-confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Re-Enter New Password"
                      />
                      <small id="emailHelp" className="form-text text-muted">
                        We'll never share your NewPassowed with anyone else.
                      </small>
                    </div>
                    <button type="submit" className="btn btn-success">
                      Save
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

export default Settings;
