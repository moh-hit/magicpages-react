import React, { useEffect, Component } from "react";
import ImageModal from "./ImageModal";
import ImageDesign from "./ImageDesign";

export default class Dashboard extends Component {
  render() {
    const { pages } = this.props;
    return (
      <div className="content">
        <h3>Compress Here</h3>
        <ImageModal />
        <hr />
        <h3>Or Edit Here</h3>

        <ImageDesign />
      </div>
    );
  }
}
