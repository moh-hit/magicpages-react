import React, { Component } from "react";
import FilerobotImageEditor from "filerobot-image-editor";

class ImageEditor extends Component {
  state = {
    isShow: false,
    imgSrc: " "
  };

  showImageEditor = () => {
    this.setState({ isShow: true });
  };

  onClose = () => {
    this.setState({ isShow: false });
  };

  onSave = (e) => {
      console.log(e)
  }
  handleChange(e) {
      console.log(e.target.files[0])
      if(e.target.files && e.target.files[0]){
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                imgSrc : e.target.result
            })
        }
        reader.readAsDataURL(e.target.files[0])
      }
  }

  render() {
    const { imgSrc, isShow } = this.state;

    return (
      <div>
        <h1>Select Image for Editing...</h1>

        <img src={imgSrc} onClick={this.showImageEditor}/>

        <FilerobotImageEditor
          show={isShow}
          src={imgSrc}
          onSave={this.onSave}
          onClose={this.onClose}
        />
        <input
                className="fileInput"
                type="file"
                onChange={e => this.handleChange(e)}
              />
      </div>
    );
  }
}

export default ImageEditor;
