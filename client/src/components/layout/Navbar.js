import React, { Component } from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

// import { Button } from "reactstrap"

// class Navbar extends Component {
//   onLogoutClick = e => {
//     e.preventDefault();
//     this.props.logoutUser();
//   };
//   render() {
//       return (
//         <div className="navbar-fixed">
//           <nav className="z-depth-0">
//             <div className="nav-wrapper" style={{backgroundColor: "white"}}>
//             {/* <div className="nav-wrapper"> */}
//               <Link
//                 to="/dashboard"
//                 style={{
//                   fontFamily: "monospace",
//                 }}
//                 className="col s5 brand-logo center blue-text"
//               >
//                 <i className="material-icons">share</i>
//                 BITShare
//               </Link>
//               <button 
//                 onClick={this.onLogoutClick}
//                 // className="right"
//                 className="btn hoverable right blue white-text accent-3"
//                 style={{height:"auto", width:"65px", borderRadius:"50px"}}
//               >
//                 <i className="material-icons">logout</i>
//               </button>
//             </div>
//           </nav>
//         </div>
//       );
//   }
// }

// import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarIcon from '@material-ui/icons/Star';
import Link from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function Navbar(props) {
  // console.log(props.history);
  const classes = useStyles();
  const onLogoutClick = e => {
      e.preventDefault();
      props.logoutUser();
    };
    const { user } = props.auth;
    console.log(user.id);
    
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link href={"/dashboard"}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            // onClick={}
          >
            <ShareIcon style={{color: "white"}}/>
          </IconButton> </Link>
          <Typography variant="h6" className={classes.title}>
            BITShare
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <Link href={"/myfavouriteitems"}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <StarIcon style={{ color: "white" }}/>
          </IconButton></Link>
          <Link href={"/profilepage/"+user.id}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="primary"
          >
            <AccountCircle style={{ color: "white" }}/>
           
            
          </IconButton> </Link>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={onLogoutClick}
          >
            <ExitToAppIcon />
          </IconButton>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToprops = state => ({
  auth: state.auth
});

export default connect(
  mapStateToprops,
  { logoutUser }
)(Navbar);
// export default Navbar;