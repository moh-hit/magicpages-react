import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Button } from "reactstrap";
import CloneModal from "../Modals/CloneModal/CloneModal";
import PreviewModal from "../Modals/PreviewModal/PreviewModal";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import { Colors } from "../../config";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginBottom: 20,
    boxShadow: "5px 5px 20px #aaa", 
    minHeight: 450, borderRadius: 18
  },
  media: {
    height: 300,
  },
  title: {
    color: "#000",
    fontFamily: "Montserrat",
    fontWeight: "bold",
  },
  button: {
    color: "#6927ff",
    fontSize: 16,
  },
});

export function StatsCard(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    showPopup: false,
    showPopupPreview: false,
  });

  function togglePopup() {
    setState({
      showPopup: !state.showPopup,
      //  con:  item.html
    });
  }

  const togglePopupPreview = () => {
    console.log(state.showPopupPreview);

    setState({
      showPopupPreview: !state.showPopupPreview,
      //  con:  item.html
    });
  };

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.MainImage}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography
              className={classes.title}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {props.statsHeading}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={togglePopupPreview}>
          {props.statsBtn1Text}
          </Button>
          <Button
            size="small"
            style={{ backgroundColor: Colors.Green }}
            onClick={togglePopup}
          >
            {props.statsBtn2Text}
          </Button>
        </CardActions>
      </Card>
      {state.showPopup ? <CloneModal html={props.statsHTML} /> : null}
      {state.showPopupPreview ? (
        <PreviewModal name={props.statsHeading} html={props.statsHTML} />
      ) : null}
    </>
  );
}

export default StatsCard;
