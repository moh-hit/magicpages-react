// import React, { Component } from "react";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { Colors } from "../../../config";
// import Frame from "react-frame-component";

// var HtmlToReactParser = require("html-to-react").Parser;

// class PreviewModal extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       modal: true,
//       closeAll: false,
//       htmlContent: " ",
//       templateName: " "
//     };
//   }
//   toggle = () => {
//     this.setState({ model: true });
//   };


//   render() {
//     const { modal } = this.state;
//     const decoded = atob(this.props.html);
//     var htmlToReactParser = new HtmlToReactParser();
//     var reactElement = htmlToReactParser.parse(decoded);
//     return (
//       <div >
//         {/* <Button color="success" onClick={() => this.setState({ modal: true })}>
//             Select Template
//           </Button> */}
//         <Modal isOpen={modal} toggle={this.toggle} size="xl" className="Modal">
//           <ModalHeader
//             style={{
//               color: Colors.LightBlue,
//               fontWeight: "bold",
//               fontSize: "16px",
//               textAlign: "center"
//             }}
//             toggle={() => this.setState({ modal: false })}
//           >
//               {this.props.name}
//           </ModalHeader>
//           <ModalBody> <Frame width="100%" height="600" className=" Image">{reactElement }</Frame></ModalBody>
//         </Modal>
//       </div>
//     );
//   }
// }

// export default PreviewModal;
    



import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Colors } from "../../../config";
import Frame from "react-frame";

var HtmlToReactParser = require("html-to-react").Parser;


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function PreviewModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const decoded = atob(props.html);
  var htmlToReactParser = new HtmlToReactParser();
  var reactElement = htmlToReactParser.parse(decoded);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
      
        <iframe srcDoc={decoded} width="90%" height="700" className="Image" style={{borderWidth: 8, borderRadius: 12, borderColor: "#fff"}} />
        </Fade>
      </Modal>
    </div>
  );
}