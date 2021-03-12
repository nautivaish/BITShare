import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    width: "250px",
    height: "90px",
    fontSize: "25px",
    borderRadius: "5px",
    letterSpacing: "2.5px",
    marginTop: "1.5rem",
    marginRight: "2rem",
    marginLeft: "2rem"
  },
});

export default function Hook(props) {
  const classes = useStyles();
  return <Button className={`${classes.root} waves-effect waves-light hoverable`} onClick={props.onClick}>LEND</Button>;
}
