import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Colors } from "../../../config";
import { connect } from "react-redux";
import { DataBaseMiddleware } from "../../../store/middlewares";

class CloneModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      closeAll: false,
    };
  }

  toggle = () => {
    this.setState({ model: true });
  };
  toggleAll = () => {
    this.setState({ closeAll: true });
  };

  cloneTemplate = e => {
    e.preventDefault();
    const { templateName } = this.state;
    const { cloneTemplate, userId, template, html } = this.props;
    console.log({ templateName, userId, template,html });
    cloneTemplate(templateName, localStorage.getItem("userId"),template, html);
    this.setState({
      modal: false
    });
  };

  render() {
    const { modal } = this.state;
    return (
      <div>
        {/* <Button color="success" onClick={() => this.setState({ modal: true })}>
          Select Template
        </Button> */}
        <Modal isOpen={modal} toggle={this.toggle} className="Modal">
          <ModalHeader
            style={{
              color: Colors.LightBlue,
              fontWeight: "bold",
              fontSize: "16px",
              textAlign: "center"
            }}
            toggle={() => this.setState({ modal: false })}
          >
            <h6 style={{fontFamily: "Montserrat"}}>Clone Template</h6>
          </ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Template name..."
                  disabled={this.state.disabled ? "disabled" : ""}
                  onChange={e =>
                    this.setState({ templateName: e.target.value })
                  }
                />
              </div>
              <small color="warning">
                {!this.state.error
                  ? this.state.error === true
                  : this.state.error}
              </small>
            </form>

            <br />
          </ModalBody>
          <ModalFooter>
            <Button
              color="info"
              onClick={e => {
                this.cloneTemplate(e);
              }}
            >
              Clone
            </Button>
            <Button
              style={{backgroundColor: "#fa163f"}}
              color="secondary"
              onClick={() => this.setState({ modal: false })}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(states) {
  return {
    userId: states.AuthReducer.user.id,
    template: states.DataBaseReducer.templates
  };
}
function mapDispatchToProps(dispatch) {
  return {
    cloneTemplate: (templateName, userId,template, html) => {
      dispatch(
        DataBaseMiddleware.CloneTemplates(templateName, userId, template, html)
      );
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CloneModal);
