import React, { Component } from "react";

class InputField extends Component {
  constructor(props) {
    super(props);

  this.state = {
    meta_keyword: "",
    meta_description: "",
    page_title: "",
    meta_author: "",
    favicon_icon: "",
    google_pageview_pixel: "",
    facebook_pageview_pixel: "",
    other_pageview_pixel: "",
    google_conversion_pixel: "",
    facebook_conversion_pixel: "",
    other_conversion_pixel: "",
    page: "",
  };
  }

  onChangeForm = e => {
    
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(e.target.value)
  };
  render() {
    return (
      <div>
        <label className="k-form-field">
          <span> {this.props.label}</span>
        </label>
        <br />
        <input
          onChange={this.props.onChangeForm}
          name="meta_keyword"
          value={this.props.val}
          className="k-textbox"
          placeholder={this.props.label}
        />
        <br />
      </div>
    );
  }
}

export default InputField;
