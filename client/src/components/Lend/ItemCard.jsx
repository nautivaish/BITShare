import React from "react";
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

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
    const classes = useStyles();
  
    return (
        <ThemeProvider theme={theme}>
        <Card className={classes.root} style={{ width: "18rem", display: "inline-block", margin: 10}}>
        <CardHeader
          title={props.item.name}
          // subheader="September 14, 2016"
        />
        <CardMedia
          className={classes.media}
          image={props.item.image}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Rs. {props.item.price}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* <span style={{textAlign: "center"}}>         */}
          {props.item.isBorrowed ?
          <Button size="small" color="default" onClick={props.onReturnClick}>
            <b>Return</b> 
          </Button>
          :
          <Button size="small" color="default" onClick={props.onDeleteItemClick}>
            <b>Delete</b>
          </Button>}
          {/* </span> */}
        </CardActions>
      </Card>
      </ThemeProvider>
    );
  }

export default RecipeReviewCard;
