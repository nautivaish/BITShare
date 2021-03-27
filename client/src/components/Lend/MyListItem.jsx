import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  mycenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    color: 'green',
  },
  errorIcon: {
    color: 'red',
  },
}));

const ListItemWithWiderSecondaryAction = withStyles({
  secondaryAction: {
    paddingRight: 96
  }
})(ListItem);

function MyListItem(props) {
  const classes = useStyles();
  return (
    <ListItemWithWiderSecondaryAction key={props.key} role={undefined} dense button>
      <ListItemText id={props.key} primary={`${props.item.name} requested by: ${props.itemRequest.name}`} />
      <ListItemSecondaryAction>
        <IconButton className={classes.successIcon} edge="end" aria-label="tick" onClick={props.onAcceptClick}>
          <CheckIcon />
        </IconButton>
        <IconButton className={classes.errorIcon} edge="end" aria-label="cross" onClick={props.onRejectClick}>
          <ClearIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItemWithWiderSecondaryAction>
  );
};

export default MyListItem;