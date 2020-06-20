import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";

import AuthMiddleware from "../../store/middlewares/AuthMiddleware";

class AddCompany extends Component {
  state = {
    closeAll: false,
    htmlContent: " ",
    companyName: " ",
    reraNo: " ",
    gstin: " ",
    error: ""
  };
  toggle = () => {
    this.setState({ model: true });
  };

  toggleAll = () => {
    this.setState({ closeAll: false });
  };

  AddInfo = (e, companyName, reraNo, gstin) => {
    e.preventDefault();
    const {email , user_id} = this.props
    if (companyName && reraNo && gstin) {
      this.props.AddCompany(companyName, reraNo, gstin,email, user_id);
    } else if (companyName || reraNo || gstin === " ") {
      this.setState({ error: "Enter field is required " });
    } else {
      console.log("success");
    }
  };

  render() {
    const { companyName, reraNo, gstin, error, } = this.state;
    const { modal } = this.props;
    return (
      <div>
        <Modal isOpen={modal} toggle={this.toggle} className="Modal">
          <ModalHeader
            style={{
              color: "#F85C50",
              fontWeight: "bold",
              fontSize: "16px",
              textAlign: "center"
            }}
          >
            Add Your Company Details
          </ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Company Name..."
                  onChange={e => this.setState({ companyName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter RERA No..."
                  onChange={e => this.setState({ reraNo: e.target.value })}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="GSTIN No..."
                  onChange={e => this.setState({ gstin: e.target.value })}
                />
              </div>
              <small style={{ color: "red" }}>
                {!error ? error === true : error}
              </small>
            </form>

            <br />
          </ModalBody>
          <ModalFooter>
            <Button
              color="info"
              onClick={e => this.AddInfo(e, companyName, reraNo, gstin)}
            >
              Save
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email:state.AuthReducer.user.email,
    user_id: state.AuthReducer.user.id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    AddCompany: (companyName, reraNo, gstin,email, user_id) => {
      dispatch(AuthMiddleware.AddCompany(companyName, reraNo, gstin,email, user_id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCompany);
