import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper
//   }
// }));

function MyListItem(props) {
    return (
        <ListItem key={props.key} role={undefined} dense button>
          <ListItemText id={props.key} primary={`${props.item.name} requested by: ${props.itemRequest.name}`} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="tick" onClick={props.onAcceptClick}>
              <CheckIcon />
            </IconButton>
            <IconButton edge="end" aria-label="cross" onClick={props.onRejectClick}>
              <ClearIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
};

export default MyListItem;