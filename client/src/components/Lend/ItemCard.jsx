import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
//   expand: {
//     transform: "rotate(0deg)",
//     marginLeft: "auto",
//     transition: theme.transitions.create("transform", {
//       duration: theme.transitions.duration.shortest
//     })
//   },
//   expandOpen: {
//     transform: "rotate(180deg)"
//   },
  avatar: {
    backgroundColor: red[500]
  }
}));

function RecipeReviewCard(props) {
    const classes = useStyles();
    const [isFavourite, setFavourite] = React.useState(false);
    const handleFavouriteClick = () => {
      setFavourite(!isFavourite);
    };
  
    return (
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
          {/* <IconButton
            aria-label="add to favorites"
            onClick={handleFavouriteClick}
            // backgroundColor="white"
          >
            <FavoriteIcon color={isFavourite ? "secondary" : "primary"}/>
          </IconButton> */}
          <IconButton aria-label="delete" onClick={() => props.onDeleteItemClick(props.item)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }

export default RecipeReviewCard;
