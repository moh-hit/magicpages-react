import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Colors } from "../../../config";
import { DataBaseMiddleware } from "../../../store/middlewares";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
class ModalBtn extends Component {
  state = {
    modal: this.props.modal,
    closeAll: false,
    htmlContent: " ",
    templateName: " ",
    chose: false,
  };

  toggle = () => {
    this.setState({ model: true });
  };

  toggleAll = () => {
    this.setState({ closeAll: true });
  };

  showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const promise = new Promise((res, rej) => {
      reader.onload = async (e) => {
        res(e.target.result);
      };
      reader.readAsText(e.target.files[0]);
    });
    promise.then((val) => {
      this.setState({
        chose: true,
        htmlContent: btoa(unescape(encodeURIComponent(val))),
      });
    });
  };

  uploadTemplate = (e) => {
    e.preventDefault();
    const { htmlContent, templateName } = this.state;
    const { company, uploadTemplate } = this.props;
    const user_id = this.props.id;
    console.log("USER ID IN UPLOAD " + user_id);
    uploadTemplate(templateName, htmlContent, user_id);
    this.setState({
      modal: false,
    });
  };
  render() {
    const { modal } = this.state;
    return (
      <div>
        <Button
          variant="contained"
          color="secondary"
          style={{
            position: "fixed",
            top: 20,
            right: 50,
            borderRadius: 12,
            fontSize: 16,
            outline: "none",
            fontFamily: "Montserrat",
            textTransform: "none",
          }}
          onClick={() => this.setState({ modal: true })}
          startIcon={<AddCircleIcon />}
        >
          Upload Template
        </Button>
        <Modal isOpen={modal} toggle={this.toggle} className="Modal">
          <ModalHeader
       
            toggle={() => this.setState({ modal: false })}
          >
            <h6 style={{ fontFamily: "Montserrat" }}>
              Upload Template
            </h6>
          </ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Template Name"
                  onChange={(e) =>
                    this.setState({ templateName: e.target.value })
                  }
                />
              </div>

              <input
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
                onChange={(e) => this.showFile(e)}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{
                    borderRadius: 12,
                    fontSize: 14,
                    outline: "none",
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                    textTransform: "none",
                  }}
                  startIcon={
                    this.state.chose ? <CheckCircleIcon /> : <AddCircleIcon />
                  }
                >
                  {this.state.chose ? "File Chosen" : "Choose File"}
                </Button>
              </label>
            </form>
            <br />
          </ModalBody>
          <ModalFooter>
            <Button
              style={{ backgroundColor: "#21bf73" }}
              onClick={(e) => {
                this.uploadTemplate(e);
              }}
              variant="contained"
            >
              Upload
            </Button>
            <Button
              style={{ backgroundColor: "#fa163f" }}
              onClick={() => this.setState({ modal: false })}
              variant="contained"
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
    company: states.AuthReducer.companyCredentials,
    user: states.AuthReducer.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    uploadTemplate: (templateName, htmlContent, user_id) => {
      dispatch(
        DataBaseMiddleware.UploadTemplates(templateName, htmlContent, user_id)
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalBtn);
const styles = {
  inputBtn: {
    // background: Colors.LightBlue,
    color: "#333",
    fontSize: "1em",
    transition: "all .4s",
    cursor: "pointer",
  },
};
