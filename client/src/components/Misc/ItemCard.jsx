import React, { Component, useState, useEffect } from "react";
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from '@material-ui/core/Button';
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PropTypes from "prop-types";

import axios from "axios";
import { useSelector } from 'react-redux';

const theme = createMuiTheme({
    palette: {
      type: "dark"
    }
});

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

function RecipeReviewCard(props) {
    const eee = useSelector(state => state);
    const classes = useStyles();


    // console.log(isFavourite);
    return (
        <ThemeProvider theme={theme}>
        <Card className={classes.root} style={{ width: "18rem", display: "inline-block", margin: 10}}>
        <CardHeader
          title={props.name}
          // subheader="September 14, 2016"
        />
        <CardMedia
          className={classes.media}
          image={props.img}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Rs. {props.price}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        {
          props.isBorrowed ? 
          <Button size="small" color="default" disabled={true} onClick={props.onCheckItemClick}>
            Already Borrowed
          </Button>
          :
          <Button size="small" color="default" onClick={props.onCheckItemClick}>
            Borrow
          </Button>
        }
        </CardActions>
      </Card>
      </ThemeProvider>
    );
  }
export default RecipeReviewCard;
