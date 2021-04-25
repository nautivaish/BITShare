import React, { Component, useState, useEffect } from "react";
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
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
import Button from "@material-ui/core/Button";
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

    // const checkfavourite = () => {
    //   var v = props.favouriteItemList.includes(props.item._id);
    //   console.log(v); 
    //   return v;
    // };
    const eee = useSelector(state => state);
    const classes = useStyles();
    const [isFavourite, setFavourite] = React.useState(false);
    console.log(props.favouriteItemList);
    useEffect(() => {
        function fetchData() {
          try{
            setFavourite(props.favouriteItemList.includes(props.item._id));
            console.log(props.favouriteItemList.includes(props.item._id));
          }
          catch(e) {
            console.log(e);
          }
          
        } 
      fetchData();
    }, []);

    
    const handleFavouriteClick = () => {
      setFavourite(!isFavourite);
      console.log("muahahaha");
      if(!isFavourite)
        favouriteItem();
      else
        unfavouriteItem();
      // console.log(isFavourite);
    };
    const favouriteItem = async () => {
      // console.log("xx"); console.log(props.item._id);
      await axios.post("http://localhost:5000/api/items/favouriteItem/"+eee.auth.user.id, { id: props.item._id });
    };
    const unfavouriteItem = async () => {
      // console.log("YOOOOOOOO"); console.log(props.item._id);
      await axios.post("http://localhost:5000/api/items/unfavouriteItem/"+eee.auth.user.id, { id: props.item._id });
    };

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
          <IconButton
            aria-label="add to favorites"
            onClick={handleFavouriteClick}
            // backgroundColor="white"
          >
            <FavoriteIcon color={isFavourite ? "secondary" : "primary"}/>
            {/* secondary here gives the red color */}
          </IconButton>
          <Button  onClick={() => props.onCheckItemClick(props.item)}>
            View
          </Button>
        </CardActions>
      </Card>
      </ThemeProvider>
    );
  }

export default RecipeReviewCard;
