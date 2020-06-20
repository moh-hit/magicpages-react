import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import imageCompression from "browser-image-compression";
import { Colors } from "../../config";

class ImageModal extends Component {
  state = {
    modal: false,
    closeAll: false,
    file: "",
    compressedFile: "",
    imagePreviewUrl: "",
    width: " ",
    height: " ",
    value: 10,
    imageSize: 1,
    options: {
      maxSizeMB: 1,
      maxWidthOrHeight: 1600,
      useWebWorker: true,
      maxIteration: 1
    }
  };

  toggle = () => {
    this.setState({ model: true });
  };

  toggleAll = () => {
    this.setState({ closeAll: true });
  };

  uploadTemplate(e) {
    e.preventDefault();
    this.setState({
      modal: false
    });
  }

  _handleImageChange(e) {
    e.preventDefault();
    const { options } = this.state;

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      imageCompression(file, options)
        .then(compressedFile => {
          this.setState({
            compressedFile: compressedFile,
            file,
            imageSize: compressedFile.size
          });
        })
        .catch(function(error) {
          console.log(error.message);
        });
    };
    reader.readAsDataURL(file);
  }
  componentDidUpdate(prevProps, prevState) {
    const { file, options } = this.state;
    if (
      prevState.options.maxWidthOrHeight !==
        this.state.options.maxWidthOrHeight ||
      prevState.options.maxSizeMB !== this.state.options.maxSizeMB
    ) {
      console.log("did update working");
      imageCompression(file, options)
        .then(compressedFile => {
          console.log("compress  wapis hogae", compressedFile);
          this.setState({
            compressedFile: compressedFile,
            imageSize: compressedFile.size
          });
        })
        .catch(function(error) {
          console.log(error.message);
        });
    }
  }

  render() {
    let { compressedFile, imageSize } = this.state;
    // console.log(`originalFile size ${imageSize / 1024 } KB`);

    const { modal } = this.state;
    return (
      <div>
        <Button
          style={{
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.75)"
          }}
          color="info"
          onClick={() => this.setState({ modal: true })}
        >
          Upload
        </Button>
        <Modal isOpen={modal} toggle={this.toggle} className="Modal">
          <ModalHeader
            style={{
              color: Colors.LightBlue,
              fontSize: "25px",
              fontFamily: "Tahoma,Helvetica,Arial,Georgia"
            }}
            toggle={() => this.setState({ modal: false })}
          >
            Upload Image For Compressor
          </ModalHeader>
          <ModalBody>
            <form onSubmit={e => this._handleSubmit(e)}>
              <div className="imgPreview">
                {compressedFile ? (
                  <img src={URL.createObjectURL(compressedFile)} />
                ) : null}
              </div>
              <hr />
              <input
                className="fileInput"
                type="file"
                onChange={e => this._handleImageChange(e)}
              />
              <div className="form-group">
                <label>scale in pixels:</label>
                <input
                  type="text"
                  className="form-control col-sm-8"
                  placeholder="Enter Scale"
                  onChange={e =>
                    this.setState({
                      options: {
                        ...this.state.options,
                        maxWidthOrHeight: JSON.parse(e.target.value)
                      }
                    })
                  }
                />

                <label>Quality:</label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={this.state.value}
                  onChange={e =>
                    this.setState({
                      value: JSON.parse(e.target.value),
                      options: {
                        ...this.state.options,
                        maxSizeMB: JSON.parse(e.target.value)/10
                      }
                    })
                  }
                  className="form-control col-sm-8"
                />
              </div>
            </form>
            <br />
          </ModalBody>
          <ModalFooter>
            <Button
              className="submitButton"
              type="submit"
              color="info"
              onClick={e => {
                this.uploadTemplate(e);
              }}
            >
              Upload
            </Button>{" "}
            <Button
              color="danger"
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

export default ImageModal;

