import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Button } from "reactstrap";
import { Colors } from "../../config";
import CloneModal from "../Modals/CloneModal/CloneModal";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import Popover from '@material-ui/core/Popover';

export class StatsCard extends Component {
  constructor(props) {
    super(props);
  this.state = {
    anchorEl: null
  }

  this.handleClosePopover = this.handleClosePopover.bind(this);
  this.handleClick = this.handleClick.bind(this);

}

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClosePopover = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const open = Boolean(this.state.anchorEl);
    const id = open ? 'delete-popover' : undefined;
    const { onClickEdit, onClickDelete, aria } = this.props;
    const decoded = atob(this.props.frame);
    return (
      <div className="card card-stats" style={{ borderRadius: 28 }}>
        <div className="content">
          <Row md={12}>
            <Col md={12}>
              <iframe width="100%" height="500" className="Image" srcDoc={decoded} />
            </Col>
          </Row>
          <div className="heading">
            <h4 style={{ color: this.props.statsColor, fontWeight: "bolder" }}>
              {this.props.statsHeading}
            </h4>
            {/* {this.props.statsText} */}
          </div>
          <div className="text">{this.props.statsText}</div>
          <hr />

          <div className="footer">
            <div className="btns" style={{ display: "inline" }}>
              {/* <CloneModal /> */}

              <Button
                className="btn"
                style={{ backgroundColor: Colors.Green, fontWeight: 1000 }}
                onClick={onClickEdit}
              > <EditIcon fontSize="small" style={{ marginRight: 4 }} />
                {this.props.statsBtn1Text}
              </Button>
              <Button
                aria-describedby={id}
                className="btn"
                style={{ backgroundColor: "#ed3833", fontWeight: 1000 }}
                onClick={this.handleClick}
              > <DeleteOutlineIcon fontSize="small" style={{ marginRight: 4 }} />
                {this.props.statsBtn2Text}
              </Button>
              <i className={this.props.className}></i>
              {/* {this.props.statsIcon}  */}
              <Popover
                id={id}
                open={open}
                anchorEl={this.state.anchorEl}
                onClose={this.handleClosePopover}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                
              >
                <p style={{fontSize: 12, fontWeight: "bold", fontFamily: "Montserrat"}}>Are you sure you want to delete this page?</p>
                <div className="d-flex align-items-center justify-content-end">
                  <button className="btn" onClick={this.handleClosePopover} style={{ margin: 5, backgroundColor: "#424874", fontWeight: "normal" }}>Cancel</button>
                  <button class="btn" onClick={onClickDelete} style={{ margin: 5, backgroundColor: "#e41749", fontWeight: "normal" }}>Yes, delete</button>
                </div>
              </Popover>
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default StatsCard;
